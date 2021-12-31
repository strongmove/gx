import React from "react";
// import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function HeaderPage({ data }) {
  const { title, description } = data;
  // const theme = useTheme();
  return (
    <Box p={2} style={{ background: "black", width: "100%", color: "white" }}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h5" style={{ color: "rgba(255,255,255,0.5)" }}>
        {description}
      </Typography>
    </Box>
  );
}

export default React.memo(HeaderPage);
