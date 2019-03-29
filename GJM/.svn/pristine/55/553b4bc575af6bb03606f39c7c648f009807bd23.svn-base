var where = "";
;(function($){
	
	/** 搜索*/
	$.search = function(){
		// 缓存时间
		var cache_time = null;
		// 定时时间
		var setOutTime = 600;
		// 定时器
		var outTime = null;
		// 缓存文本
		var cache_text = "";
		
		// 事件-搜索框
		$("[name=search-content]").on({
			"input propertychange" : function(){
				var _this = $(this);
				var _close = $(this).next(".input-close");

				var currentTime = new Date().getTime();
				if(cache_time == null){
					cache_time = currentTime;
				}
				
				if($(this).val().length > 0){
					var boo = true;
					if(currentTime - cache_time < setOutTime){
						boo = false;
						// 还在输入时，移除定时器
						clearTimeout(outTime);
					}
					cache_time = currentTime;
					// 执行定时器
					outTime = setTimeout(function(){
                        where = $("[name=search-content]").val();
						$.search.load_data();
					}, setOutTime);
					if(boo){
						// 可查询时，移除定时器
						clearTimeout(outTime);
                        where = $("[name=search-content]").val();
						// 加载数据
						$.search.load_data();
					}
					// 显示文本清空图标时，并绑定事件
					if(_close.is(":hidden")) {
						_close.fadeIn().on("click", function(){
							_this.val("").focus();
							$(this).hide().off("click");
							$.search.remove_search_data();
                            where = $("[name=search-content]").val();
							// 加载数据
							$.search.load_data();
						});
					}
				} else {
					// 搜索框为空时，移除定时器
					clearTimeout(outTime);
					_close.fadeOut().off("click");
					$.search.remove_search_data();
					where = $("[name=search-content]").val();
					// 加载数据
					$.search.load_data();
				}
			},
		}).focus();
		
		// 编辑客户
		$("#search-data").on("click", "[name=customer-edit]", function(e){
			e.stopPropagation();
			var _data = $(this).parents(".customer-item").data("data");
			window.location.href="/appPage/customerEdit?cc_code="+_data.cc_code;
		});
		
		// 选中客户
		$("#search-data").on("click", ".customer-item", function(){
			var _data = $(this).data("data");
            _data.type = "customer";
            if(_data.cc_cardNum == null || _data.cc_cardNum == ""){
            	alert("该用户没有完善身份证");
            	return;
			}
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers.goBackWhere.postMessage([JSON.stringify(_data)]);
            } else if (/(Android)/i.test(navigator.userAgent)) {
                webview.goBackWhere(JSON.stringify(_data));
            }
		});
		
		$.search.load_data();
	};
	
	/** 搜索-变量*/
	$.search.param = {
		pageNo : 1,	
		pageSize : 10,	
	};
	
	/**搜索-加载数据*/
	$.search.load_data = function(mode){
		var param = $("[name=search-content]").val();
		$.ajax({
			type : "POST",
			url : "/appPage/customerSearch/queryCustomerPageList",
			data : {
				pageNo : $.search.param.pageNo,
				pageSize : $.search.param.pageSize,
				cc_name : param,
				ccp_phone : param,
				cc_cardNum : param,
			},
			dataType : "json",
			beforeSend : function(){
				if(mode != "update"){
					$("#search-data").html('<div style="text-align: center;line-height: 40px;">搜索中...</div>');
				}
			}
		}).done(function(result){
			if(result.code != 200){
				return;
			}
			
			if(mode != "update"){
				$("#search-data").empty();
			}
			$.each(result.data.list, function(index, data){
				var phone = isEmpty(data.ccp_phone) ? '<label class="error">无手机号</label>' : returnValue(data.ccp_phone);
				var cardNumber = isEmpty(data.cc_cardNum) ? '<label class="error">无身份证</label>' : returnValue(data.cc_cardNum);
				var cardImage = "";
				if(!isEmpty(data.customerImages)){
					$.each(data.customerImages, function(index, data){
						if(data.cci_type == "CD1"){
							cardImage = data.cci_path;
						}
						if(!isEmpty(cardImage)){
							return false;
						}
					});
					if(isEmpty(cardImage)){
						$.each(data.customerImages, function(index, data){
							if(data.cci_type == "CD2"){
								cardImage = data.cci_path;
							}
							if(!isEmpty(cardImage)){
								return false;
							}
						});
					}
					if(isEmpty(cardImage)){
						$.each(data.customerImages, function(index, data){
							if(data.cci_type == "CD"){
								cardImage = data.cci_path;
							}
							if(!isEmpty(cardImage)){
								return false;
							}
						});
					}
				}
				
				var html = '';
				html += '<div class="content-item customer-item" style="padding-right: 0;">';
				html += '	<div class="item-content">';
				html += '		<div class="item-content-icon">'+ (isEmpty(cardImage)?"无图":'<img data-original="'+ cardImage +'" alt="身份照">') +'</div>';
				html += '		<div class="item-content-main">';
				html += '			<div><strong>'+ returnValue(data.cc_name) +'</strong> - '+ phone +'</div>';
				html += '			<div>'+ cardNumber +'</div>';
				html += '		</div>';
				html += '		<button class="item-content-option next" name="customer-edit">编辑</button>';
				html += '	</div>';
				html += '</div>';
				$("#search-data").append(html).find(".customer-item:last").data("data", data);
				$("img").lazyload();
			});
		});
	};
	
	/** 清除结果*/
	$.search.remove_search_data = function(){
		$("#search-data").empty();
	};
	
	/** 重新加载数据*/
	$.search.reloadData = function(){
		$.search.load_data();
	};
	
	$(function(){
		$.search();
	});

})(jQuery);

/** 回调值 **/
function where(result){
	$("[name=search-content]").val(where);
    // 加载数据
    $.search.load_data();
}