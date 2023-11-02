import { cookies } from "next/headers";
import { isAuthenticated } from "@/lib/serverFunctions";
import SignInModule from "./signInModule";
import RegistrationModule from "./registrationModule";

async function getData() {
  const response = await fetch("http://localhost:8000/auth/is-authenticated", {
    method: "POST",
    headers: {
      mode: "cors",
      Cookie: cookies().toString(),
    },
    credentials: "include",
  });
  console.log(response.status);
  return response;
}

export default async function UserOperationModule() {
  const response = await getData();
  return (
    <>
      {(function () {
        if (response.ok) {
          return <div className="btn mx1">Log Out</div>;
        } else {
          return (
            <>
              <SignInModule />
              <RegistrationModule />
            </>
          );
        }
      })()}
    </>
  );
}
