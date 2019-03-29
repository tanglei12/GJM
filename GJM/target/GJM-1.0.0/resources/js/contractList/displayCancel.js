var cco_code, mode, conType;

$(function() {
	
	cco_code = getQueryString("cco_code");
	mode = getQueryString("mode");
	
	// 初始化数据
	initViewData();
})

/** 初始化房屋结算数据*/
function initViewData(){
	$("#cancel-order-box").handoverBox({
		data : {
			cco_code : cco_code,
			mode : "out"
		},
		display_all : true,
		result : function (){}
	});
}