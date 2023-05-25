import { useEffect, useState } from "react";
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
import * as DateFns from "date-fns";
import { useChartData } from "../../hooks/useChartData";
import { colors } from "./colors";
import { generateYAxisTicks } from "./utils";
import { RangeOption } from "./eunms";

export function ImmunaChart({
  range = RangeOption["7D"],
  className,
}: {
  range?: RangeOption;
  className?: string;
}) {
  const [startIndex, setStartIndex] = useState(-1);
  const [endIndex, setEndIndex] = useState(-1);

  const { data, isLoading } = useChartData({
    id: 1,
    range,
    onSuccess: (data) => {
      setStartIndex((prev) => (prev === -1 ? 0 : prev));
      setEndIndex((prev) => (prev === -1 ? data.length : prev));
    },
  });

  useEffect(() => {
    if (!data) {
      setStartIndex(-1);
      setEndIndex(-1);
    } else {
      setStartIndex(0);
      setEndIndex(data.length);
    }
  }, [range, data]);

  if (isLoading || !data) return <div>Loading...</div>;

  const xAxisTickFormatter = (value: number, index: number): string => {
    return DateFns.format(new Date(value * 1000), "yyyy-MM-dd");
  };
  const yAxisTickFormatter = (value: any, index: number): string => {
    return Math.round(Number(value)).toLocaleString();
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
  const {
    min: minPrice,
    max: maxPrice,
    ticks: yAxisTicks,
    off,
  } = generateYAxisTicks(
    Math.min(...data.slice(startIndex, endIndex + 1).map((item) => item["p"])),
    Math.max(...data.slice(startIndex, endIndex + 1).map((item) => item["p"])),
    openPrice
  );

  return (
    <div>
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
          <XAxis
            dataKey="t"
            stroke={colors.axis}
            tickFormatter={xAxisTickFormatter}
            tick={{
              fill: colors.tickLabel,
              fontSize: 12,
              fontWeight: 700,
              spacing: 10,
            }}
          />
          <YAxis
            domain={[minPrice, maxPrice]}
            stroke={colors.axis}
            tick={{
              fill: colors.tickLabel,
              fontSize: 12,
              fontWeight: 700,
            }}
            ticks={yAxisTicks}
            tickSize={0}
            tickMargin={10}
            tickFormatter={yAxisTickFormatter}
            orientation="right"
          />
          <ReferenceLine
            y={openPrice}
            stroke="grey"
            strokeWidth={1}
            strokeDasharray="1 3"
          />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset={0}
                stopColor="#32ce93"
                stopOpacity={Math.max(off, 0.3)}
              />
              <stop offset={off} stopColor="white" stopOpacity={0} />
              <stop
                offset={1}
                stopColor="#ea3943"
                stopOpacity={Math.max(1 - off, 0.3)}
              />
            </linearGradient>
            <linearGradient id="strokeColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#32ce93" stopOpacity={1} />
              <stop offset={off} stopColor="#ea3943" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={colors.grid} vertical={false} />
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
          <Brush
            dataKey="t"
            height={30}
            stroke="#8884d8"
            onChange={handleBrushChange}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
