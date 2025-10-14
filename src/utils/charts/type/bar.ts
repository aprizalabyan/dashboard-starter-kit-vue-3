import type { BarInput, ECOption } from "../types";

const baseCommon: Partial<ECOption> = {
  tooltip: { trigger: "axis" },
  legend: {
    top: 0,
  },
  grid: { left: 24, right: 16, top: 48, bottom: 32, outerBoundsMode: "auto" },
};

export function makeBarOption(input: BarInput): ECOption {
  return {
    ...baseCommon,
    xAxis: { type: "category", data: input.categories },
    yAxis: { type: "value" },
    series: input.series.map((s) => ({
      ...s,
      type: "bar",
    })),
  };
}
