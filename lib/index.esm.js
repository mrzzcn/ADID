/*!
 * ADID 0.0.1
 * API https://github.com/mrzzcn/ADID
 */

/*
 * @Date: 2020-02-27 11:18:40
 * @LastEditTime: 2020-02-27 11:22:09
 * @Description:
 * @Author: mrzzcn
 * @LastEditors: mrzzcn
 */
/**
 * Generate random uuid like `XXXXYYYY-XXXX-XXXX-XXXX-XXXXYYYYZZZZ`
 */
function uuid() {
    if (typeof crypto !== 'undefined') {
        return ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
            return (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16);
        });
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/*
 * @Date: 2020-02-27 09:34:37
 * @LastEditTime: 2020-02-27 11:34:21
 * @Description:
 * @Author: mrzzcn
 * @LastEditors: mrzzcn
 */
var utils = {
    buf2hex: function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (buf) { return ("00" + buf.toString(16)).slice(-2); }).join("");
    },
    hash: function (source) { return crypto.subtle.digest("SHA-256", source); },
    hashes: {
        red: "e1611c0f76dfefc367d7e5411993eaf1295aafcb5f7b574157b3e686a789380c"
    }
};
var supportive = {
    canvas: false,
    textApi: false,
    toDataURL: false
};
(function () {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    supportive.canvas = !(!canvas.getContext || !canvas.getContext("2d"));
    supportive.textApi = !(!canvas.getContext || !context || !context.fillText);
    supportive.toDataURL = !(!canvas.getContext || !canvas.toDataURL);
})();
function isFingerPrintSpoofedByPersistentNoise() {
    var canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 24;
    var context = canvas.getContext("2d");
    if (!context)
        return Promise.reject();
    context.fillStyle = "rgb(255, 0, 0)";
    context.fillRect(4, 4, canvas.width - 8, canvas.height - 8);
    var buffer = context.getImageData(0, 0, canvas.width, canvas.height).data.buffer;
    return utils.hash(buffer).then(utils.buf2hex);
}
function getBrowserFingerPrint(method) {
    if (method === void 0) { method = "binary"; }
    var canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 24;
    var context = canvas.getContext("2d");
    var i = "WeBrowserTools.com <canvas> 1.0";
    if (!context)
        return Promise.reject("");
    context.textBaseline = "middle";
    context.font = '14px "Arial"';
    context.textBaseline = "alphabetic";
    context.fillStyle = "rgb(255, 102, 0)";
    context.fillRect(canvas.width / 4, 0, canvas.width / 2, canvas.height);
    context.fillStyle = "rgb(0, 102, 153)";
    context.fillText(i, 2, 15);
    context.fillStyle = "rgb(102, 204, 0)";
    context.fillText(i, 4, 17);
    var encoder = new TextEncoder;
    var r = method === "binary"
        ? context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
        : encoder.encode(canvas.toDataURL());
    return utils.hash(r).then(utils.buf2hex);
}
function getBrowserFingerPrintAfterLoad() {
    return new Promise(function (resolve, reject) {
        window.addEventListener("load", function () {
            getBrowserFingerPrint("png").then(resolve, reject);
        });
    });
}
function ADID() {
    if (!supportive.canvas || !supportive.textApi || !supportive.toDataURL) {
        return Promise.reject({
            supportive: supportive,
            ADID: uuid(),
            message: 'Canvas api is not support on current browser.'
        });
    }
    if (window.location.protocol !== 'https:') {
        console.warn("\nAccording to https://www.chromium.org/blink/webcrypto, crypto api is only available under https.\nPlease run script under a https domain");
        return Promise.reject({
            supportive: supportive,
            ADID: uuid(),
            message: 'Please run script under a https domain'
        });
    }
    return Promise.all([
        isFingerPrintSpoofedByPersistentNoise(),
        getBrowserFingerPrint("png"),
        getBrowserFingerPrintAfterLoad()
    ]).then(function (_a) {
        var flag = _a[0], fingerPrintBefore = _a[1], fingerPrintAfter = _a[2];
        return {
            supportive: supportive,
            spoofed: flag !== utils.hashes.red || fingerPrintAfter !== fingerPrintBefore,
            spoofedByRandom: fingerPrintAfter !== fingerPrintBefore,
            ADID: fingerPrintAfter,
            spoofedRandomBefore: fingerPrintBefore,
            spoofedRandomAfter: fingerPrintAfter
        };
    });
}

export default ADID;
