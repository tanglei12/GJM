package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.UploadImageDao;
import com.gjp.model.UploadImage;
import org.springframework.stereotype.Repository;

/**
* 图片管理
* 
* @author 王孝元
* @version 创建时间：2017年3月17日 上午11:57:18
* 
*/
@Repository
public class UploadImageDaoImpl extends BaseDAO implements UploadImageDao {

	@Override
	public int addUploadImage(UploadImage image) {
		return super.sqlSessionTemplateProduct.insert("com.gjp.dao.UploadImageDao.addUploadImage",image);
	}

	@Override
	public int deleteUploadImage(Integer img_id) {
		return super.sqlSessionTemplateProduct.delete("com.gjp.dao.UploadImageDao.deleteUploadImage",img_id);
	}

	@Override
	public int updateUploadUmage(UploadImage image) {
		return super.sqlSessionTemplateProduct.update("com.gjp.dao.UploadImageDao.updateUploadUmage",image);
	}

	@Override
	public UploadImage queryUploadImageByPath(String img_path) {
		return super.sqlSessionTemplateProduct.selectOne("com.gjp.dao.UploadImageDao.queryUploadImageByPath",img_path);
	}

}
