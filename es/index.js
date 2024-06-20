import { AddressEdit } from "./address-edit";
import { AspectRatio } from "./aspect-ratio";
import { Button } from "./button";
import { Cell } from "./cell";
import { Checkbox } from "./checkbox";
import { ContactButton } from "./contact-button";
import { ContactPanel } from "./contact-panel";
import { CountDown } from "./count-down";
import { CountTo } from "./count-to";
import { DataPanel } from "./data-panel";
import { Dialog } from "./dialog";
import { DropdownItem } from "./dropdown-item";
import { DropdownMenu } from "./dropdown-menu";
import { Empty } from "./empty";
import { Icon } from "./icon";
import { Image } from "./image";
import { Input } from "./input";
import { InputGrid } from "./input-grid";
import { InputNumber } from "./input-number";
import { Lazyload } from "./lazyload";
import { Link } from "./link";
import { List } from "./list";
import { Loading } from "./loading";
import { LoadingView } from "./loading-view";
import { LocationPicker } from "./location-picker";
import { NavBar } from "./nav-bar";
import { NoticeBar } from "./notice-bar";
import { Overlay } from "./overlay";
import { Picker } from "./picker";
import { Popup } from "./popup";
import { PositionedView } from "./positioned-view";
import { Price } from "./price";
import { Rate } from "./rate";
import { RichText } from "./rich-text";
import { ScrollView } from "./scroll-view";
import { Search } from "./search";
import { Sticky } from "./sticky";
import { Swiper } from "./swiper";
import { Switch } from "./switch";
import { TabPanel } from "./tab-panel";
import { Tabs } from "./tabs";
import { TabsContent } from "./tabs-content";
import { Tag } from "./tag";
import { Text } from "./text";
import { Textarea } from "./textarea";
import { Toast } from "./toast";
import { UserPanel } from "./user-panel";
import { View } from "./view";
const version = "1.1.5";
function install(app) {
  const components = [
    AddressEdit,
    AspectRatio,
    Button,
    Cell,
    Checkbox,
    ContactButton,
    ContactPanel,
    CountDown,
    CountTo,
    DataPanel,
    Dialog,
    DropdownItem,
    DropdownMenu,
    Empty,
    Icon,
    Image,
    Input,
    InputGrid,
    InputNumber,
    Lazyload,
    Link,
    List,
    Loading,
    LoadingView,
    LocationPicker,
    NavBar,
    NoticeBar,
    Overlay,
    Picker,
    Popup,
    PositionedView,
    Price,
    Rate,
    RichText,
    ScrollView,
    Search,
    Sticky,
    Swiper,
    Switch,
    TabPanel,
    Tabs,
    TabsContent,
    Tag,
    Text,
    Textarea,
    Toast,
    UserPanel,
    View
  ];
  components.forEach((item) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
export * from "./address-edit";
export * from "./aspect-ratio";
export * from "./button";
export * from "./cell";
export * from "./checkbox";
export * from "./contact-button";
export * from "./contact-panel";
export * from "./count-down";
export * from "./count-to";
export * from "./data-panel";
export * from "./dialog";
export * from "./dropdown-item";
export * from "./dropdown-menu";
export * from "./empty";
export * from "./icon";
export * from "./image";
export * from "./input";
export * from "./input-grid";
export * from "./input-number";
export * from "./lazyload";
export * from "./link";
export * from "./list";
export * from "./loading";
export * from "./loading-view";
export * from "./location-picker";
export * from "./nav-bar";
export * from "./notice-bar";
export * from "./overlay";
export * from "./picker";
export * from "./popup";
export * from "./positioned-view";
export * from "./price";
export * from "./rate";
export * from "./rich-text";
export * from "./scroll-view";
export * from "./search";
export * from "./sticky";
export * from "./swiper";
export * from "./switch";
export * from "./tab-panel";
export * from "./tabs";
export * from "./tabs-content";
export * from "./tag";
export * from "./text";
export * from "./textarea";
export * from "./toast";
export * from "./user-panel";
export * from "./view";
var stdin_default = {
  install,
  version
};
export {
  stdin_default as default,
  install,
  version
};
