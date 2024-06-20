import "./toast-sfc.css";
import { defineComponent, watch, ref, computed } from "vue";
import { createNamespace } from "../utils";
import FanIcon from "../icon/icon.js";
import FanLoading from "../loading/loading.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Toast")[0],
  components: { FanIcon, FanLoading },
  emits: ["update:show"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: String,
    icon: {
      type: String,
      default: "none",
      validator: (val) => ["none", "success", "error", "loading"].includes(val)
    },
    duration: {
      type: Number,
      default: 2e3
    }
  },
  setup(props, { emit }) {
    const innerShow = ref(props.show);
    const showIconType = computed(() => {
      const { icon } = props;
      if (icon === "none") {
        return "none";
      } else if (icon === "loading") {
        return "loading";
      } else {
        return "icon";
      }
    });
    watch(
      () => props.show,
      (val) => {
        innerShow.value = val;
      }
    );
    watch(innerShow, (val) => {
      emit("update:show", val);
      if (val && props.duration > 0)
        setTimeout(() => innerShow.value = false, props.duration);
    });
    return { showIconType, innerShow };
  }
});
import { resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, createElementBlock as _createElementBlock, Transition as _Transition, withCtx as _withCtx } from "vue";
const _hoisted_1 = { class: "fan-toast__text" };
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = _resolveComponent("FanIcon");
  const _component_FanLoading = _resolveComponent("FanLoading");
  return _openBlock(), _createBlock(_Transition, { name: "fan" }, {
    default: _withCtx(() => [
      _ctx.innerShow ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass(["fan-toast fan-flex-center fan-flex-col", _ctx.icon === "none" ? "fan-toast--text" : "fan-toast--icon"])
        },
        [
          _ctx.showIconType === "icon" ? (_openBlock(), _createBlock(_component_FanIcon, {
            key: 0,
            name: _ctx.icon === "success" ? "check" : "exclamation",
            size: "36",
            color: "#fff"
          }, null, 8, ["name"])) : _ctx.showIconType === "loading" ? (_openBlock(), _createBlock(_component_FanLoading, {
            key: 1,
            color: "#fff",
            size: "36"
          })) : _createCommentVNode("v-if", true),
          _createElementVNode(
            "div",
            _hoisted_1,
            _toDisplayString(_ctx.message),
            1
            /* TEXT */
          )
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true)
    ]),
    _: 1
    /* STABLE */
  });
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
