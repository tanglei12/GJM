package com.gjp.dao;

import com.gjp.model.HouseHouseInformation;
import com.gjp.model.HouseInfoKeep;
import com.gjp.model.HouseInformationState;

import java.util.List;

/**
 * 房屋状态
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年7月1日 下午3:09:02
 */
public interface HouseInformationStateDAO {

	/**
	 * 添加房屋状态信息
	 * 
	 * @param houseInformationState
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addHouseInformationState(HouseInformationState houseInformationState);

	/**
	 * 修改房屋状态
	 * 
	 * @param houseInformationState
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateHouseInformationState(HouseInformationState houseInformationState);

	/**
	 * 查询库存房屋
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<HouseInfoKeep> selectHouseHouseInformationKeep();

	/**
	 * 查询线上房屋
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<HouseHouseInformation> selectHouseHouseInformation();

	List<HouseInformationState> selectHouseInformationStateSpid();
}
