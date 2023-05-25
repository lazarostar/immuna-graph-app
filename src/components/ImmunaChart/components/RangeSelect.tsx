import styled from "styled-components";
import { RangeOption } from "../eunms";

const options = [
  RangeOption["1D"],
  RangeOption["7D"],
  RangeOption["1M"],
  RangeOption["1Y"],
  RangeOption["ALL"],
];

export function RangeSelect({
  value,
  setValue,
}: {
  value: RangeOption;
  setValue: (value: RangeOption) => void;
}) {
  return (
    <Container>
      {options.map((option) => (
        <Item key={option} active={value === option} onClick={() => setValue(option)}>
          {option}
        </Item>
      ))}
    </Container>
  );
}

const Container = styled.ul({
  display: "inline-flex",
  listStyle: "none",
  backgroundColor: "#ddd",
  borderRadius: 4,
  margin: 0,
  padding: "8px",
  gap: 10,
});

const Item = styled.li<{ active: boolean }>({
  borderRadius: 4,
  backgroundColor: ({ active }) => (active ? "white" : "trans"),
  color: "black",
  cursor: "pointer",
  padding: "4px 8px",
});
