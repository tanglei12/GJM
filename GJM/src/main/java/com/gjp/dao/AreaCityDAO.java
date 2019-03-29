package com.gjp.dao;

import com.gjp.model.AreaCityStreet;

import java.util.List;

public interface AreaCityDAO {
	
	/**
	 * 查询重庆区县
	 * @author tanglei
	 * data 2017年8月14日 下午16:22:40
	 */
	List<AreaCityStreet> queryAreaCity(AreaCityStreet areaCity);

}
