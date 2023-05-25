export function generateYAxisTicks(min: number, max: number, open: number) {
  const off = (max - open) / (max - min);
  const diff = max - min;
  max += diff * 0.1;
  min = min - diff * 0.2;
  const tickCount = 4;
  const ticks = [];
  for (let i = 0; i < tickCount; i++) {
    ticks.push(min + (i * (max - min)) / tickCount);
  }
  return { min, max, ticks, off };
}
