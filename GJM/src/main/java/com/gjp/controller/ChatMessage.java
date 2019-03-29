package com.gjp.controller;

import com.gjp.model.ChatMeaage;
import com.gjp.service.ChatMeaageService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 陈智颖
 * @version 创建时间：2016年1月10日 上午11:21:21
 */
@Controller
public class ChatMessage {

    //聊天Service
    @Resource
    private ChatMeaageService chatMeaageService;

    /**
     * 查询历史记录
     *
     * @param start          从哪条开始
     * @param sendaccount    发送者
     * @param receiveaccount 接受者
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/selectChatMeaageHistory")
    @ResponseBody
    public Map<String, Object> selectChatMeaageHistory(Integer start, String sendaccount, String receiveaccount) {
        Map<String, Object> map = new HashMap<>();

        ChatMeaage chatMeaage = new ChatMeaage();
        chatMeaage.setStart(start);
        if (receiveaccount.equals("管家婆群") || sendaccount.equals("管家婆群")) {
            chatMeaage.setCm_receiveAccount("管家婆群");
        } else {
            chatMeaage.setCm_receiveAccount(receiveaccount);
            chatMeaage.setCm_sendAccount(sendaccount);
        }
        List<ChatMeaage> chatMeaageHistory = chatMeaageService.selectChatMeaageHistory(chatMeaage);

        map.put("chatMeaageHistory", chatMeaageHistory);

        return map;
    }

    /**
     * 查询历史记录条数
     *
     * @param start          从哪条开始
     * @param sendaccount    发送者
     * @param receiveaccount 接受者
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/selectChatMeaageHistoryCount")
    @ResponseBody
    public String selectChatMeaageHistoryCount(Integer start, String sendaccount, String receiveaccount) {

        ChatMeaage chatMeaage = new ChatMeaage();
        if (receiveaccount.equals("管家婆群") || sendaccount.equals("管家婆群")) {
            chatMeaage.setCm_receiveAccount("管家婆群");
        } else {
            chatMeaage.setCm_receiveAccount(receiveaccount);
            chatMeaage.setCm_sendAccount(sendaccount);
        }
        ChatMeaage chatMeaageHistory = chatMeaageService.selectChatMeaageHistoryCount(chatMeaage);
        if (chatMeaageHistory.getSize() > start) {
            return "1";
        } else {
            return "0";
        }
    }
}
