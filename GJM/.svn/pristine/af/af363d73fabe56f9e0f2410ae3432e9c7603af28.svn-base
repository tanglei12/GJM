package com.gjp.service;

import com.gjp.dao.HouseImageTypeDAO;
import com.gjp.model.HouseHouseImageType;
import com.gjp.model.HouseImageType;
import com.gjp.model.HouseIntentionImageType;
import com.gjp.model.HouseLibraryImageTypeVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 图片类型service
 * 
 * @author zoe
 *
 */
@Service
public class HouseImageTypeService {
	@Resource
	private HouseImageTypeDAO houseImageTypeDAO;

	/**
	 * 添加房屋图片类型
	 * 
	 * @param houseHouseImageType
	 * @return
	 */
	public int addHouseImageType(HouseHouseImageType houseHouseImageType) {
		return houseImageTypeDAO.addHouseImageType(houseHouseImageType);
	}

	/**
	 * 根据房屋编号查询图片编号
	 * 
	 * @param hi_ids
	 * @return
	 */
	public List<Integer> selectHmIdByHiId(int hi_ids) {
		return houseImageTypeDAO.selectHmIdByHiId(hi_ids);
	}

	/**
	 * 添加意向房源房屋图片类型
	 * 
	 * @param houseIntentionImageType
	 * @return
	 */
	public int addHouseIntentionImageType(HouseIntentionImageType houseIntentionImageType) {
		return houseImageTypeDAO.addHouseIntentionImageType(houseIntentionImageType);
	}

	/**
	 * 根据编号删除图片类型
	 * 
	 * @param parseInt
	 * @return
	 */
	public int deleteHouseIntentionImageType(int parseInt) {
		return houseImageTypeDAO.deleteHouseIntentionImageType(parseInt);
	}

	/**
	 * 根据编号删除图片类型
	 * 
	 * @param hm_id
	 * @return
	 */
	public int deleteImageType(Integer hm_id) {
		return houseImageTypeDAO.deleteImageType(hm_id);
	}

	/**
	 * 查询意向房屋图片类型
	 * 
	 * @param parseInt
	 * @return
	 */
	public List<HouseIntentionImageType> selectImageTypeById(int phi_id) {
		return houseImageTypeDAO.selectImageTypeById(phi_id);
	}

	/**
	 * 修改房屋图片编码
	 * 
	 * @param houseIntentionmage
	 * @return
	 */
	public int updata(HouseIntentionImageType houseIntentionmage) {
		return houseImageTypeDAO.updata(houseIntentionmage);
	}

	/**
	 * 查询库存房屋图片
	 * 
	 * @param parseInt
	 * @return
	 */
	public List<HouseIntentionImageType> selectImage(int hi_id) {
		return houseImageTypeDAO.selectImage(hi_id);
	}

	/**
	 * 查询已发布房屋图片
	 * 
	 * @param parseInt
	 * @return
	 */
	public List<HouseHouseImageType> selectHouseImage(int hi_id) {
		return houseImageTypeDAO.selectHouseImage(hi_id);
	}

	/**
	 * 根据编号删除图片类型
	 * 
	 * @param parseInt
	 * @return
	 */
	public int deleteHouseImageType(HouseLibraryImageTypeVo imageTypeVo) {
		return houseImageTypeDAO.deleteHouseImageType(imageTypeVo);
	}

	/**
	 * 根据房屋信息查询页面显示房屋图片
	 * 
	 * @param houseImageType
	 * @return
	 */
	public List<HouseImageType> queryAllHouseImageType(HouseImageType houseImageType) {
		return houseImageTypeDAO.houseImageTypeDAO(houseImageType);
	}

	/**
	 * 根据编码查询所有图片
	 * 
	 * @param houseImageType
	 * @return
	 */
	public List<HouseImageType> queryAllHouseImage(HouseImageType houseImageType) {
		return houseImageTypeDAO.queryAllHouseImage(houseImageType);
	}

	/**
	 * 根据房屋信息查询页面显示房屋图片
	 * 
	 * @param houseImageType
	 * @return
	 */
	public List<HouseImageType> queryAllHouseImageTypeS(HouseImageType houseImageType) {
		return houseImageTypeDAO.queryAllHouseImageTypeS(houseImageType);
	}

	/**
	 * 根据房屋房屋编码查询图片
	 * 
	 * @param houseImageType
	 * @return
	 */
	public List<HouseImageType> queryAllHouseImageTypeX(HouseImageType houseImageType) {
		return houseImageTypeDAO.queryAllHouseImageTypeX(houseImageType);
	}

	/**
	 * 添加库存房屋图片类型
	 * 
	 * @author zoe
	 * @param houseIntentionImageType
	 * @return
	 */
	public int addHouseIntentionImageTypes(HouseIntentionImageType houseIntentionImageType) {
		return houseImageTypeDAO.addHouseIntentionImageTypes(houseIntentionImageType);
	}

	/**
	 * 更新房屋图片标签
	 * 
	 * @param houseImageType
	 * @return
	 * @author JiangQT
	 */
	public boolean updateHouseImageType(HouseHouseImageType houseImageType) {
		return houseImageTypeDAO.updateHouseImageType(houseImageType) > 0;
	}

}
