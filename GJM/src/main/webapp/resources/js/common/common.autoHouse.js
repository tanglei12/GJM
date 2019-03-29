/** 自动化小区房号*/
;(function($, document) {
	$.fn.AutoHouse = function(options) {
		return this.each(function() {
			var _this = this;

			var defaults = {
				list_limit : 10,
				custom_item_btn : {},
				result : function(param) {}
			};
			var opts = $.extend(defaults, options);
			var _main_box = $(this);

			/** 加载视图*/
			this.load_view = function() {
				var top = $(_this).position().top;
				var left = $(_this).position().left;
				var width = $(_this).outerWidth();
				var height = $(_this).outerHeight();

				$(_this).after('<div id="auto-house-box"><table></table></div>');
				
				// 赋值变量
				$("#auto-house-box").css({ 
					top : top + height + 6, 
					left : left,
					minWidth : width
				});
				
				_main_box = $("#auto-house-box");

				// 加载事件
				this.load_event();
			};
			
			/** 加载事件*/
			this.load_event = function() {
				var eindex = -1;
				
				// 文本框获取焦点
				$(_this).on("input propertychange", function() {
					_main_box.show();
					_this.load_data();
					eindex = -1;
				});
				// 文本框获取焦点
				$(_this).on("focus", function() {
					_main_box.show();
					_this.load_data();
				});
				
				// 绑定上下按键事件
				$(_this).on("keyup", function(e) {
					var _item = _main_box.find(".auto-item");
					switch(e.keyCode) {
					case 13:
						if(eindex != -1){
							_item.eq(eindex).click();
						}
						eindex = -1;
						break;
					case 38:
						eindex--;
						eindex = eindex < 0 ? _item.length - 1 : eindex;
						_item.removeClass("auto-item-hover").eq(eindex).addClass("auto-item-hover");
						break;
					case 40:
						eindex++;
						eindex = eindex >= _item.length ? 0 : eindex;
						_item.removeClass("auto-item-hover").eq(eindex).addClass("auto-item-hover");
						break;
					}
				});
				// 点击不隐藏事件
				$(_this).on("click", function(e) { e.stopPropagation(); });
				// 点击不隐藏事件
				_main_box.on("click", function(e) { e.stopPropagation(); });
				// 点击其他区域隐藏
				$(document).on("click", function(e) { _this.close(); });
			};
			
			/** 加载数据*/
			this.load_data = function(){
				$.ajax({
					type : 'POST',
					url : '/houseLibrary/queryAutoHouseInfoList',
					data : {
						pageNo : 1,
						pageSize : opts.list_limit,
						house_address : $(_this).val()
					},
					dataType : 'json',
				}).done(function(result){
					if(result.code != 200){
						return;
					}
					_main_box.empty();
					if(isEmpty(result.data.list)){
						_main_box.append('<div class="auto-item error"><i class="fa-info-circle" style="margin-right: 4px;font-size: 14px;"></i>没有发现数据</div>');
						return;
					}
					_main_box.html("<table></table>");
					$.each(result.data.list, function(index, data){
						var option_btn = '';
						if(!isEmpty(opts.custom_item_btn.text)){
							option_btn = '<button class="option-btn">'+ opts.custom_item_btn.text +'</button>';
						}
						_main_box.find("table").append('<tr><td class="auto-item">'+ data.house_address + option_btn +'</td></tr>');
						_main_box.find(".auto-item:last")
							.data("data", data)
							.on("click", function(){
								opts.result($(this).data("data"));
								_this.close();
							});
					});
				});
			};
			
			/** 关闭*/
			this.close = function(){
				_main_box.hide("fast").empty();
			};
			
			/** 执行方法*/
			this.load_view();
			return this;
		});
	};
})($, document);