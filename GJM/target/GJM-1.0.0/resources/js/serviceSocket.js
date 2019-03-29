/** *******邮件信息推送******** */
var usernames = $.cookie("em_id");
//var service_ws = new WebSocket('ws://dm.cqgjp.com:9090/serviceBillSocket');
var service_ws = new WebSocket('ws://m.cqgjp.com:7070/serviceBillSocket');
//var service_ws = new WebSocket('ws://192.168.0.35:8080/serviceBillSocket');

service_ws.onerror = function(event) {
};

service_ws.onopen = function(event) {
	if (usernames != '') {
		var msg = JSON.stringify({
			'em_id' : usernames,
			'type' : 'person'
		});
		service_ws.send(msg);
	}
};

service_ws.onclose = function(event) {
	var msg = JSON.stringify({
		'em_id' : usernames,
		'type' : '3'
	});
	ws.send(msg);
};

service_ws.onmessage = function(event) {
	var data = JSON.parse(event.data);
	if(usernames == data.receive){
		// href_mo(href,title,parentTile,umc_id,ids,name)
		var html = "<a href='javascript:;' onclick='messagesHref(this)' data-href='/service/showListInfo?md_id="+ data.md_id +"'>"+data.data+"</a>";
		$.msgBox(html);
	}
};
/**
 * 消息跳转
 */
function messagesHref(ids){
	var href = $(ids).attr("data-href");
	href_mo(href,"服务进度","服务订单");
}
/**
 * 提交推送消息
 * 
 * @param titleName
 */
function sendMessages(text, em_id) {
	if (isEmpty(text) || isEmpty(em_id)) {
		return false;
	}
	var msg = JSON.stringify({
		'em_id' : usernames,
		'type' : 'person',
		'data' : text,
		'receive' : em_id,
		'send' : 'phone'
	});
	service_ws.send(msg);
}
