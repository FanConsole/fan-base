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
var import_data_panel_sfc = require("./data-panel-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("DataPanel")[0],
  props: {
    // [{ label, value }, ...]
    data: Array,
    column: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const colClass = (0, import_vue.computed)(() => {
      const { column, data } = props;
      if (!data)
        return "";
      if (!column) {
        const l = data.length;
        if (l < 4)
          return "col" + l;
        return "col" + (l % 3 === 0 || l % 3 === 2 ? 3 : 2);
      }
      return "col" + column;
    });
    return { colClass };
  }
});
const _hoisted_1 = { class: "fan-flex fan-data-panel__in" };
const _hoisted_2 = { class: "fan-data-panel__val" };
const _hoisted_3 = { class: "fan-data-panel__t" };
function __vue_render__(_ctx, _cache) {
  return _ctx.data && _ctx.data.length ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      key: 0,
      class: (0, import_vue2.normalizeClass)(["fan-data-panel", _ctx.colClass])
    },
    [
      (0, import_vue2.createElementVNode)("div", _hoisted_1, [
        ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
          import_vue2.Fragment,
          null,
          (0, import_vue2.renderList)(_ctx.data, (item, index) => {
            return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", {
              key: index,
              class: "fan-flex-col fan-justify-center fan-align-center fan-data-panel__item"
            }, [
              (0, import_vue2.createElementVNode)(
                "div",
                _hoisted_2,
                (0, import_vue2.toDisplayString)(item.value),
                1
                /* TEXT */
              ),
              (0, import_vue2.createElementVNode)(
                "div",
                _hoisted_3,
                (0, import_vue2.toDisplayString)(item.label),
                1
                /* TEXT */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ],
    2
    /* CLASS */
  )) : (0, import_vue2.createCommentVNode)("v-if", true);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
