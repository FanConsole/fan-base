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
var import_contact_button_sfc = require("./contact-button-sfc.css");
var import_vue = require("vue");
var import_contact_panel = __toESM(require("../contact-panel/contact-panel.js"));
var import_popup = __toESM(require("../popup/popup.js"));
var import_button = __toESM(require("../button/button.js"));
var import_utils = require("../utils");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("ContactButton")[0],
  components: { FanContactPanel: import_contact_panel.default, FanPopup: import_popup.default, FanButton: import_button.default },
  props: {
    // 优先级最高
    phone: String,
    picture: String,
    time: String,
    timeStyle: String,
    url: String,
    /**
     * 是否以绝对定位撑满父盒子，可以作为遮罩mask使用
     */
    full: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(props) {
    const showPop = (0, import_vue.ref)(false);
    const onClick = () => {
      if (props.url) {
        location.href = props.url;
        return;
      }
      showPop.value = true;
    };
    return { showPop, onClick };
  }
});
const _hoisted_1 = {
  class: "fan-hairline--top fan-hairline--bottom",
  style: { "padding": "24px 12px 30px" }
};
function __vue_render__(_ctx, _cache) {
  const _component_FanContactPanel = (0, import_vue2.resolveComponent)("FanContactPanel");
  const _component_FanButton = (0, import_vue2.resolveComponent)("FanButton");
  const _component_FanPopup = (0, import_vue2.resolveComponent)("FanPopup");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    import_vue2.Fragment,
    null,
    [
      (0, import_vue2.createElementVNode)(
        "div",
        {
          class: (0, import_vue2.normalizeClass)(["fan-contact-btn", { "fan-contact-btn--full": _ctx.full }]),
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        },
        [
          (0, import_vue2.renderSlot)(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      ),
      (0, import_vue2.createVNode)(_component_FanPopup, {
        show: _ctx.showPop,
        "onUpdate:show": _cache[2] || (_cache[2] = ($event) => _ctx.showPop = $event),
        title: "\u5BA2\u670D\u8054\u7CFB\u65B9\u5F0F",
        round: "",
        "cont-style": "width: 82%"
      }, {
        default: (0, import_vue2.withCtx)(() => [
          (0, import_vue2.createElementVNode)("div", _hoisted_1, [
            (0, import_vue2.createVNode)(_component_FanContactPanel, {
              phone: _ctx.phone,
              picture: _ctx.picture,
              time: _ctx.time,
              "time-style": _ctx.timeStyle,
              background: "var(--fan-primary-color-1)"
            }, null, 8, ["phone", "picture", "time", "time-style"])
          ]),
          (0, import_vue2.createVNode)(_component_FanButton, {
            block: "",
            plain: "",
            border: false,
            "text-size": "16px",
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.showPop = false)
          }, {
            default: (0, import_vue2.withCtx)(() => [
              (0, import_vue2.createTextVNode)("\u5173\u95ED")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["show"])
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
