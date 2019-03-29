package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseHouseImageDAO;
import com.gjp.model.HouseImageVo;
import com.gjp.model.HouseIntentionImage;
import com.gjp.model.RentHouseFileVo;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 上传图片DaoImpl
 * 
 * @author zoe
 *
 */
@Repository
public class HouseHouseImageDAOImpl extends BaseDAO implements HouseHouseImageDAO {

	@Override
	public int addHouseImage(HouseImageVo houseHouseImage) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseHouseImageDAO.addHouseImage", houseHouseImage);
	}

	@Override
	public int addHouseIntentionImage(HouseIntentionImage houseIntentionImage) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.HouseHouseImageDAO.addHouseIntentionImage", houseIntentionImage);
	}

	@Override
	public int deleteIntentionImage(int him_id) {
		return super.sqlSessionTemplateProduct.delete("com.gjp.dao.HouseHouseImageDAO.deleteIntentionImage", him_id);
	}

	@Override
	public HouseIntentionImage selectImageById(int him_id) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseHouseImageDAO.selectImageById", him_id);
	}

	@Override
	public int deleteImage(int hm_id) {
		return super.sqlSessionTemplateProduct.delete("com.gjp.dao.HouseHouseImageDAO.deleteImage", hm_id);
	}

	@Override
	public int selectHouseIntentionImageId(String him_path) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseHouseImageDAO.selectHouseIntentionImageId", him_path);
	}

	@Override
	public int updateHouseImage(HouseImageVo houseImage) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HouseHouseImageDAO.updateHouseImage", houseImage);
	}

	@Override
	public List<HouseImageVo> queryHouseImageList(HouseImageVo houseHouseImage) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseHouseImageDAO.queryHouseImageList", houseHouseImage);
	}

	@Override
	public List<HouseImageVo> queryImgListByHiCodeAndHifName(HouseImageVo houseHouseImage) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseHouseImageDAO.queryImgListByHiCodeAndHifName", houseHouseImage);
	}

	@Override
	public HouseImageVo queryHouseImage(HouseImageVo houseImageVo) {
		return sqlSessionTemplateProduct.selectOne("com.gjp.dao.HouseHouseImageDAO.queryHouseImage", houseImageVo);
	}

	@Override
	public List<HouseImageVo> queryHouseImageListByFolder(HouseImageVo houseImageVo) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseHouseImageDAO.queryHouseImageListByFolder", houseImageVo);
	}

	@Override
	public List<HouseImageVo> selectFoldsImgs(HouseImageVo houseImageVo) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseHouseImageDAO.selectFoldsImgs", houseImageVo);
	}

	@Override
	public List<HouseImageVo> selectHouseImageVo(HouseImageVo houseImageVo) {
		List<HouseImageVo> houseImage=sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseHouseImageDAO.selectFoldsImgs", houseImageVo);
		return houseImage;
	}

	@Override
	public int updateImageAlisync(HouseImageVo houseImageVo) {
		return sqlSessionTemplateProduct.update("com.gjp.dao.HouseHouseImageDAO.updateImageAlisync", houseImageVo);
	}

	@Override
	public int deleteRentFileByCode(RentHouseFileVo rentHouseFileVo) {
		return sqlSessionTemplateProduct.delete("com.gjp.dao.HouseHouseImageDAO.deleteRentFileByCode", rentHouseFileVo);
	}

}
