<template>
  <q-page padding>
    <q-table
      title="Reminder Pelanggan"
      :rows="rows"
      :dense="$q.screen.lt.md"
      :columns="columns"
      row-key="name"
      :loading="loading"
      no-data-label="Tidak ada data"
      v-model:pagination="pagination"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="chassis_number" :props="props">
            {{ props.row.chassis_number }}
            <q-menu touch-position context-menu>
              <q-list>
                <q-item clickable @click="setDetailDialog(props.row)">
                  <q-item-section avatar>
                    <q-icon color="blue" name="info" />
                  </q-item-section>
                  <q-item-section>Detail</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-td>
          <q-td key="license_plate_number" :props="props">
            {{ props.row.license_plate_number }}</q-td
          >
          <q-td key="customer_phone_number" :props="props">
            {{ props.row.customer_phone_number }}</q-td
          >
          <q-td key="last_service" :props="props">
            {{
              date.formatDate(
                props.row.last_service,
                'dddd, DD MMMM YYYY',
                useDateLocale
              )
            }}</q-td
          >
          <q-td key="contacted" :props="props">
            <q-checkbox
              v-model="props.row.contacted"
              @update:model-value="toggleContacted(props.row.id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="accent"
        :to="{ name: 'AddReminderCustomerPage' }"
      />
    </q-page-sticky>
    <DetailDialog />
  </q-page>
</template>
<script setup lang="ts">
import { QTableColumn } from 'quasar';
import {
  VehicleServiceRecords,
  VehicleServiceRecordsWithContacted,
} from 'src/types/vehicleServiceRecords';
import { onMounted, ref } from 'vue';
import { useApiWithAuthorization } from 'src/composables/api';
import { PaginationProps } from 'src/types/paginationProps';
import { date } from 'quasar';
import { useDateLocale } from 'src/composables/date';
import { useVehicleServiceRecords } from 'src/stores/vehicleServiceRecords';
import DetailDialog from 'components/reminder-customer/DetailDialog.vue';
import { useMetaTitle } from 'src/composables/meta';
const { $state } = useVehicleServiceRecords();
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 50,
});
const rows = ref([]);

const columns: QTableColumn[] = [
  {
    name: 'chassis_number',
    required: true,
    label: 'Nomor Rangka',
    align: 'left',
    sortable: true,
    field: (row: VehicleServiceRecordsWithContacted) => row.chassis_number,
  },
  {
    name: 'license_plate_number',
    required: true,
    label: 'Plat Nomor',
    align: 'left',
    sortable: true,
    field: (row: VehicleServiceRecordsWithContacted) =>
      row.license_plate_number,
  },
  {
    name: 'customer_phone_number',
    required: true,
    label: 'Nomor Telephone',
    align: 'left',
    sortable: true,
    field: (row: VehicleServiceRecordsWithContacted) =>
      row.customer_phone_number,
  },
  {
    name: 'last_service',
    required: true,
    label: 'Servis Terakhir',
    align: 'left',
    sortable: true,
    field: (row: VehicleServiceRecordsWithContacted) => row.last_service,
  },
  {
    name: 'contacted',
    required: true,
    label: 'Status pernah di hubungi',
    align: 'left',
    sortable: true,
    field: (row: VehicleServiceRecordsWithContacted) => row.contacted,
  },
];

const loading = ref(false);
const filter = ref('');
const onRequest = async (props: PaginationProps) => {
  const { page, rowsPerPage, sortBy } = props.pagination;

  loading.value = true;

  try {
    // Fetch data from the server using an API call
    const response = await useApiWithAuthorization.get(
      'vehicle-service-records/get/reminders',
      {
        params: {
          page,
          per_page: rowsPerPage,
          sort_by: sortBy,
          filter: filter.value,
        },
      }
    );
    // Update local data and pagination based on the server response
    const remindersWithBoolean = response.data.reminders.map(
      (reminder: VehicleServiceRecordsWithContacted) => {
        return {
          ...reminder,
          contacted: !!reminder.contacted,
        };
      }
    );

    // Update local data and pagination based on the server response
    rows.value = remindersWithBoolean;

    pagination.value.rowsNumber = response.data.total_records;

    // Update local pagination object
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
  } catch (error) {
    // Handle error
    console.error('Error fetching data from the server:', error);
  } finally {
    loading.value = false;
  }
};

const setDetailDialog = (data: VehicleServiceRecords) => {
  $state.isDetailDialog = true;
  $state.selectedDetail = data;
};

const toggleContacted = async (id: number) => {
  try {
    const response = await useApiWithAuthorization.put(
      `vehicle-service-records/${id}/toggle-contacted`
    );
    console.log(response);
  } catch (error) {
    throw error;
  }
};
useMetaTitle('Reminder Customer');
onMounted(() => {
  // Fetch initial data from the server (1st page)
  onRequest({
    pagination: {
      page: 1,
      rowsPerPage: pagination.value.rowsPerPage,
      sortBy: 'created_at',
    },
  });
});
</script>
