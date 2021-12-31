import {
  FRET_POSITION_DEFINITION,
  PITCH_NAME_TO_FRET_POSITION_INDEX,
} from "./fret-position-constants";
import { NOTE_NAME_TO_FRET_POSITION_INDEX } from "./note-constants";
import {
  DEFAULT_MAX_FRET_INDEX,
  DEFAULT_NUMBER_OF_STRINGS,
} from "./guitar-constants";
import { Note } from "./note";
import { randInt } from "@root/libs/math";
import { Pitch } from "./pitch";

const FRET_POSITION_CACHE = {};
export class FretPosition {
  constructor(string, fret) {
    const hash = `${string}_${fret}`;
    if (!(hash in FRET_POSITION_CACHE)) {
      this.string = string;
      this.fret = fret;
      const fpDef = FRET_POSITION_DEFINITION[string][fret];
      this.pitch = new Pitch(fpDef.names[0]);
      FRET_POSITION_CACHE[hash] = this;
    }
    return FRET_POSITION_CACHE[hash];
  }
}

export function getRandomFretPosition() {
  const string = randInt(1, DEFAULT_NUMBER_OF_STRINGS);
  const fret = randInt(0, 12);
  return new FretPosition(string, fret);
}

export class FretPositionFinder {
  constructor() {
    this.fretPositions = FRET_POSITION_DEFINITION;
  }

  findPosition(string, fret) {
    return new FretPosition(string, fret);
  }

  filter(fps) {
    let res;
    let type;
    if (fps instanceof Set) {
      res = new Set();
      type = "set";
    } else {
      res = [];
      type = "list";
    }
    for (let fp of fps) {
      if (fp.fret <= DEFAULT_MAX_FRET_INDEX) {
        if (type === "set") {
          res.add(fp);
        } else {
          res.push(fp);
        }
      }
    }
    return res;
  }

  getFretPositionsByPitch(pitch, cfg = {}) {
    if (typeof pitch === "string") {
      pitch = new Pitch(pitch);
    }
    if (pitch instanceof Pitch) {
      const indexes = PITCH_NAME_TO_FRET_POSITION_INDEX[pitch.name];
      let res = [];
      for (let index of indexes) {
        res.push(new FretPosition(index.string, index.fret));
      }
      if (cfg.asSet) {
        res = new Set(res);
      }
      return this.filter(res);
    }
  }

  getFretPositionsByNote(note, cfg = {}) {
    if (typeof note === "string") {
      note = new Note(note);
    }
    if (note instanceof Note) {
      const indexes = NOTE_NAME_TO_FRET_POSITION_INDEX[note.name];
      let res = [];
      for (let index of indexes) {
        res.push(new FretPosition(index.string, index.fret));
      }
      if (cfg.asSet) {
        res = new Set(res);
      }
      return this.filter(res);
    }
  }

  getFretPositionsByNoteAndString(note, string, cfg = {}) {
    if (typeof note === "string") {
      note = new Note(note);
    }
    if (note instanceof Note) {
      const indexes = NOTE_NAME_TO_FRET_POSITION_INDEX[note.name];
      let res = [];
      for (let index of indexes) {
        if (string !== undefined && index.string !== string) {
          continue;
        }
        res.push(new FretPosition(index.string, index.fret));
      }
      if (cfg.asSet) {
        res = new Set(res);
      }
      return this.filter(res);
    }
  }
}
