import Typography from "@mui/material/Typography";
import { Locale } from "../../config/i18n-config";
import { getDictionary } from "../../get-dictionary";
import Counter from "./[game]/components/counter";
import { redirect } from "next/navigation";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  redirect("/battlefield1/servers");
}
