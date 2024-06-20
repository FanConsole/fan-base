import "./link-sfc.css";
import { defineComponent, computed } from "vue";
import {
  createNamespace,
  getSystemInfo,
  isMpWeixinWeb,
  transformStyleSize,
  isInnerRoute
} from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Link")[0],
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
    const { isWeixin } = getSystemInfo();
    const theStyle = computed(() => {
      const { customStyle, zIndex, full, align, justify, flex } = props;
      const obj = {};
      if (full)
        obj["z-index"] = zIndex;
      if (flex) {
        align && (obj["align-items"] = align);
        justify && (obj["justify-content"] = justify);
      }
      return transformStyleSize(customStyle) + transformStyleSize(obj);
    });
    const showWxMpLaunchTag = computed(() => {
      var _a;
      return isWeixin && !isMpWeixinWeb() && props.mpTag && ((_a = props.mp) == null ? void 0 : _a.originId);
    });
    const webUrl = computed(() => {
      const { name, query, path } = props;
      if (showWxMpLaunchTag.value)
        return "";
      if (name === "web" && isInnerRoute(query.url) || isInnerRoute(path))
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
import { renderSlot as _renderSlot, createCommentVNode as _createCommentVNode, createTextVNode as _createTextVNode, resolveDynamicComponent as _resolveDynamicComponent, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, createElementVNode as _createElementVNode, withModifiers as _withModifiers, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = /* @__PURE__ */ _createElementVNode(
  "div",
  { class: "launch-mp-btn" },
  ".",
  -1
  /* HOISTED */
);
function __vue_render__(_ctx, _cache) {
  return _openBlock(), _createElementBlock(
    "a",
    {
      style: _normalizeStyle(_ctx.theStyle),
      class: _normalizeClass(["fan-link", [
        { "fan-link--full": _ctx.full },
        { "fan-link--block": _ctx.block },
        { "fan-link--f": _ctx.flex },
        { "fan-link--fcol": _ctx.flex && _ctx.direction === "column" }
      ]]),
      href: "javascript:void(0);",
      onClick: _cache[1] || (_cache[1] = _withModifiers((...args) => _ctx.onClick && _ctx.onClick(...args), ["stop"]))
    },
    [
      _renderSlot(_ctx.$slots, "default"),
      _createCommentVNode(" launch-mp-btn \u9AD8\u5EA6100%\u8C8C\u4F3C\u4E0D\u751F\u6548\uFF0C\u4E0D\u77E5\u9053\u662F\u56E0\u4E3A\u4E0D\u652F\u6301\u8FD8\u662F wx-open-launch-weapp \u6CA1\u9AD8\u5EA6 "),
      _ctx.showWxMpLaunchTag ? (_openBlock(), _createBlock(_resolveDynamicComponent("wx-open-launch-weapp"), {
        key: 0,
        username: _ctx.mp.originId,
        path: _ctx.mp.path,
        class: "fan-launch-mp-mask",
        onError: _ctx.onLaunchMpError,
        onClick: _cache[0] || (_cache[0] = _withModifiers(($event) => _ctx.$emit("click", $event), ["stop"]))
      }, {
        default: _withCtx(() => [
          (_openBlock(), _createBlock(_resolveDynamicComponent("script"), { type: "text/wxtag-template" }, {
            default: _withCtx(() => [
              (_openBlock(), _createBlock(_resolveDynamicComponent("style"), null, {
                default: _withCtx(() => [
                  _createTextVNode(" .launch-mp-btn { width: 100%;position: absolute;top: 0;bottom: 0;left: 0;right: 0 } ")
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
      }, 40, ["username", "path", "onError"])) : _createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
