package com.gjp.controller;

import com.gjp.model.UserCenterEmployee;
import com.gjp.model.UserCenterHolidayDate;
import com.gjp.model.UserCenterTaskMessage;
import com.gjp.service.HolidayDateService;
import com.gjp.service.UserCenterEmployeeService;
import com.gjp.service.UserCenterTaskMessageService;
import com.gjp.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/memo")
public class memoController {

	@Resource
	private HolidayDateService holidayDateService;

	// 任务消息
	@Resource
	private UserCenterTaskMessageService userCenterTaskMessageService;

	// 用户
	@Resource
	private UserCenterEmployeeService userCenterEmployeeService;

	/**
	 * 备忘录
	 * 
	 * @param request
	 * @param response
	 * @return
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/memoList")
	public String memoList(HttpServletRequest request, HttpServletResponse response) {
		return "/memo/memorandum";
	}

	/**
	 * 时间轴
	 * 
	 * @param request
	 * @param response
	 * @return
	 *
	 * @author 王孝元
	 */
	@RequestMapping("/memoTimeLine")
	public String memoTimeLine(HttpServletRequest request, HttpServletResponse response) {
		return "/memo/memoTimeLine";
	}

	/**
	 * 事程安排数据读取
	 * 
	 * @param year
	 * @param month
	 * @return
	 * @throws ParseException
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/dateList")
	@ResponseBody
	public Map<String, Object> dateList(int year, int month) throws ParseException {

		Map<String, Object> map = new HashMap<>();

		MyCalendar mycal = new MyCalendar();

		List<Object> calendars = new ArrayList<Object>();
		List<Object> calendar = mycal.calendar(year, month);

		for (int i = 0; i < calendar.size(); i++) {
			String years = String.valueOf(year);
			String months = String.valueOf(month);
			switch (calendar.get(i).toString().split("-")[2]) {
			case "1":
				if (month == 1) {
					years = String.valueOf(year - 1);
					months = String.valueOf(month);
				} else {
					months = String.valueOf(month - 1);
				}
				break;
			case "2":

				break;
			case "3":
				if (month == 12) {
					years = String.valueOf(year + 1);
					months = String.valueOf(1);
				} else {
					months = String.valueOf(month + 1);
				}
				break;
			default:
				break;
			}
			if (Integer.valueOf(months) < 10) {
				months = "0" + months;
			}
			String days = HtmlUtil.delHTMLTag(calendar.get(i).toString().split("-")[0]);
			// System.out.println(days);
			if (Integer.valueOf(days) < 10) {
				days = "0" + days;
			}
			String yearMonth = years + "-" + months + "-" + days;
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
			UserCenterHolidayDate userCenterHolidayDate = new UserCenterHolidayDate();
			userCenterHolidayDate.setD_date(sf.parse(yearMonth));
			UserCenterHolidayDate selectHolidayDate = holidayDateService.selectHolidayDate(userCenterHolidayDate);
			if (selectHolidayDate != null) {
				calendars.add(calendar.get(i).toString().split("-")[0] + "-" + calendar.get(i).toString().split("-")[1] + "-" + selectHolidayDate.getD_holiday().toString() + "-"
						+ calendar.get(i).toString().split("-")[2]);
			} else {
				calendars.add(calendar.get(i).toString().split("-")[0] + "-" + calendar.get(i).toString().split("-")[1] + "-0" + "-" + calendar.get(i).toString().split("-")[2]);
			}

		}

		UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
		UserCenterTaskMessage userCenterTaskMessage = new UserCenterTaskMessage();
		userCenterTaskMessage.setEm_id(cookieEmployee.getEm_id());

		List<UserCenterTaskMessage> taskMessageEM = new ArrayList<UserCenterTaskMessage>();
		List<UserCenterTaskMessage> taskMessageEMs = new ArrayList<UserCenterTaskMessage>();
		// List<UserCenterTaskMessage> taskMessageEMs =
		// userCenterTaskMessageService.selectTaskMessageEM(userCenterTaskMessage);

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		String yearMonths = year + "-" + month + "-01";
		List<Date> list = AppUtil.getAllTheDateOftheMonth(sdf.parse(yearMonths));
		for (Date date : list) {
			userCenterTaskMessage.setStart(sdf.format(date));
			List<UserCenterTaskMessage> selectTaskMessageEM = userCenterTaskMessageService.selectTaskMessageEM(userCenterTaskMessage);
			if (!selectTaskMessageEM.isEmpty()) {
				for (UserCenterTaskMessage userCenterTaskMessage2 : selectTaskMessageEM) {
					taskMessageEMs.add(userCenterTaskMessage2);
				}
			}
		}

		for (UserCenterTaskMessage userCenterTaskMessage2 : taskMessageEMs) {
			if (userCenterTaskMessage2.getTm_pid() == 0) {
				UserCenterTaskMessage userCenterTaskMessage5 = new UserCenterTaskMessage();
				userCenterTaskMessage5.setTm_id(userCenterTaskMessage2.getTm_id());
				UserCenterTaskMessage taskMessageID = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage5).get(0);
				userCenterTaskMessage2.setMainUser(taskMessageID.getEm_name());
				UserCenterTaskMessage userCenterTaskMessage3 = new UserCenterTaskMessage();
				userCenterTaskMessage3.setTm_pid(userCenterTaskMessage2.getTm_id());
				List<UserCenterTaskMessage> selectTaskMessagePid = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage3);
				String task = "";
				for (UserCenterTaskMessage userCenterTaskMessage4 : selectTaskMessagePid) {
					String states = "";
					switch (userCenterTaskMessage4.getTm_result()) {
					case 0:
						states = "未完成";
						break;
					case 1:
						states = "完成";
						break;
					case 2:
						states = "删除";
						break;

					default:
						break;
					}
					task += userCenterTaskMessage4.getEm_id() + "-" + userCenterTaskMessage4.getEm_name() + "-" + states + ",";
				}
				if (!task.equals("")) {
					task = task.substring(0, task.length() - 1);
				}
				userCenterTaskMessage2.setUserTask(task);
				taskMessageEM.add(userCenterTaskMessage2);
			} else {
				// 安排人
				UserCenterTaskMessage userCenterTaskMessage5 = new UserCenterTaskMessage();
				userCenterTaskMessage5.setTm_id(userCenterTaskMessage2.getTm_pid());
				UserCenterTaskMessage taskMessageID = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage5).get(0);
				userCenterTaskMessage2.setMainUser(taskMessageID.getEm_name());
				UserCenterTaskMessage userCenterTaskMessage3 = new UserCenterTaskMessage();
				userCenterTaskMessage3.setTm_pid(userCenterTaskMessage2.getTm_pid());
				List<UserCenterTaskMessage> selectTaskMessagePid = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage3);
				String task = "";
				for (UserCenterTaskMessage userCenterTaskMessage4 : selectTaskMessagePid) {
					String states = "";
					switch (userCenterTaskMessage4.getTm_result()) {
					case 0:
						states = "未完成";
						break;
					case 1:
						states = "完成";
						break;
					case 2:
						states = "删除";
						break;

					default:
						break;
					}
					task += userCenterTaskMessage4.getEm_id() + "-" + userCenterTaskMessage4.getEm_name() + "-" + states + ",";
				}
				if (!task.equals("")) {
					task = task.substring(0, task.length() - 1);
				}
				userCenterTaskMessage2.setUserTask(task);
				taskMessageEM.add(userCenterTaskMessage2);
			}
		}

		map.put("calendar", calendars);
		map.put("taskMessageEM", taskMessageEM);

		return map;
	}

	/**
	 * 分页数据
	 * 
	 * @param year
	 *            年
	 * @param month
	 *            月
	 * @param day
	 *            日
	 * @param pageNo
	 *            第几页
	 * @return
	 * @throws ParseException
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/dateListPage")
	@ResponseBody
	public Map<String, Object> dateListPage(int year, int month, int day, int pageNo) throws ParseException {

		Map<String, Object> map = new HashMap<>();

		UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
		UserCenterTaskMessage userCenterTaskMessage = new UserCenterTaskMessage();
		userCenterTaskMessage.setEm_id(cookieEmployee.getEm_id());

		List<UserCenterTaskMessage> taskMessageEM = new ArrayList<UserCenterTaskMessage>();
		List<UserCenterTaskMessage> taskMessageEMs = new ArrayList<UserCenterTaskMessage>();
		// List<UserCenterTaskMessage> taskMessageEMs =
		// userCenterTaskMessageService.selectTaskMessageEM(userCenterTaskMessage);

		String yearMonths = year + "-" + month + "-" + day;
		userCenterTaskMessage.setStart(yearMonths);
		userCenterTaskMessage.setPageNo((pageNo - 1) * 12 + 4);
		List<UserCenterTaskMessage> selectTaskMessageEM = userCenterTaskMessageService.selectTaskMessageEM(userCenterTaskMessage);
		if (!selectTaskMessageEM.isEmpty()) {
			for (UserCenterTaskMessage userCenterTaskMessage2 : selectTaskMessageEM) {
				taskMessageEMs.add(userCenterTaskMessage2);
			}
		}

		for (UserCenterTaskMessage userCenterTaskMessage2 : taskMessageEMs) {
			if (userCenterTaskMessage2.getTm_pid() == 0) {
				UserCenterTaskMessage userCenterTaskMessage5 = new UserCenterTaskMessage();
				userCenterTaskMessage5.setTm_id(userCenterTaskMessage2.getTm_id());
				UserCenterTaskMessage taskMessageID = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage5).get(0);
				userCenterTaskMessage2.setMainUser(taskMessageID.getEm_name());
				UserCenterTaskMessage userCenterTaskMessage3 = new UserCenterTaskMessage();
				userCenterTaskMessage3.setTm_pid(userCenterTaskMessage2.getTm_id());
				List<UserCenterTaskMessage> selectTaskMessagePid = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage3);
				String task = "";
				for (UserCenterTaskMessage userCenterTaskMessage4 : selectTaskMessagePid) {
					String states = "";
					switch (userCenterTaskMessage4.getTm_result()) {
					case 0:
						states = "未完成";
						break;
					case 1:
						states = "完成";
						break;
					case 2:
						states = "删除";
						break;

					default:
						break;
					}
					task += userCenterTaskMessage4.getEm_id() + "-" + userCenterTaskMessage4.getEm_name() + "-" + states + ",";
				}
				if (!task.equals("")) {
					task = task.substring(0, task.length() - 1);
				}
				userCenterTaskMessage2.setUserTask(task);
				taskMessageEM.add(userCenterTaskMessage2);
			} else {
				// 安排人
				UserCenterTaskMessage userCenterTaskMessage5 = new UserCenterTaskMessage();
				userCenterTaskMessage5.setTm_id(userCenterTaskMessage2.getTm_pid());
				UserCenterTaskMessage taskMessageID = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage5).get(0);
				userCenterTaskMessage2.setMainUser(taskMessageID.getEm_name());
				UserCenterTaskMessage userCenterTaskMessage3 = new UserCenterTaskMessage();
				userCenterTaskMessage3.setTm_pid(userCenterTaskMessage2.getTm_pid());
				List<UserCenterTaskMessage> selectTaskMessagePid = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage3);
				String task = "";
				for (UserCenterTaskMessage userCenterTaskMessage4 : selectTaskMessagePid) {
					String states = "";
					switch (userCenterTaskMessage4.getTm_result()) {
					case 0:
						states = "未完成";
						break;
					case 1:
						states = "完成";
						break;
					case 2:
						states = "删除";
						break;

					default:
						break;
					}
					task += userCenterTaskMessage4.getEm_id() + "-" + userCenterTaskMessage4.getEm_name() + "-" + states + ",";
				}
				if (!task.equals("")) {
					task = task.substring(0, task.length() - 1);
				}
				userCenterTaskMessage2.setUserTask(task);
				taskMessageEM.add(userCenterTaskMessage2);
			}
		}

		map.put("taskMessageEM", taskMessageEM);

		return map;
	}

	/**
	 * 分页数据
	 * 
	 * @param year
	 *            年
	 * @param month
	 *            月
	 * @param day
	 *            日
	 * @param pageNo
	 *            第几页
	 * @return
	 * @throws ParseException
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/dateListPage1")
	@ResponseBody
	public Map<String, Object> dateListPage1(int year, int month, int day, int pageNo) throws ParseException {

		Map<String, Object> map = new HashMap<>();

		UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
		UserCenterTaskMessage userCenterTaskMessage = new UserCenterTaskMessage();
		userCenterTaskMessage.setEm_id(cookieEmployee.getEm_id());

		List<UserCenterTaskMessage> taskMessageEM = new ArrayList<UserCenterTaskMessage>();
		List<UserCenterTaskMessage> taskMessageEMs = new ArrayList<UserCenterTaskMessage>();
		// List<UserCenterTaskMessage> taskMessageEMs =
		// userCenterTaskMessageService.selectTaskMessageEM(userCenterTaskMessage);

		String yearMonths = year + "-" + month + "-" + day;
		userCenterTaskMessage.setStart(yearMonths);
		userCenterTaskMessage.setPageNo((pageNo - 1) * 7);
		List<UserCenterTaskMessage> selectTaskMessageEM = userCenterTaskMessageService.selectTaskMessageEM(userCenterTaskMessage);
		if (!selectTaskMessageEM.isEmpty()) {
			for (UserCenterTaskMessage userCenterTaskMessage2 : selectTaskMessageEM) {
				taskMessageEMs.add(userCenterTaskMessage2);
			}
		}

		for (UserCenterTaskMessage userCenterTaskMessage2 : taskMessageEMs) {
			if (userCenterTaskMessage2.getTm_pid() == 0) {
				UserCenterTaskMessage userCenterTaskMessage5 = new UserCenterTaskMessage();
				userCenterTaskMessage5.setTm_id(userCenterTaskMessage2.getTm_id());
				UserCenterTaskMessage taskMessageID = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage5).get(0);
				userCenterTaskMessage2.setMainUser(taskMessageID.getEm_name());
				UserCenterTaskMessage userCenterTaskMessage3 = new UserCenterTaskMessage();
				userCenterTaskMessage3.setTm_pid(userCenterTaskMessage2.getTm_id());
				List<UserCenterTaskMessage> selectTaskMessagePid = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage3);
				String task = "";
				for (UserCenterTaskMessage userCenterTaskMessage4 : selectTaskMessagePid) {
					String states = "";
					switch (userCenterTaskMessage4.getTm_result()) {
					case 0:
						states = "未完成";
						break;
					case 1:
						states = "完成";
						break;
					case 2:
						states = "删除";
						break;

					default:
						break;
					}
					task += userCenterTaskMessage4.getEm_id() + "-" + userCenterTaskMessage4.getEm_name() + "-" + states + ",";
				}
				if (!task.equals("")) {
					task = task.substring(0, task.length() - 1);
				}
				userCenterTaskMessage2.setUserTask(task);
				taskMessageEM.add(userCenterTaskMessage2);
			} else {
				// 安排人
				UserCenterTaskMessage userCenterTaskMessage5 = new UserCenterTaskMessage();
				userCenterTaskMessage5.setTm_id(userCenterTaskMessage2.getTm_pid());
				UserCenterTaskMessage taskMessageID = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage5).get(0);
				userCenterTaskMessage2.setMainUser(taskMessageID.getEm_name());
				UserCenterTaskMessage userCenterTaskMessage3 = new UserCenterTaskMessage();
				userCenterTaskMessage3.setTm_pid(userCenterTaskMessage2.getTm_pid());
				List<UserCenterTaskMessage> selectTaskMessagePid = userCenterTaskMessageService.selectTaskMessagePid(userCenterTaskMessage3);
				String task = "";
				for (UserCenterTaskMessage userCenterTaskMessage4 : selectTaskMessagePid) {
					String states = "";
					switch (userCenterTaskMessage4.getTm_result()) {
					case 0:
						states = "未完成";
						break;
					case 1:
						states = "完成";
						break;
					case 2:
						states = "删除";
						break;

					default:
						break;
					}
					task += userCenterTaskMessage4.getEm_id() + "-" + userCenterTaskMessage4.getEm_name() + "-" + states + ",";
				}
				if (!task.equals("")) {
					task = task.substring(0, task.length() - 1);
				}
				userCenterTaskMessage2.setUserTask(task);
				taskMessageEM.add(userCenterTaskMessage2);
			}
		}

		map.put("taskMessageEM", taskMessageEM);

		return map;
	}

	/**
	 * 百度接口获取节假日
	 * 
	 * @return
	 * @throws ParseException
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/holidayDate")
	@ResponseBody
	public Map<String, Object> holidayDate() throws ParseException {

		Map<String, Object> map = new HashMap<>();

		int year = 2016;
		int month = 0;

		for (int k = 1; k < 13; k++) {
			month = k;
			Calendar firstcal = Calendar.getInstance();
			firstcal.set(year, month - 1, 1);// 所求月的第一天
			int dateofmonth = firstcal.getActualMaximum(Calendar.DATE);// 获取该月的天数

			for (int i = 1; i <= dateofmonth; i++) {
				String years = String.valueOf(year);
				String months = String.valueOf(month);
				if (month < 10) {
					months = "0" + month;
				}
				String days = String.valueOf(i);
				if (i < 10) {
					days = "0" + i;
				}
				String yearMonth = years + months + days;
				String yearMonths = years + "-" + months + "-" + days;
				// System.out.println(yearMonth);
				String holiday = UrlData.sendPostUrl("http://tool.bitefu.net/jiari/", "d=" + yearMonth + "&apiserviceid=65fc4d33eafc47249d4a2f524a6573c0");
				SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

				UserCenterHolidayDate userCenterHolidayDate = new UserCenterHolidayDate();
				userCenterHolidayDate.setD_date(sf.parse(yearMonths));
				userCenterHolidayDate.setD_holiday(Integer.valueOf(holiday));
				holidayDateService.insertHolidayDate(userCenterHolidayDate);
			}
		}

		return map;
	}

	/**
	 * 查询用户列表
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/userPerson")
	@ResponseBody
	public Map<String, Object> userPerson(String em_name, String em_phone) {

		Map<String, Object> map = new HashMap<>();

		UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();

		Pagination<UserCenterEmployee> pagination = new Pagination<UserCenterEmployee>();

		UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
		if (em_name != null && !em_name.equals("")) {
			userCenterEmployee.setEm_name(em_name);
		}
		if (em_phone != null && !em_phone.equals("")) {
			userCenterEmployee.setEm_phone(em_phone);
		}

		if (em_name == null || em_name.equals("") || em_phone == null || em_phone.equals("")) {
			UserCenterEmployee userCenterEmployee2 = new UserCenterEmployee();
			userCenterEmployee2.setEm_id(cookieEmployee.getEm_id());
			UserCenterEmployee company1 = userCenterEmployeeService.selectCompanyID(userCenterEmployee2).get(0);
			userCenterEmployee.setUcc_id(company1.getUcc_id());
		}

		userCenterEmployee.setEm_state(1);
		userCenterEmployee.setEm_id(cookieEmployee.getEm_id());
		pagination.setT(userCenterEmployee);
		pagination.setPageNo(0);
		pagination.setPageSize(8);
		List<UserCenterEmployee> employee = userCenterEmployeeService.queryUserCenterEmployeeList(pagination);

		map.put("employee", employee);

		return map;
	}

	/**
	 * 未完成的事件提醒
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 * @throws ParseException
	 */
	@RequestMapping("/unfinishedEvent")
	@ResponseBody
	public Map<String, Object> unfinishedEvent() throws ParseException {

		Map<String, Object> map = new HashMap<>();

		// 最新时间
		Date newDate;
		// 这个月开始时间
		Date yStartDate;
		// 上个月开始时间
		Date oldDate;

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();

		UserCenterTaskMessage userCenterTaskMessage = new UserCenterTaskMessage();
		userCenterTaskMessage.setEm_id(cookieEmployee.getEm_id());

		int taskMessageNew = 0;
		int taskMessageLately = 0;
		int taskMessageOld = 0;

		newDate = new Date();
		yStartDate = sdf.parse(sdf.format(new Date()).substring(0, 7) + "-01 00:00:00");
		Calendar c = Calendar.getInstance();
		c.setTime(yStartDate);
		c.add(Calendar.MONTH, -1);
		oldDate = c.getTime();

		List<UserCenterTaskMessage> taskMessageUnfinished = userCenterTaskMessageService.selectTaskMessageUnfinished(userCenterTaskMessage);
		for (UserCenterTaskMessage userCenterTaskMessage2 : taskMessageUnfinished) {
			if (userCenterTaskMessage2.getTm_startTime().getTime() >= yStartDate.getTime() && userCenterTaskMessage2.getTm_startTime().getTime() <= newDate.getTime()) {
				taskMessageNew += 1;
			}
			if (userCenterTaskMessage2.getTm_startTime().getTime() >= oldDate.getTime() && userCenterTaskMessage2.getTm_startTime().getTime() < yStartDate.getTime()) {
				taskMessageLately += 1;
			}
			if (userCenterTaskMessage2.getTm_startTime().getTime() < oldDate.getTime()) {
				taskMessageOld += 1;
			}
		}

		if (taskMessageNew != 0) {
			map.put("unfTask", Integer.parseInt(sdf.format(newDate).substring(5, 7)) + "," + taskMessageNew + "," + sdf.format(newDate).substring(0, 7));
		} else {
			map.put("unfTask", 0);
		}
		if (taskMessageLately != 0) {
			map.put("unfTask1", Integer.parseInt(sdf.format(oldDate).substring(5, 7)) + "," + taskMessageLately + "," + sdf.format(oldDate).substring(0, 7));
		} else {
			map.put("unfTask1", 0);
		}
		if (taskMessageOld != 0) {
			map.put("unfTask2", Integer.parseInt(sdf.format(oldDate).substring(5, 7)) + "," + taskMessageOld + "," + sdf.format(oldDate).substring(0, 4) + "-"
					+ (Integer.parseInt(sdf.format(oldDate).substring(5, 7)) - 1));
		} else {
			map.put("unfTask2", 0);
		}

		return map;
	}
}
