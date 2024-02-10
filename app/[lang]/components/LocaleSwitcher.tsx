"use client";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useParams, usePathname, useRouter } from "next/navigation";
import { i18n, type Locale } from "../../../config/i18n-config";
import Box from "@mui/material/Box";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const router = useRouter();
  const params = useParams<{ lang: "en" | "de" }>();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <Box>
      <Autocomplete
        size="small"
        options={i18n.locales}
        value={params.lang}
        disableClearable
        renderInput={(params) => (
          <TextField {...params} label="Locale" fullWidth />
        )}
        onChange={(_, value) => router.push(redirectedPathName(value))}
      />
    </Box>
  );
}
