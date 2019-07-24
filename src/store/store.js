import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  savings: [
    {
      wantBuy: {
        name: '可乐',
        cost: 5
      },
      time: 1563954662
    },
    {
      wantBuy: {
        name: '星巴克',
        cost: 30
      },
      didBuy: {
        name: '全家咖啡',
        cost: 5
      },
      time: 1563954665
    },
    {
      wantBuy: {
        name: '盒饭',
        cost: 8
      },
      time: 1563580800
    }
  ]
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
        saving => saving.time === savingToDelete.time
      );
      state.savings.splice(index, 1);
    }
  },
  actions: {
    addSaving: (context, saving) => context.commit("ADD_SAVING", {...saving, time:Date.now()} ),
    editSaving: (context, saving) => context.commit("EDIT_SAVING", saving),
    removeSaving: (context, saving) => context.commit("REMOVE_SAVING", saving)
  }
});
