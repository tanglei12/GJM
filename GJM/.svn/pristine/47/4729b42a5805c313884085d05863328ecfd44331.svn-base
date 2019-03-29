package com.gjp.service;

import com.gjp.dao.UserEmployeeTypeDAO;
import com.gjp.model.UserEmployeeType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * 用户权限
 * @author 陈智颖
 *
 * @version 创建时间：2015年8月25日 下午5:07:24 
 */
@Service
public class UserEmployeeTypeService {

	@Resource
	private UserEmployeeTypeDAO userEmployeeTypeDAO;
	
	/**
	 * 插入用户权限
	 * 
	 * @param userEmployeeType
	 * @return
	 */
	@Transactional(rollbackFor=Exception.class)
	public Integer insertUserEmployeeType(UserEmployeeType userEmployeeType){
		return userEmployeeTypeDAO.insertUserEmployeeType(userEmployeeType);
	}
	
	/**
	 * 删除用户权限
	 * 
	 * @param userEmployeeType
	 * @return
	 */
	@Transactional(rollbackFor=Exception.class)
	public Integer deleteUserEmployeeType(int id){
		return userEmployeeTypeDAO.deleteUserEmployeeType(id);
	}
	
	/**
	 * 插入用户权限
	 * 
	 * @param userEmployeeType
	 * @return
	 */
	public List<UserEmployeeType> selectUserEmployeeTypeId(int id){
		return userEmployeeTypeDAO.selectUserEmployeeTypeId(id);
	}
}
