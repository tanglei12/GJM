package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserEmployeeTypeDAO;
import com.gjp.model.UserEmployeeType;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2015年8月25日 下午5:07:34 
 */
@Repository
public class UserEmployeeTypeDAOImpl extends BaseDAO implements UserEmployeeTypeDAO{

	@Override
	public Integer insertUserEmployeeType(UserEmployeeType userEmployeeType) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.UserEmployeeTypeDAO.insertUserEmployeeType",userEmployeeType);
	}

	@Override
	public List<UserEmployeeType> selectUserEmployeeTypeId(
			int id) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.UserEmployeeTypeDAO.selectUserEmployeeTypeId",id);
	}

	@Override
	public Integer deleteUserEmployeeType(int id) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.UserEmployeeTypeDAO.deleteUserEmployeeType",id);
	}

}
