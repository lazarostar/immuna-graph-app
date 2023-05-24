import React from "react";
import { ImmunaChart } from "./components/ImmunaChart";
import { styled } from "styled-components";

function App() {
  return (
    <Container>
      <ImmunaChart />
    </Container>
  );
}

const Container = styled.div({
  padding: 10,
});

export default App;
