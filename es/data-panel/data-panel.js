import "./data-panel-sfc.css";
import { defineComponent, computed } from "vue";
import { createNamespace } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("DataPanel")[0],
  props: {
    // [{ label, value }, ...]
    data: Array,
    column: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const colClass = computed(() => {
      const { column, data } = props;
      if (!data)
        return "";
      if (!column) {
        const l = data.length;
        if (l < 4)
          return "col" + l;
        return "col" + (l % 3 === 0 || l % 3 === 2 ? 3 : 2);
      }
      return "col" + column;
    });
    return { colClass };
  }
});
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, createCommentVNode as _createCommentVNode } from "vue";
const _hoisted_1 = { class: "fan-flex fan-data-panel__in" };
const _hoisted_2 = { class: "fan-data-panel__val" };
const _hoisted_3 = { class: "fan-data-panel__t" };
function __vue_render__(_ctx, _cache) {
  return _ctx.data && _ctx.data.length ? (_openBlock(), _createElementBlock(
    "div",
    {
      key: 0,
      class: _normalizeClass(["fan-data-panel", _ctx.colClass])
    },
    [
      _createElementVNode("div", _hoisted_1, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(_ctx.data, (item, index) => {
            return _openBlock(), _createElementBlock("div", {
              key: index,
              class: "fan-flex-col fan-justify-center fan-align-center fan-data-panel__item"
            }, [
              _createElementVNode(
                "div",
                _hoisted_2,
                _toDisplayString(item.value),
                1
                /* TEXT */
              ),
              _createElementVNode(
                "div",
                _hoisted_3,
                _toDisplayString(item.label),
                1
                /* TEXT */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ],
    2
    /* CLASS */
  )) : _createCommentVNode("v-if", true);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
