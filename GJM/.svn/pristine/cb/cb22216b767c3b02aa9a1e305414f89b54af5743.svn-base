$(function(){
	$("#houseF").attr("onclick","OCHouseFollow.follow(\""+ getQueryString("houseCode") +"\")");
	$("#houseM").attr("onclick","OCHouseFollow.money(\""+ getQueryString("houseCode") +"\")");
});

function getQueryString(key){
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
  }