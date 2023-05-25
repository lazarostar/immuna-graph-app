import { Dot } from "recharts";
import { colors } from "../colors";

export function CustomizedDot(props: any) {
  const { cx, cy, payload, openPrice } = props;
  const fill = payload.p > openPrice ? colors.positive : colors.negative;

  return (
    <Dot cx={cx} cy={cy} r={5} fill={fill} stroke="#fff" strokeWidth={2} />
  );
}
