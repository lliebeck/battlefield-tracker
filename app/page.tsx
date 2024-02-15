import Typography from "@mui/material/Typography";

import { redirect } from "next/navigation";

export default async function IndexPage({}: {}) {
  redirect("/en/battlefield1/servers");
}
