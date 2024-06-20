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
var import_checkbox_sfc = require("./checkbox-sfc.css");
var import_vue = require("vue");
var import_icon = __toESM(require("../icon/icon.js"));
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Checkbox")[0],
  components: { FanIcon: import_icon.default },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    size: {
      type: [String, Number],
      default: "24px"
    },
    color: {
      type: String
    },
    iconColor: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const theStyle = (0, import_vue.computed)(() => {
      const { color, customStyle } = props;
      let s = "";
      if (color)
        s += `--fan-checkbox-active-color:${color};`;
      return s;
    });
    const iSize = (0, import_vue.computed)(() => (0, import_utils.transformSize)(props.size));
    const toggle = () => {
      const val = !props.modelValue;
      emit("update:modelValue", val);
      emit("change", val);
    };
    return { theStyle, iSize, toggle, iconColor: props.iconColor };
  }
});
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      class: (0, import_vue2.normalizeClass)(["fan-checkbox", {
        "fan-checkbox--disabled": _ctx.disabled,
        "fan-checkbox--checked": _ctx.modelValue
      }]),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggle && _ctx.toggle(...args))
    },
    [
      (0, import_vue2.createElementVNode)(
        "div",
        {
          class: "fan-checkbox__i",
          style: (0, import_vue2.normalizeStyle)({ width: _ctx.iSize, height: _ctx.iSize })
        },
        [
          (0, import_vue2.createVNode)(_component_FanIcon, {
            name: "check",
            size: `calc(${_ctx.iSize} * 0.8)`,
            color: _ctx.disabled ? "#c8c9cc" : _ctx.iconColor ? _ctx.iconColor : "#fff",
            "custom-style": { visibility: _ctx.modelValue ? "visible" : "hidden" }
          }, null, 8, ["size", "color", "custom-style"])
        ],
        4
        /* STYLE */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
