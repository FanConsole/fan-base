var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
import "./tabs-sfc.css";
import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch
} from "vue";
import FanScrollView from "../scroll-view/scroll-view.js";
import {
  createNamespace,
  transformSize,
  transformStyleSize,
  getElementBounding,
  createUniqueId
} from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Tabs")[0],
  props: {
    /**
     * 数据
     */
    tabs: Array,
    /**
     * 绑定当前选中标签的标识符，可以结合 valueProp 设置成 tabs-item 中指定字段
     * @default tabs-index
     */
    active: {
      type: [Number, String],
      default: 0
    },
    /**
     * tab-title 取值，默认直接 tabs-item
     */
    labelProp: String,
    /**
     * label/标题左右padding
     */
    labelPad: {
      type: [Number, String],
      default: 12
    },
    /**
     * 两侧padding，默认 labelPad / 2
     */
    sidePad: [String, Number],
    /**
     * active 的值的来源
     */
    valueProp: String,
    /**
     * 滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动
     */
    scrollThreshold: {
      type: Number,
      default: 4
    },
    // 中心偏移，单位 px，当其值在 0 < x < 1 时为容器盒子宽度的占比，可以为负数
    offCentering: {
      type: Number,
      default: 0
    },
    /**
     * 是否开启左侧收缩布局
     */
    shrink: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: 40
    },
    bg: {
      type: String,
      default: "white"
    },
    color: {
      type: String
    },
    activeColor: {
      type: String
    },
    /**
     * 选中时是否加粗放大
     */
    activeStrong: {
      type: [Boolean, String],
      default: false
    },
    activeStyle: [String, Object],
    fontSize: {
      type: [String, Number]
    },
    /**
     * 选中内容是否可以超出盒子
     */
    activeOut: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示指示器
     */
    indicator: {
      type: [Boolean, String],
      default: true
    },
    indicatorHeight: {
      type: [String, Number],
      default: 2
    },
    indicatorWidth: {
      type: [String, Number],
      default: "auto"
    },
    indicatorLeft: {
      type: Number,
      default: 0
    },
    indicatorColor: String,
    indicatorStyle: [String, Object],
    /**
     * 是否显示边框，true = 'bottom'，设置为 false 则不显示
     */
    border: {
      type: [Boolean, String],
      default: true,
      validator: (value) => [true, false, "bottom", "top", "vertical"].includes(value)
    }
  },
  components: { FanScrollView },
  emits: ["update:active", "change", "click"],
  setup(props, context) {
    const uniqueId = createUniqueId({ prefix: "fanTabs" });
    const items = computed(() => {
      return (props.tabs || []).map((a, i) => {
        return __spreadProps(__spreadValues({}, typeof a === "object" ? a : null), {
          label: !props.labelProp ? a : a[props.labelProp],
          value: !props.valueProp ? i : a[props.valueProp]
        });
      });
    });
    const itemRects = ref([]);
    const scrollWidth = ref(320);
    const _this = getCurrentInstance();
    const getRects = () => __async(this, null, function* () {
      if (items.value.length) {
        itemRects.value = yield getElementBounding({
          selector: ".fan2-tab__in",
          selectAll: true,
          scope: _this
        });
      } else if (itemRects.value.length)
        itemRects.value = [];
      const scrollRect = yield getElementBounding({
        selector: "#" + uniqueId,
        scope: _this
      });
      if (scrollRect == null ? void 0 : scrollRect.width)
        scrollWidth.value = scrollRect.width + (scrollRect.left || 0) * 2;
    });
    const activeIndex = computed(() => {
      const i = items.value.findIndex((a) => a.value === props.active);
      return i !== -1 ? i : 0;
    });
    const theStyle = computed(() => {
      const { height, bg, color, fontSize, activeColor, labelPad, sidePad } = props;
      const tabPad = transformSize(labelPad);
      const sPad = !sidePad ? `calc(${tabPad} / 2)` : transformSize(sidePad);
      let s = `--fan2-tabs-height:${transformSize(
        height
      )};--fan2-tab-pad:${tabPad};--fan2-tabs-side-pad:${sPad};`;
      if (color)
        s += `--fan2-tabs-color:${color};`;
      if (activeColor)
        s += `--fan2-tabs-active-color:${activeColor};`;
      if (bg)
        s += `background:${bg};`;
      if (fontSize)
        s += `font-size:${transformSize(fontSize)};`;
      return s;
    });
    const theActiveStyle = computed(
      () => transformStyleSize(props.activeStyle)
    );
    const zsqStyle = computed(() => {
      const {
        indicator,
        indicatorHeight,
        indicatorWidth,
        indicatorColor,
        indicatorStyle,
        activeStrong,
        indicatorLeft
      } = props;
      if (!indicator)
        return "";
      let s = "";
      const tab = itemRects.value[activeIndex.value];
      const { left = 6, width = 52 } = tab || {};
      s += `transform:translateX(${left + width / 2 - indicatorLeft}px) translateX(calc(-50%));`;
      if (indicatorWidth) {
        if (indicatorWidth === "auto")
          s += `width:calc((${width}px - var(--fan2-tab-pad) * 2) * ${activeStrong ? 1.13 : 1});`;
        else
          s += `width:calc(${transformSize(indicatorWidth)} * ${activeStrong ? 1.13 : 1});`;
      }
      if (indicatorHeight) {
        const h = transformSize(indicatorHeight);
        s += `height:${h};top:calc(var(--fan2-tabs-height) - ${h});`;
      }
      if (indicatorColor)
        s += `background-color:${indicatorColor};`;
      return transformStyleSize(indicatorStyle) + s;
    });
    const borderTop = computed(() => {
      return ["top", "vertical"].includes(props.border);
    });
    const borderBottom = computed(() => {
      return [true, "bottom", "vertical"].includes(props.border);
    });
    const scrollable = computed(() => {
      const length = items.value.length;
      const over = length > props.scrollThreshold;
      if (length !== itemRects.value.length)
        return over;
      const width = itemRects.value.reduce((sum, item) => {
        return sum + item.width;
      }, 0);
      return over && width > scrollWidth.value;
    });
    const scrollLeft = ref(0);
    const scrollToItem = (index) => {
      var _a;
      if (!scrollable.value)
        return;
      const tab = itemRects.value[index];
      if (!tab)
        return;
      let padding = ((_a = itemRects.value[0]) == null ? void 0 : _a.left) || 0;
      padding = 0;
      const offset = Math.abs(props.offCentering) < 1 ? scrollWidth.value * props.offCentering : props.offCentering;
      scrollLeft.value = tab.left - padding + tab.width / 2 - scrollWidth.value / 2 - offset;
    };
    watch(activeIndex, (val) => {
      scrollToItem(val);
    });
    const itemClick = (index) => {
      const item = items.value[index];
      context.emit("click", props.tabs[index], index);
      if (item.value !== props.active) {
        context.emit("update:active", item.value);
        context.emit("change", props.tabs[index], index);
      }
    };
    onMounted(() => getRects());
    watch([items, scrollable], () => {
      nextTick(getRects);
    });
    return {
      uniqueId,
      items,
      scrollable,
      scrollLeft,
      theStyle,
      theActiveStyle,
      zsqStyle,
      borderTop,
      borderBottom,
      itemClick
    };
  }
});
import { createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, resolveComponent as _resolveComponent, withCtx as _withCtx, createVNode as _createVNode } from "vue";
const _hoisted_1 = ["id"];
const _hoisted_2 = /* @__PURE__ */ _createElementVNode(
  "div",
  { class: "fan2-tab__pad" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "fan2-tab__in" };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = /* @__PURE__ */ _createElementVNode(
  "div",
  { class: "fan2-tab__pad" },
  null,
  -1
  /* HOISTED */
);
function __vue_render__(_ctx, _cache) {
  const _component_FanScrollView = _resolveComponent("FanScrollView");
  return _openBlock(), _createElementBlock("div", {
    id: _ctx.uniqueId,
    style: _normalizeStyle(_ctx.theStyle),
    class: _normalizeClass(["fan2-tabs", {
      "fan-hairline--top": _ctx.borderTop,
      "fan-hairline--bottom": _ctx.borderBottom,
      "fan2-tabs--flex": !_ctx.scrollable && !_ctx.shrink,
      "fan2-tabs--out": _ctx.activeOut
    }])
  }, [
    _createVNode(_component_FanScrollView, {
      style: _normalizeStyle([{ "position": "relative" }, _ctx.activeOut ? { overflow: "visible" } : ""]),
      height: "calc(100% + 17px)",
      "scroll-x": true,
      "scroll-y": _ctx.activeOut,
      "scroll-left": _ctx.scrollLeft,
      "enable-flex": !_ctx.scrollable,
      scrollable: _ctx.scrollable,
      scrollWithAnimation: true
    }, {
      default: _withCtx(() => [
        _hoisted_2,
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(_ctx.items, (item, index) => {
            return _openBlock(), _createElementBlock("div", {
              key: index,
              style: _normalizeStyle(item.value === _ctx.active ? _ctx.theActiveStyle : ""),
              class: _normalizeClass(["fan2-tab", {
                "fan2-tab--active": item.value === _ctx.active,
                "fan2-tab--strong": _ctx.activeStrong,
                "fan2-tab--out": _ctx.activeOut
              }]),
              onClick: ($event) => _ctx.itemClick(index)
            }, [
              _createElementVNode("div", _hoisted_4, [
                !_ctx.$slots.default ? (_openBlock(), _createElementBlock(
                  "span",
                  _hoisted_5,
                  _toDisplayString(item.label),
                  1
                  /* TEXT */
                )) : _renderSlot(_ctx.$slots, "default", {
                  key: 1,
                  item,
                  index,
                  active: item.value === _ctx.active
                })
              ])
            ], 14, _hoisted_3);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        _hoisted_6,
        _createElementVNode(
          "div",
          {
            style: _normalizeStyle(_ctx.zsqStyle),
            class: "fan2-tabs__indicator"
          },
          null,
          4
          /* STYLE */
        )
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["scroll-y", "scroll-left", "enable-flex", "scrollable", "style"])
  ], 14, _hoisted_1);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
