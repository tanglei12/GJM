package com.gjp.controller;

import com.gjp.model.UserCenterDistributionAccount;
import com.gjp.model.UserCenterEvaluationContent;
import com.gjp.model.UserCenterEvaluationPerson;
import com.gjp.model.UserCenterSeparate;
import com.gjp.service.EPartTimeJobService;
import com.gjp.service.UserCenterEvaluationPersonService;
import com.gjp.service.UserCenterSeparateService;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import com.gjp.util.UUIDToken;
import com.gjp.util.constant.Constant;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

/**
 * 测评人
 * 
 * @author zoe
 *
 */
@Controller
@RequestMapping("/evaluationPerson")
public class UserCenterEvaluationPersonController {

	// 测评人
	@Resource
	private UserCenterEvaluationPersonService userCenterEvaluationPersonService;
	// 分成
	@Resource
	private UserCenterSeparateService userCenterSeparateService;
	// E兼职
	@Resource
	private EPartTimeJobService ePartTimeJobService;

	/**
	 * 跳转测评人界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/evaluationPerson")
	public String evaluationPerson(HttpServletRequest request,
			HttpServletResponse response) {
		return "/evaluationPerson/evaluationPerson";
	}

	/**
	 * 跳转测评人界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/auditing")
	public String auditing(HttpServletRequest request,
			HttpServletResponse response, String id) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		//根据编号查询测评人
		UserCenterEvaluationPerson userCenterEvaluationPerson = userCenterEvaluationPersonService
				.selectEvaluationPersonById(Integer.parseInt(id));
		//查询测评内容
		List<UserCenterEvaluationContent> userCenterEvaluationContentList = userCenterEvaluationPersonService
				.selectEvaluationContent(Integer.parseInt(id));
		request.setAttribute("userCenterEvaluationPerson", userCenterEvaluationPerson);
		request.setAttribute("userCenterEvaluationContentList", userCenterEvaluationContentList);
		return "/evaluationPerson/auditingEvaluationPerson";
	}

	/**
	 * ajax查询测评人List
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/selectEvaluationPerson")
	@ResponseBody
	public Map<String, Object> selectEvaluationPerson(
			HttpServletRequest request, HttpServletResponse response,
			String page, String cookie, String ep_state, String ep_name) {
		int pageNo = Integer.parseInt(page);
		if (pageNo == 0) {
			pageNo = 1;
		}
		// 设置分页条数
		int cookies = Constant.PAGE_SIZE;
		if ("undefined".equals(cookie)) {

		} else {
			if (cookie != null && !"".equals(cookie)) {
				cookies = Integer.parseInt(cookie);
				if (cookies == 0) {
					cookies = Constant.PAGE_SIZE;
				}
			}
		}
		HouseModel house = new HouseModel();
		if (ep_name == null || "".equals(ep_name)) {
			house.setEp_name("jsp");
		} else {
			house.setEp_name(ep_name);
		}
		house.setEp_state(ep_state);
		// 查询分页实体
		PageModel<UserCenterEvaluationPerson> pageModel = userCenterEvaluationPersonService
				.selectEvaluationPerson(pageNo, cookies, house);
		Map<String, Object> map = new HashMap<>();
		map.put("pageModel", pageModel);
		return map;
	}
	
	/**
	 * ajax查询分成人员list
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/selectSeparate")
	@ResponseBody
	public Map<String, Object> selectSeparate(
			HttpServletRequest request, HttpServletResponse response, String ep_id) {

		List<UserCenterSeparate> userCenterSeparateList = userCenterSeparateService.selectSeparate(ep_id);
		//int result = userCenterEvaluationPersonService.updateState(userCenterEvaluationPerson);
		Map<String, Object> map = new HashMap<>();
		map.put("userCenterSeparateList", userCenterSeparateList);
		return map;
	}
	
	/**
	 * 跳转测评人界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updateState")
	public String updateState(HttpServletRequest request,
			HttpServletResponse response, String ep_id,String uda_id,String ep_state,String ep_money, String ep_wayMon, String one, String two, String three, String four) {
		//根据编号查询测评人
				UserCenterEvaluationPerson userCenterEvaluationPersonss = userCenterEvaluationPersonService
						.selectEvaluationPersonById(Integer.parseInt(ep_id));
		//判断是否重复提交
		if(!UUIDToken.isRepeatSubmit(request)){
			UserCenterEvaluationPerson userCenterEvaluationPerson = new UserCenterEvaluationPerson();
			userCenterEvaluationPerson.setEp_id(Integer.parseInt(ep_id));
			userCenterEvaluationPerson.setEp_state(ep_state);
			//贷款成功添加分成金额
			if("success".equals(ep_state)){
				userCenterEvaluationPerson.setEp_money(Double.parseDouble(ep_money));
				userCenterEvaluationPerson.setEp_wayMon(Double.parseDouble(ep_wayMon));
				userCenterEvaluationPersonService.updateState(userCenterEvaluationPerson);
				Double ep_leave = Double.parseDouble(ep_wayMon);
				if(uda_id == null || "".equals(uda_id)){
					
				}else{
					List<Integer> uda_ids = addSeparate(uda_id);
					for (int i = 0;i<uda_ids.size();i++) {
						UserCenterSeparate userCenterSeparate = new UserCenterSeparate();
						userCenterSeparate.setEw_date(new Date());
						userCenterSeparate.setEp_id(ep_id);
						userCenterSeparate.setEw_state("未打款");
						userCenterSeparate.setEw_way(userCenterEvaluationPersonss.getEp_way());
						userCenterSeparate.setUda_id(uda_ids.get(i));
						if(i == 0){
							userCenterSeparate.setEw_percent(Integer.parseInt(one));
							userCenterSeparate.setEw_grade("0级");
							userCenterSeparate.setEw_money(Double.parseDouble(ep_wayMon)*Integer.parseInt(one)/100);
							ep_leave = ep_leave - Double.parseDouble(ep_wayMon)*Integer.parseInt(one)/100;
						}else if(i == 1){
							userCenterSeparate.setEw_grade("1级");
							userCenterSeparate.setEw_percent(Integer.parseInt(two));
							userCenterSeparate.setEw_money(Double.parseDouble(ep_wayMon)*Integer.parseInt(two)/100);
							ep_leave = ep_leave - Double.parseDouble(ep_wayMon)*Integer.parseInt(two)/100;
						}else if(i == 2){
							userCenterSeparate.setEw_grade("2级");
							userCenterSeparate.setEw_percent(Integer.parseInt(three));
							userCenterSeparate.setEw_money(Double.parseDouble(ep_wayMon)*Integer.parseInt(three)/100);
							ep_leave = ep_leave - Double.parseDouble(ep_wayMon)*Integer.parseInt(three)/100;
						}else{
							userCenterSeparate.setEw_grade("3级");
							userCenterSeparate.setEw_percent(Integer.parseInt(four));
							userCenterSeparate.setEw_money(Double.parseDouble(ep_wayMon)*Integer.parseInt(four)/100);
							ep_leave = ep_leave - Double.parseDouble(ep_wayMon)*Integer.parseInt(four)/100;
						}
						//添加分成结算
						userCenterSeparateService.addSeparate(userCenterSeparate);
					}
				}
				userCenterEvaluationPerson.setEp_leave(ep_leave);
				//剩下的佣金
				userCenterEvaluationPersonService.updateState(userCenterEvaluationPerson);
			}else{
				//剩下的佣金
				userCenterEvaluationPersonService.updateState(userCenterEvaluationPerson);
			}
        }else{
        	return "/evaluationPerson/evaluationPerson";
        }
		
		request.getSession().removeAttribute("token");//移除session中的token
		
		return "/evaluationPerson/evaluationPerson";
	}
	
	public List<Integer> addSeparate(String uda_id){
		List<Integer> uda_ids = new ArrayList<Integer>(); 
		uda_ids.add(Integer.parseInt(uda_id));
		//根据编号查询e兼职账号
		UserCenterDistributionAccount userCenterDistributionAccount = ePartTimeJobService.selectDistributionAccount(Integer.parseInt(uda_id));
		if(userCenterDistributionAccount.getUda_num() == null){
		}else{
			uda_ids.add(userCenterDistributionAccount.getUda_num());
			int uda_num = userCenterDistributionAccount.getUda_num();
			for(int i = 0;i<2;i++){
				UserCenterDistributionAccount userCenterDistributionAccounts = ePartTimeJobService.selectDistributionAccount(uda_num);
				if(userCenterDistributionAccounts.getUda_num() != null && userCenterDistributionAccounts.getUda_num() != 0){
					uda_num = userCenterDistributionAccounts.getUda_num();
					uda_ids.add(userCenterDistributionAccounts.getUda_num());
				}
			}
		}
		return uda_ids;
	}
}
