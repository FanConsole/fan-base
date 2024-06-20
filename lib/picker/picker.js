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
var import_picker_sfc = require("./picker-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_popup = __toESM(require("../popup/popup.js"));
var import_button = __toESM(require("../button/button.js"));
var import_picker_column = __toESM(require("./picker-column.js"));
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Picker")[0],
  emits: ["confirm", "update:modelValue"],
  components: { FanPopup: import_popup.default, FanButton: import_button.default, PickerColumn: import_picker_column.default },
  props: {
    title: String,
    modelValue: {
      type: Boolean,
      default: false
    },
    /**
     * 格式1: item[]
     * 格式2-多列: [item[], item[], item[]]
     * 格式3-多列级联: item[]，其中 item 为带 children 的对象格式
     *
     * item格式：1-直接字符串: '杭州', 2-对象: { [valueKey]: '杭州', children?: item[], disabled?: false }
     */
    data: Array,
    // 选项对象中(item为对象格式时)，选项文字对应的键名
    textKey: {
      type: String,
      default: "text"
    },
    // 选择了每列中的第几个（下标从 0 开始）组成的数组
    value: {
      type: Array
    }
  },
  setup(props, { emit }) {
    const show = (0, import_vue.ref)(false);
    const list = (0, import_vue.ref)([]);
    const column = (0, import_vue.ref)();
    const selectValue = (0, import_vue.ref)(props.value);
    let isCascade = false;
    (0, import_vue.watch)(
      () => props.modelValue,
      (val) => {
        if (show.value !== val)
          show.value = val;
      }
    );
    (0, import_vue.watch)(show, (val) => {
      if (props.modelValue !== val)
        emit("update:modelValue", val);
    });
    const onCancel = () => show.value = false;
    const selectItem = (val) => {
      if (selectValue.value[val.level] !== val.select) {
        selectValue.value[val.level] = val.select;
        if (isCascade) {
          const { data } = props;
          const d = list.value[val.level][val.select];
          list.value.splice(val.level + 1, list.value.length);
          if (d.children && d.children.length)
            formatCascade(d.children);
        }
        selectValue.value.forEach((item, i) => {
          var _a;
          if (i > val.level) {
            selectValue.value[i] = 0;
            const index = (_a = list.value[i]) == null ? void 0 : _a.findIndex((item2) => !item2.disabled);
            if (![-1, 0].includes(index)) {
              selectValue.value[i] = index;
              (0, import_vue.nextTick)(() => {
                var _a2;
                column.value = column.value.sort((a, b) => a.index - b.index);
                (_a2 = column.value[i]) == null ? void 0 : _a2.onTouchEnd(list.value[i]);
              });
            }
          }
        });
      }
    };
    const onConfirm = () => emit("confirm", selectValue.value);
    const formatItem = () => {
      const { data, textKey } = props;
      return data.map((items) => {
        if (items.length) {
          return items.map((item) => ({
            text: item[textKey],
            disabled: item.disabled
          }));
        } else {
          return {
            text: items[textKey],
            disabled: items.disabled
          };
        }
      });
    };
    const formatCascade = (data) => {
      const { textKey } = props;
      const l = data.map((item) => ({
        text: item[textKey],
        disabled: item.disabled,
        children: item.children
      }));
      list.value.push(l);
      if (l[0].children && l[0].children.length)
        formatCascade(l[0].children);
    };
    const init = () => {
      const { data, textKey } = props;
      let arr = [];
      if (data.length) {
        if (Array.isArray(data[0])) {
          if (!selectValue.value)
            selectValue.value = Array.from({ length: data.length }, () => 0);
          arr = formatItem();
        } else if (typeof data[0] === "object") {
          if (data[0].children) {
            list.value = [];
            formatCascade(data);
            isCascade = true;
            if (!selectValue.value)
              selectValue.value = Array.from(
                { length: list.value.length },
                () => 0
              );
            return;
          } else {
            if (!selectValue.value)
              selectValue.value = [0];
            arr = [formatItem()];
          }
        } else {
          if (!selectValue.value)
            selectValue.value = [0];
          arr = [data.map((item) => ({ text: item }))];
        }
      }
      list.value = arr;
    };
    (0, import_vue.onMounted)(() => init());
    return {
      list,
      show,
      column,
      onCancel,
      onConfirm,
      selectItem,
      selectValue
    };
  }
});
const _hoisted_1 = { class: "fan-picker" };
const _hoisted_2 = { class: "fan-picker__o fan-flex fan-align-center fan-justify-between" };
const _hoisted_3 = { class: "fan-picker__c" };
const _hoisted_4 = /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "div",
  { class: "fan-picker__b" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_5 = /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "div",
  { class: "fan-picker__mask" },
  null,
  -1
  /* HOISTED */
);
function __vue_render__(_ctx, _cache) {
  const _component_FanButton = (0, import_vue2.resolveComponent)("FanButton");
  const _component_PickerColumn = (0, import_vue2.resolveComponent)("PickerColumn");
  const _component_FanPopup = (0, import_vue2.resolveComponent)("FanPopup");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_FanPopup, {
    show: _ctx.show,
    "onUpdate:show": _cache[0] || (_cache[0] = ($event) => _ctx.show = $event),
    "safe-bottom": "",
    position: "bottom"
  }, {
    default: (0, import_vue2.withCtx)(() => [
      (0, import_vue2.createElementVNode)("div", _hoisted_1, [
        (0, import_vue2.createElementVNode)("div", _hoisted_2, [
          (0, import_vue2.createVNode)(_component_FanButton, {
            plain: "",
            border: false,
            "text-size": "14",
            "text-color": "#969799",
            onClick: _ctx.onCancel
          }, {
            default: (0, import_vue2.withCtx)(() => [
              (0, import_vue2.createTextVNode)("\u53D6\u6D88")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onClick"]),
          (0, import_vue2.createVNode)(_component_FanButton, {
            plain: "",
            border: false,
            "text-size": "14",
            "text-color": "#576b95",
            onClick: _ctx.onConfirm
          }, {
            default: (0, import_vue2.withCtx)(() => [
              (0, import_vue2.createTextVNode)("\u786E\u8BA4")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onClick"])
        ]),
        (0, import_vue2.createElementVNode)("div", _hoisted_3, [
          ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
            import_vue2.Fragment,
            null,
            (0, import_vue2.renderList)(_ctx.list, (item, i) => {
              return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_PickerColumn, {
                ref_for: true,
                ref: "column",
                key: i,
                items: item,
                value: _ctx.selectValue,
                index: i,
                onSelectItem: _ctx.selectItem
              }, null, 8, ["items", "value", "index", "onSelectItem"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          _hoisted_4,
          _hoisted_5
        ])
      ])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["show"]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
