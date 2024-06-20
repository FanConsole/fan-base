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
var import_search_sfc = require("./search-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_icon = __toESM(require("../icon/icon.js"));
var import_button = __toESM(require("../button/button.js"));
var import_input = __toESM(require("../input/input.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Search")[0],
  components: { FanIcon: import_icon.default, FanButton: import_button.default, FanInput: import_input.default },
  emits: ["blur", "focus", "click", "search", "input", "update:modelValue"],
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: String,
    prefixIcon: Boolean,
    readonly: {
      type: Boolean,
      default: false
    },
    bg: String,
    radius: {
      type: String,
      default: "20px"
    },
    icon: String,
    iconStyle: [String, Object],
    innerStyle: String,
    btnStyle: [String, Object]
  },
  setup(props, { emit }) {
    const inputBoxStyle = (0, import_vue.computed)(() => {
      const { bg, radius, innerStyle } = props;
      let style = "";
      if (bg)
        style += `background-color:${bg};`;
      if (radius)
        style += `border-radius:${(0, import_utils.transformSize)(radius)};`;
      return (0, import_utils.transformStyleSize)(style) + (0, import_utils.transformStyleSize)(innerStyle);
    });
    const btnBoxStyle = (0, import_vue.computed)(() => (0, import_utils.transformStyleSize)(props.btnStyle));
    const innerValue = (0, import_vue.ref)(props.modelValue);
    (0, import_vue.watch)(innerValue, (val) => {
      if (val !== props.modelValue) {
        emit("update:modelValue", innerValue.value);
        emit("input", val);
      }
    });
    (0, import_vue.watch)(
      () => props.modelValue,
      (val) => {
        if (val !== innerValue.value)
          innerValue.value = val;
      }
    );
    const onBlur = (e) => emit("blur", e);
    const onFocus = (e) => emit("focus", e);
    const onInput = (val) => emit("input", val);
    const onConfirm = (val) => emit("search", val);
    const onClick = () => emit("click");
    return {
      btnBoxStyle,
      inputBoxStyle,
      innerValue,
      onBlur,
      onFocus,
      onInput,
      onClick,
      onConfirm
    };
  }
});
const _hoisted_1 = { class: "fan-search" };
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  const _component_FanInput = (0, import_vue2.resolveComponent)("FanInput");
  const _component_FanButton = (0, import_vue2.resolveComponent)("FanButton");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
    (0, import_vue2.createElementVNode)(
      "div",
      {
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
        class: "fan-search__inner",
        style: (0, import_vue2.normalizeStyle)(_ctx.inputBoxStyle)
      },
      [
        _ctx.prefixIcon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
          key: 0,
          name: "search",
          color: "#999",
          size: 14,
          style: { marginRight: "3px" }
        })) : (0, import_vue2.createCommentVNode)("v-if", true),
        (0, import_vue2.createVNode)(_component_FanInput, {
          modelValue: _ctx.innerValue,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.innerValue = $event),
          class: "fan-flex-1",
          style: { padding: "0 4px 0 0" },
          placeholder: _ctx.placeholder || "\u641C\u4E00\u641C",
          readonly: _ctx.readonly,
          clearable: "",
          onBlur: _ctx.onBlur,
          onFocus: _ctx.onFocus,
          onInput: _ctx.onInput,
          onConfirm: _ctx.onConfirm
        }, null, 8, ["modelValue", "placeholder", "readonly", "onBlur", "onFocus", "onInput", "onConfirm"]),
        _ctx.icon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
          key: 1,
          name: _ctx.icon,
          style: (0, import_vue2.normalizeStyle)(_ctx.iconStyle),
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.onConfirm(_ctx.innerValue))
        }, null, 8, ["name", "style"])) : ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanButton, {
          key: 2,
          style: (0, import_vue2.normalizeStyle)(_ctx.btnBoxStyle),
          round: "",
          radius: _ctx.radius,
          width: "70px",
          height: "100%",
          onClick: _cache[2] || (_cache[2] = ($event) => _ctx.onConfirm(_ctx.innerValue))
        }, {
          default: (0, import_vue2.withCtx)(() => [
            (0, import_vue2.createTextVNode)("\u641C\u7D22")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["style", "radius"]))
      ],
      4
      /* STYLE */
    )
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
