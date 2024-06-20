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
import "./notice-bar-sfc.css";
import {
  defineComponent,
  computed,
  getCurrentInstance,
  onMounted,
  ref
} from "vue";
import {
  createNamespace,
  transformStyleSize,
  transformSize,
  getElementBounding
} from "../utils";
import FanIcon from "../icon/icon.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("NoticeBar")[0],
  components: { FanIcon },
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
    const txtWidth = ref(0);
    const boxWidth = ref(0);
    const style = ref("");
    const theStyle = computed({
      set: (val) => {
        if (val)
          style.value = transformStyleSize(val);
      },
      get: () => {
        const { color, bg, textSize } = props;
        let s = `color:${color};background:${bg};`;
        s += `font-size:${transformSize(textSize)};`;
        return s + style.value;
      }
    });
    const textBoxStyle = computed(() => {
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
    const theIconColor = computed(() => {
      const { icon, iconColor, color } = props;
      if (iconColor || !icon)
        return iconColor;
      return icon.includes("/") ? iconColor : color;
    });
    const _this = getCurrentInstance();
    const getWidth = () => __async(this, null, function* () {
      const rect = yield getElementBounding({
        selector: ".fan-notice-bar__r",
        scope: _this
      });
      const rect1 = yield getElementBounding({
        selector: ".fan-notice-bar__text",
        scope: _this
      });
      boxWidth.value = rect.width;
      txtWidth.value = rect1.width;
      theStyle.value = `--notice-bar-var:${rect.width}px;`;
    });
    onMounted(() => getWidth());
    return { theStyle, textBoxStyle, theIconColor };
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode } from "vue";
const _hoisted_1 = {
  key: 0,
  class: "fan-notice-bar__l"
};
const _hoisted_2 = { class: "fan-flex-1 fan-notice-bar__r" };
function __vue_render__(_ctx, _cache) {
  const _component_FanIcon = _resolveComponent("FanIcon");
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: "fan-flex fan-align-start fan-notice-bar",
      style: _normalizeStyle(_ctx.theStyle)
    },
    [
      _ctx.icon ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
        _createVNode(_component_FanIcon, {
          name: _ctx.icon,
          color: _ctx.theIconColor,
          size: _ctx.iconSize,
          "custom-style": "vertical-align:middle;"
        }, null, 8, ["name", "color", "size"])
      ])) : _createCommentVNode("v-if", true),
      _createElementVNode("div", _hoisted_2, [
        _createElementVNode(
          "div",
          {
            class: "fan-notice-bar__text",
            style: _normalizeStyle(_ctx.textBoxStyle)
          },
          _toDisplayString(_ctx.text),
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
export {
  stdin_default as default
};
