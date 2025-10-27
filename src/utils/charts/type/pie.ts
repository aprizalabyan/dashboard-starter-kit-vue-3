import type { PieInput, ECOption } from "../types";

const baseCommon: Partial<ECOption> = {
  legend: {
    top: 0,
  },
  grid: { left: 24, right: 16, top: 48, bottom: 32, outerBoundsMode: "auto" },
};

export function makePieOption(input: PieInput): ECOption {
  return {
    ...baseCommon,
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: { show: false, position: "center" },
        labelLine: {
          show: false,
        },
        emphasis: { label: { show: true, fontSize: 14 } },
        data: input.data,
      },
    ],
  };
}
