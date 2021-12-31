import _ from "lodash";

import { DEFAULT_CONTEXT } from "./state-machines";
import FRETBOARD_CONFIG from "./config";

const lessonManifest = {
  title: "Untitled",
  description: "404 Not Found",
  fretboardConfig: FRETBOARD_CONFIG,
  machineContext: {
    ...DEFAULT_CONTEXT,
    allowedStrings: new Set([6]),
    naturalOnly: true,
  },
};

export function makeCustomLessonManifest(newManifest) {
  return _.merge({}, lessonManifest, newManifest);
}

export default lessonManifest;
