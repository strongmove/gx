import { GuessTheNote } from "@guitarx/fret-boards";

export default class Fretboard extends GuessTheNote {
  sensePitch = (e) => {
    const fp = this.mouseClickEventToFretPosition(e);
    this.playFretPosition(fp, "2n");
    return this.check(fp);
  };
}
