package com.gjp.service;

import com.gjp.dao.UserCenterEvaluationPersonDao;
import com.gjp.model.UserCenterEvaluationContent;
import com.gjp.model.UserCenterEvaluationPerson;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 测评人service
 * @author zoe
 *
 */
@Service
public class UserCenterEvaluationPersonService {
	
	@Resource
	private UserCenterEvaluationPersonDao userCenterEvaluationPersonDao;

	/**
	 * 查询测评人List
	 * @param pageNo
	 * @param cookies
	 * @param house 
	 * @return
	 */
	public PageModel<UserCenterEvaluationPerson> selectEvaluationPerson(
			int pageNo, int cookies, HouseModel house) {
		
		return userCenterEvaluationPersonDao.selectEvaluationPerson(pageNo,cookies,house);
	}

	/**
	 * 根据编号查询测评人
	 * @param parseInt
	 * @return
	 */
	public UserCenterEvaluationPerson selectEvaluationPersonById(int ep_id) {
		return userCenterEvaluationPersonDao.selectEvaluationPersonById(ep_id);
	}

	/**
	 * 查询测评内容
	 * @param parseInt
	 * @return
	 */
	public List<UserCenterEvaluationContent> selectEvaluationContent(
			int ep_id) {
		return userCenterEvaluationPersonDao.selectEvaluationContent(ep_id);
	}

	/**
	 * 修改贷款状态
	 * @param userCenterEvaluationPerson
	 * @return
	 */
	public int updateState(UserCenterEvaluationPerson userCenterEvaluationPerson) {
		return userCenterEvaluationPersonDao.updateState(userCenterEvaluationPerson);
	}

	/**
	 * 查询ejz收益
	 * @param houseModel
	 * @return
	 */
	public List<UserCenterEvaluationPerson> selectEjz(HouseModel houseModel) {
		return userCenterEvaluationPersonDao.selectEjz(houseModel);
	}

	
}
