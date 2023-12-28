<template>
  <div class="filter-block">
    <div class="filter-wrapper">
      <button
        class="btn red-btn add-filter-btn"
        @click="showFilterModal = true"
      >
        Добавить фильтр
      </button>
    </div>
    <div class="filter-modal" v-if="showFilterModal" @click="closeModal">
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
        <div class="filter-items" v-if="firstLevelFilterSelected">
          <div class="filter-select" v-if="secondLevelIsSelect">
            <vSelect
              :options="dataForSecondLevelFilter"
              v-model="secondLevelFilterSelectedData"
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
            <span class="level-descr">Укажите желаемый порядок</span>
            <RanginVisual
              :optionsData="dataForSecondLevelFilter"
              @setSecondLevelData="secondLevelSelect"
            />
          </div>
          <div
            class="filter-select"
            v-if="firstLevelFilterSelected.questionType == 'range-selection'"
          >
            <span class="level-descr">Укажите интересующий вас диапазон</span>
            <RangeSelection
              :data="dataForSecondLevelFilter"
              @setSecondLevelData="secondLevelSelect"
            />
          </div>
          <div
            class="filter-select"
            v-if="firstLevelFilterSelected.questionType == 'date'"
          >
            Дата
            <DateSelection
              :isRange="!dataForSecondLevelFilter"
              :key="dataForSecondLevelFilter"
              @setSecondLevelData="secondLevelSelect"
            />
          </div>
          <div
            class="filter-select"
            v-if="firstLevelFilterSelected.questionType == 'custom-fields'"
          >
            Кастомные поля
          </div>
        </div>
        <button class="btn red-btn filter-modal__btn" @click="addFilter">
          Добавить фильтр
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import RanginVisual from "@/components/filterComponents/RanginVisual.vue";
import RangeSelection from "@/components/filterComponents/RangeSelection.vue";
import DateSelection from "@/components/filterComponents/DateSelection.vue";
import { ref, computed } from "vue";
import { useGeneralStatistics } from "@/stores/GeneralStatistics";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const store = useGeneralStatistics();
const showFilterModal = ref(false);
const firstLevelFilterSelected = ref(null);
const dataForSecondLevelFilter = ref(null);
const secondLevelFilterSelectedData = ref(null);

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

const dataForFirtsLevelFilter = store.pagesGeneralData[0].map((item) => {
  const params = item.PARAMS;
  const questionId = item.UF_ID_QUESTION;
  const questionType = item.UF_QUESTION_TYPE;
  const questionOptions = item.VARIANTS;
  let label = new QuillDeltaToHtmlConverter(item.PARAMS.NAME).convert();
  label = label.replace(/<\/?p>/g, "");
  const filterItem = {
    questionId,
    questionType,
    questionOptions,
    label,
    params,
  };

  // Определения типа даты (одиночная или диапазон)
  if (item.UF_QUESTION_TYPE === "date") {
    const isSigleDate = Date.parse(item.ANSWERS.USER_ANSWER[0].TEXT);
    if (isSigleDate) {
      filterItem.isSigleDateItem = true;
    }
  }
  return filterItem;
});

const firstLevelSelect = (data) => {
  console.log("first-level-select", data);
  firstLevelFilterSelected.value = data;
  dataForSecondLevelFilter.value = null;
  secondLevelFilterSelectedData.value = null;
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

    dataForSecondLevelFilter.value = allCustomFields.reduce((acc, item) => {
      if (item.UF_ID_QUESTION == data.questionOptions[0].UF_ID_QUESTION) {
        acc.push({
          id: item.UF_ID_FIELD,
          type: item.UF_ID_TYPE_FIELD,
          label: item.UF_VALUE_FIELD,
        });
      }
      return acc;
    }, []);

    console.log(dataForSecondLevelFilter);
  }
};
const secondLevelSelect = (data) => {
  console.log(data);
  secondLevelFilterSelectedData.value = data;
};

const closeModal = (e) => {
  const target = e.target;
  if (
    (target.closest(".filter-modal") &&
      !target.closest(".filter-modal__content")) ||
    target.closest(".filter-modal__close")
  ) {
    showFilterModal.value = false;
    firstLevelFilterSelected.value = null;
    secondLevelFilterSelectedData.value = null;
    dataForSecondLevelFilter.value = null;
  }
};

const addFilter = () => {
  const filterItemData = {
    questionId: firstLevelFilterSelected.value.questionId,
    questionType: firstLevelFilterSelected.value.questionType,
    answerIdes: [],
  };
  console.log(firstLevelFilterSelected.value);
  console.log(secondLevelFilterSelectedData.value);
};
</script>

<style lang="scss">
.filter-modal {
  .vs--multiple {
    .vs__selected {
      padding: 4px 8px 4px 12px !important;
      border-radius: 4px;
      background-color: rgba(0, 66, 105, 0.07) !important;
      border: none;
      display: flex;
      align-items: center;
      font-size: 16px !important;
      margin-right: 4px;
      width: fit-content;
      white-space: wrap;
    }
    .vs__selected-options {
      display: flex;
      gap: 4px;
    }

    .vs__deselect {
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
}

.level-descr {
  margin-bottom: 5px;
  display: block;
}
</style>
