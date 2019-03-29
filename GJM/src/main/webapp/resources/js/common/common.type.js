(function(){
	var common = {
		type : function(id, callback){
			$.ajax({
				type : 'POST',
				url : '/contractObject/queryContractType',
				data : {id : returnNumber(id)},
				dataType : 'json'
			}).done(function(result){
				callback(result);
			});
		},
		/** 支付周期：月付、季付、半年付、年付、打包年付*/
		pay_cycle_tg : function(c){common.type(23, c)},
		/** 支付周期：月付、季付、半年付、年付、打包年付*/
		pay_cycle_zl : function(c){common.type(4, c)},
        /** 支付类型：收租宝、家财宝*/
        pay_way_tg : function(c){common.type(21, c)},
        /** 支付类型：58分期、乐首付、管家婆、会分期、租了么*/
        pay_way_zl : function(c){common.type(6, c)},
		/** 账单生成方式*/
		bill_way_tg : function(c){common.type(22, c)},
        /** 支付类型：管家婆、磐谷*/
        pay_year_tg : function(c){common.type(24, c)},
        /** 月付租金上浮：3%，5%，自定义*/
        up_ratio_zl : function(c){common.type(25, c)},
	};
	window.common = common;
})(jQuery);
