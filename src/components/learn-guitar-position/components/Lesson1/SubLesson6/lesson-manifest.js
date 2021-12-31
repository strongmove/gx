import { makeCustomLessonManifest } from "@guitarx/components/Lessons/GuessNoteOnStrings/lesson-manifest";

const manifest = {
  title: "Lesson 1-6",
  description: "Play the note on the 6th string",
  uuid: "6ee64827-b462-4875-8fc6-34046dc1fc54",
  machineContext: {
    allowedStrings: new Set([6]),
  },
};

const lessonManifest = makeCustomLessonManifest(manifest);

export default lessonManifest;
