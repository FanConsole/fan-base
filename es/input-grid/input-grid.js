import "./input-grid-sfc.css";
import { defineComponent, computed, watch, ref } from "vue";
import { createNamespace } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("InputGrid")[0],
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
    const innerValue = ref("");
    const focus = ref(false);
    const domRef = ref(null);
    const renderValues = computed(() => {
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
    const theStyle = computed(() => {
      return `--fan-grid-cursor-color:${props.cursorColor};`;
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== innerValue.value)
          innerValue.value = val;
      },
      { immediate: true }
    );
    watch(
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
import { createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["type", "value", "focus", "autofocus"];
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: "fan-grid-input",
      style: _normalizeStyle(_ctx.theStyle)
    },
    [
      _createElementVNode("input", {
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
      _createElementVNode("div", {
        class: "fan-flex",
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.boxClick && _ctx.boxClick(...args))
      }, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(_ctx.renderValues.chars, (char, index) => {
            return _openBlock(), _createElementBlock(
              "div",
              {
                key: index,
                class: _normalizeClass(["fan-grid-input__box", { cursor: _ctx.focus && index === _ctx.renderValues.index }]),
                style: _normalizeStyle(_ctx.gridStyle)
              },
              _toDisplayString(char),
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
export {
  stdin_default as default
};
