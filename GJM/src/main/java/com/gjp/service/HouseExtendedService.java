package com.gjp.service;

import com.gjp.dao.HouseExtendedDao;
import com.gjp.model.HouseHouseExtended;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 房屋扩展信息service
 * 
 * @author zoe
 *
 */
@Service
public class HouseExtendedService {
	@Resource
	private HouseExtendedDao houseExtendedDao;

	/**
	 * ajax查询房屋扩展信息
	 * 
	 * @param id
	 * @return
	 */
	public HouseHouseExtended selectHouseExtendedById(int id) {
		return houseExtendedDao.selectHouseExtendedById(id);
	}

	/**
	 * ajax查询房屋扩展信息List
	 * 
	 * @return
	 */
	public List<HouseHouseExtended> selectHouseHouseExtendedList() {
		return houseExtendedDao.selectHouseHouseExtendedList();
	}

	/**
	 * 添加房屋扩展信息
	 * 
	 * @param houseHouseExtended
	 * @return
	 */
	public int addHouseExtended(HouseHouseExtended houseHouseExtended) {
		return houseExtendedDao.addHouseExtended(houseHouseExtended);
	}

	/**
	 * 查询房屋扩展信息编号
	 * 
	 * @param houseHouseExtended
	 * @return
	 */
	public int selectHe_id(HouseHouseExtended houseHouseExtended) {
		return houseExtendedDao.selectHe_id(houseHouseExtended);
	}

	/**
	 * 根据id查询房屋扩展信息
	 * 
	 * @param he_id
	 * @return
	 */
	public HouseHouseExtended selectHouseHouseExtendedById(Integer he_id) {
		return houseExtendedDao.selectHouseHouseExtendedById(he_id);
	}

	/**
	 * 分页查询房屋扩展信息
	 * 
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	public PageModel<HouseHouseExtended> selectHouseHouseExtended(int pageNo, int pageSize, HouseModel houseModel) {
		return houseExtendedDao.selectHouseHouseExtended(pageNo, pageSize, houseModel);
	}

	/**
	 * 修改房屋扩展信息
	 * 
	 * @param houseHouseExtended
	 * @return
	 */
	public int updataInfo(HouseHouseExtended houseHouseExtended) {
		return houseExtendedDao.updataInfo(houseHouseExtended);
	}

	/**
	 * 修改房屋为已租
	 * 
	 * @author zoe
	 * @param houseHouseExtended
	 * @return
	 */
	public int updateSta(HouseHouseExtended houseHouseExtended) {
		return houseExtendedDao.updateSta(houseHouseExtended);
	}

}
