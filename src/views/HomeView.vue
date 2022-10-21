<template>
  <form class="main-form">
    <section class="win-section">
      <div class="win-section-container">
        <p class="win-title">금주의 당첨번호</p>
        <div class="win-number-container">
          <span class="win-number win-number--one">5</span>
          <span class="win-number win-number--two">49</span>
          <span class="win-number win-number--three">17</span>
          <span class="win-number win-number--four">9</span>
          <span class="win-number win-number--five">33</span>
          <span class="win-number win-number--six">35</span>
        </div>
      </div>
    </section>

    <section class="form-section">
      <div class="input-container input-container--gameTimes">
        <div class="input-box">
          <label>게임 횟수</label>
          <input type="number" />
        </div>
        <div class="reserved-box">
          <span class="reserved-value reserved-value--game-times"></span>
        </div>
      </div>
      <div class="input-container">
        <div class="input-box">
          <label>포함 번호</label>
          <input type="number" />
        </div>
        <div class="reserved-box"></div>
      </div>
      <div class="input-container">
        <div class="input-box">
          <label>제외 번호</label>
          <input type="number" />
        </div>
        <div class="reserved-box"></div>
      </div>
    </section>
    <div class="submit-container">
      <input class="submit-input" type="submit" value="보내기" />
    </div>
  </form>
</template>

<script>
// @ is an alias to /src

export default {
  data: () => ({
    lastLotto: [],
  }),
  created() {},
  mounted() {},
  method: {},
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
