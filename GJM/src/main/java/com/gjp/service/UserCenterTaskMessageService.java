package com.gjp.service;

import com.gjp.dao.UserCenterTaskMessageDAO;
import com.gjp.model.UserCenterEmployee;
import com.gjp.model.UserCenterTaskMessage;
import com.gjp.util.AppUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 陈智颖
 * @version 创建时间：2016年9月6日 下午12:02:23
 */
@Service
public class UserCenterTaskMessageService {

    @Resource
    private UserCenterTaskMessageDAO userCenterTaskMessageDAO;

    /**
     * 添加系统任务消息
     *
     * @param tm_text      任务内容
     * @param tm_type      任务紧急程度（紧急、不紧急）
     * @param tm_state     任务重要程度（重要、不重要）
     * @param tm_startTime 开始时间 2016-08-28 08:08
     * @param tm_endTime   结束日期 2016-08-28 08:08
     * @param personID     任务接收人（1,2,3）
     * @param tm_http      调用地址
     * @param request
     * @return { message:success(成功),tm_id:消息编码,mainUser:安排人或者是提交人 }
     * @throws ParseException
     * @作者 JiangQT
     * @日期 2016年10月27日
     */
    public Map<String, Object> addSystemTaskMessage(HttpServletRequest request, String tm_text, String tm_type, String tm_state, String tm_startTime, String tm_endTime,
                                                    String personID, String tm_http) throws ParseException {
        String tm_startWeek = AppUtil.getWeek(tm_startTime);
        String tm_endWeek = AppUtil.getWeek(tm_endTime);
        return insertTaskMessage(tm_text, tm_type, tm_state, tm_startTime, tm_startWeek, tm_endTime, tm_endWeek, request, personID, tm_http, 1, true, null);
    }

    /**
     * 插入任务消息
     *
     * @param tm_text      插入事件内容
     * @param tm_type      任务消息类型 0：个人 1：部门 2：公司
     * @param tm_state     事件紧急程度 0：紧急 1：重要 2：计划
     * @param tm_startTime 开始时间 2016-08-28
     * @param tm_startWeek 开始的日期是星期几
     * @param tm_endTime   结束时间 2016-08-28
     * @param tm_endWeek   结束的日期是星期几
     * @param personID     任务接收人（1,2,3）
     * @param tm_http      调用地址
     * @param tmType       （1：超级管理员、0：手动插入）
     * @param boolType     是否插入超级管理员
     * @param tm_pid       父级编码(不必须插入)
     * @param request
     * @return { message:success(成功),tm_id:消息编码,mainUser:安排人或者是提交人 }
     * @throws ParseException
     * @author 陈智颖
     */
    public Map<String, Object> insertTaskMessage(String tm_text, String tm_type, String tm_state, String tm_startTime, String tm_startWeek, String tm_endTime, String tm_endWeek,
                                                 HttpServletRequest request, String personID, String tm_http, Integer tmType, boolean boolType, Integer tm_pid) throws ParseException {

        int tm_id = 0;
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee cookieEmployee = new UserCenterEmployee();
        if (request != null) {
            cookieEmployee = AppUtil.getCookieEmployee();
        }
        UserCenterTaskMessage userCenterTaskMessage = new UserCenterTaskMessage();
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        userCenterTaskMessage.setTm_text(tm_text);
        int state = 1;
        switch (tm_state) {
            case "不重要":
                state = 0;
                break;
            default:
                break;
        }
        userCenterTaskMessage.setTm_state(state);
        userCenterTaskMessage.setTm_startTime(sf.parse(tm_startTime));
        userCenterTaskMessage.setTm_startWeek(tm_startWeek);
        userCenterTaskMessage.setTm_endTime(sf.parse(tm_endTime));
        userCenterTaskMessage.setTm_endWeek(tm_endWeek);
        userCenterTaskMessage.setTm_result(0);
        userCenterTaskMessage.setTm_tmType(tmType);
        userCenterTaskMessage.setTm_http(tm_http);
        Integer bool = 0;
        int type = 0;
        switch (tm_type) {
            case "不紧急":
                type = 0;
                break;
            case "紧急":
                type = 1;
                break;
            default:
                break;
        }
        userCenterTaskMessage.setTm_type(type);
        if (personID.equals("")) {
            if (boolType) {
                if (tmType == 1) {
                    cookieEmployee.setEm_name("超级管理员");
                    userCenterTaskMessage.setEm_id(1);
                } else {
                    userCenterTaskMessage.setEm_id(cookieEmployee.getEm_id());
                }
                userCenterTaskMessage.setTm_pid(0);
                bool = userCenterTaskMessageDAO.insertTaskMessage(userCenterTaskMessage);
                tm_id = userCenterTaskMessage.getTm_id();
            } else {
                bool = 1;

                tm_id = tm_pid;
                String[] em_id = personID.split(",");
                for (int i = 0; i < em_id.length; i++) {
                    userCenterTaskMessage.setEm_id(Integer.valueOf(em_id[i]));
                    userCenterTaskMessage.setTm_pid(tm_id);
                    userCenterTaskMessageDAO.insertTaskMessage(userCenterTaskMessage);
                }
            }
        } else {
            if (boolType) {
                if (tmType == 1) {
                    cookieEmployee.setEm_name("超级管理员");
                    userCenterTaskMessage.setEm_id(1);
                } else {
                    userCenterTaskMessage.setEm_id(cookieEmployee.getEm_id());
                }
                userCenterTaskMessage.setTm_pid(0);
                bool = userCenterTaskMessageDAO.insertTaskMessage(userCenterTaskMessage);

                tm_id = userCenterTaskMessage.getTm_id();

                String[] em_id = personID.split(",");
                for (int i = 0; i < em_id.length; i++) {
                    userCenterTaskMessage.setEm_id(Integer.valueOf(em_id[i]));
                    userCenterTaskMessage.setTm_pid(tm_id);
                    userCenterTaskMessageDAO.insertTaskMessage(userCenterTaskMessage);
                }
            } else {
                bool = 1;

                tm_id = tm_pid;
                String[] em_id = personID.split(",");
                for (int i = 0; i < em_id.length; i++) {
                    userCenterTaskMessage.setEm_id(Integer.valueOf(em_id[i]));
                    userCenterTaskMessage.setTm_pid(tm_id);
                    userCenterTaskMessageDAO.insertTaskMessage(userCenterTaskMessage);
                }
            }
        }

        if (bool > 0) {
            map.put("message", "success");
            map.put("tm_id", tm_id);
            map.put("mainUser", cookieEmployee.getEm_name());
        } else {
            map.put("message", "error");
        }

        return map;
    }

    /**
     * 修改任务消息
     *
     * @param tm_text      插入事件内容
     * @param tm_type      任务消息类型[紧急 不紧急]
     * @param tm_state     事件紧急程度 [重要 不重要]
     * @param tm_startTime 开始时间 2016-08-28 9:40
     * @param tm_startWeek 开始的日期是星期几
     * @param tm_endTime   结束时间 2016-08-28 9:40
     * @param tm_endWeek   结束的日期是星期几
     * @param request
     * @return message:success(成功) tm_id:消息编码 mainUser:安排人或者是提交人 tm_type 任务消息类型
     * 0：个人 1：部门 2：公司 tm_state 事件紧急程度 0：紧急 1：重要 2：计划
     * @throws ParseException
     * @author 陈智颖
     */
    public Map<String, Object> updatetTaskMessage(Integer tm_id, String tm_text, String tm_type, String tm_state, String tm_startTime, String tm_startWeek, String tm_endTime,
                                                  String tm_endWeek, String personID, HttpServletRequest request) throws ParseException {
        Map<String, Object> map = new HashMap<>();
        UserCenterTaskMessage userCenterTaskMessage = new UserCenterTaskMessage();
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        userCenterTaskMessage.setTm_id(tm_id);
        userCenterTaskMessage = userCenterTaskMessageDAO.selectTaskMessageID(userCenterTaskMessage);
        userCenterTaskMessage.setTm_text(tm_text);
        int state = 1;
        switch (tm_state) {
            case "不重要":
                state = 0;
                break;
            default:
                break;
        }
        userCenterTaskMessage.setTm_state(state);
        userCenterTaskMessage.setTm_startTime(sf.parse(tm_startTime));
        userCenterTaskMessage.setTm_startWeek(tm_startWeek);
        userCenterTaskMessage.setTm_endTime(sf.parse(tm_endTime));
        userCenterTaskMessage.setTm_endWeek(tm_endWeek);
        userCenterTaskMessage.setTm_result(0);
        userCenterTaskMessage.setTm_result(0);
        Integer bool = 0;
        int type = 0;
        switch (tm_type) {
            case "不紧急":
                type = 0;
                break;
            case "紧急":
                type = 1;
                break;
            default:
                break;
        }
        userCenterTaskMessage.setTm_type(type);

        if (personID.equals("")) {
            userCenterTaskMessage.setTm_id(tm_id);
            userCenterTaskMessage.setTm_pid(0);
            bool = userCenterTaskMessageDAO.updatetTaskMessage(userCenterTaskMessage);
        } else {
            UserCenterTaskMessage userCenterTaskMessage2 = new UserCenterTaskMessage();
            userCenterTaskMessage2.setTm_pid(tm_id);
            userCenterTaskMessageDAO.deleteTaskMessagePid(userCenterTaskMessage2);

            userCenterTaskMessage.setTm_id(tm_id);
            bool = userCenterTaskMessageDAO.updatetTaskMessage(userCenterTaskMessage);

            String[] em_id = personID.split(",");
            for (int i = 0; i < em_id.length; i++) {
                userCenterTaskMessage.setEm_id(Integer.valueOf(em_id[i]));
                userCenterTaskMessage.setTm_pid(tm_id);
                userCenterTaskMessageDAO.insertTaskMessage(userCenterTaskMessage);
            }
        }

        if (bool > 0) {
            map.put("message", "success");
            map.put("tm_id", tm_id);
            map.put("tm_type", tm_type);
            map.put("tm_state", tm_state);
            map.put("mainUser", userCenterTaskMessage.getEm_name());
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 修改任务执行状态
     *
     * @param userCenterTaskMessage
     * @return
     * @author 陈智颖
     */
    public Integer updatetTaskMessageState(UserCenterTaskMessage userCenterTaskMessage) {
        return userCenterTaskMessageDAO.updatetTaskMessageState(userCenterTaskMessage);
    }

    /**
     * 根据用户编码所有子级查询任务消息
     *
     * @param userCenterTaskMessage
     * @return
     * @author 陈智颖
     */
    public List<UserCenterTaskMessage> selectTaskMessageEM(UserCenterTaskMessage userCenterTaskMessage) {
        return userCenterTaskMessageDAO.selectTaskMessageEM(userCenterTaskMessage);
    }

    /**
     * 根据用户编号查询任务消息
     *
     * @param userCenterTaskMessage
     * @return
     * @author 陈智颖
     */
    public List<UserCenterTaskMessage> selectTaskMessagePid(UserCenterTaskMessage userCenterTaskMessage) {
        return userCenterTaskMessageDAO.selectTaskMessagePid(userCenterTaskMessage);
    }

    /**
     * 根据用户编码查询任务消息查询未完成任务
     *
     * @param userCenterTaskMessage
     * @return
     * @author 陈智颖
     */
    public List<UserCenterTaskMessage> selectTaskMessageUnfinished(UserCenterTaskMessage userCenterTaskMessage) {
        return userCenterTaskMessageDAO.selectTaskMessageUnfinished(userCenterTaskMessage);
    }

    /**
     * 根据父级ID删除任务消息类
     *
     * @return
     * @author 陈智颖
     */
    public Integer deleteTaskMessagePid(UserCenterTaskMessage userCenterTaskMessage) {
        return userCenterTaskMessageDAO.deleteTaskMessagePid(userCenterTaskMessage);
    }

    /**
     * 根据任务消息编码查询任务消息
     *
     * @return
     * @author 陈智颖
     */
    public UserCenterTaskMessage selectTaskMessageID(UserCenterTaskMessage userCenterTaskMessage) {
        return userCenterTaskMessageDAO.selectTaskMessageID(userCenterTaskMessage);
    }

    /**
     * 根据任务消息父级编码和用户编码
     *
     * @return
     * @author 陈智颖
     */
    public UserCenterTaskMessage selectTaskMessageUser(UserCenterTaskMessage userCenterTaskMessage) {
        return userCenterTaskMessageDAO.selectTaskMessageUser(userCenterTaskMessage);
    }

    /**
     * 根据调用地址和内部人员编码查询任务消息
     *
     * @return
     * @author 陈智颖
     */
    public List<UserCenterTaskMessage> selectTaskMessageUserHttp(UserCenterTaskMessage userCenterTaskMessage) {
        return userCenterTaskMessageDAO.selectTaskMessageUserHttp(userCenterTaskMessage);
    }

    /**
     * 修改任务消息类内容
     *
     * @return
     * @author 陈智颖
     */
    public Integer updatetTaskMessageText(UserCenterTaskMessage userCenterTaskMessage) {
        return userCenterTaskMessageDAO.updatetTaskMessageText(userCenterTaskMessage);
    }
}
