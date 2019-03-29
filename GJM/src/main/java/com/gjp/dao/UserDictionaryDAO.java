package com.gjp.dao;

import com.gjp.model.UserDictionary;
import com.gjp.model.UserDistrictDictionary;

import java.util.List;

/**
 * 数据字典
 *
 * @author shenhx
 */
public interface UserDictionaryDAO {

    /**
     * 新增
     *
     * @param dictionary
     * @return
     */
    Integer addDictionaryInfo(UserDictionary dictionary);

    /**
     * 更新
     *
     * @param dictionary
     * @return
     */
    Integer updDictionaryInfo(UserDictionary dictionary);

    /**
     * 根据ID查询单个
     *
     * @param dictionary
     * @return
     */
    UserDictionary queryDictionaryInfoById(UserDictionary dictionary);

    /**
     * 根据父ID查询子元素
     *
     * @param dictionary
     * @return
     */
    List<UserDictionary> queryDictionaryInfoByPid(UserDictionary dictionary);

    /**
     * 查询所有数据字典数据
     *
     * @param dictionary
     * @return
     */
    List<UserDictionary> queryDictionaryList(UserDictionary dictionary);

    /**
     * 根据编号查询是否已录入
     *
     * @param dictionary
     * @return
     */
    Integer queryCountByPropertyID(UserDictionary dictionary);

    /**
     * 根据编码查询
     *
     * @param proerytyId
     * @return
     */
    List<UserDictionary> queryDictionaryByPropertyId(String proerytyId);

    /**
     * 行政区字典
     * @param districtDictionary
     * @return
     */
    String queryDistrictDictionary(UserDistrictDictionary districtDictionary);
}
