var _right = -436;
/************上面是常量定义区******************/
$(function() {
	// 加载数据
	loadData();
	// 加载权限控制
	loadOperation();
	// 验证表单
	validateForm();
});
/**
 * 表单验证
 */
function validateForm(){
	$("#listForm").validate({
		submitHandler:function(){
			ajaxFormSubmit();
		},
		rules:{
			ucps_name:{
				required:true,
				maxlength:10,
				remote:{
					url:"/valid/checkPowersName",
					type:"post",
					dataType:"json",
					data:{
						ucps_name:function(){
							return $("#ucps_name").val().trim();
						},
						ucps_pid:function(){
							return $("#ucps_pid").val().trim();
						},
						ucps_id:function(){
							return $("#ucps_id").val().trim();
						}
					}
				}
			},
			ucps_url:{
				required:true,
				maxlength:120,
				remote:{
					url:"/valid/checkPowersUrl",
					type:"post",
					dataType:"json",
					data:{
						ucps_name:function(){
							return $("#ucps_name").val().trim();
						},
						ucps_pid:function(){
							return $("#ucps_pid").val().trim();
						},
						ucps_id:function(){
							return $("#ucps_id").val().trim();
						}
					}
				}
			},
			ucps_icon:{
				required:true,
				maxlength:30
			}
		},
		messages:{
			ucps_name:{
				required:"输入权限名称！",
				maxlength:"最多10个汉字！",
				remote:"权限已存在！"
			},
			ucps_url:{
				required:"输入权限操作！",
				maxlength:"超出长度限制！",
				remote:"权限已存在！"
			},
			ucps_icon:{
				required:"输入权限图标！",
				maxlength:"超出长度限制！"
			}
		}
	});
}
/**
 * 加载权限列表
 */
function loadData(){
	$.post("/company/getPowersList",function(result){
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
			show_width += subPixel(width)+subPixel(margin_left)+subPixel(margin_right);
		});
		$("#powersList").css("width",show_width);
		// 点击事件
		$("input[name='powerId']").click(function(){
			if(this.checked){
				// 单选
				$("input[name='powerId']").attr("checked",false);
				$(this).attr("checked",true);
			}
			// 隐藏添加人员模块
			var right = subPixel($("#addPowers").css("right"));
			if(right != _right){
				closeAddPowers();
			}
		});
		// 显示禁用的权限
		$("input[name='powerId'][state=0]").parent().parent().parent().addClass("disabled");
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
 * 关闭添加权限div
 */
function closeAddPowers(){
	$("#addPowers").animate({right:_right},500,function(){
		// 初始化表单
		$("#addPowers input[type='text'],#addPowers input[type='hidden']").val("");
		$("#ucps_url").parent().parent().css("display","block");
		$("#ucps_icon").parent().parent().css("display","block");
		$("#addPowers .checkbox-b:eq(0)").show().next().next().hide();
		$("#addPowers input[name='ucps_type'][value='1']").attr("checked",true);
		$("#addPowers label.error").css("display","none");
		// 清除验证缓存
		$("#ucps_name").removeData("previousValue");
		$("#ucps_icon").removeData("previousValue");
		$("#ucps_url").removeData("previousValue");
	});
}
/**
 * 添加同级权限
 */
function addBrother(){
	var powerId =  $("input[name='powerId']:checked").val();
	if(typeof(powerId)=="undefined"){
		swal("请选择权限!"); 
		return;
	}
	var b_level =  $("input[name='powerId']:checked").attr("level");
	if(b_level>=4){
		alert("已是最下级！");
		return;
	}
	var right = subPixel($("#addPowers").css("right"));
	if(right != _right){
		closeAddPowers();
	}
	$("#addPowers").queue(function(){
		if(b_level==1){
			$("#ucps_url").parent().parent().css("display","none");
			$("#ucps_icon").parent().parent().css("display","block");
		}
		if(b_level==2){
			$("#ucps_url").parent().parent().css("display","block");
			$("#ucps_icon").parent().parent().css("display","none");
		}
		if(b_level==3){
			$("#ucps_url").parent().parent().css("display","block");
			$("#ucps_icon").parent().parent().css("display","block");
			$("#addPowers .checkbox-b:eq(0)").hide().next().next().show();
			$("#addPowers input[name='ucps_type'][value='2']").attr("checked",true);
		}
		var b_asc = formatInt($("input[name='powerId']:checked").attr("asc")) + 1;
		var b_pid = $("input[name='powerId']:checked").attr("pid");
		$("#ucps_pid").val(b_pid);
		$("#ucps_level").val(b_level);
		$("#ucps_asc").val(b_asc);
		
		$(".addPowers-title").text("添加同级权限");
		$(this).dequeue();
	});
	$("#addPowers").animate({right:0},500);
}
/**
 * 添加下级权限
 */
function addChild(){
	var powerId =  $("input[name='powerId']:checked").val();
	if(typeof(powerId)=="undefined"){
		swal("请选择权限!"); 
		return;
	}
	var c_level =  formatInt($("input[name='powerId']:checked").attr("level")) + 1;
	if(c_level>=4){
		alert("已是最下级！");
		return;
	}
	var right = subPixel($("#addPowers").css("right"));
	if(right != _right){
		closeAddPowers();
	}
	$("#addPowers").queue(function(){
		if(c_level==1){
			$("#ucps_url").parent().parent().css("display","none");
			$("#ucps_icon").parent().parent().css("display","block");
		}
		if(c_level==2){
			$("#ucps_url").parent().parent().css("display","block");
			$("#ucps_icon").parent().parent().css("display","none");
		}
		if(c_level==3){
			$("#ucps_url").parent().parent().css("display","block");
			$("#ucps_icon").parent().parent().css("display","block");
			$("#addPowers .checkbox-b:eq(0)").hide().next().next().show();
			$("#addPowers input[name='ucps_type'][value='2']").attr("checked",true);
		}
		var c_pid = $("input[name='powerId']:checked").val();
		var c_asc = formatInt($("input[name='powerId'][pid="+c_pid+"]").last().attr("asc")) + 1;
		$("#ucps_pid").val(c_pid);
		$("#ucps_level").val(c_level);
		$("#ucps_asc").val(c_asc);
		
		$(".addPowers-title").text("添加下级权限");
		$(this).dequeue();
	});
	$("#addPowers").animate({right:0},500);
}
/**
 * 删除权限
 */
function delPowers(){
	var powerId =  $("input[name='powerId']:checked").val();
	if(typeof(powerId)=="undefined"){
		swal("请选择权限!");
		return;
	}
	swal({ 
        title: "确认删除吗？",  
        text: "删除后将删除其所有子权限，请谨慎操作！",
        showCancelButton: true, 
        closeOnConfirm: true, 
        confirmButtonText: "确认", 
        confirmButtonColor: "#ec6c62" 
    }, function() {
    	$.post("/company/delPowers",{"ucps_id":powerId},function(result){
    		if(result.msg=="success"){
    			loadData();
    		}
    	},"json");
    });	
}
/**
 * 编辑权限
 */
function editPowers(){
	var powerId =  $("input[name='powerId']:checked").val();
	if(typeof(powerId)=="undefined"){
		swal("请选择权限!");
		return;
	}
	var right = subPixel($("#addPowers").css("right"));
	if(right != _right){
		closeAddPowers();
	}
	$("#addPowers").queue(function(){
		$(".addPowers-title").text("编辑权限");
		$.post("/company/editPowers",{"ucps_id":powerId},function(result){
			if(result.msg=="success"){
				var pw = result.powers;
				// 显示权限信息
				$("#ucps_id").val(pw.ucps_id);
				$("#ucps_name").val(pw.ucps_name);
				$("#ucps_url").val(pw.ucps_url);
				$("#ucps_icon").val(pw.ucps_icon);
				$("#ucps_pid").val(pw.ucps_pid);
				$("#addPowers input[name='ucps_type'][value="+pw.ucps_type+"]").attr("checked",true);
				
				var level = pw.ucps_level;
				
				if(level==1){
					$("#ucps_url").parent().parent().css("display","none");
				}
				if(level==2){
					$("#ucps_icon").parent().parent().css("display","none");
				}
				if(level==3){
					$("#addPowers .checkbox-b:eq(0)").hide().next().next().show();
				}
			}
		},"json");
		$(this).dequeue();
	});
	$("#addPowers").animate({right:0},500);
}
/**
 * 启用权限，禁用权限
 */
function disablePowers(type){
	var powerId =  $("input[name='powerId']:checked").val();
	if(typeof(powerId)=="undefined"){
		swal("请选择权限!");
		return;
	}
	$.post(
		"/company/disablePowers",
		{"ucps_id":powerId,"type":type},
		function(result){
			if(result.msg=="success"){
				swal({title:"操作成功!",type:"success",timer:1500});
				if(type==0){
					// 更新节点
					$("input[name='powerId'][value="+powerId+"]").attr("state",0).parent().parent().parent().addClass("disabled");
					// 更新子节点
					$("input[name='powerId'][pid="+powerId+"]").attr("state",0).parent().parent().parent().addClass("disabled");
					// 更新孙子节点
					$("input[name='powerId'][ppid="+powerId+"]").attr("state",0).parent().parent().parent().addClass("disabled");
				}else{
					// 更新节点
					$("input[name='powerId'][value="+powerId+"]").attr("state",1).parent().parent().parent().removeClass("disabled");
					// 更新子节点
					$("input[name='powerId'][pid="+powerId+"]").attr("state",1).parent().parent().parent().removeClass("disabled");
					// 更新孙子节点
					$("input[name='powerId'][ppid="+powerId+"]").attr("state",1).parent().parent().parent().removeClass("disabled");
				}
			}else{
				swal({title:""+result.msg,type:"error"});
			}
	},"json");
}
/**
 * 异步提交表单
 */
function ajaxFormSubmit(){
	$.post(
			"/company/savePowers",
			$('#listForm').serialize(),
			function(result){
				if(result.msg=="success"){
					loadData();
					closeAddPowers();
				}
			},"json");
}
/**
 * 上移权限
 */
function moveUp(){
	var powerId = $("input[name='powerId']:checked").val();
	if(typeof(powerId)=="undefined"){
		swal("请选择权限！");
		return;
	}
	// 找到前一个权限
	var before = $("input[name='powerId']:checked").parent().parent().parent().prev().children("p").find("input[name='powerId']").val();
	$.post(
			"/company/movePowers",
			{"power1":powerId,"power2":before},
			function(result){
				if(result.msg=="success"){
					// 移动权限
					var li = $("input[name='powerId'][value='"+powerId+"']").parent().parent().parent();
					var prev = $("input[name='powerId'][value='"+before+"']").parent().parent().parent();
					$(prev).before(li);
				}
			},"json");
}
/**
 * 下移权限
 */
function moveDown(){
	var powerId = $("input[name='powerId']:checked").val();
	if(typeof(powerId)=="undefined"){
		swal("请选择权限！");
		return;
	}
	// 找到后一个权限
	var after = $("input[name='powerId']:checked").parent().parent().parent().next().children("p").find("input[name='powerId']").val();
	$.post(
			"/company/movePowers",
			{"power1":powerId,"power2":after},
			function(result){
				if(result.msg=="success"){
					// 移动权限
					var li = $("input[name='powerId'][value='"+powerId+"']").parent().parent().parent();
					var next = $("input[name='powerId'][value='"+after+"']").parent().parent().parent();
					$(next).after(li);
				}
			},"json");
}
/**
 * 截取px
 * @param obj
 */
function subPixel(obj){
	var end = obj.indexOf("px");
	return formatInt(obj.substring(0,end));
}
/**
 * 按钮权限控制
 */
function loadOperation(){
	$(".content-operation").html("");
	var url  = window.location.pathname+window.location.search;
	$.ajax({
	    type: "POST",
	    url: "/user/userJurisdiction",
	    data: {
	    	url : url,
	    	ucps_type : 2
	    },
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	var button = "";
	    	if(result.menuLists.length < 1){
	    		return;
	    	}
	    	for(var i = result.menuLists.length;i>0;i--){
	    		var item = result.menuLists[i-1];
	    		button += "<button onclick='"+item.ucps_url+"' ><i class='"+item.ucps_icon+"'></i>"+item.ucps_name+"</button>"
	    	}
	    	$(".content-operation").html(button);
	    }
	});
}
/**
 * 格式化整数
 * @param obj
 * @returns
 */
function formatInt(obj){
	var num = parseInt(obj);
	return isNaN(num)?0:num;
}