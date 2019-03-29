var selectReserveBill = null;
$(function(){
	
	data();
});

//筛选获取数据
function data(){
	selectReserveBill = $.Deferred();
	var id = "null";
	$.ajax({
	    type: "POST",
	    url: "/selectEjzReserveBill",
	    data: "page="+$("#Num").text()+"&cookie="+$.cookie('the_cookie')+"&txt="+$("#orderInput").val(),
	    contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    dataType: "json",
	    success: function(result) {
	    	$("#tableContent #tableData tbody").html("");
	    	if(result != "1"){
				$.each(result.pageModel.list, function(idx, reserveBill) {
					var tts = format(reserveBill.rb_date, 'yyyy-MM-dd');
					if(reserveBill.rb_operationState == null || reserveBill.rb_operationState == ""){
						reserveBill.rb_operationState = "";
					}
					if(reserveBill.rb_Ejz == null || reserveBill.rb_Ejz == ""){
						reserveBill.rb_Ejz = "<td style='color:orange;'>待审核</td>";
					}
					if(reserveBill.rb_Ejz == 'success'){
						reserveBill.rb_Ejz = "<td style='color:green;'>成功</td>";
					}
					if(reserveBill.rb_Ejz == 'error'){
						reserveBill.rb_Ejz = "<td style='color:ren;'>失败</td>";
					}
					$("#tableData tbody").append("<tr class='tr'  id='data_contents'><td><input name='chickes' type='checkbox' id='"+reserveBill.rb_id+"'/></td><td>"+(idx+1)+"</td><td><a href='javascript:ejzSelectMon(\""+reserveBill.rb_number+"\");'>"+reserveBill.rb_number+"</a></td>"+reserveBill.rb_Ejz+"<td class='css2'><a href='javascript:;'>"+reserveBill.rb_name+"</a></td><td class='css2'>"+ reserveBill.rb_phone +"</a></td><td style='color:#FF7F17;'>"+reserveBill.rb_money+"元</td><td>"+reserveBill.rb_personNum+"</td><td>"+reserveBill.rb_cycle+"月</td><td>"+reserveBill.rb_type+"</td><td class='css2'>"+reserveBill.rb_remarks+"</td><td>"+reserveBill.rb_state+"</td><td>"+reserveBill.rb_operationState+"</td><td>"+reserveBill.rb_reserveDate+"天</td><td class='css2'>"+tts+"</td></tr>");
	    		});
	    		$("#sizeNum").text(result.pageModel.totalPage);
	        	$("#nums").text(result.pageModel.totalRecords);
	    	}else{
	    		$(".tablelist tbody").html("");
	    		$("#sizeNum").text("");
	    		$("#Nums").html("");
	    	}
	    	selectReserveBill.resolve();
	    },beforeSend:upLoadAnimation()

	    });
	
	$.when(selectReserveBill).done(function () {
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

//跳转修改房屋扩展信息界面
//多选按钮判断
function ck(){
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
	 window.location.href = '/houseExtended/updata?id='+id;
 } 
}

//跳转修改界面
//多选按钮判断
function ck_eds(id){
	 window.location.href = '/houseExtended/updata?id='+id;
}

//改变页面显示的房屋状态
function updataStart(houseExtended){
	if(houseExtended.he_state == 'free'){
		houseExtended.he_state="<span class='free'>未租</span>"
	}
	if(houseExtended.he_state == 'rental'){
		houseExtended.he_state="<span class='rental'>已租</span>"
	}
	if(houseExtended.he_state == 'expire'){
		houseExtended.he_state="<span class='expire'>托管到期</span>"
	}
	if(houseExtended.he_state == 'clean'){
		houseExtended.he_state="<span class='clean'>需要打扫</span>"
	}
	if(houseExtended.he_state == 'edit'){
		houseExtended.he_state="<span class='edit'>未发布</span>"
	}
}


function ejzSelectMon(rb_number){
	window.location.href = '/ejzSelectMon?rb_number='+rb_number;
}