package com.gjp.service;

import com.gjp.dao.BusinesTypeDao;
import com.gjp.model.BusinesTypeVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class BusinesTypeService {

	private @Resource BusinesTypeDao businesTypeDao;

	/**
	 * 查询产品库类型字典
	 * 
	 * @param businesTypeVo
	 * @return
	 */
	public List<BusinesTypeVo> queryBusinesType(BusinesTypeVo businesTypeVo) {
		return businesTypeDao.queryBusinesType(businesTypeVo);
	}

}
