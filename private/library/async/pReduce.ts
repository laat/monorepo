// TODO(laat): Document this better
//
// const promises = Array(10).fill(1).map(Promise.resolve); // a list of promises
// const add = (a, b) => a + b
// const sum = await pReduce(promises, add, 0)
export const pReduce = <T, R>(
  iterable: Array<Promise<T> | T>,
  reducer: (accumulator: R, element: T) => R | Promise<R>,
  initValue: Promise<R> | R
): Promise<R> =>
  iterable.reduce(
    async (accumulator, element) => reducer(await accumulator, await element),
    Promise.resolve(initValue)
  );
