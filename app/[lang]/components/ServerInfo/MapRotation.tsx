/* eslint-disable @next/next/no-img-element */
import { ServerRotation } from "@/api/model/serverRotation";
import { getDictionary } from "@/get-dictionary";
import {
  Card,
  CardContent,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo } from "react";

type MapRotationProps = {
  maps: ServerRotation[];
  dictionary: Awaited<ReturnType<typeof getDictionary>>["server"];
};

export const MapRotation = ({ maps, dictionary }: MapRotationProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  const rowHeight = 150;

  const pictureCount = useMemo(() => {
    if (isXs) {
      return 2;
    }

    if (isSm) {
      return 3;
    }

    if (isMd) {
      return 4;
    }

    if (isLg) {
      return 6;
    }

    if (isXl) {
      return 10;
    }
  }, [isLg, isMd, isSm, isXl, isXs]);

  const listHeight = useMemo(() => {
    return pictureCount && pictureCount < maps.length
      ? `${2 * rowHeight}px`
      : `${rowHeight}px`;
  }, [maps.length, pictureCount]);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dictionary.mapRotation}
        </Typography>
        <ImageList
          sx={{ height: listHeight }}
          cols={pictureCount}
          rowHeight={rowHeight}
        >
          {maps.map((item) => (
            <ImageListItem key={item.image}>
              <img
                src={`${item.image}`}
                alt={item.mapname}
                loading="lazy"
                height={250}
                width={250}
              />
              <ImageListItemBar title={item.mapname} subtitle={item.mode} />
            </ImageListItem>
          ))}
        </ImageList>
      </CardContent>
    </Card>
  );
};
