import { isAuthenticated } from "@/lib/serverFunctions";
import SignInModule from "./signInModule";
import RegistrationModule from "./registrationModule";

export default async function UserOperationModule() {
  const response = await isAuthenticated();

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
