package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseInformationStateDAO;
import com.gjp.model.HouseHouseInformation;
import com.gjp.model.HouseInfoKeep;
import com.gjp.model.HouseInformationState;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HouseInformationStateDAOImpl extends BaseDAO implements HouseInformationStateDAO {

	@Override
	public Integer addHouseInformationState(HouseInformationState houseInformationState) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseInformationStateDAO.addHouseInformationState", houseInformationState);
	}

	@Override
	public Integer updateHouseInformationState(HouseInformationState houseInformationState) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseInformationStateDAO.updateHouseInformationState", houseInformationState);
	}

	@Override
	public List<HouseInfoKeep> selectHouseHouseInformationKeep() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseInformationStateDAO.selectHouseHouseInformationKeep");
	}

	@Override
	public List<HouseHouseInformation> selectHouseHouseInformation() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseInformationStateDAO.selectHouseHouseInformation");
	}

	@Override
	public List<HouseInformationState> selectHouseInformationStateSpid() {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseInformationStateDAO.selectHouseInformationStateSpid");
	}

}
