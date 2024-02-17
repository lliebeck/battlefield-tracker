"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useBf1detailedserversBf1DetailedserverGet,
  useBf1playersBf1PlayersGet,
} from "@/api/battlefield-1/battlefield-1";
import { Bf1DetailedServerInfo } from "@/api/model/bf1DetailedServerInfo";
import { getDictionary } from "@/get-dictionary";
import Box from "@mui/material/Box";
import { useParams, useRouter } from "next/navigation";
import { ServerDashboard } from "./components/ServerDashboard";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

type Props = {
  servers?: Bf1DetailedServerInfo;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["player"];
};

export const Client = ({ servers: initialServers, dictionary }: Props) => {
  const { gameid } = useParams();
  const router = useRouter();
  const { data: server, isLoading } = useBf1detailedserversBf1DetailedserverGet(
    {
      gameid: gameid as string,
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  const { data: bf1ServerPlayers, isLoading: isPlayersLoading } =
    useBf1playersBf1PlayersGet(
      {
        gameid: gameid as string,
      }
      // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
    );

  return (
    <Box marginX={3}>
      <Toolbar>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography marginLeft={1} variant={"h5"}>
          {server?.data?.prefix}
        </Typography>
      </Toolbar>
      <ServerDashboard
        bf1ServerPlayers={bf1ServerPlayers?.data}
        dictionary={dictionary}
      />
    </Box>
  );
};
