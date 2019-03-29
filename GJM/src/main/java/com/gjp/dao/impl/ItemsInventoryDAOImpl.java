package com.gjp.dao.impl;

import com.gjp.dao.BaseDAO;
import com.gjp.dao.ItemsInventoryDAO;
import com.gjp.model.ItemsInventory;
import com.gjp.model.ViewItemsInventoryVo;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 秦莎
 *
 * @version 创建时间：2016年8月10日 上午15:33:28
 */
@Repository
public class ItemsInventoryDAOImpl extends BaseDAO implements ItemsInventoryDAO {

	@Override
	public List<ItemsInventory> selectItemsInventoryList(ItemsInventory itemsInventory) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ItemsInventoryDAO.selectItemsInventoryList", itemsInventory);
	}

	@Override
	public int addItemsInventoryOne(ItemsInventory itemsInventory) {
		return sqlSessionTemplateBusiness.insert("com.gjp.dao.ItemsInventoryDAO.addItemsInventoryOne", itemsInventory);
	}

	@Override
	public int selectItemsInventoryCount(ItemsInventory itemsInventory) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ItemsInventoryDAO.selectItemsInventoryCount", itemsInventory);
	}

	@Override
	public List<ItemsInventory> selectItemsInvtoryStateInvType(ItemsInventory itemsInventory) {

		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ItemsInventoryDAO.selectItemsInvtoryStateInvType", itemsInventory);
	}

	@Override
	public int selectItemsInvtoryStateInvTypeCount(ItemsInventory itemsInventory) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ItemsInventoryDAO.selectItemsInvtoryStateInvTypeCount", itemsInventory);
	}

	@Override
	public int updateItemsInventory(ItemsInventory itemsInventory) {
		return sqlSessionTemplateBusiness.update("com.gjp.dao.ItemsInventoryDAO.updateItemsInventory", itemsInventory);
	}

	@Override
	public List<ViewItemsInventoryVo> queryViewItemsInventoryList(ViewItemsInventoryVo itemsInventoryVo) {
		return sqlSessionTemplateBusiness.selectList("com.gjp.dao.ItemsInventoryDAO.queryViewItemsInventoryList", itemsInventoryVo);
	}

	@Override
	public ItemsInventory selectItemsInventoryOne(ItemsInventory itemsInventory) {
		return sqlSessionTemplateBusiness.selectOne("com.gjp.dao.ItemsInventoryDAO.selectItemsInventoryOne", itemsInventory);
	}

}
