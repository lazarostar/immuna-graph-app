import { ChartDataResponse } from "../types/ChartDataResponse";

async function sleep(duration: number) {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
}

export async function fetchChartData({
  id,
  range,
}: {
  id: number;
  range: string;
}): Promise<ChartDataResponse> {
  // import mockup data from json
  const response = await import(`../mockup/chart/${id}-${range}.json`);

  // mockup delay for 1000~2000ms
  await sleep(Math.random() * 1000 + 500);

  return response?.data?.points;
}
