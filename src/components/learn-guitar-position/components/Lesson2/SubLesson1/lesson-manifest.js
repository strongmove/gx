import { makeCustomLessonManifest } from "@guitarx/components/Lessons/GuessNoteOnStrings/lesson-manifest";

const manifest = {
  title: "Lesson 2-1",
  description: "Play the note on strings 1, 2, and 3",
  uuid: "3992146b-17a8-4fe6-9022-ee0584b718fa",
  machineContext: {
    allowedStrings: new Set([1, 2, 3]),
  },
};

const lessonManifest = makeCustomLessonManifest(manifest);

export default lessonManifest;
