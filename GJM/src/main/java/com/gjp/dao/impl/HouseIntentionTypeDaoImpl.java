package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseIntentionTypeDao;
import com.gjp.model.HouseIntentionType;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 意向房源
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月24日 下午4:54:56
 */
@Repository
public class HouseIntentionTypeDaoImpl extends BaseDAO implements HouseIntentionTypeDao {

	@Override
	public List<HouseIntentionType> selectHouseIntentionTypeList(HouseIntentionType houseIntentionType) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseIntentionTypeDao.selectHouseIntentionTypeList", houseIntentionType);
	}

	@Override
	public int insertHouseIntentionType(HouseIntentionType houseIntentionType) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseIntentionTypeDao.insertHouseIntentionType", houseIntentionType);
	}

	@Override
	public int selectHouseIntentionTypeCount(HouseIntentionType houseIntentionType) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionTypeDao.selectHouseIntentionTypeCount", houseIntentionType);
	}

}
