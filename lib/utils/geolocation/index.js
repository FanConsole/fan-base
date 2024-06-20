var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
  getGeolocation: () => getGeolocation,
  getGeolocationByAmap: () => getGeolocationByAmap,
  getGeolocationByBrowser: () => getGeolocationByBrowser,
  getGeolocationByWx: () => getGeolocationByWx,
  loadAmapSdk: () => loadAmapSdk,
  openLocation: () => openLocation
});
module.exports = __toCommonJS(stdin_exports);
var import_system = require("../system");
const AMAP_JS_ID = "amapJsSdkV2";
const AMAP_JS_KEY = "a126d4406aa25746600f622e9605ce8d";
const AMAP_JS_CODE = "87764e891f8b01aef5e8b62d333b008c";
const AMAP_LOAD_RES_OK = { success: true };
const { isWeixin } = (0, import_system.getSystemInfo)();
function loadAmapSdk() {
  return new Promise((resolve, reject) => {
    if (document.getElementById(AMAP_JS_ID)) {
      resolve(AMAP_LOAD_RES_OK);
      return;
    }
    const timer = setTimeout(() => {
      reject(new Error("\u9AD8\u5FB7SDK\u52A0\u8F7D\u8D85\u65F6"));
    }, 2e3);
    const jsSdkCode = document.createElement("script");
    jsSdkCode.type = "text/javascript";
    jsSdkCode.innerHTML = 'window._AMapSecurityConfig={securityJsCode:"' + AMAP_JS_CODE + '"}';
    document.head.appendChild(jsSdkCode);
    const jsSdkLoader = document.createElement("script");
    jsSdkLoader.id = AMAP_JS_ID;
    jsSdkLoader.crossOrigin = "true";
    jsSdkLoader.src = "//webapi.amap.com/loader.js";
    jsSdkLoader.onload = function() {
      clearTimeout(timer);
      resolve(AMAP_LOAD_RES_OK);
    };
    document.head.appendChild(jsSdkLoader);
  });
}
function getGeolocationByAmap() {
  return new Promise((resolve, reject) => {
    loadAmapSdk().then(() => {
      window.AMapLoader.load({
        key: AMAP_JS_KEY,
        // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",
        // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geolocation"]
        // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        // "AMapUI": {},         // 是否加载 AMapUI，缺省不加载
        // "Loca":{"version": '2.0'}         // 是否加载 Loca， 缺省不加载
      }).then((AMap) => {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 1e4,
          maximumAge: 6e4,
          // 0: 可以使用IP定位 1: 手机设备禁止使用IP定位 2: PC上禁止使用IP定位 3: 所有终端禁止使用IP定位
          // IP也不准，所以禁用掉，后端IP解析为准
          noIpLocate: 3,
          // 0: 可以使用浏览器定位 1: 手机设备禁止使用浏览器定位 2: PC上禁止使用浏览器定位 3: 所有终端禁止使用浏览器定位
          noGeoLocation: 0,
          // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          convert: false,
          showButton: false
        });
        geolocation.getCurrentPosition((status, result) => {
          if (status === "complete") {
            const {
              location_type,
              accuracy,
              position: { lat, lng }
            } = result;
            resolve({ location_type, coords: { lat, lng }, accuracy });
          } else {
            reject(result.message);
          }
        });
      }).catch((e) => {
        reject(`\u9AD8\u5FB7SDK\u52A0\u8F7D\u5931\u8D25\uFF08${e.message}\uFF09`);
      });
    }).catch(reject);
  });
}
function getGeolocationByBrowser() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("\u8BE5\u6D4F\u89C8\u5668/\u9875\u9762\u4E0D\u652F\u6301\u83B7\u53D6\u5730\u7406\u4F4D\u7F6E"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { accuracy, latitude, longitude } = position.coords;
        resolve({ coords: { lat: latitude, lng: longitude }, accuracy });
        console.log("\u6D4F\u89C8\u5668\u5730\u7406\u4F4D\u7F6E\u7CBE\u5EA6\uFF1A", accuracy);
      },
      (err) => {
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 1e4,
        maximumAge: 1e3 * 60
      }
    );
  });
}
function getGeolocationByWx() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!isWeixin || !window.wx) {
        reject("\u5FAE\u4FE1 jsApi\uFF08\u5B9A\u4F4D\uFF09\u9700\u8981\u5FAE\u4FE1\u73AF\u5883\u53CA jsSdk");
        return;
      }
      const timer = setTimeout(() => {
        reject(new Error("\u5FAE\u4FE1JS\u4F4D\u7F6E\u83B7\u53D6\u8D85\u65F6"));
      }, 4e3);
      window.wx.getLocation({
        type: "wgs84",
        // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: ({ latitude, longitude }) => {
          resolve({ coords: { lat: latitude, lng: longitude } });
          clearTimeout(timer);
        },
        fail: (e) => {
          reject(new Error(e.errMsg));
          clearTimeout(timer);
        }
      });
    }, 300);
  });
}
function getGeolocation() {
  return new Promise((resolve, reject) => __async(this, null, function* () {
    let result = null;
    let errMsg = "";
    if (isWeixin && window.wx) {
      try {
        result = yield getGeolocationByWx();
      } catch (e) {
        errMsg += e.message;
      }
    }
    if (!result) {
      try {
        result = yield getGeolocationByAmap();
      } catch (e) {
        errMsg += "-" + e.message;
      }
    }
    if (!result) {
      try {
        result = yield getGeolocationByBrowser();
      } catch (e) {
        errMsg += "-" + e.message;
      }
    }
    !result ? reject(new Error(errMsg)) : resolve(result);
  }));
}
function openLocation({
  lat,
  latitude,
  lng,
  longitude,
  name,
  address,
  infoUrl
}) {
  const mapUri = `https://uri.amap.com/marker?position=${longitude || lng},${latitude || lat}&name=${name}&src=${encodeURIComponent(location.href)}`;
  if (!isWeixin || !window.wx) {
    location.href = mapUri;
    return;
  }
  window.wx.openLocation({
    latitude: latitude || lat,
    // 纬度，浮点数，范围为90 ~ -90
    longitude: longitude || lng,
    // 经度，浮点数，范围为180 ~ -180。
    name,
    // 位置名
    address,
    // 地址详情说明
    scale: 18,
    // 地图缩放级别,整形值,范围从1~28。默认为最大
    infoUrl: infoUrl || location.href,
    // 在查看位置界面底部显示的超链接,可点击跳转
    fail: () => {
      location.href = mapUri;
    }
  });
}
