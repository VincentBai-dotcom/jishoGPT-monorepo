export const sendRequest = (url: string, body: string) => {
  return fetch(process.env.API_PATH + url, {
    body,
    method: "POST",
  });
};
