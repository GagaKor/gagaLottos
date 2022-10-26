<template>
  <div class="startDiv">
    <button class="startBtn" @click="startBtn()">Start</button>
  </div>
</template>

<script>
export default {
  methods: {
    startBtn() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.startDiv {
  justify-content: center;
  display: flex;
  align-items: center;
  height: 100vh;
}
.startBtn {
  display: flex;
  width: 10.5em;
  height: 3em;
  border-radius: 0.4em;
  background-color: rgba(142, 149, 152, 0.3);
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
}
</style>
