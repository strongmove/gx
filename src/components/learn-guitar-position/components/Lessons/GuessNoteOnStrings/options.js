import React from "react";

import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { amber, lightGreen, lightBlue } from "@mui/material/colors";

import { ImCog } from "react-icons/im";
import { GiGuitarBassHead } from "react-icons/gi";
import { FaStopwatch } from "react-icons/fa";

// import { ColorPanel } from "../../../../ui/ColorPanels";
import { ColorPanel } from "../../../../Apps/ui/ColorPanels";

import { useLessonMachineService } from "./state-machines";

export const GeneralOptions = React.memo(() => {
  const [state, send] = useLessonMachineService();
  const { context } = state;
  const { fretboard, naturalOnly } = context;

  const handleChangeNaturalOnly = () => {
    send("TOGGLE_NATURAL_ONLY");
  };

  const handleChangeOrientation = () => {
    const newOrientation =
      fretboard.cfg.orientation === "landscape" ? "portrait" : "landscape";
    send({ type: "UPDATE_ORIENTATION", orientation: newOrientation });
  };

  return (
    <ColorPanel
      paperProps={{}}
      color={amber[300]}
      title={
        <FormLabel component="legend">
          <Grid container alignItems="center">
            <ImCog style={{ color: "black", marginRight: 8 }} />
            <Typography variant="body1" style={{ color: "black" }}>
              Options
            </Typography>
          </Grid>
        </FormLabel>
      }
    >
      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                onChange={handleChangeOrientation}
                checked={fretboard?.cfg.orientation === "landscape"}
                name="Orientation"
                color="primary"
              />
            }
            label="Neck Orientation"
          />
          <FormControlLabel
            control={
              <Switch
                checked={naturalOnly}
                onChange={handleChangeNaturalOnly}
                name="Natural Notes Only"
                color="primary"
              />
            }
            label="Natural Notes Only"
          />
        </FormGroup>
      </FormControl>
    </ColorPanel>
  );
});

export const StringOptions = React.memo(() => {
  const [state, send] = useLessonMachineService();
  const { allowedStrings } = state.context;

  const handleChangeAllowedStrings = (string, value) => {
    const newAllowedStrings = new Set(allowedStrings);
    if (value) {
      newAllowedStrings.add(string);
    } else {
      newAllowedStrings.delete(string);
    }
    send({ type: "UPDATE_ALLOWED_STRINGS", allowedStrings: newAllowedStrings });
  };
  return (
    <ColorPanel
      color={lightGreen[300]}
      title={
        <FormLabel component="legend">
          <Grid container alignItems="center">
            <GiGuitarBassHead style={{ color: "black", marginRight: 8 }} />
            <Typography variant="body1" style={{ color: "black" }}>
              Strings
            </Typography>
          </Grid>
        </FormLabel>
      }
    >
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          {[6, 5, 4, 3, 2, 1].map((string) => {
            return (
              <FormControlLabel
                key={string}
                style={{ margin: 0 }}
                value={string}
                onChange={(e, value) =>
                  handleChangeAllowedStrings(string, value)
                }
                control={
                  <Checkbox
                    color="primary"
                    checked={allowedStrings.has(string)}
                  />
                }
                label={string}
                labelPlacement="top"
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </ColorPanel>
  );
});

const marks = [
  { value: 10 },
  { value: 500 },
  { value: 1000 },
  { value: 1500 },
  { value: 2000 },
  { value: 3000 },
  { value: 4000 },
  { value: 5000 },
];

export const TimingOptions = React.memo(() => {
  const [state, send] = useLessonMachineService();
  const { context } = state;
  const { autoProgress, questionDuration, resultDuration } = context;

  const handleChangeDuration = (type, value) => {
    send({ type: "UPDATE_DURATION", durationType: type, value });
  };

  const handleChangeAutoProgress = () => {
    send("TOGGLE_AUTO_PROGRESS");
  };

  return (
    <ColorPanel
      color={lightBlue[100]}
      title={
        <FormLabel component="legend">
          <Grid container alignItems="center">
            <FaStopwatch style={{ color: "black", marginRight: 8 }} />
            <Typography variant="body1" style={{ color: "black" }}>
              Automatic Progression
            </Typography>
          </Grid>
        </FormLabel>
      }
    >
      <FormControl component="fieldset" style={{ width: "100%" }}>
        <FormControlLabel
          control={
            <Switch
              checked={autoProgress}
              onChange={handleChangeAutoProgress}
              name="Enable"
              color="primary"
            />
          }
          label="Progress Automatically"
        />
        <Collapse in={autoProgress}>
          <Grid container spacing={0} direction="column">
            <Grid item>
              <Typography>Question Time</Typography>
              <Slider
                disabled={!autoProgress}
                onChange={(e, value) => {
                  handleChangeDuration("question", value);
                }}
                valueLabelDisplay="auto"
                value={questionDuration}
                step={null}
                marks={marks}
                max={5000}
              />
            </Grid>
            <Grid item>
              <Typography>Result Time</Typography>
              <Slider
                disabled={!autoProgress}
                onChange={(e, value) => {
                  handleChangeDuration("result", value);
                }}
                valueLabelDisplay="auto"
                value={resultDuration}
                step={null}
                marks={marks}
                max={5000}
              />
            </Grid>
          </Grid>
        </Collapse>
      </FormControl>
    </ColorPanel>
  );
});
