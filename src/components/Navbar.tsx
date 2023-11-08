import { Locale } from "../../i18n.config";
import { getDictionary } from "@/lib/dictionaries";
import Link from "next/link";
import UserOperationModule from "./UserOperationModule";

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
        <UserOperationModule />
      </div>
    </div>
  );
}
