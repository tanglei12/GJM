package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseInformationStateRelationDAO;
import com.gjp.model.HouseInformationStateRelation;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年7月1日 下午3:18:30 
 */
@Repository
public class HouseInformationStateRelationDAOImpl extends BaseDAO implements HouseInformationStateRelationDAO{

	@Override
	public Integer addHouseInformationStateRelation(HouseInformationStateRelation houseInformationStateRelation) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseInformationStateRelationDAO.addHouseInformationStateRelation", houseInformationStateRelation);
	}

	@Override
	public List<HouseInformationStateRelation> selectHouseInformationStateRelation(
			HouseInformationStateRelation houseInformationStateRelation) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseInformationStateRelationDAO.selectHouseInformationStateRelation", houseInformationStateRelation);
	}

	@Override
	public Integer deleteHouseInformationStateRelation(String hi_code) {
		return super.sqlSessionTemplateProduct.delete("com.gjp.dao.HouseInformationStateRelationDAO.deleteHouseInformationStateRelation", hi_code);
	}

}
