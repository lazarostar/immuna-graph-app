import { Area } from "recharts";

export function CustomizedBrush(props: any) {
  const { x, y, width, height, data, startIndex, endIndex } = props;
  return (
    <g>
      <text x={x} y={y}>
        Hello
      </text>
      <Area
        x={x}
        y={y}
        width={width}
        height={height}
        dataKey={"p"}
        stroke="black"
        fill="black"
      />
    </g>
  );
}
