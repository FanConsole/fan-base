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
var import_loading_view_sfc = require("./loading-view-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_loading = __toESM(require("../loading/loading.js"));
var import_icon = __toESM(require("../icon/icon.js"));
var import_button = __toESM(require("../button/button.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("LoadingView")[0],
  components: {
    FanLoading: import_loading.default,
    FanIcon: import_icon.default,
    FanButton: import_button.default
  },
  emits: ["buttonClick"],
  props: {
    loading: Boolean,
    // string: message | object: { message, title, button }
    error: [String, Object],
    color: String,
    type: {
      type: String,
      default: "circle2"
    },
    // 用绝对定位撑满父盒子
    full: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const showLoading = (0, import_vue.ref)(false);
    const errorInfo = (0, import_vue.computed)(() => {
      const { error } = props;
      if (!error)
        return null;
      if (typeof error === "string")
        return { message: error };
      return error;
    });
    (0, import_vue.watch)(
      () => props.loading,
      (val) => {
        if (!val) {
          showLoading.value = false;
          return;
        }
        setTimeout(() => {
          if (props.loading)
            showLoading.value = true;
        }, 300);
      },
      { immediate: true }
    );
    const onClick = (e) => {
      context.emit("buttonClick", e);
    };
    return { showLoading, errorInfo, onClick };
  }
});
const _hoisted_1 = { key: 0 };
const _hoisted_2 = {
  key: 0,
  class: "fan-loading-view__t"
};
const _hoisted_3 = { key: 1 };
function __vue_render__(_ctx, _cache) {
  const _component_FanLoading = (0, import_vue2.resolveComponent)("FanLoading");
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  const _component_FanButton = (0, import_vue2.resolveComponent)("FanButton");
  return _ctx.loading ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      key: 0,
      class: (0, import_vue2.normalizeClass)(["fan-loading-view", { "fan-loading-view--full": _ctx.full }])
    },
    [
      !_ctx.errorInfo ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
        _ctx.showLoading ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanLoading, {
          key: 0,
          color: _ctx.color,
          type: _ctx.type
        }, null, 8, ["color", "type"])) : (0, import_vue2.createCommentVNode)("v-if", true)
      ])) : ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        import_vue2.Fragment,
        { key: 1 },
        [
          (0, import_vue2.createVNode)(_component_FanIcon, {
            name: "warning-circle-fill",
            size: 34,
            color: "var(--fan-danger-color)"
          }),
          _ctx.errorInfo.message ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
            "div",
            _hoisted_2,
            (0, import_vue2.toDisplayString)(_ctx.errorInfo.message),
            1
            /* TEXT */
          )) : (0, import_vue2.createCommentVNode)("v-if", true),
          _ctx.errorInfo.button ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanButton, {
            key: 1,
            round: "",
            bold: "",
            "custom-style": "min-width: 100px;",
            onClick: _ctx.onClick
          }, {
            default: (0, import_vue2.withCtx)(() => [
              (0, import_vue2.createTextVNode)(
                (0, import_vue2.toDisplayString)(_ctx.errorInfo.button),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onClick"])) : (0, import_vue2.createCommentVNode)("v-if", true)
        ],
        64
        /* STABLE_FRAGMENT */
      ))
    ],
    2
    /* CLASS */
  )) : ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_3, [
    (0, import_vue2.renderSlot)(_ctx.$slots, "default")
  ]));
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
