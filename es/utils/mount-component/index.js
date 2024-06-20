import { createApp, reactive, getCurrentInstance } from "vue";
const extend = Object.assign;
function usePopupState() {
  const state = reactive({
    show: false
  });
  const toggle = (show) => {
    state.show = show;
  };
  const open = (props) => {
    extend(state, props);
    toggle(true);
  };
  const close = () => toggle(false);
  const instance = getCurrentInstance();
  if (instance) {
    extend(instance.proxy, { open, close, toggle });
  }
  return {
    open,
    close,
    state,
    toggle
  };
}
function mountComponent(RootComponent) {
  const app = createApp(RootComponent);
  const root = document.createElement("div");
  document.body.appendChild(root);
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    }
  };
}
export {
  mountComponent,
  usePopupState
};
