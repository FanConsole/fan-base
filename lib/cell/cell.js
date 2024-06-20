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
var import_cell_sfc = require("./cell-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_icon = __toESM(require("../icon/icon.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Cell")[0],
  components: {
    FanIcon: import_icon.default
  },
  emits: ["click"],
  props: {
    title: {
      type: [String, Number],
      default: ""
    },
    titleStyle: [String, Object],
    value: {
      type: [String, Number],
      default: ""
    },
    valueStyle: [String, Object],
    desc: {
      type: [String, Number],
      default: ""
    },
    descStyle: [String, Object],
    center: {
      type: Boolean,
      default: false
    },
    width: String,
    height: String,
    margin: String,
    padding: String,
    radius: String,
    color: String,
    titleColor: String,
    valueColor: String,
    descColor: String,
    background: String,
    prefixIcon: String,
    suffixIcon: String,
    prefixIconCenter: {
      type: Boolean,
      default: false
    },
    suffixIconCenter: {
      type: Boolean,
      default: false
    },
    prefixIconColor: {
      type: String,
      default: "inherit"
    },
    suffixIconColor: {
      type: String,
      default: "inherit"
    },
    iconSize: [String, Number],
    prefixIconSize: [String, Number],
    suffixIconSize: [String, Number],
    prefixIconMargin: String
  },
  setup(props, { emit }) {
    const theStyle = (0, import_vue.computed)(() => {
      const { color, background, radius } = props;
      const obj = {};
      ["width", "height", "padding", "margin"].forEach(
        (k) => props[k] && (obj[k] = props[k])
      );
      const bg = background || "";
      if (bg)
        obj["--fan-cell-bg"] = bg;
      const c = color ? color : "";
      if (c)
        obj["--fan-cell-text-color"] = c;
      if (radius || radius === 0)
        obj["--fan-cell-border-radius"] = radius;
      return (0, import_utils.transformStyleSize)(obj);
    });
    const theTitleStyle = (0, import_vue.computed)(() => {
      const { titleStyle, titleColor } = props;
      const obj = {};
      if (titleColor)
        obj["--fan-cell-title-color"] = titleColor;
      return (0, import_utils.transformStyleSize)(titleStyle) + (0, import_utils.transformStyleSize)(obj);
    });
    const theValueStyle = (0, import_vue.computed)(() => {
      const { valueStyle, valueColor } = props;
      const obj = {};
      if (valueColor)
        obj["--fan-cell-value-color"] = valueColor;
      return (0, import_utils.transformStyleSize)(valueStyle) + (0, import_utils.transformStyleSize)(obj);
    });
    const theDescStyle = (0, import_vue.computed)(() => {
      const { descStyle, descColor } = props;
      const obj = {};
      if (descColor)
        obj["--fan-cell-desc-color"] = descColor;
      return (0, import_utils.transformStyleSize)(descStyle) + (0, import_utils.transformStyleSize)(obj);
    });
    const onClick = (e) => {
      emit("click", e);
    };
    return { theStyle, theTitleStyle, theValueStyle, theDescStyle, onClick };
  }
});
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: (0, import_vue2.normalizeClass)(["fan-cell", {
        "fan-cell--center": _ctx.center
        // 'fan-cell--link': isLink
      }]),
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle)
    },
    [
      (0, import_vue2.createElementVNode)(
        "div",
        {
          class: (0, import_vue2.normalizeClass)({
            "fan-cell-icon--center": _ctx.prefixIconCenter
          })
        },
        [
          _ctx.prefixIconCenter ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
            key: 0,
            name: _ctx.prefixIcon,
            color: _ctx.prefixIconColor,
            size: _ctx.prefixIconSize || _ctx.iconSize,
            class: "fan-cell-title-icon"
          }, null, 8, ["name", "color", "size"])) : (0, import_vue2.createCommentVNode)("v-if", true),
          (0, import_vue2.createElementVNode)("div", null, [
            (0, import_vue2.createElementVNode)(
              "div",
              {
                class: "fan-cell-title",
                style: (0, import_vue2.normalizeStyle)(_ctx.theTitleStyle)
              },
              [
                (0, import_vue2.renderSlot)(_ctx.$slots, "title", {}, () => [
                  (0, import_vue2.renderSlot)(_ctx.$slots, "prefix-icon", {}, () => [
                    _ctx.prefixIcon && !_ctx.prefixIconCenter ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
                      key: 0,
                      name: _ctx.prefixIcon,
                      color: _ctx.prefixIconColor,
                      size: _ctx.prefixIconSize || _ctx.iconSize,
                      class: "fan-cell-title-icon"
                    }, null, 8, ["name", "color", "size"])) : (0, import_vue2.createCommentVNode)("v-if", true)
                  ]),
                  (0, import_vue2.createElementVNode)(
                    "span",
                    null,
                    (0, import_vue2.toDisplayString)(_ctx.title),
                    1
                    /* TEXT */
                  )
                ])
              ],
              4
              /* STYLE */
            ),
            (0, import_vue2.createElementVNode)(
              "div",
              {
                class: "fan-cell-title-desc",
                style: (0, import_vue2.normalizeStyle)(_ctx.theDescStyle)
              },
              [
                (0, import_vue2.renderSlot)(_ctx.$slots, "desc", {}, () => [
                  (0, import_vue2.createTextVNode)(
                    (0, import_vue2.toDisplayString)(_ctx.desc),
                    1
                    /* TEXT */
                  )
                ])
              ],
              4
              /* STYLE */
            )
          ])
        ],
        2
        /* CLASS */
      ),
      (0, import_vue2.createElementVNode)(
        "div",
        {
          class: "fan-cell-content",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
          style: (0, import_vue2.normalizeStyle)(_ctx.theValueStyle)
        },
        [
          (0, import_vue2.renderSlot)(_ctx.$slots, "value", {}, () => [
            (0, import_vue2.createElementVNode)(
              "span",
              null,
              (0, import_vue2.toDisplayString)(_ctx.value),
              1
              /* TEXT */
            ),
            (0, import_vue2.renderSlot)(_ctx.$slots, "suffix-icon", {}, () => [
              (0, import_vue2.createVNode)(_component_FanIcon, {
                name: _ctx.suffixIcon,
                color: _ctx.suffixIconColor,
                size: _ctx.suffixIconSize || _ctx.iconSize,
                class: "fan-cell-content-icon"
              }, null, 8, ["name", "color", "size"])
            ])
          ])
        ],
        4
        /* STYLE */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
