package com.gjp.controller;

import com.gjp.model.BillPartners;
import com.gjp.model.DataList;
import com.gjp.service.BillPartnersService;
import com.gjp.util.*;
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
 * 合作伙伴
 *  
 * @author zoe
 *
 */
@Controller 
public class BillPartnersController {

	// 合作伙伴
	@Resource
	private BillPartnersService billPartnersService;


	/**
	 * 跳转合作伙伴界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/billPartners")
	public String billPartners(HttpServletRequest request, HttpServletResponse response) {
		return "/order/billPartners";
	}
	
	/**
	 * 跳转添加合作伙伴界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/jumpAddBillPartners")
	public String jumpAddBillPartners(HttpServletRequest request, HttpServletResponse response) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		return "/order/addBillPartners";
	}
	
	/**
	 * 跳转修改合作伙伴界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/jumpUpdataBillPartners")
	public String jumpUpdataBillPartners(HttpServletRequest request, HttpServletResponse response,String bp_id) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		//根据编号查询合作伙伴
		BillPartners billPartners = billPartnersService.selectBillPartnersById(Integer.parseInt(bp_id));
		request.setAttribute("billPartners", billPartners);
		return "/order/updateBillPartners";
	}
	
	/**
	 * 修改合作伙伴
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updataBillPartners")
	public String updataBillPartners(BillPartners billPartners,
			Model model,String bp_cooperation,HttpServletRequest request, HttpServletResponse response) {
		//判断是否重复提交
		if(!UUIDToken.isRepeatSubmit(request)){
			//设置合作时间
			if (!"".equals(bp_cooperation)) {
				billPartners.setBp_cooperationDate(DataUtil.StrToDates(bp_cooperation));
			}
			int result = billPartnersService.updataBillPartners(billPartners);
			if(result != 0){
				request.setAttribute("success", "$.jBox.tip('修改合作伙伴成功');");
			}else{
				request.setAttribute("error", "$.jBox.tip('修改合作伙伴失败');");
			}
        }else{
        	return "/order/billPartners";
        }
		request.getSession().removeAttribute("token");//移除session中的token
		return "/order/billPartners";
	}
	
	/**
	 * 添加合作伙伴
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/addBillPartners")
	public String addBillPartners(BillPartners billPartners,
			Model model,String bp_cooperation,HttpServletRequest request, HttpServletResponse response) {
		//判断是否重复提交
		if(!UUIDToken.isRepeatSubmit(request)){
			//设置合作时间
			if (!"".equals(bp_cooperation)) {
				billPartners.setBp_cooperationDate(DataUtil.StrToDates(bp_cooperation));
			}
			billPartners.setDp_date(new Date());
			int result = billPartnersService.addBillPartners(billPartners);
			if(result != 0){
				request.setAttribute("success", "$.jBox.tip('添加合作伙伴成功');");
			}else{
				request.setAttribute("error", "$.jBox.tip('添加合作伙伴失败');");
			}
        }else{
        	return "/order/billPartners";
        }
		
		request.getSession().removeAttribute("token");//移除session中的token
		return "/order/billPartners";
	}

	/**
	 * ajax分页查询合作伙伴List
	 * 
	 * @param response
	 * @return
	 * @throws ParseException 
	 */
	@RequestMapping("/billPartnersAll")
	@ResponseBody
	public Map<String, Object> billPartnersAll(HttpServletResponse response, TableList tableList1) throws ParseException {
		//初始化获取对象
		TableList tableList = tableList1.initData(tableList1);
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		PageModel<BillPartners> pageModel1 = new PageModel<BillPartners>();
		
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
		DataList<BillPartners> datalist = new DataList<BillPartners>();
		int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
		pageModel1.setPageNo((tableList.getPageNo() - 1) * pageSize);
		// 分页设置查询条数
		pageModel1.setPageSize(pageSize);
		// 查询分页实体
		PageModel<BillPartners> pageModel = billPartnersService.selectBillPartners(pageModel1);
		//处理特殊数据
		List<BillPartners> list = new ArrayList<BillPartners>();
		for (BillPartners billPartners : pageModel.getList()) {
			billPartners.setBp_businessPhone("/"+billPartners.getBp_businessPhone());
			billPartners.setBp_moneyPhone("/"+billPartners.getBp_moneyPhone());
			billPartners.setBp_technologyPhone("/"+billPartners.getBp_technologyPhone());
			list.add(billPartners);
		}
		// 装载数据
		Map<String, Object> map = datalist.dataList(pageModel.getList(), tableList.getPageNo(), pageSize, pageModel.getTotalRecords(), pageModel.getSumMoney());
		return map;
	}
	
	/**
	 * ajax查询合作伙伴List
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/selectTo_people")
	@ResponseBody
	public Map<String, Object> selectTo_people(
			HttpServletRequest request, HttpServletResponse response) {
		List<BillPartners> billPartnersList = billPartnersService
				.selectTo_people();
		Map<String, Object> map = new HashMap<>();
		map.put("billPartnersList", billPartnersList);
		return map;
	}
}
