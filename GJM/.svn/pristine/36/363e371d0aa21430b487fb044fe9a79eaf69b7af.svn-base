package com.gjp.dao.impl;


import com.gjp.dao.BaseDAO;
import com.gjp.dao.EPartTimeJobDAO;
import com.gjp.model.UserCenterDistributionAccount;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author zoe
 *
 * 
 */
@Repository
public class EPartTimeJobDAOImpl extends BaseDAO implements EPartTimeJobDAO{


	@Override
	public UserCenterDistributionAccount selectDistributionAccount(int uda_id) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.EPartTimeJobDAO.selectDistributionAccount",uda_id);
	}

	@Override
	public List<UserCenterDistributionAccount> selectDistributionAccountByNull() {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.EPartTimeJobDAO.selectDistributionAccountByNull");
	}

	@Override
	public List<UserCenterDistributionAccount> selectDistributionAccountNext(
			int uda_id) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.EPartTimeJobDAO.selectDistributionAccountNext",uda_id);
	}

	@Override
	public int addUda(
			UserCenterDistributionAccount userCenterDistributionAccount) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.EPartTimeJobDAO.addUda",userCenterDistributionAccount);
	}

	@Override
	public int updateUda(
			UserCenterDistributionAccount userCenterDistributionAccount) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.EPartTimeJobDAO.updateUda",userCenterDistributionAccount);
	}

	@Override
	public UserCenterDistributionAccount selectDistributionAccountByCode(
			String uda_code) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.EPartTimeJobDAO.selectDistributionAccountByCode",uda_code);
	}

}
