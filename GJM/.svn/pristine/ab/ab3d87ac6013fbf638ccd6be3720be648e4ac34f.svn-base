package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.ComplaintsRecordService;
import com.gjp.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户投诉建议库
 * @author tanglei
 *
 */
@Controller
@RequestMapping("/userRecord")
public class UserComplaintsRecordController {
	/**
	 * 获取当前时间
	 * @author tanglei
	 */
	public static Date getCurrentDate(){   
		return new Date(System.currentTimeMillis());
	}
	@Resource
	private ComplaintsRecordService complaintsRecordService;
	
	/**
	 * 跳转投诉建议列表
	 * @author tanglei
	 */
	@RequestMapping("/complainteRecord")
	public String complainteRecord () {
		return "UserComplaintsRecord/userComplaintsRecordList";
	}
	
	/**
	 *投诉建议列表 
	 * @author tanglei
	 * @throws ParseException 
	 */
	@RequestMapping("/complainteRecordList")
	@ResponseBody
	public Map<String,Object> complainteRecord(TableList tableList1) throws ParseException {
		// 初始化获取对象
		TableList tableList = tableList1.initData(tableList1);
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		
		HouseModel houseModel = new HouseModel();
		if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
			houseModel.setDateStart(sf.parse(tableList.getDateStart()));
		}
		if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
			houseModel.setDateEnd(sf.parse(tableList.getDateEnd()));
		}
		houseModel.setSqlWhere(tableList.getSqlWhere());

		houseModel.setDateTitle(tableList.getDateType());
		if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
			houseModel.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
		} else {
			houseModel.setSqlOrderBy("order by coRe_time DESC ");
		}
		// 装载数据类
		DataList<UserCenterComplaintsRecord> datalist = new DataList<UserCenterComplaintsRecord>();
		int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
		// 分页设置查询条数
		PageModel<UserCenterComplaintsRecord> pageModel1 = complaintsRecordService.selectUserCenterComplaintsRecord(tableList.getPageNo(),pageSize,houseModel);
		Map<String, Object> map = datalist.dataList(pageModel1.getList(), tableList.getPageNo(), pageSize, pageModel1.getTotalRecords(), pageModel1.getSumMoney());
		return map;
	}
	
	/**
	 * 跳转查看处理结果
	 * @author tanglei
	 */
	@RequestMapping("/treatmentResult")
	public String treatmentResult () {
		return "UserComplaintsRecord/treatmentResult";
	}
	
	/**
	 * 处理结果
	 * @author Administrator
	 * @return 
	 */
	@RequestMapping("/result")
	@ResponseBody
	public String result (HttpServletRequest req,int cno) {
		UserCenterComplaintsRecord complaintsRecord=new UserCenterComplaintsRecord(); 
		HashMap<String, Object> map = new HashMap<>();
		Msg<Object> msg=new Msg<Object>();
		complaintsRecord.setCoRe_id(cno); 
		UserCenterComplaintsRecord ur=complaintsRecordService.queryComplaintsRecordObject(complaintsRecord);
		map.put("complaintsRecord", ur);
		ViewUserComplaintsResultVo complaintsResult =new ViewUserComplaintsResultVo();
		complaintsResult.setRet_coRd_id(ur.getCoRe_id());
		PageModel<ViewUserComplaintsResultVo> ccR=complaintsRecordService.queryComplaintsReulstObject(complaintsResult);
		map.put("ComplaintsResult", ccR);
		return msg.toString(map);
	}
	
	/**
	 * 回复处理结果
	 * @author tanglei
	 */
	@RequestMapping("/RecoveryResult")
	@ResponseBody
	public String RecoveryResult(int coRd_id, String content) {
		Msg<Object> msg = new Msg<>();
		UserCenterEmployee employee = AppUtil.getCookieEmployee();
		if (employee == null){
			return msg.toError(Msg.MSG_LOGIN_ERROR);
		}
		UserCenterComplaintsResult complaintsResult =new UserCenterComplaintsResult();
		complaintsResult.setRet_coRd_id(coRd_id);
		complaintsResult.setRet_result(content);
		complaintsResult.setRet_em_id(employee.getEm_id());
		complaintsResult.setRet_time(UserComplaintsRecordController.getCurrentDate());
		boolean boo=complaintsRecordService.addComplaintsResult(complaintsResult);
		if (!boo) {
			msg.setCode(110);
			msg.setMsg("提交失败");
			return msg.toString();
		}
		return msg.toString();
	}
	
	/**
	 * 处理完毕
	 * @author tanglei
	 */
	@RequestMapping("/Resultfinish")
	@ResponseBody
	public String Resultfinish (HttpServletRequest req,int coRd_id) {
		Msg<Object> msg = new Msg<>();
		UserCenterComplaintsRecord complaintsRecord=new UserCenterComplaintsRecord(); 
		complaintsRecord.setCoRe_id(coRd_id);
		complaintsRecord.setCoRe_state(0);
		boolean boo=complaintsRecordService.updateComplaintsRecord(complaintsRecord);
		if (!boo) {
			msg.setCode(110);
			msg.setMsg("处理失败");
			return msg.toString();
		}
		return msg.toString();
	}

}
