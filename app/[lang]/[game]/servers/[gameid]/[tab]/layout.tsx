"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useBf1detailedserversBf1DetailedserverGet } from "@/api/battlefield-1/battlefield-1";
import { Locale } from "@/config/i18n-config";
import { Box, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import type { Metadata } from "next";
import { useParams, useRouter } from "next/navigation";
import { ReactText, useMemo, useState } from "react";

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

export const enum ServerRoutes {
  PLAYERS = "players",
  INFO = "info",
}

export const ServerLayout = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const { gameid, tab } = useParams();

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
    <Box>
      <Toolbar>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography marginLeft={1} variant={"h5"} noWrap>
          {server?.data?.prefix}
        </Typography>
      </Toolbar>
      <Box marginX={3}>
        <Tabs value={value} role="navigation">
          <LinkTab label="Players" href={ServerRoutes.PLAYERS} />
          <LinkTab label="Server Info" href={ServerRoutes.INFO} />
        </Tabs>
        {children}
      </Box>
    </Box>
  );
};

export default ServerLayout;
