package com.gjp.controller;

import com.gjp.model.HouseImageVo;
import com.gjp.service.HouseImageService;
import com.gjp.service.HouseImageTypeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 房源的图片操作
 * 
 * @author zoe
 *
 */
@Controller
@RequestMapping("/image")
public class HouseImageController {

	// 房屋图片
	@Resource
	private HouseImageService houseImageService;
	// 房屋图片类型
	@Resource
	private HouseImageTypeService houseImageTypeService;

	/**
	 * AJAX查询房屋图片
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/selectImage")
	@ResponseBody
	public Map<String, Object> selectHouseHouseInformation(HttpServletRequest request, HttpServletResponse response, String hi_id) {
		int hi_ids = Integer.parseInt(hi_id);
		// 根据房屋编号查询图片编号
		List<Integer> hm_ids = houseImageTypeService.selectHmIdByHiId(hi_ids);
		List<String> hm_paths = new ArrayList<String>();
		for (Integer hm_id : hm_ids) {
			// 根据图片编号查询图片地址
			HouseImageVo houseImageVo = houseImageService.queryHouseImage(hm_id);
			if (houseImageVo != null) {
				hm_paths.add(houseImageVo.getHm_path());
			}
		}
		Map<String, Object> map = new HashMap<>();
		map.put("hm_paths", hm_paths);
		return map;
	}

}
