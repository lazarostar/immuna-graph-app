import React, { useState } from "react";
import { ImmunaChart } from "./components/ImmunaChart";
import { styled } from "styled-components";
import { RangeOption } from "./components/ImmunaChart/eunms";
import { RangeSelect } from "./components/ImmunaChart/components/RangeSelect";

function App() {
  const [range, setRange] = useState<RangeOption>(RangeOption["7D"]);

  return (
    <Container>
      <RangeSelect value={range} setValue={setRange} />
      <ImmunaChart range={range} />
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
