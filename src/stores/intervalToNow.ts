import { defineStore } from 'pinia';
import { IntervalToNow } from 'src/types/intervalToNow';

export const useIntervalToNowStore = defineStore('interval_to_now', {
  state: () => ({
    showAddIntervalDialog: false,
    showEditIntervalDialog: false,
    editedInterval: {} as IntervalToNow,
  }),
});
