import { Locale } from "../../i18n.config";
import { getDictionary } from "@/lib/dictionaries";
import LocaleSwitcher from "./localeSwitcher";
import SignInModule from "./signInModule";
import Link from "next/link";
import RegistrationModule from "./registrationModule";

export default async function NavBar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href={`/`} className="btn btn-ghost normal-case text-xl">
          JishoGPT
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Blog</a>
          </li>
        </ul>
        <SignInModule />
        <RegistrationModule />
      </div>
    </div>
  );
}
