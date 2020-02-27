/*!
 * ADID 0.0.1
 * API https://github.com/mrzzcn/ADID
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.ADID = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

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
        return __awaiter(this, void 0, void 0, function () {
            var flag, fingerPrintBefore, fingerPrintAfter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!supportive.canvas || !supportive.textApi || !supportive.toDataURL) {
                            return [2 /*return*/, {
                                    supportive: supportive,
                                    ADID: uuid(),
                                    message: 'Canvas api is not support on current browser.'
                                }];
                        }
                        if (window.location.protocol !== 'https:') {
                            console.warn("\nAccording to https://www.chromium.org/blink/webcrypto, crypto api is only available under https.\nPlease run script under a https domain");
                            return [2 /*return*/, {
                                    supportive: supportive,
                                    ADID: uuid(),
                                    message: 'Please run script under a https domain'
                                }];
                        }
                        return [4 /*yield*/, isFingerPrintSpoofedByPersistentNoise()];
                    case 1:
                        flag = _a.sent();
                        return [4 /*yield*/, getBrowserFingerPrint("png")];
                    case 2:
                        fingerPrintBefore = _a.sent();
                        return [4 /*yield*/, getBrowserFingerPrintAfterLoad()];
                    case 3:
                        fingerPrintAfter = _a.sent();
                        return [2 /*return*/, {
                                supportive: supportive,
                                spoofed: flag !== utils.hashes.red || fingerPrintAfter !== fingerPrintBefore,
                                spoofedByRandom: fingerPrintAfter !== fingerPrintBefore,
                                ADID: fingerPrintAfter,
                                spoofedRandomBefore: fingerPrintBefore,
                                spoofedRandomAfter: fingerPrintAfter
                            }];
                }
            });
        });
    }

    return ADID;

})));
