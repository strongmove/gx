import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { MdExpandMore as ExpandMoreIcon } from "react-icons/md";
import { GeneralOptions, StringOptions } from "./options";

// const useStyles = ((theme) => ({
//   root: {
//     width: "100%",
//   },
//   accordion: {
//     background: theme.palette.panel.option,
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: 700,
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
//   icon: {
//     verticalAlign: "bottom",
//     height: 20,
//     width: 20,
//   },
//   details: {
//     alignItems: "center",
//   },
//   column: {
//     flexBasis: "33.33%",
//   },
//   helper: {
//     borderLeft: `2px solid ${theme.palette.divider}`,
//     padding: theme.spacing(1, 2),
//   },
//   link: {
//     color: theme.palette.primary.main,
//     textDecoration: "none",
//     "&:hover": {
//       textDecoration: "underline",
//     },
//   },
// }));

export default function OptionsPage() {
  // const classes = useStyles();
  classes = {};

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion} defaultExpanded={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Options</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "250px 284px",
              gridGap: 10,
              // width: 500,
            }}
          >
            <GeneralOptions />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "100%",
                gridGap: 10,
              }}
            >
              <StringOptions stringCount={6} />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
