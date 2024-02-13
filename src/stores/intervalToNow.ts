import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2;
    }
  },

  actions: {
    getAllIntervalToNow() {
      this.counter++;
    }
  }
});
