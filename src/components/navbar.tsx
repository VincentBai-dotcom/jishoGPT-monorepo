import { Locale } from "../../i18n.config";
import { getDictionary } from "@/lib/dictionaries";
import LangSwitcher from "./langSwitcher";

export default async function NavBar({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  return (
    <div className="navbar bg-base-100 absolute">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">KnowYourWord.ai</a>
        <LangSwitcher params={{ lang: params.lang }} />
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>{dict.navigation.blog}</a>
          </li>
        </ul>
        <a className="btn mx-2">{dict.account.signIn}</a>
        <a className="btn mx-2">{dict.account.signUp}</a>
      </div>
    </div>
  );
}
