import { Note } from "./note";
import {
  PITCH_NAMES,
  PITCH_NAME_TO_INDEX,
  PITCH_TABLE,
} from "./pitch-constants";
import { choice } from "@root/libs/math";

export function getRandomPitchName() {
  return choice(PITCH_NAMES);
}

const PITCH_CACHE = {};
export class Pitch {
  constructor(name) {
    if (!(name in PITCH_CACHE)) {
      this.name = name;
      this.index = PITCH_NAME_TO_INDEX[name];
      this.def = PITCH_TABLE[this.index];
      this.freq = this.def.f;
      this.note = new Note(name.slice(0, -1));
      PITCH_CACHE[name] = this;
    }
    return PITCH_CACHE[name];
  }
  getInterval = (offset) => {
    const index = this.index + offset;
    const name = PITCH_TABLE[index].names[0];
    return new Pitch(name);
  };
  isOctave = (other) => {
    return this.note === other.note;
  };
}
