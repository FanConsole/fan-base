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
var import_rate_sfc = require("./rate-sfc.css");
var import_vue = require("vue");
var import_icon = __toESM(require("../icon/icon.js"));
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Rate")[0],
  components: { FanIcon: import_icon.default },
  props: {
    // 当前评分
    modelValue: {
      type: [Number, String],
      default: 1
    },
    // 图标名称
    icon: {
      type: String,
      default: "star-fill"
    },
    // 星星未选中的颜色
    color: {
      type: String,
      default: "#ececec"
    },
    // 星星选中状态颜色
    activeColor: {
      type: String,
      default: "#ffca3e"
    },
    // 星星禁用状态颜色
    disabledColor: {
      type: String,
      default: "#c0c0c0"
    },
    // 星星的大小
    size: {
      type: [Number, String],
      default: 24
    },
    // 图标总数
    count: {
      type: [Number, String],
      default: 5
    },
    // 星星的间距
    space: [String, Number],
    // 是否可点击
    disabled: {
      type: [Boolean, String],
      default: false
    },
    // 是否只读
    readonly: {
      type: [Boolean, String],
      default: true
    },
    // 是否显示半星
    allowHalf: {
      type: [Boolean, String],
      default: false
    },
    // todo: 是否支持滑动手势
    touchable: {
      type: [Boolean, String],
      default: false
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, context) {
    const theStyle = (0, import_vue.computed)(() => {
      const { space } = props;
      const s = space ? `--fan-rate-space:${(0, import_utils.transformSize)(space)};` : "";
      return s;
    });
    const value = (0, import_vue.ref)(0);
    (0, import_vue.watch)(
      () => props.modelValue,
      (val) => {
        const n = Number(val) || 0;
        if (value.value === n)
          return;
        value.value = n;
      },
      { immediate: true }
    );
    (0, import_vue.watch)(value, (val) => {
      if (val === props.modelValue)
        return;
      context.emit("update:modelValue", val);
      context.emit("change", val);
    });
    const stars = (0, import_vue.computed)(() => {
      const val = value.value;
      const list = [];
      const floorValue = Math.floor(val);
      const ceilValue = Math.ceil(val);
      for (let i = 0; i < props.count; i++) {
        let activeWidth = "0";
        if (floorValue > i) {
          activeWidth = "100%";
        } else if (ceilValue - 1 === i) {
          activeWidth = (val - floorValue) * 100 + "%";
        }
        list.push({ activeWidth });
      }
      return list;
    });
    return { theStyle, stars };
  }
});
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle),
      class: "fan-rate"
    },
    [
      ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
        import_vue2.Fragment,
        null,
        (0, import_vue2.renderList)(_ctx.stars, (star, index) => {
          return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", {
            key: index,
            class: "fan-rate__icon"
          }, [
            (0, import_vue2.createVNode)(_component_FanIcon, {
              color: _ctx.color,
              size: _ctx.size,
              name: _ctx.icon
            }, null, 8, ["color", "size", "name"]),
            (0, import_vue2.createElementVNode)(
              "div",
              {
                style: (0, import_vue2.normalizeStyle)({ width: star.activeWidth }),
                class: "fan-rate__icon-on"
              },
              [
                (0, import_vue2.createVNode)(_component_FanIcon, {
                  color: _ctx.disabled ? _ctx.disabledColor : _ctx.activeColor,
                  size: _ctx.size,
                  name: _ctx.icon
                }, null, 8, ["color", "size", "name"])
              ],
              4
              /* STYLE */
            )
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
