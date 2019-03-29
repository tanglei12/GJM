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
	
});
function changeType(obj){
	var i = 0;
	$(".type-radio").each(function (){
		if($(this).attr("checked")){
			i++;
		}
	});
	if($(obj).find("input").is(":checked")){
		$(obj).removeClass("span-checked");
		$(obj).find("input").attr("checked",false);
	}else{
		if(i<5){
			$(obj).addClass("span-checked");
			$(obj).find("input").attr("checked",true);
			i = i--;
		}else{
			$.jBox.tip("只能选择五个");
		}
	}
}

function add(){
	var html = "<div style='padding:10px;'>输入周边：<input type='text' id='pz' name='pz' /></div>";
	$("#pz").css("display","block");
	$("#pz").blur( function () { 
		if($("#pz").val() == ''){
			$("#pz").css("display","none");
		}else{
			$("#addZb").before("<label class='type-label span-checked' onclick='changeType(this)' for='type7'>"+$("#pz").val()+"<i></i> <input type='checkbox' checked='checked' class='type-radio' name='perimeter' value='"+$("#pz").val()+"'></label>");
			$("#pz").css("display","none");
			$("#pz").val("");
		}
	});
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
	    		$("#wuyenamediv>table").append('<tr><td style="width:100%; height:30px; line-height:30px; border-bottom:1px solid #f5f8fa; text-align:center;">无数据</td></tr>');
	    		return;
	    	}
	    	$.each(result.userCenterPropertyInfos, function(idx, item) {
	    		$("#wuyenamediv>table").append('<tr align="center"><td style="width:100%; height:30px; line-height:30px; border-bottom:1px solid #f5f8fa;" onclick="selectwuye(this);">'+ item.propertyInfo_Name +'</td></tr>');
	    	});
    	}
	});
}
//当物业val为空的时候
function iswuyeisempt (){
	if($("#wuyeName").val()==null||$("#wuyeName").val()=="")
	selectByCondition();
}
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
//物业小区搜索库存房源
function selectwuye(obj){
	var wuyeName=$("#wuyeName").val(obj.innerHTML);
	$("#wuyenamediv").hide();
	selectByCondition();
}

function queryWhere(obj){
	$("#Num").text(1);
	data()
}

/** 遍历数据*/
function data(orderBy){
	
	// 标题
	var titles = [];
	titles.push({name : "编号", 		string : "",							parameter: ""});
	titles.push({name : "小区房号",	  	string : "house_address", 				parameter: ""});
	titles.push({name : "分配状态", 	string : "ucc_id", 						parameter: ""});
	titles.push({name : "归属部门", 	string : "ucc_name", 					parameter: ""});
	titles.push({name : "房源管家", 	string : "emp_newName", 					parameter: "",		string1 : "emp_state",		parameter1 : ""});

	// 初始化
	$("#content").table({
		search : true,
		dataTime : [],
		title : titles,
		search_bars : [{
			name : "mode",
			type : "select",
			selected : 0,
			data : {
				  0 : "全部",
				"allot_no" : "未分配",
				"allot_yes" : "已分配",
			}
		}],
		url : "/houseLibrary/queryHouseAllotList",
		data : {},
		success : function(result) {
			$(result).find("table.personTable tbody tr").each(function(){
				var state = $(this).find("td:eq(3)");
				if(isEmpty(state.html())){
					state.html('未分配').addClass("hint");
				} else {
					state.html('已分配').addClass("ok");
				}
				
				
				var name = $(this).find("td:eq(5)");
				name.html(returnValue(name.html()).replace("0", '&nbsp;-&nbsp;<label class="error">离职</label>'));
				name.html(returnValue(name.html()).replace("1", '&nbsp;-&nbsp;<label class="ok">在职</label>'));
			});
		}
	});
	
	
	
//	$("#content").table({
//		search: true,
//		dataTime: [
//		           {
//		        	   name: "存房时间",
//		        	   string: "hi_date"
//		           },
//		           {
//		        	   name: "到期时间",
//		        	   string: "contract_expiryDate"
//		           }
//		],
//		title: [
//			    {
//					name: "编号",
//					string: "hi_code",
//					parameter: ""
//				},
//				{
//					name: "小区房号",
//					string: "house_address",
//					parameter: "",
//					leftDiv: "<a href='javascript:selectImg();' class='fa fa-image' style='margin-right: 6px; color:#3498DB;'></a>",
//					rightDiv: "",
//					href: "/houseLibrary/jumpHouseInfo&hi_code",
//				},
//				{
//					name: "招租状态",
//					string: "hi_forRentState",
//					parameter: {
//						1001 : "新存招租",
//						1002 : "转租招租",
//						1003 : "退租招租",
//						1004 : "到期招租",
//						1005 : "强收招租",
//						1006 : "换房招租",
//						1020 : "停止招租",
//						1021 : "已解约",
//						1022 : "未接房",
//						2000 : "暂停招租"
//					}
//				},
//				{
//					name: "存房价格",
//					string: "hi_money",
//					parameter: ""
//				},
//				{
//					name: "出房价格",
//					string: "hi_keepMoney",
//					parameter: ""
//				},
//				{
//					name: "房屋区域",
//					string: "hi_area",
//					parameter: ""
//				},
//				{
//					name: "房屋品牌",
//					string: "hb_name",
//					parameter: ""
//				},
//				{
//					name: "户型",
//					string: "houseTSW",
//					parameter: ""
//				},
//				{
//					name: "房东",
//					string: "he_peopleName",
//					parameter: "",
//					string1: "he_phone",
//					parameter1: ""
//				},
//				{
//					name: "房屋管家",
//					string: "em_name",
//					parameter: "",
//					string1: "em_phone",
//					parameter1: ""
//				}
//			],
//		url: "/houseLibrary/queryHouseAllotList",
//		data: {},
//		success: function(result){
//		}
//	});
//	
	
//	if(orderBy == null){
//		orderBy = "";
//	}
//	var str = "";
//	var dateStr = "";
//	if($(".selectList ul").length > 0){
//		var str = "";
//		$(".selectList ul").each(function(i){
//			if($(this).find(".checkbox input").is(':checked')){
//				str += ""+ $(this).find("a").attr("data-text") +"::"+ isSpace($(this).find(".content input").val()) +",";
//			}
//		});
//	}
//	if (getUrlParam("mode") == "forRent") {
//		str += "hi_forRentState::1001,";
//		str += "hi_forRentState::1002,";
//		str += "hi_forRentState::1003,";
//		str += "hi_forRentState::1004,";
//		str += "hi_forRentState::1005,";
//		str += "hi_forRentState::1006,";
//	}
//	information = $.Deferred();
//	var pageSize =returnNumber($("#sizeCount>input").val());
//	if(!isEmpty($("#sizeCount>input").val())){
//		$.cookie("userSize", pageSize, { expires : 7 });
//	}else{
//		$.cookie("userSize", 10, { expires : 7 });
//	}
//	
//	$(".searchBar .timeClick").each(function(i){
//		if($(this).attr("class") == "timeClick mouseDown"){
//			dateStr = $(this).text();
//		}
//	});
//	$.ajax({
//	    type: "POST",
//	    url : "/houseLibrary/queryHouseAllotList",
//		data : {
//			pageNo : returnNumber($("#Num").text()),
//			pageSize : returnNumber($.cookie("userSize")),
//			mode : $("#allot").val(),
//			param : str
//		},
//		dataType : "json",
//		beforeSend : upLoadAnimation(),
//	    success : function(result) {
//	    	$("#tableContent #tableData tbody").html("");
//	    	if(result.code == 200){
//	    		if(result.data.list.length > 0){
//	    			$.each(result.data.list, function(index, data) {
//						$("#tableData tbody").append(
//							"<tr>" +
//								"<td><input name='chickes' type='checkbox'/></td>" +
//								"<td>"+ (index + 1) +"</td>" +
//								"<td>"+ returnValue(data.house_address) +"</td>" +
//								"<td>"+ returnValue(isEmpty(data.ucc_id)?"<span class=\"error\">未分配</span>":"<span class=\"ok\">已分配</span>") +"</td>" +
//								"<td>"+ returnValue(data.ucc_name) +"</td>" +
//								"<td>"+ returnValue(data.emp_newName) + returnValue((data.emp_state == 0)?" - <span class=\"error\">已离职</span>":"") +"</td>" +
//							"</tr>");
//    	    		});
//	    		}
//	    		$("#sizeNum").text(result.data.totalPage);
//	        	$("#nums").text(result.data.totalRecords);
//	    	}else{
//	    		$(".tablelist tbody").html("");
//	    		$("#sizeNum").text("");
//	    		$("#Nums").html("");
//	    	}
//	    	information.resolve();
//	    }
//    });
//	$.when(information).done(function () {
//		page();
//		
//		hide_table();
//	});
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

//跳转修改界面
function ck_eds(id){
    window.location.href = '/houseLibrary/jumpHouseInfoEdit?id='+id;
}

//跳转发布图片界面
function uploads(){
      var cbl_s = document.getElementsByName("chickes");  
      var checkCount = 0;
      var id = 0;
      for (var i = 0; i < cbl_s.length; i++) {  
              if (cbl_s[i].checked) {  
                  checkCount++;
                  id = cbl_s[i].id;
              }  
      }  
      if (checkCount == 0) {  
 		 $.jBox.info('请选择一个！', '管家婆管理系统');
      } else if (checkCount > 1) {  
     	 $.jBox.info('只能选择一个！', '管家婆管理系统');
      } else {  
  	 window.location.href = '/image/upload?id='+id;
   } 
}

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

function selectByCondition(){
	$("#Num").text("1");
	data();
}

function bianji(){
	$.jBox.tip('请先完善信息!');
}

function yulan(){
	$.jBox.tip('已发布房屋请到发布房源中预览');
}

/** 添加公寓*/
function addApartment(){
	window.location.href = '/houseLibrary/addApartmentPage';
}

/** 修改房屋*/
function ckHouse(){
	var _checked = $("#tableDa input[name=chickes]:checked");
	if(_checked.length == 1){
		window.parent.href_mo('/houseLibrary/jumpHouseInfoEdit?hi_code=' + _checked.attr("data-code"),"修改房屋","库存房源");
	} else {
		$.jBox.tip("请选择一个房源");
	}
}

/** 房屋发布*/
function fb(){
	var _checked = $("#tableDa input[name=chickes]:checked");
	if(_checked.length == 1){
		var hi_id=_checked.attr("id");
		var he_id=_checked.attr("data-he");
		var code=_checked.attr("data-code");
		
		$.ajax({
	  	    type: "POST",
	  	    url: "/houseLibrary/selectGy",
	  	    data : {
	  	    	hi_code : code
	  	    },
	  	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	  	    dataType: "json",
	  	    success: function(result) {
	  	    	switch (result.code) {
					case 200:
						var html ="";
						var house = result.data.houseLibraryInfo;
						var prop = result.data.propertyInfo;
						var subwany = result.data.propertySubwany;
						var houseInfo = result.data.houseInfo;
						
						// 房屋信息
						html +='<div class="publish-box">';
						html +='<div class="sub-title">';
						html +='	<ul class="title-nav"><li class="visited">房源信息</li></ul>';
						html +='</div>';
						html +='<div class="sub-content">';
						var isOk = true;
						
						// 【标题】
						var hi_name = "";
						var hi_name_class = "";
						if(isEmpty(house.hi_name)){
							hi_name = "无";
							hi_name_class = "error";
							isOk = false;
						} else {
							hi_name = returnValue(house.hi_name);
						}
						html +='	<dl class="info-box"><dt class="item">标题</dt><dd class="item '+ hi_name_class +'">'+ hi_name +'</dd></dl>';

						// 【地址】
						var house_address = "";
						var house_address_class = "";
						if(isEmpty(house.house_address)){
							house_address = "无";
							house_address_class = "error";
							isOk = false;
						} else {
							house_address = returnValue(house.house_address);
						}
						html +='	<dl class="info-box"><dt class="item">小区房号</dt><dd class="item '+ house_address_class +'">'+ house_address +'</dd></dl><hr>';
						
						// 【户型】
						var hi_houseSTW = "";
						var hi_houseSTW_class = "";
						if(isEmpty(house.hi_houseS) && isEmpty(house.hi_houseT) && isEmpty(house.hi_houseW)){
							hi_houseSTW = "无";
							hi_houseSTW_class = "error";
							isOk = false;
						} else {
							hi_houseSTW = returnNumber(house.hi_houseS) + '室' + returnNumber(house.hi_houseT) +  '厅' + returnNumber(house.hi_houseW) + '卫';
						}
						html +='	<dl class="info-box"><dt class="item">户型</dt><dd class="item'+ hi_houseSTW_class +'">'+ hi_houseSTW +'</dd></dl>';
						
						// 【出房价格】
						var hi_money = "";
						var hi_money_class = "";
						if(isEmpty(house.house_address)){
							hi_money = "无";
							hi_money_class = "error";
							isOk = false;
						} else {
							hi_money = returnFloat(house.hi_money) + '元';
							hi_money_class = "error";
						}
						html +='	<dl class="info-box"><dt class="item">出房价格</dt><dd class="item '+ hi_money_class +'">'+ hi_money +'</dd></dl><hr>';
						
						// 【装修情况】
						var hi_state = "";
						var hi_state_class = "";
						if(isEmpty(house.house_address)){
							hi_state = "无";
							hi_state_class = "error";
							isOk = false;
						} else {
							hi_state = returnValue(house.hi_state);
						}
						html +='	<dl class="info-box"><dt class="item">装修情况</dt><dd class="item '+ hi_state +'">'+ hi_state +'</dd></dl>';
						
						// 【房屋品牌】
						var house_brand = "";
						var house_brand_class = "";
						switch (house.hb_id) {
							case 1:
								house_brand = "公寓";
								break;
							case 2:
								house_brand = "短租";
								break;
							case 3:
								house_brand = "长租";
								break;
							default:
								house_brand = "无";
								house_brand_class = "error";
								break;
						}
						html +='	<dl class="info-box"><dt class="item">房屋品牌</dt><dd class="item '+ house_brand_class +'">'+ house_brand +'</dd></dl><hr>';
						
						// 【推荐群体】
						var recommend = "";
						var recommend_class = "";
						switch (returnNumber(house.recommendGroup_Id)) {
							case 1:
								recommend = "情侣";
								break;
							case 2:
								recommend = "学区";
								break;
							case 3:
								recommend = "事业";
								break;
							case 4:
								recommend = "创业";
								break;
							default:
								recommend = "无";
								recommend_class = "error";
								break;
						}
						html +='	<dl class="info-box"><dt class="item">推荐群体</dt><dd class="item '+ recommend_class +'">'+ recommend +'</dd></dl><hr>';
						
						// 【房源优势】
						var function_html = "";
						var function_class = "";
						if(isEmpty(house.hi_function)){
							function_html = "无";
							function_class = "error";
							isOk = false;
						} else {
							$.each(returnValue(house.hi_function).split(","), function(index, data) {
								function_html +='<label class="publish-house-label">'+ returnValue(data) +'</label>';
							});
						}
						html +='	<dl class="info-box"><dt class="item">房源优势</dt><dd class="item '+ function_class +'">'+ function_html +'</dd></dl><hr>';

						// 【房源配置】
						var project_html = "";
						var project_class = "";
						if(isEmpty(house.hi_function)){
							project_html = "无";
							project_class = "error";
							isOk = false;
						} else {
							$.each(returnValue(house.hi_project).split(","), function(index, data) {
								project_html +='<label class="publish-house-label">'+ returnValue(data) +'</label>';
							});
						}
						html +='	<dl class="info-box"><dt class="item">房源配置</dt><dd class="item '+ project_class +'">'+ project_html +'</dd></dl><hr>';
						
						// 【房源点评】
						var hi_content = "";
						var hi_content_class = "";
						if(isEmpty(house.hi_content)){
							hi_content = "无";
							hi_content_class = "error";
							isOk = false;
						} else {
							hi_content = returnValue(house.hi_content);
						}
						html +='	<dl class="info-box"><dt class="item">房源点评</dt><dd class="item '+ hi_content_class +'">'+ hi_content +'</dd></dl><hr>';
						
						// 【房源简介】
						var hi_text = "";
						var hi_text_class = "";
						if(isEmpty(house.hi_content)){
							hi_text = "无";
							hi_text_class = "error";
							isOk = false;
						} else {
							hi_text = "有";
						}
						html +='	<dl class="info-box"><dt class="item">房源简介</dt><dd class="item '+ hi_text_class +'">'+ hi_text +'</dd></dl><hr>';
						if(!isOk){
							html +='	<dl class="info-box"><dt class="item">&nbsp;</dt><dd class="item"><a href="javascript:window.parent.href_mo(\'/houseLibrary/jumpHouseInfoEdit?id=' + house.hi_id +'\',\'修改房屋\',\'库存房源\');" style="position: relative;padding: 4px 10px;background: #E74C3C;border-radius: 4px;color: #fff;">完善房屋信息</a></dd></dl><hr>';
						} else {
							html +='	<dl class="info-box"><dt class="item">&nbsp;</dt><dd class="item"><a href="javascript:window.parent.href_mo(\'/houseLibrary/jumpHouseInfoEdit?id=' + house.hi_id +'\',\'修改房屋\',\'库存房源\');" style="position: relative;padding: 4px 10px;background: #F39C12;border-radius: 4px;color: #fff;">编辑房屋信息</a></dd></dl><hr>';
						}
						html +='	<input type="hidden" name="isOk" value="'+ isOk +'"/>';
						html +='</div>';
						
						// 【物业信息】
						var isProp = true;
						
						html +='<div class="sub-title">';
						html +='	<ul class="title-nav"><li class="visited">物业信息</li></ul>';
						html +='</div>';
						html +='<div class="sub-content">';
						html +='	<dl class="info-box"><dt class="item">小区名称</dt><dd class="item">'+ returnValue(prop.upn_sname) +'</dd></dl><hr>';
						html +='	<dl class="info-box"><dt class="item">小区地址</dt><dd class="item">'+ returnValue(prop.propertyInfo_address) +'</dd></dl><hr>';
						
						// 小区周边
						var subwany_html = "";
						var subwany_class = "";
						if(isEmpty(subwany)){
							subwany_html = "无";
							subwany_class = "error";
							isProp = false;
						} else {
							$.each(subwany, function(index, data) {
								subwany_html +='<label class="publish-house-label">'+ returnValue(data.subway_Name) +'</label>';
							});
						}
						html +='	<dl class="info-box"><dt class="item">小区周边</dt><dd class="item '+ subwany_class +'">'+ subwany_html +'</dd></dl>';
						if(!isProp){
							html +='	<hr><dl class="info-box"><dt class="item">&nbsp;</dt><dd class="item"><a href="javascript:window.parent.href_mo(\'/propertyInfo/propertyInfojichu\',\'物业跟进\',\'库存房源\');" style="position: relative;padding: 4px 10px;background: #E74C3C;border-radius: 4px;color: #fff;">完善物业信息</a></dd></dl><hr>';
						} else {
							html +='	<hr><dl class="info-box"><dt class="item">&nbsp;</dt><dd class="item"><a href="javascript:window.parent.href_mo(\'/propertyInfo/propertyInfojichu\',\'物业跟进\',\'库存房源\');" style="position: relative;padding: 4px 10px;background: #F39C12;border-radius: 4px;color: #fff;">编辑物业信息</a></dd></dl><hr>';
						}
						html +='	<input type="hidden" name="isProp" value="'+ isProp +'"/>';
						html +='</div>';
						
						// 【图片】
						html +='<div class="sub-title">';
						html +='	<ul class="title-nav"><li class="visited">房源图片</li></ul>';
						html +='</div>';
						html +='<div class="publish-box-content">';
						html +='<div class="image-upload-box">';
						$.each(result.data.houseLibraryImageList, function(index,data){
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
							html +='<div class="image-item">';
							html +='	<img class="image-item-img" src="'+ data.hm_path +'" data-type="'+ data.hm_type +'">';
							html +='	<span class="image-item-label '+ type_class +'" data-id="'+ data.hm_id +'">'+ type +'</span>';
							html +='	<label class="common-checkbox" style="position: absolute;"><input type="checkbox" name="publist-image" value="'+ data.hm_type +'" data-id="'+ data.hm_id +'"></label>';
							html +='</div>';
						});
						html +='</div>';
						html +='</div>';
						html +='</div>';
						
						$.jBox(html, {
							title : "发布房源",
							width : 800,
							height : 600,
							top : 40,
							submit : function (v, h, f) {
								
								// 房屋信息
								if(f.isOk != "true"){
									$.jBox.tip("请完善房屋信息后再发布", "warning");
									return false;
								}
								// 物业信息
								if(f.isProp != "true"){
									$.jBox.tip("请完善物业相关信息", "warning");
									return false;
								}
								// 图片信息
								var isImgOk = false;
								var _images = h.find("input[name=publist-image]:checked");
								var imgArr = "";
								if(_images.length >= 1){
									for (var i = 0; i < _images.length; i++) {
										var _item = $(_images[i]);
										if(_item.val() == 'page'){
											isImgOk = true;
											imgArr +=returnNumber(_item.attr("data-id")) + (i == (_images.length - 1)?"":",");
										} else {
											imgArr +=returnNumber(_item.attr("data-id")) + (i == (_images.length - 1)?"":",");
										}
									}
								} else {
									$.jBox.tip("请选择要发布的图片", "warning");
									return false;
								}
								if(!isImgOk){
									$.jBox.tip("必须选择一张封面图片", "warning");
									return false;
								}
								var submit2 = function (v, h, f) {
								    if (v == 'ok'){
								    	// 提交数据
										$.ajax({
											type: "POST",
											url: "/houseLibrary/updataHeState",
											data : {
												hi_code : code,
												images : imgArr
											},
											contentType: "application/x-www-form-urlencoded; charset=utf-8",
											dataType: "json",
											success: function(result) {
												switch (result.code) {
													case 200:
														$.jBox.tip('发布成功');
														data();
														break;
													default :
														$.jBox.tip(result.msg, "warning");
														break;
												}
											}
										});
								    }
								    return true;
								};
								$.jBox.confirm((isEmpty(houseInfo)?"确定发布吗？":"该房源已发布，是否确定更新发布房源"), "提示", submit2);
								// houseInfo
							    return true;
							}
						});
						break;
					default :
		  	    		$.jBox.tip(result.msg);
						break;
				}
	  	    }
		});
  } else {
	  $.jBox.tip("请选择一个房源");
  }
}

/** 房屋归属*/
function houseGs(){
	var checkBox =$("input[name='chickes']:checked");
	switch (checkBox.length) {
	case 0:
		$.jBox.info('请选择一个！', '管家婆管理系统');
		break;
	case 1:
		var code=checkBox.attr("data-code");
		var value=checkBox.attr("data-value");
		// 查询房屋所属部门信息
		$.ajax({
	  	    type: "POST",
	  	    url: "/houseLibrary/queryHousePosition",
	  	    data: {
	  	    	hiCode : code
	  	    },
	  	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	  	    dataType: "json",
	  	    success: function(result) {
	  	    	if(result.code == 200){
	  	    		$("#postionId").val(result.data.hpr_id);
	  	    		$("#housePosition").text(result.data.ucc_name);
	 	    	}
	  	    	$("#houseOption").html('<a onclick="queryPositionList()" style="color:#00a4ac;cursor: pointer;">编辑</a>');
	  	    }
  	    });
		var html ="";
		html+='<table>';
		html+='	<tr style="background: #F5F8FA;">';
		html+='		<th width="25%">房屋编号</th>';
		html+='		<th width="25%">小区房号</th>';
		html+='		<th width="25%">所属部门</th>';
		html+='		<th width="25%">操作</th>';
		html+='	</tr>';
		html+='	<tr>';
		html+='		<input type="hidden" id="postionId">';
		html+='		<td id="postionhicode">'+ code +'</td>';
		html+='		<td>'+ value +'</td>';
		html+='		<td id="housePosition"></td>';
		html+='		<td id="houseOption"></td>';
		html+='	</tr>';
		html+='</table>';
		html+='<div class="position-list">';
		html+='		<div class="position-list-title">全部部门</div>';
		html+='		<div class="position-list-main" id="positionList"></div>';
		html+='		<div class="position-list-foot"></div>';
		html+='</div>';
		var _model = $("#houseModel").length;
		if (_model < 1) {
			$("body").append('<div id="houseModel"></div>');
		}
		$("#houseModel").model({
			title : "房屋归属",
			data : html
		});
		break;
	default:
		$.jBox.info('只能选择一个！', '管家婆管理系统');
		break;
	}
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
	var _checked = $(".tablelist tbody input[name='chickes']:checked");
	switch (_checked.length) {
	case 0:
		 $.jBox.tip("请选择一个", "warning");
		break;
	case 1:
		$.ajax({
	  	    type: "POST",
			url: "/houseLibrary/getHouseImageList",
			data: {
				hi_id: _checked.attr("id")
			},
	  	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	  	    dataType: "json",
	  	    success: function(result) {
	  	    	switch (result.code) {
					case 200:
						$("#image-model").remove();
						var html ="";
						html +='<div id="image-model">';
						html +='	<div class="image-model-title drag">房屋图片<a href="javascript:$(\'#image-model\').remove();" class="icon-remove"></a></div>';
						html +='	<div class="image-model-content">';
						html +='		<figure id="house_slider" class="swipeslider">';
						html +='  			<ul class="sw-slides">';
						$.each(result.data, function(index, data){
							var type = '';
							var type_class;
							switch (data.hit_type) {
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
							html +='      <img src="'+ data.houseImage.hm_path +'" alt="'+ type +'" title="'+ type +'">';
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

function houseBrand(){
	$.ajax({
	    type: "POST",
	    url: "/houseHouseBrand/selectBrand",
	    data: "ps_id="+this.id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	$.each(result.houseHouseBrand, function(idx, brand) {
	    		$("#houseBrand").append("<option value='"+brand.hb_id+"'>"+brand.hb_name+"</option>");
	    	});
	    	data();
	    }
	});
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"房屋信息","库存房源");
}
