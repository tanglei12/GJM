package com.gjp.service;

import com.gjp.dao.EPartTimeJobDAO;
import com.gjp.model.UserCenterDistributionAccount;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * E兼职service
 * @author zoe
 *
 * 
 */
@Service
public class EPartTimeJobService {

	@Resource
	private EPartTimeJobDAO ePartTimeJobDAO;

	/**
	 * 根据编号查询e兼职账号
	 * @param parseInt
	 * @return
	 */
	public UserCenterDistributionAccount selectDistributionAccount(int uda_id) {
		return ePartTimeJobDAO.selectDistributionAccount(uda_id);
	}

	/**
	 * 查询一级e兼职用户
	 * @return
	 */
	public List<UserCenterDistributionAccount> selectDistributionAccountByNull() {
		return ePartTimeJobDAO.selectDistributionAccountByNull();
	}

	/**
	 * 查询下一级e兼职用户
	 * @param uda_id
	 * @return
	 */
	public List<UserCenterDistributionAccount> selectDistributionAccountNext(
			int uda_id) {
		return ePartTimeJobDAO.selectDistributionAccountNext(uda_id);
	}

	/**
	 * 添加e兼职账号
	 * @param userCenterDistributionAccount
	 * @return
	 */
	public int addUda(
			UserCenterDistributionAccount userCenterDistributionAccount) {
		return ePartTimeJobDAO.addUda(userCenterDistributionAccount);
	}

	/**
	 * 根据编号修改e兼职账号
	 * @param userCenterDistributionAccount
	 * @return
	 */
	public int updateUda(
			UserCenterDistributionAccount userCenterDistributionAccount) {
		return ePartTimeJobDAO.updateUda(userCenterDistributionAccount);
	}

	/**
	 * 根据分享码查询分享账户
	 * @author zoe
	 * @param uda_id
	 * @return
	 */
	public UserCenterDistributionAccount selectDistributionAccountByCode(
			String uda_id) {
		return ePartTimeJobDAO.selectDistributionAccountByCode(uda_id);
	}

}
