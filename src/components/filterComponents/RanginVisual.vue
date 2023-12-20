<template>
  <div class="rangin-visual">
    <draggable
      v-model="optionsList"
      v-bind="pollItemsDragOptionsInSidebar"
      :handle="daraggableHandler"
      @start="isDraggingOption = true"
      @end="isDraggingOption = false"
    >
      <transition-group
        type="transition"
        :name="isDraggingOption ? 'flip-option-list' : 'fade-range'"
      >
        <div
          class="rangin-visual__item"
          v-for="(variant, index) in optionsList"
          :key="variant.id"
        >
          <div class="rangin-visual__content">
            <div class="rangin-visual__dragg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4.00003C13.1046 4.00003 14 3.10459 14 2.00002C14 0.895438 13.1046 0 12 0C10.8954 0 10 0.895438 10 2.00002C10 3.10459 10.8954 4.00003 12 4.00003Z"
                  fill="#C2CFE0"
                />
                <path
                  d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                  fill="#C2CFE0"
                />
                <path
                  d="M12 24.0001C13.1046 24.0001 14 23.1046 14 22C14 20.8954 13.1046 20 12 20C10.8954 20 10 20.8954 10 22C10 23.1046 10.8954 24.0001 12 24.0001Z"
                  fill="#C2CFE0"
                />
              </svg>
            </div>
            <div class="rangin-visual__num">{{ index + 1 }}</div>
            <div class="rangin-visual__text">{{ variant.value }}</div>
          </div>
          <div class="rangin-visual__btns">
            <div
              class="rangin-visual__top-btn"
              @click="rangeVariant(index, 'top')"
            >
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4138 20.586H22.5858C22.7836 20.586 22.9769 20.5273 23.1413 20.4174C23.3057 20.3075 23.4339 20.1514 23.5095 19.9687C23.5852 19.786 23.605 19.5849 23.5664 19.391C23.5279 19.197 23.4327 19.0189 23.2928 18.879L17.7068 13.293C17.5193 13.1056 17.265 13.0002 16.9998 13.0002C16.7347 13.0002 16.4804 13.1056 16.2928 13.293L10.7068 18.879C10.567 19.0189 10.4718 19.197 10.4333 19.391C10.3947 19.5849 10.4145 19.786 10.4902 19.9687C10.5658 20.1514 10.694 20.3075 10.8584 20.4174C11.0228 20.5273 11.2161 20.586 11.4138 20.586Z"
                  fill="#868DA4"
                />
                <rect
                  x="1"
                  y="1"
                  width="31"
                  height="31"
                  rx="7"
                  stroke="#868DA4"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div
              class="rangin-visual__bottom-btn"
              @click="rangeVariant(index, 'bottom')"
            >
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4138 14H22.5858C22.7836 14 22.9769 14.0587 23.1413 14.1686C23.3057 14.2785 23.4339 14.4346 23.5095 14.6173C23.5852 14.8 23.605 15.0011 23.5664 15.195C23.5279 15.389 23.4327 15.5671 23.2928 15.707L17.7068 21.293C17.5193 21.4805 17.265 21.5858 16.9998 21.5858C16.7347 21.5858 16.4804 21.4805 16.2928 21.293L10.7068 15.707C10.567 15.5671 10.4718 15.389 10.4333 15.195C10.3947 15.0011 10.4145 14.8 10.4902 14.6173C10.5658 14.4346 10.694 14.2785 10.8584 14.1686C11.0228 14.0587 11.2161 14 11.4138 14Z"
                  fill="#868DA4"
                />
                <rect
                  x="1"
                  y="1"
                  width="31"
                  height="31"
                  rx="7"
                  stroke="#868DA4"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";

export default {
  components: {
    draggable: VueDraggableNext,
  },
  props: {
    optionsData: { type: Object },
  },
  data() {
    return {
      optionsList: [],
      isDraggingOption: false,
      daraggableHandler: "",
    };
  },
  computed: {
    pollItemsDragOptionsInSidebar() {
      return {
        animation: 200,
        group: `rangeGroup`,
        scrollSensitivity: 200,
        forceFallback: true,
        disabled: false,
        ghostClass: "ghost-potion",
        sort: true,
      };
    },
  },
  methods: {
    rangeVariant(index, type) {
      let nextIndex;
      if (type == "bottom") {
        if (index === this.optionsList.length - 1) {
          nextIndex = 0;
        } else {
          nextIndex = index + 1;
        }
      }
      if (type == "top") {
        if (index === 0) {
          nextIndex = this.optionsList.length - 1;
        } else {
          nextIndex = index - 1;
        }
      }
      function swapElements(arr, index, nextIndex) {
        const temp = arr[index];
        arr[index] = arr[nextIndex];
        arr[nextIndex] = temp;
      }
      swapElements(this.optionsList, index, nextIndex);
      const newOptionList = [...this.optionsList];
      this.optionsList = newOptionList;
    },
  },
  watch: {
    optionsList() {
      const data = [...this.optionsList].map((item) => {
        return {
          id: item.id,
          value: item.value,
        };
      });
      this.$emit("setSecondLevelData", data);
    },
  },

  beforeMount() {
    console.log(this.optionsData);
    this.optionsList = [...this.optionsData].map((variant) => {
      return {
        id: variant.UF_ID_VARIANT,
        value: variant.UF_VARIANT_VALUE,
      };
    });
  },
};
</script>

<style lang="scss" scoped>
.rangin-visual__text {
  &::selection {
    background-color: transparent;
  }
}

.rangin-visual__dragg {
  flex-shrink: 0;
  width: 44px;
  height: 100%;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rangin-visual__num {
  margin: 0 10px;
  color: #262b31;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
  &::selection {
    background-color: transparent;
  }
}

.rangin-visual__item {
  &.correct {
    .rangin-visual__content::after {
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='18' height='18' rx='9' fill='%2330C02D'/%3e%3cpath d='M5 9.72414L6.48101 11.2562C6.87409 11.6629 7.52591 11.6629 7.91899 11.2562L13 6' stroke='white' stroke-linecap='round'/%3e%3c/svg%3e ");
    }
  }
  &.uncorrect {
    .rangin-visual__content::after {
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='18' height='18' rx='9' fill='%23DC1F1F'/%3e%3cpath d='M6 12L12 6' stroke='white' stroke-linecap='round'/%3e%3cpath d='M12 12L6 6' stroke='white' stroke-linecap='round'/%3e%3c/svg%3e ");
    }
  }
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #262b31;
  font-size: 18px;
  font-weight: 400;
  line-height: 140%; /* 25.2px */
  margin-bottom: 5px;
  border-radius: 4px;
  position: relative;
  width: 100%;
  border: 1px solid rgba(0, 66, 105, 0.28);
  overflow: hidden;
  &:hover {
    border-color: #fa0056 !important;
    transition: border 0.2s ease-in-out;
  }
  &::before {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    content: "";
    background-color: #fa0056;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }
}
.rangin-visual__content {
  cursor: grab;
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 10px 20px;
  padding-right: 25px;
  display: flex;
  align-items: center;
  &::after {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    content: "";
  }
}
.rangin-visual__btns {
  padding: 10px 20px;
  padding-left: 10px;
  margin-left: auto;
  flex-shrink: 0;
}
.rangin-visual__top-btn,
.rangin-visual__bottom-btn {
  cursor: pointer;
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rangin-visual__top-btn {
  margin-bottom: 4px;
}

.ghost-potion {
  margin-right: 0;
  margin-left: 0;
  & > * {
    opacity: 0;
  }
  border-style: dashed;
  border-color: #fa0056;
}
.sortable-drag {
  opacity: 1 !important;
  background: #ecf4ff;
  &::before {
    opacity: 1;
    visibility: visible;
  }
  .rangin-visual__text,
  .rangin-visual__num {
    color: #fff;
  }
  svg path {
    stroke: #fff;
    fill: #fff;
  }
  svg rect {
    stroke: #fff;
  }
}
</style>
