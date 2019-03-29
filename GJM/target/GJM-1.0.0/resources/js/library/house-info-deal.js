var information = null;
var imagesr = null;
$(function(){
	houseBrand();
	
	var move = false;//移动标记 
	var _x,_y;//鼠标离控件左上角的相对位置 
	$(".image-model-title").mousedown(function(e) {
		move = true;
		_x = e.pageX - parseInt($("#image-model").css("left"));
		_y = e.pageY - parseInt($("#image-model").css("top"));
	});
	$(document).mousemove(function(e) {
		if (move) {
			var x = e.pageX - _x;// 控件左上角到屏幕左上角的相对位置
			var y = e.pageY - _y;
			$("#image-model").css({
				"top" : y,
				"left" : x
			});
		}
	}).mouseup(function() {
		move = false;
	});
	
	//点击其他地方隐藏div
	$(document).on("click", function(e){
		if($("#wuyenamediv").is(":hidden")){
	    	$("#wuyenamediv").show();
	    }else{
	    	$("#wuyenamediv").hide();
	    }

	    $(document).one("click", function(){
	        $("#wuyenamediv").hide();
	    });

	    e.stopPropagation();
	});
	
	$("#wuyenamediv").on("click", function(e){
	    e.stopPropagation();
	});
});


/** 条件查询*/
function queryWhere(){
	$("#Num").text("1");
	data();
}

/** 遍历数据*/
function data(){
	
	// 时间
	var dates = [];
	dates.push({name : "签订日期",	string : "contractObject_FillTime"});
	
	// 标题
	var titles = [];
	titles.push({name : "编号", 		string : "",							parameter: ""});
	titles.push({name : "小区房号",	  	string : "house_address", 				parameter: ""});
	titles.push({name : "房屋状态", 	string : "he_state", 					parameter: {
		"free" : "未租",
		"rental" : "已租",
		"expire" : "解约",
	}});
	titles.push({name : "成交类型", 	string : "contractObject_Type", 		parameter: {
		"托管合同" : "存房成交",
		"租赁合同" : "出房成交"
	}});
	titles.push({name : "合同编号", 	string : "contractObject_No", 			parameter: ""});
	titles.push({name : "存房价", 	string : "hi_money", 					parameter: ""});
	titles.push({name : "出房价", 	string : "hi_keepMoney", 				parameter: ""});
	titles.push({name : "区域", 		string : "hi_area", 					parameter: ""});
	titles.push({name : "户型", 		string : "houseSTW", 					parameter: ""});
	titles.push({name : "成交人员", 	string : "em_name", 					parameter: ""});
	titles.push({name : "成交日期", 	string : "contractObject_FillTime", 	parameter: "",		format:"yyyy-MM-dd"});
	titles.push({name : "归属部门", 	string : "ucc_name", 					parameter: ""});

	// 初始化
	$("#content").table({
		search : true,
		dataTime : dates,
		title : titles,
		search_bars : [{
			name : "contractObject_Type",
			type : "select",
			selected : 0,
			data : {
				  0 : "全部成交",
				"托管合同" : "存房成交",
				"租赁合同" : "出房成交",
			}
		}],
		url : "/houseLibrary/queryHouseDealList",
		data : {},
		success : function(result) {
			$(result).find("table.personTable tbody tr").each(function(){
				
				// 【状态】
				var state = $(this).find("td:eq(3)");
				var state_color = "";
				switch (returnValue(state.html())) {
					case "未租" :
						state_color = "ok";
						break;
					case "已租" :
						state_color = "next";
						break;
					case "解约" :
						state_color = "error";
						break;
				}
				state.addClass(state_color);
				
				// 【类型】
				var type = $(this).find("td:eq(4)");
				var type_color = "";
				switch (returnValue(type.html())) {
					case "出房成交" :
						type_color = "next";
						break;
					case "存房成交" :
						type_color = "hint";
						break;
				}
				type.addClass(type_color);
				
				// 【价格】 
				$(this).find("td:eq(6)").addClass("ok");
				$(this).find("td:eq(7)").addClass("ok");
				
			});
		}
	});
	
	
	
//	var dateStr = '';
//	$(".searchBar .timeClick").each(function(i){
//		if($(this).attr("class") == "timeClick mouseDown"){
//			dateStr = $(this).text();
//		}
//	});
//	
//	var pageSize = returnNumber($("#sizeCount>input").val());
//	$.cookie("userSize", isEmpty(pageSize)?16:pageSize);
//	
//	$.ajax({
//	    type: "POST",
//	    url: "/houseLibrary/queryHouseDealList",
//	    data : {
//			pageNo : returnNumber($("#Num").text()),
//			pageSize : returnNumber($.cookie("userSize")),
//			mode : $("#mode").val(),
//			emp_type : $("#emp_type>option:selected").val(),
//			contract_type : $("#contract_type>option:selected").val(),
//			date_mode : dateStr,
//	    	date_start : $(".dateTime1").val(),
//	    	date_end : $(".dateTime2").val()
//	    },
//	    dataType: "json",
//	    beforeSend: upLoadAnimation()
//    }).done(function(result) {
//    	$("#tableContent #tableData tbody").empty();
//		$("#tableContent").removeClass("table-bg");
//		$("#tableTitle,.pagin").show();
//    	if(result.code == 200){
//    		if(result.data.list.length <= 0){
//    			$("#tableTitle,.pagin").hide();
//    			$("#tableContent").addClass("table-bg");
//    			$("#Num").text(1);
//    			return;
//    		}
//
//			$.each(result.data.list, function(index, data) {
//				var _img = "",
//					contract_intoStatus = data.contract_intoStatus,
//					contract_intoStatus_class = "",
//					contract_outStatus = data.contract_outStatus,
//					contract_outStatus_class = "";
//				
//				// 房屋状态
//				updataStart(data);
//				
//				// 图片信息
//				if (returnNumber(data.img_count) != 0) {
//					_img = "<a href='javascript:selectImg();' class='table-icon1 table-icon-img' style='margin-left:10px; color:#3498DB;'></a>";
//				}
//				// 房屋合同状态
//				switch (data.contract_intoStatus) {
//					case "未签合同":
//						contract_intoStatus_class = "error";
//						break;
//					case "已签合同":
//						contract_intoStatus_class = "next";
//						break;
//					default :
//						contract_intoStatus ="合同完善中";
//						contract_intoStatus_class = "hint";
//						break;
//				}
//				switch (data.contract_outStatus) {
//					case "未签合同":
//						contract_outStatus_class = "error";
//						break;
//					case "已签合同":
//						contract_outStatus_class = "next";
//						break;
//					default :
//						contract_outStatus ="合同完善中";
//						contract_outStatus_class = "hint";
//						break;
//				}
//				
//				$("#tableData tbody").append(
//						"<tr>" +
//							"<td><input name='chickes' type='checkbox' id='"+ data.hi_id+"' data-he=\""+ data.he_id +"\" data-code=\""+ data.hi_code +"\" data-value=\""+ data.propertyInfo_Name+data.hi_address +"\"/></td>" +
//							"<td>"+(index +1 )+"</td>" +
//							"<td class='css2'><a href='javascript:;' onclick='hrefClick(this)' data-type='/houseLibrary/jumpHouseInfo?hi_code="+ data.hi_code +"'>" + data.house_address +"</a>"+ _img +"</td>" +
//							"<td style='color:green;'>" + data.he_state + "</td>"  + 
//							"<td class='"+ contract_intoStatus_class +"'>" + contract_intoStatus + "</td>"  + 
//							"<td class='"+ contract_outStatus_class +"'>" + contract_outStatus + "</td>"  + 
//							"<td class='error'>" + returnFloat(data.hi_money) + "</td>"  + 
//							"<td class='error'>" + returnFloat(data.hi_keepMoney) + "</td>"  + 
//							"<td>" + returnValue(data.hi_area) + "</td>" +
//							"<td>" + returnNumber(data.hi_houseS) +"室"+ returnNumber(data.hi_houseT) +"厅"+ returnNumber(data.hi_houseW) +"卫</td>" + 
//							"<td>" + returnValue(data.ucc_name) +"</td>" + 
//							"<td>" + returnDate(data.contractObject_FillTime) +"</td>" + 
//							"<td>" + returnValue(data.contractObject_No) +"</td>" + 
//							"<td>" + returnValue(data.contractObject_Type) +"</td>" + 
////							"<td>" + data.hi_peopleName + " / " + data.he_phone + "</td>"  + 
////							"<td>" + data.em_name + " / " + data.em_phone +"</td>" + 
//						"</tr>");
//				$("#" + data.hi_id).data("data", data);
//    		});
//    		$("#sizeNum").text(result.data.totalPage);
//        	$("#nums").text(result.data.totalRecords);
//    	}else{
//    		$(".tablelist tbody, #sizeNum, #Nums").empty();
//    	}
//    	$("#data").data("pageCount", result.data.pageSize);
//    	
//    	page();
//		
//		hide_table();
//    });
}

//库存房源  物业搜索
function selectBywuye(){
	$.ajax({
	    type: "POST",
	    url: "/houseLibrary/selectwuyename",
	    data: "PropertyInfo_Name="+$("#wuyeName").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    success: function(result) {
	    	$("#wuyenamediv").show();
	    	$("#wuyenamediv>table").html("");
	    	if(isEmpty(result.userCenterPropertyInfos)){
	    		$("#wuyenamediv>table").append('<tr><td>无数据</td></tr>');
	    		return;
	    	}
	    	$.each(result.userCenterPropertyInfos, function(idx, item) {
	    		$("#wuyenamediv>table").append('<tr align="center"><td width="180px" height="20px" onclick="selectwuye(this);">'+ item.propertyInfo_Name +'</td></tr>');
	    	});
  	}
	});
}
//当物业val为空的时候
function iswuyeisempt (){
	if($("#wuyeName").val()==null||$("#wuyeName").val()=="")
	selectByCondition();
}
//物业小区搜索库存房源
function selectwuye(obj){
	var wuyeName=$("#wuyeName").val(obj.innerHTML);
	$("#wuyenamediv").hide();
	selectByCondition();
}

function selectByCondition(){
	$("#Num").text("1");
	data();
}
/*=======================================页面分页==============================================*/
//判断页数

function page(){
	//开始的页数样式
	if($("#sizeNum").text()<=5){
		$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
		for(var i=1; i<=$("#sizeNum").text(); i++){
			$(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a href='javascript:li("+ i +");'>"+ i +"</a></li>");
		}
		$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
		$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $.cookie('userSize')  +"' placeholder='请输入条数' /></li>");
		$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
	}else{
		if($("#Num").text()<=5){
			$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
			for(var i=1; i<=5; i++){
				$(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a href='javascript:li("+ i +");'>"+ i +"</a></li>");
			}
			$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
			$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $.cookie('userSize')  +"' placeholder='请输入条数' /></li>");
			$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
		}
	}
	//end
	
	//样式变化
	$(".paginList li").each(function(idx) {
		$(this).attr("class", "paginItem");
	});
	$("#paginList_"+$("#Num").text()+"").attr("class", "paginItem current");
	//end
	
	//判断最后一页和第一页的样式
	if($("#Num").text() == $("#sizeNum").text() && $("#sizeNum").text() != "1"){
		$(".paginItem span[id=down]").css("background","url(/resources/image/next_1.gif) no-repeat center center");
		$(".paginItem span[id=up]").css("background","url(/resources/image/pre.gif) no-repeat center center");
	}else if($("#Num").text() == "1" && $("#sizeNum").text() != "1"){
		$(".paginItem span[id=down]").css("background","url(/resources/image/next.gif) no-repeat center center");
		$(".paginItem span[id=up]").css("background","url(/resources/image/pre_1.gif) no-repeat center center");
	}else if($("#Num").text() == "1" && $("#sizeNum").text() == "1"){
		$(".paginItem span[id=down]").css("background","url(/resources/image/next_1.gif) no-repeat center center");
		$(".paginItem span[id=up]").css("background","url(/resources/image/pre_1.gif) no-repeat center center");
	}else if($("#Num").text() != "1" && $("#Num").text() != $("#sizeNum").text()){
		$(".paginItem span[id=down]").css("background","url(/resources/image/next.gif) no-repeat center center");
		$(".paginItem span[id=up]").css("background","url(/resources/image/pre.gif) no-repeat center center");
	}
	//end
	
	//间隔变色
	$('.tablelist tbody tr:odd').addClass('odd');
}

/*点击LI分页读取数据*/

function li(id){
	$("#Num").text(id);
	$("#paginList_"+id+" a").attr("class", "paginItem");
	data();
}


function up(){
	// 获取当前页数
	var pageMum =parseInt($("#Num").text());
	//最大页数
	var pageSize =parseInt($("#sizeNum").text());
	if(pageMum>1){
		if((pageMum-1) % 5 ==0){
			$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
				for(var i=5; i>0; i--){
					$(".paginList").append("<li id='paginList_"+ (pageMum-i) +"' class='paginItem'><a href='javascript:li("+ (pageMum-i) +");'>"+ (pageMum-i) +"</a></li>");
				}
				$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
				$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $.cookie('userSize')  +"' placeholder='请输入条数' /></li>");
				$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
			}
		$("#Num").text(pageMum-1);
		data();
	}
}


function down(){
	// 获取当前页数
	var pageMum =parseInt($("#Num").text());
	//最大页数
	var pageSize =parseInt($("#sizeNum").text());
	if(pageMum < pageSize){
		if((pageMum + 5)<pageSize){
			if(pageMum % 5 == 0){
				
				$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
				for(var i=1; i<= 5; i++){
						$(".paginList").append("<li id='paginList_"+ (pageMum+i) +"' class='paginItem'><a href='javascript:li("+ (pageMum+i) +");'>"+ (pageMum+i) +"</a></li>");
					}
				$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
				$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $.cookie('userSize')  +"' placeholder='请输入条数' /></li>");
				$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
			}
			$("#Num").text(pageMum+1);
			data();
		}else{
			if(pageMum % 5 == 0){
				$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
				for(var i=4; i>=0; i--){
						$(".paginList").append("<li id='paginList_"+ (pageSize-i) +"' class='paginItem'><a href='javascript:li("+ (pageSize-i) +");'>"+ (pageSize-i) +"</a></li>");
					}
				$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
				$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $.cookie('userSize')  +"' placeholder='请输入条数' /></li>");
				$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
			}
			$("#Num").text(pageMum+1);
			data();
		}
	}
}

//毫秒转换为日期格式

//跳转修改界面
//多选按钮判断


//跳转发布图片界面
//多选按钮判断


//改变页面显示的房屋状态
function updataStart(house){
	if(house.hi_measure == null){
		house.hi_measure = "";
	}
	if(house.hi_type == null){
		house.hi_type = "";
	}
	if(house.hi_money == null){
		house.hi_money = "";
	}
	if(house.hi_keepMoney == null){
		house.hi_keepMoney = "";
	}
	if(house.he_state == 'free'){
		house.he_state="未租";
	}
	if(house.he_state == 'rental'){
		house.he_state="已租";
	}
	if(house.he_state == 'expire'){
		house.he_state="托管到期";
	}
	if(house.he_state == 'clean'){
		house.he_state="需要打扫";
	}
	if(house.he_state == 'edit' || house.he_state == null){
		house.he_state="未发布";
	}
}

function setPage(){
	var nums = $("#nums").text();
	var page = $("input[name='spage']").val();
	$.cookie('the_cookie', page , { expires: 7 ,path: '/'});
	data();
}





function queryPositionList(){
	var _text=$('#housePosition').text();
	if(_text == null || _text =='' || typeof(_text) == 'undifined'){
		$(".position-list-foot").html('<button onclick="positionEdit()">添加</button>');
	} else {
		$(".position-list-foot").html('<button onclick="positionEdit()">修改</button>');
	}
	if($("#positionList").is(":hidden")){
		$.ajax({
			type: "POST",
			url: "/houseLibrary/queryPositionList",
			data: {},
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType: "json",
			success: function(result) {
				if(result.code == 200){
					$("#positionList").empty();
					$.each(result.data, function(index, data){
						$("#positionList").append('<label><input type="radio" name="position" value="'+ data.ucc_id +'" data-name="'+ data.ucc_name +'">'+ data.ucc_name +'</label>').parent().show();
					});
					// 绑定点击事件
					$("#positionList input[name='position']").on("click",function(){
						$(this).parents("#positionList").find("label").removeClass("checked");
						$(this).parent().addClass("checked");
					});
				}
			}
		});
	} else {
		$("#positionList").parent().hide();
	}
}

function positionEdit(){
	$.ajax({
		type: "POST",
		url: "/houseLibrary/updatePosition",
		data: {
			hpr_id : $.trim($("#postionId").val()),
			hi_code : $.trim($("#postionhicode").text()),
			ucc_id : $("input[name='position']:checked").val()
		},
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		success: function(result) {
			if(result.code == 200){
				$("#housePosition").text($("input[name='position']:checked").attr("data-name"));
				$("#positionList").parent().hide();
			}
		}
	});
}

//显示所有托管合同
function tianjiaTG(result){
	
	var jBoxConfig={};
	jBoxConfig.defaults={
			width:'auto',
			top:'10%',
			buttons:{'确定':'ok'},
			buttonsFocus:0,
			
	}
	$.jBox.setDefaults(jBoxConfig);
	
	var hi_text = $("input[name='hi_text']").val();
	var html = "<div style='background:#f5f5f5;width:1020px;height:680px;float:left;'><div style='width:101px;float:left;margin:20px;height:600px;'><ul>";
	
	$.each(result.results, function(idx, contract) {
		var t = format(contract.contractObject_DeadlineTime, 'yyyy-MM-dd');
		html += "<li id='f"+idx+"' class='htli' style='height:60px;border-bottom: 1px solid #f5f5f5;background:#fff;border-left: 1px solid #f5f5f5;border-right: 1px solid #f5f5f5;text-align: center;cursor:pointer;width:100px;line-height:60px;' onclick='selectConByCode(\""+contract.contractObject_No+"\",\"f"+idx+"\");'><span class=''></span>"+t+"</li>"
		
	});
	html += "</ul></div>";
	$.each(result.results, function(idx, contract) {
		if(idx == 0){
			html += "<div id='right_ht' style='width:859px;background:#fff;float:left;margin:20px;margin-left:0px;height:640px;'>";
			html += "<iframe src='/contractObject/jumpDisplayContract?contractObject_No="+contract.contractObject_No+"'  id='iframepage' name='iframepage' frameBorder=0 width='100%' height='100%' scrolling='auto'></iframe></div>";
		}
	});
	var submit = function (v, h, f) {
		return true;
	};
	$.jBox(html, { title: "托管合同", submit: submit });
	$("#f0").css("background","#3498DB");
	$("#f0").css("color","#fff");
	$("#f0").find("span").addClass("arrow-right");
}


//单个托管合同
function selectConByCode(code,idxx){
	$.ajax({
  	    type: "POST",
  	    url: "/houseLibrary/selTrusteeshipByCode",
  	    data: "code="+code+"&types=托管合同",
  	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
  	    dataType: "json",
  	    success: function(result) {
  	    	if(result.results == 0){
  	    		 $.jBox.info('该房屋还未签订托管合同', '管家婆管理系统');
  	    	}else{
  	    		$("#right_ht").html("");
  	    		var html="";
  	    		var contract = result.results;
  				html += "<iframe src='/contractObject/jumpDisplayContract?contractObject_No="+contract.contractObject_No+"'  id='iframepage' name='iframepage' frameBorder=0 width='100%' height='100%' scrolling='auto'></iframe>";
  				$("#right_ht").html(html);
  	    	}
  	    }
  	    });
	$(".htli").each(function (){
		$(this).css("background","#fff");
		$(this).css("color","#000");
		$(this).find("span").removeClass();
	});
	$("#"+idxx).css("background","#3498DB");
	$("#"+idxx).css("color","#fff");
	$("#"+idxx).find("span").addClass("arrow-right");
}

//添加公寓
function addApartment(){
	window.location.href = '/houseLibrary/addApartmentPage';
}

function selectGy(hi_id){
	alert("j");
	$.ajax({
  	    type: "POST",
  	    url: "/houseLibrary/selectGy",
  	    data: "hi_id="+hi_id,
  	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
  	    dataType: "json",
  	    success: function(result) {
  	    	if(result.result == 0){
  	    	}else{
  	    		$.jBox.tip('该类型公寓已发布');
  	    		return;
  	    	}
  	    }
  	});
}

/** 查看图片 */
function selectImg(){
	var _checked = $("input[name='chickes']:checked");
	switch (_checked.length) {
	case 0:
		 $.jBox.tip("请选择一个", "warning");
		break;
	case 1:
		$.ajax({
	  	    type: "POST",
			url: "/houseLibrary/queryHouseImageList",
			data: {
				hi_id: _checked.attr("id")
			},
	  	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	  	    dataType: "json",
	  	    success: function(result) {
	  	    	switch (result.code) {
					case 200:
						var html ="";
						html +='<div id="image-model">';
						html +='	<div class="image-model-title drag">房屋图片<a href="javascript:$(\'#image-model\').remove();" class="icon-remove"></a></div>';
						html +='	<div class="image-model-content">';
						html +='		<figure id="house_slider" class="swipeslider">';
						html +='  			<ul class="sw-slides">';
						$.each(result.data, function(index, data){
							var type = '';
							var type_class;
							switch (data.hm_type) {
								case "page":
									type = "封面图片";
									type_class = 'next-bg';
									break;
								case "effect":
									type = "效果图片";
									type_class = '';
									break;
								case "solid":
									type = "户型图片";
									type_class = 'hint-bg';
									break;
								case "3d":
									type = "3D图片";
									type_class = 'error-bg';
									break;
							}
							html +='    <li class="sw-slide">';
							html +='      <img src="'+ data.hm_path +'" alt="'+ type +'" title="'+ type +'">';
							html +='    </li>';
						});
						html +='  			</ul>';
						html +='		</figure>';
						html +='	</div>';
						html +='</div>';
						$("body").append(html);
						$("#house_slider").swipeslider();
						modelMove();
						break;
					default :
						break;
				}
	  	    }
	  	});
		break;
	default:
		 $.jBox.tip("只能选择一个", "warning");
		break;
	}
}


/** 初始化品牌*/
function houseBrand() {
	$.ajax({
		type : "POST",
		url : "/houseHouseBrand/selectBrand",
		data : "ps_id=" + this.id,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType : "json",
		async : false,
		success : function(result) {
			$.each(result.houseHouseBrand, function(idx, brand) {
				$("#houseBrand").append(
						"<option value='" + brand.hb_id + "'>" + brand.hb_name + "</option>");
			});
			data();
		}
	});
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"房屋信息","库存房源");
}

/** 房屋--查询房屋成交记录--列表*/
function queryHouseDealList(id) {
	var _box =$("#box-house");
	var pageNo =$("#main-content").attr("data-page");
	// 数据请求
	$.ajax({
		type: "POST",
	    url: "/houseLibrary/queryHouseDealList",
	    data: {
	    	pageNo : pageNo,
	    	pageSize : 10
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async: true,
	    beforeSend: function(){
	    },
	    success: function(result) {
	    	switch (result.code) {
			case 200:
				var html ="",
					listHtml = "";
				
	    		var cacheIndex = returnNumber($("#main-content>.box-content .sub-content").length);
	    		var listLen = result.data.list.length;

	    		$.each(result.data.list, function(index, data){
	    			if(isEmpty(cacheIndex)){
	    				cacheIndex = (index + 1);
	    			} else {
	    				cacheIndex++;
	    			}
	    			var contractObject_Type = ""
	    				contractObject_Type_class ="";
	    			
	    			switch (data.contractObject_Type) {
						case "托管合同":
							contractObject_Type = "存房";
							contractObject_Type_class = "next";
							break;
						case "租赁合同":
							contractObject_Type = "出房";
							contractObject_Type_class = "ok";
							break;
					}
		    		listHtml +='<div class="sub-content" style="display: table-row;background: '+ (index%2?"#ffffff":"#f5f8fa") +';">';
		    		listHtml +='	<div class="content-item-subitem" style="width: 54px;"><span class="title-content-num">'+ cacheIndex +'</span></div>';
		    		listHtml +='	<div class="content-item-subitem" style="min-width: 120px;text-align: left;">'+ returnValue(data.propertyInfo_Name) + returnValue(data.hi_address) +'</div>';
		    		listHtml +='	<div class="content-item-subitem '+ contractObject_Type_class +'" style="min-width: 84px;">'+ contractObject_Type +'</div>';
		    		listHtml +='	<div class="content-item-subitem ok" style="min-width: 72px;">'+ returnFloat(data.contractBody_Rent) +'</div>';
		    		listHtml +='	<div class="content-item-subitem" style="min-width: 160px;">'+ returnDate(data.contractObject_Date) +'</div>';
		    		listHtml +='	<div class="content-item-subitem" style="min-width: 82px;">'+ returnValue(data.ucc_name) +'</div>';
		    		listHtml +='</div>';
	    		});
	    		if(_box.length > 0){
	    			_box.append(listHtml);
		    		if(result.data.totalRecords > 0){
		    			if((listLen + $("#main-content>.box-content>.sub-content").length) < result.data.totalRecords){
		    				html +='<div class="page-next">查看更多 <span style="position: absolute;right: 12px;">'+ pageNo +' / '+ result.data.totalPage +'  共'+ result.data.totalRecords +'条记录</span></div>';
		    			}
		    		}
	    			$("#main-content").append(html);
	    		} else {
	    			html +='<div id="box-house" class="box-content" style="display: table; width: 100%;">';
	    			html +='	<div class="sub-title" style="display: table-row;background: #1ABC9C;">';
	    			html +='		<div class="content-item-subitem" style="width: 54px;">#</div>';
	    			html +='		<div class="content-item-subitem" style="min-width: 120px;text-align: left;">小区房号</div>';
	    			html +='		<div class="content-item-subitem" style="min-width: 84px;">类型</div>';
	    			html +='		<div class="content-item-subitem" style="min-width: 72px;">价格(元)</div>';
	    			html +='		<div class="content-item-subitem" style="min-width: 160px;">成交日期</div>';
	    			html +='		<div class="content-item-subitem" style="min-width: 82px;">归属部门</div>';
	    			html +='	</div>';
	    			html += listHtml;
	    			html +='</div>';
		    		if(result.data.totalRecords > 0){
		    			if((listLen + $("#main-content>.box-content>.sub-content").length) < result.data.totalRecords){
		    				html +='<div class="page-next">查看更多 <span style="position: absolute;right: 12px;">'+ pageNo +' / '+ result.data.totalPage +'  共'+ result.data.totalRecords +'条记录</span></div>';
		    			}
		    		}
	    			$("#main-content").html(html);
	    		}
				break;
			case 201:
				var html ='';
				
				var cacheIndex = returnNumber($("#main-content>.box-content .sub-content").length);
				var listLen = result.data.list.length;
				
				html +='<div class="box-content" style="display: table; width: 100%;">';
				html +='	<div class="sub-title" style="display: table-row;background: #1ABC9C;">';
				html +='		<div class="content-item-subitem" style="width: 54px;">#</div>';
				html +='		<div class="content-item-subitem" style="min-width: 120px;text-align: left;">小区房号</div>';
				html +='		<div class="content-item-subitem" style="min-width: 84px;">类型</div>';
				html +='		<div class="content-item-subitem" style="min-width: 72px;">价格(元)</div>';
				html +='		<div class="content-item-subitem" style="min-width: 82px;">分成比例</div>';
				html +='		<div class="content-item-subitem" style="min-width: 160px;">成交日期</div>';
				html +='		<div class="content-item-subitem" style="min-width: 82px;">归属部门</div>';
				html +='		<div class="content-item-subitem" style="min-width: 80px;">操作</div>';
				html +='	</div>';
				
				$.each(result.data.list, function(index, data){
					if(isEmpty(cacheIndex)){
						cacheIndex = (index + 1);
					} else {
						cacheIndex++;
					}
					var contractObject_Type = ""
						contractObject_Type_class ="";
					
					switch (data.contractObject_Type) {
						case "托管合同":
							contractObject_Type = "存房";
							contractObject_Type_class = "next";
							break;
						case "租赁合同":
							contractObject_Type = "出房";
							contractObject_Type_class = "ok";
							break;
					}
					html +='<div class="sub-content" style="display: table-row;background: '+ (index%2?"#ffffff":"#f5f8fa") +';">';
					html +='	<div class="content-item-subitem" style="width: 54px;"><span class="title-content-num">'+ cacheIndex +'</span></div>';
					html +='	<div class="content-item-subitem" style="min-width: 120px;text-align: left;">'+ returnValue(data.propertyInfo_Name) + returnValue(data.hi_address) +'</div>';
					html +='	<div class="content-item-subitem '+ contractObject_Type_class +'" style="min-width: 84px;">'+ contractObject_Type +'</div>';
					html +='	<div class="content-item-subitem ok" style="min-width: 72px;">'+ returnFloat(data.contractBody_Rent) +'</div>';
					html +='	<div class="content-item-subitem" style="min-width: 82px;">'+ returnNumber(data.contract_perforSplit) +'%</div>';
					html +='	<div class="content-item-subitem" style="min-width: 160px;">'+ returnDate(data.contractObject_Date) +'</div>';
					html +='	<div class="content-item-subitem" style="min-width: 82px;">'+ returnValue(data.ucc_name) +'</div>';
					html +='	<div class="content-item-subitem" style="min-width: 80px;">操作</div>';
					html +='</div>';
				});
				html +='</div>';
				$("#main-content").html(html);
				break;
			default:
				console.log(result.msg);
				break;
			}
	    }
	});
}
