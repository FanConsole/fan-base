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
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_tab_panel_sfc = require("./tab-panel-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("TabPanel")[0],
  setup() {
    const uniqueId = (0, import_utils.createUniqueId)({ prefix: "fanTabPanel" });
    const _this = (0, import_vue.getCurrentInstance)();
    const tabsContent = (0, import_vue.inject)("fanTabsContent");
    const tabsActiveId = (0, import_vue.inject)("fanTabsContentActiveId", (0, import_vue.ref)(0));
    const active = (0, import_vue.computed)(() => tabsActiveId.value === uniqueId);
    (0, import_vue.onMounted)(() => {
      tabsContent && tabsContent.add(_this);
    });
    const theStyle = (0, import_vue.computed)(() => {
      if (!(tabsContent == null ? void 0 : tabsContent.width.value))
        return "";
      return `width:${tabsContent.width.value}px;`;
    });
    return { uniqueId, active, theStyle };
  }
});
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      class: (0, import_vue2.normalizeClass)(["fan-tab-panel", { "fan-tab-panel--active": _ctx.active }])
    },
    [
      (0, import_vue2.renderSlot)(_ctx.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
