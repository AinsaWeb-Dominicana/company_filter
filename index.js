'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = require('util');

var _Company = require('./Company');

var _Company2 = _interopRequireDefault(_Company);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _util.deprecate)(function (app) {
    app.loopback.modelBuilder.mixins.define('Company', _Company2.default);
}, 'DEPRECATED: Use mixinSources');


module.exports = exports.default;