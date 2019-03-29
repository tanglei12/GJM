package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.PowersDao;
import com.gjp.model.Powers;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
* 实现类
*
* @author 王孝元
*
* @version 创建时间：2016年10月23日 上午10:13:05
*
*/
@Repository
public class PowersDaoImpl extends BaseDAO implements PowersDao{

	@Override
	public List<Powers> selectAllPowers() {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.PowersDao.selectAllPowers");
	}

	@Override
	public List<Powers> getChildsByPid(Integer pid) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.PowersDao.getChildsByPid",pid);
	}

	@Override
	public List<Powers> getLiveChildsByPid(Integer pid) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.PowersDao.getLiveChildsByPid",pid);
	}

	@Override
	public int addPowers(Powers p){
		return super.sqlSessionTemplateUser.insert("com.gjp.dao.PowersDao.addPowers", p);
	}

	@Override
	public int updatePowers(Powers p) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.PowersDao.updatePowers", p);

	}

	@Override
	public int deletePowers(Integer id) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.PowersDao.deletePowers", id);
	}

	@Override
	public int deleteFromCompanyPowers(Integer id) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.PowersDao.deleteFromCompanyPowers", id);
	}

	@Override
	public int deleteFromPersonPowers(Integer id) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.PowersDao.deleteFromPersonPowers", id);
	}

	@Override
	public int deleteFromPositionPowers(Integer id) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.PowersDao.deleteFromPositionPowers", id);
	}

	@Override
	public int deleteFromRolePowers(Integer id) {
		return super.sqlSessionTemplateUser.delete("com.gjp.dao.PowersDao.deleteFromRolePowers", id);
	}

	@Override
	public Powers getPowersById(Integer id) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.PowersDao.getPowersById", id);
	}

	@Override
	public Integer selectMaxOrder(Integer pid) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.PowersDao.selectMaxOrder", pid);
	}

	@Override
	public int closePowers(Integer id) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.PowersDao.closePowers", id);
	}

	@Override
	public int openPowers(Integer id) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.PowersDao.openPowers", id);
	}

	@Override
	public int findPowersAsc(Integer id) {
		return super.sqlSessionTemplateUser.selectOne("com.gjp.dao.PowersDao.findPowersAsc", id);
	}

	@Override
	public int updatePowersAsc(Powers p) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.PowersDao.updatePowersAsc", p);
	}

	@Override
	public List<Powers> selectPowersByProperty(Powers p) {
		return super.sqlSessionTemplateUser.selectList("com.gjp.dao.PowersDao.selectPowersByProperty", p);
	}

	@Override
	public int moveDownOneStep(Powers p) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.PowersDao.moveDownOneStep", p);
	}
	@Override
	public int moveUpOneStep(Powers p) {
		return super.sqlSessionTemplateUser.update("com.gjp.dao.PowersDao.moveUpOneStep", p);
	}
}
