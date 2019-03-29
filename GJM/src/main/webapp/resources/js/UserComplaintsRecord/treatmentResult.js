var BINDSTATE = 0; // 0:全部、1:匹配
var cno;
var mode;
var billList = null;
var ueditor = null;	// UE
$(function(){
	// 初始化数据
	initData();
	// 加载数据
	loading();
});
/** 是否为空 */
var isEmpty = function(str) {
	return str == null || typeof str == "undefined" || str == "" || str == "undefined"|| str == "null" || str.length == 0 || str == {};
};
/** 返回字符串 */
function returnValue(str) {
	return (str == null || typeof (str) == "undefined" || str == "undefined") ? "" : str + "";
}
/** 查询Url参数*/
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	//	if (r != null) return unescape(r[2]); return null;
	if (r != null)
		return decodeURI(r[2]);
	return null;
}
/** 为空替换 如果str为空，则返回replace*/
function returnNullReplace(str, replace) {return isEmpty(str) ? replace : returnValue(str);}

/** 初始化数据*/
function initData(){
	cno = getQueryString("coRe_id");
}
/**
 * 毫秒转换为日期格式
 * @param time 时间/时间字符串
 * @param format 时间格式 "yyyy-MM-dd" || "yyyy-MM-dd HH:mm:ss"
 * @returns
 */
function format(time, format) {
	if (isEmpty(time)) {
		return "";
	}
	var t = new Date(time);
	var tf = function(i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch(a) {
		case 'yyyy':
			return tf(t.getFullYear());
			break;
		case 'MM':
			return tf(t.getMonth() + 1);
			break;
		case 'mm':
			return tf(t.getMinutes());
			break;
		case 'dd':
			return tf(t.getDate());
			break;
		case 'HH':
			return tf(t.getHours());
			break;
		case 'ss':
			return tf(t.getSeconds());
			break;
		}
	});
}
/** 返回合同操作状态*/
function returnContractOptionState(param) {
	var _data = {};
	switch (param) {
	case 1 :
		_data.title = "处理中";
		_data.color = "next";
		_data.image = "sh-iocn-wcl";
		break;
	case 0 :
		_data.title = "处理完毕";
		_data.color = "next";
		_data.image = "sh-iocn-ycl";
		break;
	}
	return _data;
}

/** 处理结果*/
function loading(){
	// 查询处理结果
	$.ajax({
		type : "POST",
		url: "/userRecord/result",
		data : {
			cno : cno
		},
		dataType : "json",
		beforeSend : function(){
			$("#contract-content").html('<div class="loading"></div>');
		}
	}).done(function(result){
		switch (result.code) {
			case 200:
				data = result.data;
				// 投诉意见
				contractObject = data.complaintsRecord;
				// 处理结果
				contractBody = data.ComplaintsResult;
				// 显示数据
				$("#contract-content").displayContract({
					data : { cno : cno }
				});
				break;
			default :
				break;
		}
	});
}


;(function($, document) {
	$.fn.displayContract = function(options) {
		return this.each(function() {
			var _this = this;

			var defaults = {
				data : {},
				show_house : true, 
				show_customer : true, 
				show_contract : true, 
			};
			var opts = $.extend(defaults, options);
			/** 初始化数据 */
			_this.init = function() {
				$.ajax({
					type : "POST",
					url : "/userRecord/result",
					data : opts.data,
					dataType : "json"
				}).done(function(result) {
					if (result.code != 200) {
						return;
					}
					data = result.data;
					// 投诉意见
					contractObject = data.complaintsRecord;
					// 回复信息
					contractBody = data.ComplaintsResult.list;

					var html = "";
					html += '<ul class="title-nav">';
					html += '	<li class="visited">' + "投诉建议";
					html += '	</li>';
					html += '</ul>';
					$("#contract-title").html(html);
					
					html = "";
					html += '<div class="content-item">';
					// 【显示投诉建议信息】
					if (opts.show_house) {
						html += '	<fieldset>';
						html += '		<legend>投诉建议信息</legend>';
						html += '		<span><label>姓名</label>'+contractObject.coRe_name+'</span>';
						html += '		<span><label>电话号码</label>'+contractObject.coRe_phone+'</span>';
						html += '		<span><label>时间</label>'+ format(contractObject.coRe_time,'yyyy-MM-dd HH:mm:ss')+'</span>';
						html += '		<hr>';
						html += '		<span><label>内容</label>' + returnNullReplace(contractObject.coRe_content, '<label class="error">无</label>') + '</span>';
						html += '		<hr>';
						html += '		<hr>';
						html += '		<div class="sh-icon ' + returnContractOptionState(contractObject.coRe_state).image + '"></div>';
						html += '	</fieldset>';
					}
					// 【显示处理信息】
					if(!isEmpty(contractBody)){
						for (var i=0;i<contractBody.length;i++) {
							html += '	<fieldset>';
							html += '	<legend>处理记录</legend>';
							html += '		<span><label>姓名</label>'+returnValue(contractBody[i].em_name)+'</span>';
							html += '		<span><label>时间</label>'+format(contractBody[i].ret_time,'yyyy-MM-dd HH:mm:ss')+'</span>';
							html += '		<hr>';
							html += '		<span><label>内容</label>' + returnValue(contractBody[i].ret_result) + '</span>';
							html += '		<hr>';
							html += '	</fieldset>';
						}
					}
					if (contractObject.coRe_state != 0) {
						html += '		<button type="butten" class="finish-butten">处理完毕</button>';
						html += '<hr>';
						html += '	<fieldset>';
						html += '	<legend>回复</legend>';
						html += '		<textarea name="hi_text" id="hi_text" style="width:900px;height:400px;" class="content-result"></textarea>';
						html += '		<hr>';
						html += '		<button type="butten" class="content-butten">提交</button>';
						html += '	</fieldset>';
					}

					$(_this).html(html);
					// 加载编辑器
					ueditor = UE.getEditor('hi_text',{imagePathFormat: "/resources/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",autoHeightEnabled: false});
				});
			};

			_this.init();
		});
	};
})($, document);

//点击提交
$(document).on("click", ".content-butten", function(){
	var ue = UE.getEditor('hi_text');
	//获取编译内容	
	var content = ue.getContent();
	if (content =='' ) {
		$.jBox.tip("未填写内容！","error");
		return false;
	}
	$.ajax({
		url : "/userRecord/RecoveryResult",
		type : "POST",
		data : {coRd_id:cno,content:content},
		dataType : "json",
		success:function(data){
			location.reload();
		},
		error:function(){
			$.jBox.tip(data.msg,"error");
		}
	})
});

//点击处理完毕
$(document).on("click", ".finish-butten", function(){
	var ue = UE.getEditor('hi_text');
	//获取编译内容	
	var content = ue.getContent();
	if (content !='' ) {
		$.jBox.tip("有内容未提交","error");
		return false;
	}else{
		if (!isEmpty(contractBody)) {
			$.ajax({
				url : "/userRecord/Resultfinish",
				type : "POST",
				data : {coRd_id:cno},
				dataType : "json",
				success:function(data){
					location.reload() ;
				},
				error:function(){
					$.jBox.tip(data.msg,"error");
				}
			})
		}else{
			$.jBox.tip("未处理！","error");
		}
	}
});