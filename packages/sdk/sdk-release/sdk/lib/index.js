"use strict";
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Extension: () => Extension,
  REMEMBER_ME: () => REMEMBER_ME,
  SDK: () => SDK,
  sdk: () => sdk
});
module.exports = __toCommonJS(src_exports);

// src/library/Extension.ts
var Extension = class {
  sdk;
  constructor(sdk2) {
    this.sdk = sdk2;
  }
};

// node_modules/js-cookie/dist/js.cookie.mjs
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

// src/library/types.ts
var REMEMBER_ME = "__rememberMe";

// src/helpers/fetcher.ts
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
    let rememberMe = window.localStorage.getItem(REMEMBER_ME);
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

// src/library/Event.ts
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

// src/library/SimpleEmitter.ts
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

// src/library/EnhancedEmitter.ts
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

// src/library/Queue.ts
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

// src/library/SDK.ts
var SDK = class extends EnhancedEmitter {
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

// src/index.ts
var sdk = new SDK();
/*! js-cookie v3.0.1 | MIT */
