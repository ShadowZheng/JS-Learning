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
});
