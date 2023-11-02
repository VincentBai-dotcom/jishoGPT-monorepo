"use server";
import { cookies } from "next/headers";

const endpoint = "http://localhost:8000/";

const sendRequest = async (url: string, method: string, body?: string) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Cookie: cookies().toString(),
    },
    credentials: "include",
    body: body,
  });

  return response;
};

export const isAuthenticated = async () => {
  const url = endpoint + "auth/is-authenticated";
  const response = await sendRequest(url, "POST");
  console.log(response.status);
  return response;
};

export const signIn = async (email: string, password: string) => {
  const url = endpoint + "auth/signin";
  const body = JSON.stringify({
    email: email,
    password: password,
  });
  const response = await sendRequest(url, "POST", body);
  return response;
};

export const signUp = async (
  email: string,
  username: string,
  password: string
) => {
  const url = endpoint + "auth/signup";
  const body = JSON.stringify({
    email: email,
    username: username,
    password: password,
  });
  const response = await sendRequest(url, "POST", body);
  return response;
};

export const logOut = async () => {
  const url = endpoint + "auth/logout";
  const response = await sendRequest(url, "POST");
  return response;
};

// export const search = async (searchString: string) => {
//   const url = endpoint + "dict/search";
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       mode: "cors",
//     },
//     body: JSON.stringify({
//       searchString: searchString,
//     }),
//   });

//   return response;
// };
