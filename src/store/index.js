import { createStore } from "vuex";

// state, getters, mutations, actions, modules
export default createStore({
  state: {
    appVersion: "",
    lottos: [],
    lastLottos: [],
    result: [],
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
  },
});
