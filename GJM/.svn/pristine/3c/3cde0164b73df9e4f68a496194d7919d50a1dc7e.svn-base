package com.gjp.dao;

import com.gjp.model.HouseHouseExtended;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;

import java.util.List;

/**
 * 房屋扩展信息
 * @author zoe
 *
 */
public interface HouseExtendedDao {

	/**
	 * 根据id查询房屋扩展信息
	 * @param id
	 * @return
	 */
	HouseHouseExtended selectHouseExtendedById(int id);

	/**
	 * 查询房屋扩展信息List
	 * @return
	 */
	List<HouseHouseExtended> selectHouseHouseExtendedList();

	/**
	 * 添加房屋扩展信息
	 * @param houseHouseExtended
	 * @return
	 */
	int addHouseExtended(HouseHouseExtended houseHouseExtended);

	/**
	 * 查询房屋扩展信息编号
	 * @param houseHouseExtended
	 * @return
	 */
	int selectHe_id(HouseHouseExtended houseHouseExtended);

	/**
	 * 根据id查询房屋扩展信息
	 * @param he_id
	 * @return
	 */
	HouseHouseExtended selectHouseHouseExtendedById(Integer he_id);

	/**
	 * 分页查询房屋扩展信息
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	PageModel<HouseHouseExtended> selectHouseHouseExtended(int pageNo,
			int pageSize, HouseModel houseModel);

	/**
	 * 修改房屋基本信息
	 * @param houseHouseExtended
	 * @return
	 */
	
	int updataInfo(HouseHouseExtended houseHouseExtended);

	/**
	 *  修改房屋为已租
	 * @author zoe
	 * @param houseHouseExtended
	 * @return
	 */
	int updateSta(HouseHouseExtended houseHouseExtended);

}
