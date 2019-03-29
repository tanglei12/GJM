package com.gjp.dao.impl;

import com.gjp.dao.AreaCityDAO;
import com.gjp.dao.BaseDAO;
import com.gjp.model.AreaCityStreet;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class AreaCityDAOImpl extends BaseDAO implements AreaCityDAO{

	@Override
	public List<AreaCityStreet> queryAreaCity(AreaCityStreet areaCity) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.AreaCityDAO.queryAreaCity", areaCity);
	}

}
