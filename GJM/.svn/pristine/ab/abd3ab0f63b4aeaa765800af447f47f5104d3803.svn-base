package com.gjp.dao;

import com.gjp.model.ItemsInventory;
import com.gjp.model.ViewItemsInventoryVo;

import java.util.List;

/**
 * @author 秦莎
 *
 * @version 创建时间：2016年8月10日 上午15:26:34
 */
public interface ItemsInventoryDAO {

	/**
	 * 查询物品库存List
	 * 
	 * @author zoe
	 * @return
	 */
	List<ItemsInventory> selectItemsInventoryList(ItemsInventory itemsInventory);
	
	/**
	 * 查询物品库存的数量
	 * @param itemsInventory
	 * @return
	 */
	int selectItemsInventoryCount(ItemsInventory itemsInventory);
	
	/**
	 * 查询库存该类型下空闲的物品名称
	 * @param itemsInventory
	 * @return
	 */
	List<ItemsInventory> selectItemsInvtoryStateInvType(ItemsInventory itemsInventory);
	
	/**
	 * 查询库存该类型下空闲的物品名称数量
	 * @param itemsInventory
	 * @return
	 */
	int selectItemsInvtoryStateInvTypeCount(ItemsInventory itemsInventory);

	/**
	 * 物品库存新增
	 * 
	 * @author zoe
	 * @param itemsInventory
	 * @return
	 */
	int addItemsInventoryOne(ItemsInventory itemsInventory);
	
	/**
	 * 修改物品库存状态
	 * @param itemsInventory
	 * @return
	 */
	int updateItemsInventory(ItemsInventory itemsInventory);
	
	

	/**
	 * 查询库存物品
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月15日
	 *
	 * @param itemsInventoryVo
	 * @return
	 */
	List<ViewItemsInventoryVo> queryViewItemsInventoryList(ViewItemsInventoryVo itemsInventoryVo);
	
	/**
	 * 根据物品code查询该物品详情
	 * @param itemsInventory
	 * @return
	 */
	ItemsInventory selectItemsInventoryOne(ItemsInventory itemsInventory); 

}
