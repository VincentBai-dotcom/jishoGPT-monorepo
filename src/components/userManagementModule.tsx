import { isAuthenticated, logOut } from "@/lib/serverFunctions";
import SignInModule from "./signInModule";
import RegistrationModule from "./registrationModule";
import { redirect } from "next/navigation";

export default async function UserManagementModule() {
  const isLoggedIn = await isAuthenticated();

  const onSubmit = async () => {
    await logOut();
    redirect("");
  };

  const renderComponent = () => {
    if (!isLoggedIn) {
      return <></>;
    } else {
      return (
        <button className="btn mx-1" onClick={onSubmit}>
          Log Out
        </button>
      );
    }
  };

  return renderComponent();
}
