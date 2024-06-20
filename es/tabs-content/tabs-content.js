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
import "./tabs-content-sfc.css";
import {
  computed,
  defineComponent,
  ref,
  watch,
  reactive,
  provide,
  getCurrentInstance,
  onMounted
} from "vue";
import {
  createNamespace,
  getChildrenComponents,
  getElementBounding,
  getSystemInfo
} from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("TabsContent")[0],
  props: {
    active: {
      type: Number,
      default: 0
    },
    swipeable: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:active", "change"],
  setup(props, context) {
    const tabIndex = ref(0);
    const width = ref(0);
    const state = reactive({
      touchMovedX: 0,
      animation: true
    });
    watch(
      () => props.active,
      (val) => {
        if (val === tabIndex.value)
          return;
        tabIndex.value = val;
      },
      { immediate: true }
    );
    watch(tabIndex, (val) => {
      if (props.active === val)
        return;
      context.emit("update:active", val);
      context.emit("change", val);
    });
    const _this = getCurrentInstance();
    const children = reactive([]);
    const sortChildren = () => {
      const _children = getChildrenComponents(_this, "FanTabPanel");
      children.sort((a, b) => {
        let aIndex = -1;
        let bIndex = -1;
        for (let i = 0, l = _children.length; i < l; i++) {
          const { uniqueId } = _children[i];
          if (uniqueId === a.proxy.uniqueId)
            aIndex = i;
          if (uniqueId === b.proxy.uniqueId)
            bIndex = i;
          if (aIndex !== -1 && bIndex !== -1)
            break;
        }
        return aIndex - bIndex;
      });
    };
    const add = (vm) => {
      const _i = children.findIndex((a) => a === vm);
      _i === -1 ? children.push(vm) : children.splice(_i, 1, vm);
      sortChildren();
    };
    const activeId = computed(() => {
      var _a;
      return (_a = children[tabIndex.value]) == null ? void 0 : _a.proxy.uniqueId;
    });
    provide("fanTabsContent", { add, width });
    provide("fanTabsContentActiveId", activeId);
    const wrapStyle = computed(() => {
      const x = state.touchMovedX;
      const i = tabIndex.value;
      let s = `transition-duration:${state.animation ? "300ms" : "0ms"};`;
      if (width.value) {
        s += `transform:translate3d(${-width.value * i + x}px,0,0);width:${width.value * children.length}px;`;
      } else {
        s += `transform:translate3d(calc(-${100 * i}% + ${x}px),0,0);`;
      }
      return s;
    });
    onMounted(() => __async(this, null, function* () {
      const rect = yield getElementBounding({
        selector: ".fan-tabs-content",
        scope: _this
      });
      if (rect == null ? void 0 : rect.width)
        width.value = Math.min(rect.width, getSystemInfo().windowWidth);
    }));
    const getMoved = (p1, p2) => {
      const x = p2.clientX - p1.clientX;
      const y = p2.clientY - p1.clientY;
      return { x, y };
    };
    let $p1;
    let $p2;
    let $p1T;
    let $direction;
    const touchStart = (e) => {
      if (!props.swipeable)
        return;
      $p1 = null;
      if (e.touches) {
        $p1 = e.touches[0];
        $p1T = Date.now();
      }
    };
    const touchMove = (e) => {
      if (!props.swipeable)
        return;
      if (e.touches && $p1) {
        $p2 = e.touches[0];
        const { x, y } = getMoved($p1, $p2);
        if (!$direction) {
          $direction = Math.abs(x) > Math.abs(y) ? "horizontal" : "vertical";
        }
        if ($direction === "horizontal") {
          e.preventDefault();
          state.touchMovedX = x;
          state.animation = false;
        }
      }
    };
    const touchEnd = (e) => {
      if (!props.swipeable)
        return;
      if (e.touches && $p1 && $direction === "horizontal") {
        let { x } = getMoved($p1, e.touches[0] || $p2);
        const absX = Math.abs(x);
        if (absX > 150 || absX > 50 && Date.now() - $p1T < 500) {
          let i = x > 0 ? tabIndex.value - 1 : tabIndex.value + 1;
          i = Math.max(0, Math.min(children.length - 1, i));
          if (i !== tabIndex.value)
            tabIndex.value = i;
        } else {
          x = 0;
        }
      }
      state.touchMovedX = 0;
      state.animation = true;
      $direction = null;
      $p1 = null;
    };
    const touchCancel = () => {
      if (!props.swipeable)
        return;
      state.animation = true;
      state.touchMovedX = 0;
      $direction = null;
      $p1 = null;
    };
    return { wrapStyle, touchStart, touchMove, touchEnd, touchCancel };
  }
});
import { renderSlot as _renderSlot, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = { class: "fan-tabs-content" };
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode(
      "div",
      {
        style: _normalizeStyle(_ctx.wrapStyle),
        class: "fan-tabs-content__in",
        onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.touchStart && _ctx.touchStart(...args)),
        onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.touchMove && _ctx.touchMove(...args)),
        onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx.touchEnd && _ctx.touchEnd(...args)),
        onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx.touchCancel && _ctx.touchCancel(...args))
      },
      [
        _renderSlot(_ctx.$slots, "default")
      ],
      36
      /* STYLE, NEED_HYDRATION */
    )
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
