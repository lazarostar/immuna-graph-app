import * as DateFns from "date-fns";
import { ChartPoint } from "../../types/ChartPoint";

export function generateYAxisTicks(
  data: ChartPoint[],
  startIndex: number,
  endIndex: number
) {
  const prices = data.slice(startIndex, endIndex + 1).map((item) => item["p"]);
  let max = Math.max(...prices);
  let min = Math.min(...prices);
  let open = data[0]["p"];

  const off = (max - open) / (max - min);
  const diff = max - min;
  max += diff * 0.1;
  min = min - diff * 0.2;
  const tickCount = 4;
  const ticks = [];
  for (let i = 0; i < tickCount; i++) {
    ticks.push(min + (i * (max - min)) / tickCount);
  }
  return { min, max, open, ticks, off };
}

export function xAxisTickFormatter(value: number, index: number): string {
  return DateFns.format(new Date(value * 1000), "yyyy-MM-dd");
}
export function yAxisTickFormatter(value: any, index: number): string {
  return value < 0 ? "" : Math.round(Number(value)).toLocaleString();
}
