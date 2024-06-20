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
  mountComponent: () => mountComponent,
  usePopupState: () => usePopupState
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
const extend = Object.assign;
function usePopupState() {
  const state = (0, import_vue.reactive)({
    show: false
  });
  const toggle = (show) => {
    state.show = show;
  };
  const open = (props) => {
    extend(state, props);
    toggle(true);
  };
  const close = () => toggle(false);
  const instance = (0, import_vue.getCurrentInstance)();
  if (instance) {
    extend(instance.proxy, { open, close, toggle });
  }
  return {
    open,
    close,
    state,
    toggle
  };
}
function mountComponent(RootComponent) {
  const app = (0, import_vue.createApp)(RootComponent);
  const root = document.createElement("div");
  document.body.appendChild(root);
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    }
  };
}
