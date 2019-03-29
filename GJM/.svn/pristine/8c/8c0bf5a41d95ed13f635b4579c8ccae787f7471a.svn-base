var selectServe = null;
$(function(){
	data();
});

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
	    url: "/itemManage/selectItemBillList",
	    data : "pageSize="+$.cookie('userSize')+"&pageNo="+$("#Num").text()+"&oldpageSize="+$.cookie('userSize'),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$("#tableContent #tableData tbody").empty();
			$("#tableContent").removeClass("table-bg");
    		$.each(result.billList, function(index, item) {
    			
				$("#tableData tbody").append(
					"<tr class='tr'  id='data_contents'>" +
						"<td><input name='chickes' type='checkbox' value='"+item.ib_id+"'/></td>" +
						"<td>"+ (index+1)+"</td>" +
						"<td>"+ item.inv_code+"</td>" +
//						"<td><a href=\"javascript:;\">"+ item.inv_code+"</a></td>" +
						"<td>"+ item.type_name +"</td>" +
						"<td>"+ item.name_name +"</td>" +
						"<td>"+ item.ib_repay +"</td>" +
						"<td>"+ item.ib_realPay +"</td>" +
						"<td>"+ item.bs_statementNum +"</td>" +
//						"<td>"+ ((item.ib_operator == null || item.ib_operator == "") ? "" : item.ib_operator) +"</td>" +
//						"<td>"+ ((item.ib_operatTime == null || item.ib_operatTime == "") ? "" : item.ib_operatTime) +"</td>" +
						"<td>"+ item.ib_remark + "</td>" +
						"<td>"+ format(item.ib_createTime,"yyyy-MM-dd") + "</td>" +
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

//function achievementUpdate(){
//	$("#tableData tbody tr").each(function(index){
//		if($(this).find("input").is(':checked')){
//			functionIfram('/achievementHouseMoney?sa_id='+$(this).find("input").val(),'修改业绩','房屋业绩');
//		}
//	});
//}



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

