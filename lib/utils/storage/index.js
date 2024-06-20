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
var stdin_exports = {};
__export(stdin_exports, {
  clearStorage: () => clearStorage,
  getStorage: () => getStorage,
  removeStorage: () => removeStorage,
  setStorage: () => setStorage
});
module.exports = __toCommonJS(stdin_exports);
var import_byn_utils = require("byn-utils");
const getStorage = import_byn_utils.getStorage;
const setStorage = import_byn_utils.setStorage;
const removeStorage = import_byn_utils.removeStorage;
const clearStorage = import_byn_utils.getStorage;
