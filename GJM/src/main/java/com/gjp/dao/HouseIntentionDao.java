package com.gjp.dao;

import com.gjp.model.*;
import com.gjp.util.HouseModel;
import com.gjp.util.PageModel;

import java.util.List;

/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月20日 下午3:31:57
 */
public interface HouseIntentionDao {

	/**
	 * 根据账号查询房源待看数据并分页
	 * 
	 * @param houseIntention
	 * @return
	 *
	 * @author 陈智颖
	 */
	List<HouseIntention> queryHouseIntentionEM(HouseIntention houseIntention);

	/**
	 * 添加意向房源
	 * 
	 * @param houseIntention
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addHouseIntention(HouseIntention houseIntention);

	/**
	 * 修改意向房源
	 * 
	 * @param houseIntention
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer updateHouseIntention(HouseIntention houseIntention);

	/**
	 * 插入意向房源图片
	 * 
	 * @param houseIntention
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addHouseIntentionImage(HouseIntention houseIntention);

	/**
	 * 根据物业编号、电话号码、内部人员编码查询是否存在该房源
	 * 
	 * @param houseIntention
	 * @return
	 *
	 * @author 陈智颖
	 */
	HouseIntention queryHouseIntentionCount(HouseIntention houseIntention);

	/**
	 * 根据意向房源编码查询意向房源
	 * 
	 * @param houseIntention
	 * @return
	 *
	 * @author 陈智颖
	 */
	HouseIntention queryHouseIntentionID(HouseIntention houseIntention);
	
	/**
	 * 根据物业编号、电话号码、内部人员编码 房屋室 房号 查询是否存在该房源
	 * 
	 * @param houseIntention
	 * @return
	 *
	 * @author 陈智颖
	 */
	HouseIntention queryHouseIntentionBool(HouseIntention houseIntention);

	/**
	 * 插入意向房源跟进信息
	 * 
	 * @param houseIntention
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addHouseFollow(HouseFollow houseFollow);

	/**
	 * 插入意向房源跟进人员
	 * 
	 * @param houseIntention
	 * @return
	 *
	 * @author 陈智颖
	 */
	Integer addHouseFollowUser(HouseFollowUser houseFollowUser);

	/**
	 * 修改意向最新跟进人
	 * 
	 * @param houseIntention
	 * @return
	 *
	 * @author 陈智颖
	 */
	int updateHouseIntentionNewPerson(HouseIntention houseIntention);

	/**
	 * 查询自己意向房源详细信息
	 * 
	 * @param houseIntention
	 * @return
	 *
	 * @author 陈智颖
	 */
	PageModel<HouseIntention> queryHouseIntentionEMXiangXi(int pageNo, int pageSize, HouseModel houseModel);

	/**
	 * 查询意向房源记录
	 * 
	 * @param houseIntention
	 * @return
	 *
	 * @author 刘强
	 */
	List<HouseFollow> selectHouseIntentiongzjl(HouseIntention houseIntention);

	/**
	 * 查询房屋来源
	 * 
	 * @Description:
	 * @return
	 * @author JiangQt
	 */
	String queryHouseIntentionSource(String name);

	HouseIntention queryHouseIntentionWhere(HouseIntention houseIntention);

	/**
	 * 
	 * @author zoe
	 * @param houseIntention
	 * @return
	 */
	int selSimilarPhonePhiidCount(HouseIntention houseIntention);

	/**
	 * 定时器修改意向房源楼盘（私盘--->公盘）
	 * 
	 * @author zoe
	 */
	int updateHouseIntentionBulidType();

	/**
	 * 定时器修改意向房源楼盘（私盘--->公盘）
	 * 
	 * @author zoe
	 */
	int updateHouseIntentionBulidTypePrivate();

	/**
	 * 根据意向房源编号查询意向房源信息
	 * 
	 * @author zoe
	 * @param houseFollow
	 * @return
	 */
	HouseFollow selectHouseFollowPhiIdOne(HouseFollow houseFollow);

	/**
	 * 查询列表--房屋集中式、分散式类型
	 * 
	 * @作者 JiangQT
	 * @日期 2016年7月1日
	 *
	 * @param houseInformationState
	 * @return
	 */
	List<HouseInformationState> queryHouseInfoStateList(HouseInformationState houseInformationState);

	/**
	 * 查询列表--意向房源图片
	 * 
	 * @author zoe
	 * @param intentionImage
	 * @return
	 */
	List<HouseIntentionImage> queryHouseImageList(HouseIntentionImage intentionImage);

	List<HouseInformationStateRelation> queryHouseInfoStateListRelation(HouseInformationStateRelation stateRelation);
	
	/**
	 * 根据意向房源的推荐全体ID号查询推荐群名称
	 * @author zoe
	 * @param houseIntention
	 * @return
	 */
	List<HoseRecommendGroup> selectHoseRecommendGroup(HouseIntention houseIntention);
	
	/**
	 * APP查询意向房源
	 * 
	 * @param houseIntention
	 * @return
	 * @author 陈智颖
	 * @date Mar 21, 2017 6:02:03 PM
	 */
	List<HouseIntention> queryHouseIntentionAPP(HouseIntention houseIntention);
	
	/**
	 * 查询意向房源状态
	 * 
	 * @param houseIntention
	 * @return
	 * @author 陈智颖
	 * @date Mar 21, 2017 6:02:03 PM
	 */
	HouseIntention queryIntentionState(HouseIntention houseIntention);
	
	/**
	 * 查询意向图片
	 * 
	 * @param houseIntention
	 * @return
	 * @author 陈智颖
	 * @date Mar 21, 2017 6:02:03 PM
	 */
	List<HouseIntention> queryHouseIntentionImageType(HouseIntention houseIntention);
	
	/**
	 * 删除意向图片
	 * @param houseIntention
	 * @return
	 * @author 陈智颖
	 * @date Mar 28, 2017 3:43:41 PM
	 */
	Integer deleteIntentionImage(HouseIntention houseIntention);
	
	/**
	 * 查询意向房源信息
	 * @param hi_code
	 * @return
	 */
	HouseIntention queryIntentionHouseByHiCode(String hi_code);

	/**
	 * 删除意向房屋图片
	 * @author tanglei
	 */
	Integer deleteHouseIntentionImage (HouseIntentionImage houseImage);

	/**
	 * 根据图片地址查询图片信息
	 * @author tanglei
	 */
	HouseIntentionImage selectHouseIntentionImages (HouseIntentionImage houseImage);

	/**
	 * 删除意向房源图片类型
	 * @author tanglei
	 */
	Integer deleteHouseIntentionImageType (HouseIntentionImageType imageType);
	
}
