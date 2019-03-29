package com.gjp.controller;

import com.alibaba.fastjson.JSONObject;
import com.gjp.model.UserDictionary;
import com.gjp.model.UserDistrictDictionary;
import com.gjp.service.UserDictionaryService;
import com.gjp.util.AppUtil;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 数据字典
 * @author shenhx
 *
 */
@Controller
@RequestMapping("/dictionary")
public class UserDictionaryController {

	@Resource
	private UserDictionaryService userDictionaryService;
	
	/**
	 * 跳转数据字典
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @author shenhongxi
	 */
	@RequestMapping("/dictionaryConfig")
	public ModelAndView bookSourceManage(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView("/system/dictionaryConfig");
		
		String pInfoNames = "";
		UserDictionary dictionary = new UserDictionary();
		List<UserDictionary> userDictionarieList = userDictionaryService.queryDictionaryList(dictionary);
		StringBuffer sBuffer = new StringBuffer("[");
		if(null != userDictionarieList && !userDictionarieList.isEmpty()){
			for (UserDictionary userDictionary : userDictionarieList) {
				Integer dr_id = userDictionary.getDr_id();
				Integer dr_pid = userDictionary.getDr_pid();
				String propertyId = userDictionary.getPropertyId();
				String dictionary_name = userDictionary.getDictionary_name();
				String dictionary_value = userDictionary.getDictionary_value();
				String dictionary_status = userDictionary.getDictionary_status();
				String remark = userDictionary.getRemark();
				sBuffer.append("{id:" + dr_id + ",pid:" + dr_pid + ", name : '" + dictionary_name + "', propertyId : '" + propertyId +"',dictionary_value:'" + dictionary_value + "', dictionary_status : '" + dictionary_status + "', remark : '" + remark + "'},");
			}
			
			pInfoNames = sBuffer.substring(0, sBuffer.length() - 1) + "]";
		} else {
			
			pInfoNames = "[]";
		}
		modelAndView.addObject("pInfoNames", pInfoNames);
		return modelAndView;
	}
	
	/**
	 * 添加参数
	 * 
	 * @return
	 *
	 * @author shenhx
	 */
	@RequestMapping("saveDictionaryInfo")
	@ResponseBody
	public Map<String, Object> addDictionaryInfo(@RequestBody Map<String, Object> data) {
		Map<String, Object> map = new HashMap<>();
		UserDictionary userDictionary = JSONObject.parseObject((String) data.get("UserDictionary"), UserDictionary.class);
		userDictionary.setUpdate_time(new Date());
		
		Integer count = userDictionaryService.queryCountByPropertyID(userDictionary);
		if(count > 0){
			map.put("error", "编号已存在，请重新录入！");
		}
		
		Integer dr_id = userDictionary.getDr_id();
		
		int addresult = (null == dr_id) ? userDictionaryService.addDictionaryInfo(userDictionary) : userDictionaryService.updDictionaryInfo(userDictionary);
		map.put("addresult", addresult);
		return map;
	}
	
	/**
	 * 添加参数
	 * 
	 * @return
	 *
	 * @author shenhx
	 */
	@RequestMapping("searchDictionaryInfo")
	@ResponseBody
	public Map<String, Object> searchDictionaryInfo(String dictionaryName) {
		Map<String, Object> map = new HashMap<>();
		String pInfoNames = "";
		
		UserDictionary dictionary = new UserDictionary();
		if(!"".equals(dictionaryName)){
			dictionary.setDictionary_name(dictionaryName);
		}
		List<UserDictionary> userDictionarieList = userDictionaryService.queryDictionaryList(dictionary);
		StringBuffer sBuffer = new StringBuffer("[");
		if(null != userDictionarieList && !userDictionarieList.isEmpty()){
			for (UserDictionary userDictionary : userDictionarieList) {
				Integer dr_id = userDictionary.getDr_id();
				Integer dr_pid = userDictionary.getDr_pid();
				String propertyId = userDictionary.getPropertyId();
				String dictionary_name = userDictionary.getDictionary_name();
				String dictionary_value = userDictionary.getDictionary_value();
				String dictionary_status = userDictionary.getDictionary_status();
				String remark = userDictionary.getRemark();
				sBuffer.append("{id:" + dr_id + ",pid:" + dr_pid + ", name : '" + dictionary_name + "', propertyId : '" + propertyId +"',dictionary_value:'" + dictionary_value + "', dictionary_status : '" + dictionary_status + "', remark : '" + remark + "'},");
			}
			
			pInfoNames = sBuffer.substring(0, sBuffer.length() - 1) + "]";
		} else {
			
			pInfoNames = "[]";
		}
		map.put("pInfoNames", pInfoNames);
		return map;
	}

	/**
	 * 行政区字典
	 * @param idCardNum
	 * @return
	 */
	@RequestMapping("/queryDistrictDictionary")
	@ResponseBody
	public Map<String, Object> queryDistrictDictionary(String idCardNum) {
		Map<String, Object> map = new HashMap<>();

		if(!AppUtil.isNotNull(idCardNum)){
			map.put("code", 400);
			map.put("msg", "证件号码为空");
			return map;
		}

		if(!AppUtil.isCardId(idCardNum)){
			map.put("code", 400);
			map.put("msg", "身份证号码错误");
			return map;
		}

		String district_address = "";

		UserDistrictDictionary userDistrictDictionary = new UserDistrictDictionary();
		userDistrictDictionary.setPc_id(idCardNum.substring(0, 2));
		userDistrictDictionary.setCi_id(idCardNum.substring(2, 4));
		userDistrictDictionary.setSj_id(idCardNum.substring(4, 6));
		district_address = userDictionaryService.queryDistrictDictionary(userDistrictDictionary);

		if(StringUtils.isEmpty(district_address)){
			UserDistrictDictionary userDistrictDictionary2 = new UserDistrictDictionary();
			userDistrictDictionary2.setPc_id(idCardNum.substring(0, 2));
			userDistrictDictionary2.setCi_id(idCardNum.substring(2, 4));
			district_address = userDictionaryService.queryDistrictDictionary(userDistrictDictionary2);

			if(StringUtils.isEmpty(district_address)){
				UserDistrictDictionary userDistrictDictionary3 = new UserDistrictDictionary();
				userDistrictDictionary3.setPc_id(idCardNum.substring(0, 2));
				district_address = userDictionaryService.queryDistrictDictionary(userDistrictDictionary3);

				if(StringUtils.isEmpty(district_address)){
					map.put("code", 402);
					map.put("msg", "无行政区地址");
					return map;
				}
			}
		}

		map.put("code", 200);
		map.put("district_address", district_address);
		map.put("sex", AppUtil.getCardIDSex(idCardNum));

		return map;
	}
}
