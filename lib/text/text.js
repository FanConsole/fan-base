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
var import_text_sfc = require("./text-sfc.css");
var import_vue = require("vue");
var import_icon = __toESM(require("../icon/icon.js"));
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Text")[0],
  options: {
    // https://uniapp.dcloud.io/matter.html#mp
    virtualHost: true
  },
  components: {
    FanIcon: import_icon.default
  },
  props: {
    // 是否显示内层白框
    inner: {
      type: [Boolean, String],
      default: false
    },
    innerRadius: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    textSize: {
      type: [String, Number],
      default: "14"
    },
    bold: {
      type: [Boolean, Number, String],
      default: false
    },
    align: {
      type: String,
      default: "left"
      // center, right
    },
    color: {
      type: String
    },
    // 行高
    lineHeight: {
      type: [String, Number],
      default: 1.4
    },
    // 图标前缀
    prefixIcon: {
      type: String
    },
    iconSize: {
      type: [String, Number]
    },
    iconRadius: {
      type: String,
      default: "4px"
    },
    iconColor: String,
    // 图标与文字间距
    iconSpace: {
      type: [String, Number]
    },
    // 最多展示行数，超出显示省略号，目前只支持 1，2，3
    line: Number
  },
  setup(props) {
    const theStyle = (0, import_vue.computed)(() => {
      const {
        customStyle,
        textSize,
        bold,
        align,
        color,
        lineHeight,
        iconSize,
        iconSpace
      } = props;
      let s = "";
      if (!(0, import_utils.isCssRelativeSize)(textSize) && /(Chrome|Safari)/.test(window == null ? void 0 : window.navigator.userAgent)) {
        let zoom = parseFloat(textSize, 10) / 12;
        if (zoom < 1)
          s += `zoom:${zoom};`;
      }
      let theIconSize = (0, import_utils.transformSize)(iconSize);
      const fsize = (0, import_utils.transformSize)(textSize);
      const fsizeValue = parseFloat(fsize, 10);
      const lh = String(lineHeight).includes("px") ? parseFloat(String(lineHeight)) / fsizeValue : lineHeight;
      if (fsizeValue) {
        if (!theIconSize) {
          const unit = fsize.replace(/[0-9.]/g, "");
          theIconSize = fsizeValue * 1.2 + unit;
        }
        s += `font-size:${fsize};`;
      }
      if (lh) {
        s += `line-height:${lh};`;
      }
      if (bold) {
        if (typeof bold === "number" || typeof bold === "string" && Number(bold) >= 100) {
          s += `font-weight:${bold};`;
        } else {
          s += `font-weight:var(--fan-text-mbold);`;
        }
      }
      if (align) {
        s += `text-align:${align};`;
      }
      if (color) {
        s += `color:${color};`;
      }
      let ibox = "";
      if (iconSpace)
        ibox += `margin-right:${(0, import_utils.transformSize)(iconSpace)};`;
      return {
        style: (0, import_utils.transformStyleSize)(customStyle) + s,
        iconSize: theIconSize,
        ibox
      };
    });
    return { theStyle };
  }
});
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle.style),
      class: "fan-bg-container fan2-text"
    },
    [
      (0, import_vue2.createElementVNode)(
        "div",
        {
          class: (0, import_vue2.normalizeClass)(["fan2-text__inner", [
            { box: _ctx.inner },
            { "fan-ellipsis": _ctx.line === 1 },
            { "fan-multi-ellipsis--l2": _ctx.line === 2 },
            { "fan-multi-ellipsis--l3": _ctx.line === 3 }
          ]]),
          style: (0, import_vue2.normalizeStyle)({ borderRadius: _ctx.innerRadius })
        },
        [
          (0, import_vue2.createCommentVNode)(" \u5C0F\u7A0B\u5E8F\u6587\u672C\u5916\u7684\u5C5E\u6027\u4E0D\u8BC6\u522B em \u5C3A\u5BF8 "),
          _ctx.prefixIcon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
            "div",
            {
              key: 0,
              class: "fan2-text__icon",
              style: (0, import_vue2.normalizeStyle)(_ctx.theStyle.ibox)
            },
            [
              (0, import_vue2.createVNode)(_component_FanIcon, {
                name: _ctx.prefixIcon,
                size: _ctx.theStyle.iconSize,
                color: _ctx.iconColor,
                "vertical-align": "middle",
                "custom-style": { borderRadius: _ctx.iconRadius }
              }, null, 8, ["name", "size", "color", "custom-style"])
            ],
            4
            /* STYLE */
          )) : (0, import_vue2.createCommentVNode)("v-if", true),
          (0, import_vue2.createElementVNode)(
            "span",
            {
              "user-select": "",
              selectable: "",
              space: "nbsp",
              class: "fan2-text__span",
              style: (0, import_vue2.normalizeStyle)({ verticalAlign: !_ctx.prefixIcon ? "baseline" : "middle" })
            },
            [
              (0, import_vue2.createTextVNode)(
                (0, import_vue2.toDisplayString)(_ctx.text),
                1
                /* TEXT */
              ),
              (0, import_vue2.renderSlot)(_ctx.$slots, "default")
            ],
            4
            /* STYLE */
          )
        ],
        6
        /* CLASS, STYLE */
      )
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
