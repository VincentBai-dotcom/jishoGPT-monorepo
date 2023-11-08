import { cookies } from "next/headers";
import SignInModal from "./SignInModal";
import RegistrationModal from "./RegistrationModal";
import AccountModule from "./AccountModule";
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
