function startMove(obj, attrs, callback) {
    clearInterval(obj.timer);
    var iCur = 0;
    var iFlag = true;
    var iSpeed = 0;
    obj.timer = setInterval(function () {
        for (var attr in attrs) {
            if (attr == 'opacity') {
                iCur = Math.round(css(obj, 'opacity') * 100);
            } else {
                iCur = parseInt(css(obj, attr));
            }
            if (iCur != attrs[attr]) {
                iFlag = false;
                // 加入缓冲运动速度
                var iSpeed = (attrs[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if (attr =='opacity') {
                    obj.style.opacity = (iCur + iSpeed) / 100;
                    obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                } else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }
        }
        if (iFlag) {
            clearInterval(obj.timer);
            callback && callback.apply(obj);
        }
    }, 30);
}

function css(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}