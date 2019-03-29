package com.gjp.dao;

import com.gjp.model.HoseRecommendGroup;
import com.gjp.util.PageModel;

import java.util.List;

/**
 * 适合推荐群体Dao
 * @author zoe
 *
 */
public interface HoseRecommendGroupDAO {

	/**
	 * 查询适合推荐群体List
	 * @return
	 */
	List<HoseRecommendGroup> selectHoseRecommendGroupList();

	/**
	 * 添加推荐群体
	 * @param hoseRecommendGroup
	 * @return
	 */
	int addHoseRecommendGroup(HoseRecommendGroup hoseRecommendGroup);

	/**
	 * 查询推荐群体编号
	 * @param hoseRecommendGroup
	 * @return
	 */
	int selectRecommendGroup_Id(HoseRecommendGroup hoseRecommendGroup);

	/**
	 * 分页查询推荐群体list
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	PageModel<HoseRecommendGroup> selectRecommendGroup(int pageNo,
			int pageSize);

	/**
	 * 根据id查询推荐群体
	 * @param recommendGroup_Id
	 * @return
	 */
	HoseRecommendGroup selectHoseRecommendGroupById(int recommendGroup_Id);

	/**
	 * 修改推荐群体
	 * @param hoseRecommendGroup
	 * @return
	 */
	int updataInfo(HoseRecommendGroup hoseRecommendGroup);

}
