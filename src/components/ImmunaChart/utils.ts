export function generateXAxisTicks(min: number, max: number) {
  const tickCount = 4;
  const ticks = [];
  for (let i = 0; i < tickCount; i++) {
    ticks.push(min + (i * (max - min)) / tickCount);
  }
  return { ticks };
}

export function generateYAxisTicks(min: number, max: number, open: number) {
  const off = (max - open) / (max - min);
  max *= 1.1;
  min *= 0.9;
  const tickCount = 4;
  const ticks = [];
  for (let i = 0; i < tickCount; i++) {
    ticks.push(min + (i * (max - min)) / tickCount);
  }
  return { min, max, ticks, off };
}
