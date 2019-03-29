/** 插件-合同显示 */
(function($, document) {
	$.fn.dataList = function(options) {
		return this.each(function() {
			var defaults = {
				showHead 		: true,			// 
				showHeadTop 	: true,			// 
				showHeadTopList : [],			// 
				showHeadBottom 	: true,			// 
				showBody 		: true,			// 
				showFoot 		: true,			// 
			};
			var opts = $.extend(defaults, options);

			var $this = this;
			var _box = "";

			/** 初始化数据 */
			_this.init = function() {
				$this.empty();
				
				var html = '';
				html += '<div class="list-table">';
				if(opts.showHead){
					html += '<div class="list-table-head">';
					if(opts.showHeadTop){
						html += '<ul>';
						if(opts.showHeadTopList != null && typeof opts.showHeadTopList == "object"){
							$.each(opts.showHeadTopList, function(index, data){
								var obj = ""; 
								switch (data.type) {
									case "text":
										obj = $('<input type="text" class="searchBar">');
										break;
									case "select":
										var html = '';
										$.each(data.list, function(name, value){
											html += '<option value="'+ value +'">'+ name +'</option>';
										});
										obj = $('<select class="searchBar">').html(html);
										break;
								}
								obj.css(data.style).attr({
										'name' : data.name,
										'placeholder' : data.placeholder,
										'disabled' : data.disabled,
										'readonly' : data.readonly,
										'required' : data.required,
									});
								html += '<li>'+ obj +'</li>';
							});
						}
						html += '';
						html += '</ul>';
					}
					if(opts.showHeadBottom){
						html += '	<ul></ul>';
					}
					html += '</div>';
				}
				if(opts.showBody){
					html += '<div class="list-table-content">';
					html += '	<table>';
					html += '		<thead></thead>';
					html += '		<tbody></tbody>';
					html += '	</table>';
					html += '</div>';
				}
				if(opts.showFoot){
					html += '<div class="list-table-foot">';
					html += '	<div class="foot-page-info"></div>';
					html += '	<div class="foot-page-option"></div>';
					html += '</div>';
				}
				html += '</div>';
				
				_box = $(html).prependTo($this);
			};

			/** 初始化事件 */
			_this.initEvent = function() {
				
			};
			
			// 加载
			_this.init();
		});
	};
})($, document);