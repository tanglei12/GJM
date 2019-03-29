$(function(){
	$.housekeeper();
});

;(function($){
	
	$.housekeeper = function(){
		$.housekeeper.search();
		$.housekeeper.query();
		$.housekeeper.load_data();
	};
	
	/** 搜索==*/
	$.housekeeper.search = function(){
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
						$.housekeeper.load_data();
					}, setOutTime);
					if(boo){
						// 可查询时，移除定时器
						clearTimeout(outTime);
						// 加载数据
						$.housekeeper.load_data();
					}
					// 显示文本清空图标时，并绑定事件
					if(_close.is(":hidden")) {
						_close.fadeIn().on("click", function(){
							_this.val("").focus();
							$(this).hide().off("click");
							$.housekeeper.search_remove_data();
							// 加载数据
							$.housekeeper.load_data();
						});
					}
				} else {
					// 搜索框为空时，移除定时器
					clearTimeout(outTime);
					_close.fadeOut().off("click");
					$.housekeeper.search_remove_data();
					// 加载数据
					$.housekeeper.load_data();
				}
			},
		});
		
		// 选中管家
		$("#search-data").on("click", ".customer-item", function(){
			var _data = $(this).data("data");
			var arry = {};
            arry.em_id = _data.em_id;
            arry.em_name = _data.em_name;
            arry.em_phone = _data.em_phone;
            arry.type = "em";
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers.goBackWhere.postMessage([JSON.stringify(arry)]);
            } else if (/(Android)/i.test(navigator.userAgent)) {
                webview.goBackWhere(JSON.stringify(arry));
            }
		});
	};
	
	/** 搜索-变量*/
	$.housekeeper.search_param = {
		pageNo : 1,	
		pageSize : 10,
	};
	
	/** 搜索-清除搜索结果*/
	$.housekeeper.search_remove_data = function(){
		$("#search-data").empty();
	};

	/** 筛选==*/
	$.housekeeper.query = function(){
		$.housekeeper.query_load_event();
	};
	
	/** 筛选-变量*/
	$.housekeeper.query_param = {};
	
	/** 筛选-改变筛选*/
	$.housekeeper.query_changeFilter = function(obj, type){
		var box = $("#filter-box");
		var content = box.find(".item-mask-main");
		
		if($(obj).attr("data-checked") == "true"){
			$.housekeeper.query_closeFilterBox();
			return;
		}
		
		$(".filter-angle").removeAttr("data-checked");
		$(".filter-angle>.icon").removeClass("fa-angle-up ok").addClass("fa-angle-down");
		switch (type) {
			case "department" :
				if($.housekeeper.query_param.data == null){
					$.ajax({
						type : "POST",
						url : "/appPage/housekeeperDepartment",
						dataType : "json",
						beforeSend : function(){
							content.html('<div class="mask-main-item">加载中...</div>');
						}
					}).done(function(result){
						if(result.code != 200){
							return;
						}
						$.housekeeper.query_param.data = result.data;
						// 加载部门数据
						$.housekeeper.query_load_departmentData(obj);
					});
				} else {
					// 加载部门数据
					$.housekeeper.query_load_departmentData(obj);
				}
				break;
			case "sex" :
				var html = '';
				html += '<div class="mask-main-item" data-value="-1">全部</div>';
				html += '<div class="mask-main-item" data-value="man">男</div>';
				html += '<div class="mask-main-item" data-value="woman">女</div>';
				content.html(html);
				content.find(".mask-main-item[data-value="+ $(obj).val() +"]").addClass("ok");
				break;
			case "state" :
				var html = '';
				html += '<div class="mask-main-item" data-value="-1">全部</div>';
				html += '<div class="mask-main-item" data-value="1">在职</div>';
				html += '<div class="mask-main-item" data-value="0">离职</div>';
				html += '<div class="mask-main-item" data-value="2">申请离职</div>';
				content.html(html);
				content.find(".mask-main-item[data-value="+ $(obj).val() +"]").addClass("ok");
				break;
		};
		box.show();
		$(obj).attr("data-checked", "true");
		$(obj).find(".icon").removeClass("fa-angle-down").addClass("fa-angle-up ok");
	};
	
	/** 筛选-绑定事件*/
	$.housekeeper.query_load_event = function(){
		$("#filter-box").on("click", function(){
			$.housekeeper.query_closeFilterBox();
		});
		$("#filter-box").on("click", ".mask-main-item", function(){
			var target = $(".filter-angle[data-checked=true]");
			target.val($(this).attr("data-value"));
			if(returnNumber($(this).attr("data-value")) == -1){
				target.find(".text").html(target.find(".text").attr("data-text"));
			} else {
				target.find(".text").html($(this).text());
			}
			$.housekeeper.load_where_data();
		});
	};
	
	/** 筛选-关闭筛选Box*/
	$.housekeeper.query_closeFilterBox = function(){
		$("#filter-box").hide();
		$(".filter-angle").removeAttr("data-checked");
		$(".filter-angle>.icon").removeClass("fa-angle-up ok").addClass("fa-angle-down");
	};
	
	/** 筛选-加载部门数据*/
	$.housekeeper.query_load_departmentData = function(obj){
		var box = $("#filter-box");
		var content = box.find(".item-mask-main");
		
		var html = '';
		html += '<div class="mask-main-item" data-value="-1">所有部门</div>';
		$.each($.housekeeper.query_param.data, function(index, data){
			html += '<div class="mask-main-item" data-value="'+ data.ucc_id +'">'+ returnValue(data.ucc_name) +'</div>';
		});
		content.html(html);
		if(obj){
			content.find(".mask-main-item[data-value="+ $(obj).val() +"]").addClass("ok");
			content.scrollTop(content.find(".mask-main-item[data-value="+ $(obj).val() +"]").position().top);
		}
	};
	
	/** 加载数据*/
	$.housekeeper.load_where_data = function(mode){
		$.housekeeper.search_param.pageNo = 1;
		$.housekeeper.load_data();
	};
	
	/** 加载数据*/
	$.housekeeper.load_data = function(mode){
		var param = $("[name=search-content]").val();
		var ucc_id = returnNumber($("[name=ucc_name]").val()) == -1 ? "" :  $("[name=ucc_name]").val();
		var em_sex = returnNumber($("[name=em_sex]").val()) == -1 ? "" :  $("[name=em_sex]").val();
		var em_state = returnNumber($("[name=em_state]").val()) == -1 ? "" :  $("[name=em_state]").val();
		$.ajax({
			type : "POST",
			url : "/appPage/queryHousekeeperList",
			data : {
				pageNo : $.housekeeper.search_param.pageNo,
				pageSize : $.housekeeper.search_param.pageSize,
				ucc_id : ucc_id,
				em_sex : em_sex,
				em_state : em_state,
				em_name : param,
				em_phone : param,
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
				var state = {
					text : "",
					style : "",
				};
				switch (data.em_state) {
					case 0:
						state.text = "离职";
						state.style = "error";
						break;
					case 1:
						state.text = "在职";
						state.style = "ok";
						break;
					case 2:
						state.text = "申请离职";
						state.style = "hint";
						break;
				}
				var html = '';
				html += '<div class="content-item" style="padding-right: 0;">';
				html += '	<div class="item-content customer-item">';
				html += '		<div class="item-content-icon">'+ (isEmpty(data.em_image) ? "无图" : '<img data-original="'+ data.em_image +'" alt="身份照">') +'</div>';
				html += '		<div class="item-content-main">';
				html += '			<div><strong>'+ returnValue(data.em_name) +'</strong> - '+ returnValue(data.em_phone) +' - '+ returnValue(data.em_sex == "man" ? "男" : "女") +'</div>';
				html += '			<div>'+ returnValue(data.ucc_name) +'</div>';
				html += '		</div>';
				html += '		<button class="item-content-option '+ state.style +'">'+ state.text +'</button>';
				html += '	</div>';
				html += '</div>';
				$("#search-data").append(html).find(".customer-item:last").data("data", data);
				$("img").lazyload();
			});
		});
	};
})(jQuery);