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
import "./dropdown-menu-sfc.css";
import { defineComponent, getCurrentInstance, ref, computed, watch } from "vue";
import { createNamespace, getElementBounding, transformSize } from "../utils";
import { useChildren } from "./helper";
import { usePageLifecycle } from "../hooks";
import FanIcon from "../icon/icon.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("DropdownMenu")[0],
  components: { FanIcon },
  props: {
    border: Boolean,
    offset: {
      type: [Number, Object],
      default: null
    },
    zIndex: Number,
    height: [String, Number],
    color: String,
    activeColor: String
  },
  emits: ["toggle"],
  setup(props, { emit }) {
    const _this = getCurrentInstance();
    const innerOffset = ref(0);
    const barStyle = computed(() => {
      const { height, color } = props;
      let s = "";
      if (color)
        s += `color:${color};`;
      if (height)
        s += `height:${transformSize(height)};`;
      return s;
    });
    const containerStyle = computed(() => {
      const { activeColor, zIndex } = props;
      let s = "";
      if (activeColor)
        s += `--fan-dropdown-active-color:${activeColor};`;
      if (zIndex)
        s += `--fan-dropdown-menu-zindex:${zIndex};`;
      return s;
    });
    const { children, linkChildren } = useChildren("fanDropdownMenu");
    const opened = computed(
      () => children.some((item) => {
        var _a;
        return (_a = item.state) == null ? void 0 : _a.showWrapper;
      })
    );
    let bodyOverflow = "";
    watch(opened, (val) => {
      const bodyStyle = document.body.style;
      if (val) {
        bodyOverflow = bodyStyle.overflow;
        bodyStyle.setProperty("overflow", "hidden", "important");
      } else {
        bodyStyle.setProperty("overflow", bodyOverflow);
      }
      emit("toggle", { opened: val });
    });
    linkChildren({ props, offset: innerOffset });
    const { pageScrollTo, onPageScroll } = usePageLifecycle();
    let scrollTop = 0;
    onPageScroll((e) => {
      scrollTop = e.scrollTop;
    });
    const itemClick = (i) => __async(this, null, function* () {
      const item = children[i];
      const _opened = opened.value;
      if (!item.state.showWrapper && _opened) {
        children.forEach((a) => a.toggle(false));
      }
      const rect = yield getElementBounding({
        selector: ".fan-dropdown-menu__bar",
        scope: _this
      });
      if (props.offset === null) {
        innerOffset.value = (rect == null ? void 0 : rect.bottom) || 0;
      } else {
        pageScrollTo({
          scrollTop: scrollTop + ((rect == null ? void 0 : rect.top) || 0) - props.offset,
          duration: 0
        });
        innerOffset.value = (props.offset || 0) + ((rect == null ? void 0 : rect.height) || 0);
      }
      item.toggle(void 0, { immediateBg: _opened });
    });
    const emptyFunc = () => null;
    return { barStyle, containerStyle, children, opened, itemClick, emptyFunc };
  }
});
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createBlock as _createBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, withModifiers as _withModifiers, normalizeStyle as _normalizeStyle, renderSlot as _renderSlot } from "vue";
const _hoisted_1 = ["onClick"];
const _hoisted_2 = { class: "fan-ellipsis" };
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = _resolveComponent("FanIcon");
  return _openBlock(), _createElementBlock(
    "div",
    {
      style: _normalizeStyle(_ctx.containerStyle),
      class: "fan-dropdown-menu"
    },
    [
      _createElementVNode(
        "div",
        {
          style: _normalizeStyle(_ctx.barStyle),
          class: _normalizeClass(["fan-dropdown-menu__bar", {
            "fan-hairline--bottom": _ctx.border,
            "fan-dropdown-menu__bar--opened": _ctx.opened
          }]),
          onTouchmove: _cache[0] || (_cache[0] = _withModifiers((...args) => _ctx.emptyFunc && _ctx.emptyFunc(...args), ["stop", "prevent"]))
        },
        [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(_ctx.children, (item, index) => {
              return _openBlock(), _createElementBlock("div", {
                key: index,
                class: _normalizeClass(["fan-dropdown-menu__item", {
                  "fan-dropdown-menu--active": item.active || item.state.showWrapper
                }]),
                onClick: ($event) => _ctx.itemClick(index)
              }, [
                _createElementVNode(
                  "div",
                  _hoisted_2,
                  _toDisplayString(item.title),
                  1
                  /* TEXT */
                ),
                item.theIcon.name ? (_openBlock(), _createBlock(_component_FanIcon, {
                  key: 0,
                  name: item.theIcon.name,
                  size: item.iconSize,
                  color: item.theIcon.color,
                  "custom-style": "margin:1px 0 0 3px;"
                }, null, 8, ["name", "size", "color"])) : _createCommentVNode("v-if", true)
              ], 10, _hoisted_1);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      ),
      _renderSlot(_ctx.$slots, "default")
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
