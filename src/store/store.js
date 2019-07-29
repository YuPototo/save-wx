import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  username: "",
  savings: []
};

export default new Vuex.Store({
  state,
  getters: {
    savingsToday: state => {
      let now = new Date();
      let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let timestamp = startOfDay / 1000;

      return state.savings.filter(saving => saving.time >= timestamp)
    }
  },
  mutations: {
    SET_SAVING: (state, savings) => state.savings = savings,
    ADD_SAVING: (state, saving) => state.savings.unshift(saving),
    EDIT_SAVING: (state, savingToEdit) => {
      const index = state.savings.findIndex(
        saving => saving.time == savingToEdit.time
      );
      if (index !== -1) {
        state.savings.splice(index, 1, savingToEdit);
      }
    },
    REMOVE_SAVING: (state, savingToDelete) => {
      const index = state.savings.findIndex(
        saving => saving.time == savingToDelete.time
      );
      if (index !== -1) {
        state.savings.splice(index, 1);
      }
    }
  },
  actions: {
    async fetchSavings({commit}) {
      let [error, res] = await uni.request({
          url: 'http://localhost:3000/qinyu'
      })
      commit('SET_SAVING', res.data.savings)
    },
    async addSaving({commit}, saving) {
      const newSaving = {...saving, time:Date.now()}
      const newSavings = _.cloneDeep(state.savings)
      newSavings.unshift(newSaving)
      const data = {
        username: 'qinyu',
        savings: newSavings
      }
      await uni.request({
        url: 'http://localhost:3000/',
        method: 'POST',
        header: {
          'content-type': 'application/json', 
        },
        data: data
      })
      commit('ADD_SAVING', newSaving)
    },
    async editSaving({commit}, savingToEdit) {
      const newSavings = _.cloneDeep(state.savings)
      const index = newSavings.findIndex(
        saving => saving.time == savingToEdit.time
      );
      if (index !== -1) {
        newSavings.splice(index, 1, savingToEdit);
      }
      const data = {
        username: 'qinyu',
        savings: newSavings
      }
      await uni.request({
        url: 'http://localhost:3000/',
        method: 'POST',
        header: {
          'content-type': 'application/json', 
        },
        data: data
      })
      commit('EDIT_SAVING', savingToEdit)
    },
    async removeSaving({commit}, savingToDelete) {
      const newSavings = _.cloneDeep(state.savings)
      let index = newSavings.findIndex(
        saving => saving.time === savingToDelete.time
      )
      newSavings.splice(index, 1)
      const data =  {
        username: 'qinyu', 
        savings: newSavings
      }
      await uni.request({
        url: 'http://localhost:3000/',
        method: 'POST',
        header: {
          'content-type': 'application/json', 
        },
        data: data
      })
      commit('REMOVE_SAVING', savingToDelete)
    }
  }
});
