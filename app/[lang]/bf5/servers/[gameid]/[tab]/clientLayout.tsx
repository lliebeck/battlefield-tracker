"use client";
import { useBfvDetailedServersBfvDetailedserverGet } from "@/api/battlefield-5/battlefield-5";
import { getDictionary } from "@/get-dictionary";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { ServerRoutes } from "./tabs.types";

type LinkTabProps = {
  label?: string;
  href?: string;
  selected?: boolean;
};

const LinkTab = (props: LinkTabProps) => {
  return (
    <Tab
      component="a"
      href={props.href}
      aria-current={props.selected && "page"}
      {...props}
    />
  );
};

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["general"];
};

export default function ClientLayout({
  children,
  dictionary,
}: Props & React.PropsWithChildren) {
  const router = useRouter();
  const { gameid, lang, tab } = useParams();

  const value = useMemo(() => {
    const currentTab = tab as ServerRoutes;
    switch (currentTab) {
      case ServerRoutes.PLAYERS:
        return 0;
      case ServerRoutes.INFO:
        return 1;
    }
  }, [tab]);

  const { data: serverInfo } = useBfvDetailedServersBfvDetailedserverGet(
    {
      gameid: gameid as string,
      lang: lang.toString() ?? "en-us",
    },
    { query: { select: (x) => x.data } }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  return (
    // Subtract height from CustomAppBar, header and tabs plus some margin
    <Box height={`calc(100% - 176px - 4px)`}>
      <Toolbar>
        <IconButton onClick={() => router.push(`/${lang}/bf5/servers`)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography marginLeft={1} variant={"h5"} noWrap>
          {serverInfo?.prefix}
        </Typography>
      </Toolbar>
      <Box marginX={3} height={"100%"}>
        <Tabs value={value} role="navigation">
          <LinkTab label={dictionary.player} href={ServerRoutes.PLAYERS} />
          <LinkTab label={dictionary.serverInfo} href={ServerRoutes.INFO} />
        </Tabs>
        {children}
      </Box>
    </Box>
  );
}
