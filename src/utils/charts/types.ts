// ---- ECharts option typing ----
import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from "echarts/charts";
import type {
  GridComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  DatasetComponentOption,
} from "echarts/components";
import type { ComposeOption } from "echarts/core";

// ----- Register chart type -----
export type ChartKind = "bar" | "line" | "pie";

// ----- Type for input data -----
export type BarInput = { categories?: string[]; series: Array<Partial<BarSeriesOption>> };
export type LineInput = {
  categories?: string[];
  series: Array<Partial<LineSeriesOption>>;
};
export type PieInput = { data: Array<{ name: string; value: number }> };

// ----- Mapping input data type to chart kind -----
export type ChartInputMap = {
  bar: BarInput;
  line: LineInput;
  pie: PieInput;
};

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | GridComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | TitleComponentOption
  | DatasetComponentOption
>;
