"use client";
import { Locale } from "../../i18n.config";
import { i18n } from "../../i18n.config";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";

export default function LangSwitcher({ params }: { params: { lang: Locale } }) {
  const pathName = usePathname();

  const getNewLink = (locale: Locale) => {
    const pathSegments = pathName.split("/");
    pathSegments[1] = locale;
    const newPath = pathSegments.join("/");
    return newPath;
  };

  const getLangLists = () => {
    const locales = i18n.locales;
    return (
      <>
        {locales.map((locale: Locale, index) => {
          return (
            <li key={index}>
              <Link href={getNewLink(locale)}>{locale}</Link>
            </li>
          );
        })}
      </>
    );
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost rounded-btn mx-2">
        Dropdown
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
      >
        {getLangLists()}
      </ul>
    </div>
  );
}
