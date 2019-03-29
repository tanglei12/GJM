package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.PropertyTransferDao;
import com.gjp.model.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 物业交接单ImplDao
 * 
 * @author zoe
 *
 */
@Repository
public class PropertyTransferDaoImpl extends BaseDAO implements PropertyTransferDao {

	@Override
	public PropertyTransfer selectPropertyTransferByHiCode(PropertyTransfer transfer) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.PropertyTransferDao.selectPropertyTransferByHiCode", transfer);
	}

	@Override
	public HandoverPropertyMainVo queryHandoverPropertyMain(HandoverPropertyMainVo propertyMainVo) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.PropertyTransferDao.queryHandoverPropertyMain", propertyMainVo);
	}

	@Override
	public List<HandoverPropertyEnergyCardVo> queryHandoverPropertyEnergyCardList(HandoverPropertyEnergyCardVo energyCardVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.PropertyTransferDao.queryHandoverPropertyEnergyCardList", energyCardVo);
	}

	@Override
	public List<HandoverPropertyEnergyValueVo> queryHandoverPropertyEnergyValueList(HandoverPropertyEnergyValueVo energyValueVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.PropertyTransferDao.queryHandoverPropertyEnergyValueList", energyValueVo);
	}

	@Override
	public List<HandoverPropertyGoodsVo> queryHandoverPropertyGoodsList(HandoverPropertyGoodsVo propertyGoodsVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.PropertyTransferDao.queryHandoverPropertyGoodsList", propertyGoodsVo);
	}

	@Override
	public List<HandoverPropertyDecorationVo> queryHandoverPropertyDecorationList(HandoverPropertyDecorationVo propertyDecorationVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.PropertyTransferDao.queryHandoverPropertyDecorationList", propertyDecorationVo);
	}

	@Override
	public int addHandoverPropertyMain(HandoverPropertyMainVo propertyMain) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.PropertyTransferDao.addHandoverPropertyMain", propertyMain);
	}

	@Override
	public int updateHandoverPropertyMain(HandoverPropertyMainVo propertyMain) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.PropertyTransferDao.updateHandoverPropertyMain", propertyMain);
	}

	@Override
	public int deleteHandPropertyEnergyCard(HandoverPropertyEnergyCardVo propertyEnergyCardVo) {
		return sqlSessionTemplateBusiness.delete("com.gjp.dao.PropertyTransferDao.deleteHandPropertyEnergyCard", propertyEnergyCardVo);
	}

	@Override
	public int deleteHandPropertyEnergyValue(HandoverPropertyEnergyValueVo propertyEnergyValueVo) {
		return sqlSessionTemplateBusiness.delete("com.gjp.dao.PropertyTransferDao.deleteHandPropertyEnergyValue", propertyEnergyValueVo);
	}

	@Override
	public int addHandPropertyEnergyCard(HandoverPropertyEnergyCardVo propertyEnergyCardVo) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.PropertyTransferDao.addHandPropertyEnergyCard", propertyEnergyCardVo);
	}

	@Override
	public int deleteHandPropertyGoods(HandoverPropertyGoodsVo propertyGoodsVo) {
		return sqlSessionTemplateBusiness.delete("com.gjp.dao.PropertyTransferDao.deleteHandPropertyGoods", propertyGoodsVo);
	}

	@Override
	public int deleteHandPropertyDecoration(HandoverPropertyDecorationVo propertyDecorationVo) {
		return sqlSessionTemplateBusiness.delete("com.gjp.dao.PropertyTransferDao.deleteHandPropertyDecoration", propertyDecorationVo);
	}

	@Override
	public int addHandPropertyEnergyValue(HandoverPropertyEnergyValueVo propertyEnergyValueVo) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.PropertyTransferDao.addHandPropertyEnergyValue", propertyEnergyValueVo);
	}

	@Override
	public int addHandPropertyGoods(HandoverPropertyGoodsVo propertyGoodsVo) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.PropertyTransferDao.addHandPropertyGoods", propertyGoodsVo);
	}

	@Override
	public int addHandPropertyDecoration(HandoverPropertyDecorationVo propertyDecorationVo) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.PropertyTransferDao.addHandPropertyDecoration", propertyDecorationVo);
	}

	@Override
	public List<HandoverPropertyEnergyCardVo> queryHandoverPropertyEnergyCardValueList(HandoverPropertyEnergyCardVo energyCardVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.PropertyTransferDao.queryHandoverPropertyEnergyCardValueList", energyCardVo);
	}

	@Override
	public int updateHandoverPropertyEnergyCard(HandoverPropertyEnergyCardVo energyCardVo) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.PropertyTransferDao.updateHandoverPropertyEnergyCard", energyCardVo);
	}

	@Override
	public int updateHandoverPropertyMainForState(HandoverPropertyMainVo propertyMain) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.PropertyTransferDao.updateHandoverPropertyMainForState", propertyMain);
	}

}
