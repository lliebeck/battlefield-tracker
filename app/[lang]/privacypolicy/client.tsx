"use client";
import { getDictionary } from "@/get-dictionary";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import NextLink from "next/link";

export function Client({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["privacyPolicy"];
}) {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const appBarHight = isDownSm ? "56px" : "64px";

  const renderParagraph = (content: [string, string][]) => {
    return content.map((value) => (
      <Typography key={value[0]} variant="body1" marginBottom={1}>
        {value[0] === "title" ? (
          <strong style={{ marginTop: "8px" }}>{value[1]}</strong>
        ) : (
          value[1]
        )}
      </Typography>
    ));
  };
  const renderResponsibleAuthority = () => {
    return (
      <>
        <Typography variant="body1" marginBottom={1}>
          <strong>{dictionary.responsibleAuthority.title}</strong>
        </Typography>
        <Typography variant="body1" marginBottom={1}>
          {dictionary.responsibleAuthority.paragraph1}
        </Typography>
        <Typography variant="body1">
          {dictionary.responsibleAuthority.author}
        </Typography>
        <Typography variant="body1">
          {dictionary.responsibleAuthority.street}
        </Typography>
        <Typography variant="body1">
          {dictionary.responsibleAuthority.city}
        </Typography>
        <Typography variant="body1">
          {dictionary.responsibleAuthority.email}
        </Typography>
        <Typography variant="body1" marginTop={1} marginBottom={1}>
          {dictionary.responsibleAuthority.paragraph2}
        </Typography>
      </>
    );
  };
  const renderLogs = () => {
    return (
      <>
        <Typography variant="body1" marginBottom={1}>
          <strong>{dictionary.logs.title}</strong>
        </Typography>
        <Typography variant="body1" marginBottom={1}>
          {dictionary.logs.paragraph1}
        </Typography>
        <ul>
          {Object.entries(dictionary.logs.data).map((data) => (
            <li key={data[0]}>
              <Typography
                key={data[0]}
                variant="body1"
                marginTop={1}
                marginBottom={1}
              >
                {data[1]}
              </Typography>
            </li>
          ))}
        </ul>
        <Typography variant="body1" marginTop={1} marginBottom={1}>
          {dictionary.logs.paragraph2}
        </Typography>
      </>
    );
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" marginBottom={1} marginTop={2}>
        <strong>{dictionary.title}</strong>
      </Typography>
      <Typography variant="h6" marginBottom={1}>
        <strong>{dictionary.subtitle}</strong>
      </Typography>
      {renderResponsibleAuthority()}
      {renderParagraph(Object.entries(dictionary.revocation))}
      {renderParagraph(Object.entries(dictionary.complaint))}
      {renderParagraph(Object.entries(dictionary.dataPortability))}
      {renderParagraph(Object.entries(dictionary.information))}
      {renderParagraph(Object.entries(dictionary.encryption))}
      {renderLogs()}
      {renderParagraph(Object.entries(dictionary.contactForm))}
      <Typography>
        {dictionary.source}
        <Link
          href="https://www.hub24.de"
          component={NextLink}
          variant="body1"
          color="secondary"
        >
          Herold Unternehmensberatung
        </Link>
      </Typography>
    </Container>
  );
}
