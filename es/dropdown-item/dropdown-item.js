import "./dropdown-item-sfc.css";
import { computed, defineComponent, nextTick, reactive, ref, watch } from "vue";
import { createNamespace, transformStyleSize } from "../utils";
import { useParent } from "./helper";
import FanIcon from "../icon/icon.js";
import DropdownItemContent from "./dropdown-item-content.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("DropdownItem")[0],
  components: { FanIcon, DropdownItemContent },
  props: {
    title: String,
    contentStyle: [String, Object],
    modelValue: {
      type: [Number, String],
      default: 0
    },
    active: Boolean,
    // 设为false则不显示图标
    icon: {
      type: [String, Boolean],
      default: ""
    },
    iconSize: {
      type: [String, Number],
      default: "12px"
    },
    options: {
      type: Array,
      default: () => []
    },
    /**
     * option-title 取值
     */
    titleProp: {
      type: String,
      default: "text"
    },
    /**
     * modelValue 的值的来源，默认 options 数组下标
     */
    valueProp: {
      type: String,
      default: "value"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 选项内容是否使用滚动区域
    scroll: {
      type: Boolean,
      default: false
    },
    scrollHeight: {
      type: [String, Boolean],
      default: "61.8vh"
    }
  },
  expose: ["toggle"],
  emits: ["update:modelValue", "change", "update:title"],
  setup(props, context) {
    const state = reactive({
      showWrapper: false
    });
    const theContentStyle = computed(
      () => transformStyleSize(props.contentStyle)
    );
    const theIcon = computed(() => {
      let name = props.icon !== false ? props.icon || "caret-down" : "";
      if (name === "caret-down" && state.showWrapper)
        name = "caret-up";
      return {
        name,
        color: props.active || state.showWrapper || props.icon ? "currentColor" : "rgba(0,0,0,0.1)"
      };
    });
    const formatOptions = (data, titleProp, valueProp) => {
      if (!(data == null ? void 0 : data.length))
        return null;
      return data.map((a, i) => {
        return {
          title: titleProp ? a[titleProp] : a,
          value: valueProp ? a[valueProp] : i,
          children: formatOptions(a.children, titleProp, valueProp)
        };
      });
    };
    const theOptions = computed(() => {
      const { options, titleProp, valueProp } = props;
      return formatOptions(options, titleProp, valueProp) || [];
    });
    const column2 = computed(() => {
      return theOptions.value.some((a) => a.children);
    });
    const column1Active = ref(0);
    const setColumn1Active = (val) => {
      var _a;
      if (typeof val !== "undefined") {
        column1Active.value = val;
        return;
      }
      if (!column2.value)
        return;
      const item1 = theOptions.value.find((a) => {
        var _a2;
        if (!((_a2 = a.children) == null ? void 0 : _a2.length))
          return a.value === props.modelValue;
        return a.children.some((b) => b.value === props.modelValue);
      });
      const newVal = item1 ? item1.value : ((_a = theOptions.value[0]) == null ? void 0 : _a.value) || 0;
      if (column1Active.value !== newVal) {
        column1Active.value = newVal;
      }
    };
    watch(
      () => props.modelValue,
      (val) => setColumn1Active(val),
      { immediate: true }
    );
    const column2Options = computed(() => {
      const item1 = theOptions.value.find(
        (a) => a.value === column1Active.value
      );
      return (item1 == null ? void 0 : item1.children) || [];
    });
    const { parent } = useParent("fanDropdownMenu");
    const offsetStyle = computed(() => {
      return `top:${parent.offset.value}px;`;
    });
    const animateContent = ref(false);
    const animateBg = ref(false);
    const toggle = (show = !state.showWrapper, options) => {
      if (props.disabled || !context.slots.default && !theOptions.value.length || show === state.showWrapper) {
        return;
      }
      state.showWrapper = show;
      if (show) {
        setColumn1Active();
        animateContent.value = true;
        if (typeof (options == null ? void 0 : options.immediateBg) === "undefined" || !options.immediateBg)
          animateBg.value = true;
        setTimeout(() => {
          animateContent.value = false;
          animateBg.value = false;
        }, 1e3 / 60);
      }
    };
    const emptyFunc = () => null;
    const itemClick = (opt) => {
      const val = opt.value;
      if (opt.children) {
        setColumn1Active(val);
        return;
      }
      if (val !== props.modelValue) {
        context.emit("update:modelValue", val);
        nextTick(() => {
          context.emit("update:title", opt.title);
          context.emit("change", val, opt);
        });
      }
      toggle();
    };
    return {
      theContentStyle,
      theIcon,
      state,
      offsetStyle,
      animateContent,
      animateBg,
      theOptions,
      column2,
      column2Options,
      column1Active,
      toggle,
      emptyFunc,
      itemClick
    };
  }
});
import { withModifiers as _withModifiers, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, resolveComponent as _resolveComponent, withCtx as _withCtx, createVNode as _createVNode, createBlock as _createBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, normalizeStyle as _normalizeStyle, vShow as _vShow, withDirectives as _withDirectives } from "vue";
const _hoisted_1 = { class: "fan-dropdown-item" };
const _hoisted_2 = {
  key: 0,
  class: "fan-flex"
};
const _hoisted_3 = { class: "fan-dropdown-item__col1" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = { class: "fan-flex-1 fan-ellipsis" };
const _hoisted_6 = { class: "fan-dropdown-item__col2" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "fan-flex-1 fan-ellipsis" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = { class: "fan-flex-1 fan-ellipsis" };
function __vue_render__(_ctx, _cache) {
  const _component_DropdownItemContent = _resolveComponent("DropdownItemContent");
  const _component_FanIcon = _resolveComponent("FanIcon");
  return _withDirectives((_openBlock(), _createElementBlock(
    "div",
    _hoisted_1,
    [
      _createElementVNode("div", {
        class: "fan-dropdown-item__overlay",
        onClick: _cache[0] || (_cache[0] = _withModifiers(($event) => _ctx.toggle(false), ["stop"]))
      }),
      _createElementVNode(
        "div",
        {
          style: _normalizeStyle(_ctx.offsetStyle),
          class: "fan-dropdown-item__main"
        },
        [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass(["fan-dropdown-item__bg", { "fan-dropdown--fade": _ctx.animateBg }]),
              onClick: _cache[1] || (_cache[1] = _withModifiers(($event) => _ctx.toggle(false), ["stop"]))
            },
            null,
            2
            /* CLASS */
          ),
          _createElementVNode(
            "div",
            {
              style: _normalizeStyle(_ctx.theContentStyle),
              class: _normalizeClass(["fan-dropdown-item__content", { "fan-dropdown--slide": _ctx.animateContent }])
            },
            [
              _ctx.column2 ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
                _createElementVNode("div", _hoisted_3, [
                  _createVNode(_component_DropdownItemContent, {
                    scroll: _ctx.scroll,
                    "scroll-height": _ctx.scrollHeight
                  }, {
                    default: _withCtx(() => [
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(_ctx.theOptions, (opt, index) => {
                          return _openBlock(), _createElementBlock("div", {
                            key: index,
                            class: _normalizeClass(["fan-dropdown-item__cell", {
                              "fan-dropdown-item--active": _ctx.column1Active === opt.value
                            }]),
                            onClick: ($event) => _ctx.itemClick(opt)
                          }, [
                            _createElementVNode(
                              "div",
                              _hoisted_5,
                              _toDisplayString(opt.title),
                              1
                              /* TEXT */
                            )
                          ], 10, _hoisted_4);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["scroll", "scroll-height"])
                ]),
                _createElementVNode("div", _hoisted_6, [
                  _createVNode(_component_DropdownItemContent, {
                    scroll: _ctx.scroll,
                    "scroll-height": _ctx.scrollHeight
                  }, {
                    default: _withCtx(() => [
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(_ctx.column2Options, (opt, index) => {
                          return _openBlock(), _createElementBlock("div", {
                            key: index,
                            class: _normalizeClass(["fan-hairline--bottom fan-dropdown-item__cell", {
                              "fan-dropdown-item--active": _ctx.modelValue === opt.value
                            }]),
                            onClick: ($event) => _ctx.itemClick(opt)
                          }, [
                            _createElementVNode(
                              "div",
                              _hoisted_8,
                              _toDisplayString(opt.title),
                              1
                              /* TEXT */
                            ),
                            _ctx.modelValue === opt.value ? (_openBlock(), _createBlock(_component_FanIcon, {
                              key: 0,
                              name: "check-circle-fill",
                              color: "var(--fan-dropdown-active-color)",
                              size: "18px"
                            })) : _createCommentVNode("v-if", true)
                          ], 10, _hoisted_7);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["scroll", "scroll-height"])
                ])
              ])) : (_openBlock(), _createBlock(_component_DropdownItemContent, {
                key: 1,
                scroll: _ctx.scroll,
                "scroll-height": _ctx.scrollHeight
              }, {
                default: _withCtx(() => [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(_ctx.theOptions, (opt, index) => {
                      return _openBlock(), _createElementBlock("div", {
                        key: index,
                        class: _normalizeClass(["fan-hairline--bottom fan-dropdown-item__cell", { "fan-dropdown-item--active": _ctx.modelValue === opt.value }]),
                        onClick: ($event) => _ctx.itemClick(opt)
                      }, [
                        _createElementVNode(
                          "div",
                          _hoisted_10,
                          _toDisplayString(opt.title),
                          1
                          /* TEXT */
                        ),
                        _ctx.modelValue === opt.value ? (_openBlock(), _createBlock(_component_FanIcon, {
                          key: 0,
                          name: "check-circle-fill",
                          color: "var(--fan-dropdown-active-color)",
                          size: "18px"
                        })) : _createCommentVNode("v-if", true)
                      ], 10, _hoisted_9);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["scroll", "scroll-height"])),
              _renderSlot(_ctx.$slots, "default")
            ],
            6
            /* CLASS, STYLE */
          )
        ],
        4
        /* STYLE */
      )
    ],
    512
    /* NEED_PATCH */
  )), [
    [_vShow, _ctx.state.showWrapper]
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
