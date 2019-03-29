package com.gjp.websocket;

import com.gjp.model.ChatMeaage;
import com.gjp.model.UserCenterEmployee;
import com.gjp.service.ChatMeaageService;
import com.gjp.util.XmlClass;
import com.google.gson.Gson;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class ChatSocket extends TextWebSocketHandler {
    // 聊天信息操作
    @Resource
    private ChatMeaageService chatMeaageService;

    private Map<String, WebSocketSession> clients = new ConcurrentHashMap<String, WebSocketSession>();

    private Map<Object, Object> user = new HashMap<Object, Object>();

    @SuppressWarnings("unchecked")
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws ParseException {
        if (!clients.containsKey(session.getId())) {
            clients.put(session.getId(), session);
        }
        String data = message.getPayload();

        Gson g = new Gson();
        Map<String, Object> datas = g.fromJson(data, Map.class);
        String type = datas.get("type").toString();
        user.put(datas.get("username").toString(), session.getId());

        // 项目绝对路径
        String path = this.getClass().getClassLoader().getResource("../../").getPath();

        if ("1".equals(type)) {
            // 开始执行
            datas.put("pcount", clients.keySet().size() + "");
//			ChatMeaage chatMeaage = new ChatMeaage();
//			chatMeaage.setOfflinePerson(datas.get("username").toString());
//			List<ChatMeaage> selectChatMeaage = chatMeaageService.selectChatMeaageStart(chatMeaage);
//			List<ChatMeaage> chatMeaages = new ArrayList<ChatMeaage>();
//			if (selectChatMeaage != null) {
//				for (ChatMeaage chatMeaage2 : selectChatMeaage) {
//					if (chatMeaage2.getOfflinePerson().indexOf(datas.get("username").toString()) > -1) {
//						chatMeaages.add(chatMeaage2);
//					}
//				}
//				datas.put("data", JSONArray.toJSON(chatMeaages));
//				datas.put("receive", datas.get("username").toString());
//			}
        } else if ("3".equals(type)) {
            clients.remove(session.getId());
            datas.put("pcount", clients.keySet().size() + "");
        } else if ("4".equals(type)) {
            // 接收成功返回值并去掉离线推送
            ChatMeaage chatMeaage = new ChatMeaage();
            List<ChatMeaage> selectChatMeaage = new ArrayList<ChatMeaage>();
            if (datas.get("receives").toString().equals("管家婆群")) {
                chatMeaage.setOfflinePerson(datas.get("username").toString());
                chatMeaage.setCm_receiveAccount(datas.get("receives").toString());
                selectChatMeaage = chatMeaageService.selectChatMeaageStart(chatMeaage);
            } else {
                chatMeaage.setOfflinePerson(datas.get("username").toString());
                chatMeaage.setCm_receiveAccount(datas.get("receives").toString());
                chatMeaage.setCm_sendAccount(datas.get("usernames").toString());
                selectChatMeaage = chatMeaageService.selectChatMeaage(chatMeaage);
            }
            for (ChatMeaage userMessageContent2: selectChatMeaage) {
                String[] accounts = userMessageContent2.getOfflinePerson().split("-");
                String accouunt = "";
                for (int i = 0; i < accounts.length; i++) {
                    if (!datas.get("username").toString().equals(accounts[i])) {
                        accouunt += accounts[i] + "-";
                    }
                }
                if (!accouunt.equals("")) {
                    accouunt = accouunt.substring(0, accouunt.length() - 1);
                }
                userMessageContent2.setOfflinePerson(accouunt);
                chatMeaageService.updatetChatMeaage(userMessageContent2);
            }
        } else {
            // 发送消息存储xml
            ChatMeaage chatMeaage = new ChatMeaage();
            chatMeaage.setCm_sendAccount(datas.get("username").toString());
            chatMeaage.setCm_receiveAccount(datas.get("receive").toString());
            chatMeaage.setCm_content(datas.get("data").toString());
            SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            chatMeaage.setCm_timer(sf.parse(datas.get("timer").toString()));
            chatMeaage.setDepartment(datas.get("department").toString());
            chatMeaage.setName(datas.get("name").toString());
            UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
            // 查询发送离线人
            if (datas.get("receive").toString().indexOf("群") > -1) {
                List<UserCenterEmployee> xmltoClassUser = XmlClass.xmltoClassUser(path, "user.xml", userCenterEmployee);
                String[] accounts = xmltoClassUser.get(0).getEm_account().split("-");
                String accouunt = "";
                for (int i = 0; i < accounts.length; i++) {
                    if (!datas.get("username").toString().equals(accounts[i])) {
                        accouunt += accounts[i] + "-";
                    }
                }
                if (!accouunt.equals("")) {
                    accouunt = accouunt.substring(0, accouunt.length() - 1);
                }
                chatMeaage.setOfflinePerson(accouunt);
            } else {
                chatMeaage.setOfflinePerson(datas.get("receive").toString());
            }
            // 消息插入
            chatMeaageService.insertChatMeaage(chatMeaage);
        }

        TextMessage tm = new TextMessage(g.toJson(datas));
        if (datas.get("receive") == null) {
            sendToAll(tm);
        } else if (datas.get("receive").toString().indexOf("群") > -1) {
            sendToAll(tm);
        } else {
            sendTopersion(tm);
        }
    }

    private void sendToAll(TextMessage tm) {
        try {
            for (WebSocketSession session: clients.values()) {
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

    @SuppressWarnings("unchecked")
    private void sendTopersion(TextMessage tm) {
        try {
            String data = tm.getPayload();
            Gson g = new Gson();
            Map<String, Object> datas = g.fromJson(data, Map.class);
            for (WebSocketSession session: clients.values()) {
                if (session.getId().equals(user.get(datas.get("username").toString())) || session.getId().equals(user.get(datas.get("receive").toString()))) {
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