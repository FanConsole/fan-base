import "./rate-sfc.css";
import { defineComponent, ref, watch, computed } from "vue";
import FanIcon from "../icon/icon.js";
import { createNamespace, transformSize } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Rate")[0],
  components: { FanIcon },
  props: {
    // 当前评分
    modelValue: {
      type: [Number, String],
      default: 1
    },
    // 图标名称
    icon: {
      type: String,
      default: "star-fill"
    },
    // 星星未选中的颜色
    color: {
      type: String,
      default: "#ececec"
    },
    // 星星选中状态颜色
    activeColor: {
      type: String,
      default: "#ffca3e"
    },
    // 星星禁用状态颜色
    disabledColor: {
      type: String,
      default: "#c0c0c0"
    },
    // 星星的大小
    size: {
      type: [Number, String],
      default: 24
    },
    // 图标总数
    count: {
      type: [Number, String],
      default: 5
    },
    // 星星的间距
    space: [String, Number],
    // 是否可点击
    disabled: {
      type: [Boolean, String],
      default: false
    },
    // 是否只读
    readonly: {
      type: [Boolean, String],
      default: true
    },
    // 是否显示半星
    allowHalf: {
      type: [Boolean, String],
      default: false
    },
    // todo: 是否支持滑动手势
    touchable: {
      type: [Boolean, String],
      default: false
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, context) {
    const theStyle = computed(() => {
      const { space } = props;
      const s = space ? `--fan-rate-space:${transformSize(space)};` : "";
      return s;
    });
    const value = ref(0);
    watch(
      () => props.modelValue,
      (val) => {
        const n = Number(val) || 0;
        if (value.value === n)
          return;
        value.value = n;
      },
      { immediate: true }
    );
    watch(value, (val) => {
      if (val === props.modelValue)
        return;
      context.emit("update:modelValue", val);
      context.emit("change", val);
    });
    const stars = computed(() => {
      const val = value.value;
      const list = [];
      const floorValue = Math.floor(val);
      const ceilValue = Math.ceil(val);
      for (let i = 0; i < props.count; i++) {
        let activeWidth = "0";
        if (floorValue > i) {
          activeWidth = "100%";
        } else if (ceilValue - 1 === i) {
          activeWidth = (val - floorValue) * 100 + "%";
        }
        list.push({ activeWidth });
      }
      return list;
    });
    return { theStyle, stars };
  }
});
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveComponent as _resolveComponent, createVNode as _createVNode, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode } from "vue";
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = _resolveComponent("FanIcon");
  return _openBlock(), _createElementBlock(
    "div",
    {
      style: _normalizeStyle(_ctx.theStyle),
      class: "fan-rate"
    },
    [
      (_openBlock(true), _createElementBlock(
        _Fragment,
        null,
        _renderList(_ctx.stars, (star, index) => {
          return _openBlock(), _createElementBlock("div", {
            key: index,
            class: "fan-rate__icon"
          }, [
            _createVNode(_component_FanIcon, {
              color: _ctx.color,
              size: _ctx.size,
              name: _ctx.icon
            }, null, 8, ["color", "size", "name"]),
            _createElementVNode(
              "div",
              {
                style: _normalizeStyle({ width: star.activeWidth }),
                class: "fan-rate__icon-on"
              },
              [
                _createVNode(_component_FanIcon, {
                  color: _ctx.disabled ? _ctx.disabledColor : _ctx.activeColor,
                  size: _ctx.size,
                  name: _ctx.icon
                }, null, 8, ["color", "size", "name"])
              ],
              4
              /* STYLE */
            )
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
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
