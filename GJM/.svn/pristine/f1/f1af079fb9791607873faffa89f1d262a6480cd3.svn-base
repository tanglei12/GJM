package com.gjp.dao;

import com.gjp.model.*;

import java.util.List;

/**
 * 物业交接单
 * 
 * @author zoe
 *
 */
public interface PropertyTransferDao {

	/**
	 * 通过房屋编码查询物业交接订单
	 * 
	 * @author JiangQT
	 * @param transfer
	 * @return
	 */
	PropertyTransfer selectPropertyTransferByHiCode(PropertyTransfer transfer);


	/**
	 * 查询物业交接信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月11日
	 *
	 * @param propertyMainVo
	 * @return
	 */
	HandoverPropertyMainVo queryHandoverPropertyMain(HandoverPropertyMainVo propertyMainVo);

	/**
	 * 查询能源卡信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月11日
	 *
	 * @param energyCardVo
	 * @return
	 */
	List<HandoverPropertyEnergyCardVo> queryHandoverPropertyEnergyCardList(HandoverPropertyEnergyCardVo energyCardVo);

	/**
	 * 查询能源卡数值信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月11日
	 *
	 * @param energyValueVo
	 * @return
	 */
	List<HandoverPropertyEnergyValueVo> queryHandoverPropertyEnergyValueList(HandoverPropertyEnergyValueVo energyValueVo);

	/**
	 * 查询交接物品配置列表信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月11日
	 *
	 * @param propertyGoodsVo
	 * @return
	 */
	List<HandoverPropertyGoodsVo> queryHandoverPropertyGoodsList(HandoverPropertyGoodsVo propertyGoodsVo);

	/**
	 * 查询交接装饰情况信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月11日
	 *
	 * @param propertyDecorationVo
	 * @return
	 */
	List<HandoverPropertyDecorationVo> queryHandoverPropertyDecorationList(HandoverPropertyDecorationVo propertyDecorationVo);

	/**
	 * 添加物业交接单
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月14日
	 *
	 * @param propertyMainNew
	 * @return
	 */
	int addHandoverPropertyMain(HandoverPropertyMainVo propertyMainNew);

	/**
	 * 更新物业交接单
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月14日
	 *
	 * @param propertyMain
	 * @return
	 */
	int updateHandoverPropertyMain(HandoverPropertyMainVo propertyMain);

	/**
	 * 删除能源卡信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月14日
	 *
	 * @param propertyEnergyCardVo
	 * @return
	 */
	int deleteHandPropertyEnergyCard(HandoverPropertyEnergyCardVo propertyEnergyCardVo);

	/**
	 * 删除能源卡数值信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月15日
	 *
	 * @param propertyEnergyValueVo
	 * @return
	 */
	int deleteHandPropertyEnergyValue(HandoverPropertyEnergyValueVo propertyEnergyValueVo);

	/**
	 * 添加能源卡信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月15日
	 *
	 * @param propertyEnergyCardVo
	 * @return
	 */
	int addHandPropertyEnergyCard(HandoverPropertyEnergyCardVo propertyEnergyCardVo);

	/**
	 * 删除交接物品
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月15日
	 *
	 * @param propertyGoodsVo
	 * @return
	 */
	int deleteHandPropertyGoods(HandoverPropertyGoodsVo propertyGoodsVo);

	/**
	 * 删除物品装饰情况数据
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月15日
	 *
	 * @param propertyDecorationVo
	 * @return
	 */
	int deleteHandPropertyDecoration(HandoverPropertyDecorationVo propertyDecorationVo);

	/**
	 * 添加能源卡数值
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月15日
	 *
	 * @param propertyEnergyValueVo
	 * @return
	 */
	int addHandPropertyEnergyValue(HandoverPropertyEnergyValueVo propertyEnergyValueVo);

	/**
	 * 添加交接物品
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月15日
	 *
	 * @param propertyGoodsVo
	 * @return
	 */
	int addHandPropertyGoods(HandoverPropertyGoodsVo propertyGoodsVo);

	/**
	 * 添加交接装饰情况
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月15日
	 *
	 * @param propertyDecorationVo
	 * @return
	 */
	int addHandPropertyDecoration(HandoverPropertyDecorationVo propertyDecorationVo);

	/**
	 * 查询能源卡信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月16日
	 *
	 * @param energyCardVo
	 * @return
	 */
	List<HandoverPropertyEnergyCardVo> queryHandoverPropertyEnergyCardValueList(HandoverPropertyEnergyCardVo energyCardVo);

	/**
	 * 更新物业能源卡数据
	 * 
	 * @作者 JiangQT
	 * @日期 2016年8月30日
	 *
	 * @param energyCardVo
	 * @return
	 */
	int updateHandoverPropertyEnergyCard(HandoverPropertyEnergyCardVo energyCardVo);

	/**
	 * 更新物业交接状态
	 * 
	 * @作者 JiangQT
	 * @日期 2016年10月5日
	 *
	 * @param propertyMain
	 * @return
	 */
	int updateHandoverPropertyMainForState(HandoverPropertyMainVo propertyMain);

}
