"use client";
import { useBf1detailedserversBf1DetailedserverGet } from "@/api/battlefield-1/battlefield-1";
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

export default function ServerLayout({ children }: React.PropsWithChildren) {
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

  const { data: server, isLoading } = useBf1detailedserversBf1DetailedserverGet(
    {
      gameid: gameid as string,
    }
    // { query: { initialData: createEmptyAxiosResponse(initialServers) } }
  );

  return (
    // Subtract height from CustomAppBar, header and tabs plus some margin
    <Box height={`calc(100% - 176px - 4px)`}>
      <Toolbar>
        <IconButton
          onClick={() => router.push(`/${lang}/battlefield1/servers`)}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography marginLeft={1} variant={"h5"} noWrap>
          {server?.data?.prefix}
        </Typography>
      </Toolbar>
      <Box marginX={3} height={"100%"}>
        <Tabs value={value} role="navigation">
          <LinkTab label="Players" href={ServerRoutes.PLAYERS} />
          <LinkTab label="Server Info" href={ServerRoutes.INFO} />
        </Tabs>
        {children}
      </Box>
    </Box>
  );
}
