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
var import_input_number_sfc = require("./input-number-sfc.css");
var import_vue = require("vue");
var import_icon = __toESM(require("../icon/icon.js"));
var import_utils = require("../utils");
var import_helper = require("./helper");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("InputNumber")[0],
  components: { FanIcon: import_icon.default },
  props: {
    modelValue: {
      type: [Number, String]
    },
    // 是否只允许输入整数
    integer: {
      type: Boolean,
      default: true
    },
    // 计数器步长
    step: {
      type: Number,
      default: 1
    },
    // 按钮大小
    actionSize: {
      type: [Number, String],
      default: 22
    },
    // 按钮颜色
    actionColor: {
      type: String
    },
    inputWidth: {
      type: [Number, String],
      default: 32
    },
    inputStyle: String,
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 99999
    },
    // 减少按钮图标名或网络地址，有值则覆盖默认按钮
    minusIcon: {
      type: String
    },
    // 增加按钮图标名或网络地址
    plusIcon: {
      type: String
    }
  },
  emits: ["update:modelValue", "input", "change", "overlimit"],
  setup(props, context) {
    const innerValue = (0, import_vue.ref)(1);
    const inputType = (0, import_vue.computed)(() => (0, import_helper.getInputType)(props.integer));
    const actionStyle = (0, import_vue.computed)(() => {
      const size = (0, import_utils.transformSize)(props.actionSize);
      return `width:${size};height:${size};`;
    });
    const theInputStyle = (0, import_vue.computed)(() => {
      const size = (0, import_utils.transformSize)(props.actionSize);
      const width = (0, import_utils.transformSize)(props.inputWidth);
      return `width:${width};height:${size};line-height:${size};${(0, import_utils.transformStyleSize)(
        props.inputStyle
      )}`;
    });
    const minusDisabled = (0, import_vue.computed)(() => innerValue.value <= props.min);
    const plusDisabled = (0, import_vue.computed)(
      () => props.max && innerValue.value >= props.max
    );
    (0, import_vue.watch)(
      () => props.modelValue,
      (val) => {
        if ((val || val === 0) && val !== innerValue.value)
          innerValue.value = val;
      },
      { immediate: true }
    );
    (0, import_vue.watch)(innerValue, (val) => {
      if (val !== props.modelValue)
        context.emit("update:modelValue", val);
      context.emit("input", val);
      context.emit("change", val);
    });
    const onInput = (e) => {
      let value = Number(e.target.value) || "";
      const { min, max } = props;
      if (!value || value < min) {
        value = min;
        context.emit("overlimit", "minus");
      } else if ((max || max === 0) && value > max) {
        value = max;
        context.emit("overlimit", "plus");
      }
      innerValue.value = value;
    };
    const minus = () => {
      const { step, min } = props;
      const val = innerValue.value - step;
      if (val < min) {
        if (step > 1)
          innerValue.value = min;
        else
          context.emit("overlimit", "minus");
      } else {
        innerValue.value = val;
      }
    };
    const plus = () => {
      const { step, max } = props;
      const val = innerValue.value + step;
      if ((max || max === 0) && val > max) {
        if (step > 1)
          innerValue.value = max;
        else
          context.emit("overlimit", "plus");
      } else {
        innerValue.value = val;
      }
    };
    return {
      innerValue,
      inputType,
      actionStyle,
      theInputStyle,
      minusDisabled,
      plusDisabled,
      onInput,
      minus,
      plus
    };
  }
});
const _hoisted_1 = { class: "fan-input-num" };
const _hoisted_2 = ["type", "inputmode"];
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
    (0, import_vue2.createElementVNode)(
      "button",
      {
        class: (0, import_vue2.normalizeClass)(["fan-flex fan-align-center fan-justify-center fan-input-num__action", { "fan-input-num--disabled": _ctx.minusDisabled }]),
        style: (0, import_vue2.normalizeStyle)(_ctx.actionStyle),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.minus && _ctx.minus(...args))
      },
      [
        !_ctx.minusIcon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
          "div",
          {
            key: 0,
            class: "fan-input-num__hl",
            style: (0, import_vue2.normalizeStyle)({ backgroundColor: _ctx.actionColor })
          },
          null,
          4
          /* STYLE */
        )) : ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
          key: 1,
          name: _ctx.minusIcon,
          size: _ctx.actionSize * 0.7,
          color: _ctx.actionColor
        }, null, 8, ["name", "size", "color"]))
      ],
      6
      /* CLASS, STYLE */
    ),
    (0, import_vue2.withDirectives)((0, import_vue2.createElementVNode)("input", {
      class: "fan-input-num__field",
      style: (0, import_vue2.normalizeStyle)(_ctx.theInputStyle),
      controlled: "",
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.innerValue = $event),
      type: _ctx.inputType.type,
      inputmode: _ctx.inputType.mode,
      onInput: _cache[2] || (_cache[2] = (...args) => _ctx.onInput && _ctx.onInput(...args))
    }, null, 44, _hoisted_2), [
      [import_vue2.vModelDynamic, _ctx.innerValue]
    ]),
    (0, import_vue2.createElementVNode)(
      "button",
      {
        class: (0, import_vue2.normalizeClass)(["fan-flex fan-align-center fan-justify-center fan-input-num__action", { "fan-input-num--disabled": _ctx.plusDisabled }]),
        style: (0, import_vue2.normalizeStyle)(_ctx.actionStyle),
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.plus && _ctx.plus(...args))
      },
      [
        !_ctx.plusIcon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
          import_vue2.Fragment,
          { key: 0 },
          [
            (0, import_vue2.createElementVNode)(
              "div",
              {
                class: "fan-input-num__hl",
                style: (0, import_vue2.normalizeStyle)({ backgroundColor: _ctx.actionColor })
              },
              null,
              4
              /* STYLE */
            ),
            (0, import_vue2.createElementVNode)(
              "div",
              {
                class: "fan-input-num__vl",
                style: (0, import_vue2.normalizeStyle)({ backgroundColor: _ctx.actionColor })
              },
              null,
              4
              /* STYLE */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        )) : ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
          key: 1,
          name: _ctx.plusIcon,
          size: _ctx.actionSize * 0.7,
          color: _ctx.actionColor
        }, null, 8, ["name", "size", "color"]))
      ],
      6
      /* CLASS, STYLE */
    )
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
