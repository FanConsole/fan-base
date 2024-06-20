import { onActivated, onDeactivated, watch } from "vue";
import {
  useDocumentVisibility,
  useScroll,
  useInfiniteScroll
} from "@vueuse/core";
const usePageLifecycle = () => {
  let deactivated = false;
  onActivated(() => {
    deactivated = false;
  });
  onDeactivated(() => {
    deactivated = true;
  });
  const onPageShow = (hook) => {
    onActivated(hook);
    const visibility = useDocumentVisibility();
    watch(
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
    onDeactivated(hook);
    const visibility = useDocumentVisibility();
    watch(visibility, (val) => {
      if (deactivated)
        return;
      val === "hidden" && hook();
    });
  };
  const onPageScroll = (hook) => {
    const { y } = useScroll(window, {
      onScroll: () => {
        if (deactivated)
          return;
        hook({ scrollTop: y.value });
      }
    });
  };
  const onPageReachBottom = (hook) => {
    useInfiniteScroll(
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
export {
  usePageLifecycle
};
