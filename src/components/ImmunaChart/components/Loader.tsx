import styled from "styled-components";
import React from "react";
import * as Spinner from "react-loader-spinner";

export function Loader() {
  return (
    <Container>
      <Spinner.RotatingLines width="24px" strokeColor="#555" />
      <LoadingLabel>Loading Data...</LoadingLabel>
      <WaitLabel>Please wait a moment.</WaitLabel>
    </Container>
  );
}

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 100,
  gap: 10,
});

const LoadingLabel = styled.div({
  fontSize: 18,
  fontWeight: "bold",
});

const WaitLabel = styled.div({
  fontSize: 14,
  color: "#555",
});
