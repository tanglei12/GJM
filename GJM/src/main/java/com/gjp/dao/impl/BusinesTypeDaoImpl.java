package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.BusinesTypeDao;
import com.gjp.model.BusinesTypeVo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BusinesTypeDaoImpl extends BaseDAO implements BusinesTypeDao {

	@Override
	public List<BusinesTypeVo> queryBusinesType(BusinesTypeVo businesTypeVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.BusinesTypeDao.queryBusinesType", businesTypeVo);
	}

}
