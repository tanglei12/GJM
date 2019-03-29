package com.gjp.websocket;

import com.google.gson.Gson;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class TweetWebSocket extends TextWebSocketHandler {
	private Map<String, WebSocketSession> clients = new ConcurrentHashMap<String, WebSocketSession>();

	@SuppressWarnings("unchecked")
	public void handleTextMessage(WebSocketSession session, TextMessage message) {
		if (!clients.containsKey(session.getId())) {
			clients.put(session.getId(), session);
		}
		String data = message.getPayload();

		Gson g = new Gson();
		Map<String, Object> datas = g.fromJson(data, Map.class);
		String type = datas.get("type").toString();
		if ("1".equals(type)) {
			datas.put("pcount", clients.keySet().size() + "");
		} else if ("2".equals(type)) {
			String dataTxt = datas.get("data").toString();
			System.out.println(dataTxt);
		} else if ("3".equals(type)) {
			clients.remove(session.getId());
			datas.put("pcount", clients.keySet().size() + "");
		}
		System.out.println(datas);

		TextMessage tm = new TextMessage(g.toJson(datas));
		sendToAll(tm);
	}

	private void sendToAll(TextMessage tm) {
		try {
			for (WebSocketSession session : clients.values()) {
				if (session.isOpen()) {
					session.sendMessage(tm);
				} else {
					clients.remove(session.getId());
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
