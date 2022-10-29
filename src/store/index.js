import { createStore } from "vuex";

// state, getters, mutations, actions, modules
export default createStore({
  state: {
    appVersion: "",
    lottos: [],
    lastLottos: [],
    result: [],
    includeArr: [],
    excludeArr: [],
    deviation: 0,
    playGame: 1,
  },
  getters: {
    getAppVersion(state) {
      return state.appVersion;
    },

    getLottos(state) {
      return state.lottos;
    },
    getLastLottos(state) {
      return state.lastLottos;
    },
    getResult(state) {
      return state.result;
    },
    getIncludeArr(state) {
      return state.includeArr;
    },
    getExcludeArr(state) {
      return state.excludeArr;
    },
    getDeviation(state) {
      return state.deviation;
    },
    getPlayGame(state) {
      return state.playGame;
    },
  },
  mutations: {
    setAppVersion(state, value) {
      state.appVersion = value;
    },
    setLottos(state, value) {
      state.lottos = value;
    },
    setLastLottos(state, value) {
      state.lastLottos = value;
    },
    setResult(state, value) {
      state.result = value;
    },
    setIncludeArr(state, value) {
      state.includeArr = value;
    },
    setExcludeArr(state, value) {
      state.excludeArr = value;
    },
    setDeviation(state, value) {
      state.deviation = value;
    },
    setPlayGame(state, value) {
      state.playGame = value;
    },
    reSet(state) {
      state.playGame = 1;
      state.deviation = 0;
      state.excludeArr = [];
      state.includeArr = [];
      state.result = [];
    },
  },
});
