package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.CustomerService;
import com.gjp.service.LoanRecordService;
import com.gjp.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 借款表
 * @author tanglei
 * Date 2017年7月14日 下午 15:42:20
 */
@Controller
@RequestMapping("/loanRecord")
public class LoanRecordController {
	@Resource
	private LoanRecordService loanRecordService;
	@Resource
	private CustomerService customerService;  //查询合同编号
	
	/**
	 * 跳转列表
	 * @author tanglei
	 * Date 2017年7月14日 下午 15:50:20
	 */
	@RequestMapping("/loanRecord")
	public String loanRecord () {
		return "loanRecord/loanRecordList";
	}
	
	/**
	 * 借款记录表
	 * @author tanglei
	 * Date 2017年7月14日 下午 15:42:20
	 * @throws ParseException 
	 */
	@RequestMapping("/loanRecordList")
	@ResponseBody
	public Map<String,Object> loanRecordList(TableList tableList1) throws ParseException {
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
			houseModel.setSqlOrderBy("order by bm_apply_time DESC ");
		}
		// 装载数据类
		DataList<BusinessLoanRecord> datalist = new DataList<BusinessLoanRecord>();
		int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
		// 分页设置查询条数
		PageModel<BusinessLoanRecord> pageModel1 = loanRecordService.loanRecordList(tableList.getPageNo(), pageSize, houseModel);
		Map<String, Object> map = datalist.dataList(pageModel1.getList(), tableList.getPageNo(), pageSize, pageModel1.getTotalRecords(), pageModel1.getSumMoney());
		return map;
	}
	
	/**
	 * 借款待审核
	 * @author tanglei
	 * Date 2017年7月14日 下午 17:22:20
	 */
	@RequestMapping("/loanRecordExamine")
	public String loanRecordExamine () {
		return "loanRecord/loanRecordExamine";
	}
	
	/**
	 * 借款审核信息
	 * @author tanglei
	 * Date 2017年7月14日 下午 17:51:20
	 */
	@RequestMapping("/examine")
	@ResponseBody
	public String examine (HttpServletRequest req,int cno) {
		Msg<Object> msg=new Msg<Object>();
		Map<String,Object> map=new HashMap<String,Object>();
		BusinessLoanRecord loan=new BusinessLoanRecord();
		loan.setBm_id(cno);
		loan =loanRecordService.selectBusinessLoanRecord(loan);   //借款信息
		map.put("LoanRecord",loan);
		UserCustomer userCustomer=new UserCustomer();
		userCustomer.setCc_cardNum(loan.getBm_numCard());
		List<UserCustomer> customer=customerService.selectHiCode(userCustomer);  //合同编码
		map.put("userCustomer",customer);
		AddedCertificstes certificstes=new AddedCertificstes();
		certificstes.setCd_em_id(loan.getBm_userId());
		certificstes=loanRecordService.selectAddedCertificstes(certificstes);   //身份证件信息
		map.put("certificstes",certificstes);
		BillBand band=new BillBand();
		band.setBd_em_id(loan.getBm_userId());
		band=loanRecordService.selectBand(band);   //申请人银行信息
		map.put("band",band );
		BusinessLoanResult result=new BusinessLoanResult();
		result.setLh_bmId(cno);  //借款id
		List<BusinessLoanResult> resultList=loanRecordService.selectLoanResult(result);  //审核处理信息
		map.put("resultList", resultList);
		return msg.toString(map);
	}
	
	/**
	 * 借款待放贷
	 * @author tanglei
	 * Date 2017年7月14日 下午 17:35:20
	 */
	@RequestMapping("/loanRecordLending")
	public String loanRecordLending () {
		return "loanRecord/loanRecordLending";
	}
	
	/**
	 * 借款放贷信息
	 * @author tanglei
	 * Date 2017年7月15日 下午 15:06:20
	 */
	@RequestMapping("/lending")
	@ResponseBody
	public String lending (HttpServletRequest req,int cno) {
		Msg<Object> msg=new Msg<Object>();
		Map<String,Object> map=new HashMap<String,Object>();
		BusinessLoanRecord loan=new BusinessLoanRecord();
		loan.setBm_id(cno);
		loan =loanRecordService.selectBusinessLoanRecord(loan);  //借款信息
		map.put("LoanRecord",loan);
		UserCustomer userCustomer=new UserCustomer();
		userCustomer.setCc_cardNum(loan.getBm_numCard());
		List<UserCustomer> customer=customerService.selectHiCode(userCustomer);  //合同编码
		map.put("userCustomer",customer);
		AddedCertificstes certificstes=new AddedCertificstes();
		certificstes.setCd_em_id(loan.getBm_userId());
		certificstes=loanRecordService.selectAddedCertificstes(certificstes);   //身份证件信息
		map.put("certificstes",certificstes);
		BillBand band=new BillBand();
		band.setBd_em_id(loan.getBm_userId());
		band=loanRecordService.selectBand(band);   //申请人银行信息
		map.put("band",band );
		BusinessLoanResult result=new BusinessLoanResult();
		result.setLh_bmId(cno);  //借款id
		List<BusinessLoanResult> resultList=loanRecordService.selectLoanResult(result);  //审核处理信息
		map.put("resultList", resultList);
		return msg.toString(map);
	}
	
	/**
	 * 拒绝借款和审核
	 * @author tanglei
	 * Date 2017年7月18日 下午 15:18:20
	 * @throws Exception 
	 */
	@RequestMapping("/updateExamine")
	@ResponseBody
	public String updateExamine(Integer userId, Integer nid, Integer sure, Integer peopleImg,
                                Integer idCard, Integer idCard_side, Integer band, String content) throws Exception {
		Msg<Object> msg = new Msg<>();
		UserCenterEmployee employee = AppUtil.getCookieEmployee();
		if (employee == null){
			return msg.toError(Msg.MSG_LOGIN_ERROR);
		}
		boolean boo=loanRecordService.updateExamine(employee.getEm_id(),userId,nid,sure, peopleImg, idCard, idCard_side, band, content);
		if (!boo) {
			msg.setCode(110);
			msg.setMsg("提交失败");
			return msg.toString();
		}
		return msg.toString();
	}
	
	/**
	 * 租客审核通过
	 * @author tanglei
	 * Date 2017年7月19日 下午 15:55:20
	 * @throws Exception 
	 */
	@RequestMapping("/sureExamine")
	@ResponseBody
	public String sureExamine(Integer userId, Integer nid, Integer sure, Integer peopleImg,
                              Integer idCard, Integer idCard_side, Integer band, String content, Integer select) throws Exception {
		Msg<Object> msg = new Msg<>();
		UserCenterEmployee employee = AppUtil.getCookieEmployee();
		if (employee == null){
			return msg.toError(Msg.MSG_LOGIN_ERROR);
		}
		boolean boo=loanRecordService.editExamine(employee.getEm_id(),userId, nid, sure, peopleImg, idCard, idCard_side, band,select);
		if (!boo) {
			msg.setCode(110);
			msg.setMsg("审核失败");
			return msg.toString();
		}
		return msg.toString();
	}
	
	/**
	 * 放贷通过
	 * @author tanglei
	 * Date 2017年7月19日 下午 15:18:20
	 * @throws Exception 
	 */
	@RequestMapping("/lendingPass")
	@ResponseBody
	public String lendingPass(Integer userId, Integer nid) throws Exception {
		Msg<Object> msg = new Msg<>();
		UserCenterEmployee employee = AppUtil.getCookieEmployee();
		if (employee == null){
			return msg.toError(Msg.MSG_LOGIN_ERROR);
		}
		boolean boo=loanRecordService.lendingPass(userId,nid,employee.getEm_id());
		if (!boo) {
			msg.setCode(110);
			msg.setMsg("放贷失败");
			return msg.toString();
		}
		return msg.toString();
	}
	
}
