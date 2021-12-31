import { makeCustomLessonManifest } from "@guitarx/components/Lessons/GuessNoteOnStrings/lesson-manifest";

const manifest = {
  title: "Lesson 1-4",
  description: "Play the note on the 4th string",
  uuid: "23533be0-36c1-466a-82f0-6d465136d3de",
  machineContext: {
    allowedStrings: new Set([4]),
  },
};

const lessonManifest = makeCustomLessonManifest(manifest);

export default lessonManifest;
