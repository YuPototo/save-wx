import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
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
    fetchSavings({commit}) {
      console.log('fetch saving called')
      const request = uni.request({
        url: 'http://localhost:3000/qinyu',
        success: (res) => {
          if (res.statusCode == 200) {
            commit('SET_SAVING', res.data.savings)
          }
        }
      })
    },
    addSaving({commit}, saving) {
      const newSaving = {...saving, time:Date.now()}
      const newSavings = _.cloneDeep(state.savings)
      newSavings.unshift(newSaving)
      const data = {
        username: 'qinyu',
        savings: newSavings
      }
      const request = uni.request({
        url: 'http://localhost:3000/',
        method: 'POST',
        header: {
          'content-type': 'application/json', 
        },
        data: data,
        success: (res) => {
          if (res.statusCode == 200) {
            commit('ADD_SAVING', newSaving)
          }
        }
      })
    },
    editSaving({commit}, savingToEdit) {
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
      const request = uni.request({
        url: 'http://localhost:3000/',
        method: 'POST',
        header: {
          'content-type': 'application/json', 
        },
        data: data,
        success: (res) => {
          if (res.statusCode == 200) {
            commit('EDIT_SAVING', savingToEdit)
          }
        }
      })
    },
    removeSaving({commit}, savingToDelete) {
      const newSavings = _.cloneDeep(state.savings)
      let index = newSavings.findIndex(
        saving => saving.time === savingToDelete.time
      )
      newSavings.splice(index, 1)
      const data =  {
        username: 'qinyu', 
        savings: newSavings
      }
      const request = uni.request({
        url: 'http://localhost:3000/',
        method: 'POST',
        header: {
          'content-type': 'application/json', 
        },
        data: data,
        success: (res) => {
          if (res.statusCode == 200) {
            commit('REMOVE_SAVING', savingToDelete)
          }
        }
      })
    }
  }
});
