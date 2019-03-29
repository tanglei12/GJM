// JavaScript Document

//获取数据的时候必须添加异步提交：async:false,

//自定义右键上下文
var imageMenuData = [
    [{
        text: "关闭标签页",
        func: function() {
        	titleClose($(this).find(".meunTitle").attr("id").replace("meunTitle",""));
        }
    }, {
        text: "关闭其他标签页",
        func: function() {
        	var text_title =  $(this).text();
        	$(".title_top li").each(function(){
        		if(text_title == $(this).text()){
        			titleCloseOther($(this).find(".meunTitle").attr("id").replace("meunTitle",""));
        		}
        	});
           ;
        }
    }]
];

// 判断层是否隐藏
var bool = true;
// 对象
var obj;

$(function(){
	
	
	$("body").append("<!-- 判断字体width --><div id='font_width'></div><!-- end -->");
	
	//封装取消标签页事件
	$.getScript("/resources/js/menuTitle.js");
	// 引用滚动条插件
	$('head').append('<link href="/resources/common/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">');
	$('head').append('<script src="/resources/common/perfect-scrollbar/js/perfect-scrollbar.jquery.js"></script>');
	//标签页左键插件
	/*$.getScript("/resources/js/jquery-smartMenu.js");*/
	
	
	$('.tablelist tbody tr:odd').addClass('odd');
	$("#ck_all").click(function(){
		if($(this).find("input").attr("checked")=="checked"){
			$(".tablelist tr").each(function(index, element) {
				$(this).find("input").attr("checked","checked");
			});
		}else{
			$(".tablelist tr").each(function(index, element) {
				$(this).find("input").removeAttr("checked");
			});
		}
	});
	
	var indexs = 0;
	$(".title_top ul li", window.parent.document).each(function(){
		if($(document).attr("title") == $(this).find(".meunTitle").text()){
			indexs = parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle",""));
		}
	});
	
	$(".title_top ul li", window.parent.document).each(function(){
		if($(this).css("background-color") == "rgb(48, 54, 65)"){
			if($(this).find(".meunTitle").attr("data-type") != $(this).find(".meunTitle").text()){
				var	index = parseInt($(this).find(".meunTitle").attr("id").replace("meunTitle",""));
				window.parent.titleClose(index,indexs);
			}
		}
	});
	
	//读取数据按钮
	$("#contentDiv .click").css("height","40px").css("line-height","40px");
	
	//按钮时间执行
	$(".tools").find(".click").each(function(){
		if($(this).find("input").length != 1 && $(this).find("select").length != 1){
			$("#font_width").html($(this).find("a").text());
			if($("#font_width").width() == 0){
				tdWidth += 120;
			}else{
				$(this).width($("#font_width").width()+60);
			}
			
		}
	});
	
});

/**
 * tr点击选中
 * 
 * @param ids
 */
function mousedownTr(ids){
	$(".tablelist tbody tr").each(function(i){
		$(this).find("td input[type=checkbox]").attr("checked",false);
	});
	
	$(ids).find("td").each(function(i){
		if(i == 0){
			if(!$(this).find("input").is(':checked')){
				$(this).find("input").attr("checked",true);
			}else{
				$(this).find("input").attr("checked",false);
			}
		}
	});
}


//隐藏字段
function hide_table(){
	//去字段层自适应
	var fontDiv = 0;
	
	$(".showHide_content").html("");
	$(".tablelist thead tr td").each(function(index) {
		if(index > 1){
			if($(this).text() != ""){
				if($(this).is(":hidden")){
					$(".showHide_content").append("<div class='showHide_font'><input type='checkbox' style='margin-right:1px;' onclick='hide_font(this)' value='"+ $(this).text() +"' />"+ $(this).text() +"</div>");
				}else{
					$(".showHide_content").append("<div class='showHide_font'><input type='checkbox' style='margin-right:1px;' checked='checked' onclick='hide_font(this)' value='"+ $(this).text() +"' />"+ $(this).text() +"</div>");
				}
			}
		}
	});
	
	$(".showHide_content div").each(function(index) {
		if($(this).text() != ""){
			$("#font_width").html($(this).text());
			if($("#font_width").width() == 0){
				tdWidth += 120;
			}else{
				if(fontDiv < ($("#font_width").width()+50)){
					fontDiv = $("#font_width").width()+120;
				}
			}
			
		}
	});
	$(".showHide_content").width(fontDiv);
}

//隐藏字段font
function hide_font(id) {
	var name = $(id).val();
	var index = 0;
	if ($(id).attr("checked") != "checked") {
		$(".tablelist thead tr td").each(function(idx) {
			if ($(this).text() == name) {
				$(this).hide();
				index = idx;
			}
		});
		$("#tableContent tbody tr").each(function(idx) {
			$(this).find("td").each(function(i) {
				if (i == index) {
					$(this).hide();
				}
			});
		});
	} else {
		$(".tablelist thead tr td").each(function(idx) {
			if ($(this).text() == name) {
				$(this).show();
				index = idx;
			}
		});
		$("#tableContent tbody tr").each(function(idx) {
			$(this).find("td").each(function(i) {
				if (i == index) {
					$(this).show();
				}
			});
		});
	}
}

function showHide_contentShow() {
	var tableDiv = $("#tableContent").height();
	var len = $(".showHide_content div").length;
	var content = len * 30 + 10;
	if ($(".div_showHide").is(':visible')) {
		$("#tableContent").height("");
		hide_table();
		$(".div_showHide").hide();
	} else {
		if (tableDiv < content) {
			$("#tableContent").height(content);
		}
		$(".div_showHide").show();
	}
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

/*=======================增加标签页=========================================*/

/**
 * 跳转页面新增标签页
 */
function functionIfram(href,title,parentTile){
	window.parent.href_mo(href,title,parentTile);
}

/**
 * 加载动画
 */
function upLoadAnimation(){
	$("#tableContent .tablelist").css("width","100%");
	$("#tableTitle").css("width","100%");
	$(".tablelist tbody").html('<tr id="mousemove"><td colspan="999"><div style="width:100%; height:400px; position:relative;">'+
		'<div class="container"><div class="cube">'+
			'<div class="side side1">'+
            '</div>'+
            '<div class="side side2">'+
            '</div>'+
            '<div class="side side3">'+
            '</div>'+
            '<div class="side side4">'+
            '</div>'+
            '<div class="side side5">'+
            '</div>'+
            '<div class="side side6">'+
            '</div>'+
        '</div>'+
	'</div></div></td></tr>');
}

/** 返回日期 2016-01-01*/
function returnDate(time){
	if (time == "" || time == null) {
		return "";
	}
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return "yyyy-MM-dd".replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
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

/** 返回时间 2016-01-01 00:00:01*/
function returnTimeHourMin(time){
	if (isEmpty(time)) {
		return "";
	}
	var t = new Date(time);
	var tf = function(i){return (i < 10 ? '0' : '') + i};
	return "yyyy-MM-dd HH:mm:ss".replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
		switch(a){
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
		}
	});
}

/** 返回时间 2016-01-01 00:00:01*/
function returnDateTime(time){
	if (isEmpty(time)) {
		return "";
	}
	var t = new Date(time);
	var tf = function(i){return (i < 10 ? '0' : '') + i};
	return "yyyy-MM-dd HH:mm:ss".replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
		switch(a){
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
			return tf(t.getHours());
			break;
		}
	});
}

