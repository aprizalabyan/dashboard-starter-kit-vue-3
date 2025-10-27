export * from "./types";
export { makeBarOption } from "./type/bar";
export { makeLineOption } from "./type/line";
export { makePieOption } from "./type/pie";

import type { ChartKind, ChartInputMap, ECOption } from "./types";
import { makeBarOption } from "./type/bar";
import { makeLineOption } from "./type/line";
import { makePieOption } from "./type/pie";

export const chartFactory: {
  [K in ChartKind]: (input: ChartInputMap[K]) => ECOption;
} = {
  bar: makeBarOption,
  line: makeLineOption,
  pie: makePieOption,
};
