import Vue from "vue";
import Vuex from "vuex";
import { DnaStructureDto } from "@/models";

Vue.use(Vuex);
const state = {
  dnaStringList: [],
};

const mutations = {
  updateDnaStringList(state: any, payload: Array<DnaStructureDto>) {
    console.log(payload);
    state.dnaStringList = payload;
  }
};

export const store = new Vuex.Store({
  state,
  mutations
});
