"use client";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { i18n, type Locale } from "../../../config/i18n-config";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const router = useRouter();
  const params = useParams<{ lang: "en-us" | "de-de" }>();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  const [country, setCountry] = useState<string>(params.lang ?? "en-us");

  const countryCodeMapper = useCallback((locale: Locale) => {
    switch (locale) {
      case "en-us":
        return "us";
      case "de-de":
        return "de";
      default:
        return "us";
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
    router.push(redirectedPathName((event.target.value as Locale) ?? "en-us"));
  };

  return (
    <Box>
      <Select value={country} onChange={handleChange} size="small">
        {i18n.locales.map((country) => (
          <MenuItem key={country} value={country}>
            <ReactCountryFlag countryCode={countryCodeMapper(country)} svg />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
