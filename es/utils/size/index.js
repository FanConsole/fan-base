import { kebabCase } from "./../common";
import { isDevPackage } from "../system";
let rootFontSize;
function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }
  return isDevPackage() ? rootFontSize : 49.9999875;
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
    styleStr += `${kebabCase(k)}:${v};`;
  }
  return styleStr;
}
export {
  getCssSizeValue,
  isCssRelativeSize,
  transformSize,
  transformStyleSize
};
