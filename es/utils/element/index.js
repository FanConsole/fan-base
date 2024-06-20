import { isVNode } from "vue";
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
        if (!isVNode(child))
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
export {
  getChildrenComponents,
  getElementBounding,
  getElementNodes
};
