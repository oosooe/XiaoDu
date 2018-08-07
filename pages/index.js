/********************************************************************
  *                                                                *
  * Apollo&丸子君原创作品，代码仅供技术交流及学习使用                     *
  * 切勿用于商业环境中，如发生任何法律相关问题本人概不负责                  *
  *                                                                *
  * 此项目也是我的一个小程序组件化学习项目                               *
  * 如果你有相关问题想一起探讨的，欢迎加我微信：totorohost 【备注：小独】    *
  *                                                                *
  * 另外如果你有好的项目或者ider，需要找人合作，欢迎call me                *
  *                                                                *
**********************************************************************/

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../static/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT,
    height: wx.DEFAULT_CONTENT_HEIGHT,
    current: 0,
    show: false,
    showMask: false,
    headtap: true,
    tabcurrent: 0,
    poptabStyle: {
      'font-size': '32rpx',
      'padding': '20rpx 0',
      'font-weight': '300',
      'color': '#999999',
      'width:': '80px'
    },
    popactiveTabStyle: {
      'color': '#333333',
      'font-weight': '500',
      'border-right': '0px solid #333333'
    },
    customStyle: {
      'background-color': 'rgba(255, 255, 255, 0.8)'
    },
    tabItems: [{ name: '12\u6708', year: '2018', month: '12' }, { name: '11\u6708', year: '2018', month: '11' }, { name: '10\u6708', year: '2018', month: '10' }, { name: '9\u6708', year: '2018', month: '9' }, { name: '8\u6708', year: '2018', month: '8' }, { name: '7\u6708', year: '2018', month: '7' }, { name: '6\u6708', year: '2018', month: '6' }, { name: '5\u6708', year: '2018', month: '5' }, { name: '4\u6708', year: '2018', month: '4' }, { name: '3\u6708', year: '2018', month: '3' }, { name: '2\u6708', year: '2018', month: '2' }, { name: '1\u6708', year: '2018', month: '1' }],
    tabStyle: {
      'font-size': '32rpx',
      'flex': '0 0 40px',
      'padding': '10rpx 0',
      'margin-left': '20rpx',
      'margin-right': '20rpx',
      'color': '#999999',
      'font-weight': '300'
    },
    activeTabStyle2: {
      'color': '#333333',
      'border-bottom': '1px solid #333333'
    },
    maskStyle: {
      'background-color': 'transparent'
    },
    muiscImgPlayer: '',
    dateobj: {}
  },
  onLoad: function onLoad(e) {
    var that = this;
    if (e.id) {
      var sid = e.id;
      var tid = e.tid;
      var date = e.date;
      var year = e.year;
      var month = e.month;
      that.setData({
        tid: tid,
        date: date,
        year: year,
        month: month
      });
      that.dateInit(year, month);
    } else {
      var now = new Date();
      var _year = now.getFullYear();
      var _month = now.getMonth();
      var _date = now.getDate();
      var _tid = new Date(_year, _month, _date).valueOf();
      var monAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      that.setData({
        tid: _tid,
        date: _date,
        year: _year,
        month: monAbbr[_month]
      });
      that.dateInit(_year, _month);
    }
    wx.getSystemInfo({
      success: function success(res) {
        that.setData({ WIN_HEIGHT: res.windowHeight });
      }
    });
    that.peaceread();
    wx.onBackgroundAudioPause(function () {
      that.setData({ musicPlay: '', muiscImgPlayer: '' });
    });
    wx.onBackgroundAudioPlay(function () {
      that.setData({ musicPlay: 1, muiscImgPlayer: 'music-img' });
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({ musicPlay: '', muiscImgPlayer: '' });
    });
    that.audioCtx = wx.createAudioContext('myAudio');
    var month = new Date().getMonth();
    var poptabItems = [];
    var tabItems = that.data.tabItems;
    for (var i = 0; i < tabItems.length; i++) {
      if (tabItems[i].year == 2018) {
        if (tabItems[i].month >= 3) {
          if (tabItems[i].month < month + 2) {
            poptabItems.push(tabItems[i]);
          }
        }
      }
    }
    that.setData({ poptabItems: poptabItems });
  },
  audioPlay: function audioPlay() {
    var that = this;
    wx.stopBackgroundAudio();
    that.audioCtx.play();
    that.setData({ audioPlay: true });
  },
  pausePlay: function pausePlay() {
    var that = this;
    that.audioCtx.pause();
    that.setData({ audioPlay: false });
  },
  getArticleTap: function getArticleTap(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var date = e.currentTarget.dataset.date;
    var year = e.currentTarget.dataset.year;
    var month = e.currentTarget.dataset.month;
    that.peaceread(id);
    that.audioCtx.pause();
    wx.stopBackgroundAudio();
    that.setData({
      tid: id,
      show: false,
      headtap: true,
      date: date,
      month: month,
      year: year,
      current: 0,
      audioPlay: false
    });
  },
  peaceread: function peaceread(e) {
    var that = this;
    if (e) {
      wx.request({
        url: 'https://api.peace-read.com/content/query?releaseDate=' + e,
        success: function success(res) {
          if (res.data.err_code != 30004) {
            var dsongImg = res.data.result.song;
            var rsongImg = dsongImg.image.replace(/http:/g, 'https:');
            var dsentenc = res.data.result.poetry;
            var darticle = res.data.result.article;
            that.setData({
              dsongImg: dsongImg,
              rsongImg: rsongImg,
              dsentenc: dsentenc,
              darticle: darticle
            });
            that.getVoiceTap();
          } else {
            wx.showConfirm({
              content: '\u60A8\u67E5\u770B\u7684\u5185\u5BB9\u8FD8\u672A\u53D1\u5E03\uFF0C\u665A\u70B9\u5728\u6765\u770B\u770B\u5427',
              confirmColor: '#333333',
              confirmText: '\u6211\u77E5\u9053\u4E86',
              showCancel: false
            });
          }
        }
      });
    } else {
      wx.request({
        url: 'https://api.peace-read.com/content/latest',
        success: function success(res) {
          var dsongImg = res.data.result.song;
          var rsongImg = dsongImg.image.replace(/http:/g, 'https:');
          var dsentenc = res.data.result.poetry;
          var darticle = res.data.result.article;
          that.setData({
            dsongImg: dsongImg,
            rsongImg: rsongImg,
            dsentenc: dsentenc,
            darticle: darticle
          });
          that.getVoiceTap();
        }
      });
    }
  },
  getMonthTap: function getMonthTap(e) {
    var year = e.currentTarget.dataset.year;
    var month = e.currentTarget.dataset.month - 1;
    this.dateInit(year, month);
  },
  dateInit: function dateInit(setYear, setMonth) {
    var now = new Date();
    var nowyear = now.getFullYear();
    var nowmonth = now.getMonth();
    var nowdate = now.getDate();
    var dateArr = [];
    var arrLen = 0;
    var year = setYear;
    var nextYear = 0;
    var month = setMonth;
    var nextMonth = month + 1 > 11 ? 1 : month + 1;
    var dayNums = new Date(year, nextMonth, 0).getDate();
    var monAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var obj = {};
    var num = 0;
    var MonNums = 0;
    arrLen = dayNums;
    for (var i = 0; i < arrLen; i++) {
      if (month == 2 && i > 25) {
        num = i + 1;
        MonNums = new Date(year, month, num).valueOf();
        obj = {
          isToday: year + '-' + nextMonth + '-' + num,
          dateNum: num,
          YearNum: year,
          MonName: monAbbr[month],
          MonNums: MonNums
        };
        dateArr.push(obj);
      }
      if (month != 2) {
        if (nowmonth == month) {
          if (i < nowdate) {
            num = i + 1;
            MonNums = new Date(year, month, num).valueOf();
            obj = {
              isToday: year + '-' + nextMonth + '-' + num,
              dateNum: num,
              YearNum: year,
              MonName: monAbbr[month],
              MonNums: MonNums
            };
            dateArr.push(obj);
          }
        } else {
          num = i + 1;
          MonNums = new Date(year, month, num).valueOf();
          obj = {
            isToday: year + '-' + nextMonth + '-' + num,
            dateNum: num,
            YearNum: year,
            MonName: monAbbr[month],
            MonNums: MonNums
          };
          dateArr.push(obj);
        }
      }
    }
    this.setData({
      dateArr: dateArr.reverse()
    });
  },
  getVoiceTap: function getVoiceTap() {
    var that = this;
    var text = that.data.darticle.body;
    wx.request({
      url: 'https://reptile.akeyn.com/voice/text2audio?content=' + text,
      success: function success(res) {
        if (res.data.code == 1) {
          var voice = res.data.url;
          that.setData({
            voiceSong: voice
          });
        }
      }
    });
  },
  getShareSongTap: function getShareSongTap() {
    var that = this;
    wx.showLoading({ title: '\u751F\u6210\u56FE\u7247\u4E2D', mask: true });
    var ctx = wx.createCanvasContext('shareCanvas');
    var dat = that.data.date;
    var mon = that.data.month;
    var yer = that.data.year;
    var tmp = that.data.rsongImg;
    var tit = that.data.dsongImg.title;
    var use = that.data.dsongImg.singer;
    wx.getImageInfo({
      src: tmp,
      success: function success(res) {
        ctx.setFillStyle('#ffffff');
        ctx.fillRect(0, 0, 400, 800);
        ctx.drawImage('../images/logo_share.png', 20, 30, 80, 80);
        ctx.setFillStyle('#333333');
        ctx.setFontSize(18);
        ctx.fillText('小独', 108, 63);
        ctx.setFillStyle('#999999');
        ctx.setFontSize(14);
        ctx.fillText('溺于安宁，独伴时光', 108, 92);
        ctx.strokeStyle = "#eee";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(20, 130);
        ctx.lineTo(380, 130);
        ctx.stroke();
        ctx.drawImage(res.path, 20, 160, 360, 360);
        ctx.setFillStyle('rgba(255,255,255,.8)');
        ctx.fillRect(20, 450, 365, 70);
        ctx.setFillStyle('#333333');
        ctx.setFontSize(19);
        ctx.fillText(tit, 25, 480);
        ctx.setFillStyle('#666666');
        ctx.setFontSize(14);
        ctx.fillText(' --- ' + use, 25, 505);
        ctx.strokeStyle = "#eee";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(20, 550);
        ctx.lineTo(380, 550);
        ctx.stroke();
        ctx.drawImage('../images/logo_qrcode.png', 240, 565, 120, 120);
        ctx.setFillStyle('#333333');
        ctx.setFontSize(40);
        ctx.fillText(dat, 50, 636);
        ctx.setFontSize(22);
        ctx.fillText(mon + '.' + yer, 96, 636);
        ctx.save();
        ctx.draw();
        setTimeout(function () {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 400,
            height: 700,
            canvasId: 'shareCanvas',
            success: function success(res) {
              wx.hideLoading();
              wx.previewImage({
                urls: [res.tempFilePath]
              });
              setTimeout(function () {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function success(res) {
                    wx.showToast({
                      title: '\u4FDD\u5B58\u6210\u529F',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                });
              }, 200);
            }
          });
        }, 500);
      }
    });
  },
  getShareSentencTap: function getShareSentencTap() {
    var that = this;
    wx.showLoading({ title: '\u751F\u6210\u56FE\u7247\u4E2D', mask: true });
    var ctx = wx.createCanvasContext('shareCanvas');
    var dat = that.data.date;
    var mon = that.data.month;
    var yer = that.data.year;
    var use = that.data.dsentenc.author;
    var tit = that.data.dsentenc.title;
    var acr = that.data.dsentenc.body;
    var acs = acr.split('\n');
    var row = [];
    for (var a = 0; a < acs.length; a++) {
      if (acs[a] != '') {
        row.push(acs[a]);
      }
    }
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, 400, 580);
    ctx.drawImage('../images/logo_share.png', 20, 30, 80, 80);
    ctx.setFillStyle('#333333');
    ctx.setFontSize(18);
    ctx.fillText('小独', 108, 63);
    ctx.setFillStyle('#999999');
    ctx.setFontSize(14);
    ctx.fillText('溺于安宁，独伴时光', 108, 92);
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(20, 130);
    ctx.lineTo(380, 130);
    ctx.stroke();
    ctx.setFillStyle('#333');
    ctx.setFontSize(18);
    if (row.length > 4) {
      var rowCut = row.slice(0, 4);
      var rowPart = rowCut[1];
      var test = '';
      var empty = [];
      for (var a = 0; a < rowPart.length; a++) {
        if (ctx.measureText(test).width < 300) {
          test += rowPart[a];
        } else {
          break;
        }
      }
      empty.push(test);
      var group = empty[0] + ".......";
      rowCut.splice(4, 1, group);
      row = rowCut;
    }
    for (var b = 0; b < row.length; b++) {
      ctx.fillText(row[b], 20, 200 + b * 30, 360);
    }
    ctx.setFillStyle('#333333');
    ctx.setFontSize(18);
    ctx.setTextAlign('right');
    if (tit) {
      ctx.fillText('《' + tit + '》', 380, 370);
    }
    ctx.setFillStyle('#999999');
    ctx.setFontSize(14);
    ctx.fillText(use + ' -- ', 380, 390);
    ctx.setTextAlign('left');
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(20, 420);
    ctx.lineTo(380, 420);
    ctx.stroke();
    ctx.drawImage('../images/logo_qrcode.png', 240, 435, 120, 120);
    ctx.setFillStyle('#333333');
    ctx.setFontSize(40);
    ctx.fillText(dat, 50, 506);
    ctx.setFontSize(22);
    ctx.fillText(mon + '.' + yer, 100, 506);
    ctx.save();
    ctx.draw();
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 400,
        height: 580,
        canvasId: 'shareCanvas',
        success: function success(res) {
          wx.hideLoading();
          wx.previewImage({
            urls: [res.tempFilePath]
          });
          setTimeout(function () {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function success(res) {
                wx.showToast({
                  title: '\u4FDD\u5B58\u6210\u529F',
                  icon: 'none',
                  duration: 2000
                });
              }
            });
          }, 200);
        }
      });
    }, 500);
  },
  getShareArticle: function getShareArticle() {
    var that = this;
    wx.showLoading({ title: '\u751F\u6210\u56FE\u7247\u4E2D', mask: true });
    var ctx = wx.createCanvasContext('shareCanvas');
    var dat = that.data.date;
    var mon = that.data.month;
    var yer = that.data.year;
    var img = that.data.darticle.image;
    var tmg = img.replace(/http:/g, 'https:');
    var tit = that.data.darticle.title;
    var tsp = tit.split('');
    if (tsp.length > 18) {
      var tit = tit.slice(0, 18) + '...';
    }
    var use = that.data.darticle.author;
    var acr = that.data.darticle.body;
    var acp = acr.replace(/\n\n/g, '');
    var acs = acp.split('');
    var acm = '';
    var row = [];
    for (var a = 0; a < acs.length; a++) {
      if (ctx.measureText(acm).width < 320) {
        acm += acs[a];
      } else {
        a--;
        row.push(acm);
        acm = '';
      }
    }
    row.push(acm);
    wx.getImageInfo({
      src: tmg,
      success: function success(res) {
        ctx.setFillStyle('#ffffff');
        ctx.fillRect(0, 0, 400, 800);
        ctx.drawImage('../images/logo_share.png', 20, 30, 80, 80);
        ctx.setFillStyle('#333333');
        ctx.setFontSize(18);
        ctx.fillText('小独', 108, 63);
        ctx.setFillStyle('#999999');
        ctx.setFontSize(14);
        ctx.fillText('溺于安宁，独伴时光', 108, 92);
        ctx.strokeStyle = "#eee";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(20, 130);
        ctx.lineTo(380, 130);
        ctx.stroke();
        ctx.drawImage(res.path, 20, 145, 360, 180);
        ctx.setFillStyle('#333333');
        ctx.setFontSize(18);
        ctx.fillText(tit, 20, 355);
        ctx.setFillStyle('#999999');
        ctx.setFontSize(13);
        ctx.fillText(use, 20, 380);
        ctx.setFillStyle('#666666');
        ctx.setFontSize(15);
        if (row.length > 4) {
          var rowCut = row.slice(0, 4);
          var rowPart = rowCut[1];
          var test = '';
          var empty = [];
          for (var a = 0; a < rowPart.length; a++) {
            if (ctx.measureText(test).width < 300) {
              test += rowPart[a];
            } else {
              break;
            }
          }
          empty.push(test);
          var group = empty[0] + ".......";
          rowCut.splice(4, 1, group);
          row = rowCut;
        }
        for (var b = 0; b < row.length; b++) {
          ctx.fillText(row[b], 20, 410 + b * 30, 360);
        }
        ctx.strokeStyle = "#eee";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(20, 550);
        ctx.lineTo(380, 550);
        ctx.stroke();
        ctx.drawImage('../images/logo_qrcode.png', 240, 565, 120, 120);
        ctx.setFillStyle('#333333');
        ctx.setFontSize(40);
        ctx.fillText(dat, 50, 636);
        ctx.setFontSize(22);
        ctx.fillText(mon + '.' + yer, 96, 636);
        ctx.save();
        ctx.draw();
        setTimeout(function () {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 400,
            height: 700,
            canvasId: 'shareCanvas',
            success: function success(res) {
              wx.hideLoading();
              wx.previewImage({
                urls: [res.tempFilePath]
              });
              setTimeout(function () {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function success(res) {
                    wx.showToast({
                      title: '\u4FDD\u5B58\u6210\u529F',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                });
              }, 200);
            }
          });
        }, 500);
      }
    });
  },
  onShareAppMessage: function onShareAppMessage(res) {
    var that = this;
    if (res.from === 'button') {
      var id = res.target.dataset.id;
      if (id == 1) {
        var tid = that.data.tid;
        var date = that.data.date;
        var year = that.data.year;
        var month = that.data.month;
        var song = that.data.dsongImg;
        var songImg = that.data.rsongImg;
        console.log('/page/index?id=' + id + '&tid=' + tid + '&date=' + date + '&month=' + month + '&year=' + year);
        return {
          title: song.title + '-' + song.singer,
          path: 'page/index?id=' + id + '&tid=' + tid + '&date=' + date + '&month=' + month + '&year=' + year,
          imageUrl: songImg
        };
      }
      if (id == 2) {
        var tid = that.data.tid;
        var date = that.data.date;
        var year = that.data.year;
        var month = that.data.month;
        console.log('/page/index?id=' + id + '&tid=' + tid + '&date=' + date + '&month=' + month + '&year=' + year);
        return {
          title: date + ' ' + month + '.' + year,
          path: 'page/index?id=' + id + '&tid=' + tid + '&date=' + date + '&month=' + month + '&year=' + year
        };
      }
      if (id == 3) {
        var tid = that.data.tid;
        var date = that.data.date;
        var year = that.data.year;
        var month = that.data.month;
        var darticle = that.data.darticle;
        console.log('/page/index?id=' + id + '&tid=' + tid + '&date=' + date + '&month=' + month + '&year=' + year);
        return {
          title: darticle.title + '-' + darticle.author,
          path: 'page/index?id=' + id + '&tid=' + tid + '&date=' + date + '&month=' + month + '&year=' + year,
          imageUrl: darticle.image
        };
      }
    } else {
      return {
        title: '小独lite - 溺于安宁，独伴时光',
        path: '/page/index'
      };
    }
  },
  openPopup: function openPopup(e) {
    var show = e.currentTarget.dataset.show;
    if (show == true) {
      this.setData({
        show: true,
        headtap: false
      });
    } else {
      this.setData({
        show: false,
        headtap: true
      });
    }
  },
  handleShowMask: function handleShowMask(e) {
    var show = e.currentTarget.dataset.show;
    this.setData({
      showMask: show
    });
  },
  handleChangeTap: function handleChangeTap(e) {
    var index = e.detail.index;
    this.setData({
      tabcurrent: index
    });
  },
  playerMusic: function playerMusic(e) {
    var that = this;
    var music = that.data.dsongImg;
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.image
      });
      that.setData({
        musicPlay: id,
        muiscImgPlayer: 'music-img'
      });
    } else {
      wx.pauseBackgroundAudio();
      that.setData({
        musicPlay: '',
        muiscImgPlayer: ''
      });
    }
  },
  handleChange: function handleChange(e) {
    var index = e.detail.index;
    this.setData({
      current: index
    });
  },
  handleContentChange: function handleContentChange(e) {
    var current = e.detail.current;
    this.setData({
      current: current
    });
  },
  getCopyWechat: function getCopyWechat() {
    wx.setClipboardData({
      data: 'totorohost',
      success: function success(res) {
        wx.getClipboardData({
          success: function success(res) {
            wx.showToast({
              title: '\u5FAE\u4FE1\u53F7\u590D\u5236\u6210\u529F',
              icon: 'success',
              duration: 2000
            });
          }
        });
      }
    });
  }
}); 