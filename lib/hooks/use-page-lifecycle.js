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
  usePageLifecycle: () => usePageLifecycle
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_core = require("@vueuse/core");
const usePageLifecycle = () => {
  let deactivated = false;
  (0, import_vue.onActivated)(() => {
    deactivated = false;
  });
  (0, import_vue.onDeactivated)(() => {
    deactivated = true;
  });
  const onPageShow = (hook) => {
    (0, import_vue.onActivated)(hook);
    const visibility = (0, import_core.useDocumentVisibility)();
    (0, import_vue.watch)(
      visibility,
      (val) => {
        if (deactivated)
          return;
        val === "visible" && hook();
      },
      { immediate: true }
    );
  };
  const onPageHide = (hook) => {
    (0, import_vue.onDeactivated)(hook);
    const visibility = (0, import_core.useDocumentVisibility)();
    (0, import_vue.watch)(visibility, (val) => {
      if (deactivated)
        return;
      val === "hidden" && hook();
    });
  };
  const onPageScroll = (hook) => {
    const { y } = (0, import_core.useScroll)(window, {
      onScroll: () => {
        if (deactivated)
          return;
        hook({ scrollTop: y.value });
      }
    });
  };
  const onPageReachBottom = (hook) => {
    (0, import_core.useInfiniteScroll)(
      window,
      () => {
        if (deactivated)
          return;
        hook();
      },
      { distance: 10 }
    );
  };
  const pageScrollTo = (opt) => {
    document.documentElement.scrollTop = document.body.scrollTop = opt.scrollTop;
  };
  return {
    onPageShow,
    onPageHide,
    onPageScroll,
    onPageReachBottom,
    pageScrollTo
  };
};
