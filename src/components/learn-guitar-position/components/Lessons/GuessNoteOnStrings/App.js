import React from "react";

import update from "immutability-helper";
import { assign } from "xstate";
import { useMachine } from "@xstate/react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

import Results from "./Results";
import Question from "./Question";
import HeaderPage from "./HeaderPage";

import FretBoard from "./fretboard";
import { lessonMachine, LessonMachineContext } from "./state-machines";

import OptionsPage from "./OptionsPage";

import { VscDebugStart } from "react-icons/vsc";
import { HiFastForward } from "react-icons/hi";
import { VscDebugRestart } from "react-icons/vsc";
// import "./style.scss";

function App({ lessonManifest }) {
  const canvasRef = React.useRef();
  const [state, send, lessonMachineService] = useMachine(
    lessonMachine,
    options(lessonManifest)
  );

  const { context } = state;

  React.useEffect(() => {
    const init = async () => {
      const cfg = lessonManifest.fretboardConfig;
      const fretboard = new FretBoard(canvasRef, cfg);
      await fretboard.reset();
      const machineContext = { ...lessonManifest.machineContext, fretboard };
      send({
        type: "INITIALIZE",
        machineContext,
      });
    };
    init();
  }, [canvasRef, send, lessonManifest]);

  const stateIn = (state, name) => {
    return state.toStrings().includes(name);
  };

  const handleClick = (mouseEvent) => {
    send({ type: "SCORE_CLICK", mouseEvent });
  };

  const NextButton = ({ label, next = "NEXT" }) => {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          send(next);
        }}
      >
        {label}
      </Button>
    );
  };

  return (
    <LessonMachineContext.Provider value={lessonMachineService}>
      <div>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item style={{ width: "100%" }}>
            <HeaderPage data={lessonManifest} />
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              {lessonManifest.showOptions && <OptionsPage />}
              <Grid item>
                <Box m={0} my={0}>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item>
                      {stateIn(state, "ready") && (
                        <NextButton
                          label={
                            <>
                              <VscDebugStart
                                style={{ fontSize: 32, marginRight: 8 }}
                              />
                              Start Lesson
                            </>
                          }
                        />
                      )}
                    </Grid>
                    {stateIn(state, "question") && (
                      <Grid item>
                        <Question
                          data={context}
                          lesson={{ index: 1 }}
                          actionComponent={
                            <>
                              <IconButton
                                title="Skip this question"
                                color="primary"
                                aria-label="Skip this question"
                                onClick={() => {
                                  send("NEXT");
                                }}
                                size="large"
                              >
                                <HiFastForward />
                              </IconButton>
                              <IconButton
                                title="Restart lesson"
                                color="primary"
                                aria-label="Restart lesson"
                                onClick={() => {
                                  send("RESTART");
                                }}
                                size="large"
                              >
                                <VscDebugRestart />
                              </IconButton>
                            </>
                          }
                        />
                      </Grid>
                    )}
                    {stateIn(state, "results") && (
                      <Grid item>
                        <Question data={context} lesson={{ index: 1 }} />
                      </Grid>
                    )}
                    {stateIn(state, "finished") && (
                      <>
                        <Grid item>
                          <NextButton label="Try Again" next="RESTART" />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          {stateIn(state, "finished") && (
            <Grid item>
              <Results data={context} />
            </Grid>
          )}
          <Grid item className={stateIn(state, "finished") ? "hidden" : ""}>
            <canvas ref={canvasRef} onClick={handleClick} />
          </Grid>
        </Grid>
      </div>
    </LessonMachineContext.Provider>
  );
}

const options = (lessonManifest) => ({
  guards: {
    finished: (context) => {
      const { index, total } = context.problems;
      return index >= total;
    },
    correct: (context, event) => {
      return context.fretboard.sensePitch(event.mouseEvent);
    },
  },
  delays: {
    RESULTS_DURATION: (context) => context.resultDuration,
  },
  actions: {
    init: assign((_, event) => {
      const { machineContext } = event;
      return machineContext;
    }),
    restart: assign((context) => {
      const { fretboard } = context;
      return update(lessonManifest.machineContext, {
        fretboard: { $set: fretboard },
      });
    }),
    incrementProblemIndex: assign({
      problems: (context) => {
        return update(context.problems, { index: (x) => x + 1 });
      },
    }),
    markCorrect: assign({
      problems: (context) => {
        const { targetNote, targetString } = context.fretboard;
        const data = { targetNote, targetString };
        return update(context.problems, {
          answers: { correct: { $push: [data] } },
          score: (x) => x + 1,
        });
      },
    }),
    markIncorrect: assign({
      problems: (context) => {
        const { targetNote, targetString } = context.fretboard;
        const data = { targetNote, targetString };
        return update(context.problems, {
          answers: { incorrect: { $push: [data] } },
        });
      },
    }),
  },
});

export default React.memo(App);
