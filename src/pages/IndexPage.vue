<template>
  <q-page padding>
    <q-table
      title="Semua Data Reminder Pelanggan"
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
                <q-item clickable @click="deleteData(props.row.id)">
                  <q-item-section avatar>
                    <q-icon color="red" name="delete" />
                  </q-item-section>
                  <q-item-section>Hapus</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-td>
          <q-td key="license_plate_number" :props="props">
            {{ props.row.license_plate_number }}</q-td
          >
          <q-td key="interval_to_now" :props="props">
            {{ props.row.interval_to_now.name }}</q-td
          >
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
  </q-page>
</template>
<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { VehicleServiceRecords } from 'src/types/vehicleServiceRecords';
import { onMounted, ref } from 'vue';
import { useApiWithAuthorization } from 'src/composables/api';
import { PaginationProps } from 'src/types/paginationProps';

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
    field: (row: VehicleServiceRecords) => row.chassis_number,
  },
  {
    name: 'license_plate_number',
    required: true,
    label: 'Plat Nomor',
    align: 'left',
    sortable: true,
    field: (row: VehicleServiceRecords) => row.license_plate_number,
  },
  {
    name: 'interval_to_now',
    required: true,
    label: 'Interval',
    align: 'left',
    sortable: true,
    field: (row: VehicleServiceRecords) => row.interval_to_now.name,
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
      'vehicle-service-records',
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
    rows.value = response.data.service_records.data;
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

const deleteData = async (id: number) => {
  try {
    await useApiWithAuthorization.delete(`vehicle-service-records/${id}`);
    await onRequest({
      pagination: {
        page: 1,
        rowsPerPage: pagination.value.rowsPerPage,
        sortBy: 'created_at',
      },
    });
  } catch (error) {
    throw error;
  }
};

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
