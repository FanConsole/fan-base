var __defProp = Object.defineProperty;
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
import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { getCurrentInstance } from "vue";
import { mountComponent, usePopupState } from "../utils";
import FanToast from "./toast.js";
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
  } = mountComponent({
    setup() {
      const {
        open,
        state,
        close,
        toggle
      } = usePopupState();
      const render = () => {
        return _createVNode(FanToast, _mergeProps(state, {
          "onUpdate:show": toggle
        }), null);
      };
      getCurrentInstance().render = render;
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
export {
  toast
};
