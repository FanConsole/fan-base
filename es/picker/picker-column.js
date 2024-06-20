import "./picker-column-sfc.css";
import { defineComponent, ref, watch, computed } from "vue";
import { transformStyleSize } from "../utils";
const __vue_sfc__ = defineComponent({
  props: {
    items: Array,
    value: Array,
    index: Number
  },
  emits: ["selectItem"],
  setup(props, { emit }) {
    const currentOffset = ref(110);
    const selectVal = ref();
    let start = 0;
    let newOffset = currentOffset.value;
    const colStyle = computed(() => {
      const s = `transform: translate3d(0, ${currentOffset.value}px, 0)`;
      return transformStyleSize(s);
    });
    const onTouchstart = (e) => {
      selectVal.value = null;
      start = e.touches[0].screenY;
      newOffset = currentOffset.value;
    };
    const onTouchmove = (e) => {
      if (!props.items.find((item) => !item.disabled))
        return;
      const y = e.touches[0].screenY;
      if (y > start) {
        currentOffset.value = newOffset + (y - start);
      } else {
        currentOffset.value = newOffset - (start - y);
      }
    };
    const onTouchEnd = (items) => {
      var _a;
      if (!(items == null ? void 0 : items.find((item) => !item.disabled)))
        return;
      let i = Number(
        String(Math.floor(currentOffset.value / 44) - 2).replace(/\-/g, "")
      );
      if (typeof selectVal.value === "number")
        i = selectVal.value;
      if (i > props.items.length - 1) {
        i = props.items.length - 1;
      } else if (currentOffset.value > 110) {
        currentOffset.value = 110;
        i = 0;
      }
      if (items && ((_a = items[i]) == null ? void 0 : _a.disabled)) {
        selectVal.value = i += 1;
        if (selectVal.value >= items.length)
          selectVal.value -= 2;
        onTouchEnd(items);
        return;
      }
      currentOffset.value = 110 - i * 44;
      emit("selectItem", { level: props.index, select: i });
    };
    watch(
      () => props.value,
      (val, oldVal) => {
        if (val && selectVal.value != val[props.index]) {
          selectVal.value = val[props.index];
          onTouchEnd(props.items);
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
    return {
      currentOffset,
      colStyle,
      onTouchstart,
      onTouchmove,
      onTouchEnd
    };
  }
});
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = { class: "fan-ellipsis" };
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: "fan-picker__box",
      onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.onTouchstart && _ctx.onTouchstart(...args)),
      onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.onTouchmove && _ctx.onTouchmove(...args)),
      onTouchend: _cache[2] || (_cache[2] = ($event) => _ctx.onTouchEnd(_ctx.items)),
      onTouchcancel: _cache[3] || (_cache[3] = ($event) => _ctx.onTouchEnd(_ctx.items))
    },
    [
      _createElementVNode(
        "div",
        {
          class: "fan-picker__l",
          style: _normalizeStyle(_ctx.colStyle)
        },
        [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(_ctx.items, (item, i) => {
              return _openBlock(), _createElementBlock(
                "div",
                {
                  key: i,
                  class: _normalizeClass(["fan-flex-center fan-picker__txt", { "fan-picker__d": item.disabled }])
                },
                [
                  _createElementVNode(
                    "div",
                    _hoisted_1,
                    _toDisplayString(item.text),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        4
        /* STYLE */
      )
    ],
    32
    /* NEED_HYDRATION */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
