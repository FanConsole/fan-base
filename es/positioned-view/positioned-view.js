var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import "./positioned-view-sfc.css";
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch
} from "vue";
import {
  createNamespace,
  createUniqueId,
  getElementBounding,
  transformSize
} from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("PositionedView")[0],
  props: {
    /**
     * 文档定位方式，同 css 的 position
     */
    type: {
      type: String,
      default: "fixed",
      validator(value) {
        return ["fixed", "absolute", "relative", "static"].includes(value);
      }
    },
    /**
     * 位置的快捷选项，仅在top、bottom、left、right未设置时生效
     */
    position: {
      type: String,
      validator: (value) => ["bottom", "top"].includes(value)
    },
    zIndex: {
      type: [Number, String],
      default: 99
    },
    top: [String, Number],
    bottom: [String, Number],
    left: [String, Number],
    right: [String, Number],
    bg: String,
    // 底部安全区域
    safeBottom: {
      type: Boolean,
      default: void 0
    },
    /**
     * 是否在文档流中标签位置生成一个等高的占位元素
     */
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  expose: ["calcHeight", "height"],
  setup(props) {
    const uniqueId = createUniqueId({ prefix: "fanPositionedView" });
    const height = ref(0);
    const theStyle = computed(() => {
      const { type, left, right, top, bottom, zIndex, position, bg } = props;
      let s = `position:${type};z-index:${zIndex};`;
      if (!left && !right && !top && !bottom) {
        if (position === "bottom")
          s += `bottom:0;left:0;right:0;`;
        if (position === "top")
          s += `top:0;left:0;right:0;`;
      } else {
        left && (s += `left:${transformSize(left)};`);
        right && (s += `right:${transformSize(right)};`);
        top && (s += `top:${transformSize(top)};`);
        bottom && (s += `bottom:${transformSize(bottom)};`);
      }
      bg && (s += `background:${bg};`);
      return s;
    });
    const useSafeBottom = computed(() => {
      const { position, safeBottom } = props;
      if (safeBottom === false)
        return false;
      return safeBottom || position === "bottom";
    });
    const _this = getCurrentInstance();
    const calcHeight = () => __async(this, null, function* () {
      if (!props.placeholder) {
        height.value = 0;
        return;
      }
      const rect = yield getElementBounding({
        selector: "#" + uniqueId,
        scope: _this
      });
      height.value = (rect == null ? void 0 : rect.height) || 0;
    });
    onMounted(() => {
      setTimeout(calcHeight, 0);
    });
    watch(() => props.placeholder, calcHeight);
    return { uniqueId, height, theStyle, useSafeBottom, calcHeight };
  }
});
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue";
const _hoisted_1 = { class: "fan-positioned-view" };
const _hoisted_2 = ["id"];
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", {
      id: _ctx.uniqueId,
      class: _normalizeClass(["fan-positioned-view__in", { "fan-positioned-view--safe": _ctx.useSafeBottom }]),
      style: _normalizeStyle(_ctx.theStyle)
    }, [
      _renderSlot(_ctx.$slots, "default")
    ], 14, _hoisted_2),
    _ctx.height ? (_openBlock(), _createElementBlock(
      "div",
      {
        key: 0,
        class: "fan-positioned-view__place",
        style: _normalizeStyle({ height: _ctx.height + "px" })
      },
      null,
      4
      /* STYLE */
    )) : _createCommentVNode("v-if", true)
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
