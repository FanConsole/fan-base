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
var import_contact_panel_sfc = require("./contact-panel-sfc.css");
var import_vue = require("vue");
var import_image = __toESM(require("../image/image.js"));
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("ContactPanel")[0],
  components: { FanImage: import_image.default },
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
  const _component_FanImage = (0, import_vue2.resolveComponent)("FanImage");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: (0, import_vue2.normalizeClass)(["fan-contact-panel", { "fan-contact--large": _ctx.size === "large" }])
    },
    [
      _ctx.time ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 0,
          style: (0, import_vue2.normalizeStyle)(_ctx.timeStyle),
          class: "fan-multi-ellipsis--l2 fan-contact__time"
        },
        " \u5BA2\u670D\u5DE5\u4F5C\u65F6\u95F4\uFF1A" + (0, import_vue2.toDisplayString)(_ctx.time),
        5
        /* TEXT, STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true),
      !_ctx.phone && !_ctx.picture ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 1,
          class: "fan-contact__cell",
          style: (0, import_vue2.normalizeStyle)({ background: _ctx.background })
        },
        " \u5BA2\u670D\u6709\u70B9\u9AD8\u51B7\uFF0C\u6728\u6709\u7ED9\u8054\u7CFB\u65B9\u5F0F\u5462\uFF01 ",
        4
        /* STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true),
      _ctx.phone ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 2,
          class: "fan-contact__cell fan-contact__phone",
          style: (0, import_vue2.normalizeStyle)({
            background: _ctx.background,
            marginBottom: !_ctx.picture ? "0" : _ctx.size === "large" ? "18px" : "12px"
          })
        },
        [
          (0, import_vue2.createTextVNode)(
            (0, import_vue2.toDisplayString)(_ctx.phoneLabel) + "\uFF1A",
            1
            /* TEXT */
          ),
          (0, import_vue2.createElementVNode)(
            "span",
            _hoisted_1,
            (0, import_vue2.toDisplayString)(_ctx.phone),
            1
            /* TEXT */
          )
        ],
        4
        /* STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true),
      _ctx.picture ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 3,
          class: "fan-contact__cell",
          style: (0, import_vue2.normalizeStyle)({
            display: "inline-block",
            width: "100%",
            background: _ctx.background
          })
        },
        [
          _ctx.pictureLabel ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
            "div",
            _hoisted_2,
            (0, import_vue2.toDisplayString)(_ctx.pictureLabel) + "\uFF1A ",
            1
            /* TEXT */
          )) : (0, import_vue2.createCommentVNode)("v-if", true),
          _ctx.pictureRemark ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
            "div",
            _hoisted_3,
            (0, import_vue2.toDisplayString)(_ctx.pictureRemark),
            1
            /* TEXT */
          )) : (0, import_vue2.createCommentVNode)("v-if", true),
          (0, import_vue2.createVNode)(_component_FanImage, {
            src: _ctx.picture,
            mode: "widthFix",
            width: _ctx.size === "large" ? "100%" : "85%",
            "custom-style": "display:inline-block;"
          }, null, 8, ["src", "width"])
        ],
        4
        /* STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true)
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
