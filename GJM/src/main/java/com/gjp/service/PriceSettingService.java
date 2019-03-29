package com.gjp.service;

import com.gjp.dao.PriceSettingDAO;
import com.gjp.model.*;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 房源定价设置
 *
 * @author chen
 *
 * @date Dec 23, 2016 9:31:42 AM 
 */
@Service
public class PriceSettingService {

	@Resource
	private PriceSettingDAO priceSettingDAO;
	
	/**
	 * 插入定价策略设置
	 *
	 * @param priceSetting
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 9:36:49 AM
	 */
	public Integer insertSetting(PriceSetting priceSetting){
		return priceSettingDAO.insertSetting(priceSetting);
	}
	
	/**
	 * 查询所有策略设置
	 *
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 9:37:27 AM
	 */
	public List<PriceSetting> selectSettingAll(){
		return priceSettingDAO.selectSettingAll();
	}
	
	/**
	 * 根据条件删除策略设置
	 *
	 * @param priceSetting
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 9:38:40 AM
	 */
	public Integer deleteSetting(PriceSetting priceSetting){
		return priceSettingDAO.deleteSetting(priceSetting);
	}
	
	/**
	 * 插入定价类型
	 *
	 * @param priceSettingType
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 9:39:27 AM
	 */
	public Integer insertPriceSettingType(PriceSettingType priceSettingType){
		return priceSettingDAO.insertPriceSettingType(priceSettingType);
	}
	
	/**
	 * 修改定价类型
	 *
	 * @param priceSettingType
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 9:39:27 AM
	 */
	public Integer updatePriceSettingType(PriceSettingType priceSettingType){
		return priceSettingDAO.updatePriceSettingType(priceSettingType);
	}
	
	/**
	 * 根据编码修改房源活动状态
	 *
	 * @param priceSettingType
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 4:08:29 PM
	 */
	public Integer updatePriceSettingTypeBool(PriceSettingType priceSettingType){
		return priceSettingDAO.updatePriceSettingTypeBool(priceSettingType);
	}
	
	/**
	 * 查询所有定价类型
	 *
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 9:40:18 AM
	 */
	public List<PriceSettingType> selectPriceSettingTypeAll(){
		return priceSettingDAO.selectPriceSettingTypeAll();
	}
	
	/**
	 * 根据条件查询定价类型
	 *
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 9:40:18 AM
	 */
	public List<PriceSettingType> selectPriceSettingTypeWhere(PriceSettingType priceSettingType){
		return priceSettingDAO.selectPriceSettingTypeWhere(priceSettingType);
	}
	
	/**
	 * 根据条件删除定价类型
	 *
	 * @param priceSettingType
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 9:41:22 AM
	 */
	public Integer deletePriceSettingType(PriceSettingType priceSettingType){
		return priceSettingDAO.deletePriceSettingType(priceSettingType);
	}
	
	/**
	 * 插入定价参数
	 *
	 * @param priceSettingContent
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 9:42:16 AM
	 */
	public Integer insertPriceSettingContent(PriceSettingContent priceSettingContent){
		return priceSettingDAO.insertPriceSettingContent(priceSettingContent);
	}
	
	/**
	 * 查询根据条件查询定价参数
	 *
	 * @param priceSettingContent
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 9:42:56 AM
	 */
	public List<PriceSettingContent> selectPriceSettingContentWhere(PriceSettingContent priceSettingContent){
		return priceSettingDAO.selectPriceSettingContentWhere(priceSettingContent);
	}
	
	/**
	 * 根据编码删除定价类型
	 *
	 * @param priceSettingContent
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 9:43:31 AM
	 */
	public Integer deletePriceSettingContent(PriceSettingContent priceSettingContent){
		return priceSettingDAO.deletePriceSettingContent(priceSettingContent);
	}
	
	/**
	 * 根据空置天数阀值查询数据
	 *
	 * @param priceSetting
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 5:17:28 PM
	 */
	public List<PriceSetting> selectSettingWhereDay(PriceSetting priceSetting){
		return priceSettingDAO.selectSettingWhereDay(priceSetting);
	}
	
	/**
	 * 修改房屋定价信息
	 *
	 * @param houseInfoKeep
	 * @return
	 * @author chen
	 * @date Dec 23, 2016 6:23:34 PM
	 */
	public Integer updatehouseKeep(HouseInfoKeep houseInfoKeep){
		return priceSettingDAO.updatehouseKeep(houseInfoKeep);
	}
	
	/**
	 * 插入房源定价
	 *
	 * @param priceMoney
	 * @return
	 * @author chen
	 * @date Dec 25, 2016 5:32:51 PM
	 */
	public Integer insertPriceMoney(PriceMoney priceMoney){
		return priceSettingDAO.insertPriceMoney(priceMoney);
	}
	
	/**
	 * 修改房源定价
	 *
	 * @param priceMoney
	 * @return
	 * @author chen
	 * @date Dec 25, 2016 5:34:25 PM
	 */
	public Integer updatePriceMoney(PriceMoney priceMoney){
		return priceSettingDAO.updatePriceMoney(priceMoney);
	}
	
	/**
	 * 修改房屋状态
	 *
	 * @param houseInfoKeep
	 * @return
	 * @author chen
	 * @date Dec 27, 2016 10:47:19 AM
	 */
	public Integer updatehouseKeepActive(HouseInfoKeep houseInfoKeep){
		return priceSettingDAO.updatehouseKeepActive(houseInfoKeep);
	}
}
