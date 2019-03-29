var selectHouseIntention = null;

$(function(){
	data();
	/**
	 * 新增采购
	 */
	$('.cd-popup-trigger3').on('click', function(event){
		var code = "PUR";
		var date = new Date();
		code = code + date.getTime();//得到当前时间戳
		code = code + Math.round(10000*Math.random());//随机4位整数
		window.parent.href_mo('/purchaseOrder/addPurchaseOrder?pur_code='+code+"&cno_code=''","新增采购","物品管理");
	});
})

function data(){
	selectHouseIntention = $.Deferred();
//	var sizeCount = 10;
//	if(returnNumber($.cookie('userSize')) <= 0){
//		sizeCount = $.cookie('userSize');
//	}else{
//		$.cookie("userSize", sizeCount, { expires: 7 });
//	}
//	if($("#sizeCount input").val() != null){
//		sizeCount = $("#sizeCount input").val();
//		 $.cookie("userSize", sizeCount, { expires: 7 });
//	}
	$.ajax({
		type: "POST",
		url: "/purchaseOrder/selectPurchaseOrderList",
		data: "pageSize=10"+"&pageNo="+$("#Num").text(),
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: "json",
		success: function(result) {
			var html = "";
			$("#tableContent #tableData tbody").empty();
			$.each(result.ordList,function(idx,ord){
				var tts = format(ord.pur_addTime, 'yyyy-MM-dd');
				var type = "";
				if(ord.pur_type == -1){
					type = "未审核";
				}else if(ord.pur_type == 0){
					type = "审核中";
				}else if(ord.pur_type == 1){
					type = "<span style='color: green;'>审核通过</span>";
				}else if(ord.pur_type == 2){
					type ="审核未通过";
				}
				var str = "<tr class='tr' id='data_contents'><td><input name='chickes' type='checkbox' id='"+ord.pur_id+"'/></td><td>"
				+(idx+1)+"</td><td class='css2'><a href='javascript:;' onclick='hrefClicks(this)' data-type='/purchaseOrder/addPurchaseOrder?pur_code="+ ord.pur_code +"&cno_code='>";
				html = html+str + ord.pur_code+"</td><td>"+type+"</td>"
					+"<td>"+tts+"</td><td>"+ord.user_name+"</td>"
					+"<td>"+ord.pur_sumMoney+"</td><td>"+((ord.pur_specification == null || ord.pur_specification == '') ? '' : ord.pur_specification )+"</td></tr>";
//					+"<td>"+ord.ord_spec+"</td><td>"+ordon+"</td>"
//					+"<td>"+ord.ord_payer+"</td><td>"+ord.ord_remark+"</td></tr>";
			})
			$(".tablelist tbody").append(html);
			$("#sizeNum").text(result.pageModel.totalPage);
        	$("#nums").text(result.pageModel.totalRecords);
        	$("#data").data("pageCount", $.cookie('userSize'));
        	selectHouseIntention.resolve();
    	}
	});
	
	$.when(selectHouseIntention).done(function () {
		page();
		
		hide_table();
	});
	
}


function hrefClicks(ids){
	window.parent.href_mo($(ids).attr("data-type"),"修改采购","物品管理");
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
//		$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount")  +"' placeholder='请输入条数' /></li>");
//		$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
	}else{
		if($("#Num").text()<=5){
			$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
			for(var i=1; i<=5; i++){
				$(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a href='javascript:li("+ i +");'>"+ i +"</a></li>");
			}
			$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
//			$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $("#data").data("pageCount") +"' placeholder='请输入条数' /></li>");
//			$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
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


