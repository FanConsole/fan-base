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
var import_icon_sfc = require("./icon-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Icon")[0],
  emits: ["click"],
  props: {
    /**
     * 图标名称或图片链接
     */
    name: String,
    size: {
      type: [String, Number],
      default: "inherit"
    },
    // css 属性
    verticalAlign: String,
    /**
     * 图标颜色：red，支持渐变：linear-gradient(to right, red, blue)
     */
    color: {
      type: [String, Number],
      default: "inherit"
    }
  },
  setup(props, { emit }) {
    const imgIcon = (0, import_vue.computed)(() => {
      var _a;
      return (_a = props.name) == null ? void 0 : _a.includes("/");
    });
    const theStyle = (0, import_vue.computed)(() => {
      const { name, color, size, verticalAlign } = props;
      const fsize = (0, import_utils.transformSize)(size === "inherit" ? "14px" : size);
      let str = "";
      if (verticalAlign) {
        str += `--fan-icon-align-v:${verticalAlign};`;
      }
      if (imgIcon.value) {
        str += `width:${fsize};height:${fsize};`;
        if (color && color !== "inherit") {
          str += `-webkit-mask-image:url(${name});mask-image:url(${name});
						-webkit-mask-size:cover;mask-size:cover;
						background:${color};`;
        } else {
          str += `background:url(${name}) center / cover no-repeat;`;
        }
      } else {
        str += `font-size:${fsize};`;
        if (color == null ? void 0 : color.includes("-gradient")) {
          str += `color:transparent;background-image:${color};`;
        } else {
          str += `color:${color};`;
        }
      }
      return str;
    });
    const onClick = (e) => {
      emit("click", e);
    };
    return { imgIcon, theStyle, onClick };
  }
});
function __vue_render__(_ctx, _cache) {
  return _ctx.imgIcon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      key: 0,
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      class: "fan-icon--img",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    null,
    4
    /* STYLE */
  )) : ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      key: 1,
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      class: (0, import_vue2.normalizeClass)(["fan-icon", "icon-" + _ctx.name]),
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    null,
    6
    /* CLASS, STYLE */
  ));
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
