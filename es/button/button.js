import "./button-sfc.css";
import { defineComponent, computed } from "vue";
import {
  createNamespace,
  transformSize,
  transformStyleSize,
  isCssRelativeSize
} from "../utils";
import FanLoading from "../loading/loading.js";
import FanIcon from "../icon/icon.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Button")[0],
  components: {
    FanLoading,
    FanIcon
  },
  emits: ["click"],
  props: {
    color: String,
    background: String,
    // 将废弃⚠️
    bg: String,
    width: String,
    height: String,
    margin: String,
    padding: String,
    flex1: {
      type: Boolean,
      default: false
    },
    textSize: {
      type: [String, Number]
    },
    textColor: String,
    bold: [Boolean, Number, String],
    /**
     * 图标或图片链接，同 Icon 组件的 name属性
     */
    icon: String,
    /**
     * 图标/loading的大小
     * @default textSize
     */
    iconSize: [String, Number],
    iconPosition: {
      type: String,
      validator: (value) => ["left", "right"].includes(value),
      default: "left"
    },
    // 图标与文字的间距
    iconPad: [String, Number],
    /**
     * 是否为块级元素
     */
    block: {
      type: Boolean,
      default: false
    },
    /**
     * 是否为朴素按钮
     */
    plain: {
      type: Boolean,
      default: false
    },
    /**
     * 是否有边框，plain朴素按钮时生效
     */
    border: {
      type: [Boolean, String],
      default: true
    },
    round: {
      type: Boolean,
      default: false
    },
    /**
     * 圆角
     */
    radius: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 是否使用 0.5px 边框
     */
    hairline: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: String,
    // 同 Loading 组件的 type属性
    loadingType: String
  },
  setup(props, context) {
    const theStyle = computed(() => {
      const {
        color,
        bg: _bg,
        background,
        plain,
        textSize,
        textColor,
        bold,
        round,
        radius,
        iconPad
      } = props;
      const obj = {};
      ["width", "height", "padding", "margin"].forEach(
        (k) => props[k] && (obj[k] = props[k])
      );
      const bg = _bg || background || (plain ? "transparent" : color);
      if (bg)
        obj["--fan-btn-bg"] = bg;
      const c = textColor || (plain ? color || "var(--fan-primary-color)" : !color ? "" : "white");
      if (c)
        obj["--fan-btn-text-color"] = c;
      if (!isCssRelativeSize(textSize) && /(Chrome|Safari)/.test(window == null ? void 0 : window.navigator.userAgent)) {
        let zoom = parseFloat(textSize, 10) / 12;
        if (zoom < 1)
          obj["zoom"] = zoom;
      }
      if (textSize)
        obj.fontSize = transformSize(textSize);
      if (iconPad)
        obj["--fan-btn-icon-pad"] = transformSize(iconPad);
      if (typeof bold === "number" || typeof bold === "string" && Number(bold) >= 100) {
        obj.fontWeight = bold;
      }
      if (plain && color)
        obj["--fan-btn-border-color"] = color;
      if (radius || radius === 0)
        obj["--fan-btn-border-radius"] = radius;
      else if (round)
        obj["--fan-btn-border-radius"] = "var(--fan-radius-max)";
      return transformStyleSize(obj);
    });
    const theIconSize = computed(() => {
      return props.iconSize || props.textSize;
    });
    const theIconPosition = computed(() => {
      const { icon, iconPosition, loading } = props;
      if (loading)
        return "left";
      if (!icon)
        return "none";
      return iconPosition;
    });
    const showText = computed(() => {
      const { loading, loadingText } = props;
      return !loading || !loadingText;
    });
    const onClick = (e) => {
      context.emit("click", e);
    };
    return { theStyle, theIconSize, theIconPosition, showText, onClick };
  }
});
import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, withCtx as _withCtx, createBlock as _createBlock, renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["disabled"];
const _hoisted_2 = {
  key: 0,
  class: "fan-btn__hairline"
};
function __vue_render__(_ctx, _cache) {
  const _component_FanLoading = _resolveComponent("FanLoading");
  const _component_FanIcon = _resolveComponent("FanIcon");
  return _openBlock(), _createElementBlock("button", {
    class: _normalizeClass(["fan-btn", {
      "fan-btn--f1": _ctx.flex1,
      "fan-btn--block": _ctx.block,
      "fan-btn--disabled": _ctx.disabled,
      "fan-btn--noborder": !_ctx.border,
      "fan-btn--hairline": _ctx.hairline,
      "fan-btn--plain": _ctx.plain,
      "fan-btn--bold": _ctx.bold
    }]),
    "hover-class": "none",
    style: _normalizeStyle(_ctx.theStyle),
    disabled: _ctx.disabled,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }, [
    _ctx.hairline ? (_openBlock(), _createElementBlock("div", _hoisted_2)) : _createCommentVNode("v-if", true),
    _ctx.loading ? (_openBlock(), _createBlock(_component_FanLoading, {
      key: 1,
      color: "currentColor",
      type: _ctx.loadingType,
      size: _ctx.theIconSize,
      "text-size": _ctx.textSize,
      "text-color": "inherit"
    }, {
      default: _withCtx(() => [
        _createTextVNode(
          _toDisplayString(_ctx.loadingText),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["type", "size", "text-size"])) : _createCommentVNode("v-if", true),
    _ctx.theIconPosition === "left" ? (_openBlock(), _createBlock(_component_FanIcon, {
      key: 2,
      name: _ctx.icon,
      color: "currentColor",
      size: _ctx.theIconSize
    }, null, 8, ["name", "size"])) : _createCommentVNode("v-if", true),
    _ctx.showText ? (_openBlock(), _createElementBlock(
      "div",
      {
        key: 3,
        class: _normalizeClass(["fan-btn__in", [`fan-btn--i${_ctx.theIconPosition}`]])
      },
      [
        _renderSlot(_ctx.$slots, "default")
      ],
      2
      /* CLASS */
    )) : _createCommentVNode("v-if", true),
    _ctx.theIconPosition === "right" ? (_openBlock(), _createBlock(_component_FanIcon, {
      key: 4,
      name: _ctx.icon,
      color: "currentColor",
      size: _ctx.theIconSize
    }, null, 8, ["name", "size"])) : _createCommentVNode("v-if", true)
  ], 14, _hoisted_1);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
