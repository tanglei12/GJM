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