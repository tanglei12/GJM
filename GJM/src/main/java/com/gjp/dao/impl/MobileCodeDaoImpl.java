package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.MobileCodeDao;
import com.gjp.model.MobileCode;
import org.springframework.stereotype.Repository;

/**
* 验证码
* 
* @author 王孝元
* @version 创建时间：2017年3月20日 下午2:46:40
* 
*/
@Repository
public class MobileCodeDaoImpl extends BaseDAO implements MobileCodeDao {

	@Override
	public int addMobileCode(MobileCode mc) {
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.MobileCodeDao.addMobileCode", mc);
	}

	@Override
	public int updateMobileCode(MobileCode mc) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.MobileCodeDao.updateMobileCode", mc);
	}

	@Override
	public MobileCode queryMobileCodeByProperty(MobileCode mobileCode) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.MobileCodeDao.queryMobileCodeByProperty", mobileCode);
	}

	@Override
	public int deleteMobieCodeById(Integer mc_id) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.MobileCodeDao.deleteMobieCodeById", mc_id);
	}

}
