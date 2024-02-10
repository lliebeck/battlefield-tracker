import { FrostbiteSearch } from "@/api/model/frostbiteSearch";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import axios from "axios";
import { Client } from "./client";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const servers = await axios.get<FrostbiteSearch>(
    "https://api.gametools.network//bf1/servers?name=bob"
  );
  const dictionary = await getDictionary(lang);

  return <Client dictionary={dictionary.server} />;
}
