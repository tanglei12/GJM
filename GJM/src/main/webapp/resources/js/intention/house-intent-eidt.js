var tt = "";
var tipnum = 0;
var house_type = "intent";
var strCheck = "";

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

$(function() {
	var pt = $("#phi_type").val();
	if (pt != null && pt != "" && pt == "存房") {
		$("#phi_type").val("");
	}
	/**默认选中房源存房中的支付状态*/
	 if ($("#zhuangtais").val() != null && $("#zhuangtais").val() != "") {
		$("#zhifuzhuangtai").val($("#zhuangtais").val());
	}
 
	/**默认选中房源存房中的支付方式*/
	if ($("#fangshis").val() != null && $("#fangshis").val() != "") {
		$("#fukuanfangshi").val($("#fangshis").val());
	}
 
	 $("#genjinjieguo").val($("#rb_houseNum").val());
	

	if ($("#checktype").val() == null || $("#checktype").val() == "") {
		$("#divt1").css("border-color", "#00a0e9");
		$("#divt1f").css("color", "#00a0e9");
		$("#divt1x").css("border-color", "#00a0e9");
		$("#divt1y").css("border-color", "#00a0e9");
		$("#fangyuanluru").css("display", "block");
	}
	
	if ($("#checktype").val() == "房源录入") {
		fangyuanyixianggenjin(1);
		$("#fangyuanluru").css("display", "block");
		tipnum=1;
	}
	if ($("#checktype").val() == "房源跟进") {
		fangyuanyixianggenjin(2);
		$("#fangyuangenjin").css("display", "block");
		tipnum=2;
	}
	if ($("#checktype").val() == "房源实勘") {
		fangyuanyixianggenjin(3);
		$("#fangyuanshikan").css("display", "block");
		tipnum=3;
	}
	if ($("#checktype").val() == "房源定价") {
		fangyuanyixianggenjin(4);
		$("#fangyuandingjia").css("display", "block");
		tipnum=4;
	}

	if ($("#checktype").val() == "存房") {
		fangyuanyixianggenjin(5);
		$("#fangyuancunfang").css("display", "block");
		tipnum=5;
	}
	
	if ($("#checktype").val() == "完成") {
		$("#genjinjieguo").val("完成");
		fangyuanyixianggenjin(6);
		$("#fangyuancunfang").css("display", "block");
		tipnum=6;
		$("#submitdiv5").remove();
		$("#submitdiv4").remove();
		$("#submitdiv3").remove();
		$("#submitdiv2").remove();
		$("#submitdiv1").remove();
		if ($("#rb_lx").val() != null && $("#rb_lx").val() == "定金") {
			$("#radio1").parent().addClass(" span-checked");
			$("#div1").show();
		} else if ($("#rb_lx").val() != null && $("#rb_lx").val() == "诚意金") {
			$("#radio2").parent().addClass(" span-checked");
			$("#div1").show();
		} else{
			$("#radio3").parent().addClass(" span-checked");
			$("div1").hide();
		} 
	}
	
	if( $("#checktype").val() == "存房失败"){
		fangyuanyixianggenjin(6);
		$("#fangyuancunfang").css("display", "block");
		$("#genjinjieguo").val("存房失败");
		tipnum=6;
	}
	if($("#buildtypes").val()!= null && $("#buildtypes").val()== "保护"){
		$("#selectBuildTypePublic").show();
	}

	tt = $("#rb_lx").val();
	$("#Pro_content").perfectScrollbar();
	$("#tableDivType").perfectScrollbar();
	
	$("#divScrollbar").perfectScrollbar();
	var gid = $("#gj-emID").val();//登陆用户ID
	var eid = $("#em_id").val();//录入房源用户ID
	var buildType = $("#buildtype").val();//楼盘类型（公盘-私盘-封盘-保护）
	var phitype = $("#checktype").val();
	
	if(gid != null && eid != null && eid != "" && gid != eid){
		if(buildType != null && buildType != "公盘"){
			if(phitype != "存房失败"){
				$("#submitdiv5").remove();
				$("#submitdiv4").remove();
				$("#submitdiv3").remove();
				$("#submitdiv2").remove();
				$("#submitdiv1").remove();
				$("#useriphone").val($("#useriphone").val().substring(0,3) +" **** "+$("#useriphone").val().substring(8,11));
			}
		}
		
	}
});






function chanageradio(obj) {
	var count = $("#radio" + obj).val();
	if(count == tt){
		$("#zhifujine").val($("#zhifujinehidden").val());
		$("#fukuanfangshi").val($("#fangshis").val());
		$("#zhifuzhuangtai").val($("#zhuangtais").val());
	}else{
		$("#zhifujine").val("");
		$("#fukuanfangshi").val("");
		$("#zhifuzhuangtai").val("");
	}
	for (var int = 1; int < 4; int++) {
		if (int == obj) {
			$("#radio" + int).attr("checked", true);
			$("#radio" + int).parent().addClass(" span-checked");
			$("#rb_lx").val(count);
		} else {
			$("#radio" + int).attr("checked", false);
			$("#radio" + int).parent().removeClass("span-checked");
			$("#rb_lx").val(count);
		}
	}

	if (obj != null && obj != 3) {
		$("#div1").css("display", "block");
	} else {
		$("#div1").css("display", "none");
	}
	
}

function changeTypes(obj) {
	var i = 0;
	$(".type-radio").each(function() {
		if ($(this).attr("checked")) {
			i++;
		}
	});

	if ($(obj).find("input").is(":checked")) {
		$(obj).removeClass("span-checked");
		$(obj).find("input").attr("checked", false);
		var s = $(obj).find("input").val();
		$("#fangyuanyoushi").val($("#fangyuanyoushi").val().replace(s, ""));

	} else {
		if (i < 15) {
			$(obj).addClass("span-checked");
			$(obj).find("input").attr("checked", true);
			$("#fangyuanyoushi").val(
					$("#fangyuanyoushi").val() + "," + $(obj).find("input").val());
			i = i--;
		} else {
			$.jBox.tip("只能选择五个");
		}
	}

}
/** 房号选择未知 qs */
function fanghaoweizhi(obj) {
	var houseNum = $("#fangyuanfanghaos").val();
	if ($(obj).find("input").is(":checked")) {
		$(obj).removeClass("span-checked");
		$(obj).find("input").attr("checked", false);
		if(houseNum != null && houseNum != ""){
			$("#fangyuanfanghao").val(fanghaochuli(houseNum,1));
			$("#fangyuanlouceng").val(fanghaochuli(houseNum,2));
		}else{
			$("#fangyuanlouceng").val(null);
			$("#fangyuanfanghao").val(null);
		}
		document.getElementById("fangyuanlouceng").readOnly=false;
		document.getElementById("fangyuanfanghao").readOnly=false;
		
	} else {
		$(obj).addClass("span-checked");
		$(obj).find("input").attr("checked", true);
		$("#fangyuanlouceng").val("0");
		$("#fangyuanfanghao").val("0");
		document.getElementById("fangyuanlouceng").readOnly=true;
		document.getElementById("fangyuanfanghao").readOnly=true;
	}

}


function changeTypeVer(obj) {
	$(".ver-radio").each(function() {
		$(".ver-radio").parent().removeClass("span-checked");
		$(".ver-radio").removeAttr("checked");
	});
	$(obj).addClass("span-checked");
	$(obj).find("input").attr("checked", true);
}

var nub = 21;
//房源优势新增弹窗
function addfangyuanyoushi() {
	var html = "<div style='padding:10px;'>输入房源优势：<input type='text' id='pz' name='pz' /></div>";
	var submit = function(v, h, f) {
		var i = 0
		$(".type-radio").each(function() {
			if ($(this).val() == f.pz) {
				i = 1;
			}
		});
		if (i == 0) {
			if (f.pz != null && f.pz != '') {
				$("#addPz").before("<label class='type-label span-checked' onclick='changeTypes(this)' for='type7'><span class='glyphicon glyphicon-remove-circle delete' onclick='deleteType(this);'></span>"
						+ f.pz
						+ "<i></i> <input type='checkbox' checked='checked' class='type-radio' id='type"+nub+"' name='phi_configure' value='"+f.pz+"'></label>");
				$("#fangyuanyoushi").val(
						$("#fangyuanyoushi").val() + "," + $("#type" + nub).val());
				nub++
			}
			return true;
		} else {
			$.jBox.tip("已有房源优势");
			return false;
		}

	};

	$.jBox(html, {
		title : "房源优势",
		submit : submit
	});
}

var adys = 1;
function addyslabel() {
	if (adys == 1) {
		$("#divys").css("display", "block");
		adys = 2;
	} else if (adys == 2) {
		$("#divys").css("display", "none");
		adys = 1;
	}

}
var pzsubmit = 1;
function addpzlabel() {
	if (pzsubmit == 1) {
		$("#divys1").css("display", "block");
		pzsubmit = 2;
	} else if (pzsubmit == 2) {
		$("#divys1").css("display", "none");
		pzsubmit = 1;
	}

}
//房源优势/配置新增qs
function submitys(obj) {
	var v = "";
	if (obj == 1) {
		v = $("#addys").val();
	} else if (obj == 2) {
		v = $("#addpz").val();
	}
	var i = 0
	$(".type-radio").each(function() {
		if ($(this).val() == v) {
			i = 1;
			$.jBox.tip("已有房源优势");
		}
	});
	if (i == 0) {
		var pz = "<label class='type-label  span-checked' onclick='changefangyuanpeizhi(this)'  for='type"+nub+"' style='padding: 0px 18px;'>"
				+v
				+ "<i></i><input type='checkbox' checked='checked' class='type-radio' id='type"+nub+"' name='hi_function' value='"+v+"'></label>"
		var ss = "<label class='type-label span-checked' onclick='changeTypes(this)' for='type"+nub+"'>"
				+ v
				+ "<i></i> <input type='checkbox' checked='checked' class='type-radio' id='type"+nub+"' name='phi_configure' value='"+v+"'></label>";
		if (v != null && v != '') {
			if (obj == 1) {//房源优势
				$("#addyslab").before(ss);
				$("#fangyuanyoushi").val(
				$("#fangyuanyoushi").val() + "," + $("#type" + nub).val());
			} else if (obj == 2) {//房源配置
				$("#addpzlab").before(pz);
				$("#fangyuanpeizhi").val(
				$("#fangyuanpeizhi").val() + "," + $("#type" + nub).val());
			}
			nub++
		}

	}
}


function deleteType(obj) {
	$(obj).parent().find("input").remove();
	$(obj).parent().remove();
	$(obj).remove();
	$("#fangyuanyoushi").val().replace(",undefined", "");
}


function dataType(data){
	$.ajax({
		type: "POST",
		url: "/intention/selectHouseIntTypeList",
		data: "hicode="+data,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		success: function(result) {
			if(result.message=="error"){
	    	}else{
	    		$("#tableContent #tableData tbody").html("");
	    	    if(result.ht.length > 0){
	    	    	$.each(result.ht, function(idx, house) {
	    	    		var tts = format(house.ht_time, 'yyyy-MM-dd');
	    	    		var rmt = "无";
	    	    		if(house.ht_remind_time != null && house.ht_remind_time != ""){
	    	    			rmt = format(house.ht_remind_time, 'yyyy-MM-dd');
	    	    		}
	    	    		var str = "<tr class='tr'  id='data_contents' style='width:500px;'><td width='70px;'>";
	    	    		str = str + house.ht_type +"</td>";
	    	    		str = str +"<td width='70px;'>"+tts+"</td>";
	    	    		if(house.ht_count.length>4){
	    	    		str = str +"<td title='"+house.ht_count.substring(0,house.ht_count.length)+"' width='80px;'>"
	    	    			+house.ht_count.substring(0,4)+"..";
	    	    		}else{
	    	    			str = str+"<td width='80px;'>" + house.ht_count;
	    	    		}
	    	    		str = str + "</td><td width='70px;'>"+rmt+"</td>";
	    	    		if(house.ht_remind_count != null && house.ht_remind_count.length > 4){
	    	    			str = str + "<td title='"+house.ht_remind_count.substring(0,house.ht_remind_count.length)+"' width='75px;'>"
	    	    				+house.ht_remind_count.substring(0,4)+"..";
	    	    		}else{
	    	    			if(house.ht_remind_count == null || house.ht_remind_count == ""){
	    	    				str = str +"<td width='75px;'>无";
	    	    			}else{
	    	    				str = str +"<td width='75px;'>" + house.ht_remind_count;
	    	    			}
	    	    			
	    	    		}
	    	    		str = str+"</td><td width='85px;'>"+house.em_name+"</td></tr>";
	    	    		$("#tableData tbody").append(str);
	        	    });
	    	    }
	    	}
		}
	});
	
}






























