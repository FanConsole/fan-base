var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_popup_sfc = require("./popup-sfc.css");
var import_vue = require("vue");
var import_overlay = __toESM(require("../overlay/overlay.js"));
var import_button = __toESM(require("../button/button.js"));
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Popup")[0],
  components: { FanOverlay: import_overlay.default, FanButton: import_button.default },
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
    const overlayShow = (0, import_vue.ref)(props.show);
    const innerShow = (0, import_vue.ref)(props.show);
    const time = (0, import_vue.ref)(null);
    const className = (0, import_vue.ref)("");
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
    (0, import_vue.watch)(
      () => props.show,
      (val) => {
        if (className.value)
          return;
        overlayShow.value = val;
        clearTimeout(time.value);
        val ? enter() : leave();
      }
    );
    const theStyle = (0, import_vue.computed)(() => {
      const { round, zIndex, duration, contStyle } = props;
      const obj = {
        zIndex,
        "--fan-popup-time": `${duration}s`
      };
      if (round !== false && Number(round) !== 0) {
        obj["--fan-popup-radius"] = (0, import_utils.transformSize)(
          round === true || !Number(round) ? "12px" : round
        );
      }
      return (0, import_utils.transformStyleSize)(contStyle) + (0, import_utils.transformStyleSize)(obj);
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
function __vue_render__(_ctx, _cache) {
  const _component_FanOverlay = (0, import_vue2.resolveComponent)("FanOverlay");
  const _component_FanButton = (0, import_vue2.resolveComponent)("FanButton");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    import_vue2.Fragment,
    null,
    [
      (0, import_vue2.createVNode)(_component_FanOverlay, {
        style: (0, import_vue2.normalizeStyle)(_ctx.overlayStyle),
        show: _ctx.overlayShow,
        "z-index": _ctx.zIndex,
        duration: _ctx.duration,
        onClick: _ctx.overlayClick
      }, null, 8, ["style", "show", "z-index", "duration", "onClick"]),
      _ctx.innerShow ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 0,
          class: (0, import_vue2.normalizeClass)([
            "fan-popup",
            "fan-popup--" + _ctx.position,
            { safe: _ctx.safeBottom },
            _ctx.className
          ]),
          style: (0, import_vue2.normalizeStyle)(_ctx.theStyle)
        },
        [
          _ctx.title ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
            "div",
            {
              key: 0,
              class: (0, import_vue2.normalizeClass)(["fan-popup__title", "fan-popup__title--" + _ctx.titleAlign])
            },
            (0, import_vue2.toDisplayString)(_ctx.title),
            3
            /* TEXT, CLASS */
          )) : (0, import_vue2.createCommentVNode)("v-if", true),
          (0, import_vue2.renderSlot)(_ctx.$slots, "default"),
          _ctx.closeable ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanButton, {
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
          }, null, 8, ["icon", "color", "onClick"])) : (0, import_vue2.createCommentVNode)("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
