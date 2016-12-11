(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginCustomProperty = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers.extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers;

  /*  weak */
  function customProperty(style, properties) {
    for (var property in style) {
      var value = style[property];
      if (properties[property]) {
        Object.assign(style, properties[property](value));
        delete style[property];
      }

      if (value instanceof Object && !Array.isArray(value)) {
        style[property] = customProperty(value, properties);
      }
    }

    return style;
  }

  var customProperty$1 = (function (properties) {
    return function (style) {
      return customProperty(style, properties);
    };
  });

  return customProperty$1;

}));
//# sourceMappingURL=fela-plugin-custom-property.js.map