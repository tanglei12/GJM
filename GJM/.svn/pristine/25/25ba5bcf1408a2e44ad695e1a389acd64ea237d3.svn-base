package com.gjp.service;

import com.gjp.dao.AchievementCompanyDAO;
import com.gjp.dao.ContractDao;
import com.gjp.dao.HousingAllocationDao;
import com.gjp.dao.UserCenterEmployeeDao;
import com.gjp.model.*;
import com.gjp.util.AppUtil;
import com.gjp.util.Msg;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年5月13日 上午11:44:19
 */
@Service
public class AchievementCompanyService {

	@Resource
	private AchievementCompanyDAO achievementCompanyDAO;

	@Resource
	private UserCenterEmployeeDao centerEmployeeDao;

	@Resource
	private ContractDao userCenterContractObjectDao;

	@Resource
	private HousingAllocationDao housingAllocationDao;

	@Resource
	private UserCenterEmployeeDao userCenterEmployeeDao;

	@Resource
	private ContractService userCenterContractObjectService;

	/**
	 * 设置业绩
	 *
	 * @param companyAchievement
	 * @return
	 *
	 * @author 陈智颖
	 * @throws ParseException
	 */
	public Map<String, Object> insertMoneySetting(AchievementCompanyAchievement companyAchievement) throws ParseException {
		Integer bool = 0;

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		Map<String, Object> map = new HashMap<>();

		// 团队业绩
		List<AchievementTeamAchievement> tachievements = new ArrayList<AchievementTeamAchievement>();
		String[] dateSplit = companyAchievement.getCa_startEndDate().split("~");
		String startDate = dateSplit[0];
		String endDate = dateSplit[1];
		companyAchievement.setCa_startDate(sf.parse(startDate));
		companyAchievement.setCa_endDate(sf.parse(endDate));
		if (achievementCompanyDAO.selectCompanyAchievement(companyAchievement).isEmpty()) {
			bool = achievementCompanyDAO.addCompanyAchievement(companyAchievement);

			// 判断营销部下面的销售团队
			List<Company> companys = centerEmployeeDao.selectAllCompany();

			List<Company> companieTable = new ArrayList<Company>();
			// 销售部门业绩设置
			for (Company company : companys) {
				if (company.getUcc_name().equals("营销部")) {
					for (Company company1 : companys) {
						if (company.getUcc_id() == company1.getUcc_pid()) {
							for (Company company2 : companys) {
								if (company1.getUcc_id() == company2.getUcc_pid()) {
									companieTable.add(company2);
								}
							}
						}
					}
				}
			}

			Double sumAvgMoney = (double) Math.round(companyAchievement.getCa_sum() / companieTable.size());
			Double sumdifferMoney1 = companyAchievement.getCa_sum() - sumAvgMoney * companieTable.size();
			Double newAvgMoney = (double) Math.round(companyAchievement.getCa_new() / companieTable.size());
			Double newdifferMoney1 = companyAchievement.getCa_new() - newAvgMoney * companieTable.size();

			int i = 1;
			for (Company company : companieTable) {
				AchievementTeamAchievement teamAchievement = new AchievementTeamAchievement();

				if (i != companieTable.size()) {
					teamAchievement.setTa_sum(sumAvgMoney);
				} else {
					teamAchievement.setTa_sum(sumAvgMoney + sumdifferMoney1);
				}
				teamAchievement.setTa_sumCompany(companyAchievement.getCa_sumCompany());
				if (i != companieTable.size()) {
					teamAchievement.setTa_new(newAvgMoney);
				} else {
					teamAchievement.setTa_new(newAvgMoney + newdifferMoney1);
				}
				teamAchievement.setTa_newCompany(companyAchievement.getCa_newCompany());

				teamAchievement.setUcc_id(company.getUcc_id());
				teamAchievement.setCa_id(companyAchievement.getCa_id());
				bool = achievementCompanyDAO.addTeamAchievement(teamAchievement);

				// 根据部门编码查询人员总数，并计算个人平均业绩
				List<UserCenterEmployee> centerEmployees = new ArrayList<UserCenterEmployee>();
				UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
				userCenterEmployee.setUcc_id(teamAchievement.getUcc_id());
				List<UserCenterEmployee> selectCompanyID = centerEmployeeDao.selectCompanyID(userCenterEmployee);
				teamAchievement.setUcc_name(selectCompanyID.get(0).getUcc_name());
				tachievements.add(teamAchievement);
				for (UserCenterEmployee userCenterEmployee2 : selectCompanyID) {
					centerEmployees.add(userCenterEmployee2);
				}

				Double psumAvgMoney = (double) Math.round(teamAchievement.getTa_sum() / centerEmployees.size());
				Double pnewAvgMoney = (double) Math.round(teamAchievement.getTa_new() / centerEmployees.size());
				Double psumdifferMoney1 = teamAchievement.getTa_sum() - psumAvgMoney * centerEmployees.size();
				Double pnewdifferMoney1 = teamAchievement.getTa_new() - pnewAvgMoney * centerEmployees.size();

				int j = 1;
				for (UserCenterEmployee employee : centerEmployees) {
					AchievementPersonAchievement personAchievement = new AchievementPersonAchievement();
					personAchievement.setEm_id(employee.getEm_id());
					if (j != companieTable.size()) {
						personAchievement.setPa_sum(psumAvgMoney);
					} else {
						personAchievement.setPa_sum(psumAvgMoney + psumdifferMoney1);
					}
					personAchievement.setPa_sumCompany(companyAchievement.getCa_sumCompany());
					if (j != companieTable.size()) {
						personAchievement.setPa_new(pnewAvgMoney);
					} else {
						personAchievement.setPa_new(pnewAvgMoney + pnewdifferMoney1);
					}
					personAchievement.setPa_newCompany(companyAchievement.getCa_newCompany());
					personAchievement.setCa_id(teamAchievement.getCa_id());
					bool = achievementCompanyDAO.addAchievementPersonAchievement(personAchievement);
					j += 1;
				}
				i += 1;
			}
		} else {
			map.put("bool", 1);
		}
		if (bool > 0) {
			map.put("message", "success");
			map.put("tachievements", tachievements);
		} else {
			map.put("message", "error");
		}

		return map;
	}

	/**
	 * 根据业绩编码查询当月业绩
	 *
	 * @param companyAchievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<AchievementCompanyAchievement> selectCompanyAchievement(AchievementCompanyAchievement companyAchievement) {
		return achievementCompanyDAO.selectCompanyAchievement(companyAchievement);
	}

	/**
	 * 根据业绩编码查询当月业绩
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<AchievementCompanyAchievement> selectCompanyAchievementDate() {
		return achievementCompanyDAO.selectCompanyAchievementDate();
	}

	/**
	 * 修改业绩目标设置
	 *
	 * @param companyAchievement
	 * @return
	 *
	 * @author 陈智颖
	 * @throws ParseException
	 */
	public Map<String, Object> updateMoneySetting(AchievementCompanyAchievement companyAchievement, List<AchievementTeamAchievement> achievementTeams) throws ParseException {
		Integer bool = 0;

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		Map<String, Object> map = new HashMap<>();

		// 修改总业绩
		String[] dateSplit = companyAchievement.getCa_startEndDate().split("~");
		String startDate = dateSplit[0];
		String endDate = dateSplit[1];
		companyAchievement.setCa_startDate(sf.parse(startDate));
		companyAchievement.setCa_endDate(sf.parse(endDate));
		bool = achievementCompanyDAO.updateCompanyAchievement(companyAchievement);
		// 删除个人业绩
		AchievementPersonAchievement personAchievement1 = new AchievementPersonAchievement();
		personAchievement1.setCa_id(companyAchievement.getCa_id());
		bool = achievementCompanyDAO.deletePersonAchievement(personAchievement1);

		// 根据部门编码查询人员总数，并计算个人平均业绩
		for (AchievementTeamAchievement teamAchievement : achievementTeams) {
			teamAchievement.setCa_id(companyAchievement.getCa_id());
			bool = achievementCompanyDAO.updateTeamAchievement(teamAchievement);

			List<UserCenterEmployee> centerEmployees = new ArrayList<UserCenterEmployee>();
			UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
			userCenterEmployee.setUcc_id(teamAchievement.getUcc_id());
			List<UserCenterEmployee> selectCompanyID = centerEmployeeDao.selectCompanyID(userCenterEmployee);
			teamAchievement.setUcc_name(selectCompanyID.get(0).getUcc_name());
			for (UserCenterEmployee userCenterEmployee2 : selectCompanyID) {
				centerEmployees.add(userCenterEmployee2);
			}

			Double psumAvgMoney = (double) Math.round(teamAchievement.getTa_sum() / centerEmployees.size());
			Double pnewAvgMoney = (double) Math.round(teamAchievement.getTa_new() / centerEmployees.size());
			Double psumdifferMoney1 = teamAchievement.getTa_sum() - psumAvgMoney * centerEmployees.size();
			Double pnewdifferMoney1 = teamAchievement.getTa_new() - pnewAvgMoney * centerEmployees.size();

			int j = 1;
			for (UserCenterEmployee employee : centerEmployees) {
				AchievementPersonAchievement personAchievement = new AchievementPersonAchievement();
				personAchievement.setEm_id(employee.getEm_id());
				if (j != achievementTeams.size()) {
					personAchievement.setPa_sum(psumAvgMoney);
				} else {
					personAchievement.setPa_sum(psumAvgMoney + psumdifferMoney1);
				}
				personAchievement.setPa_sumCompany(companyAchievement.getCa_sumCompany());
				if (j != achievementTeams.size()) {
					personAchievement.setPa_new(pnewAvgMoney);
				} else {
					personAchievement.setPa_new(pnewAvgMoney + pnewdifferMoney1);
				}
				personAchievement.setPa_newCompany(companyAchievement.getCa_newCompany());
				personAchievement.setCa_id(companyAchievement.getCa_id());
				bool = achievementCompanyDAO.addAchievementPersonAchievement(personAchievement);
				j += 1;
			}
		}

		if (bool > 0) {
			map.put("message", "success");
		} else {
			map.put("message", "error");
		}
		return map;
	}

	/**
	 * 业绩设置
	 *
	 * @param achievementSetting
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Map<String, Object> addMoneySetting(AchievementSetting achievementSetting, List<AchievementSettingDetails> AchievementSettingDetails) {
		Integer bool = 0;
		Map<String, Object> map = new HashMap<>();

		if (achievementSetting.getAs_id() == null) {
			bool = achievementCompanyDAO.addAchievementSetting(achievementSetting);
		} else {
			bool = achievementCompanyDAO.updateAchievementSetting(achievementSetting);
		}

		AchievementSettingDetails details = new AchievementSettingDetails();
		details.setAs_id(achievementSetting.getAs_id());
		achievementCompanyDAO.deleteAchievementSettingDetails(details);

		for (AchievementSettingDetails achievementSettingDetails2 : AchievementSettingDetails) {
			achievementSettingDetails2.setAs_id(achievementSetting.getAs_id());
			achievementCompanyDAO.addAchievementSettingDetails(achievementSettingDetails2);
		}

		if (bool > 0) {
			map.put("achievementSetting", achievementSetting);
			map.put("message", "success");
		} else {
			map.put("message", "error");
		}
		return map;
	}

	/**
	 * 查询业绩设置
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public AchievementSetting selectAchievementSetting() {
		return achievementCompanyDAO.selectAchievementSetting();
	}

	/**
	 * 查询业绩设置
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Map<String, Object> deleteAchievementSetting(AchievementCompanyAchievement achievement) {
		Integer bool = 0;
		Map<String, Object> map = new HashMap<>();
		bool = achievementCompanyDAO.deleteCompanyAchievement(achievement);

		if (bool > 0) {
			AchievementTeamAchievement teamAchievement = new AchievementTeamAchievement();
			teamAchievement.setCa_id(achievement.getCa_id());
			bool = achievementCompanyDAO.deleteTeamAchievement(teamAchievement);
		}
		if (bool > 0) {
			AchievementPersonAchievement personAchievement = new AchievementPersonAchievement();
			personAchievement.setCa_id(achievement.getCa_id());
			bool = achievementCompanyDAO.deletePersonAchievement(personAchievement);
		}

		if (bool > 0) {
			map.put("message", "success");
		} else {
			map.put("message", "error");
		}

		return map;
	}

	/**
	 * 小于2016年4月份的合同标注为已算业绩
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Map<String, Object> updateContractBools() {
		Map<String, Object> map = new HashMap<>();
		Integer bool = 0;
		// 查询所有房屋code : 托管合同
		List<HouseInfoKeep> selectHouseCodeALL = housingAllocationDao.selectHouseCodeALL();

		for (HouseInfoKeep houseInfoKeep : selectHouseCodeALL) {
			ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
			viewBusinessContractVo.setContractObject_Type("租赁合同");
			viewBusinessContractVo.setHi_code(houseInfoKeep.getHi_code());
			List<ViewBusinessContractVo> selectHouseContract = userCenterContractObjectDao.selectHouseContract(viewBusinessContractVo);

			// 判断时间小于4月份的标注已做业绩
			for (ViewBusinessContractVo viewBusinessContractVo1 : selectHouseContract) {
				// 获取合同创建时间年
				Integer oldYear = AppUtil.Year(viewBusinessContractVo1.getContractObject_CreateTime());
				// 获取合同创建时间月
				Integer oldMoth = AppUtil.Moth(viewBusinessContractVo1.getContractObject_CreateTime());

				if (oldYear < 2016) {
					viewBusinessContractVo1.setContractObject_Bool(1);
					bool = userCenterContractObjectDao.updateContractObjectBool(viewBusinessContractVo1);
				} else {
					if (oldMoth < 4) {
						viewBusinessContractVo1.setContractObject_Bool(1);
						bool = userCenterContractObjectDao.updateContractObjectBool(viewBusinessContractVo1);
					}
				}
			}
		}

		if (bool > 0) {
			map.put("message", "success");
		} else {
			map.put("message", "error");
		}
		return map;
	}

	/**
	 * 根据合同号计算业绩
	 *
	 * @param contractObject_No
	 *            合同号
	 * @param adjmoney
	 *            调整金额
	 * @return
	 *
	 * @author 陈智颖
	 */
	@SuppressWarnings("unused")
	public Map<String, Object> addAchievementStatistics(String contractObject_No, double adjmoney) {
		Map<String, Object> map = new HashMap<>();

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		// 总营收
		double sumMoney = 0.0;
		// 总业绩
		double sumAchievement = 0.0;
		// 转租业绩
		double renewMoney = 0.0;
		// 业绩补贴
		double achievementSubsidy = 0.0;
		// 业绩补贴1
		double achievementSubsidy1 = 0.0;
		// 差价
		double newMoney = 0.0;
		// 租赁合同新出房开始时间
		String startTime;
		// 管理费
		double serviceMoney = 0.0;
		// 存房新业绩
		double saveHouseNewMoney = 0.0;
		// 存房旧业绩
		double saveHouseOldMoney = 0.0;
		// 出房新业绩
		double outHouseNewMoney = 0.0;
		// 出房旧业绩
		double outHouseOldMoney = 0.0;
		// 实提免租期金额
		double lossMoney = 0.0;
		// 实提免租期天数
		double lossDay = 0.0;
		// 主管提成
		double chargeMoney = 0.0;
		// 副主管提成
		double viceChargeMoney = 0.0;
		// 经理提成
		double managerMoney = 0.0;
		// 保留小数点后两位
		DecimalFormat df = new DecimalFormat("######0.00");
		// 业绩类型
		String sa_type = "";
		// 租金差价亏损
		double company = 0.0;
		// 业绩是否垮托管合同
		Boolean bool = false;
		// 免租期
		double forRentDay = 0.0;
		// 免租期
		double rentFreeMoney = 0.0;
		// 招租期
		double freeDay = 0.0;
		// 招租期金额
		double freeMoney = 0.0;
		// 招租期金额
		double freeMoney1 = 0.0;
		// 公司承担金额
		double companyMoneyS = 0.0;
		// 承担类型 1：存房承担亏损 2：存房承担亏损和半个月租金 3：存房承担亏损公司承担半个月租金
		int typeInt = 2;
		// 扣除包修费
		Double tRepairMoney = null;
		// 扣除包修费
		Double zRepairMoney = null;
		// 租赁合作费
		double zworkMoney = 0.0;
		double tworkMoney = 0.0;
		// 业绩
		double aievementMoney = 0.0;
		//
		int leaseMonth = 0;
		// 公司承担亏损
		double lossComanyMoney = 0;

		// 根据租赁合同编码查看合同信息
		ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
		viewBusinessContractVo.setContractObject_No(contractObject_No);
		System.out.println("合同编码：" + contractObject_No);
		if ("1622000421".equals(contractObject_No)) {
			System.out.println("==========================");
		}
		ViewBusinessContractVo zContractNo = achievementCompanyDAO.selectContractNo(viewBusinessContractVo).get(0);

		// 根据房屋编码查询最新一个算了业绩的租赁合同
		ViewBusinessContractVo viewBusinessContractVo1 = new ViewBusinessContractVo();
		viewBusinessContractVo1.setHi_code(zContractNo.getHi_code());
		if (zContractNo.getContractObject_Successor() != 0) {
			viewBusinessContractVo1.setContractObject_Id(zContractNo.getContractObject_Successor());
		} else {
			viewBusinessContractVo1.setContractObject_Bool(1);
		}
		viewBusinessContractVo1.setContractObject_Type("租赁合同");
		ViewBusinessContractVo oldZContractNo = null;
		Integer _state = 0;
		if (!achievementCompanyDAO.selectContractNo(viewBusinessContractVo1).isEmpty()) {
			oldZContractNo = achievementCompanyDAO.selectContractNo(viewBusinessContractVo1).get(0);
			_state = oldZContractNo.getContractObject_OptionState();
		}

		// 根据房屋编码查询最新托管合同
		ViewBusinessContractVo viewBusinessContractVo2 = new ViewBusinessContractVo();
		viewBusinessContractVo2.setHi_code(zContractNo.getHi_code());
		viewBusinessContractVo2.setContractObject_Type("托管合同");
		List<ViewBusinessContractVo> selectContractNo = achievementCompanyDAO.selectContractNo(viewBusinessContractVo2);
		ViewBusinessContractVo TContractNo1 = null;
		ViewBusinessContractVo TContractNo2 = null;
		if (selectContractNo.size() > 1) {
			TContractNo1 = selectContractNo.get(0);
			TContractNo2 = selectContractNo.get(1);
		} else {
			TContractNo1 = selectContractNo.get(0);
		}

		// 租赁合作费
		zworkMoney = zContractNo.getContractBody_WorkMoney();
		if (TContractNo1.getContractObject_Successor() == 0) {
			if (TContractNo1.getContractObject_ExtState() != 12 && TContractNo1.getContractObject_ExtState() != 22) {
				tworkMoney = TContractNo1.getContractBody_WorkMoney();
			}
		}

		// 查询业绩设置
		AchievementSetting selectAchievementSetting = achievementCompanyDAO.selectAchievementSetting();
		// 业绩设置详情
		AchievementSettingDetails achievementSettingDetails = new AchievementSettingDetails();
		achievementSettingDetails.setAs_id(selectAchievementSetting.getAs_id());
		List<AchievementSettingDetails> selectAchievementSettingDetails = achievementCompanyDAO.selectAchievementSettingDetails(achievementSettingDetails);

		// 支付方式
		String payStyle = zContractNo.getContractBody_PayStyle();
		// 支付类型
		String payType = "";
		if (zContractNo.getContractBody_PayType() == null || zContractNo.getContractBody_PayType().equals("")) {
			payType = "管家婆";
		} else {
			payType = zContractNo.getContractBody_PayType();
		}

		try {
			// 等于空新出房，不等于空转租或者转租加新出
			if (oldZContractNo == null) {
				sa_type = "新出房";

				// 计算当前租赁合同和上一份租赁合同的时间段，重叠时间，和不重叠时间
				String newStartTOEnd = zContractNo.getContractBody_StartTOEnd();
				String[] newsplit = newStartTOEnd.split("~");
				// 最新租赁合同开始时间
				String newStart = newsplit[0];
				Integer newStartY = AppUtil.Year(sf.parse(newStart));
				startTime = newStart;
				// 最新租赁合同结束时间
				String newEnd = newsplit[1];
				Integer newEndY = AppUtil.Year(sf.parse(newEnd));

				// 管理费天数
				leaseMonth = AppUtil.getMonth2(newStart, newEnd);
				String[] splitLease = new String[] { newStart, newEnd };
				HashMap<String, Integer> mapsLease = AppUtil.calLastBillDate2(splitLease, AppUtil.getMonth2(newStart, newEnd), 0);
				Integer dayLease = mapsLease.get("day");
				if (dayLease > 15) {
					leaseMonth++;
				}

				// 计算当前租赁合同和上一份租赁合同的时间段，重叠时间，和不重叠时间
				String tStartTOEnd = "";
				String[] tPlit = null;
				// 最新托管合同开始时间
				String tStart = "";
				Integer tStartY = 0;
				// 最新托管合同结束时间
				String tEnd = "";

				String tStartTOEnd2 = "";
				String[] tPlit2 = null;
				// 最新托管合同开始时间
				String tStart2 = "";
				Integer tStartY2 = 0;
				// 最新托管合同结束时间
				String tEnd2 = "";
				if (TContractNo2 == null) {
					tStartTOEnd = TContractNo1.getContractBody_StartTOEnd();
					tPlit = tStartTOEnd.split("~");
					tStart = tPlit[0];
					tStartY = AppUtil.Year(sf.parse(tStart));
					tEnd = tPlit[1];
					if (TContractNo1.getContractObject_RentFreeMode() == 1) {
						TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() / 12);
					}
				} else {
					tStartTOEnd = TContractNo1.getContractBody_StartTOEnd();
					tPlit = tStartTOEnd.split("~");
					tStart = tPlit[0];
					tStartY = AppUtil.Year(sf.parse(tStart));
					tEnd = tPlit[1];
					if (TContractNo1.getContractObject_RentFreeMode() == 1) {
						TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() / 12);
					}

					tStartTOEnd2 = TContractNo2.getContractBody_StartTOEnd();
					tPlit2 = tStartTOEnd2.split("~");
					tStart2 = tPlit2[0];
					tStartY2 = AppUtil.Year(sf.parse(tStart2));
					tEnd2 = tPlit2[1];
					if (TContractNo2.getContractObject_RentFreeMode() == 1) {
						TContractNo2.setContractBody_Rent(TContractNo2.getContractBody_Rent() / 12);
					}
					if (AppUtil.getDay2(tStart, startTime) < 0 && AppUtil.getDay2(tStart, newEnd) < 0) {
						// 提前续约情况
						TContractNo1 = TContractNo2;
						TContractNo2 = null;
						tStartTOEnd = TContractNo1.getContractBody_StartTOEnd();
						tPlit = tStartTOEnd.split("~");
						tStart = tPlit[0];
						tStartY = AppUtil.Year(sf.parse(tStart));
						tEnd = tPlit[1];
					}
				}

				if (TContractNo1.getContractObject_ServiceBool() == null || TContractNo1.getContractObject_ServiceBool().equals(0)) {
					// 托管服务费
					if (TContractNo1.getContractBody_GuaranteeCost() != null) {
						tRepairMoney = Double.valueOf(TContractNo1.getContractBody_GuaranteeCost().split("\\|")[0]);
					} else {
						tRepairMoney = 0.0;
					}
					ViewBusinessContractVo viewBusinessContractVo3 = new ViewBusinessContractVo();
					viewBusinessContractVo3.setContractObject_No(TContractNo1.getContractObject_No());
					viewBusinessContractVo3.setContractObject_ServiceBool(1);
					achievementCompanyDAO.updateContractObjectServiceBool(viewBusinessContractVo3);
				}

				if (zContractNo.getContractObject_ServiceBool() == null || zContractNo.getContractObject_ServiceBool().equals(0)) {
					// 租赁服务费
					if (zContractNo.getContractBody_Service() != 0) {
						zRepairMoney = Double.valueOf(zContractNo.getContractBody_Service());
					} else {
						zRepairMoney = 0.0;
					}
					ViewBusinessContractVo viewBusinessContractVo3 = new ViewBusinessContractVo();
					viewBusinessContractVo3.setContractObject_No(zContractNo.getContractObject_No());
					viewBusinessContractVo3.setContractObject_ServiceBool(1);
					achievementCompanyDAO.updateContractObjectServiceBool(viewBusinessContractVo3);
				}

				// 租赁租金浮动
				String renMoney = "0";
				if (zContractNo.getContractBody_RentPlus() != null) {
					renMoney = zContractNo.getContractBody_RentPlus();
				}
				String[] rentMoneySplit = renMoney.split("\\|");
				for (int i = 0; i < rentMoneySplit.length; i++) {
					if (rentMoneySplit[i].contains("%")) {
						zContractNo.setContractBody_Rent(zContractNo.getContractBody_Rent() * (1 + Double.parseDouble(rentMoneySplit[i].replace("%", "")) / 100));
					} else {
						zContractNo.setContractBody_Rent(zContractNo.getContractBody_Rent() + Double.parseDouble(rentMoneySplit[i]));
					}
				}

				if (TContractNo2 == null) {
					Integer year = AppUtil.getMonth2(tStart, newEnd) / 12;
					Integer yeart = AppUtil.getMonth2(tStart, newEnd) / 12;
					Integer month = AppUtil.getMonth2(tStart, newEnd) % 12;
					if (month > 0) {
						year = year + 1;
					}
					// 托管租金递增
					String increasing = TContractNo1.getContractBody_Increasing();
					String[] increasingSplit = increasing.split("\\|");
					for (int i = 0; i < increasingSplit.length; i++) {
						if (i < year) {
							if (i < yeart) {
								if (increasingSplit[i].contains("%")) {
									TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit[i].replace("%", "")) / 100));
								} else {
									TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() + Double.parseDouble(increasingSplit[i]));
								}
							} else {
								if (increasingSplit[i].contains("%")) {
									TContractNo1.setContractBody_Rent1(TContractNo1.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit[i].replace("%", "")) / 100));
								} else {
									TContractNo1.setContractBody_Rent1(TContractNo1.getContractBody_Rent() + Double.parseDouble(increasingSplit[i]));
								}
							}
						}
					}

					// // 托管租金浮动
					// String increasingMoney = "0";
					// if (TContractNo1.getContractBody_RentPlus() != null) {
					// increasingMoney =
					// TContractNo1.getContractBody_RentPlus();
					// }
					// String[] increasingMoneySplit =
					// increasingMoney.split("\\|");
					// for (int i = 0; i < increasingMoneySplit.length; i++) {
					// if (i < year) {
					// if (i < yeart) {
					// if (increasingSplit[i].contains("%")) {
					// TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent()
					// * (1 + Double.parseDouble(increasingSplit[i].replace("%",
					// "")) / 100));
					// } else {
					// TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent()
					// + Double.parseDouble(increasingSplit[i]));
					// }
					// } else {
					// if (increasingSplit[i].contains("%")) {
					// TContractNo1.setContractBody_Rent1(TContractNo1.getContractBody_Rent()
					// * (1 + Double.parseDouble(increasingSplit[i].replace("%",
					// "")) / 100));
					// } else {
					// TContractNo1.setContractBody_Rent1(TContractNo1.getContractBody_Rent()
					// + Double.parseDouble(increasingSplit[i]));
					// }
					// }
					// }
					// }

				} else {
					Integer year2 = AppUtil.getMonth2(tStart2, newEnd) / 12;
					Integer yeart2 = AppUtil.getMonth2(tStart2, newEnd) / 12;
					Integer month2 = AppUtil.getMonth2(tStart2, newEnd) % 12;
					if (month2 > 0) {
						year2 = year2 + 1;
					}
					// 托管租金递增
					String increasing = TContractNo1.getContractBody_Increasing();
					String increasing2 = TContractNo2.getContractBody_Increasing();
					String[] increasingSplit = increasing.split("\\|");
					String[] increasingSplit2 = increasing2.split("\\|");
					for (int i = 0; i < increasingSplit.length; i++) {
						if (i < year2) {
							if (i < yeart2) {
								if (increasingSplit[i].contains("%")) {
									TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit[i].replace("%", "")) / 100));
								} else {
									TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() + Double.parseDouble(increasingSplit[i]));
								}
							} else {
								if (increasingSplit[i].contains("%")) {
									TContractNo1.setContractBody_Rent1(TContractNo1.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit[i].replace("%", "")) / 100));
								} else {
									TContractNo1.setContractBody_Rent1(TContractNo1.getContractBody_Rent() + Double.parseDouble(increasingSplit[i]));
								}
							}
						}
					}
					for (int i = 0; i < increasingSplit2.length; i++) {
						if (i < year2) {
							if (i < yeart2) {
								if (increasingSplit[i].contains("%")) {
									TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit[i].replace("%", "")) / 100));
								} else {
									TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() + Double.parseDouble(increasingSplit[i]));
								}
							} else {
								if (increasingSplit[i].contains("%")) {
									TContractNo1.setContractBody_Rent1(TContractNo1.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit[i].replace("%", "")) / 100));
								} else {
									TContractNo1.setContractBody_Rent1(TContractNo1.getContractBody_Rent() + Double.parseDouble(increasingSplit[i]));
								}
							}
						}
					}

					// 托管租金浮动
					/*
					 * //托管租金浮动 String increasingMoney1 = "0";
					 * if(TContractNo1.getContractBody_RentPlus() != null){
					 * increasingMoney1 =
					 * TContractNo1.getContractBody_RentPlus(); } String
					 * increasingMoney2 = "0";
					 * if(TContractNo2.getContractBody_RentPlus() != null){
					 * increasingMoney2 =
					 * TContractNo2.getContractBody_RentPlus(); } String[]
					 * increasingMoneySplit1 = increasingMoney1.split("\\|");
					 * String[] increasingMoneySplit2 =
					 * increasingMoney2.split("\\|");
					 *
					 * Integer year = AppUtil.getMonth2(tStart, newEnd) / 12;
					 * Integer yeart = AppUtil.getMonth2(tStart, newEnd) / 12;
					 * Integer month = AppUtil.getMonth2(tStart, newEnd) % 12;
					 * if(month > 0){ year = year+1; }
					 *
					 * for (int i = 0; i < increasingMoneySplit1.length; i++) {
					 * if(i < year){ if(i < yeart){ if
					 * (increasingMoneySplit1[i].contains("%")) {
					 * TContractNo1.setContractBody_Rent(TContractNo1.
					 * getContractBody_Rent() *
					 * (Double.parseDouble(increasingMoneySplit1[i].replace("%",
					 * "")) / 100)); } else {
					 * TContractNo1.setContractBody_Rent(TContractNo1.
					 * getContractBody_Rent() +
					 * Double.parseDouble(increasingMoneySplit1[i])); } }else{
					 * if (increasingMoneySplit1[i].contains("%")) {
					 * TContractNo1.setContractBody_Rent1(TContractNo1.
					 * getContractBody_Rent() *
					 * (Double.parseDouble(increasingMoneySplit1[i].replace("%",
					 * "")) / 100)); } else {
					 * TContractNo1.setContractBody_Rent1(TContractNo1.
					 * getContractBody_Rent() +
					 * Double.parseDouble(increasingMoneySplit1[i])); } } } }
					 *
					 * for (int i = 0; i < increasingMoneySplit2.length; i++) {
					 * if(i < year){ if(i < yeart){ if
					 * (increasingMoneySplit2[i].contains("%")) {
					 * TContractNo2.setContractBody_Rent(TContractNo2.
					 * getContractBody_Rent() *
					 * (Double.parseDouble(increasingMoneySplit2[i].replace("%",
					 * "")) / 100)); } else {
					 * TContractNo2.setContractBody_Rent(TContractNo2.
					 * getContractBody_Rent() +
					 * Double.parseDouble(increasingMoneySplit2[i])); } }else{
					 * if (increasingMoneySplit2[i].contains("%")) {
					 * TContractNo2.setContractBody_Rent1(TContractNo2.
					 * getContractBody_Rent() *
					 * (Double.parseDouble(increasingMoneySplit2[i].replace("%",
					 * "")) / 100)); } else {
					 * TContractNo2.setContractBody_Rent1(TContractNo2.
					 * getContractBody_Rent() +
					 * Double.parseDouble(increasingMoneySplit2[i])); } } } }
					 */

				}

				// 新业绩部分计算（差价）
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
					// 租赁合同在两份托管合同之间
					if (!tEnd2.equals("") && AppUtil.getDay2(startTime, tEnd2) > 0 && AppUtil.getDay2(tStart, newEnd) > 0) {

						bool = true;
						String[] split = new String[] { startTime, tEnd2 };
						HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(startTime, tEnd2), 0);
						if (TContractNo2 != null) {
							newMoney += (zContractNo.getContractBody_Rent() - TContractNo2.getContractBody_Rent()) * (AppUtil.getMonth2(startTime, tEnd2)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo2.getContractBody_Rent()) / 30 * maps.get("day")));
							if (TContractNo2 != null && TContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(TContractNo2.getContractObject_DeadlineTime())) > 0) {
								newMoney += (zContractNo.getContractBody_Rent() - TContractNo2.getContractBody_Rent1()) * (AppUtil.getMonth2(startTime, tEnd2)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo2.getContractBody_Rent1()) / 30 * maps.get("day")));
							}
						}

						String[] split1 = new String[] { tStart, newEnd };
						HashMap<String, Integer> maps1 = AppUtil.calLastBillDate2(split1, AppUtil.getMonth2(tStart, newEnd), 0);
						newMoney += (zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent()) * (AppUtil.getMonth2(tStart, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent()) / 30 * maps1.get("day")));
						if (TContractNo2 != null && TContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(TContractNo2.getContractObject_DeadlineTime())) > 0) {
							newMoney += (zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent1()) * (AppUtil.getMonth2(tStart, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent1()) / 30 * maps1.get("day")));
						}

					} else {
						String[] split = new String[] { startTime, newEnd };
						HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(startTime, newEnd), 0);
						newMoney += (zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent()) * (AppUtil.getMonth2(startTime, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent()) / 30 * maps.get("day")));
						if (TContractNo2 != null && TContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(TContractNo2.getContractObject_DeadlineTime())) > 0) {
							newMoney += (zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent1()) * (AppUtil.getMonth2(startTime, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent1()) / 30 * maps.get("day")));
						}
					}
				}
				if (!tEnd2.equals("") && AppUtil.getDay2(startTime, tEnd2) > 0 && AppUtil.getDay2(tStart, newEnd) > 0) {

					Integer xmonth2 = AppUtil.getMonth2(newStart, tEnd2);
					String[] split2 = new String[] { newStart, tEnd2 };
					HashMap<String, Integer> maps2 = AppUtil.calLastBillDate2(split2, AppUtil.getMonth2(newStart, tEnd2), 0);
					Integer day2 = maps2.get("day");
					if (day2 > 27) {
						xmonth2++;
					}

					// 管理费天数
					Integer xmonth = AppUtil.getMonth2(tStart, newEnd);
					String[] split = new String[] { tStart, newEnd };
					HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(tStart, newEnd), 0);
					Integer day = maps.get("day");
					if (day > 15) {
						xmonth++;
					}

					// 管理费
					Double gMoney = 0.0;
					if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
						// 提取免租期金额：托管管理费/30*免租期天数=免租期金额
						gMoney = TContractNo1.getContractBody_Service();
						serviceMoney += gMoney / 12 * xmonth + gMoney / (12 * 30) * day;
					}

					if (TContractNo2 != null) {
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
							// 提取免租期金额：托管管理费/30*免租期天数=免租期金额
							gMoney = TContractNo2.getContractBody_Service();
							serviceMoney += gMoney / 12 * xmonth + gMoney / (12 * 30) * day2;
						}
					}
				} else {
					Integer xmonth = AppUtil.getMonth2(newStart, newEnd);
					String[] split = new String[] { newStart, newEnd };
					HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(newStart, newEnd), 0);
					Integer day = maps.get("day");
					if (day > 15) {
						xmonth++;
					}
					// 管理费
					Double gMoney = 0.0;
					if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
						// 提取免租期金额：托管管理费/30*免租期天数=免租期金额
						gMoney = TContractNo1.getContractBody_Service();
						if (gMoney == null) {
							gMoney = 0.0;
						}
						serviceMoney += gMoney / 12 * xmonth + gMoney / (12 * 30) * day;
					}
				}
			} else {
				// 计算当前租赁合同和上一份租赁合同的时间段，重叠时间，和不重叠时间
				String newStartTOEnd = zContractNo.getContractBody_StartTOEnd();
				String[] newsplit = newStartTOEnd.split("~");
				// 最新租赁合同开始时间
				String newStart = newsplit[0];
				Integer newStartY = AppUtil.Year(sf.parse(newStart));
				startTime = newStart;
				// 最新租赁合同结束时间
				String newEnd = newsplit[1];
				Integer newEndY = AppUtil.Year(sf.parse(newEnd));

				String oldStartTOEnd = oldZContractNo.getContractBody_StartTOEnd();
				String[] oldsplit = oldStartTOEnd.split("~");
				// 以前租赁合同开始时间
				String oldstat = oldsplit[0];
				// 以前租赁合同结束时间
				String oldEnd = oldsplit[1];
				// 是否有转租
				if (!AppUtil.isOkState(_state, "退租") && !AppUtil.isOkState(_state, "换房")) {
					if (AppUtil.getDay2(oldEnd, newStart) < 0 && (oldZContractNo == null || !AppUtil.isOkState(_state, "到期"))) {
						sa_type += "+转租";
						if (AppUtil.getDay2(oldEnd, newEnd) > 0) {
							startTime = oldEnd;
						} else {
							startTime = newEnd;
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
							ViewContractStatement viewContractStatement = new ViewContractStatement();
							viewContractStatement.setCco_state("取消");
							viewContractStatement.setContractObject_Code(oldZContractNo.getContractObject_Code());
							ViewContractStatement contractNoShutTime = achievementCompanyDAO.selectContractNoShutTime(viewContractStatement).get(0);
							// 转租时间
							if (AppUtil.isOkState(_state, "强收")) {
								achievementSubsidy += oldZContractNo.getContractBody_Rent() / 2;
							} else {
								if (contractNoShutTime.getCco_subletCost() == null) {
									renewMoney += oldZContractNo.getContractBody_Rent() / 2;
								} else {
									renewMoney += contractNoShutTime.getCco_subletCost();
								}
							}
						}
					}
				}

				// 管理费天数
				leaseMonth = AppUtil.getMonth2(newStart, newEnd);
				String[] splitLease = new String[] { newStart, newEnd };
				HashMap<String, Integer> mapsLease = AppUtil.calLastBillDate2(splitLease, AppUtil.getMonth2(newStart, newEnd), 0);
				Integer dayLease = mapsLease.get("day");
				if (dayLease > 15) {
					leaseMonth++;
				}

				if (AppUtil.isOkState(_state, "退租")) {
					if (AppUtil.getDay2(oldEnd, newEnd) > 0) {
						startTime = oldEnd;
					} else {
						startTime = newEnd;
					}
					renewMoney += oldZContractNo.getContractBody_Rent() / 2;
				}

				if (AppUtil.isOkState(_state, "换房")) {
					sa_type += "+换房";
					if (AppUtil.getDay2(oldEnd, newEnd) > 0) {
						startTime = oldEnd;
					} else {
						startTime = newEnd;
					}
				}

				if (AppUtil.isOkState(_state, "转租") && AppUtil.getDay2(oldEnd, newEnd) > 0) {
					sa_type += "+新出房";
				}
				if (AppUtil.isOkState(_state, "到期") || AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "强收")) {
					sa_type += "+新出房";
				}
				if (AppUtil.isOkState(_state, "续约")) {
					sa_type += "+续约出房";
				}
				if (!sa_type.equals("")) {
					sa_type = sa_type.substring(1, sa_type.length());
				}

				// 计算当前租赁合同和上一份租赁合同的时间段，重叠时间，和不重叠时间
				String tStartTOEnd = "";
				String[] tPlit = null;
				// 最新托管合同开始时间
				String tStart = "";
				Integer tStartY = 0;
				// 最新托管合同结束时间
				String tEnd = "";

				String tStartTOEnd2 = "";
				String[] tPlit2 = null;
				// 最新托管合同开始时间
				String tStart2 = "";
				Integer tStartY2 = 0;
				// 最新托管合同结束时间
				String tEnd2 = "";
				if (TContractNo2 == null) {
					tStartTOEnd = TContractNo1.getContractBody_StartTOEnd();
					tPlit = tStartTOEnd.split("~");
					tStart = tPlit[0];
					tStartY = AppUtil.Year(sf.parse(tStart));
					tEnd = tPlit[1];
					TContractNo1.setContractBody_Rent1(0);
					if (TContractNo1.getContractObject_RentFreeMode() == 1) {
						TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() / 12);
					}
				} else {
					tStartTOEnd = TContractNo1.getContractBody_StartTOEnd();
					tPlit = tStartTOEnd.split("~");
					tStart = tPlit[0];
					tStartY = AppUtil.Year(sf.parse(tStart));
					tEnd = tPlit[1];
					TContractNo1.setContractBody_Rent1(0);
					if (TContractNo1.getContractObject_RentFreeMode() == 1) {
						TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() / 12);
					}

					tStartTOEnd2 = TContractNo2.getContractBody_StartTOEnd();
					tPlit2 = tStartTOEnd2.split("~");
					tStart2 = tPlit2[0];
					tStartY2 = AppUtil.Year(sf.parse(tStart2));
					tEnd2 = tPlit2[1];
					TContractNo2.setContractBody_Rent1(0);
					if (TContractNo2.getContractObject_RentFreeMode() == 1) {
						TContractNo2.setContractBody_Rent(TContractNo2.getContractBody_Rent() / 12);
					}
					if (AppUtil.getDay2(tStart, startTime) < 0 && AppUtil.getDay2(tStart, newEnd) < 0) {
						// 提前续约情况
						TContractNo1 = TContractNo2;
						TContractNo2 = null;
						tStartTOEnd = TContractNo1.getContractBody_StartTOEnd();
						tPlit = tStartTOEnd.split("~");
						tStart = tPlit[0];
						tStartY = AppUtil.Year(sf.parse(tStart));
						tEnd = tPlit[1];
					}
				}

				if (TContractNo1.getContractObject_ServiceBool() == null || TContractNo1.getContractObject_ServiceBool().equals(0)) {
					// 托管服务费
					if (TContractNo1.getContractBody_GuaranteeCost() != null) {
						tRepairMoney = Double.valueOf(TContractNo1.getContractBody_GuaranteeCost().split("\\|")[0]);
					} else {
						tRepairMoney = 0.0;
					}
					ViewBusinessContractVo viewBusinessContractVo3 = new ViewBusinessContractVo();
					viewBusinessContractVo3.setContractObject_No(TContractNo1.getContractObject_No());
					viewBusinessContractVo3.setContractObject_ServiceBool(1);
					achievementCompanyDAO.updateContractObjectServiceBool(viewBusinessContractVo3);
				}
				if (zContractNo.getContractObject_ServiceBool() == null || zContractNo.getContractObject_ServiceBool().equals(0)) {
					// 租赁服务费
					if (zContractNo.getContractBody_Service() != 0) {
						zRepairMoney = Double.valueOf(zContractNo.getContractBody_Service());
					} else {
						zRepairMoney = 0.0;
					}
					ViewBusinessContractVo viewBusinessContractVo3 = new ViewBusinessContractVo();
					viewBusinessContractVo3.setContractObject_No(zContractNo.getContractObject_No());
					viewBusinessContractVo3.setContractObject_ServiceBool(1);
					achievementCompanyDAO.updateContractObjectServiceBool(viewBusinessContractVo3);
				}

				// 租赁租金浮动
				String renMoney = "0";
				if (zContractNo.getContractBody_RentPlus() != null) {
					renMoney = zContractNo.getContractBody_RentPlus();
				}
				String[] rentMoneySplit = renMoney.split("\\|");
				for (int i = 0; i < rentMoneySplit.length; i++) {
					if (rentMoneySplit[i].contains("%")) {
						zContractNo.setContractBody_Rent(zContractNo.getContractBody_Rent() * (1 + Double.parseDouble(rentMoneySplit[i].replace("%", "")) / 100));
					} else {
						zContractNo.setContractBody_Rent(zContractNo.getContractBody_Rent() + Double.parseDouble(rentMoneySplit[i]));
					}
				}

				if (TContractNo2 == null) {
					Integer year = AppUtil.getMonth2(tStart, newEnd) / 12;
					Integer month = AppUtil.getMonth2(tStart, newEnd) % 12;
					if (month > 0) {
						year = year + 1;
					}
					// 托管租金递增
					String increasing = TContractNo1.getContractBody_Increasing();
					String[] increasingSplit = increasing.split("\\|");
					for (int i = 0; i < increasingSplit.length; i++) {
						if (i < year) {
							if (increasingSplit[i].contains("%")) {
								TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit[i].replace("%", "")) / 100));
							} else {
								TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() + Double.parseDouble(increasingSplit[i]));
							}
						}
					}

					// 托管租金浮动
					// String increasingMoney = "0";
					// if (TContractNo1.getContractBody_RentPlus() != null) {
					// increasingMoney =
					// TContractNo1.getContractBody_RentPlus();
					// }
					// String[] increasingMoneySplit =
					// increasingMoney.split("\\|");
					// for (int i = 0; i < increasingMoneySplit.length; i++) {
					// if (i < year) {
					// if (increasingMoneySplit[i].contains("%")) {
					// TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent()
					// *
					// (Double.parseDouble(increasingMoneySplit[i].replace("%",
					// "")) / 100));
					// } else {
					// TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent()
					// + Double.parseDouble(increasingMoneySplit[i]));
					// }
					// }
					// }

				} else {

					Integer year2 = AppUtil.getMonth2(tStart2, newEnd) / 12;
					Integer yeart2 = AppUtil.getMonth2(tStart2, newEnd) / 12;
					Integer month2 = AppUtil.getMonth2(tStart2, newEnd) % 12;
					if (month2 > 0) {
						year2 = year2 + 1;
					}

					Integer year1 = AppUtil.getMonth2(tStart, newEnd) / 12;
					Integer yeart1 = AppUtil.getMonth2(tStart, newEnd) / 12;
					Integer month1 = AppUtil.getMonth2(tStart, newEnd) % 12;
					if (month1 > 0) {
						year1 = year1 + 1;
					}

					String[] spliths = new String[] { tStart, newEnd };
					HashMap<String, Integer> mapshs = AppUtil.calLastBillDate2(spliths, AppUtil.getMonth2(tStart, newEnd), 0);
					if (mapshs.get("day") < 0) {
						year1 = year2;
						yeart1 = yeart2;
					}

					// 托管租金递增
					String increasing = TContractNo1.getContractBody_Increasing();
					String increasing2 = TContractNo2.getContractBody_Increasing();
					String[] increasingSplit = increasing.split("\\|");
					String[] increasingSplit2 = increasing2.split("\\|");
					for (int i = 0; i < increasingSplit.length; i++) {
						if (i < year1) {
							if (i < yeart1) {
								if (increasingSplit[i].contains("%")) {
									TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit[i].replace("%", "")) / 100));
								} else {
									TContractNo1.setContractBody_Rent(TContractNo1.getContractBody_Rent() + Double.parseDouble(increasingSplit[i]));
								}
							} else {
								if (increasingSplit[i].contains("%")) {
									TContractNo1.setContractBody_Rent1(TContractNo1.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit[i].replace("%", "")) / 100));
								} else {
									TContractNo1.setContractBody_Rent1(TContractNo1.getContractBody_Rent() + Double.parseDouble(increasingSplit[i]));
								}
							}
						}
					}
					for (int i = 0; i < increasingSplit2.length; i++) {
						if (i < year2) {
							if (i < yeart2) {
								if (increasingSplit2[i].contains("%")) {
									TContractNo2.setContractBody_Rent(TContractNo2.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit2[i].replace("%", "")) / 100));
								} else {
									TContractNo2.setContractBody_Rent(TContractNo2.getContractBody_Rent() + Double.parseDouble(increasingSplit2[i]));
								}
							} else {
								if (increasingSplit2[i].contains("%")) {
									TContractNo2.setContractBody_Rent1(TContractNo2.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit2[i].replace("%", "")) / 100));
								} else {
									TContractNo2.setContractBody_Rent1(TContractNo2.getContractBody_Rent() + Double.parseDouble(increasingSplit2[i]));
								}
							}
						}
					}

					/*
					 * Integer year = AppUtil.getMonth2(tStart, newEnd) / 12;
					 * Integer yeart = AppUtil.getMonth2(tStart, newEnd) / 12;
					 * Integer month = AppUtil.getMonth2(tStart, newEnd) % 12;
					 * if (month > 0) { year = year + 1; } // 托管租金浮动 String
					 * increasingMoney1 = "0"; if
					 * (TContractNo1.getContractBody_RentPlus() != null) {
					 * increasingMoney1 =
					 * TContractNo1.getContractBody_RentPlus(); } String
					 * increasingMoney2 = "0"; if
					 * (TContractNo2.getContractBody_RentPlus() != null) {
					 * increasingMoney2 =
					 * TContractNo2.getContractBody_RentPlus(); } String[]
					 * increasingMoneySplit1 = increasingMoney1.split("\\|");
					 * String[] increasingMoneySplit2 =
					 * increasingMoney2.split("\\|");
					 *
					 * for (int i = 0; i < increasingMoneySplit1.length; i++) {
					 * if (i < year) { if (i < yeart) { if
					 * (increasingMoneySplit1[i].contains("%")) {
					 * TContractNo1.setContractBody_Rent(TContractNo1.
					 * getContractBody_Rent()
					 * (Double.parseDouble(increasingMoneySplit1[i].replace("%",
					 * "")) / 100)); } else {
					 * TContractNo1.setContractBody_Rent(TContractNo1.
					 * getContractBody_Rent() +
					 * Double.parseDouble(increasingMoneySplit1[i])); } } else {
					 * if (increasingMoneySplit1[i].contains("%")) {
					 * TContractNo1.setContractBody_Rent1(TContractNo1.
					 * getContractBody_Rent()
					 * (Double.parseDouble(increasingMoneySplit1[i].replace("%",
					 * "")) / 100)); } else {
					 * TContractNo1.setContractBody_Rent1(TContractNo1.
					 * getContractBody_Rent() +
					 * Double.parseDouble(increasingMoneySplit1[i])); } } } }
					 *
					 * for (int i = 0; i < increasingMoneySplit2.length; i++) {
					 * if (i < year) { if (i < yeart) { if
					 * (increasingMoneySplit2[i].contains("%")) {
					 * TContractNo2.setContractBody_Rent(TContractNo2.
					 * getContractBody_Rent()
					 * (Double.parseDouble(increasingMoneySplit2[i].replace("%",
					 * "")) / 100)); } else {
					 * TContractNo2.setContractBody_Rent(TContractNo2.
					 * getContractBody_Rent() +
					 * Double.parseDouble(increasingMoneySplit2[i])); } } else {
					 * if (increasingMoneySplit2[i].contains("%")) {
					 * TContractNo2.setContractBody_Rent1(TContractNo2.
					 * getContractBody_Rent()
					 * (Double.parseDouble(increasingMoneySplit2[i].replace("%",
					 * "")) / 100)); } else {
					 * TContractNo2.setContractBody_Rent1(TContractNo2.
					 * getContractBody_Rent() +
					 * Double.parseDouble(increasingMoneySplit2[i])); } } } }
					 */

				}

				// 新业绩部分计算（差价）
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
					// 租赁合同在两份托管合同之间
					if (!tEnd2.equals("") && AppUtil.getDay2(startTime, tEnd2) > 0 && AppUtil.getDay2(tStart, newEnd) > 0) {
						bool = true;
						String[] split = new String[] { startTime, tEnd2 };
						HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(startTime, tEnd2), 0);
						if (TContractNo2 != null) {
							company += (zContractNo.getContractBody_Rent() - TContractNo2.getContractBody_Rent()) * (AppUtil.getMonth2(startTime, tEnd2)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo2.getContractBody_Rent()) / 30 * maps.get("day")));

							if (TContractNo2 != null && TContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(TContractNo2.getContractObject_DeadlineTime())) > 0) {
								company += (zContractNo.getContractBody_Rent() - TContractNo2.getContractBody_Rent1()) * (AppUtil.getMonth2(startTime, tEnd2)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo2.getContractBody_Rent1()) / 30 * maps.get("day")));
							}
						}

						String[] split1 = new String[] { tStart, newEnd };
						HashMap<String, Integer> maps1 = AppUtil.calLastBillDate2(split1, AppUtil.getMonth2(tStart, newEnd), 0);
						company += (zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent()) * (AppUtil.getMonth2(tStart, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent()) / 30 * maps1.get("day")));

						if (TContractNo2 != null && TContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(TContractNo2.getContractObject_DeadlineTime())) > 0) {
							company += (zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent1()) * (AppUtil.getMonth2(tStart, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent1()) / 30 * maps1.get("day")));
						}

						newMoney += company;

					} else {
						if (AppUtil.getDay2(oldEnd, newStart) < 0) {
							String[] split = new String[] { newStart, startTime };
							HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(newStart, startTime), 0);

							String[] split1 = new String[] { startTime, newEnd };
							HashMap<String, Integer> maps1 = AppUtil.calLastBillDate2(split1, AppUtil.getMonth2(startTime, newEnd), 0);
							company = (zContractNo.getContractBody_Rent() - oldZContractNo.getContractBody_Rent()) * (AppUtil.getMonth2(newStart, startTime)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - oldZContractNo.getContractBody_Rent()) / 30 * maps.get("day"))) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent()) * (AppUtil.getMonth2(startTime, newEnd) < 0 ? 0 : AppUtil.getMonth2(startTime, newEnd)))) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent()) / 30 * maps1.get("day")));
							if (TContractNo2 != null && TContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(TContractNo2.getContractObject_DeadlineTime())) > 0) {
								company = (zContractNo.getContractBody_Rent() - oldZContractNo.getContractBody_Rent()) * (AppUtil.getMonth2(newStart, startTime)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - oldZContractNo.getContractBody_Rent()) / 30 * maps.get("day"))) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent1()) * (AppUtil.getMonth2(startTime, newEnd) < 0 ? 0 : AppUtil.getMonth2(startTime, newEnd)))) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent1()) / 30 * maps1.get("day")));
							}

							newMoney += company;
						} else {
							String[] split = new String[] { startTime, newEnd };
							HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(startTime, newEnd), 0);
							newMoney += (zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent()) * (AppUtil.getMonth2(startTime, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent()) / 30 * maps.get("day")));
							if (TContractNo2 != null && TContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(TContractNo2.getContractObject_DeadlineTime())) > 0) {
								newMoney += (zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent1()) * (AppUtil.getMonth2(startTime, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - TContractNo1.getContractBody_Rent1()) / 30 * maps.get("day")));
							}
						}
					}
				}

				// 管理费
				if (!tEnd2.equals("") && AppUtil.getDay2(startTime, tEnd2) > 0 && AppUtil.getDay2(tStart, newEnd) > 0) {
					// 今年是合同的第几年
					String endDate = newStart;
					if (oldZContractNo != null && (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "转租"))) {
						endDate = oldEnd;
					}
					Integer xmonth2 = AppUtil.getMonth2(endDate, tEnd2);
					String[] split2 = new String[] { endDate, tEnd2 };
					HashMap<String, Integer> maps2 = AppUtil.calLastBillDate2(split2, AppUtil.getMonth2(endDate, tEnd2), 0);
					Integer day2 = maps2.get("day");
					if (day2 > 27) {
						xmonth2++;
					}

					// 管理费天数
					Integer xmonth = AppUtil.getMonth2(tStart, newEnd);
					String[] split = new String[] { tStart, newEnd };
					HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(tStart, newEnd), 0);
					Integer day = maps.get("day");
					if (day > 15) {
						xmonth++;
					}

					Double gMoney = 0.0;
					if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
						// 提取免租期金额：托管管理费/30*免租期天数=免租期金额
						gMoney = TContractNo1.getContractBody_Service();
						serviceMoney += gMoney / 12 * xmonth + gMoney / (12 * 30) * day;
					}

					if (TContractNo2 != null) {
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
							// 提取免租期金额：托管管理费/30*免租期天数=免租期金额
							gMoney = TContractNo2.getContractBody_Service();
							serviceMoney += gMoney / 12 * xmonth2 + gMoney / (12 * 30) * day2;
						}
					}
				} else {
					String endDate = newStart;
					if (oldZContractNo != null && (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "转租"))) {
						endDate = oldEnd;
					}
					Integer xmonth = AppUtil.getMonth2(endDate, newEnd);
					String[] splitm = new String[] { endDate, newEnd };
					HashMap<String, Integer> mapsm = AppUtil.calLastBillDate2(splitm, AppUtil.getMonth2(endDate, newEnd), 0);
					if (mapsm.get("day") > 27) {
						xmonth++;
					}
					Integer day = 0;
					if (oldZContractNo != null) {
						if (AppUtil.getMonth2(oldEnd, endDate) < 0) {
							xmonth = AppUtil.getMonth2(oldEnd, newEnd);
							if (xmonth < 0) {
								xmonth = 0;
							}
							String[] split = new String[] { oldEnd, newEnd };
							HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(oldEnd, newEnd), 0);
							day = maps.get("day");
						}
					}

					Double gMoney = 0.0;
					if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
						// 提取免租期金额：托管管理费/30*免租期天数=免租期金额
						gMoney = TContractNo1.getContractBody_Service();
						serviceMoney += gMoney / 12 * xmonth + gMoney / (12 * 30) * day;
					}
				}
			}

			// 出房最少包修费
			Double guaranteeOut = selectAchievementSetting.getAs_guaranteeOut();
			// 存房最少包修费
			Double guaranteeSave = selectAchievementSetting.getAs_guaranteeSave();

			// 扣除存房包修费
			if (tRepairMoney != null) {
				tRepairMoney = tRepairMoney - guaranteeSave;
				if (tRepairMoney > 0) {
					tRepairMoney = 0.0;
				}
			} else {
				tRepairMoney = 0.0;
			}
			// 扣除出房包修费
			if (zRepairMoney != null) {
				zRepairMoney = zRepairMoney - guaranteeOut;
				if (zRepairMoney > 0) {
					zRepairMoney = 0.0;
				}
			} else {
				zRepairMoney = 0.0;
			}

			// 免租期
			forRentDay = Double.valueOf(zContractNo.getContractObject_RentStr().split("-")[1]);
			// 免租期金额
			rentFreeMoney = TContractNo1.getContractBody_Rent() / 30 * forRentDay;
			// 招租期
			freeDay = Double.valueOf(zContractNo.getContractObject_RentStr().split("-")[0]);
			// 招租期金额
			if (sa_type.indexOf("转租") > -1 || AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "强退")) {
				freeMoney = 0.0;
			} else {
				freeMoney = TContractNo1.getContractBody_Rent() / 30 * freeDay;
			}
			if (sa_type.indexOf("转租") > -1) {
				freeMoney1 = 0.0;
			} else {
				freeMoney1 = TContractNo1.getContractBody_Rent() / 30 * freeDay;
			}

			lossMoney = 0;
			if ((rentFreeMoney - freeMoney) < 0) {
				lossMoney = rentFreeMoney - freeMoney;
			}

			// 出房不扣包修费
			zRepairMoney = 0.0;

			// 强退补贴 + 转租费 + 差价 + 免租期价格 + 管理费 == 总业绩
			if (sa_type.indexOf("转租") > -1) {
				double money = 0.0;
				if (newMoney > 0) {
					money = newMoney;
				}
				sumAchievement = achievementSubsidy + renewMoney + money + rentFreeMoney + serviceMoney
						+ tRepairMoney /* + zRepairMoney */ - zworkMoney - tworkMoney + adjmoney;
			} else {
				sumAchievement = achievementSubsidy + renewMoney + newMoney + rentFreeMoney - freeMoney + serviceMoney + tRepairMoney/* + zRepairMoney */ - zworkMoney - tworkMoney + adjmoney;
			}
			// 转租费 + 差价 + 免租期价格 + 管理费 - 招租期价格 == 总营收
			if (sa_type.indexOf("转租") > -1) {
				double money = 0.0;
				if (newMoney > 0) {
					money = newMoney;
				}
				sumMoney = renewMoney + money + rentFreeMoney + serviceMoney
						+ tRepairMoney /* + zRepairMoney */ - zworkMoney - tworkMoney + adjmoney;
			} else {
				sumMoney = renewMoney + newMoney + rentFreeMoney - freeMoney1 + serviceMoney
						+ tRepairMoney /* + zRepairMoney */ - zworkMoney - tworkMoney + adjmoney;
			}

			if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
				saveHouseOldMoney = (sumAchievement - renewMoney) / 2;
				aievementMoney = (sumAchievement - renewMoney) / 2;
			} else {
				saveHouseNewMoney = (sumAchievement - renewMoney) / 2;
				aievementMoney = (sumAchievement - renewMoney) / 2;
			}
			if (oldZContractNo != null && AppUtil.isOkState(oldZContractNo.getContractObject_OptionState(), "续约")) {
				outHouseOldMoney = (sumAchievement - renewMoney) / 2;
			} else {
				outHouseNewMoney = (sumAchievement - renewMoney) / 2;
			}

			boolean bools1 = true;

			boolean booles = false;
			for (AchievementSettingDetails achievementSettingDetails2 : selectAchievementSettingDetails) {
				if (oldZContractNo != null) {
					if (AppUtil.isOkState(oldZContractNo.getContractObject_OptionState(), achievementSettingDetails2.getAsd_type().replace("房", ""))) {
						booles = true;
					}
				}
			}

			// 出房和租金一半的差
			Double xmoneys = 0.0;
			if (AppUtil.isOkState(_state, "到期") || oldZContractNo == null) {
				if (leaseMonth < 12) {
					if (booles) {
						xmoneys = (outHouseNewMoney + outHouseOldMoney + renewMoney) - oldZContractNo.getContractBody_Rent() * 0.5 / 12 * leaseMonth;
					} else {
						xmoneys = (outHouseNewMoney + outHouseOldMoney + renewMoney) - zContractNo.getContractBody_Rent() * 0.5 / 12 * leaseMonth;
					}
				} else {
					if (booles) {
						xmoneys = (outHouseNewMoney + outHouseOldMoney + renewMoney) - oldZContractNo.getContractBody_Rent() * 0.5;
					} else {
						xmoneys = (outHouseNewMoney + outHouseOldMoney + renewMoney) - zContractNo.getContractBody_Rent() * 0.5;
					}
				}
			} else {
				xmoneys = outHouseNewMoney + outHouseOldMoney;
			}

			if (typeInt == 1) {
				// 小于0存房承担
				if (sumMoney <= 0) {
					if ((outHouseNewMoney + outHouseOldMoney) < zContractNo.getContractBody_Rent() * 0.5) {
						if (oldZContractNo != null && AppUtil.isOkState(oldZContractNo.getContractObject_OptionState(), "续约")) {
							outHouseNewMoney = 0.0;
							outHouseOldMoney = 0.0;
						} else {
							outHouseNewMoney = 0.0;
							outHouseOldMoney = 0.0;
						}
						if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
							saveHouseNewMoney = 0.0;
							saveHouseOldMoney += (xmoneys + saveHouseNewMoney);
						} else {
							if (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "强退")) {
							} else {
								saveHouseNewMoney += (xmoneys + saveHouseNewMoney);
								saveHouseOldMoney = 0.0;
							}
						}
						if (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "强退")) {

						} else {
							achievementSubsidy1 += -xmoneys;
						}
						bools1 = false;
					}
				}
			} else if (typeInt == 2) {
				// 存房承担半个月租金
				if (xmoneys < 0) {
					if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
						saveHouseNewMoney = 0.0;
						saveHouseOldMoney += xmoneys;
					} else {
						if (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "强退")) {
						} else {
							saveHouseNewMoney += xmoneys;
							saveHouseOldMoney = 0.0;
						}
					}
					if (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "强退")) {

					} else {
						achievementSubsidy1 += -xmoneys;
					}
					bools1 = false;
				}
			} else if (typeInt == 3) {
				// 公司承担半个月租金
				if (xmoneys < 0) {
					if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
						saveHouseNewMoney = 0.0;
						companyMoneyS += xmoneys;
					} else {
						companyMoneyS += xmoneys;
						saveHouseOldMoney = 0.0;
					}
					achievementSubsidy += -xmoneys;
					bools1 = false;
				}
			}

			if (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "强退")) {
				lossComanyMoney = -freeMoney1;
				if (sumAchievement < 0) {
					achievementSubsidy1 += -outHouseNewMoney;
				}
			}

			if (typeInt == 1 && sumAchievement < 0) {
				sumAchievement = achievementSubsidy1;
			}

			outHouseNewMoney = Double.valueOf(df.format(outHouseNewMoney));
			outHouseOldMoney = Double.valueOf(df.format(outHouseOldMoney));

			Double saveNewMoney1 = 0.0;
			Double saveOldMoney1 = 0.0;
			Double saveNewMoney2 = 0.0;
			Double saveOldMoney2 = 0.0;
			if (bool) {
				// 计算当前租赁合同和上一份租赁合同的时间段，重叠时间，和不重叠时间
				String newStartTOEnd = zContractNo.getContractBody_StartTOEnd();
				String[] newsplit = newStartTOEnd.split("~");
				// 最新租赁合同开始时间
				String newStart = newsplit[0];
				Integer newStartY = AppUtil.Year(sf.parse(newStart));
				startTime = newStart;
				// 最新租赁合同结束时间
				String newEnd = newsplit[1];
				Integer newEndY = AppUtil.Year(sf.parse(newEnd));

				if (oldZContractNo != null) {
					String oldStartTOEnd = oldZContractNo.getContractBody_StartTOEnd();
					String[] oldsplit = oldStartTOEnd.split("~");
					// 以前租赁合同开始时间
					String oldstat = oldsplit[0];
					// 以前租赁合同结束时间
					String oldEnd = oldsplit[1];
					// 是否有转租
					if (!AppUtil.isOkState(_state, "退租")) {
						if (AppUtil.getDay2(oldEnd, newStart) < 0 && (oldZContractNo == null || !AppUtil.isOkState(_state, "到期"))) {
							startTime = oldEnd;
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
								ViewContractStatement viewContractStatement = new ViewContractStatement();
								viewContractStatement.setCco_state("取消");
								viewContractStatement.setContractObject_Code(oldZContractNo.getContractObject_Code());
								ViewContractStatement contractNoShutTime = achievementCompanyDAO.selectContractNoShutTime(viewContractStatement).get(0);
								// 转租时间
								if (AppUtil.isOkState(_state, "强收")) {
									achievementSubsidy += oldZContractNo.getContractBody_Rent() / 2;
								} else {
									if (contractNoShutTime.getCco_subletCost() == null) {
										renewMoney += oldZContractNo.getContractBody_Rent() / 2;
									} else {
										renewMoney += contractNoShutTime.getCco_subletCost();
									}
								}
							}
						}
					}

					if (AppUtil.isOkState(_state, "退租")) {
						if (AppUtil.getDay2(oldEnd, newEnd) > 0) {
							startTime = oldEnd;
						} else {
							startTime = newEnd;
						}
						renewMoney += oldZContractNo.getContractBody_Rent() / 2;
					}
				}

				// 计算当前租赁合同和上一份租赁合同的时间段，重叠时间，和不重叠时间
				String tStartTOEnd = "";
				String[] tPlit = null;
				// 最新托管合同开始时间
				String tStart = "";
				Integer tStartY = 0;
				// 最新托管合同结束时间
				String tEnd = "";

				String tStartTOEnd2 = "";
				String[] tPlit2 = null;
				// 最新托管合同开始时间
				String tStart2 = "";
				Integer tStartY2 = 0;
				// 最新托管合同结束时间
				String tEnd2 = "";
				if (TContractNo2 == null) {
					tStartTOEnd = TContractNo1.getContractBody_StartTOEnd();
					tPlit = tStartTOEnd.split("~");
					tStart = tPlit[0];
					tStartY = AppUtil.Year(sf.parse(tStart));
					tEnd = tPlit[1];
				} else {
					tStartTOEnd = TContractNo1.getContractBody_StartTOEnd();
					tPlit = tStartTOEnd.split("~");
					tStart = tPlit[0];
					tStartY = AppUtil.Year(sf.parse(tStart));
					tEnd = tPlit[1];

					tStartTOEnd2 = TContractNo2.getContractBody_StartTOEnd();
					tPlit2 = tStartTOEnd2.split("~");
					tStart2 = tPlit2[0];
					tStartY2 = AppUtil.Year(sf.parse(tStart2));
					tEnd2 = tPlit2[1];
					if (AppUtil.getDay2(tStart, startTime) < 0 && AppUtil.getDay2(tStart, newEnd) < 0) {
						// 提前续约情况
						TContractNo1 = TContractNo2;
						TContractNo2 = null;
						tStartTOEnd = TContractNo1.getContractBody_StartTOEnd();
						tPlit = tStartTOEnd.split("~");
						tStart = tPlit[0];
						tStartY = AppUtil.Year(sf.parse(tStart));
						tEnd = tPlit[1];
					}
				}

				double month1 = 0.0;
				if (TContractNo2 != null) {
					month1 = AppUtil.getMonth2(newStart, tEnd2);
				}
				double month2 = AppUtil.getMonth2(tStart, newEnd);
				double xmonth = 0.0;
				if (month2 > month1) {
					xmonth = month1 / month2;
					saveNewMoney1 = saveHouseNewMoney * xmonth;
					saveOldMoney1 = saveHouseOldMoney * xmonth;
					saveNewMoney2 = saveHouseNewMoney * (1 - xmonth);
					saveOldMoney2 = saveHouseOldMoney * (1 - xmonth);
				} else {
					xmonth = month2 / month1;
					saveNewMoney2 = saveHouseNewMoney * xmonth;
					saveOldMoney2 = saveHouseOldMoney * xmonth;
					saveNewMoney1 = saveHouseNewMoney * (1 - xmonth);
					saveOldMoney1 = saveHouseOldMoney * (1 - xmonth);
				}
			} else {
				saveNewMoney1 = saveHouseNewMoney;
				saveOldMoney1 = saveHouseOldMoney;
			}

			lossMoney = Double.valueOf(df.format(lossMoney));

			if (bools1) {
				renewMoney += achievementSubsidy + achievementSubsidy1;
			}

			if (sa_type.indexOf("转租") > -1) {
				if (newMoney < 0) {
					sumMoney += newMoney;
				}
			}

			// 出房部门负责人
			ViewBusinessContractRelaEmpVo contractRelaEmpVo = new ViewBusinessContractRelaEmpVo();
			contractRelaEmpVo.setContractObject_No(zContractNo.getContractObject_No());
			List<ViewBusinessContractRelaEmpVo> fzOutEmployee = userCenterContractObjectService.queryViewContractRelaEmp(contractRelaEmpVo);

			// 存房部门负责人
			List<ViewBusinessContractRelaEmpVo> fzSaveEmployee1 = null;
			List<ViewBusinessContractRelaEmpVo> fzSaveEmployee2 = null;
			if (bool) {
				ViewBusinessContractRelaEmpVo contractRelaEmpVo1 = new ViewBusinessContractRelaEmpVo();
				contractRelaEmpVo1.setContractObject_No(TContractNo1.getContractObject_No());
				fzSaveEmployee1 = userCenterContractObjectService.queryViewContractRelaEmp(contractRelaEmpVo1);

				if (TContractNo2 != null) {
					ViewBusinessContractRelaEmpVo contractRelaEmpVo2 = new ViewBusinessContractRelaEmpVo();
					contractRelaEmpVo2.setContractObject_No(TContractNo2.getContractObject_No());
					fzSaveEmployee2 = userCenterContractObjectService.queryViewContractRelaEmp(contractRelaEmpVo2);
				}
			} else {
				ViewBusinessContractRelaEmpVo contractRelaEmpVo1 = new ViewBusinessContractRelaEmpVo();
				contractRelaEmpVo1.setContractObject_No(TContractNo1.getContractObject_No());
				fzSaveEmployee1 = userCenterContractObjectService.queryViewContractRelaEmp(contractRelaEmpVo1);
			}

			// 超级管理员代表营销部
			UserCenterEmployee employeeCompany = new UserCenterEmployee();
			employeeCompany = userCenterEmployeeDao.selectUserCenterEmployeeCompany(employeeCompany).get(0);

			// 代表公司
			UserCenterEmployee employeeCompanyGjp = new UserCenterEmployee();
			employeeCompanyGjp = userCenterEmployeeDao.selectUserCenterEmployeeCompanyGjp(employeeCompanyGjp).get(0);

			// 总业绩
			AchievementSumAchievement achievementSumAchievement = new AchievementSumAchievement();
			achievementSumAchievement.setHi_code(zContractNo.getHi_code());
			achievementSumAchievement.setSa_type(sa_type);
			Double sNewMoney = 0.0;
			Double sOldMoney = 0.0;
			if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
				sOldMoney += saveHouseOldMoney;
			} else {
				sNewMoney += saveHouseNewMoney;
			}
			if (oldZContractNo != null && AppUtil.isOkState(_state, "续约")) {
				sOldMoney += outHouseOldMoney + renewMoney;
			} else {
				sNewMoney += outHouseNewMoney + renewMoney;
			}
			achievementSumAchievement.setSa_newMoney(Double.valueOf(df.format(sNewMoney)));
			achievementSumAchievement.setSa_oldMoney(Double.valueOf(df.format(sOldMoney)));
			achievementSumAchievement.setSa_startEndTime(zContractNo.getContractBody_StartTOEnd());
			achievementSumAchievement.setSa_tStartEndTime(TContractNo1.getContractBody_StartTOEnd());
			achievementSumAchievement.setSa_sumMoney(Double.valueOf(df.format(sumAchievement)));
			achievementSumAchievement.setSa_sumMoneyH(Double.valueOf(df.format(sumMoney)));
			achievementSumAchievement.setSa_auditType(0);
			achievementSumAchievement.setSa_lossDay(lossDay);
			achievementSumAchievement.setSa_lossMoney(Double.valueOf(df.format(freeMoney)));
			achievementSumAchievement.setSa_forRentDay(forRentDay);
			achievementSumAchievement.setSa_freeDay(freeDay);
			achievementSumAchievement.setSa_freeMoney(Double.valueOf(df.format(freeMoney1)));
			achievementSumAchievement.setSa_difference(newMoney);
			achievementSumAchievement.setSa_time(new Date());
			achievementSumAchievement.setSa_saveMoney(TContractNo1.getContractBody_Rent());
			achievementSumAchievement.setSa_turnRentMoney(renewMoney);
			achievementSumAchievement.setContractObject_Id(zContractNo.getContractObject_Id());
			achievementSumAchievement.setSa_zworkMoney(zworkMoney);
			achievementSumAchievement.setSa_tworkMoney(tworkMoney);
			if (bool) {
				if (TContractNo2 != null) {
					achievementSumAchievement.setSa_saveMoney2(TContractNo2.getContractBody_Rent());
				}
			} else {
				achievementSumAchievement.setSa_saveMoney2(0.0);
			}
			achievementSumAchievement.setSa_outMoney(zContractNo.getContractBody_Rent());
			if (bool) {
				if (oldZContractNo != null) {
					achievementSumAchievement.setSa_outMoney2(oldZContractNo.getContractBody_Rent());
				}
			} else {
				achievementSumAchievement.setSa_outMoney2(0.0);
			}
			achievementSumAchievement.setSa_startDate(sf.parse(zContractNo.getContractBody_StartTOEnd().split("~")[0]));
			achievementSumAchievement.setSa_endDate(sf.parse(zContractNo.getContractBody_StartTOEnd().split("~")[1]));
			String sa_uccID = "";
			for (ViewBusinessContractRelaEmpVo outEmployee : fzOutEmployee) {
				UserCenterEmployee employee = new UserCenterEmployee();
				employee.setEm_id(outEmployee.getEm_id());
				if (!userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).isEmpty()) {
					employee = userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).get(0);
					sa_uccID += employee.getUcc_id().toString() + ",";
				}
			}
			for (ViewBusinessContractRelaEmpVo saveEmployee : fzSaveEmployee1) {
				UserCenterEmployee employee = new UserCenterEmployee();
				employee.setEm_id(saveEmployee.getEm_id());
				if (!userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).isEmpty()) {
					employee = userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).get(0);
					sa_uccID += employee.getUcc_id().toString() + ",";
				}
			}
			if (fzSaveEmployee2 != null) {
				for (ViewBusinessContractRelaEmpVo saveEmployee : fzSaveEmployee2) {
					UserCenterEmployee employee = new UserCenterEmployee();
					employee.setEm_id(saveEmployee.getEm_id());
					if (!userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).isEmpty()) {
						employee = userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).get(0);
						sa_uccID += employee.getUcc_id().toString() + ",";
					}
				}
			}
			if (!sa_uccID.equals("")) {
				sa_uccID = sa_uccID.substring(0, sa_uccID.length() - 1);
			}
			achievementSumAchievement.setSa_uccID(sa_uccID);
			achievementSumAchievement.setSa_zRepairMoney(zRepairMoney);
			achievementSumAchievement.setSa_tRepairMoney(tRepairMoney);
			achievementCompanyDAO.insertSumAchievement(achievementSumAchievement);
			map.put("contractObject_Id", achievementSumAchievement.getContractObject_Id());
			map.put("sa_id", achievementSumAchievement.getSa_id());

			String[] startTOEndSplit = zContractNo.getContractBody_StartTOEnd().split("~");
			int month = 0;
			int year = 0;
			int mMonth = 0;
			int num = 0;
			int nums = 0;
			String typeM = "";
			double proportion = 0.0;
			Date date1 = null;
			List<Date> dateList = new ArrayList<Date>();

			if (payStyle.equals("月付") || payStyle.equals("年付")) {
				month = AppUtil.getMonth2(startTOEndSplit[0], startTOEndSplit[1]);
				String[] split = new String[] { startTOEndSplit[0], startTOEndSplit[1] };
				HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(startTOEndSplit[0], startTOEndSplit[1]), 0);
				if (maps.get("day") > 27) {
					month++;
				}
				if (month == 0 || month == -1) {
					month = 1;
				}
				year = month / 12;
				mMonth = month % 12;
				proportion = (double) mMonth / (double) month;
				num = year;
				if (mMonth > 0) {
					num += 1;
				}
				typeM = "年提";
				Date date = zContractNo.getContractObject_FillTime();
				int year1 = AppUtil.Year(date);
				int Month1 = AppUtil.Moth(date);
				date1 = sf.parse(AppUtil.getLastDayOfMonth(year1, Month1));
				dateList.add(date1);

				for (int i = 0; i < (num - 1); i++) {
					Calendar c = Calendar.getInstance();
					c.setTime(date1);
					c.add(Calendar.YEAR, i + 1);
					dateList.add(c.getTime());
				}

			} else {
				month = AppUtil.getMonth2(startTOEndSplit[0], startTOEndSplit[1]);
				String[] split = new String[] { startTOEndSplit[0], startTOEndSplit[1] };
				HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(startTOEndSplit[0], startTOEndSplit[1]), 0);
				if (maps.get("day") > 27) {
					month++;
				}
				if (month == 0 || month == -1) {
					month = 1;
				}
				year = month / 6;
				mMonth = month % 6;
				proportion = (double) mMonth / (double) month;
				num = year;
				if (mMonth > 0) {
					num += 1;
				}
				typeM = "半年提";
				Date date = zContractNo.getContractObject_FillTime();
				int year1 = AppUtil.Year(date);
				int Month1 = AppUtil.Moth(date);
				date1 = sf.parse(AppUtil.getLastDayOfMonth(year1, Month1));
				dateList.add(date1);

				for (int i = 0; i < (num - 1); i++) {
					Calendar c = Calendar.getInstance();
					c.setTime(date1);
					c.add(Calendar.MONTH, 6 * (i + 1));
					dateList.add(c.getTime());
				}
			}
			nums = num;
			if (saveHouseNewMoney >= 0 && saveHouseOldMoney >= 0) {
				AchievementBill achievementBill = new AchievementBill();
				AchievementBillContent achievementBillContent = new AchievementBillContent();
				for (int j = 0; j < nums; j++) {
					// 出房提成账单
					for (ViewBusinessContractRelaEmpVo outEmployee : fzOutEmployee) {
						achievementBill.setSa_id(achievementSumAchievement.getSa_id());
						achievementBill.setHi_code(zContractNo.getHi_code());
						achievementBill.setEm_id(outEmployee.getEm_id());
						achievementBill.setAb_type(typeM);
						achievementBill.setAb_num(j);
						achievementBill.setAb_acType(sa_type);
						if (oldZContractNo != null && AppUtil.isOkState(_state, "续约")) {
							achievementBill.setAb_oldMoney(Double.valueOf(df.format((outHouseOldMoney + renewMoney + achievementSubsidy1) / 100 * outEmployee.getContract_perforSplit() / nums)));
							achievementBill.setAb_newMoney(0.0);
						} else {
							achievementBill.setAb_oldMoney(0.0);
							achievementBill.setAb_newMoney(Double.valueOf(df.format((outHouseNewMoney + renewMoney + achievementSubsidy1) / 100 * outEmployee.getContract_perforSplit() / nums)));
						}
						achievementBill.setAb_moneyPercentage(outEmployee.getContract_perforSplit() / 100);
						achievementBill.setAb_payState(0);
						achievementBill.setAb_ctype(2);
						achievementBill.setAb_lossDay(lossDay);
						achievementBill.setAb_lossMoney(lossMoney);
						achievementBill.setAb_forRentDay(forRentDay);
						achievementBill.setAb_freeDay(freeDay);
						achievementBill.setAb_payTime(dateList.get(j));
						achievementBill.setContractObject_Id(zContractNo.getContractObject_Id());

						UserCenterEmployee employee = new UserCenterEmployee();
						employee.setEm_id(outEmployee.getEm_id());
						if (!userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).isEmpty()) {
							employee = userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).get(0);
							achievementBill.setUcc_id(employee.getUcc_id());
						} else {
							achievementBill.setUcc_id(20);
						}
						achievementBill.setAb_moneyType(payStyle + ":" + payType);
						achievementCompanyDAO.insertAchievementBill(achievementBill);

						if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
							achievementBillContent.setAbc_type("管理费");
							achievementBillContent.setAbc_money(serviceMoney);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
							achievementBillContent.setAbc_type("免租期");
							achievementBillContent.setAbc_money(rentFreeMoney);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
							achievementBillContent.setAbc_type("差价");
							achievementBillContent.setAbc_money(newMoney);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
							achievementBillContent.setAbc_type("转租费");
							achievementBillContent.setAbc_money(renewMoney);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
							achievementBillContent.setAbc_type("业绩补贴");
							if (xmoneys > 0) {
								achievementBillContent.setAbc_money(0.0);
							} else {
								if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
									achievementBillContent.setAbc_money(achievementSubsidy + achievementSubsidy1 - aievementMoney);
								} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
									achievementBillContent.setAbc_money(achievementSubsidy + achievementSubsidy1);
								} else {
									achievementBillContent.setAbc_money(achievementSubsidy + achievementSubsidy1 + aievementMoney);
								}
							}
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}

					}
				}

				for (int j = 0; j < num; j++) {
					for (ViewBusinessContractRelaEmpVo saveEmployee : fzSaveEmployee1) {
						// 存房提成账单
						achievementBill.setSa_id(achievementSumAchievement.getSa_id());
						achievementBill.setHi_code(zContractNo.getHi_code());
						achievementBill.setEm_id(saveEmployee.getEm_id());
						achievementBill.setAb_type(typeM);
						achievementBill.setAb_num(j);
						if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
							achievementBill.setAb_acType("续约存房");
						} else {
							achievementBill.setAb_acType("存房");
						}
						if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
							Double moneys = 0.0;
							boolean boolt = true;
							if (j > (year - 1)) {
								boolt = false;
								moneys = saveOldMoney1 / 100 * saveEmployee.getContract_perforSplit() * proportion;
							} else {
								moneys = saveOldMoney1 / 100 * saveEmployee.getContract_perforSplit() * (1 - proportion);
							}
							if (moneys < 0) {
								moneys = moneys * 0.5;
							} else {
								if (boolt) {
									if (num != 2 || proportion == 0) {
										if (num > 1) {
											num = (num - 1);
										}
										moneys = moneys / num;
									}
								}
							}
							moneys = Double.valueOf(df.format(moneys));
							achievementBill.setAb_oldMoney(moneys);
							achievementBill.setAb_newMoney(0.0);
						} else {
							achievementBill.setAb_oldMoney(0.0);
							Double moneys = 0.0;
							boolean boolt = true;
							if (j > (year - 1)) {
								boolt = false;
								moneys = saveNewMoney1 / 100 * saveEmployee.getContract_perforSplit() * proportion;
							} else {
								moneys = saveNewMoney1 / 100 * saveEmployee.getContract_perforSplit() * (1 - proportion);
							}
							if (moneys < 0) {
								moneys = moneys * 0.5;
							} else {
								if (boolt) {
									if (num != 2 || proportion == 0) {
										if (num > 1) {
											num = (num - 1);
										}
										moneys = moneys / num;
									}
								}
							}
							moneys = Double.valueOf(df.format(moneys));
							achievementBill.setAb_newMoney(moneys);
						}
						achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
						achievementBill.setAb_payState(0);
						achievementBill.setAb_ctype(1);
						achievementBill.setAb_payTime(dateList.get(j));
						achievementBill.setAb_lossDay(lossDay);
						achievementBill.setAb_lossMoney(lossMoney);
						achievementBill.setAb_forRentDay(forRentDay);
						achievementBill.setAb_freeDay(freeDay);
						achievementBill.setAb_moneyType(payStyle + ":" + payType);
						achievementBill.setContractObject_Id(TContractNo1.getContractObject_Id());
						UserCenterEmployee employee = new UserCenterEmployee();
						employee.setEm_id(saveEmployee.getEm_id());
						if (!userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).isEmpty()) {
							employee = userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).get(0);
							achievementBill.setUcc_id(employee.getUcc_id());
						} else {
							achievementBill.setUcc_id(20);
						}
						achievementCompanyDAO.insertAchievementBill(achievementBill);

						if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
							achievementBillContent.setAbc_type("管理费");
							achievementBillContent.setAbc_money(serviceMoney);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
							achievementBillContent.setAbc_type("免租期");
							achievementBillContent.setAbc_money(0.0);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
							achievementBillContent.setAbc_type("差价");
							achievementBillContent.setAbc_money(0.0);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
							achievementBillContent.setAbc_type("转租费");
							achievementBillContent.setAbc_money(0.0);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
							achievementBillContent.setAbc_type("业绩补贴");
							if (xmoneys > 0) {
								achievementBillContent.setAbc_money(0.0);
							} else {
								if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
									achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.5));
								} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
									achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1));
								} else {
									achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.5));
								}
							}
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}

						// 存房金额小于0
						if (saveHouseOldMoney < 0 || saveHouseNewMoney < 0) {
							// 部门主管
							UserCenterEmployee employeeZG = new UserCenterEmployee();
							UserCenterEmployee centerEmployee = new UserCenterEmployee();
							centerEmployee.setEm_id(saveEmployee.getEm_id());
							if (!centerEmployeeDao.selectCompanyID(centerEmployee).isEmpty() && !saveEmployee.getEm_name().equals("超级管理员")) {
								if (centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcp_name().indexOf("经理") == -1) {
									employeeZG.setUcp_name("主管");
									employeeZG.setUcc_phone((centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcc_phone()));
								} else {
									employeeZG.setUcc_name(centerEmployee.getUcc_name());
									employeeZG.setUcc_phone((centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcc_phone()));
								}
							} else {
								employeeZG.setUcc_phone("13996393605");
							}
							employeeZG = userCenterEmployeeDao.selectUserCenterEmployeeZG(employeeZG).get(0);
							// 存房提成账单
							achievementBill.setSa_id(achievementSumAchievement.getSa_id());
							achievementBill.setHi_code(zContractNo.getHi_code());
							achievementBill.setEm_id(employeeZG.getEm_id());
							achievementBill.setAb_type("年提");
							achievementBill.setAb_num(j);
							achievementBill.setAb_acType("承担亏损");
							if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
								achievementBill.setAb_oldMoney(Double.valueOf(df.format(saveHouseOldMoney * 0.35)));
								achievementBill.setAb_newMoney(0.0);
							} else {
								achievementBill.setAb_oldMoney(0.0);
								achievementBill.setAb_newMoney(Double.valueOf(df.format(saveHouseNewMoney * 0.35)));
							}
							achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
							achievementBill.setAb_payState(0);
							achievementBill.setAb_ctype(3);
							achievementBill.setAb_payTime(dateList.get(j));
							achievementBill.setAb_lossDay(lossDay);
							achievementBill.setAb_lossMoney(lossMoney);
							achievementBill.setAb_forRentDay(forRentDay);
							achievementBill.setAb_freeDay(freeDay);
							achievementBill.setAb_moneyType(payStyle + ":" + payType);
							achievementBill.setContractObject_Id(TContractNo1.getContractObject_Id());
							achievementBill.setUcc_id(employeeZG.getUcc_id());
							achievementCompanyDAO.insertAchievementBill(achievementBill);

							if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
								achievementBillContent.setAbc_type("管理费");
								achievementBillContent.setAbc_money(serviceMoney);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
								achievementBillContent.setAbc_type("免租期");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
								achievementBillContent.setAbc_type("差价");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
								achievementBillContent.setAbc_type("转租费");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
								achievementBillContent.setAbc_type("业绩补贴");
								if (xmoneys > 0) {
									achievementBillContent.setAbc_money(0.0);
								} else {
									if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.35));
									} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
										achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1) * 0.35);
									} else {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.35));
									}
								}
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}

							// 销售经理承担
							UserCenterEmployee employeeJL = new UserCenterEmployee();
							employeeJL.setUcp_name("销售经理");
							employeeJL.setEm_phone(saveEmployee.getEm_phone());
							employeeJL = userCenterEmployeeDao.selectUserCenterEmployeeZG(employeeJL).get(0);
							// 存房提成账单
							achievementBill.setSa_id(achievementSumAchievement.getSa_id());
							achievementBill.setHi_code(zContractNo.getHi_code());
							achievementBill.setEm_id(employeeZG.getEm_id());
							achievementBill.setAb_type("年提");
							achievementBill.setAb_num(j);
							achievementBill.setAb_acType("承担亏损");
							if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
								achievementBill.setAb_oldMoney(Double.valueOf(df.format(saveHouseOldMoney * 0.1)));
								achievementBill.setAb_newMoney(0.0);
							} else {
								achievementBill.setAb_oldMoney(0.0);
								achievementBill.setAb_newMoney(Double.valueOf(df.format(saveHouseNewMoney * 0.1)));
							}
							achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
							achievementBill.setAb_payState(0);
							achievementBill.setAb_ctype(3);
							achievementBill.setAb_payTime(dateList.get(j));
							achievementBill.setAb_lossDay(lossDay);
							achievementBill.setAb_lossMoney(lossMoney);
							achievementBill.setAb_forRentDay(forRentDay);
							achievementBill.setAb_freeDay(freeDay);
							achievementBill.setAb_moneyType(payStyle + ":" + payType);
							achievementBill.setContractObject_Id(TContractNo2.getContractObject_Id());
							achievementBill.setUcc_id(employeeJL.getUcc_id());
							achievementCompanyDAO.insertAchievementBill(achievementBill);

							if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
								achievementBillContent.setAbc_type("管理费");
								achievementBillContent.setAbc_money(serviceMoney);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
								achievementBillContent.setAbc_type("免租期");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
								achievementBillContent.setAbc_type("差价");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
								achievementBillContent.setAbc_type("转租费");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
								achievementBillContent.setAbc_type("业绩补贴");
								if (xmoneys > 0) {
									achievementBillContent.setAbc_money(0.0);
								} else {
									if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.1));
									} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
										achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1) * 0.1);
									} else {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.1));
									}
								}
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}

							// 存房提成账单(营销部承担部分)
							achievementBill.setSa_id(achievementSumAchievement.getSa_id());
							achievementBill.setHi_code(zContractNo.getHi_code());
							achievementBill.setEm_id(employeeCompany.getEm_id());
							achievementBill.setAb_type("年提");
							achievementBill.setAb_num(j);
							achievementBill.setAb_acType("承担亏损");
							if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
								achievementBill.setAb_oldMoney(Double.valueOf(df.format(saveHouseOldMoney * 0.05)));
								achievementBill.setAb_newMoney(0.0);
							} else {
								achievementBill.setAb_oldMoney(0.0);
								achievementBill.setAb_newMoney(Double.valueOf(df.format(saveHouseNewMoney * 0.05)));
							}
							achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
							achievementBill.setAb_payState(0);
							achievementBill.setAb_ctype(3);
							achievementBill.setAb_payTime(dateList.get(j));
							achievementBill.setAb_lossDay(lossDay);
							achievementBill.setAb_lossMoney(lossMoney);
							achievementBill.setAb_forRentDay(forRentDay);
							achievementBill.setAb_freeDay(freeDay);
							achievementBill.setAb_moneyType(payStyle + ":" + payType);
							achievementBill.setContractObject_Id(TContractNo1.getContractObject_Id());
							achievementBill.setUcc_id(employeeCompany.getUcc_id());
							achievementCompanyDAO.insertAchievementBill(achievementBill);

							if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
								achievementBillContent.setAbc_type("管理费");
								achievementBillContent.setAbc_money(serviceMoney);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
								achievementBillContent.setAbc_type("免租期");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
								achievementBillContent.setAbc_type("差价");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
								achievementBillContent.setAbc_type("转租费");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
								achievementBillContent.setAbc_type("业绩补贴");
								if (xmoneys > 0) {
									achievementBillContent.setAbc_money(0.0);
								} else {
									if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.05));
									} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
										achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1) * 0.05);
									} else {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.05));
									}
								}
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}

						}
					}

					if (fzSaveEmployee2 != null) {
						for (ViewBusinessContractRelaEmpVo saveEmployee : fzSaveEmployee2) {
							// 存房提成账单
							achievementBill.setSa_id(achievementSumAchievement.getSa_id());
							achievementBill.setHi_code(zContractNo.getHi_code());
							achievementBill.setEm_id(saveEmployee.getEm_id());
							achievementBill.setAb_type(typeM);
							achievementBill.setAb_num(j);
							if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
								achievementBill.setAb_acType("续约存房");
							} else {
								achievementBill.setAb_acType("存房");
							}
							if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
								Double moneys = 0.0;
								boolean boolt = true;
								if (j > (year - 1)) {
									boolt = false;
									moneys = saveOldMoney2 / 100 * saveEmployee.getContract_perforSplit() * proportion;
								} else {
									moneys = saveOldMoney2 / 100 * saveEmployee.getContract_perforSplit() * (1 - proportion);
								}
								if (moneys < 0) {
									moneys = moneys * 0.5;
								} else {
									if (boolt) {
										if (num != 2 || proportion == 0) {
											if (num > 1) {
												num = (num - 1);
											}
											moneys = moneys / num;
										}
									}
								}
								moneys = Double.valueOf(df.format(moneys));
								achievementBill.setAb_oldMoney(moneys);
								achievementBill.setAb_newMoney(0.0);
							} else {
								achievementBill.setAb_oldMoney(0.0);
								Double moneys = 0.0;
								boolean boolt = true;
								if (j > (year - 1)) {
									boolt = false;
									moneys = saveNewMoney2 / 100 * saveEmployee.getContract_perforSplit() * proportion;
								} else {
									moneys = saveNewMoney2 / 100 * saveEmployee.getContract_perforSplit() * (1 - proportion);
								}
								if (moneys < 0) {
									moneys = moneys * 0.5;
								} else {
									if (boolt) {
										if (num != 2 || proportion == 0) {
											if (num > 1) {
												num = (num - 1);
											}
											moneys = moneys / num;
										}
									}
								}
								moneys = Double.valueOf(df.format(moneys));
								achievementBill.setAb_newMoney(moneys);
							}
							achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
							achievementBill.setAb_payState(0);
							achievementBill.setAb_ctype(1);
							achievementBill.setAb_payTime(dateList.get(j));
							achievementBill.setAb_lossDay(lossDay);
							achievementBill.setAb_lossMoney(lossMoney);
							achievementBill.setAb_forRentDay(forRentDay);
							achievementBill.setAb_freeDay(freeDay);
							achievementBill.setAb_moneyType(payStyle + ":" + payType);
							achievementBill.setContractObject_Id(TContractNo2.getContractObject_Id());
							UserCenterEmployee employee = new UserCenterEmployee();
							employee.setEm_id(saveEmployee.getEm_id());
							if (!userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).isEmpty()) {
								employee = userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).get(0);
								achievementBill.setUcc_id(employee.getUcc_id());
							} else {
								achievementBill.setUcc_id(20);
							}
							achievementCompanyDAO.insertAchievementBill(achievementBill);

							if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
								achievementBillContent.setAbc_type("管理费");
								achievementBillContent.setAbc_money(serviceMoney);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
								achievementBillContent.setAbc_type("免租期");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
								achievementBillContent.setAbc_type("差价");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
								achievementBillContent.setAbc_type("转租费");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
								achievementBillContent.setAbc_type("业绩补贴");
								if (xmoneys > 0) {
									achievementBillContent.setAbc_money(0.0);
								} else {
									if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.5));
									} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
										achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1));
									} else {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.5));
									}
								}
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}

							// 存房金额小于0
							if (saveHouseOldMoney < 0 || saveHouseNewMoney < 0) {
								// 部门主管
								UserCenterEmployee employeeZG = new UserCenterEmployee();
								UserCenterEmployee centerEmployee = new UserCenterEmployee();
								centerEmployee.setEm_id(saveEmployee.getEm_id());
								if (!centerEmployeeDao.selectCompanyID(centerEmployee).isEmpty() && !saveEmployee.getEm_name().equals("超级管理员")) {
									if (centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcp_name().indexOf("经理") == -1) {
										employeeZG.setUcp_name("主管");
										employeeZG.setUcc_phone((centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcc_phone()));
									} else {
										employeeZG.setUcp_name(centerEmployee.getUcp_name());
										employeeZG.setUcc_phone((centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcc_phone()));
									}
								} else {
									employeeZG.setUcc_phone("13996393605");
								}
								employeeZG = userCenterEmployeeDao.selectUserCenterEmployeeZG(employeeZG).get(0);
								// 存房提成账单
								achievementBill.setSa_id(achievementSumAchievement.getSa_id());
								achievementBill.setHi_code(zContractNo.getHi_code());
								achievementBill.setEm_id(employeeZG.getEm_id());
								achievementBill.setAb_type("年提");
								achievementBill.setAb_num(j);
								achievementBill.setAb_acType("承担亏损");
								if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
									achievementBill.setAb_oldMoney(Double.valueOf(df.format(saveHouseOldMoney * 0.35)));
									achievementBill.setAb_newMoney(0.0);
								} else {
									achievementBill.setAb_oldMoney(0.0);
									achievementBill.setAb_newMoney(Double.valueOf(df.format(saveHouseNewMoney * 0.35)));
								}
								achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
								achievementBill.setAb_payState(0);
								achievementBill.setAb_ctype(3);
								achievementBill.setAb_payTime(dateList.get(j));
								achievementBill.setAb_lossDay(lossDay);
								achievementBill.setAb_lossMoney(lossMoney);
								achievementBill.setAb_forRentDay(forRentDay);
								achievementBill.setAb_freeDay(freeDay);
								achievementBill.setAb_moneyType(payStyle + ":" + payType);
								achievementBill.setContractObject_Id(TContractNo2.getContractObject_Id());
								achievementBill.setUcc_id(employeeZG.getUcc_id());
								achievementCompanyDAO.insertAchievementBill(achievementBill);

								if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
									achievementBillContent.setAbc_type("管理费");
									achievementBillContent.setAbc_money(serviceMoney);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
									achievementBillContent.setAbc_type("免租期");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
									achievementBillContent.setAbc_type("差价");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
									achievementBillContent.setAbc_type("转租费");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
									achievementBillContent.setAbc_type("业绩补贴");
									if (xmoneys > 0) {
										achievementBillContent.setAbc_money(0.0);
									} else {
										if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
											achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.35));
										} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
											achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1) * 0.35);
										} else {
											achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.35));
										}
									}
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}

								// 销售经理承担
								UserCenterEmployee employeeJL = new UserCenterEmployee();
								employeeJL.setUcp_name("销售经理");
								employeeJL.setEm_phone(saveEmployee.getEm_phone());
								employeeJL = userCenterEmployeeDao.selectUserCenterEmployeeZG(employeeJL).get(0);
								// 存房提成账单
								achievementBill.setSa_id(achievementSumAchievement.getSa_id());
								achievementBill.setHi_code(zContractNo.getHi_code());
								achievementBill.setEm_id(employeeZG.getEm_id());
								achievementBill.setAb_type("年提");
								achievementBill.setAb_num(j);
								achievementBill.setAb_acType("承担亏损");
								if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
									achievementBill.setAb_oldMoney(Double.valueOf(df.format(saveHouseOldMoney * 0.1)));
									achievementBill.setAb_newMoney(0.0);
								} else {
									achievementBill.setAb_oldMoney(0.0);
									achievementBill.setAb_newMoney(Double.valueOf(df.format(saveHouseNewMoney * 0.1)));
								}
								achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
								achievementBill.setAb_payState(0);
								achievementBill.setAb_ctype(3);
								achievementBill.setAb_payTime(dateList.get(j));
								achievementBill.setAb_lossDay(lossDay);
								achievementBill.setAb_lossMoney(lossMoney);
								achievementBill.setAb_forRentDay(forRentDay);
								achievementBill.setAb_freeDay(freeDay);
								achievementBill.setAb_moneyType(payStyle + ":" + payType);
								achievementBill.setContractObject_Id(TContractNo2.getContractObject_Id());
								achievementBill.setUcc_id(employeeJL.getUcc_id());
								achievementCompanyDAO.insertAchievementBill(achievementBill);

								if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
									achievementBillContent.setAbc_type("管理费");
									achievementBillContent.setAbc_money(serviceMoney);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
									achievementBillContent.setAbc_type("免租期");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
									achievementBillContent.setAbc_type("差价");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
									achievementBillContent.setAbc_type("转租费");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
									achievementBillContent.setAbc_type("业绩补贴");
									if (xmoneys > 0) {
										achievementBillContent.setAbc_money(0.0);
									} else {
										if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
											achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.1));
										} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
											achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1) * 0.1);
										} else {
											achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.1));
										}
									}
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}

								// 存房提成账单(营销部承担部分)
								achievementBill.setSa_id(achievementSumAchievement.getSa_id());
								achievementBill.setHi_code(zContractNo.getHi_code());
								achievementBill.setEm_id(employeeCompany.getEm_id());
								achievementBill.setAb_type("年提");
								achievementBill.setAb_num(j);
								achievementBill.setAb_acType("承担亏损");
								if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
									achievementBill.setAb_oldMoney(Double.valueOf(df.format(saveHouseOldMoney * 0.05)));
									achievementBill.setAb_newMoney(0.0);
								} else {
									achievementBill.setAb_oldMoney(0.0);
									achievementBill.setAb_newMoney(Double.valueOf(df.format(saveHouseNewMoney * 0.05)));
								}
								achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
								achievementBill.setAb_payState(0);
								achievementBill.setAb_ctype(3);
								achievementBill.setAb_payTime(dateList.get(j));
								achievementBill.setAb_lossDay(lossDay);
								achievementBill.setAb_lossMoney(lossMoney);
								achievementBill.setAb_forRentDay(forRentDay);
								achievementBill.setAb_freeDay(freeDay);
								achievementBill.setAb_moneyType(payStyle + ":" + payType);
								achievementBill.setContractObject_Id(TContractNo2.getContractObject_Id());
								achievementBill.setUcc_id(employeeCompany.getUcc_id());
								achievementCompanyDAO.insertAchievementBill(achievementBill);

								if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
									achievementBillContent.setAbc_type("管理费");
									achievementBillContent.setAbc_money(serviceMoney);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
									achievementBillContent.setAbc_type("免租期");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
									achievementBillContent.setAbc_type("差价");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
									achievementBillContent.setAbc_type("转租费");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
									achievementBillContent.setAbc_type("业绩补贴");
									if (xmoneys > 0) {
										achievementBillContent.setAbc_money(0.0);
									} else {
										if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
											achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.05));
										} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
											achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1) * 0.05);
										} else {
											achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.05));
										}
									}
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}

							}
						}
					}
				}
			} else {
				for (int j = 0; j < nums; j++) {
					// 出房提成账单
					AchievementBill achievementBill = new AchievementBill();
					AchievementBillContent achievementBillContent = new AchievementBillContent();
					for (ViewBusinessContractRelaEmpVo outEmployee : fzOutEmployee) {
						achievementBill.setSa_id(achievementSumAchievement.getSa_id());
						achievementBill.setHi_code(zContractNo.getHi_code());
						achievementBill.setEm_id(outEmployee.getEm_id());
						achievementBill.setAb_type(typeM);
						achievementBill.setAb_num(j + 1);
						achievementBill.setAb_acType(sa_type);
						if (oldZContractNo != null && AppUtil.isOkState(_state, "续约")) {
							achievementBill.setAb_oldMoney(Double.valueOf(df.format((outHouseOldMoney + renewMoney + achievementSubsidy1) / 100 * outEmployee.getContract_perforSplit() / nums)));
							achievementBill.setAb_newMoney(0.0);
						} else {
							achievementBill.setAb_oldMoney(0.0);
							achievementBill.setAb_newMoney(Double.valueOf(df.format((outHouseNewMoney + renewMoney + achievementSubsidy1) / 100 * outEmployee.getContract_perforSplit() / nums)));
						}
						achievementBill.setAb_moneyPercentage(outEmployee.getContract_perforSplit() / 100);
						achievementBill.setAb_payState(0);
						achievementBill.setAb_ctype(2);
						achievementBill.setAb_lossDay(lossDay);
						achievementBill.setAb_lossMoney(lossMoney);
						achievementBill.setAb_forRentDay(forRentDay);
						achievementBill.setAb_freeDay(freeDay);
						achievementBill.setAb_payTime(dateList.get(j));
						achievementBill.setContractObject_Id(zContractNo.getContractObject_Id());

						UserCenterEmployee employee = new UserCenterEmployee();
						employee.setEm_id(outEmployee.getEm_id());
						if (!userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).isEmpty()) {
							employee = userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).get(0);
							achievementBill.setUcc_id(employee.getUcc_id());
						} else {
							achievementBill.setUcc_id(20);
						}
						achievementBill.setAb_moneyType(payStyle + ":" + payType);
						achievementCompanyDAO.insertAchievementBill(achievementBill);

						if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
							achievementBillContent.setAbc_type("管理费");
							achievementBillContent.setAbc_money(serviceMoney);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
							achievementBillContent.setAbc_type("免租期");
							achievementBillContent.setAbc_money(rentFreeMoney);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
							achievementBillContent.setAbc_type("差价");
							achievementBillContent.setAbc_money(newMoney);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
							achievementBillContent.setAbc_type("转租费");
							achievementBillContent.setAbc_money(renewMoney);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
							achievementBillContent.setAbc_type("业绩补贴");
							if (xmoneys > 0) {
								achievementBillContent.setAbc_money(0.0);
							} else {
								if (xmoneys > 0) {
									achievementBillContent.setAbc_money(0.0);
								} else {
									if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
										achievementBillContent.setAbc_money(achievementSubsidy + achievementSubsidy1 - aievementMoney);
									} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
										achievementBillContent.setAbc_money(achievementSubsidy + achievementSubsidy1);
									} else {
										achievementBillContent.setAbc_money(achievementSubsidy + achievementSubsidy1 + aievementMoney);
									}
								}
							}
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
					}
				}

				for (int j = 0; j < num; j++) {
					AchievementBill achievementBill = new AchievementBill();
					AchievementBillContent achievementBillContent = new AchievementBillContent();
					for (ViewBusinessContractRelaEmpVo saveEmployee : fzSaveEmployee1) {
						// 存房提成账单
						achievementBill.setSa_id(achievementSumAchievement.getSa_id());
						achievementBill.setHi_code(zContractNo.getHi_code());
						achievementBill.setEm_id(saveEmployee.getEm_id());
						achievementBill.setAb_type("年提");
						achievementBill.setAb_num(1);
						if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
							achievementBill.setAb_acType("续约存房");
						} else {
							achievementBill.setAb_acType("存房");
						}
						if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
							Double moneys = saveOldMoney1 / 100 * saveEmployee.getContract_perforSplit();
							achievementBill.setAb_oldMoney(Double.valueOf(df.format(moneys * 0.5)));
							achievementBill.setAb_newMoney(0.0);
						} else {
							achievementBill.setAb_oldMoney(0.0);
							Double moneys = saveNewMoney1 / 100 * saveEmployee.getContract_perforSplit();
							achievementBill.setAb_newMoney(Double.valueOf(df.format(moneys * 0.5)));
							achievementBill.setAb_oldMoney(0.0);
						}
						achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
						achievementBill.setAb_payState(0);
						achievementBill.setAb_ctype(1);
						achievementBill.setAb_payTime(date1);
						achievementBill.setAb_lossDay(lossDay);
						achievementBill.setAb_lossMoney(lossMoney);
						achievementBill.setAb_forRentDay(forRentDay);
						achievementBill.setAb_freeDay(freeDay);
						achievementBill.setAb_moneyType(payStyle + ":" + payType);
						achievementBill.setContractObject_Id(TContractNo1.getContractObject_Id());
						UserCenterEmployee employee = new UserCenterEmployee();
						employee.setEm_id(saveEmployee.getEm_id());
						if (!userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).isEmpty()) {
							employee = userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).get(0);
							achievementBill.setUcc_id(employee.getUcc_id());
						} else {
							achievementBill.setUcc_id(20);
						}
						achievementCompanyDAO.insertAchievementBill(achievementBill);

						if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
							achievementBillContent.setAbc_type("管理费");
							achievementBillContent.setAbc_money(serviceMoney);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
							achievementBillContent.setAbc_type("免租期");
							achievementBillContent.setAbc_money(0.0);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
							achievementBillContent.setAbc_type("差价");
							achievementBillContent.setAbc_money(0.0);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
							achievementBillContent.setAbc_type("转租费");
							achievementBillContent.setAbc_money(0.0);
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
							achievementBillContent.setAbc_type("业绩补贴");
							if (xmoneys > 0) {
								achievementBillContent.setAbc_money(0.0);
							} else {
								if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
									achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.5));
								} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
									achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1));
								} else {
									achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.5));
								}
							}
							achievementBillContent.setAb_id(achievementBill.getAb_id());
							achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
						}

						// 存房金额小于0
						if (saveHouseOldMoney < 0 || saveHouseNewMoney < 0) {
							// 部门主管
							UserCenterEmployee employeeZG = new UserCenterEmployee();
							UserCenterEmployee centerEmployee = new UserCenterEmployee();
							centerEmployee.setEm_id(saveEmployee.getEm_id());
							if (!centerEmployeeDao.selectCompanyID(centerEmployee).isEmpty() && !saveEmployee.getEm_name().equals("超级管理员")) {
								if (centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcp_name().indexOf("经理") == -1) {
									employeeZG.setUcp_name("主管");
									employeeZG.setUcc_phone((centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcc_phone()));
								} else {
									employeeZG.setUcp_name(centerEmployee.getUcp_name());
									employeeZG.setUcc_phone((centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcc_phone()));
								}
							} else {
								employeeZG.setUcc_phone("13996393605");
							}
							employeeZG = userCenterEmployeeDao.selectUserCenterEmployeeZG(employeeZG).get(0);
							// 存房提成账单
							achievementBill.setSa_id(achievementSumAchievement.getSa_id());
							achievementBill.setHi_code(zContractNo.getHi_code());
							achievementBill.setEm_id(employeeZG.getEm_id());
							achievementBill.setAb_type("年提");
							achievementBill.setAb_num(1);
							achievementBill.setAb_acType("承担亏损");
							if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
								achievementBill.setAb_oldMoney(Double.valueOf(df.format(saveHouseOldMoney * 0.35)));
								achievementBill.setAb_newMoney(0.0);
							} else {
								achievementBill.setAb_oldMoney(0.0);
								achievementBill.setAb_newMoney(Double.valueOf(df.format(saveHouseNewMoney * 0.35)));
							}
							achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
							achievementBill.setAb_payState(0);
							achievementBill.setAb_ctype(3);
							achievementBill.setAb_payTime(date1);
							achievementBill.setAb_lossDay(lossDay);
							achievementBill.setAb_lossMoney(lossMoney);
							achievementBill.setAb_forRentDay(forRentDay);
							achievementBill.setAb_freeDay(freeDay);
							achievementBill.setAb_moneyType(payStyle + ":" + payType);
							achievementBill.setContractObject_Id(TContractNo1.getContractObject_Id());
							achievementBill.setUcc_id(employeeZG.getUcc_id());
							achievementCompanyDAO.insertAchievementBill(achievementBill);

							if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
								achievementBillContent.setAbc_type("管理费");
								achievementBillContent.setAbc_money(serviceMoney);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
								achievementBillContent.setAbc_type("免租期");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
								achievementBillContent.setAbc_type("差价");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
								achievementBillContent.setAbc_type("转租费");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
								achievementBillContent.setAbc_type("业绩补贴");
								if (xmoneys > 0) {
									achievementBillContent.setAbc_money(0.0);
								} else {
									if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.35));
									} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
										achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1) * 0.35);
									} else {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.35));
									}
								}
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}

							// 存房提成账单(销售经理)
							// 销售经理
							UserCenterEmployee employeeJL = new UserCenterEmployee();
							employeeJL.setUcp_name("销售经理");
							employeeJL.setEm_phone(saveEmployee.getEm_phone());
							employeeJL = userCenterEmployeeDao.selectUserCenterEmployeeZG(employeeJL).get(0);
							achievementBill.setSa_id(achievementSumAchievement.getSa_id());
							achievementBill.setHi_code(zContractNo.getHi_code());
							achievementBill.setEm_id(employeeJL.getEm_id());
							achievementBill.setAb_type("年提");
							achievementBill.setAb_num(1);
							achievementBill.setAb_acType("承担亏损");
							if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
								achievementBill.setAb_oldMoney(Double.valueOf(df.format(saveHouseOldMoney * 0.1)));
								achievementBill.setAb_newMoney(0.0);
							} else {
								achievementBill.setAb_oldMoney(0.0);
								achievementBill.setAb_newMoney(Double.valueOf(df.format(saveHouseNewMoney * 0.1)));
							}

							achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
							achievementBill.setAb_payState(0);
							achievementBill.setAb_ctype(3);
							achievementBill.setAb_payTime(date1);
							achievementBill.setAb_lossDay(lossDay);
							achievementBill.setAb_lossMoney(lossMoney);
							achievementBill.setAb_forRentDay(forRentDay);
							achievementBill.setAb_freeDay(freeDay);
							achievementBill.setAb_moneyType(payStyle + ":" + payType);
							achievementBill.setContractObject_Id(TContractNo1.getContractObject_Id());
							achievementBill.setUcc_id(employeeJL.getUcc_id());
							achievementCompanyDAO.insertAchievementBill(achievementBill);

							if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
								achievementBillContent.setAbc_type("管理费");
								achievementBillContent.setAbc_money(serviceMoney);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
								achievementBillContent.setAbc_type("免租期");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
								achievementBillContent.setAbc_type("差价");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
								achievementBillContent.setAbc_type("转租费");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
								achievementBillContent.setAbc_type("业绩补贴");
								if (xmoneys > 0) {
									achievementBillContent.setAbc_money(0.0);
								} else {
									if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.1));
									} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
										achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1) * 0.1);
									} else {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.1));
									}
								}
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}

							// 存房提成账单(营销部承担部分)
							achievementBill.setSa_id(achievementSumAchievement.getSa_id());
							achievementBill.setHi_code(zContractNo.getHi_code());
							achievementBill.setEm_id(employeeCompany.getEm_id());
							achievementBill.setAb_type("年提");
							achievementBill.setAb_num(1);
							achievementBill.setAb_acType("承担亏损");
							if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
								achievementBill.setAb_oldMoney(Double.valueOf(df.format(saveHouseOldMoney * 0.05)));
								achievementBill.setAb_newMoney(0.0);
							} else {
								achievementBill.setAb_oldMoney(0.0);
								achievementBill.setAb_newMoney(Double.valueOf(df.format(saveHouseNewMoney * 0.05)));
							}

							achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
							achievementBill.setAb_payState(0);
							achievementBill.setAb_ctype(3);
							achievementBill.setAb_payTime(date1);
							achievementBill.setAb_lossDay(lossDay);
							achievementBill.setAb_lossMoney(lossMoney);
							achievementBill.setAb_forRentDay(forRentDay);
							achievementBill.setAb_freeDay(freeDay);
							achievementBill.setAb_moneyType(payStyle + ":" + payType);
							achievementBill.setContractObject_Id(TContractNo1.getContractObject_Id());
							achievementBill.setUcc_id(employeeCompany.getUcc_id());
							achievementCompanyDAO.insertAchievementBill(achievementBill);

							if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
								achievementBillContent.setAbc_type("管理费");
								achievementBillContent.setAbc_money(serviceMoney);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
								achievementBillContent.setAbc_type("免租期");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
								achievementBillContent.setAbc_type("差价");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
								achievementBillContent.setAbc_type("转租费");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
								achievementBillContent.setAbc_type("业绩补贴");
								if (xmoneys > 0) {
									achievementBillContent.setAbc_money(0.0);
								} else {
									if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.05));
									} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
										achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1) * 0.05);
									} else {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.05));
									}
								}
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
						}
					}

					if (fzSaveEmployee2 != null) {
						for (ViewBusinessContractRelaEmpVo saveEmployee : fzSaveEmployee2) {
							// 存房提成账单
							achievementBill.setSa_id(achievementSumAchievement.getSa_id());
							achievementBill.setHi_code(zContractNo.getHi_code());
							achievementBill.setEm_id(saveEmployee.getEm_id());
							achievementBill.setAb_type("年提");
							achievementBill.setAb_num(1);
							if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
								achievementBill.setAb_acType("续约存房");
							} else {
								achievementBill.setAb_acType("存房");
							}
							if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
								Double moneys = saveOldMoney2 / 100 * saveEmployee.getContract_perforSplit();
								if (moneys < 0) {
									moneys = moneys * 0.5;
								} else {
									if (num != 2 || proportion == 0) {
										moneys = moneys / num;
									}
								}
								achievementBill.setAb_oldMoney(Double.valueOf(df.format(moneys)));
								achievementBill.setAb_newMoney(0.0);
							} else {
								achievementBill.setAb_oldMoney(0.0);
								Double moneys = saveNewMoney2 / 100 * saveEmployee.getContract_perforSplit();
								if (moneys < 0) {
									moneys = moneys * 0.5;
								} else {
									if (num != 2 || proportion == 0) {
										moneys = moneys / num;
									}
								}
								achievementBill.setAb_newMoney(Double.valueOf(df.format(moneys)));
							}
							achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
							achievementBill.setAb_payState(0);
							achievementBill.setAb_ctype(1);
							achievementBill.setAb_payTime(date1);
							achievementBill.setAb_lossDay(lossDay);
							achievementBill.setAb_lossMoney(lossMoney);
							achievementBill.setAb_forRentDay(forRentDay);
							achievementBill.setAb_freeDay(freeDay);
							achievementBill.setAb_moneyType(payStyle + ":" + payType);
							achievementBill.setContractObject_Id(TContractNo2.getContractObject_Id());
							UserCenterEmployee employee = new UserCenterEmployee();
							employee.setEm_id(saveEmployee.getEm_id());
							if (!userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).isEmpty()) {
								employee = userCenterEmployeeDao.selectUserCenterEmployeeUCC(employee).get(0);
								achievementBill.setUcc_id(employee.getUcc_id());
							} else {
								achievementBill.setUcc_id(20);
							}
							achievementCompanyDAO.insertAchievementBill(achievementBill);

							if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
								achievementBillContent.setAbc_type("管理费");
								achievementBillContent.setAbc_money(serviceMoney);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
								achievementBillContent.setAbc_type("免租期");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
								achievementBillContent.setAbc_type("差价");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
								achievementBillContent.setAbc_type("转租费");
								achievementBillContent.setAbc_money(0.0);
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}
							if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
								achievementBillContent.setAbc_type("业绩补贴");
								if (xmoneys > 0) {
									achievementBillContent.setAbc_money(0.0);
								} else {
									if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.5));
									} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
										achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1));
									} else {
										achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.5));
									}
								}
								achievementBillContent.setAb_id(achievementBill.getAb_id());
								achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
							}

							// 存房金额小于0
							if (saveHouseOldMoney < 0 || saveHouseNewMoney < 0) {
								// 部门主管承担亏损
								UserCenterEmployee employeeZG = new UserCenterEmployee();
								UserCenterEmployee centerEmployee = new UserCenterEmployee();
								centerEmployee.setEm_id(saveEmployee.getEm_id());
								if (!centerEmployeeDao.selectCompanyID(centerEmployee).isEmpty() && !saveEmployee.getEm_name().equals("超级管理员")) {
									if (centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcp_name().indexOf("经理") == -1) {
										employeeZG.setUcp_name("主管");
										employeeZG.setUcc_phone((centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcc_phone()));
									} else {
										employeeZG.setUcp_name(centerEmployee.getUcp_name());
										employeeZG.setUcc_phone((centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcc_phone()));
									}
								} else {
									employeeZG.setUcc_phone("13996393605");
								}
								employeeZG = userCenterEmployeeDao.selectUserCenterEmployeeZG(employeeZG).get(0);
								// 存房提成账单
								achievementBill.setSa_id(achievementSumAchievement.getSa_id());
								achievementBill.setHi_code(zContractNo.getHi_code());
								achievementBill.setEm_id(employeeZG.getEm_id());
								achievementBill.setAb_type("年提");
								achievementBill.setAb_num(1);
								achievementBill.setAb_acType("承担亏损");
								if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
									achievementBill.setAb_oldMoney(Double.valueOf(df.format(saveHouseOldMoney * 0.35)));
									achievementBill.setAb_newMoney(0.0);
								} else {
									achievementBill.setAb_oldMoney(0.0);
									achievementBill.setAb_newMoney(Double.valueOf(df.format(saveHouseNewMoney * 0.35)));
								}
								achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
								achievementBill.setAb_payState(0);
								achievementBill.setAb_ctype(3);
								achievementBill.setAb_payTime(date1);
								achievementBill.setAb_lossDay(lossDay);
								achievementBill.setAb_lossMoney(lossMoney);
								achievementBill.setAb_forRentDay(forRentDay);
								achievementBill.setAb_freeDay(freeDay);
								achievementBill.setAb_moneyType(payStyle + ":" + payType);
								achievementBill.setContractObject_Id(TContractNo2.getContractObject_Id());
								achievementBill.setUcc_id(employeeZG.getUcc_id());
								achievementCompanyDAO.insertAchievementBill(achievementBill);

								if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
									achievementBillContent.setAbc_type("管理费");
									achievementBillContent.setAbc_money(serviceMoney);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
									achievementBillContent.setAbc_type("免租期");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
									achievementBillContent.setAbc_type("差价");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
									achievementBillContent.setAbc_type("转租费");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
									achievementBillContent.setAbc_type("业绩补贴");
									if (xmoneys > 0) {
										achievementBillContent.setAbc_money(0.0);
									} else {
										if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
											achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.35));
										} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
											achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1) * 0.35);
										} else {
											achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.35));
										}
									}
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}

								// 经理承担亏损
								UserCenterEmployee employeeJL = new UserCenterEmployee();
								employeeJL.setUcp_name("销售经理");
								employeeJL.setEm_phone(saveEmployee.getEm_phone());
								employeeJL = userCenterEmployeeDao.selectUserCenterEmployeeZG(employeeJL).get(0);
								achievementBill.setSa_id(achievementSumAchievement.getSa_id());
								achievementBill.setHi_code(zContractNo.getHi_code());
								achievementBill.setEm_id(employeeJL.getEm_id());
								achievementBill.setAb_type("年提");
								achievementBill.setAb_num(1);
								achievementBill.setAb_acType("承担亏损");
								if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
									achievementBill.setAb_oldMoney(Double.valueOf(df.format(saveHouseOldMoney * 0.1)));
									achievementBill.setAb_newMoney(0.0);
								} else {
									achievementBill.setAb_oldMoney(0.0);
									achievementBill.setAb_newMoney(Double.valueOf(df.format(saveHouseNewMoney * 0.1)));
								}

								achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
								achievementBill.setAb_payState(0);
								achievementBill.setAb_ctype(3);
								achievementBill.setAb_payTime(date1);
								achievementBill.setAb_lossDay(lossDay);
								achievementBill.setAb_lossMoney(lossMoney);
								achievementBill.setAb_forRentDay(forRentDay);
								achievementBill.setAb_freeDay(freeDay);
								achievementBill.setAb_moneyType(payStyle + ":" + payType);
								achievementBill.setContractObject_Id(TContractNo2.getContractObject_Id());
								achievementBill.setUcc_id(employeeJL.getUcc_id());
								achievementCompanyDAO.insertAchievementBill(achievementBill);

								if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
									achievementBillContent.setAbc_type("管理费");
									achievementBillContent.setAbc_money(serviceMoney);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
									achievementBillContent.setAbc_type("免租期");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
									achievementBillContent.setAbc_type("差价");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
									achievementBillContent.setAbc_type("转租费");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
									achievementBillContent.setAbc_type("业绩补贴");
									if (xmoneys > 0) {
										achievementBillContent.setAbc_money(0.0);
									} else {
										if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
											achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.1));
										} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
											achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1) * 0.1);
										} else {
											achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.1));
										}
									}
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}

								// 存房提成账单(营销部承担部分)
								achievementBill.setSa_id(achievementSumAchievement.getSa_id());
								achievementBill.setHi_code(zContractNo.getHi_code());
								achievementBill.setEm_id(employeeCompany.getEm_id());
								achievementBill.setAb_type("年提");
								achievementBill.setAb_num(1);
								achievementBill.setAb_acType("承担亏损");
								if (TContractNo2 != null && AppUtil.isOkState(TContractNo2.getContractObject_OptionState(), "续约")) {
									achievementBill.setAb_oldMoney(Double.valueOf(df.format(saveHouseOldMoney * 0.05)));
									achievementBill.setAb_newMoney(0.0);
								} else {
									achievementBill.setAb_oldMoney(0.0);
									achievementBill.setAb_newMoney(Double.valueOf(df.format(saveHouseNewMoney * 0.05)));
								}

								achievementBill.setAb_moneyPercentage(saveEmployee.getContract_perforSplit() / 100);
								achievementBill.setAb_payState(0);
								achievementBill.setAb_ctype(3);
								achievementBill.setAb_payTime(date1);
								achievementBill.setAb_lossDay(lossDay);
								achievementBill.setAb_lossMoney(lossMoney);
								achievementBill.setAb_forRentDay(forRentDay);
								achievementBill.setAb_freeDay(freeDay);
								achievementBill.setAb_moneyType(payStyle + ":" + payType);
								achievementBill.setContractObject_Id(TContractNo2.getContractObject_Id());
								achievementBill.setUcc_id(employeeCompany.getUcc_id());
								achievementCompanyDAO.insertAchievementBill(achievementBill);

								if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
									achievementBillContent.setAbc_type("管理费");
									achievementBillContent.setAbc_money(serviceMoney);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
									achievementBillContent.setAbc_type("免租期");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
									achievementBillContent.setAbc_type("差价");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
									achievementBillContent.setAbc_type("转租费");
									achievementBillContent.setAbc_money(0.0);
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
								if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
									achievementBillContent.setAbc_type("业绩补贴");
									if (xmoneys > 0) {
										achievementBillContent.setAbc_money(0.0);
									} else {
										if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) < 0) {
											achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 - aievementMoney) * 0.05));
										} else if (aievementMoney > 0 && (aievementMoney - achievementSubsidy1) > 0) {
											achievementBillContent.setAbc_money(-(achievementSubsidy + achievementSubsidy1) * 0.05);
										} else {
											achievementBillContent.setAbc_money(-((achievementSubsidy + achievementSubsidy1 + aievementMoney) * 0.05));
										}
									}
									achievementBillContent.setAb_id(achievementBill.getAb_id());
									achievementCompanyDAO.insertAchievementBillContent(achievementBillContent);
								}
							}
						}
					}
				}
			}

			// 公司账单
			if (oldZContractNo != null && (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "强收")) && lossComanyMoney < 0) {
				AchievementBill achievementBill = new AchievementBill();
				achievementBill.setSa_id(achievementSumAchievement.getSa_id());
				achievementBill.setHi_code(zContractNo.getHi_code());
				achievementBill.setEm_id(employeeCompanyGjp.getEm_id());
				achievementBill.setAb_type(typeM);
				achievementBill.setAb_num(1);
				achievementBill.setAb_acType("业绩补贴");
				achievementBill.setAb_oldMoney(lossComanyMoney);
				achievementBill.setAb_newMoney(0.0);
				achievementBill.setAb_moneyPercentage(0.0);
				achievementBill.setAb_payState(0);
				achievementBill.setAb_ctype(4);
				achievementBill.setAb_lossDay(lossDay);
				achievementBill.setAb_lossMoney(lossMoney);
				achievementBill.setAb_forRentDay(forRentDay);
				achievementBill.setAb_freeDay(freeDay);
				achievementBill.setAb_moneyType(payStyle);
				achievementBill.setContractObject_Id(zContractNo.getContractObject_Id());
				achievementBill.setUcc_id(employeeCompanyGjp.getUcc_id());
				achievementCompanyDAO.insertAchievementBill(achievementBill);

				AchievementBillContent achievementBillContent = new AchievementBillContent();
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
					achievementBillContent.setAbc_type("管理费");
					achievementBillContent.setAbc_money(serviceMoney);
					achievementBillContent.setAb_id(achievementBill.getAb_id());
				}
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
					achievementBillContent.setAbc_type("免租期");
					achievementBillContent.setAbc_money(rentFreeMoney);
					achievementBillContent.setAb_id(achievementBill.getAb_id());
				}
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
					achievementBillContent.setAbc_type("差价");
					achievementBillContent.setAbc_money(newMoney);
					achievementBillContent.setAb_id(achievementBill.getAb_id());
				}
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
					achievementBillContent.setAbc_type("转租费");
					achievementBillContent.setAbc_money(renewMoney);
					achievementBillContent.setAb_id(achievementBill.getAb_id());
				}
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
					achievementBillContent.setAbc_type("业绩补贴");
					achievementBillContent.setAbc_money(lossComanyMoney);
					achievementBillContent.setAb_id(achievementBill.getAb_id());
				}
			}

			// 公司承担半个月租金
			if (companyMoneyS < 0) {
				AchievementBill achievementBill = new AchievementBill();
				achievementBill.setSa_id(achievementSumAchievement.getSa_id());
				achievementBill.setHi_code(zContractNo.getHi_code());
				achievementBill.setEm_id(employeeCompanyGjp.getEm_id());
				achievementBill.setAb_type(typeM);
				achievementBill.setAb_num(1);
				achievementBill.setAb_acType("业绩补贴");
				achievementBill.setAb_oldMoney(companyMoneyS);
				achievementBill.setAb_newMoney(0.0);
				achievementBill.setAb_moneyPercentage(0.0);
				achievementBill.setAb_payState(0);
				achievementBill.setAb_ctype(4);
				achievementBill.setAb_lossDay(lossDay);
				achievementBill.setAb_lossMoney(lossMoney);
				achievementBill.setAb_forRentDay(forRentDay);
				achievementBill.setAb_freeDay(freeDay);
				achievementBill.setAb_moneyType(payStyle);
				achievementBill.setContractObject_Id(zContractNo.getContractObject_Id());
				achievementBill.setUcc_id(employeeCompanyGjp.getUcc_id());
				achievementCompanyDAO.insertAchievementBill(achievementBill);

				AchievementBillContent achievementBillContent = new AchievementBillContent();
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
					achievementBillContent.setAbc_type("管理费");
					achievementBillContent.setAbc_money(serviceMoney);
					achievementBillContent.setAb_id(achievementBill.getAb_id());
				}
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_freeRentDate() == 1) {
					achievementBillContent.setAbc_type("免租期");
					achievementBillContent.setAbc_money(rentFreeMoney);
					achievementBillContent.setAb_id(achievementBill.getAb_id());
				}
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
					achievementBillContent.setAbc_type("差价");
					achievementBillContent.setAbc_money(newMoney);
					achievementBillContent.setAb_id(achievementBill.getAb_id());
				}
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
					achievementBillContent.setAbc_type("转租费");
					achievementBillContent.setAbc_money(renewMoney);
					achievementBillContent.setAb_id(achievementBill.getAb_id());
				}
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_subsidy() == 1) {
					achievementBillContent.setAbc_type("业绩补贴");
					achievementBillContent.setAbc_money(-company);
					achievementBillContent.setAb_id(achievementBill.getAb_id());
				}
			}

		} catch (Exception e) {
			map.put("message", "error");
			e.printStackTrace();
		}

		/*
		 * json.put("money", "总业绩：" + sumMoney + "、免租期：" + rentFreeMoney +
		 * "、转租费：" + renewMoney + "、管理费：" + serviceMoney + "、出房新业绩：" +
		 * outHouseNewMoney + "、出房旧业绩：" + outHouseOldMoney + "、存房新业绩：" +
		 * saveHouseNewMoney + "、存房新业绩：" + saveHouseOldMoney + "、免租期天数：" +
		 * forRentDay + "、亏损金额：" + lossMoney + "、主管提成：" + chargeMoney +
		 * "、副主管提成：" + viceChargeMoney + "、经理提成：" + managerMoney);
		 */
		map.put("message", "success");
		return map;
	}

	/**
	 * 根据部门ID查询房屋总业绩
	 *
	 * @param achievementSumAchievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<AchievementSumAchievement> selectAchievementSumAchievement(AchievementSumAchievement achievementSumAchievement) {
		return achievementCompanyDAO.selectAchievementSumAchievement(achievementSumAchievement);
	}

	/**
	 * 根据部门ID查询房屋总业绩
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<AchievementSumAchievement> selectSumAchievementID(AchievementSumAchievement sumAchievement) {
		return achievementCompanyDAO.selectSumAchievementID(sumAchievement);
	}

	/**
	 * 根据总业绩ID查询业绩账单
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<AchievementBill> selectAchievementBilID(Integer sa_id) {
		return achievementCompanyDAO.selectAchievementBilID(sa_id);
	}

	/**
	 * 根据总业绩ID查询业绩账单
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<AchievementBill> selectAchievementBilABID(AchievementBill achievementBill) {
		return achievementCompanyDAO.selectAchievementBilABID(achievementBill);
	}

	/**
	 * 根据业绩账单ID查询业绩详情
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<AchievementBillContent> selectAchievementBillContent(Integer ab_id) {
		return achievementCompanyDAO.selectAchievementBillContent(ab_id);
	}

	/**
	 * 根据时间段查询合同
	 *
	 * @param viewBusinessContractVo
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<ViewBusinessContractVo> selectContractDateToDate(ViewBusinessContractVo viewBusinessContractVo) {
		return achievementCompanyDAO.selectContractDateToDate(viewBusinessContractVo);
	}

	/**
	 * 根据视图查询业绩账单
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<ViewSumAchievement> selectAchievementSumMoney(ViewSumAchievement viewSumAchievement) {
		return achievementCompanyDAO.selectAchievementSumMoney(viewSumAchievement);
	}

	/**
	 * 总业绩
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public ViewSumAchievement selectAchievementSumMoneys(ViewSumAchievement viewSumAchievement) {
		return achievementCompanyDAO.selectAchievementSumMoneys(viewSumAchievement);
	}

	/**
	 * 查询团队业绩
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	public List<ViewTeamAchievementListVo> selectTeamAchievementList(ViewTeamAchievementListVo achievementListVo) {
		return achievementCompanyDAO.selectTeamAchievementList(achievementListVo);
	}

	/**
	 * 条件查询目标总业绩
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	public AchievementCompanyAchievement selectCompanyAchievementByWhere(AchievementCompanyAchievement companyAchievement) {
		return achievementCompanyDAO.selectCompanyAchievementByWhere(companyAchievement);
	}

	/**
	 * 条件查询实际总业绩
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	public AchievementSumAchievement selectAchievementSumByWhere(AchievementSumAchievement sumAchievement) {
		return achievementCompanyDAO.selectAchievementSumByWhere(sumAchievement);
	}

	/**
	 * 条件查询实际业绩数据
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	public List<ViewHouseAchievementVo> selectAchievementSumListByWhere(ViewHouseAchievementVo sumAchievement) {
		return achievementCompanyDAO.selectAchievementSumListByWhere(sumAchievement);
	}

	/**
	 * 查询业绩账单总数据
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	public AchievementBill selectAchievementBillTotalByWhere(AchievementBill achievementBill) {
		return achievementCompanyDAO.selectAchievementBillTotalByWhere(achievementBill);
	}

	/**
	 * 查询业绩账单列表
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	public List<AchievementBill> selectAchievementBillListByWhere(AchievementBill achievementBill) {
		return achievementCompanyDAO.selectAchievementBillListByWhere(achievementBill);
	}

	/**
	 * 查询业绩精简业绩数据列表
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	public List<AchievementBill> selectAchievementBillSimpleList(Pagination<AchievementBill> pagination) {
		return achievementCompanyDAO.selectAchievementBillSimpleList(pagination);
	}

	/**
	 * 查询业绩人员列表数据
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	public List<ViewAchievementEmployeeVo> selectAchievementEmployeeList(ViewAchievementEmployeeVo achievementEmployeeVo) {
		return achievementCompanyDAO.selectAchievementEmployeeList(achievementEmployeeVo);
	}

	/**
	 * 查询业绩精简业绩数据总数
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	public int selectAchievementBillSimpleListTotalRecords(Pagination<AchievementBill> pagination) {
		return achievementCompanyDAO.selectAchievementBillSimpleListTotalRecords(pagination);
	}

	/**
	 * 查询所有总目标业绩
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	public List<AchievementCompanyAchievement> selectCompanyAchievementList(AchievementCompanyAchievement companyAchievement) {
		return achievementCompanyDAO.selectCompanyAchievementList(companyAchievement);
	}

	/**
	 * 查询业绩亏损
	 *
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	public AchievementBill selectAchievementBillLossByWhere(AchievementBill achievementBill) {
		return achievementCompanyDAO.selectAchievementBillLossByWhere(achievementBill);
	}

	/**
	 * 修改房屋业绩
	 *
	 * @param achievementSumAchievement
	 * @param achievementBill
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Map<String, Object> updateAchievementHouseMoney(AchievementSumAchievement achievementSumAchievement, List<AchievementBill> achievementBill) {

		Integer bool = 0;

		bool = achievementCompanyDAO.updateSumAchievement(achievementSumAchievement);
		for (AchievementBill achievementBill2 : achievementBill) {
			bool = achievementCompanyDAO.updateAchievementBill(achievementBill2);
			// 代表公司
			UserCenterEmployee employeeCompanyGjp = new UserCenterEmployee();
			employeeCompanyGjp = userCenterEmployeeDao.selectUserCenterEmployeeCompany(employeeCompanyGjp).get(0);
			// 超级管理员代表营销部
			UserCenterEmployee employeeCompany = new UserCenterEmployee();
			employeeCompany = userCenterEmployeeDao.selectUserCenterEmployeeCompany(employeeCompany).get(0);

			UserCenterEmployee userCenterEmployee = new UserCenterEmployee();
			userCenterEmployee.setEm_id(achievementBill2.getEm_id());
			UserCenterEmployee employee = userCenterEmployeeDao.selectUserCenterEmployeeUCC(userCenterEmployee).get(0);

			if (achievementBill2.getAb_oldMoney() < 0 || achievementBill2.getAb_newMoney() < 0) {
				// 部门主管承担亏损
				UserCenterEmployee employeeZG = new UserCenterEmployee();
				UserCenterEmployee centerEmployee = new UserCenterEmployee();
				centerEmployee.setEm_id(employee.getEm_id());
				if (!centerEmployeeDao.selectCompanyID(centerEmployee).isEmpty()) {
					employeeZG.setUcp_name("主管");
					employeeZG.setUcc_phone((centerEmployeeDao.selectCompanyID(centerEmployee).get(0).getUcc_phone()));
				} else {
					employeeZG.setUcc_phone("13996393605");
				}
				employeeZG = userCenterEmployeeDao.selectUserCenterEmployeeZG(employeeZG).get(0);

				AchievementBill achievementBillj = new AchievementBill();
				achievementBillj.setSa_id(achievementSumAchievement.getSa_id());
				achievementBillj.setEm_id(employeeZG.getEm_id());
				AchievementBill achievementBillID = achievementCompanyDAO.selectAchievementBilemID(achievementBillj).get(0);
				achievementBillID.setAb_num(1);
				achievementBillID.setAb_oldMoney(achievementBill2.getAb_oldMoney() * 0.35);
				achievementBillID.setAb_newMoney(achievementBill2.getAb_newMoney() * 0.35);
				achievementBillID.setUcc_id(employee.getUcc_id());
				bool = achievementCompanyDAO.updateAchievementBill(achievementBillID);

				// 销售经理承担
				UserCenterEmployee employeeJL = new UserCenterEmployee();
				employeeJL.setUcp_name("销售经理");
				employeeJL.setEm_phone(employeeZG.getEm_phone());
				employeeJL = userCenterEmployeeDao.selectUserCenterEmployeeZG(employeeJL).get(0);
				achievementBillj.setSa_id(achievementSumAchievement.getSa_id());
				achievementBillj.setEm_id(employeeJL.getEm_id());
				AchievementBill achievementBillID1 = achievementCompanyDAO.selectAchievementBilemID(achievementBillj).get(0);
				achievementBillID1.setAb_num(1);
				achievementBillID1.setAb_oldMoney(achievementBill2.getAb_oldMoney() * 0.1);
				achievementBillID1.setAb_newMoney(achievementBill2.getAb_newMoney() * 0.1);
				achievementBillID1.setUcc_id(employee.getUcc_id());
				bool = achievementCompanyDAO.updateAchievementBill(achievementBillID1);

				AchievementBill achievementBillg = new AchievementBill();
				achievementBillg.setSa_id(achievementSumAchievement.getSa_id());
				achievementBillg.setEm_id(employeeCompany.getEm_id());
				AchievementBill achievementBillID2 = achievementCompanyDAO.selectAchievementBilemID(achievementBillg).get(0);
				achievementBillID2.setAb_num(1);
				achievementBillID2.setAb_oldMoney(achievementBill2.getAb_oldMoney() * 0.05);
				achievementBillID2.setAb_newMoney(achievementBill2.getAb_newMoney() * 0.05);
				achievementBillID2.setUcc_id(employee.getUcc_id());
				bool = achievementCompanyDAO.updateAchievementBill(achievementBillID2);
			}

			if (achievementBill2.getSubsidy() > 0) {
				AchievementBillContent achievementBillContent2 = new AchievementBillContent();
				achievementBillContent2.setAb_id(achievementBill2.getAb_id());
				achievementBillContent2.setAbc_type("业绩补贴");
				achievementBillContent2.setAbc_money(achievementBill2.getSubsidy());
				bool = achievementCompanyDAO.updateAchievementBillContentBT(achievementBillContent2);

				AchievementBill achievementBill1 = new AchievementBill();
				achievementBill1.setSa_id(achievementSumAchievement.getSa_id());
				achievementBill1.setAb_acType("业绩补贴");
				if (achievementCompanyDAO.selectAchievementBilemID(achievementBill1).isEmpty()) {
					achievementBill1.setHi_code(achievementSumAchievement.getHi_code());
					achievementBill1.setEm_id(employeeCompanyGjp.getEm_id());
					achievementBill1.setAb_type("年提");
					achievementBill1.setAb_num(1);
					achievementBill1.setAb_oldMoney(0.0);
					achievementBill1.setAb_newMoney(-achievementBill2.getSubsidy());
					achievementBill1.setAb_moneyPercentage(0.0);
					achievementBill1.setAb_payState(0);
					achievementBill1.setAb_ctype(4);
					achievementBill1.setAb_lossDay(0.0);
					achievementBill1.setAb_lossMoney(0.0);
					achievementBill1.setAb_forRentDay(0.0);
					achievementBill1.setAb_freeDay(0.0);
					achievementBill1.setAb_moneyType(achievementBill2.getAb_moneyType());
					achievementBill1.setContractObject_Id(achievementBill2.getContractObject_Id());
					achievementBill1.setUcc_id(employeeCompanyGjp.getUcc_id());
					bool = achievementCompanyDAO.insertAchievementBill(achievementBill1);
				} else {
					achievementBill1 = achievementCompanyDAO.selectAchievementBilemID(achievementBill1).get(0);
					achievementBill1.setAb_oldMoney(0.0);
					achievementBill1.setAb_newMoney(-achievementBill2.getSubsidy());
					bool = achievementCompanyDAO.updateAchievementBill(achievementBill1);
				}

			}
		}

		Map<String, Object> map = new HashMap<>();

		if (bool > 0) {
			map.put("message", "success");
		} else {
			map.put("message", "error");
		}

		return map;
	}

	/**
	 * 计算合同招租期，（免租期-招租期），剩余免租期
	 *
	 * @param contractNo
	 * @return
	 *
	 * @author 陈智颖
	 * @throws Exception
	 */
	@SuppressWarnings("unused")
	public Map<String, Object> upateAchievementRent(String contractNo) throws Exception {

		// 招租期
		Double forRent = 0.0;
		// 免租期
		Double rentFree = 0.0;
		// 剩余免租期
		Double surplusRent = 0.0;
		// 7月以前亏损
		Double julyOldMoney = 0.0;
		// 第一年合同到期时间
		String contractOneDate = "";
		// 第二年合同到期时间
		String contractTwoDate = "";
		// 第一年合同到期时间
		String contractOneDate2 = "";
		// 第二年合同到期时间
		String contractTwoDate2 = "";

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		// 保留小数点后两位
		DecimalFormat df = new DecimalFormat("######0.00");

		Map<String, Object> map = new HashMap<>();

		Boolean type = true;

		// 根据租赁合同编码查看合同信息

		ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
		viewBusinessContractVo.setContractObject_No(contractNo);
		if ("2170600278".equals(contractNo)) {
			System.out.println("==============================");
		}
		System.out.println("合同编码：" + contractNo);
		ViewBusinessContractVo zContractNo = achievementCompanyDAO.selectContractNo(viewBusinessContractVo).get(0);

		// 根据房屋编码查询最新一个算了业绩的租赁合同
		/*
		 * ViewBusinessContractVo viewBusinessContractVo1 = new
		 * ViewBusinessContractVo();
		 * viewBusinessContractVo1.setHi_code(zContractNo.getHi_code());
		 * viewBusinessContractVo1.setContractObject_Bool(1);
		 * viewBusinessContractVo1.setContractObject_Type("租赁合同");
		 * ViewBusinessContractVo oldZContractNo = null; if
		 * (!achievementCompanyDAO.selectContractNo(
		 * viewBusinessContractVo1).isEmpty()) { oldZContractNo =
		 * achievementCompanyDAO.selectContractNo(
		 * viewBusinessContractVo1).get(0); }
		 */

		ViewBusinessContractVo viewBusinessContractVo1 = new ViewBusinessContractVo();
		viewBusinessContractVo1.setHi_code(zContractNo.getHi_code());
		viewBusinessContractVo1.setContractObject_Id(zContractNo.getContractObject_Successor());
		viewBusinessContractVo1.setContractObject_Type("租赁合同");
		ViewBusinessContractVo oldZContractNo = null;
		Integer _state = 0;
		if (zContractNo.getContractObject_Successor() != 0) {
			if (!achievementCompanyDAO.selectContractNo(viewBusinessContractVo1).isEmpty()) {
				oldZContractNo = achievementCompanyDAO.selectContractNo(viewBusinessContractVo1).get(0);
				_state = oldZContractNo.getContractObject_OptionState();
			}
		}

		// 根据房屋编码查询最新托管合同
		ViewBusinessContractVo viewBusinessContractVo2 = new ViewBusinessContractVo();
		viewBusinessContractVo2.setHi_code(zContractNo.getHi_code());
		viewBusinessContractVo2.setContractObject_Type("托管合同");
		List<ViewBusinessContractVo> selectContractNo = achievementCompanyDAO.selectContractNo(viewBusinessContractVo2);
		ViewBusinessContractVo TContractNo1 = null;
		ViewBusinessContractVo TContractNo2 = null;
		if (selectContractNo.size() > 1) {
			TContractNo1 = selectContractNo.get(0);
			TContractNo2 = selectContractNo.get(1);
		} else {
			TContractNo1 = selectContractNo.get(0);
		}

		// 计算当前租赁合同和上一份租赁合同的时间段，重叠时间，和不重叠时间
		String newStartTOEnd = zContractNo.getContractBody_StartTOEnd();
		String[] newsplit = newStartTOEnd.split("~");
		// 最新租赁合同开始时间
		String newStart = newsplit[0];
		Integer newStartY = AppUtil.Year(sf.parse(newStart));
		String startTime = newStart;
		// 最新租赁合同结束时间
		String newEnd = newsplit[1];
		Integer newEndY = AppUtil.Year(sf.parse(newEnd));

		// 以前租赁合同开始时间
		String oldStart = "";
		// 以前租赁合同结束时间
		String oldEnd = "";

		if (oldZContractNo != null) {
			String oldStartTOEnd = oldZContractNo.getContractBody_StartTOEnd();
			String[] oldsplit = oldStartTOEnd.split("~");
			// 以前租赁合同开始时间
			oldStart = oldsplit[0];
			// 以前租赁合同结束时间
			oldEnd = oldsplit[1];
			startTime = oldEnd;
		}

		// 计算当前租赁合同和上一份租赁合同的时间段，重叠时间，和不重叠时间
		String tStartTOEnd = "";
		String[] tPlit = null;
		// 最新托管合同开始时间
		String tStart = "";
		Integer tStartY = 0;
		// 最新托管合同结束时间
		String tEnd = "";

		String tStartTOEnd2 = "";
		String[] tPlit2 = null;
		// 最新托管合同开始时间
		String tStart2 = "";
		Integer tStartY2 = 0;
		// 最新托管合同结束时间
		String tEnd2 = "";
		if (TContractNo2 == null) {
			tStartTOEnd = TContractNo1.getContractBody_StartTOEnd();
			tPlit = tStartTOEnd.split("~");
			tStart = tPlit[0];
			tStartY = AppUtil.Year(sf.parse(tStart));
			tEnd = tPlit[1];
			contractOneDate = newStart.substring(0, 4) + tEnd.substring(4, 10);
			Calendar c = Calendar.getInstance();
			c.setTime(sf.parse(contractOneDate));
			c.add(Calendar.YEAR, 1);
			contractTwoDate = sf.format(c.getTime());
		} else {
			tStartTOEnd = TContractNo1.getContractBody_StartTOEnd();
			tPlit = tStartTOEnd.split("~");
			tStart = tPlit[0];
			tStartY = AppUtil.Year(sf.parse(tStart));
			tEnd = tPlit[1];
			contractOneDate = newStart.substring(0, 4) + tEnd.substring(4, 10);
			Calendar c = Calendar.getInstance();
			c.setTime(sf.parse(contractOneDate));
			c.add(Calendar.YEAR, 1);
			contractTwoDate = sf.format(c.getTime());

			tStartTOEnd2 = TContractNo2.getContractBody_StartTOEnd();
			tPlit2 = tStartTOEnd2.split("~");
			tStart2 = tPlit2[0];
			tStartY2 = AppUtil.Year(sf.parse(tStart2));
			tEnd2 = tPlit2[1];
			contractOneDate2 = newStart.substring(0, 4) + tEnd2.substring(4, 10);
			Calendar c2 = Calendar.getInstance();
			c2.setTime(sf.parse(contractOneDate2));
			c2.add(Calendar.YEAR, 1);
			contractTwoDate2 = sf.format(c2.getTime());
			if (AppUtil.getDay2(tStart, startTime) < 0 && AppUtil.getDay2(tStart, newEnd) < 0) {
				// 提前续约情况
				TContractNo1 = TContractNo2;
				TContractNo2 = null;
				tStartTOEnd = TContractNo1.getContractBody_StartTOEnd();
				tPlit = tStartTOEnd.split("~");
				tStart = tPlit[0];
				tStartY = AppUtil.Year(sf.parse(tStart));
				tEnd = tPlit[1];

				tStart2 = "";
				tEnd2 = "";

				contractOneDate = newStart.substring(0, 4) + tEnd.substring(4, 10);
				Calendar c3 = Calendar.getInstance();
				c3.setTime(sf.parse(contractOneDate));
				c3.add(Calendar.YEAR, 1);
				contractTwoDate = sf.format(c3.getTime());
			}
		}

		if (zContractNo.getContractObject_Successor() == 0) {
			startTime = tStart;
		}

		if (!tEnd2.equals("") && AppUtil.getDay2(startTime, tEnd2) > 15 && AppUtil.getDay2(tStart, newEnd) > 0) {
			if (oldZContractNo != null && (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "换房") || AppUtil.isOkState(_state, "强收"))) {

				// 转租时间
				ViewContractStatement viewContractStatement = new ViewContractStatement();
				viewContractStatement.setCco_state("取消");
				viewContractStatement.setContractObject_Code(oldZContractNo.getContractObject_Code());
				ViewContractStatement contractNoShutTime = achievementCompanyDAO.selectContractNoShutTime(viewContractStatement).get(0);

				if(AppUtil.getDay2(sf.format(contractNoShutTime.getCco_realDate()), "2017-07-01") > 0){
					forRent = (double) (AppUtil.getDay2("2017-07-01", newStart));
					julyOldMoney = (double) (AppUtil.getDay2(sf.format(contractNoShutTime.getCco_realDate()), "2017-07-01"));
				}else{
					forRent = (double) (AppUtil.getDay2(sf.format(contractNoShutTime.getCco_realDate()), newStart));
				}

				type = false;
			} else {
				if (oldZContractNo != null && (AppUtil.isOkState(_state, "到期") || AppUtil.isOkState(_state, "续约"))) {
					if(AppUtil.getDay2(oldEnd,"2017-07-01") > 0) {
						if(AppUtil.getDay2(sf.format(TContractNo1.getContractObject_Date()), oldEnd) < 0){
							forRent = (double) (AppUtil.getDay2(sf.format(TContractNo1.getContractObject_Date()), newStart) - 1);
						}else{
							forRent = (double) (AppUtil.getDay2("2017-07-01", newStart) - 1);
						}
						julyOldMoney = (double) (AppUtil.getDay2(oldEnd, "2017-07-01") - 1);
					}else{
						if(AppUtil.getDay2(sf.format(TContractNo1.getContractObject_Date()), oldEnd) < 0){
							forRent = (double) (AppUtil.getDay2(sf.format(TContractNo1.getContractObject_Date()), newStart) - 1);
						}else{
							forRent = (double) (AppUtil.getDay2(oldEnd, newStart) - 1);
						}
					}
				} else {
					if(AppUtil.getDay2(tStart2, "2017-07-01") > 0) {
						forRent = (double) (AppUtil.getDay2("2017-07-01", newStart));
						julyOldMoney = (double) (AppUtil.getDay2(tStart2, "2017-07-01"));
					}else{
						forRent = (double) (AppUtil.getDay2(tStart2, newStart));
					}
				}
			}

			double days = 0.0;
			// 今年是合同的第几年
			String endDate = newStart;
			if (oldZContractNo != null && (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "转租"))) {
				endDate = oldEnd;
			}

			if (AppUtil.getMonth2(endDate, contractTwoDate) < 0) {
				contractTwoDate = endDate;
			}
			if (AppUtil.getMonth2(endDate, contractOneDate) < 0) {
				contractOneDate = endDate;
			}

			// 托管合同
			int mMonth = 0;
			// 托管合同
			int mMonth1 = 0;
			// 最新托管合同期限月数
			int tMonth2 = 0;
			// 开头相差月数
			int zMonthc1 = 0;

			mMonth = AppUtil.getMonth2(tStart, tEnd);
			String[] splithm = new String[] { tStart, tEnd };
			HashMap<String, Integer> mapshOldm = AppUtil.calLastBillDate2(splithm, AppUtil.getMonth2(tStart, tEnd), 0);
			if ((mapshOldm.get("day") - 1) > 15) {
				mMonth++;
			}

			mMonth1 = AppUtil.getMonth2(tStart2, tEnd2);
			String[] splithm1 = new String[] { tStart2, tEnd2 };
			HashMap<String, Integer> mapshOldm1 = AppUtil.calLastBillDate2(splithm1, AppUtil.getMonth2(tStart2, tEnd2), 0);
			if ((mapshOldm1.get("day") - 1) > 15) {
				mMonth1++;
			}

			int yTContractNo = mMonth / 12;

			String tcontractTime = "";
			int yt1 = 0;
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			for (int i = 0; i < yTContractNo; i++) {
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(sdf.parse(tStart2));
				calendar.add(Calendar.YEAR, 1 + i);
				if (calendar.getTime().getTime() >= sdf.parse(startTime).getTime()) {
					tcontractTime = sdf.format(calendar.getTime());
					yt1 = i;

					zMonthc1 = AppUtil.getMonth2(startTime, tcontractTime);
					String[] splithc1 = new String[] { startTime, tcontractTime };
					HashMap<String, Integer> mapshOldc1 = AppUtil.calLastBillDate2(splithc1, AppUtil.getMonth2(startTime, tcontractTime), 0);
					if ((mapshOldc1.get("day") - 1) > 15) {
						zMonthc1++;
					}
					break;
				}
			}

			// 免租期
			String contractBody_FreeTime1 = TContractNo1.getContractBody_FreeTime();
			String[] splitDay = contractBody_FreeTime1.split("\\|");
			int year = mMonth / 12;
			if (splitDay.length < year) {
				contractBody_FreeTime1 = "";
				for (int i = 0; i < year; i++) {
					contractBody_FreeTime1 += splitDay[0] + "\\|";
				}
			}
			for (int i = 0; i < splitDay.length; i++) {
				if (yt1 < i) {
					rentFree += 0;
				/*} else if (yt1 == i) {
					rentFree += Double.valueOf(splitDay[i]) / 12 * zMonthc1;*/
				} else {
					rentFree += Double.valueOf(splitDay[i]);
				}
			}

			tMonth2 = AppUtil.getMonth2(tStart, newEnd);
			String[] splith2 = new String[] { tStart, newEnd };
			HashMap<String, Integer> mapshOld2 = AppUtil.calLastBillDate2(splith2, AppUtil.getMonth2(tStart, newEnd), 0);
			if ((mapshOld2.get("day") - 1) > 15) {
				tMonth2++;
			}

			// 免租期
			String contractBody_FreeTime2 = TContractNo1.getContractBody_FreeTime();
			String[] splitDay2 = contractBody_FreeTime2.split("\\|");
			int year1 = mMonth1 / 12;
			if (splitDay.length < year1) {
				contractBody_FreeTime1 = "";
				for (int i = 0; i < year; i++) {
					contractBody_FreeTime1 += splitDay[0] + "\\|";
				}
			}
			for (int i = 0; i < splitDay2.length; i++) {
				if (i == 0) {
					rentFree += Double.valueOf(splitDay2[i]) / 12 * tMonth2;
				}
			}

		} else {
			if (oldZContractNo != null && (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "换房") || AppUtil.isOkState(_state, "强收"))) {
				// 转租时间
				ViewContractStatement viewContractStatement = new ViewContractStatement();
				viewContractStatement.setCco_state("取消");
				viewContractStatement.setContractObject_Code(oldZContractNo.getContractObject_Code());
				ViewContractStatement contractNoShutTime = achievementCompanyDAO.selectContractNoShutTime(viewContractStatement).get(0);

				if(AppUtil.getDay2(sf.format(contractNoShutTime.getCco_realDate()), "2017-07-01") > 0) {
					forRent = (double) (AppUtil.getDay2("2017-07-01", newStart) - 1);
				}else{
					forRent = (double) (AppUtil.getDay2(sf.format(contractNoShutTime.getCco_realDate()), newStart) - 1);
				}
				type = false;
			} else if (oldZContractNo != null && (AppUtil.isOkState(_state, "到期") || AppUtil.isOkState(_state, "续约"))) {
				if(AppUtil.getDay2(oldEnd, "2017-07-01") > 0) {
					if(AppUtil.getDay2(sf.format(TContractNo1.getContractObject_Date()), oldEnd) < 0){
						forRent = (double) (AppUtil.getDay2(sf.format(TContractNo1.getContractObject_Date()), newStart) - 1);
					}else{
						forRent = (double) (AppUtil.getDay2("2017-07-01", newStart) - 1);
					}
					julyOldMoney = (double) (AppUtil.getDay2(oldEnd, "2017-07-01")-1);
				}else{
					if(AppUtil.getDay2(sf.format(TContractNo1.getContractObject_Date()), oldEnd) < 0){
						forRent = (double) (AppUtil.getDay2(sf.format(TContractNo1.getContractObject_Date()), newStart) - 1);
					}else{
						forRent = (double) (AppUtil.getDay2(oldEnd, newStart) - 1);
					}
				}
			} else {
				if (TContractNo2 == null) {
					if(AppUtil.getDay2(tStart, "2017-07-01") > 0) {
						forRent = (double) (AppUtil.getDay2("2017-07-01", newStart));
						julyOldMoney = (double) (AppUtil.getDay2(tStart, "2017-07-01"));
					}else{
						forRent = (double) (AppUtil.getDay2(tStart, newStart));
					}
				} else {
					if (AppUtil.getDay2(newStart, tEnd2) < 0) {
						if(AppUtil.getDay2(tStart2, "2017-07-01") > 0) {
							forRent = (double) (AppUtil.getDay2("2017-07-01", newStart));
							julyOldMoney = (double) (AppUtil.getDay2(tStart2, "2017-07-01"));
						}else{
							forRent = (double) (AppUtil.getDay2(tStart2, newStart));
						}
					} else {
						if(AppUtil.getDay2(tStart, "2017-07-01") > 0) {
							forRent = (double) (AppUtil.getDay2("2017-07-01", newStart));
							julyOldMoney = (double) (AppUtil.getDay2(tStart, "2017-07-01"));
						}else{
							forRent = (double) (AppUtil.getDay2(tStart, newStart));
						}
					}
				}
			}

			// 托管年限
			int mMonth = 0;
			// 开头相差月数
			int zMonthc1 = 0;
			// 结束相差月数
			int zMonthcEnd1 = 0;

			mMonth = AppUtil.getMonth2(tStart, tEnd);
			String[] splithm = new String[] { tStart, tEnd };
			HashMap<String, Integer> mapshOldm = AppUtil.calLastBillDate2(splithm, AppUtil.getMonth2(tStart, tEnd), 0);
			if ((mapshOldm.get("day") - 1) > 15) {
				mMonth++;
			}

			int yTContractNo = mMonth / 12;
			if (yTContractNo == 0) {
				yTContractNo = 1;
			}

			String tcontractTime = "";
			String tcontractTime2 = "";
			int yt1 = 0;
			int yt2 = 0;
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			HashMap<String, Integer> mapshOldc2 = new HashMap<String, Integer>();
			for (int i = 0; i < yTContractNo; i++) {
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(sdf.parse(tStart));
				calendar.add(Calendar.YEAR, 1 + i);
				if (calendar.getTime().getTime() >= sdf.parse(startTime).getTime()) {
					tcontractTime = sdf.format(calendar.getTime());
					yt1 = i;
					if (sdf.parse(tcontractTime).getTime() <= sdf.parse(newEnd).getTime()) {
						zMonthc1 = AppUtil.getMonth2(startTime, tcontractTime);
						String[] splithc1 = new String[] { startTime, tcontractTime };
						mapshOldc2 = AppUtil.calLastBillDate2(splithc1, AppUtil.getMonth2(startTime, tcontractTime), 0);
					} else {
						zMonthc1 = AppUtil.getMonth2(startTime, newEnd);
						String[] splithc1 = new String[] { startTime, newEnd };
						mapshOldc2 = AppUtil.calLastBillDate2(splithc1, AppUtil.getMonth2(startTime, newEnd), 0);
					}
					break;
				} else if (yTContractNo == 1) {
					tcontractTime = sdf.format(calendar.getTime());
					yt1 = i;
					break;
				}
			}

			if(tcontractTime == null || tcontractTime.equals("")){
				tcontractTime = sdf.format(TContractNo1.getContractObject_DeadlineTime());
			}
			if (sdf.parse(newEnd).getTime() >= sdf.parse(tcontractTime).getTime()) {
				for (int i = 0; i < yTContractNo; i++) {
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(sdf.parse(tStart));
					calendar.add(Calendar.YEAR, 1 + i);
					if (calendar.getTime().getTime() > sdf.parse(newEnd).getTime()) {
						Calendar calendar1 = Calendar.getInstance();
						calendar1.setTime(calendar.getTime());
						calendar1.add(Calendar.YEAR, -1);
						tcontractTime2 = sdf.format(calendar1.getTime());
						yt2 = i;

						zMonthcEnd1 = AppUtil.getMonth2(tcontractTime2, newEnd);
						String[] splithc1 = new String[] { tcontractTime2, newEnd };
						HashMap<String, Integer> mapshOldc1 = AppUtil.calLastBillDate2(splithc1, AppUtil.getMonth2(tcontractTime2, newEnd), 0);
						if ((mapshOldc1.get("day") + mapshOldc2.get("day")) > 15) {
							zMonthcEnd1++;
						}
						break;
					} else if (calendar.getTime().getTime() == sdf.parse(newEnd).getTime()) {
						tcontractTime2 = sdf.format(calendar.getTime());
						yt2 = i;
						zMonthcEnd1 = 0;
						break;
					}
				}
			}

			if (zMonthcEnd1 == 0) {
				if (sdf.parse(tcontractTime).getTime() <= sdf.parse(newEnd).getTime()) {
					String[] splithc1 = new String[] { startTime, tcontractTime };
					HashMap<String, Integer> mapshOldc1 = AppUtil.calLastBillDate2(splithc1, AppUtil.getMonth2(startTime, tcontractTime), 0);
					if (mapshOldc1.get("day") > 15) {
						zMonthc1++;
					}
				} else {
					String[] splithc1 = new String[] { startTime, newEnd };
					HashMap<String, Integer> mapshOldc1 = AppUtil.calLastBillDate2(splithc1, AppUtil.getMonth2(startTime, newEnd), 0);
					if (mapshOldc1.get("day") > 15) {
						zMonthc1++;
					}
				}
			}

			// 免租期
			String contractBody_FreeTime1 = TContractNo1.getContractBody_FreeTime();
			String[] splitDay = contractBody_FreeTime1.split("\\|");
			int year = mMonth / 12;
			if (splitDay.length < year) {
				contractBody_FreeTime1 = "";
				for (int i = 0; i < year; i++) {
					contractBody_FreeTime1 += splitDay[0] + "\\|";
				}
			}
			splitDay = contractBody_FreeTime1.split("\\|");
			for (int i = 0; i < splitDay.length; i++) {
				if (yt1 < i) {
					rentFree += 0;
				}
				if (yt1 == i) {
					rentFree += Double.valueOf(splitDay[i].replace("\\","")) / 12 * zMonthc1;
				}
				if (yt1 < i && i < yt2) {
					rentFree += Double.valueOf(splitDay[i].replace("\\",""));
				}
				if (i == yt2 && yt1 != yt2) {
					rentFree += Double.valueOf(splitDay[i].replace("\\","")) / 12 * zMonthcEnd1;
				}
			}
		}

		if (forRent < 0 || AppUtil.isOkState(_state, "转租")) {
			forRent = 0.0;
		}
		if (rentFree < 0) {
			rentFree = 0.0;
		}
		if(julyOldMoney < 0){
			julyOldMoney = 0.0;
		}

		ViewBusinessContractVo viewBusinessContractVo3 = new ViewBusinessContractVo();
		viewBusinessContractVo3.setContractObject_No(contractNo);
		viewBusinessContractVo3.setContractObject_RentStr(forRent + "-" + Double.valueOf(df.format(rentFree))+"-"+julyOldMoney);
		Integer bool = userCenterContractObjectDao.updateContractObjectRentStr(viewBusinessContractVo3);

		if (bool > 0) {
			map.put("message", "success");
		} else {
			map.put("message", "error");
		}

		return map;
	}

	/**
	 * 根据账号查询个人业绩
	 *
	 * @param achievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<ViewSumAchievement> selectAchievementPerson(ViewSumAchievement achievement) {
		return achievementCompanyDAO.selectAchievementPerson(achievement);
	}

	/**
	 * 根据账号查询个人业绩目标
	 *
	 * @param achievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<AchievementPersonAchievement> selectAchievementPersonTarget(AchievementPersonAchievement achievement) {
		return achievementCompanyDAO.selectAchievementPersonTarget(achievement);
	}

	/**
	 * 根据账号查询房源总数
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public int selectMyHouse(ViewBusinessContractRelaEmpVo empVo) {
		return achievementCompanyDAO.selectMyHouse(empVo);
	}

	/**
	 * 根据业绩编码修改合同编码
	 *
	 * @param sumAchievement
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updateCompanyAchievementContID(AchievementSumAchievement sumAchievement) {
		return achievementCompanyDAO.updateCompanyAchievementContID(sumAchievement);
	}

	/**
	 * 根据业绩ID查询业绩设置详情
	 *
	 * @param achievementSettingDetails
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<AchievementSettingDetails> selectAchievementSettingDetails(AchievementSettingDetails achievementSettingDetails) {
		return achievementCompanyDAO.selectAchievementSettingDetails(achievementSettingDetails);
	}

	/**
	 * 查询业绩账单list
	 *
	 * @作者 JiangQT
	 * @日期 2016年9月17日
	 *
	 * @param viewSumAchievement
	 * @return
	 */
	public List<ViewSumAchievement> queryAchievementBillList(ViewSumAchievement viewSumAchievement) {
		return achievementCompanyDAO.queryAchievementBillList(viewSumAchievement);
	}

	/**
	 * 重新生成业绩
	 *
	 * @param contractObject_No
	 *            合同编号
	 * @param ar_content
	 *            记录备注
	 * @return
	 *
	 * @author 陈智颖
	 * @throws Exception
	 */
	public Map<String, Object> againAchievement(String contractObject_No, String ar_content) throws Exception {

		Map<String, Object> map = new HashMap<>();

		int bools = 0;

		if (StringUtils.isEmpty(contractObject_No)) {
			map.put("message", "error");
			return map;
		}

		// 根据租赁合同编码查看合同信息
		ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
		viewBusinessContractVo.setContractObject_No(contractObject_No);
		ViewBusinessContractVo zContractNo = achievementCompanyDAO.selectContractNo(viewBusinessContractVo).get(0);

		AchievementSumAchievement achievementSumAchievement = new AchievementSumAchievement();
		achievementSumAchievement.setContractObject_Id(zContractNo.getContractObject_Id());
		List<AchievementSumAchievement> sumAchievementList = achievementCompanyDAO.selectSumAchievementID(achievementSumAchievement);
		AchievementSumAchievement sumAchievement = new AchievementSumAchievement();
		if (!sumAchievementList.isEmpty()) {
			sumAchievement = sumAchievementList.get(0);
			bools = achievementCompanyDAO.deleteAchievement(sumAchievement);
			if (bools > 0) {
				AchievementBill achievementBill = new AchievementBill();
				achievementBill.setSa_id(sumAchievement.getSa_id());
				List<AchievementBill> selectAchievementBilID = achievementCompanyDAO.selectAchievementBilID(sumAchievement.getSa_id());
				bools = achievementCompanyDAO.deleteAchievementBill(achievementBill);
				if (bools > 0) {
					for (AchievementBill achievementBill1 : selectAchievementBilID) {
						AchievementBillContent achievementBillContent = new AchievementBillContent();
						achievementBillContent.setAb_id(achievementBill1.getAb_id());
						achievementCompanyDAO.deleteAchievementBillContent(achievementBillContent);
					}
				}
			}

		} else {
			bools = 1;
		}

		// 重新计算业绩
		if (bools > 0) {
			upateAchievementRent(contractObject_No);
			Map<String, Object> message = addAchievementStatistics(contractObject_No, 0.0);
			if (message.get("message").equals("success")) {
				AchievementRecord achievementRecord = new AchievementRecord();
				achievementRecord.setAr_content(ar_content);
				achievementRecord.setAr_date(new Date());
				UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
				achievementRecord.setEm_id(cookieEmployee.getEm_id());
				achievementRecord.setAr_type("重新生成");
				achievementRecord.setAr_money(0);
				achievementRecord.setSa_id((Integer) message.get("sa_id"));
				achievementRecord.setContractObject_Id(Integer.valueOf(message.get("contractObject_Id").toString()));
				achievementCompanyDAO.addAchievementRecord(achievementRecord);
				map.put("message", "success");
			} else {
				map.put("message", "error");
			}
		} else {
			map.put("message", "error");
		}

		return map;
	}

	/**
	 * 调整业绩
	 *
	 * @param contractObject_No
	 *            合同编码
	 * @param ar_content
	 *            记录备注
	 * @param money
	 *            调整金额
	 * @return
	 *
	 * @author 陈智颖
	 * @throws Exception
	 */
	public Map<String, Object> adjustmentAchievement(String contractObject_No, String ar_content, double money) throws Exception {

		Map<String, Object> map = new HashMap<>();
		int bools = 0;

		if (contractObject_No == null || contractObject_No.equals("")) {
			map.put("message", "error");
			return map;
		}

		// 根据租赁合同编码查看合同信息
		ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
		viewBusinessContractVo.setContractObject_No(contractObject_No);
		ViewBusinessContractVo zContractNo = achievementCompanyDAO.selectContractNo(viewBusinessContractVo).get(0);

		AchievementSumAchievement achievementSumAchievement = new AchievementSumAchievement();
		achievementSumAchievement.setContractObject_Id(zContractNo.getContractObject_Id());
		AchievementSumAchievement sumAchievement = achievementCompanyDAO.selectSumAchievementID(achievementSumAchievement).get(0);
		bools = achievementCompanyDAO.deleteAchievement(sumAchievement);
		if (bools > 0) {
			AchievementBill achievementBill = new AchievementBill();
			achievementBill.setSa_id(sumAchievement.getSa_id());
			List<AchievementBill> selectAchievementBilID = achievementCompanyDAO.selectAchievementBilID(sumAchievement.getSa_id());
			bools = achievementCompanyDAO.deleteAchievementBill(achievementBill);
			if (bools > 0) {
				for (AchievementBill achievementBill1 : selectAchievementBilID) {
					AchievementBillContent achievementBillContent = new AchievementBillContent();
					achievementBillContent.setAb_id(achievementBill1.getAb_id());
					achievementCompanyDAO.deleteAchievementBillContent(achievementBillContent);
				}
			}
		}

		// 重新计算业绩
		if (bools > 0) {
			upateAchievementRent(contractObject_No);
			Map<String, Object> message = addAchievementStatistics(contractObject_No, money);
			if (message.get("message").equals("success")) {
				AchievementRecord achievementRecord = new AchievementRecord();
				achievementRecord.setAr_content(ar_content);
				achievementRecord.setAr_date(new Date());
				UserCenterEmployee cookieEmployee = AppUtil.getCookieEmployee();
				achievementRecord.setEm_id(cookieEmployee.getEm_id());
				achievementRecord.setAr_type("业绩调整");
				achievementRecord.setAr_money(money);
				achievementRecord.setSa_id((Integer) message.get("sa_id"));
				achievementRecord.setContractObject_Id(Integer.valueOf(message.get("contractObject_Id").toString()));
				achievementCompanyDAO.addAchievementRecord(achievementRecord);
				map.put("message", "success");
			} else {
				map.put("message", "error");
			}
		} else {
			map.put("message", "error");
		}

		return map;
	}

	/**
	 * 查询业绩记录
	 *
	 * @作者 JiangQT
	 * @日期 2016年9月25日
	 *
	 * @param achievementRecord
	 * @return
	 */
	public List<AchievementRecord> queryAchiRecord(AchievementRecord achievementRecord) {
		return achievementCompanyDAO.queryAchiRecord(achievementRecord);
	}

	/**
	 * 查询最后一条业绩调整记录
	 *
	 * @作者 JiangQT
	 * @日期 2016年9月26日
	 *
	 * @param achievementRecord
	 * @return
	 */
	public AchievementRecord queryAchiRecordLastOne(AchievementRecord achievementRecord) {
		return achievementCompanyDAO.queryAchiRecordLastOne(achievementRecord);
	}

	/**
	 * 添加业绩记录
	 *
	 * @作者 JiangQT
	 * @日期 2016年9月26日
	 *
	 * @param achievementRecord
	 * @return
	 */
	public boolean addAchievementRecord(AchievementRecord achievementRecord) {
		return achievementCompanyDAO.addAchievementRecord(achievementRecord) > 0;
	}

	/**
	 * 更新总业绩
	 *
	 * @作者 JiangQT
	 * @日期 2016年9月26日
	 *
	 * @param sumAchievement
	 * @return
	 */
	public boolean updateSumAchievement(AchievementSumAchievement sumAchievement) {
		return achievementCompanyDAO.updateSumAchievement(sumAchievement) > 0;
	}

	/**
	 * 根据合同编码查询退租时间
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<ViewContractStatement> selectContractNoShutTime(ViewContractStatement viewContractStatement) {
		return achievementCompanyDAO.selectContractNoShutTime(viewContractStatement);
	}

	/**
	 * 新版房屋利润计算
	 *
	 * @param contractObject_No 合同编号
	 * @author 陈智颖
	 * @create 8/11/17 4:11 PM
	 * @return
	 **/
	public Map<String, Object> updateAchievementHouse(String contractObject_No){
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		Msg<Object> msg = new Msg<>();

		// 直接收入租金差价
		Double ahm_directRent = 0.0;
		// 间接收入租金差价
		Double ahm_synopsisRent = 0.0;
		// 直接收入空置盈亏(免租期、招租期天数、水电气物管费)
		Double ahm_directVacant = 0.0;
		// 间接收入空置期盈亏(招租期天数、水电气物管费)
		Double ahm_synopsisVacant = 0.0;
		// 服务费用
		Double ahm_serviceMoney = 0.0;
		// 维修费用
		Double ahm_repairMoney = 0.0;
		// 违约金
		Double ahm_penalty = 0.0;
		// 转租费用
		Double ahm_subletMoney = 0.0;
		// 物管费
		Double ahm_wuguanMoney = 0.0;
		// 水费
		Double ahm_waterMoney = 0.0;
		// 电费
		Double ahm_electricMoney = 0.0;
		// 气费
		Double ahm_gasMoney = 0.0;
		// 直接合作费
		Double ahm_directCooperateMoney = 0.0;
		// 间接合作费
		Double ahm_synosisCooperateMoney = 0.0;
		// 房屋code
		String hi_code = "";
		// 部门编码
		Integer ucc_id = 0;
		// 合同开始时间
		Date contractObject_Date = null;
		// 合同结束时间
		Date contractObject_DeadlineTime = null;
		// 合同编码
		String contractObject_Code = null;
		// 出房提成
		Double ahm_directOutHouseMoney = 0.0;
		// 出房提成
		Double ahm_synopsisOutHouseMoney = 0.0;
		// 7月份以前亏损
		Double ahm_julyOldMoney = 0.0;
		// 保险
		Double ahm_insurance = 0.0;
		// 经营费
		Double ahm_operateMoney = 0.0;
		// 公司管理费
		Double ahm_gsmanageMoney = 0.0;

		// 业绩类型
		String sa_type = "";
		// 开始时间
		String startTime = "";
		// 管理费天数
		Integer leaseMonth = 0;
		// 管理费
		double serviceMoney = 0.0;
		// 业绩是否跨托管合同
		Boolean bool = false;
		// 免租期
		double forRentDay = 0.0;
		// 免租期
		double rentFreeMoney = 0.0;
		// 招租期
		double freeDay = 0.0;
		// 招租期金额
		double freeMoney = 0.0;
		// 7月以前空置期
		double julyOld = 0.0;
		// 保留小数点后两位
		DecimalFormat df = new DecimalFormat("######0.00");

		// 根据租赁合同编码查看合同信息
		ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
		viewBusinessContractVo.setContractObject_No(contractObject_No);
		System.out.println("合同编码：" + contractObject_No);
		ViewBusinessContractVo zContractNo = achievementCompanyDAO.selectContractNo(viewBusinessContractVo).get(0);

		// 根据房屋编码查询最新一个算了业绩的租赁合同
		ViewBusinessContractVo viewBusinessContractVo1 = new ViewBusinessContractVo();
		viewBusinessContractVo1.setHi_code(zContractNo.getHi_code());
		if (zContractNo.getContractObject_Successor() != 0) {
			viewBusinessContractVo1.setContractObject_Id(zContractNo.getContractObject_Successor());
		} else {
			viewBusinessContractVo1.setContractObject_Bool(1);
		}
		viewBusinessContractVo1.setContractObject_Type("租赁合同");
		ViewBusinessContractVo oldZContractNo = null;
		Integer _state = 0;
		if (!achievementCompanyDAO.selectContractNo(viewBusinessContractVo1).isEmpty()) {
			oldZContractNo = achievementCompanyDAO.selectContractNo(viewBusinessContractVo1).get(0);
			_state = oldZContractNo.getContractObject_OptionState();
		}

		// 根据房屋编码查询最新托管合同
		ViewBusinessContractVo viewBusinessContractVo2 = new ViewBusinessContractVo();
		viewBusinessContractVo2.setHi_code(zContractNo.getHi_code());
		viewBusinessContractVo2.setContractObject_Type("托管合同");
		List<ViewBusinessContractVo> selectContractNo = achievementCompanyDAO.selectContractNo(viewBusinessContractVo2);
		ViewBusinessContractVo tContractNo1 = null;
		ViewBusinessContractVo tContractNo2 = null;
		if(selectContractNo.isEmpty()){
			return msg.toMap();
		}
		if (selectContractNo.size() > 1) {
			tContractNo1 = selectContractNo.get(0);
			tContractNo2 = selectContractNo.get(1);
		} else {
			tContractNo1 = selectContractNo.get(0);
		}

		// 查询业绩设置
		AchievementSetting selectAchievementSetting = achievementCompanyDAO.selectAchievementSetting();

		// 支付方式
		String payStyle = zContractNo.getContractBody_PayStyle();
		// 支付类型
		String payType = "";
		if (zContractNo.getContractBody_PayType() == null || zContractNo.getContractBody_PayType().equals("")) {
			payType = "管家婆";
		} else {
			payType = zContractNo.getContractBody_PayType();
		}

		try {
			// 等于空新出房，不等于空转租或者转租加新出
			if (oldZContractNo == null) {
				sa_type = "新出房";

				// 计算当前租赁合同和上一份租赁合同的时间段，重叠时间，和不重叠时间
				String newStartTOEnd = zContractNo.getContractBody_StartTOEnd();
				String[] newsplit = newStartTOEnd.split("~");
				// 最新租赁合同开始时间
				String newStart = newsplit[0];
				Integer newStartY = AppUtil.Year(sf.parse(newStart));
				startTime = newStart;
				// 最新租赁合同结束时间
				String newEnd = newsplit[1];
				Integer newEndY = AppUtil.Year(sf.parse(newEnd));

				// 管理费天数
				leaseMonth = AppUtil.getMonth2(newStart, newEnd);
				String[] splitLease = new String[]{newStart, newEnd};
				HashMap<String, Integer> mapsLease = AppUtil.calLastBillDate2(splitLease, AppUtil.getMonth2(newStart, newEnd), 0);
				Integer dayLease = mapsLease.get("day");
				if (dayLease > 15) {
					leaseMonth++;
				}

				// 计算当前租赁合同和上一份租赁合同的时间段，重叠时间，和不重叠时间
				String tStartTOEnd = "";
				String[] tPlit = null;
				// 最新托管合同开始时间
				String tStart = "";
				Integer tStartY = 0;
				// 最新托管合同结束时间
				String tEnd = "";

				String tStartTOEnd2 = "";
				String[] tPlit2 = null;
				// 最新托管合同开始时间
				String tStart2 = "";
				Integer tStartY2 = 0;
				// 最新托管合同结束时间
				String tEnd2 = "";
				if (tContractNo2 == null) {
					tStartTOEnd = tContractNo1.getContractBody_StartTOEnd();
					tPlit = tStartTOEnd.split("~");
					tStart = tPlit[0];
					tStartY = AppUtil.Year(sf.parse(tStart));
					tEnd = tPlit[1];
					if (tContractNo1.getContractObject_RentFreeMode() == 1) {
						tContractNo1.setContractBody_Rent(tContractNo1.getContractBody_Rent() / 12);
					}
				} else {
					tStartTOEnd = tContractNo1.getContractBody_StartTOEnd();
					tPlit = tStartTOEnd.split("~");
					tStart = tPlit[0];
					tStartY = AppUtil.Year(sf.parse(tStart));
					tEnd = tPlit[1];
					if (tContractNo1.getContractObject_RentFreeMode() == 1) {
						tContractNo1.setContractBody_Rent(tContractNo1.getContractBody_Rent() / 12);
					}

					tStartTOEnd2 = tContractNo2.getContractBody_StartTOEnd();
					tPlit2 = tStartTOEnd2.split("~");
					tStart2 = tPlit2[0];
					tStartY2 = AppUtil.Year(sf.parse(tStart2));
					tEnd2 = tPlit2[1];
					if (tContractNo2.getContractObject_RentFreeMode() == 1) {
						tContractNo2.setContractBody_Rent(tContractNo2.getContractBody_Rent() / 12);
					}
					if (AppUtil.getDay2(tStart, startTime) < 0 && AppUtil.getDay2(tStart, newEnd) < 0) {
						// 提前续约情况
						tContractNo1 = tContractNo2;
						tContractNo2 = null;
						tStartTOEnd = tContractNo1.getContractBody_StartTOEnd();
						tPlit = tStartTOEnd.split("~");
						tStart = tPlit[0];
						tStartY = AppUtil.Year(sf.parse(tStart));
						tEnd = tPlit[1];
					}
				}

				// 租赁服务费
				if (zContractNo.getContractBody_Service() == 0) {
					ahm_serviceMoney = 0.0;
				} else {
					ahm_serviceMoney = zContractNo.getContractBody_Service();
				}
				ViewBusinessContractVo viewBusinessContractVo3 = new ViewBusinessContractVo();
				viewBusinessContractVo3.setContractObject_No(zContractNo.getContractObject_No());
				viewBusinessContractVo3.setContractObject_ServiceBool(1);
				achievementCompanyDAO.updateContractObjectServiceBool(viewBusinessContractVo3);

				// 租赁租金浮动
				String renMoney = "0";
				if (zContractNo.getContractBody_RentPlus() != null) {
					renMoney = zContractNo.getContractBody_RentPlus();
				}
				String[] rentMoneySplit = renMoney.split("\\|");
				for (int i = 0; i < rentMoneySplit.length; i++) {
					if (rentMoneySplit[i].contains("%")) {
						zContractNo.setContractBody_Rent(zContractNo.getContractBody_Rent() * (1 + Double.parseDouble(rentMoneySplit[i].replace("%", "")) / 100));
					} else {
						zContractNo.setContractBody_Rent(zContractNo.getContractBody_Rent() + Double.parseDouble(rentMoneySplit[i]));
					}
				}

				if (tContractNo2 == null) {
					Integer year = AppUtil.getMonth2(tStart, newEnd) / 12;
					Integer yeart = AppUtil.getMonth2(tStart, newEnd) / 12;
					Integer month = AppUtil.getMonth2(tStart, newEnd) % 12;
					if (month > 0) {
						year = year + 1;
					}
					// 托管租金递增
					String increasing = tContractNo1.getContractBody_Increasing();
					String[] increasingSplit = increasing.split("\\|");
					for (int i = 0; i < increasingSplit.length; i++) {
						if (i < year) {
							Double zeng = 0.0;
							if (increasingSplit[i].contains("%")) {
								zeng = 1 + Double.valueOf(increasingSplit[i].replace("%", "")) / 100;
							} else {
								zeng = Double.valueOf(increasingSplit[i]);
							}
							tContractNo1.setContractBody_Rent(tContractNo1.getContractBody_Rent() + zeng);
						}
					}
				} else {
					Integer year2 = AppUtil.getMonth2(tStart2, newEnd) / 12;
					Integer yeart2 = AppUtil.getMonth2(tStart2, newEnd) / 12;
					Integer month2 = AppUtil.getMonth2(tStart2, newEnd) % 12;
					if (month2 > 0) {
						year2 = year2 + 1;
					}
					// 托管租金递增
					String increasing = tContractNo1.getContractBody_Increasing();
					String increasing2 = tContractNo2.getContractBody_Increasing();
					String[] increasingSplit = increasing.split("\\|");
					String[] increasingSplit2 = increasing2.split("\\|");
					for (int i = 0; i < increasingSplit.length; i++) {
						if (i < year2) {
							Double zeng = 0.0;
							if (increasingSplit[i].contains("%")) {
								zeng = 1 + Double.valueOf(increasingSplit[i].replace("%", "")) / 100;
							} else {
								zeng = Double.valueOf(increasingSplit[i]);
							}
							tContractNo1.setContractBody_Rent(tContractNo1.getContractBody_Rent() + zeng);
						}
					}
					for (int i = 0; i < increasingSplit2.length; i++) {
						if (i < year2) {
							Double zeng = 0.0;
							if (increasingSplit[i].contains("%")) {
								zeng = 1 + Double.valueOf(increasingSplit[i].replace("%", "")) / 100;
							} else {
								zeng = Double.valueOf(increasingSplit[i]);
							}
							tContractNo1.setContractBody_Rent(tContractNo1.getContractBody_Rent() + zeng);
						}
					}

				}

				// 新业绩部分计算（差价）
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
					// 租赁合同在两份托管合同之间
					if (!tEnd2.equals("") && AppUtil.getDay2(startTime, tEnd2) > 0 && AppUtil.getDay2(tStart, newEnd) > 0) {

						bool = true;
						String[] split = new String[]{startTime, tEnd2};
						HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(startTime, tEnd2), 0);
						if(maps.get("day")  == 1){
							maps.put("day",0);
						}
						if (tContractNo2 != null) {
							ahm_directRent += (zContractNo.getContractBody_Rent() - tContractNo2.getContractBody_Rent()) * (AppUtil.getMonth2(startTime, tEnd2)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo2.getContractBody_Rent()) / 30 * maps.get("day")));
							if (tContractNo2 != null && tContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(tContractNo2.getContractObject_DeadlineTime())) > 0) {
								ahm_directRent += (zContractNo.getContractBody_Rent() - tContractNo2.getContractBody_Rent1()) * (AppUtil.getMonth2(startTime, tEnd2)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo2.getContractBody_Rent1()) / 30 * maps.get("day")));
							}
						}

						String[] split1 = new String[]{tStart, newEnd};
						HashMap<String, Integer> maps1 = AppUtil.calLastBillDate2(split1, AppUtil.getMonth2(tStart, newEnd), 0);
						if(maps1.get("day")  == 1){
							maps1.put("day",0);
						}
						ahm_directRent += (zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent()) * (AppUtil.getMonth2(tStart, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent()) / 30 * maps1.get("day")));
						if (tContractNo2 != null && tContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(tContractNo2.getContractObject_DeadlineTime())) > 0) {
							ahm_directRent += (zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent1()) * (AppUtil.getMonth2(tStart, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent1()) / 30 * maps1.get("day")));
						}

					} else {
						String[] split = new String[]{startTime, newEnd};
						HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(startTime, newEnd), 0);
						if(maps.get("day")  == 1){
							maps.put("day",0);
						}
						ahm_directRent += (zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent()) * (AppUtil.getMonth2(startTime, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent()) / 30 * maps.get("day")));
						if (tContractNo2 != null && tContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(tContractNo2.getContractObject_DeadlineTime())) > 0) {
							ahm_directRent += (zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent1()) * (AppUtil.getMonth2(startTime, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent1()) / 30 * maps.get("day")));
						}
					}
				}
				if (!tEnd2.equals("") && AppUtil.getDay2(startTime, tEnd2) > 0 && AppUtil.getDay2(tStart, newEnd) > 0) {

					Integer xmonth2 = AppUtil.getMonth2(newStart, tEnd2);
					String[] split2 = new String[]{newStart, tEnd2};
					HashMap<String, Integer> maps2 = AppUtil.calLastBillDate2(split2, AppUtil.getMonth2(newStart, tEnd2), 0);
					Integer day2 = maps2.get("day");
					if (day2 > 27) {
						xmonth2++;
					}

					// 管理费天数
					Integer xmonth = AppUtil.getMonth2(tStart, newEnd);
					String[] split = new String[]{tStart, newEnd};
					HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(tStart, newEnd), 0);
					Integer day = maps.get("day");
					if (day > 15) {
						xmonth++;
					}
					if(day2 == 1){
						day2 = 0;
					}

					// 管理费
					Double gMoney = 0.0;
					if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
						// 提取免租期金额：托管管理费/30*免租期天数=免租期金额
						gMoney = tContractNo1.getContractBody_Service();
						serviceMoney += gMoney / 12 * xmonth + gMoney / (12 * 30) * day;
					}

					if (tContractNo2 != null) {
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
							// 提取免租期金额：托管管理费/30*免租期天数=免租期金额
							gMoney = tContractNo2.getContractBody_Service();
							serviceMoney += gMoney / 12 * xmonth + gMoney / (12 * 30) * day2;
						}
					}
				} else {
					Integer xmonth = AppUtil.getMonth2(newStart, newEnd);
					String[] split = new String[]{newStart, newEnd};
					HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(newStart, newEnd), 0);
					Integer day = maps.get("day");
					if (day > 15) {
						xmonth++;
					}
					// 管理费
					Double gMoney = 0.0;
					if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
						// 提取免租期金额：托管管理费/30*免租期天数=免租期金额
						gMoney = tContractNo1.getContractBody_Service();
						if (gMoney == null) {
							gMoney = 0.0;
						}
						serviceMoney += gMoney / 12 * xmonth + gMoney / (12 * 30) * day;
					}
				}
			}else{
				// 计算当前租赁合同和上一份租赁合同的时间段，重叠时间，和不重叠时间
				String newStartTOEnd = zContractNo.getContractBody_StartTOEnd();
				String[] newsplit = newStartTOEnd.split("~");
				// 最新租赁合同开始时间
				String newStart = newsplit[0];
				Integer newStartY = AppUtil.Year(sf.parse(newStart));
				startTime = newStart;
				// 最新租赁合同结束时间
				String newEnd = newsplit[1];
				Integer newEndY = AppUtil.Year(sf.parse(newEnd));

				String oldStartTOEnd = oldZContractNo.getContractBody_StartTOEnd();
				String[] oldsplit = oldStartTOEnd.split("~");
				// 以前租赁合同开始时间
				String oldstat = oldsplit[0];
				// 以前租赁合同结束时间
				String oldEnd = oldsplit[1];
				// 是否有转租
				if (!AppUtil.isOkState(_state, "退租") && !AppUtil.isOkState(_state, "换房")) {
					if (AppUtil.getDay2(oldEnd, newStart) < 0 && (oldZContractNo == null || !AppUtil.isOkState(_state, "到期"))) {
						if (AppUtil.getDay2(oldEnd, newEnd) > 0) {
							startTime = oldEnd;
						} else {
							startTime = newEnd;
						}
					}
				}

				if (selectAchievementSetting == null || selectAchievementSetting.getAs_turnRentMoney() == 1) {
					ViewContractStatement viewContractStatement = new ViewContractStatement();
					viewContractStatement.setCco_state("取消");
					viewContractStatement.setContractObject_Code(oldZContractNo.getContractObject_Code());
					List<ViewContractStatement> viewContractStatements = achievementCompanyDAO.selectContractNoShutTime(viewContractStatement);
					if(!viewContractStatements.isEmpty()){
						ViewContractStatement contractNoShutTime = viewContractStatements.get(0);
						if(contractNoShutTime != null){
							// 转租费用或者违约金费用
							if (AppUtil.isOkState(_state, "转租")) {
								if(contractNoShutTime.getCco_subletCost() != null){
									ahm_subletMoney += contractNoShutTime.getCco_subletCost();
								}
							} else {
								if(contractNoShutTime.getCco_subletCost() != null){
									ahm_penalty += contractNoShutTime.getCco_subletCost();
								}
							}
						}
					}
				}

				// 管理费天数
				leaseMonth = AppUtil.getMonth2(newStart, newEnd);
				String[] splitLease = new String[] { newStart, newEnd };
				HashMap<String, Integer> mapsLease = AppUtil.calLastBillDate2(splitLease, AppUtil.getMonth2(newStart, newEnd), 0);
				Integer dayLease = mapsLease.get("day");
				if (dayLease > 15) {
					leaseMonth++;
				}

				if (AppUtil.isOkState(_state, "退租")) {
					sa_type = "退租";
					if (AppUtil.getDay2(oldEnd, newEnd) > 0) {
						startTime = oldEnd;
					} else {
						startTime = newEnd;
					}
				}

				if (AppUtil.isOkState(_state, "换房")) {
					sa_type = "换房";
					if (AppUtil.getDay2(oldEnd, newEnd) > 0) {
						startTime = oldEnd;
					} else {
						startTime = newEnd;
					}
				}

				if (AppUtil.isOkState(_state, "转租") && AppUtil.getDay2(oldEnd, newEnd) > 0) {
					sa_type = "转租";
				}
				if (AppUtil.isOkState(_state, "到期")) {
					sa_type = "到期";
				}
				if (AppUtil.isOkState(_state, "退租")) {
					sa_type = "退租";
				}
				if (AppUtil.isOkState(_state, "强收")) {
					sa_type = "强收";
				}
				if (AppUtil.isOkState(_state, "续约")) {
					sa_type = "续约";
				}

				// 计算当前租赁合同和上一份租赁合同的时间段，重叠时间，和不重叠时间
				String tStartTOEnd = "";
				String[] tPlit = null;
				// 最新托管合同开始时间
				String tStart = "";
				Integer tStartY = 0;
				// 最新托管合同结束时间
				String tEnd = "";

				String tStartTOEnd2 = "";
				String[] tPlit2 = null;
				// 最新托管合同开始时间
				String tStart2 = "";
				Integer tStartY2 = 0;
				// 最新托管合同结束时间
				String tEnd2 = "";
				if (tContractNo2 == null) {
					tStartTOEnd = tContractNo1.getContractBody_StartTOEnd();
					tPlit = tStartTOEnd.split("~");
					tStart = tPlit[0];
					tStartY = AppUtil.Year(sf.parse(tStart));
					tEnd = tPlit[1];
					tContractNo1.setContractBody_Rent1(0);
					if (tContractNo1.getContractObject_RentFreeMode() == 1) {
						tContractNo1.setContractBody_Rent(tContractNo1.getContractBody_Rent() / 12);
					}
				} else {
					tStartTOEnd = tContractNo1.getContractBody_StartTOEnd();
					tPlit = tStartTOEnd.split("~");
					tStart = tPlit[0];
					tStartY = AppUtil.Year(sf.parse(tStart));
					tEnd = tPlit[1];
					tContractNo1.setContractBody_Rent1(0);
					if (tContractNo1.getContractObject_RentFreeMode() == 1) {
						tContractNo1.setContractBody_Rent(tContractNo1.getContractBody_Rent() / 12);
					}

					tStartTOEnd2 = tContractNo2.getContractBody_StartTOEnd();
					tPlit2 = tStartTOEnd2.split("~");
					tStart2 = tPlit2[0];
					tStartY2 = AppUtil.Year(sf.parse(tStart2));
					tEnd2 = tPlit2[1];
					tContractNo2.setContractBody_Rent1(0);
					if (tContractNo2.getContractObject_RentFreeMode() == 1) {
						tContractNo2.setContractBody_Rent(tContractNo2.getContractBody_Rent() / 12);
					}
					if (AppUtil.getDay2(tStart, startTime) < 0 && AppUtil.getDay2(tStart, newEnd) < 0) {
						// 提前续约情况
						tContractNo1 = tContractNo2;
						tContractNo2 = null;
						tStartTOEnd = tContractNo1.getContractBody_StartTOEnd();
						tPlit = tStartTOEnd.split("~");
						tStart = tPlit[0];
						tStartY = AppUtil.Year(sf.parse(tStart));
						tEnd = tPlit[1];
					}
				}

				// 租赁服务费
				if (zContractNo.getContractBody_Service() != 0) {
					ahm_serviceMoney = Double.valueOf(zContractNo.getContractBody_Service());
				} else {
					ahm_serviceMoney = 0.0;
				}

				// 租赁租金浮动
				String renMoney = "0";
				if (zContractNo.getContractBody_RentPlus() != null) {
					renMoney = zContractNo.getContractBody_RentPlus();
				}
				String[] rentMoneySplit = renMoney.split("\\|");
				for (int i = 0; i < rentMoneySplit.length; i++) {
					if (rentMoneySplit[i].contains("%")) {
						zContractNo.setContractBody_Rent(zContractNo.getContractBody_Rent() * (1 + Double.parseDouble(rentMoneySplit[i].replace("%", "")) / 100));
					} else {
						zContractNo.setContractBody_Rent(zContractNo.getContractBody_Rent() + Double.parseDouble(rentMoneySplit[i]));
					}
				}

				if (tContractNo2 == null) {
					Integer year = AppUtil.getMonth2(tStart, newEnd) / 12;
					Integer month = AppUtil.getMonth2(tStart, newEnd) % 12;
					if (month > 0) {
						year = year + 1;
					}
					// 托管租金递增
					String increasing = tContractNo1.getContractBody_Increasing();
					String[] increasingSplit = increasing.split("\\|");
					for (int i = 0; i < increasingSplit.length; i++) {
						if (i < year) {
							if (increasingSplit[i].contains("%")) {
								tContractNo1.setContractBody_Rent(tContractNo1.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit[i].replace("%", "")) / 100));
							} else {
								tContractNo1.setContractBody_Rent(tContractNo1.getContractBody_Rent() + Double.parseDouble(increasingSplit[i]));
							}
						}
					}

				} else {

					Integer year2 = AppUtil.getMonth2(tStart2, newEnd) / 12;
					Integer yeart2 = AppUtil.getMonth2(tStart2, newEnd) / 12;
					Integer month2 = AppUtil.getMonth2(tStart2, newEnd) % 12;
					if (month2 > 0) {
						year2 = year2 + 1;
					}

					Integer year1 = AppUtil.getMonth2(tStart, newEnd) / 12;
					Integer yeart1 = AppUtil.getMonth2(tStart, newEnd) / 12;
					Integer month1 = AppUtil.getMonth2(tStart, newEnd) % 12;
					if (month1 > 0) {
						year1 = year1 + 1;
					}

					String[] spliths = new String[] { tStart, newEnd };
					HashMap<String, Integer> mapshs = AppUtil.calLastBillDate2(spliths, AppUtil.getMonth2(tStart, newEnd), 0);
					if (mapshs.get("day") < 0) {
						year1 = year2;
						yeart1 = yeart2;
					}

					// 托管租金递增
					String increasing = tContractNo1.getContractBody_Increasing();
					String increasing2 = tContractNo2.getContractBody_Increasing();
					String[] increasingSplit = increasing.split("\\|");
					String[] increasingSplit2 = increasing2.split("\\|");
					for (int i = 0; i < increasingSplit.length; i++) {
						if (i < year1) {
							if (increasingSplit[i].contains("%")) {
								tContractNo1.setContractBody_Rent1(tContractNo1.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit[i].replace("%", "")) / 100));
							} else {
								tContractNo1.setContractBody_Rent1(tContractNo1.getContractBody_Rent() + Double.parseDouble(increasingSplit[i]));
							}
						}
					}
					for (int i = 0; i < increasingSplit2.length; i++) {
						if (i < year2) {
							if (increasingSplit2[i].contains("%")) {
								tContractNo2.setContractBody_Rent(tContractNo2.getContractBody_Rent() * (1 + Double.parseDouble(increasingSplit2[i].replace("%", "")) / 100));
							} else {
								tContractNo2.setContractBody_Rent(tContractNo2.getContractBody_Rent() + Double.parseDouble(increasingSplit2[i]));
							}
						}
					}


				}

				// 新业绩部分计算（差价）
				if (selectAchievementSetting == null || selectAchievementSetting.getAs_premium() == 1) {
					// 租赁合同在两份托管合同之间
					if (!tEnd2.equals("") && AppUtil.getDay2(startTime, tEnd2) > 0 && AppUtil.getDay2(tStart, newEnd) > 0) {
						bool = true;
						String[] split = new String[] { startTime, tEnd2 };
						HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(startTime, tEnd2), 0);
						if(maps.get("day")  == 1){
							maps.put("day",0);
						}
						if (tContractNo2 != null) {
							ahm_directRent += (zContractNo.getContractBody_Rent() - tContractNo2.getContractBody_Rent()) * (AppUtil.getMonth2(startTime, tEnd2)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo2.getContractBody_Rent()) / 30 * maps.get("day")));

							if (tContractNo2 != null && tContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(tContractNo2.getContractObject_DeadlineTime())) > 0) {
								ahm_directRent += (zContractNo.getContractBody_Rent() - tContractNo2.getContractBody_Rent1()) * (AppUtil.getMonth2(startTime, tEnd2)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo2.getContractBody_Rent1()) / 30 * maps.get("day")));
							}
						}

						String[] split1 = new String[] { tStart, newEnd };
						HashMap<String, Integer> maps1 = AppUtil.calLastBillDate2(split1, AppUtil.getMonth2(tStart, newEnd), 0);
						if(maps1.get("day")  == 1){
							maps1.put("day",0);
						}
						ahm_directRent += (zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent()) * (AppUtil.getMonth2(tStart, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent()) / 30 * maps1.get("day")));

						if (tContractNo2 != null && tContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(tContractNo2.getContractObject_DeadlineTime())) > 0) {
							ahm_directRent += (zContractNo.getContractBody_Rent() - tContractNo2.getContractBody_Rent1()) * (AppUtil.getMonth2(tStart, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent1()) / 30 * maps1.get("day")));
						}

					} else {
						if (AppUtil.getDay2(oldEnd, newStart) < 0) {
							String[] split = new String[] { newStart, startTime };
							HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(newStart, startTime), 0);
							if(maps.get("day")  == 1){
								maps.put("day",0);
							}

							String[] split1 = new String[] { startTime, newEnd };
							HashMap<String, Integer> maps1 = AppUtil.calLastBillDate2(split1, AppUtil.getMonth2(startTime, newEnd), 0);
							if(maps1.get("day")  == 1){
								maps1.put("day",0);
							}
							ahm_synopsisRent = (zContractNo.getContractBody_Rent() - oldZContractNo.getContractBody_Rent()) * (AppUtil.getMonth2(newStart, startTime)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - oldZContractNo.getContractBody_Rent()) / 30 * maps.get("day")));
							ahm_directRent = Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent()) * (AppUtil.getMonth2(startTime, newEnd) < 0 ? 0 : AppUtil.getMonth2(startTime, newEnd)))) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent()) / 30 * maps1.get("day")));
							if (tContractNo2 != null && tContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(tContractNo2.getContractObject_DeadlineTime())) > 0) {
								ahm_synopsisRent = (zContractNo.getContractBody_Rent() - oldZContractNo.getContractBody_Rent()) * (AppUtil.getMonth2(newStart, startTime)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - oldZContractNo.getContractBody_Rent()) / 30 * maps.get("day")));
								ahm_directRent = Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent1()) * (AppUtil.getMonth2(startTime, newEnd) < 0 ? 0 : AppUtil.getMonth2(startTime, newEnd)))) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent1()) / 30 * maps1.get("day")));
							}

						} else {
							String[] split = new String[] { startTime, newEnd };
							HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(startTime, newEnd), 0);
							if(maps.get("day")  == 1){
								maps.put("day",0);
							}
							ahm_directRent += (zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent()) * (AppUtil.getMonth2(startTime, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent()) / 30 * maps.get("day")));
							if (tContractNo2 != null && tContractNo2.getContractBody_Rent1() != 0 && AppUtil.getMonth2(startTime, sf.format(tContractNo2.getContractObject_DeadlineTime())) > 0) {
								ahm_directRent += (zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent1()) * (AppUtil.getMonth2(startTime, newEnd)) + Double.parseDouble(df.format((zContractNo.getContractBody_Rent() - tContractNo1.getContractBody_Rent1()) / 30 * maps.get("day")));
							}
						}
					}
				}

				// 管理费
				if (!tEnd2.equals("") && AppUtil.getDay2(startTime, tEnd2) > 0 && AppUtil.getDay2(tStart, newEnd) > 0) {
					// 今年是合同的第几年
					String endDate = newStart;
					if (oldZContractNo != null && (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "转租"))) {
						endDate = oldEnd;
					}
					Integer xmonth2 = AppUtil.getMonth2(endDate, tEnd2);
					String[] split2 = new String[] { endDate, tEnd2 };
					HashMap<String, Integer> maps2 = AppUtil.calLastBillDate2(split2, AppUtil.getMonth2(endDate, tEnd2), 0);
					Integer day2 = maps2.get("day");
					if (day2 > 27) {
						xmonth2++;
					}

					// 管理费天数
					Integer xmonth = AppUtil.getMonth2(tStart, newEnd);
					String[] split = new String[] { tStart, newEnd };
					HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(tStart, newEnd), 0);
					Integer day = maps.get("day");
					if (day > 15) {
						xmonth++;
					}

					Double gMoney = 0.0;
					if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
						// 提取免租期金额：托管管理费/30*免租期天数=免租期金额
						gMoney = tContractNo1.getContractBody_Service();
						serviceMoney += gMoney / 12 * xmonth + gMoney / (12 * 30) * day;
					}

					if (tContractNo2 != null) {
						if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
							// 提取免租期金额：托管管理费/30*免租期天数=免租期金额
							gMoney = tContractNo2.getContractBody_Service();
							serviceMoney += gMoney / 12 * xmonth2 + gMoney / (12 * 30) * day2;
						}
					}
				} else {
					String endDate = newStart;
					if (oldZContractNo != null && (AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "转租"))) {
						endDate = oldEnd;
					}
					Integer xmonth = AppUtil.getMonth2(endDate, newEnd);
					String[] splitm = new String[] { endDate, newEnd };
					HashMap<String, Integer> mapsm = AppUtil.calLastBillDate2(splitm, AppUtil.getMonth2(endDate, newEnd), 0);
					if (mapsm.get("day") > 27) {
						xmonth++;
					}
					Integer day = 0;
					if (oldZContractNo != null) {
						if (AppUtil.getMonth2(oldEnd, endDate) < 0) {
							xmonth = AppUtil.getMonth2(oldEnd, newEnd);
							if (xmonth < 0) {
								xmonth = 0;
							}
							String[] split = new String[] { oldEnd, newEnd };
							HashMap<String, Integer> maps = AppUtil.calLastBillDate2(split, AppUtil.getMonth2(oldEnd, newEnd), 0);
							day = maps.get("day");
						}
					}

					Double gMoney = 0.0;
					if (selectAchievementSetting == null || selectAchievementSetting.getAs_money() == 1) {
						// 提取免租期金额：托管管理费/30*免租期天数=免租期金额
						gMoney = tContractNo1.getContractBody_Service();
						serviceMoney += gMoney / 12 * xmonth + gMoney / (12 * 30) * day;
					}
				}
			}

			contractObject_Code = tContractNo1.getContractObject_Code();
			// 公司管理费
			if(tContractNo1 != null){
				PlatformGsManage platformGsManage = new PlatformGsManage();
				platformGsManage.setCon_code(contractObject_Code);
				platformGsManage.setPgm_gmDate(zContractNo.getContractObject_DeadlineTime());
				List<PlatformGsManage> platformGsManages = achievementCompanyDAO.selectPlatformGsManage(platformGsManage);
				for (PlatformGsManage platformGsManage1 : platformGsManages) {
					ahm_gsmanageMoney -= platformGsManage1.getPgm_money();
				}
			}

			// 房源部门
			PositionRecordVo positionRecordVo = new PositionRecordVo();
			positionRecordVo.setHi_code(zContractNo.getHi_code());
			PositionRecordVo positionRecordVos = achievementCompanyDAO.selectPositionRecord(positionRecordVo);
			hi_code = positionRecordVos.getHi_code();
			ucc_id = positionRecordVos.getUcc_id();
			contractObject_Date = zContractNo.getContractObject_Date();
			contractObject_DeadlineTime = zContractNo.getContractObject_DeadlineTime();

			// 门店基金记录
			CompanyFund companyFund = new CompanyFund();
			companyFund.setUcc_id(ucc_id);
			CompanyFund companyFund1 = achievementCompanyDAO.selectCompanyFundUcc(companyFund);
			companyFund.setCcf_source("服务费基金");
			companyFund.setCcf_money(ahm_serviceMoney/100*80);
			if(companyFund1 != null){
				companyFund.setCcf_balanceMoney(companyFund1.getCcf_balanceMoney()+companyFund.getCcf_money());
			}else{
				companyFund.setCcf_balanceMoney(companyFund.getCcf_money());
			}
			companyFund.setCcf_pay(1);
			achievementCompanyDAO.insertCompanyFund(companyFund);

			// 免租期
			forRentDay = Double.valueOf(zContractNo.getContractObject_RentStr().split("-")[1]);
			// 新版管理费和免租期2017-10-01后执行
			/*if(AppUtil.getMonth2("2017-11-01",sf.format(zContractNo.getContractObject_Date())) >= 0){
				forRentDay = 0.0;
				serviceMoney = 0.0;
				RentFree rentFree = new RentFree();
				rentFree.setCon_code(contractObject_Code);
				rentFree.setPrf_cycleDate(zContractNo.getContractObject_DeadlineTime());
				List<RentFree> rentFrees = achievementCompanyDAO.queryRentFree(rentFree);
				for (RentFree rentFree1 : rentFrees) {
					forRentDay += rentFree1.getPrf_cycleDay();
					serviceMoney += rentFree1.getPrf_cycleMoney();
				}
			}*/

			// 招租期
			freeDay = Double.valueOf(zContractNo.getContractObject_RentStr().split("-")[0]);
			// 招租期金额
			freeMoney = -(tContractNo1.getContractBody_Rent() / 30 * freeDay);
			// 7月以前空置期
			julyOld = Double.valueOf(zContractNo.getContractObject_RentStr().split("-")[2]);
			ahm_julyOldMoney = -(tContractNo1.getContractBody_Rent() / 30 * julyOld);
			if(forRentDay-julyOld < 0){
				forRentDay = 0;
			}
			// 保险费用
			if(tContractNo1.getContractObject_ExtState() == 10 || tContractNo1.getContractObject_ExtState() == 12){
				ahm_insurance -= 74*0.9;
			}
			ahm_insurance -= 15*0.9;
			// 免租期金额
			rentFreeMoney = tContractNo1.getContractBody_Rent() / 30 * forRentDay;
			if(AppUtil.isOkState(_state, "新出房")){
				ahm_directVacant += freeMoney;
				ahm_directOutHouseMoney = -400.00;
			}else if(AppUtil.isOkState(_state, "到期")){
				ahm_directVacant += freeMoney;
				ahm_directOutHouseMoney = -400.00;
			}else if(AppUtil.isOkState(_state, "续约")){
				ahm_directVacant += freeMoney;
				ahm_directOutHouseMoney = -400.00;
			}else if(AppUtil.isOkState(_state, "转租")){
				if(ahm_subletMoney == 300){
					ahm_synopsisOutHouseMoney = -150.00;
				}else{
					ahm_synopsisOutHouseMoney = -400.00;
				}
				ahm_directVacant += freeMoney;
			}else if(AppUtil.isOkState(_state, "退租") || AppUtil.isOkState(_state, "强收") || AppUtil.isOkState(_state, "换房")){
				ahm_synopsisVacant += freeMoney;
				ahm_synopsisOutHouseMoney = -400.00;
			}else{
				ahm_directVacant += freeMoney;
				ahm_directOutHouseMoney = -400.00;
			}
			if(AppUtil.getMonth2(startTime,sf.format(tContractNo1.getContractObject_DeadlineTime())) > 6 && AppUtil.getMonth2(startTime,sf.format(zContractNo.getContractObject_DeadlineTime())) < 6){
				ahm_synopsisOutHouseMoney = -0.00;
			}

			if(sa_type.equals("新出房") || sa_type.equals("到期")){
				// 租赁合作费
				ahm_directCooperateMoney = -zContractNo.getContractBody_WorkMoney();
				if (tContractNo1.getContractObject_Successor() == 0) {
					if (tContractNo1.getContractObject_ExtState() != 12 && tContractNo1.getContractObject_ExtState() != 22) {
						ahm_directCooperateMoney -= tContractNo1.getContractBody_WorkMoney();
					}
				}
			}else{
				// 租赁合作费
				ahm_synosisCooperateMoney = -zContractNo.getContractBody_WorkMoney();
				if (tContractNo1.getContractObject_Successor() == 0) {
					if (tContractNo1.getContractObject_ExtState() != 12 && tContractNo1.getContractObject_ExtState() != 22) {
						ahm_synosisCooperateMoney -= tContractNo1.getContractBody_WorkMoney();
					}
				}
			}

			// 现租客物业结算
			PropertyMoney propertyMoney = new PropertyMoney();
			propertyMoney.setContractObject_code(zContractNo.getContractObject_Code());
			List<PropertyMoney> propertyMonies = achievementCompanyDAO.selectPropertyMoney(propertyMoney);
			Double water = 0.0;
			Double waterMoney = 0.0;
			Double electric = 0.0;
			Double electricMoney = 0.0;
			Double gas = 0.0;
			Double gasMoney = 0.0;
			for (PropertyMoney propertyMoney1 : propertyMonies) {
				switch (propertyMoney1.getSci_itemName()){
					case "水":
						if(propertyMoney1.getSci_desc() != null) {
							if(propertyMoney1.getSci_desc().split("#").length == 2) {
								ahm_waterMoney = propertyMoney1.getSci_totalCosts();
								water = Double.valueOf(propertyMoney1.getSci_desc().split("#")[1].toString());
								waterMoney = propertyMoney1.getSci_unitPrice();
							}
						}
						break;
					case "电":
						if(propertyMoney1.getSci_desc() != null) {
							if(propertyMoney1.getSci_desc().split("#").length == 2) {
								ahm_electricMoney = propertyMoney1.getSci_totalCosts();
								electric = Double.valueOf(propertyMoney1.getSci_desc().split("#")[1].toString());
								electricMoney = propertyMoney1.getSci_unitPrice();
							}
						}
						break;
					case "气":
						if(propertyMoney1.getSci_desc() != null){
							if(propertyMoney1.getSci_desc().split("#").length == 2) {
								ahm_gasMoney = propertyMoney1.getSci_totalCosts();
								if (propertyMoney1.getSci_desc().split("#").length == 2) {
									gas = Double.valueOf(propertyMoney1.getSci_desc().split("#")[1].toString());
								}
								gasMoney = propertyMoney1.getSci_unitPrice();
							}
						}
						break;
					case "物管费":
						ahm_wuguanMoney = propertyMoney1.getSci_totalCosts();
						break;
				}
			}

			Double water1 = 0.0;
			Double electric1 = 0.0;
			Double gas1 = 0.0;
			// 空置期水电气物业费
			if(oldZContractNo != null){
				PropertyMoney propertyMoney1 = new PropertyMoney();
				propertyMoney1.setContractObject_code(zContractNo.getContractObject_Code());
				List<PropertyMoney> propertyMonies1 = achievementCompanyDAO.selectPropertyMoney(propertyMoney1);
				for (PropertyMoney propertyMoney2 : propertyMonies1) {
					switch (propertyMoney2.getSci_itemName()){
						case "水":
							if(propertyMoney2.getSci_desc() != null) {
								if(propertyMoney2.getSci_desc().split("#").length == 2) {
									water1 = Double.valueOf(propertyMoney2.getSci_desc().split("#")[1].toString());
									ahm_waterMoney -= (water - water1) * waterMoney;
								}
							}
							break;
						case "电":
							if(propertyMoney2.getSci_desc() != null) {
								if(propertyMoney2.getSci_desc().split("#").length == 2) {
									electric1 = Double.valueOf(propertyMoney2.getSci_desc().split("#")[1].toString());
									ahm_electricMoney -= (electric - electric1) * waterMoney;
								}
							}
							break;
						case "气":
							if(propertyMoney2.getSci_desc() != null) {
								if(propertyMoney2.getSci_desc().split("#").length == 2){
									gas1 = Double.valueOf(propertyMoney2.getSci_desc().split("#")[1].toString());
									ahm_gasMoney -= (gas - gas1) * waterMoney;
								}
							}
							break;
						default:
							break;
					}
				}
			}else{
				PropertyMoney propertyMoney1 = new PropertyMoney();
				propertyMoney1.setContractObject_code(tContractNo1.getContractObject_Code());
				List<PropertyMoney> propertyMonies1 = achievementCompanyDAO.selectPropertyMoney(propertyMoney1);
				for (PropertyMoney propertyMoney2 : propertyMonies1) {
					switch (propertyMoney2.getSci_itemName()){
						case "水":
							if(propertyMoney2.getSci_desc() != null) {
								if (propertyMoney2.getSci_desc().split("#").length == 2) {
									water1 = Double.valueOf(propertyMoney2.getSci_desc().split("#")[1].toString());
									ahm_waterMoney -= (water - water1) * waterMoney;
								}
							}
							break;
						case "电":
							if(propertyMoney2.getSci_desc() != null) {
								if (propertyMoney2.getSci_desc().split("#").length == 2) {
									electric1 = Double.valueOf(propertyMoney2.getSci_desc().split("#")[1].toString());
									ahm_electricMoney -= (electric - electric1) * waterMoney;
								}
							}
							break;
						case "气":
							if(propertyMoney2.getSci_desc() != null) {
								if (propertyMoney2.getSci_desc().split("#").length == 2) {
									gas1 = Double.valueOf(propertyMoney2.getSci_desc().split("#")[1].toString());
									ahm_gasMoney -= (gas - gas1) * waterMoney;
								}
							}
							break;
						default:
							break;
					}
				}
			}

			int month = AppUtil.getMonth2(sf.format(zContractNo.getContractObject_Date()), sf.format(zContractNo.getContractObject_DeadlineTime()));
			Boolean bools = false;
			/*switch (zContractNo.getContractBody_PayStyle()){
				case "季付":
					int typeMonth = (int) Math.ceil(Double.valueOf(month) / 3);
					for (int i = 0; i < typeMonth; i++) {
						Calendar calendar = Calendar.getInstance();
						calendar.setTime(contractObject_Date);
						calendar.add(Calendar.MONTH, i*3);
						if(i == 0){
							addAchievementHouseMoney(ahm_outHouseMoney, ahm_julyOldMoney, ahm_insurance, ahm_operateMoney, ahm_directCooperateMoney,
									ahm_synosisCooperateMoney, ahm_directRent/typeMonth, ahm_directVacant/typeMonth, ahm_gasMoney, ahm_penalty, ahm_repairMoney, ahm_subletMoney,
									ahm_wuguanMoney, ahm_waterMoney, ahm_electricMoney,hi_code,ucc_id,contractObject_Date,contractObject_DeadlineTime,contractObject_Code,
									ahm_synopsisRent, ahm_synopsisVacant, ahm_serviceMoney, serviceMoney, rentFreeMoney, freeMoney, calendar.getTime());
						}else{
							addAchievementHouseMoney(ahm_outHouseMoney, ahm_julyOldMoney, ahm_insurance, ahm_operateMoney, ahm_directCooperateMoney,
									ahm_synosisCooperateMoney, ahm_directRent/typeMonth, ahm_directVacant/typeMonth, ahm_gasMoney, ahm_penalty, ahm_repairMoney, ahm_subletMoney,
									ahm_wuguanMoney, ahm_waterMoney, ahm_electricMoney,hi_code,ucc_id,contractObject_Date,contractObject_DeadlineTime,contractObject_Code,
									ahm_synopsisRent, ahm_synopsisVacant, ahm_serviceMoney, serviceMoney, rentFreeMoney, freeMoney,calendar.getTime());
						}
					}
					break;
				case "半年付":
					int typeBan = (int) Math.ceil(Double.valueOf(month) / 6);
					for (int i = 0; i < typeBan; i++) {
						Calendar calendar = Calendar.getInstance();
						calendar.setTime(contractObject_Date);
						calendar.add(Calendar.MONTH, i*3);
						if(i == 0){
							addAchievementHouseMoney(ahm_outHouseMoney, ahm_julyOldMoney, ahm_insurance, ahm_operateMoney, ahm_directCooperateMoney,
									ahm_synosisCooperateMoney, ahm_directRent/typeBan, ahm_directVacant/typeBan, ahm_gasMoney, ahm_penalty, ahm_repairMoney, ahm_subletMoney,
									ahm_wuguanMoney, ahm_waterMoney, ahm_electricMoney,hi_code,ucc_id,contractObject_Date,contractObject_DeadlineTime,contractObject_Code,
									ahm_synopsisRent, ahm_synopsisVacant, ahm_serviceMoney, serviceMoney, rentFreeMoney, freeMoney, calendar.getTime());
						}else{
							addAchievementHouseMoney(ahm_outHouseMoney, ahm_julyOldMoney, ahm_insurance, ahm_operateMoney, ahm_directCooperateMoney,
									ahm_synosisCooperateMoney, ahm_directRent/typeBan, ahm_directVacant/typeBan, ahm_gasMoney, ahm_penalty, ahm_repairMoney, ahm_subletMoney,
									ahm_wuguanMoney, ahm_waterMoney, ahm_electricMoney,hi_code,ucc_id,contractObject_Date,contractObject_DeadlineTime,contractObject_Code,
									ahm_synopsisRent, ahm_synopsisVacant, ahm_serviceMoney, serviceMoney, rentFreeMoney, freeMoney,calendar.getTime());
						}
					}
					break;
					default:
						addAchievementHouseMoney(ahm_outHouseMoney, ahm_julyOldMoney, ahm_insurance, ahm_operateMoney, ahm_directCooperateMoney,
								ahm_synosisCooperateMoney, ahm_directRent, ahm_directVacant, ahm_gasMoney, ahm_penalty, ahm_repairMoney, ahm_subletMoney,
								ahm_wuguanMoney, ahm_waterMoney, ahm_electricMoney,hi_code,ucc_id,contractObject_Date,contractObject_DeadlineTime,contractObject_Code,
								ahm_synopsisRent, ahm_synopsisVacant, ahm_serviceMoney, serviceMoney, rentFreeMoney, freeMoney,contractObject_Date);
						break;
			}*/
			addAchievementHouseMoney(ahm_directOutHouseMoney, ahm_synopsisOutHouseMoney, ahm_julyOldMoney, ahm_insurance, ahm_operateMoney, ahm_directCooperateMoney,
					ahm_synosisCooperateMoney, ahm_directRent, ahm_directVacant, ahm_gasMoney, ahm_penalty, ahm_repairMoney, ahm_subletMoney,
					ahm_wuguanMoney, ahm_waterMoney, ahm_electricMoney,hi_code,ucc_id,contractObject_Date,contractObject_DeadlineTime,contractObject_Code,
					ahm_synopsisRent, ahm_synopsisVacant, ahm_serviceMoney, serviceMoney, rentFreeMoney, freeMoney,contractObject_Date,ahm_gsmanageMoney);

			if(bools){
				msg.setCode(200);
			}else{
				msg.setMsg(401,"提交有误");
			}

		} catch (Exception e){
			e.printStackTrace();
			msg.setMsg(404,"提交异常");
		}

		return msg.toMap();
	}

	/**
	 *  插入房屋利润
	 * @param
	 * @author 陈智颖
	 * @create 8/22/17 4:40 PM
	 * @return
	 **/
	public boolean addAchievementHouseMoney(Double ahm_directOutHouseMoney, Double ahm_synopsisOutHouseMoney, Double ahm_julyOldMoney, Double ahm_insurance, Double ahm_operateMoney, Double ahm_directCooperateMoney,
	Double ahm_synosisCooperateMoney, Double ahm_directRent, Double ahm_directVacant, Double ahm_gasMoney, Double ahm_penalty, Double ahm_repairMoney, Double ahm_subletMoney,
	Double ahm_wuguanMoney, Double ahm_waterMoney, Double ahm_electricMoney, String hi_code, Integer ucc_id, Date contractObject_Date, Date contractObject_DeadlineTime, String contractObject_Code,
	Double ahm_synopsisRent, Double ahm_synopsisVacant, Double ahm_serviceMoney, Double serviceMoney, Double rentFreeMoney, Double freeMoney, Date extractDate, Double ahm_gsmanageMoney){
		// 保留小数点后两位
		DecimalFormat df = new DecimalFormat("#.00");
		AchievementHouseMoney achievementHouseMoney = new AchievementHouseMoney();
		achievementHouseMoney.setAhm_directOutHouseMoney(ahm_directOutHouseMoney);
		achievementHouseMoney.setAhm_synopsisOutHouseMoney(ahm_synopsisOutHouseMoney);
		achievementHouseMoney.setAhm_julyOldMoney(Double.valueOf(df.format(ahm_julyOldMoney)));
		achievementHouseMoney.setAhm_insurance(Double.valueOf(df.format(ahm_insurance)));
		achievementHouseMoney.setAhm_operateMoney(ahm_operateMoney);
		achievementHouseMoney.setAhm_directCooperateMoney(Double.valueOf(df.format(ahm_directCooperateMoney)));
		achievementHouseMoney.setAhm_synosisCooperateMoney(Double.valueOf(df.format(ahm_synosisCooperateMoney)));
		achievementHouseMoney.setAhm_directRent(Double.valueOf(df.format(ahm_directRent)));
		achievementHouseMoney.setAhm_directVacant(Double.valueOf(df.format(new BigDecimal(ahm_directVacant))));
		achievementHouseMoney.setAhm_gasMoney(-Double.valueOf(df.format(ahm_gasMoney)));
		achievementHouseMoney.setAhm_penalty(Double.valueOf(df.format(ahm_penalty)));
		achievementHouseMoney.setAhm_repairMoney(Double.valueOf(df.format(ahm_repairMoney)));
		achievementHouseMoney.setAhm_subletMoney(Double.valueOf(df.format(ahm_subletMoney)));
		achievementHouseMoney.setAhm_wuguanMoney(-Double.valueOf(df.format(ahm_wuguanMoney)));
		achievementHouseMoney.setAhm_waterMoney(-Double.valueOf(df.format(ahm_waterMoney)));
		achievementHouseMoney.setAhm_electricMoney(-Double.valueOf(df.format(ahm_electricMoney)));
		achievementHouseMoney.setHi_code(hi_code);
		achievementHouseMoney.setUcc_id(ucc_id);
		achievementHouseMoney.setAhm_gsmanageMoney(ahm_gsmanageMoney);
		achievementHouseMoney.setContractObject_Date(contractObject_Date);
		achievementHouseMoney.setContractObject_DeadlineTime(contractObject_DeadlineTime);
		achievementHouseMoney.setContractObject_Code(contractObject_Code);
		achievementHouseMoney.setAhm_synopsisRent(Double.valueOf(df.format(ahm_synopsisRent)));
		achievementHouseMoney.setAhm_synopsisVacant(Double.valueOf(df.format(ahm_synopsisVacant)));
		achievementHouseMoney.setAhm_serviceMoney(Double.valueOf(df.format(ahm_serviceMoney)));
		achievementHouseMoney.setAhm_manageMoney(Double.valueOf(df.format(serviceMoney)));
		achievementHouseMoney.setAhm_forRentMoney(Double.valueOf(df.format(rentFreeMoney)));
		achievementHouseMoney.setAhm_freeMoney(Double.valueOf(df.format(freeMoney)));
		achievementHouseMoney.setExtractDate(extractDate);
		achievementHouseMoney.setExtractBool(0);
		Integer bools = achievementCompanyDAO.addHouseMoney(achievementHouseMoney);
		if(bools > 0){
			/*ContractObjectVo contractObjectVo1 = new ContractObjectVo();
			contractObjectVo1.setContractObject_Code(contractObject_Code);
			contractObjectVo1.setContractObject_gsmanage(0);
			achievementCompanyDAO.updateContractHouseAchievementBool(contractObjectVo1);*/
			return true;
		}else{
			return false;
		}
	}

	/**
	 * 修改房屋利润
	 *
	 * @param
	 * @author 陈智颖
	 * @create 8/11/17 5:05 PM
	 * @return
	 **/
	public List<Double> updateAchievementService(Integer ucc_id ,String hi_code, String startDate, String startEnd){

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		// 清洁费
		Double ahm_clearServiceMoney = 0.0;
		// 维修费用
		Double ahm_repairMoney = 0.0;


		ServiceMoney serviceMoney1 = new ServiceMoney();
		serviceMoney1.setUcc_id(ucc_id);
		serviceMoney1.setHi_code(hi_code);
		serviceMoney1.setStartDate(startDate);
		serviceMoney1.setEndDate(startEnd);
		List<ServiceMoney> serviceMonies = achievementCompanyDAO.selectDeclaration(serviceMoney1);
		if(!serviceMonies.isEmpty()){
			for (ServiceMoney serviceMoney2 : serviceMonies){
				if(serviceMoney2.getSsm_source() != null){
					if(serviceMoney2.getSsm_source().contains("清洁")){
						if(serviceMoney2.getSsm_money() != null){
							ahm_clearServiceMoney -= serviceMoney2.getSsm_money();
						}
					}else{
						if(serviceMoney2.getSsm_money() != null){
							ahm_repairMoney -= serviceMoney2.getSsm_money();
						}
					}
				}
			}
		}

		List<Double> clearMoney = new ArrayList<>();
		clearMoney.add(ahm_clearServiceMoney);
		clearMoney.add(ahm_repairMoney);

		return clearMoney;
	}

	/**
	 * 查询房屋利润按合同来展现
	 *
	 * @param
	 * @author 陈智颖
	 * @create 8/12/17 2:54 PM
	 * @return
	 **/
	public List<AchievementHouseMoneyVo> selectAchievementHouseMoneyNo(AchievementHouseMoneyVo achievementHouseMoneyVo){
		return achievementCompanyDAO.selectAchievementHouseMoneyNo(achievementHouseMoneyVo);
	}

	/**
	 * 查询部门利润
	 *
	 * @param achievementHouseMoneyVo
	 * @author 陈智颖
	 * @create 8/12/17 2:54 PM
	 * @return
	 **/
	public List<AchievementHouseMoneyVo> selectAchievementHouseMoneyUcc(AchievementHouseMoneyVo achievementHouseMoneyVo){
		return achievementCompanyDAO.selectAchievementHouseMoneyUcc(achievementHouseMoneyVo);
	}

	/**
	 * 查询招租房屋租赁合同
	 *
	 * @author 陈智颖
	 * @create 8/12/17 2:54 PM
	 * @return
	 **/
	public Boolean queryHouseInfomationKeepContract(Date extractDate) throws Exception {
		ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		List<ViewBusinessContractVo> viewBusinessContractVos = achievementCompanyDAO.queryHouseInfomationKeepContract(viewBusinessContractVo);
		for (ViewBusinessContractVo viewBusinessContractVo1 : viewBusinessContractVos){
			ViewBusinessContractVo viewBusinessContractVo2 = new ViewBusinessContractVo();
			viewBusinessContractVo2.setHi_code(viewBusinessContractVo1.getHi_code());
			viewBusinessContractVo2.setContractObject_Type("租赁合同");
			ViewBusinessContractVo zContractNo = null;
			List<ViewBusinessContractVo> viewBusinessContractVos1 = achievementCompanyDAO.selectContractNo(viewBusinessContractVo2);
			if(!viewBusinessContractVos1.isEmpty()){
				zContractNo = viewBusinessContractVos1.get(0);
			}

			// 根据房屋编码查询最新托管合同
			ViewBusinessContractVo viewBusinessContractVo3 = new ViewBusinessContractVo();
			viewBusinessContractVo3.setHi_code(viewBusinessContractVo1.getHi_code());
			viewBusinessContractVo3.setContractObject_Type("托管合同");
			List<ViewBusinessContractVo> selectContractNo = achievementCompanyDAO.selectContractNo(viewBusinessContractVo3);

			if(selectContractNo.isEmpty()){
				continue;
			}
			ViewBusinessContractVo tContract = selectContractNo.get(0);

			String newStart = "";
			if(zContractNo != null){
				newStart = sdf.format(zContractNo.getContractObject_DeadlineTime());
			}else{
				newStart = sdf.format(tContract.getContractObject_Date());
			}

			// 招租期
			double forRent = 0.0;
			// 7月份以前的招租期
			double julyOldMoney = 0.0;

			if(viewBusinessContractVo1.getContractObject_ExtState() != null && (viewBusinessContractVo1.getContractObject_ExtState() == 26 || viewBusinessContractVo1.getContractObject_ExtState() == 27 || viewBusinessContractVo1.getContractObject_ExtState() == 29)) {
				ViewContractStatement viewContractStatement = new ViewContractStatement();
				viewContractStatement.setCco_state("取消");
				viewContractStatement.setContractObject_Code(viewBusinessContractVo1.getContractObject_Code());
				ViewContractStatement contractNoShutTime = achievementCompanyDAO.selectContractNoShutTime(viewContractStatement).get(0);
				if (AppUtil.getDay2(sdf.format(contractNoShutTime.getCco_realDate()), sdf.format("2017-07-01")) > 0) {
					forRent = (double) (AppUtil.getDay2("2017-07-01", newStart));
					julyOldMoney = (double) (AppUtil.getDay2(sdf.format(contractNoShutTime.getCco_realDate()), "2017-07-01"));
				} else {
					forRent = (double) (AppUtil.getDay2(sdf.format(contractNoShutTime.getCco_realDate()), newStart));
				}
			}else{
				if(AppUtil.getDay2(newStart, "2017-07-01") > 0){
					forRent = (double) (AppUtil.getDay2("2017-07-01", newStart));
					julyOldMoney = (double) (AppUtil.getDay2(newStart, "2017-07-01"));
				}else{
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(extractDate);
					calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DATE));
					forRent = (double) (AppUtil.getDay2(newStart, sdf.format(calendar.getTime())));
				}
			}

			if(forRent < 0){
				forRent = 0;
			}
			if(julyOldMoney < 0){
				julyOldMoney = 0;
			}
			if(forRent < 1 && julyOldMoney < 1){
				continue;
			}

			// 招租期金额
			double freeMoney = -(forRent * (tContract.getContractBody_Rent()/30));
			// 7月份以前的招租期金额
			double julyOldMoneyMoney = -(julyOldMoney * (tContract.getContractBody_Rent()/30));

			addAchievementHouseMoney(0.0,0.0, julyOldMoneyMoney, 0.0, 0.0, 0.0,
					0.0, 0.0, freeMoney, 0.0, 0.0, 0.0, 0.0,
					0.0, 0.0, 0.0,viewBusinessContractVo1.getHi_code(),viewBusinessContractVo1.getUcc_id(),viewBusinessContractVo1.getContractObject_Date(),viewBusinessContractVo1.getContractObject_DeadlineTime(),viewBusinessContractVo1.getContractObject_Code(),
					0.0, 0.0, 0.0, 0.0, 0.0, freeMoney,extractDate,0.0);
		}

		return false;
	}

	/**
	 * 根据合同编码查询合同
	 *
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<ViewBusinessContractVo> selectContractNo(ViewBusinessContractVo viewBusinessContractVo){
		return achievementCompanyDAO.selectContractNo(viewBusinessContractVo);
	}

	// 根据当前月/日 判断托管合同是否计算房源利润
	public Map<String, Object> addContractHouseAchievementBool(){
		Map<String,Object> map = new HashMap<>();

		Date date = new Date();
		ContractObjectVo contractObjectVo = new ContractObjectVo();
		contractObjectVo.setContractObject_Date(date);
		Boolean bool = false;
		List<ContractObjectVo> contractObjectVos = achievementCompanyDAO.selectContractObjectMD(contractObjectVo);
		for (ContractObjectVo contractObjectVo1 : contractObjectVos) {
			contractObjectVo1.setContractObject_gsmanage(0);
			Integer bools = achievementCompanyDAO.updateContractHouseAchievementBool(contractObjectVo1);
			if(bools > 0){
				bool = true;
			}else{
				bool = false;
				break;
			}
		}
		if(bool){
			map.put("message","success");
		}else{
			map.put("message","error");
		}

		return map;
	}

	/**
	 * 公司管理费生成账单
	 *
	 * @param
	 * @author 陈智颖
	 * @create 11/10/17 16:06
	 * @return
	 **/
	public Boolean gsManageBill(String con_code){

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		ViewBusinessContractVo viewBusinessContractVo = new ViewBusinessContractVo();
		viewBusinessContractVo.setContractObject_Code(con_code);
		ViewBusinessContractVo tContract = achievementCompanyDAO.selectContractNo(viewBusinessContractVo).get(0);

		int month = 0;
		int year = 0;
		try {
			month = AppUtil.getMonth2(sf.format(tContract.getContractObject_Date()),sf.format(tContract.getContractObject_DeadlineTime()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		year = (int) Math.ceil(Double.valueOf(month) / 12);
		for (int i = 0; i < year; i++) {
			// 公司管理费账单
			PlatformGsManage platformGsManage = new PlatformGsManage();
			platformGsManage.setHi_code(tContract.getHi_code());
			platformGsManage.setCon_code(con_code);
			Calendar calendar = new GregorianCalendar();
			calendar.setTime(tContract.getContractObject_Date());
			calendar.add(calendar.YEAR, i);
			Date date = calendar.getTime();

			// 房源部门
			PositionRecordVo positionRecordVo = new PositionRecordVo();
			positionRecordVo.setHi_code(tContract.getHi_code());
			PositionRecordVo positionRecordVos = achievementCompanyDAO.selectPositionRecord(positionRecordVo);
			Integer ucc_id = positionRecordVos.getUcc_id();
			Company company = new Company();
			company.setUcc_id(ucc_id);
			Company company1 = userCenterEmployeeDao.queryCompanyList(company).get(0);

			int uccMonth = 0;
			int newYear = 0;
			int tYear = 0;
			try {
				uccMonth = AppUtil.getMonth2(sf.format(company1.getUcc_time()),sf.format(date));
				newYear = Integer.valueOf(sf.format(new Date()).split("-")[0]);
				tYear = Integer.valueOf(sf.format(date).split("-")[0]);
			} catch (Exception e) {
				e.printStackTrace();
			}
			if(uccMonth >= 12 && uccMonth < 24){
				platformGsManage.setPgm_money(300.00);
			}else if(uccMonth >= 24){
				platformGsManage.setPgm_money(600.00);
			}else{
				platformGsManage.setPgm_money(0.00);
			}
			if(tYear < newYear){
				platformGsManage.setPgm_bool(1);
			}else{
				try {
					if(AppUtil.getDay2(sf.format(date),"2017-07-01") > 0){
						platformGsManage.setPgm_bool(1);
                    }else{
						platformGsManage.setPgm_bool(0);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			platformGsManage.setPgm_gmDate(date);
			achievementCompanyDAO.insertPlatformGsManage(platformGsManage);
		}

		return true;
	}
}
