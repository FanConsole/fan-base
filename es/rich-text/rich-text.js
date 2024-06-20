import "./rich-text-sfc.css";
import { computed, defineComponent } from "vue";
import { createNamespace } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("RichText")[0],
  props: {
    // html 字符串
    content: String
  },
  setup(props) {
    const isHtml = computed(() => {
      const reg = /<[^>]+>/g;
      return reg.test(props.content || "");
    });
    return { isHtml };
  }
});
import { normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = ["innerHTML"];
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["fan-rich-text", { pre: !_ctx.isHtml }]),
    innerHTML: _ctx.content
  }, null, 10, _hoisted_1);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
