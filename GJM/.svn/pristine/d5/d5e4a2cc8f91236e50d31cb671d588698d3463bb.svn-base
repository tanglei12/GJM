
var information = null;
$(function(){
	houseBrand();
});

//筛选获取数据
function data(){
	information = $.Deferred();
	$(".pagin").css("display","block");
	var id = "null";
	var result = $.cookie('the_cookie');
	
	$.ajax({
	    type: "POST",
	    url: "/house/houseSort",
	    data: "page="+$("#Num").text()+"&cookie="+$.cookie('the_cookie')+"&houseName="+$("#houseName").val()+"&houseBrand="+$("#houseBrand").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    //async:false,
	    success: function(result) {
	    	if(result != "1"){
	    		$("#tableContent #tableData tbody").html("");
	    		$.each(result.houseHouseInformations, function(idx, house) {
    				updataStart(house);
    				var num = idx+1; 
    				var s = "<span><a href='javascript:shiftUp("+house.hi_id+","+num+");'><i class='table-icon table-icon-up'></i></a></span><span style='margin-left:10px;'><a href='javascript:shiftDown("+house.hi_id+","+num+");'><i class='table-icon table-icon-down'></i></a></span>";
    				if((num) == 1){
    					var s = "<span><a href='javascript:shiftDown("+house.hi_id+","+num+");'><i class='table-icon table-icon-down'></i></a></span>";
    				}
    				if((num) == result.number){
    					var s = "<span><a href='javascript:shiftUp("+house.hi_id+","+num+");'><i class='table-icon table-icon-up'></i></a></span>";
    				}
    				$("#tableData tbody").append("<tr class='tr' style='background:#fff;border-bottom:1px solid #efefef;' id='data_contents'><td>"+house.hi_number+"</td><td class='css2'><a href='javascript:ck_eds("+house.hi_id+");'>"+ house.propertyInfo_Name+house.hi_address +"</a></td><td>"+house.he_state+"</td><td>"+house.hi_peopleName+"</td><td>"+house.he_phone+"</td><td>"+house.em_name+"</td><td>"+s+"</td></tr>");
    			});
	    		if(result.pageModel.list.length > 0){
	    			$("#tableData tbody").append("<tr class='billList'><td colspan='7' class='billList'><div class='billList'><div class='billList_title'><span>未排序房源</span></div></div></td></tr>")
	    			$.each(result.pageModel.list, function(idx, house) {
    					updataStart(house);
    					$("#tableData tbody").append("<tr class='tr'  id='data_contents'><td></td><td class='css2'><a href='javascript:ck_eds("+house.hi_id+");'>"+ house.propertyInfo_Name+house.hi_address +"</a></td><td>"+house.he_state+"</td><td>"+house.hi_peopleName+"</td><td>"+house.he_phone+"</td><td>"+house.em_name+"</td><td><a href='javascript:reorder("+house.hi_id+");'>加入排序</a></td></tr>");
    	    		});
	    		}else{
	    			
	    		}
	    				
	    		$("#sizeNum").text(result.pageModel.totalPage);
	        	$("#nums").text(result.pageModel.totalRecords);
	        	
	    	}else{
	    		$(".tablelist tbody").html("");
	    		$("#sizeNum").text("");
	    		$("#Nums").html("");
	    	}
	    	information.resolve();
	    }
	    });
	
	$.when(information).done(function () {
		page();
		
		hide_table();
	});
}

/*=======================================页面分页==============================================*/
//判断页数
function page(){
	//开始的页数样式
	var result = $.cookie('the_cookie');
	if(result == '' || result == "undefined" || result == null){
		result = 16;
	}
	if($("#sizeNum").text()<=5){
		$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
		for(var i=1; i<=$("#sizeNum").text(); i++){
			$(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a href='javascript:li("+ i +");'>"+ i +"</a></li>");
		}
		$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
	}else{
		if($("#Num").text()<=5){
			$(".paginList").html("<li class='paginItem'><a href='javascript:up();'><span class='pagepre' id='up'></span></a></li>");
			for(var i=1; i<=5; i++){
				$(".paginList").append("<li id='paginList_"+ i +"' class='paginItem'><a href='javascript:li("+ i +");'>"+ i +"</a></li>");
			}
			$(".paginList").append("<li class='paginItem'><a href='javascript:down();'><span class='pagenxt' id='down'></span></a></li>");
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


//改变页面显示的房屋状态
function updataStart(house){
	if(house.he_state == 'free'){
		house.he_state="<span class='free'>未租</span>"
	}
	if(house.he_state == 'rental'){
		house.he_state="<span class='rental'>已租</span>"
	}
	if(house.he_state == 'expire'){
		house.he_state="<span class='expire'>托管到期</span>"
	}
	if(house.he_state == 'clean'){
		house.he_state="<span class='clean'>需要打扫</span>"
	}
	if(house.he_state == 'edit'){
		house.he_state="<span class='edit'>未发布</span>"
	}
}

function houseBrand(){
	$.ajax({
	    type: "POST",
	    url: "/houseHouseBrand/selectBrand",
	    data: "ps_id="+this.id,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	$.each(result.houseHouseBrand, function(idx, brand) {
	    		$("#houseBrand").append("<option value='"+brand.hb_id+"'>"+brand.hb_name+"</option>");
	    	});
	    	data();
	    }
	});
}

function selectByCondition(){
	$("#Num").text("1");
	data();
}

function reorder(i){
	$.ajax({
	    type: "POST",
	    url: "/house/updateHouseSort",
	    data: "hi_id="+i+"&brand="+$("#houseBrand").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	data();
	    }
	});
}


function shiftUp(i,s){
	
	$.ajax({
	    type: "POST",
	    url: "/house/updateHouseSortDown",
	    data: "hi_id="+i+"&brand="+$("#houseBrand").val()+"&sort="+s,
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	data();
	    }
	});
}


function shiftDown(i,s){
	$.ajax({
	    type: "POST",
	    url: "/house/updateHouseSortDown",
	    data: "hi_id="+i+"&brand="+$("#houseBrand").val()+"&sort="+s+"&type=down",
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    async:false,
	    success: function(result) {
	    	data();
	    }
	});
}