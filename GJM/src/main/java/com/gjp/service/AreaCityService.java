package com.gjp.service;

import com.gjp.dao.AreaCityDAO;
import com.gjp.model.AreaCityStreet;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 城市列表
 * @author tanglei
 * data 2017年8月14日 下午16:12:40
 */
@Service
public class AreaCityService {
	@Resource
	private AreaCityDAO areaCityDAO;
	
	/**
	 * 查询重庆区县
	 * @author tanglei
	 * data 2017年8月14日 下午16:22:40
	 */
	public List<AreaCityStreet> queryAreaCity(AreaCityStreet areaCity){
		return areaCityDAO.queryAreaCity(areaCity);
	}

}
