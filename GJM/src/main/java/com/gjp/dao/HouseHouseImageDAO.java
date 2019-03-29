package com.gjp.dao;

import com.gjp.model.HouseImageVo;
import com.gjp.model.HouseIntentionImage;
import com.gjp.model.RentHouseFileVo;

import java.util.List;

/**
 * 上传图片Dao
 * 
 * @author zoe
 *
 */
public interface HouseHouseImageDAO {

	/**
	 * 保存图片路径
	 * 
	 * @param houseHouseImage
	 * @return
	 */
	int addHouseImage(HouseImageVo houseHouseImage);

	/**
	 * 根据图片路径查询意向图片编码
	 * 
	 * @param hm_path
	 * @return
	 */
	int selectHouseIntentionImageId(String him_path);

	/**
	 * 添加意向房源图片进GJP_House_Intention_Image表
	 * 
	 * @param houseIntentionImage
	 * @return
	 */
	int addHouseIntentionImage(HouseIntentionImage houseIntentionImage);

	/**
	 * 根据编号删除图片
	 * 
	 * @param him_id
	 * @return
	 */
	int deleteIntentionImage(int him_id);

	/**
	 * 根据意向房源编号查询意向房源图片
	 * 
	 * @param phi_id
	 * @return
	 */
	HouseIntentionImage selectImageById(int phi_id);

	/**
	 * 根据编号删除图片 GJP_House_Image表
	 * 
	 * @param hm_id
	 * @return
	 */
	int deleteImage(int hm_id);

	/**
	 * 更新房屋图片
	 * 
	 * @作者 JiangQT
	 * @日期 2016年6月3日
	 * @param houseImage
	 * @return
	 */
	int updateHouseImage(HouseImageVo houseImage);

	/**
	 * 查询房屋照片
	 * 
	 * @param houseHouseImage
	 * @return
	 * @author 王孝元
	 */
	List<HouseImageVo> queryHouseImageList(HouseImageVo houseHouseImage);

	/**
	 * 查询房屋照片
	 * 
	 * @param houseHouseImage
	 * @return
	 * @author shenhx
	 */
	List<HouseImageVo> queryImgListByHiCodeAndHifName(HouseImageVo houseHouseImage);

	HouseImageVo queryHouseImage(HouseImageVo houseImageVo);

	/**
	 * 查询房源图片列表文件夹
	 * 
	 * @param houseImageVo
	 * @return
	 */
	List<HouseImageVo> queryHouseImageListByFolder(HouseImageVo houseImageVo);
	
	/**
	 * 查询文件夹图片
	 * @author tanglei
	 * date 2017年7月4日 下午18:25:40
	 */
	List<HouseImageVo> selectFoldsImgs (HouseImageVo houseImageVo);
	
	/**
	 * 获取相册封面信息
	 * @author tanglei 
	 * date 2017年7月5日 下午15:03:40
	 */
	List<HouseImageVo> selectHouseImageVo(HouseImageVo houseImageVo);

	/**
	 * 更新图片同步状态
	 * @param houseImageVo
	 * @return
	 */
	int updateImageAlisync(HouseImageVo houseImageVo);

	/**
	 * 删除支付宝返回的图片路径数据
	 * @param rentHouseFileVo
	 * @return
	 */
	int deleteRentFileByCode(RentHouseFileVo rentHouseFileVo);
}
