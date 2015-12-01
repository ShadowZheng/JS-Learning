$(function() {
	// 搜索框
	(function(){
		var oLis = $('#search li');
		var oTxt = $('#search form .text');
		var txt = [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
		];
		var iNow = 0;
		oTxt.val(txt[iNow]);
		oLis.each(function(index) {
			$(this).click(function(event) {
				oLis.removeClass('active');
				$(this).addClass('active');
				iNow = index;
				oTxt.val(txt[iNow]);
			});
		});
		oTxt.focus(function(event) {
			if (this.value == txt[iNow]) {
				this.value = '';
			};
		});
		oTxt.blur(function(event) {
			if (!this.value) {
				this.value = txt[iNow];
			};
		});
	})();

	// update
	(function(){
		var $update = $('.update');
		var $oUl = $('.update ul');
		var $updateUpBtn = $('#updateUpBtn');
		var $updateDownBtn = $('#updateDownBtn');
		var timer = null;
		var arrData = [
			{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
			{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
		];
		var str = '';
		for (var i = 0; i < arrData.length; i++) {
			str += '<li><a href="' + arrData[i].url + '"><strong>' + arrData[i].name + '</strong> <span>' + arrData[i].time + '分钟前</span> ' + arrData[i].title + '...</a></li>';
		};
		$oUl.html(str);
		var iH = $oUl.find('li').height();
		var iNow = 0;

		$updateUpBtn.click(function(event) {
			iNow--;
			if (iNow < 1) {
				iNow = arrData.length - 1;
			};
			$oUl.stop().animate({top: iH * -iNow}, 'slow');
		});
		$updateDownBtn.click(function(event) {
			iNow++;
			if (iNow > arrData.length - 1) {
				iNow = 0;
			};
			$oUl.stop().animate({top: iH * -iNow}, 'slow');
		});

		$update.hover(function() {
			clearInterval(timer);
		}, autoPlay);

		function autoPlay() {
			timer = setInterval(function() {
				$updateDownBtn.click();
			}, 2000);
		}
		autoPlay();
	})();

	// options
	(function() {
		fnTab($('.tab1'), $('.navCon1'), 'click');
		fnTab($('.tab2'), $('.tabCon'), 'click');
		fnTab($('.tab3'), $('.tabCon3'), 'mouseover');
		fnTab($('.tab4'), $('.tabCon4'), 'mouseover');
		function fnTab(oNav, oCon, oEvent) {
			var $aTabs = oNav.children();
			oCon.hide().eq(0).show();
			$aTabs.each(function(index, el) {
				$(this).on(oEvent,function() {
					$aTabs.removeClass('active').addClass('gradient');
					$(this).addClass('active');
					$aTabs.find('i').attr('class', 'triangle triangle-bottom-gray');
					$(this).find('i').attr('class', 'triangle triangle-bottom-red');
					oCon.hide().eq(index).show();
				});
			});
		}
	})();

	// 自动播放焦点图
	(function() {
		var $ulLi = $('.pic ul li');
		var $olLi = $('.pic ol li');
		var $p = $('.pic p');
		var timer = null;
		var iNow = 0;	
		fnFade();
		autoPlay();
		$olLi.each(function(index) {
			$(this).click(function(event) {
				iNow = index;
				fnFade();
			});
		});

		$('.pic').hover(function() {
			clearInterval(timer);
		}, autoPlay);

		function autoPlay() {
			timer = setInterval(function(){
				iNow++;
				if (iNow > $olLi.length - 1) {
					iNow = 0;
				};
				fnFade();
			}, 2000);
		}

		function fnFade() {
			$ulLi.each(function(index) {
				if (index != iNow) {
					$(this).fadeOut().css('zIndex', '1');;
					$olLi.eq(index).removeClass('active');
				} else {
					$(this).fadeIn().css('zIndex', '2');;
					$olLi.eq(index).addClass('active');
				}
				$p.text($olLi.eq(iNow).find('img').attr('alt'));
			});
		}
	})();

	// 日历
	(function() {
		var $calendar = $('.calendar');
		var $span = $calendar.find('h3 span');
		var $img = $calendar.find('.img');
		var $info = $('.act_info');

		$img.hover(function() {
			var iTop = $(this).parent().position().top - 30;
			var iLeft = $(this).parent().position().left + 50;
			var index = $(this).parent().index()%$span.size();
			
			$info.show().css({
				'top': iTop,
				'left': iLeft
			});
			$info.find('img').attr('src', $(this).attr('src'));
			$info.find('strong').text($span.eq(index).text());
			$info.find('p').text($(this).attr('alt'));
		}, function() {
			$info.hide();
		});
	})();

	// BBS
	(function(){
		$('.bbs li').mouseover(function(event) {
			$('.bbs li').removeClass('active');
			$(this).addClass('active');
		});
	})();

	// 红人烧客
	(function() {
		var arr = [
			'',
			'用户1<br />人气1',
			'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />人气3',
			'用户4<br />人气4',
			'用户5<br />人气5',
			'用户6<br />人气6',
			'用户7<br />人气7',
			'用户8<br />人气8',
			'用户9<br />人气9',
			'用户10<br />人气10'
		];
		$('.hot-area li').mouseover(function(event) {
			if ($(this).index() == 0) {
				return false;
			};
			$('.hot-area li p').remove();
			var $p = $('<p>' + arr[$(this).index()] + '</p>').css({
				width: $(this).width() - 12 + 'px',
				height: $(this).height() - 12 + 'px'
			});
			$(this).append($p);
		});
	})();
});
