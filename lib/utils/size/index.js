var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  getCssSizeValue: () => getCssSizeValue,
  isCssRelativeSize: () => isCssRelativeSize,
  transformSize: () => transformSize,
  transformStyleSize: () => transformStyleSize
});
module.exports = __toCommonJS(stdin_exports);
var import_common = require("./../common");
var import_system = require("../system");
let rootFontSize;
function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }
  return (0, import_system.isDevPackage)() ? rootFontSize : 49.9999875;
}
function isCssRelativeSize(value) {
  const reg = /(em|%|vw|vh|calc|rem|rpx)/;
  return reg.test(String(value));
}
function getCssSizeValue(value) {
  if (typeof value === "string") {
    return parseFloat(value.replace(/-[^0-9.]/g, ""));
  }
  return value;
}
function transformSize(size) {
  if (!size)
    return size;
  const sizeStr = String(size);
  if (isCssRelativeSize(sizeStr) || sizeStr.includes("PX") || sizeStr.includes("Px")) {
    return sizeStr;
  }
  const val = getCssSizeValue(sizeStr);
  if (!val) {
    return sizeStr;
  }
  if (getRootFontSize()) {
    return val / getRootFontSize() + "rem";
  }
  return val + "px";
}
function transformStyleSize(style) {
  if (!style)
    return "";
  let styleObj = {};
  let hasColon = false;
  if (typeof style === "string") {
    if (style.includes("://")) {
      hasColon = true;
      style = style.replace("://", "{{colon//}}");
    }
    const couples = style.split(";");
    couples.forEach((a) => {
      if (!a.trim())
        return;
      const [k, v] = a.split(":");
      styleObj[k.trim()] = v.trim();
    });
  } else if (typeof style === "object") {
    styleObj = style;
  } else {
    return "";
  }
  let styleStr = "";
  for (let k in styleObj) {
    let v = styleObj[k];
    if (typeof v === "string") {
      if (v.includes("px"))
        v = v.replace(/[0-9.]+px/g, (a) => transformSize(a));
      if (hasColon)
        v = v.replace("{{colon//}}", "://");
    }
    styleStr += `${(0, import_common.kebabCase)(k)}:${v};`;
  }
  return styleStr;
}
