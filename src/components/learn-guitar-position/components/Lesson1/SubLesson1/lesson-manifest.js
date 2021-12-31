import { makeCustomLessonManifest } from "@guitarx/components/Lessons/GuessNoteOnStrings/lesson-manifest";

const manifest = {
  title: "Lesson 1-1",
  description: "Play the note on the 1st string",
  uuid: "ed2e49a1-4ca6-4102-a86a-1959dfdce782",
  machineContext: {
    allowedStrings: new Set([1]),
  },
};

const lessonManifest = makeCustomLessonManifest(manifest);

export default lessonManifest;
