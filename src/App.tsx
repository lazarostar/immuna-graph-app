import React, { useState } from "react";
import { ImmunaChart } from "./components/ImmunaChart";
import { styled } from "styled-components";
import { RangeOption } from "./components/ImmunaChart/eunms";
import { RangeSelect } from "./components/ImmunaChart/components/RangeSelect";

function App() {
  const [range, setRange] = useState<RangeOption>(RangeOption["7D"]);
  const [currency, setCurrency] = useState<number>(1);

  const handleChange = (e: any) => {
    setCurrency(Number(e.target.value));
  };

  return (
    <Container>
      <select value={currency} onChange={handleChange}>
        <option value={1}>Bitcoin</option>
        <option value={1027}>Ethereum</option>
        <option value={3408}>USDC</option>
      </select>
      <RangeSelect value={range} setValue={setRange} />
      <ImmunaChart currency={currency} range={range} />
    </Container>
  );
}

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: 10,
});

export default App;
