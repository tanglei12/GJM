package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserCenterStatementDao;
import com.gjp.model.ContractStatementBalanceVo;
import com.gjp.model.UserCenterStatementCostItemsVo;
import com.gjp.model.UserCenterStatementDamageItemsVo;
import com.gjp.model.UserCenterStatementVo;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 结算单实现类
 * 
 * @author 庆涛
 *
 */
@Repository
public class UserCenterStatementDaoImpl extends BaseDAO implements UserCenterStatementDao {

	@Override
	public int addStatement(UserCenterStatementVo statementVo) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.UserCenterStatementDao.addStatement", statementVo);
	}

	@Override
	public int addStatementCostItems(UserCenterStatementCostItemsVo statementCostItemsVo) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.UserCenterStatementDao.addStatementCostItems", statementCostItemsVo);
	}

	@Override
	public int addStatementDamageItems(UserCenterStatementDamageItemsVo statementDamageItemsVo) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.UserCenterStatementDao.addStatementDamageItems", statementDamageItemsVo);
	}

	@Override
	public int deleteStatementCostItems(UserCenterStatementCostItemsVo statementCostItemsVo) {
		return sqlSessionTemplateBusiness.delete("com.gjp.dao.UserCenterStatementDao.deleteStatementCostItems", statementCostItemsVo);
	}

	@Override
	public int deleteStatementDamageItems(UserCenterStatementDamageItemsVo statementDamageItemsVo) {
		return sqlSessionTemplateBusiness.delete("com.gjp.dao.UserCenterStatementDao.deleteStatementDamageItems", statementDamageItemsVo);
	}

	@Override
	public int updateStatement(UserCenterStatementVo statementVo) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.UserCenterStatementDao.updateStatement", statementVo);
	}

	@Override
	public UserCenterStatementVo queryStatementOrder(UserCenterStatementVo statementVo) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.UserCenterStatementDao.queryStatementOrder", statementVo);
	}

	@Override
	public List<UserCenterStatementCostItemsVo> queryStatementCostItems(UserCenterStatementCostItemsVo costItemsVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.UserCenterStatementDao.queryStatementCostItems", costItemsVo);
	}

	@Override
	public List<UserCenterStatementDamageItemsVo> queryStatementDamageItems(UserCenterStatementDamageItemsVo damageItemsVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.UserCenterStatementDao.queryStatementDamageItems", damageItemsVo);
	}

	@Override
	public List<ContractStatementBalanceVo> queryStatementBalances(ContractStatementBalanceVo statementBalanceVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.UserCenterStatementDao.queryStatementBalances", statementBalanceVo);
	}

	@Override
	public int deleteStatementBalance(ContractStatementBalanceVo contractStatementBalanceVo) {
		return sqlSessionTemplateBusiness.delete("com.gjp.dao.UserCenterStatementDao.deleteStatementBalance", contractStatementBalanceVo);
	}

	@Override
	public int addStatementBalance(ContractStatementBalanceVo contractStatementBalanceVo) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.UserCenterStatementDao.addStatementBalance", contractStatementBalanceVo);
	}

	@Override
	public int updateStatementCostItems(UserCenterStatementCostItemsVo statementCostItemsVo) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.UserCenterStatementDao.updateStatementCostItems", statementCostItemsVo);
	}

	@Override
	public int updateStatementBalance(ContractStatementBalanceVo contractStatementBalanceVo) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.UserCenterStatementDao.updateStatementBalance", contractStatementBalanceVo);
	}

	@Override
	public List<UserCenterStatementVo> querycontractStatementImage () {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.UserCenterStatementDao.querycontractStatementImage");
	}

}
