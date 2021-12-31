import React from "react";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { BsMusicNote } from "react-icons/bs";

function StringNoteChip({ note, string, iconProps, ...others }) {
  const theme = useTheme();
  const { style: iconStyle, ...iconPropsOthers } = iconProps || {};
  return (
    <Chip
      {...others}
      icon={
        <BsMusicNote
          style={{
            background: theme.palette.action.disabled,
            borderRadius: "50%",
            fontSize: "1.6rem",
            padding: 3,
            ...iconStyle,
          }}
          {...iconPropsOthers}
        />
      }
      label={`${note.name} on ${string}`}
    />
  );
}

export default React.memo(StringNoteChip);
