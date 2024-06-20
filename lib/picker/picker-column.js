var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_picker_column_sfc = require("./picker-column-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  props: {
    items: Array,
    value: Array,
    index: Number
  },
  emits: ["selectItem"],
  setup(props, { emit }) {
    const currentOffset = (0, import_vue.ref)(110);
    const selectVal = (0, import_vue.ref)();
    let start = 0;
    let newOffset = currentOffset.value;
    const colStyle = (0, import_vue.computed)(() => {
      const s = `transform: translate3d(0, ${currentOffset.value}px, 0)`;
      return (0, import_utils.transformStyleSize)(s);
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
    (0, import_vue.watch)(
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
const _hoisted_1 = { class: "fan-ellipsis" };
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: "fan-picker__box",
      onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.onTouchstart && _ctx.onTouchstart(...args)),
      onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.onTouchmove && _ctx.onTouchmove(...args)),
      onTouchend: _cache[2] || (_cache[2] = ($event) => _ctx.onTouchEnd(_ctx.items)),
      onTouchcancel: _cache[3] || (_cache[3] = ($event) => _ctx.onTouchEnd(_ctx.items))
    },
    [
      (0, import_vue2.createElementVNode)(
        "div",
        {
          class: "fan-picker__l",
          style: (0, import_vue2.normalizeStyle)(_ctx.colStyle)
        },
        [
          ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
            import_vue2.Fragment,
            null,
            (0, import_vue2.renderList)(_ctx.items, (item, i) => {
              return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
                "div",
                {
                  key: i,
                  class: (0, import_vue2.normalizeClass)(["fan-flex-center fan-picker__txt", { "fan-picker__d": item.disabled }])
                },
                [
                  (0, import_vue2.createElementVNode)(
                    "div",
                    _hoisted_1,
                    (0, import_vue2.toDisplayString)(item.text),
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
