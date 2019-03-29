package com.gjp.controller;

import com.gjp.model.HoseRecommendGroup;
import com.gjp.service.HoseRecommendGroupService;
import com.gjp.util.PageModel;
import com.gjp.util.UUIDToken;
import com.gjp.util.constant.Constant;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * 推荐群体
 * 
 * @author zoe
 *
 */
@Controller
@RequestMapping("/recommendGroup")
public class RecommendGroupController {

	// 推荐群体
	@Resource
	private HoseRecommendGroupService hoseRecommendGroupService;

	
	
	/**
	 * 跳转推荐群体界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/recommendGroup")
	public String recommendGroup(HttpServletRequest request, HttpServletResponse response) {
		return "/recommendGroup/recommendGroup";
	}
	
	/**
	 * 添加推荐群体
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/addRecommendGroup")
	public String addRecommendGroup(HoseRecommendGroup hoseRecommendGroup,
			Model model, HttpServletRequest request,
			HttpServletResponse response) {
		//判断是否重复提交
		if(!UUIDToken.isRepeatSubmit(request)){
			int result = hoseRecommendGroupService.addHoseRecommendGroup(hoseRecommendGroup);
			if(result != 0){
				request.setAttribute("success", "$.jBox.tip('添加推荐群体信息成功');");
			}else{
				request.setAttribute("error", "$.jBox.tip('添加推荐群体信息失败');");
			}
        }else{
        	return "/recommendGroup/recommendGroup";
        }
		
		request.getSession().removeAttribute("token");//移除session中的token
		
		return "/recommendGroup/recommendGroup";
	}
	
	/**
	 * 跳转推荐群体界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/jumpAddRecommendGroup")
	public String jumpAddRecommendGroup(HttpServletRequest request, HttpServletResponse response) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		return "/recommendGroup/addRecommendGroup";
	}

	/**
	 * 跳转修改推荐群体界面
	 * jumpAddRecommendGroup
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updata")
	public String updata(HttpServletRequest request,
			HttpServletResponse response, String id) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		int ids = Integer.parseInt(id);
		request.setAttribute("id", ids);
		return "/recommendGroup/updataRecommendGroup";
	}

	/**
	 * ajax分页查询推荐群体List
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/selectRecommendGroup")
	@ResponseBody
	public Map<String, Object> selectRecommendGroup(
			HttpServletRequest request, HttpServletResponse response,
			String page,String cookie) {
		int pageNo = Integer.parseInt(page);
		if (pageNo == 0) {
			pageNo = 1;
		}
		int cookies = Constant.PAGE_SIZE;
		if("undefined".equals(cookie)){
			
		}else{
			if(cookie != null && !"".equals(cookie)){
				cookies = Integer.parseInt(cookie);
				if(cookies == 0){
					cookies = Constant.PAGE_SIZE;
				}
			}
		}
		PageModel<HoseRecommendGroup> pageModel = hoseRecommendGroupService
				.selectRecommendGroup(pageNo, cookies);
		Map<String, Object> map = new HashMap<>();
		map.put("pageModel", pageModel);
		return map;
	}

	/**
	 * ajax根据id查询推荐群体
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/selectRecommendGroupById")
	@ResponseBody
	public Map<String, Object> selectRecommendGroupById(
			HttpServletRequest request, HttpServletResponse response, String id) {
		int recommendGroup_Id = Integer.parseInt(id);

		HoseRecommendGroup hoseRecommendGroup = hoseRecommendGroupService
				.selectHoseRecommendGroupById(recommendGroup_Id);
		Map<String, Object> map = new HashMap<>();
		map.put("hoseRecommendGroup", hoseRecommendGroup);
		return map;
	}

	/**
	 * 修改推荐群体
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updataInfo")
	public String updataInfo(HoseRecommendGroup hoseRecommendGroup,
			Model model, HttpServletRequest request,
			HttpServletResponse response) {
		
		//判断是否重复提交
		if(!UUIDToken.isRepeatSubmit(request)){
			int result = hoseRecommendGroupService.updataInfo(hoseRecommendGroup);
			if(result != 0){
				request.setAttribute("success", "$.jBox.tip('修改推荐群体信息成功');");
			}else{
				request.setAttribute("error", "$.jBox.tip('修改推荐群体信息失败');");
			}
        }else{
        	return "/recommendGroup/recommendGroup";
        }
		
		request.getSession().removeAttribute("token");//移除session中的token
		
		return "/recommendGroup/recommendGroup";
	}

}
