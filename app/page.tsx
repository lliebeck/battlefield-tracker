import { redirect } from "next/navigation";

export default async function IndexPage({}: {}) {
  redirect("/en-us/bf1/servers");
}
