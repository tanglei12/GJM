package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ItemsStorageRecordDAO;
import com.gjp.model.ItemsStorageRecord;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 秦莎
 *
 * @version 创建时间：2016年8月10日 上午15:33:28
 */
@Repository
public class ItemsStorageRecordDAOImpl extends BaseDAO implements ItemsStorageRecordDAO {

	@Override
	public List<ItemsStorageRecord> selectItemsStorageRecordList() {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ItemsStorageRecordDAO.selectItemsStorageRecordList");
	}

	@Override
	public int addItemsStorageRecordOne(ItemsStorageRecord itemsStorageRecord) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.ItemsStorageRecordDAO.addItemsStorageRecordOne", itemsStorageRecord);
	}


}
