var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  dialog: () => dialog
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../utils");
var import_dialog = __toESM(require("./dialog.js"));
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
      } = (0, import_utils.usePopupState)();
      return () => (0, import_vue.createVNode)(import_dialog.default, (0, import_vue.mergeProps)(state, {
        "onUpdate:show": toggle
      }), null);
    }
  };
  ({
    instance
  } = (0, import_utils.mountComponent)(Wrapper));
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
