import { Locale } from "../../i18n.config";
import { getDictionary } from "@/lib/dictionaries";
import LocaleSwitcher from "./localeSwitcher";
import SignInModule from "./signInModule";
import Link from "next/link";
import RegistrationModule from "./registrationModule";

export default async function NavBar({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link
          href={`/${params.lang}`}
          className="btn btn-ghost normal-case text-xl"
        >
          ChatJisho.ai
        </Link>
        <LocaleSwitcher params={{ lang: params.lang }}></LocaleSwitcher>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>{dict.navigation.blog}</a>
          </li>
        </ul>
        <SignInModule dict={dict.navigation.signInModule} />
        <RegistrationModule
          dict={dict.navigation.signUpPage}
          lang={params.lang}
        ></RegistrationModule>
      </div>
    </div>
  );
}
