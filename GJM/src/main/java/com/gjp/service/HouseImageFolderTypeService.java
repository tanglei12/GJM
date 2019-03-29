package com.gjp.service;

import com.gjp.dao.HouseImageFolderTypeDao;
import com.gjp.model.HouseImageFolderType;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 文件夹类型
 * @author tanglei
 * date 2017年7月4日 下午15:05:40
 */
@Service
public class HouseImageFolderTypeService {
	
	@Resource
	private HouseImageFolderTypeDao houseImageFolderTypeDao;
	
	/**
	 * 查询文件夹
	 * @author tanglei
	 * date 2017年7月4日 下午15:15:40
	 */
	public List<HouseImageFolderType> selectFolderType(HouseImageFolderType houseImageFolderType) {
		return houseImageFolderTypeDao.selectFolderType(houseImageFolderType);
	}
	
	
}
