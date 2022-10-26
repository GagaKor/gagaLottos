<template>
  <div class="wrapper">
    <div class="keyRow" v-for="keyRow in keyRows" v-bind:key="keyRow">
      <template v-for="keyText in keyRow" v-bind:key="keyText">
        <button :class="keyBtn" @mouseup="clickKey(keyText)">
          {{ keyText }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    needKeyChange: Boolean,
  },
  data: () => ({
    keyRows: [
      [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
      ],
    ],
  }),
  mounted() {},
  methods: {
    clickKey(keyText) {
      this.$parent.inputText(keyText);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  .keyRow {
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(5, 1fr);
    gap: 3px;
    padding: 0 100px;
    .keyBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20px;
      width: 20px;
      font-weight: bold;
      font-size: 14px;
      background-color: #ffffff;

      &:hover {
        background-color: none;
      }

      &:focus {
        outline: none;
      }

      &:active {
        background-color: #464646;
      }

      &.resetBtn {
        font-size: 38px;
      }

      img {
        width: 48px;
        height: 48px;
      }
    }
  }
}
</style>
