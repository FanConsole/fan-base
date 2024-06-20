import { computed, ref } from "vue";
import { resolveAspectRatio } from "../utils";
const swiperProps = {
  current: {
    type: Number,
    default: 0
  },
  aspectRatio: {
    type: [Number, String],
    default: 2.7
  },
  list: {
    type: Array,
    default: () => []
    // [{ cover: string, ... }]
  },
  loop: Boolean,
  autoplay: {
    type: Number,
    default: 3500
  },
  // 风格，1-常规，2-一屏3个，左右露出相邻 item 的小部分
  type: {
    type: [Number, String],
    default: 1
  },
  innerRadius: [String, Number],
  // 是否显示指示器
  indicator: {
    type: Boolean,
    default: true
  },
  // 当前选中的指示点颜色
  indicatorActiveColor: {
    type: String,
    default: "var(--fan-primary-color)"
  },
  autoHeight: {
    type: Boolean,
    default: false
  },
  //开启纵向滑动
  vertical: {
    type: Boolean,
    default: false
  }
};
const swiperEmits = ["click", "update:current", "change"];
const useSwiperState = (props) => {
  const swiperWidth = ref(375);
  const swiperAspectRatio = computed(() => {
    const { type, aspectRatio, autoHeight } = props;
    if (autoHeight)
      return 0;
    const ar = resolveAspectRatio(aspectRatio);
    if (type !== 2)
      return ar;
    const w = swiperWidth.value;
    return w / ((w - 76) / ar);
  });
  return { swiperWidth, swiperAspectRatio };
};
export {
  swiperEmits,
  swiperProps,
  useSwiperState
};
