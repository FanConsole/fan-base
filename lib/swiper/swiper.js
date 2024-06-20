var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_swiper_sfc = require("./swiper-sfc.css");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_aspect_ratio = __toESM(require("../aspect-ratio/aspect-ratio.js"));
var import_image = __toESM(require("../image/image.js"));
var import_helper = require("./helper");
var import_vue2 = require("swiper/vue");
var import_swiper = require("swiper");
var import_vue3 = require("vue");
const modules = [import_swiper.Pagination, import_swiper.Autoplay, import_swiper.Controller];
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name: (0, import_utils.createNamespace)("Swiper")[0],
  components: {
    FanAspectRatio: import_aspect_ratio.default,
    FanImage: import_image.default,
    Swiper: import_vue2.Swiper,
    SwiperSlide: import_vue2.SwiperSlide
  },
  props: import_helper.swiperProps,
  emits: import_helper.swiperEmits,
  setup(props, context) {
    const swiperVisible = (0, import_vue.ref)(true);
    const innerCurrent = (0, import_vue.ref)(props.current);
    const { swiperWidth, swiperAspectRatio } = (0, import_helper.useSwiperState)(props);
    const refSwiper = (0, import_vue.ref)(null);
    const setControlledSwiper = (swiper) => {
      refSwiper.value = swiper;
    };
    const getSwiperWidth = () => {
      const { type } = props;
      if (type !== 2)
        return;
      setTimeout(() => {
        if (!refSwiper.value)
          return;
        swiperWidth.value = refSwiper.value.width;
      }, 0);
    };
    (0, import_vue.onMounted)(getSwiperWidth);
    const _initialSlide = props.current;
    const swiperOptions = (0, import_vue.computed)(() => {
      const { autoplay, type, loop, autoHeight, vertical } = props;
      return {
        autoplay: !autoplay ? false : { delay: autoplay, disableOnInteraction: false },
        autoHeight,
        loop,
        centeredSlides: true,
        initialSlide: _initialSlide,
        slidesPerView: type === 2 ? "auto" : 1,
        loopedSlides: type === 2 ? 5 : null,
        pagination: { el: ".swiper-pagination" },
        direction: vertical ? "vertical" : "horizontal"
      };
    });
    const resetSwiper = () => {
      swiperVisible.value = false;
      (0, import_vue.nextTick)(() => {
        swiperVisible.value = true;
      });
    };
    const updateAutoHeight = () => {
      setTimeout(() => {
        refSwiper.value.updateAutoHeight();
      }, 0);
    };
    (0, import_vue.watch)(
      () => props.type,
      (val, prevVal) => {
        val !== prevVal && resetSwiper();
      }
    );
    (0, import_vue.watch)(
      () => props.current,
      (val) => {
        if (val !== innerCurrent.value)
          innerCurrent.value = val;
      }
    );
    (0, import_vue.watch)(innerCurrent, (val, prevVal) => {
      var _a;
      if (val === prevVal)
        return;
      if (val !== props.current) {
        context.emit("update:current", val);
        context.emit("change", val);
      }
      (_a = refSwiper.value) == null ? void 0 : _a.slideTo(val);
    });
    const showSlot = (0, import_vue.computed)(() => {
      return context.slots.default;
    });
    const onClick = (e, i) => {
      context.emit("click", e, i);
    };
    const slideChange = (e) => {
      innerCurrent.value = e.activeIndex;
    };
    return {
      modules,
      swiperVisible,
      swiperOptions,
      innerCurrent,
      setControlledSwiper,
      slideChange,
      swiperAspectRatio,
      showSlot,
      onClick,
      updateAutoHeight
    };
  }
});
function __vue_render__(_ctx, _cache) {
  const _component_FanImage = (0, import_vue3.resolveComponent)("FanImage");
  const _component_SwiperSlide = (0, import_vue3.resolveComponent)("SwiperSlide");
  const _component_Swiper = (0, import_vue3.resolveComponent)("Swiper", true);
  const _component_FanAspectRatio = (0, import_vue3.resolveComponent)("FanAspectRatio");
  return _ctx.list && _ctx.list.length ? ((0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(_component_FanAspectRatio, {
    key: 0,
    "aspect-ratio": _ctx.swiperAspectRatio
  }, {
    default: (0, import_vue3.withCtx)(() => [
      _ctx.swiperVisible ? ((0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(_component_Swiper, (0, import_vue3.mergeProps)({
        key: 0,
        modules: _ctx.modules,
        class: ["fan-swiper__inner", {
          "fan-swiper--type2": _ctx.type === 2,
          "fan-swiper--vertical": _ctx.vertical
        }]
      }, _ctx.swiperOptions, {
        onSwiper: _ctx.setControlledSwiper,
        onSlideChange: _ctx.slideChange
      }), {
        default: (0, import_vue3.withCtx)(() => [
          ((0, import_vue3.openBlock)(true), (0, import_vue3.createElementBlock)(
            import_vue3.Fragment,
            null,
            (0, import_vue3.renderList)(_ctx.list, (item, index) => {
              return (0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(
                _component_SwiperSlide,
                { key: index },
                {
                  default: (0, import_vue3.withCtx)(() => [
                    _ctx.showSlot ? (0, import_vue3.renderSlot)(_ctx.$slots, "default", {
                      key: 0,
                      item,
                      index,
                      active: index === _ctx.innerCurrent
                    }) : ((0, import_vue3.openBlock)(), (0, import_vue3.createBlock)(_component_FanImage, {
                      key: 1,
                      src: item.cover,
                      mode: _ctx.autoHeight ? "widthFix" : "aspectFill",
                      "aspect-ratio": _ctx.autoHeight ? 0 : _ctx.aspectRatio,
                      radius: _ctx.innerRadius,
                      onClick: ($event) => _ctx.onClick(item, index)
                    }, null, 8, ["src", "mode", "aspect-ratio", "radius", "onClick"]))
                  ]),
                  _: 2
                  /* DYNAMIC */
                },
                1024
                /* DYNAMIC_SLOTS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          _ctx.indicator ? ((0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)(
            "div",
            {
              key: 0,
              style: (0, import_vue3.normalizeStyle)({ "--swiper-pagination-color": _ctx.indicatorActiveColor }),
              class: "swiper-pagination",
              slot: "pagination"
            },
            null,
            4
            /* STYLE */
          )) : (0, import_vue3.createCommentVNode)("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["modules", "class", "onSwiper", "onSlideChange"])) : (0, import_vue3.createCommentVNode)("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["aspect-ratio"])) : (0, import_vue3.createCommentVNode)("v-if", true);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
