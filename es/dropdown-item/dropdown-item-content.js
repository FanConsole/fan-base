import { defineComponent } from "vue";
import { createNamespace } from "../utils";
import ScrollView from "../scroll-view/scroll-view.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("DropdownItemContent")[0],
  components: { ScrollView },
  props: {
    scroll: {
      type: Boolean,
      default: false
    },
    scrollHeight: {
      type: [String, Boolean],
      default: "61.8vh"
    }
  }
});
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock } from "vue";
function __vue_render__(_ctx, _cache) {
  const _component_ScrollView = _resolveComponent("ScrollView");
  return _ctx.scroll ? (_openBlock(), _createBlock(_component_ScrollView, {
    key: 0,
    height: _ctx.scrollHeight,
    "scroll-y": true
  }, {
    default: _withCtx(() => [
      _renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["height"])) : _renderSlot(_ctx.$slots, "default", { key: 1 });
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
