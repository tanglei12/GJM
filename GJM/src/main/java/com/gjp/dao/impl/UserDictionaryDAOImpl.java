package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UserDictionaryDAO;
import com.gjp.model.UserDictionary;
import com.gjp.model.UserDistrictDictionary;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 数据字典
 * @author shenhx
 *
 */
@Repository
public class UserDictionaryDAOImpl extends BaseDAO implements UserDictionaryDAO {

	@Override
	public Integer addDictionaryInfo(UserDictionary dictionary) {
		return sqlSessionTemplateUser.insert("com.gjp.dao.UserDictionaryDAO.addDictionaryInfo", dictionary);
	}

	@Override
	public Integer updDictionaryInfo(UserDictionary dictionary) {
		return sqlSessionTemplateUser.update("com.gjp.dao.UserDictionaryDAO.updDictionaryInfo", dictionary);
	}

	@Override
	public UserDictionary queryDictionaryInfoById(UserDictionary dictionary) {
		return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDictionaryDAO.queryDictionaryInfoById", dictionary);
	}

	@Override
	public List<UserDictionary> queryDictionaryInfoByPid(UserDictionary dictionary) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.UserDictionaryDAO.queryDictionaryInfoByPid", dictionary);
	}

	@Override
	public List<UserDictionary> queryDictionaryList(UserDictionary dictionary) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.UserDictionaryDAO.queryDictionaryList", dictionary);
	}

	@Override
	public Integer queryCountByPropertyID(UserDictionary dictionary) {
		return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDictionaryDAO.queryCountByPropertyID", dictionary);
	}

	@Override
	public List<UserDictionary> queryDictionaryByPropertyId(String proerytyId) {
		return sqlSessionTemplateUser.selectList("com.gjp.dao.UserDictionaryDAO.queryDictionaryByPropertyId", proerytyId);
	}

	@Override
	public String queryDistrictDictionary(UserDistrictDictionary districtDictionary) {
		return sqlSessionTemplateUser.selectOne("com.gjp.dao.UserDictionaryDAO.queryDistrictDictionary", districtDictionary);
	}

}
