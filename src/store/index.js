import { createStore } from "vuex";

// state, getters, mutations, actions, modules
export default createStore({
  state: {
    lottos: [],
    lastLottos: [],
    result: [],
  },
  getters: {
    getLottos(state) {
      return state.lottos;
    },
    getLastLottos(state) {
      return state.lottos;
    },
    getResult(state) {
      return state.result;
    },
  },
  mutations: {
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
