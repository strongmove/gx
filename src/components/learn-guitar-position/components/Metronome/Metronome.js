import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import PlayIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { useInterval } from "../../../../../../libs/time";

const bpm2ms = (bpm) => {
  return 60000 / bpm;
};

function Metronome({ started, onTick }) {
  const [bpm, setBPM] = React.useState(50);
  const audioRef = React.useRef();

  const playSound = () => {
    const audio = audioRef.current;
    audio.volume = 0.3;
    audio.play();
  };

  useInterval(() => {
    if (started) {
      playSound();
      onTick();
    }
  }, bpm2ms(bpm));

  const handleChangeBPM = (e) => {
    const newBPM = e.target.value;
    if (newBPM < 10 || newBPM > 240) {
      return;
    }
    setBPM(e.target.value);
  };

  const bpmInputProps = {
    step: 10,
    style: { width: 50 },
  };

  return (
    <Paper>
      <Box p={1} py={0.5}>
        <audio ref={audioRef} id="audio" src="./click.mp3"></audio>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              type="number"
              value={bpm}
              onChange={handleChangeBPM}
              variant="outlined"
              margin="dense"
              label="BPM"
              inputProps={bpmInputProps}
            />
          </Grid>
          {
            // <Grid item>
            //   {started ? (
            //     <IconButton onClick={handleStop} color="primary">
            //       <StopIcon />
            //     </IconButton>
            //   ) : (
            //     <IconButton onClick={handleStart} color="primary">
            //       <PlayIcon />
            //     </IconButton>
            //   )}
            // </Grid>
          }
        </Grid>
      </Box>
    </Paper>
  );
}

export default React.memo(Metronome);
