import { colors } from "../colors";

export function CustomizedLabel(props: any) {
  const { viewBox, value } = props;
  console.log(viewBox, value);
  return (
    <svg x={viewBox.x} y={viewBox.y - 10} width={30} height={20}>
      <rect x="0" y="0" width="30" height="20" fill="#fffa" />
      <text
        x={15}
        y={10}
        fill={colors.tickLabel}
        fontSize={10}
        fontWeight={"bold"}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {Math.round(value).toLocaleString()}
      </text>
    </svg>
  );
}
