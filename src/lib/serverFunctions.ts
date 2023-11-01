import { url } from "inspector";
import { json } from "stream/consumers";

const endpoint = "http://localhost:8000/";

export const isAuthenticated = async () => {};

export const signIn = async (email: string, password: string) => {
  const url = endpoint + "auth/signin";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  return response.json();
};

export const search = async (searchWord: string) => {};
