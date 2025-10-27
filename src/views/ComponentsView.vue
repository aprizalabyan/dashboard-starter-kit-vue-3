<template>
  <section class="d-flex flex-column pa-4 ga-4 w-100">
    <span class="text-p16 font-weight-semibold"> Components </span>
    <v-row>
      <v-col cols="6" class="d-flex flex-column ga-3">
        <InputTextfield
          v-model="inputForm.name"
          label="Name"
          placeholder="Input name"
          required
          :rules="[r_required]"
        />
        <div class="d-flex ga-3">
          <InputTextfield
            v-model="inputForm.email"
            label="Email"
            placeholder="Input email"
            required
            :rules="[r_required, r_email]"
          />
          <InputTextfield
            v-model="inputForm.password"
            placeholder="Input password"
            label="Password"
            :type="showPass ? 'text' : 'password'"
            required
            :rules="[r_required]"
          >
            <template #append-inner>
              <v-icon
                :icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click="showPass = !showPass"
              />
            </template>
          </InputTextfield>
        </div>
        <div class="d-flex ga-3">
          <InputSelect
            v-model="inputForm.gender"
            :items="['Male', 'Female']"
            label="Gender"
            placeholder="Select gender"
            required
          />
          <InputSelect
            v-model="inputForm.role"
            :items="['Manager', 'Lead', 'Staff']"
            label="Role"
            placeholder="Select role"
            required
          />
        </div>
        <InputTextarea
          v-model="inputForm.description"
          label="Description"
          placeholder="Input description"
          :rows="3"
        />
        <div class="d-flex ga-3">
          <InputDatePicker v-model="inputForm.date" label="Date" />
          <InputTimePicker v-model="inputForm.time" label="Time" />
        </div>
        <div class="d-flex justify-end">
          <BaseButton
            label="Submit"
            append-icon="custom:paper-plane"
            class="px-6"
            @click="handleSubmit"
          />
        </div>
      </v-col>
    </v-row>
    <span class="text-p16 font-weight-semibold"> Echarts </span>
    <v-row>
      <v-col cols="4">
        <v-card class="pa-3" color="white" flat>
          <BaseChart type="bar" :data="d_barChart" style="height: 360px" />
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-3" color="white" flat>
          <BaseChart type="line" :data="d_lineChart" style="height: 360px" />
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-3" color="white" flat>
          <BaseChart type="pie" :data="d_pieChart" style="height: 360px" />
        </v-card>
      </v-col>
    </v-row>
    <span class="text-p16 font-weight-semibold"> Map </span>
    <BaseMap
      :height="640"
      :point-layers="d_mapMarker"
      :polygon-layers="d_mapPolygon"
      :map-legends="d_mapLegends"
      @click:layer="handleClickLayer"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseMap from "@/components/map/BaseMap.vue";
import Jabar from "@/assets/json/JAWA BARAT.json";
import BaseChart from "@/components/chart/BaseChart.vue";
import InputTextfield from "@/components/forms/InputTextfield.vue";
import InputSelect from "@/components/forms/InputSelect.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import InputTextarea from "@/components/forms/InputTextarea.vue";
import InputDatePicker from "@/components/forms/InputDatePicker.vue";
import InputTimePicker from "@/components/forms/InputTimePicker.vue";
import type { IGeojsonLayer, IMapLegendData } from "@/models/map";

// ----- Map data sample -----
const d_mapMarker: IGeojsonLayer[] = [
  {
    groupType: "marker-1",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [106.8456, -6.2088] },
          properties: { name: "Jakarta", type: "city", color: "#2569E0" },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [112.7495, -7.2575] },
          properties: { name: "Surabaya", type: "city", color: "#2569E0" },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [110.3695, -7.7956] },
          properties: { name: "Yogyakarta", type: "city", color: "#2569E0" },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [98.6669, 3.5952] },
          properties: { name: "Medan", type: "city", color: "#2569E0" },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [119.4124, -5.1477] },
          properties: { name: "Makassar", type: "city", color: "#2569E0" },
        },
      ],
    },
  },
];
const d_mapPolygon: IGeojsonLayer[] = [
  {
    groupType: "polygon-1",
    data: {
      ...Jabar,
      features: Jabar.features.map((item) => ({
        ...item,
        properties: { ...item.properties, color: "#22C55E" },
      })),
    } as GeoJSON.FeatureCollection,
  },
];
const d_mapLegends = ref<IMapLegendData[]>([
  {
    id: "marker-1",
    text: "Marker Layer",
    icon: "mdi-circle",
    color: "#2569E0",
    visibility: true,
  },
  {
    id: "polygon-1",
    text: "Polygon Layer",
    icon: "mdi-circle",
    color: "#22C55E",
    visibility: true,
  },
]);

const handleClickLayer = (e: string) => {
  console.log("emit", e);
};

// ----- Echarts data sample -----
const d_barChart = {
  categories: ["Jan", "Feb", "Mar"],
  series: [
    { name: "2024", data: [120, 200, 150], itemStyle: { color: "green" } },
    { name: "2025", data: [100, 260, 80] },
  ],
};
const d_lineChart = {
  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  series: [
    {
      name: "Income",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      smooth: true,
      itemStyle: { color: "green" },
    },
    {
      name: "Expense",
      data: [560, 232, 401, 1234, 1090, 930, 520],
      smooth: true,
    },
  ],
};
const d_pieChart = {
  data: [
    { value: 1048, name: "Search Engine", itemStyle: { color: "green" } },
    { value: 735, name: "Direct" },
    { value: 580, name: "Email" },
    { value: 484, name: "Union Ads" },
    { value: 300, name: "Video Ads" },
  ],
};

// ----- Form data sample -----
const inputForm = ref({
  name: "",
  email: "",
  password: "",
  gender: "",
  role: "",
  description: "",
  date: "",
  time: "",
});
const showPass = ref(false);

const handleSubmit = () => {
  console.log("form", inputForm.value);
};
</script>

<style scoped></style>
