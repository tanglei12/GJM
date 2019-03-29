package com.gjp.dao.impl;


import com.gjp.dao.BaseDAO;
import com.gjp.dao.DepositHouseDao;
import com.gjp.model.HouseAppointment;
import com.gjp.model.Trusteeship;
import com.gjp.util.PageModel;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 托管申请ImplDao
 * @author zoe
 *
 */
@Repository
public class DepositHouseDaoImpl extends BaseDAO implements DepositHouseDao {

	@Override
	public PageModel<Trusteeship> selectTrusteeships(PageModel<Trusteeship> pageModel) {
		
		List<Trusteeship> trusteeship = sqlSessionTemplateProduct.selectList("com.gjp.dao.DepositHouseDao.selectTrusteeships", pageModel);
		int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.DepositHouseDao.selectTrusteeshipTotal", pageModel);
		pageModel.setList(trusteeship);
		pageModel.setTotalRecords(totalRecords);
		
		return pageModel;
	}

	@Override
	public PageModel<HouseAppointment> selectHouseAppointment(PageModel<HouseAppointment> pageModel) {
		
		List<HouseAppointment> houseAppointment = sqlSessionTemplateProduct.selectList("com.gjp.dao.DepositHouseDao.selectHouseAppointment", pageModel);
		int totalRecords = sqlSessionTemplateProduct.selectOne("com.gjp.dao.DepositHouseDao.selectHouseAppointmentTotal", pageModel);
		pageModel.setList(houseAppointment);
		pageModel.setTotalRecords(totalRecords);
		
		return pageModel;
	}

	@Override
	public int updateHe(Trusteeship trusteeship) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.DepositHouseDao.updateHe",trusteeship);
	}

	@Override
	public int updateBespeakHe(HouseAppointment houseAppointment) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.DepositHouseDao.updateBespeakHe",houseAppointment);
	}

	@Override
	public HouseAppointment selectHouseAddById(Integer hi_id) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.DepositHouseDao.selectHouseAddById",hi_id);
	}

	@Override
	public Trusteeship selectTrusteeship(Trusteeship trusteeship) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.DepositHouseDao.selectTrusteeship",trusteeship);
	}

	@Override
	public HouseAppointment selectBespeakHe(HouseAppointment houseAppointment) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.DepositHouseDao.selectBespeakHe",houseAppointment);
	}

}
