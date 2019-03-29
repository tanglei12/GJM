package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.PriceSettingDAO;
import com.gjp.model.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PriceSettingDAOImpl extends BaseDAO implements PriceSettingDAO {

	@Override
	public Integer insertSetting(PriceSetting priceSetting) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.PriceSettingDAO.insertSetting", priceSetting);
	}

	@Override
	public List<PriceSetting> selectSettingAll() {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PriceSettingDAO.selectSettingAll");
	}

	@Override
	public Integer deleteSetting(PriceSetting priceSetting) {
		return sqlSessionTemplateProduct.delete("com.gjp.dao.PriceSettingDAO.deleteSetting", priceSetting);
	}

	@Override
	public Integer insertPriceSettingType(PriceSettingType priceSettingType) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.PriceSettingDAO.insertPriceSettingType", priceSettingType);
	}

	@Override
	public Integer updatePriceSettingTypeBool(PriceSettingType priceSettingType) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.PriceSettingDAO.updatePriceSettingTypeBool", priceSettingType);
	}

	@Override
	public List<PriceSettingType> selectPriceSettingTypeAll() {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PriceSettingDAO.selectPriceSettingTypeAll");
	}

	@Override
	public Integer deletePriceSettingType(PriceSettingType priceSettingType) {
		return sqlSessionTemplateProduct.delete("com.gjp.dao.PriceSettingDAO.deletePriceSettingType", priceSettingType);
	}

	@Override
	public Integer insertPriceSettingContent(PriceSettingContent priceSettingContent) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.PriceSettingDAO.insertPriceSettingContent", priceSettingContent);
	}

	@Override
	public List<PriceSettingContent> selectPriceSettingContentWhere(PriceSettingContent priceSettingContent) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PriceSettingDAO.selectPriceSettingContentWhere", priceSettingContent);
	}

	@Override
	public Integer deletePriceSettingContent(PriceSettingContent priceSettingContent) {
		return sqlSessionTemplateProduct.delete("com.gjp.dao.PriceSettingDAO.deletePriceSettingContent", priceSettingContent);
	}

	@Override
	public List<PriceSetting> selectSettingWhereDay(PriceSetting priceSetting) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PriceSettingDAO.selectSettingWhereDay", priceSetting);
	}

	@Override
	public Integer updatehouseKeep(HouseInfoKeep houseInfoKeep) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.PriceSettingDAO.updatehouseKeep", houseInfoKeep);
	}

	@Override
	public Integer insertPriceMoney(PriceMoney priceMoney) {
		return sqlSessionTemplateProduct.insert("com.gjp.dao.PriceSettingDAO.insertPriceMoney", priceMoney);
	}

	@Override
	public Integer updatePriceMoney(PriceMoney priceMoney) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.PriceSettingDAO.updatePriceMoney", priceMoney);
	}

	@Override
	public Integer updatehouseKeepActive(HouseInfoKeep houseInfoKeep) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.PriceSettingDAO.updatehouseKeepActive", houseInfoKeep);
	}

	@Override
	public List<PriceSettingType> selectPriceSettingTypeWhere(PriceSettingType priceSettingType) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.PriceSettingDAO.selectPriceSettingTypeWhere", priceSettingType);
	}

	@Override
	public Integer updatePriceSettingType(PriceSettingType priceSettingType) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.PriceSettingDAO.updatePriceSettingType", priceSettingType);
	}

	@Override
	public PriceMoney selectPriceMoney(PriceMoney priceMoney) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.PriceSettingDAO.selectPriceMoney", priceMoney);
	}

}
