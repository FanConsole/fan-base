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
var import_switch_sfc = require("./switch-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Switch")[0],
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#04BE02"
    },
    size: {
      type: [String, Number],
      default: 30
    }
  },
  setup(props, { emit }) {
    const innerShow = (0, import_vue.ref)(props.modelValue);
    (0, import_vue.watch)(() => props.modelValue, (val) => innerShow.value = val);
    const theStyle = (0, import_vue.computed)(() => {
      const { size, color } = props;
      const s = `font-size: ${(0, import_utils.transformSize)(
        size
      )};--fan-switch--color: ${color};`;
      return s;
    });
    const onClick = () => {
      if (props.disabled)
        return;
      innerShow.value = innerShow.value ? false : true;
      emit("update:modelValue", innerShow.value);
      emit("change", innerShow.value);
    };
    return { innerShow, theStyle, onClick };
  }
});
const _hoisted_1 = /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "div",
  { class: "fan-switch__node" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_2 = [
  _hoisted_1
];
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: (0, import_vue2.normalizeClass)(["fan-switch", [{ "fan-switch__on": _ctx.innerShow }, { "fan-switch__d": _ctx.disabled }]]),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle)
    },
    [..._hoisted_2],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
