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
var import_dropdown_menu_sfc = require("./dropdown-menu-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_helper = require("./helper");
var import_hooks = require("../hooks");
var import_icon = __toESM(require("../icon/icon.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("DropdownMenu")[0],
  components: { FanIcon: import_icon.default },
  props: {
    border: Boolean,
    offset: {
      type: [Number, Object],
      default: null
    },
    zIndex: Number,
    height: [String, Number],
    color: String,
    activeColor: String
  },
  emits: ["toggle"],
  setup(props, { emit }) {
    const _this = (0, import_vue.getCurrentInstance)();
    const innerOffset = (0, import_vue.ref)(0);
    const barStyle = (0, import_vue.computed)(() => {
      const { height, color } = props;
      let s = "";
      if (color)
        s += `color:${color};`;
      if (height)
        s += `height:${(0, import_utils.transformSize)(height)};`;
      return s;
    });
    const containerStyle = (0, import_vue.computed)(() => {
      const { activeColor, zIndex } = props;
      let s = "";
      if (activeColor)
        s += `--fan-dropdown-active-color:${activeColor};`;
      if (zIndex)
        s += `--fan-dropdown-menu-zindex:${zIndex};`;
      return s;
    });
    const { children, linkChildren } = (0, import_helper.useChildren)("fanDropdownMenu");
    const opened = (0, import_vue.computed)(
      () => children.some((item) => {
        var _a;
        return (_a = item.state) == null ? void 0 : _a.showWrapper;
      })
    );
    let bodyOverflow = "";
    (0, import_vue.watch)(opened, (val) => {
      const bodyStyle = document.body.style;
      if (val) {
        bodyOverflow = bodyStyle.overflow;
        bodyStyle.setProperty("overflow", "hidden", "important");
      } else {
        bodyStyle.setProperty("overflow", bodyOverflow);
      }
      emit("toggle", { opened: val });
    });
    linkChildren({ props, offset: innerOffset });
    const { pageScrollTo, onPageScroll } = (0, import_hooks.usePageLifecycle)();
    let scrollTop = 0;
    onPageScroll((e) => {
      scrollTop = e.scrollTop;
    });
    const itemClick = (i) => __async(this, null, function* () {
      const item = children[i];
      const _opened = opened.value;
      if (!item.state.showWrapper && _opened) {
        children.forEach((a) => a.toggle(false));
      }
      const rect = yield (0, import_utils.getElementBounding)({
        selector: ".fan-dropdown-menu__bar",
        scope: _this
      });
      if (props.offset === null) {
        innerOffset.value = (rect == null ? void 0 : rect.bottom) || 0;
      } else {
        pageScrollTo({
          scrollTop: scrollTop + ((rect == null ? void 0 : rect.top) || 0) - props.offset,
          duration: 0
        });
        innerOffset.value = (props.offset || 0) + ((rect == null ? void 0 : rect.height) || 0);
      }
      item.toggle(void 0, { immediateBg: _opened });
    });
    const emptyFunc = () => null;
    return { barStyle, containerStyle, children, opened, itemClick, emptyFunc };
  }
});
const _hoisted_1 = ["onClick"];
const _hoisted_2 = { class: "fan-ellipsis" };
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      style: (0, import_vue2.normalizeStyle)(_ctx.containerStyle),
      class: "fan-dropdown-menu"
    },
    [
      (0, import_vue2.createElementVNode)(
        "div",
        {
          style: (0, import_vue2.normalizeStyle)(_ctx.barStyle),
          class: (0, import_vue2.normalizeClass)(["fan-dropdown-menu__bar", {
            "fan-hairline--bottom": _ctx.border,
            "fan-dropdown-menu__bar--opened": _ctx.opened
          }]),
          onTouchmove: _cache[0] || (_cache[0] = (0, import_vue2.withModifiers)((...args) => _ctx.emptyFunc && _ctx.emptyFunc(...args), ["stop", "prevent"]))
        },
        [
          ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
            import_vue2.Fragment,
            null,
            (0, import_vue2.renderList)(_ctx.children, (item, index) => {
              return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", {
                key: index,
                class: (0, import_vue2.normalizeClass)(["fan-dropdown-menu__item", {
                  "fan-dropdown-menu--active": item.active || item.state.showWrapper
                }]),
                onClick: ($event) => _ctx.itemClick(index)
              }, [
                (0, import_vue2.createElementVNode)(
                  "div",
                  _hoisted_2,
                  (0, import_vue2.toDisplayString)(item.title),
                  1
                  /* TEXT */
                ),
                item.theIcon.name ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
                  key: 0,
                  name: item.theIcon.name,
                  size: item.iconSize,
                  color: item.theIcon.color,
                  "custom-style": "margin:1px 0 0 3px;"
                }, null, 8, ["name", "size", "color"])) : (0, import_vue2.createCommentVNode)("v-if", true)
              ], 10, _hoisted_1);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      ),
      (0, import_vue2.renderSlot)(_ctx.$slots, "default")
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
