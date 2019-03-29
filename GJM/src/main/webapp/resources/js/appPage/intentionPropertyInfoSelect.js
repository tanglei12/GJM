$(function(){
	data();
});

function search(){
	data($(".search-input").val());
}
// 读取房屋列表数据
function data(name){
	if(name == null){
		name = "";
	}
	$.ajax({
  	    type: "POST",
  	    url: "/propertyInfo/propertyInfoAPP",
  	    data : {
  	    	name: name,
  	    },
  	    dataType: "json",
  	    success: function(result) {
  	    	$(".center-data ul").html("");
  	    	var html = "";
  	    	$(result.propertyInfoNames).each(function(index, item){
                html += "<li><button onclick='clickPropertyInfo(\""+item.upn_name+"\","+ item.propertyInfo_Id +")'>"+ item.upn_name +"</button></li>";
  	    	});
  	    	$(".center-data ul").html(html);
  	    }
	});
}

function clickPropertyInfo(upn_name,propertyInfo_Id){
    var arry = {};
    arry.upn_name = upn_name;
    arry.propertyInfo_Id = propertyInfo_Id;
    arry.type = "propertyInfo";
    var jsonStr = JSON.stringify(arry);
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.goBackWhere.postMessage([jsonStr]);
    } else if (/(Android)/i.test(navigator.userAgent)) {
        webview.goBackWhere(jsonStr);
    }
}
