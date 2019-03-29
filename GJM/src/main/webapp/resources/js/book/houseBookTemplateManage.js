$(function(){
//	loadData();
	loadData2();
	initTableCheck();
});

function loadData2(){
	var pageSize = $.cookie("pageSize");
	if (isEmpty(pageSize)) {
		$.cookie("pageSize", 16, {
			expires : 7
		});
		pageSize = $.cookie("pageSize");
	}
	$.ajax({
		type : "POST",
		url : "/book/queryHouseBookTemplateForList",
		data : {
			pageNo : returnNumber($("#pageNo").text()),
			pageSize : pageSize
		},
		dataType : "json",
		beforeSend : function() {}
	}).done(function(result) {
		if (result.code != 200) {
			return;
		}
		$("#list-table-tbody").empty();
		if (result.data.list <= 0) {
			$(".list-table-content").addClass("table-bg");
		} else {
			$(".list-table-content").removeClass("table-bg");
		}
		$.each(result.data.list, function(index, data) {

			// 状态
			var _templateStatus = {};
			if(data.templateStatus == "0") {
				_templateStatus.text = "待添加模板信息";
				_templateStatus.style = "hint";
			}
			if(data.templateStatus == "1") {
				_templateStatus.text = "可用";
				_templateStatus.style = "next";
			}
			
			// 状态
			var _templateUse = {};
			if(data.templateUse == "1") {
				_templateUse.text = "预约";
				_templateUse.style = "hint";
			}
			if(data.templateUse == "2") {
				_templateUse.text = "其他";
				_templateUse.style = "next";
			}

			// 操作
			var _option_html = "";
			_option_html += '<button class="option-btn option-btn-next" name="order-budget-btn" onclick="editBookTemplateContent(this, \'edit\')"><i class="fa-key"></i>编辑</button>';
			_option_html += '<button class="option-btn option-btn-next" name="order-budget-btn" onclick="editBookTemplateContent(this, \'query\')"><i class="fa-reorder"></i>预览</button>';

			var html = '';
			html += '<tr class="' + (index % 2 == 0 ? "even" : "odd") + ' table-tbody-item' + index + '" onclick="tableTrCheck(this)">';
			html += '	<td style="width: 40px;">';
			html += '		<label class="table-checkbox-box"><input type="checkbox" name="table-checkbox"></label>';
			html += '	</td>';
			html += '	<td style="width: 40px;">' + (index + 1) + '</td>';
			html += '	<td style="display:none">' + returnValue(data.bt_id) + '</td>';
			html += '	<td>' + returnValue(data.templateName) + '</td>';
			html += '	<td class="' + _templateUse.style + '" style="width: 84px;">' + _templateUse.text + '</td>';
			html += '	<td class="' + _templateStatus.style + '" style="width: 84px;">' + _templateStatus.text + '</td>';
			html += '	<td style="text-align: left;">' + returnValue(data.templateDesc) + '</td>';
			html += '	<td style="width: 84px;">' + returnDate(data.templateTime) + '</td>';
			html += '	<td style="width: 160px;">' + _option_html + '</td>';
			html += '</tr>';
			html += '<tr class="' + (index % 2 == 0 ? "even" : "odd") + ' table-tbody-option' + index + '" style="display: none;">';
			html += '	<td colspan="13" style="padding: 0px 0 8px;"><div class="loading" style="height: 60px;"></div></td>';
			html += '</tr>';
			$("#list-table-tbody").append(html).find(".table-tbody-option" + index).data("data", data);
		});

		$("#totalPage").text(result.data.totalPage);
		$("#totalRecords").text(result.data.totalRecords);
		listPage(result.data);
	});
}

//毫秒转换为日期格式
var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
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

//跳转修改预约配置信息界面
//多选按钮判断
function ck(){
	var id = 0;
    $("td .table-checkbox-box").each(function(){
    	if($(this).find("input").is(":checked")){
    		id = $(this).parent().next().next().text();
    	}
    });
    if (id == 0) {  
		 $.jBox.info('请选择一个！', '管家婆管理系统');
    } else {  
    	window.parent.href_mo('/book/updateHouseBookTemplate?bt_id='+id,"修改模板","预约模板");
    } 
}

//跳转修改预约配置信息界面
//多选按钮判断
function ck_add(){
	window.parent.href_mo('/book/addHouseBookTemplate',"添加模板","预约模板");
}

//跳转修改界面
//多选按钮判断
function ck_eds(id){
	 window.location.href = '/book/updateHouseBookTemplate?bt_id='+id;
}

function editBookTemplateContent(obj, type){
	var id=$(obj).parent().parent().children("td").get(2).innerHTML; 
	if('edit' == type){
		window.location.href = '/book/jumpHousBookConfig?bt_id='+id+"&type="+type;
	} else {
		$.ajax({
			type: "POST",
			url: "/book/queryHouseBookTemplateById",
			data: "id="+id,
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType: "json",
			success: function(result) {
				var data = result.houseBookTemplateInfo;
				if(null != data.bc_ids && '' != data.bc_ids){
					window.location.href = '/book/jumpHousBookConfig?bt_id='+id+"&type="+type;
				} else {
					$.jBox.info('未配置模板内容，请先配置相关信息！', '管家婆管理系统');
				}
			},
			error: function(){
				$.jBox.info('系统异常，请联系管理员！', '管家婆管理系统');
			}
		});
	}
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"修改模板","预约模板");
}

/** 初始化表格点击*/
function initTableCheck() {
	$("[name=table-checkbox]").on("change", function() {
		if ($(this).attr("data-type") == "all") {
			if ($(this).is(":checked")) {
				$("[name=table-checkbox]").attr("checked", "checked").parent().addClass("table-checkbox-checked");
			} else {
				$("[name=table-checkbox]").removeAttr("checked").parent().removeClass("table-checkbox-checked");
			}
		} else {
			if ($(this).is(":checked")) {
				$(this).parent().addClass("table-checkbox-checked");
			} else {
				$(this).parent().removeClass("table-checkbox-checked");
			}
		}
	});
}

/** 初始化表格点击*/
function tableTrCheck(obj) {
	var _check = $(obj).find("input[type=checkbox]");
	$("input[name=" + _check[0].name + "]").removeAttr("checked").parent().removeClass("table-checkbox-checked");
	_check.attr("checked", "checked").parent().addClass("table-checkbox-checked");
}

/** 分页 */
function listPage(data) {

	var _box = $(".foot-page-option");
	var _pageNo = returnNumber($("#pageNo").text());
	var _totalPage = returnNumber($("#totalPage").text());
	var _limit = 10;
	// 限定数：当分页数小于限定数时，显示分页数
	_limit = _totalPage < _limit ? _totalPage : _limit;
	// 起始数：(页码 - 1)/限定数 * 限定数 + 1
	var _offset = returnNumber((_pageNo - 1) / _limit) * _limit + 1;
	// 限定数：起始数 + 限定数 - 1
	_limit = _offset + _limit - 1;

	// 基础样式
	var html = '';
	html += '<button class="page-option page-prev fa-angle-left"></button>';
	for (var i = _offset; i <= _limit; i++) {
		html += '<button class="page-option page-num" value="' + i + '">' + i + '</button>';
	}
	html += '';
	html += '';
	html += '<button class="page-option page-next fa-angle-right"></button>';
	html += '<input type="type" class="page-input number" value="' + returnNumber(data.pageSize) + '">';
	html += '<button class="page-option page-set">设置</button>';
	_box.html(html);

	// 翻页样式
	if (_pageNo == _totalPage && _totalPage != 1) {
		_box.find(".page-prev").removeAttr("disabled");
		_box.find(".page-next").attr("disabled", "disabled");
	} else if (_pageNo == 1 && _totalPage != 1) {
		_box.find(".page-prev").attr("disabled", "disabled");
		_box.find(".page-next").removeAttr("disabled");
	} else if (_pageNo == 1 && _totalPage == 1) {
		_box.find(".page-prev").attr("disabled", "disabled");
		_box.find(".page-next").attr("disabled", "disabled");
	} else if (_pageNo != 1 && _pageNo != _totalPage) {
		_box.find(".page-prev").removeAttr("disabled");
		_box.find(".page-next").removeAttr("disabled");
	}

	// 页码样式
	_box.find(".page-num[value=" + _pageNo + "]").attr("disabled", "disabled");

	// 【事件绑定】

	// 上一页
	_box.find(".page-prev").on("click", function() {
		$("#pageNo").text(_pageNo - 1);
		loadData();
	});
	// 下一页
	_box.find(".page-next").on("click", function() {
		$("#pageNo").text(_pageNo + 1);
		loadData();
	});
	// 点击页码
	_box.find(".page-num").on("click", function() {
		$("#pageNo").text($(this).val());
		loadData();
	});
	// 设置数值1
	_box.find(".page-set").on("click", function() {
		var _page_num = returnNumber(_box.find(".page-input").val());
		if (_page_num < 1 || _page_num > 100) {
			$.jBox.tip("设值范围1~100");
			return;
		}
		$("#pageNo").text("1");
		$.cookie("pageSize", _page_num, {
			expires : 7
		});
		loadData();
	});
	// 设置数值2
	_box.find(".page-input").on("keydown", function(e) {
		if (e.keyCode == 13) {
			var _page_num = returnNumber($(this).val());
			if (_page_num < 1 || _page_num > 100) {
				$.jBox.tip("设值范围1~100");
				return;
			}
			$("#pageNo").text("1");
			$.cookie("pageSize", _page_num, {
				expires : 7
			});
			loadData();
		}
	});
}