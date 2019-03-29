package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.*;
import com.gjp.util.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


/**
 * 预定账单
 * 
 * @author zoe
 *
 */
@Controller
@Component
public class ReserveBillController {

	// 预定账单
	@Resource
	private ReserveBillService reserveBillService;
	// 合作伙伴
	@Resource
	private BillPartnersService billPartnersService;
	// 房源库service
	@Resource
	private HouseLibraryService houseLibraryService;
	// 房屋品牌
	@Resource
	private HouseHouseBrandService houseHouseBrandService;
	// 物业信息
	@Resource
	private PropertyInfoService userCenterPropertyInfoService;
	// 房屋基本
	@Resource
	private HousingAllocationService housingAllocationService;
	// 房屋扩展
	@Resource
	private HouseExtendedService houseExtendedService;
	private @Resource ContractService userCenterContractObjectService;// 合同对象
	// 客户短信记录
	private @Resource
    SmsService smsService;
	// 客户查询
	private @Resource CustomerService customerService;

	/**
	 * 跳转预定账单界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/reserveBill")
	public String billPartners(HttpServletRequest request, HttpServletResponse response) {
		return "/order/reserveBill";
	}
	
	/**
	 * 跳转修改预定账单界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updataReserveBill")
	public String updataReserveBill(HttpServletRequest request, HttpServletResponse response,String id) {
		List<BillPartners> billPartnersList = billPartnersService
				.selectTo_people();
		//根据id查询预定账单
		ReserveBill reserveBill = reserveBillService.selectReserveBillById(Integer.parseInt(id));
		request.setAttribute("billPartnersList", billPartnersList);
		request.setAttribute("reserveBill",reserveBill);
		return "/order/updataReserveBill";
	}
	
	
	/**
	 * 跳转添加预定账单界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/jumpAddReserveBill")
	public String jumpAddReserveBill(HttpServletRequest request, HttpServletResponse response) {
		List<BillPartners> billPartnersList = billPartnersService
				.selectTo_people();
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		request.setAttribute("bankTypeList", userCenterContractObjectService.selectContractTypeByParentId(EnumTypeStatus.TYPE_BANK.getId()));
		request.setAttribute("billPartnersList", billPartnersList);
		return "/order/addReserveBill";
	}
	
	
	/**
	 * ajax查询预定账单List
	 * 
	 * @param response
	 * @return
	 * @throws ParseException 
	 */
	@RequestMapping("/selectReserveBill")
	@ResponseBody
	public Map<String, Object> selectReserveBill(HttpServletResponse response, TableList tableList1) throws ParseException {
		
		
		//初始化获取对象
		TableList tableList = tableList1.initData(tableList1);
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		PageModel<ReserveBill> pageModel1 = new PageModel<ReserveBill>();
		
		if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
			pageModel1.setDateStart(sf.parse(tableList.getDateStart()));
		}
		if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
			pageModel1.setDateEnd(sf.parse(tableList.getDateEnd()));
		}
		pageModel1.setSqlWhere(tableList.getSqlWhere());
		
		pageModel1.setDateTitle(tableList.getDateType());

		if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
			pageModel1.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
		} else {
			pageModel1.setSqlOrderBy("");
		}
		// 装载数据类
		DataList<ReserveBill> datalist = new DataList<ReserveBill>();
		int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
		pageModel1.setPageNo((tableList.getPageNo() - 1) * pageSize);
		// 分页设置查询条数
		pageModel1.setPageSize(pageSize);
		// 查询分页实体
		PageModel<ReserveBill> pageModel = reserveBillService.selectReserveBill(pageModel1);
		//处理特殊数据
		List<ReserveBill> list = new ArrayList<ReserveBill>();
		for (ReserveBill reserveBill : pageModel.getList()) {
			reserveBill.setRb_phone("/"+reserveBill.getRb_phone());
			list.add(reserveBill);
		}
		// 装载数据
		Map<String, Object> map = datalist.dataList(list, tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());

		return map;
	}
	
	/**
	 * ajax线下添加预定账单前查询房屋
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/addReserveBillSelectHouse")
	@ResponseBody
	public Map<String, Object> addReserveBillSelectHouse(
			HttpServletRequest request, HttpServletResponse response, String param) {
		Map<String, Object> map = new HashMap<>();
		List<ReserveBillHouse> reserveBillHouse = reserveBillService.reserveBillSelectHouse(param);
		for (ReserveBillHouse reserveBillHouse2 : reserveBillHouse) {
			if(reserveBillHouse2.getHi_money() != null){
				Double money = reserveBillHouse2.getHi_money();
				Double moneyA = (money/3)/100;
				
				String moneystr = moneyA.toString().substring(moneyA.toString().indexOf("."),moneyA.toString().length());
				if(0 < Double.valueOf(moneystr) && Double.valueOf(moneystr) <= 0.5){
					money = (double)((int)(money/300)*100+50);
				}else if(moneystr.equals(".0")){
					money = money/3;
				}else{
					money = (double)Math.round(((double)(int)(double)money/3)/100)*100;
				}
				reserveBillHouse2.setDeposit(money);
			}
		}
		map.put("payRentList", reserveBillHouse);
		return map;
	}
	
	/**
	 * ajax取消预定账单
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/abandonReserveBill")
	@ResponseBody
	public Map<String, Object> abandonReserveBill(
			HttpServletRequest request, HttpServletResponse response, String rb_id) {
		Map<String, Object> map = new HashMap<>();
		//根据id查询预定账单
		ReserveBill reserveBill = reserveBillService.selectReserveBillById(Integer.parseInt(rb_id));
		String rb_state = reserveBill.getRb_state();
		reserveBill.setRb_state("取消");
		int result = 0;
		if("已付款".equals(rb_state) && reserveBill.getHi_version() == null){
			//修改线上房屋为已租
			//修改库存房屋为已租
		}
		if(result == 1){
			result = reserveBillService.abandonReserveBill(reserveBill);
		}
		return map;
	}
	
	/**
	 * ajax确认预定账单收款
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/receivables")
	@ResponseBody
	public Map<String, Object> receivables(
			HttpServletRequest request, HttpServletResponse response, String number, String state, String houseCode) {
		Map<String, Object> map = new HashMap<>();
		
		int result = 0;
		if("待付款".equals(state)){
			HouseInfoKeep houseInfoKeep = houseLibraryService.selectHouseInfoByCode(houseCode);
			HouseHouseInformation houseHouseInformation = housingAllocationService.selectHouseByName(houseCode);
			HouseHouseExtended houseHouseExtended = new HouseHouseExtended();
			houseHouseExtended.setHe_id(houseHouseInformation.getHe_id());
			houseHouseExtended.setHe_state("rental");
			if("".equals(houseInfoKeep.getHi_version()) || houseInfoKeep.getHi_version() == null){
				//修改线上房屋为已租
				result = houseExtendedService.updateSta(houseHouseExtended);
				houseHouseExtended.setHe_id(houseInfoKeep.getHe_id());
				//修改库存房屋为已租
				result = houseExtendedService.updateSta(houseHouseExtended);
			}else{
				houseHouseExtended.setHe_id(houseInfoKeep.getHe_id());
				//修改库存房屋为已租
				result = houseExtendedService.updateSta(houseHouseExtended);
			}
		}
		if(result == 1){
			ReserveBill reserveBill = new ReserveBill();
			reserveBill.setRb_state("已付款");
			reserveBill.setRb_number(number);
			reserveBill.setRb_reserveDate(3);
			//根据订单号修改预定账单状态
			result = reserveBillService.receivables(reserveBill);
			//根据订单号查询预定账单
			ReserveBill reserveBills = reserveBillService.selectReserveBillByCode(reserveBill);
			String msg ="【管家婆】恭喜你("+reserveBills.getRb_name()+")预定"+reserveBills.getPropertyInfo_address()+"的"+reserveBill.getHb_name()+"成功！订单号为："+number;
			boolean boo = SendMsg.sendYuDing(reserveBills.getRb_phone(),msg);
			
			// 记录客户短信 shenhx 20170709
			UserCenterInformation userCenterInformation = new UserCenterInformation();
			userCenterInformation.setHi_code(houseCode);
			userCenterInformation.setMsg_content(msg);
			userCenterInformation.setSend_result(boo ? 1 : 0);
			userCenterInformation.setEm_id(1);// 系统
			userCenterInformation.setReceive_type(1);
			userCenterInformation.setReceive_cc_code(customerService.queryCustomerByPhone(reserveBills.getRb_phone()).getCc_code());
			userCenterInformation.setSend_time(new Date());
			smsService.addUserCenterInformation(userCenterInformation);
		}
		return map;
	}
	
	
	/**
	 * ajax修改预定账单
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updateReserveBill")
	@ResponseBody
	public Map<String, Object> updateReserveBill(ReserveBill reserveBill,
			Model model,HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> map = new HashMap<>();
		//根据id查询预定账单
		ReserveBill reserveBills = reserveBillService.selectReserveBillById(reserveBill.getRb_id());
		reserveBills.setHb_name(reserveBill.getHb_name());
		reserveBills.setRb_phone(reserveBill.getRb_phone());
		reserveBills.setRb_personNum(reserveBill.getRb_personNum());
		reserveBills.setRb_remarks(reserveBill.getRb_remarks());
		reserveBills.setRb_reserveDate(reserveBill.getRb_reserveDate());
		reserveBills.setRb_cycle(reserveBill.getRb_cycle());
		reserveBills.setRb_state(reserveBill.getRb_state());
		reserveBills.setRb_type(reserveBill.getRb_type());
		reserveBills.setRb_money(reserveBill.getRb_money());
		reserveBillService.updateReserveBill(reserveBills);
		return map;
	}
	
	
	/**
	 * ajax线下添加预定账单
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/addReserveBill")
	public String addReserveBill(ReserveBill reserveBill,
			Model model,HttpServletRequest request, HttpServletResponse response) {
		
		
		//判断是否重复提交
		if(!UUIDToken.isRepeatSubmit(request)){
			//Map<String, Object> json = new HashMap<>();
			HouseInfoKeep houseInfoKeep = houseLibraryService.selectHouseInfoByCode(reserveBill.getRb_houseNum());
			//根据编号查询房屋品牌
			HouseHouseBrand houseHouseBrand = houseHouseBrandService
					.selectHouseHouseBrandById(houseInfoKeep.getHb_id());
			PropertyInfo userCenterPropertyInfo = new PropertyInfo();
			userCenterPropertyInfo.setPropertyInfo_Id(houseInfoKeep.getPropertyInfo_Id());
			userCenterPropertyInfo = userCenterPropertyInfoService.queryPropertyInfoID(userCenterPropertyInfo);
			reserveBill.setHb_name(houseHouseBrand.getHb_name());
			if("公寓".equals(houseHouseBrand.getHb_name())){
				reserveBill.setHi_version(houseInfoKeep.getHi_version());
			}
			if(!"已付款".equals(reserveBill.getRb_state())){
				reserveBill.setRb_reserveDate(0);
			}
			reserveBill.setPropertyInfo_address(userCenterPropertyInfo.getPropertyInfo_address());
			reserveBill.setRb_date(new Date());
			reserveBill.setRb_number(getstatementNum());
			int result = reserveBillService.addReserveBill(reserveBill);
			if(result == 1){
				if("已付款".equals(reserveBill.getRb_state())){
					if(!"公寓".equals(houseHouseBrand.getHb_name())){
						HouseHouseInformation houseHouseInformation = housingAllocationService.selectHouseByName(reserveBill.getRb_houseNum());
						HouseHouseExtended houseHouseExtended = new HouseHouseExtended();
						houseHouseExtended.setHe_id(houseHouseInformation.getHe_id());
						houseHouseExtended.setHe_state("rental");
						//修改线上房屋为已租
						result = houseExtendedService.updateSta(houseHouseExtended);
						houseHouseExtended.setHe_id(houseInfoKeep.getHe_id());
						//修改库存房屋为已租
						result = houseExtendedService.updateSta(houseHouseExtended);
					}else{
						HouseHouseExtended houseHouseExtended = new HouseHouseExtended();
						houseHouseExtended.setHe_id(houseInfoKeep.getHe_id());
						houseHouseExtended.setHe_state("rental");
						//修改库存房屋为已租
						result = houseExtendedService.updateSta(houseHouseExtended);
					}
				}
				String msg ="【管家婆】恭喜你("+reserveBill.getRb_name()+")预定"+reserveBill.getPropertyInfo_address()+"的"+reserveBill.getHb_name()+"成功！订单号为："+reserveBill.getRb_number();
				boolean booSend = SendMsg.sendYuDing(reserveBill.getRb_phone(),msg);
				
				// 记录客户短信 shenhx 20170709
				UserCenterInformation userCenterInformation = new UserCenterInformation();
				userCenterInformation.setHi_code(houseInfoKeep.getHi_code());
				userCenterInformation.setMsg_content(msg);
				userCenterInformation.setSend_result(booSend ? 1 : 0);
				userCenterInformation.setEm_id(1);// 系统
				userCenterInformation.setReceive_type(1);
				userCenterInformation.setReceive_cc_code(customerService.queryCustomerByPhone(reserveBill.getRb_phone()).getCc_code());
				userCenterInformation.setSend_time(new Date());
				smsService.addUserCenterInformation(userCenterInformation);
			}
			if (result != 0) {
				request.setAttribute("success", "$.jBox.tip('添加预定订单成功');");
			} else {
				request.setAttribute("error", "$.jBox.tip('添加预定订单失败');");
			}
        }else{
        	return "/order/reserveBill";
        }
		
		request.getSession().removeAttribute("token");//移除session中的token
				
		//json.put("result", result);
		return "/order/reserveBill";
	}
	
	/**
	 * 生成流水号
	 * 流水号210开头+时间戳+4位随机数
	 * @return
	 */
	private String getstatementNum(){
		StringBuffer bs_statementNum = new StringBuffer();
		bs_statementNum.append("200");
		String date = new Date().getTime()+"";
		bs_statementNum.append(date);
		bs_statementNum.append(Randoms.randomss());
		return bs_statementNum.toString();
	}
	
	/**
	 * 每隔一天修改预留时间
	 */
	@Scheduled(cron = "0 0 0/24 * * ?")
	public void updateOrderTimer(){
		ReserveBill reserveBill = new ReserveBill();
		reserveBill.setRb_state("已付款");
		//查询所有已付款的预定订单
		List<ReserveBill> reserveBillList = reserveBillService.selectReserveBillList(reserveBill);
		for (ReserveBill reserveBill2 : reserveBillList) {
			if(reserveBill2.getRb_reserveDate() != 0){
				Integer rb_reserveDate = reserveBill2.getRb_reserveDate() - 1;
				ReserveBill reserveBills = new ReserveBill();
				reserveBill.setRb_state("已付款");
				reserveBills.setRb_number(reserveBill2.getRb_number());
				reserveBill.setRb_reserveDate(rb_reserveDate);
				//根据订单号修改预定账单状态
				reserveBillService.receivables(reserveBill);
			}
		}
		
	}
}
