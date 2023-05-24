import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartData } from "../../hooks/useChartData";

// const data: any = [];

// for (let i = 0; i < 100000; i += 100) {
//   data.push({
//     v: 16000000 + i,
//     p:
//       Math.sin(((i / 100) * Math.PI) / 180) * 0.02 +
//       1 +
//       Math.random() * 0.005 -
//       0.00025,
//     c: Math.random() * 100 + 100000,
//   });
// }

export function ImmunaChart() {
  const { data } = useChartData({ id: 1027, range: "7D" });
  console.log(data);

  return <div>Hello</div>;

  // return (
  //   <AreaChart
  //     width={500}
  //     height={400}
  //     data={data}
  //     margin={{
  //       top: 10,
  //       right: 30,
  //       left: 0,
  //       bottom: 0,
  //     }}
  //   >
  //     <CartesianGrid strokeDasharray="3 3" />
  //     <XAxis dataKey="v" />
  //     <YAxis domain={["auto", "auto"]} />
  //     <Tooltip />
  //     <defs>
  //       <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
  //         <stop offset={0} stopColor="blue" stopOpacity={1} />
  //         <stop offset={0.5} stopColor="white" stopOpacity={0} />
  //         <stop offset={1} stopColor="red" stopOpacity={1} />
  //       </linearGradient>
  //       <linearGradient id="strokeColor" x1="0" y1="0" x2="0" y2="1">
  //         <stop offset={0.5} stopColor="blue" stopOpacity={1} />
  //         <stop offset={0.5} stopColor="red" stopOpacity={1} />
  //       </linearGradient>
  //     </defs>
  //     <Area
  //       type="monotone"
  //       dataKey="p"
  //       stroke="url(#strokeColor)"
  //       fill="url(#splitColor)"
  //       baseValue={1}
  //       baseLine={1}
  //     />
  //     <ReferenceLine y={1} stroke="grey" />
  //     <Brush dataKey="v" height={30} stroke="#8884d8" />
  //   </AreaChart>
  // );
}
