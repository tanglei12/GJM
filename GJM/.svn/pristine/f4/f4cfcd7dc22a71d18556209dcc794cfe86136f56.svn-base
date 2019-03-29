package com.gjp.service;

import com.gjp.dao.RoleDao;
import com.gjp.model.Powers;
import com.gjp.model.Role;
import com.gjp.model.UserCenterEmployee;
import com.gjp.util.AppUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
* 角色管理
* 
* @author 王孝元
* 
* @version 创建时间：2016年10月25日 上午11:08:03
* 
*/
@Service
public class RoleService {
	
	@Resource
	private RoleDao roleDao;
	
	/**
	 * 查询角色列表
	 * 
	 * @return
	 * @author 王孝元
	 */
	public List<Role> getRoleList(Role role){
		return roleDao.selectRoleList(role);
	}
	/**
	 * 查询角色列表总数(分页)
	 * 
	 * @return
	 * @author 王孝元
	 */
	public int getRoleListCount(Role role){
		return roleDao.selectRoleListCount(role);
	}
		
	/**
	 * 根据id查询角色
	 * 
	 * @return
	 * @author 王孝元
	 */
	public Role getRoleById(Integer id){
		return roleDao.getRoleById(id);
	}
	
	/**
	 * 添加角色
	 * 
	 * @param r 角色
	 * @author 王孝元
	 */
	public int saveRole(Role r){
		return roleDao.addRole(r);
	}
	
	/**
	 * 修改角色
	 * @param r 角色
	 * @return
	 * @author 王孝元
	 */
	public int updateRole(Role r){
		return roleDao.updateRole(r);
	}
	
	/**
	 * 删除角色
	 * @param id 角色id 
	 * @return
	 * @author 王孝元
	 */
	public void deleteRole(Integer id){
		//1.删除关联
		roleDao.deleteFromPersonRole(id);
		roleDao.deleteFromRolePowers(id);
		//3.删除自身
		roleDao.deleteRole(id);
	}
	
	/**
	 * 查询角色拥有的权限
	 * @param id 角色id
	 * @return
	 * @author 王孝元
	 */
	public List<Powers> selectPowersByRoleId(Integer id){
		return roleDao.selectPowersByRoleId(id);
	}
	
	/**
	 * 批量设置权限
	 * @param powerIds 权限id
	 * @param ucr_id 角色id
	 * @return
	 */
	public int setPowersForRole(Integer[] powerIds, Integer id) {
		//1.先删除已有权限
		roleDao.deleteFromRolePowers(id);
		//2.再设置权限
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("powerIds", powerIds);
		map.put("roleId", id);
		return roleDao.savePowersForRole(map);
	}
	
	/**
	 * 查询角色下的人员
	 * @param id 角色id
	 * @return
	 * @author 王孝元
	 */
	public List<UserCenterEmployee> selectPersonsByRole(Integer id){
		return roleDao.selectPersonsByRole(id);
	}
	
	/**
	 * 角色添加人员
	 * @param id 人员id
	 * @return
	 * @author 王孝元
	 */
	public int savePersonToRole(Integer roleId,Integer personId){
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("ucr_id", roleId);
		map.put("em_id", personId);
		return roleDao.savePersonToRole(map);
	}
	
	/**
	 * 角色删除人员
	 * @param id 人员id
	 * @return
	 * @author 王孝元
	 */
	public int deletePersonFromRole(Integer id){
		return roleDao.deletePersonFromRole(id);
	}
	
	public boolean exsitRoleName(String ucr_name){
		Role r = new Role();
		r.setUcr_name(ucr_name);
		List<Role> list = roleDao.selectRoleByProperty(r);
		if(AppUtil.removeNull(list).size()==0){
			return true;
		}
		return false;
	}
}
