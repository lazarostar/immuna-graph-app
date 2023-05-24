import { useState } from "react";
import {
  Area,
  AreaChart,
  Brush,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartData } from "../../hooks/useChartData";

export function ImmunaChart({ className }: { className?: string }) {
  const [startIndex, setStartIndex] = useState(-1);
  const [endIndex, setEndIndex] = useState(-1);
  const { data, isLoading } = useChartData({
    id: 1027,
    range: "ALL",
    onSuccess: (data) => {
      setStartIndex((prev) => (prev === -1 ? 0 : prev));
      setEndIndex((prev) => (prev === -1 ? data.length - 1 : prev));
    },
  });

  if (isLoading || !data) return <div>Loading...</div>;

  const yAxisTickFormatter = (value: any, index: number): string => {
    return Math.round(Number(value)) + "";
  };

  const handleBrushChange = ({
    startIndex,
    endIndex,
  }: {
    startIndex?: number;
    endIndex?: number;
  }) => {
    setStartIndex(startIndex || 0);
    setEndIndex(endIndex || 0);
  };

  const openPrice = data[0]["p"];
  const maxPrice =
    Math.max(...data.slice(startIndex, endIndex + 1).map((item) => item["p"])) *
    1.1;
  const minPrice =
    Math.min(...data.slice(startIndex, endIndex).map((item) => item["p"])) *
    0.9;
  const off = (maxPrice - openPrice) / (maxPrice - minPrice);

  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="t" />
        <YAxis
          domain={[minPrice, maxPrice]}
          tickFormatter={yAxisTickFormatter}
          orientation="right"
        />
        <Tooltip />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={0} stopColor="#32ce93" stopOpacity={1} />
            <stop offset={off} stopColor="white" stopOpacity={0} />
            <stop offset={1} stopColor="#ea3943" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="strokeColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="#32ce93" stopOpacity={1} />
            <stop offset={off} stopColor="#ea3943" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          type="linear"
          dataKey="p"
          stroke="url(#strokeColor)"
          fill="url(#splitColor)"
          strokeWidth={2}
          strokeLinecap="butt"
          baseValue={openPrice}
          baseLine={1}
        />
        <ReferenceLine y={openPrice} stroke="grey" strokeDasharray="1 3" />
        <Brush
          dataKey="t"
          height={30}
          stroke="#8884d8"
          onChange={handleBrushChange}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
