package com.gjp.dao;

import com.gjp.model.BusinesTypeVo;

import java.util.List;

public interface BusinesTypeDao {

	/**
	 * 查询产品库类型字典
	 * 
	 * @param businesTypeVo
	 * @return
	 */
	List<BusinesTypeVo> queryBusinesType(BusinesTypeVo businesTypeVo);

}
