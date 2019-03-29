package com.gjp.dao;

import com.gjp.model.*;

import java.util.List;

/**
 * 定价设置
 * 
 * @author chen
 *
 * @date Dec 22, 2016 6:27:01 PM
 */
public interface PriceSettingDAO {

	/**
	 * 插入定价策略设置
	 *
	 * @param priceSetting
	 * @return
	 * @author chen
	 * @date Dec 22, 2016 6:13:03 PM
	 */
	Integer insertSetting(PriceSetting priceSetting);

	/**
	 * 查询所有策略设置
	 *
	 * @return
	 * @author chen
	 * @date Dec 22, 2016 6:14:09 PM
	 */
	List<PriceSetting> selectSettingAll();

	/**
	 * 根据条件删除策略设置
	 *
	 * @param priceSetting
	 * @return
	 * @author chen
	 * @date Dec 22, 2016 6:15:16 PM
	 */
	Integer deleteSetting(PriceSetting priceSetting);

	/**
	 * 根据条件查询定价类型
	 *
	 * @param priceSettingType
	 * @return
	 * @author chen
	 * @date Dec 22, 2016 6:21:03 PM
	 */
	Integer insertPriceSettingType(PriceSettingType priceSettingType);

	/**
	 * 
	 *
	 * @param priceSettingType
	 * @return
	 * @author chen
	 * @date Jan 8, 2017 5:40:09 PM
	 */
	List<PriceSettingType> selectPriceSettingTypeWhere(PriceSettingType priceSettingType);

	/**
	 * 根据条件修改房屋活动状态
	 *
	 * @param priceSettingType
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 4:05:57 PM
	 */
	Integer updatePriceSettingTypeBool(PriceSettingType priceSettingType);

	/**
	 * 查询所有定价类型
	 *
	 * @return
	 * @author chen
	 * @date Dec 22, 2016 6:23:12 PM
	 */
	List<PriceSettingType> selectPriceSettingTypeAll();

	/**
	 * 修改定价类型
	 *
	 * @param priceSettingType
	 * @return
	 * @author chen
	 * @date Jan 8, 2017 5:58:54 PM
	 */
	Integer updatePriceSettingType(PriceSettingType priceSettingType);

	/**
	 * 查询所有定价类型
	 *
	 * @return
	 * @author chen
	 * @date Dec 22, 2016 6:23:12 PM
	 */
	List<PriceSetting> selectSettingWhereDay(PriceSetting PriceSetting);

	/**
	 * 根据条件删除定价类型
	 *
	 * @param priceSettingType
	 * @return
	 * @author chen
	 * @date Dec 22, 2016 6:24:48 PM
	 */
	Integer deletePriceSettingType(PriceSettingType priceSettingType);

	/**
	 * 插入定价参数
	 *
	 * @param priceSettingContent
	 * @return
	 * @author chen
	 * @date Dec 22, 2016 6:25:34 PM
	 */
	Integer insertPriceSettingContent(PriceSettingContent priceSettingContent);

	/**
	 * 查询根据条件查询定价参数
	 *
	 * @param priceSettingContent
	 * @return
	 * @author chen
	 * @date Dec 22, 2016 6:26:26 PM
	 */
	List<PriceSettingContent> selectPriceSettingContentWhere(PriceSettingContent priceSettingContent);

	/**
	 * 根据编码删除定价类型
	 *
	 * @param priceSettingContent
	 * @return
	 * @author chen
	 * @date Dec 22, 2016 6:26:49 PM
	 */
	Integer deletePriceSettingContent(PriceSettingContent priceSettingContent);

	/**
	 * 修改房源定价信息
	 *
	 * @param houseInfoKeep
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 6:20:18 PM
	 */
	Integer updatehouseKeep(HouseInfoKeep houseInfoKeep);

	/**
	 * 插入房源定价
	 *
	 * @param priceMoney
	 * @return
	 * @author chen
	 * @date Dec 25, 2016 5:28:33 PM
	 */
	Integer insertPriceMoney(PriceMoney priceMoney);

	/**
	 * 修改房源定价
	 *
	 * @param priceMoney
	 * @return
	 * @author chen
	 * @date Dec 25, 2016 5:29:24 PM
	 */
	Integer updatePriceMoney(PriceMoney priceMoney);

	/**
	 * 修改房屋状态
	 *
	 * @param houseInfoKeep
	 * @return
	 * @author chen
	 * @date Dec 27, 2016 10:44:51 AM
	 */
	Integer updatehouseKeepActive(HouseInfoKeep houseInfoKeep);

	/**
	 * 查询定价
	 * 
	 * @param priceMoney
	 * @return
	 */
	PriceMoney selectPriceMoney(PriceMoney priceMoney);
}
