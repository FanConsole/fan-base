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
  useLocation: () => useLocation
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../utils");
const createInstance = (opt) => {
  const _type = opt.type === "Default" ? "" : opt.type;
  const cityData = (0, import_vue.ref)((0, import_utils.getStorage)(`fan${_type}CityData`));
  const selectingLoction = (0, import_vue.ref)(null);
  const serviceLocation = (0, import_vue.ref)(
    (0, import_utils.getStorage)(`fan${_type}ServiceLocation`, { expired: 10 * 60 * 1e3 })
  );
  const userLocation = (0, import_vue.ref)((0, import_utils.getStorage)(`fan${_type}UserLocation`));
  const historyLocation = (0, import_vue.ref)((0, import_utils.getStorage)(`fan${_type}HistoryLocation`) || []);
  const historyCity = (0, import_vue.computed)(() => {
    const arr = [];
    historyLocation.value.forEach((a) => {
      if (arr.length < 6 && !arr.some((b) => b.city.id === a.city.id)) {
        arr.push(a);
      }
    });
    return arr;
  });
  const setServiceLocation = (data) => {
    serviceLocation.value = data;
    (0, import_utils.setStorage)(`fan${_type}ServiceLocation`, data);
  };
  const setSelectingLocation = (data) => {
    selectingLoction.value = data;
  };
  const setUserLocation = (data) => {
    userLocation.value = data;
    (0, import_utils.setStorage)(`fan${_type}UserLocation`, data);
  };
  const addHistoryLocation = (data) => {
    const arr = historyLocation.value.slice();
    const i = arr.findIndex(
      (a) => a.city.id === data.city.id && a.addressName === data.addressName
    );
    if (i > -1)
      arr.splice(i, 1);
    arr.unshift(data);
    if (arr.length > 20)
      arr.length = 20;
    (0, import_utils.setStorage)(`fan${_type}HistoryLocation`, arr);
    historyLocation.value = arr;
  };
  const getHistoryLocation = () => {
    historyLocation.value = (0, import_utils.getStorage)(`fan${_type}HistoryLocation`) || [];
    return historyLocation;
  };
  const getCityDataWithLocation = (0, import_utils.mergeConcurrent)((opt2) => __async(void 0, null, function* () {
    let coords;
    let accuracy;
    try {
      const res = yield (0, import_utils.getGeolocation)();
      coords = res.coords;
      accuracy = res.accuracy;
    } catch (e) {
      console.info(e);
    }
    const newLocation = __spreadProps(__spreadValues({}, coords), {
      accuracy
      // addressName: locationCity?.addressName || locationCity?.address,
    });
    if (!userLocation.value || newLocation.lat !== userLocation.value.lat) {
      setUserLocation(newLocation);
    }
    return { cityData, userLocation };
  }));
  return {
    cityData,
    selectingLoction,
    serviceLocation,
    userLocation,
    setUserLocation,
    historyLocation,
    historyCity,
    getCityDataWithLocation,
    setServiceLocation,
    setSelectingLocation,
    addHistoryLocation,
    getHistoryLocation
  };
};
const instanceList = /* @__PURE__ */ new Map();
const useLocation = (opt) => {
  const type = (opt == null ? void 0 : opt.type) || "Default";
  if (!instanceList.has(type)) {
    instanceList.set(type, createInstance({ type }));
  }
  return instanceList.get(type);
};
