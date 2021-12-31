import { makeCustomLessonManifest } from "@guitarx/components/Lessons/GuessNoteOnStrings/lesson-manifest";

const manifest = {
  title: "Lesson 1-3",
  description: "Play the note on the 3th string",
  uuid: "d934e859-d244-49b4-8756-4e722f809ec5",
  machineContext: {
    allowedStrings: new Set([3]),
  },
};

const lessonManifest = makeCustomLessonManifest(manifest);

export default lessonManifest;
