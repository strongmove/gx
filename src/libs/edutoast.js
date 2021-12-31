import React from "react";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Edutoast = (props) => {
  return (
    <Box>
      <CardContent>Thanks alot</CardContent>
    </Box>
  );
};

const StyledEdutoast = styled(Edutoast)(({ theme }) => ({}));

export default React.memo(StyledEdutoast);
