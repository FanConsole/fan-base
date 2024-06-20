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
var import_list_sfc = require("./list-sfc.css");
var import_vue = require("vue");
var import_loading = __toESM(require("../loading/loading.js"));
var import_utils = require("../utils");
var import_hooks = require("../hooks");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("List")[0],
  components: { Loading: import_loading.default },
  props: {
    /**
     * 是否处于隐藏状态，此时不触发触底
     */
    hidden: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: "loading",
      validator: (value) => {
        return ["loading", "hasMore", "noMore", "error"].includes(value);
      }
    },
    loadingColor: String,
    loadingSize: {
      type: [Number, String],
      default: 22
    },
    loadingText: {
      type: String,
      default: ""
    },
    textColor: {
      type: String,
      default: "#999"
    },
    noMoreText: {
      type: String,
      default: "\u6CA1\u6709\u66F4\u591A\u4E86"
    },
    errorText: {
      type: String,
      default: "\u52A0\u8F7D\u5931\u8D25"
    }
  },
  emits: ["load", "errorClick"],
  setup(props, context) {
    const text = (0, import_vue.computed)(() => {
      const { loadingText, noMoreText, errorText, status } = props;
      if (status === "noMore")
        return noMoreText;
      if (status === "error")
        return errorText;
      return loadingText;
    });
    const textSize = (0, import_vue.computed)(() => {
      return `calc(${(0, import_utils.transformSize)(props.loadingSize)} * 0.64)`;
    });
    const showLoading = (0, import_vue.computed)(() => {
      return props.status === "loading" || props.status === "hasMore";
    });
    const { onPageReachBottom } = (0, import_hooks.usePageLifecycle)();
    onPageReachBottom(() => {
      !props.hidden && context.emit("load");
    });
    const onErrorClick = () => {
      if (props.status !== "error")
        return;
      context.emit("errorClick");
    };
    return { text, textSize, showLoading, onErrorClick };
  }
});
const _hoisted_1 = { class: "fan-list" };
const _hoisted_2 = { class: "fan-list__loadt" };
function __vue_render__(_ctx, _cache) {
  const _component_Loading = (0, import_vue2.resolveComponent)("Loading");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
    (0, import_vue2.renderSlot)(_ctx.$slots, "default"),
    _ctx.showLoading || _ctx.text ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
      "div",
      {
        key: 0,
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onErrorClick && _ctx.onErrorClick(...args)),
        class: "fan-flex fan-align-center fan-justify-center fan-list__load",
        style: (0, import_vue2.normalizeStyle)({ fontSize: _ctx.textSize, color: _ctx.textColor })
      },
      [
        _ctx.showLoading ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_Loading, {
          key: 0,
          size: _ctx.loadingSize,
          color: _ctx.loadingColor
        }, null, 8, ["size", "color"])) : (0, import_vue2.createCommentVNode)("v-if", true),
        (0, import_vue2.createElementVNode)(
          "span",
          _hoisted_2,
          (0, import_vue2.toDisplayString)(_ctx.text),
          1
          /* TEXT */
        )
      ],
      4
      /* STYLE */
    )) : (0, import_vue2.createCommentVNode)("v-if", true)
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
