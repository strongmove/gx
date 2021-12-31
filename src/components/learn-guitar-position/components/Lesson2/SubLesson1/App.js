import React from "react";

import LessonApp from "@guitarx/components/Lessons/GuessNoteOnStrings/App";
import lessonManifest from "./lesson-manifest";

function App() {
  return <LessonApp lessonManifest={lessonManifest} />;
}

export default React.memo(App);
