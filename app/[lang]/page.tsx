import Typography from "@mui/material/Typography";
import { Locale } from "../../config/i18n-config";
import { getDictionary } from "../../get-dictionary";
import Counter from "./components/Counter";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <Typography>Current locale: {lang}</Typography>
      <Typography>
        This text is rendered on the server:{" "}
        {dictionary["server-component"].welcome}
      </Typography>
      <Counter dictionary={dictionary.counter} />
    </div>
  );
}
