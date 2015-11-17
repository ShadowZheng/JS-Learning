var x = {};
// 工具方法命名空间
x.tools = {
  getByClass: function(oParent, className) {
    var arr = [];
    var eles = oParent.getElementsByTagName('*');
    for (var i = 0; i < eles.length; i++) {
      if (eles[i].className == className) {
        arr.push(eles[i]);
      }
    }
    return arr;
  },
  getStyle: function(obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    } else {
      return getComputedStyle(obj, false)[attr];
    }
  }
};

// ui效果方法命名空间
x.ui = {
  fadeIn: function(obj) {
    if (x.tools.getStyle(obj, 'opacity') == 1) {
      return false;
    }
    var value = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
      var iSpeed = 5;
      if (value == 100) {
        clearInterval(obj.timer);
      } else {
        value += iSpeed;
        obj.style.opacity = value/100;
      }
    }, 30);
  },
  fadeOut: function(obj) {
    if (x.tools.getStyle(obj, 'opacity') == 0) {
      return false;
    }
    var value = 100;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
      var iSpeed = 5;
      if (value == 0) {
        clearInterval(obj.timer);
      } else {
        value -= iSpeed;
        obj.style.opacity = value/100;
      }
    }, 30);
  }
}


// 应用业务方法
x.app = {
  // 初始化banner
  initBanner: function() {
    var oAd = document.getElementById('ad');
    var oLis = oAd.getElementsByTagName('li');
    var oPrev = x.tools.getByClass(oAd, 'prev')[0];
    var oNext = x.tools.getByClass(oAd, 'next')[0];

    var iNow = 0
    // 定时轮播banner
    var timer = setInterval(auto, 3000);
    function auto() {
      if (iNow == oLis.length - 1) {
        iNow = 0;
      } else {
        iNow++;
      }
      for (var i = 0; i < oLis.length; i++) {
        // 全部设置透明
        x.ui.fadeOut(oLis[i]);
      }
      // 设置当前透明
      x.ui.fadeIn(oLis[iNow]);
    }
    function autoPre() {
      if (iNow == 0) {
        iNow = oLis.length - 1;
      } else {
        iNow--;
      }
      for (var i = 0; i < oLis.length; i++) {
        // 全部设置透明
        x.ui.fadeOut(oLis[i]);
      }
      // 设置当前透明
      x.ui.fadeIn(oLis[iNow]);
    }

    oAd.onmouseover = function() {
      oPrev.style.display = 'block';
      oNext.style.display = 'block';
      clearInterval(timer);
    }
    oAd.onmouseout = function() {
      oPrev.style.display = 'none';
      oNext.style.display = 'none';
      timer = setInterval(auto, 3000);
    }
    oPrev.onclick = function() {
      autoPre();
    }
    oNext.onclick = function() {
      auto();
    }
  },
  initSell: function() {
    var oSel = document.getElementById('sel');
    var oDDs = oSel.getElementsByTagName('dd');
    var oAs = oSel.getElementsByTagName('a');
    var oUl = oSel.getElementsByTagName('ul');
    for (var i = 0; i < oAs.length; i++) {
      oAs[i].index = i;
      oAs[i].onclick = function(ev) {
        var e = ev || event;
        oUl[this.index].style.display = 'block';
        event.cancelBubble = true;
      }
      document.
      document.onclick = function(i) {
        oUl[].style.display = 'none';
      }
    }
  }

};

window.onload = function() {
  x.app.initBanner();
  x.app.initSell();
}
