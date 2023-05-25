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
  const diff = max - min;
  max += diff * 0.1;
  min = Math.max(min - diff * 0.1, 0);
  const tickCount = 4;
  const ticks = [];
  for (let i = 0; i < tickCount; i++) {
    ticks.push(min + (i * (max - min)) / tickCount);
  }
  return { min, max, ticks, off };
}
