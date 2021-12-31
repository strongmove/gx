import React from "react";
import _ from "lodash";
import { createMachine, assign } from "xstate";
import { useActor } from "@xstate/react";

import {
  getRandomNote as getRandomAnyNote,
  getRandomNaturalNote,
} from "@guitarx/note";

export const DEFAULT_CONTEXT = {
  fretboard: undefined,
  naturalOnly: true,
  resultDuration: 1000,
  allowedStrings: new Set([1, 2, 3, 4, 5, 6]),
  showOptions: false,
  problems: {
    total: 1,
    index: 0,
    score: 0,
    answers: {
      correct: [],
      incorrect: [],
    },
  },
};

// INITIALIZING
const initializing = {};

// READY
const ready = {
  invoke: {
    src: (ctx) => {
      if (ctx.fretboard) {
        ctx.fretboard.reset();
      }
    },
  },
  on: {
    NEXT: "question",
  },
};

// QUESTION
const question = {
  id: "question",
  initial: "normal",
  always: [
    {
      target: "finished",
      cond: "finished",
    },
  ],
  exit: "incrementProblemIndex",
  states: {
    normal: {},
  },
  invoke: {
    src: (ctx) => {
      startNewProblem(ctx);
    },
  },
  on: {
    SCORE_CLICK: [
      {
        target: "results.correct",
        cond: "correct",
      },
      {
        target: "results.incorrect",
      },
    ],
    NEXT: "results.incorrect",
  },
};

// RESULTS
const results = {
  invoke: {
    src: (ctx) => {
      ctx.fretboard.showAnswers();
      for (let fp of ctx.fretboard.correctFretPositions) {
        ctx.fretboard.playFretPosition(fp, "1m");
        break;
      }
    },
  },
  initial: "normal",
  states: {
    normal: {},
    correct: {
      always: {
        target: "autoProgress",
        actions: "markCorrect",
      },
    },
    incorrect: {
      always: {
        target: "autoProgress",
        actions: "markIncorrect",
      },
    },
    autoProgress: {
      after: [
        {
          target: "#question",
          delay: "RESULTS_DURATION",
        },
      ],
    },
  },
  on: {
    NEXT: "question",
    RESET: "ready",
  },
};

// FINISHED
const finished = {};

export const lessonMachine = createMachine(
  (() => {
    return {
      initial: "initializing",
      context: DEFAULT_CONTEXT,
      on: {
        INITIALIZE: {
          target: "ready",
          actions: "init",
        },
        RESTART: {
          target: "question",
          actions: ["restart"],
        },
        UPDATE_SCORE: {
          actions: assign({
            score: (context, event) => {
              const { value } = event;
              if (typeof value === "function") {
                return value(context.score);
              } else {
                return value;
              }
            },
          }),
        },
        UPDATE_ALLOWED_STRINGS: {
          actions: assign((_, event) => ({
            allowedStrings: event.allowedStrings,
          })),
        },
        UPDATE_CANVAS: {
          actions: [
            (context, event) => {
              const { fretboard } = context;
              const { canvas: newCanvas } = event;
              const { canvas: oldCanvas } = fretboard.cfg;
              fretboard.cfg.canvas = { ...oldCanvas, ...newCanvas };
            },
          ],
        },
        UPDATE_ORIENTATION: {
          actions: [
            (context, event) => {
              context.fretboard.cfg.orientation = event.orientation;
              context.fretboard.redraw();
            },
          ],
        },
        TOGGLE_NATURAL_ONLY: {
          actions: [
            assign((c) => ({
              naturalOnly: !c.naturalOnly,
            })),
          ],
        },
        SET_FRETBOARD: {
          actions: [
            assign((_, event) => ({
              fretboard: event.fretboard,
            })),
          ],
        },
      },
      states: {
        initializing,
        ready,
        question,
        results,
        finished,
      },
    };
  })()
);

const startNewProblem = (context) => {
  const { fretboard, naturalOnly, prevTargetNote } = context;
  const getRandomNote = naturalOnly ? getRandomNaturalNote : getRandomAnyNote;
  const nextTargetNote = getRandomNote(prevTargetNote);
  const targetString = _.sample(Array.from(context.allowedStrings));
  fretboard.reset();
  fretboard.startNewProblem(nextTargetNote, targetString);
  context.targetString = targetString;
  context.prevTargetNote = fretboard.targetNote?.name;
};

export const LessonMachineContext = React.createContext();

export const useLessonMachineService = () => {
  const service = React.useContext(LessonMachineContext);
  return useActor(service);
};
