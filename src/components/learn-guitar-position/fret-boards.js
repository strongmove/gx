import { FretPositionFinder } from "./fret-position";
import { BaseString } from "./guitar-string";
import { GUITAR_STRINGS_DEFINITION } from "./guitar-constants";
import { FretPosition } from "./fret-position";
import { Note } from "./note";
import _ from "lodash";

export class BaseFretBoard {
  constructor(canvasRef, cfg) {
    this.canvasRef = canvasRef;
    this.ctx = canvasRef.current.getContext("2d");
    this.imageSrc = cfg.backgroundImageSource;
    this.frets = cfg.fretCount;
    this.cfg = cfg;
    this.cfg.fret.interval.centered = this.makeCenteredIntervals(
      cfg.fret.spacing.default
    );
    this.cfg.string.interval.centered = this.makeCenteredIntervals(
      cfg.string.spacing.default
    );
    this.fpf = new FretPositionFinder();
    this.setupStrings();
  }

  playFretPosition(fp, duration = "4n") {
    const string = fp.string;
    this.strings[string].play(fp.fret, duration);
  }

  setupStrings = () => {
    this.strings = {};
    for (let stringIndex in GUITAR_STRINGS_DEFINITION) {
      const stringDef = GUITAR_STRINGS_DEFINITION[stringIndex];
      this.strings[stringDef.index] = new BaseString(stringDef.basePitchName);
    }
  };

  makeCenteredIntervals = (spacings) => {
    let min = 0;
    const res = [];
    for (let i = 0; i < spacings.length; i++) {
      let [currY, nextY] = [spacings[i], spacings[i + 1]];
      if (isNaN(nextY)) {
        nextY = currY;
      }
      const dY = nextY - currY;
      const max = currY + dY / 2;
      res.push([min, max]);
      min = max + 0.01;
    }
    return res;
  };

  sensePitch = async (e) => {
    throw new Error("Not implemented");
  };

  mouseClickEventToFretPosition = (e) => {
    let [mx, my] = this.getMousePosition(e);
    const canvas = this.canvasRef.current;
    let [canvasHeight, canvasWidth] = [canvas.height, canvas.width];
    if (this.cfg.orientation === "landscape") {
      [mx, my] = [my, mx];
      [canvasHeight, canvasWidth] = [canvasWidth, canvasHeight];
      mx = canvasWidth - mx;
    }
    [mx, my] = [
      mx * (this.cfg.width / canvasWidth),
      my * (this.cfg.height / canvasHeight),
    ];
    const fret = this.getFretWithYPos(my);
    const string = this.getStringWithXPos(mx);
    return new FretPosition(string, fret);
  };

  getStringWithXPos = (x) => {
    const intervals = this.cfg.string.interval.centered;
    const strings = intervals.length;
    if (x <= intervals[0][0]) {
      return strings;
    } else if (x > intervals[strings - 1][1]) {
      return 1;
    }
    for (let string in intervals) {
      const interval = intervals[string];
      if (x > interval[0] && x <= interval[1]) {
        return parseInt(intervals.length - string);
      }
    }
  };

  getFretWithYPos = (y) => {
    const intervals = this.cfg.fret.interval.centered;
    const frets = intervals.length;
    if (y <= intervals[0][0]) {
      return 0;
    } else if (y > intervals[frets - 1][1]) {
      return frets;
    }
    for (let fret in intervals) {
      const interval = intervals[fret];
      if (y > interval[0] && y <= interval[1]) {
        return parseInt(fret);
      }
    }
  };

  drawDot = (x, y, customConfig) => {
    let defaultConfig = {
      radius: 15,
      fillColor: "green",
      strokeColor: "#030",
      strokeWidth: 4,
    };
    const cfg = { ...defaultConfig, ...customConfig };
    this.ctx.beginPath();
    this.ctx.arc(x, y, cfg.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = cfg.fillColor;
    this.ctx.fill();
    this.ctx.lineWidth = cfg.strokeWidth;
    this.ctx.strokeStyle = cfg.strokeColor;
    this.ctx.stroke();
  };

  stringinterval = () => {
    return (this.cfg.width - this.cfg.leftOffset - this.cfg.rightOffset) / 5;
  };

  position2coord = _.memoize((position) => {
    const { width, height, canvas, string, fret } = this.cfg;
    const [xRatio, yRatio] = [canvas.width / width, canvas.height / height];
    const xSpacing = string.spacing.default;
    const ySpacing = fret.spacing.default;
    const x = xSpacing[xSpacing.length - position.string] * xRatio;
    const y = ySpacing[position.fret] * yRatio;
    return [x, y];
  });

  drawPosition = (position, customConfig) => {
    const defaultConfig = {
      radius: 10,
    };
    const cfg = { ...defaultConfig, ...customConfig };
    const [x, y] = this.position2coord(position);
    this.drawDot(x, y, cfg);
  };

  drawPositions = (positions) => {
    for (let position of positions) {
      this.drawPosition(position);
    }
  };

  rotate = () => {
    const canvas = this.canvasRef.current;
    const ctx = this.ctx;
    let { width, height } = this.image;
    const { width: cw, height: ch } = this.cfg.canvas;
    canvas.setAttribute("width", ch);
    canvas.setAttribute("height", cw);
    ctx.rotate((-90 * Math.PI) / 180);
    ctx.translate(-cw, 0);
    this.ctx.fillStyle = "rgba(120, 60, 14, 0.9)";
    this.ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(this.image, 0, 0, width, height, 0, 0, cw, ch);
  };

  drawBackground = async () => {
    const cfg = this.cfg;
    if (!this.image) {
      const image = new Image();
      image.src = this.imageSrc;
      await image.decode();
      this.image = image;
    }
    if (this.cfg.orientation === "landscape") {
      this.rotate();
    } else {
      const { width, height } = cfg.canvas;
      this.canvasRef.current.setAttribute("height", height);
      this.canvasRef.current.setAttribute("width", width);
      this.ctx.fillStyle = "rgba(120, 60, 14, 0.9)";
      this.ctx.fillRect(0, 0, width, height);
      this.ctx.drawImage(this.image, 0, 0, width, height);
    }
  };

  redraw = () => {
    this.drawBackground();
  };

  setOrigin = () => {
    const rect = this.canvasRef.current.getBoundingClientRect();
    this.origin = { x: rect.left, y: rect.top };
  };

  getMousePosition = (e) => {
    this.setOrigin();
    return [e.clientX - this.origin.x, e.clientY - this.origin.y];
  };
}

export class GuessTheNote extends BaseFretBoard {
  reset = async () => {
    delete this.targetNote;
    delete this.positionSet;
    await this.drawBackground();
  };

  startNewProblem(targetNote, targetString) {
    this.targetNote = new Note(targetNote);
    this.targetString = targetString;
    this.correctFretPositions = this.fpf.getFretPositionsByNoteAndString(
      targetNote,
      targetString,
      {
        asSet: true,
      }
    );
  }

  check(selectedFretPostion) {
    return this.correctFretPositions.has(selectedFretPostion);
  }

  showAll(positions) {
    for (let position of positions) {
      this.drawPosition(position);
    }
  }

  showAnswers() {
    // const positions = this.fpf.getFretPositionsByNote(this.targetNote);
    this.showAll(this.correctFretPositions);
  }

  addFretPositionToPositionSet(fp) {
    if (this.positionSet === undefined) {
      this.positionSet = new Set();
    }
    this.positionSet.add(fp);
  }

  sensePitch = (e) => {
    const fp = this.mouseClickEventToFretPosition(e);
    this.playFretPosition(fp);

    const correct = this.check(fp, this.targetNote);
    let res = { status: "STARTED", solved: true };
    if (correct) {
      this.drawPosition(fp, { fillColor: "rgba(255, 165, 0, 0.8)" });
      this.addFretPositionToPositionSet(fp);
      if (this.positionSet.size === this.correctFretPositions.size) {
        res = { status: "FINISHED", solved: true };
        this.drawPositions(this.positionSet);
      }
    }
    return res;
  };
}

export class GuessTheThird extends BaseFretBoard {
  reset = async () => {
    delete this.targetPitch;
    delete this.positionSet;
    await this.drawBackground();
  };

  check = async () => {
    if (this.targetPitch) {
      await this.drawBackground();
      for (let position of this.positionSet) {
        this.drawPosition(position);
      }
      const solutions = this.fpf.findPositions(this.targetPitch.name);
      let missed = 0;
      for (let solution of solutions) {
        if (!this.positionSet.has(solution)) {
          this.drawPosition(solution, { fillColor: "red" });
          missed += 1;
        }
      }
      return missed;
    }
  };

  isEqual = (target, current) => {
    return current.pitch.isOctave(this.targetPitch.getInterval(6));
  };

  sensePitch = async (e) => {
    // const fp = this.mouseClickEventToFretPosition(e);
  };
}

export class GuessOtherPositionsFretBoard extends BaseFretBoard {
  reset = async () => {
    delete this.targetPitch;
    delete this.positionSet;
    await this.drawBackground();
  };

  check = async () => {
    if (this.targetPitch) {
      await this.drawBackground();
      for (let position of this.positionSet) {
        this.drawPosition(position);
      }
      const solutions = this.fpf.findPositions(this.targetPitch.name);
      let missed = 0;
      for (let solution of solutions) {
        if (!this.positionSet.has(solution)) {
          this.drawPosition(solution, { fillColor: "red" });
          missed += 1;
        }
      }
      return missed;
    }
  };

  sensePitch = async (e) => {
    const [mx, my] = this.getMousePosition(e);
    const fret = this.getFretWithYPos(my);
    const string = this.getStringWithXPos(mx);
    const position = this.fpf.findPosition(string, fret);
    this.strings[string].play(fret);
    if (this.targetPitch === undefined) {
      this.targetPitch = position.pitch;
      console.log(`Setting target pitch to ${position.pitch.name}`);
      this.positionSet = new Set();
      this.positionSet.add(position);
    } else {
      await this.drawBackground();
      for (let position of this.positionSet) {
        this.drawPosition(position);
      }
    }
    if (position.pitch.isOctave(this.targetPitch)) {
      this.drawPosition(position);
      this.positionSet.add(position);
    } else {
      this.drawPosition(position, { fillColor: "red" });
    }
  };
}

export class ShowPitchPositionsFretBoard extends BaseFretBoard {
  sensePitch = async (e) => {
    const [mx, my] = this.getMousePosition(e);
    const fret = this.getFretWithYPos(my);
    const string = this.getStringWithXPos(mx);
    const position = this.fpf.findPosition(string, fret);
    const positions = this.fpf.findPositions(position.pitch.name);
    await this.drawBackground();
    this.drawPositions(positions);
  };
}
