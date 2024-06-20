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
var import_user_panel_sfc = require("./user-panel-sfc.css");
var import_vue = require("vue");
var import_image = __toESM(require("../image/image.js"));
var import_loading = __toESM(require("../loading/loading.js"));
var import_rich_text = __toESM(require("../rich-text/rich-text.js"));
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("UserPanel")[0],
  components: { FanImage: import_image.default, FanLoading: import_loading.default, FanRichText: import_rich_text.default },
  props: {
    hasLogin: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: "https://img.dac6.cn/resource/avatar.png"
    },
    name: {
      type: String,
      default: "\u7528\u6237\u6635\u79F0"
    },
    role: String,
    vip: Boolean,
    desc: String
  },
  emits: ["click"],
  setup() {
  }
});
const _hoisted_1 = { class: "fan-upanel" };
const _hoisted_2 = {
  key: 0,
  class: "fan-flex-1 fan-flex"
};
const _hoisted_3 = {
  key: 1,
  class: "fan-flex-1"
};
const _hoisted_4 = {
  class: "fan-flex fan-align-center",
  style: { "flex-wrap": "nowrap" }
};
const _hoisted_5 = { class: "fan-ellipsis fan-upanel__name" };
const _hoisted_6 = {
  key: 2,
  class: "fan-flex-1"
};
const _hoisted_7 = /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "div",
  {
    class: "fan-flex fan-align-center",
    style: { "flex-wrap": "nowrap" }
  },
  [
    /* @__PURE__ */ (0, import_vue2.createElementVNode)("div", { class: "fan-ellipsis fan-upanel__name" }, "\u70B9\u51FB\u767B\u5F55")
  ],
  -1
  /* HOISTED */
);
const _hoisted_8 = /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "div",
  { class: "fan-upanel__desc" },
  "\u767B\u5F55\u540E\u89E3\u9501\u66F4\u591A\u5B9E\u7528\u529F\u80FD",
  -1
  /* HOISTED */
);
const _hoisted_9 = [
  _hoisted_7,
  _hoisted_8
];
function __vue_render__(_ctx, _cache) {
  const _component_FanImage = (0, import_vue2.resolveComponent)("FanImage");
  const _component_FanLoading = (0, import_vue2.resolveComponent)("FanLoading");
  const _component_FanRichText = (0, import_vue2.resolveComponent)("FanRichText");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
    (0, import_vue2.createElementVNode)("div", {
      class: "fan-flex-center fan-upanel__in",
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
    }, [
      (0, import_vue2.createVNode)(_component_FanImage, {
        width: "60px",
        height: "60px",
        src: _ctx.avatar,
        mode: "aspectFill",
        radius: "50%",
        style: { marginRight: "15px" }
      }, null, 8, ["src"]),
      _ctx.hasLogin && _ctx.loading ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_2, [
        (0, import_vue2.createVNode)(_component_FanLoading, {
          type: "line",
          color: "var(--fan-primary-color)"
        })
      ])) : _ctx.hasLogin ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_3, [
        (0, import_vue2.createElementVNode)("div", _hoisted_4, [
          (0, import_vue2.createElementVNode)(
            "div",
            _hoisted_5,
            (0, import_vue2.toDisplayString)(_ctx.name),
            1
            /* TEXT */
          ),
          _ctx.role ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
            "div",
            {
              key: 0,
              class: (0, import_vue2.normalizeClass)(["fan-upanel__role", { vip: _ctx.vip }])
            },
            (0, import_vue2.toDisplayString)(_ctx.role),
            3
            /* TEXT, CLASS */
          )) : (0, import_vue2.createCommentVNode)("v-if", true)
        ]),
        _ctx.desc ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanRichText, {
          key: 0,
          class: "fan-upanel__desc",
          content: _ctx.desc
        }, null, 8, ["content"])) : (0, import_vue2.createCommentVNode)("v-if", true)
      ])) : ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_6, [..._hoisted_9]))
    ])
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
