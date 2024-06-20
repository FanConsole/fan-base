import "./text-sfc.css";
import { computed, defineComponent } from "vue";
import FanIcon from "../icon/icon.js";
import {
  createNamespace,
  transformStyleSize,
  transformSize,
  isCssRelativeSize
} from "../utils";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Text")[0],
  options: {
    // https://uniapp.dcloud.io/matter.html#mp
    virtualHost: true
  },
  components: {
    FanIcon
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
    const theStyle = computed(() => {
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
      if (!isCssRelativeSize(textSize) && /(Chrome|Safari)/.test(window == null ? void 0 : window.navigator.userAgent)) {
        let zoom = parseFloat(textSize, 10) / 12;
        if (zoom < 1)
          s += `zoom:${zoom};`;
      }
      let theIconSize = transformSize(iconSize);
      const fsize = transformSize(textSize);
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
        ibox += `margin-right:${transformSize(iconSpace)};`;
      return {
        style: transformStyleSize(customStyle) + s,
        iconSize: theIconSize,
        ibox
      };
    });
    return { theStyle };
  }
});
import { createCommentVNode as _createCommentVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, renderSlot as _renderSlot, createTextVNode as _createTextVNode, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass } from "vue";
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = _resolveComponent("FanIcon");
  return _openBlock(), _createElementBlock(
    "div",
    {
      style: _normalizeStyle(_ctx.theStyle.style),
      class: "fan-bg-container fan2-text"
    },
    [
      _createElementVNode(
        "div",
        {
          class: _normalizeClass(["fan2-text__inner", [
            { box: _ctx.inner },
            { "fan-ellipsis": _ctx.line === 1 },
            { "fan-multi-ellipsis--l2": _ctx.line === 2 },
            { "fan-multi-ellipsis--l3": _ctx.line === 3 }
          ]]),
          style: _normalizeStyle({ borderRadius: _ctx.innerRadius })
        },
        [
          _createCommentVNode(" \u5C0F\u7A0B\u5E8F\u6587\u672C\u5916\u7684\u5C5E\u6027\u4E0D\u8BC6\u522B em \u5C3A\u5BF8 "),
          _ctx.prefixIcon ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: "fan2-text__icon",
              style: _normalizeStyle(_ctx.theStyle.ibox)
            },
            [
              _createVNode(_component_FanIcon, {
                name: _ctx.prefixIcon,
                size: _ctx.theStyle.iconSize,
                color: _ctx.iconColor,
                "vertical-align": "middle",
                "custom-style": { borderRadius: _ctx.iconRadius }
              }, null, 8, ["name", "size", "color", "custom-style"])
            ],
            4
            /* STYLE */
          )) : _createCommentVNode("v-if", true),
          _createElementVNode(
            "span",
            {
              "user-select": "",
              selectable: "",
              space: "nbsp",
              class: "fan2-text__span",
              style: _normalizeStyle({ verticalAlign: !_ctx.prefixIcon ? "baseline" : "middle" })
            },
            [
              _createTextVNode(
                _toDisplayString(_ctx.text),
                1
                /* TEXT */
              ),
              _renderSlot(_ctx.$slots, "default")
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
export {
  stdin_default as default
};
