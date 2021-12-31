import React from "react";
import clsx from "clsx";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { MdExpandMore as ExpandMoreIcon } from "react-icons/md";
import { MdMoreVert as MoreVertIcon } from "react-icons/md";
import StringNoteChip from "./StringNoteChip";
import { ToggleIconButton } from "@/components/ui/icon";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 0,
//     paddingTop: "56.25%", // 16:9
//   },
//   expand: {
//     transform: "rotate(0deg)",
//     marginLeft: "auto",
//     transition: theme.transitions.create("transform", {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: "rotate(180deg)",
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
// }));

export default function Question({ data, lesson, actionComponent }) {
  // const classes = useStyles();
  const classes = {};
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { targetNote: note, targetString: string } = data.fretboard;
  const { problems } = data;
  const { index, score, total } = problems;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" sx={{ backgroundColor: red[500] }}>
            {lesson.index}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" size="large">
            <MoreVertIcon />
          </IconButton>
        }
        title={`Question ${index + 1} of ${total}`}
        subheader={`Score ${score} / ${index}`}
      />
      <CardContent style={{ padding: 0, margin: 0 }}>
        <Typography variant="h3" align="center">
          <StringNoteChip
            note={note}
            string={string}
            color="primary"
            iconProps={{
              style: { fontSize: "2.5rem" },
            }}
            style={{
              fontSize: 40,
              paddingTop: 24,
              paddingBottom: 24,
              paddingRight: 8,
              borderRadius: 24,
            }}
          />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {actionComponent}
        <ToggleIconButton
          pressed={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          size="large"
        >
          <ExpandMoreIcon />
        </ToggleIconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <CardContent>
          <Typography>Goes out to Real Madrid</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
