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
export default function uuid () {
  if (typeof crypto !== 'undefined') {
    return `${1e7}${-1e3}${-4e3}${-8e3}${-1e11}`.replace(/[018]/g, c =>
      (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16)
    )
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}