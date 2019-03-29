package com.gjp.dao;

import com.gjp.model.ContractStatementBalanceVo;
import com.gjp.model.UserCenterStatementCostItemsVo;
import com.gjp.model.UserCenterStatementDamageItemsVo;
import com.gjp.model.UserCenterStatementVo;

import java.util.List;

/**
 * 结算单DAO
 * 
 * @author 庆涛
 *
 */
public interface UserCenterStatementDao {

	/**
	 * 添加结算单
	 * 
	 * @param statementVo
	 * @return
	 */
	int addStatement(UserCenterStatementVo statementVo);

	/**
	 * 更新结算单
	 * 
	 * @param statementVo
	 * @return
	 */
	int updateStatement(UserCenterStatementVo statementVo);

	/**
	 * 添加结算消费项目清单
	 * 
	 * @param statementCostItemsVo
	 * @return
	 */
	int addStatementCostItems(UserCenterStatementCostItemsVo statementCostItemsVo);

	/**
	 * 添加损坏物品清单
	 * 
	 * @param statementDamageItemsVo
	 * @return
	 */
	int addStatementDamageItems(UserCenterStatementDamageItemsVo statementDamageItemsVo);

	/**
	 * 删除结算消费项目数据
	 * 
	 * @param statementCostItemsVo
	 * @return
	 */
	int deleteStatementCostItems(UserCenterStatementCostItemsVo statementCostItemsVo);

	/**
	 * 删除损坏物品清单
	 * 
	 * @param statementDamageItemsVo
	 * @return
	 */
	int deleteStatementDamageItems(UserCenterStatementDamageItemsVo statementDamageItemsVo);

	/**
	 * 查询结算单信息
	 * 
	 * @param statementVo
	 * @return
	 */
	UserCenterStatementVo queryStatementOrder(UserCenterStatementVo statementVo);

	/**
	 * 查询消费清单列表
	 * 
	 * @param costItemsVo
	 * @return
	 */
	List<UserCenterStatementCostItemsVo> queryStatementCostItems(UserCenterStatementCostItemsVo costItemsVo);

	/**
	 * 查询损坏物品清单列表
	 * 
	 * @param damageItemsVo
	 * @return
	 */
	List<UserCenterStatementDamageItemsVo> queryStatementDamageItems(UserCenterStatementDamageItemsVo damageItemsVo);

	/**
	 * 查询结算结余
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月21日
	 *
	 * @param statementBalanceVo
	 * @return
	 */
	List<ContractStatementBalanceVo> queryStatementBalances(ContractStatementBalanceVo statementBalanceVo);

	/**
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月22日
	 *
	 * @param contractStatementBalanceVo
	 * @return
	 */
	int deleteStatementBalance(ContractStatementBalanceVo contractStatementBalanceVo);

	/**
	 * 添加账单结算
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月22日
	 *
	 * @param contractStatementBalanceVo
	 * @return
	 */
	int addStatementBalance(ContractStatementBalanceVo contractStatementBalanceVo);

	/**
	 * 更新结算单消费记录
	 * 
	 * @作者 JiangQT
	 * @日期 2016年10月10日
	 *
	 * @param statementVo
	 * @return
	 */
	int updateStatementCostItems(UserCenterStatementCostItemsVo statementCostItemsVo);

	/**
	 * 更新费用结余
	 * 
	 * @作者 JiangQT
	 * @日期 2016年10月10日
	 *
	 * @param contractStatementBalanceVo
	 * @return
	 */
	int updateStatementBalance(ContractStatementBalanceVo contractStatementBalanceVo);

	/**
	 *
	 * 查询结算账单图片
	 */
	List<UserCenterStatementVo> querycontractStatementImage ();

}
