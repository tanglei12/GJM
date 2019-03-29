$(function(){
	$(".content").height($(window).height());
	$(".content-selected").height($(window).height()-62);
	
	// 关闭
	$(".content-bg").click(function(){
		$(this).parent().hide();
	});
	
	// 打开清单
	$(".shopCar").click(function(){
		$(".content-selected").show();
	});
	bingCar();
	data();
});

/**读取服务类型*/
function data(){
	$.ajax({
  	    type: "POST",
  	    url: "/service/changeTypes",
  	    data : {},
  	    dataType: "json",
  	    success: function(result) {
  	    	$(".content-left").html();
  	    	var html = "";
  	    	$.each(result.serviceList, function(index, data) {
  	    		 if(index == 0){
  	    			html += '<div class="content-left_button click" data-id="'+ data.sm_id +'" onclick="onclickChange(this)">';
  	  	    		html += data.sm_name;
  	  	    		html += '</div>';
  	  	    		chirldrenType("" ,data.sm_id);
  	    		 }else{
  	    			html += '<div class="content-left_button" data-id="'+ data.sm_id +'" onclick="onclickChange(this)">';
  	  	    		html += data.sm_name;
  	  	    		html += '</div>';
  	    		 }
             });
  	    	$(".content-left").html(html);
  	    }
	});
}

/**读取服务子类型*/
function chirldrenType(pId, smid){
	$.ajax({
  	    type: "POST",
  	    url: "/service/changeType",
  	    data : {
  	    	pId : pId,
  	    	typeId : smid
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	$(".content-center").html("");
  	    	var html = "";
  	    	if(result.code == 0){
  	    		return;
  	    	}
  	    	$.each(result.data, function(index, data) {
  	    		var message = projectType(data.st_id);
  	    		if(message != "error"){
    				html += '<div class="conetent-titles" data-id="'+ data.st_id +'" onclick="selectProject(this)">'+ data.st_name +'<i class="fa-caret-up"></i></div>';
    				html += '	<div class="content-title" style="display: none;">';
    				html += message;
    				html += '	</div>';
  	    		}else{
  	    			var bools = false;
  	    			$(".content-select-center .content-select-center-ul").each(function(i){
  	    				if($(this).attr("data-id") == data.st_id){
  	    					bools = true;
  	    					return false;
  	    				}
  	    			});
  	    			if(bools){
  	    				html += '<div class="conetent-titles" data-id="'+ data.st_id +'" onclick="clickProject(this)">'+ data.st_name +'<i class="fa-check-square click"></i></div>';
  	    			}else{
  	    				html += '<div class="conetent-titles" data-id="'+ data.st_id +'" onclick="clickProject(this)">'+ data.st_name +'<i class="fa-check-square"></i></div>';
  	    			}
  	    		}
  	    	});
  	    	$(".content-center").html(html);
  	    }
	});
}

/**查询服务项目*/
function projectType(pId){
	var html = "";
	$.ajax({
  	    type: "POST",
  	    url: "/service/changeType",
  	    data : {
  	    	pId : pId
  	    },
  	    dataType: "json",
  	    async: false,
  	    success: function(result) {
  	    	if(result.data.length == 0){
  	    		return;
  	    	}
  	    	html += '<ul>';
  	    	$.each(result.data, function(index, data) {
    			html += '<li data-id="'+ data.st_id +'" onclick="clickProject(this)">'+ data.st_name +'<i class="fa-check-square"></i></li>';
  	    	});
  	    	html += '</ul>';
  	    }
	});
	if(html == ""){
		html = "error";
	}
	return html;
}

// 点击
function onclickChange(ids){
	var stid = $(ids).attr("data-id");
	$(".content-left .content-left_button").attr("class","content-left_button");
	$(ids).attr("class","content-left_button click");
	chirldrenType("",stid);
}

/**放下和收起项目*/
function selectProject(ids){
	if($(ids).next().is(":hidden")){
		$(ids).next().slideDown(200);
		$(ids).find("i").attr("class","fa-caret-down");
	}else{
		$(ids).next().slideUp(200);
		$(ids).find("i").attr("class","fa-caret-up");
	}
}

/**点击选择项目*/
function clickProject(ids){
	var smId = $(".content-left .content-left_button.click").attr("data-id");
	var ptitle = $(".content-left .content-left_button.click").text();
	var text = "";
	if(ptitle != ""){
		text = "["+ptitle+"]";
	}
	var id = $(ids).attr("data-id");
	var titles = "";
	var value = "";
	if($(ids).attr("class") == "conetent-titles"){
		value = $(ids).text();
	}else{
		value = $(ids).text();
		titles = $(ids).parent().parent().prev().text();
	}
	var str = "";
	if(titles == ""){
		str = value;
	}else{
		str += titles+"-"+value;
	}
	var bools = false;
	var _this;
	$(".content-select-center .content-select-center-ul").each(function(i){
		if($(this).attr("data-id") == id){
			bools = true;
			_this = $(this);
			return false;
		}
	});
	// 判断购物车是否存在该服务
	if(!bools){
		var money = 0.00;
		/*if(titles == ""){报事现在不需要填费用
			money = cleanCleaning(value).toFixed(2);
		}else{
			money = cleanCleaning(titles).toFixed(2);
		}*/
		var html = '<div class="content-select-center-ul" data-sid="'+ smId +'" data-id="'+ id +'"><label class="text" data-titles="'+ ptitle +'" data-title="'+ str +'">'+ text +''+ str +'</label><label class="fa-minus-circle" onclick="removeCar(this)"></label><label style="display: none" class="money" class="money">￥'+ money +'</label></div>';
		if($(".content-select-center-ul[data-sid="+ smId +"]").length > 0){
			$(".content-select-center-ul[data-sid="+ smId +"]").last().after(html);
		}else{
			$(".content-select-center").append(html);
		}
		$(ids).find("i").attr("class","fa-check-square click");
	}else{
		$(ids).find("i").attr("class","fa-check-square");
		$(_this).remove();
	}
	serviceMoney();
	var sum = 0;
	var texts = "";
	$(".content-select-center .content-select-center-ul").each(function(){
		if(texts == "" || $(this).find(".text").text().split("-")[0] != texts){
			texts = $(this).find(".text").text().split("-")[0];
			sum += 1;
		}
	});
	$(".shopCar label").text(sum);
}

/** 计算清洁费用*/
function cleanCleaning(value){
	var houseS = getQueryString("houseS");
	var clearMoney = 0;
	if (value == "入住清洁" || value == "日常保洁") {
    	if (houseS == "1") {
            clearMoney = 60;
        } else if (houseS == "2") {
            clearMoney = 80;
        } else if (houseS == "3") {
            clearMoney = 100;
        }else if (houseS == "4") {
            clearMoney = 120;
        } else {
            clearMoney = "";
        }
    /*}else if (value == "按次保洁") {
        if (houseS == "1") {
            clearMoney = 80.00;
        } else if (houseS == "2") {
            clearMoney = 100.00;
        } else if (houseS == "3") {
            clearMoney = 130.00;
        } else if (houseS == "4") {
            clearMoney = 170.00;
        }else {
            clearMoney = "";
        }*/
    } else if (value == "包月保洁") {
        if (houseS == "1") {
            clearMoney = 240.00;
        } else if (houseS == "2") {
            clearMoney = 320.00;
        } else if (houseS == "3") {
            clearMoney = 400.00;
        } else {
            clearMoney = 480.00;
        }
    } else {
        clearMoney = 0.00;
    }
   return clearMoney;
}

/**删除购物车服务*/
function removeCar(ids){
	$(ids).parent().remove();
	$(".shopCar label").text($(".content-select-center .content-select-center-ul").length);
	var dataId = $(ids).parent().attr("data-id");
	var bools = false;
	var _this;
	$(".content-center .conetent-titles").each(function(i){
		if($(this).attr("data-id") == dataId){
			bools = true;
			_this = $(this);
			return false;
		}
	});
	$(".content-center .content-title ul li").each(function(i){
		if($(this).attr("data-id") == dataId){
			bools = true;
			_this = $(this);
			return false;
		}
	});
	if(bools){
		$(_this).find("i").attr("class","fa-check-square");
	}
	serviceMoney();
}

/**计算服务价格合计*/
function serviceMoney(){
	var money = 0.00;
	$(".content-select-center .content-select-center-ul").each(function(i){
		money += parseFloat($(this).find(".money").text().replace("￥",""));
	});
	$(".content-botttom .money span").text("￥"+money.toFixed(2));
}

/**提交购物车数据*/
function submit(){
	var json = "[";
	$(".content-select-center .content-select-center-ul").each(function(i){
		json += "{"
			json +="\"sid\":\""+ $(this).attr("data-sid") +"\",";
			json +="\"id\":\""+ $(this).attr("data-id") +"\",";
			json +="\"titles\":\""+ $(this).find(".text").attr("data-titles") +"\",";
			json +="\"title\":\""+ $(this).find(".text").attr("data-title") +"\",";
			json +="\"money\":\""+ $(this).find(".money").text().replace("￥","") +"\"";
		json += "},"
	});
	json = json.substring(0,json.length-1);
	json += "]";
	OCAddService.submitProject(json);
}

/** 根据传值修改购物车 */
function bingCar(){
	if(getQueryString("content") == null || getQueryString("content") == ""){
		return;
	}
	var content = eval(getQueryString("content"));
	$(content).each(function(index,item){
		var html = '<div class="content-select-center-ul" data-sid="'+ item.sid +'" data-id="'+ item.id +'"><label class="text" data-titles="'+ item.titles +'" data-title="'+ item.title +'">['+ item.titles +']'+ item.title +'</label><label class="fa-minus-circle" onclick="removeCar(this)"></label><label style="display: none" class="money" class="money">￥'+ item.money +'</label></div>';
		if($(".content-select-center-ul[data-sid="+ item.sid +"]").length > 0){
			$(".content-select-center-ul[data-sid="+ item.sid +"]").last().after(html);
		}else{
			$(".content-select-center").append(html);
		}
	});
	var sum = 0;
	$(".content-select-center .content-select-center-ul").each(function(){
		if($(this).find(".title-content").text().split("-").length == 1){
			sum += 1;
		}
	});
	$(".shopCar label").text(sum);
	serviceMoney();
}

/** 获取url值*/
function getQueryString(key){
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
}