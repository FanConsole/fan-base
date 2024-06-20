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
var import_toast_sfc = require("./toast-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_icon = __toESM(require("../icon/icon.js"));
var import_loading = __toESM(require("../loading/loading.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Toast")[0],
  components: { FanIcon: import_icon.default, FanLoading: import_loading.default },
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
    const innerShow = (0, import_vue.ref)(props.show);
    const showIconType = (0, import_vue.computed)(() => {
      const { icon } = props;
      if (icon === "none") {
        return "none";
      } else if (icon === "loading") {
        return "loading";
      } else {
        return "icon";
      }
    });
    (0, import_vue.watch)(
      () => props.show,
      (val) => {
        innerShow.value = val;
      }
    );
    (0, import_vue.watch)(innerShow, (val) => {
      emit("update:show", val);
      if (val && props.duration > 0)
        setTimeout(() => innerShow.value = false, props.duration);
    });
    return { showIconType, innerShow };
  }
});
const _hoisted_1 = { class: "fan-toast__text" };
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  const _component_FanLoading = (0, import_vue2.resolveComponent)("FanLoading");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(import_vue2.Transition, { name: "fan" }, {
    default: (0, import_vue2.withCtx)(() => [
      _ctx.innerShow ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 0,
          class: (0, import_vue2.normalizeClass)(["fan-toast fan-flex-center fan-flex-col", _ctx.icon === "none" ? "fan-toast--text" : "fan-toast--icon"])
        },
        [
          _ctx.showIconType === "icon" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
            key: 0,
            name: _ctx.icon === "success" ? "check" : "exclamation",
            size: "36",
            color: "#fff"
          }, null, 8, ["name"])) : _ctx.showIconType === "loading" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanLoading, {
            key: 1,
            color: "#fff",
            size: "36"
          })) : (0, import_vue2.createCommentVNode)("v-if", true),
          (0, import_vue2.createElementVNode)(
            "div",
            _hoisted_1,
            (0, import_vue2.toDisplayString)(_ctx.message),
            1
            /* TEXT */
          )
        ],
        2
        /* CLASS */
      )) : (0, import_vue2.createCommentVNode)("v-if", true)
    ]),
    _: 1
    /* STABLE */
  });
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
