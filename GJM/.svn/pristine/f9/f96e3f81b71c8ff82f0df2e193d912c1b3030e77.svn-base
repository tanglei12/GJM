package com.gjp.service;

import com.gjp.dao.HouseHouseBrandDao;
import com.gjp.model.ApartmentType;
import com.gjp.model.HouseBrandWhere;
import com.gjp.model.HouseBrandWhereExtended;
import com.gjp.model.HouseHouseBrand;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 房屋品牌service
 * @author zoe
 *
 */
@Service
public class HouseHouseBrandService {
	
	@Resource
	private HouseHouseBrandDao houseHouseBrandDao;

	/**
	 * 查询房屋品牌List
	 * @return
	 */
	public List<HouseHouseBrand> selectHouseHouseBrandList() {
		return houseHouseBrandDao.selectHouseHouseBrandList();
	}

	/**
	 * 添加房屋品牌
	 * @param houseHouseBrand
	 * @return
	 */
	public int addHouseBrand(HouseHouseBrand houseHouseBrand) {
		return houseHouseBrandDao.addHouseBrand(houseHouseBrand);
	}

	/**
	 * 查询房屋品牌编码
	 * @param houseHouseBrand
	 * @return
	 */
	public int selectHb_id(HouseHouseBrand houseHouseBrand) {
		return houseHouseBrandDao.selectHb_id(houseHouseBrand);
	}

	/**
	 * ajax分页查询房屋品牌List
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	public PageModel<HouseHouseBrand> selectHouseHouseBrand(PageModel<HouseHouseBrand> pageModel) {
		return houseHouseBrandDao.selectHouseHouseBrand(pageModel);
	}

	/**
	 * ajax根据id查询房屋品牌
	 * @param recommendGroup_Id
	 * @return
	 */
	public HouseHouseBrand selectHouseHouseBrandById(int hb_id) {
		return houseHouseBrandDao.selectHouseHouseBrandById(hb_id);
	}

	/**
	 * 修改房屋品牌
	 * @param houseHouseBrand
	 * @return
	 */
	public int updataInfo(HouseHouseBrand houseHouseBrand) {
		return houseHouseBrandDao.updataInfo(houseHouseBrand);
	}

	/**
	 * 添加房屋品牌条件
	 * @param houseBrandWhere
	 * @return
	 */
	public int addHouseBrandWhere(HouseBrandWhere houseBrandWhere) {
		return houseHouseBrandDao.addHouseBrandWhere(houseBrandWhere);
	}

	/**
	 * 添加品牌条件扩展
	 * @param houseBrandWhereExtended
	 * @return
	 */
	public int addHouseBrandWhereExtended(
			HouseBrandWhereExtended houseBrandWhereExtended) {
		return houseHouseBrandDao.addHouseBrandWhereExtended(houseBrandWhereExtended);
	}

	/**
	 * 查询品牌条件
	 * @param hb_id
	 * @return
	 */
	public List<HouseBrandWhere> selectBrandWhere(int hb_id) {
		return houseHouseBrandDao.selectBrandWhere(hb_id);
	}

	/**
	 * 查询品牌条件扩展
	 * @param bw_id
	 * @return
	 */
	public List<HouseBrandWhereExtended> selectHouseBrandWhereExtended(
			Integer bw_id) {
		return houseHouseBrandDao.selectHouseBrandWhereExtended(bw_id);
	}

	/**
	 * 根据品牌条件编号删除品牌条件扩展
	 * @param bw_id
	 * @return
	 */
	public int deleteHouseBrandWhereExtended(Integer bw_id) {
		return houseHouseBrandDao.deleteHouseBrandWhereExtended(bw_id);
	}

	/**
	 * 查询公寓类型
	 * @author zoe
	 * @return
	 */
	public List<String> selectVersions() {
		return houseHouseBrandDao.selectVersions();
	}

	/**
	 * 查询固定品牌编码
	 * @author zoe
	 * @param hi_version
	 * @return
	 */
	public String selectType(String hi_version) {
		return houseHouseBrandDao.selectType(hi_version);
	}

	/**
	 * 添加公寓类型
	 * @author zoe
	 * @param apartmentType
	 * @return
	 */
	public int addBrandType(ApartmentType apartmentType) {
		return houseHouseBrandDao.addBrandType(apartmentType);
	}

	
}
