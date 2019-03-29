package com.gjp.dao;

import com.gjp.model.ItemsBill;

import java.util.List;

/**
 * 物品账单
 * 
 * 
 * @author 秦莎
 *
 * @version 创建时间：2016年8月10日 上午15:19:34
 */
public interface ItemsBillDAO {
	
	
	
	/**
	 * 物品账单添加
	 * 
	 * @param itemsBill
	 * @return
	 */
	int addItemsBillOne(ItemsBill itemsBill);
	
	
	/**
	 * 查询物品账单List
	 * @author zoe
	 * @return
	 */
	List<ItemsBill> selectItemsBillList(ItemsBill itemsBill);
	
	/**
	 * 物品账单数量
	 * @param itemsBill
	 * @return
	 */
	int selectItemsBillCount(ItemsBill itemsBill);
	
}
