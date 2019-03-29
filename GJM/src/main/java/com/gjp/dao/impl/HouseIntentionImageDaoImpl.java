package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseIntentionImageDao;
import com.gjp.model.HouseIntentionImage;
import com.gjp.model.HouseIntentionImageType;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 意向房源
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月24日 下午4:54:56
 */
@Repository
public class HouseIntentionImageDaoImpl extends BaseDAO implements HouseIntentionImageDao {

	@Override
	public HouseIntentionImage selectHouseIntentionImagePage(HouseIntentionImage houseIntentionImage) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionImageDao.selectHouseIntentionImagePage", houseIntentionImage);
	}

	@Override
	public HouseIntentionImage selectHouseIntentionImage(HouseIntentionImage houseIntentionImage) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseIntentionImageDao.selectHouseIntentionImagePage", houseIntentionImage);
	}

	@Override
	public int updateHouseIntentionImageHimType(HouseIntentionImage houseIntentionImage) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HouseIntentionImageDao.updateHouseIntentionImageHimType", houseIntentionImage);
	}

	@Override
	public int updateHouseIntentionImageTypehintType(HouseIntentionImageType houseIntentionImageType) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HouseIntentionImageDao.updateHouseIntentionImageTypehintType", houseIntentionImageType);
	}

	@Override
	public List<HouseIntentionImage> selectHouseIntentionImageList(HouseIntentionImage houseIntentionImage) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseIntentionImageDao.selectHouseIntentionImageList", houseIntentionImage);
	}
}
