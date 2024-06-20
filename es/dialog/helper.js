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
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { mountComponent, usePopupState } from "../utils";
import FanDialog from "./dialog.js";
const defaultOptions = {
  title: "",
  message: "",
  cancelText: "\u53D6\u6D88",
  cancelColor: "#84878F",
  showCancel: false,
  confirmText: "\u786E\u5B9A",
  confirmColor: "#F7931E",
  callback: null
};
let instance;
function parseOptions(message) {
  if (typeof message === "object")
    return message;
  return {
    message: message ? String(message) : ""
  };
}
const createInstance = () => {
  const Wrapper = {
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      return () => _createVNode(FanDialog, _mergeProps(state, {
        "onUpdate:show": toggle
      }), null);
    }
  };
  ({
    instance
  } = mountComponent(Wrapper));
};
const dialog = (options) => {
  return new Promise((resolve, reject) => {
    if (!instance) {
      createInstance();
    }
    const parsedOptions = parseOptions(options);
    instance.open(__spreadProps(__spreadValues(__spreadValues({}, defaultOptions), parsedOptions), {
      callback: (action) => {
        console.log(action);
        (action === "confirm" ? resolve : reject)(action);
      }
    }));
  });
};
dialog.confirm = (options) => {
  const parsedOptions = parseOptions(options);
  return dialog(__spreadProps(__spreadValues({}, parsedOptions), {
    showCancel: true
  }));
};
export {
  dialog
};
