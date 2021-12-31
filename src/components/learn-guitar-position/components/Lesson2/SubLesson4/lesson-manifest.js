import { makeCustomLessonManifest } from "@guitarx/components/Lessons/GuessNoteOnStrings/lesson-manifest";

const lessonManifest = makeCustomLessonManifest({
  title: "Lesson 2-4",
  description: "Play the note",
  uuid: "1e38023e-dc49-4997-aebf-709b4cb07daf",
  machineContext: {
    allowedStrings: new Set([1, 2, 3, 4, 5, 6]),
    problems: {
      total: 72,
    },
  },
});

export default lessonManifest;
