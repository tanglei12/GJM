package com.gjp.websocket;

import com.gjp.model.UserCenterEmployee;
import com.gjp.service.UserCenterEmployeeService;
import com.gjp.util.AppUtil;
import com.google.gson.Gson;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ServiceBillSocket extends TextWebSocketHandler {
	private Map<String, WebSocketSession> clients = new ConcurrentHashMap<String, WebSocketSession>();

	private Map<Object, Object> user = new HashMap<Object, Object>();

	// 用户service
	@Resource
	private UserCenterEmployeeService userCenterEmployeeService;

	// websocket 方法执行
	@SuppressWarnings("unchecked")
	public void handleTextMessage(WebSocketSession session, TextMessage message) {
		if (!clients.containsKey(session.getId())) {
			clients.put(session.getId(), session);
		}
		String data = message.getPayload();
		Gson g = new Gson();
		Map<String, Object> datas = g.fromJson(data, Map.class);
		// 发送客服专员
		if (datas.get("receive") != null && datas.get("receive").toString().equals("客服专员")) {
			String receviceStr = datas.get("receive").toString();
			UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
			userCenterEmployee.setUcp_name(receviceStr);
			UserCenterEmployee userCenterEmployee2 = userCenterEmployeeService.selectCompanyID(userCenterEmployee).get(0);
			datas.put("receive", userCenterEmployee2.getEm_id().toString());
		}
		user.put(datas.get("em_id").toString(), session.getId());
		if (datas.get("device") != null) {
			user.put(datas.get("em_id").toString() + "device", datas.get("device").toString());
		}
		datas.put("pcount", clients.keySet().size() + "");

		String type = datas.get("type").toString();
		TextMessage tm = new TextMessage(g.toJson(datas));
		if (type.equals("all")) {
			sendToAll(tm);
		} else {
			sendTopersion(tm);
		}
	}

	// 发送给所有用户
	private void sendToAll(TextMessage message) {
		try {
			for (WebSocketSession session : clients.values()) {
				if (session.isOpen()) {
					session.sendMessage(message);
				} else {
					clients.remove(session.getId());
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 单独发送给一个用户
	@SuppressWarnings("unchecked")
	private void sendTopersion(TextMessage tm) {
		try {
			String data = tm.getPayload();
			Gson g = new Gson();
			Map<String, Object> datas = g.fromJson(data, Map.class);
			for (WebSocketSession session : clients.values()) {
				if (session.getId().equals(user.get(datas.get("em_id").toString()))
						|| (datas.get("receive") != null && session.getId().equals(user.get(datas.get("receive").toString())))) {
					if (session.isOpen()) {
						if(datas.get("send") != null && datas.get("send").toString().equals("phone")){
							if(datas.get("receive") != null){
								AppUtil.javaSwift(user.get(datas.get("receive").toString()+"device").toString(), datas.get("data").toString());
							}else{
								session.sendMessage(tm);
							}
						}else{
							session.sendMessage(tm);
						}
					} else {
						clients.remove(session.getId());
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
