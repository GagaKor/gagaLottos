<template>
  <div class="homeBtnWrap">
    <font-awesome-icon icon="house" class="house" @click="goHome()" />
  </div>
  <form class="main-form">
    <section class="win-section">
      <div class="win-section-container">
        <p class="win-title">Recommended Number</p>
        <div
          class="win-number-container"
          v-for="(arr, idx) in result"
          v-bind:key="idx"
        >
          <span class="number-span"
            >{{ idx + 1 }}&nbsp;&nbsp;
            <font-awesome-icon icon="forward" class="forward" />
          </span>

          <span class="win-number win-number--one">{{ arr[0] }}</span>
          <span class="win-number win-number--two">{{ arr[1] }}</span>
          <span class="win-number win-number--three">{{ arr[2] }}</span>
          <span class="win-number win-number--four">{{ arr[3] }}</span>
          <span class="win-number win-number--five">{{ arr[4] }}</span>
          <span class="win-number win-number--six">{{ arr[5] }}</span>
          <span class="refresh-btn" @click="refreshLottos(idx)">
            <font-awesome-icon icon="rotate" />
          </span>
        </div>
      </div>
    </section>
  </form>
  <div class="submit-container">
    <input class="submit-input" type="submit" value="Back" @click="goBack()" />
  </div>
</template>

<script>
import store from "@/store";
import { makeLotto } from "../utils/lottos";
export default {
  data: () => ({
    result: [],
    includeArray: [],
    excludeArray: [],
    deviation: 0,
  }),
  created() {
    this.result = this.paserProxy(store.getters.getResult);
    this.includeArray = store.getters.getIncludeArr;
    this.excludeArray = store.getters.getExcludeArr;
    this.deviation = store.getters.getDeviation;
  },
  mounted() {},

  methods: {
    goBack() {
      this.$router.push("/home");
    },
    paserProxy(proxy) {
      if (!proxy) return [];
      return JSON.parse(JSON.stringify(proxy));
    },
    async refreshLottos(idx) {
      const lotto = await makeLotto(
        1,
        this.paserProxy(this.includeArray),
        this.paserProxy(this.excludeArray),
        this.deviation
      );
      const beforeLottos = this.paserProxy(this.result);
      beforeLottos.splice(idx, 1, lotto[0]);
      this.result = beforeLottos;
    },
    goHome() {
      store.commit("reSet");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
.homeBtnWrap {
  position: absolute;
  margin: 10px;
}
.house {
  font-size: 20px;
  cursor: pointer;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgb(246, 240, 240);
}
main {
  width: 30%;
  height: 60%;
  min-width: 450px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #dfd3c3;
  border-radius: 30px;
}
.main-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}
.win-section {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}
.win-section-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.win-title {
  font-weight: bold;
  font-size: 3em;
  margin-bottom: 0.6em;
  color: #5b6860;
  font-family: "Shalimar", "Franklin Gothic Medium", "Courier New", Courier,
    monospace;
}
.win-number-container {
  display: flex;
  justify-content: space-between;
  width: 70%;
}
.win-number {
  display: flex;
  width: 2.5em;
  height: 2.5em;
  border-radius: 0.4em;
  background-color: rgba(142, 149, 152, 0.3);
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
  height: 48px;
  margin-bottom: 15px;
}
.number-span {
  display: flex;
  width: 2.5em;
  height: 2.5em;
  border-radius: 0.4em;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
  height: 48px;
  margin-bottom: 15px;
}
.refresh-btn {
  display: flex;
  width: 2.5em;
  height: 2.5em;
  border-radius: 0.4em;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
  height: 48px;
  margin-bottom: 15px;
  cursor: pointer;
}
.form-section {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
}
.input-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.input-box {
  margin: 1em 0;
}
label {
  margin-right: 1em;
  font-weight: 500;
}
input {
  text-decoration: none;
  outline: none;
  border: none;
  border-radius: 0.3em;
  padding: 0.3em;
}
.reserved-box {
  height: 25px;
}
.reserved-value {
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
  margin: 0 0.2em;
}
.reserved-value--game-times {
  display: inline;
  margin: 0;
  cursor: initial;
}
.submit-input {
  padding: 0.4em 1.6em;
  font-size: 1.1em;
  cursor: pointer;
  background-color: #c6c6c6;
  font-family: "Shalimar", "Franklin Gothic Medium", "Courier New", Courier,
    monospace;
  font-weight: bold;
}
.submit-container {
  position: absolute;
  bottom: 3%;
  width: 100%;
  left: 0;
}
</style>
