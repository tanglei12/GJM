var selectServe = null;
$(function(){
	data();
});

//筛选获取数据
function data(){
	selectServe = $.Deferred();
	$(".pagin").css("display","block");
	var $val =$("#sizeCount input:text").val();
	$.cookie("this_count", (typeof($val) == "undefined" ? 0 : $val));
	$.ajax({
	    type: "POST",
	    url: "/achievement/selectUcAchivmentMoney",
	    data : "ucc_id="+ getUrlParam("ucc_id") +"&startDate="+ getUrlParam("startDate") +"&endDate="+ getUrlParam("endDate") +"",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	$("#tableContent #tableData tbody").empty();
			$("#tableContent").removeClass("table-bg");
    		$("#tableTitle,.pagin").hide();
	    	if(result.code == 200){
	    		if(result.achievementSumAchievements.length <= 0){
	    			$("#tableTitle,.pagin").hide();
	    			$("#tableContent").addClass("table-bg");
	    			return;
	    		}
    			$.each(result.achievementSumAchievements, function(index, item) {
					var state ="";
					
					if(item.sa_auditType == 0){
						state="<font style='color:#E74C3C'>未审核</font>";
					}else{
						state="<font style='color:#1ABC9C'>已审核</font>";
					}
					
					var lossDay = 0;
					if(item.sa_lossDay < 0){
						lossDay = "<font style='color:#E74C3C'>"+item.sa_lossDay+"</font>";
					}
					var lossMoney = 0;
					if(item.sa_lossDay < 0){
						lossMoney = "<font style='color:#E74C3C'>"+item.sa_lossMoney+"</font>";
					}
					
					var oldMoney = item.sa_oldMoney;
					var newMoney = item.sa_newMoney;
					if(oldMoney < 0){
						oldMoney = "<font style='color:#E74C3C'>"+oldMoney+"</font>";
					}
					if(newMoney < 0){
						newMoney = "<font style='color:#E74C3C'>"+newMoney+"</font>";
					}
					
					$("#tableData tbody").append(
						"<tr class='tr'  id='data_contents'>" +
							"<td><input name='chickes' type='checkbox' value='"+item.sa_id+"'/></td>" +
							"<td>"+ (index+1)+"</td>" +
							"<td><a href=\"javascript:;\">"+ item.propertyInfo_name+" "+ item.hi_address +"</a></td>" +//manage
							"<td>"+ item.sa_type +"</td>" +
							"<td>"+ oldMoney +"</td>" +
							"<td>"+ newMoney +"</td>" +
							"<td>"+ state +"</td>" +
							"<td>"+ lossDay +"</td>" +
							"<td>"+ lossMoney + "</td>" +
							"<td>"+ item.sa_startEndTime + "</td>" +
						"</tr>");
	    		});
	    		//$("#sizeNum").text(result.data.totalPage);
	        	//$("#nums").text(result.data.totalRecords);
	    	}else{
	    		$(".tablelist tbody, #sizeNum, #Nums").empty();
	    	}
	    	//$("#data").data("pageCount", result.data.pageSize);
	    	selectServe.resolve();
	    	//page();
	    },
	    beforeSend:upLoadAnimation()
	    });
	$.when(selectServe).done(function () {
		
		hide_table();
	});
}

function achievementUpdate(){
	$("#tableData tbody tr").each(function(index){
		if($(this).find("input").is(':checked')){
			functionIfram('/achievementHouseMoney?sa_id='+$(this).find("input").val(),'修改业绩','房屋业绩');
//			window.location.href="/achievementHouseMoney?sa_id="+$(this).find("input").val();
		}
	});
}

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

/**
 * 受理
 */
function accept() {
	var len = $("input[name='chickes']:checked").length;
	if (len == 0) {
		swal('请选择一个！');
	} else if (len > 1) {
		swal('只能选择一个！');
	} else {
		var id =$("input[name='chickes']:checked").val();
		$(".tablelist tr").each(function(){
			if($(this).find("input[name='chickes']").val() == $("input[name='chickes']:checked").val()){
				$(this).find("td").each(function(i){
					if(i == 3){
						if($(this).find("span").text() != "已受理"){
							functionIfram('/service/jumpAcceptService?id=' + id,'受理服务','服务处理');
						}else{
							swal('已经受理');
						}
					}
				});
			}
		});
		
	}
}

/**
 * 审核
 */
function examine(){
	var len = $("input[name='chickes']:checked").length;
	if (len == 0) {
		swal('请选择一个！');
	} else if (len > 1) {
		swal('只能选择一个！');
	} else {
		var id =$("input[name='chickes']:checked").val();
		$(".tablelist tr").each(function(){
			if($(this).find("input[name='chickes']").val() == $("input[name='chickes']:checked").val()){
				$(this).find("td").each(function(i){
					if(i == 4){
						if($(this).find("span").text() == "审核中" ){
							functionIfram('/service/ServiceAccept?id=' + id,'服务审核','服务处理');
						}else{
							swal('不需要审核');
						}
					}
				});
			}
		});
		
	}
}

/**
 * 客户回访
 */
function visit() {
	var len = $("input[name='chickes']:checked").length;
	if (len == 0) {
		swal('请选择一个！');
	} else if (len > 1) {
		swal('只能选择一个！');
	} else {
		var id =$("input[name='chickes']:checked").val();
		functionIfram('/service/visitService?id=' + id,'服务评价','客户回访');
	}
}

