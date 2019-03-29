var pcode = "";

$(function(){
	selectHouseTypeParent2();//物品类型数据初始化
	data();
})

//if(document.readyState=="complete"){  
//        data();  
//}   

function data(){
	$.ajax({
		type: "POST",
		url: "/purchaseOrder/selectPurchaseOrderList",
		data: "pur_code="+$("#pur_code").val(),
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		async:false,
		success: function(result) {
			var html = "";
			var type = "";
			if(result.purType == -1){
				type = "未审核";
				$("#addPurchaseDivID").show();
			}else if(result.purType == 0){
				type = "审核中";
				$("#submitSugges").addClass("buttonDisabled");//提交审核按钮禁用
				$('#submitSugges').attr('disabled',"disabled");//禁用提交
				$("#submitPur").addClass("buttonDisabled");//添加物品按钮禁用
				$('#submitPur').attr('disabled',"disabled");//禁用提交
				$("#addPurchaseDivID").hide();
			}else if(result.purType == 1){
				type = "审核通过";
				$("#submitSugges").addClass("buttonDisabled");//提交审核按钮禁用
				$('#submitSugges').attr('disabled',"disabled");//禁用提交
				$("#submitPur").addClass("buttonDisabled");//添加物品按钮禁用
				$('#submitPur').attr('disabled',"disabled");//禁用提交
				$("#addPurchaseDivID").hide();
			}else if(result.purType == 2){
				type = "审核未通过";
				$("#addPurchaseDivID").show();
			}else{
				type = "未审核";
				$("#addPurchaseDivID").show();
			}
			$("#purType").text(type);//采购单状态
			
			$.each(result.artLisy,function(idx,art){
				var tts = format(art.art_addTime, 'yyyy-MM-dd');
				pcode = art.pur_code;
				var arton = "";
				if(art.art_on==0){
					arton = "新";
				}else if(art.art_on == 1){
					arton="旧";
				}				
				html = html + "<tr><td>"+art.art_name+"</td><td>"+art.art_type+"</td>"
					+"<td>"+art.art_brand+"</td><td>"+art.art_price+"</td>"
					+"<td>"+art.art_count+"</td><td>"+art.art_priceSum+"</td>"
					+"<td>"+art.art_spec+"</td><td>"+arton+"</td>"
					+"<td>"+art.art_payer+"</td><td>"+art.art_remark+"</td></tr>";
			})
			$(".tableDiv table tbody").append(html);
    	}
	});
}




/**
 * 查找物品类型---物品库存添加
 * @param obj
 */
function selectHouseTypeParent2(){
	$.ajax({
		 type: "POST",
		    url: "/itemManage/selectHouseTypeParentID2",
		    data : null,
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    async:false,
		    success: function(result) {
		    	var html = "<option value=''>--请选择--</option>";
    			$.each(result.houseTypeList2, function(index, item) {
					html = html + "<option value='"+item.ht_id+"'>"+item.ht_name +"</option>";
	    		});
    			$("#art_type").append(html);
		    }
	});
	
}

/**
 * 查找物品名称---物品库存添加
 * @param obj
 */
function selectHouseTypeParent3(obj){
	$.ajax({
		 type: "POST",
		    url: "/itemManage/selectHouseTypeParentID3",
		    data : "ht_parentId="+obj,
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    async:false,
		    success: function(result) {
		    	$("#art_name").html("");
		    	var html = "<option value=''>--请选择--</option>";
		    	$.each(result.houseTypeList3, function(index, item) {
					html = html + "<option value='"+item.ht_name+"'>"+item.ht_name +"</option>";
	    		});
		    html = html + "<option value='其他'>其他</option>";
   			$("#art_name").append(html);
		    }
	});
}

/**
 * 计算物品总价
 */
function getPriceSum(){
	var price = $("#art_price").val();//单价
	var count = $("#art_count").val();//数量
	if($("#art_price").val() == null || $("#art_price").val() == ""){
		$("#art_price").css("border-color","red");
		return;
	}
	$("#art_price").css("border-color","#bbb");
	if($("#art_count").val() == null || $("#art_count").val()== ""){
		$("#art_count").css("border-color","red");
		return;
	}
	$("#art_count").css("border-color","#bbb");
	var priceSum = price * count;
	$("#art_priceSum").val(priceSum);
	
}


$(document).ready(function(){
	/**
	 * 采购单提交审核
	 */
	$("#submitSugges").on("click",function(){
		$.ajax({
		    type: "POST",
		    url: "/purchaseOrder/updatePurchaseOrderType",
		    data: "pur_code="+$("#pur_code").val(),
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    async:false,
		    success: function(result) {
		    	if(result.types == "success"){//物品库存移库成功
		    		$('#submitSugges').attr('disabled',"disabled");//禁用提交
		    		$("#submitSugges").addClass("buttonDisabled");//提交审核按钮禁用
		    		$('#submitPur').attr('disabled',"disabled");//禁用提交
					$("#submitPur").addClass("buttonDisabled");//添加物品按钮禁用
					$("#purType").text("审核通过");//采购单状态
					$(".addPurchaseDiv").hide();//物品添加框隐藏
		    	}else{
		    		$.jBox.tip("审核失败，请重新提交");
		    	}	
		    }
		});
		
	})
})

//采购单物品添加
function submitArt(){
	var artname = ""
	if($("#art_name").val() != null && $("#art_name").val() != "" && $("#art_name").val() == "其他"){
		artname = $("#art_names").val();	
	}else {
		artname = $("#art_name").val();	
	}
	if($('#art_type option:selected').text() == null || $('#art_type option:selected').text() == "" 
		|| artname == null || artname == "" || $("#art_brand").val() == null || $("#art_brand").val() == ""
			|| $("#art_price").val() == null || $("#art_price").val() == "" || $("#art_count").val() == null || $("#art_count").val() == ""
				|| $("#art_priceSum").val() == null || $("#art_priceSum").val() == "" || $("#art_payer").val() == null || $("#art_payer").val() == ""
					|| $("#art_on").val() == null || $("#art_on").val() == "" || $("#art_spec").val() == null || $("#art_spec").val() == ""
						|| $("#art_remark").val() == null || $("#art_remark").val() == "" || $("#pur_code").val() == null || $("#pur_code").val() == ""){
		
		return;
	}
	
	
	var count ="art_type="+$('#art_type option:selected').text()+"&art_name="+artname+"&art_brand="+$("#art_brand").val()
		+"&art_price="+$("#art_price").val()+"&art_count="+$("#art_count").val()+"&art_priceSum="+$("#art_priceSum").val()
		+"&art_payer="+$("#art_payer").val()+"&art_on="+$("#art_on").val()+"&art_spec="+$("#art_spec").val()
		+"&art_remark="+$("#art_remark").val()+"&pur_code="+$("#pur_code").val()+"&pur_addres="+getUrlParam("cno_code");
		
	$.ajax({
		type: "POST",
		url: "/purchaseOrder/addPurchaseOrderOk",
		data: count,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		async:false,
		success: function(result) {
			pcode = result.article.pur_code;
				var arton = "";
				if(result.article.art_on==0){
					arton = "新";
				}else if(result.article.art_on == 1){
					arton="旧";
				}				
			var html = "<tr><td>"+result.article.art_name+"</td><td>"+result.article.art_type+"</td>"
					+"<td>"+result.article.art_brand+"</td><td>"+result.article.art_price+"</td>"
					+"<td>"+result.article.art_count+"</td><td>"+result.article.art_priceSum+"</td>"
					+"<td>"+result.article.art_spec+"</td><td>"+arton+"</td>"
					+"<td>"+result.article.art_payer+"</td><td>"+result.article.art_remark+"</td></tr>";
			$(".tableDiv table tbody").append(html);
			cleanInputVal();//清除添加框的残留数据
    	}
	});
	
}

/**
 * 清除添加框里面的数据
 */
function cleanInputVal(){
	$("#art_type").val("");//类型
	$("#art_name").val("");//名称
	$("#art_spec").val("");//规格
	$("#art_brand").val("");//品牌
	$("#art_on").val("0");//新旧
	$("#art_price").val("");//单价
	$("#art_price").val("");//数量
	$("#art_priceSum").val("");//总价
	$("#art_payer").val("公司");//付费对象
	$("#art_remark").val("");//备注
	$("#art_name").css("width","140px");
	$("#art_nameDiv").hide();
	
}

function getOtherName(obj){
	if(obj == "其他"){
		$("#art_name").css("width","80px");
		$("#art_nameDiv").show();
	}else{
		$("#art_name").css("width","140px");
		$("#art_nameDiv").hide();
	}
}



//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}


/* =======================================页面分页============================================== */
//判断页数
function page(){
	// 开始的页数样式
	if($("#sizeNum").text()<=5){
		$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
		for(var i=1; i<=$("#sizeNum").text(); i++){
			$(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a href='javascript:li("+ i +");'>"+ i +"</a></li>");
		}
		$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
		$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount")  +"' placeholder='请输入条数' /></li>");
		$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
	}else{
		if($("#Num").text()<=5){
			$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
			for(var i=1; i<=5; i++){
				$(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a href='javascript:li("+ i +");'>"+ i +"</a></li>");
			}
			$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
			$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount") +"' placeholder='请输入条数' /></li>");
			$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
		}
	}
	// end
	
	// 样式变化
	$(".paginList li").each(function(idx) {
		$(this).attr("class", "paginItem");
	});
	$("#paginList_"+$("#Num").text()+"").attr("class", "paginItem current");
	// end
	
	// 判断最后一页和第一页的样式
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
	// end
	
	// 间隔变色
	$('.tablelist tbody tr:odd').addClass('odd');
}

/* 点击LI分页读取数据 */
function li(id){
	
	$("#Num").text(id);
	$("#paginList_"+id+" a").attr("class", "paginItem");
	data();
}

function up(){
	// 获取当前页数
	var pageMum =parseInt($("#Num").text());
	// 最大页数
	var pageSize =parseInt($("#sizeNum").text());
	if(pageMum>1){
		if((pageMum-1) % 5 ==0){
			$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
				for(var i=5; i>0; i--){
					$(".paginList").append("<li id='paginList_"+ (pageMum-i) +"' class='paginItem'><a href='javascript:li("+ (pageMum-i) +");'>"+ (pageMum-i) +"</a></li>");
				}
				$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
				$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount") +"' placeholder='请输入条数' /></li>");
				$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
			}
		$("#Num").text(pageMum-1);
		data();
	}
}

function down(){
	// 获取当前页数
	var pageMum =parseInt($("#Num").text());
	// 最大页数
	var pageSize =parseInt($("#sizeNum").text());
	if(pageMum < pageSize){
		if((pageMum + 5)<pageSize){
			if(pageMum % 5 == 0){
				
				$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
				for(var i=1; i<= 5; i++){
						$(".paginList").append("<li id='paginList_"+ (pageMum+i) +"' class='paginItem'><a href='javascript:li("+ (pageMum+i) +");'>"+ (pageMum+i) +"</a></li>");
					}
				$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
				$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount") +"' placeholder='请输入条数' /></li>");
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
				$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount") +"' placeholder='请输入条数' /></li>");
				$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
			}
			$("#Num").text(pageMum+1);
			data();
		}
	}
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

//跳转修改推荐群体界面
//多选按钮判断
function query() {
	var len = $("input[name='chickes']:checked").length;
	if (len == 0) {
		swal('请选择一个！');
	} else if (len > 1) {
		swal('只能选择一个！');
	} else {
		var id =$("input[name='chickes']:checked").val();
		functionIfram('/serve/showListInfo?id=' + id,'查看服务','服务处理');
	}
}


