import "./swiper-sfc.css";
import {
  computed,
  defineComponent,
  ref,
  nextTick,
  watch,
  onMounted
} from "vue";
import { createNamespace } from "../utils";
import FanAspectRatio from "../aspect-ratio/aspect-ratio.js";
import FanImage from "../image/image.js";
import { swiperProps, swiperEmits, useSwiperState } from "./helper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, Controller } from "swiper";
const modules = [Pagination, Autoplay, Controller];
const __vue_sfc__ = defineComponent({
  name: createNamespace("Swiper")[0],
  components: {
    FanAspectRatio,
    FanImage,
    Swiper,
    SwiperSlide
  },
  props: swiperProps,
  emits: swiperEmits,
  setup(props, context) {
    const swiperVisible = ref(true);
    const innerCurrent = ref(props.current);
    const { swiperWidth, swiperAspectRatio } = useSwiperState(props);
    const refSwiper = ref(null);
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
    onMounted(getSwiperWidth);
    const _initialSlide = props.current;
    const swiperOptions = computed(() => {
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
      nextTick(() => {
        swiperVisible.value = true;
      });
    };
    const updateAutoHeight = () => {
      setTimeout(() => {
        refSwiper.value.updateAutoHeight();
      }, 0);
    };
    watch(
      () => props.type,
      (val, prevVal) => {
        val !== prevVal && resetSwiper();
      }
    );
    watch(
      () => props.current,
      (val) => {
        if (val !== innerCurrent.value)
          innerCurrent.value = val;
      }
    );
    watch(innerCurrent, (val, prevVal) => {
      var _a;
      if (val === prevVal)
        return;
      if (val !== props.current) {
        context.emit("update:current", val);
        context.emit("change", val);
      }
      (_a = refSwiper.value) == null ? void 0 : _a.slideTo(val);
    });
    const showSlot = computed(() => {
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
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, renderSlot as _renderSlot, createCommentVNode as _createCommentVNode, resolveComponent as _resolveComponent, createBlock as _createBlock, withCtx as _withCtx, normalizeStyle as _normalizeStyle, mergeProps as _mergeProps } from "vue";
function __vue_render__(_ctx, _cache) {
  const _component_FanImage = _resolveComponent("FanImage");
  const _component_SwiperSlide = _resolveComponent("SwiperSlide");
  const _component_Swiper = _resolveComponent("Swiper", true);
  const _component_FanAspectRatio = _resolveComponent("FanAspectRatio");
  return _ctx.list && _ctx.list.length ? (_openBlock(), _createBlock(_component_FanAspectRatio, {
    key: 0,
    "aspect-ratio": _ctx.swiperAspectRatio
  }, {
    default: _withCtx(() => [
      _ctx.swiperVisible ? (_openBlock(), _createBlock(_component_Swiper, _mergeProps({
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
        default: _withCtx(() => [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(_ctx.list, (item, index) => {
              return _openBlock(), _createBlock(
                _component_SwiperSlide,
                { key: index },
                {
                  default: _withCtx(() => [
                    _ctx.showSlot ? _renderSlot(_ctx.$slots, "default", {
                      key: 0,
                      item,
                      index,
                      active: index === _ctx.innerCurrent
                    }) : (_openBlock(), _createBlock(_component_FanImage, {
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
          _ctx.indicator ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              style: _normalizeStyle({ "--swiper-pagination-color": _ctx.indicatorActiveColor }),
              class: "swiper-pagination",
              slot: "pagination"
            },
            null,
            4
            /* STYLE */
          )) : _createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["modules", "class", "onSwiper", "onSlideChange"])) : _createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["aspect-ratio"])) : _createCommentVNode("v-if", true);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};
