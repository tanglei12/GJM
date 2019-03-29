package com.gjp.service;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.gjp.dao.PropertyInfoDAO;
import com.gjp.model.HousingValuation;
import com.gjp.model.PropertyInfo;
import com.gjp.model.PropertyInfoName;
import com.gjp.model.PropertyInfoSubwany;
import com.gjp.util.AliRenthouseUtil;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月12日 上午9:16:15
 */
@Service
public class PropertyInfoService {

	@Resource
	private PropertyInfoDAO propertyInfoDao;

	/**
	 * 添加物业基础信息
	 * 
	 * @param propertyInfo
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer insertPropertyInfo(PropertyInfo propertyInfo) {
		return propertyInfoDao.insertPropertyInfo(propertyInfo);
	}

	/**
	 * 修改物业信息
	 * 
	 * @param propertyInfo
	 * @return
	 *
	 * @author 陈智颖
	 */
	public Integer updatePropertyInfo(PropertyInfo propertyInfo) {
		return propertyInfoDao.updatePropertyInfo(propertyInfo);
	}

	/**
	 * 查询物业是否存在
	 * 
	 * @param propertyInfo
	 * @return
	 *
	 * @author 陈智颖
	 */
	public PropertyInfo queryPropertyInfoCount(PropertyInfo propertyInfo) {
		return propertyInfoDao.queryPropertyInfoCount(propertyInfo);
	}

	/**
	 * 根据物业编码查询物业信息
	 * 
	 * @param propertyInfo
	 * @return
	 *
	 * @author 陈智颖
	 */
	public PropertyInfo queryPropertyInfoID(PropertyInfo propertyInfo) {
		return propertyInfoDao.queryPropertyInfoID(propertyInfo);
	}

	/**
	 * 查询物业所属部门
	 * 
	 * @param propertyInfoName
	 * @return
	 *
	 * @author 刘强
	 */
	public PropertyInfo selectcompanyByPiId(PropertyInfoName propertyInfoName) {
		return propertyInfoDao.selectcompanyByPiId(propertyInfoName);
	}

	/**
	 * 查询物业信息List
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<PropertyInfo> selectPropertyInfo() {
		return propertyInfoDao.selectPropertyInfo();
	}

	/**
	 * 根据模糊条件查询物业信息
	 * 
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<PropertyInfo> selectwuyename(PropertyInfo propertyInfo) {
		return propertyInfoDao.selectwuyename(propertyInfo);
	}

	public List<PropertyInfo> selectUserCenterPropertyInfoByParam(PropertyInfo propertyInfo) {
		return propertyInfoDao.selectUserCenterPropertyInfoByParam(propertyInfo);
	}

	public List<HousingValuation> selectvaluation(HousingValuation housingValuation) {
		return propertyInfoDao.selectvaluation(housingValuation);
	}

	public void updatepropertyInfojiegou(PropertyInfoName p1) {
		PropertyInfo propertyInfo = new PropertyInfo();
		propertyInfo.setUpn_id(p1.getUpn_id());
		propertyInfo.setPropertyInfo_Name(p1.getUpn_sname() + " " + p1.getUpn_code());
		propertyInfoDao.updatePropertyInfo3(propertyInfo);
	}

	/**
	 * 通过物业名称编号查询该物业所有信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年6月8日
	 *
	 * @param propertyInfoName
	 * @return
	 */
	public List<PropertyInfoName> selectPropertyInfoNameList(PropertyInfoName propertyInfoName) {
		return propertyInfoDao.selectPropertyInfoNameList(propertyInfoName);
	}

	/**
	 * 根据条件查询物业名称
	 * 
	 * @作者 JiangQT
	 * @日期 2016年6月9日
	 *
	 * @param propertyInfoName
	 * @return
	 */
	public PropertyInfoName selectPropertyInfoNameByWhere(PropertyInfoName propertyInfoName) {
		return propertyInfoDao.selectPropertyInfoNameByWhere(propertyInfoName);
	}

	/**
	 * 查询物业列表信息
	 * 
	 * @作者 JiangQT
	 * @日期 2016年6月9日
	 *
	 * @param pagination
	 * @return
	 */
	public List<PropertyInfoName> queryPropertyInfoNameList(Pagination<PropertyInfoName> pagination) {
		return propertyInfoDao.queryPropertyInfoNameList(pagination);
	}

	/**
	 * 查询物业列表信息总条数
	 * 
	 * @作者 JiangQT
	 * @日期 2016年6月9日
	 *
	 * @param pagination
	 * @return
	 */
	public int queryPropertyInfoNameListRecords(Pagination<PropertyInfoName> pagination) {
		return propertyInfoDao.queryPropertyInfoNameListRecords(pagination);
	}
	
	/**
	 * 
	 * 添加物业周边
	 * 
	 * @param propertyInfoSubwany
	 * @return
	 *
	 * @author 陈智颖
	 */
	public int updateSubwany(PropertyInfoSubwany propertyInfoSubwany){
		
		int bool = 0;
		
		bool = propertyInfoDao.insertPropertyInfoSubwany(propertyInfoSubwany);
		
		return bool;
	}
	
	/**
	 * 删除现有物业周边
	 * 
	 * @param propertyInfoSubwany
	 * @return
	 *
	 * @author 陈智颖
	 */
	public int deleteSubwany(PropertyInfoSubwany propertyInfoSubwany){
		List<PropertyInfoSubwany> selectPropertyInfoSubwany = propertyInfoDao.selectPropertyInfoSubwany(propertyInfoSubwany);
		
		int bool = 0;
		
		if(!selectPropertyInfoSubwany.isEmpty()){
			bool = propertyInfoDao.deletePropertyInfoSubwany(selectPropertyInfoSubwany.get(0));
		}
		return bool;
	}
	
	/**
	 * 查询物业周边
	 * 
	 * @param propertyInfoSubwany
	 * @return
	 *
	 * @author 陈智颖
	 */
	public List<PropertyInfoSubwany> selectPropertyInfoSubwany(PropertyInfoSubwany propertyInfoSubwany){
		return propertyInfoDao.selectPropertyInfoSubwany(propertyInfoSubwany);
	}
	
	/**
	 * 根据物业条件查询物业
	 * 
	 * @param propertyInfoName
	 * @return
	 * @author 陈智颖
	 * @date Mar 22, 2017 4:39:31 PM
	 */
	public List<PropertyInfoName> selectPropertyInfoName(PropertyInfoName propertyInfoName){
		return propertyInfoDao.selectPropertyInfoName(propertyInfoName);
	}
	
	/**
	 * 查询所有物业名称
	 * 
	 * @author shenhx
	 * @return
	 */
	public List<String> queryPropertyInfoNames(){
		return propertyInfoDao.queryPropertyInfoNames();
	}

	/**
	 * 根据主键ID查询物业信息
	 * @param propertyInfo
	 * @return
	 */
	public PropertyInfo selectPropertyInfoByWhere(PropertyInfo propertyInfo){
		return propertyInfoDao.selectPropertyInfoByWhere(propertyInfo);
	}

	/**
	 * 修改物业基本信息
	 */
	public int updatePropertyInfo2(PropertyInfo propertyInfo) {
		return propertyInfoDao.updatePropertyInfo2(propertyInfo);
	}

	/**
	 * 小区同步初始化到支付宝平台
	 * @throws AlipayApiException
	 */
	public void initProperInfoToAli() throws AlipayApiException {
		List<PropertyInfoName> propertyInfoList = propertyInfoDao.queryPropertyInfoToZfb();
		if(null != propertyInfoList){
			for(PropertyInfoName propertyInfo : propertyInfoList){

				Map<String, Object> requestParam = new HashMap<>();
				requestParam.put("city_name", "重庆市");
				requestParam.put("district_name", propertyInfo.getPropertyInfo_quyu());
				requestParam.put("community_name", propertyInfo.getUpn_name());

				String address = propertyInfo.getPropertyInfo_address();
				String coordinate = propertyInfo.getPropertyInfo_coordinate();
				if(!StringUtils.isEmpty(address)){
					requestParam.put("address", address);
				} else if(!StringUtils.isEmpty(coordinate)){
					requestParam.put("community_locations", coordinate.replaceAll(",", "|"));
					requestParam.put("coordsys", 0);
				} else {
					continue;
				}

				Map<String, Object> response = AliRenthouseUtil.renthouseCommunityInfoSync(JSONObject.toJSONString(requestParam));
				if(null != response){
					boolean isSuccess = (boolean) response.get("isSuccess");
					Map<String, Object> response_body = (Map<String, Object>) response.get("response_body");
					if(isSuccess){
						String comm_req_id = (String) response_body.get("comm_req_id");
						String status =  (String) response_body.get("status");
						PropertyInfoName propertyInfoName = new PropertyInfoName();
						propertyInfoName.setUpn_id(propertyInfo.getUpn_id());
						propertyInfoName.setComm_req_id(comm_req_id);
						propertyInfoName.setComm_req_status(Integer.valueOf(status));
						propertyInfoDao.updatePropertyInfoById(propertyInfoName);
					} else {
						throw new AlipayApiException("小区同步失败：" + response_body.get("sub_msg"));
					}
				} else {
					throw new AlipayApiException("小区同步异常");
				}
			}
		}
	}

}
