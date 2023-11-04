import { cookies } from "next/headers";
import SignInModal from "./signInModal";
import RegistrationModal from "./registrationModal";
import AccountModule from "./accountModule";

export default async function UserOperationModule() {
  return (
    <>
      {(function () {
        if (false) {
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
