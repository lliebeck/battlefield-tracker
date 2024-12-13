import { Locale } from "@/config/i18n-config";
import { redirect } from "next/navigation";

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;

  redirect(`/${lang ?? "en-us"}/home`);
}
