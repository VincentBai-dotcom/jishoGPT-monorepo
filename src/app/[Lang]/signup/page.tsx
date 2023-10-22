import { Locale } from "../../../../i18n.config";
import { getDictionary } from "@/lib/dictionaries";
export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = (await getDictionary(params.lang))["signUpPage"];

  return <main className="bg-base-100"></main>;
}
