import { PITCH_NAME_TO_INDEX, PITCH_TABLE } from "./pitch-constants";
import {
  DEFAULT_NUMBER_OF_FRETS,
  GUITAR_STRINGS_DEFINITION,
} from "./guitar-constants";
import * as Tone from "tone";

export class BaseString {
  constructor(basePitchName) {
    const pitchIndex = PITCH_NAME_TO_INDEX[basePitchName];
    const frets = DEFAULT_NUMBER_OF_FRETS;
    this.pitchs = PITCH_TABLE.slice(pitchIndex, pitchIndex + frets);
    this.tone = undefined;
    // this.synth = new Tone.Synth().toDestination();
    this.sampler = new Tone.Sampler({
      urls: {
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
      },
      release: 1,
      // baseUrl: "https://www.get-tuned.com/sounds/guitar/", CORS ERROR
      // baseUrl: "/audio/gettuned/guitar/",
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
  }

  play = (fret, duration = "4n") => {
    // 1m = one measure
    // 2n = half note
    // 2t = half note triplet
    // 4n = quarter note
    // 4t = quarter note triplet
    // 8n = eighth note
    // 8t = eighth note triplet
    // etc. through 128th notes
    const pitch = this.pitchs[fret];
    try {
      this.sampler.triggerAttackRelease([pitch.names[0]], duration);
    } catch (e) {}
  };
}

export class ClassicStrings extends BaseString {
  constructor(number) {
    const basePitchName = GUITAR_STRINGS_DEFINITION[number].basePitchName;
    super(basePitchName);
    this.number = number;
  }
}
