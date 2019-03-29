package com.gjp.dao;

import com.gjp.model.HouseImageFolderType;

import java.util.List;

/**
 * 文件夹类型
 * @author tanglei
 * date 2017年7月4日 下午15:05:40
 */
public interface HouseImageFolderTypeDao {
	
	/**
	 * 查询文件夹
	 * @author tanglei
	 * date 2017年7月4日 下午15:15:40
	 */
	List<HouseImageFolderType> selectFolderType(HouseImageFolderType houseImageFolderType);

}
