package com.gjp.service;

import com.gjp.dao.UserCenterStatementDao;
import com.gjp.model.ContractStatementBalanceVo;
import com.gjp.model.UserCenterStatementCostItemsVo;
import com.gjp.model.UserCenterStatementDamageItemsVo;
import com.gjp.model.UserCenterStatementVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 结算单服务层
 * 
 * @author 庆涛
 *
 */
@Service
public class UserCenterStatementService {

	private @Resource UserCenterStatementDao userCenterStatementDao;

	/**
	 * 添加结算单
	 * 
	 * @param statementVo
	 * @return
	 */
	public boolean addStatement(UserCenterStatementVo statementVo) {
		return userCenterStatementDao.addStatement(statementVo) > 0;
	}

	/**
	 * 更新结算单
	 * 
	 * @param statementVo
	 * @return
	 */
	public boolean updateStatement(UserCenterStatementVo statementVo) {
		return userCenterStatementDao.updateStatement(statementVo) > 0;
	}

	/**
	 * 添加结算消费项目清单
	 * 
	 * @param statementCostItemsVo
	 * @return
	 */
	public boolean addStatementCostItems(UserCenterStatementCostItemsVo statementCostItemsVo) {
		return userCenterStatementDao.addStatementCostItems(statementCostItemsVo) > 0;
	}

	/**
	 * 添加损坏物品清单
	 * 
	 * @param statementDamageItemsVo
	 * @return
	 */
	public boolean addStatementDamageItems(UserCenterStatementDamageItemsVo statementDamageItemsVo) {
		return userCenterStatementDao.addStatementDamageItems(statementDamageItemsVo) > 0;
	}

	/**
	 * 删除结算消费项目数据
	 * 
	 * @param statementCostItemsVo
	 * @return
	 */
	public boolean deleteStatementCostItems(UserCenterStatementCostItemsVo statementCostItemsVo) {
		return userCenterStatementDao.deleteStatementCostItems(statementCostItemsVo) > 0;
	}

	/**
	 * 删除结算消费项目数据
	 * 
	 * @param statement_code
	 * 
	 * @param statementCostItemsVo
	 * @return
	 */
	public boolean deleteStatementCostItems(String statement_code) {
		UserCenterStatementCostItemsVo statementCostItemsVo = new UserCenterStatementCostItemsVo();
		statementCostItemsVo.setStatement_code(statement_code);
		return userCenterStatementDao.deleteStatementCostItems(statementCostItemsVo) > 0;
	}

	/**
	 * 删除损坏物品清单
	 * 
	 * @param statementDamageItemsVo
	 */
	public boolean deleteStatementDamageItems(UserCenterStatementDamageItemsVo statementDamageItemsVo) {
		return userCenterStatementDao.deleteStatementDamageItems(statementDamageItemsVo) > 0;
	}

	/**
	 * 删除损坏物品清单
	 * 
	 * @param statement_code
	 * 
	 * @param statementDamageItemsVo
	 */
	public boolean deleteStatementDamageItems(String statement_code) {
		UserCenterStatementDamageItemsVo statementDamageItemsVo = new UserCenterStatementDamageItemsVo();
		statementDamageItemsVo.setStatement_code(statement_code);
		return userCenterStatementDao.deleteStatementDamageItems(statementDamageItemsVo) > 0;
	}

	/**
	 * 查询结算单信息
	 * 
	 * @param statementVo
	 * @return
	 */
	public UserCenterStatementVo queryStatementOrder(UserCenterStatementVo statementVo) {
		return userCenterStatementDao.queryStatementOrder(statementVo);
	}

	/**
	 * 查询消费清单列表
	 * 
	 * @param costItemsVo
	 * @return
	 */
	public List<UserCenterStatementCostItemsVo> queryStatementCostItems(UserCenterStatementCostItemsVo costItemsVo) {
		return userCenterStatementDao.queryStatementCostItems(costItemsVo);
	}

	/**
	 * 查询损坏物品清单列表
	 * 
	 * @param damageItemsVo
	 * @return
	 */
	public List<UserCenterStatementDamageItemsVo> queryStatementDamageItems(UserCenterStatementDamageItemsVo damageItemsVo) {
		return userCenterStatementDao.queryStatementDamageItems(damageItemsVo);
	}

	/**
	 * 查询结算结余
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月21日
	 *
	 * @param statementBalanceVo
	 * @return
	 */
	public List<ContractStatementBalanceVo> queryStatementBalances(ContractStatementBalanceVo statementBalanceVo) {
		return userCenterStatementDao.queryStatementBalances(statementBalanceVo);
	}

	/**
	 * 删除账单结算
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月22日
	 *
	 * @param contractStatementBalanceVo
	 * @return
	 */
	public boolean deleteStatementBalance(ContractStatementBalanceVo contractStatementBalanceVo) {
		return userCenterStatementDao.deleteStatementBalance(contractStatementBalanceVo) > 0;
	}

	/**
	 * 删除账单结算
	 * 
	 * @param statement_code
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月22日
	 *
	 * @param contractStatementBalanceVo
	 * @return
	 */
	public boolean deleteStatementBalance(String statement_code) {
		ContractStatementBalanceVo contractStatementBalanceVo = new ContractStatementBalanceVo();
		contractStatementBalanceVo.setStatement_code(statement_code);
		return userCenterStatementDao.deleteStatementBalance(contractStatementBalanceVo) > 0;
	}

	/**
	 * 添加账单结算
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月22日
	 *
	 * @param contractStatementBalanceVo
	 * @return
	 */
	public boolean addStatementBalance(ContractStatementBalanceVo contractStatementBalanceVo) {
		return userCenterStatementDao.addStatementBalance(contractStatementBalanceVo) > 0;
	}

	/**
	 * 更新结算单消费记录
	 * 
	 * @作者 JiangQT
	 * @日期 2016年10月10日
	 *
	 * @param statementVo
	 * @return
	 */
	public boolean updateStatementCostItems(UserCenterStatementCostItemsVo statementCostItemsVo) {
		return userCenterStatementDao.updateStatementCostItems(statementCostItemsVo) > 0;
	}

	/**
	 * 更新费用结余
	 * 
	 * @作者 JiangQT
	 * @日期 2016年10月10日
	 *
	 * @param contractStatementBalanceVo
	 * @return
	 */
	public boolean updateStatementBalance(ContractStatementBalanceVo contractStatementBalanceVo) {
		return userCenterStatementDao.updateStatementBalance(contractStatementBalanceVo) > 0;
	}

	/**
	 *
	 * 查询结算账单图片
	 */
	public List<UserCenterStatementVo> querycontractStatementImage () {
		return userCenterStatementDao.querycontractStatementImage();
	}

}
