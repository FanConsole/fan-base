import "./contact-button-sfc.css";
import { defineComponent, ref } from "vue";
import FanContactPanel from "../contact-panel/contact-panel.js";
import FanPopup from "../popup/popup.js";
import FanButton from "../button/button.js";
import { createNamespace } from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("ContactButton")[0],
  components: { FanContactPanel, FanPopup, FanButton },
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
    const showPop = ref(false);
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
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, createTextVNode as _createTextVNode, withCtx as _withCtx, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = {
  class: "fan-hairline--top fan-hairline--bottom",
  style: { "padding": "24px 12px 30px" }
};
function __vue_render__(_ctx, _cache) {
  const _component_FanContactPanel = _resolveComponent("FanContactPanel");
  const _component_FanButton = _resolveComponent("FanButton");
  const _component_FanPopup = _resolveComponent("FanPopup");
  return _openBlock(), _createElementBlock(
    _Fragment,
    null,
    [
      _createElementVNode(
        "div",
        {
          class: _normalizeClass(["fan-contact-btn", { "fan-contact-btn--full": _ctx.full }]),
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        },
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      ),
      _createVNode(_component_FanPopup, {
        show: _ctx.showPop,
        "onUpdate:show": _cache[2] || (_cache[2] = ($event) => _ctx.showPop = $event),
        title: "\u5BA2\u670D\u8054\u7CFB\u65B9\u5F0F",
        round: "",
        "cont-style": "width: 82%"
      }, {
        default: _withCtx(() => [
          _createElementVNode("div", _hoisted_1, [
            _createVNode(_component_FanContactPanel, {
              phone: _ctx.phone,
              picture: _ctx.picture,
              time: _ctx.time,
              "time-style": _ctx.timeStyle,
              background: "var(--fan-primary-color-1)"
            }, null, 8, ["phone", "picture", "time", "time-style"])
          ]),
          _createVNode(_component_FanButton, {
            block: "",
            plain: "",
            border: false,
            "text-size": "16px",
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.showPop = false)
          }, {
            default: _withCtx(() => [
              _createTextVNode("\u5173\u95ED")
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
export {
  stdin_default as default
};
