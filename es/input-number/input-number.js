import "./input-number-sfc.css";
import { defineComponent, ref, computed, watch } from "vue";
import FanIcon from "../icon/icon.js";
import { createNamespace, transformSize, transformStyleSize } from "../utils";
import { getInputType } from "./helper";
const __vue_sfc__ = defineComponent({
  name: createNamespace("InputNumber")[0],
  components: { FanIcon },
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
    const innerValue = ref(1);
    const inputType = computed(() => getInputType(props.integer));
    const actionStyle = computed(() => {
      const size = transformSize(props.actionSize);
      return `width:${size};height:${size};`;
    });
    const theInputStyle = computed(() => {
      const size = transformSize(props.actionSize);
      const width = transformSize(props.inputWidth);
      return `width:${width};height:${size};line-height:${size};${transformStyleSize(
        props.inputStyle
      )}`;
    });
    const minusDisabled = computed(() => innerValue.value <= props.min);
    const plusDisabled = computed(
      () => props.max && innerValue.value >= props.max
    );
    watch(
      () => props.modelValue,
      (val) => {
        if ((val || val === 0) && val !== innerValue.value)
          innerValue.value = val;
      },
      { immediate: true }
    );
    watch(innerValue, (val) => {
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
import { normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveComponent as _resolveComponent, createBlock as _createBlock, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, vModelDynamic as _vModelDynamic, withDirectives as _withDirectives, Fragment as _Fragment } from "vue";
const _hoisted_1 = { class: "fan-input-num" };
const _hoisted_2 = ["type", "inputmode"];
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = _resolveComponent("FanIcon");
  return _openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode(
      "button",
      {
        class: _normalizeClass(["fan-flex fan-align-center fan-justify-center fan-input-num__action", { "fan-input-num--disabled": _ctx.minusDisabled }]),
        style: _normalizeStyle(_ctx.actionStyle),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.minus && _ctx.minus(...args))
      },
      [
        !_ctx.minusIcon ? (_openBlock(), _createElementBlock(
          "div",
          {
            key: 0,
            class: "fan-input-num__hl",
            style: _normalizeStyle({ backgroundColor: _ctx.actionColor })
          },
          null,
          4
          /* STYLE */
        )) : (_openBlock(), _createBlock(_component_FanIcon, {
          key: 1,
          name: _ctx.minusIcon,
          size: _ctx.actionSize * 0.7,
          color: _ctx.actionColor
        }, null, 8, ["name", "size", "color"]))
      ],
      6
      /* CLASS, STYLE */
    ),
    _withDirectives(_createElementVNode("input", {
      class: "fan-input-num__field",
      style: _normalizeStyle(_ctx.theInputStyle),
      controlled: "",
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.innerValue = $event),
      type: _ctx.inputType.type,
      inputmode: _ctx.inputType.mode,
      onInput: _cache[2] || (_cache[2] = (...args) => _ctx.onInput && _ctx.onInput(...args))
    }, null, 44, _hoisted_2), [
      [_vModelDynamic, _ctx.innerValue]
    ]),
    _createElementVNode(
      "button",
      {
        class: _normalizeClass(["fan-flex fan-align-center fan-justify-center fan-input-num__action", { "fan-input-num--disabled": _ctx.plusDisabled }]),
        style: _normalizeStyle(_ctx.actionStyle),
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.plus && _ctx.plus(...args))
      },
      [
        !_ctx.plusIcon ? (_openBlock(), _createElementBlock(
          _Fragment,
          { key: 0 },
          [
            _createElementVNode(
              "div",
              {
                class: "fan-input-num__hl",
                style: _normalizeStyle({ backgroundColor: _ctx.actionColor })
              },
              null,
              4
              /* STYLE */
            ),
            _createElementVNode(
              "div",
              {
                class: "fan-input-num__vl",
                style: _normalizeStyle({ backgroundColor: _ctx.actionColor })
              },
              null,
              4
              /* STYLE */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        )) : (_openBlock(), _createBlock(_component_FanIcon, {
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
export {
  stdin_default as default
};
