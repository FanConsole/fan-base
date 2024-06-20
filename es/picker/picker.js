import "./picker-sfc.css";
import {
  defineComponent,
  watch,
  ref,
  onMounted,
  nextTick
} from "vue";
import { createNamespace } from "../utils";
import FanPopup from "../popup/popup.js";
import FanButton from "../button/button.js";
import PickerColumn from "./picker-column.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("Picker")[0],
  emits: ["confirm", "update:modelValue"],
  components: { FanPopup, FanButton, PickerColumn },
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
    const show = ref(false);
    const list = ref([]);
    const column = ref();
    const selectValue = ref(props.value);
    let isCascade = false;
    watch(
      () => props.modelValue,
      (val) => {
        if (show.value !== val)
          show.value = val;
      }
    );
    watch(show, (val) => {
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
              nextTick(() => {
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
    onMounted(() => init());
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
import { createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, withCtx as _withCtx, createVNode as _createVNode, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createBlock as _createBlock } from "vue";
const _hoisted_1 = { class: "fan-picker" };
const _hoisted_2 = { class: "fan-picker__o fan-flex fan-align-center fan-justify-between" };
const _hoisted_3 = { class: "fan-picker__c" };
const _hoisted_4 = /* @__PURE__ */ _createElementVNode(
  "div",
  { class: "fan-picker__b" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_5 = /* @__PURE__ */ _createElementVNode(
  "div",
  { class: "fan-picker__mask" },
  null,
  -1
  /* HOISTED */
);
function __vue_render__(_ctx, _cache) {
  const _component_FanButton = _resolveComponent("FanButton");
  const _component_PickerColumn = _resolveComponent("PickerColumn");
  const _component_FanPopup = _resolveComponent("FanPopup");
  return _openBlock(), _createBlock(_component_FanPopup, {
    show: _ctx.show,
    "onUpdate:show": _cache[0] || (_cache[0] = ($event) => _ctx.show = $event),
    "safe-bottom": "",
    position: "bottom"
  }, {
    default: _withCtx(() => [
      _createElementVNode("div", _hoisted_1, [
        _createElementVNode("div", _hoisted_2, [
          _createVNode(_component_FanButton, {
            plain: "",
            border: false,
            "text-size": "14",
            "text-color": "#969799",
            onClick: _ctx.onCancel
          }, {
            default: _withCtx(() => [
              _createTextVNode("\u53D6\u6D88")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onClick"]),
          _createVNode(_component_FanButton, {
            plain: "",
            border: false,
            "text-size": "14",
            "text-color": "#576b95",
            onClick: _ctx.onConfirm
          }, {
            default: _withCtx(() => [
              _createTextVNode("\u786E\u8BA4")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onClick"])
        ]),
        _createElementVNode("div", _hoisted_3, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(_ctx.list, (item, i) => {
              return _openBlock(), _createBlock(_component_PickerColumn, {
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
export {
  stdin_default as default
};
