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
var import_link_sfc = require("./link-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Link")[0],
  emits: ["click"],
  props: {
    name: String,
    path: String,
    /**
     * 当 name=web 时，query中应该有 url 参数
     */
    query: Object,
    redirect: Boolean,
    /**
     * （外）跳小程序的一些参数
     * { path: string; appId?: string; originId?: string }
     */
    mp: Object,
    /**
     * H5 在特定环境是否使用拉起小程序的标签，比如微信的 wx-open-launch-weapp
     */
    mpTag: {
      type: Boolean,
      default: true
    },
    schemeUrl: String,
    extras: [Object, String],
    // 以下是一些样式属性
    customStyle: [String, Object],
    /**
     * 是否撑满父盒子（position:absolute），此时可以作为遮罩mask使用
     */
    full: Boolean,
    /**
     * 当full为true时的z-index
     */
    zIndex: {
      type: [String, Number],
      default: 1
    },
    /**
     * 是否块级元素
     */
    block: Boolean,
    flex: Boolean,
    direction: {
      type: String,
      default: "row",
      validator: (value) => ["row", "column"].includes(value)
    },
    align: {
      type: String,
      default: "center",
      validator: (value) => ["flex-start", "center", "flex-end"].includes(value)
    },
    justify: {
      type: String,
      validator: (value) => [
        "flex-start",
        "center",
        "flex-end",
        "space-between",
        "space-evenly",
        "space-around"
      ].includes(value)
    }
  },
  setup(props, context) {
    const { isWeixin } = (0, import_utils.getSystemInfo)();
    const theStyle = (0, import_vue.computed)(() => {
      const { customStyle, zIndex, full, align, justify, flex } = props;
      const obj = {};
      if (full)
        obj["z-index"] = zIndex;
      if (flex) {
        align && (obj["align-items"] = align);
        justify && (obj["justify-content"] = justify);
      }
      return (0, import_utils.transformStyleSize)(customStyle) + (0, import_utils.transformStyleSize)(obj);
    });
    const showWxMpLaunchTag = (0, import_vue.computed)(() => {
      var _a;
      return isWeixin && !(0, import_utils.isMpWeixinWeb)() && props.mpTag && ((_a = props.mp) == null ? void 0 : _a.originId);
    });
    const webUrl = (0, import_vue.computed)(() => {
      const { name, query, path } = props;
      if (showWxMpLaunchTag.value)
        return "";
      if (name === "web" && (0, import_utils.isInnerRoute)(query.url) || (0, import_utils.isInnerRoute)(path))
        return query.url || path;
      return "";
    });
    const onClick = (e) => {
      context.emit("click", e);
      if (webUrl.value) {
        const { redirect } = props;
        redirect ? location.replace(webUrl.value) : location.href = webUrl.value;
      }
    };
    const onLaunchMpError = (e) => {
      console.log("\u5C0F\u7A0B\u5E8F\u6807\u7B7E\u62C9\u8D77\u5931\u8D25\uFF1A", e);
      onClick(e);
      alert("\u6253\u5F00\u5931\u8D25\uFF1A" + JSON.stringify(e.detail));
    };
    return { theStyle, showWxMpLaunchTag, onClick, onLaunchMpError };
  }
});
const _hoisted_1 = /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "div",
  { class: "launch-mp-btn" },
  ".",
  -1
  /* HOISTED */
);
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "a",
    {
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      class: (0, import_vue2.normalizeClass)(["fan-link", [
        { "fan-link--full": _ctx.full },
        { "fan-link--block": _ctx.block },
        { "fan-link--f": _ctx.flex },
        { "fan-link--fcol": _ctx.flex && _ctx.direction === "column" }
      ]]),
      href: "javascript:void(0);",
      onClick: _cache[1] || (_cache[1] = (0, import_vue2.withModifiers)((...args) => _ctx.onClick && _ctx.onClick(...args), ["stop"]))
    },
    [
      (0, import_vue2.renderSlot)(_ctx.$slots, "default"),
      (0, import_vue2.createCommentVNode)(" launch-mp-btn \u9AD8\u5EA6100%\u8C8C\u4F3C\u4E0D\u751F\u6548\uFF0C\u4E0D\u77E5\u9053\u662F\u56E0\u4E3A\u4E0D\u652F\u6301\u8FD8\u662F wx-open-launch-weapp \u6CA1\u9AD8\u5EA6 "),
      _ctx.showWxMpLaunchTag ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)((0, import_vue2.resolveDynamicComponent)("wx-open-launch-weapp"), {
        key: 0,
        username: _ctx.mp.originId,
        path: _ctx.mp.path,
        class: "fan-launch-mp-mask",
        onError: _ctx.onLaunchMpError,
        onClick: _cache[0] || (_cache[0] = (0, import_vue2.withModifiers)(($event) => _ctx.$emit("click", $event), ["stop"]))
      }, {
        default: (0, import_vue2.withCtx)(() => [
          ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)((0, import_vue2.resolveDynamicComponent)("script"), { type: "text/wxtag-template" }, {
            default: (0, import_vue2.withCtx)(() => [
              ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)((0, import_vue2.resolveDynamicComponent)("style"), null, {
                default: (0, import_vue2.withCtx)(() => [
                  (0, import_vue2.createTextVNode)(" .launch-mp-btn { width: 100%;position: absolute;top: 0;bottom: 0;left: 0;right: 0 } ")
                ]),
                _: 1
                /* STABLE */
              })),
              _hoisted_1
            ]),
            _: 1
            /* STABLE */
          }))
        ]),
        _: 1
        /* STABLE */
      }, 40, ["username", "path", "onError"])) : (0, import_vue2.createCommentVNode)("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
