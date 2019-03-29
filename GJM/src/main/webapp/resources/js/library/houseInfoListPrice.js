var information = null;
var imagesr = null;
$(function(){
	data();
});
/** 遍历数据*/
function data(dataBool){
	var houseAdd = 0;
	$("#content").table({
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
					rightDiv: "<div class='rightContent' style='float:left; margin-left:10px; padding:0 10px; margin-top:7px; background-color: #E74C3C; color:#FFF; height:22px; line-height:22px; text-indent: 0; border-radius: 3px;'>?hi_boolActive&</div>",
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
						"null":"",
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
		houseAdd: houseAdd,
		dataBool: dataBool,
		url: "/houseLibrary/informationPrice",
		data: {},
		success: function(result){
			$(result).find("tbody tr").each(function(){
				var rightContent = $(this).find("td").eq(2).find(".rightContent").text();
				if(rightContent == 0){
					$(this).find("td").eq(2).find(".rightContent").remove();
				}else{
					$(this).find("td").eq(2).find(".rightContent").text("特价");
				}
				var forRent = $(this).find("td").eq(4).text();
				$(this).find("td").eq(4).html(forRentState(forRent));
			});
		}
	});
}

/** 库存房源--查看图片 */
function selectImg(obj){
	var _checked = $(obj).parents("tr").find("[name=check]");
	$.ajax({
  	    type: "POST",
		url: "/houseLibrary/getHouseImageList",
		data: {
			hi_id: _checked.data("data").hi_id
		},
  	    dataType: "json",
  	}).done(function(result){
  		if(result.code != 200){
  			$.jBox.tip(result.msg);
  			return;
  		}
		var html ="";
		html +='<figure id="house_slider" class="swipeslider">';
		html +='	<ul class="sw-slides">';
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
		html +='	</ul>';
		html +='</figure>';
		$.jBox(html, { title : "房源图片", width : 700});
		$("#house_slider").swipeslider();
  	});
}

//取消公司回收
function housePriceBool(){
	var hi_code = $("table tbody input:checked").parent().attr("data-id");
	if(hi_code == null){
		$.jBox.tip("请选择一个房源","error");
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
	var submit = function (v, h, f) {
	    if (v == true) {
	    	$.ajax({
	    	    type: "POST",
	    	    url: "/housePrice/houseActiveTrue",
	    	    data:{
	    	    	hi_code : hi_code,
	    	    	hi_houseActive : 0
	    	    },
	    	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    	    dataType: "json",
	    	    success: function(result) {
	    	    	if(result.message == "success"){
	    	    		data();
	    	    		return true;
	    	    	}else{
	    	    		return false;
	    	    	}
	    	    }
	    	});
	    } else {
	    	return true;
	    }
	};
	$.jBox.confirm("是否取消公司回收？", "提示", submit, { buttons: { '是': true, '否': false} });
}

//取消特价
function houseSpecial(){
	var hi_code = $("table tbody input:checked").parent().attr("data-id");
	if(hi_code == null){
		$.jBox.tip("请选择一个房源","error");
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
	var submit = function (v, h, f) {
	    if (v == true) {
	    	$.ajax({
	    	    type: "POST",
	    	    url: "/housePrice/houseActiveTrue",
	    	    data:{
	    	    	hi_code : hi_code,
	    	    	hi_boolActive : 0
	    	    },
	    	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    	    dataType: "json",
	    	    success: function(result) {
	    	    	if(result.message == "success"){
	    	    		data();
	    	    		return true;
	    	    	}else{
	    	    		return false;
	    	    	}
	    	    }
	    	});
	    } else {
	    	return true;
	    }
	};
	$.jBox.confirm("是否取消房屋特价？", "提示", submit, { buttons: { '是': true, '否': false} });
}

// 特价方式
function activeType(){
	var hi_code = $("table tbody input:checked").parent().attr("data-id");
	if(hi_code == null){
		$.jBox.tip("请选择一个房源","error");
		return;
	}
	if($("table tbody input:checked").parent().parent().parent().find("td").eq(5).text().indexOf("特价") < 0){
		$.jBox.tip("该房屋没有参加特价活动！","error");
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
		    	pst_id : pst_id
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
