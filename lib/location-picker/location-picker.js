var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../utils");
var import_hooks = require("../hooks");
var import_vue_router = require("vue-router");
var import_vue2 = require("vue");
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("LocationPicker")[0],
  emits: ["confirm"],
  props: {
    width: {
      type: [String, Number],
      default: "100%"
    },
    height: {
      type: [String, Number],
      default: "100vh"
    },
    lat: [String, Number],
    lng: [String, Number],
    // 选择位置是否影响当前使用城市位置——hooks.useLocation
    effectServiceLocation: {
      type: [Boolean, String],
      default: true
    },
    type: {
      type: String,
      default: "Default",
      validator: (value) => ["", "Default", "Meituan", "Dianping"].includes(value)
    }
  },
  setup(props, context) {
    const theStyle = (0, import_vue.computed)(() => {
      const { width, height } = props;
      const s = `width:${(0, import_utils.transformSize)(width)};height:${(0, import_utils.transformSize)(
        height
      )};`;
      return s;
    });
    const { query } = (0, import_vue_router.useRoute)();
    const mapUri = (0, import_vue.computed)(() => {
      let a = "https://apis.map.qq.com/tools/locpicker?search=1&type=1&policy=1&key=H3SBZ-XNQ3O-HAKWZ-SFQSE-TGOE2-RGB6F&referer=saas";
      const { lat, lng } = props.lat && props.lng ? props : query.value || {};
      if (lat && lng) {
        return a += `&coord=${lat},${lng}`;
      }
      return a;
    });
    const effectService = (0, import_vue.computed)(() => {
      var _a;
      return typeof ((_a = query.value) == null ? void 0 : _a.effectServiceLocation) !== "undefined" ? query.value.effectServiceLocation === "true" : props.effectServiceLocation;
    });
    const getCityNameFromAddress = (address) => {
      const reg = /([^省市]+)市/;
      const matched = address.match(reg);
      return matched && matched[0] || "";
    };
    const handleLocation = (data, effectServiceLocation, type) => __async(this, null, function* () {
      const {
        cityData,
        userLocation,
        setServiceLocation,
        setSelectingLocation,
        getCityDataWithLocation
      } = (0, import_hooks.useLocation)({
        type: type || "Default"
      });
      if (effectServiceLocation && !cityData.value) {
        try {
          yield getCityDataWithLocation();
        } catch (_) {
        }
      }
      const { lat, lng, cityName, address, name } = data;
      if (name === "\u6211\u7684\u4F4D\u7F6E" && userLocation.value) {
        effectServiceLocation && setServiceLocation(userLocation.value);
        setSelectingLocation(userLocation.value);
        return userLocation.value;
      }
      const theLoc = {
        city: {
          name: cityName || getCityNameFromAddress(address)
        },
        lat,
        lng,
        address,
        addressName: name,
        accuracy: 1
      };
      if (theLoc.city.name && effectServiceLocation && cityData.value) {
        const cname = theLoc.city.name.substring(
          0,
          theLoc.city.name.length - 1
        );
        let matched = false;
        for (let k in cityData.value.all) {
          if (matched)
            break;
          const section = cityData.value.all[k];
          for (let i = section.length - 1; i >= 0; i--) {
            if (matched)
              break;
            if (section[i].name.includes(cname)) {
              theLoc.city = section[i];
              setServiceLocation(theLoc);
              break;
            }
          }
        }
      }
      setSelectingLocation(theLoc);
      return theLoc;
    });
    const messageListener = (event) => __async(this, null, function* () {
      const loc = event.data;
      if (window.location.search.includes("debug=1")) {
        console.log(999999, event);
        alert(JSON.stringify(event.data));
      }
      if (loc && loc.module == "locationPicker") {
        const { cityname, latlng, poiaddress, poiname } = loc;
        const ret = yield handleLocation(
          __spreadProps(__spreadValues({}, latlng), { cityName: cityname, address: poiaddress, name: poiname }),
          effectService.value,
          props.type
        );
        context.emit("confirm", ret);
      }
    });
    (0, import_vue.onMounted)(() => {
      window.addEventListener("message", messageListener, false);
    });
    (0, import_vue.onBeforeUnmount)(() => {
      window.removeEventListener("message", messageListener, false);
    });
    return { theStyle, mapUri };
  }
});
const _hoisted_1 = ["src"];
function __vue_render__(_ctx, _cache) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      style: (0, import_vue2.normalizeStyle)(_ctx.theStyle)
    },
    [
      (0, import_vue2.createElementVNode)("iframe", {
        width: "100%",
        height: "100%",
        frameborder: "0",
        src: _ctx.mapUri
      }, null, 8, _hoisted_1)
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
