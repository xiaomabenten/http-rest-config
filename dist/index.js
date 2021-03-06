'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nextJsCore = require('next-js-core2');

var _nextJsCore2 = _interopRequireDefault(_nextJsCore);

require('next-tmpl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEPARATOR = '{';

function httpRestConfg(inApiContext, inHttp, inConfig) {
  var items = inConfig.items,
      baseUrl = inConfig.baseUrl;

  _nextJsCore2.default.each(items, function (context, apis) {
    _nextJsCore2.default.each(apis, function (key, item) {
      inApiContext[key] = function (inData, inOptions) {
        var data = Array.isArray(inData) ? _nextJsCore2.default.mix.apply(_nextJsCore2.default, inData) : inData;
        var action = String(item[0]).toLocaleLowerCase();
        var apiPath = item[1];
        if (apiPath.indexOf(SEPARATOR) > -1) {
          apiPath = _nextJsCore2.default.tmpl(apiPath, data);
        }
        return inHttp[action]('' + baseUrl + context + apiPath, data, inOptions);
      };
    });
  });
};

module.exports = httpRestConfg;
exports.default = httpRestConfg;