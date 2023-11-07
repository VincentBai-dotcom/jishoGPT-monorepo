"use client";
import { Locale } from "../../i18n.config";
import { i18n } from "../../i18n.config";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { localeNameToLangName } from "@/lib/dictionaries";
import { HiLanguage } from "react-icons/hi2";

export default function LocaleSwitcher({
  params,
}: {
  params: { lang: Locale };
}) {
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
              <Link
                href={getNewLink(locale)}
                className={locale == params.lang ? "active" : ""}
              >
                {localeNameToLangName[locale]}
              </Link>
            </li>
          );
        })}
      </>
    );
  };

  return (
    <div className="dropdown dropdown-bottom">
      <label tabIndex={0} className="btn btn-ghost rounded-btn mx-2">
        <HiLanguage />
        {localeNameToLangName[params.lang]}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {getLangLists()}
      </ul>
    </div>
  );
}
