package com.gjp.service;

import com.gjp.dao.UploadImageDao;
import com.gjp.model.UploadImage;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

/**
 * 图片管理
 * 
 * @author 王孝元
 * @version 创建时间：2017年3月17日 下午4:33:42
 * 
 */
@Service
public class UploadImageService {

	@Resource
	private UploadImageDao uploadImageDao;

	/**
	 * 保存图片
	 * 
	 * @param image
	 * @return
	 * @author 王孝元
	 */
	public boolean addUploadImage(String img_path) {
		UploadImage image = new UploadImage();
		image.setImg_path(img_path);
		image.setImg_state(0);
		image.setImg_createTime(new Date());
		return uploadImageDao.addUploadImage(image) > 0;
	}

	/**
	 * 删除图片（暂时会用，有了定时器删除就删除此方法）
	 * 
	 * @param img_path
	 * @return
	 * @author 王孝元
	 */
	public boolean deleteUploadImage(String img_path) {
		UploadImage image = uploadImageDao.queryUploadImageByPath(img_path);
		return uploadImageDao.deleteUploadImage(image.getImg_id()) > 0;
	}

	/**
	 * 生效图片
	 * 
	 * @param image
	 * @return
	 * @author 王孝元
	 */
	public boolean takeEffectUploadImage(String img_path) {
		UploadImage image = uploadImageDao.queryUploadImageByPath(img_path);
		image.setImg_state(1);
		return uploadImageDao.updateUploadUmage(image) > 0;
	}

	/**
	 * 根据path查询图片
	 * 
	 * @param img_path
	 * @return
	 * @author 王孝元
	 */
	public UploadImage queryUploadImageByPath(String img_path) {
		return uploadImageDao.queryUploadImageByPath(img_path);
	}
}
