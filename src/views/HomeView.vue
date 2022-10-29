<template>
  <div class="homeBtnWrap">
    <font-awesome-icon icon="house" class="house" @click="goHome()" />
  </div>

  <form class="main-form">
    <section class="win-section">
      <div class="win-section-container">
        <p class="win-title">This week's lotto</p>
        <div class="win-number-container">
          <span class="win-number win-number--one">{{ thisWeekLotto[0] }}</span>
          <span class="win-number win-number--two">{{ thisWeekLotto[1] }}</span>
          <span class="win-number win-number--three">{{
            thisWeekLotto[2]
          }}</span>
          <span class="win-number win-number--four">{{
            thisWeekLotto[3]
          }}</span>
          <span class="win-number win-number--five">{{
            thisWeekLotto[4]
          }}</span>
          <span class="win-number win-number--six">{{ thisWeekLotto[5] }}</span>
        </div>
      </div>
    </section>

    <section class="form-section">
      <div class="input-container input-container--gameTimes">
        <div class="input-box">
          <label>Number of games</label>
          <input
            type="number"
            v-model="playGames"
            @input="playGamesChange($event)"
          />
        </div>
      </div>
      <div class="input-container input-container--gameTimes">
        <div class="input-box">
          <label>Deviation</label>
          <input type="number" v-model="deviation" @input="changeDev($event)" />
        </div>
      </div>
      <div class="input-container">
        <div class="input-box">
          <label>Included Number</label>
          <input
            type="text"
            v-model="include"
            @keyup.enter="includeFn($event)"
            placeholder="Enter Number"
            :disabled="disbleInclude"
          />
        </div>
        <div class="reserved-box">
          <div
            v-for="num in includeArray"
            v-bind:key="num"
            class="reserved-value"
            @click="removeinclude(num)"
          >
            {{ num }}
          </div>
        </div>
      </div>
      <div class="input-container">
        <div class="input-box">
          <label>Exclusion number</label>
          <input
            type="text"
            v-model="exclude"
            @keyup.enter="excludeFn($event)"
            placeholder="Enter Number"
          />
        </div>
        <div class="reserved-box">
          <div
            v-for="num in excludeArray"
            v-bind:key="num"
            class="reserved-value"
            @click="removeExclude(num)"
          >
            {{ num }}
          </div>
        </div>
      </div>
    </section>
  </form>
  <div class="submit-container">
    <input
      class="submit-input"
      type="submit"
      @click="getLottos"
      value="Receive"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import { getThisWeekLotto, makeLotto } from "@/utils/lottos";
import store from "@/store";

export default {
  data: () => ({
    thisWeekLotto: [],
    playGames: 1,
    includeArray: [],
    excludeArray: [],
    include: null,
    exclude: null,
    disbleInclude: false,
    deviation: 0,
  }),
  async created() {
    this.playGames = store.getters.getPlayGame;
    this.deviation = store.getters.getDeviation;
    this.includeArray = store.getters.getIncludeArr;
    this.excludeArray = store.getters.getExcludeArr;
  },
  async mounted() {
    this.thisWeekLotto = await getThisWeekLotto();
  },
  methods: {
    playGamesChange(event) {
      if (event.target.value < 1) {
        this.playGames = 1;
      } else if (event.target.value > 5) {
        this.playGames = 5;
      } else {
        this.playGames = Number(event.target.value);
      }
    },
    includeFn(event) {
      if (this.includeArray.length === 6) {
        this.disbleInclude = true;
        this.include = "Input Number Is Only 6";
        return;
      }
      this.include = event.target.value;
      if (
        this.include > 0 &&
        this.include < 46 &&
        !this.includeArray.includes(Number(this.include)) &&
        !this.excludeArray.includes(Number(this.include))
      )
        this.includeArray.push(Number(this.include));
      this.includeArray.sort((a, b) => a - b);
      this.include = "";
    },
    excludeFn(event) {
      this.exclude = event.target.value;
      if (
        this.exclude > 0 &&
        this.exclude < 46 &&
        !this.excludeArray.includes(Number(this.exclude)) &&
        !this.includeArray.includes(Number(this.exclude))
      )
        this.excludeArray.push(Number(this.exclude));
      this.excludeArray.sort((a, b) => a - b);
      this.exclude = "";
    },
    removeExclude(num) {
      this.excludeArray.splice(this.excludeArray.indexOf(num), 1);
    },
    removeinclude(num) {
      if (this.includeArray.length === 6) {
        this.disbleInclude = false;
        this.include = "";
      }
      this.includeArray.splice(this.includeArray.indexOf(num), 1);
    },
    changeDev(event) {
      if (Number(event.target.value > 200) || Number(event.target.value < 0)) {
        this.deviation = 0;
        return;
      }
      this.deviation = Number(event.target.value);
    },
    paserProxy(proxy) {
      return JSON.parse(JSON.stringify(proxy));
    },
    async getLottos() {
      if (!this.deviation) this.deviation = 0;

      store.commit("setIncludeArr", this.includeArray);
      store.commit("setExcludeArr", this.excludeArray);
      store.commit("setDeviation", this.deviation);
      store.commit("setPlayGame", this.playGames);
      const result = await makeLotto(
        this.playGames,
        this.paserProxy(this.includeArray),
        this.paserProxy(this.excludeArray),
        this.deviation
      );
      store.commit("setResult", result);

      this.$router.push("/result");
    },
    goHome() {
      store.commit("reSet");
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&family=Shalimar&display=swap");

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
.homeBtnWrap {
  position: absolute;
  margin: 10px;
}
.house {
  font-size: 20px;
  cursor: pointer;
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
  font-family: "Roboto", sans-serif;

  display: flex;
  align-items: center;
  margin: 1em 0;
  label {
    width: 160px;
    margin-right: 1em;
    font-weight: 500;
  }
  input {
    border: 1px solid rgb(9, 254, 107);
    text-decoration: none;
    outline: none;
    border-radius: 0.3em;
    padding: 0.3em;
  }
}
label {
  margin-right: 1em;
  font-weight: 500;
}
input {
  border: none;
  text-decoration: none;
  outline: none;
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
  background-color: rgba(142, 149, 152, 0.3);
  padding: 5px;
}
.reserved-value--game-times {
  display: inline;
  margin: 0;
  cursor: initial;
}
.submit-container {
  position: absolute;
  bottom: 3%;
  width: 100%;
  left: 0;
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
</style>
