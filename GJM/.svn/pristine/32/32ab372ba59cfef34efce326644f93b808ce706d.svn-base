package com.gjp.dao;

import com.gjp.model.UploadImage;

/**
 * 图片管理
 * 
 * @author 王孝元
 * @version 创建时间：2017年3月17日 上午11:50:53
 * 
 */
public interface UploadImageDao {

	/**
	 * 保存图片
	 * 
	 * @param image
	 * @return
	 * @author 王孝元
	 */
	int addUploadImage(UploadImage image);

	/**
	 * 删除图片（暂时会用，有了定时器删除就删除此方法）
	 * 
	 * @param img_path
	 * @return
	 * @author 王孝元
	 */
	int deleteUploadImage(Integer img_id);

	/**
	 * 更新图片
	 * 
	 * @param image
	 * @return
	 * @author 王孝元
	 */
	int updateUploadUmage(UploadImage image);

	/**
	 * 根据path查询图片
	 * 
	 * @param img_path
	 * @return
	 * @author 王孝元
	 */
	UploadImage queryUploadImageByPath(String img_path);
}
