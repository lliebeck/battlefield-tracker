"use client";

import { useState } from "react";
import { type getDictionary } from "../../../get-dictionary";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Counter({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["counter"];
}) {
  const [count, setCount] = useState(0);
  return (
    <Typography>
      This component is rendered on client:
      <Button onClick={() => setCount((n) => n - 1)}>
        {dictionary.decrement}
      </Button>
      {count}
      <Button onClick={() => setCount((n) => n + 1)}>
        {dictionary.increment}
      </Button>
    </Typography>
  );
}
