import { redirect } from "next/navigation";

export default async function IndexPage({}: {}) {
  redirect("bf1/servers");
}
