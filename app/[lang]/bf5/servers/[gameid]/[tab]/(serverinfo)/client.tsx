import { useBfvDetailedServersBfvDetailedserverGet } from "@/api/battlefield-5/battlefield-5";
import { ServerInfo } from "@/app/[lang]/components/ServerInfo/ServerInfo";
import LinearProgress from "@mui/material/LinearProgress";
import { useParams } from "next/navigation";
import { ICombinedDictionaries } from "../tabs.types";

type Props = {
  dictionary: ICombinedDictionaries;
};

export const ServerInfoClient = ({ dictionary }: Props) => {
  const { gameid, lang } = useParams();
  const { data: serverInfo, isLoading } =
    useBfvDetailedServersBfvDetailedserverGet(
      {
        gameid: gameid as string,
        lang: lang.toString() ?? "en-us",
      },
      { query: { select: (x) => x.data } }
      // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
    );

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <ServerInfo
      serverInfo={serverInfo}
      isLoading={isLoading}
      dictionary={dictionary}
    />
  );
};
