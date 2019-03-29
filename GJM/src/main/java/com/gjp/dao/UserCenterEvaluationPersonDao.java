package com.gjp.dao;

import com.gjp.model.UserCenterEvaluationContent;
import com.gjp.model.UserCenterEvaluationPerson;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;

import java.util.List;


/**
 * 测评人
 * @author zoe
 *
 */
public interface UserCenterEvaluationPersonDao {

	/**
	 * 查询测评人List
	 * @param pageNo
	 * @param cookies
	 * @param house 
	 * @return
	 */
	PageModel<UserCenterEvaluationPerson> selectEvaluationPerson(int pageNo,
			int cookies, HouseModel house);

	/**
	 * 根据编号查询测评人
	 * @param ep_id
	 * @return
	 */
	UserCenterEvaluationPerson selectEvaluationPersonById(int ep_id);

	/**
	 * 查询测评内容
	 * @param ep_id
	 * @return
	 */
	List<UserCenterEvaluationContent> selectEvaluationContent(int ep_id);

	/**
	 * 修改贷款状态
	 * @param userCenterEvaluationPerson
	 * @return
	 */
	int updateState(UserCenterEvaluationPerson userCenterEvaluationPerson);

	/**
	 * 查询ejz收益
	 * @param houseModel
	 * @return
	 */
	List<UserCenterEvaluationPerson> selectEjz(HouseModel houseModel);
	
}
