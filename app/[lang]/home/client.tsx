"use client";

import { getDictionary } from "@/get-dictionary";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { games } from "../types/games.types";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const Client = ({ dictionary }: Props) => {
  const { lang } = useParams();
  const router = useRouter();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    // <ImageList cols={isSm ? 2 : 1} gap={12}>
    <ImageList cols={2} gap={12}>
      {games.map((game) =>
        game.available ? (
          <ImageListItem key={game.key}>
            <img
              srcSet={`${game.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${game.img}?w=248&fit=crop&auto=format`}
              alt={game.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={game.name}
              subtitle={"@DICE"}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${game.name}`}
                  onClick={() =>
                    router.push(`/${lang ?? "en-us"}/${game.key}/servers`)
                  }
                >
                  <OpenInNewIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ) : null
      )}
    </ImageList>
  );
};
