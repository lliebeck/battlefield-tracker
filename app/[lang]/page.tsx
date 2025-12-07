import { Locale } from "@/config/i18n-config";
import { redirect } from "next/navigation";

export default async function IndexPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;

  redirect(`/${lang ?? "en-us"}/home`);
}
