import { colors } from "../colors";

export function CustomizedTraveller(props: any) {
  const { x, y, width, height } = props;

  return (
    <g>
      <ellipse
        cx={x + width / 2}
        cy={y + height / 2}
        rx={5}
        ry={7}
        fill={colors.white}
        stroke={colors.lightGrey2}
      />
      <line
        x1={x + width / 2 - 1.2}
        y1={y + height / 2 - 2}
        x2={x + width / 2 - 1.2}
        y2={y + height / 2 + 2}
        stroke={colors.darkGrey}
      />
      <line
        x1={x + width / 2 + 1.2}
        y1={y + height / 2 - 2}
        x2={x + width / 2 + 1.2}
        y2={y + height / 2 + 2}
        stroke={colors.darkGrey}
      />
    </g>
  );
}
