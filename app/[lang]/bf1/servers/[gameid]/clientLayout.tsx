"use client";
import { Bf1DetailedServerInfo } from "@/api/model/bf1DetailedServerInfo";
import { getDictionary } from "@/get-dictionary";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useParams, usePathname, useRouter } from "next/navigation";
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
  serverInfo: Bf1DetailedServerInfo | undefined;
};

export default function ClientLayout({
  children,
  dictionary,
  serverInfo,
}: Props & React.PropsWithChildren) {
  const router = useRouter();
  const { lang } = useParams();
  const path = usePathname();
  const tab = useMemo(
    () =>
      path.endsWith(ServerRoutes.PLAYERS)
        ? ServerRoutes.PLAYERS
        : ServerRoutes.INFO,
    [path]
  );

  const value = useMemo(() => {
    switch (tab) {
      case ServerRoutes.PLAYERS:
        return 0;
      case ServerRoutes.INFO:
        return 1;
    }
  }, [tab]);

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
        <Tabs value={value} role="navigation" defaultValue={0}>
          <LinkTab label={dictionary.player} href={ServerRoutes.PLAYERS} />
          <LinkTab label={dictionary.serverInfo} href={ServerRoutes.INFO} />
        </Tabs>
        {children}
      </Box>
    </Box>
  );
}
