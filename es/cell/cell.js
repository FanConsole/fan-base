import "./cell-sfc.css";
import { defineComponent, computed } from "vue";
import { createNamespace, transformStyleSize } from "../utils";
import FanIcon from "../icon/icon.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Cell")[0],
  components: {
    FanIcon
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
    const theStyle = computed(() => {
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
      return transformStyleSize(obj);
    });
    const theTitleStyle = computed(() => {
      const { titleStyle, titleColor } = props;
      const obj = {};
      if (titleColor)
        obj["--fan-cell-title-color"] = titleColor;
      return transformStyleSize(titleStyle) + transformStyleSize(obj);
    });
    const theValueStyle = computed(() => {
      const { valueStyle, valueColor } = props;
      const obj = {};
      if (valueColor)
        obj["--fan-cell-value-color"] = valueColor;
      return transformStyleSize(valueStyle) + transformStyleSize(obj);
    });
    const theDescStyle = computed(() => {
      const { descStyle, descColor } = props;
      const obj = {};
      if (descColor)
        obj["--fan-cell-desc-color"] = descColor;
      return transformStyleSize(descStyle) + transformStyleSize(obj);
    });
    const onClick = (e) => {
      emit("click", e);
    };
    return { theStyle, theTitleStyle, theValueStyle, theDescStyle, onClick };
  }
});
import { resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, createVNode as _createVNode, createElementBlock as _createElementBlock } from "vue";
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = _resolveComponent("FanIcon");
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass(["fan-cell", {
        "fan-cell--center": _ctx.center
        // 'fan-cell--link': isLink
      }]),
      style: _normalizeStyle(_ctx.theStyle)
    },
    [
      _createElementVNode(
        "div",
        {
          class: _normalizeClass({
            "fan-cell-icon--center": _ctx.prefixIconCenter
          })
        },
        [
          _ctx.prefixIconCenter ? (_openBlock(), _createBlock(_component_FanIcon, {
            key: 0,
            name: _ctx.prefixIcon,
            color: _ctx.prefixIconColor,
            size: _ctx.prefixIconSize || _ctx.iconSize,
            class: "fan-cell-title-icon"
          }, null, 8, ["name", "color", "size"])) : _createCommentVNode("v-if", true),
          _createElementVNode("div", null, [
            _createElementVNode(
              "div",
              {
                class: "fan-cell-title",
                style: _normalizeStyle(_ctx.theTitleStyle)
              },
              [
                _renderSlot(_ctx.$slots, "title", {}, () => [
                  _renderSlot(_ctx.$slots, "prefix-icon", {}, () => [
                    _ctx.prefixIcon && !_ctx.prefixIconCenter ? (_openBlock(), _createBlock(_component_FanIcon, {
                      key: 0,
                      name: _ctx.prefixIcon,
                      color: _ctx.prefixIconColor,
                      size: _ctx.prefixIconSize || _ctx.iconSize,
                      class: "fan-cell-title-icon"
                    }, null, 8, ["name", "color", "size"])) : _createCommentVNode("v-if", true)
                  ]),
                  _createElementVNode(
                    "span",
                    null,
                    _toDisplayString(_ctx.title),
                    1
                    /* TEXT */
                  )
                ])
              ],
              4
              /* STYLE */
            ),
            _createElementVNode(
              "div",
              {
                class: "fan-cell-title-desc",
                style: _normalizeStyle(_ctx.theDescStyle)
              },
              [
                _renderSlot(_ctx.$slots, "desc", {}, () => [
                  _createTextVNode(
                    _toDisplayString(_ctx.desc),
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
      _createElementVNode(
        "div",
        {
          class: "fan-cell-content",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
          style: _normalizeStyle(_ctx.theValueStyle)
        },
        [
          _renderSlot(_ctx.$slots, "value", {}, () => [
            _createElementVNode(
              "span",
              null,
              _toDisplayString(_ctx.value),
              1
              /* TEXT */
            ),
            _renderSlot(_ctx.$slots, "suffix-icon", {}, () => [
              _createVNode(_component_FanIcon, {
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
export {
  stdin_default as default
};
