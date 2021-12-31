import { NOTE_NAMES, NATURAL_NOTE_NAMES } from "./note-constants";
import { choice } from "@root/libs/math";

export function getRandomNote(excludedNoteName) {
  const noteName = choice(NOTE_NAMES);
  if (noteName === excludedNoteName) {
    return getRandomNote(excludedNoteName);
  }
  return noteName;
}

export function getRandomNaturalNote(excludedNoteName) {
  const noteName = choice(NATURAL_NOTE_NAMES);
  if (noteName === excludedNoteName) {
    return getRandomNaturalNote(excludedNoteName);
  }
  return noteName;
}

const NOTE_CACHE = {};
export class Note {
  constructor(name) {
    if (!(name in NOTE_CACHE)) {
      this.name = name;
      NOTE_CACHE[name] = this;
    }
    return NOTE_CACHE[name];
  }

  toString() {
    return this.name;
  }
}
