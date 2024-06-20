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
  getChildrenComponents: () => getChildrenComponents,
  getElementBounding: () => getElementBounding,
  getElementNodes: () => getElementNodes
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
function getElementNodes(selector, opt) {
  var _a;
  const { selectAll = false, scope } = opt || {};
  const _scope = ((_a = scope == null ? void 0 : scope.vnode) == null ? void 0 : _a.el) || document;
  if (!selectAll) {
    let el = _scope.querySelector(selector);
    if (!el) {
      if (selector.startsWith(".") && _scope.classList.contains(selector.substring(1)) || selector.startsWith("#") && _scope.id === selector.substring(1))
        el = _scope;
    }
    return el;
  }
  return _scope.querySelectorAll(selector);
}
function getElementBounding(opt) {
  return new Promise((resolve) => {
    const { el, selector, selectAll = false, scope } = opt || {};
    if (el) {
      resolve(el.getBoundingClientRect());
      return;
    }
    if (!selector) {
      resolve(null);
      return;
    }
    if (!selectAll) {
      const node = getElementNodes(selector, { scope });
      resolve(node == null ? void 0 : node.getBoundingClientRect());
      return;
    }
    const nodes = getElementNodes(selector, { scope, selectAll });
    const arr = [];
    nodes.forEach((e) => {
      arr.push(e.getBoundingClientRect());
    });
    resolve(arr);
  });
}
function getChildrenComponents(scope, name) {
  const result = [];
  const add = (node) => {
    if (!(node == null ? void 0 : node.component))
      return false;
    if (name && typeof node.type === "object" && node.type.name !== name)
      return false;
    result.push(node.component.proxy);
    return true;
  };
  const traverse = (children) => {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        var _a;
        if (!(0, import_vue.isVNode)(child))
          return;
        if (add(child))
          return;
        if ((_a = child.component) == null ? void 0 : _a.subTree) {
          if (!add(child.component.subTree)) {
            traverse(child.component.subTree.children);
          }
        }
        if (child.children) {
          traverse(child.children);
        }
      });
    }
  };
  traverse(scope.subTree.children);
  return result;
}
