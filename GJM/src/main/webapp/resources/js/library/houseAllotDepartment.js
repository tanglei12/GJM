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
	data();
}

/** 遍历数据*/
function data(){
	$("#content").table({
		titleBg:"#34495E",
		titleColor:"#FFF",
		search: true,
		dataTime: [
		           {
		        	   name: "存房时间",
		        	   string: "hi_date"
		           },
		           {
		        	   name: "到期时间",
		        	   string: "contract_expiryDate"
		           }
		],
		title: [
		    {
				name: "编号",
				string: "hi_code",
				parameter: ""
			},
			{
				name: "小区房号",
				string: "house_address",
				parameter: "",
				leftDiv: '<i class="fa-image" onclick="selectImg(this)"></i>',
				href: "/houseLibrary/jumpHouseInfo&hi_code"
			},
			{
				name: "招租期",
				string: "hi_leaseDay",
				parameter: ""
			},
			{
				name: "招租状态",
				string: "hi_forRentState",
				parameter: {
					1001 : "新存招租",
					1002 : "转租招租",
					1003 : "退租招租",
					1004 : "到期招租",
					1005 : "强收招租",
					1006 : "换房招租",
					1020 : "停止招租",
					1021 : "已解约",
					1022 : "未接房",
					2000 : "暂停招租"
				}
			},
			{
				name: "特价房源",
				string: "hi_boolActive",
				parameter: {
					0:"",
					1:"特价",
				},
				string1_prefix: "/",
				string1: "pst_name",
				parameter1: ""
			},
			{
				name: "统一出房价",
				string: "hi_money",
				parameter: ""
			},
			{
				name: "房屋区域",
				string: "hi_area",
				parameter: ""
			},
			{
				name: "公司回收",
				string: "hi_houseActive",
				parameter: {
					null:"",
					0:"否",
					1:"是",
				}
			},
			{
				name: "房屋品牌",
				string: "hb_name",
				parameter: ""
			},
			{
				name: "户型",
				string: "houseTSW",
				parameter: ""
			},
			{
				name: "房东",
				string: "he_peopleName",
				parameter: "",
				string1: "he_phone",
				parameter1: ""
			},
			{
				name: "房屋管家",
				string: "em_name",
				parameter: "",
				string1: "em_phone",
				parameter1: ""
			}
		],
		url: "/houseLibrary/querySaleDepartmentHouse",
		data: {},
		success: function(result){
			$(result).find("tbody tr").each(function(){
				var state = $(this).find("td").eq(3).text();
				if(state == "已租"){
					$(this).find("td").eq(3).attr("style","color:#E74C3C");
				}else if(state == "未租"){
					$(this).find("td").eq(3).attr("style","color:#27AE60");
				}
				var forRent = $(this).find("td").eq(4).text();
				$(this).find("td").eq(4).html(forRentState(forRent));
			});
//			var _this = result;
//			if(databool){
//				$.ajax({
//					type: "POST",
//					url : "/houseLibrary/querySaleDepartment",
//					data : [],
//					dataType : "json",
//					beforeSend : upLoadAnimation(),
//					success : function(result) {
//						var html = '<li><select class="form-control" id="saleDepartment" style="height: 40px; width: 150px;" onchange="data(false)">';
//						html += '<option value="">选择部门</option>';
//						$.each(result.saleCompanyList, function(idx, item) {
//							html += '<option value="'+ item.ucc_id +'">'+ item.ucc_name +'</option>';
//						});
//						html += '</select></li>';
//						$(_this).find(".searchBar").prepend(html);
//					}
//				});
//			}
		}
	});
	
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
	var _checked = $("tbody input[name=check]:checked");
	if(_checked.length == 1){
		window.parent.href_mo('/houseLibrary/jumpHouseInfoEdit?hi_code=' + _checked.attr("data-code"),"修改房屋","库存房源");
	} else {
		$.jBox.tip("请选择一个房源");
	}
}

/** 房屋归属*/
function houseGs(){
	var checkBox =$("tbody .checkbox-min input[name='check']:checked");
	switch (checkBox.length) {
	case 0:
		$.jBox.info('请选择一个！', '管家婆管理系统');
		break;
	case 1:
		var code=checkBox.parent().attr("data-id");
		var value=checkBox.parent().parent().next().next().text();
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
		html+='		<div class="position-list-title">全部部门';
		html+='		<select name="postion-company"></select>';
		html+='		</div>';
		html+='		<div class="position-list-main" id="positionList" style="padding-bottom: 0;"><div class="loading"></div></div>';
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
function selectImg(obj){
//	$(obj).parent().siblings().each(function(){
//		$(this).find("[name=check]").attr("checked", false);
//	});
//	$(obj).parent().prev().prev().find("[name=check]").attr("checked", "checked");
	var _checked = $(obj).parents("tr").find("[name=check]");
//	switch (_checked.length) {
//	case 0:
//		 $.jBox.tip("请选择一个", "warning");
//		break;
//	case 1:
		$.ajax({
	  	    type: "POST",
			url: "/houseLibrary/getHouseImageList",
			data: {
				hi_id: _checked.data("data").hi_id
			},
	  	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	  	    dataType: "json",
	  	    success: function(result) {
	  	    	switch (result.code) {
					case 200:
						$("#image-model").remove();
						var html ="";
						html +='<div id="image-model">';
						html +='	<div class="image-model-title drag">房屋图片<a href="javascript:$(\'#image-model\').remove();" class="icon-remove"></a><a href="javascript:$(\'#image-model\').remove();" style="cursor: pointer;color:#ff6666;float:right;">X</a></div>';
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
//		break;
//	default:
//		 $.jBox.tip("只能选择一个", "warning");
//		break;
//	}
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

//房屋特价处理
function housePoffers(){
	var hi_code = $("table tbody input:checked").parent().attr("data-id");
	if(hi_code == null){
		$.jBox.tip("请选择一个房源","error");
		return;
	}
	if($("table tbody input:checked").parent().parent().parent().find("td").eq(4).text().indexOf("停止") > -1 || $("table tbody input:checked").parent().parent().parent().find("td").eq(4).text().indexOf("暂停") > -1 || $("table tbody input:checked").parent().parent().parent().find("td").eq(4).text().indexOf("已解约") > -1){
		$.jBox.tip("该房屋还未招租！","error");
		return;
	}
	var boolt = true;
	$.ajax({
	    type: "POST",
	    url: "/housePrice/houseJurisdiction",
	    data:{
	    	hi_code : hi_code
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async: false,
	    success: function(result) {
	    	if(result.message == "error"){
	    		$.jBox.tip("没有该房屋定价权限","error");
	    		boolt = false;
	    	}
	    }
	});
	if(!boolt){
		return;
	}
	var html = "<div class='activeType'>";
	$.ajax({
	    type: "POST",
	    url: "/housePrice/specialType",
	    data:{
	    	hi_code : hi_code
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async: false,
	    success: function(result) {
	    	$(result.priceSettingType).each(function(index,item){
	    		if(result.pst_id == item.pst_id){
	    			html += '<span style="display:block; width:100%; height: 35px; line-height: 35px; position: relative; border-bottom: 1px dotted #CCC;"><label class="checkbox-min" data-id="'+ item.pst_id +'"><input type="radio" class="input_check" name="scheck" checked="checked"><span></span><i>'+ item.pst_name +'</i></label></span>';
	    		}else{
	    			html += '<span style="display:block; width:100%; height: 35px; line-height: 35px; position: relative; border-bottom: 1px dotted #CCC;"><label class="checkbox-min" data-id="'+ item.pst_id +'"><input type="radio" class="input_check" name="scheck"><span></span><i>'+ item.pst_name +'</i></label></span>';
	    		}
	    	});
	    	html += "</div>";
	    }
	});
	var submit = function (v, h, f) {
		var pst_id = $(".activeType input:checked").parent().attr("data-id");
		$.ajax({
		    type: "POST",
		    url: "/housePrice/specialSetting",
		    data:{
		    	hi_code : hi_code,
		    	pst_id : pst_id,
		    	boolt : true
		    },
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    success: function(result) {
		    	if(result.message == "success"){
//		    		console.log("成功！");
		    		data(false);
		    		return true;
		    	}else{
//		    		console.log("失败！");
		    		return false;
		    	}
		    }
		});
	};
	$.jBox(html, { title: "特价方式", width: 620, submit: submit });
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"房屋信息","库存房源");
}