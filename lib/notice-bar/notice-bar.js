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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_notice_bar_sfc = require("./notice-bar-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_icon = __toESM(require("../icon/icon.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("NoticeBar")[0],
  components: { FanIcon: import_icon.default },
  props: {
    text: String,
    speed: {
      type: [Number, String],
      default: 9
    },
    icon: String,
    iconSize: {
      type: [String, Number],
      default: 14
    },
    iconColor: {
      type: String
    },
    textSize: {
      type: [Number, String],
      default: 14
    },
    color: {
      type: String,
      default: "#f60"
    },
    bg: {
      type: String,
      default: "#fff7cc"
    },
    scrollable: {
      type: [Boolean, Number],
      default: 0
    },
    multiline: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const txtWidth = (0, import_vue.ref)(0);
    const boxWidth = (0, import_vue.ref)(0);
    const style = (0, import_vue.ref)("");
    const theStyle = (0, import_vue.computed)({
      set: (val) => {
        if (val)
          style.value = (0, import_utils.transformStyleSize)(val);
      },
      get: () => {
        const { color, bg, textSize } = props;
        let s = `color:${color};background:${bg};`;
        s += `font-size:${(0, import_utils.transformSize)(textSize)};`;
        return s + style.value;
      }
    });
    const textBoxStyle = (0, import_vue.computed)(() => {
      const { multiline, scrollable } = props;
      let { speed } = props;
      let s = `white-space:${!multiline ? "nowrap" : "normal"};`;
      if (scrollable === false && !multiline) {
        return s += `width:100%;overflow:hidden;text-overflow:ellipsis;`;
      }
      if (multiline)
        return s;
      if (typeof speed === "string" && speed.includes("s")) {
        speed = speed.substring(0, speed.length - 1);
      }
      if ((scrollable || boxWidth.value <= txtWidth.value) && speed) {
        return s += `animation: wordsLoop ${speed}s linear infinite`;
      }
    });
    const theIconColor = (0, import_vue.computed)(() => {
      const { icon, iconColor, color } = props;
      if (iconColor || !icon)
        return iconColor;
      return icon.includes("/") ? iconColor : color;
    });
    const _this = (0, import_vue.getCurrentInstance)();
    const getWidth = () => __async(this, null, function* () {
      const rect = yield (0, import_utils.getElementBounding)({
        selector: ".fan-notice-bar__r",
        scope: _this
      });
      const rect1 = yield (0, import_utils.getElementBounding)({
        selector: ".fan-notice-bar__text",
        scope: _this
      });
      boxWidth.value = rect.width;
      txtWidth.value = rect1.width;
      theStyle.value = `--notice-bar-var:${rect.width}px;`;
    });
    (0, import_vue.onMounted)(() => getWidth());
    return { theStyle, textBoxStyle, theIconColor };
  }
});
const _hoisted_1 = {
  key: 0,
  class: "fan-notice-bar__l"
};
const _hoisted_2 = { class: "fan-flex-1 fan-notice-bar__r" };
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: "fan-flex fan-align-start fan-notice-bar",
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle)
    },
    [
      _ctx.icon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
        (0, import_vue2.createVNode)(_component_FanIcon, {
          name: _ctx.icon,
          color: _ctx.theIconColor,
          size: _ctx.iconSize,
          "custom-style": "vertical-align:middle;"
        }, null, 8, ["name", "color", "size"])
      ])) : (0, import_vue2.createCommentVNode)("v-if", true),
      (0, import_vue2.createElementVNode)("div", _hoisted_2, [
        (0, import_vue2.createElementVNode)(
          "div",
          {
            class: "fan-notice-bar__text",
            style: (0, import_vue2.normalizeStyle)(_ctx.textBoxStyle)
          },
          (0, import_vue2.toDisplayString)(_ctx.text),
          5
          /* TEXT, STYLE */
        )
      ])
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
