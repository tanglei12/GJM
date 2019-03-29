package com.gjp.dao;

import com.gjp.model.ApartmentType;
import com.gjp.model.HouseBrandWhere;
import com.gjp.model.HouseBrandWhereExtended;
import com.gjp.model.HouseHouseBrand;
import com.gjp.util.PageModel;

import java.util.List;

/**
 * 房屋品牌
 * @author zoe
 *
 */
public interface HouseHouseBrandDao {

	/**
	 * 查询房屋品牌List
	 * @return
	 */
	List<HouseHouseBrand> selectHouseHouseBrandList();

	/**
	 * 添加房屋品牌
	 * @param houseHouseBrand
	 * @return
	 */
	int addHouseBrand(HouseHouseBrand houseHouseBrand);

	/**
	 * 查询房屋品牌编码
	 * @param houseHouseBrand
	 * @return
	 */
	int selectHb_id(HouseHouseBrand houseHouseBrand);

	/**
	 * ajax分页查询房屋品牌List
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	PageModel<HouseHouseBrand> selectHouseHouseBrand(PageModel<HouseHouseBrand> pageModel);

	/**
	 * 根据id查询房屋品牌
	 * @param recommendGroup_Id
	 * @return
	 */
	HouseHouseBrand selectHouseHouseBrandById(int hb_id);

	/**
	 * 修改房屋品牌
	 * @param houseHouseBrand
	 * @return
	 */
	int updataInfo(HouseHouseBrand houseHouseBrand);

	/**
	 * 添加房屋品牌条件
	 * @param houseBrandWhere
	 * @return
	 */
	int addHouseBrandWhere(HouseBrandWhere houseBrandWhere);

	/**
	 * 添加品牌条件扩展
	 * @param houseBrandWhereExtended
	 * @return
	 */
	int addHouseBrandWhereExtended(
			HouseBrandWhereExtended houseBrandWhereExtended);

	/**
	 * 查询品牌条件
	 * @param hb_id
	 * @return
	 */
	List<HouseBrandWhere> selectBrandWhere(int hb_id);

	/**
	 * 查询品牌条件扩展
	 * @param bw_id
	 * @return
	 */
	List<HouseBrandWhereExtended> selectHouseBrandWhereExtended(Integer bw_id);

	/**
	 * 根据品牌条件编号删除品牌条件扩展
	 * @param bw_id
	 * @return
	 */
	int deleteHouseBrandWhereExtended(Integer bw_id);

	/**
	 * 查询公寓类型
	 * @author zoe
	 * @return
	 */
	List<String> selectVersions();

	/**
	 * 查询固定品牌编码
	 * @author zoe
	 * @param hi_version
	 * @return
	 */
	String selectType(String hi_version);

	/**
	 * 添加公寓类型
	 * @author zoe
	 * @param apartmentType
	 * @return
	 */
	int addBrandType(ApartmentType apartmentType);

	
}
