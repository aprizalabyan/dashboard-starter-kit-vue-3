<template>
  <div ref="chartContainer" style="position: relative; height: 100%; width: 100%">
    <VChart ref="chart" :option="finalOption" autoresize v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import VChart from "vue-echarts";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GaugeChart, LineChart, BarChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import { chartFactory } from "@/utils/charts";
import type { ChartKind, ChartInputMap, ECOption } from "@/utils/charts";

echarts.use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
]);

const props = defineProps<{
  type: ChartKind;
  data: ChartInputMap[ChartKind];
  extraOption?: Partial<ECOption>;
}>();

const chart = ref<HTMLElement | null>(null);
const chartContainer = ref<HTMLElement | null>(null);

function mergeOption<T extends ECOption>(base: T, extra?: Partial<T>): T {
  return extra ? Object.assign({}, base, extra) : base;
}

const finalOption = computed(() => {
  const base = chartFactory[props.type](props.data as any);
  return mergeOption(base, props.extraOption);
});
</script>

<style scoped></style>
