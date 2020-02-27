/*
 * @Date: 2020-02-27 09:34:37
 * @LastEditTime: 2020-02-27 11:34:21
 * @Description: 
 * @Author: mrzzcn
 * @LastEditors: mrzzcn
 */

import uuid from './uuid'

const utils = {
  buf2hex: (buf: ArrayBuffer) => {
    return Array.prototype.map.call(
      new Uint8Array(buf),
      buf => ("00" + buf.toString(16)).slice(-2)
    ).join("")
  },
  hash: (source: ArrayBuffer) => crypto.subtle.digest("SHA-256", source),
  hashes: {
    red: "e1611c0f76dfefc367d7e5411993eaf1295aafcb5f7b574157b3e686a789380c"
  }
};

const supportive = {
  canvas: false,
  textApi: false,
  toDataURL: false
};

(() => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  supportive.canvas = !(!canvas.getContext || !canvas.getContext("2d"))
  supportive.textApi = !(!canvas.getContext || !context || !context.fillText)
  supportive.toDataURL = !(!canvas.getContext || !canvas.toDataURL)
})()


function isFingerPrintSpoofedByPersistentNoise () {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 24;
  const context = canvas.getContext("2d");
  if (!context) return Promise.reject()
  context.fillStyle = "rgb(255, 0, 0)";
  context.fillRect(4, 4, canvas.width - 8, canvas.height - 8);
  const buffer = context.getImageData(0, 0, canvas.width, canvas.height).data.buffer;
  return utils.hash(buffer).then(utils.buf2hex);
}

function getBrowserFingerPrint (method: "binary" | "png" = "binary") {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 24;
  const context = canvas.getContext("2d");
  const i = "WeBrowserTools.com <canvas> 1.0";
  if (!context) return Promise.reject("");
  context.textBaseline = "middle";
  context.font = '14px "Arial"';
  context.textBaseline = "alphabetic";
  context.fillStyle = "rgb(255, 102, 0)";
  context.fillRect(canvas.width / 4, 0, canvas.width / 2, canvas.height);
  context.fillStyle = "rgb(0, 102, 153)";
  context.fillText(i, 2, 15);
  context.fillStyle = "rgb(102, 204, 0)";
  context.fillText(i, 4, 17);
  const encoder = new TextEncoder;
  const r = method === "binary"
    ? context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    : encoder.encode(canvas.toDataURL());
  return utils.hash(r).then(utils.buf2hex)
}

function getBrowserFingerPrintAfterLoad () {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", () => {
      getBrowserFingerPrint("png").then(resolve, reject)
    })
  });
}

export default async function ADID () {
  if (!supportive.canvas || !supportive.textApi || !supportive.toDataURL) {
    return {
      supportive,
      ADID: uuid(),
      message: 'Canvas api is not support on current browser.'
    }
  }
  if (window.location.protocol !== 'https:') {
    console.warn(`
According to https://www.chromium.org/blink/webcrypto, crypto api is only available under https.
Please run script under a https domain`)
    return {
      supportive,
      ADID: uuid(),
      message: 'Please run script under a https domain'
    }
  }

  const flag = await isFingerPrintSpoofedByPersistentNoise();
  const fingerPrintBefore = await getBrowserFingerPrint("png");
  const fingerPrintAfter = await getBrowserFingerPrintAfterLoad();
  return {
    supportive,
    spoofed: flag !== utils.hashes.red || fingerPrintAfter !== fingerPrintBefore,
    spoofedByRandom: fingerPrintAfter !== fingerPrintBefore,
    ADID: fingerPrintAfter,
    spoofedRandomBefore: fingerPrintBefore,
    spoofedRandomAfter: fingerPrintAfter
  }
}