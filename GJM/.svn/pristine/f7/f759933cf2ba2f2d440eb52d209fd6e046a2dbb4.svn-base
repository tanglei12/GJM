package com.gjp.websocket;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 单点登陆
 *
 * @author 陈智颖
 * @create 2018-01-29 下午4:11
 **/
public class LoginOneSocket extends TextWebSocketHandler {
    private Map<String, Map<WebSocketSession, String>> clients = new ConcurrentHashMap<>();

    // websocket 方法执行
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        String data = message.getPayload();
        JSONObject json = JSONObject.parseObject(data);
        Map<String, Object> datas = json.toJavaObject(Map.class);
        if (datas.get("phoneType").toString().equals("pc")) {
            datas.put("eml_pcIp", session.getRemoteAddress().getHostString());
        } else {
            datas.put("eml_pcIp", "");
        }
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        datas.put("dateStr", format.format(new Date()));

        if (!clients.containsKey(session.getId())) {
            Map<WebSocketSession, String> map = new ConcurrentHashMap<>();
            map.put(session, JSONObject.toJSONString(datas));
            clients.put(session.getId(), map);
        }

        TextMessage tm = new TextMessage(json.toJSONString());
        sendTopersion(tm);
    }

    // 单独发送给一个用户
    private void sendTopersion(TextMessage tm) {
        try {
            String data = tm.getPayload();
            JSONObject json = JSONObject.parseObject(data);
            Map<String, Object> datas = json.toJavaObject(Map.class);
            for (Map<WebSocketSession, String> sessions: clients.values()) {
                WebSocketSession session = null;
                String jsonStr = null;
                for (Map.Entry<WebSocketSession, String> session1: sessions.entrySet()) {
                    session = session1.getKey();
                    jsonStr = session1.getValue();
                }
                JSONObject jsonObject = JSONObject.parseObject(jsonStr);
                Map<String, Object> userMap = (Map<String, Object>) jsonObject.toJavaObject(Map.class);
                String types = "";
                if (userMap.get("phoneType").toString().equals("android") || userMap.get("phoneType").toString().equals("ios")) {
                    types = "phone";
                } else {
                    types = datas.get("phoneType").toString();
                }
                String myType = "";
                if (datas.get("phoneType").toString().equals("android") || datas.get("phoneType").toString().equals("ios")) {
                    myType = "phone";
                } else {
                    myType = datas.get("phoneType").toString();
                }
                if (userMap.get("em_id").toString().equals(datas.get("em_id").toString()) && types.contains(myType)) {
                    if (session.isOpen()) {
                        session.sendMessage(tm);
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
