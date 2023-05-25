import styled from "styled-components";
import * as DateFns from "date-fns";
import { colors } from "../colors";

export function CustomizedTooltip(props: any) {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Container>
        <DateTime>
          <DateLabel>
            {DateFns.format(new Date(data["t"] * 1000), "M/d/yyyy")}
          </DateLabel>
          <TimeLabel>
            {DateFns.format(new Date(data["t"] * 1000), "hh:mm aa")}
          </TimeLabel>
        </DateTime>
        <Info>
          <InfoItem>
            <label>Price:</label>
            <InfoValue>${data["p"].toFixed(2).toLocaleString()}</InfoValue>
          </InfoItem>
          <InfoItem>
            <label> Vol 24h:</label>
            <InfoValue>${data["c"].toLocaleString()}</InfoValue>
          </InfoItem>
        </Info>
      </Container>
    );
  }

  return null;
}

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  minWidth: 100,
  padding: 12,
  backgroundColor: "white",
  borderRadius: 8,
  boxShadow: "3px 3px 20px 5px rgba(0, 0, 0, 0.2)",
});

const DateTime = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: 12,
  fontWeight: "bold",
});

const DateLabel = styled.div({
  color: "black",
});

const TimeLabel = styled.div({
  color: colors.darkGrey,
});

const Info = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const InfoItem = styled.div({
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: colors.darkGrey,
  fontWeight: "bold",
  fontSize: 12,
});

const InfoValue = styled.div({
  color: "black",
});
