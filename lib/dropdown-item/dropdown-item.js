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
var import_dropdown_item_sfc = require("./dropdown-item-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_helper = require("./helper");
var import_icon = __toESM(require("../icon/icon.js"));
var import_dropdown_item_content = __toESM(require("./dropdown-item-content.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("DropdownItem")[0],
  components: { FanIcon: import_icon.default, DropdownItemContent: import_dropdown_item_content.default },
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
    const state = (0, import_vue.reactive)({
      showWrapper: false
    });
    const theContentStyle = (0, import_vue.computed)(
      () => (0, import_utils.transformStyleSize)(props.contentStyle)
    );
    const theIcon = (0, import_vue.computed)(() => {
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
    const theOptions = (0, import_vue.computed)(() => {
      const { options, titleProp, valueProp } = props;
      return formatOptions(options, titleProp, valueProp) || [];
    });
    const column2 = (0, import_vue.computed)(() => {
      return theOptions.value.some((a) => a.children);
    });
    const column1Active = (0, import_vue.ref)(0);
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
    (0, import_vue.watch)(
      () => props.modelValue,
      (val) => setColumn1Active(val),
      { immediate: true }
    );
    const column2Options = (0, import_vue.computed)(() => {
      const item1 = theOptions.value.find(
        (a) => a.value === column1Active.value
      );
      return (item1 == null ? void 0 : item1.children) || [];
    });
    const { parent } = (0, import_helper.useParent)("fanDropdownMenu");
    const offsetStyle = (0, import_vue.computed)(() => {
      return `top:${parent.offset.value}px;`;
    });
    const animateContent = (0, import_vue.ref)(false);
    const animateBg = (0, import_vue.ref)(false);
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
        (0, import_vue.nextTick)(() => {
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
  const _component_DropdownItemContent = (0, import_vue2.resolveComponent)("DropdownItemContent");
  const _component_FanIcon = (0, import_vue2.resolveComponent)("FanIcon");
  return (0, import_vue2.withDirectives)(((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    _hoisted_1,
    [
      (0, import_vue2.createElementVNode)("div", {
        class: "fan-dropdown-item__overlay",
        onClick: _cache[0] || (_cache[0] = (0, import_vue2.withModifiers)(($event) => _ctx.toggle(false), ["stop"]))
      }),
      (0, import_vue2.createElementVNode)(
        "div",
        {
          style: (0, import_vue2.normalizeStyle)(_ctx.offsetStyle),
          class: "fan-dropdown-item__main"
        },
        [
          (0, import_vue2.createElementVNode)(
            "div",
            {
              class: (0, import_vue2.normalizeClass)(["fan-dropdown-item__bg", { "fan-dropdown--fade": _ctx.animateBg }]),
              onClick: _cache[1] || (_cache[1] = (0, import_vue2.withModifiers)(($event) => _ctx.toggle(false), ["stop"]))
            },
            null,
            2
            /* CLASS */
          ),
          (0, import_vue2.createElementVNode)(
            "div",
            {
              style: (0, import_vue2.normalizeStyle)(_ctx.theContentStyle),
              class: (0, import_vue2.normalizeClass)(["fan-dropdown-item__content", { "fan-dropdown--slide": _ctx.animateContent }])
            },
            [
              _ctx.column2 ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_2, [
                (0, import_vue2.createElementVNode)("div", _hoisted_3, [
                  (0, import_vue2.createVNode)(_component_DropdownItemContent, {
                    scroll: _ctx.scroll,
                    "scroll-height": _ctx.scrollHeight
                  }, {
                    default: (0, import_vue2.withCtx)(() => [
                      ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
                        import_vue2.Fragment,
                        null,
                        (0, import_vue2.renderList)(_ctx.theOptions, (opt, index) => {
                          return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", {
                            key: index,
                            class: (0, import_vue2.normalizeClass)(["fan-dropdown-item__cell", {
                              "fan-dropdown-item--active": _ctx.column1Active === opt.value
                            }]),
                            onClick: ($event) => _ctx.itemClick(opt)
                          }, [
                            (0, import_vue2.createElementVNode)(
                              "div",
                              _hoisted_5,
                              (0, import_vue2.toDisplayString)(opt.title),
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
                (0, import_vue2.createElementVNode)("div", _hoisted_6, [
                  (0, import_vue2.createVNode)(_component_DropdownItemContent, {
                    scroll: _ctx.scroll,
                    "scroll-height": _ctx.scrollHeight
                  }, {
                    default: (0, import_vue2.withCtx)(() => [
                      ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
                        import_vue2.Fragment,
                        null,
                        (0, import_vue2.renderList)(_ctx.column2Options, (opt, index) => {
                          return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", {
                            key: index,
                            class: (0, import_vue2.normalizeClass)(["fan-hairline--bottom fan-dropdown-item__cell", {
                              "fan-dropdown-item--active": _ctx.modelValue === opt.value
                            }]),
                            onClick: ($event) => _ctx.itemClick(opt)
                          }, [
                            (0, import_vue2.createElementVNode)(
                              "div",
                              _hoisted_8,
                              (0, import_vue2.toDisplayString)(opt.title),
                              1
                              /* TEXT */
                            ),
                            _ctx.modelValue === opt.value ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
                              key: 0,
                              name: "check-circle-fill",
                              color: "var(--fan-dropdown-active-color)",
                              size: "18px"
                            })) : (0, import_vue2.createCommentVNode)("v-if", true)
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
              ])) : ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_DropdownItemContent, {
                key: 1,
                scroll: _ctx.scroll,
                "scroll-height": _ctx.scrollHeight
              }, {
                default: (0, import_vue2.withCtx)(() => [
                  ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
                    import_vue2.Fragment,
                    null,
                    (0, import_vue2.renderList)(_ctx.theOptions, (opt, index) => {
                      return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", {
                        key: index,
                        class: (0, import_vue2.normalizeClass)(["fan-hairline--bottom fan-dropdown-item__cell", { "fan-dropdown-item--active": _ctx.modelValue === opt.value }]),
                        onClick: ($event) => _ctx.itemClick(opt)
                      }, [
                        (0, import_vue2.createElementVNode)(
                          "div",
                          _hoisted_10,
                          (0, import_vue2.toDisplayString)(opt.title),
                          1
                          /* TEXT */
                        ),
                        _ctx.modelValue === opt.value ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanIcon, {
                          key: 0,
                          name: "check-circle-fill",
                          color: "var(--fan-dropdown-active-color)",
                          size: "18px"
                        })) : (0, import_vue2.createCommentVNode)("v-if", true)
                      ], 10, _hoisted_9);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["scroll", "scroll-height"])),
              (0, import_vue2.renderSlot)(_ctx.$slots, "default")
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
    [import_vue2.vShow, _ctx.state.showWrapper]
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
