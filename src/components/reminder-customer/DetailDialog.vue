<template>
  <q-dialog v-model="$state.isDetailDialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Detail Data</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">Nomor Rangka:</div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{ $state.selectedDetail?.chassis_number }}
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">Plat Nomor:</div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{ $state.selectedDetail?.license_plate_number }}
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">Model Kendaraan:</div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{ $state.selectedDetail?.vehicle_model }}
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">Kategori customer:</div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{ $state.selectedDetail?.interval_to_now.name }}
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">Nama customer:</div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{ $state.selectedDetail?.customer_name }}
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">
            Nomor Handphone customer:
          </div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{ $state.selectedDetail?.customer_phone_number }}
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">Servis terakhir:</div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{
              date.formatDate(
                $state.selectedDetail?.last_service,
                'dddd, DD MMMM YYYY',
                useDateLocale
              )
            }}
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">Tanggal Pembelian Mobil:</div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{
              date.formatDate(
                $state.selectedDetail?.delivery_date,
                'DD MMMM YYYY',
                useDateLocale
              )
            }}
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">Nama Program:</div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{ $state.selectedDetail?.program_name }}
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">Nama SA:</div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{ $state.selectedDetail?.service_advisor_name }}
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">Cabang:</div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{ $state.selectedDetail?.sales_branch }}
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">
            Data dibuat pada tanggal:
          </div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{
              date.formatDate(
                $state.selectedDetail?.created_at,
                'DD MMMM YYYY',
                useDateLocale
              )
            }}
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-md-3 col-xs-3 col-sm-3">
            Data diedit pada tanggal:
          </div>
          <div class="col-md-9 col-xs-9 col-sm-9">
            {{
              date.formatDate(
                $state.selectedDetail?.updated_at,
                'DD MMMM YYYY',
                useDateLocale
              )
            }}
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useVehicleServiceRecords } from 'stores/vehicleServiceRecords';
import { date } from 'quasar';
import { useDateLocale } from 'src/composables/date';

const { $state } = useVehicleServiceRecords();
</script>
