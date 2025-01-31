var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
  toast: () => toast
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_toast = __toESM(require("./toast.js"));
const defaultOptions = {
  message: "",
  icon: "",
  duration: 2e3
};
let queue = [];
function parseOptions(message) {
  if (typeof message === "object")
    return message;
  return {
    message: message ? String(message) : ""
  };
}
function createInstance() {
  const {
    instance
  } = (0, import_utils.mountComponent)({
    setup() {
      const {
        open,
        state,
        close,
        toggle
      } = (0, import_utils.usePopupState)();
      const render = () => {
        return (0, import_vue.createVNode)(import_toast.default, (0, import_vue.mergeProps)(state, {
          "onUpdate:show": toggle
        }), null);
      };
      (0, import_vue2.getCurrentInstance)().render = render;
      return {
        open,
        close
      };
    }
  });
  return instance;
}
function getInstance() {
  if (!queue.length) {
    const instance = createInstance();
    queue.push(instance);
  }
  return queue[queue.length - 1];
}
const create = (options, o = {
  icon: "none"
}) => {
  const toast2 = getInstance();
  const parsedOptions = parseOptions(options);
  toast2.open(__spreadValues(__spreadValues(__spreadValues({}, defaultOptions), parsedOptions), o));
  return toast2;
};
const toast = (options) => create(options);
toast.success = (options) => create(options, {
  icon: "success"
});
toast.error = (options) => create(options, {
  icon: "error"
});
toast.loading = (options) => create(options, {
  icon: "loading",
  duration: 0
});
toast.clear = () => {
  if (queue.length) {
    queue.forEach((toast2) => {
      toast2.close();
    });
    queue = [];
  }
};
