package com.gjp.controller;

import com.gjp.model.UserCenterEmployee;
import com.gjp.model.UserCenterTaskMessage;
import com.gjp.service.UserCenterTaskMessageService;
import com.gjp.util.AppUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年9月6日 下午3:36:06
 */
@Controller
@RequestMapping("/userTaskMessage")
public class UserCenterTaskMessageController {

	// 任务消息
	@Resource
	private UserCenterTaskMessageService userCenterTaskMessageService;

	/**
	 * 插入任务消息
	 * 
	 * @param tm_text
	 *            插入事件内容
	 * @param tm_type
	 *            任务消息类型 0：个人 1：部门 2：公司
	 * @param tm_state
	 *            事件紧急程度 0：紧急 1：重要 2：计划
	 * @param tm_startTime
	 *            开始时间 2016-08-28
	 * @param tm_startWeek
	 *            开始的日期是星期几
	 * @param tm_endTime
	 *            结束时间 2016-08-28
	 * @param tm_endWeek
	 *            结束的日期是星期几
	 * @param tm_http
	 *            页面跳转连接
	 * @param tmType
	 *            类型（1：超级管理员、0：手动插入）
	 * @param request
	 * @return
	 * @throws ParseException
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/addTaskMessage")
	@ResponseBody
	public Map<String, Object> addTaskMessage(String tm_text, String tm_type, String tm_state, String tm_startTime, String tm_startWeek, String tm_endTime, String tm_endWeek,
			HttpServletRequest request, String personID, String tm_http, Integer tmType) throws ParseException {

		Map<String, Object> map = userCenterTaskMessageService.insertTaskMessage(tm_text, tm_type, tm_state, tm_startTime, tm_startWeek, tm_endTime, tm_endWeek, request, personID,
				tm_http, tmType, true, null);

		return map;
	}

	/**
	 * 修改任务消息
	 * 
	 * @param tm_text
	 *            插入事件内容
	 * @param tm_type
	 *            任务消息类型 0：个人 1：部门 2：公司
	 * @param tm_state
	 *            事件紧急程度 0：紧急 1：重要 2：计划
	 * @param tm_startTime
	 *            开始时间 2016-08-28
	 * @param tm_startWeek
	 *            开始的日期是星期几
	 * @param tm_endTime
	 *            结束时间 2016-08-28
	 * @param tm_endWeek
	 *            结束的日期是星期几
	 * @param request
	 * @return
	 * @throws ParseException
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/updateTaskMessage")
	@ResponseBody
	public Map<String, Object> updateTaskMessage(Integer tm_id, String tm_text, String tm_type, String tm_state, String tm_startTime, String tm_startWeek, String tm_endTime,
			String tm_endWeek, String personID, HttpServletRequest request) throws ParseException {

		Map<String, Object> map = userCenterTaskMessageService.updatetTaskMessage(tm_id, tm_text, tm_type, tm_state, tm_startTime, tm_startWeek, tm_endTime, tm_endWeek, personID,
				request);

		return map;
	}

	/**
	 * 完成事程
	 * 
	 * @param tm_id
	 *            系统不用传值 事物编码
	 * @param type
	 *            0：未完成 1：完成 2：删除
	 * @param text
	 *            完成备注
	 * @param tm_http
	 *            业务跟进连接
	 * @return
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/updateTaskMessageState")
	@ResponseBody
	public Map<String, Object> updateTaskMessageState(Integer tm_id, Integer type, String text, String tm_http) {
		Map<String, Object> map = new HashMap<>();

		UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();

		UserCenterTaskMessage userCenterTaskMessage = new UserCenterTaskMessage();

		UserCenterTaskMessage taskMessages = new UserCenterTaskMessage();

		int em_id = cookieEmployee.getEm_id();

		// 判断跟进事物的连接是否存在
		if (tm_http != null && !tm_http.equals("")) {
			userCenterTaskMessage.setTm_http(tm_http);
			taskMessages = userCenterTaskMessageService.selectTaskMessageUserHttp(userCenterTaskMessage).get(0);
			userCenterTaskMessage.setTm_id(taskMessages.getTm_id());
			userCenterTaskMessage.setTm_result(type);
			if (text != null && !text.equals("")) {
				userCenterTaskMessage.setTm_beizhu(text);
			}
		} else {
			userCenterTaskMessage.setTm_id(tm_id);
			taskMessages = userCenterTaskMessageService.selectTaskMessageID(userCenterTaskMessage);
			if (!cookieEmployee.getEm_id().equals(taskMessages.getEm_id())) {
				UserCenterTaskMessage userCenterTaskMessage1 = new UserCenterTaskMessage();
				userCenterTaskMessage1.setTm_pid(tm_id);
				userCenterTaskMessage1.setEm_id(cookieEmployee.getEm_id());
				UserCenterTaskMessage taskMessageUser = userCenterTaskMessageService.selectTaskMessageUser(userCenterTaskMessage1);
				userCenterTaskMessage.setTm_id(taskMessageUser.getTm_id());
			}
			userCenterTaskMessage.setTm_result(type);
			if (text != null && !text.equals("")) {
				userCenterTaskMessage.setTm_beizhu(text);
			}
		}

		// 判断是否是当前事物
		Integer bool = userCenterTaskMessageService.updatetTaskMessageState(userCenterTaskMessage);
		UserCenterTaskMessage userCenterTaskMessage5 = new UserCenterTaskMessage();
		userCenterTaskMessage5.setTm_pid(tm_id);
		List<UserCenterTaskMessage> selectTaskMessagePid = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage5);
		boolean bools = false;
		boolean boolk = true;
		if (tm_http != null && !tm_http.equals("")) {
			bools = true;
		} else {
			if (cookieEmployee.getEm_id().equals(taskMessages.getEm_id())) {
				bools = true;
			} else {
				for (UserCenterTaskMessage userCenterTaskMessage2 : selectTaskMessagePid) {
					if (type == 2) {
						userCenterTaskMessage2.setTm_result(type);
						userCenterTaskMessage2.setTm_pid(null);
						userCenterTaskMessageService.updatetTaskMessageState(userCenterTaskMessage2);
					}
					if (userCenterTaskMessage2.getTm_result().equals(0)) {
						boolk = false;
						break;
					}
				}
			}
		}

		if (boolk) {
			map.put("messages", "mainSuccess");
		} else {
			map.put("em_id", em_id);
		}

		if (bools) {
			UserCenterTaskMessage userCenterTaskMessage2 = userCenterTaskMessageService.selectTaskMessageID(userCenterTaskMessage);
			userCenterTaskMessage2.setTm_id(null);
			userCenterTaskMessage2.setTm_pid(tm_id);
			userCenterTaskMessage2.setTm_result(type);
			userCenterTaskMessageService.updatetTaskMessageState(userCenterTaskMessage2);
		}

		UserCenterTaskMessage userCenterTaskMessage3 = new UserCenterTaskMessage();
		if (!selectTaskMessagePid.isEmpty()) {
			userCenterTaskMessage3.setTm_id(selectTaskMessagePid.get(0).getTm_pid());
		} else {
			userCenterTaskMessage3.setTm_id(tm_id);
		}
		boolean boolp = true;
		if (!bools) {
			for (UserCenterTaskMessage userCenterTaskMessage2 : selectTaskMessagePid) {
				if (userCenterTaskMessage2.getTm_result().equals(0)) {
					boolp = false;
					break;
				}
			}
		}

		if (boolp) {
			userCenterTaskMessage3.setTm_result(type);
			userCenterTaskMessageService.updatetTaskMessageState(userCenterTaskMessage3);
		}

		if (bool > 0) {
			map.put("message", "success");
		} else {
			map.put("message", "error");
		}

		return map;
	}

}
