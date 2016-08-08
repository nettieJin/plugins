(function (doc, win) {
    var docEl = doc.documentElement, //获取html标签
		//orientationchange方向改变事件
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
			//当前设备视口宽度
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';//1rem=50px 原型图为640宽 测量出来的宽度/100
                                                        //320       //1rem=25px 原型图为320宽 测量出来的宽度/100
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);