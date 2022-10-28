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
  },
});
