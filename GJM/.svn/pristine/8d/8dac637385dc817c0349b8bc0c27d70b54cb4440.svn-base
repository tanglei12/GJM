//houseArrange

$(function(){
	data();
});

function data(){
	var type = GetQueryString("type");
	if(type != null){
		if(type == 1){
			type = "托管合同";
		}else if(type == 2){
			type = "租赁合同";
		}
		$.ajax({
			type: "POST",
			url: "/user/houseArrangeList",
			data: {
				em_id : GetQueryString("em_id"),
				type : type
			},
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType: "json",
			success: function(result) {
				$(".house-left-title").next().find("tbody").html("");
				$(result.houseEmContractEm).each(function(index,item){
					var uc_state = "";
					if(item.uc_state == 0){
						uc_state = '<span class="error-icon">未分配</span>';
					}else if(item.uc_state == 1){
						uc_state = '<span class="success-icon">已分配</span>';
					}
					var html = '<tr onclick="ckeckClick(this)">'+
					'<td><label class="checkbox-min" data-id="'+ item.contractObject_Id +'"><input type="checkbox" class="input_check" name="check"/><span></span><i></i></label></td>'+
					'<td><a href="javascript:;" onclick="hrefClick(this)" data-type="/houseLibrary/jumpHouseInfo?hi_code='+ item.hi_code +'">'+ item.house_address +'</a></td>'+
					'<td><a href="javascript:;" onclick="hrefClickContract(this)" data-type="/contractObject/jumpDisplayContract?contractObject_No='+ item.contractObject_No +'">'+ item.contractObject_No +'</a></td>'+
					'<td>'+ item.contractBody_StartTOEnd +'</td>'+
					'<td><font color="#E74C3C">'+ item.contractBody_Rent +'</font></td>'+
					'<td>'+ item.em_name +'</td>'+
					'<td>'+ uc_state +'</td>'+
					'</tr>';
					$(".house-left-title").next().find("tbody").append(html);
				});
			}
		});
	}
}


/**
 * 编辑框选择管家信息
 */
function editName(){
	$("#newHousekeeper").editModel({
		title : "管家信息",
		target : {
			id : "em_idEdit",
			name : "newHousekeeper",
			phone : "",
		},
		select_all : true
	});
}

/**
 * 全选数据
 */
function allclick(ids){
	if($(ids).find("input[name='check']").is(":checked")){
		$("table tbody").find("input[name='check']").attr("checked",true);
	}else{
		$("table tbody").find("input[name='check']").attr("checked",false);
	}
}

/**
 * 选择数据
 */
function ckeckClick(ids){
	if($(ids).find("input[name='check']").is(":checked")){
		$(ids).find("input[name='check']").attr("checked",false);
	}else{
		$(ids).find("input[name='check']").attr("checked",true);
	}
	var bools = true;
	$("table tbody tr").each(function(){
		if(!$(this).find("input[name='check']").is(":checked")){
			bools = false;
			return;
		}
	});
	if(bools){
		$("table thead").find("input[name='check']").attr("checked",true);
	}else{
		$("table thead").find("input[name='check']").attr("checked",false);
	}
}

/**
 * 进行房源分配
 */
function submit(){
	var ids = new Array();
	$("table tbody tr").each(function(i){
		if($(this).find("input[name='check']").is(":checked")){
			ids.push($(this).find("input[name='check']").parent().attr("data-id"));
		}
	});
	
	if(ids.length == 0){
		$.jBox.tip("请选择分配房源!","error");
		return;
	}
	
	var id = $("#em_idEdit").val();
	if(id == ""){
		$.jBox.tip("请选择现管家！","error");
		return;
	}
	var type = GetQueryString("type");
	if(type != null){
		if(type == 1){
			type = "托管合同";
		}else if(type == 2){
			type = "租赁合同";
		}
	}else{
		$.jBox.tip("参数有误请重新操作！","error");
		return;
	}
	$.jBox.tip("分配中...", 'loading');
	$.ajax({
		type: "POST",
		url: "/user/submitArrange",
		data: {
			contractNo : ids,
			newEm_id : id,
			type : type,
			em_id : getUrlParam("em_id"),
            cir_author : $.cookie("em_id")
		},
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		success: function(result) {
			if(result.message == "success"){
				$.jBox.tip("分配成功！", 'success');
				data();
				$("table thead input[name='check']").attr("checked",false);
			}else{
				$.jBox.tip("分配失败，请重新分配", 'error');
			}
		}
	});
	
}

/**
 * 获取url参数
 * 
 * @param name
 * @returns
 */
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"房屋信息","库存房源");
}

function hrefClickContract(obj){
	window.parent.href_mo($(obj).attr("data-type"), "合同信息", "合同详情");
}