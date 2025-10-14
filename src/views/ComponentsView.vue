<template>
  <section class="d-flex flex-column pa-4 ga-4 w-100">
    <span> Dashboard </span>
    <v-row>
      <v-col cols="4">
        <BaseChart type="bar" :data="d_barChart" style="height: 360px" />
      </v-col>
      <v-col cols="4">
        <BaseChart type="line" :data="d_lineChart" style="height: 360px" />
      </v-col>
      <v-col cols="4">
        <BaseChart type="pie" :data="d_pieChart" style="height: 360px" />
      </v-col>
    </v-row>
    <BaseMap :height="640" :point-layer="d_mapMarker" :polygon-layer="d_mapPolygon" />
  </section>
</template>

<script setup lang="ts">
import BaseMap from "@/components/map/BaseMap.vue";
import Jabar from "@/assets/json/JAWA BARAT.json";
import BaseChart from "@/components/chart/BaseChart.vue";

const d_mapMarker: { groupType: string; data: GeoJSON.FeatureCollection }[] = [
  {
    groupType: "marker-1",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [106.8456, -6.2088] },
          properties: { name: "Jakarta", type: "city" },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [112.7495, -7.2575] },
          properties: { name: "Surabaya", type: "city" },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [110.3695, -7.7956] },
          properties: { name: "Yogyakarta", type: "city" },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [98.6669, 3.5952] },
          properties: { name: "Medan", type: "city" },
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [119.4124, -5.1477] },
          properties: { name: "Makassar", type: "city" },
        },
      ],
    },
  },
];

const d_mapPolygon: { groupType: string; data: GeoJSON.FeatureCollection }[] = [
  {
    groupType: "polygon-1",
    data: Jabar as GeoJSON.FeatureCollection,
  },
];

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
</script>

<style scoped></style>
