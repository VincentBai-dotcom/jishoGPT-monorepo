import { Locale } from "../../i18n.config";
import { getDictionary } from "@/lib/dictionaries";
import LocaleSwitcher from "./localeSwitcher";
import SignInModule from "./signInModule";

export default async function NavBar({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  return (
    <div className="navbar bg-base-100 absolute ">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">KnowYourWord.ai</a>
        <LocaleSwitcher params={{ lang: params.lang }}></LocaleSwitcher>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>{dict.navigation.blog}</a>
          </li>
        </ul>
        <SignInModule dict={dict.navigation.signInModule} />
        <a className="btn mx-2">{dict.navigation.signUp}</a>
      </div>
    </div>
  );
}
