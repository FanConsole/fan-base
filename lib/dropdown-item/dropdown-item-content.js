var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../utils");
var import_scroll_view = __toESM(require("../scroll-view/scroll-view.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("DropdownItemContent")[0],
  components: { ScrollView: import_scroll_view.default },
  props: {
    scroll: {
      type: Boolean,
      default: false
    },
    scrollHeight: {
      type: [String, Boolean],
      default: "61.8vh"
    }
  }
});
function __vue_render__(_ctx, _cache) {
  const _component_ScrollView = (0, import_vue2.resolveComponent)("ScrollView");
  return _ctx.scroll ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_ScrollView, {
    key: 0,
    height: _ctx.scrollHeight,
    "scroll-y": true
  }, {
    default: (0, import_vue2.withCtx)(() => [
      (0, import_vue2.renderSlot)(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["height"])) : (0, import_vue2.renderSlot)(_ctx.$slots, "default", { key: 1 });
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
