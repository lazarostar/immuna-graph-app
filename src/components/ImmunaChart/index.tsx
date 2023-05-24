import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartData } from "../../hooks/useChartData";

export function ImmunaChart() {
  const { data, isLoading } = useChartData({ id: 1027, range: "7D" });

  if (isLoading) return <div>Loading...</div>;

  if (data)
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={0} stopColor="blue" stopOpacity={1} />
              <stop offset={0.5} stopColor="white" stopOpacity={0} />
              <stop offset={1} stopColor="red" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="strokeColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={0.5} stopColor="blue" stopOpacity={1} />
              <stop offset={0.5} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="p"
            stroke="url(#strokeColor)"
            fill="url(#splitColor)"
            baseValue={1}
            baseLine={1}
          />
          <ReferenceLine y={1} stroke="grey" />
          <Brush dataKey="t" height={30} stroke="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );

  return null;
}
