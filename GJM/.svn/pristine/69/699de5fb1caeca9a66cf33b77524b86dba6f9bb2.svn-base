package com.gjp.controller;

import com.gjp.model.Powers;
import com.gjp.service.PowersService;
import com.gjp.service.RoleService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
* 异步验证控制层
* 
* @author 王孝元
* @version 创建时间：2016年11月16日 下午2:34:32
* 
*/
@RequestMapping("/valid")
@Controller
public class ValidateController {
	
	@Resource
	private PowersService powersService; // 权限配置
	
	@Resource
	private RoleService roleService; // 角色管理

	/**
	 * 验证权限名是否重复
	 * 
	 * @param request
	 * @param response
	 * @param ucps_name
	 * @param ucps_pid
	 * @param ucps_id
	 * @return
	 * @author 王孝元
	 */
	@RequestMapping("/checkPowersName")
	@ResponseBody
	public boolean checkPowersName(HttpServletRequest request,HttpServletResponse response,String ucps_name,Integer ucps_pid,Integer ucps_id){
		Powers parent = powersService.getPowersById(ucps_pid);
		// 添加的是二级权限，则执行exsitPowersName2方法
		if(parent!=null&&parent.getUcps_level()==1){
			return powersService.exsitPowersName2(ucps_name, ucps_id);
		}
		return powersService.exsitPowersName(ucps_name, ucps_pid, ucps_id);
	}
	
	/**
	 * 验证权限路径是否重复
	 * 
	 * @param request
	 * @param response
	 * @param ucps_url
	 * @param ucps_pid
	 * @param ucps_id
	 * @return
	 * @author 王孝元
	 */
	@RequestMapping("/checkPowersUrl")
	@ResponseBody
	public boolean checkPowersUrl(HttpServletRequest request,HttpServletResponse response,String ucps_url,Integer ucps_pid,Integer ucps_id){
		Powers parent = powersService.getPowersById(ucps_pid);
		// 添加的是二级权限，则执行exsitPowersUrl2方法
		if(parent!=null&&parent.getUcps_level()==1){
			return powersService.exsitPowersUrl2(ucps_url,ucps_id);
		}
		return powersService.exsitPowersUrl(ucps_url, ucps_pid, ucps_id);
	}
	
	/**
	 * 验证角色名称是否重复
	 * 
	 * @param request
	 * @param response
	 * @param ucr_name
	 * @return
	 * @author 王孝元
	 */
	@RequestMapping("/checkRoleName")
	@ResponseBody
	public boolean checkRoleName(HttpServletRequest request,HttpServletResponse response,String ucr_name){
		return roleService.exsitRoleName(ucr_name);
	}
}
