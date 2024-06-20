import "./contact-panel-sfc.css";
import { defineComponent } from "vue";
import FanImage from "../image/image.js";
import { createNamespace } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("ContactPanel")[0],
  components: { FanImage },
  props: {
    phone: String,
    picture: String,
    time: String,
    timeStyle: String,
    phoneLabel: {
      type: String,
      default: "\u5BA2\u670D\u7535\u8BDD"
    },
    pictureLabel: {
      type: String,
      default: "\u5BA2\u670D\u5FAE\u4FE1"
    },
    // 图片联系方式的说明文案
    pictureRemark: {
      type: String,
      default: "1.\u622A\u5C4F\u6216\u957F\u6309\u4FDD\u5B58\u4E8C\u7EF4\u7801\n2.\u7528\u5FAE\u4FE1\u4ECE\u76F8\u518C\u9009\u56FE \u626B\u4E00\u626B\u8BC6\u522B"
    },
    size: {
      type: String,
      default: "default",
      validator: (value) => {
        return ["default", "large"].includes(value);
      }
    },
    background: {
      type: String,
      default: "#fff"
    }
  },
  setup() {
  }
});
import { toDisplayString as _toDisplayString, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = {
  selectable: "",
  "user-select": ""
};
const _hoisted_2 = {
  key: 0,
  class: "fan-contact--mg"
};
const _hoisted_3 = {
  key: 1,
  class: "fan-contact__remark fan-contact--mg"
};
function __vue_render__(_ctx, _cache) {
  const _component_FanImage = _resolveComponent("FanImage");
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass(["fan-contact-panel", { "fan-contact--large": _ctx.size === "large" }])
    },
    [
      _ctx.time ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          style: _normalizeStyle(_ctx.timeStyle),
          class: "fan-multi-ellipsis--l2 fan-contact__time"
        },
        " \u5BA2\u670D\u5DE5\u4F5C\u65F6\u95F4\uFF1A" + _toDisplayString(_ctx.time),
        5
        /* TEXT, STYLE */
      )) : _createCommentVNode("v-if", true),
      !_ctx.phone && !_ctx.picture ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 1,
          class: "fan-contact__cell",
          style: _normalizeStyle({ background: _ctx.background })
        },
        " \u5BA2\u670D\u6709\u70B9\u9AD8\u51B7\uFF0C\u6728\u6709\u7ED9\u8054\u7CFB\u65B9\u5F0F\u5462\uFF01 ",
        4
        /* STYLE */
      )) : _createCommentVNode("v-if", true),
      _ctx.phone ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 2,
          class: "fan-contact__cell fan-contact__phone",
          style: _normalizeStyle({
            background: _ctx.background,
            marginBottom: !_ctx.picture ? "0" : _ctx.size === "large" ? "18px" : "12px"
          })
        },
        [
          _createTextVNode(
            _toDisplayString(_ctx.phoneLabel) + "\uFF1A",
            1
            /* TEXT */
          ),
          _createElementVNode(
            "span",
            _hoisted_1,
            _toDisplayString(_ctx.phone),
            1
            /* TEXT */
          )
        ],
        4
        /* STYLE */
      )) : _createCommentVNode("v-if", true),
      _ctx.picture ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 3,
          class: "fan-contact__cell",
          style: _normalizeStyle({
            display: "inline-block",
            width: "100%",
            background: _ctx.background
          })
        },
        [
          _ctx.pictureLabel ? (_openBlock(), _createElementBlock(
            "div",
            _hoisted_2,
            _toDisplayString(_ctx.pictureLabel) + "\uFF1A ",
            1
            /* TEXT */
          )) : _createCommentVNode("v-if", true),
          _ctx.pictureRemark ? (_openBlock(), _createElementBlock(
            "div",
            _hoisted_3,
            _toDisplayString(_ctx.pictureRemark),
            1
            /* TEXT */
          )) : _createCommentVNode("v-if", true),
          _createVNode(_component_FanImage, {
            src: _ctx.picture,
            mode: "widthFix",
            width: _ctx.size === "large" ? "100%" : "85%",
            "custom-style": "display:inline-block;"
          }, null, 8, ["src", "width"])
        ],
        4
        /* STYLE */
      )) : _createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
