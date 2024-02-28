import { defineStore } from 'pinia';
import { VehicleServiceRecordsWithContacted } from 'src/types/vehicleServiceRecords';

export const useReminderStore = defineStore('reminder', {
  state: () => ({
    reminder: [] as VehicleServiceRecordsWithContacted | [],
  }),
});
