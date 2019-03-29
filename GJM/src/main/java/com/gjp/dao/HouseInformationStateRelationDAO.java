package com.gjp.dao;

import com.gjp.model.HouseInformationStateRelation;

import java.util.List;

public interface HouseInformationStateRelationDAO {

	/**
	 * 添加房屋类型关联表
	 * 
	 * @param houseInformationStateRelation
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addHouseInformationStateRelation(HouseInformationStateRelation houseInformationStateRelation);
	
	/**
	 * 查询房屋状态
	 * 
	 * @param houseInformationStateRelation
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<HouseInformationStateRelation> selectHouseInformationStateRelation(HouseInformationStateRelation houseInformationStateRelation);
	
	/**
	 * 删除房屋类型关联表
	 * 
	 * @param houseInformationStateRelation
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer deleteHouseInformationStateRelation(String hi_code);
}
