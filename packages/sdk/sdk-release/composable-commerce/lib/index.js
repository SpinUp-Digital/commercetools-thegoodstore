"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../core/lib/index.js
var require_lib = __commonJS({
  "../../core/lib/index.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      Extension: () => Extension2,
      REMEMBER_ME: () => REMEMBER_ME2,
      SDK: () => SDK2,
      sdk: () => sdk
    });
    module2.exports = __toCommonJS2(src_exports2);
    var Extension2 = class {
      sdk;
      constructor(sdk2) {
        this.sdk = sdk2;
      }
    };
    function assign(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          target[key] = source[key];
        }
      }
      return target;
    }
    var defaultConverter = {
      read: function(value) {
        if (value[0] === '"') {
          value = value.slice(1, -1);
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
      },
      write: function(value) {
        return encodeURIComponent(value).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        );
      }
    };
    function init(converter, defaultAttributes) {
      function set(key, value, attributes) {
        if (typeof document === "undefined") {
          return;
        }
        attributes = assign({}, defaultAttributes, attributes);
        if (typeof attributes.expires === "number") {
          attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
        }
        if (attributes.expires) {
          attributes.expires = attributes.expires.toUTCString();
        }
        key = encodeURIComponent(key).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
        var stringifiedAttributes = "";
        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue;
          }
          stringifiedAttributes += "; " + attributeName;
          if (attributes[attributeName] === true) {
            continue;
          }
          stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
        }
        return document.cookie = key + "=" + converter.write(value, key) + stringifiedAttributes;
      }
      function get(key) {
        if (typeof document === "undefined" || arguments.length && !key) {
          return;
        }
        var cookies = document.cookie ? document.cookie.split("; ") : [];
        var jar = {};
        for (var i = 0; i < cookies.length; i++) {
          var parts = cookies[i].split("=");
          var value = parts.slice(1).join("=");
          try {
            var foundKey = decodeURIComponent(parts[0]);
            jar[foundKey] = converter.read(value, foundKey);
            if (key === foundKey) {
              break;
            }
          } catch (e) {
          }
        }
        return key ? jar[key] : jar;
      }
      return Object.create(
        {
          set,
          get,
          remove: function(key, attributes) {
            set(
              key,
              "",
              assign({}, attributes, {
                expires: -1
              })
            );
          },
          withAttributes: function(attributes) {
            return init(this.converter, assign({}, this.attributes, attributes));
          },
          withConverter: function(converter2) {
            return init(assign({}, this.converter, converter2), this.attributes);
          }
        },
        {
          attributes: { value: Object.freeze(defaultAttributes) },
          converter: { value: Object.freeze(converter) }
        }
      );
    }
    var api = init(defaultConverter, { path: "/" });
    var js_cookie_default = api;
    var REMEMBER_ME2 = "__rememberMe";
    var cookiesApi = js_cookie_default.withAttributes({ path: "/" });
    var fetcher = async (url, options = {}) => {
      url = url.replaceAll("//", "/");
      const sessionCookie = cookiesApi.get("frontastic-session");
      options.headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Frontastic-Access-Token": "APIKEY",
        ...options.headers || {},
        ...sessionCookie ? { "Frontastic-Session": sessionCookie } : {}
      };
      const response = await fetch(url, options);
      if (typeof window !== "undefined" && response.ok && response.headers.has("Frontastic-Session")) {
        let rememberMe = window.localStorage.getItem(REMEMBER_ME2);
        let expiryDate;
        if (rememberMe) {
          expiryDate = new Date(Date.now() + 1e3 * 60 * 60 * 24 * 30 * 3);
        }
        cookiesApi.set(
          "frontastic-session",
          response.headers.get("Frontastic-Session"),
          { expires: expiryDate }
        );
      }
      if (response.ok) {
        return response.json();
      }
      let error;
      try {
        error = await response.clone().json();
      } catch (e) {
        error = await response.text();
      }
      if (error.error) {
        throw new Error(error.errorCode);
      }
      return error;
    };
    var Event = class {
      eventName;
      data;
      isDefaultPrevented;
      isCancelled;
      isPropagationStopped;
      constructor(options) {
        this.eventName = options.eventName;
        this.data = options.data;
        this.isCancelled = false;
        this.isDefaultPrevented = false;
        this.isPropagationStopped = false;
      }
      preventDefault() {
        this.isDefaultPrevented = true;
      }
      cancel() {
        this.isCancelled = true;
      }
      stopPropagation() {
        this.isPropagationStopped = true;
      }
    };
    var SimpleEmitter = class {
      eventHandlers;
      constructor() {
        this.eventHandlers = {};
      }
      getEventHandlers(eventName) {
        let eventHandlers = this.eventHandlers[eventName];
        if (eventHandlers === void 0) {
          eventHandlers = [];
          this.eventHandlers[eventName] = eventHandlers;
        }
        return eventHandlers;
      }
      addHandler(eventName, handler) {
        let eventHandlers = this.getEventHandlers(eventName);
        eventHandlers.push(handler);
      }
      removeHandlersForEvent(eventName) {
        this.eventHandlers[eventName] = [];
      }
      removeHandler(eventName, handler) {
        let eventHandlers = this.getEventHandlers(eventName);
        eventHandlers.splice(eventHandlers.indexOf(handler), 1);
      }
      removeAllHandlers() {
        this.eventHandlers = {};
      }
      triggerHandlers(event) {
        for (let handler of this.getEventHandlers(event.eventName)) {
          handler(event);
        }
      }
    };
    var EnhancedEmitter = class {
      eventHandle;
      beforeHandle;
      afterHandle;
      constructor() {
        this.eventHandle = new SimpleEmitter();
        this.beforeHandle = new SimpleEmitter();
        this.afterHandle = new SimpleEmitter();
      }
      trigger(eventOptions) {
        let event = new Event(eventOptions);
        this.eventHandle.triggerHandlers(event);
        return this;
      }
      on(eventName, handler) {
        this.eventHandle.addHandler(eventName, handler);
        return this;
      }
      off(eventName) {
        this.eventHandle.removeHandlersForEvent(eventName);
        return this;
      }
      offHandler(eventName, handler) {
        this.eventHandle.removeHandler(eventName, handler);
        return this;
      }
      offAllEvents() {
        this.eventHandle.removeAllHandlers();
        return this;
      }
      before(eventName, handler) {
        this.beforeHandle.addHandler(eventName, handler);
        return this;
      }
      offBefore(eventName) {
        this.beforeHandle.removeHandlersForEvent(eventName);
        return this;
      }
      after(eventName, handler) {
        this.afterHandle.addHandler(eventName, handler);
        return this;
      }
      offAfter(eventName) {
        this.afterHandle.removeHandlersForEvent(eventName);
        return this;
      }
      provideHook(eventOptions, defaultHandler) {
        let event = new Event(eventOptions);
        this.beforeHandle.triggerHandlers(event);
        if (!(event.isCancelled || event.isDefaultPrevented)) {
          defaultHandler.call(this, event);
        }
        if (!event.isCancelled) {
          this.eventHandle.triggerHandlers(event);
        }
        if (!event.isCancelled) {
          this.afterHandle.triggerHandlers(event);
        }
        return this;
      }
    };
    var Queue = class {
      #queue = [];
      #promisePending = false;
      #stopped = false;
      add(promise) {
        return new Promise((resolve, reject) => {
          this.#queue.push({
            promise,
            resolve,
            reject
          });
          this.#handle();
        });
      }
      stop() {
        this.#stopped = true;
      }
      restart() {
        this.#stopped = false;
        this.#handle();
      }
      #handle() {
        if (this.#promisePending || this.#stopped) {
          return;
        }
        const item = this.#queue.shift();
        if (!item) {
          return;
        }
        try {
          this.#promisePending = true;
          item.promise().then((value) => this.#resolve(() => item.resolve(value))).catch((err) => this.#resolve(() => item.reject(err)));
        } catch (err) {
          this.#resolve(() => item.reject(err));
        }
      }
      #resolve(callback) {
        this.#promisePending = false;
        callback();
        this.#handle();
      }
    };
    var SDK2 = class extends EnhancedEmitter {
      #hasBeenConfigured;
      #endpoint;
      #locale;
      #currency;
      #useCurrencyInLocale;
      #actionQueue;
      set endpoint(url) {
        this.#endpoint = url;
      }
      get endpoint() {
        return this.#endpoint;
      }
      set locale(locale) {
        if (typeof locale === "string") {
          this.#locale = new Intl.Locale(locale);
        } else {
          this.#locale = locale;
        }
      }
      get locale() {
        return this.#locale;
      }
      get APILocale() {
        const apiFormattedLocale = this.locale.baseName.slice(0, 5).replace("-", "_");
        if (this.#useCurrencyInLocale) {
          return `${apiFormattedLocale}@${this.currency}`;
        } else {
          return apiFormattedLocale;
        }
      }
      set currency(currency) {
        this.#currency = currency;
      }
      get currency() {
        return this.#currency;
      }
      constructor() {
        super();
        this.#hasBeenConfigured = false;
        this.#actionQueue = new Queue();
      }
      #throwIfNotConfigured() {
        if (!this.#hasBeenConfigured) {
          throw new Error(
            "The SDK has not been configured.\nPlease call .configure before you call any other methods."
          );
        }
      }
      configure(config) {
        this.endpoint = config.endpoint;
        this.locale = new Intl.Locale(config.locale);
        this.currency = config.currency;
        this.#useCurrencyInLocale = config.useCurrencyInLocale ?? false;
        this.#hasBeenConfigured = true;
      }
      async callAction(actionName, payload, query) {
        this.#throwIfNotConfigured();
        let params = "";
        if (query) {
          params = Object.keys(query).reduce((prev, key) => prev + `${key}=${query[key]}&`, "?").slice(0, params.length - 1);
        }
        return await this.#actionQueue.add(() => {
          return fetcher(
            `${this.#endpoint}/frontastic/action/${actionName}${params}`,
            {
              method: "POST",
              body: JSON.stringify(payload),
              headers: {
                "Frontastic-Locale": this.APILocale
              }
            }
          );
        });
      }
      async getPage(path) {
        const options = {
          headers: {
            "Frontastic-Path": path,
            "Frontastic-Locale": this.APILocale
          }
        };
        return fetcher(
          `${this.#endpoint}/page`,
          options
        );
      }
    };
    var sdk = new SDK2();
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ComposableCommerce: () => ComposableCommerce
});
module.exports = __toCommonJS(src_exports);

// src/library/Extension.ts
var import_sdk = __toESM(require_lib());
var import_sdk2 = __toESM(require_lib());
var ComposableCommerce = class extends import_sdk.Extension {
  constructor(sdk) {
    super(sdk);
  }
  unregisterExtension() {
  }
  getProjectSettings = () => {
    return this.sdk.callAction("project/getProjectSettings", {});
  };
  getProduct = (payload) => {
    return this.sdk.callAction("product/getProduct", payload);
  };
  productQuery = (payload) => {
    return this.sdk.callAction("product/query", payload);
  };
  queryProductCategories = (payload) => {
    return this.sdk.callAction("product/queryCategories", {}, payload.query);
  };
  getSearchableProductAttributes = () => {
    return this.sdk.callAction("product/searchableAttributes", {});
  };
  getCart = () => {
    return this.sdk.callAction("cart/getCart", {});
  };
  addCartItem = (payload) => {
    return this.sdk.callAction("cart/addToCart", payload);
  };
  removeCartItem = (payload) => {
    return this.sdk.callAction("cart/removeLineItem", payload);
  };
  updateCartItem = (payload) => {
    return this.sdk.callAction("cart/updateLineItem", payload);
  };
  updateCart = (payload) => {
    return this.sdk.callAction("cart/updateCart", payload);
  };
  getShippingMethods = () => {
    return this.sdk.callAction("cart/getShippingMethods", {});
  };
  getAvailableShippingMethods = () => {
    return this.sdk.callAction("cart/getAvailableShippingMethods", {});
  };
  setShippingMethod = (payload) => {
    return this.sdk.callAction("cart/setShippingMethod", payload);
  };
  redeemDiscountCode = (payload) => {
    return this.sdk.callAction("cart/redeemDiscount", payload);
  };
  removeDiscountCode = (payload) => {
    return this.sdk.callAction("cart/removeDiscount", payload);
  };
  checkoutCart = () => {
    return this.sdk.callAction("cart/checkout", {});
  };
  getOrderHistory = () => {
    return this.sdk.callAction("cart/getOrders", {});
  };
  getWishlist = () => {
    return this.sdk.callAction("wishlist/getWishlist", {});
  };
  addToWishlist = (payload) => {
    return this.sdk.callAction("wishlist/addToWishlist", payload);
  };
  removeFromWishlist = (payload) => {
    return this.sdk.callAction("wishlist/removeLineItem", payload);
  };
  updateWishlistItem = (payload) => {
    return this.sdk.callAction("wishlist/updateLineItemCount", payload);
  };
  getAccount = async () => {
    const result = await this.sdk.callAction("account/getAccount", {});
    const account = result?.data?.account || result?.data;
    if (account?.accountId && account?.confirmed) {
      return { account, loggedIn: true };
    }
    return {
      loggedIn: false,
      account: void 0,
      error: result.error
    };
  };
  login = async (payload) => {
    const remember = payload.remember;
    payload.remember = void 0;
    const result = this.sdk.callAction("account/login", payload);
    if (remember) {
      window.localStorage.setItem(import_sdk2.REMEMBER_ME, "1");
    }
    return result;
  };
  logout = async () => {
    await this.sdk.callAction("account/logout", {});
    window.localStorage.removeItem(import_sdk2.REMEMBER_ME);
  };
  registerAccount = (payload) => {
    return this.sdk.callAction("account/register", payload);
  };
  confirmAccount = (payload) => {
    return this.sdk.callAction("account/confirm", payload);
  };
  requestAccountConfirmationEmail = (payload) => {
    return this.sdk.callAction("account/requestConfirmationEmail", payload);
  };
  changeAccountPassword = (payload) => {
    return this.sdk.callAction("account/password", payload);
  };
  requestResetAccountPassword = (payload) => {
    return this.sdk.callAction("account/requestReset", payload);
  };
  resetAccountPassword = (payload) => {
    return this.sdk.callAction("account/reset", payload);
  };
  updateAccount = (payload) => {
    return this.sdk.callAction("account/update", payload);
  };
  addAccountAddress = (payload) => {
    return this.sdk.callAction("account/addAddress", payload);
  };
  updateAccountAddress = (payload) => {
    return this.sdk.callAction("account/updateAddress", payload);
  };
  removeAccountAddress = (payload) => {
    return this.sdk.callAction("account/removeAddress", payload);
  };
  setDefaultBillingAddress = (payload) => {
    return this.sdk.callAction("account/setDefaultBillingAddress", payload);
  };
  setDefaultShippingAddress = (payload) => {
    return this.sdk.callAction(
      "account/setDefaultShippingAddress",
      payload
    );
  };
};
/*! js-cookie v3.0.1 | MIT */
