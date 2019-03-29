package com.gjp.dao;

import com.gjp.model.Powers;
import com.gjp.model.Role;
import com.gjp.model.UserCenterEmployee;

import java.util.List;
import java.util.Map;

/**
* 角色
* 
* @author 王孝元
*  
* @version 创建时间：2016年10月25日 上午10:41:15
* 
*/
public interface RoleDao {
	
	/**
	 * 查询角色列表
	 * 
	 * @return
	 * @author 王孝元
	 */
	List<Role> selectRoleList(Role r);
	
	/**
	 * 查询角色列表总数(分页)
	 * 
	 * @return
	 * @author 王孝元
	 */
	int selectRoleListCount(Role r);
	
	/**
	 * 根据id查询角色
	 * @param id 角色id
	 * @return
	 * @author 王孝元
	 */
	Role getRoleById(Integer id);
	
	/**
	 * 新增
	 * 
	 * @param r 角色
	 * @author 王孝元
	 */
	int addRole(Role r);
	
	/**
	 * 修改
	 * 
	 * @param r 角色
	 * @author 王孝元
	 */
	int updateRole(Role r);
	
	/**
	 * 删除
	 * 
	 * @param id 角色id
	 * @author 王孝元
	 */
	int deleteRole(Integer id);
	
	/**
	 * 删除用户角色关联
	 * 
	 * @param id 角色id
	 * @author 王孝元
	 */
	int deleteFromPersonRole(Integer id);
	
	/**
	 * 删除角色权限关联 
	 * 
	 * @param id 角色id
	 * @author 王孝元
	 */
	int deleteFromRolePowers(Integer id);
	
	/**
	 * 查询角色拥有的权限
	 * @param id 角色id
	 * @return
	 * @author 王孝元
	 */
	List<Powers> selectPowersByRoleId(Integer id);
	
	/**
	 * 批量设置权限
	 * @param map
	 * @return
	 * @author 王孝元
	 */
	int savePowersForRole(Map<String,Object> map);
	
	/**
	 * 查询角色下的人员
	 * @param id 角色id
	 * @return
	 * @author 王孝元
	 */
	List<UserCenterEmployee> selectPersonsByRole(Integer id);
	
	/**
	 * 角色添加人员
	 * @param id 人员id
	 * @return
	 * @author 王孝元
	 */
	int savePersonToRole(Map<String,Object> map);
	
	/**
	 * 角色删除人员
	 * @param id 人员id
	 * @return
	 * @author 王孝元
	 */
	int deletePersonFromRole(Integer id);
	
	/**
	 * 根据角色属性查角色
	 * @param r
	 * @return
	 */
	List<Role> selectRoleByProperty(Role r);
}
