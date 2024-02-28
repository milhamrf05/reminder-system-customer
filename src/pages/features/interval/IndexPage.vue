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
          <q-td key="action" :props="props">
            <q-btn
              flat
              icon="delete"
              color="red"
              @click="deleteData(props.row.id)"
            >
              <q-tooltip> Hapus </q-tooltip>
            </q-btn>
            <q-btn
              flat
              icon="edit"
              color="green"
              @click="
                $state.showEditIntervalDialog = true;
                $state.editedInterval.name = props.row.name;
                $state.editedInterval.id = props.row.id;
              "
            >
              <q-tooltip> Edit </q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="accent"
        @click="$state.showAddIntervalDialog = true"
      />
    </q-page-sticky>
    <AddIntervalDialog @refreshIntervalData="handleRefreshIntervalData()" />
    <EditIntervalDialog @refreshIntervalData="handleRefreshIntervalData()" />
  </q-page>
</template>
<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { onMounted, ref } from 'vue';
import { useApiWithAuthorization } from 'src/composables/api';
import { PaginationProps } from 'src/types/paginationProps';
import { useQuasar } from 'quasar';
import { IntervalToNow, IntervalToNowRows } from 'src/types/intervalToNow';
import { useIntervalToNowStore } from 'src/stores/intervalToNow';
import AddIntervalDialog from 'src/components/interval/AddIntervalDialog.vue';
import EditIntervalDialog from 'src/components/interval/EditIntervalDialog.vue';
import { useMetaTitle } from 'src/composables/meta';

const { dialog } = useQuasar();
const rows = ref([]);
const { $state } = useIntervalToNowStore();
const columns: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Kategori Customer',
    align: 'left',
    sortable: true,
    field: (row: IntervalToNow) => row.name,
  },
  {
    name: 'action',
    required: true,
    label: 'Aksi',
    align: 'left',
    sortable: true,
    field: (row: IntervalToNowRows) => row.action,
  },
];

const loading = ref(false);
const filter = ref('');
const onRequest = async (props: PaginationProps) => {
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
      await useApiWithAuthorization.delete(`intervals/${id}`);
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
const handleRefreshIntervalData = () => {
  onRequest({
    pagination: {
      page: 1,
      rowsPerPage: 1,
      sortBy: 'created_at',
    },
  });
};

useMetaTitle('List Kategori');

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
