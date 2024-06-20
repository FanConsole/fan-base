import "./address-edit-sfc.css";
import { defineComponent, computed, reactive, ref, watch } from "vue";
import {
  createNamespace,
  transformStyleSize,
  validatePhoneNumber
} from "../utils";
import FanInput from "../input/input.js";
import FanTextarea from "../textarea/textarea.js";
import FanIcon from "../icon/icon.js";
import FanPicker from "../picker/picker.js";
const __vue_sfc__ = defineComponent({
  name: createNamespace("AddressEdit")[0],
  components: { FanInput, FanTextarea, FanIcon, FanPicker },
  emits: ["update:modelValue"],
  props: {
    bg: String,
    labelStyle: String,
    inputStyle: {
      type: String,
      default: ""
    },
    border: Boolean,
    areaList: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(props, { emit }) {
    const theStyle = computed(() => {
      const { bg } = props;
      const s = `background: ${bg}`;
      return transformStyleSize(s);
    });
    const labStyle = computed(() => transformStyleSize(props.labelStyle));
    const inStyle = computed(() => transformStyleSize(props.inputStyle));
    const from = reactive({
      name: "",
      phone: "",
      provinceName: "",
      // 省
      cityName: "",
      // 市
      countyName: "",
      // 区
      address: "",
      areaCode: "",
      // 末级地区编码
      postalCode: ""
      // 邮编
    });
    const area = ref("");
    const areaInx = ref();
    const show = ref(false);
    const areaData = ref([]);
    let indexs = [];
    const traverseArea = (val) => {
      try {
        areaData.value.forEach((province, index) => {
          if (val[0] === index || val[0] === province.name) {
            Object.assign(from, { provinceName: province.name });
            province.children.forEach((city, i) => {
              if (i === val[1] || val[1] === city.name) {
                Object.assign(from, { cityName: city.name });
                city.children.forEach((county, inx) => {
                  if (inx === val[2] || val[2] === county.name) {
                    Object.assign(from, {
                      countyName: county.name,
                      areaCode: county.area_code || "",
                      postalCode: county.postal_code || ""
                    });
                    area.value = `${province.name}-${city.name}-${county.name}`;
                    indexs = [index, i, inx];
                  }
                });
              }
            });
          }
        });
      } catch (e) {
        console.log(e);
        console.log("\u5730\u533A\u5217\u8868\u5FC5\u987B\u5305\u542B\u7701\u5E02\u533A\u4E09\u7EA7");
      }
    };
    const onConfirm = (val) => {
      traverseArea(val);
      show.value = false;
    };
    const setAreaData = () => {
      const data = [];
      props.areaList.forEach((items, i) => {
        let obj = {
          name: items.name,
          postal_code: items.postal_code,
          area_code: items.area_code,
          id: items.id,
          level: 1,
          children: []
        };
        data.push(JSON.parse(JSON.stringify(obj)));
        if (!items.children || !items.children.length)
          items.children = [obj];
        items.children.forEach((item, index) => {
          let obj1 = {
            name: item.name,
            postal_code: item.postal_code,
            area_code: item.area_code,
            id: item.id,
            level: 2,
            children: []
          };
          data[i].children.push(JSON.parse(JSON.stringify(obj1)));
          if (!item.children || !item.children.length)
            item.children = [obj1];
          item.children.forEach((area2) => {
            let obj2 = {
              name: area2.name,
              postal_code: area2.postal_code,
              area_code: area2.area_code,
              id: area2.id,
              level: 3
            };
            data[i].children[index].children.push(JSON.parse(JSON.stringify(obj2)));
          });
        });
      });
      areaData.value = data;
      traverseArea([from.provinceName, from.cityName, from.countyName]);
    };
    watch(
      () => props.areaList,
      (val) => {
        if (val.length)
          setAreaData();
      },
      {
        deep: true,
        immediate: true,
        flush: "post"
      }
    );
    watch(
      () => props.modelValue,
      (val) => {
        if (val)
          Object.assign(from, val);
      },
      {
        deep: true,
        immediate: true,
        flush: "post"
      }
    );
    watch(
      () => from,
      (val) => {
        emit("update:modelValue", val);
      },
      {
        deep: true
      }
    );
    const verify = () => {
      return new Promise((resolve, reject) => {
        if (from.name.length < 2 && from.name.length < 26) {
          reject(new Error("\u6536\u8D27\u4EBA\u59D3\u540D\u5E94\u4E3A2-25\u4E2A\u5B57\u7B26"));
        } else if (!validatePhoneNumber(from.phone)) {
          reject(new Error("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7"));
        } else if (!from.provinceName || !from.cityName || !from.countyName || !from.address) {
          reject(new Error("\u8BF7\u586B\u5199\u5B8C\u6574\u7684\u6536\u8D27\u5730\u5740"));
        } else {
          resolve(from);
        }
      });
    };
    const openPocker = () => {
      show.value = true;
      areaInx.value = indexs;
    };
    return {
      theStyle,
      labStyle,
      inStyle,
      from,
      show,
      area,
      areaInx,
      onConfirm,
      verify,
      openPocker
    };
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createBlock as _createBlock, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = {
  key: 0,
  class: "fan-address-area"
};
function __vue_render__(_ctx, _cache) {
  const _component_FanInput = _resolveComponent("FanInput");
  const _component_FanIcon = _resolveComponent("FanIcon");
  const _component_FanTextarea = _resolveComponent("FanTextarea");
  const _component_FanPicker = _resolveComponent("FanPicker");
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: "fan-address",
      style: _normalizeStyle(_ctx.theStyle)
    },
    [
      _createVNode(_component_FanInput, {
        modelValue: _ctx.from.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.from.name = $event),
        "label-style": _ctx.labStyle,
        "input-style": _ctx.inStyle,
        label: "\u6536\u8D27\u4EBA",
        placeholder: "\u8BF7\u586B\u5199\u6536\u8D27\u4EBA\u59D3\u540D",
        border: _ctx.border
      }, null, 8, ["modelValue", "label-style", "input-style", "border"]),
      _createVNode(_component_FanInput, {
        modelValue: _ctx.from.phone,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.from.phone = $event),
        "label-style": _ctx.labStyle,
        "input-style": _ctx.inStyle,
        label: "\u8054\u7CFB\u53F7\u7801",
        placeholder: "\u8BF7\u586B\u5199\u6536\u8D27\u4EBA\u624B\u673A\u53F7",
        border: _ctx.border
      }, null, 8, ["modelValue", "label-style", "input-style", "border"]),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass(["fan-flex fan-align-center", { "fan-hairline--bottom": _ctx.border }]),
          onClick: _cache[3] || (_cache[3] = (...args) => _ctx.openPocker && _ctx.openPocker(...args))
        },
        [
          _ctx.area ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
            _createElementVNode(
              "p",
              {
                style: _normalizeStyle(_ctx.labStyle),
                class: "fan-address-area__label"
              },
              "\u6240\u5728\u5730\u533A",
              4
              /* STYLE */
            ),
            _createElementVNode(
              "p",
              {
                style: _normalizeStyle(_ctx.inStyle),
                class: "fan-address-area__txt"
              },
              _toDisplayString(_ctx.area),
              5
              /* TEXT, STYLE */
            )
          ])) : (_openBlock(), _createBlock(_component_FanInput, {
            key: 1,
            class: "fan-flex-1",
            modelValue: _ctx.area,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.area = $event),
            "label-style": _ctx.labStyle,
            "input-style": _ctx.inStyle,
            label: "\u6240\u5728\u5730\u533A",
            placeholder: "\u7701\u5E02\u533A\u53BF\u3001\u4E61\u9547\u7B49",
            disabled: ""
          }, null, 8, ["modelValue", "label-style", "input-style"])),
          _createVNode(_component_FanIcon, { name: "right" })
        ],
        2
        /* CLASS */
      ),
      _createVNode(_component_FanTextarea, {
        modelValue: _ctx.from.address,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.from.address = $event),
        "label-style": _ctx.labStyle,
        "input-style": _ctx.inStyle,
        label: "\u8BE6\u7EC6\u5730\u5740",
        placeholder: "\u8857\u9053\u3001\u5C0F\u533A\u697C\u724C\u53F7\u7B49"
      }, null, 8, ["modelValue", "label-style", "input-style"]),
      _createVNode(_component_FanPicker, {
        modelValue: _ctx.show,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.show = $event),
        "text-key": "name",
        data: _ctx.areaList,
        value: _ctx.areaInx,
        onConfirm: _ctx.onConfirm
      }, null, 8, ["modelValue", "data", "value", "onConfirm"])
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
