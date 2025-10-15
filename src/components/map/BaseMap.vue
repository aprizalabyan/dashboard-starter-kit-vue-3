<template>
  <div class="parent-container">
    <div ref="mapContainer" class="map-container" :style="`height: ${props.height}px`" />
    <div class="overlay-container">
      <div class="top-left-overlay">
        <v-sheet class="map-legend text-p14 d-flex flex-column ga-1 pa-3" rounded color="white">
          <span class="font-weight-medium">Map Legend</span>
          <div class="d-flex align-center ga-2" v-for="(item, i) in mapLegends" :key="i">
            <v-icon
              size="small"
              :color="item.visibility ? item.color : '#6F708B'"
              @click="toggleLayerVisibility(item)"
            >
              {{ item.visibility ? item.icon : "mdi-eye-off" }}
            </v-icon>
            <span>{{ item.text }}</span>
          </div>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import mapboxgl, { Popup } from "mapbox-gl";
import type { IGeojsonLayer, IMapLegendData } from "@/models/map";

const props = withDefaults(
  defineProps<{
    height?: number;
    center?: [number, number];
    zoom?: number;
    pointLayers?: {
      groupType: string;
      data: GeoJSON.FeatureCollection;
    }[];
    polygonLayers?: {
      groupType: string;
      data: GeoJSON.FeatureCollection;
    }[];
    mapLegends?: IMapLegendData[];
  }>(),
  {
    height: 480,
    center: () => [118.015776, -2.6000285],
    zoom: 4,
    pointLayers: () => [],
    polygonLayers: () => [],
    mapLegends: () => [],
  }
);

const mapContainer = ref<HTMLDivElement | null>(null);
let map: mapboxgl.Map | null = null;
let ro: ResizeObserver | null = null;

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
  props.pointLayers.forEach((item) => {
    addPointLayer({ groupType: item.groupType, data: item.data });
  });
  props.polygonLayers.forEach((item) => {
    addPolygonLayer({ groupType: item.groupType, data: item.data });
  });
};

const addPointLayer = ({ groupType, data: pointData }: IGeojsonLayer) => {
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

  handleHoverLayer(groupType);
};

const addPolygonLayer = ({ groupType, data: polygonData }: IGeojsonLayer) => {
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

  handleHoverLayer(groupType);
};

const handleHoverLayer = (groupType: string) => {
  if (!map) return;
  let hoveredId: string | null = null;
  let popup: Popup | null = null;
  // let popupVisible: boolean = false;

  map.on("mouseenter", `layer-${groupType}`, (e) => {
    if (popup) popup.remove();

    popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: true,
      offset: [0, -12],
      maxWidth: "360px",
      className: "custom-popup",
    });
  });

  map.on("mousemove", `layer-${groupType}`, (e) => {
    if (!e.features?.length) return;

    if (e.features.length > 0) {
      const featureId =
        e.features[0]?.properties?.id ||
        e.features[0]?.properties?.id_kabupaten ||
        e.features[0]?.properties?.name;

      if (hoveredId !== featureId) {
        hoveredId = featureId;
        if (!map) return;

        const geometry = e.features[0]?.geometry;
        const properties = e.features[0]?.properties;
        let coordinates: number[] | undefined;

        if (geometry?.type === "Point") {
          coordinates = geometry.coordinates as number[];
        } else if (geometry?.type === "Polygon") {
          // coordinates = geometry.coordinates[0][0] as number[];
          return;
        }

        popup
          ?.setLngLat(coordinates as [number, number])
          .setHTML(`<div>${properties?.name}</div>`)
          .addTo(map);
        map.getCanvas().style.cursor = "pointer";
      }
    }
  });

  map.on("mouseleave", `layer-${groupType}`, () => {
    hoveredId = null;
    if (!map) return;
    popup?.remove();
    popup = null;
    map.getCanvas().style.cursor = "";
  });
};

const toggleLayerVisibility = (layer: IMapLegendData) => {
  if (!map) return;
  layer.visibility = !layer.visibility;
  const ly = map.getLayer(`layer-${layer.id}`);

  if (!ly) return;
  if (layer.visibility) {
    map.setLayoutProperty(`layer-${layer.id}`, "visibility", "visible");
  } else {
    map.setLayoutProperty(`layer-${layer.id}`, "visibility", "none");
  }
};

const resizeObserver = () => {
  let lastW = 0,
    lastH = 0;
  const resizeable = mapContainer.value as Element;
  ro = new ResizeObserver((entries) => {
    const cr = entries[0]?.contentRect;
    const w = Math.round(cr!.width),
      h = Math.round(cr!.height);
    if (w !== lastW || h !== lastH) {
      lastW = w;
      lastH = h;
      if (!map) return;
      requestAnimationFrame(() => map?.resize());
    }
  });
  ro.observe(resizeable);

  onBeforeUnmount(() => {
    ro?.unobserve(resizeable);
    ro?.disconnect();
  });
};

onMounted(() => {
  initMapbox();
  resizeObserver();
});

onBeforeUnmount(() => {
  map?.remove();
  map = null;
});
</script>

<style scoped lang="scss">
.parent-container {
  position: relative;

  .map-container {
    position: relative;
    width: 100%;
  }

  .overlay-container {
    .top-left-overlay {
      position: absolute;
      top: 12px;
      left: 12px;
    }
  }
}
</style>
