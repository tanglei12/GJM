var selectPropertyInfo = null;
$(function(){
	
	data();
});

//筛选获取数据
function data(){
	selectPropertyInfo = $.Deferred();
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
	var id = "null";
	$.ajax({
	    type: "POST",
	    url: "/propertyInfo/selectPropertyInfo",
	    data: "page="+$("#Num").text()+"&cookie="+$.cookie('userSize')+"&propertyInfo_Name="+$("#propertyInfo_Name").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	$("#tableContent #tableData tbody").html("");
	    	if(result != "1"){
	    				$.each(result.pageModel.list, function(idx, propertyInfo) {
	    					var tts = format(propertyInfo.propertyInfo_OpenTime, 'yyyy-MM-dd');
	    					if(propertyInfo.propertyInfo_CarPark == null){
	    						propertyInfo.propertyInfo_CarPark = "";
	    					}
	    					if(propertyInfo.propertyInfo_Cost == null){
	    						propertyInfo.propertyInfo_Cost = "";
	    					}
	    					$("#tableData tbody").append("<tr class='tr'  id='data_contents'><td><input name='chickes' type='checkbox' id='"+propertyInfo.propertyInfo_Id+"'/></td><td>"+(idx+1)+"</td><td class='css2'><a href='javascript:;' onclick='hrefClick(this)' data-type='/propertyInfo/updataPropertyInfo?id="+ propertyInfo.propertyInfo_Id +"'>"+propertyInfo.propertyInfo_Name+"</a></td><td>"+propertyInfo.propertyInfo_Wuguan+"</td><td>"+propertyInfo.propertyInfo_Tel+"</td><td style='color:#FF7F00;'>"+propertyInfo.propertyInfo_Cost+"</td><td>"+propertyInfo.propertyInfo_Life+"</td><td>"+propertyInfo.propertyInfo_CarPark+"</td><td>"+propertyInfo.propertyInfo_address+"</td><td>"+propertyInfo.propertyInfo_remark+"</td></tr>");
	    	    		});
	    		$("#sizeNum").text(result.pageModel.totalPage);
	        	$("#nums").text(result.pageModel.totalRecords);
	    	}else{
	    		$(".tablelist tbody").html("");
	    		$("#sizeNum").text("");
	    		$("#Nums").html("");
	    	}
	    	selectPropertyInfo.resolve();
	    },beforeSend:upLoadAnimation()

	    });
	$.when(selectPropertyInfo).done(function () {
		page();
		
		hide_table();
	});
}

/*=======================================页面分页==============================================*/
//判断页数
function page(){
	//开始的页数样式
	if($("#sizeNum").text()<=5){
		$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
		for(var i=1; i<=$("#sizeNum").text(); i++){
			$(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a href='javascript:li("+ i +");'>"+ i +"</a></li>");
		}
		$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
		$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $.cookie('userSize')  +"' placeholder='请输入条数' /></li>");
		$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
	}else{
		if($("#Num").text()<=5){
			$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
			for(var i=1; i<=5; i++){
				$(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a href='javascript:li("+ i +");'>"+ i +"</a></li>");
			}
			$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
			$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $.cookie('userSize')  +"' placeholder='请输入条数' /></li>");
			$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
		}
	}
	//end
	
	//样式变化
	$(".paginList li").each(function(idx) {
		$(this).attr("class", "paginItem");
	});
	$("#paginList_"+$("#Num").text()+"").attr("class", "paginItem current");
	//end
	
	//判断最后一页和第一页的样式
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
	//end
	
	//间隔变色
	$('.tablelist tbody tr:odd').addClass('odd');
}

/*点击LI分页读取数据*/
function li(id){
	
	$("#Num").text(id);
	$("#paginList_"+id+" a").attr("class", "paginItem");
	data();
}

function up(){
	// 获取当前页数
	var pageMum =parseInt($("#Num").text());
	//最大页数
	var pageSize =parseInt($("#sizeNum").text());
	if(pageMum>1){
		if((pageMum-1) % 5 ==0){
			$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
				for(var i=5; i>0; i--){
					$(".paginList").append("<li id='paginList_"+ (pageMum-i) +"' class='paginItem'><a href='javascript:li("+ (pageMum-i) +");'>"+ (pageMum-i) +"</a></li>");
				}
				$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
				$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $.cookie('userSize')  +"' placeholder='请输入条数' /></li>");
				$(".paginList").append("<li class='paginItem'><a href='javascript:data();'>设置</a></li>");
			}
		$("#Num").text(pageMum-1);
		data();
	}
}

function down(){
	// 获取当前页数
	var pageMum =parseInt($("#Num").text());
	//最大页数
	var pageSize =parseInt($("#sizeNum").text());
	if(pageMum < pageSize){
		if((pageMum + 5)<pageSize){
			if(pageMum % 5 == 0){
				
				$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
				for(var i=1; i<= 5; i++){
						$(".paginList").append("<li id='paginList_"+ (pageMum+i) +"' class='paginItem'><a href='javascript:li("+ (pageMum+i) +");'>"+ (pageMum+i) +"</a></li>");
					}
				$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
				$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $.cookie('userSize')  +"' placeholder='请输入条数' /></li>");
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
				$(".paginList").append("<li id='sizeCount'><input type='text' onkeyup='this.value=this.value.replace(/[^0-9]\D*$/,\"\")' value='"+ $.cookie('userSize')  +"' placeholder='请输入条数' /></li>");
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

//跳转修改房屋扩展信息界面
//多选按钮判断
function cks(){
  var cbl_s = document.getElementsByName("chickes");  
  var checkCount = 0;
  var id = 0;
  for (var i = 0; i < cbl_s.length; i++) {  
          if (cbl_s[i].checked) {  
              checkCount++;
              id = cbl_s[i].id;
          }  
  }  
  if (checkCount == 0) {  
		 $.jBox.info('请选择一个！', '管家婆管理系统');
  } else if (checkCount > 1) {  
 	 $.jBox.info('只能选择一个！', '管家婆管理系统');
  } else {  
	  window.parent.href_mo('/propertyInfo/updataPropertyInfo?id='+id,"修改物业","房屋物业");
	  //window.location.href = '/propertyInfo/updataPropertyInfo?id='+id;
} 
}

//多选按钮判断
function valuation(){
  var cbl_s = document.getElementsByName("chickes");  
  var checkCount = 0;
  var id = 0;
  for (var i = 0; i < cbl_s.length; i++) {  
          if (cbl_s[i].checked) {  
              checkCount++;
              id = cbl_s[i].id;
          }  
  }  
  if (checkCount == 0) {  
		 $.jBox.info('请选择一个！', '管家婆管理系统');
  } else if (checkCount > 1) {  
 	 $.jBox.info('只能选择一个！', '管家婆管理系统');
  } else {  
	  window.parent.href_mo('/propertyInfo/jumpValuationPropertyInfo?id='+id,"小区估价","房屋物业");
	  //window.location.href = '/propertyInfo/updataPropertyInfo?id='+id;
} 
}


function selectByCondition(){
	$("#Num").text("1");
	data();
}

//跳转修改界面
//多选按钮判断
function ck_eds(id){
	window.location.href = '/propertyInfo/updataPropertyInfo?id='+id;
}

function hrefClick(ids){
	window.parent.href_mo($(ids).attr("data-type"),"修改物业","房屋物业");
}