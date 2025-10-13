<template>
  <div ref="mapContainer" class="map-container" :style="`height: ${props.height}px`"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import mapboxgl from "mapbox-gl";

const props = withDefaults(
  defineProps<{
    height?: number;
    center?: [number, number];
    zoom?: number;
    pointLayer?: {
      groupType: string;
      data: GeoJSON.FeatureCollection;
    }[];
    polygonLayer?: {
      groupType: string;
      data: GeoJSON.FeatureCollection;
    }[];
  }>(),
  {
    height: 480,
    center: () => [118.015776, -2.6000285],
    zoom: 4,
    pointLayer: () => [],
    polygonLayer: () => [],
  }
);

const mapContainer = ref<HTMLDivElement | null>(null);
let map: mapboxgl.Map | null = null;

const accessToken = computed(() => import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string);
const mapOptions: {
  projection: string;
  style: string;
  center: [number, number];
  zoom: number;
} = {
  projection: "mercator",
  style: "mapbox://styles/mapbox/streets-v12",
  center: props.center,
  zoom: props.zoom,
};

const initMapbox = () => {
  if (!mapContainer.value) return;

  mapboxgl.accessToken = accessToken.value;
  map = new mapboxgl.Map({
    container: mapContainer.value,
    ...mapOptions,
  });

  map.addControl(new mapboxgl.NavigationControl(), "top-right");
  map.on("load", () => {
    initLayers();
  });
};

const initLayers = () => {
  props.pointLayer.forEach((item) => {
    addPointLayer(item.groupType, item.data);
  });
  props.polygonLayer.forEach((item) => {
    addPolygonLayer(item.groupType, item.data);
  });
};

const addPointLayer = (groupType: string, pointData: GeoJSON.FeatureCollection) => {
  if (!map) return;

  const source = map.getSource(`data-${groupType}`) as mapboxgl.GeoJSONSource;
  if (source) {
    source.setData(pointData);
  } else {
    map.addSource(`data-${groupType}`, {
      type: "geojson",
      data: pointData,
    });
  }

  map.addLayer({
    id: `layer-${groupType}`,
    type: "circle",
    source: `data-${groupType}`,
    paint: {
      "circle-color": "#2569E0",
      "circle-opacity": 0.9,
      "circle-radius": 8,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#fff",
    },
  });
};

const addPolygonLayer = (groupType: string, polygonData: GeoJSON.FeatureCollection) => {
  if (!map) return;

  const source = map.getSource(`data-${groupType}`) as mapboxgl.GeoJSONSource;
  if (source) {
    source.setData(polygonData);
  } else {
    map.addSource(`data-${groupType}`, {
      type: "geojson",
      data: polygonData,
    });
  }

  const allMapLayers = map.getStyle().layers;
  let firstSymbolId = "";
  for (const layer of allMapLayers) {
    if (layer["source-layer"] === "place_label") {
      firstSymbolId = layer.id;
      break;
    }
  }

  map.addLayer(
    {
      id: `layer-${groupType}`,
      type: "fill",
      source: `data-${groupType}`,
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "#22C55E",
        "fill-opacity": 0.6,
        "fill-outline-color": "#166534",
      },
    },
    firstSymbolId
  );
};

onMounted(() => {
  initMapbox();

  const resize = () => map && map.resize();
  window.addEventListener("resize", resize);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resize);
    map?.remove();
    map = null;
  });
});
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
}
</style>
