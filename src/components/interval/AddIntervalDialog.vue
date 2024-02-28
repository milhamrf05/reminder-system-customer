<template>
  <q-dialog v-model="$state.showAddIntervalDialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Detail Data</div>
      </q-card-section>

      <q-form @submit="onSubmit">
        <q-card-section class="q-pt-none">
          <q-input
            outlined
            class="q-mr-sm"
            type="text"
            v-model="intervalForm.name"
            lazy-rules
            label="Nama  *"
            :error="v$.name.$error"
            :error-message="v$.name.$errors.map((e) => e.$message).join()"
            @input="v$.name.$touch"
            @blur="v$.name.$touch"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="$state.showAddIntervalDialog = false"
          />
          <q-btn type="submit" label="OK" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { useApiWithAuthorization } from 'src/composables/api';
import { useRequired } from 'src/composables/validators';
import { useIntervalToNowStore } from 'src/stores/intervalToNow';
import { reactive } from 'vue';

const { $state } = useIntervalToNowStore();
const emit = defineEmits(['refreshIntervalData']);

interface IntervalForm {
  name: string;
}
const intervalForm: IntervalForm = reactive({
  name: '',
});

const rules = {
  name: { required: useRequired() },
};
const v$ = useVuelidate(rules, intervalForm);

const onSubmit = async () => {
  if (!v$.value.$invalid) {
    await useApiWithAuthorization.post('intervals', intervalForm);
    $state.showAddIntervalDialog = false;
    emit('refreshIntervalData');
  } else {
    v$.value.$touch();
  }
};
</script>
