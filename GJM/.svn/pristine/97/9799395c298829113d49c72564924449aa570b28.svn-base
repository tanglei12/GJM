$(function() {
	// 获取title
	$.post(
		"/company/getTitleInfo",
		{"type":getQueryString("type"),"typeId":getQueryString("typeId")},
		function(result){
			$("#titleName").text(result.titleName);
			$("#type").val(result.type);
			$("#typeId").val(result.typeId);
		},"json");
	// 加载权限列表
	loadData();
});
/**
 * 加载权限列表
 */
function loadData(){
	$.post(
		"/company/settingPowersAjax",
		{"type":getQueryString("type"),"typeId":getQueryString("typeId")},
		function(result){
		$("#powersList").empty();
		if(result.pwList.length>0){
			var str = "<ul>" ;
				for(var i=0;i<result.pwList.length;i++){
					var pw = result.pwList[i];
					str += "<li class='level_1'>" +
						   	    "<p><label class='checkbox-a'><input type='checkbox' class='input_check' name='powerId' value="+pw.ucps_id+" pid="+pw.ucps_pid+" state="+pw.ucps_state+" level="+pw.ucps_level+" asc="+pw.ucps_asc+" /><span></span><i>"+pw.ucps_name+"</i></label></p>" ;
					if(pw.childs.length>0){
						 str += "<ul>";
						 for(var j=0;j<pw.childs.length;j++){
							 var c_pw = pw.childs[j];
							 str += "<li class='level_2'>" +
							 			"<p><label class='checkbox-a'><input type='checkbox' class='input_check' name='powerId' value="+c_pw.ucps_id+" pid="+c_pw.ucps_pid+" state="+c_pw.ucps_state+" level="+c_pw.ucps_level+" asc="+c_pw.ucps_asc+" /><span></span><i>"+c_pw.ucps_name+"</i></label></p>" ;
							 if(c_pw.childs.length>0){
								 var opt_power = "<ul>";
								 var btn_power = "<ul>";
								 for(var k=0;k<c_pw.childs.length;k++){
								 	 var cc_pw = c_pw.childs[k];
								 	 if(cc_pw.ucps_type==3){
								 		btn_power += "<li class='level_3'>" +
								 						"<p><label class='checkbox-a'><input type='checkbox' class='input_check' name='powerId' value="+cc_pw.ucps_id+" pid="+cc_pw.ucps_pid+" ppid="+pw.ucps_id+" state="+cc_pw.ucps_state+" level="+cc_pw.ucps_level+" asc="+cc_pw.ucps_asc+" /><span></span><i>"+cc_pw.ucps_name+"</i></label></p>" ;
								 		btn_power += "</li>";
								 	 }else{
								 		opt_power += "<li class='level_3'>" +
					 									"<p><label class='checkbox-a'><input type='checkbox' class='input_check' name='powerId' value="+cc_pw.ucps_id+" pid="+cc_pw.ucps_pid+" ppid="+pw.ucps_id+" state="+cc_pw.ucps_state+" level="+cc_pw.ucps_level+" asc="+cc_pw.ucps_asc+" /><span></span><i>"+cc_pw.ucps_name+"</i></label></p>" ;
								 		opt_power += "</li>";
								 	 }
									
								 }
								 	 opt_power += "</ul>";
								 	 btn_power += "</ul>";
								 if(opt_power != "<ul></ul>"){
									 str += "<ul><li class='folder'><p><span class='square fa-minus-square'></span><i>操作权限</i></p>"+opt_power+"</li></ul>";
								 }
								 if(btn_power != "<ul></ul>"){
									 str += "<ul><li class='folder'><p><span class='square fa-minus-square'></span><i>按钮权限</i></p>"+btn_power+"</li></ul>";
								 }
							 }
							 str += "</li>";
						 }
						 str += "</ul>";
					}	
					str	+= "</li>";
				}
				str +="</ul>";
			$("#powersList").append(str);
		}
		// div宽度自适应
		var show_width = 0;
		$("#powersList li.level_1").each(function(){
			var width = $(this).css("width");
			var margin_left = $(this).css("margin-left");
			var margin_right = $(this).css("margin-right");
			show_width += subWidth(width)+subWidth(margin_left)+subWidth(margin_right);
		});
		$("#powersList").css("width",show_width);
		// 遍历父级已拥有的权限
		if(typeof(result.parentPowers)!="undefined")
		for(var n=0;n<result.parentPowers.length;n++){
			var parentPowers = result.parentPowers[n];
			if(JSON.stringify(parentPowers)!="null"){
				$("input[name='powerId']").each(function(){
					if(this.value==parentPowers.ucps_id){
						$(this).attr("checked",true);
						$(this).attr("disabled",true);
						$(this).next().addClass("translucent");
					}
				});
			}
		}
		// 遍历已拥有的权限
		for(var m=0;m<result.powers.length;m++){
			var powers = result.powers[m];
			if(JSON.stringify(powers)!="null"){
				$("input[name='powerId']").each(function(){
					if(this.value==powers.ucps_id){
						$(this).attr("checked",true);
					}
				});
			}
		}
		// 点击checkbox,父checkbox选择,子checkbox全选
		$("input[name='powerId']").click(function(){
			// 父checkbox选择
			$("input[name='powerId'][value="+$(this).attr("pid")+"]").attr("checked",true);
			$("input[name='powerId'][value="+$(this).attr("ppid")+"]").attr("checked",true);
			
			// 子checkbox全选
			$("input[name='powerId'][pid="+this.value+"]").attr("checked",this.checked);
			$("input[name='powerId'][ppid="+this.value+"]").attr("checked",this.checked);
		});
		// 折叠
		$(".folder > p").toggle(function(){
			$(this).next().slideUp(200);
			$(this).find('.square').removeClass('fa-minus-square').addClass('fa-plus-square');
		},function(){
			$(this).next().slideDown(200);
			$(this).find('.square').removeClass('fa-plus-square').addClass('fa-minus-square');
		});
	},"json");
}
/**
 * 获取url参数值
 * @param name
 * @returns
 */
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}
/**
 * 保存设置
 */
function saveSetting(){
	var powerIds = "";
	$("input[name='powerId']:not([disabled]):checked").each(function(){
		powerIds += this.value+",";
	});
	// 保存数据
	$.post(
		"/company/saveSettings",
		{"type":$("#type").val(),"typeId":$("#typeId").val(),"powerIds":powerIds},
		function(result){
			if(result.msg=="success"){
				swal({title:"操作成功!",type:"success",timer:1500});
			}
		},"json");
}
/**
 * 截取宽度值
 * @param obj
 */
function subWidth(obj){
	var end = obj.indexOf("px");
	return parseInt(obj.substring(0,end));
}