import "./tab-panel-sfc.css";
import {
  defineComponent,
  inject,
  getCurrentInstance,
  onMounted,
  ref,
  computed
} from "vue";
import { createNamespace, createUniqueId } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("TabPanel")[0],
  setup() {
    const uniqueId = createUniqueId({ prefix: "fanTabPanel" });
    const _this = getCurrentInstance();
    const tabsContent = inject("fanTabsContent");
    const tabsActiveId = inject("fanTabsContentActiveId", ref(0));
    const active = computed(() => tabsActiveId.value === uniqueId);
    onMounted(() => {
      tabsContent && tabsContent.add(_this);
    });
    const theStyle = computed(() => {
      if (!(tabsContent == null ? void 0 : tabsContent.width.value))
        return "";
      return `width:${tabsContent.width.value}px;`;
    });
    return { uniqueId, active, theStyle };
  }
});
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      style: _normalizeStyle(_ctx.theStyle),
      class: _normalizeClass(["fan-tab-panel", { "fan-tab-panel--active": _ctx.active }])
    },
    [
      _renderSlot(_ctx.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
