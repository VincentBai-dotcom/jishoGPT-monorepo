export const promiseWithTimeout = <T>(
  promise: Promise<T>,
  ms: number
): Promise<T> => {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject("timeoutError");
    }, ms);
  });

  return Promise.race([promise, timeout]);
};
