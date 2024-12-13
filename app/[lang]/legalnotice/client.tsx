"use client";
import { getDictionary } from "@/get-dictionary";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export function Client({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["legalNotice"];
}) {
  const content = Object.entries(dictionary.disclaimer.content);
  const supplier = Object.entries(dictionary.supplier);
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const appBarHight = isDownSm ? "56px" : "64px";

  const renderDisclaimerParagraph = (content: [string, string][]) => {
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

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" marginBottom={1} marginTop={2}>
        {dictionary.title}
      </Typography>
      {supplier.map((value) => (
        <Typography key={value[0]} variant="body1">
          {value[1]}
        </Typography>
      ))}
      <Typography variant="h6" marginBottom={1} marginTop={2}>
        {dictionary.contact.title}
      </Typography>
      <Typography variant="body1">{dictionary.contact.phone}</Typography>
      <Typography variant="body1">{dictionary.contact.email}</Typography>
      <Typography variant="h6" marginBottom={1} marginTop={2}>
        {dictionary.disclaimer.title}
      </Typography>
      {renderDisclaimerParagraph(Object.entries(dictionary.disclaimer.content))}
      {renderDisclaimerParagraph(Object.entries(dictionary.disclaimer.links))}
      {renderDisclaimerParagraph(
        Object.entries(dictionary.disclaimer.copyright)
      )}
      {renderDisclaimerParagraph(
        Object.entries(dictionary.disclaimer.privacyPolicy)
      )}
    </Container>
  );
}
