<template>
  <div class="poll-item">
    <div class="poll-item__head">
      <div class="poll-item__num">{{ props.indexNumber }}</div>
      <div class="poll-item__name">{{ pollItemType }}</div>
    </div>
    <div class="poll-item__question" v-html="questionText"></div>
    <div class="answers-block">
      <div
        class="answers-block__row"
        :class="{ current: isUserAnswer(questionOption.UF_ID_VARIANT) }"
        v-if="questionHasVariants"
        v-for="questionOption in questionOptions"
      >
        {{ questionOption?.UF_VARIANT_VALUE }}
      </div>
      <div
        class="answers-block__row"
        v-if="questionData.UF_QUESTION_TYPE == 'ranging'"
        v-for="(questionOption, index) in questionOptions"
      >
        <strong>{{ index + 1 }}. &nbsp; </strong>
        {{ questionOption?.UF_VARIANT_VALUE }}
      </div>
      <div
        class="answers-block__row"
        v-if="questionData.UF_QUESTION_TYPE == 'date'"
      >
        <input
          type="text"
          :value="questionOptions"
          readonly
          class="mofal-filter-input"
        />
      </div>

      <div v-if="questionData.UF_QUESTION_TYPE == 'range-selection'">
        <div class="range-slider-visual">
          <div class="range-slider__min">
            {{ questionOptions.min }}
          </div>
          <Slider
            v-model="questionOptions.userSelect"
            :min="questionOptions.min"
            :max="questionOptions.max"
            disabled
          />
          <div class="range-slider__max">
            {{ questionOptions.max }}
          </div>
        </div>
      </div>

      <div
        class="answers-block__row"
        v-if="questionData.UF_QUESTION_TYPE == 'custom-fields'"
        v-for="questionOption in questionOptions"
      >
        <strong>{{ questionOption.field }} </strong> &nbsp;:
        {{ questionOption.value }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { customFormattedDate } from "@/helpers/customDateFormatter";
import Slider from "@vueform/slider";

const props = defineProps({
  data: Object,
  indexNumber: Number,
});

const questionData = props.data;
const pollItemType = questionData.PARAMS.TYPENAME;
const questionText = new QuillDeltaToHtmlConverter(
  questionData.PARAMS.NAME,
  {}
).convert();
let questionOptions;
questionOptions = questionData.VARIANTS;
if (questionData.UF_QUESTION_TYPE === "ranging") {
  const ANSWERS = Array.isArray(questionData.ANSWERS)
    ? questionData.ANSWERS
    : Object.values(questionData.ANSWERS);
  const variants = ANSWERS.map((el) => {
    const VARIANTS =
      Array.isArray(questionData.VARIANTS) || questionData.VARIANTS === null
        ? questionData.VARIANTS
        : Object.values(questionData.VARIANTS);

    return VARIANTS.find((item) => item.UF_ID_VARIANT === el.UF_ID_USER_ANSWER);
  });
  questionOptions = variants;
}
if (questionData.UF_QUESTION_TYPE === "range-selection") {
  questionOptions = {
    min: questionData.PARAMS.GENERAL_RANGE_START,
    max: questionData.PARAMS.GENERAL_RANGE_END,
    userSelect: [
      questionData.ANSWERS[0].UF_RANGE_VALUE,
      questionData.ANSWERS[1].UF_RANGE_VALUE,
    ],
  };
}

if (questionData.UF_QUESTION_TYPE === "date") {
  const str = questionData.ANSWERS[0].UF_ID_USER_ANSWER;
  if (Date.parse(str)) {
    questionOptions = new Date(str).toLocaleDateString("ru-RU", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  } else {
    questionOptions = str
      .split("-")
      .map((el) =>
        new Date(el).toLocaleDateString("ru-RU", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })
      )
      .join(" - ");
  }
}
if (questionData.UF_QUESTION_TYPE === "custom-fields") {
  questionOptions = questionData.ANSWERS.map((el) => ({
    field: el.UF_VALUE_FIELD,
    value: el.UF_FILED_ANSWER,
  }));
  console.log(questionOptions);
}

const userAnswer = Array.isArray(questionData.ANSWERS)
  ? questionData.ANSWERS
  : Object.values(questionData.ANSWERS);

const questionHasVariants = [
  "single-choice",
  "drop-down-list",
  "multiple-drop-down-list",
  "multiple-choice",
].includes(questionData.UF_QUESTION_TYPE);

const isUserAnswer = (itemId) =>
  userAnswer.find((el) => el.UF_ID_USER_ANSWER === itemId);
</script>

<style lang="scss">
.answers-block {
  padding: 30px 18px 30px 25px;
  border-radius: 8px;
  border: 1px solid #c2cfe0;
  background: #fff;
}

.answers-block__row {
  padding: 10px 0;
  position: relative;
  display: flex;
  align-items: flex-start;
  &:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
  &.current {
    color: green;
    &::after {
      margin-left: auto;
      flex-shrink: 0;
      margin-top: 3px;
      content: "";
      width: 18px;
      height: 18px;
      display: block;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='19' viewBox='0 0 18 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect y='0.5' width='18' height='18' rx='9' fill='%2330C02D'/%3e%3cpath d='M5 10.2241L6.48101 11.7562C6.87409 12.1629 7.52591 12.1629 7.91899 11.7562L13 6.5' stroke='white' stroke-linecap='round'/%3e%3c/svg%3e ");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
}
</style>
