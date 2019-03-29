package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.CustomerSeeDAO;
import com.gjp.model.CustomerSee;
import com.gjp.model.ViewBusinessContractVo;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年2月24日 上午10:29:38
 */
@Repository
public class CustomerSeeDAOImpl extends BaseDAO implements CustomerSeeDAO {

	@Override
	public Integer insertCustomerSee(CustomerSee customerSee) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.CustomerSeeDAO.insertCustomerSee", customerSee);
	}

	@Override
	public List<CustomerSee> queryCustomerSee() {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerSeeDAO.queryCustomerSee");
	}

	@Override
	public List<CustomerSee> queryCustomerList(CustomerSee customerSee) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerSeeDAO.queryCustomerList", customerSee);
	}

	@Override
	public List<ViewBusinessContractVo> selectViewContractListCUS(Pagination<ViewBusinessContractVo> viewBusinessContractVo) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.CustomerSeeDAO.selectViewContractListCUS", viewBusinessContractVo);
	}

	@Override
	public CustomerSee queryCustomerSeeCount(CustomerSee customerSee) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerSeeDAO.queryCustomerSeeCount", customerSee);
	}

	@Override
	public CustomerSee queryCustomerSeeList(CustomerSee customerSee) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerSeeDAO.queryCustomerSeeList", customerSee);
	}

	@Override
	public CustomerSee queryCustomerSeeSuccessCount(CustomerSee customerSee) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerSeeDAO.queryCustomerSeeSuccessCount", customerSee);
	}

	@Override
	public Integer updateCustomerSee(CustomerSee customerSee) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.CustomerSeeDAO.updateCustomerSee", customerSee);
	}

	@Override
	public CustomerSee queryCustomerSeeSuccessCountDK(CustomerSee customerSee) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerSeeDAO.queryCustomerSeeSuccessCountDK", customerSee);
	}

	@Override
	public CustomerSee queryCustomerListID(CustomerSee customerSee) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerSeeDAO.queryCustomerListID", customerSee);
	}

	@Override
	public ViewBusinessContractVo selectViewContractListHouseID(ViewBusinessContractVo viewBusinessContractVo) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerSeeDAO.selectViewContractListHouseID", viewBusinessContractVo);
	}

	@Override
	public CustomerSee queryCustomerSeeListSize(CustomerSee customerSee) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerSeeDAO.queryCustomerSeeListSize", customerSee);
	}

	@Override
	public ViewBusinessContractVo selectViewContractListHouseIDs(ViewBusinessContractVo viewBusinessContractVo) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerSeeDAO.selectViewContractListHouseIDs", viewBusinessContractVo);
	}

	@Override
	public CustomerSee queryCustomerCountPhone(CustomerSee customerSee) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.CustomerSeeDAO.queryCustomerCountPhone", customerSee);
	}

}
