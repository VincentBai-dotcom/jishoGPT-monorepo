import { cookies } from "next/headers";
import SignInModal from "./SignInModal";
import RegistrationModal from "./RegistrationModal";
import AccountModule from "./AccountModule";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UserOperationModule() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {(function () {
        if (session) {
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
