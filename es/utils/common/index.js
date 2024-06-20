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
import {
  camelize as _camelize,
  kebabCase as _kebabCase,
  roundNumber as _roundNumber,
  parseTimeData as _parseTimeData,
  padNumber as _padNumber,
  validatePhoneNumber as _validatePhoneNumber
} from "byn-utils";
const parseTimeData = _parseTimeData;
const camelize = _camelize;
const kebabCase = _kebabCase;
const roundNumber = _roundNumber;
const padNumber = _padNumber;
const validatePhoneNumber = _validatePhoneNumber;
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
export {
  camelize,
  createNamespace,
  createUniqueId,
  isInnerRoute,
  kebabCase,
  mergeConcurrent,
  padNumber,
  parseTimeData,
  resolveAspectRatio,
  roundNumber,
  validatePhoneNumber
};
