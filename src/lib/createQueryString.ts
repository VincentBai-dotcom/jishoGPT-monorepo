export const createQueryString = (
  searchParams: [{ name: string; value: string }]
) => {
  const params = new URLSearchParams();
  searchParams.map(({ name, value }) => {
    params.set(name, value);
  });
  return params.toString();
};
