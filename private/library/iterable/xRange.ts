export function* xRange(start: number, stop?: number, step: number = 1): Iterable<number> {
  let actualStart = start;
  let actualStop = stop || start;
  if (stop == null) {
    actualStop = start;
    actualStart = 0;
  }
  for (let i = actualStart; i < actualStop; i += step) {
    yield i;
  }
}
