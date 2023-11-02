const endpoint = "http://localhost:8000/";

export const isAuthenticated = async () => {
  const url = endpoint + "auth/is-authenticated";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      mode: "cors",
    },
    credentials: "include",
  });
  console.log(response.status);
  return response;
};

export const signIn = async (email: string, password: string) => {
  const url = endpoint + "auth/signin";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
    },
    credentials: "include",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  return response;
};

export const signUp = async (
  email: string,
  username: string,
  password: string
) => {
  const url = endpoint + "auth/signup";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  });

  return response;
};

export const logOut = async () => {
  const url = endpoint + "auth/logout";
  const response = await fetch(url, {
    method: "POST",
  });

  return response;
};

export const search = async (searchString: string) => {
  const url = endpoint + "dict/search";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
    },
    body: JSON.stringify({
      searchString: searchString,
    }),
  });

  return response;
};
