package com.gjp.dao;

import com.gjp.model.UserCenterDistributionAccount;

import java.util.List;


/**
 * @author zoe
 *
 * 
 */
public interface EPartTimeJobDAO {


	/**
	 * 根据编号查询e兼职账号
	 * @param uda_id
	 * @return
	 */
	UserCenterDistributionAccount selectDistributionAccount(int uda_id);

	/**
	 * 查询一级e兼职用户
	 * @return
	 */
	List<UserCenterDistributionAccount> selectDistributionAccountByNull();

	/**
	 * 查询下一级e兼职用户
	 * @param uda_id
	 * @return
	 */
	List<UserCenterDistributionAccount> selectDistributionAccountNext(int uda_id);

	/**
	 * 添加e兼职账号
	 * @param userCenterDistributionAccount
	 * @return
	 */
	int addUda(UserCenterDistributionAccount userCenterDistributionAccount);

	/**
	 * 根据编号修改e兼职账号
	 * @param userCenterDistributionAccount
	 * @return
	 */
	int updateUda(UserCenterDistributionAccount userCenterDistributionAccount);

	/**
	 * 根据分享码查询分享账户
	 * @author zoe
	 * @param uda_id
	 * @return
	 */
	UserCenterDistributionAccount selectDistributionAccountByCode(String uda_id);
	
}
