package com.gjp.service;

import com.gjp.dao.UserDictionaryDAO;
import com.gjp.model.UserDictionary;
import com.gjp.model.UserDistrictDictionary;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 数据字典
 * @author shenhx
 *
 */
@Service
public class UserDictionaryService {
	
	@Resource
	private UserDictionaryDAO userDictionaryDAO;

	/**
	 * 新增
	 * @param dictionary
	 * @return
	 */
	public Integer addDictionaryInfo(UserDictionary dictionary) {
		return userDictionaryDAO.addDictionaryInfo(dictionary);
	}

	/**
	 * 更新
	 * @param dictionary
	 * @return
	 */
	public Integer updDictionaryInfo(UserDictionary dictionary) {
		return userDictionaryDAO.updDictionaryInfo(dictionary);
	}

	/**
	 * 根据ID查询
	 * @param dictionary
	 * @return
	 */
	public UserDictionary queryDictionaryInfoById(UserDictionary dictionary) {
		return userDictionaryDAO.queryDictionaryInfoById(dictionary);
	}

	/**
	 * 根据父ID查询
	 * @param dictionary
	 * @return
	 */
	public List<UserDictionary> queryDictionaryInfoByPid(UserDictionary dictionary) {
		return userDictionaryDAO.queryDictionaryInfoByPid(dictionary);
	}
	
	/**
	 * 查询所有数据字典数据
	 * @param dictionary
	 * @return
	 */
	public List<UserDictionary> queryDictionaryList(UserDictionary dictionary){
		return userDictionaryDAO.queryDictionaryList(dictionary);
	}
	
	/**
	 * 查询编码是否存在
	 * @param dictionary
	 * @return
	 */
	public Integer queryCountByPropertyID(UserDictionary dictionary){
		return userDictionaryDAO.queryCountByPropertyID(dictionary);
	}
	
	/**
	 * 根据编码查询状态为有效的配置数据
	 * @param proerytyId
	 * @return
	 */
	public List<UserDictionary> queryDictionaryByPropertyId(String proerytyId) {
		return userDictionaryDAO.queryDictionaryByPropertyId(proerytyId);
	}

	/**
	 * 行政区字典
	 * @param districtDictionary
	 * @return
	 */
	public String queryDistrictDictionary(UserDistrictDictionary districtDictionary){
		return userDictionaryDAO.queryDistrictDictionary(districtDictionary);
	}
}
