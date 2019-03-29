package com.gjp.dao;

import com.gjp.model.HouseIntentionType;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月20日 下午3:31:57
 */
public interface HouseIntentionTypeDao {
	/**
	 * 根据房源编码（hi_code）查询改意向房源的跟进内容记录信息
	 * @author zoe
	 * @param houseIntentionType
	 * @return
	 */
	List<HouseIntentionType> selectHouseIntentionTypeList(HouseIntentionType houseIntentionType);
	
	/**
	 * 添加意向房源跟进内容记录信息
	 * @author zoe
	 * @param houseIntentionType
	 * @return
	 */
	int insertHouseIntentionType(HouseIntentionType houseIntentionType);
	
	
	/**
	 * 据房源编码（hi_code）查询改意向房源的跟进内容记录数量
	 * @author zoe
	 * @param houseIntentionType
	 * @return
	 */
	int selectHouseIntentionTypeCount(HouseIntentionType houseIntentionType);
}
