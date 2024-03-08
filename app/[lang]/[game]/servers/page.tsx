import { FrostbiteSearch } from "@/api/model/frostbiteSearch";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import axios, { AxiosResponse } from "axios";
import { Client } from "./client";
import Image from "next/image";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  let servers: AxiosResponse<FrostbiteSearch, any> | undefined = undefined;

  try {
    servers = await axios.get<FrostbiteSearch>(
      "https://api.gametools.network//bf1/servers?name=bob&limit=50"
    );
  } catch (ex) {
    //
  }
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Client
        dictionaryServer={dictionary.server}
        dictionaryMaps={dictionary.maps}
      />
    </>
  );
}
