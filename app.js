/********************************************************************
  *                                                                *
  * Apollo&丸子君原创作品，代码仅供技术交流及学习使用                     *
  * 切勿用于商业环境中，如发生任何法律相关问题本人概不负责                  *
  *                                                                *
  * 此项目也是我的一个小程序组件化学习项目                               *
  * 如果你有相关问题想一起探讨的，欢迎加我微信：totorohost 【备注：小独】    *
  *                                                                *
  * 另外如果你有好的项目或者idea，需要找人合作，欢迎call me                *
  *                                                                *
**********************************************************************/

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _system = require('./static/utils/system.js');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
  globalData: {},
  onLaunch: function onLaunch() {
    _system2.default.attachInfo();
  },
  onShow: function onShow() {},
  onHide: function onHide() {}
});