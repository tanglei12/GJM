package com.gjp.service;


import com.gjp.dao.DepositHouseDao;
import com.gjp.model.HouseAppointment;
import com.gjp.model.Trusteeship;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 托管申请service
 * 
 * @author zoe
 *
 */
@Service
public class DepositHouseService {
	
	
	@Resource
	private DepositHouseDao depositHouseDao;

	/**
	 * 查询托管分页实体
	 * @author zoe
	 * @param pageNo
	 * @param cookies
	 * @param houseState 
	 * @return
	 */
	public PageModel<Trusteeship> selectTrusteeships(PageModel<Trusteeship> pageModel) {
		return depositHouseDao.selectTrusteeships(pageModel);
	}

	/**
	 * 查询预约看房
	 * @author zoe
	 * @param pageNo
	 * @param cookies
	 * @param houseState 
	 * @return
	 */
	public PageModel<HouseAppointment> selectHouseAppointment(PageModel<HouseAppointment> pageModel) {
		return depositHouseDao.selectHouseAppointment(pageModel);
	}

	/**
	 * 修改托管状态
	 * @author zoe
	 * @param trusteeship
	 * @return
	 */
	public int updateHe(Trusteeship trusteeship) {
		return depositHouseDao.updateHe(trusteeship);
	}

	/**
	 * 
	 * 修改预约状态
	 * @author zoe
	 * @param houseAppointment
	 * @return
	 */
	public int updateBespeakHe(HouseAppointment houseAppointment) {
		return depositHouseDao.updateBespeakHe(houseAppointment);
	}

	/**
	 * 查询房屋地址根据房屋编号
	 * @author zoe
	 * @param hi_id
	 * @return
	 */
	public HouseAppointment selectHouseAddById(Integer hi_id) {
		return depositHouseDao.selectHouseAddById(hi_id);
	}

	/**
	 * 查询单条托管申请
	 * @author zoe
	 * @param trusteeship
	 * @return
	 */
	public Trusteeship selectTrusteeship(Trusteeship trusteeship) {
		return depositHouseDao.selectTrusteeship(trusteeship);
	}

	/**
	 * 查询单条预约申请
	 * @author zoe
	 * @param houseAppointment
	 * @return
	 */
	public HouseAppointment selectBespeakHe(HouseAppointment houseAppointment) {
		return depositHouseDao.selectBespeakHe(houseAppointment);
	}


	
}
