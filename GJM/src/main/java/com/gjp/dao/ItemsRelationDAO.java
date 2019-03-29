package com.gjp.dao;

import com.gjp.model.BroadbandConfigVo;
import com.gjp.model.InsuranceVo;
import com.gjp.model.ItemsRelation;

import java.util.List;


/**
 * 物品关系表 
 * 
 * @author 秦莎
 *
 * @version 创建时间：2016年8月10日 上午15:28:34
 */
public interface ItemsRelationDAO {
	
	/**物品关系添加
	 * 
	 * @param itemsRelation
	 * @return
	 */
	int addItemsRelationOne(ItemsRelation itemsRelation);
	
	
	/**
	 * 查询物品关系List
	 * @author zoe
	 * @return
	 */
	List<ItemsRelation> selectItemsRelationList(ItemsRelation itemsRelation);
	
	/**
	 * 物品解绑
	 * @param itemsRelation
	 * @return
	 */
	int updateItemsInventoryState(ItemsRelation itemsRelation);

	/**
	 * 添加
	 * @param broadbandConfigVo
	 * @return
	 */
	int insertBroadbandConfig(BroadbandConfigVo broadbandConfigVo);

	/**
	 *修改宽带
	 * @param broadbandConfigVo
	 * @return
	 */
	int updateBroadbandConfig(BroadbandConfigVo broadbandConfigVo);

	/**
	 * 获取宽带配置
	 * @param broadbandConfigVo
	 * @return
	 */
	BroadbandConfigVo selectInitBroadbandConfig(BroadbandConfigVo broadbandConfigVo);

    /**
     * 获取房屋和合同下的有效保险
     * @param insuranceVo
     * @return
     */
	List<InsuranceVo> selectInsurance(InsuranceVo insuranceVo);

	/**
	 * 查询保险根据id
	 * @param insuranceVo
	 * @return
	 */
	InsuranceVo selectInsuranceById(InsuranceVo insuranceVo);


	/**
	 * 查询保险根据条件
	 * @param insuranceVo
	 * @return
	 */
	List<InsuranceVo> selectInsuranceByWhere(InsuranceVo insuranceVo);

	List<InsuranceVo> selectInsuranceAndAddres(InsuranceVo insuranceVo);

	/**
	 * 录入保单（新建录入）
	 * @param insuranceVo
	 * @return
	 */
	int insertInsurance(InsuranceVo insuranceVo);


	/**
	 *  修改保单
	 * @param insuranceVo
	 * @return
	 */
	int updateInsurance(InsuranceVo insuranceVo);
 }
