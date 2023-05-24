import { useQuery } from "react-query";
import { fetchChartData } from "../services/fetchChartData";
import { ChartPoint } from "../types/ChartPoint";

export function useChartData({ id, range }: { id: number; range: string }) {
  return useQuery<ChartPoint[]>({
    queryKey: ["chart", id, range],
    queryFn: () =>
      fetchChartData({ id, range }).then((pointsObj) => {
        return Object.entries(pointsObj).map(([time, point]): ChartPoint => {
          return {
            t: Number(time),
            p: Number(point["v"][0]),
            c: Number(point["v"][1]),
          };
        });
      }),
  });
}
