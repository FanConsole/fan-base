import "./popup-sfc.css";
import { defineComponent, ref, watch, computed } from "vue";
import FanOverlay from "../overlay/overlay.js";
import FanButton from "../button/button.js";
import { createNamespace, transformSize, transformStyleSize } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Popup")[0],
  components: { FanOverlay, FanButton },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    position: {
      type: String,
      validator(value) {
        return ["center", "top", "bottom", "right", "left"].includes(value);
      },
      default: "center"
    },
    /**
     * 圆角
     * @default 12px
     * @description true-默认值 false-0
     */
    round: {
      type: [Boolean, Number, String],
      default: "12px"
    },
    zIndex: {
      type: [String, Number],
      default: 1e3
    },
    duration: {
      type: [String, Number],
      default: 0.3
    },
    title: String,
    titleAlign: {
      type: String,
      default: "center",
      validator: (value) => ["left", "center", "right"].includes(value)
    },
    overlayStyle: {
      type: [Object, String]
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    closeable: {
      type: Boolean,
      default: false
    },
    closeIcon: {
      type: String,
      default: "close"
    },
    closeIconColor: {
      type: String,
      default: "#c8c9cc"
    },
    contStyle: [Object, String],
    // 底部安全区域
    safeBottom: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:show", "clickOverlay", "closed"],
  setup(props, { emit }) {
    const overlayShow = ref(props.show);
    const innerShow = ref(props.show);
    const time = ref(null);
    const className = ref("");
    const enter = () => {
      innerShow.value = true;
      className.value = `fan-popup-${props.position}-enter-from`;
      setTimeout(() => {
        className.value = "";
      }, 0);
    };
    const leave = () => {
      className.value = `fan-popup-${props.position}-leave-active`;
      time.value = setTimeout(() => {
        className.value = "";
        innerShow.value = false;
        emit("update:show", false);
        emit("closed");
      }, props.duration * 1e3);
    };
    watch(
      () => props.show,
      (val) => {
        if (className.value)
          return;
        overlayShow.value = val;
        clearTimeout(time.value);
        val ? enter() : leave();
      }
    );
    const theStyle = computed(() => {
      const { round, zIndex, duration, contStyle } = props;
      const obj = {
        zIndex,
        "--fan-popup-time": `${duration}s`
      };
      if (round !== false && Number(round) !== 0) {
        obj["--fan-popup-radius"] = transformSize(
          round === true || !Number(round) ? "12px" : round
        );
      }
      return transformStyleSize(contStyle) + transformStyleSize(obj);
    });
    const overlayClick = () => {
      emit("clickOverlay");
      if (!props.closeOnClickOverlay)
        return;
      emit("update:show", false);
    };
    return { overlayShow, innerShow, theStyle, className, leave, overlayClick };
  }
});
import { resolveComponent as _resolveComponent, normalizeStyle as _normalizeStyle, createVNode as _createVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createBlock as _createBlock, Fragment as _Fragment } from "vue";
function __vue_render__(_ctx, _cache) {
  const _component_FanOverlay = _resolveComponent("FanOverlay");
  const _component_FanButton = _resolveComponent("FanButton");
  return _openBlock(), _createElementBlock(
    _Fragment,
    null,
    [
      _createVNode(_component_FanOverlay, {
        style: _normalizeStyle(_ctx.overlayStyle),
        show: _ctx.overlayShow,
        "z-index": _ctx.zIndex,
        duration: _ctx.duration,
        onClick: _ctx.overlayClick
      }, null, 8, ["style", "show", "z-index", "duration", "onClick"]),
      _ctx.innerShow ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass([
            "fan-popup",
            "fan-popup--" + _ctx.position,
            { safe: _ctx.safeBottom },
            _ctx.className
          ]),
          style: _normalizeStyle(_ctx.theStyle)
        },
        [
          _ctx.title ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass(["fan-popup__title", "fan-popup__title--" + _ctx.titleAlign])
            },
            _toDisplayString(_ctx.title),
            3
            /* TEXT, CLASS */
          )) : _createCommentVNode("v-if", true),
          _renderSlot(_ctx.$slots, "default"),
          _ctx.closeable ? (_openBlock(), _createBlock(_component_FanButton, {
            key: 1,
            style: { "position": "absolute", "top": "0", "right": "2px" },
            "icon-size": "16",
            padding: "0",
            width: "40px",
            icon: _ctx.closeIcon,
            color: _ctx.closeIconColor,
            border: false,
            plain: true,
            onClick: _ctx.leave
          }, null, 8, ["icon", "color", "onClick"])) : _createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      )) : _createCommentVNode("v-if", true)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
