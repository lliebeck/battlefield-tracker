import { FrostbiteSearch } from "@/api/model/frostbiteSearch";
import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import axios, { AxiosResponse } from "axios";
import { Client } from "./client";

export default async function Page(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const params = await props.params;

  const {
    lang
  } = params;

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
        dictionary={{ server: dictionary.server, maps: dictionary.maps }}
      />
    </>
  );
}
