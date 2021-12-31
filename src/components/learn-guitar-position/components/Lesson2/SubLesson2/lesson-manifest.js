import { makeCustomLessonManifest } from "@guitarx/components/Lessons/GuessNoteOnStrings/lesson-manifest";

const manifest = {
  title: "Lesson 2-2",
  description: "Play the note on strings 4, 5, or 6",
  uuid: "7076cd1f-a906-4e84-a07b-f5407abd90bc",
  machineContext: {
    allowedStrings: new Set([4, 5, 6]),
  },
};

const lessonManifest = makeCustomLessonManifest(manifest);

export default lessonManifest;
