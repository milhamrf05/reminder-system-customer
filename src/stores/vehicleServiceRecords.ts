import { defineStore } from 'pinia';
import { useApiWithAuthorization } from 'src/composables/api';
import { VehicleServiceRecords } from 'src/types/vehicleServiceRecords';

export const useVehicleServiceRecords = defineStore('vehicle_service_records', {
  state: () => ({
    vehicleServiceRecords: [] as VehicleServiceRecords[],
  }),
  getters: {
    // Define getters here
    getVehicleServiceRecords: (state) => state.vehicleServiceRecords,

    // You can add more getters as needed
    getRecordById: (state) => (id: number) => {
      return state.vehicleServiceRecords.find((record) => record.id === id);
    },
  },

  actions: {
    async setVehicleServiceRecords() {
      const response = await useApiWithAuthorization.get(
        'vehicle-service-records'
      );

      this.vehicleServiceRecords = response.data.service_records;
    },
  },
});
