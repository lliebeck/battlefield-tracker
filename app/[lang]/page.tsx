import Typography from "@mui/material/Typography";
import { Locale } from "../../config/i18n-config";
import { getDictionary } from "../../get-dictionary";
import { redirect } from "next/navigation";

export default async function IndexPage({}: {}) {
  redirect("battlefield1/servers");
}
