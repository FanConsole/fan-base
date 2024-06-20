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
  camelize: () => camelize,
  createNamespace: () => createNamespace,
  createUniqueId: () => createUniqueId,
  isInnerRoute: () => isInnerRoute,
  kebabCase: () => kebabCase,
  mergeConcurrent: () => mergeConcurrent,
  padNumber: () => padNumber,
  parseTimeData: () => parseTimeData,
  resolveAspectRatio: () => resolveAspectRatio,
  roundNumber: () => roundNumber,
  validatePhoneNumber: () => validatePhoneNumber
});
module.exports = __toCommonJS(stdin_exports);
var import_byn_utils = require("byn-utils");
const parseTimeData = import_byn_utils.parseTimeData;
const camelize = import_byn_utils.camelize;
const kebabCase = import_byn_utils.kebabCase;
const roundNumber = import_byn_utils.roundNumber;
const padNumber = import_byn_utils.padNumber;
const validatePhoneNumber = import_byn_utils.validatePhoneNumber;
function createNamespace(name) {
  const prefixedName = `fan-${name}`;
  return [camelize(prefixedName, true)];
}
function resolveAspectRatio(ar) {
  if (typeof ar === "string") {
    if (ar.includes("/") || ar.includes(":")) {
      const [a, b] = ar.replace("/", ":").split(":");
      return Number(a) / Number(b);
    }
    return Number(ar);
  }
  return ar;
}
function createUniqueId(opt) {
  return "" + ((opt == null ? void 0 : opt.prefix) || "") + Math.floor(Math.random() * 1e6).toString(36);
}
function mergeConcurrent(func) {
  const resolverList = [];
  let progress = false;
  return (...args) => {
    return new Promise((resolve, reject) => __async(this, null, function* () {
      resolverList.push({ resolve, reject });
      if (progress)
        return;
      progress = true;
      try {
        const ret = yield func(...args);
        resolverList.forEach((li) => li.resolve(ret));
      } catch (e) {
        resolverList.forEach((li) => li.reject(e));
      }
      resolverList.length = 0;
      progress = false;
    }));
  };
}
function isInnerRoute(url) {
  if (url && url.startsWith("http"))
    return true;
  return false;
}
