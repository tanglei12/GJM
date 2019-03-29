package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.HouseImageFolderTypeDao;
import com.gjp.model.HouseImageFolderType;
import org.springframework.stereotype.Repository;

import java.util.List;
/**
 * 文件夹类型
 * @author tanglei
 * date 2017年7月4日 下午15:05:40
 */
@Repository
public class HouseImageFolderTypeDaoImpl extends BaseDAO implements HouseImageFolderTypeDao{

	@Override
	public List<HouseImageFolderType> selectFolderType(HouseImageFolderType houseImageFolderType) {
		return sqlSessionTemplateProduct.selectList("com.gjp.dao.HouseImageFolderTypeDao.selectFolderType", houseImageFolderType);
	}
	

}
