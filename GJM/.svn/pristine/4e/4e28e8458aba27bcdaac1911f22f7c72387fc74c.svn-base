package com.gjp.dao;

import com.gjp.model.ContractBillVo;
import com.gjp.model.UserCenterInformation;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * 短信管理
 * @author shenhx
 *
 */
public interface UserCenterInformationDao {

	/**
	 * 添加短信记录
	 * @param userCenterInformation
	 * @return
	 */
	int addUserCenterInformation(UserCenterInformation userCenterInformation);
	
	/**
	 * 根据客户编码查询客户接收的短信记录
	 * @param cc_code
	 * @return
	 */
	List<UserCenterInformation> queryUserInformationByCode(Pagination<UserCenterInformation> pagination);
	int queryUserInformationByCodeCount(Pagination<UserCenterInformation> pagination);

	/**
	 * 查询指定天数内应缴纳租金的账单信息
	 * @param days
	 * @return
	 */
	List<ContractBillVo> queryPressPayentBillList(int days);

	/**
	 * 根据合同编号查询催租短信
	 * @author tanglei
	 */
	List<UserCenterInformation> queryUserInformation (UserCenterInformation userCenterInformation);
}
