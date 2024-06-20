var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { getSystemInfo as _getSystemInfo } from "byn-utils";
const getSystemInfo = () => __spreadProps(__spreadValues({}, _getSystemInfo()), {
  statusBarHeight: 0,
  navBarHeight: 44
});
const isMpWeixinWeb = () => {
  if (typeof window === "undefined")
    return false;
  const ua = window.navigator.userAgent;
  return _getSystemInfo().isWeixin && ua.includes("miniProgram");
};
const isDevPackage = () => {
  return process.env.NODE_ENV === "development" && location.pathname === "/mobile.html";
};
export {
  getSystemInfo,
  isDevPackage,
  isMpWeixinWeb
};
