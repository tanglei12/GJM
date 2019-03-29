var selectServe = null;
$(function(){
	data();
	
	//打开窗口
	$('.cd-popup-trigger3').on('click', function(event){
	    event.preventDefault();
	    $('.cd-popup3').addClass('is-visible3');
	});
	//关闭窗口
	$('.cd-popup-close').on('click', function(event){
	      event.preventDefault();
	      //removeInput();//清除数据
	      $(".cd-popup3").removeClass('is-visible3');
	     
	});
	
});

$(function(){
	 selectHouseTypeParent2();
})

//筛选获取数据
function data(){
	selectHouseIntention = $.Deferred();
	var sizeCount = 10;
	if($.cookie('userSize') != null){
		sizeCount = $.cookie('userSize');
	}else{
		$.cookie("userSize", sizeCount, { expires: 7 });
	}
	if($("#sizeCount input").val() != null){
		sizeCount = $("#sizeCount input").val();
		 $.cookie("userSize", sizeCount, { expires: 7 });
	}
	
	/*if(returnNumber($.cookie('userSize')) <= 0){
		sizeCount = $.cookie('userSize');
	}else{
		$.cookie("userSize", sizeCount, { expires: 7 });
	}
	if($("#sizeCount input").val() != null){
		sizeCount = $("#sizeCount input").val();
		 $.cookie("userSize", sizeCount, { expires: 7 });
	}*/
	
	var str = "";
	var dateStr = "";
	if($(".selectList ul").length > 0){
		var str = "";
		$(".selectList ul").each(function(i){
			if($(this).find(".checkbox input").is(':checked')){
				str += ""+ $(this).find("a").attr("data-text") +"::"+ isSpace($(this).find(".content input").val()) +",";
			}
		});
	}
	$(".searchBar .timeClick").each(function(i){
		if($(this).attr("class") == "timeClick mouseDown"){
			dateStr = $(this).text();
		}
	});
	
	$.ajax({
	    type: "POST",
	    url: "/itemManage/selectItemsInventoryList",
	    data : "pageSize="+$.cookie('userSize')+"&pageNo="+$("#Num").text()+"&oldpageSize="+$.cookie('userSize'),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$("#tableContent #tableData tbody").empty();
			$("#tableContent").removeClass("table-bg");
    		$.each(result.itemList, function(index, item) {
    			var position = "";
    			if(item.inv_position == 0){
    				position = "公司";
    			}else{
    				position = item.inv_position;
    			}
    			
				$("#tableData tbody").append(
					"<tr class='tr'  id='data_contents'>" +
						"<td><input name='chickes' type='checkbox' value='"+item.inv_id+"'/></td>" +
						"<td>"+ (index+1)+"</td>" +
						"<td>"+ item.inv_name+"</td>" +
						"<td>"+ item.inv_type +"</td>" +
						"<td>"+ item.inv_brand +"</td>" +
						"<td>"+ item.inv_price +"</td>" +
						"<td>"+ item.inv_count +"</td>" +
						"<td>"+ item.inv_priceSum +"</td>" +
//						"<td>"+ item.em_id + "</td>" +
						"<td>"+ item.inv_payer + "</td>" +
						
						"<td>"+ format(item.inv_createTime,'yyyy-MM-dd') +"</td>" +
						"<td>"+ ((item.inv_state==0) ? '未使用' : '使用中') +"</td>" +
						"<td>"+ ((item.inv_on==0) ? '新' : '旧') + "</td>" +
						"<td>"+ ((item.inv_gb==0) ? '好' : '坏') + "</td>" +
						"<td>"+ item.inv_remark + "</td>" +
						"<td>"+ position + "</td>"+
					"</tr>");
	    		});
    		
    		$("#sizeNum").text(result.pageModel.totalPage);
        	$("#nums").text(result.pageModel.totalRecords);
        	$("#data").data("pageCount", $.cookie('userSize'));
        	
	    	selectHouseIntention.resolve();
	    },beforeSend:upLoadAnimation()

	    });
	$.when(selectHouseIntention).done(function () {
		page();
		
		hide_table();
	});
}

function achievementUpdate(){
	$("#tableData tbody tr").each(function(index){
		if($(this).find("input").is(':checked')){
			functionIfram('/achievementHouseMoney?sa_id='+$(this).find("input").val(),'修改业绩','房屋业绩');
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
		    data : "ucc_id="+ getUrlParam("ucc_id") +"&startDate="+ getUrlParam("startDate") +"&endDate="+ getUrlParam("endDate") +"",
		    contentType: "application/x-www-form-urlencoded; charset=utf-8",
		    dataType: "json",
		    async:false,
		    success: function(result) {
		    	var html = "<option value=''>--请选择--</option>";
    			$.each(result.houseTypeList2, function(index, item) {
					html = html + "<option value='"+item.ht_id+"'>"+item.ht_name +"</option>";
	    		});
    			$("#inv_type").append(html);
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
		    	$("#inv_name").html("");
		    	var html = "<option value=''>--请选择--</option>";
		    	$.each(result.houseTypeList3, function(index, item) {
					html = html + "<option value='"+item.ht_id+"'>"+item.ht_name +"</option>";
	    		});
   			$("#inv_name").append(html);
		    	
		    }
	});
}

/**
 * 计算物品总价
 */
function getPriceSum(){
	var price = $("#inv_price").val();//单价
	var count = $("#inv_count").val();//数量
	if($("#inv_price").val() == null || $("#inv_price").val() == "" || $("#inv_count").val() == null || $("#inv_count").val()== ""){
		$.jBox.tip("物品单价和数量不能为空");
		return;
	}
	var priceSum = price * count;
	$("#inv_priceSum").val(priceSum);
	
}

/**
 * 是否扣除业绩计算
 * @param obj
 */
function selectPayer(obj){
	if(obj == "公司"){
		$("#payerDl").show();
	}else{
		$("#payerDl").hide();
	}
}


$(document).ready(function(){
	$("#addHouseInventory").click(function(){
		//物品状态
		
//		if($("#inv_type").val() == null || $("#inv_type").val() == "" || $("#inv_name").val() == null || $("#inv_name").val() == "" 
//			|| $("#inv_brand").val() == null || $("#inv_brand").val() == "" || $("#inv_price").val() == null || $("#inv_price").val() == ""
//				|| $("#inv_count").val() == null || $("#inv_count").val() == "" || $("#inv_priceSum").val() == null || $("#inv_priceSum").val() == ""
//					|| $("#inv_payer").val() == null || $("#inv_payer").val() == "" || $("#inv_state").val() == null || $("#inv_state").val() == ""
//						|| $("#inv_on").val() == null || $("#inv_on").val() == "" || $("#inv_gb").val() == null || $("#inv_gb").val() == ""){
//			$.jBox.tip("请将带*的内容完善");
//			return ;
//		}
		var count = "inv_type="+$("#inv_type").val()+"&inv_name="+$("#inv_name").val()+"&inv_brand="+$("#inv_brand").val()
				+"&inv_price="+$("#inv_price").val()+"&inv_count="+$("#inv_count").val()+"&inv_priceSum="+$("#inv_priceSum").val()
				+"&inv_payer="+$("#inv_payer").val()+"&inv_state="+$("#inv_state").val()+"&inv_on="+$("#inv_on").val()
				+"&inv_gb="+$("#inv_gb").val()
		var countSwal = "";
		if($("#inv_payer").val()=="公司"){
			var a = $("#payerDl").find("input[name='ir_isCalAchi']:checked").val();
			if(a==0){
				countSwal = "扣除业绩，请确认，提交后将扣除你本月业绩且不能修改";
			}else{
				countSwal = "不扣业绩，请确认，提交后不能修改";
			}
			count = count + "&ir_isCalAchi="+a;
		}
		swal({   
			title: "慎重操作",   
			text: countSwal, 
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "确定",  
			closeOnConfirm: false 
			}, 
			function(){
				/*ajax({
					type: "POST",
				    url: "/itemManage/selectHouseTypeParentID3",
				    data : "ht_parentId="+obj,
				    contentType: "application/x-www-form-urlencoded; charset=utf-8",
				    dataType: "json",
				    success: function(result) {
				    	
				    }
					
				})*/
				swal({
					title:"物品添加成功", 
					text : "", 
					type : "success"
				}); 
			});
			
	});
		
})
/* =======================================页面分页============================================== */
// 判断页数
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

