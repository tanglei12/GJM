package com.gjp.dao;


import com.gjp.model.HouseAppointment;
import com.gjp.model.Trusteeship;
import com.gjp.util.PageModel;

/**
 * 托管申请
 * @author zoe
 *
 */
public interface DepositHouseDao {

	/**
	 * 查询分页实体
	 * @author zoe
	 * @param pageNo
	 * @param cookies
	 * @param houseState 
	 * @return
	 */
	PageModel<Trusteeship> selectTrusteeships(PageModel<Trusteeship> pageModel);

	/**
	 *  查询预约看房
	 * @author zoe
	 * @param pageNo
	 * @param cookies
	 * @param houseState 
	 * @return
	 */
	PageModel<HouseAppointment> selectHouseAppointment(PageModel<HouseAppointment> pageModel);

	/**
	 * 修改托管状态
	 * @author zoe
	 * @param trusteeship
	 * @return
	 */
	int updateHe(Trusteeship trusteeship);

	/**
	 * 修改预约状态
	 * @author zoe
	 * @param houseAppointment
	 * @return
	 */
	int updateBespeakHe(HouseAppointment houseAppointment);

	/**
	 * 查询房屋地址根据房屋编号
	 * @author zoe
	 * @param hi_id
	 * @return
	 */
	HouseAppointment selectHouseAddById(Integer hi_id);

	/**
	 * 查询单条托管申请
	 * @author zoe
	 * @param trusteeship
	 * @return
	 */
	Trusteeship selectTrusteeship(Trusteeship trusteeship);

	/**
	 * 查询单条预约申请
	 * @author zoe
	 * @param houseAppointment
	 * @return
	 */
	HouseAppointment selectBespeakHe(HouseAppointment houseAppointment);

	

}
