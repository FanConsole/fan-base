import { isVNode, createApp, reactive, getCurrentInstance, defineComponent, computed, openBlock, createElementBlock, normalizeStyle, normalizeClass, createElementVNode, Fragment, renderList, createCommentVNode, renderSlot, ref, watch, resolveComponent, createBlock, Transition, withCtx, toDisplayString, createVNode, mergeProps, createTextVNode, withKeys, withModifiers, onMounted, nextTick as nextTick$1, resolveDirective, withDirectives, onBeforeUnmount, watchEffect, onDeactivated, inject, onUnmounted, unref, readonly, getCurrentScope, onScopeDispose, vShow, provide, onActivated, vModelDynamic, resolveDynamicComponent, h, onUpdated, onBeforeUpdate } from "vue";
const addressEditSfc = "";
const roundNumber$1 = (num, decimal = 2, opt) => {
  const n = Number(num);
  if (isNaN(n)) {
    return 0;
  }
  const { floor } = opt || {};
  const p1 = Math.pow(10, decimal + 1);
  const p2 = Math.pow(10, decimal);
  return (!floor ? Math.round(n * p1 / 10) : Math.floor(n * p1 / 10)) / p2;
};
const isSSR = typeof window === "undefined";
function setStorage$1(k, data, options) {
  if (!k || isSSR)
    return;
  const { expired, runTime } = { ...options };
  const d = JSON.stringify({ t: Date.now(), expired, data });
  runTime ? sessionStorage.setItem(k, d) : localStorage.setItem(k, d);
}
function getStorage$1(k, options) {
  if (!k || isSSR)
    return null;
  const { runTime, expired } = { ...options };
  let d = runTime ? sessionStorage.getItem(k) : localStorage.getItem(k);
  if (!d)
    return d;
  d = JSON.parse(d);
  const exp = expired || d.expired;
  if (exp && Date.now() - d.t > exp)
    return null;
  return d.data;
}
function getSystemInfo$1() {
  if (typeof window === "undefined")
    return {};
  const ua = navigator.userAgent;
  const isMac = /macintosh|mac os x/i.test(ua);
  return {
    devicePixelRatio: window.devicePixelRatio,
    language: navigator.language,
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    isMac,
    isIos: /(iPhone|iPad|iPod|iOS)/i.test(ua) || isMac,
    isWeixin: /micromessenger/.test(ua.toLowerCase()),
    isAlipay: /alipay/.test(ua.toLowerCase())
  };
}
function camelize$1(str, pascal = false) {
  const s = str.replace(/-(\w)/g, (_2, c) => c.toUpperCase());
  return !pascal ? s : `${s[0].toUpperCase()}${s.substring(1)}`;
}
function kebabCase$1(str) {
  return str.replace(/[A-Z]/g, (matched) => {
    return "-" + matched.toLowerCase();
  });
}
function padNumber$1(n, width = 2, opt) {
  const { right, sign = "0" } = opt || {};
  const nStr = String(n);
  let padStr = "";
  const padN = width - nStr.length;
  if (padN > 0) {
    for (let i = 0; i < padN; i++) {
      padStr += sign;
    }
  }
  return !right ? `${padStr}${nStr}` : `${nStr}${padStr}`;
}
const parseTimeData$1 = (time, hasDays = true) => {
  const SECOND = 1e3;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  time = time || 0;
  let days = "00";
  let hours = "00";
  if (hasDays) {
    days = padNumber$1(Math.floor(time / DAY));
    hours = padNumber$1(Math.floor(time % DAY / HOUR));
  } else {
    hours = padNumber$1(Math.floor(time / HOUR));
  }
  const minutes = padNumber$1(Math.floor(time % HOUR / MINUTE));
  const seconds = padNumber$1(Math.floor(time % MINUTE / SECOND));
  const milliseconds = Math.floor(Math.floor(time % SECOND) / 100);
  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
};
function validatePhoneNumber$1(phone) {
  const reg = /^1[3-9]{1}\d{9}$/;
  return reg.test(phone);
}
const inBrowser$1 = typeof window !== "undefined";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var clipboard = { exports: {} };
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
(function(module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    return function() {
      var __webpack_modules__ = {
        686: function(__unused_webpack_module, __webpack_exports__, __webpack_require__2) {
          __webpack_require__2.d(__webpack_exports__, {
            "default": function() {
              return clipboard2;
            }
          });
          var tiny_emitter = __webpack_require__2(279);
          var tiny_emitter_default = /* @__PURE__ */ __webpack_require__2.n(tiny_emitter);
          var listen = __webpack_require__2(370);
          var listen_default = /* @__PURE__ */ __webpack_require__2.n(listen);
          var src_select = __webpack_require__2(817);
          var select_default = /* @__PURE__ */ __webpack_require__2.n(src_select);
          function command(type) {
            try {
              return document.execCommand(type);
            } catch (err) {
              return false;
            }
          }
          var ClipboardActionCut = function ClipboardActionCut2(target) {
            var selectedText = select_default()(target);
            command("cut");
            return selectedText;
          };
          var actions_cut = ClipboardActionCut;
          function createFakeElement(value) {
            var isRTL = document.documentElement.getAttribute("dir") === "rtl";
            var fakeElement = document.createElement("textarea");
            fakeElement.style.fontSize = "12pt";
            fakeElement.style.border = "0";
            fakeElement.style.padding = "0";
            fakeElement.style.margin = "0";
            fakeElement.style.position = "absolute";
            fakeElement.style[isRTL ? "right" : "left"] = "-9999px";
            var yPosition = window.pageYOffset || document.documentElement.scrollTop;
            fakeElement.style.top = "".concat(yPosition, "px");
            fakeElement.setAttribute("readonly", "");
            fakeElement.value = value;
            return fakeElement;
          }
          var fakeCopyAction = function fakeCopyAction2(value, options) {
            var fakeElement = createFakeElement(value);
            options.container.appendChild(fakeElement);
            var selectedText = select_default()(fakeElement);
            command("copy");
            fakeElement.remove();
            return selectedText;
          };
          var ClipboardActionCopy = function ClipboardActionCopy2(target) {
            var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
              container: document.body
            };
            var selectedText = "";
            if (typeof target === "string") {
              selectedText = fakeCopyAction(target, options);
            } else if (target instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(target === null || target === void 0 ? void 0 : target.type)) {
              selectedText = fakeCopyAction(target.value, options);
            } else {
              selectedText = select_default()(target);
              command("copy");
            }
            return selectedText;
          };
          var actions_copy = ClipboardActionCopy;
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
          var ClipboardActionDefault = function ClipboardActionDefault2() {
            var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            var _options$action = options.action, action = _options$action === void 0 ? "copy" : _options$action, container = options.container, target = options.target, text = options.text;
            if (action !== "copy" && action !== "cut") {
              throw new Error('Invalid "action" value, use either "copy" or "cut"');
            }
            if (target !== void 0) {
              if (target && _typeof(target) === "object" && target.nodeType === 1) {
                if (action === "copy" && target.hasAttribute("disabled")) {
                  throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                }
                if (action === "cut" && (target.hasAttribute("readonly") || target.hasAttribute("disabled"))) {
                  throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                }
              } else {
                throw new Error('Invalid "target" value, use a valid Element');
              }
            }
            if (text) {
              return actions_copy(text, {
                container
              });
            }
            if (target) {
              return action === "cut" ? actions_cut(target) : actions_copy(target, {
                container
              });
            }
          };
          var actions_default = ClipboardActionDefault;
          function clipboard_typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              clipboard_typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              clipboard_typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return clipboard_typeof(obj);
          }
          function _classCallCheck(instance2, Constructor) {
            if (!(instance2 instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              _defineProperties(Constructor, staticProps);
            return Constructor;
          }
          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function");
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
            if (superClass)
              _setPrototypeOf(subClass, superClass);
          }
          function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
              o2.__proto__ = p2;
              return o2;
            };
            return _setPrototypeOf(o, p);
          }
          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived), result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }
          function _possibleConstructorReturn(self2, call) {
            if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) {
              return call;
            }
            return _assertThisInitialized(self2);
          }
          function _assertThisInitialized(self2) {
            if (self2 === void 0) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self2;
          }
          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if (typeof Proxy === "function")
              return true;
            try {
              Date.prototype.toString.call(Reflect.construct(Date, [], function() {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
            };
            return _getPrototypeOf(o);
          }
          function getAttributeValue(suffix, element) {
            var attribute = "data-clipboard-".concat(suffix);
            if (!element.hasAttribute(attribute)) {
              return;
            }
            return element.getAttribute(attribute);
          }
          var Clipboard2 = /* @__PURE__ */ function(_Emitter) {
            _inherits(Clipboard3, _Emitter);
            var _super = _createSuper(Clipboard3);
            function Clipboard3(trigger, options) {
              var _this;
              _classCallCheck(this, Clipboard3);
              _this = _super.call(this);
              _this.resolveOptions(options);
              _this.listenClick(trigger);
              return _this;
            }
            _createClass(Clipboard3, [{
              key: "resolveOptions",
              value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                this.action = typeof options.action === "function" ? options.action : this.defaultAction;
                this.target = typeof options.target === "function" ? options.target : this.defaultTarget;
                this.text = typeof options.text === "function" ? options.text : this.defaultText;
                this.container = clipboard_typeof(options.container) === "object" ? options.container : document.body;
              }
            }, {
              key: "listenClick",
              value: function listenClick(trigger) {
                var _this2 = this;
                this.listener = listen_default()(trigger, "click", function(e) {
                  return _this2.onClick(e);
                });
              }
            }, {
              key: "onClick",
              value: function onClick2(e) {
                var trigger = e.delegateTarget || e.currentTarget;
                var action = this.action(trigger) || "copy";
                var text = actions_default({
                  action,
                  container: this.container,
                  target: this.target(trigger),
                  text: this.text(trigger)
                });
                this.emit(text ? "success" : "error", {
                  action,
                  text,
                  trigger,
                  clearSelection: function clearSelection() {
                    if (trigger) {
                      trigger.focus();
                    }
                    window.getSelection().removeAllRanges();
                  }
                });
              }
            }, {
              key: "defaultAction",
              value: function defaultAction(trigger) {
                return getAttributeValue("action", trigger);
              }
            }, {
              key: "defaultTarget",
              value: function defaultTarget(trigger) {
                var selector = getAttributeValue("target", trigger);
                if (selector) {
                  return document.querySelector(selector);
                }
              }
            }, {
              key: "defaultText",
              value: function defaultText(trigger) {
                return getAttributeValue("text", trigger);
              }
            }, {
              key: "destroy",
              value: function destroy() {
                this.listener.destroy();
              }
            }], [{
              key: "copy",
              value: function copy(target) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                  container: document.body
                };
                return actions_copy(target, options);
              }
            }, {
              key: "cut",
              value: function cut(target) {
                return actions_cut(target);
              }
            }, {
              key: "isSupported",
              value: function isSupported() {
                var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"];
                var actions = typeof action === "string" ? [action] : action;
                var support2 = !!document.queryCommandSupported;
                actions.forEach(function(action2) {
                  support2 = support2 && !!document.queryCommandSupported(action2);
                });
                return support2;
              }
            }]);
            return Clipboard3;
          }(tiny_emitter_default());
          var clipboard2 = Clipboard2;
        },
        828: function(module2) {
          var DOCUMENT_NODE_TYPE = 9;
          if (typeof Element !== "undefined" && !Element.prototype.matches) {
            var proto = Element.prototype;
            proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
          }
          function closest(element, selector) {
            while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
              if (typeof element.matches === "function" && element.matches(selector)) {
                return element;
              }
              element = element.parentNode;
            }
          }
          module2.exports = closest;
        },
        438: function(module2, __unused_webpack_exports, __webpack_require__2) {
          var closest = __webpack_require__2(828);
          function _delegate(element, selector, type, callback, useCapture) {
            var listenerFn = listener.apply(this, arguments);
            element.addEventListener(type, listenerFn, useCapture);
            return {
              destroy: function() {
                element.removeEventListener(type, listenerFn, useCapture);
              }
            };
          }
          function delegate(elements, selector, type, callback, useCapture) {
            if (typeof elements.addEventListener === "function") {
              return _delegate.apply(null, arguments);
            }
            if (typeof type === "function") {
              return _delegate.bind(null, document).apply(null, arguments);
            }
            if (typeof elements === "string") {
              elements = document.querySelectorAll(elements);
            }
            return Array.prototype.map.call(elements, function(element) {
              return _delegate(element, selector, type, callback, useCapture);
            });
          }
          function listener(element, selector, type, callback) {
            return function(e) {
              e.delegateTarget = closest(e.target, selector);
              if (e.delegateTarget) {
                callback.call(element, e);
              }
            };
          }
          module2.exports = delegate;
        },
        879: function(__unused_webpack_module, exports2) {
          exports2.node = function(value) {
            return value !== void 0 && value instanceof HTMLElement && value.nodeType === 1;
          };
          exports2.nodeList = function(value) {
            var type = Object.prototype.toString.call(value);
            return value !== void 0 && (type === "[object NodeList]" || type === "[object HTMLCollection]") && "length" in value && (value.length === 0 || exports2.node(value[0]));
          };
          exports2.string = function(value) {
            return typeof value === "string" || value instanceof String;
          };
          exports2.fn = function(value) {
            var type = Object.prototype.toString.call(value);
            return type === "[object Function]";
          };
        },
        370: function(module2, __unused_webpack_exports, __webpack_require__2) {
          var is = __webpack_require__2(879);
          var delegate = __webpack_require__2(438);
          function listen(target, type, callback) {
            if (!target && !type && !callback) {
              throw new Error("Missing required arguments");
            }
            if (!is.string(type)) {
              throw new TypeError("Second argument must be a String");
            }
            if (!is.fn(callback)) {
              throw new TypeError("Third argument must be a Function");
            }
            if (is.node(target)) {
              return listenNode(target, type, callback);
            } else if (is.nodeList(target)) {
              return listenNodeList(target, type, callback);
            } else if (is.string(target)) {
              return listenSelector(target, type, callback);
            } else {
              throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
            }
          }
          function listenNode(node, type, callback) {
            node.addEventListener(type, callback);
            return {
              destroy: function() {
                node.removeEventListener(type, callback);
              }
            };
          }
          function listenNodeList(nodeList, type, callback) {
            Array.prototype.forEach.call(nodeList, function(node) {
              node.addEventListener(type, callback);
            });
            return {
              destroy: function() {
                Array.prototype.forEach.call(nodeList, function(node) {
                  node.removeEventListener(type, callback);
                });
              }
            };
          }
          function listenSelector(selector, type, callback) {
            return delegate(document.body, selector, type, callback);
          }
          module2.exports = listen;
        },
        817: function(module2) {
          function select(element) {
            var selectedText;
            if (element.nodeName === "SELECT") {
              element.focus();
              selectedText = element.value;
            } else if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
              var isReadOnly = element.hasAttribute("readonly");
              if (!isReadOnly) {
                element.setAttribute("readonly", "");
              }
              element.select();
              element.setSelectionRange(0, element.value.length);
              if (!isReadOnly) {
                element.removeAttribute("readonly");
              }
              selectedText = element.value;
            } else {
              if (element.hasAttribute("contenteditable")) {
                element.focus();
              }
              var selection = window.getSelection();
              var range = document.createRange();
              range.selectNodeContents(element);
              selection.removeAllRanges();
              selection.addRange(range);
              selectedText = selection.toString();
            }
            return selectedText;
          }
          module2.exports = select;
        },
        279: function(module2) {
          function E() {
          }
          E.prototype = {
            on: function(name, callback, ctx) {
              var e = this.e || (this.e = {});
              (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx
              });
              return this;
            },
            once: function(name, callback, ctx) {
              var self2 = this;
              function listener() {
                self2.off(name, listener);
                callback.apply(ctx, arguments);
              }
              listener._ = callback;
              return this.on(name, listener, ctx);
            },
            emit: function(name) {
              var data = [].slice.call(arguments, 1);
              var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
              var i = 0;
              var len = evtArr.length;
              for (i; i < len; i++) {
                evtArr[i].fn.apply(evtArr[i].ctx, data);
              }
              return this;
            },
            off: function(name, callback) {
              var e = this.e || (this.e = {});
              var evts = e[name];
              var liveEvents = [];
              if (evts && callback) {
                for (var i = 0, len = evts.length; i < len; i++) {
                  if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                    liveEvents.push(evts[i]);
                }
              }
              liveEvents.length ? e[name] = liveEvents : delete e[name];
              return this;
            }
          };
          module2.exports = E;
          module2.exports.TinyEmitter = E;
        }
      };
      var __webpack_module_cache__ = {};
      function __webpack_require__(moduleId) {
        if (__webpack_module_cache__[moduleId]) {
          return __webpack_module_cache__[moduleId].exports;
        }
        var module2 = __webpack_module_cache__[moduleId] = {
          exports: {}
        };
        __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
        return module2.exports;
      }
      !function() {
        __webpack_require__.n = function(module2) {
          var getter = module2 && module2.__esModule ? function() {
            return module2["default"];
          } : function() {
            return module2;
          };
          __webpack_require__.d(getter, { a: getter });
          return getter;
        };
      }();
      !function() {
        __webpack_require__.d = function(exports2, definition) {
          for (var key in definition) {
            if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
              Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
            }
          }
        };
      }();
      !function() {
        __webpack_require__.o = function(obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        };
      }();
      return __webpack_require__(686);
    }().default;
  });
})(clipboard);
var Clipboard = /* @__PURE__ */ getDefaultExportFromCjs(clipboard.exports);
var useClipboard = (opts) => {
  const appendToBody = (opts === null || opts === void 0 ? void 0 : opts.appendToBody) === void 0 ? true : opts.appendToBody;
  return {
    toClipboard(text, container) {
      return new Promise((resolve, reject) => {
        const fakeEl = document.createElement("button");
        const clipboard2 = new Clipboard(fakeEl, {
          text: () => text,
          action: () => "copy",
          container: container !== void 0 ? container : document.body
        });
        clipboard2.on("success", (e) => {
          clipboard2.destroy();
          resolve(e);
        });
        clipboard2.on("error", (e) => {
          clipboard2.destroy();
          reject(e);
        });
        if (appendToBody)
          document.body.appendChild(fakeEl);
        fakeEl.click();
        if (appendToBody)
          document.body.removeChild(fakeEl);
      });
    }
  };
};
useClipboard();
const envData = { configData: null };
const initEnv = () => {
  if (!inBrowser$1)
    return;
  const ua = navigator.userAgent;
  const isMac = /macintosh|mac os x/i.test(ua);
  Object.assign(envData, {
    isIos: /(iPhone|iPad|iPod|iOS)/i.test(ua) || isMac,
    isWeixin: /micromessenger/.test(ua.toLowerCase()),
    launchedUrl: location.href
  });
};
initEnv();
var __async$8 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const parseTimeData = parseTimeData$1;
const camelize = camelize$1;
const kebabCase = kebabCase$1;
const roundNumber = roundNumber$1;
const padNumber = padNumber$1;
const validatePhoneNumber = validatePhoneNumber$1;
function createNamespace(name) {
  const prefixedName = `fan-${name}`;
  return [camelize(prefixedName, true)];
}
function resolveAspectRatio(ar) {
  if (typeof ar === "string") {
    if (ar.includes("/") || ar.includes(":")) {
      const [a, b] = ar.replace("/", ":").split(":");
      return Number(a) / Number(b);
    }
    return Number(ar);
  }
  return ar;
}
function createUniqueId(opt) {
  return "" + ((opt == null ? void 0 : opt.prefix) || "") + Math.floor(Math.random() * 1e6).toString(36);
}
function mergeConcurrent(func) {
  const resolverList = [];
  let progress = false;
  return (...args) => {
    return new Promise((resolve, reject) => __async$8(this, null, function* () {
      resolverList.push({ resolve, reject });
      if (progress)
        return;
      progress = true;
      try {
        const ret = yield func(...args);
        resolverList.forEach((li) => li.resolve(ret));
      } catch (e) {
        resolverList.forEach((li) => li.reject(e));
      }
      resolverList.length = 0;
      progress = false;
    }));
  };
}
function isInnerRoute(url) {
  if (url && url.startsWith("http"))
    return true;
  return false;
}
var __defProp$6 = Object.defineProperty;
var __defProps$4 = Object.defineProperties;
var __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$6 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$6.call(b, prop))
      __defNormalProp$6(a, prop, b[prop]);
  if (__getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(b)) {
      if (__propIsEnum$6.call(b, prop))
        __defNormalProp$6(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$4 = (a, b) => __defProps$4(a, __getOwnPropDescs$4(b));
const getSystemInfo = () => __spreadProps$4(__spreadValues$6({}, getSystemInfo$1()), {
  statusBarHeight: 0,
  navBarHeight: 44
});
const isMpWeixinWeb = () => {
  if (typeof window === "undefined")
    return false;
  const ua = window.navigator.userAgent;
  return getSystemInfo$1().isWeixin && ua.includes("miniProgram");
};
const isDevPackage = () => {
  return process.env.NODE_ENV === "development" && location.pathname === "/mobile.html";
};
let rootFontSize;
function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }
  return isDevPackage() ? rootFontSize : 49.9999875;
}
function isCssRelativeSize(value) {
  const reg = /(em|%|vw|vh|calc|rem|rpx)/;
  return reg.test(String(value));
}
function getCssSizeValue(value) {
  if (typeof value === "string") {
    return parseFloat(value.replace(/-[^0-9.]/g, ""));
  }
  return value;
}
function transformSize(size) {
  if (!size)
    return size;
  const sizeStr = String(size);
  if (isCssRelativeSize(sizeStr) || sizeStr.includes("PX") || sizeStr.includes("Px")) {
    return sizeStr;
  }
  const val = getCssSizeValue(sizeStr);
  if (!val) {
    return sizeStr;
  }
  if (getRootFontSize()) {
    return val / getRootFontSize() + "rem";
  }
  return val + "px";
}
function transformStyleSize(style2) {
  if (!style2)
    return "";
  let styleObj = {};
  let hasColon = false;
  if (typeof style2 === "string") {
    if (style2.includes("://")) {
      hasColon = true;
      style2 = style2.replace("://", "{{colon//}}");
    }
    const couples = style2.split(";");
    couples.forEach((a) => {
      if (!a.trim())
        return;
      const [k, v] = a.split(":");
      styleObj[k.trim()] = v.trim();
    });
  } else if (typeof style2 === "object") {
    styleObj = style2;
  } else {
    return "";
  }
  let styleStr = "";
  for (let k in styleObj) {
    let v = styleObj[k];
    if (typeof v === "string") {
      if (v.includes("px"))
        v = v.replace(/[0-9.]+px/g, (a) => transformSize(a));
      if (hasColon)
        v = v.replace("{{colon//}}", "://");
    }
    styleStr += `${kebabCase(k)}:${v};`;
  }
  return styleStr;
}
function getElementNodes(selector, opt) {
  var _a2;
  const { selectAll = false, scope } = opt || {};
  const _scope = ((_a2 = scope == null ? void 0 : scope.vnode) == null ? void 0 : _a2.el) || document;
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
        var _a2;
        if (!isVNode(child))
          return;
        if (add(child))
          return;
        if ((_a2 = child.component) == null ? void 0 : _a2.subTree) {
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
const extend$3 = Object.assign;
function usePopupState() {
  const state = reactive({
    show: false
  });
  const toggle = (show) => {
    state.show = show;
  };
  const open = (props) => {
    extend$3(state, props);
    toggle(true);
  };
  const close = () => toggle(false);
  const instance2 = getCurrentInstance();
  if (instance2) {
    extend$3(instance2.proxy, { open, close, toggle });
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
const getStorage = getStorage$1;
const setStorage = setStorage$1;
var __async$7 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const AMAP_JS_ID = "amapJsSdkV2";
const AMAP_JS_KEY = "a126d4406aa25746600f622e9605ce8d";
const AMAP_JS_CODE = "87764e891f8b01aef5e8b62d333b008c";
const AMAP_LOAD_RES_OK = { success: true };
const { isWeixin } = getSystemInfo();
function loadAmapSdk() {
  return new Promise((resolve, reject) => {
    if (document.getElementById(AMAP_JS_ID)) {
      resolve(AMAP_LOAD_RES_OK);
      return;
    }
    const timer = setTimeout(() => {
      reject(new Error("高德SDK加载超时"));
    }, 2e3);
    const jsSdkCode = document.createElement("script");
    jsSdkCode.type = "text/javascript";
    jsSdkCode.innerHTML = 'window._AMapSecurityConfig={securityJsCode:"' + AMAP_JS_CODE + '"}';
    document.head.appendChild(jsSdkCode);
    const jsSdkLoader = document.createElement("script");
    jsSdkLoader.id = AMAP_JS_ID;
    jsSdkLoader.crossOrigin = "true";
    jsSdkLoader.src = "//webapi.amap.com/loader.js";
    jsSdkLoader.onload = function() {
      clearTimeout(timer);
      resolve(AMAP_LOAD_RES_OK);
    };
    document.head.appendChild(jsSdkLoader);
  });
}
function getGeolocationByAmap() {
  return new Promise((resolve, reject) => {
    loadAmapSdk().then(() => {
      window.AMapLoader.load({
        key: AMAP_JS_KEY,
        // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",
        // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geolocation"]
        // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        // "AMapUI": {},         // 是否加载 AMapUI，缺省不加载
        // "Loca":{"version": '2.0'}         // 是否加载 Loca， 缺省不加载
      }).then((AMap) => {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 1e4,
          maximumAge: 6e4,
          // 0: 可以使用IP定位 1: 手机设备禁止使用IP定位 2: PC上禁止使用IP定位 3: 所有终端禁止使用IP定位
          // IP也不准，所以禁用掉，后端IP解析为准
          noIpLocate: 3,
          // 0: 可以使用浏览器定位 1: 手机设备禁止使用浏览器定位 2: PC上禁止使用浏览器定位 3: 所有终端禁止使用浏览器定位
          noGeoLocation: 0,
          // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          convert: false,
          showButton: false
        });
        geolocation.getCurrentPosition((status, result) => {
          if (status === "complete") {
            const {
              location_type,
              accuracy,
              position: { lat, lng }
            } = result;
            resolve({ location_type, coords: { lat, lng }, accuracy });
          } else {
            reject(result.message);
          }
        });
      }).catch((e) => {
        reject(`高德SDK加载失败（${e.message}）`);
      });
    }).catch(reject);
  });
}
function getGeolocationByBrowser() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("该浏览器/页面不支持获取地理位置"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { accuracy, latitude, longitude } = position.coords;
        resolve({ coords: { lat: latitude, lng: longitude }, accuracy });
        console.log("浏览器地理位置精度：", accuracy);
      },
      (err) => {
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 1e4,
        maximumAge: 1e3 * 60
      }
    );
  });
}
function getGeolocationByWx() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!isWeixin || !window.wx) {
        reject("微信 jsApi（定位）需要微信环境及 jsSdk");
        return;
      }
      const timer = setTimeout(() => {
        reject(new Error("微信JS位置获取超时"));
      }, 4e3);
      window.wx.getLocation({
        type: "wgs84",
        // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: ({ latitude, longitude }) => {
          resolve({ coords: { lat: latitude, lng: longitude } });
          clearTimeout(timer);
        },
        fail: (e) => {
          reject(new Error(e.errMsg));
          clearTimeout(timer);
        }
      });
    }, 300);
  });
}
function getGeolocation() {
  return new Promise((resolve, reject) => __async$7(this, null, function* () {
    let result = null;
    let errMsg = "";
    if (isWeixin && window.wx) {
      try {
        result = yield getGeolocationByWx();
      } catch (e) {
        errMsg += e.message;
      }
    }
    if (!result) {
      try {
        result = yield getGeolocationByAmap();
      } catch (e) {
        errMsg += "-" + e.message;
      }
    }
    if (!result) {
      try {
        result = yield getGeolocationByBrowser();
      } catch (e) {
        errMsg += "-" + e.message;
      }
    }
    !result ? reject(new Error(errMsg)) : resolve(result);
  }));
}
const toastSfc = "";
const iconSfc = "";
const __vue_sfc__$M = defineComponent({
  name: createNamespace("Icon")[0],
  emits: ["click"],
  props: {
    /**
     * 图标名称或图片链接
     */
    name: String,
    size: {
      type: [String, Number],
      default: "inherit"
    },
    // css 属性
    verticalAlign: String,
    /**
     * 图标颜色：red，支持渐变：linear-gradient(to right, red, blue)
     */
    color: {
      type: [String, Number],
      default: "inherit"
    }
  },
  setup(props, { emit }) {
    const imgIcon = computed(() => {
      var _a2;
      return (_a2 = props.name) == null ? void 0 : _a2.includes("/");
    });
    const theStyle = computed(() => {
      const { name, color, size, verticalAlign } = props;
      const fsize = transformSize(size === "inherit" ? "14px" : size);
      let str = "";
      if (verticalAlign) {
        str += `--fan-icon-align-v:${verticalAlign};`;
      }
      if (imgIcon.value) {
        str += `width:${fsize};height:${fsize};`;
        if (color && color !== "inherit") {
          str += `-webkit-mask-image:url(${name});mask-image:url(${name});
						-webkit-mask-size:cover;mask-size:cover;
						background:${color};`;
        } else {
          str += `background:url(${name}) center / cover no-repeat;`;
        }
      } else {
        str += `font-size:${fsize};`;
        if (color == null ? void 0 : color.includes("-gradient")) {
          str += `color:transparent;background-image:${color};`;
        } else {
          str += `color:${color};`;
        }
      }
      return str;
    });
    const onClick2 = (e) => {
      emit("click", e);
    };
    return { imgIcon, theStyle, onClick: onClick2 };
  }
});
function __vue_render__$M(_ctx, _cache) {
  return _ctx.imgIcon ? (openBlock(), createElementBlock(
    "div",
    {
      key: 0,
      style: normalizeStyle(_ctx.theStyle),
      class: "fan-icon--img",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    null,
    4
    /* STYLE */
  )) : (openBlock(), createElementBlock(
    "div",
    {
      key: 1,
      style: normalizeStyle(_ctx.theStyle),
      class: normalizeClass(["fan-icon", "icon-" + _ctx.name]),
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    null,
    6
    /* CLASS, STYLE */
  ));
}
__vue_sfc__$M.render = __vue_render__$M;
var stdin_default$N = __vue_sfc__$M;
const loadingSfc = "";
const __vue_sfc__$L = defineComponent({
  name: createNamespace("Loading")[0],
  emits: ["click"],
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#c9c9c9"
    },
    type: {
      type: String,
      validator: (value) => ["circle", "circle2", "spinner", "line"].includes(value),
      // default: () => (getSystemInfo().isIos ? 'spinner' : 'circle2')
      default: "circle2"
    },
    size: {
      type: [String, Number],
      default: "30px"
    },
    textSize: {
      type: [String, Number],
      default: "14px"
    },
    /**
     * @default 跟随props.color
     */
    textColor: String,
    /**
     * 是否垂直排列图标和文字内容
     */
    vertical: Boolean
  },
  setup(props) {
    const array12 = Array.from({ length: 12 });
    const array3 = Array.from({ length: 3 });
    const theStyle = computed(() => {
      const { color, textSize, textColor } = props;
      return transformStyleSize({
        color: textColor || color,
        fontSize: textSize
      });
    });
    const iconStyle = computed(() => {
      const { size, color } = props;
      const s = transformSize(size);
      let str = `width:${s};height:${s};color:${color};`;
      return str;
    });
    return { array12, array3, theStyle, iconStyle };
  }
});
const _hoisted_1$A = { class: "fan-loading__t" };
function __vue_render__$L(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["fan-loading", {
        "fan-loading--inline": _ctx.inline,
        "fan-loading--vertical": _ctx.vertical
      }]),
      style: normalizeStyle(_ctx.theStyle),
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
    },
    [
      createElementVNode(
        "div",
        {
          class: normalizeClass(["fan-loading__i", "fan-loading__i--" + _ctx.type]),
          style: normalizeStyle(_ctx.iconStyle)
        },
        [
          _ctx.type === "spinner" ? (openBlock(true), createElementBlock(
            Fragment,
            { key: 0 },
            renderList(_ctx.array12, (_2, index2) => {
              return openBlock(), createElementBlock("div", {
                key: index2,
                class: "fan-loading__dot"
              });
            }),
            128
            /* KEYED_FRAGMENT */
          )) : createCommentVNode("v-if", true),
          _ctx.type === "line" ? (openBlock(true), createElementBlock(
            Fragment,
            { key: 1 },
            renderList(_ctx.array3, (_2, index2) => {
              return openBlock(), createElementBlock("div", {
                key: index2,
                class: "fan-loading__ldot"
              });
            }),
            128
            /* KEYED_FRAGMENT */
          )) : createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      ),
      createElementVNode("div", _hoisted_1$A, [
        renderSlot(_ctx.$slots, "default")
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__$L.render = __vue_render__$L;
var stdin_default$M = __vue_sfc__$L;
const __vue_sfc__$K = defineComponent({
  name: createNamespace("Toast")[0],
  components: { FanIcon: stdin_default$N, FanLoading: stdin_default$M },
  emits: ["update:show"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: String,
    icon: {
      type: String,
      default: "none",
      validator: (val) => ["none", "success", "error", "loading"].includes(val)
    },
    duration: {
      type: Number,
      default: 2e3
    }
  },
  setup(props, { emit }) {
    const innerShow = ref(props.show);
    const showIconType = computed(() => {
      const { icon } = props;
      if (icon === "none") {
        return "none";
      } else if (icon === "loading") {
        return "loading";
      } else {
        return "icon";
      }
    });
    watch(
      () => props.show,
      (val) => {
        innerShow.value = val;
      }
    );
    watch(innerShow, (val) => {
      emit("update:show", val);
      if (val && props.duration > 0)
        setTimeout(() => innerShow.value = false, props.duration);
    });
    return { showIconType, innerShow };
  }
});
const _hoisted_1$z = { class: "fan-toast__text" };
function __vue_render__$K(_ctx, _cache) {
  const _component_FanIcon = resolveComponent("FanIcon");
  const _component_FanLoading = resolveComponent("FanLoading");
  return openBlock(), createBlock(Transition, { name: "fan" }, {
    default: withCtx(() => [
      _ctx.innerShow ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(["fan-toast fan-flex-center fan-flex-col", _ctx.icon === "none" ? "fan-toast--text" : "fan-toast--icon"])
        },
        [
          _ctx.showIconType === "icon" ? (openBlock(), createBlock(_component_FanIcon, {
            key: 0,
            name: _ctx.icon === "success" ? "check" : "exclamation",
            size: "36",
            color: "#fff"
          }, null, 8, ["name"])) : _ctx.showIconType === "loading" ? (openBlock(), createBlock(_component_FanLoading, {
            key: 1,
            color: "#fff",
            size: "36"
          })) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            _hoisted_1$z,
            toDisplayString(_ctx.message),
            1
            /* TEXT */
          )
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)
    ]),
    _: 1
    /* STABLE */
  });
}
__vue_sfc__$K.render = __vue_render__$K;
var stdin_default$L = __vue_sfc__$K;
var __defProp$5 = Object.defineProperty;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
const defaultOptions$2 = {
  message: "",
  icon: "",
  duration: 2e3
};
let queue = [];
function parseOptions$1(message) {
  if (typeof message === "object")
    return message;
  return {
    message: message ? String(message) : ""
  };
}
function createInstance$2() {
  const {
    instance: instance2
  } = mountComponent({
    setup() {
      const {
        open,
        state,
        close,
        toggle
      } = usePopupState();
      const render = () => {
        return createVNode(stdin_default$L, mergeProps(state, {
          "onUpdate:show": toggle
        }), null);
      };
      getCurrentInstance().render = render;
      return {
        open,
        close
      };
    }
  });
  return instance2;
}
function getInstance() {
  if (!queue.length) {
    const instance2 = createInstance$2();
    queue.push(instance2);
  }
  return queue[queue.length - 1];
}
const create = (options, o = {
  icon: "none"
}) => {
  const toast2 = getInstance();
  const parsedOptions = parseOptions$1(options);
  toast2.open(__spreadValues$5(__spreadValues$5(__spreadValues$5({}, defaultOptions$2), parsedOptions), o));
  return toast2;
};
const toast = (options) => create(options);
toast.success = (options) => create(options, {
  icon: "success"
});
toast.error = (options) => create(options, {
  icon: "error"
});
toast.loading = (options) => create(options, {
  icon: "loading",
  duration: 0
});
toast.clear = () => {
  if (queue.length) {
    queue.forEach((toast2) => {
      toast2.close();
    });
    queue = [];
  }
};
const Toast = stdin_default$L;
const dialogSfc = "";
const buttonSfc = "";
const __vue_sfc__$J = defineComponent({
  name: createNamespace("Button")[0],
  components: {
    FanLoading: stdin_default$M,
    FanIcon: stdin_default$N
  },
  emits: ["click"],
  props: {
    color: String,
    background: String,
    // 将废弃⚠️
    bg: String,
    width: String,
    height: String,
    margin: String,
    padding: String,
    flex1: {
      type: Boolean,
      default: false
    },
    textSize: {
      type: [String, Number]
    },
    textColor: String,
    bold: [Boolean, Number, String],
    /**
     * 图标或图片链接，同 Icon 组件的 name属性
     */
    icon: String,
    /**
     * 图标/loading的大小
     * @default textSize
     */
    iconSize: [String, Number],
    iconPosition: {
      type: String,
      validator: (value) => ["left", "right"].includes(value),
      default: "left"
    },
    // 图标与文字的间距
    iconPad: [String, Number],
    /**
     * 是否为块级元素
     */
    block: {
      type: Boolean,
      default: false
    },
    /**
     * 是否为朴素按钮
     */
    plain: {
      type: Boolean,
      default: false
    },
    /**
     * 是否有边框，plain朴素按钮时生效
     */
    border: {
      type: [Boolean, String],
      default: true
    },
    round: {
      type: Boolean,
      default: false
    },
    /**
     * 圆角
     */
    radius: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 是否使用 0.5px 边框
     */
    hairline: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: String,
    // 同 Loading 组件的 type属性
    loadingType: String
  },
  setup(props, context) {
    const theStyle = computed(() => {
      const {
        color,
        bg: _bg,
        background,
        plain,
        textSize,
        textColor,
        bold,
        round,
        radius,
        iconPad
      } = props;
      const obj = {};
      ["width", "height", "padding", "margin"].forEach(
        (k) => props[k] && (obj[k] = props[k])
      );
      const bg = _bg || background || (plain ? "transparent" : color);
      if (bg)
        obj["--fan-btn-bg"] = bg;
      const c = textColor || (plain ? color || "var(--fan-primary-color)" : !color ? "" : "white");
      if (c)
        obj["--fan-btn-text-color"] = c;
      if (!isCssRelativeSize(textSize) && /(Chrome|Safari)/.test(window == null ? void 0 : window.navigator.userAgent)) {
        let zoom = parseFloat(textSize, 10) / 12;
        if (zoom < 1)
          obj["zoom"] = zoom;
      }
      if (textSize)
        obj.fontSize = transformSize(textSize);
      if (iconPad)
        obj["--fan-btn-icon-pad"] = transformSize(iconPad);
      if (typeof bold === "number" || typeof bold === "string" && Number(bold) >= 100) {
        obj.fontWeight = bold;
      }
      if (plain && color)
        obj["--fan-btn-border-color"] = color;
      if (radius || radius === 0)
        obj["--fan-btn-border-radius"] = radius;
      else if (round)
        obj["--fan-btn-border-radius"] = "var(--fan-radius-max)";
      return transformStyleSize(obj);
    });
    const theIconSize = computed(() => {
      return props.iconSize || props.textSize;
    });
    const theIconPosition = computed(() => {
      const { icon, iconPosition, loading } = props;
      if (loading)
        return "left";
      if (!icon)
        return "none";
      return iconPosition;
    });
    const showText = computed(() => {
      const { loading, loadingText } = props;
      return !loading || !loadingText;
    });
    const onClick2 = (e) => {
      context.emit("click", e);
    };
    return { theStyle, theIconSize, theIconPosition, showText, onClick: onClick2 };
  }
});
const _hoisted_1$y = ["disabled"];
const _hoisted_2$h = {
  key: 0,
  class: "fan-btn__hairline"
};
function __vue_render__$J(_ctx, _cache) {
  const _component_FanLoading = resolveComponent("FanLoading");
  const _component_FanIcon = resolveComponent("FanIcon");
  return openBlock(), createElementBlock("button", {
    class: normalizeClass(["fan-btn", {
      "fan-btn--f1": _ctx.flex1,
      "fan-btn--block": _ctx.block,
      "fan-btn--disabled": _ctx.disabled,
      "fan-btn--noborder": !_ctx.border,
      "fan-btn--hairline": _ctx.hairline,
      "fan-btn--plain": _ctx.plain,
      "fan-btn--bold": _ctx.bold
    }]),
    "hover-class": "none",
    style: normalizeStyle(_ctx.theStyle),
    disabled: _ctx.disabled,
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }, [
    _ctx.hairline ? (openBlock(), createElementBlock("div", _hoisted_2$h)) : createCommentVNode("v-if", true),
    _ctx.loading ? (openBlock(), createBlock(_component_FanLoading, {
      key: 1,
      color: "currentColor",
      type: _ctx.loadingType,
      size: _ctx.theIconSize,
      "text-size": _ctx.textSize,
      "text-color": "inherit"
    }, {
      default: withCtx(() => [
        createTextVNode(
          toDisplayString(_ctx.loadingText),
          1
          /* TEXT */
        )
      ]),
      _: 1
      /* STABLE */
    }, 8, ["type", "size", "text-size"])) : createCommentVNode("v-if", true),
    _ctx.theIconPosition === "left" ? (openBlock(), createBlock(_component_FanIcon, {
      key: 2,
      name: _ctx.icon,
      color: "currentColor",
      size: _ctx.theIconSize
    }, null, 8, ["name", "size"])) : createCommentVNode("v-if", true),
    _ctx.showText ? (openBlock(), createElementBlock(
      "div",
      {
        key: 3,
        class: normalizeClass(["fan-btn__in", [`fan-btn--i${_ctx.theIconPosition}`]])
      },
      [
        renderSlot(_ctx.$slots, "default")
      ],
      2
      /* CLASS */
    )) : createCommentVNode("v-if", true),
    _ctx.theIconPosition === "right" ? (openBlock(), createBlock(_component_FanIcon, {
      key: 4,
      name: _ctx.icon,
      color: "currentColor",
      size: _ctx.theIconSize
    }, null, 8, ["name", "size"])) : createCommentVNode("v-if", true)
  ], 14, _hoisted_1$y);
}
__vue_sfc__$J.render = __vue_render__$J;
var stdin_default$K = __vue_sfc__$J;
const __vue_sfc__$I = defineComponent({
  name: createNamespace("Dialog")[0],
  components: { FanButton: stdin_default$K },
  emits: ["update:show", "confirm", "cancel"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    message: String,
    cancelText: {
      type: String,
      default: "取消"
    },
    cancelColor: {
      type: String,
      default: "#84878F"
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    confirmColor: {
      type: String,
      default: "#F7931E"
    },
    callback: {
      type: Function,
      default: () => {
      }
    }
  },
  setup(props, { emit }) {
    const innerShow = ref(props.show);
    watch(
      () => props.show,
      (val) => {
        if (props.message || props.title)
          innerShow.value = val;
      }
    );
    watch(innerShow, (val) => emit("update:show", val));
    const getActionHandler = (action) => {
      var _a2;
      emit(action);
      innerShow.value = false;
      (_a2 = props.callback) == null ? void 0 : _a2.call(props, action);
    };
    const onCancel = () => getActionHandler("cancel");
    const onConfirm = () => getActionHandler("confirm");
    return { innerShow, onCancel, onConfirm };
  }
});
const _hoisted_1$x = {
  key: 0,
  class: "fan-dialog__o"
};
const _hoisted_2$g = { class: "fan-dialog" };
const _hoisted_3$9 = { class: "fan-dialog__inner" };
const _hoisted_4$6 = {
  key: 0,
  class: "fan-dialog__t"
};
const _hoisted_5$4 = { class: "fan-flex fan-hairline--top" };
function __vue_render__$I(_ctx, _cache) {
  return openBlock(), createBlock(Transition, { name: "fan" }, {
    default: withCtx(() => [
      _ctx.innerShow ? (openBlock(), createElementBlock("div", _hoisted_1$x, [
        createElementVNode("div", _hoisted_2$g, [
          createElementVNode("div", _hoisted_3$9, [
            _ctx.title ? (openBlock(), createElementBlock(
              "div",
              _hoisted_4$6,
              toDisplayString(_ctx.title),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            createElementVNode(
              "div",
              {
                class: normalizeClass(["fan-dialog__c", { "fan-dialog__his_title": !_ctx.title }])
              },
              toDisplayString(_ctx.message),
              3
              /* TEXT, CLASS */
            )
          ]),
          createElementVNode("div", _hoisted_5$4, [
            _ctx.showCancel ? (openBlock(), createElementBlock(
              "div",
              {
                key: 0,
                class: "fan-dialog__btn fan-flex-center fan-hairline--right fan-dialog__cancel",
                style: normalizeStyle({ "--dialog-cancel": _ctx.cancelColor }),
                onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onCancel && _ctx.onCancel(...args))
              },
              toDisplayString(_ctx.cancelText),
              5
              /* TEXT, STYLE */
            )) : createCommentVNode("v-if", true),
            createElementVNode(
              "div",
              {
                class: "fan-dialog__btn fan-flex-center",
                style: normalizeStyle({ "--dialog-confirm": _ctx.confirmColor }),
                onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onConfirm && _ctx.onConfirm(...args))
              },
              toDisplayString(_ctx.confirmText),
              5
              /* TEXT, STYLE */
            )
          ])
        ])
      ])) : createCommentVNode("v-if", true)
    ]),
    _: 1
    /* STABLE */
  });
}
__vue_sfc__$I.render = __vue_render__$I;
var stdin_default$J = __vue_sfc__$I;
var __defProp$4 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
const defaultOptions$1 = {
  title: "",
  message: "",
  cancelText: "取消",
  cancelColor: "#84878F",
  showCancel: false,
  confirmText: "确定",
  confirmColor: "#F7931E",
  callback: null
};
let instance;
function parseOptions(message) {
  if (typeof message === "object")
    return message;
  return {
    message: message ? String(message) : ""
  };
}
const createInstance$1 = () => {
  const Wrapper = {
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      return () => createVNode(stdin_default$J, mergeProps(state, {
        "onUpdate:show": toggle
      }), null);
    }
  };
  ({
    instance
  } = mountComponent(Wrapper));
};
const dialog = (options) => {
  return new Promise((resolve, reject) => {
    if (!instance) {
      createInstance$1();
    }
    const parsedOptions = parseOptions(options);
    instance.open(__spreadProps$3(__spreadValues$4(__spreadValues$4({}, defaultOptions$1), parsedOptions), {
      callback: (action) => {
        console.log(action);
        (action === "confirm" ? resolve : reject)(action);
      }
    }));
  });
};
dialog.confirm = (options) => {
  const parsedOptions = parseOptions(options);
  return dialog(__spreadProps$3(__spreadValues$4({}, parsedOptions), {
    showCancel: true
  }));
};
const Dialog = stdin_default$J;
const inputSfc = "";
const __vue_sfc__$H = defineComponent({
  name: createNamespace("Input")[0],
  components: { FanIcon: stdin_default$N },
  props: {
    readonly: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    prefixIcon: String,
    prefixColor: {
      type: String,
      default: "var(--fan-black-2)"
    },
    prefixSize: {
      type: [String, Number],
      default: 17
    },
    suffixIcon: String,
    suffixColor: {
      type: String,
      default: "var(--fan-black-2)"
    },
    suffixSize: {
      type: [String, Number],
      default: 17
    },
    // TODO: 小程序特有属性渐进增强
    type: {
      type: String,
      default: "text"
    },
    inputStyle: String,
    placeholder: String,
    autofocus: Boolean,
    placeholderColor: {
      type: String,
      default: "#C4C7CC"
    },
    clearable: {
      type: [Boolean, String],
      default: false
    },
    label: String,
    labelStyle: String,
    border: {
      type: [Boolean, String],
      default: false
    }
  },
  emits: [
    "update:modelValue",
    "input",
    "change",
    "confirm",
    "blur",
    "focus",
    "clear"
  ],
  setup(props, context) {
    const theStyle = computed(
      () => `--fan-input-placeholder-color:${props.placeholderColor};`
    );
    const inStyle = computed(() => transformStyleSize(props.inputStyle));
    const labStyle = computed(() => transformStyleSize(props.labelStyle));
    const innerValue = ref("");
    watch(innerValue, (val) => {
      if (val !== props.modelValue)
        context.emit("update:modelValue", val);
      context.emit("input", val);
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== innerValue.value)
          innerValue.value = val;
      },
      { immediate: true }
    );
    const handleInput = (e) => {
      innerValue.value = e.target.value;
    };
    const handleChange = (e) => {
      context.emit(e, innerValue.value);
    };
    const onClear = () => {
      innerValue.value = "";
      context.emit("clear", "");
    };
    const focused = ref(false);
    const onFocus = (e) => {
      focused.value = true;
      context.emit("focus", e);
    };
    const onBlur = (e) => {
      setTimeout(() => {
        focused.value = false;
      }, 100);
      context.emit("blur", e);
    };
    return {
      theStyle,
      inStyle,
      labStyle,
      innerValue,
      focused,
      handleChange,
      handleInput,
      onClear,
      onFocus,
      onBlur
    };
  }
});
const _hoisted_1$w = ["type", "value", "readonly", "disabled", "autofocus", "placeholder", "placeholder-style"];
function __vue_render__$H(_ctx, _cache) {
  const _component_FanIcon = resolveComponent("FanIcon");
  return openBlock(), createElementBlock(
    "div",
    {
      style: normalizeStyle(_ctx.theStyle),
      class: normalizeClass(["fan-input__wrap", { "fan-hairline--bottom": _ctx.border }])
    },
    [
      _ctx.prefixIcon ? (openBlock(), createBlock(_component_FanIcon, {
        key: 0,
        name: _ctx.prefixIcon,
        color: _ctx.prefixColor,
        size: _ctx.prefixSize,
        style: { "margin-right": "4px" }
      }, null, 8, ["name", "color", "size"])) : createCommentVNode("v-if", true),
      _ctx.label ? (openBlock(), createElementBlock(
        "div",
        {
          key: 1,
          style: normalizeStyle(_ctx.labStyle),
          class: "fan-input__label"
        },
        toDisplayString(_ctx.label),
        5
        /* TEXT, STYLE */
      )) : createCommentVNode("v-if", true),
      createElementVNode("input", {
        class: normalizeClass(["fan-input", [
          { "fan-input--disabled": _ctx.disabled },
          { "fan-input--unreal": _ctx.disabled || _ctx.readonly }
        ]]),
        type: _ctx.type,
        value: _ctx.innerValue,
        readonly: _ctx.readonly,
        disabled: _ctx.disabled || _ctx.readonly,
        autofocus: _ctx.autofocus ? "autofocus" : "",
        style: normalizeStyle(_ctx.inStyle),
        placeholder: _ctx.placeholder,
        "placeholder-style": `color:${_ctx.placeholderColor};`,
        onBlur: _cache[0] || (_cache[0] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
        onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
        onChange: _cache[2] || (_cache[2] = ($event) => _ctx.handleChange("change")),
        onInput: _cache[3] || (_cache[3] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
        onKeyup: _cache[4] || (_cache[4] = withKeys(($event) => _ctx.handleChange("confirm"), ["enter"])),
        onConfirm: _cache[5] || (_cache[5] = ($event) => _ctx.handleChange("confirm"))
      }, null, 46, _hoisted_1$w),
      _ctx.clearable && _ctx.innerValue && _ctx.focused ? (openBlock(), createBlock(_component_FanIcon, {
        key: 2,
        name: "close-circle-fill",
        color: "var(--fan-black-2)",
        size: 16,
        onClick: _ctx.onClear
      }, null, 8, ["onClick"])) : createCommentVNode("v-if", true),
      _ctx.suffixIcon ? (openBlock(), createBlock(_component_FanIcon, {
        key: 3,
        name: _ctx.suffixIcon,
        color: _ctx.suffixColor,
        size: _ctx.suffixSize,
        style: { "margin-right": "4px" }
      }, null, 8, ["name", "color", "size"])) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__$H.render = __vue_render__$H;
var stdin_default$I = __vue_sfc__$H;
const textareaSfc = "";
const __vue_sfc__$G = defineComponent({
  name: createNamespace("Textarea")[0],
  components: { FanIcon: stdin_default$N },
  props: {
    label: String,
    labelStyle: String,
    inputStyle: String,
    limitStyle: String,
    placeholder: String,
    placeholderColor: {
      type: String,
      default: "#C4C7CC"
    },
    readonly: {
      type: [Boolean, String],
      default: false
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    maxLength: {
      type: [String, Number],
      default: -1
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    prefixIcon: String,
    prefixColor: {
      type: String,
      default: "var(--fan-black-2)"
    },
    prefixSize: {
      type: [String, Number],
      default: 17
    },
    border: {
      type: [Boolean, String],
      default: false
    }
  },
  emits: ["update:modelValue", "input", "change", "confirm", "blur", "focus"],
  setup(props, { emit }) {
    const theStyle = computed(
      () => `--fan-textarea-placeholder-color:${props.placeholderColor};`
    );
    const labStyle = computed(() => transformStyleSize(props.labelStyle));
    const inStyle = computed(() => transformStyleSize(props.inputStyle));
    const limStyle = computed(() => transformStyleSize(props.limitStyle));
    const innerValue = ref("");
    watch(innerValue, (val) => {
      if (val !== props.modelValue)
        emit("update:modelValue", val);
      emit("input", val);
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== innerValue.value)
          innerValue.value = val;
      },
      { immediate: true }
    );
    const handleInput = (e) => innerValue.value = e.target.value;
    const onFocus = (e) => emit("focus", e);
    const onBlur = (e) => emit("blur", e);
    const handleChange = (e) => emit(e, innerValue.value);
    return {
      theStyle,
      labStyle,
      inStyle,
      limStyle,
      innerValue,
      handleInput,
      onFocus,
      onBlur,
      handleChange
    };
  }
});
const _hoisted_1$v = { class: "fan-textarea__wrap" };
const _hoisted_2$f = ["maxlength", "value", "placeholder-style", "placeholder", "readonly", "disabled"];
function __vue_render__$G(_ctx, _cache) {
  const _component_FanIcon = resolveComponent("FanIcon");
  return openBlock(), createElementBlock(
    "div",
    {
      style: normalizeStyle(_ctx.theStyle),
      class: normalizeClass(["fan-textarea__body", { "fan-hairline--bottom": _ctx.border }])
    },
    [
      createElementVNode("div", _hoisted_1$v, [
        _ctx.prefixIcon ? (openBlock(), createBlock(_component_FanIcon, {
          key: 0,
          name: _ctx.prefixIcon,
          color: _ctx.prefixColor,
          size: _ctx.prefixSize,
          "custom-style": "margin-right:4px;"
        }, null, 8, ["name", "color", "size"])) : createCommentVNode("v-if", true),
        _ctx.label ? (openBlock(), createElementBlock(
          "div",
          {
            key: 1,
            style: normalizeStyle(_ctx.labStyle),
            class: "fan-textarea__label"
          },
          toDisplayString(_ctx.label),
          5
          /* TEXT, STYLE */
        )) : createCommentVNode("v-if", true),
        createElementVNode("textarea", {
          class: normalizeClass(["fan-textarea", { "fan-textarea--disabled": _ctx.disabled }]),
          maxlength: _ctx.maxLength,
          style: normalizeStyle(_ctx.inStyle),
          value: _ctx.innerValue,
          "placeholder-style": `color:${_ctx.placeholderColor};`,
          placeholder: _ctx.placeholder,
          readonly: _ctx.readonly,
          disabled: _ctx.disabled || _ctx.readonly,
          onInput: _cache[0] || (_cache[0] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
          onFocus: _cache[2] || (_cache[2] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
          onChange: _cache[3] || (_cache[3] = ($event) => _ctx.handleChange("change")),
          onKeyup: _cache[4] || (_cache[4] = withKeys(($event) => _ctx.handleChange("confirm"), ["enter"])),
          onConfirm: _cache[5] || (_cache[5] = ($event) => _ctx.handleChange("confirm"))
        }, null, 46, _hoisted_2$f)
      ]),
      _ctx.maxLength > 0 && _ctx.showWordLimit ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          style: normalizeStyle(_ctx.limStyle),
          class: "fan-textarea__limit"
        },
        toDisplayString(_ctx.innerValue.length > _ctx.maxLength ? _ctx.maxLength : _ctx.innerValue.length) + "/" + toDisplayString(_ctx.maxLength > 0 ? _ctx.maxLength : 0),
        5
        /* TEXT, STYLE */
      )) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__$G.render = __vue_render__$G;
var stdin_default$H = __vue_sfc__$G;
const pickerSfc = "";
const popupSfc = "";
const overlaySfc = "";
const __vue_sfc__$F = defineComponent({
  name: createNamespace("Overlay")[0],
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    zIndex: {
      type: [String, Number],
      default: 1
    },
    duration: {
      type: [String, Number],
      default: 0.3
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const theStyle = computed(() => {
      const { zIndex, duration } = props;
      return `z-index:${zIndex};--fan-overlay-time:${duration}s;`;
    });
    const isShow = ref(props.show);
    const className = ref("");
    const enter = (show) => {
      className.value = "fan-overlay-enter-active";
      isShow.value = show;
      setTimeout(() => {
        className.value = "";
      }, props.duration * 1e3);
    };
    const leave = (show) => {
      className.value = "fan-overlay-leave-active";
      setTimeout(() => {
        isShow.value = show;
        className.value = "";
      }, props.duration * 1e3);
    };
    const close = () => {
      emit("click");
    };
    watch(
      () => props.show,
      (val, old) => {
        if (val === old)
          return;
        val ? enter(val) : leave(val);
      }
    );
    const fn = () => null;
    return { isShow, theStyle, className, close, fn };
  }
});
function __vue_render__$F(_ctx, _cache) {
  return _ctx.isShow ? (openBlock(), createElementBlock(
    "div",
    {
      key: 0,
      class: normalizeClass(["fan-overlay", _ctx.className]),
      style: normalizeStyle(_ctx.theStyle),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.close && _ctx.close(...args)),
      onTouchmove: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.fn && _ctx.fn(...args), ["prevent", "stop"]))
    },
    [
      renderSlot(_ctx.$slots, "default")
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  )) : createCommentVNode("v-if", true);
}
__vue_sfc__$F.render = __vue_render__$F;
var stdin_default$G = __vue_sfc__$F;
const __vue_sfc__$E = defineComponent({
  name: createNamespace("Popup")[0],
  components: { FanOverlay: stdin_default$G, FanButton: stdin_default$K },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    position: {
      type: String,
      validator(value) {
        return ["center", "top", "bottom", "right", "left"].includes(value);
      },
      default: "center"
    },
    /**
     * 圆角
     * @default 12px
     * @description true-默认值 false-0
     */
    round: {
      type: [Boolean, Number, String],
      default: "12px"
    },
    zIndex: {
      type: [String, Number],
      default: 1e3
    },
    duration: {
      type: [String, Number],
      default: 0.3
    },
    title: String,
    titleAlign: {
      type: String,
      default: "center",
      validator: (value) => ["left", "center", "right"].includes(value)
    },
    overlayStyle: {
      type: [Object, String]
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    closeable: {
      type: Boolean,
      default: false
    },
    closeIcon: {
      type: String,
      default: "close"
    },
    closeIconColor: {
      type: String,
      default: "#c8c9cc"
    },
    contStyle: [Object, String],
    // 底部安全区域
    safeBottom: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:show", "clickOverlay", "closed"],
  setup(props, { emit }) {
    const overlayShow = ref(props.show);
    const innerShow = ref(props.show);
    const time = ref(null);
    const className = ref("");
    const enter = () => {
      innerShow.value = true;
      className.value = `fan-popup-${props.position}-enter-from`;
      setTimeout(() => {
        className.value = "";
      }, 0);
    };
    const leave = () => {
      className.value = `fan-popup-${props.position}-leave-active`;
      time.value = setTimeout(() => {
        className.value = "";
        innerShow.value = false;
        emit("update:show", false);
        emit("closed");
      }, props.duration * 1e3);
    };
    watch(
      () => props.show,
      (val) => {
        if (className.value)
          return;
        overlayShow.value = val;
        clearTimeout(time.value);
        val ? enter() : leave();
      }
    );
    const theStyle = computed(() => {
      const { round, zIndex, duration, contStyle } = props;
      const obj = {
        zIndex,
        "--fan-popup-time": `${duration}s`
      };
      if (round !== false && Number(round) !== 0) {
        obj["--fan-popup-radius"] = transformSize(
          round === true || !Number(round) ? "12px" : round
        );
      }
      return transformStyleSize(contStyle) + transformStyleSize(obj);
    });
    const overlayClick = () => {
      emit("clickOverlay");
      if (!props.closeOnClickOverlay)
        return;
      emit("update:show", false);
    };
    return { overlayShow, innerShow, theStyle, className, leave, overlayClick };
  }
});
function __vue_render__$E(_ctx, _cache) {
  const _component_FanOverlay = resolveComponent("FanOverlay");
  const _component_FanButton = resolveComponent("FanButton");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      createVNode(_component_FanOverlay, {
        style: normalizeStyle(_ctx.overlayStyle),
        show: _ctx.overlayShow,
        "z-index": _ctx.zIndex,
        duration: _ctx.duration,
        onClick: _ctx.overlayClick
      }, null, 8, ["style", "show", "z-index", "duration", "onClick"]),
      _ctx.innerShow ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass([
            "fan-popup",
            "fan-popup--" + _ctx.position,
            { safe: _ctx.safeBottom },
            _ctx.className
          ]),
          style: normalizeStyle(_ctx.theStyle)
        },
        [
          _ctx.title ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(["fan-popup__title", "fan-popup__title--" + _ctx.titleAlign])
            },
            toDisplayString(_ctx.title),
            3
            /* TEXT, CLASS */
          )) : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "default"),
          _ctx.closeable ? (openBlock(), createBlock(_component_FanButton, {
            key: 1,
            style: { "position": "absolute", "top": "0", "right": "2px" },
            "icon-size": "16",
            padding: "0",
            width: "40px",
            icon: _ctx.closeIcon,
            color: _ctx.closeIconColor,
            border: false,
            plain: true,
            onClick: _ctx.leave
          }, null, 8, ["icon", "color", "onClick"])) : createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      )) : createCommentVNode("v-if", true)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
__vue_sfc__$E.render = __vue_render__$E;
var stdin_default$F = __vue_sfc__$E;
const pickerColumnSfc = "";
const __vue_sfc__$D = defineComponent({
  props: {
    items: Array,
    value: Array,
    index: Number
  },
  emits: ["selectItem"],
  setup(props, { emit }) {
    const currentOffset = ref(110);
    const selectVal = ref();
    let start = 0;
    let newOffset = currentOffset.value;
    const colStyle = computed(() => {
      const s = `transform: translate3d(0, ${currentOffset.value}px, 0)`;
      return transformStyleSize(s);
    });
    const onTouchstart = (e) => {
      selectVal.value = null;
      start = e.touches[0].screenY;
      newOffset = currentOffset.value;
    };
    const onTouchmove = (e) => {
      if (!props.items.find((item) => !item.disabled))
        return;
      const y = e.touches[0].screenY;
      if (y > start) {
        currentOffset.value = newOffset + (y - start);
      } else {
        currentOffset.value = newOffset - (start - y);
      }
    };
    const onTouchEnd2 = (items) => {
      var _a2;
      if (!(items == null ? void 0 : items.find((item) => !item.disabled)))
        return;
      let i = Number(
        String(Math.floor(currentOffset.value / 44) - 2).replace(/\-/g, "")
      );
      if (typeof selectVal.value === "number")
        i = selectVal.value;
      if (i > props.items.length - 1) {
        i = props.items.length - 1;
      } else if (currentOffset.value > 110) {
        currentOffset.value = 110;
        i = 0;
      }
      if (items && ((_a2 = items[i]) == null ? void 0 : _a2.disabled)) {
        selectVal.value = i += 1;
        if (selectVal.value >= items.length)
          selectVal.value -= 2;
        onTouchEnd2(items);
        return;
      }
      currentOffset.value = 110 - i * 44;
      emit("selectItem", { level: props.index, select: i });
    };
    watch(
      () => props.value,
      (val, oldVal) => {
        if (val && selectVal.value != val[props.index]) {
          selectVal.value = val[props.index];
          onTouchEnd2(props.items);
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
    return {
      currentOffset,
      colStyle,
      onTouchstart,
      onTouchmove,
      onTouchEnd: onTouchEnd2
    };
  }
});
const _hoisted_1$u = { class: "fan-ellipsis" };
function __vue_render__$D(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: "fan-picker__box",
      onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.onTouchstart && _ctx.onTouchstart(...args)),
      onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.onTouchmove && _ctx.onTouchmove(...args)),
      onTouchend: _cache[2] || (_cache[2] = ($event) => _ctx.onTouchEnd(_ctx.items)),
      onTouchcancel: _cache[3] || (_cache[3] = ($event) => _ctx.onTouchEnd(_ctx.items))
    },
    [
      createElementVNode(
        "div",
        {
          class: "fan-picker__l",
          style: normalizeStyle(_ctx.colStyle)
        },
        [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.items, (item, i) => {
              return openBlock(), createElementBlock(
                "div",
                {
                  key: i,
                  class: normalizeClass(["fan-flex-center fan-picker__txt", { "fan-picker__d": item.disabled }])
                },
                [
                  createElementVNode(
                    "div",
                    _hoisted_1$u,
                    toDisplayString(item.text),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        4
        /* STYLE */
      )
    ],
    32
    /* NEED_HYDRATION */
  );
}
__vue_sfc__$D.render = __vue_render__$D;
var stdin_default$E = __vue_sfc__$D;
const __vue_sfc__$C = defineComponent({
  name: createNamespace("Picker")[0],
  emits: ["confirm", "update:modelValue"],
  components: { FanPopup: stdin_default$F, FanButton: stdin_default$K, PickerColumn: stdin_default$E },
  props: {
    title: String,
    modelValue: {
      type: Boolean,
      default: false
    },
    /**
     * 格式1: item[]
     * 格式2-多列: [item[], item[], item[]]
     * 格式3-多列级联: item[]，其中 item 为带 children 的对象格式
     *
     * item格式：1-直接字符串: '杭州', 2-对象: { [valueKey]: '杭州', children?: item[], disabled?: false }
     */
    data: Array,
    // 选项对象中(item为对象格式时)，选项文字对应的键名
    textKey: {
      type: String,
      default: "text"
    },
    // 选择了每列中的第几个（下标从 0 开始）组成的数组
    value: {
      type: Array
    }
  },
  setup(props, { emit }) {
    const show = ref(false);
    const list = ref([]);
    const column = ref();
    const selectValue = ref(props.value);
    let isCascade = false;
    watch(
      () => props.modelValue,
      (val) => {
        if (show.value !== val)
          show.value = val;
      }
    );
    watch(show, (val) => {
      if (props.modelValue !== val)
        emit("update:modelValue", val);
    });
    const onCancel = () => show.value = false;
    const selectItem = (val) => {
      if (selectValue.value[val.level] !== val.select) {
        selectValue.value[val.level] = val.select;
        if (isCascade) {
          const d = list.value[val.level][val.select];
          list.value.splice(val.level + 1, list.value.length);
          if (d.children && d.children.length)
            formatCascade(d.children);
        }
        selectValue.value.forEach((item, i) => {
          var _a2;
          if (i > val.level) {
            selectValue.value[i] = 0;
            const index2 = (_a2 = list.value[i]) == null ? void 0 : _a2.findIndex((item2) => !item2.disabled);
            if (![-1, 0].includes(index2)) {
              selectValue.value[i] = index2;
              nextTick$1(() => {
                var _a22;
                column.value = column.value.sort((a, b) => a.index - b.index);
                (_a22 = column.value[i]) == null ? void 0 : _a22.onTouchEnd(list.value[i]);
              });
            }
          }
        });
      }
    };
    const onConfirm = () => emit("confirm", selectValue.value);
    const formatItem = () => {
      const { data, textKey } = props;
      return data.map((items) => {
        if (items.length) {
          return items.map((item) => ({
            text: item[textKey],
            disabled: item.disabled
          }));
        } else {
          return {
            text: items[textKey],
            disabled: items.disabled
          };
        }
      });
    };
    const formatCascade = (data) => {
      const { textKey } = props;
      const l = data.map((item) => ({
        text: item[textKey],
        disabled: item.disabled,
        children: item.children
      }));
      list.value.push(l);
      if (l[0].children && l[0].children.length)
        formatCascade(l[0].children);
    };
    const init = () => {
      const { data, textKey } = props;
      let arr = [];
      if (data.length) {
        if (Array.isArray(data[0])) {
          if (!selectValue.value)
            selectValue.value = Array.from({ length: data.length }, () => 0);
          arr = formatItem();
        } else if (typeof data[0] === "object") {
          if (data[0].children) {
            list.value = [];
            formatCascade(data);
            isCascade = true;
            if (!selectValue.value)
              selectValue.value = Array.from(
                { length: list.value.length },
                () => 0
              );
            return;
          } else {
            if (!selectValue.value)
              selectValue.value = [0];
            arr = [formatItem()];
          }
        } else {
          if (!selectValue.value)
            selectValue.value = [0];
          arr = [data.map((item) => ({ text: item }))];
        }
      }
      list.value = arr;
    };
    onMounted(() => init());
    return {
      list,
      show,
      column,
      onCancel,
      onConfirm,
      selectItem,
      selectValue
    };
  }
});
const _hoisted_1$t = { class: "fan-picker" };
const _hoisted_2$e = { class: "fan-picker__o fan-flex fan-align-center fan-justify-between" };
const _hoisted_3$8 = { class: "fan-picker__c" };
const _hoisted_4$5 = /* @__PURE__ */ createElementVNode(
  "div",
  { class: "fan-picker__b" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_5$3 = /* @__PURE__ */ createElementVNode(
  "div",
  { class: "fan-picker__mask" },
  null,
  -1
  /* HOISTED */
);
function __vue_render__$C(_ctx, _cache) {
  const _component_FanButton = resolveComponent("FanButton");
  const _component_PickerColumn = resolveComponent("PickerColumn");
  const _component_FanPopup = resolveComponent("FanPopup");
  return openBlock(), createBlock(_component_FanPopup, {
    show: _ctx.show,
    "onUpdate:show": _cache[0] || (_cache[0] = ($event) => _ctx.show = $event),
    "safe-bottom": "",
    position: "bottom"
  }, {
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1$t, [
        createElementVNode("div", _hoisted_2$e, [
          createVNode(_component_FanButton, {
            plain: "",
            border: false,
            "text-size": "14",
            "text-color": "#969799",
            onClick: _ctx.onCancel
          }, {
            default: withCtx(() => [
              createTextVNode("取消")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onClick"]),
          createVNode(_component_FanButton, {
            plain: "",
            border: false,
            "text-size": "14",
            "text-color": "#576b95",
            onClick: _ctx.onConfirm
          }, {
            default: withCtx(() => [
              createTextVNode("确认")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onClick"])
        ]),
        createElementVNode("div", _hoisted_3$8, [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.list, (item, i) => {
              return openBlock(), createBlock(_component_PickerColumn, {
                ref_for: true,
                ref: "column",
                key: i,
                items: item,
                value: _ctx.selectValue,
                index: i,
                onSelectItem: _ctx.selectItem
              }, null, 8, ["items", "value", "index", "onSelectItem"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          _hoisted_4$5,
          _hoisted_5$3
        ])
      ])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["show"]);
}
__vue_sfc__$C.render = __vue_render__$C;
var stdin_default$D = __vue_sfc__$C;
const __vue_sfc__$B = defineComponent({
  name: createNamespace("AddressEdit")[0],
  components: { FanInput: stdin_default$I, FanTextarea: stdin_default$H, FanIcon: stdin_default$N, FanPicker: stdin_default$D },
  emits: ["update:modelValue"],
  props: {
    bg: String,
    labelStyle: String,
    inputStyle: {
      type: String,
      default: ""
    },
    border: Boolean,
    areaList: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(props, { emit }) {
    const theStyle = computed(() => {
      const { bg } = props;
      const s = `background: ${bg}`;
      return transformStyleSize(s);
    });
    const labStyle = computed(() => transformStyleSize(props.labelStyle));
    const inStyle = computed(() => transformStyleSize(props.inputStyle));
    const from = reactive({
      name: "",
      phone: "",
      provinceName: "",
      // 省
      cityName: "",
      // 市
      countyName: "",
      // 区
      address: "",
      areaCode: "",
      // 末级地区编码
      postalCode: ""
      // 邮编
    });
    const area = ref("");
    const areaInx = ref();
    const show = ref(false);
    const areaData = ref([]);
    let indexs = [];
    const traverseArea = (val) => {
      try {
        areaData.value.forEach((province, index2) => {
          if (val[0] === index2 || val[0] === province.name) {
            Object.assign(from, { provinceName: province.name });
            province.children.forEach((city, i) => {
              if (i === val[1] || val[1] === city.name) {
                Object.assign(from, { cityName: city.name });
                city.children.forEach((county, inx) => {
                  if (inx === val[2] || val[2] === county.name) {
                    Object.assign(from, {
                      countyName: county.name,
                      areaCode: county.area_code || "",
                      postalCode: county.postal_code || ""
                    });
                    area.value = `${province.name}-${city.name}-${county.name}`;
                    indexs = [index2, i, inx];
                  }
                });
              }
            });
          }
        });
      } catch (e) {
        console.log(e);
        console.log("地区列表必须包含省市区三级");
      }
    };
    const onConfirm = (val) => {
      traverseArea(val);
      show.value = false;
    };
    const setAreaData = () => {
      const data = [];
      props.areaList.forEach((items, i) => {
        let obj = {
          name: items.name,
          postal_code: items.postal_code,
          area_code: items.area_code,
          id: items.id,
          level: 1,
          children: []
        };
        data.push(JSON.parse(JSON.stringify(obj)));
        if (!items.children || !items.children.length)
          items.children = [obj];
        items.children.forEach((item, index2) => {
          let obj1 = {
            name: item.name,
            postal_code: item.postal_code,
            area_code: item.area_code,
            id: item.id,
            level: 2,
            children: []
          };
          data[i].children.push(JSON.parse(JSON.stringify(obj1)));
          if (!item.children || !item.children.length)
            item.children = [obj1];
          item.children.forEach((area2) => {
            let obj2 = {
              name: area2.name,
              postal_code: area2.postal_code,
              area_code: area2.area_code,
              id: area2.id,
              level: 3
            };
            data[i].children[index2].children.push(JSON.parse(JSON.stringify(obj2)));
          });
        });
      });
      areaData.value = data;
      traverseArea([from.provinceName, from.cityName, from.countyName]);
    };
    watch(
      () => props.areaList,
      (val) => {
        if (val.length)
          setAreaData();
      },
      {
        deep: true,
        immediate: true,
        flush: "post"
      }
    );
    watch(
      () => props.modelValue,
      (val) => {
        if (val)
          Object.assign(from, val);
      },
      {
        deep: true,
        immediate: true,
        flush: "post"
      }
    );
    watch(
      () => from,
      (val) => {
        emit("update:modelValue", val);
      },
      {
        deep: true
      }
    );
    const verify = () => {
      return new Promise((resolve, reject) => {
        if (from.name.length < 2 && from.name.length < 26) {
          reject(new Error("收货人姓名应为2-25个字符"));
        } else if (!validatePhoneNumber(from.phone)) {
          reject(new Error("请输入正确的手机号"));
        } else if (!from.provinceName || !from.cityName || !from.countyName || !from.address) {
          reject(new Error("请填写完整的收货地址"));
        } else {
          resolve(from);
        }
      });
    };
    const openPocker = () => {
      show.value = true;
      areaInx.value = indexs;
    };
    return {
      theStyle,
      labStyle,
      inStyle,
      from,
      show,
      area,
      areaInx,
      onConfirm,
      verify,
      openPocker
    };
  }
});
const _hoisted_1$s = {
  key: 0,
  class: "fan-address-area"
};
function __vue_render__$B(_ctx, _cache) {
  const _component_FanInput = resolveComponent("FanInput");
  const _component_FanIcon = resolveComponent("FanIcon");
  const _component_FanTextarea = resolveComponent("FanTextarea");
  const _component_FanPicker = resolveComponent("FanPicker");
  return openBlock(), createElementBlock(
    "div",
    {
      class: "fan-address",
      style: normalizeStyle(_ctx.theStyle)
    },
    [
      createVNode(_component_FanInput, {
        modelValue: _ctx.from.name,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.from.name = $event),
        "label-style": _ctx.labStyle,
        "input-style": _ctx.inStyle,
        label: "收货人",
        placeholder: "请填写收货人姓名",
        border: _ctx.border
      }, null, 8, ["modelValue", "label-style", "input-style", "border"]),
      createVNode(_component_FanInput, {
        modelValue: _ctx.from.phone,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.from.phone = $event),
        "label-style": _ctx.labStyle,
        "input-style": _ctx.inStyle,
        label: "联系号码",
        placeholder: "请填写收货人手机号",
        border: _ctx.border
      }, null, 8, ["modelValue", "label-style", "input-style", "border"]),
      createElementVNode(
        "div",
        {
          class: normalizeClass(["fan-flex fan-align-center", { "fan-hairline--bottom": _ctx.border }]),
          onClick: _cache[3] || (_cache[3] = (...args) => _ctx.openPocker && _ctx.openPocker(...args))
        },
        [
          _ctx.area ? (openBlock(), createElementBlock("div", _hoisted_1$s, [
            createElementVNode(
              "p",
              {
                style: normalizeStyle(_ctx.labStyle),
                class: "fan-address-area__label"
              },
              "所在地区",
              4
              /* STYLE */
            ),
            createElementVNode(
              "p",
              {
                style: normalizeStyle(_ctx.inStyle),
                class: "fan-address-area__txt"
              },
              toDisplayString(_ctx.area),
              5
              /* TEXT, STYLE */
            )
          ])) : (openBlock(), createBlock(_component_FanInput, {
            key: 1,
            class: "fan-flex-1",
            modelValue: _ctx.area,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.area = $event),
            "label-style": _ctx.labStyle,
            "input-style": _ctx.inStyle,
            label: "所在地区",
            placeholder: "省市区县、乡镇等",
            disabled: ""
          }, null, 8, ["modelValue", "label-style", "input-style"])),
          createVNode(_component_FanIcon, { name: "right" })
        ],
        2
        /* CLASS */
      ),
      createVNode(_component_FanTextarea, {
        modelValue: _ctx.from.address,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.from.address = $event),
        "label-style": _ctx.labStyle,
        "input-style": _ctx.inStyle,
        label: "详细地址",
        placeholder: "街道、小区楼牌号等"
      }, null, 8, ["modelValue", "label-style", "input-style"]),
      createVNode(_component_FanPicker, {
        modelValue: _ctx.show,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.show = $event),
        "text-key": "name",
        data: _ctx.areaList,
        value: _ctx.areaInx,
        onConfirm: _ctx.onConfirm
      }, null, 8, ["modelValue", "data", "value", "onConfirm"])
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__$B.render = __vue_render__$B;
var stdin_default$C = __vue_sfc__$B;
const AddressEdit = stdin_default$C;
const aspectRatioSfc = "";
const __vue_sfc__$A = defineComponent({
  name: createNamespace("AspectRatio")[0],
  props: {
    /**
     * 盒子宽高比
     * 支持：比值number、a/b、a:b
     * 宽度未知时主要是利用padding的百分比值是相对于包含块（一般是父盒子）的宽度，造出指定比例的容器
     */
    aspectRatio: [Number, String],
    width: [Number, String],
    height: [Number, String]
  },
  emits: ["click"],
  setup(props, { emit }) {
    const resolveAspectRatio2 = (ar) => {
      if (typeof ar === "string") {
        if (ar.includes("/") || ar.includes(":")) {
          const [a, b] = ar.replace("/", ":").split(":");
          return a / b;
        }
        return Number(ar);
      }
      return ar;
    };
    const state = computed(() => {
      let wrapper = false;
      let wrapperStyle = "";
      let style2 = "";
      const { aspectRatio, width, height } = props;
      const ar = resolveAspectRatio2(aspectRatio);
      const w = getCssSizeValue(width);
      const wUnit = transformSize(width);
      const h2 = getCssSizeValue(height);
      const hUnit = transformSize(height);
      if (height) {
        if (width) {
          style2 += `width:${wUnit};height:${hUnit};`;
        } else if (ar && !isCssRelativeSize(height)) {
          style2 += `width:${transformSize(h2 * ar)};height:${hUnit};`;
        } else {
          style2 += `height:${hUnit};`;
        }
      } else if (ar) {
        if (!width || isCssRelativeSize(width)) {
          wrapper = true;
          wrapperStyle = `position:relative;height:0;`;
          if (width) {
            const unit = wUnit.replace(/[0-9.]/g, "");
            wrapperStyle += `width:${width};padding-bottom:${roundNumber(
              w / ar,
              5
            )}${unit};`;
          } else {
            wrapperStyle += `width:100%;padding-bottom:${roundNumber(
              100 / ar,
              5
            )}%;`;
          }
        } else {
          style2 += `width:${wUnit};height:${transformSize(w / ar)};`;
        }
      } else if (width) {
        style2 += `width:${wUnit};`;
      }
      return { style: style2, wrapper, wrapperStyle };
    });
    const onClick2 = (e) => emit("click", e);
    return { state, onClick: onClick2 };
  }
});
function __vue_render__$A(_ctx, _cache) {
  return _ctx.state.wrapper ? (openBlock(), createElementBlock(
    "div",
    {
      key: 0,
      class: "fan-aspect-ratio",
      style: normalizeStyle(_ctx.state.wrapperStyle)
    },
    [
      createElementVNode(
        "div",
        {
          class: "fan-aspect-ratio__box",
          style: normalizeStyle(_ctx.state.style),
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        4
        /* STYLE */
      )
    ],
    4
    /* STYLE */
  )) : (openBlock(), createElementBlock(
    "div",
    {
      key: 1,
      class: "fan-aspect-ratio",
      style: normalizeStyle(_ctx.state.style),
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    [
      renderSlot(_ctx.$slots, "default")
    ],
    4
    /* STYLE */
  ));
}
__vue_sfc__$A.render = __vue_render__$A;
var stdin_default$B = __vue_sfc__$A;
const AspectRatio = stdin_default$B;
const Button = stdin_default$K;
const cellSfc = "";
const __vue_sfc__$z = defineComponent({
  name: createNamespace("Cell")[0],
  components: {
    FanIcon: stdin_default$N
  },
  emits: ["click"],
  props: {
    title: {
      type: [String, Number],
      default: ""
    },
    titleStyle: [String, Object],
    value: {
      type: [String, Number],
      default: ""
    },
    valueStyle: [String, Object],
    desc: {
      type: [String, Number],
      default: ""
    },
    descStyle: [String, Object],
    center: {
      type: Boolean,
      default: false
    },
    width: String,
    height: String,
    margin: String,
    padding: String,
    radius: String,
    color: String,
    titleColor: String,
    valueColor: String,
    descColor: String,
    background: String,
    prefixIcon: String,
    suffixIcon: String,
    prefixIconCenter: {
      type: Boolean,
      default: false
    },
    suffixIconCenter: {
      type: Boolean,
      default: false
    },
    prefixIconColor: {
      type: String,
      default: "inherit"
    },
    suffixIconColor: {
      type: String,
      default: "inherit"
    },
    iconSize: [String, Number],
    prefixIconSize: [String, Number],
    suffixIconSize: [String, Number],
    prefixIconMargin: String
  },
  setup(props, { emit }) {
    const theStyle = computed(() => {
      const { color, background, radius } = props;
      const obj = {};
      ["width", "height", "padding", "margin"].forEach(
        (k) => props[k] && (obj[k] = props[k])
      );
      const bg = background || "";
      if (bg)
        obj["--fan-cell-bg"] = bg;
      const c = color ? color : "";
      if (c)
        obj["--fan-cell-text-color"] = c;
      if (radius || radius === 0)
        obj["--fan-cell-border-radius"] = radius;
      return transformStyleSize(obj);
    });
    const theTitleStyle = computed(() => {
      const { titleStyle, titleColor } = props;
      const obj = {};
      if (titleColor)
        obj["--fan-cell-title-color"] = titleColor;
      return transformStyleSize(titleStyle) + transformStyleSize(obj);
    });
    const theValueStyle = computed(() => {
      const { valueStyle, valueColor } = props;
      const obj = {};
      if (valueColor)
        obj["--fan-cell-value-color"] = valueColor;
      return transformStyleSize(valueStyle) + transformStyleSize(obj);
    });
    const theDescStyle = computed(() => {
      const { descStyle, descColor } = props;
      const obj = {};
      if (descColor)
        obj["--fan-cell-desc-color"] = descColor;
      return transformStyleSize(descStyle) + transformStyleSize(obj);
    });
    const onClick2 = (e) => {
      emit("click", e);
    };
    return { theStyle, theTitleStyle, theValueStyle, theDescStyle, onClick: onClick2 };
  }
});
function __vue_render__$z(_ctx, _cache) {
  const _component_FanIcon = resolveComponent("FanIcon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["fan-cell", {
        "fan-cell--center": _ctx.center
        // 'fan-cell--link': isLink
      }]),
      style: normalizeStyle(_ctx.theStyle)
    },
    [
      createElementVNode(
        "div",
        {
          class: normalizeClass({
            "fan-cell-icon--center": _ctx.prefixIconCenter
          })
        },
        [
          _ctx.prefixIconCenter ? (openBlock(), createBlock(_component_FanIcon, {
            key: 0,
            name: _ctx.prefixIcon,
            color: _ctx.prefixIconColor,
            size: _ctx.prefixIconSize || _ctx.iconSize,
            class: "fan-cell-title-icon"
          }, null, 8, ["name", "color", "size"])) : createCommentVNode("v-if", true),
          createElementVNode("div", null, [
            createElementVNode(
              "div",
              {
                class: "fan-cell-title",
                style: normalizeStyle(_ctx.theTitleStyle)
              },
              [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  renderSlot(_ctx.$slots, "prefix-icon", {}, () => [
                    _ctx.prefixIcon && !_ctx.prefixIconCenter ? (openBlock(), createBlock(_component_FanIcon, {
                      key: 0,
                      name: _ctx.prefixIcon,
                      color: _ctx.prefixIconColor,
                      size: _ctx.prefixIconSize || _ctx.iconSize,
                      class: "fan-cell-title-icon"
                    }, null, 8, ["name", "color", "size"])) : createCommentVNode("v-if", true)
                  ]),
                  createElementVNode(
                    "span",
                    null,
                    toDisplayString(_ctx.title),
                    1
                    /* TEXT */
                  )
                ])
              ],
              4
              /* STYLE */
            ),
            createElementVNode(
              "div",
              {
                class: "fan-cell-title-desc",
                style: normalizeStyle(_ctx.theDescStyle)
              },
              [
                renderSlot(_ctx.$slots, "desc", {}, () => [
                  createTextVNode(
                    toDisplayString(_ctx.desc),
                    1
                    /* TEXT */
                  )
                ])
              ],
              4
              /* STYLE */
            )
          ])
        ],
        2
        /* CLASS */
      ),
      createElementVNode(
        "div",
        {
          class: "fan-cell-content",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
          style: normalizeStyle(_ctx.theValueStyle)
        },
        [
          renderSlot(_ctx.$slots, "value", {}, () => [
            createElementVNode(
              "span",
              null,
              toDisplayString(_ctx.value),
              1
              /* TEXT */
            ),
            renderSlot(_ctx.$slots, "suffix-icon", {}, () => [
              createVNode(_component_FanIcon, {
                name: _ctx.suffixIcon,
                color: _ctx.suffixIconColor,
                size: _ctx.suffixIconSize || _ctx.iconSize,
                class: "fan-cell-content-icon"
              }, null, 8, ["name", "color", "size"])
            ])
          ])
        ],
        4
        /* STYLE */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__$z.render = __vue_render__$z;
var stdin_default$A = __vue_sfc__$z;
const Cell = stdin_default$A;
const checkboxSfc = "";
const __vue_sfc__$y = defineComponent({
  name: createNamespace("Checkbox")[0],
  components: { FanIcon: stdin_default$N },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    size: {
      type: [String, Number],
      default: "24px"
    },
    color: {
      type: String
    },
    iconColor: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const theStyle = computed(() => {
      const { color, customStyle } = props;
      let s = "";
      if (color)
        s += `--fan-checkbox-active-color:${color};`;
      return s;
    });
    const iSize = computed(() => transformSize(props.size));
    const toggle = () => {
      const val = !props.modelValue;
      emit("update:modelValue", val);
      emit("change", val);
    };
    return { theStyle, iSize, toggle, iconColor: props.iconColor };
  }
});
function __vue_render__$y(_ctx, _cache) {
  const _component_FanIcon = resolveComponent("FanIcon");
  return openBlock(), createElementBlock(
    "div",
    {
      style: normalizeStyle(_ctx.theStyle),
      class: normalizeClass(["fan-checkbox", {
        "fan-checkbox--disabled": _ctx.disabled,
        "fan-checkbox--checked": _ctx.modelValue
      }]),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggle && _ctx.toggle(...args))
    },
    [
      createElementVNode(
        "div",
        {
          class: "fan-checkbox__i",
          style: normalizeStyle({ width: _ctx.iSize, height: _ctx.iSize })
        },
        [
          createVNode(_component_FanIcon, {
            name: "check",
            size: `calc(${_ctx.iSize} * 0.8)`,
            color: _ctx.disabled ? "#c8c9cc" : _ctx.iconColor ? _ctx.iconColor : "#fff",
            "custom-style": { visibility: _ctx.modelValue ? "visible" : "hidden" }
          }, null, 8, ["size", "color", "custom-style"])
        ],
        4
        /* STYLE */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__$y.render = __vue_render__$y;
var stdin_default$z = __vue_sfc__$y;
const Checkbox = stdin_default$z;
const contactButtonSfc = "";
const contactPanelSfc = "";
const imageSfc = "";
const __vue_sfc__$x = defineComponent({
  name: createNamespace("Image")[0],
  components: { FanAspectRatio: stdin_default$B },
  emits: ["click", "load"],
  props: {
    src: String,
    width: [Number, String],
    height: [Number, String],
    aspectRatio: [Number, String],
    mode: {
      type: String,
      default: "",
      validator: (value) => ["", "scaleToFill", "aspectFit", "aspectFill", "widthFix"].includes(
        value
      )
    },
    /**
     * 圆角
     */
    radius: [Number, String],
    lazyLoad: {
      type: Boolean,
      default: false
    },
    // 占位图片风格，是否白底，默认底 #f1f1f1
    placeholderLight: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const radiusStyle = computed(() => {
      return props.radius ? `border-radius:${transformSize(props.radius)};` : "";
    });
    const theStyle = computed(() => {
      return `overflow:hidden;position:relative;${radiusStyle.value}`;
    });
    const aspectRatioNum = computed(
      () => props.mode === "widthFix" ? 0 : props.aspectRatio
    );
    const imgStyle = computed(() => {
      const { height, mode } = props;
      const theAS = aspectRatioNum.value;
      let h2 = theAS || height ? "100%" : transformSize(height);
      if (theAS || h2) {
        const fit = mode === "aspectFill" ? "cover" : mode === "aspectFit" ? "contain" : "";
        return `height:${h2};object-fit:${fit};${radiusStyle.value}`;
      }
      return `${radiusStyle.value}`;
    });
    const onClick2 = (e) => emit("click", e);
    const onLoad2 = (e) => {
      const { naturalWidth, naturalHeight } = e.target;
      emit("load", {
        detail: { width: naturalWidth, height: naturalHeight }
      });
    };
    return { radiusStyle, theStyle, imgStyle, aspectRatioNum, onClick: onClick2, onLoad: onLoad2 };
  }
});
const _hoisted_1$r = ["src"];
function __vue_render__$x(_ctx, _cache) {
  const _component_FanAspectRatio = resolveComponent("FanAspectRatio");
  const _directive_lazy = resolveDirective("lazy");
  return openBlock(), createBlock(_component_FanAspectRatio, {
    style: normalizeStyle(_ctx.theStyle),
    "aspect-ratio": _ctx.aspectRatioNum,
    width: _ctx.width,
    height: _ctx.height,
    onClick: _ctx.onClick
  }, {
    default: withCtx(() => [
      !_ctx.src ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          style: normalizeStyle("height:100%;" + _ctx.radiusStyle),
          class: normalizeClass(["fan-img--empty", { light: _ctx.placeholderLight }])
        },
        null,
        6
        /* CLASS, STYLE */
      )) : _ctx.lazyLoad ? withDirectives((openBlock(), createElementBlock(
        "img",
        {
          key: 1,
          onLoad: _cache[0] || (_cache[0] = (...args) => _ctx.onLoad && _ctx.onLoad(...args)),
          style: normalizeStyle(_ctx.imgStyle),
          class: "fan-img",
          alt: ""
        },
        null,
        36
        /* STYLE, NEED_HYDRATION */
      )), [
        [_directive_lazy, _ctx.src]
      ]) : (openBlock(), createElementBlock("img", {
        key: 2,
        onLoad: _cache[1] || (_cache[1] = (...args) => _ctx.onLoad && _ctx.onLoad(...args)),
        style: normalizeStyle(_ctx.imgStyle),
        class: "fan-img",
        src: _ctx.src,
        alt: ""
      }, null, 44, _hoisted_1$r)),
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["style", "aspect-ratio", "width", "height", "onClick"]);
}
__vue_sfc__$x.render = __vue_render__$x;
var stdin_default$y = __vue_sfc__$x;
const __vue_sfc__$w = defineComponent({
  name: createNamespace("ContactPanel")[0],
  components: { FanImage: stdin_default$y },
  props: {
    phone: String,
    picture: String,
    time: String,
    timeStyle: String,
    phoneLabel: {
      type: String,
      default: "客服电话"
    },
    pictureLabel: {
      type: String,
      default: "客服微信"
    },
    // 图片联系方式的说明文案
    pictureRemark: {
      type: String,
      default: "1.截屏或长按保存二维码\n2.用微信从相册选图 扫一扫识别"
    },
    size: {
      type: String,
      default: "default",
      validator: (value) => {
        return ["default", "large"].includes(value);
      }
    },
    background: {
      type: String,
      default: "#fff"
    }
  },
  setup() {
  }
});
const _hoisted_1$q = {
  selectable: "",
  "user-select": ""
};
const _hoisted_2$d = {
  key: 0,
  class: "fan-contact--mg"
};
const _hoisted_3$7 = {
  key: 1,
  class: "fan-contact__remark fan-contact--mg"
};
function __vue_render__$w(_ctx, _cache) {
  const _component_FanImage = resolveComponent("FanImage");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["fan-contact-panel", { "fan-contact--large": _ctx.size === "large" }])
    },
    [
      _ctx.time ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          style: normalizeStyle(_ctx.timeStyle),
          class: "fan-multi-ellipsis--l2 fan-contact__time"
        },
        " 客服工作时间：" + toDisplayString(_ctx.time),
        5
        /* TEXT, STYLE */
      )) : createCommentVNode("v-if", true),
      !_ctx.phone && !_ctx.picture ? (openBlock(), createElementBlock(
        "div",
        {
          key: 1,
          class: "fan-contact__cell",
          style: normalizeStyle({ background: _ctx.background })
        },
        " 客服有点高冷，木有给联系方式呢！ ",
        4
        /* STYLE */
      )) : createCommentVNode("v-if", true),
      _ctx.phone ? (openBlock(), createElementBlock(
        "div",
        {
          key: 2,
          class: "fan-contact__cell fan-contact__phone",
          style: normalizeStyle({
            background: _ctx.background,
            marginBottom: !_ctx.picture ? "0" : _ctx.size === "large" ? "18px" : "12px"
          })
        },
        [
          createTextVNode(
            toDisplayString(_ctx.phoneLabel) + "：",
            1
            /* TEXT */
          ),
          createElementVNode(
            "span",
            _hoisted_1$q,
            toDisplayString(_ctx.phone),
            1
            /* TEXT */
          )
        ],
        4
        /* STYLE */
      )) : createCommentVNode("v-if", true),
      _ctx.picture ? (openBlock(), createElementBlock(
        "div",
        {
          key: 3,
          class: "fan-contact__cell",
          style: normalizeStyle({
            display: "inline-block",
            width: "100%",
            background: _ctx.background
          })
        },
        [
          _ctx.pictureLabel ? (openBlock(), createElementBlock(
            "div",
            _hoisted_2$d,
            toDisplayString(_ctx.pictureLabel) + "： ",
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true),
          _ctx.pictureRemark ? (openBlock(), createElementBlock(
            "div",
            _hoisted_3$7,
            toDisplayString(_ctx.pictureRemark),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true),
          createVNode(_component_FanImage, {
            src: _ctx.picture,
            mode: "widthFix",
            width: _ctx.size === "large" ? "100%" : "85%",
            "custom-style": "display:inline-block;"
          }, null, 8, ["src", "width"])
        ],
        4
        /* STYLE */
      )) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__$w.render = __vue_render__$w;
var stdin_default$x = __vue_sfc__$w;
const __vue_sfc__$v = defineComponent({
  name: createNamespace("ContactButton")[0],
  components: { FanContactPanel: stdin_default$x, FanPopup: stdin_default$F, FanButton: stdin_default$K },
  props: {
    // 优先级最高
    phone: String,
    picture: String,
    time: String,
    timeStyle: String,
    url: String,
    /**
     * 是否以绝对定位撑满父盒子，可以作为遮罩mask使用
     */
    full: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(props) {
    const showPop = ref(false);
    const onClick2 = () => {
      if (props.url) {
        location.href = props.url;
        return;
      }
      showPop.value = true;
    };
    return { showPop, onClick: onClick2 };
  }
});
const _hoisted_1$p = {
  class: "fan-hairline--top fan-hairline--bottom",
  style: { "padding": "24px 12px 30px" }
};
function __vue_render__$v(_ctx, _cache) {
  const _component_FanContactPanel = resolveComponent("FanContactPanel");
  const _component_FanButton = resolveComponent("FanButton");
  const _component_FanPopup = resolveComponent("FanPopup");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      createElementVNode(
        "div",
        {
          class: normalizeClass(["fan-contact-btn", { "fan-contact-btn--full": _ctx.full }]),
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      ),
      createVNode(_component_FanPopup, {
        show: _ctx.showPop,
        "onUpdate:show": _cache[2] || (_cache[2] = ($event) => _ctx.showPop = $event),
        title: "客服联系方式",
        round: "",
        "cont-style": "width: 82%"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$p, [
            createVNode(_component_FanContactPanel, {
              phone: _ctx.phone,
              picture: _ctx.picture,
              time: _ctx.time,
              "time-style": _ctx.timeStyle,
              background: "var(--fan-primary-color-1)"
            }, null, 8, ["phone", "picture", "time", "time-style"])
          ]),
          createVNode(_component_FanButton, {
            block: "",
            plain: "",
            border: false,
            "text-size": "16px",
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.showPop = false)
          }, {
            default: withCtx(() => [
              createTextVNode("关闭")
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["show"])
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
__vue_sfc__$v.render = __vue_render__$v;
var stdin_default$w = __vue_sfc__$v;
const ContactButton = stdin_default$w;
const ContactPanel = stdin_default$x;
function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3);
}
function simRaf(fn) {
  return setTimeout(fn, 1e3 / 60);
}
function raf(fn) {
  const rr = simRaf;
  return rr(fn);
}
function cancelRaf(id) {
  const rr = clearTimeout;
  rr(id);
}
const __vue_sfc__$u = defineComponent({
  name: createNamespace("CountDown")[0],
  props: {
    // 毫秒时间戳
    time: {
      type: [String, Number]
    },
    autoStart: {
      type: [Boolean, String],
      default: true
    },
    // 默认 时分秒，可以指定一个统一的分隔符，TODO: 分别指定
    separator: {
      type: [String, Object]
    },
    daySeparator: {
      type: [String, Object]
    },
    separatorStyle: {
      type: String
    },
    blockStyle: {
      type: String
    },
    // 要天不
    day: {
      type: [Boolean, String],
      default: false
    },
    hour: {
      type: [Boolean, String],
      default: true
    },
    minute: {
      type: [Boolean, String],
      default: true
    },
    // 要毫秒不
    millisecond: {
      type: [Boolean, String],
      default: false
    },
    // 毫秒前面加0
    doubleDigitMill: {
      type: Boolean,
      default: false
    }
  },
  emits: ["finish"],
  setup(props, context) {
    const theBlockStyle = computed(() => transformStyleSize(props.blockStyle));
    const theSepStyle = computed(
      () => transformStyleSize(props.separatorStyle)
    );
    let tid;
    let counting;
    let remain = 0;
    let endTime = 0;
    const timeData = ref(parseTimeData(0));
    const pause = () => {
      counting = false;
      cancelRaf(tid);
    };
    const setRemain = (value) => {
      remain = value;
      timeData.value = parseTimeData(value, props.day);
      if (value === 0) {
        pause();
        context.emit("finish");
      }
    };
    const getRemain = () => {
      return Math.max(endTime - Date.now(), 0);
    };
    const microTick = () => {
      tid = raf(() => {
        setRemain(getRemain());
        if (remain !== 0) {
          microTick();
        }
      });
    };
    const macroTick = () => {
      tid = raf(() => {
        const value = getRemain();
        if (!isSameSecond(value, remain) || value === 0) {
          setRemain(value);
        }
        if (remain !== 0) {
          macroTick();
        }
      });
    };
    const tick = () => {
      props.millisecond ? microTick() : macroTick();
    };
    const start = () => {
      if (counting)
        return;
      counting = true;
      endTime = Date.now() + remain;
      tick();
    };
    const reset = () => {
      pause();
      if (!props.time)
        return;
      remain = props.time;
      setRemain(remain);
      props.autoStart && start();
    };
    watch(() => props.time, reset, { immediate: true });
    onBeforeUnmount(() => {
      cancelRaf(tid);
      tid = null;
    });
    return { theBlockStyle, theSepStyle, timeData, reset };
  }
});
const _hoisted_1$o = { class: "fan-flex fan-align-center fan-count-down" };
function __vue_render__$u(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$o, [
    _ctx.day ? (openBlock(), createElementBlock(
      Fragment,
      { key: 0 },
      [
        createElementVNode(
          "div",
          {
            style: normalizeStyle(_ctx.theBlockStyle),
            class: "fan-count-down__block"
          },
          toDisplayString(_ctx.timeData.days),
          5
          /* TEXT, STYLE */
        ),
        createElementVNode(
          "div",
          {
            style: normalizeStyle(_ctx.theSepStyle),
            class: "fan-count-down__sep"
          },
          toDisplayString(_ctx.daySeparator ? _ctx.daySeparator : "天"),
          5
          /* TEXT, STYLE */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    )) : createCommentVNode("v-if", true),
    _ctx.hour ? (openBlock(), createElementBlock(
      Fragment,
      { key: 1 },
      [
        createElementVNode(
          "div",
          {
            style: normalizeStyle(_ctx.theBlockStyle),
            class: "fan-count-down__block"
          },
          toDisplayString(_ctx.timeData.hours),
          5
          /* TEXT, STYLE */
        ),
        createElementVNode(
          "div",
          {
            style: normalizeStyle(_ctx.theSepStyle),
            class: "fan-count-down__sep"
          },
          toDisplayString(_ctx.separator ? _ctx.separator : "时"),
          5
          /* TEXT, STYLE */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    )) : createCommentVNode("v-if", true),
    _ctx.minute ? (openBlock(), createElementBlock(
      Fragment,
      { key: 2 },
      [
        createElementVNode(
          "div",
          {
            style: normalizeStyle(_ctx.theBlockStyle),
            class: "fan-count-down__block"
          },
          toDisplayString(_ctx.timeData.minutes),
          5
          /* TEXT, STYLE */
        ),
        createElementVNode(
          "div",
          {
            style: normalizeStyle(_ctx.theSepStyle),
            class: "fan-count-down__sep"
          },
          toDisplayString(_ctx.separator ? _ctx.separator : "分"),
          5
          /* TEXT, STYLE */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    )) : createCommentVNode("v-if", true),
    createElementVNode(
      "div",
      {
        style: normalizeStyle(_ctx.theBlockStyle),
        class: "fan-count-down__block"
      },
      toDisplayString(_ctx.timeData.seconds),
      5
      /* TEXT, STYLE */
    ),
    _ctx.millisecond || !_ctx.separator ? (openBlock(), createElementBlock(
      "div",
      {
        key: 3,
        style: normalizeStyle(_ctx.theSepStyle),
        class: "fan-count-down__sep"
      },
      toDisplayString(_ctx.separator ? _ctx.separator : "秒"),
      5
      /* TEXT, STYLE */
    )) : createCommentVNode("v-if", true),
    _ctx.millisecond ? (openBlock(), createElementBlock(
      "div",
      {
        key: 4,
        style: normalizeStyle(_ctx.theBlockStyle),
        class: "fan-count-down__block"
      },
      toDisplayString(_ctx.doubleDigitMill ? "0" : "") + toDisplayString(_ctx.timeData.milliseconds),
      5
      /* TEXT, STYLE */
    )) : createCommentVNode("v-if", true)
  ]);
}
__vue_sfc__$u.render = __vue_render__$u;
var stdin_default$v = __vue_sfc__$u;
const CountDown = stdin_default$v;
const countToSfc = "";
const __vue_sfc__$t = defineComponent({
  name: createNamespace("CountTo")[0],
  emits: ["finish"],
  props: {
    startNum: {
      type: [Number, String],
      default: 0
    },
    endNum: {
      type: [Number, String],
      default: 0
    },
    step: {
      type: [Number, String],
      default: 1
    },
    // 数字切换的时间 单位为秒
    speed: {
      type: [Number, String],
      default: 1
    },
    // 数字切换时动画的时间 单位为秒
    duration: [String, Number],
    color: String,
    bg: String,
    textSize: [String, Number],
    bold: [String, Number],
    height: [String, Number],
    width: [String, Number],
    symbolWidth: [String, Number],
    radius: [String, Number],
    marginRight: [Number, String],
    lineHeight: [Number, String]
  },
  setup(props, { emit }) {
    const numList = ref([0]);
    const startVal = ref(props.startNum);
    const endVal = ref(props.endNum);
    let decimalLength = 0;
    let isMinus = false;
    let timer = null;
    const initNumList = (start, end) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h;
      start = start.split(".");
      end = end.split(".");
      const step = String(props.step).split(".");
      let startNum = JSON.parse(JSON.stringify(start));
      const maxIntegerLength = Math.max(
        ((_a2 = start[0]) == null ? void 0 : _a2.length) || 0,
        ((_b = end[0]) == null ? void 0 : _b.length) || 0,
        ((_c = step[0]) == null ? void 0 : _c.length) || 0
      ), maxDecimalLength = Math.max(
        ((_d = start[1]) == null ? void 0 : _d.length) || 0,
        ((_e = end[1]) == null ? void 0 : _e.length) || 0,
        ((_f = step[1]) == null ? void 0 : _f.length) || 0
      );
      decimalLength = maxDecimalLength;
      if (((_g = start[0]) == null ? void 0 : _g.length) < maxIntegerLength)
        startNum[0] = padNumber(startNum[0], maxIntegerLength);
      if (!start[1] && maxDecimalLength !== 0) {
        startNum[1] = padNumber(0, maxDecimalLength);
      } else if (((_h = start[1]) == null ? void 0 : _h.length) < maxDecimalLength) {
        startNum[1] = padNumber(startNum[1], maxDecimalLength, { right: true });
      }
      return startNum.length === 2 ? startNum.join(".").split("") : startNum.join("").split("");
    };
    const translateList = computed(() => {
      const translate2 = [];
      numList.value.forEach(
        (num) => translate2.push(`transform: translate(0, -${num * 10}%)`)
      );
      return translate2;
    });
    const theStyle = computed(() => {
      const {
        bg,
        textSize,
        bold,
        color,
        height,
        radius,
        width,
        duration,
        marginRight,
        symbolWidth,
        lineHeight
      } = props;
      let s = "";
      if (bg)
        s += `--fan-count-to-bg: ${bg};`;
      if (textSize)
        s += `--fan-count-to-size: ${transformSize(
          textSize
        )};--fan-count-to-height: ${transformSize(
          parseFloat(textSize) * 1.4
        )};`;
      if (bold)
        s += `--fan-count-to-weight: ${bold};`;
      if (color)
        s += `--fan-count-to-color: ${color};`;
      if (radius)
        s += `--fan-count-to-radius: ${transformSize(radius)};`;
      if (height)
        s += `--fan-count-to-height: ${transformSize(height)};`;
      if (width)
        s += `--fan-count-to-width: ${transformSize(width)};`;
      if (marginRight)
        s += `--fan-count-to-margin: ${transformSize(marginRight)};`;
      if (duration)
        s += `--fan-count-to-duration:${duration}s;`;
      if (symbolWidth)
        s += `--fan-count-to-symbol-width:${transformSize(symbolWidth)}`;
      if (lineHeight)
        s += `--fan-count-to-line-height: ${transformSize(lineHeight)}`;
      return transformStyleSize(s);
    });
    watchEffect(() => {
      const start = String(startVal.value), end = String(endVal.value);
      if (startVal.value > endVal.value)
        isMinus = true;
      numList.value = initNumList(start, end);
    });
    const onFinish = () => {
      clearInterval(timer);
      timer = null;
      emit("finish");
    };
    const increaseNumber = () => {
      const { step, speed } = props;
      if (Number(startVal.value) === Number(endVal.value))
        return;
      timer = setInterval(() => {
        if (isMinus) {
          startVal.value = roundNumber(
            Number(startVal.value) - Number(step),
            decimalLength
          );
          if (Number(startVal.value) <= Number(endVal.value))
            return onFinish();
        } else {
          startVal.value = roundNumber(
            Number(startVal.value) + Number(step),
            decimalLength
          );
          if (Number(startVal.value) >= Number(endVal.value))
            return onFinish();
        }
      }, Number(speed) * 1e3);
    };
    watch(
      () => props.endNum,
      (val) => endVal.value = val,
      { immediate: true }
    );
    watch(
      () => props.startNum,
      (val) => startVal.value = val,
      { immediate: true }
    );
    onMounted(() => increaseNumber());
    onDeactivated(() => clearInterval(timer));
    return {
      theStyle,
      translateList,
      numList
    };
  }
});
const _hoisted_1$n = { class: "fan-flex fan-align-center" };
const _hoisted_2$c = /* @__PURE__ */ createElementVNode(
  "span",
  { class: "number-item_num_box" },
  [
    /* @__PURE__ */ createElementVNode("span", { class: "number-item_num__txt" }, "0123456789")
  ],
  -1
  /* HOISTED */
);
const _hoisted_3$6 = [
  _hoisted_2$c
];
const _hoisted_4$4 = { key: 1 };
function __vue_render__$t(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: "count-to",
      style: normalizeStyle(_ctx.theStyle)
    },
    [
      createElementVNode("div", _hoisted_1$n, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.numList, (item, i) => {
            return openBlock(), createElementBlock(
              "p",
              {
                class: normalizeClass(["count-to_num", [isNaN(item) ? "number_symbol" : "number-item"]]),
                key: i
              },
              [
                !isNaN(item) ? (openBlock(), createElementBlock(
                  "span",
                  {
                    key: 0,
                    class: "number-item_num",
                    style: normalizeStyle(_ctx.translateList[i])
                  },
                  [..._hoisted_3$6],
                  4
                  /* STYLE */
                )) : (openBlock(), createElementBlock(
                  "span",
                  _hoisted_4$4,
                  toDisplayString(item),
                  1
                  /* TEXT */
                ))
              ],
              2
              /* CLASS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__$t.render = __vue_render__$t;
var stdin_default$u = __vue_sfc__$t;
const CountTo = stdin_default$u;
const dataPanelSfc = "";
const __vue_sfc__$s = defineComponent({
  name: createNamespace("DataPanel")[0],
  props: {
    // [{ label, value }, ...]
    data: Array,
    column: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const colClass = computed(() => {
      const { column, data } = props;
      if (!data)
        return "";
      if (!column) {
        const l = data.length;
        if (l < 4)
          return "col" + l;
        return "col" + (l % 3 === 0 || l % 3 === 2 ? 3 : 2);
      }
      return "col" + column;
    });
    return { colClass };
  }
});
const _hoisted_1$m = { class: "fan-flex fan-data-panel__in" };
const _hoisted_2$b = { class: "fan-data-panel__val" };
const _hoisted_3$5 = { class: "fan-data-panel__t" };
function __vue_render__$s(_ctx, _cache) {
  return _ctx.data && _ctx.data.length ? (openBlock(), createElementBlock(
    "div",
    {
      key: 0,
      class: normalizeClass(["fan-data-panel", _ctx.colClass])
    },
    [
      createElementVNode("div", _hoisted_1$m, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.data, (item, index2) => {
            return openBlock(), createElementBlock("div", {
              key: index2,
              class: "fan-flex-col fan-justify-center fan-align-center fan-data-panel__item"
            }, [
              createElementVNode(
                "div",
                _hoisted_2$b,
                toDisplayString(item.value),
                1
                /* TEXT */
              ),
              createElementVNode(
                "div",
                _hoisted_3$5,
                toDisplayString(item.label),
                1
                /* TEXT */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ],
    2
    /* CLASS */
  )) : createCommentVNode("v-if", true);
}
__vue_sfc__$s.render = __vue_render__$s;
var stdin_default$t = __vue_sfc__$s;
const DataPanel = stdin_default$t;
const dropdownItemSfc = "";
function useParent(key) {
  const parent = inject(key, null);
  if (parent) {
    const instance2 = getCurrentInstance();
    const { link, unlink, internalChildren } = parent;
    link(instance2);
    onUnmounted(() => unlink(instance2));
    const index2 = computed(() => internalChildren.indexOf(instance2));
    return {
      parent,
      index: index2
    };
  }
  return {
    parent: null,
    index: ref(-1)
  };
}
const scrollViewSfc = "";
var _a;
const isClient = typeof window !== "undefined";
const isFunction = (val) => typeof val === "function";
const isNumber = (val) => typeof val === "number";
const isString = (val) => typeof val === "string";
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const noop$1 = () => {
};
isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop$1;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop$1;
  };
  const filter = (invoke) => {
    const duration = resolveUnref(ms);
    const maxDuration = resolveUnref(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(invoke());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke());
      }, duration);
    });
  };
  return filter;
}
function throttleFilter(ms, trailing = true, leading = true, rejectOnCancel = false) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  let lastRejector = noop$1;
  let lastValue;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
      lastRejector();
      lastRejector = noop$1;
    }
  };
  const filter = (_invoke) => {
    const duration = resolveUnref(ms);
    const elapsed = Date.now() - lastExec;
    const invoke = () => {
      return lastValue = _invoke();
    };
    clear();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve;
        timer = setTimeout(() => {
          lastExec = Date.now();
          isLeading = true;
          resolve(invoke());
          clear();
        }, Math.max(0, duration - elapsed));
      });
    }
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration);
    isLeading = false;
    return lastValue;
  };
  return filter;
}
function identity(arg) {
  return arg;
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}
function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
  return createFilterWrapper(throttleFilter(ms, trailing, leading, rejectOnCancel), fn);
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true
  } = options;
  const isPending = ref(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, resolveUnref(interval));
  }
  if (immediate) {
    isPending.value = true;
    if (isClient)
      start();
  }
  tryOnScopeDispose(stop);
  return {
    isPending: readonly(isPending),
    start,
    stop
  };
}
function unrefElement(elRef) {
  var _a2;
  const plain = resolveUnref(elRef);
  return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
}
const defaultWindow = isClient ? window : void 0;
const defaultDocument = isClient ? window.document : void 0;
function useEventListener(...args) {
  let target;
  let events2;
  let listeners;
  let options;
  if (isString(args[0]) || Array.isArray(args[0])) {
    [events2, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events2, listeners, options] = args;
  }
  if (!target)
    return noop$1;
  if (!Array.isArray(events2))
    events2 = [events2];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(() => [unrefElement(target), resolveUnref(options)], ([el, options2]) => {
    cleanup();
    if (!el)
      return;
    cleanups.push(...events2.flatMap((event) => {
      return listeners.map((listener) => register(el, event, listener, options2));
    }));
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
function useDocumentVisibility({ document: document2 = defaultDocument } = {}) {
  if (!document2)
    return ref("visible");
  const visibility = ref(document2.visibilityState);
  useEventListener(document2, "visibilitychange", () => {
    visibility.value = document2.visibilityState;
  });
  return visibility;
}
function useRafFn(fn, options = {}) {
  const {
    immediate = true,
    window: window2 = defaultWindow
  } = options;
  const isActive = ref(false);
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop2(timestamp) {
    if (!isActive.value || !window2)
      return;
    const delta = timestamp - previousFrameTimestamp;
    fn({ delta, timestamp });
    previousFrameTimestamp = timestamp;
    rafId = window2.requestAnimationFrame(loop2);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      rafId = window2.requestAnimationFrame(loop2);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}
const ARRIVED_STATE_THRESHOLD_PIXELS = 1;
function useScroll(element, options = {}) {
  const {
    throttle: throttle2 = 0,
    idle = 200,
    onStop = noop$1,
    onScroll: onScroll2 = noop$1,
    offset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    eventListenerOptions = {
      capture: false,
      passive: true
    },
    behavior = "auto"
  } = options;
  const internalX = ref(0);
  const internalY = ref(0);
  const x = computed({
    get() {
      return internalX.value;
    },
    set(x2) {
      scrollTo(x2, void 0);
    }
  });
  const y = computed({
    get() {
      return internalY.value;
    },
    set(y2) {
      scrollTo(void 0, y2);
    }
  });
  function scrollTo(_x, _y) {
    var _a2, _b, _c;
    const _element = resolveUnref(element);
    if (!_element)
      return;
    (_c = _element instanceof Document ? document.body : _element) == null ? void 0 : _c.scrollTo({
      top: (_a2 = resolveUnref(_y)) != null ? _a2 : y.value,
      left: (_b = resolveUnref(_x)) != null ? _b : x.value,
      behavior: resolveUnref(behavior)
    });
  }
  const isScrolling = ref(false);
  const arrivedState = reactive({
    left: true,
    right: false,
    top: true,
    bottom: false
  });
  const directions = reactive({
    left: false,
    right: false,
    top: false,
    bottom: false
  });
  const onScrollEnd = (e) => {
    if (!isScrolling.value)
      return;
    isScrolling.value = false;
    directions.left = false;
    directions.right = false;
    directions.top = false;
    directions.bottom = false;
    onStop(e);
  };
  const onScrollEndDebounced = useDebounceFn(onScrollEnd, throttle2 + idle);
  const onScrollHandler = (e) => {
    const eventTarget = e.target === document ? e.target.documentElement : e.target;
    const scrollLeft = eventTarget.scrollLeft;
    directions.left = scrollLeft < internalX.value;
    directions.right = scrollLeft > internalY.value;
    arrivedState.left = scrollLeft <= 0 + (offset.left || 0);
    arrivedState.right = scrollLeft + eventTarget.clientWidth >= eventTarget.scrollWidth - (offset.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
    internalX.value = scrollLeft;
    let scrollTop = eventTarget.scrollTop;
    if (e.target === document && !scrollTop)
      scrollTop = document.body.scrollTop;
    directions.top = scrollTop < internalY.value;
    directions.bottom = scrollTop > internalY.value;
    arrivedState.top = scrollTop <= 0 + (offset.top || 0);
    arrivedState.bottom = scrollTop + eventTarget.clientHeight >= eventTarget.scrollHeight - (offset.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
    internalY.value = scrollTop;
    isScrolling.value = true;
    onScrollEndDebounced(e);
    onScroll2(e);
  };
  useEventListener(element, "scroll", throttle2 ? useThrottleFn(onScrollHandler, throttle2, true, false) : onScrollHandler, eventListenerOptions);
  useEventListener(element, "scrollend", onScrollEnd, eventListenerOptions);
  return {
    x,
    y,
    isScrolling,
    arrivedState,
    directions
  };
}
var __defProp$9 = Object.defineProperty;
var __defProps$2$1 = Object.defineProperties;
var __getOwnPropDescs$2$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$a = Object.getOwnPropertySymbols;
var __hasOwnProp$a = Object.prototype.hasOwnProperty;
var __propIsEnum$a = Object.prototype.propertyIsEnumerable;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$9 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$a.call(b, prop))
      __defNormalProp$9(a, prop, b[prop]);
  if (__getOwnPropSymbols$a)
    for (var prop of __getOwnPropSymbols$a(b)) {
      if (__propIsEnum$a.call(b, prop))
        __defNormalProp$9(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2$1 = (a, b) => __defProps$2$1(a, __getOwnPropDescs$2$1(b));
function useInfiniteScroll(element, onLoadMore, options = {}) {
  var _a2, _b;
  const direction = (_a2 = options.direction) != null ? _a2 : "bottom";
  const state = reactive(useScroll(element, __spreadProps$2$1(__spreadValues$9({}, options), {
    offset: __spreadValues$9({
      [direction]: (_b = options.distance) != null ? _b : 0
    }, options.offset)
  })));
  watch(() => state.arrivedState[direction], async (v) => {
    var _a22, _b2;
    if (v) {
      const elem = resolveUnref(element);
      const previous = {
        height: (_a22 = elem == null ? void 0 : elem.scrollHeight) != null ? _a22 : 0,
        width: (_b2 = elem == null ? void 0 : elem.scrollWidth) != null ? _b2 : 0
      };
      await onLoadMore(state);
      if (options.preserveScrollPosition && elem) {
        nextTick$1(() => {
          elem.scrollTo({
            top: elem.scrollHeight - previous.height,
            left: elem.scrollWidth - previous.width
          });
        });
      }
    }
  });
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
var __defProp$3 = Object.defineProperty;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
const TransitionPresets = __spreadValues$3({
  linear: identity
}, _TransitionPresets);
function createEasingFunction([p0, p1, p2, p3]) {
  const a = (a1, a2) => 1 - 3 * a2 + 3 * a1;
  const b = (a1, a2) => 3 * a2 - 6 * a1;
  const c = (a1) => 3 * a1;
  const calcBezier = (t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
  const getSlope = (t, a1, a2) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
  const getTforX = (x) => {
    let aGuessT = x;
    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, p0, p2);
      if (currentSlope === 0)
        return aGuessT;
      const currentX = calcBezier(aGuessT, p0, p2) - x;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  };
  return (x) => p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3);
}
function useTransition(source, options = {}) {
  const {
    delay = 0,
    disabled = false,
    duration = 1e3,
    onFinished = noop$1,
    onStarted = noop$1,
    transition: transition2 = identity
  } = options;
  const currentTransition = computed(() => {
    const t = unref(transition2);
    return isFunction(t) ? t : createEasingFunction(t);
  });
  const sourceValue = computed(() => {
    const s = unref(source);
    return isNumber(s) ? s : s.map(unref);
  });
  const sourceVector = computed(() => isNumber(sourceValue.value) ? [sourceValue.value] : sourceValue.value);
  const outputVector = ref(sourceVector.value.slice(0));
  let currentDuration;
  let diffVector;
  let endAt;
  let startAt;
  let startVector;
  const { resume, pause } = useRafFn(() => {
    const now2 = Date.now();
    const progress = clamp(1 - (endAt - now2) / currentDuration, 0, 1);
    outputVector.value = startVector.map((val, i) => {
      var _a2;
      return val + ((_a2 = diffVector[i]) != null ? _a2 : 0) * currentTransition.value(progress);
    });
    if (progress >= 1) {
      pause();
      onFinished();
    }
  }, { immediate: false });
  const start = () => {
    pause();
    currentDuration = unref(duration);
    diffVector = outputVector.value.map((n, i) => {
      var _a2, _b;
      return ((_a2 = sourceVector.value[i]) != null ? _a2 : 0) - ((_b = outputVector.value[i]) != null ? _b : 0);
    });
    startVector = outputVector.value.slice(0);
    startAt = Date.now();
    endAt = startAt + currentDuration;
    resume();
    onStarted();
  };
  const timeout = useTimeoutFn(start, delay, { immediate: false });
  watch(sourceVector, () => {
    if (unref(disabled))
      return;
    if (unref(delay) <= 0)
      start();
    else
      timeout.start();
  }, { deep: true });
  watch(() => unref(disabled), (v) => {
    if (v) {
      outputVector.value = sourceVector.value.slice(0);
      pause();
    }
  });
  return computed(() => {
    const targetVector = unref(disabled) ? sourceVector : outputVector;
    return isNumber(sourceValue.value) ? targetVector.value[0] : targetVector.value;
  });
}
const __vue_sfc__$r = defineComponent({
  name: createNamespace("ScrollView")[0],
  emits: ["scrolltoupper", "scrolltolower", "scroll"],
  props: {
    width: [Number, String],
    height: [Number, String],
    maxHeight: [Number, String],
    scrollY: {
      type: [Boolean, String],
      default: false
    },
    scrollX: {
      type: [Boolean, String],
      default: false
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    /**
     * 距顶部/左边多远时（单位px），触发 scrolltoupper 事件
     */
    upperThreshold: {
      type: [Number, String],
      default: 50
    },
    /**
     * 距底部/右边多远时（单位px），触发 scrolltolower 事件
     */
    lowerThreshold: {
      type: [Number, String],
      default: 50
    },
    /**
     * 设置竖向滚动条位置
     */
    scrollTop: [Number, String],
    /**
     * 设置横向滚动条位置
     */
    scrollLeft: [Number, String],
    scrollWithAnimation: {
      type: [Boolean, String],
      default: false
    },
    /**
     * iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向
     * @description 仅 app-nvue，微信小程序
     */
    enableBackToTop: {
      type: [Number, String],
      default: 50
    },
    /**
     * 启用 flexbox 布局。开启后，当前节点声明了 display: flex 就会成为 flex container，并作用于其孩子节点
     */
    enableFlex: {
      type: [Boolean, String],
      default: false
    }
  },
  setup(props, context) {
    const theStyle = computed(() => {
      const { width, height, maxHeight, scrollY, scrollX, enableFlex } = props;
      let style2 = "";
      if (width)
        style2 += `width:${transformSize(width)};`;
      if (height)
        style2 += `height:${transformSize(height)};`;
      if (maxHeight)
        style2 += `max-height:${transformSize(maxHeight)};`;
      if (scrollX)
        style2 += `white-space:nowrap;`;
      style2 += `overflow-x:${scrollX ? "auto" : "hidden"};overflow-y:${scrollY ? "auto" : "hidden"};`;
      if (enableFlex)
        style2 += "display:flex;";
      return style2;
    });
    const el = ref(null);
    const scrollPositionSource = ref([0, 0]);
    const scrollPosition = useTransition(scrollPositionSource, {
      delay: 0,
      duration: 290,
      disabled: !props.scrollWithAnimation,
      transition: TransitionPresets.linear
    });
    const setScrollPosition = ([left, top]) => {
      if (!el.value)
        return;
      el.value.scrollLeft = left;
      el.value.scrollTop = top;
    };
    watch(scrollPosition, setScrollPosition);
    watch(
      () => props.scrollLeft,
      (val) => {
        scrollPositionSource.value = [val, scrollPositionSource.value[1]];
      }
    );
    watch(
      () => props.scrollTop,
      (val) => {
        scrollPositionSource.value = [scrollPositionSource.value[0], val];
      }
    );
    onMounted(() => {
      scrollPositionSource.value = [
        props.scrollLeft || 0,
        props.scrollTop || 0
      ];
    });
    const { x, y, arrivedState } = useScroll(el, {
      offset: {
        right: props.lowerThreshold,
        bottom: props.lowerThreshold,
        left: props.upperThreshold,
        top: props.upperThreshold
      },
      onScroll: () => {
        context.emit("scroll", {
          detail: { scrollLeft: x.value, scrollTop: y.value }
        });
      }
    });
    watch(arrivedState, ({ left, right, top, bottom }) => {
      const { scrollY, scrollX } = props;
      if (scrollY) {
        if (bottom)
          context.emit("scrolltolower");
        if (top)
          context.emit("scrolltoupper");
      }
      if (scrollX) {
        if (right)
          context.emit("scrolltolower");
        if (left)
          context.emit("scrolltoupper");
      }
    });
    return { theStyle, el };
  }
});
const _hoisted_1$l = {
  key: 0,
  class: "fan-scroll-view--flex"
};
function __vue_render__$r(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      ref: "el",
      class: "fan-scroll-view",
      style: normalizeStyle(_ctx.theStyle)
    },
    [
      _ctx.enableFlex && _ctx.scrollX && _ctx.scrollable ? (openBlock(), createElementBlock("div", _hoisted_1$l, [
        renderSlot(_ctx.$slots, "default")
      ])) : renderSlot(_ctx.$slots, "default", { key: 1 })
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__$r.render = __vue_render__$r;
var stdin_default$s = __vue_sfc__$r;
const __vue_sfc__$q = defineComponent({
  name: createNamespace("DropdownItemContent")[0],
  components: { ScrollView: stdin_default$s },
  props: {
    scroll: {
      type: Boolean,
      default: false
    },
    scrollHeight: {
      type: [String, Boolean],
      default: "61.8vh"
    }
  }
});
function __vue_render__$q(_ctx, _cache) {
  const _component_ScrollView = resolveComponent("ScrollView");
  return _ctx.scroll ? (openBlock(), createBlock(_component_ScrollView, {
    key: 0,
    height: _ctx.scrollHeight,
    "scroll-y": true
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["height"])) : renderSlot(_ctx.$slots, "default", { key: 1 });
}
__vue_sfc__$q.render = __vue_render__$q;
var stdin_default$r = __vue_sfc__$q;
const __vue_sfc__$p = defineComponent({
  name: createNamespace("DropdownItem")[0],
  components: { FanIcon: stdin_default$N, DropdownItemContent: stdin_default$r },
  props: {
    title: String,
    contentStyle: [String, Object],
    modelValue: {
      type: [Number, String],
      default: 0
    },
    active: Boolean,
    // 设为false则不显示图标
    icon: {
      type: [String, Boolean],
      default: ""
    },
    iconSize: {
      type: [String, Number],
      default: "12px"
    },
    options: {
      type: Array,
      default: () => []
    },
    /**
     * option-title 取值
     */
    titleProp: {
      type: String,
      default: "text"
    },
    /**
     * modelValue 的值的来源，默认 options 数组下标
     */
    valueProp: {
      type: String,
      default: "value"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 选项内容是否使用滚动区域
    scroll: {
      type: Boolean,
      default: false
    },
    scrollHeight: {
      type: [String, Boolean],
      default: "61.8vh"
    }
  },
  expose: ["toggle"],
  emits: ["update:modelValue", "change", "update:title"],
  setup(props, context) {
    const state = reactive({
      showWrapper: false
    });
    const theContentStyle = computed(
      () => transformStyleSize(props.contentStyle)
    );
    const theIcon = computed(() => {
      let name = props.icon !== false ? props.icon || "caret-down" : "";
      if (name === "caret-down" && state.showWrapper)
        name = "caret-up";
      return {
        name,
        color: props.active || state.showWrapper || props.icon ? "currentColor" : "rgba(0,0,0,0.1)"
      };
    });
    const formatOptions = (data, titleProp, valueProp) => {
      if (!(data == null ? void 0 : data.length))
        return null;
      return data.map((a, i) => {
        return {
          title: titleProp ? a[titleProp] : a,
          value: valueProp ? a[valueProp] : i,
          children: formatOptions(a.children, titleProp, valueProp)
        };
      });
    };
    const theOptions = computed(() => {
      const { options, titleProp, valueProp } = props;
      return formatOptions(options, titleProp, valueProp) || [];
    });
    const column2 = computed(() => {
      return theOptions.value.some((a) => a.children);
    });
    const column1Active = ref(0);
    const setColumn1Active = (val) => {
      var _a2;
      if (typeof val !== "undefined") {
        column1Active.value = val;
        return;
      }
      if (!column2.value)
        return;
      const item1 = theOptions.value.find((a) => {
        var _a22;
        if (!((_a22 = a.children) == null ? void 0 : _a22.length))
          return a.value === props.modelValue;
        return a.children.some((b) => b.value === props.modelValue);
      });
      const newVal = item1 ? item1.value : ((_a2 = theOptions.value[0]) == null ? void 0 : _a2.value) || 0;
      if (column1Active.value !== newVal) {
        column1Active.value = newVal;
      }
    };
    watch(
      () => props.modelValue,
      (val) => setColumn1Active(val),
      { immediate: true }
    );
    const column2Options = computed(() => {
      const item1 = theOptions.value.find(
        (a) => a.value === column1Active.value
      );
      return (item1 == null ? void 0 : item1.children) || [];
    });
    const { parent } = useParent("fanDropdownMenu");
    const offsetStyle = computed(() => {
      return `top:${parent.offset.value}px;`;
    });
    const animateContent = ref(false);
    const animateBg = ref(false);
    const toggle = (show = !state.showWrapper, options) => {
      if (props.disabled || !context.slots.default && !theOptions.value.length || show === state.showWrapper) {
        return;
      }
      state.showWrapper = show;
      if (show) {
        setColumn1Active();
        animateContent.value = true;
        if (typeof (options == null ? void 0 : options.immediateBg) === "undefined" || !options.immediateBg)
          animateBg.value = true;
        setTimeout(() => {
          animateContent.value = false;
          animateBg.value = false;
        }, 1e3 / 60);
      }
    };
    const emptyFunc = () => null;
    const itemClick = (opt) => {
      const val = opt.value;
      if (opt.children) {
        setColumn1Active(val);
        return;
      }
      if (val !== props.modelValue) {
        context.emit("update:modelValue", val);
        nextTick$1(() => {
          context.emit("update:title", opt.title);
          context.emit("change", val, opt);
        });
      }
      toggle();
    };
    return {
      theContentStyle,
      theIcon,
      state,
      offsetStyle,
      animateContent,
      animateBg,
      theOptions,
      column2,
      column2Options,
      column1Active,
      toggle,
      emptyFunc,
      itemClick
    };
  }
});
const _hoisted_1$k = { class: "fan-dropdown-item" };
const _hoisted_2$a = {
  key: 0,
  class: "fan-flex"
};
const _hoisted_3$4 = { class: "fan-dropdown-item__col1" };
const _hoisted_4$3 = ["onClick"];
const _hoisted_5$2 = { class: "fan-flex-1 fan-ellipsis" };
const _hoisted_6$2 = { class: "fan-dropdown-item__col2" };
const _hoisted_7$1 = ["onClick"];
const _hoisted_8$1 = { class: "fan-flex-1 fan-ellipsis" };
const _hoisted_9$1 = ["onClick"];
const _hoisted_10 = { class: "fan-flex-1 fan-ellipsis" };
function __vue_render__$p(_ctx, _cache) {
  const _component_DropdownItemContent = resolveComponent("DropdownItemContent");
  const _component_FanIcon = resolveComponent("FanIcon");
  return withDirectives((openBlock(), createElementBlock(
    "div",
    _hoisted_1$k,
    [
      createElementVNode("div", {
        class: "fan-dropdown-item__overlay",
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.toggle(false), ["stop"]))
      }),
      createElementVNode(
        "div",
        {
          style: normalizeStyle(_ctx.offsetStyle),
          class: "fan-dropdown-item__main"
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(["fan-dropdown-item__bg", { "fan-dropdown--fade": _ctx.animateBg }]),
              onClick: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.toggle(false), ["stop"]))
            },
            null,
            2
            /* CLASS */
          ),
          createElementVNode(
            "div",
            {
              style: normalizeStyle(_ctx.theContentStyle),
              class: normalizeClass(["fan-dropdown-item__content", { "fan-dropdown--slide": _ctx.animateContent }])
            },
            [
              _ctx.column2 ? (openBlock(), createElementBlock("div", _hoisted_2$a, [
                createElementVNode("div", _hoisted_3$4, [
                  createVNode(_component_DropdownItemContent, {
                    scroll: _ctx.scroll,
                    "scroll-height": _ctx.scrollHeight
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.theOptions, (opt, index2) => {
                          return openBlock(), createElementBlock("div", {
                            key: index2,
                            class: normalizeClass(["fan-dropdown-item__cell", {
                              "fan-dropdown-item--active": _ctx.column1Active === opt.value
                            }]),
                            onClick: ($event) => _ctx.itemClick(opt)
                          }, [
                            createElementVNode(
                              "div",
                              _hoisted_5$2,
                              toDisplayString(opt.title),
                              1
                              /* TEXT */
                            )
                          ], 10, _hoisted_4$3);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["scroll", "scroll-height"])
                ]),
                createElementVNode("div", _hoisted_6$2, [
                  createVNode(_component_DropdownItemContent, {
                    scroll: _ctx.scroll,
                    "scroll-height": _ctx.scrollHeight
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.column2Options, (opt, index2) => {
                          return openBlock(), createElementBlock("div", {
                            key: index2,
                            class: normalizeClass(["fan-hairline--bottom fan-dropdown-item__cell", {
                              "fan-dropdown-item--active": _ctx.modelValue === opt.value
                            }]),
                            onClick: ($event) => _ctx.itemClick(opt)
                          }, [
                            createElementVNode(
                              "div",
                              _hoisted_8$1,
                              toDisplayString(opt.title),
                              1
                              /* TEXT */
                            ),
                            _ctx.modelValue === opt.value ? (openBlock(), createBlock(_component_FanIcon, {
                              key: 0,
                              name: "check-circle-fill",
                              color: "var(--fan-dropdown-active-color)",
                              size: "18px"
                            })) : createCommentVNode("v-if", true)
                          ], 10, _hoisted_7$1);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["scroll", "scroll-height"])
                ])
              ])) : (openBlock(), createBlock(_component_DropdownItemContent, {
                key: 1,
                scroll: _ctx.scroll,
                "scroll-height": _ctx.scrollHeight
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(_ctx.theOptions, (opt, index2) => {
                      return openBlock(), createElementBlock("div", {
                        key: index2,
                        class: normalizeClass(["fan-hairline--bottom fan-dropdown-item__cell", { "fan-dropdown-item--active": _ctx.modelValue === opt.value }]),
                        onClick: ($event) => _ctx.itemClick(opt)
                      }, [
                        createElementVNode(
                          "div",
                          _hoisted_10,
                          toDisplayString(opt.title),
                          1
                          /* TEXT */
                        ),
                        _ctx.modelValue === opt.value ? (openBlock(), createBlock(_component_FanIcon, {
                          key: 0,
                          name: "check-circle-fill",
                          color: "var(--fan-dropdown-active-color)",
                          size: "18px"
                        })) : createCommentVNode("v-if", true)
                      ], 10, _hoisted_9$1);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["scroll", "scroll-height"])),
              renderSlot(_ctx.$slots, "default")
            ],
            6
            /* CLASS, STYLE */
          )
        ],
        4
        /* STYLE */
      )
    ],
    512
    /* NEED_PATCH */
  )), [
    [vShow, _ctx.state.showWrapper]
  ]);
}
__vue_sfc__$p.render = __vue_render__$p;
var stdin_default$q = __vue_sfc__$p;
const DropdownItem = stdin_default$q;
const dropdownMenuSfc = "";
function flattenVNodes(children) {
  const result = [];
  const traverse = (children2) => {
    if (Array.isArray(children2)) {
      children2.forEach((child) => {
        var _a2;
        if (isVNode(child)) {
          result.push(child);
          if ((_a2 = child.component) == null ? void 0 : _a2.subTree) {
            result.push(child.component.subTree);
            traverse(child.component.subTree.children);
          }
          if (child.children) {
            traverse(child.children);
          }
        }
      });
    }
  };
  traverse(children);
  return result;
}
function sortChildren(parent, publicChildren, internalChildren) {
  const vnodes = flattenVNodes(parent.subTree.children);
  internalChildren.sort(
    (a, b) => vnodes.indexOf(a.vnode) - vnodes.indexOf(b.vnode)
  );
  const orderedPublicChildren = internalChildren.map((item) => item.proxy);
  publicChildren.sort((a, b) => {
    const indexA = orderedPublicChildren.indexOf(a);
    const indexB = orderedPublicChildren.indexOf(b);
    return indexA - indexB;
  });
}
function useChildren(key) {
  const publicChildren = reactive([]);
  const internalChildren = reactive([]);
  const parent = getCurrentInstance();
  const linkChildren = (value) => {
    const link = (child) => {
      if (child.proxy) {
        internalChildren.push(child);
        publicChildren.push(child.proxy);
        sortChildren(parent, publicChildren, internalChildren);
      }
    };
    const unlink = (child) => {
      const index2 = internalChildren.indexOf(child);
      publicChildren.splice(index2, 1);
      internalChildren.splice(index2, 1);
    };
    provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children: publicChildren,
          internalChildren
        },
        value
      )
    );
  };
  return {
    children: publicChildren,
    linkChildren
  };
}
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
var __defProp$2 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var __async$6 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const createInstance = (opt) => {
  const _type = opt.type === "Default" ? "" : opt.type;
  const cityData = ref(getStorage(`fan${_type}CityData`));
  const selectingLoction = ref(null);
  const serviceLocation = ref(
    getStorage(`fan${_type}ServiceLocation`, { expired: 10 * 60 * 1e3 })
  );
  const userLocation = ref(getStorage(`fan${_type}UserLocation`));
  const historyLocation = ref(getStorage(`fan${_type}HistoryLocation`) || []);
  const historyCity = computed(() => {
    const arr = [];
    historyLocation.value.forEach((a) => {
      if (arr.length < 6 && !arr.some((b) => b.city.id === a.city.id)) {
        arr.push(a);
      }
    });
    return arr;
  });
  const setServiceLocation = (data) => {
    serviceLocation.value = data;
    setStorage(`fan${_type}ServiceLocation`, data);
  };
  const setSelectingLocation = (data) => {
    selectingLoction.value = data;
  };
  const setUserLocation = (data) => {
    userLocation.value = data;
    setStorage(`fan${_type}UserLocation`, data);
  };
  const addHistoryLocation = (data) => {
    const arr = historyLocation.value.slice();
    const i = arr.findIndex(
      (a) => a.city.id === data.city.id && a.addressName === data.addressName
    );
    if (i > -1)
      arr.splice(i, 1);
    arr.unshift(data);
    if (arr.length > 20)
      arr.length = 20;
    setStorage(`fan${_type}HistoryLocation`, arr);
    historyLocation.value = arr;
  };
  const getHistoryLocation = () => {
    historyLocation.value = getStorage(`fan${_type}HistoryLocation`) || [];
    return historyLocation;
  };
  const getCityDataWithLocation = mergeConcurrent((opt2) => __async$6(void 0, null, function* () {
    let coords;
    let accuracy;
    try {
      const res = yield getGeolocation();
      coords = res.coords;
      accuracy = res.accuracy;
    } catch (e) {
      console.info(e);
    }
    const newLocation = __spreadProps$2(__spreadValues$2({}, coords), {
      accuracy
      // addressName: locationCity?.addressName || locationCity?.address,
    });
    if (!userLocation.value || newLocation.lat !== userLocation.value.lat) {
      setUserLocation(newLocation);
    }
    return { cityData, userLocation };
  }));
  return {
    cityData,
    selectingLoction,
    serviceLocation,
    userLocation,
    setUserLocation,
    historyLocation,
    historyCity,
    getCityDataWithLocation,
    setServiceLocation,
    setSelectingLocation,
    addHistoryLocation,
    getHistoryLocation
  };
};
const instanceList = /* @__PURE__ */ new Map();
const useLocation = (opt) => {
  const type = (opt == null ? void 0 : opt.type) || "Default";
  if (!instanceList.has(type)) {
    instanceList.set(type, createInstance({ type }));
  }
  return instanceList.get(type);
};
var __async$5 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const __vue_sfc__$o = defineComponent({
  name: createNamespace("DropdownMenu")[0],
  components: { FanIcon: stdin_default$N },
  props: {
    border: Boolean,
    offset: {
      type: [Number, Object],
      default: null
    },
    zIndex: Number,
    height: [String, Number],
    color: String,
    activeColor: String
  },
  emits: ["toggle"],
  setup(props, { emit }) {
    const _this = getCurrentInstance();
    const innerOffset = ref(0);
    const barStyle = computed(() => {
      const { height, color } = props;
      let s = "";
      if (color)
        s += `color:${color};`;
      if (height)
        s += `height:${transformSize(height)};`;
      return s;
    });
    const containerStyle = computed(() => {
      const { activeColor, zIndex } = props;
      let s = "";
      if (activeColor)
        s += `--fan-dropdown-active-color:${activeColor};`;
      if (zIndex)
        s += `--fan-dropdown-menu-zindex:${zIndex};`;
      return s;
    });
    const { children, linkChildren } = useChildren("fanDropdownMenu");
    const opened = computed(
      () => children.some((item) => {
        var _a2;
        return (_a2 = item.state) == null ? void 0 : _a2.showWrapper;
      })
    );
    let bodyOverflow = "";
    watch(opened, (val) => {
      const bodyStyle = document.body.style;
      if (val) {
        bodyOverflow = bodyStyle.overflow;
        bodyStyle.setProperty("overflow", "hidden", "important");
      } else {
        bodyStyle.setProperty("overflow", bodyOverflow);
      }
      emit("toggle", { opened: val });
    });
    linkChildren({ props, offset: innerOffset });
    const { pageScrollTo, onPageScroll } = usePageLifecycle();
    let scrollTop = 0;
    onPageScroll((e) => {
      scrollTop = e.scrollTop;
    });
    const itemClick = (i) => __async$5(this, null, function* () {
      const item = children[i];
      const _opened = opened.value;
      if (!item.state.showWrapper && _opened) {
        children.forEach((a) => a.toggle(false));
      }
      const rect = yield getElementBounding({
        selector: ".fan-dropdown-menu__bar",
        scope: _this
      });
      if (props.offset === null) {
        innerOffset.value = (rect == null ? void 0 : rect.bottom) || 0;
      } else {
        pageScrollTo({
          scrollTop: scrollTop + ((rect == null ? void 0 : rect.top) || 0) - props.offset,
          duration: 0
        });
        innerOffset.value = (props.offset || 0) + ((rect == null ? void 0 : rect.height) || 0);
      }
      item.toggle(void 0, { immediateBg: _opened });
    });
    const emptyFunc = () => null;
    return { barStyle, containerStyle, children, opened, itemClick, emptyFunc };
  }
});
const _hoisted_1$j = ["onClick"];
const _hoisted_2$9 = { class: "fan-ellipsis" };
function __vue_render__$o(_ctx, _cache) {
  const _component_FanIcon = resolveComponent("FanIcon");
  return openBlock(), createElementBlock(
    "div",
    {
      style: normalizeStyle(_ctx.containerStyle),
      class: "fan-dropdown-menu"
    },
    [
      createElementVNode(
        "div",
        {
          style: normalizeStyle(_ctx.barStyle),
          class: normalizeClass(["fan-dropdown-menu__bar", {
            "fan-hairline--bottom": _ctx.border,
            "fan-dropdown-menu__bar--opened": _ctx.opened
          }]),
          onTouchmove: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.emptyFunc && _ctx.emptyFunc(...args), ["stop", "prevent"]))
        },
        [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.children, (item, index2) => {
              return openBlock(), createElementBlock("div", {
                key: index2,
                class: normalizeClass(["fan-dropdown-menu__item", {
                  "fan-dropdown-menu--active": item.active || item.state.showWrapper
                }]),
                onClick: ($event) => _ctx.itemClick(index2)
              }, [
                createElementVNode(
                  "div",
                  _hoisted_2$9,
                  toDisplayString(item.title),
                  1
                  /* TEXT */
                ),
                item.theIcon.name ? (openBlock(), createBlock(_component_FanIcon, {
                  key: 0,
                  name: item.theIcon.name,
                  size: item.iconSize,
                  color: item.theIcon.color,
                  "custom-style": "margin:1px 0 0 3px;"
                }, null, 8, ["name", "size", "color"])) : createCommentVNode("v-if", true)
              ], 10, _hoisted_1$j);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      ),
      renderSlot(_ctx.$slots, "default")
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__$o.render = __vue_render__$o;
var stdin_default$p = __vue_sfc__$o;
const DropdownMenu = stdin_default$p;
const emptySfc = "";
const __vue_sfc__$n = defineComponent({
  name: createNamespace("Empoty")[0],
  components: {
    FanImage: stdin_default$y
  },
  props: {
    image: {
      type: String,
      default: "https://img.dac6.cn/fre/saas/empty-box.png"
    },
    imageSize: {
      type: [Number, String, Array],
      default: 100
    },
    descSize: {
      type: [Number, String]
    },
    description: {
      type: String,
      default: "暂无内容"
    },
    // 是否识别 \n 等
    pre: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const inageStyle = computed(() => {
      let style2 = props.imageSize;
      if (!Array.isArray(props.imageSize))
        style2 = [props.imageSize, props.imageSize];
      return style2;
    });
    const theStyle = computed(() => {
      const { customStyle, descSize } = props;
      const s = descSize ? `font-size:${transformSize(descSize)}` : "";
      return transformStyleSize(customStyle) + s;
    });
    return {
      theStyle,
      inageStyle
    };
  }
});
const _hoisted_1$i = { class: "fan-empty__bottom" };
function __vue_render__$n(_ctx, _cache) {
  const _component_FanImage = resolveComponent("FanImage");
  return openBlock(), createElementBlock(
    "div",
    {
      style: normalizeStyle(_ctx.theStyle),
      class: "fan-empty"
    },
    [
      createVNode(_component_FanImage, {
        src: _ctx.image,
        width: _ctx.inageStyle[0],
        height: _ctx.inageStyle[1]
      }, null, 8, ["src", "width", "height"]),
      _ctx.description ? (openBlock(), createElementBlock(
        "p",
        {
          key: 0,
          class: normalizeClass(["fan-empty__desc", { pre: _ctx.pre }])
        },
        toDisplayString(_ctx.description),
        3
        /* TEXT, CLASS */
      )) : createCommentVNode("v-if", true),
      createElementVNode("div", _hoisted_1$i, [
        renderSlot(_ctx.$slots, "default")
      ])
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__$n.render = __vue_render__$n;
var stdin_default$o = __vue_sfc__$n;
const Empty = stdin_default$o;
const Icon = stdin_default$N;
const Image$1 = stdin_default$y;
const Input = stdin_default$I;
const inputGridSfc = "";
const __vue_sfc__$m = defineComponent({
  name: createNamespace("InputGrid")[0],
  emits: ["update:modelValue", "input"],
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    // 输入内容长度
    length: {
      type: [String, Number],
      default: 6
    },
    type: {
      type: String,
      default: "text",
      validator: (value) => {
        return ["text", "number", "idcard", "tel"].includes(value);
      }
    },
    gridStyle: String,
    cursorColor: {
      type: String,
      default: "#1677FE"
    },
    // 输入完成时是否自动收起软键盘
    autoBlur: {
      type: [String, Boolean],
      default: true
    }
  },
  setup(props, { emit }) {
    const innerValue = ref("");
    const focus = ref(false);
    const domRef = ref(null);
    const renderValues = computed(() => {
      const val = `${typeof innerValue.value === "undefined" ? "" : innerValue.value}`;
      const length = props.length;
      let index2 = -1;
      const chars = Array.from({ length }).map((_2, i) => {
        const char = val[i] || "";
        if (char === "" && index2 === -1)
          index2 = i;
        return char;
      });
      if (val.length >= length)
        index2 = length - 1;
      return { chars, index: index2 };
    });
    const theStyle = computed(() => {
      return `--fan-grid-cursor-color:${props.cursorColor};`;
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== innerValue.value)
          innerValue.value = val;
      },
      { immediate: true }
    );
    watch(
      () => innerValue.value,
      (val) => {
        if (val !== props.modelValue)
          emit("update:modelValue", val);
        emit("input", val);
      },
      { immediate: true }
    );
    const onFocus = () => {
      focus.value = true;
    };
    const onBlur = () => {
      focus.value = false;
    };
    const onInput = (e) => {
      var _a2;
      const { length, type, autoBlur } = props;
      const innerValues = e.target.value;
      let val = String(innerValues);
      if (autoBlur && val.length >= length) {
        (_a2 = domRef.value) == null ? void 0 : _a2.input.blur();
        onBlur();
      }
      if (val.length > length)
        val = val.substring(0, length);
      if (val && (type === "number" || type === "tel")) {
        val = isNaN(+val) ? "" : +val;
      }
      if (val !== innerValue.value)
        innerValue.value = val;
    };
    const boxClick = () => {
      var _a2;
      (_a2 = domRef.value) == null ? void 0 : _a2.input.focus();
      if (!focus.value)
        focus.value = true;
      else
        focus.value = focus.value === 1 ? true : 1;
    };
    return {
      theStyle,
      renderValues,
      innerValue,
      focus,
      onFocus,
      onBlur,
      onInput,
      boxClick
    };
  }
});
const _hoisted_1$h = ["type", "value", "focus", "autofocus"];
function __vue_render__$m(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: "fan-grid-input",
      style: normalizeStyle(_ctx.theStyle)
    },
    [
      createElementVNode("input", {
        ref: "input",
        class: "fan-grid-input__in",
        type: _ctx.type,
        value: _ctx.innerValue,
        focus: _ctx.focus,
        autofocus: _ctx.focus,
        onFocus: _cache[0] || (_cache[0] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
        onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
        onInput: _cache[2] || (_cache[2] = (...args) => _ctx.onInput && _ctx.onInput(...args))
      }, null, 40, _hoisted_1$h),
      createElementVNode("div", {
        class: "fan-flex",
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.boxClick && _ctx.boxClick(...args))
      }, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.renderValues.chars, (char, index2) => {
            return openBlock(), createElementBlock(
              "div",
              {
                key: index2,
                class: normalizeClass(["fan-grid-input__box", { cursor: _ctx.focus && index2 === _ctx.renderValues.index }]),
                style: normalizeStyle(_ctx.gridStyle)
              },
              toDisplayString(char),
              7
              /* TEXT, CLASS, STYLE */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__$m.render = __vue_render__$m;
var stdin_default$n = __vue_sfc__$m;
const InputGrid = stdin_default$n;
const inputNumberSfc = "";
function getInputType(integer) {
  return { type: "text", mode: integer ? "numeric" : "decimal" };
}
const __vue_sfc__$l = defineComponent({
  name: createNamespace("InputNumber")[0],
  components: { FanIcon: stdin_default$N },
  props: {
    modelValue: {
      type: [Number, String]
    },
    // 是否只允许输入整数
    integer: {
      type: Boolean,
      default: true
    },
    // 计数器步长
    step: {
      type: Number,
      default: 1
    },
    // 按钮大小
    actionSize: {
      type: [Number, String],
      default: 22
    },
    // 按钮颜色
    actionColor: {
      type: String
    },
    inputWidth: {
      type: [Number, String],
      default: 32
    },
    inputStyle: String,
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 99999
    },
    // 减少按钮图标名或网络地址，有值则覆盖默认按钮
    minusIcon: {
      type: String
    },
    // 增加按钮图标名或网络地址
    plusIcon: {
      type: String
    }
  },
  emits: ["update:modelValue", "input", "change", "overlimit"],
  setup(props, context) {
    const innerValue = ref(1);
    const inputType = computed(() => getInputType(props.integer));
    const actionStyle = computed(() => {
      const size = transformSize(props.actionSize);
      return `width:${size};height:${size};`;
    });
    const theInputStyle = computed(() => {
      const size = transformSize(props.actionSize);
      const width = transformSize(props.inputWidth);
      return `width:${width};height:${size};line-height:${size};${transformStyleSize(
        props.inputStyle
      )}`;
    });
    const minusDisabled = computed(() => innerValue.value <= props.min);
    const plusDisabled = computed(
      () => props.max && innerValue.value >= props.max
    );
    watch(
      () => props.modelValue,
      (val) => {
        if ((val || val === 0) && val !== innerValue.value)
          innerValue.value = val;
      },
      { immediate: true }
    );
    watch(innerValue, (val) => {
      if (val !== props.modelValue)
        context.emit("update:modelValue", val);
      context.emit("input", val);
      context.emit("change", val);
    });
    const onInput = (e) => {
      let value = Number(e.target.value) || "";
      const { min, max } = props;
      if (!value || value < min) {
        value = min;
        context.emit("overlimit", "minus");
      } else if ((max || max === 0) && value > max) {
        value = max;
        context.emit("overlimit", "plus");
      }
      innerValue.value = value;
    };
    const minus = () => {
      const { step, min } = props;
      const val = innerValue.value - step;
      if (val < min) {
        if (step > 1)
          innerValue.value = min;
        else
          context.emit("overlimit", "minus");
      } else {
        innerValue.value = val;
      }
    };
    const plus = () => {
      const { step, max } = props;
      const val = innerValue.value + step;
      if ((max || max === 0) && val > max) {
        if (step > 1)
          innerValue.value = max;
        else
          context.emit("overlimit", "plus");
      } else {
        innerValue.value = val;
      }
    };
    return {
      innerValue,
      inputType,
      actionStyle,
      theInputStyle,
      minusDisabled,
      plusDisabled,
      onInput,
      minus,
      plus
    };
  }
});
const _hoisted_1$g = { class: "fan-input-num" };
const _hoisted_2$8 = ["type", "inputmode"];
function __vue_render__$l(_ctx, _cache) {
  const _component_FanIcon = resolveComponent("FanIcon");
  return openBlock(), createElementBlock("div", _hoisted_1$g, [
    createElementVNode(
      "button",
      {
        class: normalizeClass(["fan-flex fan-align-center fan-justify-center fan-input-num__action", { "fan-input-num--disabled": _ctx.minusDisabled }]),
        style: normalizeStyle(_ctx.actionStyle),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.minus && _ctx.minus(...args))
      },
      [
        !_ctx.minusIcon ? (openBlock(), createElementBlock(
          "div",
          {
            key: 0,
            class: "fan-input-num__hl",
            style: normalizeStyle({ backgroundColor: _ctx.actionColor })
          },
          null,
          4
          /* STYLE */
        )) : (openBlock(), createBlock(_component_FanIcon, {
          key: 1,
          name: _ctx.minusIcon,
          size: _ctx.actionSize * 0.7,
          color: _ctx.actionColor
        }, null, 8, ["name", "size", "color"]))
      ],
      6
      /* CLASS, STYLE */
    ),
    withDirectives(createElementVNode("input", {
      class: "fan-input-num__field",
      style: normalizeStyle(_ctx.theInputStyle),
      controlled: "",
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.innerValue = $event),
      type: _ctx.inputType.type,
      inputmode: _ctx.inputType.mode,
      onInput: _cache[2] || (_cache[2] = (...args) => _ctx.onInput && _ctx.onInput(...args))
    }, null, 44, _hoisted_2$8), [
      [vModelDynamic, _ctx.innerValue]
    ]),
    createElementVNode(
      "button",
      {
        class: normalizeClass(["fan-flex fan-align-center fan-justify-center fan-input-num__action", { "fan-input-num--disabled": _ctx.plusDisabled }]),
        style: normalizeStyle(_ctx.actionStyle),
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.plus && _ctx.plus(...args))
      },
      [
        !_ctx.plusIcon ? (openBlock(), createElementBlock(
          Fragment,
          { key: 0 },
          [
            createElementVNode(
              "div",
              {
                class: "fan-input-num__hl",
                style: normalizeStyle({ backgroundColor: _ctx.actionColor })
              },
              null,
              4
              /* STYLE */
            ),
            createElementVNode(
              "div",
              {
                class: "fan-input-num__vl",
                style: normalizeStyle({ backgroundColor: _ctx.actionColor })
              },
              null,
              4
              /* STYLE */
            )
          ],
          64
          /* STABLE_FRAGMENT */
        )) : (openBlock(), createBlock(_component_FanIcon, {
          key: 1,
          name: _ctx.plusIcon,
          size: _ctx.actionSize * 0.7,
          color: _ctx.actionColor
        }, null, 8, ["name", "size", "color"]))
      ],
      6
      /* CLASS, STYLE */
    )
  ]);
}
__vue_sfc__$l.render = __vue_render__$l;
var stdin_default$m = __vue_sfc__$l;
const InputNumber = stdin_default$m;
/*!
 * Vue-Lazyload.js v3.0.0
 * (c) 2023 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var assignSymbols$1 = createCommonjsModule(function(module) {
  const toString = Object.prototype.toString;
  const isEnumerable = Object.prototype.propertyIsEnumerable;
  const getSymbols = Object.getOwnPropertySymbols;
  module.exports = (target, ...args) => {
    if (!isObject2(target)) {
      throw new TypeError("expected the first argument to be an object");
    }
    if (args.length === 0 || typeof Symbol !== "function" || typeof getSymbols !== "function") {
      return target;
    }
    for (let arg of args) {
      let names = getSymbols(arg);
      for (let key of names) {
        if (isEnumerable.call(arg, key)) {
          target[key] = arg[key];
        }
      }
    }
    return target;
  };
  function isObject2(val) {
    return typeof val === "function" || toString.call(val) === "[object Object]" || Array.isArray(val);
  }
});
var assignSymbols$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  "default": assignSymbols$1,
  __moduleExports: assignSymbols$1
});
var assignSymbols = assignSymbols$2 && assignSymbols$1 || assignSymbols$2;
var assignDeep = createCommonjsModule(function(module) {
  const toString = Object.prototype.toString;
  const isValidKey = (key) => {
    return key !== "__proto__" && key !== "constructor" && key !== "prototype";
  };
  const assign = module.exports = (target, ...args) => {
    let i = 0;
    if (isPrimitive(target))
      target = args[i++];
    if (!target)
      target = {};
    for (; i < args.length; i++) {
      if (isObject2(args[i])) {
        for (const key of Object.keys(args[i])) {
          if (isValidKey(key)) {
            if (isObject2(target[key]) && isObject2(args[i][key])) {
              assign(target[key], args[i][key]);
            } else {
              target[key] = args[i][key];
            }
          }
        }
        assignSymbols(target, args[i]);
      }
    }
    return target;
  };
  function isObject2(val) {
    return typeof val === "function" || toString.call(val) === "[object Object]";
  }
  function isPrimitive(val) {
    return typeof val === "object" ? val === null : typeof val !== "function";
  }
});
const inBrowser = typeof window !== "undefined" && window !== null;
const hasIntersectionObserver = checkIntersectionObserver();
function checkIntersectionObserver() {
  if (inBrowser && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
    if (!("isIntersecting" in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
        get: function() {
          return this.intersectionRatio > 0;
        }
      });
    }
    return true;
  }
  return false;
}
const modeType = {
  event: "event",
  observer: "observer"
};
function remove(arr, item) {
  if (!arr.length)
    return;
  const index2 = arr.indexOf(item);
  if (index2 > -1)
    return arr.splice(index2, 1);
}
function getBestSelectionFromSrcset(el, scale) {
  if (el.tagName !== "IMG" || !el.getAttribute("data-srcset"))
    return "";
  let options = el.getAttribute("data-srcset").trim().split(",");
  const result = [];
  const container = el.parentNode;
  const containerWidth = container.offsetWidth * scale;
  let spaceIndex;
  let tmpSrc;
  let tmpWidth;
  options.forEach((item) => {
    item = item.trim();
    spaceIndex = item.lastIndexOf(" ");
    if (spaceIndex === -1) {
      tmpSrc = item;
      tmpWidth = 99999;
    } else {
      tmpSrc = item.substr(0, spaceIndex);
      tmpWidth = parseInt(item.substr(spaceIndex + 1, item.length - spaceIndex - 2), 10);
    }
    result.push([tmpWidth, tmpSrc]);
  });
  result.sort((a, b) => {
    if (a[0] < b[0]) {
      return 1;
    }
    if (a[0] > b[0]) {
      return -1;
    }
    if (a[0] === b[0]) {
      if (b[1].indexOf(".webp", b[1].length - 5) !== -1) {
        return 1;
      }
      if (a[1].indexOf(".webp", a[1].length - 5) !== -1) {
        return -1;
      }
    }
    return 0;
  });
  let bestSelectedSrc = "";
  let tmpOption;
  for (let i = 0; i < result.length; i++) {
    tmpOption = result[i];
    bestSelectedSrc = tmpOption[1];
    const next = result[i + 1];
    if (next && next[0] < containerWidth) {
      bestSelectedSrc = tmpOption[1];
      break;
    } else if (!next) {
      bestSelectedSrc = tmpOption[1];
      break;
    }
  }
  return bestSelectedSrc;
}
const getDPR = (scale = 1) => inBrowser ? window.devicePixelRatio || scale : scale;
function supportWebp() {
  if (!inBrowser)
    return false;
  let support2 = true;
  function checkWebpFeature(feature, callback) {
    const kTestImages = {
      lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
      lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
      alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
      animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    const img = new Image();
    img.onload = function() {
      const result = img.width > 0 && img.height > 0;
      callback(result);
    };
    img.onerror = function() {
      callback(false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
  }
  checkWebpFeature("lossy", (isSupported) => {
    support2 = isSupported;
  });
  checkWebpFeature("lossless", (isSupported) => {
    support2 = isSupported;
  });
  checkWebpFeature("alpha", (isSupported) => {
    support2 = isSupported;
  });
  checkWebpFeature("animation", (isSupported) => {
    support2 = isSupported;
  });
  return support2;
}
function throttle(action, delay) {
  let timeout = null;
  let lastRun = 0;
  return function() {
    if (timeout) {
      return;
    }
    const elapsed = Date.now() - lastRun;
    const context = this;
    const args = arguments;
    const runCallback = function() {
      lastRun = Date.now();
      timeout = false;
      action.apply(context, args);
    };
    if (elapsed >= delay) {
      runCallback();
    } else {
      timeout = setTimeout(runCallback, delay);
    }
  };
}
function testSupportsPassive() {
  if (!inBrowser)
    return false;
  let support2 = false;
  try {
    const opts = Object.defineProperty({}, "passive", {
      get: function() {
        support2 = true;
      }
    });
    window.addEventListener("test", noop, opts);
  } catch (e) {
  }
  return support2;
}
const supportsPassive = testSupportsPassive();
const _ = {
  on(el, type, func, capture = false) {
    if (supportsPassive) {
      el.addEventListener(type, func, {
        capture,
        passive: true
      });
    } else {
      el.addEventListener(type, func, capture);
    }
  },
  off(el, type, func, capture = false) {
    el.removeEventListener(type, func, capture);
  }
};
const loadImageAsync = (item, resolve, reject) => {
  let image = new Image();
  if (!item || !item.src) {
    const err = new Error("image src is required");
    return reject(err);
  }
  if (item.cors) {
    image.crossOrigin = item.cors;
  }
  image.src = item.src;
  image.onload = function() {
    resolve({
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: image.src
    });
    image = null;
  };
  image.onerror = function(e) {
    reject(e);
  };
};
const style = (el, prop) => {
  return typeof getComputedStyle !== "undefined" ? getComputedStyle(el, null).getPropertyValue(prop) : el.style[prop];
};
const overflow = (el) => {
  return style(el, "overflow") + style(el, "overflowY") + style(el, "overflowX");
};
const scrollParent = (el) => {
  if (!inBrowser)
    return;
  if (!(el instanceof Element)) {
    return window;
  }
  let parent = el;
  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break;
    }
    if (!parent.parentNode) {
      break;
    }
    if (/(scroll|auto)/.test(overflow(parent))) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return window;
};
function isObject$3(obj) {
  return obj !== null && typeof obj === "object";
}
function noop() {
}
class ImageCache {
  constructor(max) {
    this.max = max || 100;
    this._caches = [];
  }
  has(key) {
    return this._caches.indexOf(key) > -1;
  }
  add(key) {
    if (this.has(key))
      return;
    this._caches.push(key);
    if (this._caches.length > this.max) {
      this.free();
    }
  }
  free() {
    this._caches.shift();
  }
}
class ReactiveListener {
  constructor(el, src, error, loading, bindType, $parent, options, cors, elRenderer, imageCache) {
    this.el = el;
    this.src = src;
    this.error = error;
    this.loading = loading;
    this.bindType = bindType;
    this.attempt = 0;
    this.cors = cors;
    this.naturalHeight = 0;
    this.naturalWidth = 0;
    this.options = options;
    this.rect = {};
    this.$parent = $parent;
    this.elRenderer = elRenderer;
    this._imageCache = imageCache;
    this.performanceData = {
      init: Date.now(),
      loadStart: 0,
      loadEnd: 0
    };
    this.filter();
    this.initState();
    this.render("loading", false);
  }
  /*
   * init listener state
   * @return
   */
  initState() {
    if ("dataset" in this.el) {
      this.el.dataset.src = this.src;
    } else {
      this.el.setAttribute("data-src", this.src);
    }
    this.state = {
      loading: false,
      error: false,
      loaded: false,
      rendered: false
    };
  }
  /*
   * record performance
   * @return
   */
  record(event) {
    this.performanceData[event] = Date.now();
  }
  /*
   * update image listener data
   * @param  {String} image uri
   * @param  {String} loading image uri
   * @param  {String} error image uri
   * @return
   */
  update(option) {
    const oldSrc = this.src;
    this.src = option.src;
    this.loading = option.loading;
    this.error = option.error;
    this.filter();
    if (oldSrc !== this.src) {
      this.attempt = 0;
      this.initState();
    }
  }
  /*
   * get el node rect
   * @return
   */
  getRect() {
    this.rect = this.el.getBoundingClientRect();
  }
  /*
   * check el is in view
   * @return {Boolean} el is in view
   */
  checkInView() {
    this.getRect();
    return this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0;
  }
  /*
   * listener filter
   */
  filter() {
    for (const key in this.options.filter) {
      this.options.filter[key](this, this.options);
    }
  }
  /*
   * render loading first
   * @params cb:Function
   * @return
   */
  renderLoading(cb) {
    this.state.loading = true;
    loadImageAsync({
      src: this.loading,
      cors: this.cors
    }, () => {
      this.render("loading", false);
      this.state.loading = false;
      cb();
    }, () => {
      cb();
      this.state.loading = false;
      if (!this.options.silent)
        console.warn(`VueLazyload log: load failed with loading image(${this.loading})`);
    });
  }
  /*
   * try load image and  render it
   * @return
   */
  load(onFinish = noop) {
    if (this.attempt > this.options.attempt - 1 && this.state.error) {
      if (!this.options.silent)
        console.log(`VueLazyload log: ${this.src} tried too more than ${this.options.attempt} times`);
      onFinish();
      return;
    }
    if (this.state.rendered && this.state.loaded)
      return;
    if (this._imageCache.has(this.src)) {
      this.state.loaded = true;
      this.render("loaded", true);
      this.state.rendered = true;
      return onFinish();
    }
    this.renderLoading(() => {
      this.attempt++;
      this.options.adapter.beforeLoad && this.options.adapter.beforeLoad(this, this.options);
      this.record("loadStart");
      loadImageAsync({
        src: this.src,
        cors: this.cors
      }, (data) => {
        this.naturalHeight = data.naturalHeight;
        this.naturalWidth = data.naturalWidth;
        this.state.loaded = true;
        this.state.error = false;
        this.record("loadEnd");
        this.render("loaded", false);
        this.state.rendered = true;
        this._imageCache.add(this.src);
        onFinish();
      }, (err) => {
        !this.options.silent && console.error(err);
        this.state.error = true;
        this.state.loaded = false;
        this.render("error", false);
      });
    });
  }
  /*
   * render image
   * @param  {String} state to render // ['loading', 'src', 'error']
   * @param  {String} is form cache
   * @return
   */
  render(state, cache) {
    this.elRenderer(this, state, cache);
  }
  /*
   * output performance data
   * @return {Object} performance data
   */
  performance() {
    let state = "loading";
    let time = 0;
    if (this.state.loaded) {
      state = "loaded";
      time = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1e3;
    }
    if (this.state.error)
      state = "error";
    return {
      src: this.src,
      state,
      time
    };
  }
  /*
   * $destroy
   * @return
   */
  $destroy() {
    this.el = null;
    this.src = "";
    this.error = null;
    this.loading = "";
    this.bindType = null;
    this.attempt = 0;
  }
}
const DEFAULT_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const DEFAULT_EVENTS = ["scroll", "wheel", "mousewheel", "resize", "animationend", "transitionend", "touchmove"];
const DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: "0px",
  threshold: 0
};
class Lazy {
  constructor({ preLoad, error, throttleWait, preLoadTop, dispatchEvent, loading, attempt, silent = true, scale, listenEvents, filter, adapter, observer, observerOptions }) {
    this.version = '"3.0.0"';
    this.lazyContainerMananger = null;
    this.mode = modeType.event;
    this.ListenerQueue = [];
    this.TargetIndex = 0;
    this.TargetQueue = [];
    this.options = {
      silent,
      dispatchEvent: !!dispatchEvent,
      throttleWait: throttleWait || 200,
      preLoad: preLoad || 1.3,
      preLoadTop: preLoadTop || 0,
      error: error || DEFAULT_URL,
      loading: loading || DEFAULT_URL,
      attempt: attempt || 3,
      scale: scale || getDPR(scale),
      listenEvents: listenEvents || DEFAULT_EVENTS,
      supportWebp: supportWebp(),
      filter: filter || {},
      adapter: adapter || {},
      observer: !!observer,
      observerOptions: observerOptions || DEFAULT_OBSERVER_OPTIONS
    };
    this._initEvent();
    this._imageCache = new ImageCache(200);
    this.lazyLoadHandler = throttle(this._lazyLoadHandler.bind(this), this.options.throttleWait);
    this.setMode(this.options.observer ? modeType.observer : modeType.event);
  }
  /**
   * output listener's load performance
   * @return {Array}
   */
  performance() {
    const list = [];
    this.ListenerQueue.map((item) => list.push(item.performance()));
    return list;
  }
  /*
   * add lazy component to queue
   * @param  {Vue} vm lazy component instance
   * @return
   */
  addLazyBox(vm) {
    this.ListenerQueue.push(vm);
    if (inBrowser) {
      this._addListenerTarget(window);
      this._observer && this._observer.observe(vm.el);
      if (vm.$el && vm.$el.parentNode) {
        this._addListenerTarget(vm.$el.parentNode);
      }
    }
  }
  /*
   * add image listener to queue
   * @param  {DOM} el
   * @param  {object} binding vue directive binding
   * @param  {vnode} vnode vue directive vnode
   * @return
   */
  add(el, binding, vnode) {
    if (this.ListenerQueue.some((item) => item.el === el)) {
      this.update(el, binding);
      return nextTick$1(this.lazyLoadHandler);
    }
    let { src, loading, error, cors } = this._valueFormatter(binding.value);
    nextTick$1(() => {
      src = getBestSelectionFromSrcset(el, this.options.scale) || src;
      this._observer && this._observer.observe(el);
      const container = Object.keys(binding.modifiers)[0];
      let $parent;
      if (container) {
        $parent = binding.instance.$refs[container];
        $parent = $parent ? $parent.el || $parent : document.getElementById(container);
      }
      if (!$parent) {
        $parent = scrollParent(el);
      }
      const newListener = new ReactiveListener(el, src, error, loading, binding.arg, $parent, this.options, cors, this._elRenderer.bind(this), this._imageCache);
      this.ListenerQueue.push(newListener);
      if (inBrowser) {
        this._addListenerTarget(window);
        this._addListenerTarget($parent);
      }
      nextTick$1(this.lazyLoadHandler);
    });
  }
  /**
  * update image src
  * @param  {DOM} el
  * @param  {object} vue directive binding
  * @return
  */
  update(el, binding, vnode) {
    let { src, loading, error } = this._valueFormatter(binding.value);
    src = getBestSelectionFromSrcset(el, this.options.scale) || src;
    const exist = this.ListenerQueue.find((item) => item.el === el);
    if (!exist) {
      if (el.getAttribute("lazy") !== "loaded" || el.dataset.src !== src) {
        this.add(el, binding, vnode);
      }
    } else {
      exist.update({
        src,
        loading,
        error
      });
    }
    if (this._observer) {
      this._observer.unobserve(el);
      this._observer.observe(el);
    }
    nextTick$1(this.lazyLoadHandler);
  }
  /**
  * remove listener form list
  * @param  {DOM} el
  * @return
  */
  remove(el) {
    if (!el)
      return;
    this._observer && this._observer.unobserve(el);
    const existItem = this.ListenerQueue.find((item) => item.el === el);
    if (existItem) {
      this._removeListenerTarget(existItem.$parent);
      this._removeListenerTarget(window);
      remove(this.ListenerQueue, existItem);
      existItem.$destroy && existItem.$destroy();
    }
  }
  /*
   * remove lazy components form list
   * @param  {Vue} vm Vue instance
   * @return
   */
  removeComponent(vm) {
    if (!vm)
      return;
    remove(this.ListenerQueue, vm);
    this._observer && this._observer.unobserve(vm.el);
    if (vm.$parent && vm.$el.parentNode) {
      this._removeListenerTarget(vm.$el.parentNode);
    }
    this._removeListenerTarget(window);
  }
  setMode(mode) {
    if (!hasIntersectionObserver && mode === modeType.observer) {
      mode = modeType.event;
    }
    this.mode = mode;
    if (mode === modeType.event) {
      if (this._observer) {
        this.ListenerQueue.forEach((listener) => {
          this._observer.unobserve(listener.el);
        });
        this._observer = null;
      }
      this.TargetQueue.forEach((target) => {
        this._initListen(target.el, true);
      });
    } else {
      this.TargetQueue.forEach((target) => {
        this._initListen(target.el, false);
      });
      this._initIntersectionObserver();
    }
  }
  /*
  *** Private functions ***
  */
  /*
   * add listener target
   * @param  {DOM} el listener target
   * @return
   */
  _addListenerTarget(el) {
    if (!el)
      return;
    let target = this.TargetQueue.find((target2) => target2.el === el);
    if (!target) {
      target = {
        el,
        id: ++this.TargetIndex,
        childrenCount: 1,
        listened: true
      };
      this.mode === modeType.event && this._initListen(target.el, true);
      this.TargetQueue.push(target);
    } else {
      target.childrenCount++;
    }
    return this.TargetIndex;
  }
  /*
   * remove listener target or reduce target childrenCount
   * @param  {DOM} el or window
   * @return
   */
  _removeListenerTarget(el) {
    this.TargetQueue.forEach((target, index2) => {
      if (target.el === el) {
        target.childrenCount--;
        if (!target.childrenCount) {
          this._initListen(target.el, false);
          this.TargetQueue.splice(index2, 1);
          target = null;
        }
      }
    });
  }
  /*
   * add or remove eventlistener
   * @param  {DOM} el DOM or Window
   * @param  {boolean} start flag
   * @return
   */
  _initListen(el, start) {
    this.options.listenEvents.forEach((evt) => _[start ? "on" : "off"](el, evt, this.lazyLoadHandler));
  }
  _initEvent() {
    this.Event = {
      listeners: {
        loading: [],
        loaded: [],
        error: []
      }
    };
    this.$on = (event, func) => {
      if (!this.Event.listeners[event])
        this.Event.listeners[event] = [];
      this.Event.listeners[event].push(func);
    };
    this.$once = (event, func) => {
      const vm = this;
      function on() {
        vm.$off(event, on);
        func.apply(vm, arguments);
      }
      this.$on(event, on);
    };
    this.$off = (event, func) => {
      if (!func) {
        if (!this.Event.listeners[event])
          return;
        this.Event.listeners[event].length = 0;
        return;
      }
      remove(this.Event.listeners[event], func);
    };
    this.$emit = (event, context, inCache) => {
      if (!this.Event.listeners[event])
        return;
      this.Event.listeners[event].forEach((func) => func(context, inCache));
    };
  }
  /**
   * find nodes which in viewport and trigger load
   * @return
   */
  _lazyLoadHandler() {
    const freeList = [];
    this.ListenerQueue.forEach((listener, index2) => {
      if (!listener.el || !listener.el.parentNode || listener.state.loaded) {
        freeList.push(listener);
      }
      const catIn = listener.checkInView();
      if (!catIn)
        return;
      if (!listener.state.loaded)
        listener.load();
    });
    freeList.forEach((item) => {
      remove(this.ListenerQueue, item);
      item.$destroy && item.$destroy();
    });
  }
  /**
  * init IntersectionObserver
  * set mode to observer
  * @return
  */
  _initIntersectionObserver() {
    if (!hasIntersectionObserver)
      return;
    this._observer = new IntersectionObserver(this._observerHandler.bind(this), this.options.observerOptions);
    if (this.ListenerQueue.length) {
      this.ListenerQueue.forEach((listener) => {
        this._observer.observe(listener.el);
      });
    }
  }
  /**
  * init IntersectionObserver
  * @param {Array<IntersectionObserverEntry>} entries
  * @return
  */
  _observerHandler(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.ListenerQueue.forEach((listener) => {
          if (listener.el === entry.target) {
            if (listener.state.loaded)
              return this._observer.unobserve(listener.el);
            listener.load();
          }
        });
      }
    });
  }
  /**
  * set element attribute with image'url and state
  * @param  {ReactiveListener} lazyload listener object
  * @param  {TeventType} state will be rendered
  * @param  {bool} inCache  is rendered from cache
  * @return
  */
  _elRenderer(listener, state, cache) {
    if (!listener.el)
      return;
    const { el, bindType } = listener;
    let src;
    switch (state) {
      case "loading":
        src = listener.loading;
        break;
      case "error":
        src = listener.error;
        break;
      default:
        src = listener.src;
        break;
    }
    if (bindType) {
      el.style[bindType] = 'url("' + src + '")';
    } else if (el.getAttribute("src") !== src) {
      el.setAttribute("src", src);
    }
    el.setAttribute("lazy", state);
    this.$emit(state, listener, cache);
    this.options.adapter[state] && this.options.adapter[state](listener, this.options);
    if (this.options.dispatchEvent) {
      const event = new CustomEvent(state, {
        detail: listener
      });
      el.dispatchEvent(event);
    }
  }
  _valueFormatter(value) {
    if (isObject$3(value)) {
      if (!value.src && !this.options.silent)
        console.error("Vue Lazyload warning: miss src with " + value);
      return {
        src: value.src,
        loading: value.loading || this.options.loading,
        error: value.error || this.options.error,
        cors: this.options.cors
      };
    }
    return {
      src: value,
      loading: this.options.loading,
      error: this.options.error,
      cors: this.options.cors
    };
  }
}
const useCheckInView = (el, preLoad) => {
  let rect = reactive({});
  const getRect = () => {
    rect = el.value.getBoundingClientRect();
  };
  const checkInView = () => {
    getRect();
    return inBrowser && rect.top < window.innerHeight * preLoad && rect.bottom > 0 && rect.left < window.innerWidth * preLoad && rect.right > 0;
  };
  return {
    rect,
    checkInView
  };
};
var LazyComponent = (lazy) => {
  return defineComponent({
    props: {
      tag: {
        type: String,
        default: "div"
      }
    },
    emits: ["show"],
    setup(props, { emit, slots }) {
      const el = ref();
      const state = reactive({
        loaded: false,
        error: false,
        attempt: 0
      });
      const show = ref(false);
      const { rect, checkInView } = useCheckInView(el, lazy.options.preLoad);
      const load = () => {
        show.value = true;
        state.loaded = true;
        emit("show", show.value);
      };
      const vm = computed(() => {
        return {
          el: el.value,
          rect,
          checkInView,
          load,
          state
        };
      });
      onMounted(() => {
        lazy.addLazyBox(vm.value);
        lazy.lazyLoadHandler();
      });
      onUnmounted(() => {
        lazy.removeComponent(vm.value);
      });
      return () => {
        var _a2;
        return createVNode(props.tag, {
          ref: el
        }, [show.value && ((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots))]);
      };
    }
  });
};
class LazyContainerMananger {
  constructor(lazy) {
    this.lazy = lazy;
    lazy.lazyContainerMananger = this;
    this._queue = [];
  }
  bind(el, binding, vnode) {
    const container = new LazyContainer(el, binding, vnode, this.lazy);
    this._queue.push(container);
  }
  update(el, binding, vnode) {
    const container = this._queue.find((item) => item.el === el);
    if (!container)
      return;
    container.update(el, binding);
  }
  unbind(el, binding, vnode) {
    const container = this._queue.find((item) => item.el === el);
    if (!container)
      return;
    container.clear();
    remove(this._queue, container);
  }
}
const defaultOptions = {
  selector: "img",
  error: "",
  loading: ""
};
class LazyContainer {
  constructor(el, binding, vnode, lazy) {
    this.el = el;
    this.vnode = vnode;
    this.binding = binding;
    this.options = {};
    this.lazy = lazy;
    this._queue = [];
    this.update(el, binding);
  }
  update(el, binding) {
    this.el = el;
    this.options = assignDeep({}, defaultOptions, binding.value);
    const imgs = this.getImgs();
    imgs.forEach((el2) => {
      this.lazy.add(el2, assignDeep({}, this.binding, {
        value: {
          src: el2.getAttribute("data-src") || el2.dataset.src,
          error: el2.getAttribute("data-error") || el2.dataset.error || this.options.error,
          loading: el2.getAttribute("data-loading") || el2.dataset.loading || this.options.loading
        }
      }), this.vnode);
    });
  }
  getImgs() {
    return Array.from(this.el.querySelectorAll(this.options.selector));
  }
  clear() {
    const imgs = this.getImgs();
    imgs.forEach((el) => this.lazy.remove(el));
    this.vnode = null;
    this.binding = null;
    this.lazy = null;
  }
}
var LazyImage = (lazy) => {
  return defineComponent({
    setup(props, { slots }) {
      const el = ref();
      const options = reactive({
        src: "",
        error: "",
        loading: "",
        attempt: lazy.options.attempt
      });
      const state = reactive({
        loaded: false,
        error: false,
        attempt: 0
      });
      const { rect, checkInView } = useCheckInView(el, lazy.options.preLoad);
      const renderSrc = ref("");
      const load = (onFinish = noop) => {
        if (state.attempt > options.attempt - 1 && state.error) {
          if (!lazy.options.silent)
            console.log(`VueLazyload log: ${options.src} tried too more than ${options.attempt} times`);
          return onFinish();
        }
        const src = options.src;
        loadImageAsync({ src }, ({ src: src2 }) => {
          renderSrc.value = src2;
          state.loaded = true;
        }, () => {
          state.attempt++;
          renderSrc.value = options.error;
          state.error = true;
        });
      };
      const vm = computed(() => {
        return {
          el: el.value,
          rect,
          checkInView,
          load,
          state
        };
      });
      onMounted(() => {
        lazy.addLazyBox(vm.value);
        lazy.lazyLoadHandler();
      });
      onUnmounted(() => {
        lazy.removeComponent(vm.value);
      });
      const init = () => {
        const { src, loading, error } = lazy._valueFormatter(props.src);
        state.loaded = false;
        options.src = src;
        options.error = error;
        options.loading = loading;
        renderSrc.value = options.loading;
      };
      watch(() => props.src, () => {
        init();
        lazy.addLazyBox(vm.value);
        lazy.lazyLoadHandler();
      }, {
        immediate: true
      });
      return () => {
        var _a2;
        return createVNode(props.tag || "img", {
          src: renderSrc.value,
          ref: el
        }, [(_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]);
      };
    }
  });
};
var index = {
  /*
  * install function
  * @param  {Vue} Vue
  * @param  {object} options lazyload options
  */
  install(Vue, options = {}) {
    const lazy = new Lazy(options);
    const lazyContainer = new LazyContainerMananger(lazy);
    const vueVersion = Number(Vue.version.split(".")[0]);
    if (vueVersion < 3)
      return new Error("Vue version at least 3.0");
    Vue.config.globalProperties.$Lazyload = lazy;
    Vue.provide("Lazyload", lazy);
    if (options.lazyComponent) {
      Vue.component("lazy-component", LazyComponent(lazy));
    }
    if (options.lazyImage) {
      Vue.component("lazy-image", LazyImage(lazy));
    }
    Vue.directive("lazy", {
      beforeMount: lazy.add.bind(lazy),
      beforeUpdate: lazy.update.bind(lazy),
      updated: lazy.lazyLoadHandler.bind(lazy),
      unmounted: lazy.remove.bind(lazy)
    });
    Vue.directive("lazy-container", {
      beforeMount: lazyContainer.bind.bind(lazyContainer),
      updated: lazyContainer.update.bind(lazyContainer),
      unmounted: lazyContainer.unbind.bind(lazyContainer)
    });
  }
};
const Lazyload = index;
const linkSfc = "";
const __vue_sfc__$k = defineComponent({
  name: createNamespace("Link")[0],
  emits: ["click"],
  props: {
    name: String,
    path: String,
    /**
     * 当 name=web 时，query中应该有 url 参数
     */
    query: Object,
    redirect: Boolean,
    /**
     * （外）跳小程序的一些参数
     * { path: string; appId?: string; originId?: string }
     */
    mp: Object,
    /**
     * H5 在特定环境是否使用拉起小程序的标签，比如微信的 wx-open-launch-weapp
     */
    mpTag: {
      type: Boolean,
      default: true
    },
    schemeUrl: String,
    extras: [Object, String],
    // 以下是一些样式属性
    customStyle: [String, Object],
    /**
     * 是否撑满父盒子（position:absolute），此时可以作为遮罩mask使用
     */
    full: Boolean,
    /**
     * 当full为true时的z-index
     */
    zIndex: {
      type: [String, Number],
      default: 1
    },
    /**
     * 是否块级元素
     */
    block: Boolean,
    flex: Boolean,
    direction: {
      type: String,
      default: "row",
      validator: (value) => ["row", "column"].includes(value)
    },
    align: {
      type: String,
      default: "center",
      validator: (value) => ["flex-start", "center", "flex-end"].includes(value)
    },
    justify: {
      type: String,
      validator: (value) => [
        "flex-start",
        "center",
        "flex-end",
        "space-between",
        "space-evenly",
        "space-around"
      ].includes(value)
    }
  },
  setup(props, context) {
    const { isWeixin: isWeixin2 } = getSystemInfo();
    const theStyle = computed(() => {
      const { customStyle, zIndex, full, align, justify, flex } = props;
      const obj = {};
      if (full)
        obj["z-index"] = zIndex;
      if (flex) {
        align && (obj["align-items"] = align);
        justify && (obj["justify-content"] = justify);
      }
      return transformStyleSize(customStyle) + transformStyleSize(obj);
    });
    const showWxMpLaunchTag = computed(() => {
      var _a2;
      return isWeixin2 && !isMpWeixinWeb() && props.mpTag && ((_a2 = props.mp) == null ? void 0 : _a2.originId);
    });
    const webUrl = computed(() => {
      const { name, query, path } = props;
      if (showWxMpLaunchTag.value)
        return "";
      if (name === "web" && isInnerRoute(query.url) || isInnerRoute(path))
        return query.url || path;
      return "";
    });
    const onClick2 = (e) => {
      context.emit("click", e);
      if (webUrl.value) {
        const { redirect } = props;
        redirect ? location.replace(webUrl.value) : location.href = webUrl.value;
      }
    };
    const onLaunchMpError = (e) => {
      console.log("小程序标签拉起失败：", e);
      onClick2(e);
      alert("打开失败：" + JSON.stringify(e.detail));
    };
    return { theStyle, showWxMpLaunchTag, onClick: onClick2, onLaunchMpError };
  }
});
const _hoisted_1$f = /* @__PURE__ */ createElementVNode(
  "div",
  { class: "launch-mp-btn" },
  ".",
  -1
  /* HOISTED */
);
function __vue_render__$k(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "a",
    {
      style: normalizeStyle(_ctx.theStyle),
      class: normalizeClass(["fan-link", [
        { "fan-link--full": _ctx.full },
        { "fan-link--block": _ctx.block },
        { "fan-link--f": _ctx.flex },
        { "fan-link--fcol": _ctx.flex && _ctx.direction === "column" }
      ]]),
      href: "javascript:void(0);",
      onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.onClick && _ctx.onClick(...args), ["stop"]))
    },
    [
      renderSlot(_ctx.$slots, "default"),
      createCommentVNode(" launch-mp-btn 高度100%貌似不生效，不知道是因为不支持还是 wx-open-launch-weapp 没高度 "),
      _ctx.showWxMpLaunchTag ? (openBlock(), createBlock(resolveDynamicComponent("wx-open-launch-weapp"), {
        key: 0,
        username: _ctx.mp.originId,
        path: _ctx.mp.path,
        class: "fan-launch-mp-mask",
        onError: _ctx.onLaunchMpError,
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("click", $event), ["stop"]))
      }, {
        default: withCtx(() => [
          (openBlock(), createBlock(resolveDynamicComponent("script"), { type: "text/wxtag-template" }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent("style"), null, {
                default: withCtx(() => [
                  createTextVNode(" .launch-mp-btn { width: 100%;position: absolute;top: 0;bottom: 0;left: 0;right: 0 } ")
                ]),
                _: 1
                /* STABLE */
              })),
              _hoisted_1$f
            ]),
            _: 1
            /* STABLE */
          }))
        ]),
        _: 1
        /* STABLE */
      }, 40, ["username", "path", "onError"])) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__$k.render = __vue_render__$k;
var stdin_default$l = __vue_sfc__$k;
const Link = stdin_default$l;
const listSfc = "";
const __vue_sfc__$j = defineComponent({
  name: createNamespace("List")[0],
  components: { Loading: stdin_default$M },
  props: {
    /**
     * 是否处于隐藏状态，此时不触发触底
     */
    hidden: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: "loading",
      validator: (value) => {
        return ["loading", "hasMore", "noMore", "error"].includes(value);
      }
    },
    loadingColor: String,
    loadingSize: {
      type: [Number, String],
      default: 22
    },
    loadingText: {
      type: String,
      default: ""
    },
    textColor: {
      type: String,
      default: "#999"
    },
    noMoreText: {
      type: String,
      default: "没有更多了"
    },
    errorText: {
      type: String,
      default: "加载失败"
    }
  },
  emits: ["load", "errorClick"],
  setup(props, context) {
    const text = computed(() => {
      const { loadingText, noMoreText, errorText, status } = props;
      if (status === "noMore")
        return noMoreText;
      if (status === "error")
        return errorText;
      return loadingText;
    });
    const textSize = computed(() => {
      return `calc(${transformSize(props.loadingSize)} * 0.64)`;
    });
    const showLoading = computed(() => {
      return props.status === "loading" || props.status === "hasMore";
    });
    const { onPageReachBottom } = usePageLifecycle();
    onPageReachBottom(() => {
      !props.hidden && context.emit("load");
    });
    const onErrorClick = () => {
      if (props.status !== "error")
        return;
      context.emit("errorClick");
    };
    return { text, textSize, showLoading, onErrorClick };
  }
});
const _hoisted_1$e = { class: "fan-list" };
const _hoisted_2$7 = { class: "fan-list__loadt" };
function __vue_render__$j(_ctx, _cache) {
  const _component_Loading = resolveComponent("Loading");
  return openBlock(), createElementBlock("div", _hoisted_1$e, [
    renderSlot(_ctx.$slots, "default"),
    _ctx.showLoading || _ctx.text ? (openBlock(), createElementBlock(
      "div",
      {
        key: 0,
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onErrorClick && _ctx.onErrorClick(...args)),
        class: "fan-flex fan-align-center fan-justify-center fan-list__load",
        style: normalizeStyle({ fontSize: _ctx.textSize, color: _ctx.textColor })
      },
      [
        _ctx.showLoading ? (openBlock(), createBlock(_component_Loading, {
          key: 0,
          size: _ctx.loadingSize,
          color: _ctx.loadingColor
        }, null, 8, ["size", "color"])) : createCommentVNode("v-if", true),
        createElementVNode(
          "span",
          _hoisted_2$7,
          toDisplayString(_ctx.text),
          1
          /* TEXT */
        )
      ],
      4
      /* STYLE */
    )) : createCommentVNode("v-if", true)
  ]);
}
__vue_sfc__$j.render = __vue_render__$j;
var stdin_default$k = __vue_sfc__$j;
const List = stdin_default$k;
const Loading = stdin_default$M;
const loadingViewSfc = "";
const __vue_sfc__$i = defineComponent({
  name: createNamespace("LoadingView")[0],
  components: {
    FanLoading: stdin_default$M,
    FanIcon: stdin_default$N,
    FanButton: stdin_default$K
  },
  emits: ["buttonClick"],
  props: {
    loading: Boolean,
    // string: message | object: { message, title, button }
    error: [String, Object],
    color: String,
    type: {
      type: String,
      default: "circle2"
    },
    // 用绝对定位撑满父盒子
    full: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const showLoading = ref(false);
    const errorInfo = computed(() => {
      const { error } = props;
      if (!error)
        return null;
      if (typeof error === "string")
        return { message: error };
      return error;
    });
    watch(
      () => props.loading,
      (val) => {
        if (!val) {
          showLoading.value = false;
          return;
        }
        setTimeout(() => {
          if (props.loading)
            showLoading.value = true;
        }, 300);
      },
      { immediate: true }
    );
    const onClick2 = (e) => {
      context.emit("buttonClick", e);
    };
    return { showLoading, errorInfo, onClick: onClick2 };
  }
});
const _hoisted_1$d = { key: 0 };
const _hoisted_2$6 = {
  key: 0,
  class: "fan-loading-view__t"
};
const _hoisted_3$3 = { key: 1 };
function __vue_render__$i(_ctx, _cache) {
  const _component_FanLoading = resolveComponent("FanLoading");
  const _component_FanIcon = resolveComponent("FanIcon");
  const _component_FanButton = resolveComponent("FanButton");
  return _ctx.loading ? (openBlock(), createElementBlock(
    "div",
    {
      key: 0,
      class: normalizeClass(["fan-loading-view", { "fan-loading-view--full": _ctx.full }])
    },
    [
      !_ctx.errorInfo ? (openBlock(), createElementBlock("div", _hoisted_1$d, [
        _ctx.showLoading ? (openBlock(), createBlock(_component_FanLoading, {
          key: 0,
          color: _ctx.color,
          type: _ctx.type
        }, null, 8, ["color", "type"])) : createCommentVNode("v-if", true)
      ])) : (openBlock(), createElementBlock(
        Fragment,
        { key: 1 },
        [
          createVNode(_component_FanIcon, {
            name: "warning-circle-fill",
            size: 34,
            color: "var(--fan-danger-color)"
          }),
          _ctx.errorInfo.message ? (openBlock(), createElementBlock(
            "div",
            _hoisted_2$6,
            toDisplayString(_ctx.errorInfo.message),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true),
          _ctx.errorInfo.button ? (openBlock(), createBlock(_component_FanButton, {
            key: 1,
            round: "",
            bold: "",
            "custom-style": "min-width: 100px;",
            onClick: _ctx.onClick
          }, {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString(_ctx.errorInfo.button),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onClick"])) : createCommentVNode("v-if", true)
        ],
        64
        /* STABLE_FRAGMENT */
      ))
    ],
    2
    /* CLASS */
  )) : (openBlock(), createElementBlock("div", _hoisted_3$3, [
    renderSlot(_ctx.$slots, "default")
  ]));
}
__vue_sfc__$i.render = __vue_render__$i;
var stdin_default$j = __vue_sfc__$i;
const LoadingView = stdin_default$j;
/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
const routeLocationKey = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function useRoute() {
  return inject(routeLocationKey);
}
var __defProp$1 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
var __async$4 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const __vue_sfc__$h = defineComponent({
  name: createNamespace("LocationPicker")[0],
  emits: ["confirm"],
  props: {
    width: {
      type: [String, Number],
      default: "100%"
    },
    height: {
      type: [String, Number],
      default: "100vh"
    },
    lat: [String, Number],
    lng: [String, Number],
    // 选择位置是否影响当前使用城市位置——hooks.useLocation
    effectServiceLocation: {
      type: [Boolean, String],
      default: true
    },
    type: {
      type: String,
      default: "Default",
      validator: (value) => ["", "Default", "Meituan", "Dianping"].includes(value)
    }
  },
  setup(props, context) {
    const theStyle = computed(() => {
      const { width, height } = props;
      const s = `width:${transformSize(width)};height:${transformSize(
        height
      )};`;
      return s;
    });
    const { query } = useRoute();
    const mapUri = computed(() => {
      let a = "https://apis.map.qq.com/tools/locpicker?search=1&type=1&policy=1&key=H3SBZ-XNQ3O-HAKWZ-SFQSE-TGOE2-RGB6F&referer=saas";
      const { lat, lng } = props.lat && props.lng ? props : query.value || {};
      if (lat && lng) {
        return a += `&coord=${lat},${lng}`;
      }
      return a;
    });
    const effectService = computed(() => {
      var _a2;
      return typeof ((_a2 = query.value) == null ? void 0 : _a2.effectServiceLocation) !== "undefined" ? query.value.effectServiceLocation === "true" : props.effectServiceLocation;
    });
    const getCityNameFromAddress = (address) => {
      const reg = /([^省市]+)市/;
      const matched = address.match(reg);
      return matched && matched[0] || "";
    };
    const handleLocation = (data, effectServiceLocation, type) => __async$4(this, null, function* () {
      const {
        cityData,
        userLocation,
        setServiceLocation,
        setSelectingLocation,
        getCityDataWithLocation
      } = useLocation({
        type: type || "Default"
      });
      if (effectServiceLocation && !cityData.value) {
        try {
          yield getCityDataWithLocation();
        } catch (_2) {
        }
      }
      const { lat, lng, cityName, address, name } = data;
      if (name === "我的位置" && userLocation.value) {
        effectServiceLocation && setServiceLocation(userLocation.value);
        setSelectingLocation(userLocation.value);
        return userLocation.value;
      }
      const theLoc = {
        city: {
          name: cityName || getCityNameFromAddress(address)
        },
        lat,
        lng,
        address,
        addressName: name,
        accuracy: 1
      };
      if (theLoc.city.name && effectServiceLocation && cityData.value) {
        const cname = theLoc.city.name.substring(
          0,
          theLoc.city.name.length - 1
        );
        for (let k in cityData.value.all) {
          const section = cityData.value.all[k];
          for (let i = section.length - 1; i >= 0; i--) {
            if (section[i].name.includes(cname)) {
              theLoc.city = section[i];
              setServiceLocation(theLoc);
              break;
            }
          }
        }
      }
      setSelectingLocation(theLoc);
      return theLoc;
    });
    const messageListener = (event) => __async$4(this, null, function* () {
      const loc = event.data;
      if (window.location.search.includes("debug=1")) {
        console.log(999999, event);
        alert(JSON.stringify(event.data));
      }
      if (loc && loc.module == "locationPicker") {
        const { cityname, latlng, poiaddress, poiname } = loc;
        const ret = yield handleLocation(
          __spreadProps$1(__spreadValues$1({}, latlng), { cityName: cityname, address: poiaddress, name: poiname }),
          effectService.value,
          props.type
        );
        context.emit("confirm", ret);
      }
    });
    onMounted(() => {
      window.addEventListener("message", messageListener, false);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("message", messageListener, false);
    });
    return { theStyle, mapUri };
  }
});
const _hoisted_1$c = ["src"];
function __vue_render__$h(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      style: normalizeStyle(_ctx.theStyle)
    },
    [
      createElementVNode("iframe", {
        width: "100%",
        height: "100%",
        frameborder: "0",
        src: _ctx.mapUri
      }, null, 8, _hoisted_1$c)
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__$h.render = __vue_render__$h;
var stdin_default$i = __vue_sfc__$h;
const LocationPicker = stdin_default$i;
const navBarSfc = "";
const __vue_sfc__$g = defineComponent({
  name: createNamespace("NavBar")[0],
  components: { FanIcon: stdin_default$N },
  props: {
    /**
     * 导航栏背景，默认主题色-导航背景色
     */
    bg: String,
    /**
     * 导航文字颜色，默认主题色-前景色
     */
    fgColor: String,
    /**
     * 是否展示返回图标按钮
     */
    back: {
      type: Boolean,
      default: true
    },
    /**
     * 点击返回图标按钮时是否自动触发返回导航
     */
    autoBack: {
      type: Boolean,
      default: true
    },
    backIcon: {
      type: String,
      default: "left"
    },
    /**
     * 是否展示状态栏高度，状态栏相关设置仅对非H5生效
     */
    statusBar: {
      type: Boolean,
      default: true
    },
    statusBarColor: String,
    /**
     * 是否展示标题栏
     */
    titleBar: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    /**
     * 标题字体大小，默认16PX
     */
    fontSize: [String, Number],
    /**
     * 标题栏高度，默认 utils.getSystemInfo()——navBarHeight-statusBarHeight + 'PX'
     */
    height: [String, Number],
    /**
     * 是否固定在顶部
     */
    fixed: {
      type: Boolean,
      default: true
    },
    /**
     * 固定在顶部时是否开启占位
     */
    placeholder: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 90
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  emits: ["back"],
  setup(props, context) {
    const { navBarHeight, statusBarHeight } = getSystemInfo();
    const wrapperStyle = computed(() => {
      const { fgColor, height } = props;
      const titleHeight = !height ? navBarHeight - statusBarHeight + "px" : transformSize(height);
      let s = `--fan-title-bar-height:${titleHeight};--fan-status-bar-height:${statusBarHeight}px;`;
      if (fgColor)
        s += `--fan-nav-bar-fg-color:${fgColor};`;
      return s;
    });
    const theStyle = computed(() => {
      const { bg, zIndex, fontSize } = props;
      let s = `z-index:${zIndex};`;
      if (fontSize)
        s += `font-size:${transformSize(fontSize)};`;
      if (bg)
        s += `background:${bg};`;
      return s;
    });
    const statusBarStyle = computed(() => {
      return props.statusBarColor ? `background:${props.statusBarColor};` : "";
    });
    const placeholderStyle = computed(() => {
      const { statusBar, titleBar, fixed } = props;
      if (!fixed)
        return "";
      let h2 = "0";
      if (statusBar && titleBar)
        h2 = "calc(var(--fan-status-bar-height) + var(--fan-title-bar-height))";
      else if (statusBar)
        h2 = "var(--fan-status-bar-height)";
      else if (titleBar)
        h2 = "var(--fan-title-bar-height)";
      return `height:${h2};`;
    });
    const backClick = () => context.emit("back");
    return {
      wrapperStyle,
      theStyle,
      statusBarStyle,
      placeholderStyle,
      backClick
    };
  }
});
const _hoisted_1$b = {
  key: 1,
  class: "fan-nav-title-bar"
};
const _hoisted_2$5 = { class: "fan-nav-bar__l" };
const _hoisted_3$2 = {
  key: 0,
  class: "fan-ellipsis fan-nav-bar__title"
};
const _hoisted_4$2 = { class: "fan-nav-bar__r" };
function __vue_render__$g(_ctx, _cache) {
  const _component_FanIcon = resolveComponent("FanIcon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: "fan-nav-bar-wrap",
      style: normalizeStyle(_ctx.wrapperStyle)
    },
    [
      _ctx.fixed ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          style: normalizeStyle(_ctx.placeholderStyle),
          class: "fan-nav-bar__place"
        },
        null,
        4
        /* STYLE */
      )) : createCommentVNode("v-if", true),
      createElementVNode(
        "div",
        {
          style: normalizeStyle(_ctx.theStyle),
          class: normalizeClass(["fan-nav-bar", { "fan-nav-bar--fixed": _ctx.fixed, "fan-hairline--bottom": _ctx.border }])
        },
        [
          _ctx.statusBar ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              style: normalizeStyle(_ctx.statusBarStyle),
              class: "fan-nav-status-bar"
            },
            null,
            4
            /* STYLE */
          )) : createCommentVNode("v-if", true),
          _ctx.titleBar ? (openBlock(), createElementBlock("div", _hoisted_1$b, [
            createElementVNode("div", _hoisted_2$5, [
              _ctx.back ? (openBlock(), createBlock(_component_FanIcon, {
                key: 0,
                name: _ctx.backIcon,
                size: 18,
                style: { "padding": "8px 16px" },
                onClick: _ctx.backClick
              }, null, 8, ["name", "onClick"])) : createCommentVNode("v-if", true)
            ]),
            _ctx.title ? (openBlock(), createElementBlock(
              "div",
              _hoisted_3$2,
              toDisplayString(_ctx.title),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default"),
            createElementVNode("div", _hoisted_4$2, [
              renderSlot(_ctx.$slots, "right")
            ])
          ])) : createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      )
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__$g.render = __vue_render__$g;
var stdin_default$h = __vue_sfc__$g;
const NavBar = stdin_default$h;
const noticeBarSfc = "";
var __async$3 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const __vue_sfc__$f = defineComponent({
  name: createNamespace("NoticeBar")[0],
  components: { FanIcon: stdin_default$N },
  props: {
    text: String,
    speed: {
      type: [Number, String],
      default: 9
    },
    icon: String,
    iconSize: {
      type: [String, Number],
      default: 14
    },
    iconColor: {
      type: String
    },
    textSize: {
      type: [Number, String],
      default: 14
    },
    color: {
      type: String,
      default: "#f60"
    },
    bg: {
      type: String,
      default: "#fff7cc"
    },
    scrollable: {
      type: [Boolean, Number],
      default: 0
    },
    multiline: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const txtWidth = ref(0);
    const boxWidth = ref(0);
    const style2 = ref("");
    const theStyle = computed({
      set: (val) => {
        if (val)
          style2.value = transformStyleSize(val);
      },
      get: () => {
        const { color, bg, textSize } = props;
        let s = `color:${color};background:${bg};`;
        s += `font-size:${transformSize(textSize)};`;
        return s + style2.value;
      }
    });
    const textBoxStyle = computed(() => {
      const { multiline, scrollable } = props;
      let { speed } = props;
      let s = `white-space:${!multiline ? "nowrap" : "normal"};`;
      if (scrollable === false && !multiline) {
        return s += `width:100%;overflow:hidden;text-overflow:ellipsis;`;
      }
      if (multiline)
        return s;
      if (typeof speed === "string" && speed.includes("s")) {
        speed = speed.substring(0, speed.length - 1);
      }
      if ((scrollable || boxWidth.value <= txtWidth.value) && speed) {
        return s += `animation: wordsLoop ${speed}s linear infinite`;
      }
    });
    const theIconColor = computed(() => {
      const { icon, iconColor, color } = props;
      if (iconColor || !icon)
        return iconColor;
      return icon.includes("/") ? iconColor : color;
    });
    const _this = getCurrentInstance();
    const getWidth = () => __async$3(this, null, function* () {
      const rect = yield getElementBounding({
        selector: ".fan-notice-bar__r",
        scope: _this
      });
      const rect1 = yield getElementBounding({
        selector: ".fan-notice-bar__text",
        scope: _this
      });
      boxWidth.value = rect.width;
      txtWidth.value = rect1.width;
      theStyle.value = `--notice-bar-var:${rect.width}px;`;
    });
    onMounted(() => getWidth());
    return { theStyle, textBoxStyle, theIconColor };
  }
});
const _hoisted_1$a = {
  key: 0,
  class: "fan-notice-bar__l"
};
const _hoisted_2$4 = { class: "fan-flex-1 fan-notice-bar__r" };
function __vue_render__$f(_ctx, _cache) {
  const _component_FanIcon = resolveComponent("FanIcon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: "fan-flex fan-align-start fan-notice-bar",
      style: normalizeStyle(_ctx.theStyle)
    },
    [
      _ctx.icon ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
        createVNode(_component_FanIcon, {
          name: _ctx.icon,
          color: _ctx.theIconColor,
          size: _ctx.iconSize,
          "custom-style": "vertical-align:middle;"
        }, null, 8, ["name", "color", "size"])
      ])) : createCommentVNode("v-if", true),
      createElementVNode("div", _hoisted_2$4, [
        createElementVNode(
          "div",
          {
            class: "fan-notice-bar__text",
            style: normalizeStyle(_ctx.textBoxStyle)
          },
          toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )
      ])
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__$f.render = __vue_render__$f;
var stdin_default$g = __vue_sfc__$f;
const NoticeBar = stdin_default$g;
const Overlay = stdin_default$G;
const Picker = stdin_default$D;
const Popup = stdin_default$F;
const positionedViewSfc = "";
var __async$2 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const __vue_sfc__$e = defineComponent({
  name: createNamespace("PositionedView")[0],
  props: {
    /**
     * 文档定位方式，同 css 的 position
     */
    type: {
      type: String,
      default: "fixed",
      validator(value) {
        return ["fixed", "absolute", "relative", "static"].includes(value);
      }
    },
    /**
     * 位置的快捷选项，仅在top、bottom、left、right未设置时生效
     */
    position: {
      type: String,
      validator: (value) => ["bottom", "top"].includes(value)
    },
    zIndex: {
      type: [Number, String],
      default: 99
    },
    top: [String, Number],
    bottom: [String, Number],
    left: [String, Number],
    right: [String, Number],
    bg: String,
    // 底部安全区域
    safeBottom: {
      type: Boolean,
      default: void 0
    },
    /**
     * 是否在文档流中标签位置生成一个等高的占位元素
     */
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  expose: ["calcHeight", "height"],
  setup(props) {
    const uniqueId = createUniqueId({ prefix: "fanPositionedView" });
    const height = ref(0);
    const theStyle = computed(() => {
      const { type, left, right, top, bottom, zIndex, position, bg } = props;
      let s = `position:${type};z-index:${zIndex};`;
      if (!left && !right && !top && !bottom) {
        if (position === "bottom")
          s += `bottom:0;left:0;right:0;`;
        if (position === "top")
          s += `top:0;left:0;right:0;`;
      } else {
        left && (s += `left:${transformSize(left)};`);
        right && (s += `right:${transformSize(right)};`);
        top && (s += `top:${transformSize(top)};`);
        bottom && (s += `bottom:${transformSize(bottom)};`);
      }
      bg && (s += `background:${bg};`);
      return s;
    });
    const useSafeBottom = computed(() => {
      const { position, safeBottom } = props;
      if (safeBottom === false)
        return false;
      return safeBottom || position === "bottom";
    });
    const _this = getCurrentInstance();
    const calcHeight = () => __async$2(this, null, function* () {
      if (!props.placeholder) {
        height.value = 0;
        return;
      }
      const rect = yield getElementBounding({
        selector: "#" + uniqueId,
        scope: _this
      });
      height.value = (rect == null ? void 0 : rect.height) || 0;
    });
    onMounted(() => {
      setTimeout(calcHeight, 0);
    });
    watch(() => props.placeholder, calcHeight);
    return { uniqueId, height, theStyle, useSafeBottom, calcHeight };
  }
});
const _hoisted_1$9 = { class: "fan-positioned-view" };
const _hoisted_2$3 = ["id"];
function __vue_render__$e(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$9, [
    createElementVNode("div", {
      id: _ctx.uniqueId,
      class: normalizeClass(["fan-positioned-view__in", { "fan-positioned-view--safe": _ctx.useSafeBottom }]),
      style: normalizeStyle(_ctx.theStyle)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 14, _hoisted_2$3),
    _ctx.height ? (openBlock(), createElementBlock(
      "div",
      {
        key: 0,
        class: "fan-positioned-view__place",
        style: normalizeStyle({ height: _ctx.height + "px" })
      },
      null,
      4
      /* STYLE */
    )) : createCommentVNode("v-if", true)
  ]);
}
__vue_sfc__$e.render = __vue_render__$e;
var stdin_default$f = __vue_sfc__$e;
const PositionedView = stdin_default$f;
const priceSfc = "";
const __vue_sfc__$d = defineComponent({
  name: createNamespace("Price")[0],
  props: {
    value: [String, Number],
    // 价格 整数、小数 分开显示大小
    split: {
      type: Boolean,
      default: false
    },
    bold: [Boolean, Number, String],
    color: {
      type: String
      // default: '#FE3F19'
    },
    size: {
      type: [String, Number]
    },
    symbol: {
      type: [String, Boolean],
      default: "¥"
    },
    symbolPosition: {
      type: String,
      default: "left",
      validator: (value) => ["left", "right"].includes(value)
    },
    symbolStyle: [String, Object],
    // 较小项（符号symbol、split的小数位）的大小
    subSize: {
      type: [String, Number]
      // default: '0.67em'
    },
    // 符号与数字间距
    space: {
      type: [String, Number],
      default: "1px"
    },
    font: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const theStyle = computed(() => {
      const { color, size, bold } = props;
      let s = "";
      if (color)
        s += `color:${color};`;
      if (size)
        s += `font-size:${transformSize(size)};`;
      if (typeof bold === "number" || typeof bold === "string" && Number(bold) >= 100)
        s += `font-weight:${bold};`;
      return s;
    });
    const subFontSize = computed(() => transformSize(props.subSize));
    const theSymbolStyle = computed(() => {
      const { symbolStyle, symbolPosition, space } = props;
      const pad = transformSize(space);
      let s = symbolPosition === "right" ? `padding-left:${pad};` : `padding-right:${pad};`;
      if (subFontSize.value)
        s += `font-size:${subFontSize.value};`;
      return transformStyleSize(symbolStyle) + s;
    });
    const priceChars = computed(() => {
      let arr = ["", ""];
      const value = String(
        typeof props.value === "undefined" ? "" : props.value
      );
      if (props.split && value.includes(".")) {
        arr = value.split(".");
        arr[1] = `.${arr[1]}`;
      } else {
        arr[0] = value;
      }
      return arr;
    });
    return { theStyle, subFontSize, theSymbolStyle, priceChars };
  }
});
const _hoisted_1$8 = { class: "fan-price__val" };
function __vue_render__$d(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      style: normalizeStyle(_ctx.theStyle),
      class: normalizeClass(["fan-price", { "fan-price--bold": _ctx.bold, "fan-price--font": _ctx.font }])
    },
    [
      createCommentVNode(" 注意消除元素间间距 "),
      _ctx.symbol && _ctx.symbolPosition === "left" ? (openBlock(), createElementBlock(
        "span",
        {
          key: 0,
          class: "fan-price--s",
          style: normalizeStyle(_ctx.theSymbolStyle)
        },
        toDisplayString(_ctx.symbol),
        5
        /* TEXT, STYLE */
      )) : createCommentVNode("v-if", true),
      createElementVNode(
        "span",
        _hoisted_1$8,
        toDisplayString(_ctx.priceChars[0]),
        1
        /* TEXT */
      ),
      _ctx.priceChars[1] ? (openBlock(), createElementBlock(
        "span",
        {
          key: 1,
          class: "fan-price--s",
          style: normalizeStyle({ fontSize: _ctx.subFontSize })
        },
        toDisplayString(_ctx.priceChars[1]),
        5
        /* TEXT, STYLE */
      )) : createCommentVNode("v-if", true),
      _ctx.symbol && _ctx.symbolPosition === "right" ? (openBlock(), createElementBlock(
        "span",
        {
          key: 2,
          class: "fan-price--s",
          style: normalizeStyle(_ctx.theSymbolStyle)
        },
        toDisplayString(_ctx.symbol),
        5
        /* TEXT, STYLE */
      )) : createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__$d.render = __vue_render__$d;
var stdin_default$e = __vue_sfc__$d;
const Price = stdin_default$e;
const rateSfc = "";
const __vue_sfc__$c = defineComponent({
  name: createNamespace("Rate")[0],
  components: { FanIcon: stdin_default$N },
  props: {
    // 当前评分
    modelValue: {
      type: [Number, String],
      default: 1
    },
    // 图标名称
    icon: {
      type: String,
      default: "star-fill"
    },
    // 星星未选中的颜色
    color: {
      type: String,
      default: "#ececec"
    },
    // 星星选中状态颜色
    activeColor: {
      type: String,
      default: "#ffca3e"
    },
    // 星星禁用状态颜色
    disabledColor: {
      type: String,
      default: "#c0c0c0"
    },
    // 星星的大小
    size: {
      type: [Number, String],
      default: 24
    },
    // 图标总数
    count: {
      type: [Number, String],
      default: 5
    },
    // 星星的间距
    space: [String, Number],
    // 是否可点击
    disabled: {
      type: [Boolean, String],
      default: false
    },
    // 是否只读
    readonly: {
      type: [Boolean, String],
      default: true
    },
    // 是否显示半星
    allowHalf: {
      type: [Boolean, String],
      default: false
    },
    // todo: 是否支持滑动手势
    touchable: {
      type: [Boolean, String],
      default: false
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, context) {
    const theStyle = computed(() => {
      const { space } = props;
      const s = space ? `--fan-rate-space:${transformSize(space)};` : "";
      return s;
    });
    const value = ref(0);
    watch(
      () => props.modelValue,
      (val) => {
        const n = Number(val) || 0;
        if (value.value === n)
          return;
        value.value = n;
      },
      { immediate: true }
    );
    watch(value, (val) => {
      if (val === props.modelValue)
        return;
      context.emit("update:modelValue", val);
      context.emit("change", val);
    });
    const stars = computed(() => {
      const val = value.value;
      const list = [];
      const floorValue = Math.floor(val);
      const ceilValue = Math.ceil(val);
      for (let i = 0; i < props.count; i++) {
        let activeWidth = "0";
        if (floorValue > i) {
          activeWidth = "100%";
        } else if (ceilValue - 1 === i) {
          activeWidth = (val - floorValue) * 100 + "%";
        }
        list.push({ activeWidth });
      }
      return list;
    });
    return { theStyle, stars };
  }
});
function __vue_render__$c(_ctx, _cache) {
  const _component_FanIcon = resolveComponent("FanIcon");
  return openBlock(), createElementBlock(
    "div",
    {
      style: normalizeStyle(_ctx.theStyle),
      class: "fan-rate"
    },
    [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.stars, (star, index2) => {
          return openBlock(), createElementBlock("div", {
            key: index2,
            class: "fan-rate__icon"
          }, [
            createVNode(_component_FanIcon, {
              color: _ctx.color,
              size: _ctx.size,
              name: _ctx.icon
            }, null, 8, ["color", "size", "name"]),
            createElementVNode(
              "div",
              {
                style: normalizeStyle({ width: star.activeWidth }),
                class: "fan-rate__icon-on"
              },
              [
                createVNode(_component_FanIcon, {
                  color: _ctx.disabled ? _ctx.disabledColor : _ctx.activeColor,
                  size: _ctx.size,
                  name: _ctx.icon
                }, null, 8, ["color", "size", "name"])
              ],
              4
              /* STYLE */
            )
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__$c.render = __vue_render__$c;
var stdin_default$d = __vue_sfc__$c;
const Rate = stdin_default$d;
const richTextSfc = "";
const __vue_sfc__$b = defineComponent({
  name: createNamespace("RichText")[0],
  props: {
    // html 字符串
    content: String
  },
  setup(props) {
    const isHtml = computed(() => {
      const reg = /<[^>]+>/g;
      return reg.test(props.content || "");
    });
    return { isHtml };
  }
});
const _hoisted_1$7 = ["innerHTML"];
function __vue_render__$b(_ctx, _cache) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["fan-rich-text", { pre: !_ctx.isHtml }]),
    innerHTML: _ctx.content
  }, null, 10, _hoisted_1$7);
}
__vue_sfc__$b.render = __vue_render__$b;
var stdin_default$c = __vue_sfc__$b;
const RichText = stdin_default$c;
const ScrollView = stdin_default$s;
const searchSfc = "";
const __vue_sfc__$a = defineComponent({
  name: createNamespace("Search")[0],
  components: { FanIcon: stdin_default$N, FanButton: stdin_default$K, FanInput: stdin_default$I },
  emits: ["blur", "focus", "click", "search", "input", "update:modelValue"],
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: String,
    prefixIcon: Boolean,
    readonly: {
      type: Boolean,
      default: false
    },
    bg: String,
    radius: {
      type: String,
      default: "20px"
    },
    icon: String,
    iconStyle: [String, Object],
    innerStyle: String,
    btnStyle: [String, Object]
  },
  setup(props, { emit }) {
    const inputBoxStyle = computed(() => {
      const { bg, radius, innerStyle } = props;
      let style2 = "";
      if (bg)
        style2 += `background-color:${bg};`;
      if (radius)
        style2 += `border-radius:${transformSize(radius)};`;
      return transformStyleSize(style2) + transformStyleSize(innerStyle);
    });
    const btnBoxStyle = computed(() => transformStyleSize(props.btnStyle));
    const innerValue = ref(props.modelValue);
    watch(innerValue, (val) => {
      if (val !== props.modelValue) {
        emit("update:modelValue", innerValue.value);
        emit("input", val);
      }
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== innerValue.value)
          innerValue.value = val;
      }
    );
    const onBlur = (e) => emit("blur", e);
    const onFocus = (e) => emit("focus", e);
    const onInput = (val) => emit("input", val);
    const onConfirm = (val) => emit("search", val);
    const onClick2 = () => emit("click");
    return {
      btnBoxStyle,
      inputBoxStyle,
      innerValue,
      onBlur,
      onFocus,
      onInput,
      onClick: onClick2,
      onConfirm
    };
  }
});
const _hoisted_1$6 = { class: "fan-search" };
function __vue_render__$a(_ctx, _cache) {
  const _component_FanIcon = resolveComponent("FanIcon");
  const _component_FanInput = resolveComponent("FanInput");
  const _component_FanButton = resolveComponent("FanButton");
  return openBlock(), createElementBlock("div", _hoisted_1$6, [
    createElementVNode(
      "div",
      {
        onClick: _cache[3] || (_cache[3] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
        class: "fan-search__inner",
        style: normalizeStyle(_ctx.inputBoxStyle)
      },
      [
        _ctx.prefixIcon ? (openBlock(), createBlock(_component_FanIcon, {
          key: 0,
          name: "search",
          color: "#999",
          size: 14,
          style: { marginRight: "3px" }
        })) : createCommentVNode("v-if", true),
        createVNode(_component_FanInput, {
          modelValue: _ctx.innerValue,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.innerValue = $event),
          class: "fan-flex-1",
          style: { padding: "0 4px 0 0" },
          placeholder: _ctx.placeholder || "搜一搜",
          readonly: _ctx.readonly,
          clearable: "",
          onBlur: _ctx.onBlur,
          onFocus: _ctx.onFocus,
          onInput: _ctx.onInput,
          onConfirm: _ctx.onConfirm
        }, null, 8, ["modelValue", "placeholder", "readonly", "onBlur", "onFocus", "onInput", "onConfirm"]),
        _ctx.icon ? (openBlock(), createBlock(_component_FanIcon, {
          key: 1,
          name: _ctx.icon,
          style: normalizeStyle(_ctx.iconStyle),
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.onConfirm(_ctx.innerValue))
        }, null, 8, ["name", "style"])) : (openBlock(), createBlock(_component_FanButton, {
          key: 2,
          style: normalizeStyle(_ctx.btnBoxStyle),
          round: "",
          radius: _ctx.radius,
          width: "70px",
          height: "100%",
          onClick: _cache[2] || (_cache[2] = ($event) => _ctx.onConfirm(_ctx.innerValue))
        }, {
          default: withCtx(() => [
            createTextVNode("搜索")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["style", "radius"]))
      ],
      4
      /* STYLE */
    )
  ]);
}
__vue_sfc__$a.render = __vue_render__$a;
var stdin_default$b = __vue_sfc__$a;
const Search = stdin_default$b;
const stickySfc = "";
const __vue_sfc__$9 = defineComponent({
  name: createNamespace("Sticky")[0],
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 99
    },
    /**
     * 一个函数，返回容器对应的 NodesRef 节点，
     * 使用处可以通过 utils.getElementNodes 获取并传入
     */
    container: {
      type: Function
    },
    /**
     * 当前滚动区域的滚动位置，非 null 时会禁用页面滚动事件的监听
     */
    scrollTop: {
      type: Number,
      default: null
    }
  },
  emits: ["change"],
  setup(props, context) {
    const state = reactive({
      width: 0,
      height: 0,
      fixed: false,
      transform: 0
    });
    const uniqueId = createUniqueId({ prefix: "fanSticky" });
    const _this = getCurrentInstance();
    const { onPageScroll } = usePageLifecycle();
    const selector = "#" + uniqueId;
    const onScroll2 = () => {
      const { container, offsetTop } = props;
      if (typeof container === "function") {
        Promise.all([
          getElementBounding({ selector, scope: _this }),
          getElementBounding({ el: container() })
        ]).then(([rect, containerRect]) => {
          state.height = rect.height;
          state.width = rect.width;
          state.fixed = offsetTop > rect.top && containerRect.bottom > 0;
          const difference = containerRect.bottom - offsetTop - state.height;
          state.transform = difference < 0 ? difference : 0;
        });
        return;
      }
      getElementBounding({ selector, scope: _this }).then((rect) => {
        if (!rect)
          return;
        if (offsetTop >= rect.top) {
          state.fixed = true;
          state.height = rect.height;
          state.width = rect.width;
        } else {
          state.fixed = false;
        }
      });
    };
    onPageScroll((scrollTop) => {
      if (props.scrollTop != null)
        return;
      onScroll2();
    });
    watch(
      () => props.scrollTop,
      (val) => val !== null && onScroll2(),
      { immediate: true }
    );
    watch(
      () => state.fixed,
      (val) => {
        context.emit("change", { fixed: val });
      }
    );
    const wrapperStyle = computed(() => {
      if (!state.fixed)
        return "";
      return `width:${state.width}px;height:${state.height}px;`;
    });
    const theStyle = computed(() => {
      let s = "";
      if (state.transform)
        s += `transform:translate3d(0,${state.transform}px,0);`;
      if (!state.fixed)
        return s;
      const { offsetTop, zIndex } = props;
      s += `width:${state.width}px;height:${state.height}px;top:${offsetTop}px;z-index:${zIndex};`;
      return s;
    });
    return { uniqueId, state, wrapperStyle, theStyle };
  }
});
const _hoisted_1$5 = ["id"];
function __vue_render__$9(_ctx, _cache) {
  return openBlock(), createElementBlock("div", {
    id: _ctx.uniqueId,
    style: normalizeStyle(_ctx.wrapperStyle)
  }, [
    createElementVNode(
      "div",
      {
        style: normalizeStyle(_ctx.theStyle),
        class: normalizeClass(["fan-sticky", { "fan-sticky--fixed": _ctx.state.fixed }])
      },
      [
        renderSlot(_ctx.$slots, "default")
      ],
      6
      /* CLASS, STYLE */
    )
  ], 12, _hoisted_1$5);
}
__vue_sfc__$9.render = __vue_render__$9;
var stdin_default$a = __vue_sfc__$9;
const Sticky = stdin_default$a;
const swiperSfc = "";
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
function isObject$2(obj) {
  return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
}
function extend$2(target = {}, src = {}) {
  Object.keys(src).forEach((key) => {
    if (typeof target[key] === "undefined")
      target[key] = src[key];
    else if (isObject$2(src[key]) && isObject$2(target[key]) && Object.keys(src[key]).length > 0) {
      extend$2(target[key], src[key]);
    }
  });
}
const ssrDocument = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function getDocument() {
  const doc = typeof document !== "undefined" ? document : {};
  extend$2(doc, ssrDocument);
  return doc;
}
const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function CustomEvent2() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(callback) {
    if (typeof setTimeout === "undefined") {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame(id) {
    if (typeof setTimeout === "undefined") {
      return;
    }
    clearTimeout(id);
  }
};
function getWindow() {
  const win = typeof window !== "undefined" ? window : {};
  extend$2(win, ssrWindow);
  return win;
}
function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch (e) {
    }
    try {
      delete object[key];
    } catch (e) {
    }
  });
}
function nextTick(callback, delay = 0) {
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle$1(el) {
  const window2 = getWindow();
  let style2;
  if (window2.getComputedStyle) {
    style2 = window2.getComputedStyle(el, null);
  }
  if (!style2 && el.currentStyle) {
    style2 = el.currentStyle;
  }
  if (!style2) {
    style2 = el.style;
  }
  return style2;
}
function getTranslate(el, axis = "x") {
  const window2 = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle$1(el);
  if (window2.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(",").length > 6) {
      curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
    }
    transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
    matrix = transformMatrix.toString().split(",");
  }
  if (axis === "x") {
    if (window2.WebKitCSSMatrix)
      curTransform = transformMatrix.m41;
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[12]);
    else
      curTransform = parseFloat(matrix[4]);
  }
  if (axis === "y") {
    if (window2.WebKitCSSMatrix)
      curTransform = transformMatrix.m42;
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[13]);
    else
      curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject$1(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function isNode(node) {
  if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend$1(...args) {
  const to = Object(args[0]);
  const noExtend = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < args.length; i += 1) {
    const nextSource = args[i];
    if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== void 0 && desc.enumerable) {
          if (isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend$1(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend$1(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll({
  swiper,
  targetPosition,
  side
}) {
  const window2 = getWindow();
  const startPosition = -swiper.translate;
  let startTime = null;
  let time;
  const duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = "none";
  window2.cancelAnimationFrame(swiper.cssModeFrameID);
  const dir = targetPosition > startPosition ? "next" : "prev";
  const isOutOfBound = (current, target) => {
    return dir === "next" && current >= target || dir === "prev" && current <= target;
  };
  const animate = () => {
    time = (/* @__PURE__ */ new Date()).getTime();
    if (startTime === null) {
      startTime = time;
    }
    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo({
      [side]: currentPosition
    });
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = "hidden";
      swiper.wrapperEl.style.scrollSnapType = "";
      setTimeout(() => {
        swiper.wrapperEl.style.overflow = "";
        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      });
      window2.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
  };
  animate();
}
function elementChildren(element, selector = "") {
  return [...element.children].filter((el) => el.matches(selector));
}
function createElement(tag, classes2 = []) {
  const el = document.createElement(tag);
  el.classList.add(...Array.isArray(classes2) ? classes2 : [classes2]);
  return el;
}
function elementPrevAll(el, selector) {
  const prevEls = [];
  while (el.previousElementSibling) {
    const prev = el.previousElementSibling;
    if (selector) {
      if (prev.matches(selector))
        prevEls.push(prev);
    } else
      prevEls.push(prev);
    el = prev;
  }
  return prevEls;
}
function elementNextAll(el, selector) {
  const nextEls = [];
  while (el.nextElementSibling) {
    const next = el.nextElementSibling;
    if (selector) {
      if (next.matches(selector))
        nextEls.push(next);
    } else
      nextEls.push(next);
    el = next;
  }
  return nextEls;
}
function elementStyle(el, prop) {
  const window2 = getWindow();
  return window2.getComputedStyle(el, null).getPropertyValue(prop);
}
function elementIndex(el) {
  let child = el;
  let i;
  if (child) {
    i = 0;
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1)
        i += 1;
    }
    return i;
  }
  return void 0;
}
function elementParents(el, selector) {
  const parents = [];
  let parent = el.parentElement;
  while (parent) {
    if (selector) {
      if (parent.matches(selector))
        parents.push(parent);
    } else {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}
function elementTransitionEnd(el, callback) {
  function fireCallBack(e) {
    if (e.target !== el)
      return;
    callback.call(el, e);
    el.removeEventListener("transitionend", fireCallBack);
  }
  if (callback) {
    el.addEventListener("transitionend", fireCallBack);
  }
}
function elementOuterSize(el, size, includeMargins) {
  const window2 = getWindow();
  if (includeMargins) {
    return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
  }
  return el.offsetWidth;
}
let support;
function calcSupport() {
  const window2 = getWindow();
  const document2 = getDocument();
  return {
    smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
    touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}
let deviceCached;
function calcDevice({
  userAgent
} = {}) {
  const support2 = getSupport();
  const window2 = getWindow();
  const platform = window2.navigator.platform;
  const ua = userAgent || window2.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window2.screen.width;
  const screenHeight = window2.screen.height;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === "Win32";
  let macos = platform === "MacIntel";
  const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    if (!ipad)
      ipad = [0, 1, "13_0_0"];
    macos = false;
  }
  if (android && !windows) {
    device.os = "android";
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = "ios";
    device.ios = true;
  }
  return device;
}
function getDevice(overrides = {}) {
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}
let browser;
function calcBrowser() {
  const window2 = getWindow();
  let needPerspectiveFix = false;
  function isSafari() {
    const ua = window2.navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
  }
  if (isSafari()) {
    const ua = String(window2.navigator.userAgent);
    if (ua.includes("Version/")) {
      const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
      needPerspectiveFix = major < 16 || major === 16 && minor < 2;
    }
  }
  return {
    isSafari: needPerspectiveFix || isSafari(),
    needPerspectiveFix,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent)
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}
function Resize({
  swiper,
  on,
  emit
}) {
  const window2 = getWindow();
  let observer = null;
  let animationFrame = null;
  const resizeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    emit("beforeResize");
    emit("resize");
  };
  const createObserver = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    observer = new ResizeObserver((entries) => {
      animationFrame = window2.requestAnimationFrame(() => {
        const {
          width,
          height
        } = swiper;
        let newWidth = width;
        let newHeight = height;
        entries.forEach(({
          contentBoxSize,
          contentRect,
          target
        }) => {
          if (target && target !== swiper.el)
            return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };
  const removeObserver = () => {
    if (animationFrame) {
      window2.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };
  const orientationChangeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized)
      return;
    emit("orientationchange");
  };
  on("init", () => {
    if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
      createObserver();
      return;
    }
    window2.addEventListener("resize", resizeHandler);
    window2.addEventListener("orientationchange", orientationChangeHandler);
  });
  on("destroy", () => {
    removeObserver();
    window2.removeEventListener("resize", resizeHandler);
    window2.removeEventListener("orientationchange", orientationChangeHandler);
  });
}
function Observer({
  swiper,
  extendParams,
  on,
  emit
}) {
  const observers = [];
  const window2 = getWindow();
  const attach = (target, options = {}) => {
    const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
    const observer = new ObserverFunc((mutations) => {
      if (swiper.__preventObserver__)
        return;
      if (mutations.length === 1) {
        emit("observerUpdate", mutations[0]);
        return;
      }
      const observerUpdate = function observerUpdate2() {
        emit("observerUpdate", mutations[0]);
      };
      if (window2.requestAnimationFrame) {
        window2.requestAnimationFrame(observerUpdate);
      } else {
        window2.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === "undefined" ? true : options.attributes,
      childList: typeof options.childList === "undefined" ? true : options.childList,
      characterData: typeof options.characterData === "undefined" ? true : options.characterData
    });
    observers.push(observer);
  };
  const init = () => {
    if (!swiper.params.observer)
      return;
    if (swiper.params.observeParents) {
      const containerParents = elementParents(swiper.el);
      for (let i = 0; i < containerParents.length; i += 1) {
        attach(containerParents[i]);
      }
    }
    attach(swiper.el, {
      childList: swiper.params.observeSlideChildren
    });
    attach(swiper.wrapperEl, {
      attributes: false
    });
  };
  const destroy = () => {
    observers.forEach((observer) => {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on("init", init);
  on("destroy", destroy);
}
const eventsEmitter = {
  on(events2, handler, priority) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed)
      return self2;
    if (typeof handler !== "function")
      return self2;
    const method = priority ? "unshift" : "push";
    events2.split(" ").forEach((event) => {
      if (!self2.eventsListeners[event])
        self2.eventsListeners[event] = [];
      self2.eventsListeners[event][method](handler);
    });
    return self2;
  },
  once(events2, handler, priority) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed)
      return self2;
    if (typeof handler !== "function")
      return self2;
    function onceHandler(...args) {
      self2.off(events2, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      handler.apply(self2, args);
    }
    onceHandler.__emitterProxy = handler;
    return self2.on(events2, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed)
      return self2;
    if (typeof handler !== "function")
      return self2;
    const method = priority ? "unshift" : "push";
    if (self2.eventsAnyListeners.indexOf(handler) < 0) {
      self2.eventsAnyListeners[method](handler);
    }
    return self2;
  },
  offAny(handler) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed)
      return self2;
    if (!self2.eventsAnyListeners)
      return self2;
    const index2 = self2.eventsAnyListeners.indexOf(handler);
    if (index2 >= 0) {
      self2.eventsAnyListeners.splice(index2, 1);
    }
    return self2;
  },
  off(events2, handler) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed)
      return self2;
    if (!self2.eventsListeners)
      return self2;
    events2.split(" ").forEach((event) => {
      if (typeof handler === "undefined") {
        self2.eventsListeners[event] = [];
      } else if (self2.eventsListeners[event]) {
        self2.eventsListeners[event].forEach((eventHandler, index2) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self2.eventsListeners[event].splice(index2, 1);
          }
        });
      }
    });
    return self2;
  },
  emit(...args) {
    const self2 = this;
    if (!self2.eventsListeners || self2.destroyed)
      return self2;
    if (!self2.eventsListeners)
      return self2;
    let events2;
    let data;
    let context;
    if (typeof args[0] === "string" || Array.isArray(args[0])) {
      events2 = args[0];
      data = args.slice(1, args.length);
      context = self2;
    } else {
      events2 = args[0].events;
      data = args[0].data;
      context = args[0].context || self2;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
    eventsArray.forEach((event) => {
      if (self2.eventsAnyListeners && self2.eventsAnyListeners.length) {
        self2.eventsAnyListeners.forEach((eventHandler) => {
          eventHandler.apply(context, [event, ...data]);
        });
      }
      if (self2.eventsListeners && self2.eventsListeners[event]) {
        self2.eventsListeners[event].forEach((eventHandler) => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self2;
  }
};
function updateSize() {
  const swiper = this;
  let width;
  let height;
  const el = swiper.el;
  if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el.clientWidth;
  }
  if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }
  width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
  height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
  if (Number.isNaN(width))
    width = 0;
  if (Number.isNaN(height))
    height = 0;
  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height
  });
}
function updateSlides() {
  const swiper = this;
  function getDirectionLabel(property) {
    if (swiper.isHorizontal()) {
      return property;
    }
    return {
      "width": "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      "marginRight": "marginBottom"
    }[property];
  }
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
  }
  const params = swiper.params;
  const {
    wrapperEl,
    slidesEl,
    size: swiperSize,
    rtlTranslate: rtl,
    wrongRTL
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === "function") {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === "function") {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  const previousSnapGridLength = swiper.snapGrid.length;
  const previousSlidesGridLength = swiper.slidesGrid.length;
  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index2 = 0;
  if (typeof swiperSize === "undefined") {
    return;
  }
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
  } else if (typeof spaceBetween === "string") {
    spaceBetween = parseFloat(spaceBetween);
  }
  swiper.virtualSize = -spaceBetween;
  slides.forEach((slideEl) => {
    if (rtl) {
      slideEl.style.marginLeft = "";
    } else {
      slideEl.style.marginRight = "";
    }
    slideEl.style.marginBottom = "";
    slideEl.style.marginTop = "";
  });
  if (params.centeredSlides && params.cssMode) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
    setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
  }
  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slidesLength);
  }
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
    return typeof params.breakpoints[key].slidesPerView !== "undefined";
  }).length > 0;
  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    let slide2;
    if (slides[i])
      slide2 = slides[i];
    if (gridEnabled) {
      swiper.grid.updateSlide(i, slide2, slidesLength, getDirectionLabel);
    }
    if (slides[i] && elementStyle(slide2, "display") === "none")
      continue;
    if (params.slidesPerView === "auto") {
      if (shouldResetSlideSize) {
        slides[i].style[getDirectionLabel("width")] = ``;
      }
      const slideStyles = getComputedStyle(slide2);
      const currentTransform = slide2.style.transform;
      const currentWebKitTransform = slide2.style.webkitTransform;
      if (currentTransform) {
        slide2.style.transform = "none";
      }
      if (currentWebKitTransform) {
        slide2.style.webkitTransform = "none";
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width", true) : elementOuterSize(slide2, "height", true);
      } else {
        const width = getDirectionPropertyValue(slideStyles, "width");
        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
        const boxSizing = slideStyles.getPropertyValue("box-sizing");
        if (boxSizing && boxSizing === "border-box") {
          slideSize = width + marginLeft + marginRight;
        } else {
          const {
            clientWidth,
            offsetWidth
          } = slide2;
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide2.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide2.style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
      if (slides[i]) {
        slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
      }
    }
    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1e3)
        slidePosition = 0;
      if (params.roundLengths)
        slidePosition = Math.floor(slidePosition);
      if (index2 % params.slidesPerGroup === 0)
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths)
        slidePosition = Math.floor(slidePosition);
      if ((index2 - Math.min(swiper.params.slidesPerGroupSkip, index2)) % swiper.params.slidesPerGroup === 0)
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index2 += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
    wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (params.setWrapperSize) {
    wrapperEl.style[getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  }
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      if (params.roundLengths)
        slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (isVirtual && params.loop) {
    const size = slidesSizesGrid[0] + spaceBetween;
    if (params.slidesPerGroup > 1) {
      const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
      const groupSize = size * params.slidesPerGroup;
      for (let i = 0; i < groups; i += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
      if (params.slidesPerGroup === 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + size);
      }
      slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
      swiper.virtualSize += size;
    }
  }
  if (snapGrid.length === 0)
    snapGrid = [0];
  if (spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
    slides.filter((_2, slideIndex) => {
      if (!params.cssMode || params.loop)
        return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach((slideEl) => {
      slideEl.style[key] = `${spaceBetween}px`;
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const maxSnap = allSlidesSize - swiperSize;
    snapGrid = snapGrid.map((snap) => {
      if (snap <= 0)
        return -offsetBefore;
      if (snap > maxSnap)
        return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    if (allSlidesSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
    setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper.snapGrid[0];
    const addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
    swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit("slidesLengthChange");
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow)
      swiper.checkOverflow();
    swiper.emit("snapGridLengthChange");
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit("slidesGridLengthChange");
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded)
        swiper.el.classList.add(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
}
function updateAutoHeight(speed) {
  const swiper = this;
  const activeSlides = [];
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0;
  let i;
  if (typeof speed === "number") {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  const getSlideByIndex = (index2) => {
    if (isVirtual) {
      return swiper.slides[swiper.getSlideIndexByData(index2)];
    }
    return swiper.slides[index2];
  };
  if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || []).forEach((slide2) => {
        activeSlides.push(slide2);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        const index2 = swiper.activeIndex + i;
        if (index2 > swiper.slides.length && !isVirtual)
          break;
        activeSlides.push(getSlideByIndex(index2));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== "undefined") {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }
  if (newHeight || newHeight === 0)
    swiper.wrapperEl.style.height = `${newHeight}px`;
}
function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;
  const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
  }
}
function updateSlidesProgress(translate2 = this && this.translate || 0) {
  const swiper = this;
  const params = swiper.params;
  const {
    slides,
    rtlTranslate: rtl,
    snapGrid
  } = swiper;
  if (slides.length === 0)
    return;
  if (typeof slides[0].swiperSlideOffset === "undefined")
    swiper.updateSlidesOffset();
  let offsetCenter = -translate2;
  if (rtl)
    offsetCenter = translate2;
  slides.forEach((slideEl) => {
    slideEl.classList.remove(params.slideVisibleClass);
  });
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  let spaceBetween = params.spaceBetween;
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
  } else if (typeof spaceBetween === "string") {
    spaceBetween = parseFloat(spaceBetween);
  }
  for (let i = 0; i < slides.length; i += 1) {
    const slide2 = slides[i];
    let slideOffset = slide2.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide2);
      swiper.visibleSlidesIndexes.push(i);
      slides[i].classList.add(params.slideVisibleClass);
    }
    slide2.progress = rtl ? -slideProgress : slideProgress;
    slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}
function updateProgress(translate2) {
  const swiper = this;
  if (typeof translate2 === "undefined") {
    const multiplier = swiper.rtlTranslate ? -1 : 1;
    translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  const params = swiper.params;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd,
    progressLoop
  } = swiper;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate2 - swiper.minTranslate()) / translatesDiff;
    const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1;
    const isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
    isBeginning = isBeginningRounded || progress <= 0;
    isEnd = isEndRounded || progress >= 1;
    if (isBeginningRounded)
      progress = 0;
    if (isEndRounded)
      progress = 1;
  }
  if (params.loop) {
    const firstSlideIndex = swiper.getSlideIndexByData(0);
    const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
    const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
    const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
    const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
    const translateAbs = Math.abs(translate2);
    if (translateAbs >= firstSlideTranslate) {
      progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
    } else {
      progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
    }
    if (progressLoop > 1)
      progressLoop -= 1;
  }
  Object.assign(swiper, {
    progress,
    progressLoop,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
    swiper.updateSlidesProgress(translate2);
  if (isBeginning && !wasBeginning) {
    swiper.emit("reachBeginning toEdge");
  }
  if (isEnd && !wasEnd) {
    swiper.emit("reachEnd toEdge");
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit("fromEdge");
  }
  swiper.emit("progress", progress);
}
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    slidesEl,
    activeIndex
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const getFilteredSlide = (selector) => {
    return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
  };
  slides.forEach((slideEl) => {
    slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
  });
  let activeSlide;
  if (isVirtual) {
    if (params.loop) {
      let slideIndex = activeIndex - swiper.virtual.slidesBefore;
      if (slideIndex < 0)
        slideIndex = swiper.virtual.slides.length + slideIndex;
      if (slideIndex >= swiper.virtual.slides.length)
        slideIndex -= swiper.virtual.slides.length;
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
    } else {
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
    }
  } else {
    activeSlide = slides[activeIndex];
  }
  if (activeSlide) {
    activeSlide.classList.add(params.slideActiveClass);
    let nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
    if (params.loop && !nextSlide) {
      nextSlide = slides[0];
    }
    if (nextSlide) {
      nextSlide.classList.add(params.slideNextClass);
    }
    let prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
    if (params.loop && !prevSlide === 0) {
      prevSlide = slides[slides.length - 1];
    }
    if (prevSlide) {
      prevSlide.classList.add(params.slidePrevClass);
    }
  }
  swiper.emitSlidesClasses();
}
const processLazyPreloader = (swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params)
    return;
  const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  const slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    const lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    if (lazyEl)
      lazyEl.remove();
  }
};
const unlazy = (swiper, index2) => {
  if (!swiper.slides[index2])
    return;
  const imageEl = swiper.slides[index2].querySelector('[loading="lazy"]');
  if (imageEl)
    imageEl.removeAttribute("loading");
};
const preload = (swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params)
    return;
  let amount = swiper.params.lazyPreloadPrevNext;
  const len = swiper.slides.length;
  if (!len || !amount || amount < 0)
    return;
  amount = Math.min(amount, len);
  const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
  const activeIndex = swiper.activeIndex;
  if (swiper.params.grid && swiper.params.grid.rows > 1) {
    const activeColumn = activeIndex;
    const preloadColumns = [activeColumn - amount];
    preloadColumns.push(...Array.from({
      length: amount
    }).map((_2, i) => {
      return activeColumn + slidesPerView + i;
    }));
    swiper.slides.forEach((slideEl, i) => {
      if (preloadColumns.includes(slideEl.column))
        unlazy(swiper, i);
    });
    return;
  }
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind || swiper.params.loop) {
    for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      const realIndex = (i % len + len) % len;
      if (realIndex < activeIndex || realIndex > slideIndexLastInView)
        unlazy(swiper, realIndex);
    }
  } else {
    for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
      if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
        unlazy(swiper, i);
      }
    }
  }
};
function getActiveIndexByTranslate(swiper) {
  const {
    slidesGrid,
    params
  } = swiper;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  let activeIndex;
  for (let i = 0; i < slidesGrid.length; i += 1) {
    if (typeof slidesGrid[i + 1] !== "undefined") {
      if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
        activeIndex = i;
      } else if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1]) {
        activeIndex = i + 1;
      }
    } else if (translate2 >= slidesGrid[i]) {
      activeIndex = i;
    }
  }
  if (params.normalizeSlideIndex) {
    if (activeIndex < 0 || typeof activeIndex === "undefined")
      activeIndex = 0;
  }
  return activeIndex;
}
function updateActiveIndex(newActiveIndex) {
  const swiper = this;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  const {
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper;
  let activeIndex = newActiveIndex;
  let snapIndex;
  const getVirtualRealIndex = (aIndex) => {
    let realIndex2 = aIndex - swiper.virtual.slidesBefore;
    if (realIndex2 < 0) {
      realIndex2 = swiper.virtual.slides.length + realIndex2;
    }
    if (realIndex2 >= swiper.virtual.slides.length) {
      realIndex2 -= swiper.virtual.slides.length;
    }
    return realIndex2;
  };
  if (typeof activeIndex === "undefined") {
    activeIndex = getActiveIndexByTranslate(swiper);
  }
  if (snapGrid.indexOf(translate2) >= 0) {
    snapIndex = snapGrid.indexOf(translate2);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit("snapIndexChange");
    }
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.realIndex = getVirtualRealIndex(activeIndex);
    }
    return;
  }
  let realIndex;
  if (swiper.virtual && params.virtual.enabled && params.loop) {
    realIndex = getVirtualRealIndex(activeIndex);
  } else if (swiper.slides[activeIndex]) {
    realIndex = parseInt(swiper.slides[activeIndex].getAttribute("data-swiper-slide-index") || activeIndex, 10);
  } else {
    realIndex = activeIndex;
  }
  Object.assign(swiper, {
    previousSnapIndex,
    snapIndex,
    previousRealIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  if (swiper.initialized) {
    preload(swiper);
  }
  swiper.emit("activeIndexChange");
  swiper.emit("snapIndexChange");
  if (previousRealIndex !== realIndex) {
    swiper.emit("realIndexChange");
  }
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    swiper.emit("slideChange");
  }
}
function updateClickedSlide(e) {
  const swiper = this;
  const params = swiper.params;
  const slide2 = e.closest(`.${params.slideClass}, swiper-slide`);
  let slideFound = false;
  let slideIndex;
  if (slide2) {
    for (let i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide2) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide2 && slideFound) {
    swiper.clickedSlide = slide2;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = void 0;
    swiper.clickedIndex = void 0;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}
const update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};
function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl,
    translate: translate2,
    wrapperEl
  } = swiper;
  if (params.virtualTranslate) {
    return rtl ? -translate2 : translate2;
  }
  if (params.cssMode) {
    return translate2;
  }
  let currentTranslate = getTranslate(wrapperEl, axis);
  currentTranslate += swiper.cssOverflowAdjustment();
  if (rtl)
    currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}
function setTranslate(translate2, byController) {
  const swiper = this;
  const {
    rtlTranslate: rtl,
    params,
    wrapperEl,
    progress
  } = swiper;
  let x = 0;
  let y = 0;
  const z = 0;
  if (swiper.isHorizontal()) {
    x = rtl ? -translate2 : translate2;
  } else {
    y = translate2;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y;
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    if (swiper.isHorizontal()) {
      x -= swiper.cssOverflowAdjustment();
    } else {
      y -= swiper.cssOverflowAdjustment();
    }
    wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
  }
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate2);
  }
  swiper.emit("setTranslate", swiper.translate, byController);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(translate2 = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
  const swiper = this;
  const {
    params,
    wrapperEl
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  const minTranslate2 = swiper.minTranslate();
  const maxTranslate2 = swiper.maxTranslate();
  let newTranslate;
  if (translateBounds && translate2 > minTranslate2)
    newTranslate = minTranslate2;
  else if (translateBounds && translate2 < maxTranslate2)
    newTranslate = maxTranslate2;
  else
    newTranslate = translate2;
  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: -newTranslate,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: -newTranslate,
        behavior: "smooth"
      });
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionEnd");
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionStart");
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e) {
          if (!swiper || swiper.destroyed)
            return;
          if (e.target !== this)
            return;
          swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          if (runCallbacks) {
            swiper.emit("transitionEnd");
          }
        };
      }
      swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}
const translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};
function setTransition(duration, byController) {
  const swiper = this;
  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
  }
  swiper.emit("setTransition", duration, byController);
}
function transitionEmit({
  swiper,
  runCallbacks,
  direction,
  step
}) {
  const {
    activeIndex,
    previousIndex
  } = swiper;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex)
      dir = "next";
    else if (activeIndex < previousIndex)
      dir = "prev";
    else
      dir = "reset";
  }
  swiper.emit(`transition${step}`);
  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === "reset") {
      swiper.emit(`slideResetTransition${step}`);
      return;
    }
    swiper.emit(`slideChangeTransition${step}`);
    if (dir === "next") {
      swiper.emit(`slideNextTransition${step}`);
    } else {
      swiper.emit(`slidePrevTransition${step}`);
    }
  }
}
function transitionStart(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode)
    return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "Start"
  });
}
function transitionEnd(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.animating = false;
  if (params.cssMode)
    return;
  swiper.setTransition(0);
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "End"
  });
}
const transition = {
  setTransition,
  transitionStart,
  transitionEnd
};
function slideTo(index2 = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
  if (typeof index2 === "string") {
    index2 = parseInt(index2, 10);
  }
  const swiper = this;
  let slideIndex = index2;
  if (slideIndex < 0)
    slideIndex = 0;
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
    return false;
  }
  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
  const translate2 = -snapGrid[snapIndex];
  if (params.normalizeSlideIndex) {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate2 * 100);
      const normalizedGrid = Math.floor(slidesGrid[i] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && (rtl ? translate2 > swiper.translate && translate2 > swiper.minTranslate() : translate2 < swiper.translate && translate2 < swiper.minTranslate())) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit("beforeSlideChangeStart");
  }
  swiper.updateProgress(translate2);
  let direction;
  if (slideIndex > activeIndex)
    direction = "next";
  else if (slideIndex < activeIndex)
    direction = "prev";
  else
    direction = "reset";
  if (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate) {
    swiper.updateActiveIndex(slideIndex);
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== "slide") {
      swiper.setTranslate(translate2);
    }
    if (direction !== "reset") {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    const t = rtl ? translate2 : -translate2;
    if (speed === 0) {
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = "none";
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
        });
      } else {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
      }
      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper.wrapperEl.style.scrollSnapType = "";
          swiper._immediateVirtual = false;
        });
      }
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: t,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: t,
        behavior: "smooth"
      });
    }
    return true;
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate2);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit("beforeTransitionStart", speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e) {
        if (!swiper || swiper.destroyed)
          return;
        if (e.target !== this)
          return;
        swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
  }
  return true;
}
function slideToLoop(index2 = 0, speed = this.params.speed, runCallbacks = true, internal) {
  if (typeof index2 === "string") {
    const indexAsNumber = parseInt(index2, 10);
    index2 = indexAsNumber;
  }
  const swiper = this;
  let newIndex = index2;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      newIndex = swiper.getSlideIndexByData(newIndex);
    }
  }
  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}
function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    enabled,
    params,
    animating
  } = swiper;
  if (!enabled)
    return swiper;
  let perGroup = params.slidesPerGroup;
  if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
  }
  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding)
      return false;
    swiper.loopFix({
      direction: "next"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}
function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    params,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled,
    animating
  } = swiper;
  if (!enabled)
    return swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding)
      return false;
    swiper.loopFix({
      direction: "prev"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0)
      return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate2);
  const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === "undefined" && params.cssMode) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== "undefined") {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  let prevIndex = 0;
  if (typeof prevSnap !== "undefined") {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0)
      prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}
function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = 0.5) {
  const swiper = this;
  let index2 = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index2);
  const snapIndex = skip + Math.floor((index2 - skip) / swiper.params.slidesPerGroup);
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate2 >= swiper.snapGrid[snapIndex]) {
    const currentSnap = swiper.snapGrid[snapIndex];
    const nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
      index2 += swiper.params.slidesPerGroup;
    }
  } else {
    const prevSnap = swiper.snapGrid[snapIndex - 1];
    const currentSnap = swiper.snapGrid[snapIndex];
    if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index2 -= swiper.params.slidesPerGroup;
    }
  }
  index2 = Math.max(index2, 0);
  index2 = Math.min(index2, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index2, speed, runCallbacks, internal);
}
function slideToClickedSlide() {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.clickedIndex;
  let realIndex;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  if (params.loop) {
    if (swiper.animating)
      return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
      nextTick(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}
const slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};
function loopCreate(slideRealIndex) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
    return;
  const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  slides.forEach((el, index2) => {
    el.setAttribute("data-swiper-slide-index", index2);
  });
  swiper.loopFix({
    slideRealIndex,
    direction: params.centeredSlides ? void 0 : "next"
  });
}
function loopFix({
  slideRealIndex,
  slideTo: slideTo2 = true,
  direction,
  setTranslate: setTranslate2,
  activeSlideIndex,
  byController,
  byMousewheel
} = {}) {
  const swiper = this;
  if (!swiper.params.loop)
    return;
  swiper.emit("beforeLoopFix");
  const {
    slides,
    allowSlidePrev,
    allowSlideNext,
    slidesEl,
    params
  } = swiper;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  if (swiper.virtual && params.virtual.enabled) {
    if (slideTo2) {
      if (!params.centeredSlides && swiper.snapIndex === 0) {
        swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
      } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
        swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit("loopFix");
    return;
  }
  const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
  let loopedSlides = params.loopedSlides || slidesPerView;
  if (loopedSlides % params.slidesPerGroup !== 0) {
    loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
  }
  swiper.loopedSlides = loopedSlides;
  const prependSlidesIndexes = [];
  const appendSlidesIndexes = [];
  let activeIndex = swiper.activeIndex;
  if (typeof activeSlideIndex === "undefined") {
    activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter((el) => el.classList.contains(params.slideActiveClass))[0]);
  } else {
    activeIndex = activeSlideIndex;
  }
  const isNext = direction === "next" || !direction;
  const isPrev = direction === "prev" || !direction;
  let slidesPrepended = 0;
  let slidesAppended = 0;
  if (activeSlideIndex < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
    for (let i = 0; i < loopedSlides - activeSlideIndex; i += 1) {
      const index2 = i - Math.floor(i / slides.length) * slides.length;
      prependSlidesIndexes.push(slides.length - index2 - 1);
    }
  } else if (activeSlideIndex > swiper.slides.length - loopedSlides * 2) {
    slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);
    for (let i = 0; i < slidesAppended; i += 1) {
      const index2 = i - Math.floor(i / slides.length) * slides.length;
      appendSlidesIndexes.push(index2);
    }
  }
  if (isPrev) {
    prependSlidesIndexes.forEach((index2) => {
      swiper.slides[index2].swiperLoopMoveDOM = true;
      slidesEl.prepend(swiper.slides[index2]);
      swiper.slides[index2].swiperLoopMoveDOM = false;
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach((index2) => {
      swiper.slides[index2].swiperLoopMoveDOM = true;
      slidesEl.append(swiper.slides[index2]);
      swiper.slides[index2].swiperLoopMoveDOM = false;
    });
  }
  swiper.recalcSlides();
  if (params.slidesPerView === "auto") {
    swiper.updateSlides();
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (slideTo2) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex === "undefined") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
          if (setTranslate2) {
            swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
          }
        }
      } else {
        if (setTranslate2) {
          swiper.slideToLoop(slideRealIndex, 0, false, true);
        }
      }
    } else if (appendSlidesIndexes.length > 0 && isNext) {
      if (typeof slideRealIndex === "undefined") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
          if (setTranslate2) {
            swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff;
          }
        }
      } else {
        swiper.slideToLoop(slideRealIndex, 0, false, true);
      }
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.controller && swiper.controller.control && !byController) {
    const loopParams = {
      slideRealIndex,
      slideTo: false,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController: true
    };
    if (Array.isArray(swiper.controller.control)) {
      swiper.controller.control.forEach((c) => {
        if (!c.destroyed && c.params.loop)
          c.loopFix(loopParams);
      });
    } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
      swiper.controller.control.loopFix(loopParams);
    }
  }
  swiper.emit("loopFix");
}
function loopDestroy() {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
    return;
  swiper.recalcSlides();
  const newSlidesOrder = [];
  swiper.slides.forEach((slideEl) => {
    const index2 = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
    newSlidesOrder[index2] = slideEl;
  });
  swiper.slides.forEach((slideEl) => {
    slideEl.removeAttribute("data-swiper-slide-index");
  });
  newSlidesOrder.forEach((slideEl) => {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}
const loop = {
  loopCreate,
  loopFix,
  loopDestroy
};
function setGrabCursor(moving) {
  const swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode)
    return;
  const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el.style.cursor = "move";
  el.style.cursor = moving ? "grabbing" : "grab";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}
function unsetGrabCursor() {
  const swiper = this;
  if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}
const grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};
function closestElement(selector, base = this) {
  function __closestFrom(el) {
    if (!el || el === getDocument() || el === getWindow())
      return null;
    if (el.assignedSlot)
      el = el.assignedSlot;
    const found = el.closest(selector);
    if (!found && !el.getRootNode) {
      return null;
    }
    return found || __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}
function onTouchStart(event) {
  const swiper = this;
  const document2 = getDocument();
  const window2 = getWindow();
  const data = swiper.touchEventsData;
  data.evCache.push(event);
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (!params.simulateTouch && event.pointerType === "mouse")
    return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let e = event;
  if (e.originalEvent)
    e = e.originalEvent;
  let targetEl = e.target;
  if (params.touchEventsTarget === "wrapper") {
    if (!swiper.wrapperEl.contains(targetEl))
      return;
  }
  if ("which" in e && e.which === 3)
    return;
  if ("button" in e && e.button > 0)
    return;
  if (data.isTouched && data.isMoved)
    return;
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
  const eventPath = event.composedPath ? event.composedPath() : event.path;
  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e.target && e.target.shadowRoot);
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler))
      return;
  }
  touches.currentX = e.pageX;
  touches.currentY = e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;
  const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === "prevent") {
      event.preventDefault();
    } else {
      return;
    }
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: void 0,
    startMoving: void 0
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = void 0;
  if (params.threshold > 0)
    data.allowThresholdMove = false;
  let preventDefault = true;
  if (targetEl.matches(data.focusableElements)) {
    preventDefault = false;
    if (targetEl.nodeName === "SELECT") {
      data.isTouched = false;
    }
  }
  if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl) {
    document2.activeElement.blur();
  }
  const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
    e.preventDefault();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit("touchStart", e);
}
function onTouchMove(event) {
  const document2 = getDocument();
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (!params.simulateTouch && event.pointerType === "mouse")
    return;
  let e = event;
  if (e.originalEvent)
    e = e.originalEvent;
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit("touchMoveOpposite", e);
    }
    return;
  }
  const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === e.pointerId);
  if (pointerIndex >= 0)
    data.evCache[pointerIndex] = e;
  const targetTouch = data.evCache.length > 1 ? data.evCache[0] : e;
  const pageX = targetTouch.pageX;
  const pageY = targetTouch.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        prevX: swiper.touches.currentX,
        prevY: swiper.touches.currentY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = now();
    }
    return;
  }
  if (params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }
  if (document2.activeElement) {
    if (e.target === document2.activeElement && e.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit("touchMove", e);
  }
  if (e.targetTouches && e.targetTouches.length > 1)
    return;
  touches.currentX = pageX;
  touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold)
    return;
  if (typeof data.isScrolling === "undefined") {
    let touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit("touchMoveOpposite", e);
  }
  if (typeof data.startMoving === "undefined") {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  let diff = swiper.isHorizontal() ? diffX : diffY;
  let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
  if (params.oneWayMovement) {
    diff = Math.abs(diff) * (rtl ? 1 : -1);
    touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
  }
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) {
    diff = -diff;
    touchesDiff = -touchesDiff;
  }
  const prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? "prev" : "next";
  swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
  const isLoop = swiper.params.loop && !params.cssMode;
  if (!data.isMoved) {
    if (isLoop) {
      swiper.loopFix({
        direction: swiper.swipeDirection
      });
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      const evt = new window.CustomEvent("transitionend", {
        bubbles: true,
        cancelable: true
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit("sliderFirstMove", e);
  }
  let loopFixed;
  if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && Math.abs(diff) >= 1) {
    swiper.loopFix({
      direction: swiper.swipeDirection,
      setTranslate: true
    });
    loopFixed = true;
  }
  swiper.emit("sliderMove", e);
  data.isMoved = true;
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (isLoop && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) {
      swiper.loopFix({
        direction: "prev",
        setTranslate: true,
        activeSlideIndex: 0
      });
    }
    if (data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      }
    }
  } else if (diff < 0) {
    if (isLoop && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) {
      swiper.loopFix({
        direction: "next",
        setTranslate: true,
        activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
      });
    }
    if (data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }
    }
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }
  if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode)
    return;
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  swiper.updateProgress(data.currentTranslate);
  swiper.setTranslate(data.currentTranslate);
}
function onTouchEnd(event) {
  const swiper = this;
  const data = swiper.touchEventsData;
  const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === event.pointerId);
  if (pointerIndex >= 0) {
    data.evCache.splice(pointerIndex, 1);
  }
  if (["pointercancel", "pointerout", "pointerleave"].includes(event.type)) {
    const proceed = event.type === "pointercancel" && (swiper.browser.isSafari || swiper.browser.isWebView);
    if (!proceed) {
      return;
    }
  }
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled)
    return;
  if (!params.simulateTouch && event.pointerType === "mouse")
    return;
  let e = event;
  if (e.originalEvent)
    e = e.originalEvent;
  if (data.allowTouchCallbacks) {
    swiper.emit("touchEnd", e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }
  const touchEndTime = now();
  const timeDiff = touchEndTime - data.touchStartTime;
  if (swiper.allowClick) {
    const pathTree = e.path || e.composedPath && e.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
    swiper.emit("tap click", e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit("doubleTap doubleClick", e);
    }
  }
  data.lastClickTime = now();
  nextTick(() => {
    if (!swiper.destroyed)
      swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  let currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }
  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];
  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment2 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + increment2] !== "undefined") {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) {
        stopIndex = i;
        groupSize = slidesGrid[i + increment2] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  let rewindFirstIndex = null;
  let rewindLastIndex = null;
  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    } else if (swiper.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === "next") {
      if (ratio >= params.longSwipesRatio)
        swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
      else
        swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === "prev") {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper.slideTo(rewindLastIndex);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } else {
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === "next") {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === "prev") {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}
function onResize() {
  const swiper = this;
  const {
    params,
    el
  } = swiper;
  if (el && el.offsetWidth === 0)
    return;
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }
  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper;
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  const isVirtualLoop = isVirtual && params.loop;
  if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    if (swiper.params.loop && !isVirtual) {
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    clearTimeout(swiper.autoplay.resizeTimeout);
    swiper.autoplay.resizeTimeout = setTimeout(() => {
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }, 500);
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}
function onClick(e) {
  const swiper = this;
  if (!swiper.enabled)
    return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks)
      e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}
function onScroll() {
  const swiper = this;
  const {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled)
    return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  if (swiper.translate === 0)
    swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit("setTranslate", swiper.translate, false);
}
function onLoad(e) {
  const swiper = this;
  processLazyPreloader(swiper, e.target);
  if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
    return;
  }
  swiper.update();
}
let dummyEventAttached = false;
function dummyEventListener() {
}
const events = (swiper, method) => {
  const document2 = getDocument();
  const {
    params,
    el,
    wrapperEl,
    device
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
  const swiperMethod = method;
  el[domMethod]("pointerdown", swiper.onTouchStart, {
    passive: false
  });
  document2[domMethod]("pointermove", swiper.onTouchMove, {
    passive: false,
    capture
  });
  document2[domMethod]("pointerup", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointercancel", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerout", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerleave", swiper.onTouchEnd, {
    passive: true
  });
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]("click", swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]("scroll", swiper.onScroll);
  }
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
  } else {
    swiper[swiperMethod]("observerUpdate", onResize, true);
  }
  el[domMethod]("load", swiper.onLoad, {
    capture: true
  });
};
function attachEvents() {
  const swiper = this;
  const document2 = getDocument();
  const {
    params
  } = swiper;
  swiper.onTouchStart = onTouchStart.bind(swiper);
  swiper.onTouchMove = onTouchMove.bind(swiper);
  swiper.onTouchEnd = onTouchEnd.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }
  swiper.onClick = onClick.bind(swiper);
  swiper.onLoad = onLoad.bind(swiper);
  if (!dummyEventAttached) {
    document2.addEventListener("touchstart", dummyEventListener);
    dummyEventAttached = true;
  }
  events(swiper, "on");
}
function detachEvents() {
  const swiper = this;
  events(swiper, "off");
}
const events$1 = {
  attachEvents,
  detachEvents
};
const isGridEnabled = (swiper, params) => {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  const swiper = this;
  const {
    realIndex,
    initialized,
    params,
    el
  } = swiper;
  const breakpoints2 = params.breakpoints;
  if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
    return;
  const breakpoint = swiper.getBreakpoint(breakpoints2, swiper.params.breakpointsBase, swiper.el);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint)
    return;
  const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el.classList.add(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
      el.classList.add(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
  }
  ["navigation", "pagination", "scrollbar"].forEach((prop) => {
    if (typeof breakpointParams[prop] === "undefined")
      return;
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      swiper[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      swiper[prop].enable();
    }
  });
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  extend$1(swiper.params, breakpointParams);
  const isEnabled = swiper.params.enabled;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }
  swiper.currentBreakpoint = breakpoint;
  swiper.emit("_beforeBreakpoint", breakpointParams);
  if (needsReLoop && initialized) {
    swiper.loopDestroy();
    swiper.loopCreate(realIndex);
    swiper.updateSlides();
  }
  swiper.emit("breakpoint", breakpointParams);
}
function getBreakpoint(breakpoints2, base = "window", containerEl) {
  if (!breakpoints2 || base === "container" && !containerEl)
    return void 0;
  let breakpoint = false;
  const window2 = getWindow();
  const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints2).map((point) => {
    if (typeof point === "string" && point.indexOf("@") === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return {
        value,
        point
      };
    }
    return {
      value: point,
      point
    };
  });
  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  for (let i = 0; i < points.length; i += 1) {
    const {
      point,
      value
    } = points[i];
    if (base === "window") {
      if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || "max";
}
const breakpoints = {
  setBreakpoint,
  getBreakpoint
};
function prepareClasses(entries, prefix) {
  const resultClasses = [];
  entries.forEach((item) => {
    if (typeof item === "object") {
      Object.keys(item).forEach((classNames) => {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === "string") {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  const swiper = this;
  const {
    classNames,
    params,
    rtl,
    el,
    device
  } = swiper;
  const suffixes = prepareClasses(["initialized", params.direction, {
    "free-mode": swiper.params.freeMode && params.freeMode.enabled
  }, {
    "autoheight": params.autoHeight
  }, {
    "rtl": rtl
  }, {
    "grid": params.grid && params.grid.rows > 1
  }, {
    "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
  }, {
    "android": device.android
  }, {
    "ios": device.ios
  }, {
    "css-mode": params.cssMode
  }, {
    "centered": params.cssMode && params.centeredSlides
  }, {
    "watch-progress": params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push(...suffixes);
  el.classList.add(...classNames);
  swiper.emitContainerClasses();
}
function removeClasses() {
  const swiper = this;
  const {
    el,
    classNames
  } = swiper;
  el.classList.remove(...classNames);
  swiper.emitContainerClasses();
}
const classes = {
  addClasses,
  removeClasses
};
function checkOverflow() {
  const swiper = this;
  const {
    isLocked: wasLocked,
    params
  } = swiper;
  const {
    slidesOffsetBefore
  } = params;
  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1;
    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? "lock" : "unlock");
  }
}
const checkOverflow$1 = {
  checkOverflow
};
const defaults = {
  init: true,
  direction: "horizontal",
  oneWayMovement: false,
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  enabled: true,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 5,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // loop
  loop: false,
  loopedSlides: null,
  loopPreventsSliding: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false
};
function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj = {}) {
    const moduleParamName = Object.keys(obj)[0];
    const moduleParams = obj[moduleParamName];
    if (typeof moduleParams !== "object" || moduleParams === null) {
      extend$1(allModulesParams, obj);
      return;
    }
    if (["navigation", "pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
      params[moduleParamName] = {
        auto: true
      };
    }
    if (!(moduleParamName in params && "enabled" in moduleParams)) {
      extend$1(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName])
      params[moduleParamName] = {
        enabled: false
      };
    extend$1(allModulesParams, obj);
  };
}
const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes
};
const extendedDefaults = {};
let Swiper$2 = class Swiper {
  constructor(...args) {
    let el;
    let params;
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
      params = args[0];
    } else {
      [el, params] = args;
    }
    if (!params)
      params = {};
    params = extend$1({}, params);
    if (el && !params.el)
      params.el = el;
    const document2 = getDocument();
    if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
      const swipers = [];
      document2.querySelectorAll(params.el).forEach((containerEl) => {
        const newParams = extend$1({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
      });
      return swipers;
    }
    const swiper = this;
    swiper.__swiper__ = true;
    swiper.support = getSupport();
    swiper.device = getDevice({
      userAgent: params.userAgent
    });
    swiper.browser = getBrowser();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = [...swiper.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      swiper.modules.push(...params.modules);
    }
    const allModulesParams = {};
    swiper.modules.forEach((mod) => {
      mod({
        params,
        swiper,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });
    const swiperParams = extend$1({}, defaults, allModulesParams);
    swiper.params = extend$1({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = extend$1({}, swiper.params);
    swiper.passedParams = extend$1({}, params);
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach((eventName) => {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    }
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return swiper.params.direction === "horizontal";
      },
      isVertical() {
        return swiper.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        evCache: []
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit("_swiper");
    if (swiper.params.init) {
      swiper.init();
    }
    return swiper;
  }
  getSlideIndex(slideEl) {
    const {
      slidesEl,
      params
    } = this;
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    const firstSlideIndex = elementIndex(slides[0]);
    return elementIndex(slideEl) - firstSlideIndex;
  }
  getSlideIndexByData(index2) {
    return this.getSlideIndex(this.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index2)[0]);
  }
  recalcSlides() {
    const swiper = this;
    const {
      slidesEl,
      params
    } = swiper;
    swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  }
  enable() {
    const swiper = this;
    if (swiper.enabled)
      return;
    swiper.enabled = true;
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }
    swiper.emit("enable");
  }
  disable() {
    const swiper = this;
    if (!swiper.enabled)
      return;
    swiper.enabled = false;
    if (swiper.params.grabCursor) {
      swiper.unsetGrabCursor();
    }
    swiper.emit("disable");
  }
  setProgress(progress, speed) {
    const swiper = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = swiper.minTranslate();
    const max = swiper.maxTranslate();
    const current = (max - min) * progress + min;
    swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el)
      return;
    const cls = swiper.el.className.split(" ").filter((className) => {
      return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
    });
    swiper.emit("_containerClasses", cls.join(" "));
  }
  getSlideClasses(slideEl) {
    const swiper = this;
    if (swiper.destroyed)
      return "";
    return slideEl.className.split(" ").filter((className) => {
      return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
    }).join(" ");
  }
  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el)
      return;
    const updates = [];
    swiper.slides.forEach((slideEl) => {
      const classNames = swiper.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      });
      swiper.emit("_slideClass", slideEl, classNames);
    });
    swiper.emit("_slideClasses", updates);
  }
  slidesPerViewDynamic(view = "current", exact = false) {
    const swiper = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper;
    let spv = 1;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex] ? slides[activeIndex].swiperSlideSize : 0;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
    } else {
      if (view === "current") {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }
  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed)
      return;
    const {
      snapGrid,
      params
    } = swiper;
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      }
    });
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    function setTranslate2() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    let translated;
    if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
      setTranslate2();
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
        const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
        translated = swiper.slideTo(slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate2();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
    swiper.emit("update");
  }
  changeDirection(newDirection, needUpdate = true) {
    const swiper = this;
    const currentDirection = swiper.params.direction;
    if (!newDirection) {
      newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
    }
    if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
      return swiper;
    }
    swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
    swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();
    swiper.params.direction = newDirection;
    swiper.slides.forEach((slideEl) => {
      if (newDirection === "vertical") {
        slideEl.style.width = "";
      } else {
        slideEl.style.height = "";
      }
    });
    swiper.emit("changeDirection");
    if (needUpdate)
      swiper.update();
    return swiper;
  }
  changeLanguageDirection(direction) {
    const swiper = this;
    if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr")
      return;
    swiper.rtl = direction === "rtl";
    swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
    if (swiper.rtl) {
      swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = "rtl";
    } else {
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = "ltr";
    }
    swiper.update();
  }
  mount(element) {
    const swiper = this;
    if (swiper.mounted)
      return true;
    let el = element || swiper.params.el;
    if (typeof el === "string") {
      el = document.querySelector(el);
    }
    if (!el) {
      return false;
    }
    el.swiper = swiper;
    if (el.shadowEl) {
      swiper.isElement = true;
    }
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
    };
    const getWrapper = () => {
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        const res = el.shadowRoot.querySelector(getWrapperSelector());
        return res;
      }
      return elementChildren(el, getWrapperSelector())[0];
    };
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = createElement("div", swiper.params.wrapperClass);
      el.append(wrapperEl);
      elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl) => {
        wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      el,
      wrapperEl,
      slidesEl: swiper.isElement ? el : wrapperEl,
      mounted: true,
      // RTL
      rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
      rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
      wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
    });
    return true;
  }
  init(el) {
    const swiper = this;
    if (swiper.initialized)
      return swiper;
    const mounted = swiper.mount(el);
    if (mounted === false)
      return swiper;
    swiper.emit("beforeInit");
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }
    swiper.addClasses();
    swiper.updateSize();
    swiper.updateSlides();
    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }
    if (swiper.params.grabCursor && swiper.enabled) {
      swiper.setGrabCursor();
    }
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
    }
    if (swiper.params.loop) {
      swiper.loopCreate();
    }
    swiper.attachEvents();
    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      } else {
        imageEl.addEventListener("load", (e) => {
          processLazyPreloader(swiper, e.target);
        });
      }
    });
    preload(swiper);
    swiper.initialized = true;
    preload(swiper);
    swiper.emit("init");
    swiper.emit("afterInit");
    return swiper;
  }
  destroy(deleteInstance = true, cleanStyles = true) {
    const swiper = this;
    const {
      params,
      el,
      wrapperEl,
      slides
    } = swiper;
    if (typeof swiper.params === "undefined" || swiper.destroyed) {
      return null;
    }
    swiper.emit("beforeDestroy");
    swiper.initialized = false;
    swiper.detachEvents();
    if (params.loop) {
      swiper.loopDestroy();
    }
    if (cleanStyles) {
      swiper.removeClasses();
      el.removeAttribute("style");
      wrapperEl.removeAttribute("style");
      if (slides && slides.length) {
        slides.forEach((slideEl) => {
          slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
          slideEl.removeAttribute("style");
          slideEl.removeAttribute("data-swiper-slide-index");
        });
      }
    }
    swiper.emit("destroy");
    Object.keys(swiper.eventsListeners).forEach((eventName) => {
      swiper.off(eventName);
    });
    if (deleteInstance !== false) {
      swiper.el.swiper = null;
      deleteProps(swiper);
    }
    swiper.destroyed = true;
    return null;
  }
  static extendDefaults(newDefaults) {
    extend$1(extendedDefaults, newDefaults);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(mod) {
    if (!Swiper.prototype.__modules__)
      Swiper.prototype.__modules__ = [];
    const modules2 = Swiper.prototype.__modules__;
    if (typeof mod === "function" && modules2.indexOf(mod) < 0) {
      modules2.push(mod);
    }
  }
  static use(module) {
    if (Array.isArray(module)) {
      module.forEach((m) => Swiper.installModule(m));
      return Swiper;
    }
    Swiper.installModule(module);
    return Swiper;
  }
};
Object.keys(prototypes).forEach((prototypeGroup) => {
  Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
    Swiper$2.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper$2.use([Resize, Observer]);
function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
        if (!element) {
          element = createElement("div", checkProps[key]);
          element.className = checkProps[key];
          swiper.el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}
function classesToSelector(classes2 = "") {
  return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
}
function Pagination({
  swiper,
  extendParams,
  on,
  emit
}) {
  const pfx = "swiper-pagination";
  extendParams({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: "bullets",
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: (number) => number,
      formatFractionTotal: (number) => number,
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`
    }
  });
  swiper.pagination = {
    el: null,
    bullets: []
  };
  let bulletSize;
  let dynamicBulletIndex = 0;
  const makeElementsArray = (el) => {
    if (!Array.isArray(el))
      el = [el].filter((e) => !!e);
    return el;
  };
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
  }
  function setSideBullets(bulletEl, position) {
    const {
      bulletActiveClass
    } = swiper.params.pagination;
    if (!bulletEl)
      return;
    bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
    if (bulletEl) {
      bulletEl.classList.add(`${bulletActiveClass}-${position}`);
      bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
      }
    }
  }
  function onBulletClick(e) {
    const bulletEl = e.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
    if (!bulletEl) {
      return;
    }
    e.preventDefault();
    const index2 = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index2)
        return;
      const newSlideIndex = swiper.getSlideIndexByData(index2);
      const currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);
      if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) {
        swiper.loopFix({
          direction: newSlideIndex > currentSlideIndex ? "next" : "prev",
          activeSlideIndex: newSlideIndex,
          slideTo: false
        });
      }
      swiper.slideToLoop(index2);
    } else {
      swiper.slideTo(index2);
    }
  }
  function update2() {
    const rtl = swiper.rtl;
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
    let el = swiper.pagination.el;
    el = makeElementsArray(el);
    let current;
    let previousIndex;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      previousIndex = swiper.previousRealIndex || 0;
      current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
    } else if (typeof swiper.snapIndex !== "undefined") {
      current = swiper.snapIndex;
      previousIndex = swiper.previousSnapIndex;
    } else {
      previousIndex = swiper.previousIndex || 0;
      current = swiper.activeIndex || 0;
    }
    if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      const bullets = swiper.pagination.bullets;
      let firstIndex;
      let lastIndex;
      let midIndex;
      if (params.dynamicBullets) {
        bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
        el.forEach((subEl) => {
          subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
        });
        if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
          dynamicBulletIndex += current - (previousIndex || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach((bulletEl) => {
        const classesToRemove = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => `${params.bulletActiveClass}${suffix}`)].map((s) => typeof s === "string" && s.includes(" ") ? s.split(" ") : s).flat();
        bulletEl.classList.remove(...classesToRemove);
      });
      if (el.length > 1) {
        bullets.forEach((bullet) => {
          const bulletIndex = elementIndex(bullet);
          if (bulletIndex === current) {
            bullet.classList.add(...params.bulletActiveClass.split(" "));
          } else if (swiper.isElement) {
            bullet.setAttribute("part", "bullet");
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets(bullet, "prev");
            }
            if (bulletIndex === lastIndex) {
              setSideBullets(bullet, "next");
            }
          }
        });
      } else {
        const bullet = bullets[current];
        if (bullet) {
          bullet.classList.add(...params.bulletActiveClass.split(" "));
        }
        if (swiper.isElement) {
          bullets.forEach((bulletEl, bulletIndex) => {
            bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
          });
        }
        if (params.dynamicBullets) {
          const firstDisplayedBullet = bullets[firstIndex];
          const lastDisplayedBullet = bullets[lastIndex];
          for (let i = firstIndex; i <= lastIndex; i += 1) {
            if (bullets[i]) {
              bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
            }
          }
          setSideBullets(firstDisplayedBullet, "prev");
          setSideBullets(lastDisplayedBullet, "next");
        }
      }
      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        const offsetProp = rtl ? "right" : "left";
        bullets.forEach((bullet) => {
          bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
        });
      }
    }
    el.forEach((subEl, subElIndex) => {
      if (params.type === "fraction") {
        subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
          fractionEl.textContent = params.formatFractionCurrent(current + 1);
        });
        subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
          totalEl.textContent = params.formatFractionTotal(total);
        });
      }
      if (params.type === "progressbar") {
        let progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal";
        } else {
          progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
        }
        const scale = (current + 1) / total;
        let scaleX = 1;
        let scaleY = 1;
        if (progressbarDirection === "horizontal") {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl) => {
          progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
          progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
        });
      }
      if (params.type === "custom" && params.renderCustom) {
        subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
        if (subElIndex === 0)
          emit("paginationRender", subEl);
      } else {
        if (subElIndex === 0)
          emit("paginationRender", subEl);
        emit("paginationUpdate", subEl);
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
      }
    });
  }
  function render() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    let el = swiper.pagination.el;
    el = makeElementsArray(el);
    let paginationHTML = "";
    if (params.type === "bullets") {
      let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (let i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }
    }
    if (params.type === "fraction") {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`;
      }
    }
    if (params.type === "progressbar") {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }
    }
    swiper.pagination.bullets = [];
    el.forEach((subEl) => {
      if (params.type !== "custom") {
        subEl.innerHTML = paginationHTML || "";
      }
      if (params.type === "bullets") {
        swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
      }
    });
    if (params.type !== "custom") {
      emit("paginationRender", el[0]);
    }
  }
  function init() {
    swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: "swiper-pagination"
    });
    const params = swiper.params.pagination;
    if (!params.el)
      return;
    let el;
    if (typeof params.el === "string" && swiper.isElement) {
      el = swiper.el.shadowRoot.querySelector(params.el);
    }
    if (!el && typeof params.el === "string") {
      el = [...document.querySelectorAll(params.el)];
    }
    if (!el) {
      el = params.el;
    }
    if (!el || el.length === 0)
      return;
    if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
      el = [...swiper.el.querySelectorAll(params.el)];
      if (el.length > 1) {
        el = el.filter((subEl) => {
          if (elementParents(subEl, ".swiper")[0] !== swiper.el)
            return false;
          return true;
        })[0];
      }
    }
    if (Array.isArray(el) && el.length === 1)
      el = el[0];
    Object.assign(swiper.pagination, {
      el
    });
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      if (params.type === "bullets" && params.clickable) {
        subEl.classList.add(params.clickableClass);
      }
      subEl.classList.add(params.modifierClass + params.type);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      if (params.type === "bullets" && params.dynamicBullets) {
        subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
        dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === "progressbar" && params.progressbarOpposite) {
        subEl.classList.add(params.progressbarOppositeClass);
      }
      if (params.clickable) {
        subEl.addEventListener("click", onBulletClick);
      }
      if (!swiper.enabled) {
        subEl.classList.add(params.lockClass);
      }
    });
  }
  function destroy() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled())
      return;
    let el = swiper.pagination.el;
    if (el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.classList.remove(params.hiddenClass);
        subEl.classList.remove(params.modifierClass + params.type);
        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.clickable) {
          subEl.removeEventListener("click", onBulletClick);
        }
      });
    }
    if (swiper.pagination.bullets)
      swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
  }
  on("changeDirection", () => {
    if (!swiper.pagination || !swiper.pagination.el)
      return;
    const params = swiper.params.pagination;
    let {
      el
    } = swiper.pagination;
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on("init", () => {
    if (swiper.params.pagination.enabled === false) {
      disable();
    } else {
      init();
      render();
      update2();
    }
  });
  on("activeIndexChange", () => {
    if (typeof swiper.snapIndex === "undefined") {
      update2();
    }
  });
  on("snapIndexChange", () => {
    update2();
  });
  on("snapGridLengthChange", () => {
    render();
    update2();
  });
  on("destroy", () => {
    destroy();
  });
  on("enable disable", () => {
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
    }
  });
  on("lock unlock", () => {
    update2();
  });
  on("click", (_s, e) => {
    const targetEl = e.target;
    let {
      el
    } = swiper.pagination;
    if (!Array.isArray(el))
      el = [el].filter((element) => !!element);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
        return;
      const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit("paginationShow");
      } else {
        emit("paginationHide");
      }
      el.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
    }
    init();
    render();
    update2();
  };
  const disable = () => {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = makeElementsArray(el);
      el.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
    }
    destroy();
  };
  Object.assign(swiper.pagination, {
    enable,
    disable,
    render,
    update: update2,
    init,
    destroy
  });
}
function Controller({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    controller: {
      control: void 0,
      inverse: false,
      by: "slide"
      // or 'container'
    }
  });
  swiper.controller = {
    control: void 0
  };
  function LinearSpline(x, y) {
    const binarySearch = function search() {
      let maxIndex;
      let minIndex;
      let guess;
      return (array, val) => {
        minIndex = -1;
        maxIndex = array.length;
        while (maxIndex - minIndex > 1) {
          guess = maxIndex + minIndex >> 1;
          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }
        return maxIndex;
      };
    }();
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    let i1;
    let i3;
    this.interpolate = function interpolate(x2) {
      if (!x2)
        return 0;
      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1;
      return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
    };
    return this;
  }
  function getInterpolateFunction(c) {
    swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
  }
  function setTranslate2(_t, byController) {
    const controlled = swiper.controller.control;
    let multiplier;
    let controlledTranslate;
    const Swiper3 = swiper.constructor;
    function setControlledTranslate(c) {
      if (c.destroyed)
        return;
      const translate2 = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
      if (swiper.params.controller.by === "slide") {
        getInterpolateFunction(c);
        controlledTranslate = -swiper.controller.spline.interpolate(-translate2);
      }
      if (!controlledTranslate || swiper.params.controller.by === "container") {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) {
          multiplier = 1;
        }
        controlledTranslate = (translate2 - swiper.minTranslate()) * multiplier + c.minTranslate();
      }
      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (let i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper3) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper3 && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  }
  function setTransition2(duration, byController) {
    const Swiper3 = swiper.constructor;
    const controlled = swiper.controller.control;
    let i;
    function setControlledTransition(c) {
      if (c.destroyed)
        return;
      c.setTransition(duration, swiper);
      if (duration !== 0) {
        c.transitionStart();
        if (c.params.autoHeight) {
          nextTick(() => {
            c.updateAutoHeight();
          });
        }
        elementTransitionEnd(c.wrapperEl, () => {
          if (!controlled)
            return;
          c.transitionEnd();
        });
      }
    }
    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper3) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper3 && byController !== controlled) {
      setControlledTransition(controlled);
    }
  }
  function removeSpline() {
    if (!swiper.controller.control)
      return;
    if (swiper.controller.spline) {
      swiper.controller.spline = void 0;
      delete swiper.controller.spline;
    }
  }
  on("beforeInit", () => {
    if (typeof window !== "undefined" && // eslint-disable-line
    (typeof swiper.params.controller.control === "string" || swiper.params.controller.control instanceof HTMLElement)) {
      const controlElement = document.querySelector(swiper.params.controller.control);
      if (controlElement && controlElement.swiper) {
        swiper.controller.control = controlElement.swiper;
      } else if (controlElement) {
        const onControllerSwiper = (e) => {
          swiper.controller.control = e.detail[0];
          swiper.update();
          controlElement.removeEventListener("init", onControllerSwiper);
        };
        controlElement.addEventListener("init", onControllerSwiper);
      }
      return;
    }
    swiper.controller.control = swiper.params.controller.control;
  });
  on("update", () => {
    removeSpline();
  });
  on("resize", () => {
    removeSpline();
  });
  on("observerUpdate", () => {
    removeSpline();
  });
  on("setTranslate", (_s, translate2, byController) => {
    if (!swiper.controller.control || swiper.controller.control.destroyed)
      return;
    swiper.controller.setTranslate(translate2, byController);
  });
  on("setTransition", (_s, duration, byController) => {
    if (!swiper.controller.control || swiper.controller.control.destroyed)
      return;
    swiper.controller.setTransition(duration, byController);
  });
  Object.assign(swiper.controller, {
    setTranslate: setTranslate2,
    setTransition: setTransition2
  });
}
function Autoplay({
  swiper,
  extendParams,
  on,
  emit,
  params
}) {
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3e3,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  let timeout;
  let raf2;
  let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayTimeLeft;
  let autoplayStartTime = (/* @__PURE__ */ new Date()).getTime;
  let wasPaused;
  let isTouched;
  let pausedByTouch;
  let touchStartTimeout;
  let slideChanged;
  let pausedByInteraction;
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl)
      return;
    if (e.target !== swiper.wrapperEl)
      return;
    swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
    resume();
  }
  const calcTimeLeft = () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (/* @__PURE__ */ new Date()).getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
    raf2 = requestAnimationFrame(() => {
      calcTimeLeft();
    });
  };
  const getSlideDelay = () => {
    let activeSlideEl;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      activeSlideEl = swiper.slides.filter((slideEl) => slideEl.classList.contains("swiper-slide-active"))[0];
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl)
      return void 0;
    const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
    return currentSlideDelay;
  };
  const run = (delayForce) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    cancelAnimationFrame(raf2);
    calcTimeLeft();
    let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
    autoplayDelayTotal = swiper.params.autoplay.delay;
    autoplayDelayCurrent = swiper.params.autoplay.delay;
    const currentSlideDelay = getSlideDelay();
    if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
      delay = currentSlideDelay;
      autoplayDelayTotal = currentSlideDelay;
      autoplayDelayCurrent = currentSlideDelay;
    }
    autoplayTimeLeft = delay;
    const speed = swiper.params.speed;
    const proceed = () => {
      if (!swiper || swiper.destroyed)
        return;
      if (swiper.params.autoplay.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit("autoplay");
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit("autoplay");
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
        requestAnimationFrame(() => {
          run();
        });
      }
    };
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(() => {
        proceed();
      });
    }
    return delay;
  };
  const start = () => {
    swiper.autoplay.running = true;
    run();
    emit("autoplayStart");
  };
  const stop = () => {
    swiper.autoplay.running = false;
    clearTimeout(timeout);
    cancelAnimationFrame(raf2);
    emit("autoplayStop");
  };
  const pause = (internal, reset) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    clearTimeout(timeout);
    if (!internal) {
      pausedByInteraction = true;
    }
    const proceed = () => {
      emit("autoplayPause");
      if (swiper.params.autoplay.waitForTransition) {
        swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd);
      } else {
        resume();
      }
    };
    swiper.autoplay.paused = true;
    if (reset) {
      if (slideChanged) {
        autoplayTimeLeft = swiper.params.autoplay.delay;
      }
      slideChanged = false;
      proceed();
      return;
    }
    const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
    autoplayTimeLeft = delay - ((/* @__PURE__ */ new Date()).getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop)
      return;
    if (autoplayTimeLeft < 0)
      autoplayTimeLeft = 0;
    proceed();
  };
  const resume = () => {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running)
      return;
    autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit("autoplayResume");
  };
  const onVisibilityChange = () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    const document2 = getDocument();
    if (document2.visibilityState === "hidden") {
      pausedByInteraction = true;
      pause(true);
    }
    if (document2.visibilityState === "visible") {
      resume();
    }
  };
  const onPointerEnter = (e) => {
    if (e.pointerType !== "mouse")
      return;
    pausedByInteraction = true;
    pause(true);
  };
  const onPointerLeave = (e) => {
    if (e.pointerType !== "mouse")
      return;
    if (swiper.autoplay.paused) {
      resume();
    }
  };
  const attachMouseEvents = () => {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.el.addEventListener("pointerenter", onPointerEnter);
      swiper.el.addEventListener("pointerleave", onPointerLeave);
    }
  };
  const detachMouseEvents = () => {
    swiper.el.removeEventListener("pointerenter", onPointerEnter);
    swiper.el.removeEventListener("pointerleave", onPointerLeave);
  };
  const attachDocumentEvents = () => {
    const document2 = getDocument();
    document2.addEventListener("visibilitychange", onVisibilityChange);
  };
  const detachDocumentEvents = () => {
    const document2 = getDocument();
    document2.removeEventListener("visibilitychange", onVisibilityChange);
  };
  on("init", () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
      start();
    }
  });
  on("destroy", () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on("beforeTransitionStart", (_s, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on("sliderFirstMove", () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(() => {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });
  on("touchEnd", () => {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched)
      return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode)
      resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on("slideChange", () => {
    if (swiper.destroyed || !swiper.autoplay.running)
      return;
    slideChanged = true;
  });
  Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume
  });
}
function isObject(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function extend(target, src) {
  const noExtend = ["__proto__", "constructor", "prototype"];
  Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
    if (typeof target[key] === "undefined")
      target[key] = src[key];
    else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      if (src[key].__swiper__)
        target[key] = src[key];
      else
        extend(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}
function needsNavigation(params = {}) {
  return params.navigation && typeof params.navigation.nextEl === "undefined" && typeof params.navigation.prevEl === "undefined";
}
function needsPagination(params = {}) {
  return params.pagination && typeof params.pagination.el === "undefined";
}
function needsScrollbar(params = {}) {
  return params.scrollbar && typeof params.scrollbar.el === "undefined";
}
function uniqueClasses(classNames = "") {
  const classes2 = classNames.split(" ").map((c) => c.trim()).filter((c) => !!c);
  const unique = [];
  classes2.forEach((c) => {
    if (unique.indexOf(c) < 0)
      unique.push(c);
  });
  return unique.join(" ");
}
function wrapperClass(className = "") {
  if (!className)
    return "swiper-wrapper";
  if (!className.includes("swiper-wrapper"))
    return `swiper-wrapper ${className}`;
  return className;
}
const paramsList = [
  "eventsPrefix",
  "injectStyles",
  "injectStylesUrls",
  "modules",
  "init",
  "_direction",
  "oneWayMovement",
  "touchEventsTarget",
  "initialSlide",
  "_speed",
  "cssMode",
  "updateOnWindowResize",
  "resizeObserver",
  "nested",
  "focusableElements",
  "_enabled",
  "_width",
  "_height",
  "preventInteractionOnTransition",
  "userAgent",
  "url",
  "_edgeSwipeDetection",
  "_edgeSwipeThreshold",
  "_freeMode",
  "_autoHeight",
  "setWrapperSize",
  "virtualTranslate",
  "_effect",
  "breakpoints",
  "_spaceBetween",
  "_slidesPerView",
  "maxBackfaceHiddenSlides",
  "_grid",
  "_slidesPerGroup",
  "_slidesPerGroupSkip",
  "_slidesPerGroupAuto",
  "_centeredSlides",
  "_centeredSlidesBounds",
  "_slidesOffsetBefore",
  "_slidesOffsetAfter",
  "normalizeSlideIndex",
  "_centerInsufficientSlides",
  "_watchOverflow",
  "roundLengths",
  "touchRatio",
  "touchAngle",
  "simulateTouch",
  "_shortSwipes",
  "_longSwipes",
  "longSwipesRatio",
  "longSwipesMs",
  "_followFinger",
  "allowTouchMove",
  "_threshold",
  "touchMoveStopPropagation",
  "touchStartPreventDefault",
  "touchStartForcePreventDefault",
  "touchReleaseOnEdges",
  "uniqueNavElements",
  "_resistance",
  "_resistanceRatio",
  "_watchSlidesProgress",
  "_grabCursor",
  "preventClicks",
  "preventClicksPropagation",
  "_slideToClickedSlide",
  "_loop",
  "loopedSlides",
  "loopPreventsSliding",
  "_rewind",
  "_allowSlidePrev",
  "_allowSlideNext",
  "_swipeHandler",
  "_noSwiping",
  "noSwipingClass",
  "noSwipingSelector",
  "passiveListeners",
  "containerModifierClass",
  "slideClass",
  "slideActiveClass",
  "slideVisibleClass",
  "slideNextClass",
  "slidePrevClass",
  "wrapperClass",
  "lazyPreloaderClass",
  "lazyPreloadPrevNext",
  "runCallbacksOnInit",
  "observer",
  "observeParents",
  "observeSlideChildren",
  // modules
  "a11y",
  "_autoplay",
  "_controller",
  "coverflowEffect",
  "cubeEffect",
  "fadeEffect",
  "flipEffect",
  "creativeEffect",
  "cardsEffect",
  "hashNavigation",
  "history",
  "keyboard",
  "mousewheel",
  "_navigation",
  "_pagination",
  "parallax",
  "_scrollbar",
  "_thumbs",
  "virtual",
  "zoom",
  "control"
];
function getParams(obj = {}, splitEvents = true) {
  const params = {
    on: {}
  };
  const events2 = {};
  const passedParams = {};
  extend(params, Swiper$2.defaults);
  extend(params, Swiper$2.extendedDefaults);
  params._emitClasses = true;
  params.init = false;
  const rest = {};
  const allowedParams = paramsList.map((key) => key.replace(/_/, ""));
  const plainObj = Object.assign({}, obj);
  Object.keys(plainObj).forEach((key) => {
    if (typeof obj[key] === "undefined")
      return;
    if (allowedParams.indexOf(key) >= 0) {
      if (isObject(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        extend(params[key], obj[key]);
        extend(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === "function") {
      if (splitEvents) {
        events2[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
      } else {
        params.on[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
      }
    } else {
      rest[key] = obj[key];
    }
  });
  ["navigation", "pagination", "scrollbar"].forEach((key) => {
    if (params[key] === true)
      params[key] = {};
    if (params[key] === false)
      delete params[key];
  });
  return {
    params,
    passedParams,
    rest,
    events: events2
  };
}
function mountSwiper({
  el,
  nextEl,
  prevEl,
  paginationEl,
  scrollbarEl,
  swiper
}, swiperParams) {
  if (needsNavigation(swiperParams) && nextEl && prevEl) {
    swiper.params.navigation.nextEl = nextEl;
    swiper.originalParams.navigation.nextEl = nextEl;
    swiper.params.navigation.prevEl = prevEl;
    swiper.originalParams.navigation.prevEl = prevEl;
  }
  if (needsPagination(swiperParams) && paginationEl) {
    swiper.params.pagination.el = paginationEl;
    swiper.originalParams.pagination.el = paginationEl;
  }
  if (needsScrollbar(swiperParams) && scrollbarEl) {
    swiper.params.scrollbar.el = scrollbarEl;
    swiper.originalParams.scrollbar.el = scrollbarEl;
  }
  swiper.init(el);
}
function getChangedParams(swiperParams, oldParams, children, oldChildren, getKey) {
  const keys = [];
  if (!oldParams)
    return keys;
  const addKey = (key) => {
    if (keys.indexOf(key) < 0)
      keys.push(key);
  };
  if (children && oldChildren) {
    const oldChildrenKeys = oldChildren.map(getKey);
    const childrenKeys = children.map(getKey);
    if (oldChildrenKeys.join("") !== childrenKeys.join(""))
      addKey("children");
    if (oldChildren.length !== children.length)
      addKey("children");
  }
  const watchParams = paramsList.filter((key) => key[0] === "_").map((key) => key.replace(/_/, ""));
  watchParams.forEach((key) => {
    if (key in swiperParams && key in oldParams) {
      if (isObject(swiperParams[key]) && isObject(oldParams[key])) {
        const newKeys = Object.keys(swiperParams[key]);
        const oldKeys = Object.keys(oldParams[key]);
        if (newKeys.length !== oldKeys.length) {
          addKey(key);
        } else {
          newKeys.forEach((newKey) => {
            if (swiperParams[key][newKey] !== oldParams[key][newKey]) {
              addKey(key);
            }
          });
          oldKeys.forEach((oldKey) => {
            if (swiperParams[key][oldKey] !== oldParams[key][oldKey])
              addKey(key);
          });
        }
      } else if (swiperParams[key] !== oldParams[key]) {
        addKey(key);
      }
    }
  });
  return keys;
}
function getChildren(originalSlots, slidesRef, oldSlidesRef) {
  if (originalSlots === void 0) {
    originalSlots = {};
  }
  const slides = [];
  const slots = {
    "container-start": [],
    "container-end": [],
    "wrapper-start": [],
    "wrapper-end": []
  };
  const getSlidesFromElements = (els, slotName) => {
    if (!Array.isArray(els)) {
      return;
    }
    els.forEach((vnode) => {
      const isFragment = typeof vnode.type === "symbol";
      if (slotName === "default")
        slotName = "container-end";
      if (isFragment && vnode.children) {
        getSlidesFromElements(vnode.children, slotName);
      } else if (vnode.type && (vnode.type.name === "SwiperSlide" || vnode.type.name === "AsyncComponentWrapper")) {
        slides.push(vnode);
      } else if (slots[slotName]) {
        slots[slotName].push(vnode);
      }
    });
  };
  Object.keys(originalSlots).forEach((slotName) => {
    if (typeof originalSlots[slotName] !== "function")
      return;
    const els = originalSlots[slotName]();
    getSlidesFromElements(els, slotName);
  });
  oldSlidesRef.value = slidesRef.value;
  slidesRef.value = slides;
  return {
    slides,
    slots
  };
}
function updateSwiper({
  swiper,
  slides,
  passedParams,
  changedParams,
  nextEl,
  prevEl,
  scrollbarEl,
  paginationEl
}) {
  const updateParams = changedParams.filter((key) => key !== "children" && key !== "direction" && key !== "wrapperClass");
  const {
    params: currentParams,
    pagination,
    navigation,
    scrollbar,
    virtual,
    thumbs
  } = swiper;
  let needThumbsInit;
  let needControllerInit;
  let needPaginationInit;
  let needScrollbarInit;
  let needNavigationInit;
  let loopNeedDestroy;
  let loopNeedEnable;
  let loopNeedReloop;
  if (changedParams.includes("thumbs") && passedParams.thumbs && passedParams.thumbs.swiper && currentParams.thumbs && !currentParams.thumbs.swiper) {
    needThumbsInit = true;
  }
  if (changedParams.includes("controller") && passedParams.controller && passedParams.controller.control && currentParams.controller && !currentParams.controller.control) {
    needControllerInit = true;
  }
  if (changedParams.includes("pagination") && passedParams.pagination && (passedParams.pagination.el || paginationEl) && (currentParams.pagination || currentParams.pagination === false) && pagination && !pagination.el) {
    needPaginationInit = true;
  }
  if (changedParams.includes("scrollbar") && passedParams.scrollbar && (passedParams.scrollbar.el || scrollbarEl) && (currentParams.scrollbar || currentParams.scrollbar === false) && scrollbar && !scrollbar.el) {
    needScrollbarInit = true;
  }
  if (changedParams.includes("navigation") && passedParams.navigation && (passedParams.navigation.prevEl || prevEl) && (passedParams.navigation.nextEl || nextEl) && (currentParams.navigation || currentParams.navigation === false) && navigation && !navigation.prevEl && !navigation.nextEl) {
    needNavigationInit = true;
  }
  const destroyModule = (mod) => {
    if (!swiper[mod])
      return;
    swiper[mod].destroy();
    if (mod === "navigation") {
      if (swiper.isElement) {
        swiper[mod].prevEl.remove();
        swiper[mod].nextEl.remove();
      }
      currentParams[mod].prevEl = void 0;
      currentParams[mod].nextEl = void 0;
      swiper[mod].prevEl = void 0;
      swiper[mod].nextEl = void 0;
    } else {
      if (swiper.isElement) {
        swiper[mod].el.remove();
      }
      currentParams[mod].el = void 0;
      swiper[mod].el = void 0;
    }
  };
  if (changedParams.includes("loop") && swiper.isElement) {
    if (currentParams.loop && !passedParams.loop) {
      loopNeedDestroy = true;
    } else if (!currentParams.loop && passedParams.loop) {
      loopNeedEnable = true;
    } else {
      loopNeedReloop = true;
    }
  }
  updateParams.forEach((key) => {
    if (isObject(currentParams[key]) && isObject(passedParams[key])) {
      extend(currentParams[key], passedParams[key]);
      if ((key === "navigation" || key === "pagination" || key === "scrollbar") && "enabled" in passedParams[key] && !passedParams[key].enabled) {
        destroyModule(key);
      }
    } else {
      const newValue = passedParams[key];
      if ((newValue === true || newValue === false) && (key === "navigation" || key === "pagination" || key === "scrollbar")) {
        if (newValue === false) {
          destroyModule(key);
        }
      } else {
        currentParams[key] = passedParams[key];
      }
    }
  });
  if (updateParams.includes("controller") && !needControllerInit && swiper.controller && swiper.controller.control && currentParams.controller && currentParams.controller.control) {
    swiper.controller.control = currentParams.controller.control;
  }
  if (changedParams.includes("children") && slides && virtual && currentParams.virtual.enabled) {
    virtual.slides = slides;
    virtual.update(true);
  }
  if (changedParams.includes("children") && slides && currentParams.loop) {
    loopNeedReloop = true;
  }
  if (needThumbsInit) {
    const initialized = thumbs.init();
    if (initialized)
      thumbs.update(true);
  }
  if (needControllerInit) {
    swiper.controller.control = currentParams.controller.control;
  }
  if (needPaginationInit) {
    if (swiper.isElement && (!paginationEl || typeof paginationEl === "string")) {
      paginationEl = document.createElement("div");
      paginationEl.classList.add("swiper-pagination");
      swiper.el.shadowEl.appendChild(paginationEl);
    }
    if (paginationEl)
      currentParams.pagination.el = paginationEl;
    pagination.init();
    pagination.render();
    pagination.update();
  }
  if (needScrollbarInit) {
    if (swiper.isElement && (!scrollbarEl || typeof scrollbarEl === "string")) {
      scrollbarEl = document.createElement("div");
      scrollbarEl.classList.add("swiper-scrollbar");
      swiper.el.shadowEl.appendChild(scrollbarEl);
    }
    if (scrollbarEl)
      currentParams.scrollbar.el = scrollbarEl;
    scrollbar.init();
    scrollbar.updateSize();
    scrollbar.setTranslate();
  }
  if (needNavigationInit) {
    if (swiper.isElement) {
      if (!nextEl || typeof nextEl === "string") {
        nextEl = document.createElement("div");
        nextEl.classList.add("swiper-button-next");
        swiper.el.shadowEl.appendChild(nextEl);
      }
      if (!prevEl || typeof prevEl === "string") {
        prevEl = document.createElement("div");
        prevEl.classList.add("swiper-button-prev");
        swiper.el.shadowEl.appendChild(prevEl);
      }
    }
    if (nextEl)
      currentParams.navigation.nextEl = nextEl;
    if (prevEl)
      currentParams.navigation.prevEl = prevEl;
    navigation.init();
    navigation.update();
  }
  if (changedParams.includes("allowSlideNext")) {
    swiper.allowSlideNext = passedParams.allowSlideNext;
  }
  if (changedParams.includes("allowSlidePrev")) {
    swiper.allowSlidePrev = passedParams.allowSlidePrev;
  }
  if (changedParams.includes("direction")) {
    swiper.changeDirection(passedParams.direction, false);
  }
  if (loopNeedDestroy || loopNeedReloop) {
    swiper.loopDestroy();
  }
  if (loopNeedEnable || loopNeedReloop) {
    swiper.loopCreate();
  }
  swiper.update();
}
function renderVirtual(swiperRef, slides, virtualData) {
  if (!virtualData)
    return null;
  const getSlideIndex = (index2) => {
    let slideIndex = index2;
    if (index2 < 0) {
      slideIndex = slides.length + index2;
    } else if (slideIndex >= slides.length) {
      slideIndex = slideIndex - slides.length;
    }
    return slideIndex;
  };
  const style2 = swiperRef.value.isHorizontal() ? {
    [swiperRef.value.rtlTranslate ? "right" : "left"]: `${virtualData.offset}px`
  } : {
    top: `${virtualData.offset}px`
  };
  const {
    from,
    to
  } = virtualData;
  const loopFrom = swiperRef.value.params.loop ? -slides.length : 0;
  const loopTo = swiperRef.value.params.loop ? slides.length * 2 : slides.length;
  const slidesToRender = [];
  for (let i = loopFrom; i < loopTo; i += 1) {
    if (i >= from && i <= to) {
      slidesToRender.push(slides[getSlideIndex(i)]);
    }
  }
  return slidesToRender.map((slide2) => {
    if (!slide2.props)
      slide2.props = {};
    if (!slide2.props.style)
      slide2.props.style = {};
    slide2.props.swiperRef = swiperRef;
    slide2.props.style = style2;
    return h(slide2.type, {
      ...slide2.props
    }, slide2.children);
  });
}
const updateOnVirtualData = (swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params.virtual || swiper.params.virtual && !swiper.params.virtual.enabled)
    return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();
  if (swiper.parallax && swiper.params.parallax && swiper.params.parallax.enabled) {
    swiper.parallax.setTranslate();
  }
};
const Swiper$1 = {
  name: "Swiper",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    wrapperTag: {
      type: String,
      default: "div"
    },
    modules: {
      type: Array,
      default: void 0
    },
    init: {
      type: Boolean,
      default: void 0
    },
    direction: {
      type: String,
      default: void 0
    },
    oneWayMovement: {
      type: Boolean,
      default: void 0
    },
    touchEventsTarget: {
      type: String,
      default: void 0
    },
    initialSlide: {
      type: Number,
      default: void 0
    },
    speed: {
      type: Number,
      default: void 0
    },
    cssMode: {
      type: Boolean,
      default: void 0
    },
    updateOnWindowResize: {
      type: Boolean,
      default: void 0
    },
    resizeObserver: {
      type: Boolean,
      default: void 0
    },
    nested: {
      type: Boolean,
      default: void 0
    },
    focusableElements: {
      type: String,
      default: void 0
    },
    width: {
      type: Number,
      default: void 0
    },
    height: {
      type: Number,
      default: void 0
    },
    preventInteractionOnTransition: {
      type: Boolean,
      default: void 0
    },
    userAgent: {
      type: String,
      default: void 0
    },
    url: {
      type: String,
      default: void 0
    },
    edgeSwipeDetection: {
      type: [Boolean, String],
      default: void 0
    },
    edgeSwipeThreshold: {
      type: Number,
      default: void 0
    },
    autoHeight: {
      type: Boolean,
      default: void 0
    },
    setWrapperSize: {
      type: Boolean,
      default: void 0
    },
    virtualTranslate: {
      type: Boolean,
      default: void 0
    },
    effect: {
      type: String,
      default: void 0
    },
    breakpoints: {
      type: Object,
      default: void 0
    },
    spaceBetween: {
      type: [Number, String],
      default: void 0
    },
    slidesPerView: {
      type: [Number, String],
      default: void 0
    },
    maxBackfaceHiddenSlides: {
      type: Number,
      default: void 0
    },
    slidesPerGroup: {
      type: Number,
      default: void 0
    },
    slidesPerGroupSkip: {
      type: Number,
      default: void 0
    },
    slidesPerGroupAuto: {
      type: Boolean,
      default: void 0
    },
    centeredSlides: {
      type: Boolean,
      default: void 0
    },
    centeredSlidesBounds: {
      type: Boolean,
      default: void 0
    },
    slidesOffsetBefore: {
      type: Number,
      default: void 0
    },
    slidesOffsetAfter: {
      type: Number,
      default: void 0
    },
    normalizeSlideIndex: {
      type: Boolean,
      default: void 0
    },
    centerInsufficientSlides: {
      type: Boolean,
      default: void 0
    },
    watchOverflow: {
      type: Boolean,
      default: void 0
    },
    roundLengths: {
      type: Boolean,
      default: void 0
    },
    touchRatio: {
      type: Number,
      default: void 0
    },
    touchAngle: {
      type: Number,
      default: void 0
    },
    simulateTouch: {
      type: Boolean,
      default: void 0
    },
    shortSwipes: {
      type: Boolean,
      default: void 0
    },
    longSwipes: {
      type: Boolean,
      default: void 0
    },
    longSwipesRatio: {
      type: Number,
      default: void 0
    },
    longSwipesMs: {
      type: Number,
      default: void 0
    },
    followFinger: {
      type: Boolean,
      default: void 0
    },
    allowTouchMove: {
      type: Boolean,
      default: void 0
    },
    threshold: {
      type: Number,
      default: void 0
    },
    touchMoveStopPropagation: {
      type: Boolean,
      default: void 0
    },
    touchStartPreventDefault: {
      type: Boolean,
      default: void 0
    },
    touchStartForcePreventDefault: {
      type: Boolean,
      default: void 0
    },
    touchReleaseOnEdges: {
      type: Boolean,
      default: void 0
    },
    uniqueNavElements: {
      type: Boolean,
      default: void 0
    },
    resistance: {
      type: Boolean,
      default: void 0
    },
    resistanceRatio: {
      type: Number,
      default: void 0
    },
    watchSlidesProgress: {
      type: Boolean,
      default: void 0
    },
    grabCursor: {
      type: Boolean,
      default: void 0
    },
    preventClicks: {
      type: Boolean,
      default: void 0
    },
    preventClicksPropagation: {
      type: Boolean,
      default: void 0
    },
    slideToClickedSlide: {
      type: Boolean,
      default: void 0
    },
    loop: {
      type: Boolean,
      default: void 0
    },
    loopedSlides: {
      type: Number,
      default: void 0
    },
    loopPreventsSliding: {
      type: Boolean,
      default: void 0
    },
    rewind: {
      type: Boolean,
      default: void 0
    },
    allowSlidePrev: {
      type: Boolean,
      default: void 0
    },
    allowSlideNext: {
      type: Boolean,
      default: void 0
    },
    swipeHandler: {
      type: Boolean,
      default: void 0
    },
    noSwiping: {
      type: Boolean,
      default: void 0
    },
    noSwipingClass: {
      type: String,
      default: void 0
    },
    noSwipingSelector: {
      type: String,
      default: void 0
    },
    passiveListeners: {
      type: Boolean,
      default: void 0
    },
    containerModifierClass: {
      type: String,
      default: void 0
    },
    slideClass: {
      type: String,
      default: void 0
    },
    slideActiveClass: {
      type: String,
      default: void 0
    },
    slideVisibleClass: {
      type: String,
      default: void 0
    },
    slideNextClass: {
      type: String,
      default: void 0
    },
    slidePrevClass: {
      type: String,
      default: void 0
    },
    wrapperClass: {
      type: String,
      default: void 0
    },
    lazyPreloaderClass: {
      type: String,
      default: void 0
    },
    lazyPreloadPrevNext: {
      type: Number,
      default: void 0
    },
    runCallbacksOnInit: {
      type: Boolean,
      default: void 0
    },
    observer: {
      type: Boolean,
      default: void 0
    },
    observeParents: {
      type: Boolean,
      default: void 0
    },
    observeSlideChildren: {
      type: Boolean,
      default: void 0
    },
    a11y: {
      type: [Boolean, Object],
      default: void 0
    },
    autoplay: {
      type: [Boolean, Object],
      default: void 0
    },
    controller: {
      type: Object,
      default: void 0
    },
    coverflowEffect: {
      type: Object,
      default: void 0
    },
    cubeEffect: {
      type: Object,
      default: void 0
    },
    fadeEffect: {
      type: Object,
      default: void 0
    },
    flipEffect: {
      type: Object,
      default: void 0
    },
    creativeEffect: {
      type: Object,
      default: void 0
    },
    cardsEffect: {
      type: Object,
      default: void 0
    },
    hashNavigation: {
      type: [Boolean, Object],
      default: void 0
    },
    history: {
      type: [Boolean, Object],
      default: void 0
    },
    keyboard: {
      type: [Boolean, Object],
      default: void 0
    },
    mousewheel: {
      type: [Boolean, Object],
      default: void 0
    },
    navigation: {
      type: [Boolean, Object],
      default: void 0
    },
    pagination: {
      type: [Boolean, Object],
      default: void 0
    },
    parallax: {
      type: [Boolean, Object],
      default: void 0
    },
    scrollbar: {
      type: [Boolean, Object],
      default: void 0
    },
    thumbs: {
      type: Object,
      default: void 0
    },
    virtual: {
      type: [Boolean, Object],
      default: void 0
    },
    zoom: {
      type: [Boolean, Object],
      default: void 0
    },
    grid: {
      type: [Object],
      default: void 0
    },
    freeMode: {
      type: [Boolean, Object],
      default: void 0
    },
    enabled: {
      type: Boolean,
      default: void 0
    }
  },
  emits: ["_beforeBreakpoint", "_containerClasses", "_slideClass", "_slideClasses", "_swiper", "_freeModeNoMomentumRelease", "activeIndexChange", "afterInit", "autoplay", "autoplayStart", "autoplayStop", "autoplayPause", "autoplayResume", "autoplayTimeLeft", "beforeDestroy", "beforeInit", "beforeLoopFix", "beforeResize", "beforeSlideChangeStart", "beforeTransitionStart", "breakpoint", "changeDirection", "click", "disable", "doubleTap", "doubleClick", "destroy", "enable", "fromEdge", "hashChange", "hashSet", "init", "keyPress", "lock", "loopFix", "momentumBounce", "navigationHide", "navigationShow", "navigationPrev", "navigationNext", "observerUpdate", "orientationchange", "paginationHide", "paginationRender", "paginationShow", "paginationUpdate", "progress", "reachBeginning", "reachEnd", "realIndexChange", "resize", "scroll", "scrollbarDragEnd", "scrollbarDragMove", "scrollbarDragStart", "setTransition", "setTranslate", "slideChange", "slideChangeTransitionEnd", "slideChangeTransitionStart", "slideNextTransitionEnd", "slideNextTransitionStart", "slidePrevTransitionEnd", "slidePrevTransitionStart", "slideResetTransitionStart", "slideResetTransitionEnd", "sliderMove", "sliderFirstMove", "slidesLengthChange", "slidesGridLengthChange", "snapGridLengthChange", "snapIndexChange", "swiper", "tap", "toEdge", "touchEnd", "touchMove", "touchMoveOpposite", "touchStart", "transitionEnd", "transitionStart", "unlock", "update", "virtualUpdate", "zoomChange"],
  setup(props, _ref) {
    let {
      slots: originalSlots,
      emit
    } = _ref;
    const {
      tag: Tag2,
      wrapperTag: WrapperTag
    } = props;
    const containerClasses = ref("swiper");
    const virtualData = ref(null);
    const breakpointChanged = ref(false);
    const initializedRef = ref(false);
    const swiperElRef = ref(null);
    const swiperRef = ref(null);
    const oldPassedParamsRef = ref(null);
    const slidesRef = {
      value: []
    };
    const oldSlidesRef = {
      value: []
    };
    const nextElRef = ref(null);
    const prevElRef = ref(null);
    const paginationElRef = ref(null);
    const scrollbarElRef = ref(null);
    const {
      params: swiperParams,
      passedParams
    } = getParams(props, false);
    getChildren(originalSlots, slidesRef, oldSlidesRef);
    oldPassedParamsRef.value = passedParams;
    oldSlidesRef.value = slidesRef.value;
    const onBeforeBreakpoint = () => {
      getChildren(originalSlots, slidesRef, oldSlidesRef);
      breakpointChanged.value = true;
    };
    swiperParams.onAny = function(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      emit(event, ...args);
    };
    Object.assign(swiperParams.on, {
      _beforeBreakpoint: onBeforeBreakpoint,
      _containerClasses(swiper, classes2) {
        containerClasses.value = classes2;
      }
    });
    const passParams = {
      ...swiperParams
    };
    delete passParams.wrapperClass;
    swiperRef.value = new Swiper$2(passParams);
    if (swiperRef.value.virtual && swiperRef.value.params.virtual.enabled) {
      swiperRef.value.virtual.slides = slidesRef.value;
      const extendWith = {
        cache: false,
        slides: slidesRef.value,
        renderExternal: (data) => {
          virtualData.value = data;
        },
        renderExternalUpdate: false
      };
      extend(swiperRef.value.params.virtual, extendWith);
      extend(swiperRef.value.originalParams.virtual, extendWith);
    }
    onUpdated(() => {
      if (!initializedRef.value && swiperRef.value) {
        swiperRef.value.emitSlidesClasses();
        initializedRef.value = true;
      }
      const {
        passedParams: newPassedParams
      } = getParams(props, false);
      const changedParams = getChangedParams(newPassedParams, oldPassedParamsRef.value, slidesRef.value, oldSlidesRef.value, (c) => c.props && c.props.key);
      oldPassedParamsRef.value = newPassedParams;
      if ((changedParams.length || breakpointChanged.value) && swiperRef.value && !swiperRef.value.destroyed) {
        updateSwiper({
          swiper: swiperRef.value,
          slides: slidesRef.value,
          passedParams: newPassedParams,
          changedParams,
          nextEl: nextElRef.value,
          prevEl: prevElRef.value,
          scrollbarEl: scrollbarElRef.value,
          paginationEl: paginationElRef.value
        });
      }
      breakpointChanged.value = false;
    });
    provide("swiper", swiperRef);
    watch(virtualData, () => {
      nextTick$1(() => {
        updateOnVirtualData(swiperRef.value);
      });
    });
    onMounted(() => {
      if (!swiperElRef.value)
        return;
      mountSwiper({
        el: swiperElRef.value,
        nextEl: nextElRef.value,
        prevEl: prevElRef.value,
        paginationEl: paginationElRef.value,
        scrollbarEl: scrollbarElRef.value,
        swiper: swiperRef.value
      }, swiperParams);
      emit("swiper", swiperRef.value);
    });
    onBeforeUnmount(() => {
      if (swiperRef.value && !swiperRef.value.destroyed) {
        swiperRef.value.destroy(true, false);
      }
    });
    function renderSlides(slides) {
      if (swiperParams.virtual) {
        return renderVirtual(swiperRef, slides, virtualData.value);
      }
      slides.forEach((slide2, index2) => {
        if (!slide2.props)
          slide2.props = {};
        slide2.props.swiperRef = swiperRef;
        slide2.props.swiperSlideIndex = index2;
      });
      return slides;
    }
    return () => {
      const {
        slides,
        slots
      } = getChildren(originalSlots, slidesRef, oldSlidesRef);
      return h(Tag2, {
        ref: swiperElRef,
        class: uniqueClasses(containerClasses.value)
      }, [slots["container-start"], h(WrapperTag, {
        class: wrapperClass(swiperParams.wrapperClass)
      }, [slots["wrapper-start"], renderSlides(slides), slots["wrapper-end"]]), needsNavigation(props) && [h("div", {
        ref: prevElRef,
        class: "swiper-button-prev"
      }), h("div", {
        ref: nextElRef,
        class: "swiper-button-next"
      })], needsScrollbar(props) && h("div", {
        ref: scrollbarElRef,
        class: "swiper-scrollbar"
      }), needsPagination(props) && h("div", {
        ref: paginationElRef,
        class: "swiper-pagination"
      }), slots["container-end"]]);
    };
  }
};
const SwiperSlide = {
  name: "SwiperSlide",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    swiperRef: {
      type: Object,
      required: false
    },
    swiperSlideIndex: {
      type: Number,
      default: void 0,
      required: false
    },
    zoom: {
      type: Boolean,
      default: void 0,
      required: false
    },
    lazy: {
      type: Boolean,
      default: false,
      required: false
    },
    virtualIndex: {
      type: [String, Number],
      default: void 0
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    let eventAttached = false;
    const {
      swiperRef
    } = props;
    const slideElRef = ref(null);
    const slideClasses = ref("swiper-slide");
    const lazyLoaded = ref(false);
    function updateClasses(swiper, el, classNames) {
      if (el === slideElRef.value) {
        slideClasses.value = classNames;
      }
    }
    onMounted(() => {
      if (!swiperRef || !swiperRef.value)
        return;
      swiperRef.value.on("_slideClass", updateClasses);
      eventAttached = true;
    });
    onBeforeUpdate(() => {
      if (eventAttached || !swiperRef || !swiperRef.value)
        return;
      swiperRef.value.on("_slideClass", updateClasses);
      eventAttached = true;
    });
    onUpdated(() => {
      if (!slideElRef.value || !swiperRef || !swiperRef.value)
        return;
      if (typeof props.swiperSlideIndex !== "undefined") {
        slideElRef.value.swiperSlideIndex = props.swiperSlideIndex;
      }
      if (swiperRef.value.destroyed) {
        if (slideClasses.value !== "swiper-slide") {
          slideClasses.value = "swiper-slide";
        }
      }
    });
    onBeforeUnmount(() => {
      if (!swiperRef || !swiperRef.value)
        return;
      swiperRef.value.off("_slideClass", updateClasses);
    });
    const slideData = computed(() => ({
      isActive: slideClasses.value.indexOf("swiper-slide-active") >= 0,
      isVisible: slideClasses.value.indexOf("swiper-slide-visible") >= 0,
      isPrev: slideClasses.value.indexOf("swiper-slide-prev") >= 0,
      isNext: slideClasses.value.indexOf("swiper-slide-next") >= 0
    }));
    provide("swiperSlide", slideData);
    const onLoad2 = () => {
      lazyLoaded.value = true;
    };
    return () => {
      return h(props.tag, {
        class: uniqueClasses(`${slideClasses.value}`),
        ref: slideElRef,
        "data-swiper-slide-index": typeof props.virtualIndex === "undefined" && swiperRef && swiperRef.value && swiperRef.value.params.loop ? props.swiperSlideIndex : props.virtualIndex,
        onLoadCapture: onLoad2
      }, props.zoom ? h("div", {
        class: "swiper-zoom-container",
        "data-swiper-zoom": typeof props.zoom === "number" ? props.zoom : void 0
      }, [slots.default && slots.default(slideData.value), props.lazy && !lazyLoaded.value && h("div", {
        class: "swiper-lazy-preloader"
      })]) : [slots.default && slots.default(slideData.value), props.lazy && !lazyLoaded.value && h("div", {
        class: "swiper-lazy-preloader"
      })]);
    };
  }
};
const modules = [Pagination, Autoplay, Controller];
const __vue_sfc__$8 = defineComponent({
  name: createNamespace("Swiper")[0],
  components: {
    FanAspectRatio: stdin_default$B,
    FanImage: stdin_default$y,
    Swiper: Swiper$1,
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
      const { autoplay, type, loop: loop2, autoHeight, vertical } = props;
      return {
        autoplay: !autoplay ? false : { delay: autoplay, disableOnInteraction: false },
        autoHeight,
        loop: loop2,
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
      nextTick$1(() => {
        swiperVisible.value = true;
      });
    };
    const updateAutoHeight2 = () => {
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
      var _a2;
      if (val === prevVal)
        return;
      if (val !== props.current) {
        context.emit("update:current", val);
        context.emit("change", val);
      }
      (_a2 = refSwiper.value) == null ? void 0 : _a2.slideTo(val);
    });
    const showSlot = computed(() => {
      return context.slots.default;
    });
    const onClick2 = (e, i) => {
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
      onClick: onClick2,
      updateAutoHeight: updateAutoHeight2
    };
  }
});
function __vue_render__$8(_ctx, _cache) {
  const _component_FanImage = resolveComponent("FanImage");
  const _component_SwiperSlide = resolveComponent("SwiperSlide");
  const _component_Swiper = resolveComponent("Swiper", true);
  const _component_FanAspectRatio = resolveComponent("FanAspectRatio");
  return _ctx.list && _ctx.list.length ? (openBlock(), createBlock(_component_FanAspectRatio, {
    key: 0,
    "aspect-ratio": _ctx.swiperAspectRatio
  }, {
    default: withCtx(() => [
      _ctx.swiperVisible ? (openBlock(), createBlock(_component_Swiper, mergeProps({
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
        default: withCtx(() => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.list, (item, index2) => {
              return openBlock(), createBlock(
                _component_SwiperSlide,
                { key: index2 },
                {
                  default: withCtx(() => [
                    _ctx.showSlot ? renderSlot(_ctx.$slots, "default", {
                      key: 0,
                      item,
                      index: index2,
                      active: index2 === _ctx.innerCurrent
                    }) : (openBlock(), createBlock(_component_FanImage, {
                      key: 1,
                      src: item.cover,
                      mode: _ctx.autoHeight ? "widthFix" : "aspectFill",
                      "aspect-ratio": _ctx.autoHeight ? 0 : _ctx.aspectRatio,
                      radius: _ctx.innerRadius,
                      onClick: ($event) => _ctx.onClick(item, index2)
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
          _ctx.indicator ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              style: normalizeStyle({ "--swiper-pagination-color": _ctx.indicatorActiveColor }),
              class: "swiper-pagination",
              slot: "pagination"
            },
            null,
            4
            /* STYLE */
          )) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["modules", "class", "onSwiper", "onSlideChange"])) : createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["aspect-ratio"])) : createCommentVNode("v-if", true);
}
__vue_sfc__$8.render = __vue_render__$8;
var stdin_default$9 = __vue_sfc__$8;
const Swiper2 = stdin_default$9;
const switchSfc = "";
const __vue_sfc__$7 = defineComponent({
  name: createNamespace("Switch")[0],
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#04BE02"
    },
    size: {
      type: [String, Number],
      default: 30
    }
  },
  setup(props, { emit }) {
    const innerShow = ref(props.modelValue);
    watch(() => props.modelValue, (val) => innerShow.value = val);
    const theStyle = computed(() => {
      const { size, color } = props;
      const s = `font-size: ${transformSize(
        size
      )};--fan-switch--color: ${color};`;
      return s;
    });
    const onClick2 = () => {
      if (props.disabled)
        return;
      innerShow.value = innerShow.value ? false : true;
      emit("update:modelValue", innerShow.value);
      emit("change", innerShow.value);
    };
    return { innerShow, theStyle, onClick: onClick2 };
  }
});
const _hoisted_1$4 = /* @__PURE__ */ createElementVNode(
  "div",
  { class: "fan-switch__node" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_2$2 = [
  _hoisted_1$4
];
function __vue_render__$7(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["fan-switch", [{ "fan-switch__on": _ctx.innerShow }, { "fan-switch__d": _ctx.disabled }]]),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
      style: normalizeStyle(_ctx.theStyle)
    },
    [..._hoisted_2$2],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__$7.render = __vue_render__$7;
var stdin_default$8 = __vue_sfc__$7;
const Switch = stdin_default$8;
const tabPanelSfc = "";
const __vue_sfc__$6 = defineComponent({
  name: createNamespace("TabPanel")[0],
  setup() {
    const uniqueId = createUniqueId({ prefix: "fanTabPanel" });
    const _this = getCurrentInstance();
    const tabsContent = inject("fanTabsContent");
    const tabsActiveId = inject("fanTabsContentActiveId", ref(0));
    const active = computed(() => tabsActiveId.value === uniqueId);
    onMounted(() => {
      tabsContent && tabsContent.add(_this);
    });
    const theStyle = computed(() => {
      if (!(tabsContent == null ? void 0 : tabsContent.width.value))
        return "";
      return `width:${tabsContent.width.value}px;`;
    });
    return { uniqueId, active, theStyle };
  }
});
function __vue_render__$6(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      style: normalizeStyle(_ctx.theStyle),
      class: normalizeClass(["fan-tab-panel", { "fan-tab-panel--active": _ctx.active }])
    },
    [
      renderSlot(_ctx.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__$6.render = __vue_render__$6;
var stdin_default$7 = __vue_sfc__$6;
const TabPanel = stdin_default$7;
const tabsSfc = "";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async$1 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const __vue_sfc__$5 = defineComponent({
  name: createNamespace("Tabs")[0],
  props: {
    /**
     * 数据
     */
    tabs: Array,
    /**
     * 绑定当前选中标签的标识符，可以结合 valueProp 设置成 tabs-item 中指定字段
     * @default tabs-index
     */
    active: {
      type: [Number, String],
      default: 0
    },
    /**
     * tab-title 取值，默认直接 tabs-item
     */
    labelProp: String,
    /**
     * label/标题左右padding
     */
    labelPad: {
      type: [Number, String],
      default: 12
    },
    /**
     * 两侧padding，默认 labelPad / 2
     */
    sidePad: [String, Number],
    /**
     * active 的值的来源
     */
    valueProp: String,
    /**
     * 滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动
     */
    scrollThreshold: {
      type: Number,
      default: 4
    },
    // 中心偏移，单位 px，当其值在 0 < x < 1 时为容器盒子宽度的占比，可以为负数
    offCentering: {
      type: Number,
      default: 0
    },
    /**
     * 是否开启左侧收缩布局
     */
    shrink: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: 40
    },
    bg: {
      type: String,
      default: "white"
    },
    color: {
      type: String
    },
    activeColor: {
      type: String
    },
    /**
     * 选中时是否加粗放大
     */
    activeStrong: {
      type: [Boolean, String],
      default: false
    },
    activeStyle: [String, Object],
    fontSize: {
      type: [String, Number]
    },
    /**
     * 选中内容是否可以超出盒子
     */
    activeOut: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示指示器
     */
    indicator: {
      type: [Boolean, String],
      default: true
    },
    indicatorHeight: {
      type: [String, Number],
      default: 2
    },
    indicatorWidth: {
      type: [String, Number],
      default: "auto"
    },
    indicatorLeft: {
      type: Number,
      default: 0
    },
    indicatorColor: String,
    indicatorStyle: [String, Object],
    /**
     * 是否显示边框，true = 'bottom'，设置为 false 则不显示
     */
    border: {
      type: [Boolean, String],
      default: true,
      validator: (value) => [true, false, "bottom", "top", "vertical"].includes(value)
    }
  },
  components: { FanScrollView: stdin_default$s },
  emits: ["update:active", "change", "click"],
  setup(props, context) {
    const uniqueId = createUniqueId({ prefix: "fanTabs" });
    const items = computed(() => {
      return (props.tabs || []).map((a, i) => {
        return __spreadProps(__spreadValues({}, typeof a === "object" ? a : null), {
          label: !props.labelProp ? a : a[props.labelProp],
          value: !props.valueProp ? i : a[props.valueProp]
        });
      });
    });
    const itemRects = ref([]);
    const scrollWidth = ref(320);
    const _this = getCurrentInstance();
    const getRects = () => __async$1(this, null, function* () {
      if (items.value.length) {
        itemRects.value = yield getElementBounding({
          selector: ".fan2-tab__in",
          selectAll: true,
          scope: _this
        });
      } else if (itemRects.value.length)
        itemRects.value = [];
      const scrollRect = yield getElementBounding({
        selector: "#" + uniqueId,
        scope: _this
      });
      if (scrollRect == null ? void 0 : scrollRect.width)
        scrollWidth.value = scrollRect.width + (scrollRect.left || 0) * 2;
    });
    const activeIndex = computed(() => {
      const i = items.value.findIndex((a) => a.value === props.active);
      return i !== -1 ? i : 0;
    });
    const theStyle = computed(() => {
      const { height, bg, color, fontSize, activeColor, labelPad, sidePad } = props;
      const tabPad = transformSize(labelPad);
      const sPad = !sidePad ? `calc(${tabPad} / 2)` : transformSize(sidePad);
      let s = `--fan2-tabs-height:${transformSize(
        height
      )};--fan2-tab-pad:${tabPad};--fan2-tabs-side-pad:${sPad};`;
      if (color)
        s += `--fan2-tabs-color:${color};`;
      if (activeColor)
        s += `--fan2-tabs-active-color:${activeColor};`;
      if (bg)
        s += `background:${bg};`;
      if (fontSize)
        s += `font-size:${transformSize(fontSize)};`;
      return s;
    });
    const theActiveStyle = computed(
      () => transformStyleSize(props.activeStyle)
    );
    const zsqStyle = computed(() => {
      const {
        indicator,
        indicatorHeight,
        indicatorWidth,
        indicatorColor,
        indicatorStyle,
        activeStrong,
        indicatorLeft
      } = props;
      if (!indicator)
        return "";
      let s = "";
      const tab = itemRects.value[activeIndex.value];
      const { left = 6, width = 52 } = tab || {};
      s += `transform:translateX(${left + width / 2 - indicatorLeft}px) translateX(calc(-50%));`;
      if (indicatorWidth) {
        if (indicatorWidth === "auto")
          s += `width:calc((${width}px - var(--fan2-tab-pad) * 2) * ${activeStrong ? 1.13 : 1});`;
        else
          s += `width:calc(${transformSize(indicatorWidth)} * ${activeStrong ? 1.13 : 1});`;
      }
      if (indicatorHeight) {
        const h2 = transformSize(indicatorHeight);
        s += `height:${h2};top:calc(var(--fan2-tabs-height) - ${h2});`;
      }
      if (indicatorColor)
        s += `background-color:${indicatorColor};`;
      return transformStyleSize(indicatorStyle) + s;
    });
    const borderTop = computed(() => {
      return ["top", "vertical"].includes(props.border);
    });
    const borderBottom = computed(() => {
      return [true, "bottom", "vertical"].includes(props.border);
    });
    const scrollable = computed(() => {
      const length = items.value.length;
      const over = length > props.scrollThreshold;
      if (length !== itemRects.value.length)
        return over;
      const width = itemRects.value.reduce((sum, item) => {
        return sum + item.width;
      }, 0);
      return over && width > scrollWidth.value;
    });
    const scrollLeft = ref(0);
    const scrollToItem = (index2) => {
      var _a2;
      if (!scrollable.value)
        return;
      const tab = itemRects.value[index2];
      if (!tab)
        return;
      let padding = ((_a2 = itemRects.value[0]) == null ? void 0 : _a2.left) || 0;
      padding = 0;
      const offset = Math.abs(props.offCentering) < 1 ? scrollWidth.value * props.offCentering : props.offCentering;
      scrollLeft.value = tab.left - padding + tab.width / 2 - scrollWidth.value / 2 - offset;
    };
    watch(activeIndex, (val) => {
      scrollToItem(val);
    });
    const itemClick = (index2) => {
      const item = items.value[index2];
      context.emit("click", props.tabs[index2], index2);
      if (item.value !== props.active) {
        context.emit("update:active", item.value);
        context.emit("change", props.tabs[index2], index2);
      }
    };
    onMounted(() => getRects());
    watch([items, scrollable], () => {
      nextTick$1(getRects);
    });
    return {
      uniqueId,
      items,
      scrollable,
      scrollLeft,
      theStyle,
      theActiveStyle,
      zsqStyle,
      borderTop,
      borderBottom,
      itemClick
    };
  }
});
const _hoisted_1$3 = ["id"];
const _hoisted_2$1 = /* @__PURE__ */ createElementVNode(
  "div",
  { class: "fan2-tab__pad" },
  null,
  -1
  /* HOISTED */
);
const _hoisted_3$1 = ["onClick"];
const _hoisted_4$1 = { class: "fan2-tab__in" };
const _hoisted_5$1 = { key: 0 };
const _hoisted_6$1 = /* @__PURE__ */ createElementVNode(
  "div",
  { class: "fan2-tab__pad" },
  null,
  -1
  /* HOISTED */
);
function __vue_render__$5(_ctx, _cache) {
  const _component_FanScrollView = resolveComponent("FanScrollView");
  return openBlock(), createElementBlock("div", {
    id: _ctx.uniqueId,
    style: normalizeStyle(_ctx.theStyle),
    class: normalizeClass(["fan2-tabs", {
      "fan-hairline--top": _ctx.borderTop,
      "fan-hairline--bottom": _ctx.borderBottom,
      "fan2-tabs--flex": !_ctx.scrollable && !_ctx.shrink,
      "fan2-tabs--out": _ctx.activeOut
    }])
  }, [
    createVNode(_component_FanScrollView, {
      style: normalizeStyle([{ "position": "relative" }, _ctx.activeOut ? { overflow: "visible" } : ""]),
      height: "calc(100% + 17px)",
      "scroll-x": true,
      "scroll-y": _ctx.activeOut,
      "scroll-left": _ctx.scrollLeft,
      "enable-flex": !_ctx.scrollable,
      scrollable: _ctx.scrollable,
      scrollWithAnimation: true
    }, {
      default: withCtx(() => [
        _hoisted_2$1,
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(_ctx.items, (item, index2) => {
            return openBlock(), createElementBlock("div", {
              key: index2,
              style: normalizeStyle(item.value === _ctx.active ? _ctx.theActiveStyle : ""),
              class: normalizeClass(["fan2-tab", {
                "fan2-tab--active": item.value === _ctx.active,
                "fan2-tab--strong": _ctx.activeStrong,
                "fan2-tab--out": _ctx.activeOut
              }]),
              onClick: ($event) => _ctx.itemClick(index2)
            }, [
              createElementVNode("div", _hoisted_4$1, [
                !_ctx.$slots.default ? (openBlock(), createElementBlock(
                  "span",
                  _hoisted_5$1,
                  toDisplayString(item.label),
                  1
                  /* TEXT */
                )) : renderSlot(_ctx.$slots, "default", {
                  key: 1,
                  item,
                  index: index2,
                  active: item.value === _ctx.active
                })
              ])
            ], 14, _hoisted_3$1);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        _hoisted_6$1,
        createElementVNode(
          "div",
          {
            style: normalizeStyle(_ctx.zsqStyle),
            class: "fan2-tabs__indicator"
          },
          null,
          4
          /* STYLE */
        )
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["scroll-y", "scroll-left", "enable-flex", "scrollable", "style"])
  ], 14, _hoisted_1$3);
}
__vue_sfc__$5.render = __vue_render__$5;
var stdin_default$6 = __vue_sfc__$5;
const Tabs = stdin_default$6;
const tabsContentSfc = "";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const __vue_sfc__$4 = defineComponent({
  name: createNamespace("TabsContent")[0],
  props: {
    active: {
      type: Number,
      default: 0
    },
    swipeable: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:active", "change"],
  setup(props, context) {
    const tabIndex = ref(0);
    const width = ref(0);
    const state = reactive({
      touchMovedX: 0,
      animation: true
    });
    watch(
      () => props.active,
      (val) => {
        if (val === tabIndex.value)
          return;
        tabIndex.value = val;
      },
      { immediate: true }
    );
    watch(tabIndex, (val) => {
      if (props.active === val)
        return;
      context.emit("update:active", val);
      context.emit("change", val);
    });
    const _this = getCurrentInstance();
    const children = reactive([]);
    const sortChildren2 = () => {
      const _children = getChildrenComponents(_this, "FanTabPanel");
      children.sort((a, b) => {
        let aIndex = -1;
        let bIndex = -1;
        for (let i = 0, l = _children.length; i < l; i++) {
          const { uniqueId } = _children[i];
          if (uniqueId === a.proxy.uniqueId)
            aIndex = i;
          if (uniqueId === b.proxy.uniqueId)
            bIndex = i;
          if (aIndex !== -1 && bIndex !== -1)
            break;
        }
        return aIndex - bIndex;
      });
    };
    const add = (vm) => {
      const _i = children.findIndex((a) => a === vm);
      _i === -1 ? children.push(vm) : children.splice(_i, 1, vm);
      sortChildren2();
    };
    const activeId = computed(() => {
      var _a2;
      return (_a2 = children[tabIndex.value]) == null ? void 0 : _a2.proxy.uniqueId;
    });
    provide("fanTabsContent", { add, width });
    provide("fanTabsContentActiveId", activeId);
    const wrapStyle = computed(() => {
      const x = state.touchMovedX;
      const i = tabIndex.value;
      let s = `transition-duration:${state.animation ? "300ms" : "0ms"};`;
      if (width.value) {
        s += `transform:translate3d(${-width.value * i + x}px,0,0);width:${width.value * children.length}px;`;
      } else {
        s += `transform:translate3d(calc(-${100 * i}% + ${x}px),0,0);`;
      }
      return s;
    });
    onMounted(() => __async(this, null, function* () {
      const rect = yield getElementBounding({
        selector: ".fan-tabs-content",
        scope: _this
      });
      if (rect == null ? void 0 : rect.width)
        width.value = Math.min(rect.width, getSystemInfo().windowWidth);
    }));
    const getMoved = (p1, p2) => {
      const x = p2.clientX - p1.clientX;
      const y = p2.clientY - p1.clientY;
      return { x, y };
    };
    let $p1;
    let $p2;
    let $p1T;
    let $direction;
    const touchStart = (e) => {
      if (!props.swipeable)
        return;
      $p1 = null;
      if (e.touches) {
        $p1 = e.touches[0];
        $p1T = Date.now();
      }
    };
    const touchMove = (e) => {
      if (!props.swipeable)
        return;
      if (e.touches && $p1) {
        $p2 = e.touches[0];
        const { x, y } = getMoved($p1, $p2);
        if (!$direction) {
          $direction = Math.abs(x) > Math.abs(y) ? "horizontal" : "vertical";
        }
        if ($direction === "horizontal") {
          e.preventDefault();
          state.touchMovedX = x;
          state.animation = false;
        }
      }
    };
    const touchEnd = (e) => {
      if (!props.swipeable)
        return;
      if (e.touches && $p1 && $direction === "horizontal") {
        let { x } = getMoved($p1, e.touches[0] || $p2);
        const absX = Math.abs(x);
        if (absX > 150 || absX > 50 && Date.now() - $p1T < 500) {
          let i = x > 0 ? tabIndex.value - 1 : tabIndex.value + 1;
          i = Math.max(0, Math.min(children.length - 1, i));
          if (i !== tabIndex.value)
            tabIndex.value = i;
        } else {
          x = 0;
        }
      }
      state.touchMovedX = 0;
      state.animation = true;
      $direction = null;
      $p1 = null;
    };
    const touchCancel = () => {
      if (!props.swipeable)
        return;
      state.animation = true;
      state.touchMovedX = 0;
      $direction = null;
      $p1 = null;
    };
    return { wrapStyle, touchStart, touchMove, touchEnd, touchCancel };
  }
});
const _hoisted_1$2 = { class: "fan-tabs-content" };
function __vue_render__$4(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createElementVNode(
      "div",
      {
        style: normalizeStyle(_ctx.wrapStyle),
        class: "fan-tabs-content__in",
        onTouchstart: _cache[0] || (_cache[0] = (...args) => _ctx.touchStart && _ctx.touchStart(...args)),
        onTouchmove: _cache[1] || (_cache[1] = (...args) => _ctx.touchMove && _ctx.touchMove(...args)),
        onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx.touchEnd && _ctx.touchEnd(...args)),
        onTouchcancel: _cache[3] || (_cache[3] = (...args) => _ctx.touchCancel && _ctx.touchCancel(...args))
      },
      [
        renderSlot(_ctx.$slots, "default")
      ],
      36
      /* STYLE, NEED_HYDRATION */
    )
  ]);
}
__vue_sfc__$4.render = __vue_render__$4;
var stdin_default$5 = __vue_sfc__$4;
const TabsContent = stdin_default$5;
const tagSfc = "";
const __vue_sfc__$3 = defineComponent({
  name: createNamespace("Tag")[0],
  emits: ["click"],
  props: {
    color: String,
    bg: String,
    width: String,
    height: String,
    margin: String,
    padding: String,
    textSize: {
      type: [String, Number]
    },
    textColor: String,
    bold: [Boolean, String],
    /**
     * 是否为朴素模式
     */
    plain: {
      type: Boolean,
      default: false
    },
    /**
     * 是否有边框，plain朴素时生效
     */
    border: {
      type: [Boolean, String],
      default: true
    },
    /**
     * 边框颜色，默认为 color
     */
    borderColor: String,
    /**
     * 圆角
     */
    radius: [String, Number],
    /**
     * 是否使用 0.5px 边框
     */
    hairline: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const theStyle = computed(() => {
      const {
        color,
        bg: background,
        plain,
        textSize,
        textColor,
        radius,
        borderColor
      } = props;
      const obj = {};
      ["width", "height", "padding", "margin"].forEach(
        (k) => props[k] && (obj[k] = props[k])
      );
      const bg = background || (plain ? "white" : color);
      if (bg)
        obj["--fan2-tag-bg"] = bg;
      const c = textColor || (plain ? color || "var(--fan-primary-color)" : !color ? "" : "white");
      if (c)
        obj["--fan2-tag-text-color"] = c;
      if (textSize)
        obj.fontSize = transformSize(textSize);
      if (plain && (color || borderColor))
        obj["--fan2-tag-border-color"] = borderColor || color;
      if (radius || radius === 0)
        obj["--fan2-tag-border-radius"] = radius;
      return transformStyleSize(obj);
    });
    const inStyle = computed(() => {
      const s = "max-width:100%;";
      const size = props.textSize;
      if (!isCssRelativeSize(size) && /(Chrome|Safari)/.test(window == null ? void 0 : window.navigator.userAgent)) {
        let zoom = parseFloat(size, 10) / 12;
        if (zoom < 1)
          return `${s}font-size:${transformSize("12px")};zoom:${zoom};`;
      }
      return s;
    });
    const onClick2 = (e) => {
      emit("click", e);
    };
    return { theStyle, inStyle, onClick: onClick2 };
  }
});
const _hoisted_1$1 = {
  key: 0,
  class: "fan2-tag__hairline"
};
function __vue_render__$3(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["fan2-tag", {
        "fan2-tag--noborder": !_ctx.border,
        "fan2-tag--hairline": _ctx.hairline,
        "fan2-tag--plain": _ctx.plain,
        "fan2-tag--bold": _ctx.bold
      }]),
      style: normalizeStyle(_ctx.theStyle),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    [
      createCommentVNode(" fix：uniapp-App-伪元素超不出100% "),
      _ctx.hairline ? (openBlock(), createElementBlock("div", _hoisted_1$1)) : createCommentVNode("v-if", true),
      createElementVNode(
        "div",
        {
          style: normalizeStyle(_ctx.inStyle),
          class: "fan-ellipsis"
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        4
        /* STYLE */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__$3.render = __vue_render__$3;
var stdin_default$4 = __vue_sfc__$3;
const Tag = stdin_default$4;
const textSfc = "";
const __vue_sfc__$2 = defineComponent({
  name: createNamespace("Text")[0],
  options: {
    // https://uniapp.dcloud.io/matter.html#mp
    virtualHost: true
  },
  components: {
    FanIcon: stdin_default$N
  },
  props: {
    // 是否显示内层白框
    inner: {
      type: [Boolean, String],
      default: false
    },
    innerRadius: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    textSize: {
      type: [String, Number],
      default: "14"
    },
    bold: {
      type: [Boolean, Number, String],
      default: false
    },
    align: {
      type: String,
      default: "left"
      // center, right
    },
    color: {
      type: String
    },
    // 行高
    lineHeight: {
      type: [String, Number],
      default: 1.4
    },
    // 图标前缀
    prefixIcon: {
      type: String
    },
    iconSize: {
      type: [String, Number]
    },
    iconRadius: {
      type: String,
      default: "4px"
    },
    iconColor: String,
    // 图标与文字间距
    iconSpace: {
      type: [String, Number]
    },
    // 最多展示行数，超出显示省略号，目前只支持 1，2，3
    line: Number
  },
  setup(props) {
    const theStyle = computed(() => {
      const {
        customStyle,
        textSize,
        bold,
        align,
        color,
        lineHeight,
        iconSize,
        iconSpace
      } = props;
      let s = "";
      if (!isCssRelativeSize(textSize) && /(Chrome|Safari)/.test(window == null ? void 0 : window.navigator.userAgent)) {
        let zoom = parseFloat(textSize, 10) / 12;
        if (zoom < 1)
          s += `zoom:${zoom};`;
      }
      let theIconSize = transformSize(iconSize);
      const fsize = transformSize(textSize);
      const fsizeValue = parseFloat(fsize, 10);
      const lh = String(lineHeight).includes("px") ? parseFloat(String(lineHeight)) / fsizeValue : lineHeight;
      if (fsizeValue) {
        if (!theIconSize) {
          const unit = fsize.replace(/[0-9.]/g, "");
          theIconSize = fsizeValue * 1.2 + unit;
        }
        s += `font-size:${fsize};`;
      }
      if (lh) {
        s += `line-height:${lh};`;
      }
      if (bold) {
        if (typeof bold === "number" || typeof bold === "string" && Number(bold) >= 100) {
          s += `font-weight:${bold};`;
        } else {
          s += `font-weight:var(--fan-text-mbold);`;
        }
      }
      if (align) {
        s += `text-align:${align};`;
      }
      if (color) {
        s += `color:${color};`;
      }
      let ibox = "";
      if (iconSpace)
        ibox += `margin-right:${transformSize(iconSpace)};`;
      return {
        style: transformStyleSize(customStyle) + s,
        iconSize: theIconSize,
        ibox
      };
    });
    return { theStyle };
  }
});
function __vue_render__$2(_ctx, _cache) {
  const _component_FanIcon = resolveComponent("FanIcon");
  return openBlock(), createElementBlock(
    "div",
    {
      style: normalizeStyle(_ctx.theStyle.style),
      class: "fan-bg-container fan2-text"
    },
    [
      createElementVNode(
        "div",
        {
          class: normalizeClass(["fan2-text__inner", [
            { box: _ctx.inner },
            { "fan-ellipsis": _ctx.line === 1 },
            { "fan-multi-ellipsis--l2": _ctx.line === 2 },
            { "fan-multi-ellipsis--l3": _ctx.line === 3 }
          ]]),
          style: normalizeStyle({ borderRadius: _ctx.innerRadius })
        },
        [
          createCommentVNode(" 小程序文本外的属性不识别 em 尺寸 "),
          _ctx.prefixIcon ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: "fan2-text__icon",
              style: normalizeStyle(_ctx.theStyle.ibox)
            },
            [
              createVNode(_component_FanIcon, {
                name: _ctx.prefixIcon,
                size: _ctx.theStyle.iconSize,
                color: _ctx.iconColor,
                "vertical-align": "middle",
                "custom-style": { borderRadius: _ctx.iconRadius }
              }, null, 8, ["name", "size", "color", "custom-style"])
            ],
            4
            /* STYLE */
          )) : createCommentVNode("v-if", true),
          createElementVNode(
            "span",
            {
              "user-select": "",
              selectable: "",
              space: "nbsp",
              class: "fan2-text__span",
              style: normalizeStyle({ verticalAlign: !_ctx.prefixIcon ? "baseline" : "middle" })
            },
            [
              createTextVNode(
                toDisplayString(_ctx.text),
                1
                /* TEXT */
              ),
              renderSlot(_ctx.$slots, "default")
            ],
            4
            /* STYLE */
          )
        ],
        6
        /* CLASS, STYLE */
      )
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__$2.render = __vue_render__$2;
var stdin_default$3 = __vue_sfc__$2;
const Text = stdin_default$3;
const Textarea = stdin_default$H;
const userPanelSfc = "";
const __vue_sfc__$1 = defineComponent({
  name: createNamespace("UserPanel")[0],
  components: { FanImage: stdin_default$y, FanLoading: stdin_default$M, FanRichText: stdin_default$c },
  props: {
    hasLogin: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: "https://img.dac6.cn/resource/avatar.png"
    },
    name: {
      type: String,
      default: "用户昵称"
    },
    role: String,
    vip: Boolean,
    desc: String
  },
  emits: ["click"],
  setup() {
  }
});
const _hoisted_1 = { class: "fan-upanel" };
const _hoisted_2 = {
  key: 0,
  class: "fan-flex-1 fan-flex"
};
const _hoisted_3 = {
  key: 1,
  class: "fan-flex-1"
};
const _hoisted_4 = {
  class: "fan-flex fan-align-center",
  style: { "flex-wrap": "nowrap" }
};
const _hoisted_5 = { class: "fan-ellipsis fan-upanel__name" };
const _hoisted_6 = {
  key: 2,
  class: "fan-flex-1"
};
const _hoisted_7 = /* @__PURE__ */ createElementVNode(
  "div",
  {
    class: "fan-flex fan-align-center",
    style: { "flex-wrap": "nowrap" }
  },
  [
    /* @__PURE__ */ createElementVNode("div", { class: "fan-ellipsis fan-upanel__name" }, "点击登录")
  ],
  -1
  /* HOISTED */
);
const _hoisted_8 = /* @__PURE__ */ createElementVNode(
  "div",
  { class: "fan-upanel__desc" },
  "登录后解锁更多实用功能",
  -1
  /* HOISTED */
);
const _hoisted_9 = [
  _hoisted_7,
  _hoisted_8
];
function __vue_render__$1(_ctx, _cache) {
  const _component_FanImage = resolveComponent("FanImage");
  const _component_FanLoading = resolveComponent("FanLoading");
  const _component_FanRichText = resolveComponent("FanRichText");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", {
      class: "fan-flex-center fan-upanel__in",
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
    }, [
      createVNode(_component_FanImage, {
        width: "60px",
        height: "60px",
        src: _ctx.avatar,
        mode: "aspectFill",
        radius: "50%",
        style: { marginRight: "15px" }
      }, null, 8, ["src"]),
      _ctx.hasLogin && _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_2, [
        createVNode(_component_FanLoading, {
          type: "line",
          color: "var(--fan-primary-color)"
        })
      ])) : _ctx.hasLogin ? (openBlock(), createElementBlock("div", _hoisted_3, [
        createElementVNode("div", _hoisted_4, [
          createElementVNode(
            "div",
            _hoisted_5,
            toDisplayString(_ctx.name),
            1
            /* TEXT */
          ),
          _ctx.role ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(["fan-upanel__role", { vip: _ctx.vip }])
            },
            toDisplayString(_ctx.role),
            3
            /* TEXT, CLASS */
          )) : createCommentVNode("v-if", true)
        ]),
        _ctx.desc ? (openBlock(), createBlock(_component_FanRichText, {
          key: 0,
          class: "fan-upanel__desc",
          content: _ctx.desc
        }, null, 8, ["content"])) : createCommentVNode("v-if", true)
      ])) : (openBlock(), createElementBlock("div", _hoisted_6, [..._hoisted_9]))
    ])
  ]);
}
__vue_sfc__$1.render = __vue_render__$1;
var stdin_default$2 = __vue_sfc__$1;
const UserPanel = stdin_default$2;
const viewSfc = "";
const __vue_sfc__ = defineComponent({
  name: createNamespace("View")[0],
  props: {
    className: String,
    width: String,
    height: String,
    position: String,
    flex: {
      type: [Boolean, String],
      default: false
    },
    flex1: {
      type: [Boolean, String],
      default: false
    },
    inline: {
      type: [Boolean, String],
      default: false
    },
    direction: {
      type: String,
      default: "row",
      validator: (value) => ["row", "column"].includes(value)
    },
    align: {
      type: String,
      default: "center",
      validator: (value) => ["flex-start", "center", "flex-end"].includes(value)
    },
    justify: {
      type: String,
      validator: (value) => [
        "flex-start",
        "center",
        "flex-end",
        "space-between",
        "space-evenly",
        "space-around"
      ].includes(value)
    },
    bg: String,
    bgFit: {
      type: String,
      default: "widthFix",
      validator: (value) => ["widthFix"].includes(value)
    },
    border: String,
    radius: String,
    padding: String,
    margin: String
  },
  emits: ["click"],
  setup(props) {
    const theStyle = computed(() => {
      const {
        position,
        flex,
        flex1,
        inline,
        direction,
        align,
        justify,
        bg,
        width,
        height,
        border,
        radius,
        padding,
        margin
      } = props;
      const obj = {};
      if (flex) {
        obj.display = inline ? "inline-flex" : "flex";
        if (direction)
          obj.flexDirection = direction;
        if (align)
          obj.alignItems = align;
        if (justify)
          obj.justifyContent = justify;
      } else if (inline) {
        obj.display = "inline";
      }
      if (flex1)
        obj.flex = 1;
      if (position)
        obj.position = position;
      if (bg)
        obj.background = bg;
      if (width)
        obj.width = width;
      if (height)
        obj.height = height;
      if (padding)
        obj.padding = padding;
      if (margin)
        obj.margin = margin;
      if (border)
        obj.border = border;
      if (radius)
        obj.borderRadius = radius;
      return transformStyleSize(obj);
    });
    return { theStyle };
  }
});
function __vue_render__(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      style: normalizeStyle(_ctx.theStyle),
      class: normalizeClass([_ctx.className, { "fan-bgimg-wfit": _ctx.bgFit === "widthFix" }]),
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
    },
    [
      renderSlot(_ctx.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default$1 = __vue_sfc__;
const View = stdin_default$1;
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
    Image$1,
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
    Swiper2,
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
var stdin_default = {
  install,
  version
};
export {
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
  Image$1 as Image,
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
  Swiper2 as Swiper,
  Switch,
  TabPanel,
  Tabs,
  TabsContent,
  Tag,
  Text,
  Textarea,
  Toast,
  UserPanel,
  View,
  stdin_default as default,
  dialog,
  install,
  toast,
  version
};
