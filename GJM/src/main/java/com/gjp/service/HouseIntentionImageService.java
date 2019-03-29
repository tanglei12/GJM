package com.gjp.service;


import com.gjp.dao.HouseIntentionImageDao;
import com.gjp.model.HouseIntentionImage;
import com.gjp.model.HouseIntentionImageType;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


/**
 * @author 陈智颖
 *
 * @version 创建时间：2016年4月20日 下午3:56:26
 */
@Service
public class HouseIntentionImageService {

	private @Resource HouseIntentionImageDao houseIntentionImageDao;

	public String updateHouseIntentionImageType(HouseIntentionImage houseIntentionImage){
		String str = "";
		Integer integer = houseIntentionImageDao.updateHouseIntentionImageHimType(houseIntentionImage);
		if(integer != null && integer > 0){
			str = "success";
		}else{
			str = "error";
		}
		return str;
	}
	
	public String updateHouseIntentionImagetypeType(HouseIntentionImageType houseIntentionImageType){
		String str = "";
		Integer integer = houseIntentionImageDao.updateHouseIntentionImageTypehintType(houseIntentionImageType);
		if(integer != null && integer > 0){
			str = "success";
		}else{
			str = "error";
		}
		return str;
	}
	
	public HouseIntentionImage selectHouseIntentionImageType(HouseIntentionImage houseIntentionImage){
		return houseIntentionImageDao.selectHouseIntentionImagePage(houseIntentionImage);
	}
	
	public HouseIntentionImage selectHouseIntentionImage(HouseIntentionImage houseIntentionImage){
		return houseIntentionImageDao.selectHouseIntentionImage(houseIntentionImage);
	}
	
	public List<HouseIntentionImage> selectHouseIntentionImageList(HouseIntentionImage houseIntentionImage){
		return houseIntentionImageDao.selectHouseIntentionImageList(houseIntentionImage);
	}
}
