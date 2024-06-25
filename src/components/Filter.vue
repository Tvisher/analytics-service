<template>
  <div class="filter-block">
    <div class="filter-wrapper">
      <button class="btn add-filter-btn" @click="openFilterModal">
        Добавить фильтр
      </button>
    </div>
    <teleport to="body">
      <transition name="modal-fade" mode="out-in">
        <div
          class="filter-modal"
          v-if="showFilterModal"
          @click="closeFilterModal"
        >
          <div class="filter-modal__content">
            <div class="filter-modal__close"></div>
            <h2 class="filter-modal__title">Добавить фильтр</h2>
            <div class="filter-select">
              <vSelect
                :options="dataForFirtsLevelFilter"
                v-model="firstLevelFilterSelected"
                :searchable="false"
                placeholder="Выберите вопрос"
                @option:selected="firstLevelSelect"
              ></vSelect>
            </div>
            <Vue3SlideUpDown v-model="openSecondLevel" :duration="300">
              <div class="filter-items">
                <div class="filter-select" v-if="secondLevelIsSelect">
                  <vSelect
                    :options="dataForSecondLevelFilter"
                    v-model="secondLevelFilterSelectedValue"
                    :searchable="false"
                    placeholder="Выберите опцию"
                    @option:selected="secondLevelSelect"
                    :multiple="isMultipleSelect"
                  ></vSelect>
                </div>
                <div
                  class="filter-select"
                  v-if="firstLevelFilterSelected.questionType == 'ranging'"
                >
                  <label class="is-consider-level">
                    <input type="checkbox" v-model="considerSecondLevel" />
                    <span>Учитывать второй уровень фильтра</span>
                  </label>
                  <div class="flex-wrapper">
                    <span class="level-descr">Учитывать пункты</span>
                    <span class="level-descr">Укажите желаемый порядок</span>
                  </div>
                  <RanginVisual
                    :optionsData="dataForSecondLevelFilter"
                    @setSecondLevelData="secondLevelSelect"
                  />
                </div>
                <div
                  class="filter-select"
                  v-if="
                    firstLevelFilterSelected.questionType == 'range-selection'
                  "
                >
                  <label class="is-consider-level">
                    <input type="checkbox" v-model="considerSecondLevel" />
                    <span>Учитывать второй уровень фильтра</span>
                  </label>

                  <span class="level-descr"
                    >Укажите интересующий вас диапазон</span
                  >
                  <RangeSelection
                    :data="dataForSecondLevelFilter"
                    @setSecondLevelData="secondLevelSelect"
                  />
                </div>
                <div
                  class="filter-select"
                  v-if="firstLevelFilterSelected.questionType == 'date'"
                >
                  <DateSelection
                    :isRange="!dataForSecondLevelFilter"
                    :key="dataForSecondLevelFilter"
                    @setSecondLevelData="secondLevelSelect"
                  />
                </div>
                <div
                  class="filter-select"
                  v-if="
                    firstLevelFilterSelected.questionType == 'custom-fields'
                  "
                >
                  <vSelect
                    :options="dataForSecondLevelFilter"
                    v-model="secondLevelFilterSelectedValue"
                    :searchable="false"
                    placeholder="Наименование поля"
                    @option:selected="secondLevelSelect"
                    :multiple="isMultipleSelect"
                  ></vSelect>
                  <Vue3SlideUpDown v-model="openThirdLevel" :duration="300">
                    <div
                      class="third-level-field"
                      v-if="secondLevelFilterSelectedValue"
                    >
                      <span>Oтвет пользователя</span>

                      <input
                        v-if="thirdLeveltype === 'phone'"
                        class="mofal-filter-input"
                        type="text"
                        ref="el"
                      />
                      <input
                        v-else
                        class="mofal-filter-input"
                        type="text"
                        v-model="thirdLevelFilterSelectedValue"
                      />
                    </div>
                  </Vue3SlideUpDown>
                </div>
              </div>
            </Vue3SlideUpDown>
            <button class="btn filter-modal__btn" @click="addFilter">
              Добавить фильтр
            </button>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import RanginVisual from "@/components/filterComponents/RanginVisual.vue";
import RangeSelection from "@/components/filterComponents/RangeSelection.vue";
import DateSelection from "@/components/filterComponents/DateSelection.vue";
import { ref, computed } from "vue";
import { useGeneralStatistics } from "@/stores/GeneralStatistics";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Vue3SlideUpDown } from "vue3-slide-up-down";

import { useIMask } from "vue-imask";

const { el, masked } = useIMask({
  mask: "+{7}(000)000-00-00",
  lazy: false,
});

const emit = defineEmits(["addFilterItem"]);
const store = useGeneralStatistics();

const showFilterModal = ref(false);

const firstLevelFilterSelected = ref(null);
const openSecondLevel = ref(false);
const considerSecondLevel = ref(false);
const dataForSecondLevelFilter = ref(null);
const secondLevelFilterSelectedValue = ref(null);
const openThirdLevel = ref(false);
const thirdLevelFilterSelectedValue = ref(null);
const thirdLeveltype = ref(null);

const isSelectTypes = [
  "single-choice",
  "drop-down-list",
  "multiple-drop-down-list",
  "multiple-choice",
];

const secondLevelIsSelect = computed(() => {
  return firstLevelFilterSelected.value
    ? isSelectTypes.includes(firstLevelFilterSelected.value.questionType)
    : false;
});

const isMultipleSelect = computed(() => {
  if (secondLevelIsSelect.value) {
    return ["multiple-drop-down-list", "multiple-choice"].includes(
      firstLevelFilterSelected.value.questionType
    );
  }
});

const dataForFirtsLevelFilter = store.pagesGeneralData
  .reduce((acc, page) => {
    page.forEach((question) => acc.push(question));
    return acc;
  }, [])
  .map((question) => {
    const params = question.PARAMS;
    const questionId = question.UF_ID_QUESTION;
    const questionType = question.UF_QUESTION_TYPE;
    const questionOptions = question.VARIANTS;
    let label = new QuillDeltaToHtmlConverter(question.PARAMS.NAME)
      .convert()
      .replace(/<[^>]*>/g, "");

    const filterItem = {
      questionId,
      questionType,
      questionOptions,
      label,
      params,
    };

    // Определения типа даты (одиночная или диапазон)
    if (question.UF_QUESTION_TYPE === "date") {
      const isSigleDate = Date.parse(question.ANSWERS.USER_ANSWER[0].TEXT);
      if (isSigleDate) {
        filterItem.isSigleDateItem = true;
      }
    }
    return filterItem;
  });

const firstLevelSelect = (data) => {
  openSecondLevel.value = false;
  firstLevelFilterSelected.value = data;
  dataForSecondLevelFilter.value = null;
  secondLevelFilterSelectedValue.value = null;
  considerSecondLevel.value = false;
  if (secondLevelIsSelect.value) {
    const options = Object.values(data.questionOptions).map((item) => {
      return {
        label: item.UF_VARIANT_VALUE,
        id: item.UF_ID_VARIANT,
      };
    });
    dataForSecondLevelFilter.value = options;
  }
  if (data.questionType === "ranging") {
    dataForSecondLevelFilter.value = data.questionOptions;
  }
  if (data.questionType === "range-selection") {
    dataForSecondLevelFilter.value = data.params;
    secondLevelFilterSelectedValue.value = {
      from: data.params.GENERAL_RANGE_START,
      to: data.params.GENERAL_RANGE_END,
    };
  }

  if (data.questionType === "date") {
    dataForSecondLevelFilter.value = data.isSigleDateItem;
  }

  if (data.questionType === "custom-fields") {
    const customFiledsData = Object.values(store.pagesCustomFieldsData);
    const allCustomFields = [];
    customFiledsData.forEach((item) => {
      item[0][0].forEach((i) => allCustomFields.push(i));
    });

    const questionOptions = Array.isArray(data.questionOptions)
      ? data.questionOptions
      : Object.values(data.questionOptions);

    dataForSecondLevelFilter.value = allCustomFields.reduce(
      (acc, customField) => {
        const questionItem = questionOptions.find(
          (questionOption) =>
            questionOption.UF_ID_QUESTION == customField.UF_ID_QUESTION
        );
        if (questionItem) {
          let filedLabel;
          if (customField.UF_VALUE_FIELD) {
            filedLabel = customField.UF_VALUE_FIELD;
          } else {
            switch (customField.UF_ID_TYPE_FIELD) {
              case "text":
                filedLabel = "Текстовое поле";
                break;

              case "phone":
                filedLabel = "Поле номер телефона";
                break;

              case "email":
                filedLabel = "Поле Email";
                break;

              case "textarea":
                filedLabel = "Область текста";
                break;

              default:
                break;
            }
          }
          acc.push({
            id: customField.UF_ID_FIELD,
            type: customField.UF_ID_TYPE_FIELD,
            label: filedLabel,
          });
        }
        return acc;
      },
      []
    );
  }

  setTimeout(() => {
    openSecondLevel.value = true;
  }, 300);
};

const secondLevelSelect = (data) => {
  openThirdLevel.value = false;
  thirdLevelFilterSelectedValue.value = null;
  secondLevelFilterSelectedValue.value = data;
  if (firstLevelFilterSelected.value.questionType === "custom-fields") {
    thirdLeveltype.value = data.type;
    setTimeout(() => {
      openThirdLevel.value = true;
    }, 300);
  }
};

const openFilterModal = () => {
  document.body.style.overflow = "hidden";
  showFilterModal.value = true;
};

const closeFilterModal = (e) => {
  const target = e.target;
  if (
    (target.closest(".filter-modal") &&
      !target.closest(".filter-modal__content")) ||
    target.closest(".filter-modal__close")
  ) {
    resetFilterAdnCloseModal();
  }
};

const resetFilterAdnCloseModal = () => {
  document.body.style.overflow = "";
  showFilterModal.value = false;
  firstLevelFilterSelected.value = null;
  secondLevelFilterSelectedValue.value = null;
  dataForSecondLevelFilter.value = null;
  thirdLevelFilterSelectedValue.value = null;
  openSecondLevel.value = false;
  openThirdLevel.value = false;
  considerSecondLevel.value = false;
};

const addFilter = () => {
  if (!firstLevelFilterSelected.value) {
    return;
  }

  let thirdLevelValue;
  if (thirdLeveltype.value === "phone") {
    thirdLevelValue = masked.value.replace(/[^+\d]/g, "");
  } else {
    thirdLevelValue = thirdLevelFilterSelectedValue.value
      ? thirdLevelFilterSelectedValue.value.trim()
      : null;
  }

  // if (
  //   firstLevelFilterSelected.value.questionType === "custom-fields" &&
  //   (!thirdLevelValue ||
  //     (thirdLeveltype.value === "phone" &&
  //       thirdLevelValue.trim().replace(/[^+\d]/g, "").length < 12))
  // ) {
  //   thirdLevelValue = thirdLevelValue.trim().replace(/[^+\d]/g, "");
  //   console.log(thirdLevelValue);
  // }

  let secodLevelValue;
  if (
    ["ranging", "range-selection"].includes(
      firstLevelFilterSelected.value.questionType
    )
  ) {
    secodLevelValue = considerSecondLevel.value
      ? secondLevelFilterSelectedValue.value
      : null;
  } else {
    secodLevelValue = secondLevelFilterSelectedValue.value;
  }
  const filterItemData = {
    questionLabel: firstLevelFilterSelected.value.label,
    questionId: firstLevelFilterSelected.value.questionId,
    questionType: firstLevelFilterSelected.value.questionType,
    secondLevelFilterSelectedValue: secodLevelValue,
    thirdLevelValue,
  };
  emit("addFilterItem", filterItemData);
  resetFilterAdnCloseModal();
};
</script>

<style lang="scss">
.filter-block {
  width: fit-content;
}
.third-level-field {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.flex-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mofal-filter-input {
  outline: none;
  padding: 10px !important;
  border-radius: 4px !important;
  border: 1px solid rgba(0, 66, 105, 0.28) !important;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
}
.filter-modal {
  .vs--multiple {
    .vs__selected {
      padding: 4px 8px 4px 12px !important;
      border-radius: 4px;
      background-color: rgba(0, 66, 105, 0.07) !important;
      border: none;
      display: flex;
      align-items: center;
      font-size: 14px !important;
      margin-right: 4px;
      width: fit-content;
      white-space: wrap;
    }
    .vs__selected-options {
      display: flex;
      gap: 4px;
    }

    .vs__deselect {
      flex-shrink: 0;
      margin-left: 6px !important;
      width: 16px;
      height: 16px;
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.757 2.343 2.343 3.757 6.585 8l-4.242 4.243 1.414 1.414L8 9.414l4.242 4.243 1.414-1.414L9.415 8l4.242-4.243-1.414-1.414L8 6.586 3.757 2.343Z' fill='%2300395C' fill-opacity='.8' opacity='.4'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 50%;
    }
  }
  .vs__selected-options {
    overflow: hidden;
    flex-wrap: wrap;
  }
  .vs__actions {
    flex-shrink: 0;
  }
  .vs__selected {
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    & + .vs__search {
      position: absolute;
    }
  }
  .vs__clear {
    display: none;
  }
  .vs--single.vs--open .vs__selected,
  .vs--single.vs--loading .vs__selected {
    position: static;
  }
  .vs__dropdown-option {
    padding: 12px 24px !important;
  }

  .vs__dropdown-option--highlight {
    background: #fa0056;
  }

  .dp__input_wrap::before {
    right: 47px;
  }

  .dp__input_wrap::after {
    right: 17px;
    top: 50%;
    width: 18px;
    height: 18px;
  }
}

.level-descr {
  margin-bottom: 5px;
  display: block;
}
</style>
