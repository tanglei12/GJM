package com.gjp.dao;

import com.gjp.model.HouseHouseImageType;
import com.gjp.model.HouseImageType;
import com.gjp.model.HouseIntentionImageType;
import com.gjp.model.HouseLibraryImageTypeVo;

import java.util.List;

/**
 * 图片类型Dao
 * 
 * @author zoe
 *
 */
public interface HouseImageTypeDAO {

	/**
	 * 添加房屋图片类型
	 * 
	 * @param houseHouseImageType
	 * @return
	 */
	Integer addHouseImageType(HouseHouseImageType houseHouseImageType);

	/**
	 * 根据房屋编号查询图片编号
	 * 
	 * @param hi_ids
	 * @return
	 */
	List<Integer> selectHmIdByHiId(int hi_ids);

	/**
	 * 添加意向房源房屋图片类型
	 * 
	 * @param houseIntentionImageType
	 * @return
	 */
	int addHouseIntentionImageType(HouseIntentionImageType houseIntentionImageType);

	/**
	 * 根据编号删除图片类型
	 * 
	 * @param parseInt
	 * @return
	 */
	int deleteHouseIntentionImageType(int parseInt);

	/**
	 * 根据编号删除图片类型
	 * 
	 * @param hm_id
	 * @return
	 */
	int deleteImageType(Integer hm_id);

	/**
	 * 查询意向房屋图片类型
	 * 
	 * @param phi_id
	 * @return
	 */
	List<HouseIntentionImageType> selectImageTypeById(int phi_id);

	/**
	 * 修改房屋图片编码
	 * 
	 * @param houseIntentionmage
	 * @return
	 */
	int updata(HouseIntentionImageType houseIntentionmage);

	/**
	 * 查询库存房屋图片
	 * 
	 * @param phi_id
	 * @return
	 */
	List<HouseIntentionImageType> selectImage(int hi_id);

	/**
	 * 查询已发布房屋图片
	 * 
	 * @param hi_id
	 * @return
	 */
	List<HouseHouseImageType> selectHouseImage(int hi_id);

	/**
	 * 根据编号删除图片类型
	 * 
	 * @param imageTypeVo
	 * @return
	 */
	int deleteHouseImageType(HouseLibraryImageTypeVo imageTypeVo);

	/**
	 * 根据房屋信息查询页面显示房屋图片
	 * 
	 * @param houseImageType
	 * @return
	 */
	List<HouseImageType> houseImageTypeDAO(HouseImageType houseImageType);

	/**
	 * 根据房屋信息查询页面显示房屋图片
	 * 
	 * @param houseImageType
	 * @return
	 */
	List<HouseImageType> queryAllHouseImageTypeS(HouseImageType houseImageType);

	/**
	 * 根据编码查询所有图片
	 * 
	 * @param houseImageType
	 * @return
	 */
	List<HouseImageType> queryAllHouseImage(HouseImageType houseImageType);

	/**
	 * 根据房屋房屋编码查询图片
	 * 
	 * @param houseImageType
	 * @return
	 */
	List<HouseImageType> queryAllHouseImageTypeX(HouseImageType houseImageType);

	/**
	 * 添加库存房屋图片类型
	 * 
	 * @author zoe
	 * @param houseIntentionImageType
	 * @return
	 */
	int addHouseIntentionImageTypes(HouseIntentionImageType houseIntentionImageType);

	/**
	 * 更新房屋图片标签
	 * 
	 * @作者 JiangQT
	 * @日期 2016年6月3日
	 * @param houseImageType
	 * @return
	 */
	int updateHouseImageType(HouseHouseImageType houseImageType);

}
