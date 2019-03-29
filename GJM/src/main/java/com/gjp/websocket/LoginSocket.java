package com.gjp.websocket;

import com.gjp.model.UserCenterEmployee;
import com.gjp.service.UserCenterEmployeeService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author 陈智颖
 * @create 2017-12-01 16:05
 **/
public class LoginSocket extends TextWebSocketHandler {
    private Map<String, WebSocketSession> clients = new ConcurrentHashMap<String, WebSocketSession>();

    // 用户service
    @Autowired
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
        datas.put("pcount", clients.keySet().size() + "");

        if(datas.get("em_phone") != null){
            UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
            userCenterEmployee.setEm_phone(datas.get("em_phone").toString());
            List<UserCenterEmployee> userCenterEmployees = userCenterEmployeeService.selectCompanyID(userCenterEmployee);
            if(!userCenterEmployees.isEmpty()){
                datas.put("em_password", userCenterEmployees.get(0).getEm_password());
            }
        }

        TextMessage tm = new TextMessage(g.toJson(datas));
        sendToAll(tm);
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
}
