<template>
  <section class="d-flex flex-column pa-4 ga-4 w-100">
    <span> Dashboard </span>
    <BaseMap :height="640" :point-layer="dummMarker" :polygon-layer="dummPolygon" />
  </section>
</template>

<script setup lang="ts">
import BaseMap from "@/components/map/BaseMap.vue";
import Jabar from "@/assets/json/JAWA BARAT.json";

const dummMarker: { groupType: string; data: GeoJSON.FeatureCollection }[] = [
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

const dummPolygon: { groupType: string; data: GeoJSON.FeatureCollection }[] = [
  {
    groupType: "polygon-1",
    data: Jabar as GeoJSON.FeatureCollection,
  },
];
</script>

<style scoped></style>
