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
var import_empty_sfc = require("./empty-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_image = __toESM(require("../image/image.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Empoty")[0],
  components: {
    FanImage: import_image.default
  },
  props: {
    image: {
      type: String,
      default: "https://img.dac6.cn/fre/saas/empty-box.png"
    },
    imageSize: {
      type: [Number, String, Array],
      default: 100
    },
    descSize: {
      type: [Number, String]
    },
    description: {
      type: String,
      default: "\u6682\u65E0\u5185\u5BB9"
    },
    // 是否识别 \n 等
    pre: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const inageStyle = (0, import_vue.computed)(() => {
      let style = props.imageSize;
      if (!Array.isArray(props.imageSize))
        style = [props.imageSize, props.imageSize];
      return style;
    });
    const theStyle = (0, import_vue.computed)(() => {
      const { customStyle, descSize } = props;
      const s = descSize ? `font-size:${(0, import_utils.transformSize)(descSize)}` : "";
      return (0, import_utils.transformStyleSize)(customStyle) + s;
    });
    return {
      theStyle,
      inageStyle
    };
  }
});
const _hoisted_1 = { class: "fan-empty__bottom" };
function __vue_render__(_ctx, _cache) {
  const _component_FanImage = (0, import_vue2.resolveComponent)("FanImage");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      class: "fan-empty"
    },
    [
      (0, import_vue2.createVNode)(_component_FanImage, {
        src: _ctx.image,
        width: _ctx.inageStyle[0],
        height: _ctx.inageStyle[1]
      }, null, 8, ["src", "width", "height"]),
      _ctx.description ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "p",
        {
          key: 0,
          class: (0, import_vue2.normalizeClass)(["fan-empty__desc", { pre: _ctx.pre }])
        },
        (0, import_vue2.toDisplayString)(_ctx.description),
        3
        /* TEXT, CLASS */
      )) : (0, import_vue2.createCommentVNode)("v-if", true),
      (0, import_vue2.createElementVNode)("div", _hoisted_1, [
        (0, import_vue2.renderSlot)(_ctx.$slots, "default")
      ])
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
