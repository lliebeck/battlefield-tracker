import { Locale } from "@/config/i18n-config";
import { redirect } from "next/navigation";

export default async function Page(
  props: {
    params: Promise<{ lang: Locale; gameid: string }>;
  }
) {
  const params = await props.params;

  const {
    lang,
    gameid
  } = params;

  redirect(`/${lang}/bf1/servers/${gameid}/players`);
}
