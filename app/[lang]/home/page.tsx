import { Locale } from "@/config/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { Box, IconButton, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Client } from "./client";
import NextLink from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";

export default async function Page(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  return (
    <Box>
      <Container>
        <Typography variant="h2">{dictionary.home.welcome}</Typography>
        <Typography variant="body1">{dictionary.home.introduction}</Typography>
        <Typography mt={3} variant="h5">
          {dictionary.home.imageListHeader}
        </Typography>
        <Client dictionary={dictionary.server} />
        <Typography mb={1} variant="h5">
          {dictionary.home.generalInformation.header}
        </Typography>
        <Typography variant="body1">
          {dictionary.home.generalInformation.content}
        </Typography>
        <IconButton
          LinkComponent={NextLink}
          href="https://github.com/DeveloperGandalf/battlefield-tracker"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          LinkComponent={NextLink}
          href="mailto:job@lliebeck.de"
          rel="noopener noreferrer"
          target="_blank"
        >
          <EmailIcon />
        </IconButton>
      </Container>
    </Box>
  );
}
