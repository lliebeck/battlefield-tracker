"use client";

import { getDictionary } from "@/get-dictionary";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export type ApiErrorViewData = {
  name: string;
  status: number;
  path: string;
  statusText: string;
  method: string;
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  dictionary: Awaited<ReturnType<typeof getDictionary>>["general"];
}) {
  const router = useRouter();
  let res: ApiErrorViewData | undefined;

  try {
    res = JSON.parse(error.message) as ApiErrorViewData;
  } catch (e) {}

  if (res) {
    return (
      <Container
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "100%",
        }}
      >
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography fontSize={"10rem"} lineHeight={1}>
            {res.status}
          </Typography>
          <Typography variant="h4" mb={2}>
            {res.statusText}
          </Typography>
          <Card elevation={6}>
            <CardHeader title="Failed to fetch data"></CardHeader>
            <CardContent>
              <Box sx={{ display: "flex" }}>
                <Box mr={5}>
                  <Typography variant="body2">Method</Typography>
                  <Typography variant="h5">
                    {res.method.toLocaleUpperCase()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">Url</Typography>
                  <Typography variant="h5">{res.path}</Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Button onClick={reset}>Try again</Button>
              <Button onClick={() => router.push("/")}>Go back home</Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        height: "100%",
      }}
    >
      <Card elevation={6}>
        <CardHeader title="There was a Problem"></CardHeader>
        <CardContent>
          <Typography>{error.message}.</Typography>
          <Typography>
            Please try again later or contact the support if the problem
            persists.
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={reset}>Try again</Button>
          <Button onClick={() => router.push("/")}>Go back home</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
