import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

function createCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export class Emage {
  static async fromSource(src) {
    const emage = new Emage();
    await emage.setElementFromURL(src);
    return emage;
  }

  static async fromB64(b64) {
    const emage = new Emage();
    await emage.setElementFromB64(b64);
    return emage;
  }

  static loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        resolve(image);
      };
      image.onerror = (e) => {
        const error = new Error(
          "The image host does not support third party processing."
        );
        reject(error);
      };
      image.src = src;
    });
  }

  async getDiffImageAsB64(other, pixelmatchConfig) {
    let [e1, e2] = [this, other];
    if (!e1.isSameAspectRatio(e2)) {
      throw new Error("The images must have the same aspect ratio.");
    }
    if (e1.isSmallerSize(e2)) {
      e1 = await e1.stretchTo(e2);
    } else {
      e2 = await e2.stretchTo(e1);
    }
    const d1 = e1.getImageData();
    const d2 = e2.getImageData();
    const diff = new PNG({
      width: e1.width,
      height: e1.height,
    });
    pixelmatch(
      d1.data,
      d2.data,
      diff.data,
      e1.width,
      e1.height,
      pixelmatchConfig
    );
    return Emage.convertImageDataToB64(diff);
  }

  async stretchTo(other) {
    if (this.width >= other.width) {
      return this;
    }
    const canvas = createCanvas(other.width, other.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this.element, 0, 0, other.width, other.height);
    const b64 = canvas.toDataURL();
    const e = await Emage.fromB64(b64);
    return e;
  }

  isSameSize(other) {
    return this.width === other.width && this.height === other.height;
  }

  isSmallerSize(other) {
    return this.width < other.width;
  }

  isSameAspectRatio(other) {
    return this.getAspectRatio() === other.getAspectRatio();
  }

  getAspectRatio() {
    return this.width / this.height;
  }

  static convertImageDataToB64(imageData) {
    const [w, h] = [imageData.width, imageData.height];
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext("2d");
    const id = ctx.createImageData(w, h);
    id.data.set(imageData.data);
    ctx.putImageData(id, 0, 0);
    const b64 = canvas.toDataURL();
    return b64;
  }

  setElementFromURL = async (url) => {
    const image = await Emage.loadImage(url);
    this.width = this.naturalWidth = image.naturalWidth;
    this.height = this.naturalHeight = image.naturalHeight;
    this.element = image;
  };

  setElementFromB64 = async (b64) => {
    const image = await Emage.loadImage(b64);
    this.width = this.naturalWidth = image.naturalWidth;
    this.height = this.naturalHeight = image.naturalHeight;
    this.element = image;
  };

  getImageData = (asB64) => {
    const [width, height] = [this.naturalWidth, this.naturalHeight];
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    let imageData;
    ctx.drawImage(this.element, 0, 0);
    if (asB64) {
      imageData = canvas.toDataURL();
    } else {
      imageData = ctx.getImageData(0, 0, width, height);
    }
    canvas.remove();
    return imageData;
  };
}
