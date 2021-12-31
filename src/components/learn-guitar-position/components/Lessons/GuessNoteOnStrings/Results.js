import React from "react";
import clsx from "clsx";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { MdExpandMore as ExpandMoreIcon } from "react-icons/md";
import Grid from "@mui/material/Grid";
import StringNoteChip from "./StringNoteChip";
import { ToggleIconButton } from "@/components/ui/icon";

import {
  CircularProgressbarWithChildren as Progress,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Results({ data }) {
  const classes = {};
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { problems } = data;
  const { score, total, answers } = problems;
  const { correct, incorrect } = answers;
  const percentage = 100 * (score / total);
  const percentageString = Math.round(percentage) + "%";

  return (
    <Card
      sx={{
        maxWidth: 540,
        "& .MuiCardActions-root": {
          paddingLeft: 14,
        },
      }}
    >
      <CardHeader title="Lesson 1 Results" subheader="September 14, 2016" />
      <CardContent>
        <div>
          <Grid container justifyContent="center">
            <Grid item>
              <div style={{ width: "70%", margin: "0 auto" }}>
                <Progress
                  value={percentage}
                  strokeWidth={11.5}
                  styles={buildStyles({
                    rotation: 0.0,
                    strokeLinecap: "butt",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    // pathColor: `rgba(62, 152, 199, ${94 / 100})`,
                    textColor: "#f88",
                    trailColor: "rgba(100, 100, 100, .1)",
                    backgroundColor: "none",
                  })}
                >
                  <Typography variant="h3">
                    <strong>{percentageString}</strong>
                  </Typography>
                </Progress>
              </div>
            </Grid>
          </Grid>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <Typography
          sx={{
            fontSize: "0.8em",
          }}
        >
          Show Details
        </Typography>
        <ToggleIconButton
          pressed={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show Details"
          title="Show Details"
          size="large"
        >
          <ExpandMoreIcon />
        </ToggleIconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <CardContent>
          <Grid container spacing={4} direction="column">
            {!!correct.length && (
              <Grid item>
                <Typography paragraph>You got these right!</Typography>
                <NoteList items={correct} />
              </Grid>
            )}

            {!!incorrect.length && (
              <Grid item>
                <Typography paragraph>Try working on these:</Typography>
                <NoteList items={incorrect} color="secondary" />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const NoteList = ({ items, color = "primary" }) => {
  return (
    <Grid container spacing={1}>
      {items.map(function (item, index) {
        const { targetString: string, targetNote: note } = item;
        return (
          <Grid item key={index}>
            <StringNoteChip note={note} string={string} color={color} />
          </Grid>
        );
      })}
    </Grid>
  );
};
