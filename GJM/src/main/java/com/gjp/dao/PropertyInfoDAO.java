package com.gjp.dao;

import com.gjp.model.HousingValuation;
import com.gjp.model.PropertyInfo;
import com.gjp.model.PropertyInfoName;
import com.gjp.model.PropertyInfoSubwany;
import com.gjp.util.Pagination;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月11日 下午6:41:55
 */
public interface PropertyInfoDAO {

	/**
	 * 添加物业基础信息
	 * 
	 * @param propertyInfo
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer insertPropertyInfo(PropertyInfo propertyInfo);

	/**
	 * 修改物业信息
	 * 
	 * @param propertyInfo
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updatePropertyInfo(PropertyInfo propertyInfo);

	/**
	 * 查询物业是否存在
	 * 
	 * @param propertyInfo
	 * @return
	 *
	 * @author 陈智颖
	 */
	PropertyInfo queryPropertyInfoCount(PropertyInfo propertyInfo);

	int updatePropertyInfo2(PropertyInfo propertyInfo);

	void updatePropertyInfo3(PropertyInfo propertyInfo);

	PropertyInfo selectcompanyByPiId(PropertyInfoName propertyInfoName);

	/**
	 * 根据物业编码查询物业信息
	 * 
	 * @param propertyInfo
	 * @return
	 *
	 * @author 陈智颖
	 */
	PropertyInfo queryPropertyInfoID(PropertyInfo propertyInfo);

	/**
	 * 查询物业信息List
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<PropertyInfo> selectPropertyInfo();

	/**
	 * 根据模糊条件查询物业信息
	 * 
	 * @param propertyInfo
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<PropertyInfo> selectwuyename(PropertyInfo propertyInfo);

	/** =================可能废弃方法===================== **/
	List<PropertyInfo> selectUserCenterPropertyInfoByParam(PropertyInfo propertyInfo);

	List<HousingValuation> selectvaluation(HousingValuation housingValuation);

	/**
	 * 通过物业名称编号查询该物业所有信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年6月8日
	 *
	 * @param propertyInfoName
	 * @return
	 */
	List<PropertyInfoName> selectPropertyInfoNameList(PropertyInfoName propertyInfoName);

	/**
	 * 根据条件查询物业名称
	 * 
	 * @作者 JiangQT
	 * @日期 2016年6月9日
	 *
	 * @param propertyInfoName
	 * @return
	 */
	PropertyInfoName selectPropertyInfoNameByWhere(PropertyInfoName propertyInfoName);

	/**
	 * 查询物业列表信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年6月9日
	 *
	 * @param pagination
	 * @return
	 */
	List<PropertyInfoName> queryPropertyInfoNameList(Pagination<PropertyInfoName> pagination);

	/**
	 * 查询物业列表信息总条数
	 * 
	 * @作者 JiangQT
	 * @日期 2016年6月9日
	 *
	 * @param pagination
	 * @return
	 */
	int queryPropertyInfoNameListRecords(Pagination<PropertyInfoName> pagination);

	/**
	 * 通过条件查询物业信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年6月9日
	 *
	 * @param propertyInfo
	 * @return
	 */
	PropertyInfo selectPropertyInfoByWhere(PropertyInfo propertyInfo);
	
	/**
	 * 添加物业周边信息
	 * 
	 * @param propertyInfoSubwany
	 * @return
	 *
	 * @author 陈智颖
	 */
	int insertPropertyInfoSubwany(PropertyInfoSubwany propertyInfoSubwany);
	
	/**
	 * 删除物业周边信息
	 * 
	 * @param propertyInfoSubwany
	 * @return
	 *
	 * @author 陈智颖
	 */
	int deletePropertyInfoSubwany(PropertyInfoSubwany propertyInfoSubwany);
	
	/**
	 * 
	 * 查询是否存在周边
	 * 
	 * @param propertyInfoSubwany
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<PropertyInfoSubwany> selectPropertyInfoSubwany(PropertyInfoSubwany propertyInfoSubwany);
	
	/**
	 * 根据物业条件查询物业
	 * 
	 * @param propertyInfoName
	 * @return
	 * @author 陈智颖
	 * @date Mar 22, 2017 4:39:31 PM
	 */
	List<PropertyInfoName> selectPropertyInfoName(PropertyInfoName propertyInfoName);
	
	/**
	 * 查询所有物业名称
	 * @return
	 */
	List<String> queryPropertyInfoNames();

	/**
	 * 物业信息关联查询
	 * @author tanglei
	 */
	PropertyInfoName selectProperInfo(PropertyInfoName propertyInfoName);

	/**
	 * 查询还未同步到支付宝的小区
	 * @return
	 */
	List<PropertyInfoName> queryPropertyInfoToZfb();

	int updatePropertyInfoById(PropertyInfoName propertyInfoName);
}
