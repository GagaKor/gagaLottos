<template>
  <form class="main-form">
    <section class="win-section">
      <div class="win-section-container">
        <p class="win-title">당첨번호</p>
        <div
          class="win-number-container"
          v-for="arr in result"
          v-bind:key="arr"
        >
          <span class="win-number win-number--one">{{ arr[0][0] }}</span>
          <span class="win-number win-number--two">{{ arr[0][1] }}</span>
          <span class="win-number win-number--three">{{ arr[0][2] }}</span>
          <span class="win-number win-number--four">{{ arr[0][3] }}</span>
          <span class="win-number win-number--five">{{ arr[0][4] }}</span>
          <span class="win-number win-number--six">{{ arr[0][5] }}</span>
        </div>
      </div>
    </section>
  </form>
  <button @click="goBack()">처음으로</button>
</template>

<script>
import store from "@/store";
export default {
  data: () => ({
    result: [],
  }),
  created() {
    this.result = store.getters.getResult;
  },
  mounted() {},

  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
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
  font-size: 1.4em;
  margin-bottom: 0.6em;
  color: #5b6860;
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
}
</style>
