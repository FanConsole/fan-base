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
  useParent: () => useParent
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
function useParent(key) {
  const parent = (0, import_vue.inject)(key, null);
  if (parent) {
    const instance = (0, import_vue.getCurrentInstance)();
    const { link, unlink, internalChildren } = parent;
    link(instance);
    (0, import_vue.onUnmounted)(() => unlink(instance));
    const index = (0, import_vue.computed)(() => internalChildren.indexOf(instance));
    return {
      parent,
      index
    };
  }
  return {
    parent: null,
    index: (0, import_vue.ref)(-1)
  };
}
