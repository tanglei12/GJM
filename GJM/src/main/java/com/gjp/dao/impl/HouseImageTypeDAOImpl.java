package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseImageTypeDAO;
import com.gjp.model.HouseHouseImageType;
import com.gjp.model.HouseImageType;
import com.gjp.model.HouseIntentionImageType;
import com.gjp.model.HouseLibraryImageTypeVo;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 图片类型DaoImpl
 * 
 * @author zoe
 *
 */
@Repository
public class HouseImageTypeDAOImpl extends BaseDAO implements HouseImageTypeDAO {

	@Override
	public Integer addHouseImageType(HouseHouseImageType houseHouseImageType) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseImageTypeDAO.addHouseImageType", houseHouseImageType);
	}

	@Override
	public List<Integer> selectHmIdByHiId(int hi_ids) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseImageTypeDAO.selectHmIdByHiId", hi_ids);
	}

	@Override
	public int addHouseIntentionImageType(HouseIntentionImageType houseIntentionImageType) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseImageTypeDAO.addHouseIntentionImageType", houseIntentionImageType);
	}

	@Override
	public int deleteHouseIntentionImageType(int him_id) {
		return super.sqlSessionTemplateProduct.delete("com.gjp.dao.HouseImageTypeDAO.deleteHouseIntentionImageType", him_id);
	}

	@Override
	public int deleteImageType(Integer hm_id) {
		return super.sqlSessionTemplateProduct.delete("com.gjp.dao.HouseImageTypeDAO.deleteImageType", hm_id);
	}

	@Override
	public List<HouseIntentionImageType> selectImageTypeById(int phi_id) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseImageTypeDAO.selectImageTypeById", phi_id);
	}

	@Override
	public int updata(HouseIntentionImageType houseIntentionmage) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.HouseImageTypeDAO.updatas", houseIntentionmage);
	}

	@Override
	public List<HouseIntentionImageType> selectImage(int hi_id) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseImageTypeDAO.selectImage", hi_id);
	}

	@Override
	public List<HouseHouseImageType> selectHouseImage(int hi_id) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseImageTypeDAO.selectHouseImage", hi_id);
	}

	@Override
	public int deleteHouseImageType(HouseLibraryImageTypeVo imageTypeVo) {
		return super.sqlSessionTemplateProduct.delete("com.gjp.dao.HouseImageTypeDAO.deleteHouseImageType", imageTypeVo);
	}

	@Override
	public List<HouseImageType> houseImageTypeDAO(HouseImageType houseImageType) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseImageTypeDAO.queryAllHouseImageType", houseImageType);
	}

	@Override
	public List<HouseImageType> queryAllHouseImageTypeS(HouseImageType houseImageType) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseImageTypeDAO.queryAllHouseImageTypeS", houseImageType);
	}

	@Override
	public int addHouseIntentionImageTypes(HouseIntentionImageType houseIntentionImageType) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseImageTypeDAO.addHouseIntentionImageTypes", houseIntentionImageType);
	}

	@Override
	public List<HouseImageType> queryAllHouseImageTypeX(HouseImageType houseImageType) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseImageTypeDAO.queryAllHouseImageTypeX", houseImageType);
	}

	@Override
	public List<HouseImageType> queryAllHouseImage(HouseImageType houseImageType) {
		return super.sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseImageTypeDAO.queryAllHouseImage", houseImageType);
	}

	@Override
	public int updateHouseImageType(HouseHouseImageType houseImageType) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HouseImageTypeDAO.updateHouseImageType", houseImageType);
	}

}
