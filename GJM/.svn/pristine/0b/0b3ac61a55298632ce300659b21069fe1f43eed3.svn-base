;(function($) {

	/** 初始化*/
	$.box = function(param) {
		$.box.param = $.extend({}, $.box.param, param, true);
		$.box.load_view();
	};

	/** 参数 */
	$.box.param = {
		title : '',
		body : '',
		footer : [], // {name : "confirm",text : "确认",},{name : "cancel",text : "取消",}
		onEvent : function(){},
		onData : function(){},
	};
	
	$.box.load_view = function(){
        dynamicLoading.css('/resources/css/common/common.box.css');
		
		$.box.param.footer = typeof $.box.param.footer == "object" ? $.box.param.footer : [];
		
		var footer = '';
		$.each($.box.param.footer, function(index, data){
			var _style = data.name == "cancel" ? "error-bg" : "next-bg";
			footer += '<buttom class="cbmm-btn '+ _style +'" name="'+ data.name +'">'+ data.text +'</buttom>';
		});
		
		var html = '';
		html +='<div id="custom-box-model">';
		html +='	<div class="custom-box-model-main">';
		html +='		<div class="cbmm-head"><h4>'+ $.box.param.title +'</h4></div>';
		html +='		<div class="cbmm-body custom-scroll">'+ $.box.param.body +'</div>';
		html +='		<div class="cbmm-footer">'+ footer +'</div>';
		html +='	</div>';
		html +='</div>';
		var box = $(html).appendTo("body");
		
		box.addClass("fade-in");
		
		box.find(".custom-box-model-main").slideDown();
		
		// 绑定数据
		$.box.param.onData(box);
		
		// 绑定事件
		$.box.param.onEvent(box);
		
		// 加载事件
		$.box.load_event(box);
	};
	
	$.box.load_event = function(box){
		box.on("click", function(){
			$.box.close();
		});
		
		// 
		box.find(".custom-box-model-main").on("click", function(e){
			e.stopPropagation();
			
		});
	};
	
	$.box.close = function(){
		var box = $("#custom-box-model"); 
		box.find(".custom-box-model-main").slideUp();
		box.removeClass("fade-in").remove();
	};

})(jQuery);