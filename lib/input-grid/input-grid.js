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
var import_input_grid_sfc = require("./input-grid-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("InputGrid")[0],
  emits: ["update:modelValue", "input"],
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    // 输入内容长度
    length: {
      type: [String, Number],
      default: 6
    },
    type: {
      type: String,
      default: "text",
      validator: (value) => {
        return ["text", "number", "idcard", "tel"].includes(value);
      }
    },
    gridStyle: String,
    cursorColor: {
      type: String,
      default: "#1677FE"
    },
    // 输入完成时是否自动收起软键盘
    autoBlur: {
      type: [String, Boolean],
      default: true
    }
  },
  setup(props, { emit }) {
    const innerValue = (0, import_vue.ref)("");
    const focus = (0, import_vue.ref)(false);
    const domRef = (0, import_vue.ref)(null);
    const renderValues = (0, import_vue.computed)(() => {
      const val = `${typeof innerValue.value === "undefined" ? "" : innerValue.value}`;
      const length = props.length;
      let index = -1;
      const chars = Array.from({ length }).map((_, i) => {
        const char = val[i] || "";
        if (char === "" && index === -1)
          index = i;
        return char;
      });
      if (val.length >= length)
        index = length - 1;
      return { chars, index };
    });
    const theStyle = (0, import_vue.computed)(() => {
      return `--fan-grid-cursor-color:${props.cursorColor};`;
    });
    (0, import_vue.watch)(
      () => props.modelValue,
      (val) => {
        if (val !== innerValue.value)
          innerValue.value = val;
      },
      { immediate: true }
    );
    (0, import_vue.watch)(
      () => innerValue.value,
      (val) => {
        if (val !== props.modelValue)
          emit("update:modelValue", val);
        emit("input", val);
      },
      { immediate: true }
    );
    const onFocus = () => {
      focus.value = true;
    };
    const onBlur = () => {
      focus.value = false;
    };
    const onInput = (e) => {
      var _a;
      const { length, type, autoBlur } = props;
      const innerValues = e.target.value;
      let val = String(innerValues);
      if (autoBlur && val.length >= length) {
        (_a = domRef.value) == null ? void 0 : _a.input.blur();
        onBlur();
      }
      if (val.length > length)
        val = val.substring(0, length);
      if (val && (type === "number" || type === "tel")) {
        val = isNaN(+val) ? "" : +val;
      }
      if (val !== innerValue.value)
        innerValue.value = val;
    };
    const boxClick = () => {
      var _a;
      (_a = domRef.value) == null ? void 0 : _a.input.focus();
      if (!focus.value)
        focus.value = true;
      else
        focus.value = focus.value === 1 ? true : 1;
    };
    return {
      theStyle,
      renderValues,
      innerValue,
      focus,
      onFocus,
      onBlur,
      onInput,
      boxClick
    };
  }
});
const _hoisted_1 = ["type", "value", "focus", "autofocus"];
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: "fan-grid-input",
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle)
    },
    [
      (0, import_vue2.createElementVNode)("input", {
        ref: "input",
        class: "fan-grid-input__in",
        type: _ctx.type,
        value: _ctx.innerValue,
        focus: _ctx.focus,
        autofocus: _ctx.focus,
        onFocus: _cache[0] || (_cache[0] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
        onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
        onInput: _cache[2] || (_cache[2] = (...args) => _ctx.onInput && _ctx.onInput(...args))
      }, null, 40, _hoisted_1),
      (0, import_vue2.createElementVNode)("div", {
        class: "fan-flex",
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.boxClick && _ctx.boxClick(...args))
      }, [
        ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
          import_vue2.Fragment,
          null,
          (0, import_vue2.renderList)(_ctx.renderValues.chars, (char, index) => {
            return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
              "div",
              {
                key: index,
                class: (0, import_vue2.normalizeClass)(["fan-grid-input__box", { cursor: _ctx.focus && index === _ctx.renderValues.index }]),
                style: (0, import_vue2.normalizeStyle)(_ctx.gridStyle)
              },
              (0, import_vue2.toDisplayString)(char),
              7
              /* TEXT, CLASS, STYLE */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
