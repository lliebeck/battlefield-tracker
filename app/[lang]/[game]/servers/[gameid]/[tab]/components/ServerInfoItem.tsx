import Box from "@mui/material/Box";
import Grid, { GridSize, RegularBreakpoints } from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type ItemProps = {
  label: string;
  value: string | number | undefined;
  alignValue?: "center" | "left" | "right" | "inherit" | "justify";
  xs?: boolean | GridSize | undefined;
  sm?: boolean | GridSize | undefined;
  md?: boolean | GridSize | undefined;
  lg?: boolean | GridSize | undefined;
  xl?: boolean | GridSize | undefined;
};

export const ServerInfoGridItem = (props: ItemProps) => {
  return (
    <Grid
      container
      item
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-end"
      {...props}
    >
      <Grid item>
        <Typography variant={"body1"}>{props.label}</Typography>
        <Typography align={props.alignValue} variant="h5">
          {props.value?.toString()}
        </Typography>
      </Grid>
    </Grid>
  );
};
