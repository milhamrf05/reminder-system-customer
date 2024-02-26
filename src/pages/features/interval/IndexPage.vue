<template>
  <q-page padding>
    <q-table
      title="Semua Data Kategori Customer"
      :rows="rows"
      :dense="$q.screen.lt.md"
      :columns="columns"
      row-key="name"
      :loading="loading"
      no-data-label="Tidak ada data"
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
          <q-td key="name" :props="props">
            {{ props.row.name }}
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
import { VehicleServiceRecords } from 'src/types/vehicleServiceRecords';
import { onMounted, ref } from 'vue';
import { useApiWithAuthorization } from 'src/composables/api';
import { PaginationProps } from 'src/types/paginationProps';
import { date, useQuasar } from 'quasar';
import { useDateLocale } from 'src/composables/date';
import { useVehicleServiceRecords } from 'src/stores/vehicleServiceRecords';
import DetailDialog from 'components/reminder-customer/DetailDialog.vue';
import { useRouter } from 'vue-router';
import { IntervalToNow } from 'src/types/intervalToNow';

const { dialog } = useQuasar();
const router = useRouter();
const { $state } = useVehicleServiceRecords();
const rows = ref([]);

const columns: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Kategori Customer',
    align: 'left',
    sortable: true,
    field: (row: IntervalToNow) => row.name,
  },
];

const loading = ref(false);
const filter = ref('');
const onRequest = async (props: PaginationProps) => {
  const { page, rowsPerPage, sortBy } = props.pagination;

  loading.value = true;

  try {
    // Fetch data from the server using an API call
    const response = await useApiWithAuthorization.get('intervals');

    // Update local data and pagination based on the server response
    rows.value = response.data.intervals;
  } catch (error) {
    // Handle error
    console.error('Error fetching data from the server:', error);
  } finally {
    loading.value = false;
  }
};

const deleteData = async (id: number) => {
  dialog({
    title: 'Konfirmasi',
    message: 'Apakah anda yakin ingin menghapus data tersebut',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await useApiWithAuthorization.delete(`vehicle-service-records/${id}`);
      await onRequest({
        pagination: {
          page: 1,
          rowsPerPage: 1,
          sortBy: 'created_at',
        },
      });
    } catch (error) {
      throw error;
    }
  });
};

onMounted(() => {
  // Fetch initial data from the server (1st page)
  onRequest({
    pagination: {
      page: 1,
      rowsPerPage: 1,
      sortBy: 'created_at',
    },
  });
});
</script>
