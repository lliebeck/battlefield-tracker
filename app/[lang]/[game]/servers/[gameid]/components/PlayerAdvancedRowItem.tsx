import Typography from "@mui/material/Typography";

type ItemProps = {
  label: string;
  value: string | number | undefined;
};

export const PlayerAdvancedRowItem = ({ label, value }: ItemProps) => {
  return (
    <>
      <Typography variant={"body2"}>{label}</Typography>
      <Typography variant="h6">{value?.toString()}</Typography>
    </>
  );
};
