import { useQuery } from "react-query";
import { fetchChartData } from "../services/fetchChartData";
import { ChartPoint } from "../types/ChartPoint";

export function useChartData({
  id,
  range,
  onSuccess,
}: {
  id: number;
  range: string;
  onSuccess: (data: ChartPoint[]) => void;
}) {
  return useQuery<ChartPoint[]>({
    queryKey: ["chart", id, range],
    queryFn: () =>
      fetchChartData({ id, range }).then((pointsObj) => {
        return Object.entries(pointsObj).map(
          ([time, point]): ChartPoint => ({
            t: Number(time),
            p: Number(point["v"][0]),
            c: Number(point["v"][1]),
          })
        );
      }),
    onSuccess,
  });
}
