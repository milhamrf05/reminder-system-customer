<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Tambah Data reminder pelanggan</div>
    <!-- content -->
    <q-form @submit="onSubmit">
      <div class="row">
        <div class="col-md-6 col-xs-12 col-sm-10 q-mb-md">
          <q-input
            outlined
            type="text"
            class="q-mr-sm"
            v-model="addReminderCustomerForm.chassis_number"
            lazy-rules
            label="Nomor Rangka *"
            :error="v$.chassis_number.$error"
            :error-message="
              v$.chassis_number.$errors.map((e) => e.$message).join()
            "
            @input="v$.chassis_number.$touch"
            @blur="v$.chassis_number.$touch"
          />
        </div>
        <div class="col-md-6 col-xs-12 col-sm-10 q-mb-md">
          <q-input
            outlined
            class="q-mr-sm"
            type="text"
            v-model="addReminderCustomerForm.license_plate_number"
            lazy-rules
            label="Plat Nomor *"
            :error="v$.license_plate_number.$error"
            :error-message="
              v$.license_plate_number.$errors.map((e) => e.$message).join()
            "
            @input="v$.license_plate_number.$touch"
            @blur="v$.license_plate_number.$touch"
          />
        </div>
        <div class="col-md-6 col-xs-12 col-sm-10 q-mb-md">
          <q-input
            outlined
            class="q-mr-sm"
            type="text"
            v-model="addReminderCustomerForm.customer_name"
            lazy-rules
            label="Nama Pelanggan *"
            :error="v$.customer_name.$error"
            :error-message="
              v$.customer_name.$errors.map((e) => e.$message).join()
            "
            @input="v$.customer_name.$touch"
            @blur="v$.customer_name.$touch"
          />
        </div>
        <div class="col-md-6 col-xs-12 col-sm-10 q-mb-md">
          <q-input
            outlined
            class="q-mr-sm"
            type="text"
            v-model="addReminderCustomerForm.customer_phone_number"
            lazy-rules
            label="Nomor HP Pelanggan *"
            :error="v$.customer_phone_number.$error"
            :error-message="
              v$.customer_phone_number.$errors.map((e) => e.$message).join()
            "
            @input="v$.customer_phone_number.$touch"
            @blur="v$.customer_phone_number.$touch"
          />
        </div>
        <div class="col-md-6 col-xs-12 col-sm-10 q-mb-md">
          <q-input
            outlined
            class="q-mr-sm"
            type="text"
            v-model="addReminderCustomerForm.vehicle_model"
            lazy-rules
            label="Model Kendaraan *"
            :error="v$.vehicle_model.$error"
            :error-message="
              v$.vehicle_model.$errors.map((e) => e.$message).join()
            "
            @input="v$.vehicle_model.$touch"
            @blur="v$.vehicle_model.$touch"
          />
        </div>
        <div class="col-md-6 col-xs-12 col-sm-10 q-mb-md">
          <q-select
            filled
            :loading="intervalToNowDataLoading"
            v-model="addReminderCustomerForm.interval_to_now"
            :options="intervalToNowData"
            label="Kategori Customer"
          />
        </div>
        <div class="col-md-6 col-xs-12 col-sm-10 q-mb-md">
          <q-input
            outlined
            class="q-mr-sm"
            type="text"
            v-model="addReminderCustomerForm.service_advisor_name"
            lazy-rules
            label="Nama SA / Sevice Advisor *"
            :error="v$.service_advisor_name.$error"
            :error-message="
              v$.service_advisor_name.$errors.map((e) => e.$message).join()
            "
            @input="v$.service_advisor_name.$touch"
            @blur="v$.service_advisor_name.$touch"
          />
        </div>
        <div class="col-md-6 col-xs-12 col-sm-10 q-mb-md">
          <q-input
            outlined
            class="q-mr-sm"
            type="text"
            v-model="addReminderCustomerForm.program_name"
            lazy-rules
            label="Nama Program *"
            :error="v$.program_name.$error"
            :error-message="
              v$.program_name.$errors.map((e) => e.$message).join()
            "
            @input="v$.program_name.$touch"
            @blur="v$.program_name.$touch"
          />
        </div>
        <div class="col-md-6 col-xs-12 col-sm-10 q-mb-md">
          <q-input
            outlined
            class="q-mr-sm"
            type="text"
            v-model="addReminderCustomerForm.sales_branch"
            lazy-rules
            label="Nama Cabang *"
            :error="v$.sales_branch.$error"
            :error-message="
              v$.sales_branch.$errors.map((e) => e.$message).join()
            "
            @input="v$.sales_branch.$touch"
            @blur="v$.sales_branch.$touch"
          />
        </div>
        <div class="col-md-6 col-xs-12 col-sm-10 q-mb-md">
          <q-input
            filled
            label="Service Terakhir"
            v-model="addReminderCustomerForm.last_service"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="addReminderCustomerForm.last_service">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-md-6 col-xs-12 col-sm-10 q-mb-md">
          <q-input
            filled
            label="Tanggal Pembelian"
            v-model="addReminderCustomerForm.delivery_date"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="addReminderCustomerForm.delivery_date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md">
          <q-btn type="submit" label="Submit" color="blue"></q-btn>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { useApiWithAuthorization } from 'src/composables/api';
import { useRequired } from 'src/composables/validators';
import { IntervalToNow } from 'src/types/intervalToNow';
import { AddReminderCustomerForm } from 'src/types/vehicleServiceRecords';
import { onMounted, reactive, ref } from 'vue';
import { date } from 'quasar';
import { useRouter } from 'vue-router';
import { useMetaTitle } from 'src/composables/meta';

const intervalToNowData = ref([]);
const intervalToNowDataLoading = ref(false);
const { push: routerPush } = useRouter();

const addReminderCustomerForm: AddReminderCustomerForm = reactive({
  chassis_number: '',
  customer_name: '',
  customer_phone_number: '',
  delivery_date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
  interval_to_now: {
    id: 0,
    label: '',
    name: '',
    value: 0,
  },
  last_service: date.formatDate(Date.now(), 'YYYY/MM/DD'),
  license_plate_number: '',
  program_name: '',
  sales_branch: '',
  service_advisor_name: '',
  vehicle_model: '',
});

const rules = {
  chassis_number: { required: useRequired() },
  license_plate_number: { required: useRequired() },
  customer_name: { required: useRequired() },
  customer_phone_number: { required: useRequired() },
  vehicle_model: { required: useRequired() },
  service_advisor_name: { required: useRequired() },
  program_name: { required: useRequired() },
  sales_branch: { required: useRequired() },
};
const v$ = useVuelidate(rules, addReminderCustomerForm);

const getIntervalToNow = async () => {
  try {
    intervalToNowDataLoading.value = true;
    const response = await useApiWithAuthorization.get('intervals');
    intervalToNowData.value = response.data.intervals.map(
      (interval: IntervalToNow) => {
        return {
          name: interval.name,
          id: interval.id,
          label: interval.name,
          value: interval.id,
        };
      }
    );
  } catch (error) {
    throw error;
  } finally {
    intervalToNowDataLoading.value = false;
  }
};

const onSubmit = async () => {
  if (!v$.value.$invalid) {
    try {
      await useApiWithAuthorization.post('vehicle-service-records', {
        ...addReminderCustomerForm,
        interval_to_now_id: addReminderCustomerForm.interval_to_now.value,
        customer_phone_number: addReminderCustomerForm.customer_phone_number,
      });
      routerPush({ name: 'HomePage' });
    } catch (error) {
      throw error;
    }
  } else {
    v$.value.$touch();
  }
};

useMetaTitle('Buat Reminder Customer');

onMounted(async () => {
  await getIntervalToNow();
});
</script>
