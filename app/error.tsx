"use client";

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
import { AxiosError } from "axios";
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
  error: (Error & { digest?: string }) | AxiosError;
  reset: () => void;
}) {
  const router = useRouter();

  console.log(error.name);

  if (!(error instanceof AxiosError)) {
    let res = JSON.parse(error.message) as ApiErrorViewData;

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
          <Card>
            <CardHeader title="Failed to load data"></CardHeader>
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
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>{JSON.stringify(error.name)}</p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}

class ApiCallException extends Error {
  code: number;
  path: string;

  constructor(message: string, code: number, path: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.path = path;
  }
}
