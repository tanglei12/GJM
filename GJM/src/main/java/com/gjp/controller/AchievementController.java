package com.gjp.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gjp.model.*;
import com.gjp.service.AchievementCompanyService;
import com.gjp.service.ContractService;
import com.gjp.service.UserCenterEmployeeService;
import com.gjp.util.AppUtil;
import com.gjp.util.Msg;
import com.gjp.util.Pagination;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/achievement")
public class AchievementController {

	@Autowired
    private AchievementCompanyService achievementCompanyService;

	@Autowired
	private UserCenterEmployeeService employeeService;

	// 合同对象
	@Autowired
	private ContractService contractObjectService;

	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	/**
	 * 跳转--总业绩统计
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 * @throws ParseException
	 */
	@RequestMapping("/achievementSum")
	public ModelAndView achievementSum(String startDate, String endDate) throws ParseException {
		ModelAndView view = new ModelAndView("/achievement/achievementSum");
		// 获取人员信息
		UserCenterEmployee employee = AppUtil.getCookieEmployee();
		ViewEmployeePositionCompanyVo employeePositionCompanyVo = new ViewEmployeePositionCompanyVo();
		employeePositionCompanyVo.setEm_id(employee.getEm_id());
		employeePositionCompanyVo = employeeService.selectEmployeePositionCompanyWhere(employeePositionCompanyVo);
		if (employeePositionCompanyVo == null) {
			return view.addObject("employeePositionCompany", "");
		}
		view.addObject("employeePositionCompany", employeePositionCompanyVo);
		// 模式设置
		String mode = ""; // 游客
		if(!StringUtils.isEmpty(employeePositionCompanyVo.getUcr_name())){
			switch (employeePositionCompanyVo.getUcr_name()) {
			case "销售经理":
				mode = "amaldar";
				break;
			case "销售主管":
				mode = "director";
				break;
			case "销售副主管":
				mode = "director";
				break;
			case "托管顾问":
				mode = "member";
				break;
			}
		}
		view.addObject("mode", mode);
		// 查询公司目标总业绩
		AchievementCompanyAchievement companyAchievement = new AchievementCompanyAchievement();
		if (StringUtils.isEmpty(startDate) && StringUtils.isEmpty(endDate)) {
			companyAchievement.setQueryDate(sdf.format(new Date()));
		} else {
			companyAchievement.setCa_startDate(sdf.parse(startDate));
			companyAchievement.setCa_endDate(sdf.parse(endDate));
		}
		companyAchievement = achievementCompanyService.selectCompanyAchievementByWhere(companyAchievement);
		view.addObject("companyAchievement", companyAchievement);

		if (companyAchievement != null) {
			// 查询每月实际总业绩
			AchievementBill achievementBill = new AchievementBill();
			if ("销售主管".equals(employeePositionCompanyVo.getUcr_name()) || "销售副主管".equals(employeePositionCompanyVo.getUcr_name())) {
				// 查询指定团队目标业绩
				ViewTeamAchievementListVo achievementListVo = new ViewTeamAchievementListVo();
				achievementListVo.setCa_id(companyAchievement.getCa_id());
				achievementListVo.setUcc_id(employeePositionCompanyVo.getUcc_id());
				boolean empty = achievementCompanyService.selectTeamAchievementList(achievementListVo).isEmpty();
				if (empty) {
					return view.addObject("achievement", null);
				}
				achievementListVo = achievementCompanyService.selectTeamAchievementList(achievementListVo).get(0);
				view.addObject("achievement", achievementListVo);

				achievementBill.setUcc_id(employeePositionCompanyVo.getUcc_id());
			} else if ("托管顾问".equals(employeePositionCompanyVo.getUcr_name())) {
				// 查询指定个人目标业绩
				ViewAchievementEmployeeVo achievementEmployeeVo = new ViewAchievementEmployeeVo();
				achievementEmployeeVo.setCa_id(companyAchievement.getCa_id());
				achievementEmployeeVo.setEm_id(employee.getEm_id());
				boolean empty = achievementCompanyService.selectAchievementEmployeeList(achievementEmployeeVo).isEmpty();
				if (empty) {
					return view.addObject("achievementEmployee", null);
				}
				achievementEmployeeVo = achievementCompanyService.selectAchievementEmployeeList(achievementEmployeeVo).get(0);
				view.addObject("achievementEmployee", achievementEmployeeVo);

				achievementBill.setEm_id(employeePositionCompanyVo.getEm_id());
			}
			achievementBill.setSa_startDate(companyAchievement.getCa_startDate());
			achievementBill.setSa_endDate(companyAchievement.getCa_endDate());
			// 查询亏损
			AchievementBill achievementBill1 = achievementCompanyService.selectAchievementBillLossByWhere(achievementBill);
			// 查询业绩账单总数据
			AchievementBill achievementBill2 = achievementCompanyService.selectAchievementBillTotalByWhere(achievementBill);
			if (achievementBill1 != null && achievementBill2 != null) {
				achievementBill2.setLossHouseCount(achievementBill1.getLossHouseCount());
				achievementBill2.setLossSumMoney(Math.abs(achievementBill1.getLossSumMoney()));
			}
			view.addObject("achievementBill", achievementBill2);

			AchievementSumAchievement sumAchievement = new AchievementSumAchievement();
			sumAchievement.setSa_startDate(companyAchievement.getCa_startDate());
			sumAchievement.setSa_endDate(companyAchievement.getCa_endDate());
			sumAchievement = achievementCompanyService.selectAchievementSumByWhere(sumAchievement);
			view.addObject("sumAchievement", sumAchievement);
		}
		return view;
	}

	/**
	 * 前端(概述)--查询团队业绩
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 * @param ca_id
	 *            公司业绩目标编码
     */
	@RequestMapping("/selectTeamAchievementList")
	@ResponseBody
	public String selectTeamAchievementList(Integer ca_id, String sa_startDate, String sa_endDate) {
		Msg<?> msg = new Msg<>();
		// 获取人员信息
		ViewEmployeePositionCompanyVo employeePositionCompanyVo = new ViewEmployeePositionCompanyVo();
		employeePositionCompanyVo.setEm_id(AppUtil.getCookieEmployee().getEm_id());
		employeePositionCompanyVo = employeeService.selectEmployeePositionCompanyWhere(employeePositionCompanyVo);
		if (employeePositionCompanyVo == null) {
			return msg.toString(110, Msg.MSG_LOGIN_ERROR);
		}
		if ("销售主管".equals(employeePositionCompanyVo.getUcr_name()) || "销售副主管".equals(employeePositionCompanyVo.getUcr_name())) {
			msg = queryTeamPeopleAchievement(ca_id, employeePositionCompanyVo.getUcc_id(), sa_startDate, sa_endDate);
			if (msg.getCode() == 200) {
				msg.setCode(201);
			}
		} else if ("托管顾问".equals(employeePositionCompanyVo.getUcr_name())) {
			msg = queryTeamAchievement(ca_id, employeePositionCompanyVo.getUcc_id(), sa_startDate, sa_endDate);
			if (msg.getCode() == 200) {
				msg.setCode(202);
			}
		} else {
			msg = queryTeamAchievement(ca_id, null, sa_startDate, sa_endDate);
		}
		return msg.toString();
	}

	/**
	 * 查询房屋总业绩列表
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 * @param sa_startDate
	 * @param sa_endDate
	 */
	@Deprecated
	@RequestMapping("/selectHouseSumAchievementList")
	@ResponseBody
	public String selectHouseSumAchievementList(String sa_startDate, String sa_endDate) {
		Msg<List<AchievementBill>> msg = new Msg<List<AchievementBill>>();
		AchievementBill achievementBill = new AchievementBill();
		try {
			achievementBill.setSa_startDate(sdf.parse(sa_startDate));
			achievementBill.setSa_endDate(sdf.parse(sa_endDate));
			List<AchievementBill> achievementBillList = achievementCompanyService.selectAchievementBillListByWhere(achievementBill);
			msg.setData(achievementBillList);
		} catch (ParseException e) {
			msg.setCode(110);
			msg.setMsg(Msg.MSG_PARAM_ERROR);
		}
		return msg.toString();
	}

	/**
	 * 前端(房屋业绩)--查询房屋总业绩列表
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 * @param sa_startDate
	 * @param sa_endDate
	 * @param ucc_id
	 * @param pageNo
	 */
	@RequestMapping("/selectAchievementSimpleList")
	@ResponseBody
	public String selectAchievementList(String sa_startDate, String sa_endDate, Integer ucc_id, Integer em_id, Integer pageNo) {
		Msg<Pagination<AchievementBill>> msg = new Msg<Pagination<AchievementBill>>();
		Pagination<AchievementBill> pagination = new Pagination<AchievementBill>(pageNo, 10);
		try {
			AchievementBill achievementBill = new AchievementBill();
			achievementBill.setEm_id(em_id);
			achievementBill.setUcc_id(ucc_id);
			achievementBill.setSa_startDate(sdf.parse(sa_startDate));
			achievementBill.setSa_endDate(sdf.parse(sa_endDate));
			pagination.setT(achievementBill);
			List<AchievementBill> achievementBillList = achievementCompanyService.selectAchievementBillSimpleList(pagination);
			if (achievementBillList == null) {
				msg.setCode(111);
				msg.setMsg("数据为空");
				return msg.toString();
			}
			pagination.setTotalRecords(achievementCompanyService.selectAchievementBillSimpleListTotalRecords(pagination));
			// 遍历数据
			for (AchievementBill achievementBill2 : achievementBillList) {
				if (achievementBill2 != null) {
					AchievementBill achievementBill1 = new AchievementBill();
					achievementBill1.setEm_id(em_id);
					achievementBill1.setHi_code(achievementBill2.getHi_code());
					achievementBill1.setUcc_id(ucc_id);
					achievementBill1.setSa_startDate(sdf.parse(sa_startDate));
					achievementBill1.setSa_endDate(sdf.parse(sa_endDate));
					List<AchievementBill> list = achievementCompanyService.selectAchievementBillListByWhere(achievementBill1);
					achievementBill2.setAchievementBillList(list);
				}
			}
			pagination.setList(achievementBillList);
			msg.setData(pagination);
		} catch (ParseException e) {
			msg.setCode(110);
			msg.setMsg(Msg.MSG_PARAM_ERROR);
		}
		return msg.toString();
	}

	/**
	 * 前端(人员业绩)--查询业绩人员
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 * @param sa_startDate
	 * @param sa_endDate
	 * @param ca_id
	 */
	@RequestMapping("/selectAchievementEmployeeList")
	@ResponseBody
	public String selectAchievementEmployeeList(Integer ca_id, Integer ucc_id, Integer em_id, String sa_startDate, String sa_endDate) {
		Msg<List<ViewAchievementEmployeeVo>> msg = queryPeopleAchievementList(ca_id, ucc_id, em_id, sa_startDate, sa_endDate);
		return msg.toString();
	}

	/**
	 * 查询人员业绩
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 * @param em_id
	 */
	private Msg<List<ViewAchievementEmployeeVo>> queryPeopleAchievementList(Integer ca_id, Integer ucc_id, Integer em_id, String sa_startDate, String sa_endDate) {
		Msg<List<ViewAchievementEmployeeVo>> msg = new Msg<List<ViewAchievementEmployeeVo>>();
		ViewAchievementEmployeeVo achievementEmployeeVo = new ViewAchievementEmployeeVo();
		achievementEmployeeVo.setEm_id(em_id);
		achievementEmployeeVo.setUcc_id(ucc_id);
		achievementEmployeeVo.setCa_id(ca_id);
		List<ViewAchievementEmployeeVo> achievementEmployeeList = achievementCompanyService.selectAchievementEmployeeList(achievementEmployeeVo);
		try {
			for (ViewAchievementEmployeeVo viewAchievementEmployeeVo : achievementEmployeeList) {
				AchievementBill achievementBill = new AchievementBill();
				achievementBill.setEm_id(viewAchievementEmployeeVo.getEm_id());
				achievementBill.setSa_startDate(sdf.parse(sa_startDate));
				achievementBill.setSa_endDate(sdf.parse(sa_endDate));
				// 设置人员实际 旧、新、总业绩
				AchievementBill achievementBillTotalByWhere = achievementCompanyService.selectAchievementBillTotalByWhere(achievementBill);
				if (achievementBillTotalByWhere != null) {
					viewAchievementEmployeeVo.setAb_oldMoney(achievementBillTotalByWhere.getAb_oldMoney());
					viewAchievementEmployeeVo.setAb_newMoney(achievementBillTotalByWhere.getAb_newMoney());
					viewAchievementEmployeeVo.setAb_sumMoney(achievementBillTotalByWhere.getAb_sumMoney());
				}
				// 设置人员所有业绩
				List<AchievementBill> list = achievementCompanyService.selectAchievementBillListByWhere(achievementBill);
				viewAchievementEmployeeVo.setAchievementBillList(list);
			}
		} catch (ParseException e) {
			msg.setCode(110);
			msg.setMsg(Msg.MSG_PARAM_ERROR);
		}
		msg.setData(achievementEmployeeList);
		return msg;
	}

	/**
	 * 查询指定部门业绩
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	private Msg<List<ViewAchievementEmployeeVo>> queryTeamPeopleAchievement(Integer ca_id, Integer ucc_id, String sa_startDate, String sa_endDate) {
		Msg<List<ViewAchievementEmployeeVo>> msg = new Msg<List<ViewAchievementEmployeeVo>>();
		ViewAchievementEmployeeVo achievementEmployeeVo = new ViewAchievementEmployeeVo();
		achievementEmployeeVo.setUcc_id(ucc_id);
		achievementEmployeeVo.setCa_id(ca_id);
		List<ViewAchievementEmployeeVo> achievementEmployeeList = achievementCompanyService.selectAchievementEmployeeList(achievementEmployeeVo);
		try {
			for (ViewAchievementEmployeeVo viewAchievementEmployeeVo : achievementEmployeeList) {
				AchievementBill achievementBill = new AchievementBill();
				achievementBill.setEm_id(viewAchievementEmployeeVo.getEm_id());
				achievementBill.setUcc_id(viewAchievementEmployeeVo.getUcc_id());
				achievementBill.setSa_startDate(sdf.parse(sa_startDate));
				achievementBill.setSa_endDate(sdf.parse(sa_endDate));
				achievementBill = achievementCompanyService.selectAchievementBillTotalByWhere(achievementBill);
				viewAchievementEmployeeVo.setAchievementBill(achievementBill);
			}
		} catch (ParseException e) {
			msg.setCode(110);
			msg.setMsg(Msg.MSG_PARAM_ERROR);
		}
		msg.setData(achievementEmployeeList);
		return msg;
	}

	/**
	 * 查询团队业绩
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	private Msg<List<ViewTeamAchievementListVo>> queryTeamAchievement(Integer ca_id, Integer ucc_id, String sa_startDate, String sa_endDate) {
		Msg<List<ViewTeamAchievementListVo>> msg = new Msg<List<ViewTeamAchievementListVo>>();
		// 查询团队目标业绩
		ViewTeamAchievementListVo achievementListVo = new ViewTeamAchievementListVo();
		achievementListVo.setUcc_id(ucc_id);
		achievementListVo.setCa_id(ca_id);
		List<ViewTeamAchievementListVo> achievementListVoList = achievementCompanyService.selectTeamAchievementList(achievementListVo);
		if (achievementListVoList.size() > 0) {
			for (ViewTeamAchievementListVo viewTeamAchievementListVo : achievementListVoList) {
				// 查询团队实际业绩
				AchievementBill achievementBill = new AchievementBill();
				try {
					achievementBill.setSa_startDate(sdf.parse(sa_startDate));
					achievementBill.setSa_endDate(sdf.parse(sa_endDate));
				} catch (ParseException e) {
					msg.setCode(110);
					msg.setMsg(Msg.MSG_PARAM_ERROR);
				}
				achievementBill.setUcc_id(viewTeamAchievementListVo.getUcc_id());
				achievementBill = achievementCompanyService.selectAchievementBillTotalByWhere(achievementBill);
				viewTeamAchievementListVo.setAchievementBill(achievementBill);
			}
		}
		msg.setData(achievementListVoList);
		return msg;
	}

	/**
	 * 查询所有总目标业绩
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	@RequestMapping("/queryAllAchieveDate")
	@ResponseBody
	public String queryAllAchieveDate() {
		Msg<Object> msg = new Msg<>();
		AchievementCompanyAchievement companyAchievement = new AchievementCompanyAchievement();
		List<AchievementCompanyAchievement> companyAchievementList = achievementCompanyService.selectCompanyAchievementList(companyAchievement);
		msg.setData(companyAchievementList);
		return msg.toString();
	}

	// ------------------------

	/**
	 * 设置业绩
	 *
	 * @param companyAchievement
	 * @return
	 *
	 * @author 陈智颖
	 * @throws ParseException
	 * @throws Exception
	 * @throws Exception
	 */
	@RequestMapping("/achievementSetting")
	@ResponseBody
	public Map<String, Object> achievementSetting(AchievementCompanyAchievement companyAchievement) throws ParseException {
		Map<String, Object> map = new HashMap<>();

		map = achievementCompanyService.insertMoneySetting(companyAchievement);

		return map;
	}

	/**
	 * 修改业绩设置
	 *
	 * @param json
	 * @return
	 *
	 * @author 陈智颖
	 * @throws ParseException
	 */
	@RequestMapping("/achievementSettingUpdate")
	@ResponseBody
	public Map<String, Object> achievementSettingUpdate(String json) throws ParseException {

		Map<String, Object> map = new HashMap<>();

		JSONObject json1 = JSONObject.parseObject(json);
		List<AchievementCompanyAchievement> companyAchievement = JSONArray.parseArray(json1.get("data1").toString(), AchievementCompanyAchievement.class);
		List<AchievementTeamAchievement> achievementTeams = JSONArray.parseArray(json1.get("data2").toString(), AchievementTeamAchievement.class);

		map = achievementCompanyService.updateMoneySetting(companyAchievement.get(0), achievementTeams);

		return map;
	}

	/**
	 * 分页查询业绩
	 *
	 * @param companyAchievement
	 * @return
	 *
	 * @author 陈智颖
	 * @throws Exception
	 */
	@RequestMapping("/selectAchievementSetting")
	@ResponseBody
	public Map<String, Object> selectAchievementSetting(AchievementCompanyAchievement companyAchievement) {

		Map<String, Object> map = new HashMap<>();

		List<AchievementCompanyAchievement> companyAchievements = achievementCompanyService.selectCompanyAchievement(companyAchievement);
		List<AchievementCompanyAchievement> selectCompanyAchievementDate = achievementCompanyService.selectCompanyAchievementDate();
		AchievementSetting achievementSetting = achievementCompanyService.selectAchievementSetting();
		AchievementSettingDetails achievementSettingDetails = new AchievementSettingDetails();
		achievementSettingDetails.setAs_id(achievementSetting.getAs_id());
		List<AchievementSettingDetails> achievementSettingDetailsList = achievementCompanyService.selectAchievementSettingDetails(achievementSettingDetails);

		map.put("companyAchievements", companyAchievements);
		map.put("selectCompanyAchievementDate", selectCompanyAchievementDate);
		map.put("achievementSetting", achievementSetting);
		map.put("achievementSettingDetailsList", achievementSettingDetailsList);

		return map;
	}

	/**
	 * 设置业绩
	 *
	 * @param achievementSetting
	 * @return
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/submitAchievementSetting")
	@ResponseBody
	public Map<String, Object> submitAchievementSetting(AchievementSetting achievementSetting, String as_subsidyStr) {

		Map<String, Object> map = new HashMap<>();

		List<AchievementSettingDetails> achievementSettingDetailsList = new ArrayList<AchievementSettingDetails>();
		String[] split = as_subsidyStr.split(",");
		for (int i = 0; i < split.length; i++) {
			AchievementSettingDetails achievementSettingDetails = new AchievementSettingDetails();
			achievementSettingDetails.setAsd_type(split[i].split("-")[0]);
			achievementSettingDetails.setAsd_Proportion(Integer.valueOf(split[i].split("-")[1]));
			achievementSettingDetailsList.add(achievementSettingDetails);
		}

		map = achievementCompanyService.addMoneySetting(achievementSetting, achievementSettingDetailsList);

		return map;
	}

	/**
	 * 删除业绩目标设置
	 *
	 * @param achievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/removeDeleteAchievementSetting")
	@ResponseBody
	public Map<String, Object> removeDeleteAchievementSetting(AchievementCompanyAchievement achievement) {
		Map<String, Object> map = achievementCompanyService.deleteAchievementSetting(achievement);
		return map;
	}

	@RequestMapping("/selectContractBool")
	@ResponseBody
	public Map<String, Object> selectContractBool(AchievementCompanyAchievement achievement) {
		Map<String, Object> map = achievementCompanyService.updateContractBools();
		return map;
	}

	@RequestMapping("/selectAchivementMoney")
	@ResponseBody
	public Map<String, Object> selectAchivementMoney(String contractObject_No) {
		Map<String, Object> map = achievementCompanyService.addAchievementStatistics(contractObject_No, 0.0);
		return map;
	}

	/**
	 * 根据部门ID查询业绩统计
	 *
	 * @param startDate
	 *            开始时间
	 * @param endDate
	 *            结束时间
	 * @return
	 *
	 * @author 陈智颖
	 * @throws ParseException
	 */
	@RequestMapping("/selectUcAchivmentMoney")
	@ResponseBody
	public Map<String, Object> selectUcAchivmentMoney(String ucc_id, String startDate, String endDate) throws ParseException {

		Map<String, Object> map = new HashMap<>();
		AchievementSumAchievement achievementSumAchievement = new AchievementSumAchievement();
		achievementSumAchievement.setSa_uccID(ucc_id);
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		if (startDate != null && !startDate.equals("")) {
			achievementSumAchievement.setStartDate(sf.parse(startDate));
		}
		if (endDate != null && !endDate.equals("")) {
			achievementSumAchievement.setEndDate(sf.parse(endDate));
		}
		List<AchievementSumAchievement> achievementSumAchievements = achievementCompanyService.selectAchievementSumAchievement(achievementSumAchievement);

		if (!achievementSumAchievements.isEmpty()) {
			map.put("achievementSumAchievements", achievementSumAchievements);
			map.put("code", 200);
		}

		return map;
	}

	/**
	 * 合同剩余免租期计算
	 *
	 * @return
	 * @throws Exception
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/selectAchievementA")
	@ResponseBody
	public Map<String, Object> selectAchievementA() throws Exception {

		Map<String, Object> map = new HashMap<>();

		ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
		viewBusinessContractVo.setContractObject_Successor(0);
		List<ViewBusinessContractVo> viewBusinessContractVos = achievementCompanyService.selectContractDateToDate(viewBusinessContractVo);

		for (ViewBusinessContractVo viewBusinessContractVo2 : viewBusinessContractVos) {

			map = achievementCompanyService.addAchievementStatistics(viewBusinessContractVo2.getContractObject_No(), 0.0);

			ViewBusinessContractVo viewBusinessContractVo3 = new ViewBusinessContractVo();
			viewBusinessContractVo3.setContractObject_Successor(viewBusinessContractVo2.getContractObject_Id());
			List<ViewBusinessContractVo> selectContractDateToDate1 = achievementCompanyService.selectContractDateToDate(viewBusinessContractVo3);

			for (ViewBusinessContractVo viewBusinessContractVo4 : selectContractDateToDate1) {

				map = achievementCompanyService.addAchievementStatistics(viewBusinessContractVo4.getContractObject_No(), 0.0);

				ViewBusinessContractVo viewBusinessContractVo5 = new ViewBusinessContractVo();
				viewBusinessContractVo5.setContractObject_Successor(viewBusinessContractVo4.getContractObject_Id());
				List<ViewBusinessContractVo> selectContractDateToDate2 = achievementCompanyService.selectContractDateToDate(viewBusinessContractVo5);

				for (ViewBusinessContractVo viewBusinessContractVo6 : selectContractDateToDate2) {
					map = achievementCompanyService.addAchievementStatistics(viewBusinessContractVo6.getContractObject_No(), 0.0);
				}

			}

		}

		return map;
	}

	/**
	 * 根据合同编码修改招租期和剩余免租期
	 *
	 * @return
	 *
	 * @author 陈智颖
	 * @throws Exception
	 */
	@RequestMapping("/contractAchievementRent")
	@ResponseBody
	public Map<String, Object> contractAchievementRent() throws Exception {

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
		// viewBusinessContractVo.setContractObject_Successor(0);
		viewBusinessContractVo.setStartDate(sf.parse("2017-07-01"));
		viewBusinessContractVo.setEndDate(sf.parse(sf.format(new Date())));
		List<ViewBusinessContractVo> viewBusinessContractVos = achievementCompanyService.selectContractDateToDate(viewBusinessContractVo);

		Map<String, Object> map = new HashMap<>();
		//json = achievementCompanyAchievementService.upateAchievementRent("2170900092");
		for (ViewBusinessContractVo viewBusinessContractVo2 : viewBusinessContractVos) {

			map = achievementCompanyService.upateAchievementRent(viewBusinessContractVo2.getContractObject_No());


			/*
			ViewBusinessContractVo viewBusinessContractVo1 = new ViewBusinessContractVo();
			viewBusinessContractVo1.setContractObject_Successor(
			viewBusinessContractVo2.getContractObject_Id());
			List<ViewBusinessContractVo> selectContractDateToDate =
			achievementCompanyAchievementService.selectContractDateToDate(
			viewBusinessContractVo1); for (ViewBusinessContractVo
			viewBusinessContractVo3 : selectContractDateToDate) {

			json = achievementCompanyAchievementService.upateAchievementRent(
			viewBusinessContractVo3.getContractObject_No());

			ViewBusinessContractVo viewBusinessContractVo4 = new
			ViewBusinessContractVo();
			viewBusinessContractVo4.setContractObject_Successor(
			viewBusinessContractVo3.getContractObject_Id());
			List<ViewBusinessContractVo> selectContractDateToDate1 =
			achievementCompanyAchievementService.selectContractDateToDate(
			viewBusinessContractVo4); for (ViewBusinessContractVo
			viewBusinessContractVo5 : selectContractDateToDate1) { json =
			achievementCompanyAchievementService.upateAchievementRent(
			viewBusinessContractVo5.getContractObject_No());

			ViewBusinessContractVo viewBusinessContractVo6 = new
			ViewBusinessContractVo();
			viewBusinessContractVo6.setContractObject_Successor(
			viewBusinessContractVo5.getContractObject_Id());
			List<ViewBusinessContractVo> selectContractDateToDate2 =
			achievementCompanyAchievementService.selectContractDateToDate(
			viewBusinessContractVo6); for (ViewBusinessContractVo
			viewBusinessContractVo7 : selectContractDateToDate2) { json =
			achievementCompanyAchievementService.upateAchievementRent(
			viewBusinessContractVo7.getContractObject_No());
			}
			}
			}*/
		}

		return map;
	}

	/**
	 * 根据业绩编码查询业绩
	 *
	 * @param sa_id
	 * @return
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/selectUcAchivmentMoneyMore")
	@ResponseBody
	public Map<String, Object> selectUcAchivmentMoneyMore(Integer sa_id) {

		Map<String, Object> map = new HashMap<>();
		AchievementSumAchievement achievementSumAchievement = new AchievementSumAchievement();
		achievementSumAchievement.setSa_id(sa_id);
		List<AchievementSumAchievement> achievementSumAchievements = achievementCompanyService.selectAchievementSumAchievement(achievementSumAchievement);
		List<AchievementBill> achievementBills = achievementCompanyService.selectAchievementBilID(sa_id);
		List<AchievementBillContent> selectAchievementBillContents = new ArrayList<AchievementBillContent>();
		for (AchievementBill achievementBill : achievementBills) {
			List<AchievementBillContent> selectAchievementBillContent = achievementCompanyService.selectAchievementBillContent(achievementBill.getAb_id());
			for (AchievementBillContent achievementBillContent : selectAchievementBillContent) {
				selectAchievementBillContents.add(achievementBillContent);
			}
		}

		map.put("achievementSumAchievements", achievementSumAchievements);
		map.put("achievementBills", achievementBills);
		map.put("selectAchievementBillContents", selectAchievementBillContents);

		return map;
	}

	@RequestMapping("/achivmentContractObjectID")
	@ResponseBody
	public Map<String, Object> achivmentContractObjectID() {
		Map<String, Object> map = new HashMap<>();

		AchievementBill achievementBill = new AchievementBill();
		List<AchievementBill> achievementBillListByWhere = achievementCompanyService.selectAchievementBilABID(achievementBill);
		for (AchievementBill achievementBill2 : achievementBillListByWhere) {
			if (achievementBill2.getAb_acType().indexOf("出房") > -1 || achievementBill2.getAb_acType().indexOf("转租") > -1) {
				AchievementSumAchievement sumAchievement = new AchievementSumAchievement();
				sumAchievement.setSa_id(achievementBill2.getSa_id());
				sumAchievement.setContractObject_Id(achievementBill2.getContractObject_Id());
				achievementCompanyService.updateCompanyAchievementContID(sumAchievement);
			}
		}

		return map;
	}

	/**
	 * 修改房屋业绩
	 *
	 * @param json
	 * @return
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/achivmentMoneyUpdate")
	@ResponseBody
	public Map<String, Object> achivmentMoneyUpdate(String json) {
		JSONObject json1 = JSONObject.parseObject(json);
		AchievementSumAchievement achievementSumAchievement = JSONArray.parseArray(json1.get("data1").toString(), AchievementSumAchievement.class).get(0);
		List<AchievementBill> achievementBills = JSONArray.parseArray(json1.get("data2").toString(), AchievementBill.class);

		Map<String, Object> map = achievementCompanyService.updateAchievementHouseMoney(achievementSumAchievement, achievementBills);

		return map;
	}

	@RequestMapping("/testContract")
	@ResponseBody
	public Map<String, Object> testContract(String contractNo) throws Exception {

		Map<String, Object> map = new HashMap<>();
		map = achievementCompanyService.upateAchievementRent("1622000350");
		return map;
	}

	/**
	 * 根据账号查询业绩目标完成率
	 *
	 * @param response
	 * @param account
	 *            账号
	 * @return
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/myAchievement")
	@ResponseBody
	public Map<String, Object> myAchievement(HttpServletResponse response, String account) {
		// 跨域传输json
		response.addHeader("Access-Control-Allow-Origin", "*");
		Map<String, Object> map = new HashMap<>();

		ViewSumAchievement viewSumAchievement = new ViewSumAchievement();
		viewSumAchievement.setEm_account(account);
		List<ViewSumAchievement> achievementPerson = achievementCompanyService.selectAchievementPerson(viewSumAchievement);
		AchievementPersonAchievement achievementPersonAchievement = new AchievementPersonAchievement();
		achievementPersonAchievement.setEm_account(account);
		achievementPersonAchievement.setCa_startDate(new Date());
		List<AchievementPersonAchievement> achievementPersonTarget = achievementCompanyService.selectAchievementPersonTarget(achievementPersonAchievement);
		ViewBusinessContractRelaEmpVo empVo = new ViewBusinessContractRelaEmpVo();
		empVo.setEm_account(account);
		int myHouse = achievementCompanyService.selectMyHouse(empVo);

		double moneys = 0.0;
		double money = 0.0;
		int schedule = 0;
		for (ViewSumAchievement viewSumAchievement2 : achievementPerson) {
			moneys += viewSumAchievement2.getAb_newMoney();
			moneys += viewSumAchievement2.getAb_oldMoney();
		}

		if (!achievementPersonTarget.isEmpty()) {
			money = achievementPersonTarget.get(0).getPa_sum();
		}

		schedule = (int) (moneys / money * 100);
		map.put("evement", schedule);
		map.put("myHouse", myHouse);

		return map;
	}

	/**
	 * 查询月份合同并计算业绩
	 *
	 * @return
	 * @throws ParseException
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/selectAchievementHouse")
	@ResponseBody
	public Map<String, Object> selectAchievementHouse() throws ParseException {

		Map<String, Object> map = new HashMap<>();

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
		viewBusinessContractVo.setStartDate(sf.parse("2016-08-01"));
		viewBusinessContractVo.setEndDate(sf.parse(sf.format(new Date())));
		List<ViewBusinessContractVo> viewBusinessContractVos = achievementCompanyService.selectContractDateToDate(viewBusinessContractVo);
		for (ViewBusinessContractVo viewBusinessContractVo2 : viewBusinessContractVos) {
			// System.out.println(viewBusinessContractVo2.getContractObject_No());
			map = achievementCompanyService.addAchievementStatistics(viewBusinessContractVo2.getContractObject_No(), 0.0);
		}
		return map;
	}

	/**
	 * 查询业绩详情
	 *
	 * @param sa_id
	 * @return
	 *
	 * @author 陈智颖
	 * @param request
	 */
	@RequestMapping("/selectOneAchievement")
	@ResponseBody
	public String selectOneAchievement(Integer sa_id, HttpServletRequest request) {
		Msg<Object> msg = new Msg<>();
		HashMap<Object, Object> map = new HashMap<>();
		// 【获取总业绩】
		AchievementSumAchievement sumAchievement = new AchievementSumAchievement();
		sumAchievement.setSa_id(sa_id);
		List<AchievementSumAchievement> sumAchievements = achievementCompanyService.selectSumAchievementID(sumAchievement);
		if (sumAchievements.isEmpty()) {
			return msg.toString(110, "没有发现业绩");
		}
		// 【获取调整业绩】
		AchievementSumAchievement achievementSumAchievement = sumAchievements.get(0);
		AchievementRecord achievementRecord = new AchievementRecord();
		achievementRecord.setSa_id(sa_id);
		achievementRecord.setContractObject_Id(achievementSumAchievement.getContractObject_Id());
		achievementRecord = achievementCompanyService.queryAchiRecordLastOne(achievementRecord);
		if (achievementRecord != null) {
			achievementSumAchievement.setAr_content(achievementRecord.getAr_content());
			achievementSumAchievement.setAr_money(achievementRecord.getAr_money());
		}
		// 查询管家主管
		ViewBusinessContractVo contractVo = new ViewBusinessContractVo();
		contractVo.setContractObject_Id(achievementSumAchievement.getContractObject_Id());
		contractVo = contractObjectService.selectContractObjectByCNo(contractVo);
		if (contractVo != null) {
			UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
			userCenterEmployee.setEm_name(contractVo.getContractBody_GjName());
			userCenterEmployee.setEm_phone(contractVo.getContractBody_GjPhone());
			List<UserCenterEmployee> employees = employeeService.selectCompanyID(userCenterEmployee);
			if (!employees.isEmpty()) {
				achievementSumAchievement.setUcc_corporation(employees.get(0).getUcc_corporation());
			}
		}
		map.put("achievementTotal", achievementSumAchievement);

		// 【获取业绩账单列表】
		ViewSumAchievement viewSumAchievement = new ViewSumAchievement();
		viewSumAchievement.setSa_id(sa_id);
		List<ViewSumAchievement> viewSumAchievements = achievementCompanyService.queryAchievementBillList(viewSumAchievement);
		for (ViewSumAchievement viewSumAchievement1 : viewSumAchievements) {
			viewSumAchievement1.setAchievementBillContents(achievementCompanyService.selectAchievementBillContent(viewSumAchievement1.getAb_id()));
			// 查询业绩分成
			ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
			contractRelaEmpVo.setContractObject_Id(viewSumAchievement1.getContractObject_Id());
			contractRelaEmpVo.setEm_id(viewSumAchievement1.getEm_id());
			List<ViewBusinessContractRelaEmpVo> contractRelaEmp = contractObjectService.queryViewContractRelaEmp(contractRelaEmpVo);
			for (ViewBusinessContractRelaEmpVo contractRelaEmpVo1 : contractRelaEmp) {
				viewSumAchievement1.setContract_perforSplit(contractRelaEmpVo1.getContract_perforSplit());
			}
		}
		if (viewSumAchievements.isEmpty()) {
			return msg.toString(110, "没有发现业绩");
		}
		map.put("achievementSumList", viewSumAchievements);
		return msg.toString(map);
	}
	// public Map<String, Object> selectOneAchievement(Integer sa_id){
	// Map<String, Object> json = new HashMap<>();
	// ViewSumAchievement viewSumAchievement = new ViewSumAchievement();
	// viewSumAchievement.setSa_id(sa_id);
	// List<ViewSumAchievement> viewSumAchievements =
	// achievementCompanyAchievementService.selectAchievementSumMoney(viewSumAchievement);
	// List<AchievementBillContent> selectAchievementBillContents = new
	// ArrayList<AchievementBillContent>();
	// for (ViewSumAchievement viewSumAchievement1 : viewSumAchievements) {
	// List<AchievementBillContent> selectAchievementBillContent =
	// achievementCompanyAchievementService.selectAchievementBillContent(viewSumAchievement1.getAb_id());
	// for (AchievementBillContent achievementBillContent :
	// selectAchievementBillContent) {
	// selectAchievementBillContents.add(achievementBillContent);
	// }
	// }
	//
	// json.put("viewSumAchievements", viewSumAchievements.get(0));
	// json.put("selectAchievementBillContents", selectAchievementBillContents);
	//
	// return json;
	// }

	/**
	 * 根据统计业绩生成Excel表
	 *
	 * @param request
	 * @return
	 *
	 * @author 陈智颖
	 * @throws ParseException
	 */
	@RequestMapping("/achievementTOExcel")
	@ResponseBody
	public Map<String, Object> achievementTOExcel(HttpServletRequest request) throws ParseException {
		Map<String, Object> map = new HashMap<>();

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		ViewSumAchievement viewSumAchievement = new ViewSumAchievement();
		viewSumAchievement.setStartDate(sf.parse("2016-08-01"));
		viewSumAchievement.setEndDate(sf.parse("2016-08-31"));
		List<ViewSumAchievement> viewSumAchievements = achievementCompanyService.selectAchievementSumMoney(viewSumAchievement);
		ViewSumAchievement selectAchievementSumMoneys = achievementCompanyService.selectAchievementSumMoneys(viewSumAchievement);
		List<AchievementBillContent> selectAchievementBillContents = new ArrayList<AchievementBillContent>();
		for (ViewSumAchievement viewSumAchievement1 : viewSumAchievements) {
			List<AchievementBillContent> selectAchievementBillContent = achievementCompanyService.selectAchievementBillContent(viewSumAchievement1.getAb_id());
			for (AchievementBillContent achievementBillContent : selectAchievementBillContent) {
				selectAchievementBillContents.add(achievementBillContent);
			}
		}

		// 第一步，创建一个webbook，对应一个Excel文件
		HSSFWorkbook wb = new HSSFWorkbook();
		// 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
		HSSFSheet sheet = wb.createSheet("数据统计");
		// 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
		HSSFRow row = sheet.createRow((int) 0);
		// 第四步，创建单元格，并设置值表头 设置表头居中
		HSSFCellStyle style = wb.createCellStyle();
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

		HSSFCell cell = row.createCell(0);
		cell.setCellValue("组名");
		cell.setCellStyle(style);
		cell = row.createCell(1);
		cell.setCellValue("房源");
		cell.setCellStyle(style);
		cell = row.createCell(2);
		cell.setCellValue("姓名");
		cell.setCellStyle(style);
		cell = row.createCell(3);
		cell.setCellValue("存出状况");
		cell.setCellStyle(style);
		cell = row.createCell(4);
		cell.setCellValue("合同时间段");
		cell.setCellStyle(style);
		cell = row.createCell(5);
		cell.setCellValue("租金");
		cell = row.createCell(6);
		cell.setCellValue("付款方式");
		cell.setCellStyle(style);
		cell = row.createCell(7);
		cell.setCellValue("转租费");
		cell.setCellStyle(style);
		cell = row.createCell(8);
		cell.setCellValue("应提免租期");
		cell.setCellStyle(style);
		cell = row.createCell(9);
		cell.setCellValue("招租期");
		cell.setCellStyle(style);
		cell = row.createCell(10);
		cell.setCellValue("招租期亏损");
		cell.setCellStyle(style);
		cell = row.createCell(11);
		cell.setCellValue("管理费");
		cell.setCellStyle(style);
		cell = row.createCell(12);
		cell.setCellValue("资金成本");
		cell.setCellStyle(style);
		cell = row.createCell(13);
		cell.setCellValue("业绩补贴");
		cell.setCellStyle(style);
		cell = row.createCell(14);
		cell.setCellValue("差价");
		cell.setCellStyle(style);
		cell = row.createCell(15);
		cell.setCellValue("新业绩");
		cell.setCellStyle(style);
		cell = row.createCell(16);
		cell.setCellValue("旧业绩");
		cell.setCellStyle(style);
		cell = row.createCell(17);
		cell.setCellValue("提取方式");
		cell.setCellStyle(style);
		cell = row.createCell(18);
		cell.setCellValue("提取时间");
		cell.setCellStyle(style);
		cell = row.createCell(19);
		cell.setCellValue("套数");
		cell.setCellStyle(style);
		cell = row.createCell(20);
		cell.setCellValue("总业绩");
		cell.setCellStyle(style);
		cell = row.createCell(21);
		cell.setCellValue("总营收");
		cell.setCellStyle(style);
		cell = row.createCell(22);
		cell.setCellValue("服务费");
		cell.setCellStyle(style);

		// 第五步，写入实体数据 实际应用中这些数据从数据库得到，
		int i = 1;
		for (ViewSumAchievement viewSumAchievement1 : viewSumAchievements) {
			row = sheet.createRow((int) i);
			// 第四步，创建单元格，并设置值
			row.createCell(0).setCellValue(viewSumAchievement1.getUcc_name());
			row.createCell(1).setCellValue(viewSumAchievement1.getHouse_address());
			row.createCell(2).setCellValue(viewSumAchievement1.getEm_name());
			row.createCell(3).setCellValue(viewSumAchievement1.getAb_acType());
			if (viewSumAchievement1.getAb_acType().indexOf("出房") > -1) {
				row.createCell(4).setCellValue(viewSumAchievement1.getSa_startEndTime());
				row.createCell(5).setCellValue(viewSumAchievement1.getSa_outMoney() + "-" + viewSumAchievement1.getSa_outMoney2());
			} else {
				row.createCell(4).setCellValue(viewSumAchievement1.getSa_tStartEndTime());
				row.createCell(5).setCellValue(viewSumAchievement1.getSa_saveMoney() + "-" + viewSumAchievement1.getSa_saveMoney2());
			}
			row.createCell(6).setCellValue(viewSumAchievement1.getAb_moneyType());
			row.createCell(7).setCellValue(viewSumAchievement1.getSa_turnRentMoney());
			row.createCell(8).setCellValue(viewSumAchievement1.getSa_forRentDay());
			row.createCell(9).setCellValue(viewSumAchievement1.getSa_freeDay());
			row.createCell(10).setCellValue(viewSumAchievement1.getSa_lossMoney());
			for (AchievementBillContent achievementBillContent : selectAchievementBillContents) {
				if (viewSumAchievement1.getAb_id().equals(achievementBillContent.getAb_id())) {
					switch (achievementBillContent.getAbc_type()) {
					case "管理费":
						row.createCell(11).setCellValue(achievementBillContent.getAbc_money());
						break;
					case "资金成本":
						row.createCell(12).setCellValue(achievementBillContent.getAbc_money());
						break;
					case "业绩补贴":
						row.createCell(13).setCellValue(achievementBillContent.getAbc_money());
						break;
					default:
						break;
					}
				}
			}
			row.createCell(14).setCellValue(viewSumAchievement1.getSa_difference());
			row.createCell(15).setCellValue(viewSumAchievement1.getAb_newMoney());
			row.createCell(16).setCellValue(viewSumAchievement1.getAb_oldMoney());
			row.createCell(17).setCellValue(viewSumAchievement1.getAb_type());
			String date = "";
			if (viewSumAchievement1.getAb_payTime() != null && viewSumAchievement1.getAb_payTime() != null) {
				date = sf.format(viewSumAchievement1.getAb_payTime());
			}
			row.createCell(18).setCellValue(date);
			row.createCell(19).setCellValue(viewSumAchievement1.getAb_moneyPercentage());
			row.createCell(20).setCellValue(viewSumAchievement1.getSa_sumMoney());
			row.createCell(21).setCellValue(viewSumAchievement1.getSa_sumMoneyH());
			if (viewSumAchievement1.getAb_acType().indexOf("出房") > -1) {
				row.createCell(22).setCellValue(viewSumAchievement1.getSa_zRepairMoney());
			} else {
				row.createCell(22).setCellValue(viewSumAchievement1.getSa_tRepairMoney());
			}

			i++;
		}
		row = sheet.createRow((int) i + 1);
		row.createCell(0).setCellValue("房屋总数：");
		row.createCell(1).setCellValue(selectAchievementSumMoneys.getSize());
		row.createCell(2).setCellValue("总业绩：");
		row.createCell(3).setCellValue(selectAchievementSumMoneys.getSumMoney());
		// 第六步，将文件存到指定位置
		try {
			String fileName = (new Date()).getTime() + ".xls";
			String path = request.getSession().getServletContext().getRealPath("/");
			path += "/resources/excel";
			File file = new File(path);
			if (!file.exists()) {
				file.mkdir();
			}
			path += "/" + fileName;
			FileOutputStream fout = new FileOutputStream(path);
			wb.write(fout);
			fout.close();
			map.put("path", path);
			return map;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return map;
	}

	/**
	 * 房源利润
	 *
	 * @param
	 * @author 陈智颖
	 * @create 8/11/17 4:13 PM
	 * @return
	 **/
	@RequestMapping("/updateAchievementHouse")
	@ResponseBody
	public Map<String, Object> updateAchievementHouse(String startDate) throws ParseException {
		ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		viewBusinessContractVo.setStartDate(sdf.parse(startDate));
		viewBusinessContractVo.setContractObject_Type("租赁合同");
		Map<String, Object> map = new HashMap<>();
		//json = achievementCompanyAchievementService.updateAchievementHouse(viewBusinessContractVo1.getContractObject_No());
		List<ViewBusinessContractVo> viewBusinessContractVos = achievementCompanyService.selectContractDateToDate(viewBusinessContractVo);
		for (ViewBusinessContractVo viewBusinessContractVo1 :viewBusinessContractVos) {
			map = achievementCompanyService.updateAchievementHouse(viewBusinessContractVo1.getContractObject_No());
		}
		try {
			achievementCompanyService.queryHouseInfomationKeepContract(sdf.parse(startDate));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}

	/**
	 * 房源利润
	 *
	 * @param
	 * @author 陈智颖
	 * @create 8/11/17 4:13 PM
	 * @return
	 **/
	@RequestMapping("/updateAchievementGsManage")
	@ResponseBody
	public Map<String, Object> updateAchievementGsManage() throws ParseException {
		ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
		viewBusinessContractVo.setContractObject_Type("托管合同");
		Map<String, Object> map = new HashMap<>();
		List<ViewBusinessContractVo> viewBusinessContractVos = achievementCompanyService.selectContractDateToDate(viewBusinessContractVo);
		for (ViewBusinessContractVo viewBusinessContractVo1 :viewBusinessContractVos) {
			achievementCompanyService.gsManageBill(viewBusinessContractVo1.getContractObject_Code());
		}
		return map;
	}

	/**
	 * 查询房屋利润列表
	 *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 3:50 PM
	 * @return
	 **/
	@RequestMapping("/selectAchievementHouseMoneyNo")
	@ResponseBody
	public Map<String, Object> selectAchievementHouseMoneyNo(String dateStr, String dateStart, String dateEnd, String dateType, String type, Integer ucc_id) throws ParseException {
		Map<String,Object> map = new HashMap<>();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		AchievementHouseMoneyVo achievementHouseMoneyVo = new AchievementHouseMoneyVo();
		Calendar c = Calendar.getInstance();
		Date date = new Date();
		if (dateStr != null) {
			switch (dateStr) {
				case "今天":
					achievementHouseMoneyVo.setDateStart(sf.format(date));
					achievementHouseMoneyVo.setDateEnd(sf.format(date));
					break;
				case "最近一周":
					achievementHouseMoneyVo.setDateEnd(sf.format(date));
					c.setTime(date);
					c.add(Calendar.DAY_OF_MONTH, -7);
					achievementHouseMoneyVo.setDateStart(sf.format(c.getTime()));
					break;
				case "最近一月":
					achievementHouseMoneyVo.setDateEnd(sf.format(date));
					c.setTime(date);
					c.add(Calendar.MONTH, -1);
					achievementHouseMoneyVo.setDateStart(sf.format(c.getTime()));
					break;
				default:
					achievementHouseMoneyVo.setDateStart(dateStart);
					achievementHouseMoneyVo.setDateEnd(dateEnd);
					break;
			}
		}
		achievementHouseMoneyVo.setDateTitle(dateType);

		// 保留小数点后两位
		DecimalFormat df = new DecimalFormat("######0.00");
		List<AchievementHouseMoneyVo> achievementHouseMoneyVos = new ArrayList<>();
		if(type.equals("ucc")){
			achievementHouseMoneyVos = achievementCompanyService.selectAchievementHouseMoneyUcc(achievementHouseMoneyVo);
		}else{
			achievementHouseMoneyVo.setUcc_id(ucc_id);
			achievementHouseMoneyVos = achievementCompanyService.selectAchievementHouseMoneyNo(achievementHouseMoneyVo);
		}
		// 直接收入
		Double directIncome = 0.0;
		// 间接收入
		Double indirectIncome = 0.0;
		// 7月以前招租期亏损
		Double julyMoney = 0.0;
		AchievementSum achievementSum = new AchievementSum();
		// 直接收入租金差价
		Double ahm_directRent = 0.0;
		// 间接收入租金差价
		Double ahm_synopsisRent = 0.0;
		// 直接收入空置盈亏(免租期、招租期天数)
		Double ahm_directVacant = 0.0;
		// 间接收入空置期盈亏(免租期、招租期天数)
		Double ahm_synopsisVacant = 0.0;
		// 服务费用
		Double ahm_serviceMoney = 0.0;
		// 清洁费
		Double ahm_clearServiceMoney = 0.0;
		// 维修费用
		Double ahm_repairMoney = 0.0;
		// 违约金
		Double ahm_penalty = 0.0;
		// 转租费用
		Double ahm_subletMoney = 0.0;
		// 物管费
		Double ahm_wuguanMoney = 0.0;
		// 直接合作费
		Double ahm_directCooperateMoney = 0.0;
		// 间接合作费
		Double ahm_synosisCooperateMoney = 0.0;
		// 管理费
		Double ahm_manageMoney = 0.0;
		// 免租期
		Double ahm_forRentMoney = 0.0;
		// 招租期金额
		Double ahm_freeMoney = 0.0;
		// 直接出房提成
		Double ahm_directOutHouseMoney = 0.0;
		// 间接出房提成
		Double ahm_synopsisOutHouseMoney = 0.0;
		// 保险
		Double ahm_insurance = 0.0;
		// 经营费
		Double ahm_operateMoney = 0.0;
		// 门店基金
		Double storeFundMoney = 0.0;
		// 服务费提成
		Double serviceMoney = 0.0;
		// 其他费用
		Double ontherMoney = 0.0;
		// 直接收入
		Double directincome = 0.0;
		// 间接收入
		Double synopsisincome = 0.0;
		// 直接支出
		Double directpayment = 0.0;
		// 间接支出
		Double synopsispayment = 0.0;
		// 直接亏损
		Double directloss = 0.0;
		// 间接亏损
		Double synopsisLoss = 0.0;
		// 直接利润
		Double directProfit = 0.0;
		// 间接利润
		Double synopsisProfit = 0.0;
		// 公司管理费
		Double sumgsManageMoney = 0.0;
		for (AchievementHouseMoneyVo achievementHouseMoneyVo1 :achievementHouseMoneyVos) {
			// 直接收入
			Double income = 0.0;
			// 间接收入
			Double income1 = 0.0;
			// 直接支出
			Double expenditure = 0.0;
			// 间接支出
			Double expenditure1 = 0.0;
			// 直接亏损
			Double loss = 0.0;
			// 间接亏损
			Double loss1 = 0.0;
			// 其他
			achievementHouseMoneyVo1.setRentMoney("<label style='width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;'>"+achievementHouseMoneyVo1.getAhm_directRent()+"</label><label style='width:100%; display: block; text-align: right; padding-right: 10px;'>"+achievementHouseMoneyVo1.getAhm_synopsisRent()+"</label>");
			achievementHouseMoneyVo1.setRevenue("<label style='width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;'>"+achievementHouseMoneyVo1.getAhm_directVacant()+"</label><label style='width:100%; display: block; text-align: right; padding-right: 10px;'>"+achievementHouseMoneyVo1.getAhm_synopsisVacant()+"</label>");
			// 其他费用
			achievementHouseMoneyVo1.setOntherMoney(achievementHouseMoneyVo1.getAhm_wuguanMoney()+achievementHouseMoneyVo1.getAhm_waterMoney()+
					achievementHouseMoneyVo1.getAhm_electricMoney()+
					achievementHouseMoneyVo1.getAhm_gasMoney());
			achievementHouseMoneyVo1.setOntherMoney(Double.valueOf(df.format(achievementHouseMoneyVo1.getOntherMoney())));

			List<Double> serviceMoneys = new ArrayList<>();
			// 服务费
			if(type.equals("ucc")) {
				serviceMoneys = achievementCompanyService.updateAchievementService(achievementHouseMoneyVo1.getUcc_id(),null, dateStart, dateEnd);
			}else{
				serviceMoneys = achievementCompanyService.updateAchievementService(null,achievementHouseMoneyVo1.getHi_code(), dateStart, dateEnd);
			}
			achievementHouseMoneyVo1.setAhm_clearServiceMoney(serviceMoneys.get(0));
			achievementHouseMoneyVo1.setAhm_repairMoney(serviceMoneys.get(1));

			sumgsManageMoney += achievementHouseMoneyVo1.getAhm_gsmanageMoney();

			// 收入
			income = Double.valueOf(df.format(achievementHouseMoneyVo1.getAhm_directRent()+achievementHouseMoneyVo1.getAhm_forRentMoney()+achievementHouseMoneyVo1.getAhm_manageMoney()));
			income1 = Double.valueOf(df.format(
					achievementHouseMoneyVo1.getAhm_synopsisRent()+
							achievementHouseMoneyVo1.getAhm_serviceMoney()+
							achievementHouseMoneyVo1.getAhm_penalty()+
							achievementHouseMoneyVo1.getAhm_subletMoney()));
			achievementHouseMoneyVo1.setIncome("<label style='width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;'>"+income+"</label><label style='width:100%; display: block; text-align: right; padding-right: 10px;'>"+ income1+"</label>");

			// 门店基金
			achievementHouseMoneyVo1.setStoreFundMoney(-(achievementHouseMoneyVo1.getAhm_serviceMoney()*0.8));
			achievementHouseMoneyVo1.setServiceMoney(-(achievementHouseMoneyVo1.getAhm_serviceMoney()*0.2));

			// 支出
			Double clearServiceMoney = 0.0;
			if(achievementHouseMoneyVo1.getAhm_clearServiceMoney() != null){
				clearServiceMoney = achievementHouseMoneyVo1.getAhm_clearServiceMoney();
			}
			expenditure = Double.valueOf(df.format(achievementHouseMoneyVo1.getAhm_directCooperateMoney()+achievementHouseMoneyVo1.getAhm_directOutHouseMoney()+achievementHouseMoneyVo1.getAhm_insurance()+achievementHouseMoneyVo1.getAhm_operateMoney()+achievementHouseMoneyVo1.getAhm_gsmanageMoney()));
			expenditure1 = Double.valueOf(df.format(achievementHouseMoneyVo1.getAhm_synosisCooperateMoney()
					+clearServiceMoney
					+achievementHouseMoneyVo1.getAhm_repairMoney()
					+achievementHouseMoneyVo1.getServiceMoney()
					+achievementHouseMoneyVo1.getStoreFundMoney()
					+achievementHouseMoneyVo1.getAhm_synopsisOutHouseMoney()
			));
			achievementHouseMoneyVo1.setPayment("<label style='width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;'>"+(expenditure == 0.0?0.0:-expenditure)+"</label><label style='width:100%; display: block; text-align: right; padding-right: 10px;'>"+(expenditure1 == 0.0?0.0:-expenditure1)+"</label>");

			// 亏损
			loss = Double.valueOf(df.format(achievementHouseMoneyVo1.getAhm_directVacant()+ achievementHouseMoneyVo1.getAhm_waterMoney()+achievementHouseMoneyVo1.getAhm_electricMoney()+
					achievementHouseMoneyVo1.getAhm_gasMoney()+achievementHouseMoneyVo1.getAhm_wuguanMoney()));
			loss1 = Double.valueOf(df.format(achievementHouseMoneyVo1.getAhm_synopsisVacant()));
			achievementHouseMoneyVo1.setLoss("<label style='width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;'>"+(loss == 0.0?0.0:-loss)+"</label><label style='width:100%; display: block; text-align: right; padding-right: 10px;'>"+(loss1 == 0.0?0.0:-loss1)+"</label>");

			// 利润
			achievementHouseMoneyVo1.setProfit("<label style='width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;'>"+df.format(income+expenditure+loss)+"</label><label style='width:100%; display: block; text-align: right; padding-right: 10px;'>"+df.format(income1+expenditure1+loss1)+"</label>");

			directIncome += achievementHouseMoneyVo1.getAhm_directRent()+achievementHouseMoneyVo1.getAhm_forRentMoney()+achievementHouseMoneyVo1.getAhm_manageMoney()+achievementHouseMoneyVo1.getAhm_directCooperateMoney()+achievementHouseMoneyVo1.getAhm_directVacant()+achievementHouseMoneyVo1.getAhm_directOutHouseMoney()+achievementHouseMoneyVo1.getAhm_insurance()+achievementHouseMoneyVo1.getAhm_operateMoney();
			indirectIncome += Double.valueOf(df.format(
					achievementHouseMoneyVo1.getAhm_synopsisRent()+
							achievementHouseMoneyVo1.getAhm_serviceMoney()+
							achievementHouseMoneyVo1.getAhm_penalty()+
							achievementHouseMoneyVo1.getAhm_subletMoney()+
							achievementHouseMoneyVo1.getAhm_synosisCooperateMoney()+
							achievementHouseMoneyVo1.getAhm_synopsisVacant()+
							achievementHouseMoneyVo1.getAhm_synopsisOutHouseMoney()
			));

			julyMoney += achievementHouseMoneyVo1.getAhm_julyOldMoney();

			// 总收入小计
			ahm_directRent += achievementHouseMoneyVo1.getAhm_directRent();
			ahm_synopsisRent += achievementHouseMoneyVo1.getAhm_synopsisRent();
			ahm_directVacant += achievementHouseMoneyVo1.getAhm_directVacant();
			ahm_synopsisVacant += achievementHouseMoneyVo1.getAhm_synopsisVacant();
			ahm_serviceMoney += achievementHouseMoneyVo1.getAhm_serviceMoney();
			ahm_clearServiceMoney += clearServiceMoney;
			ahm_repairMoney += achievementHouseMoneyVo1.getAhm_repairMoney();
			ahm_penalty += achievementHouseMoneyVo1.getAhm_penalty();
			ahm_subletMoney += achievementHouseMoneyVo1.getAhm_subletMoney();
			ahm_wuguanMoney += achievementHouseMoneyVo1.getAhm_wuguanMoney();
			ahm_directCooperateMoney += achievementHouseMoneyVo1.getAhm_directCooperateMoney();
			ahm_synosisCooperateMoney += achievementHouseMoneyVo1.getAhm_synosisCooperateMoney();
			ahm_manageMoney += achievementHouseMoneyVo1.getAhm_manageMoney();
			ahm_forRentMoney += achievementHouseMoneyVo1.getAhm_forRentMoney();
			ahm_freeMoney += achievementHouseMoneyVo1.getAhm_freeMoney();
			ahm_directOutHouseMoney += achievementHouseMoneyVo1.getAhm_directOutHouseMoney();
			ahm_synopsisOutHouseMoney += achievementHouseMoneyVo1.getAhm_synopsisOutHouseMoney();
			ahm_insurance += achievementHouseMoneyVo1.getAhm_insurance();
			ahm_operateMoney += achievementHouseMoneyVo1.getAhm_operateMoney();
			storeFundMoney += achievementHouseMoneyVo1.getStoreFundMoney();
			serviceMoney += achievementHouseMoneyVo1.getServiceMoney();
			ontherMoney += achievementHouseMoneyVo1.getOntherMoney();
		}
		map.put("dateTime1",achievementHouseMoneyVo.getDateStart());
		map.put("dateTime2",achievementHouseMoneyVo.getDateEnd());
		if(!achievementHouseMoneyVos.isEmpty()){
			//总收入小计收入
			directincome += ahm_directRent+ahm_forRentMoney+ahm_manageMoney;
			synopsisincome += ahm_synopsisRent+ahm_serviceMoney+ahm_penalty+ahm_subletMoney;
			//总收入小计支出
			directpayment += ahm_directCooperateMoney+ahm_directOutHouseMoney+ahm_insurance+sumgsManageMoney;
			synopsispayment += ahm_synosisCooperateMoney+ahm_synopsisOutHouseMoney+ahm_clearServiceMoney+ahm_repairMoney+serviceMoney+storeFundMoney;
			//总收入小计亏损
			directloss += ahm_directVacant+ontherMoney;
			synopsisLoss += ahm_synopsisVacant;
			//总收入小计利润
			directProfit += directincome+directpayment+directloss;
			synopsisProfit += synopsisincome+synopsispayment+synopsisLoss;
			if(sumgsManageMoney < 0){
				achievementSum.setSumgsManageMoney(-sumgsManageMoney);
			}else{
				achievementSum.setSumgsManageMoney(sumgsManageMoney);
			}
			achievementSum.setJulyMoney(-Double.valueOf(df.format(julyMoney)));
			achievementSum.setDirectIncome(Double.valueOf(df.format(directIncome)));
			achievementSum.setIndirectIncome(Double.valueOf(df.format(indirectIncome)));
			achievementSum.setSumIncome(Double.valueOf(df.format(directIncome+indirectIncome)));
			achievementSum.setAhm_directRent(Double.valueOf(df.format(ahm_directRent)));
			achievementSum.setAhm_synopsisRent(Double.valueOf(df.format(ahm_synopsisRent)));
			achievementSum.setAhm_directVacant(Double.valueOf(df.format(ahm_directVacant)));
			achievementSum.setAhm_synopsisVacant(Double.valueOf(df.format(ahm_synopsisVacant)));
			achievementSum.setAhm_serviceMoney(Double.valueOf(df.format(ahm_serviceMoney)));
			achievementSum.setAhm_clearServiceMoney(Double.valueOf(df.format(ahm_clearServiceMoney)));
			achievementSum.setAhm_repairMoney(Double.valueOf(df.format(ahm_repairMoney)));
			achievementSum.setAhm_penalty(Double.valueOf(df.format(ahm_penalty)));
			achievementSum.setAhm_subletMoney(Double.valueOf(df.format(ahm_subletMoney)));
			achievementSum.setAhm_wuguanMoney(Double.valueOf(df.format(ahm_wuguanMoney)));
			achievementSum.setAhm_directCooperateMoney(Double.valueOf(df.format(ahm_directCooperateMoney)));
			achievementSum.setAhm_synosisCooperateMoney(Double.valueOf(df.format(ahm_synosisCooperateMoney)));
			achievementSum.setAhm_manageMoney(Double.valueOf(df.format(ahm_manageMoney)));
			achievementSum.setAhm_forRentMoney(Double.valueOf(df.format(ahm_forRentMoney)));
			achievementSum.setAhm_freeMoney(Double.valueOf(df.format(ahm_freeMoney)));
			achievementSum.setAhm_directOutHouseMoney(Double.valueOf(df.format(ahm_directOutHouseMoney)));
			achievementSum.setAhm_synopsisOutHouseMoney(Double.valueOf(df.format(ahm_synopsisOutHouseMoney)));
			achievementSum.setAhm_insurance(Double.valueOf(df.format(ahm_insurance)));
			achievementSum.setAhm_operateMoney(Double.valueOf(df.format(ahm_operateMoney)));
			achievementSum.setStoreFundMoney(Double.valueOf(df.format(storeFundMoney)));
			achievementSum.setServiceMoney(Double.valueOf(df.format(serviceMoney)));
			achievementSum.setOntherMoney(Double.valueOf(df.format(ontherMoney)));
			achievementSum.setDirectincome(Double.valueOf(df.format(directincome)));
			achievementSum.setSynopsisincome(Double.valueOf(df.format(synopsisincome)));
			achievementSum.setDirectpayment(Double.valueOf(df.format(directpayment)));
			achievementSum.setSynopsispayment(Double.valueOf(df.format(synopsispayment)));
			achievementSum.setDirectloss(Double.valueOf(df.format(directloss)));
			achievementSum.setSynopsisLoss(Double.valueOf(df.format(synopsisLoss)));
			achievementSum.setDirectProfit(Double.valueOf(df.format(directProfit)));
			achievementSum.setSynopsisProfit(Double.valueOf(df.format(synopsisProfit)));
			map.put("data",achievementHouseMoneyVos);
			map.put("sum",achievementSum);
			map.put("code",200);
		}else{
			map.put("code",401);
		}

		return map;
	}

	/**
	 * 房屋利润表部门
	 *
	 * @param request
	 * @return
	 *
	 * @author 陈智颖
	 * @throws ParseException
	 */
	@RequestMapping("/uccHouseAchievementTOExcel")
	@ResponseBody
	public Map<String, Object> uccHouseAchievementTOExcel(HttpServletRequest request, String dateStr, String dateStart, String dateEnd, String dateType, String type, Integer ucc_id) throws ParseException {
		Map<String, Object> map = new HashMap<>();

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		AchievementHouseMoneyVo achievementHouseMoneyVo = new AchievementHouseMoneyVo();
		Calendar c = Calendar.getInstance();
		Date date = new Date();
		if (dateStr != null) {
			switch (dateStr) {
				case "今天":
					achievementHouseMoneyVo.setDateStart(sf.format(date));
					achievementHouseMoneyVo.setDateEnd(sf.format(date));
					break;
				case "最近一周":
					achievementHouseMoneyVo.setDateEnd(sf.format(date));
					c.setTime(date);
					c.add(Calendar.DAY_OF_MONTH, -7);
					achievementHouseMoneyVo.setDateStart(sf.format(c.getTime()));
					break;
				case "最近一月":
					achievementHouseMoneyVo.setDateEnd(sf.format(date));
					c.setTime(date);
					c.add(Calendar.MONTH, -1);
					achievementHouseMoneyVo.setDateStart(sf.format(c.getTime()));
					break;
				default:
					achievementHouseMoneyVo.setDateStart(dateStart);
					achievementHouseMoneyVo.setDateEnd(dateEnd);
					break;
			}
		}
		achievementHouseMoneyVo.setDateTitle(dateType);

		// 保留小数点后两位
		DecimalFormat df = new DecimalFormat("######0.00");
		List<AchievementHouseMoneyVo> achievementHouseMoneyVos = new ArrayList<>();
		if(type.equals("ucc")){
			achievementHouseMoneyVos = achievementCompanyService.selectAchievementHouseMoneyUcc(achievementHouseMoneyVo);
		}else{
			achievementHouseMoneyVo.setUcc_id(ucc_id);
			achievementHouseMoneyVos = achievementCompanyService.selectAchievementHouseMoneyNo(achievementHouseMoneyVo);
		}
		// 直接收入
		Double directIncome = 0.0;
		// 间接收入
		Double indirectIncome = 0.0;
		// 7月以前招租期亏损
		Double julyMoney = 0.0;
		AchievementSum achievementSum = new AchievementSum();
		// 直接收入租金差价
		Double ahm_directRent = 0.0;
		// 间接收入租金差价
		Double ahm_synopsisRent = 0.0;
		// 直接收入空置盈亏(免租期、招租期天数)
		Double ahm_directVacant = 0.0;
		// 间接收入空置期盈亏(免租期、招租期天数)
		Double ahm_synopsisVacant = 0.0;
		// 服务费用
		Double ahm_serviceMoney = 0.0;
		// 清洁费
		Double ahm_clearServiceMoney = 0.0;
		// 维修费用
		Double ahm_repairMoney = 0.0;
		// 违约金
		Double ahm_penalty = 0.0;
		// 转租费用
		Double ahm_subletMoney = 0.0;
		// 物管费
		Double ahm_wuguanMoney = 0.0;
		// 直接合作费
		Double ahm_directCooperateMoney = 0.0;
		// 间接合作费
		Double ahm_synosisCooperateMoney = 0.0;
		// 管理费
		Double ahm_manageMoney = 0.0;
		// 免租期
		Double ahm_forRentMoney = 0.0;
		// 招租期金额
		Double ahm_freeMoney = 0.0;
		// 直接出房提成
		Double ahm_directOutHouseMoney = 0.0;
		// 间接出房提成
		Double ahm_synopsisOutHouseMoney = 0.0;
		// 保险
		Double ahm_insurance = 0.0;
		// 经营费
		Double ahm_operateMoney = 0.0;
		// 门店基金
		Double storeFundMoney = 0.0;
		// 服务费提成
		Double serviceMoney = 0.0;
		// 其他费用
		Double ontherMoney = 0.0;
		// 直接收入
		Double directincome = 0.0;
		// 间接收入
		Double synopsisincome = 0.0;
		// 直接支出
		Double directpayment = 0.0;
		// 间接支出
		Double synopsispayment = 0.0;
		// 直接亏损
		Double directloss = 0.0;
		// 间接亏损
		Double synopsisLoss = 0.0;
		// 直接利润
		Double directProfit = 0.0;
		// 间接利润
		Double synopsisProfit = 0.0;
		// 公司管理费
		Double sumgsManageMoney = 0.0;

		// 第一步，创建一个webbook，对应一个Excel文件
		HSSFWorkbook wb = new HSSFWorkbook();
		// 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
		HSSFSheet sheet = wb.createSheet("数据统计");
		// 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
		HSSFRow row = sheet.createRow((int) 0);
		// 第四步，创建单元格，并设置值表头 设置表头居中
		HSSFCellStyle style = wb.createCellStyle();
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

		HSSFCell cell = row.createCell(0);
		if(type.equals("ucc")){
			cell.setCellValue("部门名称");
		}else{
			cell.setCellValue("房源名称");
		}
		cell.setCellStyle(style);
		cell = row.createCell(1);
		cell.setCellValue("费用类型");
		cell.setCellStyle(style);
		cell = row.createCell(2);
		cell.setCellValue("租金差价");
		cell.setCellStyle(style);
		cell = row.createCell(3);
		cell.setCellValue("免租期");
		cell.setCellStyle(style);
		cell = row.createCell(4);
		cell.setCellValue("管理费");
		cell.setCellStyle(style);
		cell = row.createCell(5);
		cell.setCellValue("服务费");
		cell.setCellStyle(style);
		cell = row.createCell(6);
		cell.setCellValue("违约金(计入：强收、强退，未计入：房东违约、定金违约)");
		cell.setCellStyle(style);
		cell = row.createCell(7);
		cell.setCellValue("转租费");
		cell.setCellStyle(style);
		cell = row.createCell(8);
		cell.setCellValue("小计");
		cell.setCellStyle(style);
		cell = row.createCell(9);
		cell.setCellValue("合作费");
		cell.setCellStyle(style);
		cell = row.createCell(10);
		cell.setCellValue("清洁费");
		cell.setCellStyle(style);
		cell = row.createCell(11);
		cell.setCellValue("维修费");
		cell.setCellStyle(style);
		cell = row.createCell(12);
		cell.setCellValue("物品配置");
		cell.setCellStyle(style);
		cell = row.createCell(13);
		cell.setCellValue("出房提成");
		cell.setCellStyle(style);
		cell = row.createCell(14);
		cell.setCellValue("保险");
		cell.setCellStyle(style);
		cell = row.createCell(15);
		cell.setCellValue("公司管理费");
		cell.setCellStyle(style);
		cell = row.createCell(16);
		cell.setCellValue("公司违约金");
		cell.setCellStyle(style);
		cell = row.createCell(17);
		cell.setCellValue("经营费用");
		cell.setCellStyle(style);
		cell = row.createCell(18);
		cell.setCellValue("服务费提成");
		cell.setCellStyle(style);
		cell = row.createCell(19);
		cell.setCellValue("门店基金");
		cell.setCellStyle(style);
		cell = row.createCell(20);
		cell.setCellValue("门店奖金");
		cell.setCellStyle(style);
		cell = row.createCell(21);
		cell.setCellValue("小计");
		cell.setCellStyle(style);
		cell = row.createCell(22);
		cell.setCellValue("空置期亏损");
		cell.setCellStyle(style);
		cell = row.createCell(23);
		cell.setCellValue("其他费用（物管费、水、电、气）");
		cell.setCellStyle(style);
		cell = row.createCell(24);
		cell.setCellValue("小计");
		cell.setCellStyle(style);
		cell = row.createCell(25);
		cell.setCellValue("税费");
		cell.setCellStyle(style);
		cell = row.createCell(26);
		cell.setCellValue("利润");
		cell.setCellStyle(style);

		// 第五步，写入实体数据 实际应用中这些数据从数据库得到，
		int i = 1;
		for (AchievementHouseMoneyVo achievementHouseMoneyVo1 :achievementHouseMoneyVos) {
			// 直接收入
			Double income = 0.0;
			// 间接收入
			Double income1 = 0.0;
			// 直接支出
			Double expenditure = 0.0;
			// 间接支出
			Double expenditure1 = 0.0;
			// 直接亏损
			Double loss = 0.0;
			// 间接亏损
			Double loss1 = 0.0;
			// 其他
			achievementHouseMoneyVo1.setRentMoney("<label style='width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;'>"+achievementHouseMoneyVo1.getAhm_directRent()+"</label><label style='width:100%; display: block; text-align: right; padding-right: 10px;'>"+achievementHouseMoneyVo1.getAhm_synopsisRent()+"</label>");
			achievementHouseMoneyVo1.setRevenue("<label style='width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;'>"+achievementHouseMoneyVo1.getAhm_directVacant()+"</label><label style='width:100%; display: block; text-align: right; padding-right: 10px;'>"+achievementHouseMoneyVo1.getAhm_synopsisVacant()+"</label>");
			// 其他费用
			achievementHouseMoneyVo1.setOntherMoney(achievementHouseMoneyVo1.getAhm_wuguanMoney()+achievementHouseMoneyVo1.getAhm_waterMoney()+
					achievementHouseMoneyVo1.getAhm_electricMoney()+
					achievementHouseMoneyVo1.getAhm_gasMoney());
			achievementHouseMoneyVo1.setOntherMoney(Double.valueOf(df.format(achievementHouseMoneyVo1.getOntherMoney())));

			// 服务费
			List<Double> serviceMoneys = new ArrayList<>();
			if(type.equals("ucc")) {
				serviceMoneys = achievementCompanyService.updateAchievementService(achievementHouseMoneyVo1.getUcc_id(),null, dateStart, dateEnd);
			}else{
				serviceMoneys = achievementCompanyService.updateAchievementService(null,achievementHouseMoneyVo1.getHi_code(), dateStart, dateEnd);
			}

			achievementHouseMoneyVo1.setAhm_clearServiceMoney(serviceMoneys.get(0));
			achievementHouseMoneyVo1.setAhm_repairMoney(serviceMoneys.get(1));

			sumgsManageMoney += achievementHouseMoneyVo1.getAhm_gsmanageMoney();

			// 收入
			income = Double.valueOf(df.format(achievementHouseMoneyVo1.getAhm_directRent()+achievementHouseMoneyVo1.getAhm_forRentMoney()+achievementHouseMoneyVo1.getAhm_manageMoney()));
			income1 = Double.valueOf(df.format(
					achievementHouseMoneyVo1.getAhm_synopsisRent()+
							achievementHouseMoneyVo1.getAhm_serviceMoney()+
							achievementHouseMoneyVo1.getAhm_penalty()+
							achievementHouseMoneyVo1.getAhm_subletMoney()));
			achievementHouseMoneyVo1.setIncome("<label style='width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;'>"+income+"</label><label style='width:100%; display: block; text-align: right; padding-right: 10px;'>"+ income1+"</label>");

			// 门店基金
			achievementHouseMoneyVo1.setStoreFundMoney(-(achievementHouseMoneyVo1.getAhm_serviceMoney()*0.8));
			achievementHouseMoneyVo1.setServiceMoney(-(achievementHouseMoneyVo1.getAhm_serviceMoney()*0.2));

			// 支出
			Double clearServiceMoney = 0.0;
			if(achievementHouseMoneyVo1.getAhm_clearServiceMoney() != null){
				clearServiceMoney = achievementHouseMoneyVo1.getAhm_clearServiceMoney();
			}
			expenditure = Double.valueOf(df.format(achievementHouseMoneyVo1.getAhm_directCooperateMoney()+achievementHouseMoneyVo1.getAhm_directOutHouseMoney()+achievementHouseMoneyVo1.getAhm_insurance()+achievementHouseMoneyVo1.getAhm_operateMoney()+achievementHouseMoneyVo1.getAhm_gsmanageMoney()));
			expenditure1 = Double.valueOf(df.format(achievementHouseMoneyVo1.getAhm_synosisCooperateMoney()
					+clearServiceMoney
					+achievementHouseMoneyVo1.getAhm_repairMoney()
					+achievementHouseMoneyVo1.getServiceMoney()
					+achievementHouseMoneyVo1.getStoreFundMoney()
					+achievementHouseMoneyVo1.getAhm_synopsisOutHouseMoney()
			));
			achievementHouseMoneyVo1.setPayment("<label style='width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;'>"+(expenditure == 0.0?0.0:-expenditure)+"</label><label style='width:100%; display: block; text-align: right; padding-right: 10px;'>"+(expenditure1 == 0.0?0.0:-expenditure1)+"</label>");

			// 亏损
			loss = Double.valueOf(df.format(achievementHouseMoneyVo1.getAhm_directVacant()+ achievementHouseMoneyVo1.getAhm_waterMoney()+achievementHouseMoneyVo1.getAhm_electricMoney()+
					achievementHouseMoneyVo1.getAhm_gasMoney()+achievementHouseMoneyVo1.getAhm_wuguanMoney()));
			loss1 = Double.valueOf(df.format(achievementHouseMoneyVo1.getAhm_synopsisVacant()));
			achievementHouseMoneyVo1.setLoss("<label style='width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;'>"+(loss == 0.0?0.0:-loss)+"</label><label style='width:100%; display: block; text-align: right; padding-right: 10px;'>"+(loss1 == 0.0?0.0:-loss1)+"</label>");

			// 利润
			achievementHouseMoneyVo1.setProfit("<label style='width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;'>"+df.format(income+expenditure+loss)+"</label><label style='width:100%; display: block; text-align: right; padding-right: 10px;'>"+df.format(income1+expenditure1+loss1)+"</label>");

			directIncome += achievementHouseMoneyVo1.getAhm_directRent()+achievementHouseMoneyVo1.getAhm_forRentMoney()+achievementHouseMoneyVo1.getAhm_manageMoney()+achievementHouseMoneyVo1.getAhm_directCooperateMoney()+achievementHouseMoneyVo1.getAhm_directVacant()+achievementHouseMoneyVo1.getAhm_directOutHouseMoney()+achievementHouseMoneyVo1.getAhm_insurance()+achievementHouseMoneyVo1.getAhm_operateMoney();
			indirectIncome += Double.valueOf(df.format(
					achievementHouseMoneyVo1.getAhm_synopsisRent()+
							achievementHouseMoneyVo1.getAhm_serviceMoney()+
							achievementHouseMoneyVo1.getAhm_penalty()+
							achievementHouseMoneyVo1.getAhm_subletMoney()+
							achievementHouseMoneyVo1.getAhm_synosisCooperateMoney()+
							achievementHouseMoneyVo1.getAhm_synopsisVacant()+
							achievementHouseMoneyVo1.getAhm_synopsisOutHouseMoney()
			));

			julyMoney += achievementHouseMoneyVo1.getAhm_julyOldMoney();

			// 总收入小计
			ahm_directRent += achievementHouseMoneyVo1.getAhm_directRent();
			ahm_synopsisRent += achievementHouseMoneyVo1.getAhm_synopsisRent();
			ahm_directVacant += achievementHouseMoneyVo1.getAhm_directVacant();
			ahm_synopsisVacant += achievementHouseMoneyVo1.getAhm_synopsisVacant();
			ahm_serviceMoney += achievementHouseMoneyVo1.getAhm_serviceMoney();
			ahm_clearServiceMoney += clearServiceMoney;
			ahm_repairMoney += achievementHouseMoneyVo1.getAhm_repairMoney();
			ahm_penalty += achievementHouseMoneyVo1.getAhm_penalty();
			ahm_subletMoney += achievementHouseMoneyVo1.getAhm_subletMoney();
			ahm_wuguanMoney += achievementHouseMoneyVo1.getAhm_wuguanMoney();
			ahm_directCooperateMoney += achievementHouseMoneyVo1.getAhm_directCooperateMoney();
			ahm_synosisCooperateMoney += achievementHouseMoneyVo1.getAhm_synosisCooperateMoney();
			ahm_manageMoney += achievementHouseMoneyVo1.getAhm_manageMoney();
			ahm_forRentMoney += achievementHouseMoneyVo1.getAhm_forRentMoney();
			ahm_freeMoney += achievementHouseMoneyVo1.getAhm_freeMoney();
			ahm_directOutHouseMoney += achievementHouseMoneyVo1.getAhm_directOutHouseMoney();
			ahm_synopsisOutHouseMoney += achievementHouseMoneyVo1.getAhm_synopsisOutHouseMoney();
			ahm_insurance += achievementHouseMoneyVo1.getAhm_insurance();
			ahm_operateMoney += achievementHouseMoneyVo1.getAhm_operateMoney();
			storeFundMoney += achievementHouseMoneyVo1.getStoreFundMoney();
			serviceMoney += achievementHouseMoneyVo1.getServiceMoney();
			ontherMoney += achievementHouseMoneyVo1.getOntherMoney();

			// 合并单元格
			sheet.addMergedRegion(new CellRangeAddress(
					i, //from 行
					i+1, //to 行
					0, //from 列
					0  //to 列
			));
			row = sheet.createRow((int) i);
			// 第四步，创建单元格，并设置值
			if(type.equals("ucc")){
				row.createCell(0).setCellValue(achievementHouseMoneyVo1.getUcc_name());
			}else{
				row.createCell(0).setCellValue(achievementHouseMoneyVo1.getHouse_address());
			}
			row.createCell(1).setCellValue("直接");
			row.createCell(2).setCellValue(achievementHouseMoneyVo1.getAhm_directRent());
			row.createCell(3).setCellValue(achievementHouseMoneyVo1.getAhm_forRentMoney());
			row.createCell(4).setCellValue(achievementHouseMoneyVo1.getAhm_manageMoney());
			row.createCell(5).setCellValue("-");
			row.createCell(6).setCellValue("-");
			row.createCell(7).setCellValue("-");
			row.createCell(8).setCellValue(income);
			if(achievementHouseMoneyVo1.getAhm_directCooperateMoney() < 0) {
				row.createCell(9).setCellValue(-achievementHouseMoneyVo1.getAhm_directCooperateMoney());
			}else{
				row.createCell(9).setCellValue(achievementHouseMoneyVo1.getAhm_directCooperateMoney());
			}
			row.createCell(10).setCellValue("-");
			row.createCell(11).setCellValue("-");
			row.createCell(12).setCellValue("0");
			if(achievementHouseMoneyVo1.getAhm_directOutHouseMoney() < 0) {
				row.createCell(13).setCellValue(-achievementHouseMoneyVo1.getAhm_directOutHouseMoney());
			}else{
				row.createCell(13).setCellValue(achievementHouseMoneyVo1.getAhm_directOutHouseMoney());
			}
			if(achievementHouseMoneyVo1.getAhm_insurance() < 0) {
				row.createCell(14).setCellValue(-achievementHouseMoneyVo1.getAhm_insurance());
			}else{
				row.createCell(14).setCellValue(achievementHouseMoneyVo1.getAhm_insurance());
			}
			if(achievementHouseMoneyVo1.getAhm_gsmanageMoney() < 0){
				row.createCell(15).setCellValue(-achievementHouseMoneyVo1.getAhm_gsmanageMoney());
			}else{
				row.createCell(15).setCellValue(achievementHouseMoneyVo1.getAhm_gsmanageMoney());
			}
			row.createCell(16).setCellValue("-");
			row.createCell(17).setCellValue("0");
			row.createCell(18).setCellValue("-");
			row.createCell(19).setCellValue("-");
			row.createCell(20).setCellValue("-");
			if(expenditure < 0) {
				row.createCell(21).setCellValue(-expenditure);
			}else{
				row.createCell(21).setCellValue(expenditure);
			}
			if(achievementHouseMoneyVo1.getAhm_directVacant() < 0) {
				row.createCell(22).setCellValue(-achievementHouseMoneyVo1.getAhm_directVacant());
			}else{
				row.createCell(22).setCellValue(achievementHouseMoneyVo1.getAhm_directVacant());
			}
			if(achievementHouseMoneyVo1.getOntherMoney() < 0) {
				row.createCell(23).setCellValue(-achievementHouseMoneyVo1.getOntherMoney());
			}else{
				row.createCell(23).setCellValue(achievementHouseMoneyVo1.getOntherMoney());
			}
			if(loss < 0) {
				row.createCell(24).setCellValue(-loss);
			}else{
				row.createCell(24).setCellValue(loss);
			}
			row.createCell(25).setCellValue("0");
			row.createCell(26).setCellValue(df.format(income+expenditure+loss));

			row = sheet.createRow((int) i+1);
			// 第四步，创建单元格，并设置值
			row.createCell(1).setCellValue("间接");
			row.createCell(2).setCellValue(achievementHouseMoneyVo1.getAhm_synopsisRent());
			row.createCell(3).setCellValue("-");
			row.createCell(4).setCellValue("-");
			row.createCell(5).setCellValue(achievementHouseMoneyVo1.getAhm_serviceMoney());
			row.createCell(6).setCellValue(achievementHouseMoneyVo1.getAhm_penalty());
			row.createCell(7).setCellValue(achievementHouseMoneyVo1.getAhm_subletMoney());
			row.createCell(8).setCellValue(income1);
			if(achievementHouseMoneyVo1.getAhm_synosisCooperateMoney() < 0){
				row.createCell(9).setCellValue(-achievementHouseMoneyVo1.getAhm_synosisCooperateMoney());
			}else{
				row.createCell(9).setCellValue(achievementHouseMoneyVo1.getAhm_synosisCooperateMoney());
			}
			if(clearServiceMoney < 0) {
				row.createCell(10).setCellValue(-clearServiceMoney);
			}else{
				row.createCell(10).setCellValue(clearServiceMoney);

			}
			if(achievementHouseMoneyVo1.getAhm_repairMoney() < 0) {
				row.createCell(11).setCellValue(-achievementHouseMoneyVo1.getAhm_repairMoney());
			}else{
				row.createCell(11).setCellValue(achievementHouseMoneyVo1.getAhm_repairMoney());
			}
			row.createCell(12).setCellValue("-");
			if(achievementHouseMoneyVo1.getAhm_synopsisOutHouseMoney() < 0) {
				row.createCell(13).setCellValue(-achievementHouseMoneyVo1.getAhm_synopsisOutHouseMoney());
			}else{
				row.createCell(13).setCellValue(achievementHouseMoneyVo1.getAhm_synopsisOutHouseMoney());
			}
			row.createCell(14).setCellValue("-");
			row.createCell(15).setCellValue("-");
			row.createCell(16).setCellValue("0");
			row.createCell(17).setCellValue("-");
			if(achievementHouseMoneyVo1.getServiceMoney() < 0) {
				row.createCell(18).setCellValue(-achievementHouseMoneyVo1.getServiceMoney());
			}else{
				row.createCell(18).setCellValue(achievementHouseMoneyVo1.getServiceMoney());
			}
			if(achievementHouseMoneyVo1.getStoreFundMoney() < 0) {
				row.createCell(19).setCellValue(-achievementHouseMoneyVo1.getStoreFundMoney());
			}else{
				row.createCell(19).setCellValue(achievementHouseMoneyVo1.getStoreFundMoney());
			}
			row.createCell(20).setCellValue("0");
			if(expenditure1 < 0) {
				row.createCell(21).setCellValue(-expenditure1);
			}else{
				row.createCell(21).setCellValue(expenditure1);
			}
			if(achievementHouseMoneyVo1.getAhm_synopsisVacant() < 0) {
				row.createCell(22).setCellValue(-achievementHouseMoneyVo1.getAhm_synopsisVacant());
			}else{
				row.createCell(22).setCellValue(achievementHouseMoneyVo1.getAhm_synopsisVacant());
			}
			row.createCell(23).setCellValue("0");
			if(loss1 < 0) {
				row.createCell(24).setCellValue(-loss1);
			}else{
				row.createCell(24).setCellValue(loss1);
			}
			row.createCell(25).setCellValue("0");
			row.createCell(26).setCellValue(df.format(income1 + expenditure1 + loss1));

			i = i+2;
		}
		//总收入小计收入
		directincome += ahm_directRent+ahm_forRentMoney+ahm_manageMoney;
		synopsisincome += ahm_synopsisRent+ahm_serviceMoney+ahm_penalty+ahm_subletMoney;
		//总收入小计支出
		directpayment += ahm_directCooperateMoney+ahm_directOutHouseMoney+ahm_insurance+sumgsManageMoney;
		synopsispayment += ahm_synosisCooperateMoney+ahm_synopsisOutHouseMoney+ahm_clearServiceMoney+ahm_repairMoney+serviceMoney+storeFundMoney;
		//总收入小计亏损
		directloss += ahm_directVacant+ontherMoney;
		synopsisLoss += ahm_synopsisVacant;
		//总收入小计利润
		directProfit += directincome+directpayment+directloss;
		synopsisProfit += synopsisincome+synopsispayment+synopsisLoss;

		// 合并单元格
		sheet.addMergedRegion(new CellRangeAddress(
				i, //from 行
				i+1, //to 行
				0, //from 列
				0  //to 列
		));
		row = sheet.createRow((int) i);
		// 第四步，创建单元格，并设置值
		row.createCell(0).setCellValue("小计");
		row.createCell(1).setCellValue("直接");
		row.createCell(2).setCellValue(ahm_directRent);
		row.createCell(3).setCellValue(ahm_forRentMoney);
		row.createCell(4).setCellValue(ahm_manageMoney);
		row.createCell(5).setCellValue("-");
		row.createCell(6).setCellValue("-");
		row.createCell(7).setCellValue("-");
		row.createCell(8).setCellValue(directincome);
		if(ahm_directCooperateMoney < 0) {
			row.createCell(9).setCellValue(-ahm_directCooperateMoney);
		}else{
			row.createCell(9).setCellValue(ahm_directCooperateMoney);
		}
		row.createCell(10).setCellValue("-");
		row.createCell(11).setCellValue("-");
		row.createCell(12).setCellValue("0");
		if(ahm_directOutHouseMoney < 0) {
			row.createCell(13).setCellValue(-ahm_directOutHouseMoney);
		}else{
			row.createCell(13).setCellValue(ahm_directOutHouseMoney);
		}
		if(ahm_insurance < 0){
			row.createCell(14).setCellValue(-ahm_insurance);
		}else{
			row.createCell(14).setCellValue(ahm_insurance);
		}
		if(sumgsManageMoney < 0) {
			row.createCell(15).setCellValue(-sumgsManageMoney);
		}else{
			row.createCell(15).setCellValue(sumgsManageMoney);
		}
		row.createCell(16).setCellValue("-");
		row.createCell(17).setCellValue("0");
		row.createCell(18).setCellValue("-");
		row.createCell(19).setCellValue("-");
		row.createCell(20).setCellValue("-");
		if(directpayment < 0) {
			row.createCell(21).setCellValue(-directpayment);
		}else{
			row.createCell(21).setCellValue(directpayment);
		}
		if(ahm_directVacant < 0) {
			row.createCell(22).setCellValue(-ahm_directVacant);
		}else{
			row.createCell(22).setCellValue(ahm_directVacant);
		}
		if(ontherMoney < 0) {
			row.createCell(23).setCellValue(-ontherMoney);
		}else{
			row.createCell(23).setCellValue(ontherMoney);
		}
		if(directloss < 0) {
			row.createCell(24).setCellValue(-directloss);
		}else{
			row.createCell(24).setCellValue(directloss);
		}
		row.createCell(25).setCellValue("0");
		row.createCell(26).setCellValue(directProfit);

		row = sheet.createRow((int) i+1);
		// 第四步，创建单元格，并设置值
		row.createCell(1).setCellValue("间接");
		row.createCell(2).setCellValue(ahm_synopsisRent);
		row.createCell(3).setCellValue("-");
		row.createCell(4).setCellValue("-");
		row.createCell(5).setCellValue(ahm_serviceMoney);
		row.createCell(6).setCellValue(ahm_penalty);
		row.createCell(7).setCellValue(ahm_subletMoney);
		row.createCell(8).setCellValue(synopsisincome);
		if(ahm_synosisCooperateMoney < 0) {
			row.createCell(9).setCellValue(-ahm_synosisCooperateMoney);
		}else{
			row.createCell(9).setCellValue(ahm_synosisCooperateMoney);
		}
		if(ahm_clearServiceMoney < 0) {
			row.createCell(10).setCellValue(-ahm_clearServiceMoney);
		}else{
			row.createCell(10).setCellValue(ahm_clearServiceMoney);
		}
		if(ahm_repairMoney < 0) {
			row.createCell(11).setCellValue(-ahm_repairMoney);
		}else{
			row.createCell(11).setCellValue(ahm_repairMoney);
		}
		row.createCell(12).setCellValue("-");
		if(ahm_synopsisOutHouseMoney < 0) {
			row.createCell(13).setCellValue(-ahm_synopsisOutHouseMoney);
		}else{
			row.createCell(13).setCellValue(ahm_synopsisOutHouseMoney);
		}
		row.createCell(14).setCellValue("-");
		row.createCell(15).setCellValue("-");
		row.createCell(16).setCellValue("0");
		row.createCell(17).setCellValue("-");
		if(serviceMoney < 0) {
			row.createCell(18).setCellValue(-serviceMoney);
		}else{
			row.createCell(18).setCellValue(serviceMoney);
		}
		if(storeFundMoney < 0) {
			row.createCell(19).setCellValue(-storeFundMoney);
		}else{
			row.createCell(19).setCellValue(storeFundMoney);
		}
		row.createCell(20).setCellValue("0");
		if(synopsispayment < 0) {
			row.createCell(21).setCellValue(-synopsispayment);
		}else{
			row.createCell(21).setCellValue(synopsispayment);
		}
		if(ahm_synopsisVacant < 0){
			row.createCell(22).setCellValue(-ahm_synopsisVacant);
		}else{
			row.createCell(22).setCellValue(ahm_synopsisVacant);
		}
		row.createCell(23).setCellValue("0");
		if(synopsisLoss < 0) {
			row.createCell(24).setCellValue(-synopsisLoss);
		}else{
			row.createCell(24).setCellValue(synopsisLoss);
		}
		row.createCell(25).setCellValue("0");
		row.createCell(26).setCellValue(synopsisProfit);

		// 第六步，将文件存到指定位置
		try {
			String fileName = (new Date()).getTime() + ".xls";
			String path = request.getSession().getServletContext().getRealPath("/");
			path += "/resources/excel";
			File file = new File(path);
			if (!file.exists()) {
				file.mkdir();
			}
			path += "/" + fileName;
			FileOutputStream fout = new FileOutputStream(path);
			wb.write(fout);
			fout.close();
			map.put("path", "/resources/excel/" + fileName);
			return map;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return map;
	}

	/**
	 * 房屋利润
	 *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 4:22 PM
	 * @return
	 **/
	@RequestMapping("/selectHouseMoney")
	public String selectHouseMoney() {
		return "achievement/houseMoney";
	}

	/**
	 * 部门利润
	 *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 4:22 PM
	 * @return
	 **/
	@RequestMapping("/selectUccMoney")
	public String selectUccMoney() {
		return "achievement/uccMoney";
	}

	/**
	 * 是否计算房屋利润管理费
	 *
	 * @author 陈智颖
	 * @create 8/29/17 10:32 AM
	 * @return
	 **/
	@Scheduled(cron = "0 0 1 * * ?")
	public void addContractHouseAchievementBool(){
		Map<String, Object> map = achievementCompanyService.addContractHouseAchievementBool();
	}
}
