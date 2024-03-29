import { useBfvDetailedServersBfvDetailedserverGet } from "@/api/battlefield-5/battlefield-5";
import { ServerInfo } from "@/app/[lang]/components/ServerInfo/ServerInfo";
import LinearProgress from "@mui/material/LinearProgress";
import { useParams } from "next/navigation";
import { ICombinedDictionaries } from "../tabs.types";
import { Bf5DetailedServerInfo } from "@/api/model/bf5DetailedServerInfo";

type Props = {
  dictionary: ICombinedDictionaries;
  serverInfo: Bf5DetailedServerInfo | undefined;
};

export const ServerInfoClient = ({ dictionary, serverInfo }: Props) => {
  return <ServerInfo serverInfo={serverInfo} dictionary={dictionary} />;
};
