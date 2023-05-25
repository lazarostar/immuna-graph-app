import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  Brush,
  CartesianGrid,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartData } from "../../hooks/useChartData";
import { colors } from "./colors";
import { CustomizedDot } from "./components/CustomizedDot";
import { CustomizedLabel } from "./components/CustomizedLabel";
import { CustomizedTooltip } from "./components/CustomizedTooltip";
import { CustomizedTraveller } from "./components/CustomizedTraveller";
import { Loader } from "./components/Loader";
import { RangeOption } from "./eunms";
import {
  generateYAxisTicks,
  xAxisTickFormatter,
  yAxisTickFormatter,
} from "./utils";

export function ImmunaChart({
  currency = 1,
  range = RangeOption["7D"],
  className,
}: {
  currency?: number;
  range?: RangeOption;
  className?: string;
}) {
  const [startIndex, setStartIndex] = useState<number>(-1);
  const [endIndex, setEndIndex] = useState<number>(-1);

  const { data, isLoading } = useChartData({
    id: currency,
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

  if (isLoading || !data) return <Loader />;

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

  const {
    open: openPrice,
    min: minPrice,
    max: maxPrice,
    ticks: yAxisTicks,
    off,
  } = generateYAxisTicks(data, startIndex, endIndex);

  const maxVolume = Math.max(
    ...data.slice(startIndex, endIndex + 1).map((item) => item["c"])
  );

  return (
    <div>
      <ResponsiveContainer width="100%" height={400} className={className}>
        <ComposedChart
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
            stroke={colors.lightGrey2}
            tickFormatter={xAxisTickFormatter}
            tick={{
              fill: colors.darkGrey3,
              fontSize: 10,
              fontWeight: 700,
              spacing: 10,
            }}
          />
          <YAxis
            yAxisId="areaAxis"
            domain={[minPrice, maxPrice]}
            stroke={colors.lightGrey2}
            tick={{
              fill: colors.darkGrey3,
              fontSize: 10,
              fontWeight: 700,
            }}
            ticks={yAxisTicks}
            tickSize={0}
            tickMargin={5}
            tickFormatter={yAxisTickFormatter}
            orientation="right"
          />
          <YAxis
            yAxisId="barAxis"
            domain={[0, maxVolume * 10]}
            stroke={colors.lightGrey2}
            orientation="right"
            hide={true}
          />
          <Tooltip content={<CustomizedTooltip />} />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset={0}
                stopColor={colors.positive}
                stopOpacity={Math.max(off, 0.3)}
              />
              <stop offset={off} stopColor="white" stopOpacity={0} />
              <stop
                offset={1}
                stopColor={colors.negative}
                stopOpacity={Math.max(1 - off, 0.3)}
              />
            </linearGradient>
            <linearGradient id="strokeColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor={colors.positive} stopOpacity={1} />
              <stop offset={off} stopColor={colors.negative} stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={colors.lightGrey} vertical={false} />
          <Area
            yAxisId="areaAxis"
            type="linear"
            dataKey="p"
            stroke="url(#strokeColor)"
            fill="url(#splitColor)"
            strokeWidth={2}
            strokeLinecap="butt"
            baseValue={openPrice}
            baseLine={1}
            activeDot={<CustomizedDot openPrice={openPrice} />}
          />
          <Bar
            dataKey="c"
            fill={colors.lightGrey3}
            yAxisId="barAxis"
            height={30}
          />
          <ReferenceLine
            yAxisId="areaAxis"
            y={openPrice}
            stroke="grey"
            strokeWidth={1}
            strokeDasharray="1 3"
            label={<CustomizedLabel value={openPrice} />}
          />
          <Brush
            dataKey="t"
            height={30}
            stroke={colors.darkGrey2}
            fill={colors.white}
            onChange={handleBrushChange}
            traveller={<CustomizedTraveller />}
            travellerWidth={0}
            tickFormatter={() => ""}
          >
            <AreaChart>
              <Area
                type="monotone"
                dataKey="p"
                stroke={colors.lightGrey2}
                fill={colors.lightGrey2}
              />
              <YAxis domain={["auto", "auto"]} hide={true} />
            </AreaChart>
          </Brush>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
