"use client";

import { getDictionary } from "@/get-dictionary";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useParams } from "next/navigation";

export default function Footer({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["footer"];
}) {
  const theme = useTheme();
  const { lang } = useParams();

  const lightModeTextColor =
    theme.palette.mode === "light"
      ? theme.palette.getContrastText(theme.palette.text.primary)
      : theme.palette.text.primary;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 3,
      }}
    >
      <Typography variant="h5" color={lightModeTextColor}>
        Lukas Liebeck
      </Typography>
      <Box>
        <IconButton
          LinkComponent={NextLink}
          href="https://github.com/DeveloperGandalf"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          LinkComponent={NextLink}
          href="https://de.linkedin.com/in/lukas-liebeck-45a82b2ba"
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          LinkComponent={NextLink}
          href="mailto:job@lliebeck.de"
          rel="noopener noreferrer"
          target="_blank"
        >
          <EmailIcon />
        </IconButton>
      </Box>
      <Box>
        <Link
          marginRight={1}
          href={`/${lang}/legalnotice`}
          component={NextLink}
          variant="body1"
          color={lightModeTextColor}
        >
          {dictionary.legalNotice}
        </Link>
        <Link
          href={`/${lang}/privacypolicy`}
          component={NextLink}
          variant="body1"
          color={lightModeTextColor}
        >
          {dictionary.privacyPolicy}
        </Link>
      </Box>
    </Box>
  );
}
