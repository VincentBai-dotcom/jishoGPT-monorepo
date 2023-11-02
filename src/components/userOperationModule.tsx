import { cookies } from "next/headers";
import { isAuthenticated } from "@/lib/serverFunctions";
import SignInModal from "./signInModal";
import RegistrationModal from "./registrationModal";
import AccountModule from "./accountModule";

export default async function UserOperationModule() {
  const response = await isAuthenticated();
  return (
    <>
      {(function () {
        if (response.ok) {
          return <AccountModule />;
        } else {
          return (
            <>
              <SignInModal />
              <RegistrationModal />
            </>
          );
        }
      })()}
    </>
  );
}
