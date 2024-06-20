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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default,
  install: () => install,
  version: () => version
});
module.exports = __toCommonJS(stdin_exports);
var import_address_edit = require("./address-edit");
var import_aspect_ratio = require("./aspect-ratio");
var import_button = require("./button");
var import_cell = require("./cell");
var import_checkbox = require("./checkbox");
var import_contact_button = require("./contact-button");
var import_contact_panel = require("./contact-panel");
var import_count_down = require("./count-down");
var import_count_to = require("./count-to");
var import_data_panel = require("./data-panel");
var import_dialog = require("./dialog");
var import_dropdown_item = require("./dropdown-item");
var import_dropdown_menu = require("./dropdown-menu");
var import_empty = require("./empty");
var import_icon = require("./icon");
var import_image = require("./image");
var import_input = require("./input");
var import_input_grid = require("./input-grid");
var import_input_number = require("./input-number");
var import_lazyload = require("./lazyload");
var import_link = require("./link");
var import_list = require("./list");
var import_loading = require("./loading");
var import_loading_view = require("./loading-view");
var import_location_picker = require("./location-picker");
var import_nav_bar = require("./nav-bar");
var import_notice_bar = require("./notice-bar");
var import_overlay = require("./overlay");
var import_picker = require("./picker");
var import_popup = require("./popup");
var import_positioned_view = require("./positioned-view");
var import_price = require("./price");
var import_rate = require("./rate");
var import_rich_text = require("./rich-text");
var import_scroll_view = require("./scroll-view");
var import_search = require("./search");
var import_sticky = require("./sticky");
var import_swiper = require("./swiper");
var import_switch = require("./switch");
var import_tab_panel = require("./tab-panel");
var import_tabs = require("./tabs");
var import_tabs_content = require("./tabs-content");
var import_tag = require("./tag");
var import_text = require("./text");
var import_textarea = require("./textarea");
var import_toast = require("./toast");
var import_user_panel = require("./user-panel");
var import_view = require("./view");
__reExport(stdin_exports, require("./address-edit"), module.exports);
__reExport(stdin_exports, require("./aspect-ratio"), module.exports);
__reExport(stdin_exports, require("./button"), module.exports);
__reExport(stdin_exports, require("./cell"), module.exports);
__reExport(stdin_exports, require("./checkbox"), module.exports);
__reExport(stdin_exports, require("./contact-button"), module.exports);
__reExport(stdin_exports, require("./contact-panel"), module.exports);
__reExport(stdin_exports, require("./count-down"), module.exports);
__reExport(stdin_exports, require("./count-to"), module.exports);
__reExport(stdin_exports, require("./data-panel"), module.exports);
__reExport(stdin_exports, require("./dialog"), module.exports);
__reExport(stdin_exports, require("./dropdown-item"), module.exports);
__reExport(stdin_exports, require("./dropdown-menu"), module.exports);
__reExport(stdin_exports, require("./empty"), module.exports);
__reExport(stdin_exports, require("./icon"), module.exports);
__reExport(stdin_exports, require("./image"), module.exports);
__reExport(stdin_exports, require("./input"), module.exports);
__reExport(stdin_exports, require("./input-grid"), module.exports);
__reExport(stdin_exports, require("./input-number"), module.exports);
__reExport(stdin_exports, require("./lazyload"), module.exports);
__reExport(stdin_exports, require("./link"), module.exports);
__reExport(stdin_exports, require("./list"), module.exports);
__reExport(stdin_exports, require("./loading"), module.exports);
__reExport(stdin_exports, require("./loading-view"), module.exports);
__reExport(stdin_exports, require("./location-picker"), module.exports);
__reExport(stdin_exports, require("./nav-bar"), module.exports);
__reExport(stdin_exports, require("./notice-bar"), module.exports);
__reExport(stdin_exports, require("./overlay"), module.exports);
__reExport(stdin_exports, require("./picker"), module.exports);
__reExport(stdin_exports, require("./popup"), module.exports);
__reExport(stdin_exports, require("./positioned-view"), module.exports);
__reExport(stdin_exports, require("./price"), module.exports);
__reExport(stdin_exports, require("./rate"), module.exports);
__reExport(stdin_exports, require("./rich-text"), module.exports);
__reExport(stdin_exports, require("./scroll-view"), module.exports);
__reExport(stdin_exports, require("./search"), module.exports);
__reExport(stdin_exports, require("./sticky"), module.exports);
__reExport(stdin_exports, require("./swiper"), module.exports);
__reExport(stdin_exports, require("./switch"), module.exports);
__reExport(stdin_exports, require("./tab-panel"), module.exports);
__reExport(stdin_exports, require("./tabs"), module.exports);
__reExport(stdin_exports, require("./tabs-content"), module.exports);
__reExport(stdin_exports, require("./tag"), module.exports);
__reExport(stdin_exports, require("./text"), module.exports);
__reExport(stdin_exports, require("./textarea"), module.exports);
__reExport(stdin_exports, require("./toast"), module.exports);
__reExport(stdin_exports, require("./user-panel"), module.exports);
__reExport(stdin_exports, require("./view"), module.exports);
const version = "1.1.5";
function install(app) {
  const components = [
    import_address_edit.AddressEdit,
    import_aspect_ratio.AspectRatio,
    import_button.Button,
    import_cell.Cell,
    import_checkbox.Checkbox,
    import_contact_button.ContactButton,
    import_contact_panel.ContactPanel,
    import_count_down.CountDown,
    import_count_to.CountTo,
    import_data_panel.DataPanel,
    import_dialog.Dialog,
    import_dropdown_item.DropdownItem,
    import_dropdown_menu.DropdownMenu,
    import_empty.Empty,
    import_icon.Icon,
    import_image.Image,
    import_input.Input,
    import_input_grid.InputGrid,
    import_input_number.InputNumber,
    import_lazyload.Lazyload,
    import_link.Link,
    import_list.List,
    import_loading.Loading,
    import_loading_view.LoadingView,
    import_location_picker.LocationPicker,
    import_nav_bar.NavBar,
    import_notice_bar.NoticeBar,
    import_overlay.Overlay,
    import_picker.Picker,
    import_popup.Popup,
    import_positioned_view.PositionedView,
    import_price.Price,
    import_rate.Rate,
    import_rich_text.RichText,
    import_scroll_view.ScrollView,
    import_search.Search,
    import_sticky.Sticky,
    import_swiper.Swiper,
    import_switch.Switch,
    import_tab_panel.TabPanel,
    import_tabs.Tabs,
    import_tabs_content.TabsContent,
    import_tag.Tag,
    import_text.Text,
    import_textarea.Textarea,
    import_toast.Toast,
    import_user_panel.UserPanel,
    import_view.View
  ];
  components.forEach((item) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
var stdin_default = {
  install,
  version
};
