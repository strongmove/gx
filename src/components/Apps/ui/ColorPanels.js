import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export const ColorPanel = ({
  children,
  paperProps,
  boxProps,
  color,
  title,
}) => {
  paperProps = paperProps || {};
  if (paperProps?.style) {
    paperProps.style = { ...paperProps.style, background: color };
  } else {
    paperProps.style = { background: color };
  }

  return (
    <Paper square={true} {...paperProps}>
      <Box p={2} py={1} {...boxProps}>
        <Grid container direction="column">
          {title && (
            <Grid item>
              {title}
              <Divider style={{ marginTop: 4, marginBottom: 8 }} />
            </Grid>
          )}
          <Grid item>{children}</Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
