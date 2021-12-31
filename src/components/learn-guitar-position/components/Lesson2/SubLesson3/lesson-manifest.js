import { makeCustomLessonManifest } from "@guitarx/components/Lessons/GuessNoteOnStrings/lesson-manifest";

const manifest = {
  title: "Lesson 2-3",
  description: "Play the note on strings 2, 3, 4 or 5",
  uuid: "1e38023e-dc49-4997-aebf-709b4cb07daf",
  machineContext: {
    allowedStrings: new Set([2, 3, 4, 5]),
  },
};

const lessonManifest = makeCustomLessonManifest(manifest);

export default lessonManifest;
