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
  }
};

// ui效果方法命名空间
x.ui = {
  fadeIn: function() {

  },
  fadeOut: function() {

  }
}


// 应用业务方法
x.app = {
  initBanner: function() {
    var oAd = document.getElementById('ad');
    var oLis = oAd.getElementsByTagName('li');
    var oPrev = x.tools.getByClass(oAd, 'prev')[0];
    var oNext = x.tools.getByClass(oAd, 'next')[0];

    // 定时轮播banner
    var timer = setInterval(auto(), 3000);
    function auto() {
      for (var i = 0; i < oLis.length; i++) {
        oLis[i]
      }
    }
    function autoPre() {

    }

    oAd.onmouseover = function() {
      oPrev.style.display = 'block';
      oNext.style.display = 'block';
      clearInterval(timer);
    }
    oAd.onmouseout = function() {
      oPrev.style.display = 'none';
      oNext.style.display = 'none';
      timer = setInterval(auto(), 3000);
    }
    oPrev.onclick = function() {
      autoPre();
    }
    oNext.onclick = function() {
      auto();
    }
  }
};

window.onload = function() {
  x.app.initBanner();
}
