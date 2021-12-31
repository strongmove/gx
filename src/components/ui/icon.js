import { styled } from "@mui/material/styles";

export const ToggleIconButton = styled("IconButton")(({ theme, pressed }) => ({
  transform: pressed ? "rotate(180deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.standard,
  }),
}));
