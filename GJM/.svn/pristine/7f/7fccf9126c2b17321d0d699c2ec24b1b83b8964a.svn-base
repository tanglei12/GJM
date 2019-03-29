package com.gjp.controller;

import com.gjp.model.HouseBookConfig;
import com.gjp.model.HouseBookSourceInfo;
import com.gjp.model.HouseBookTemplateInfo;
import com.gjp.model.HouseBookUserInfo;
import com.gjp.service.HouseBookConfigService;
import com.gjp.service.HouseBookSourceService;
import com.gjp.service.HouseBookTemplateService;
import com.gjp.service.HouseBookUserService;
import com.gjp.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.*;

/**
 * 预约配置controller
 * @author shenhx
 * 2017-03-14
 */
@Controller
@RequestMapping("/book")
public class HouseBookConfigController {

	@Resource
	private HouseBookConfigService houseBookConfigService;
	
	@Resource
	private HouseBookSourceService houseBookSourceService;
	
	@Resource
	private HouseBookTemplateService houseBookTemplateService;
	
	@Resource
	private HouseBookUserService houseBookUserService;

	/**
	 * 来源管理界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @author shenhongxi
	 */
	@RequestMapping("/bookSourceManage")
	public String bookSourceManage(HttpServletRequest request, HttpServletResponse response) {
		return "/book/houseBookSourceManage";
	}
	
	/****************************************** 模板管理  start **********************************************/
	/**
	 * 模板管理界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @author shenhongxi
	 */
	@RequestMapping("/bookTemplateManage")
	public String bookTemplateManage(HttpServletRequest request, HttpServletResponse response) {
		return "/book/houseBookTemplateManage";
	}
	
	@RequestMapping("/queryHouseBookTemplateForList")
	@ResponseBody
	public Map<String, Object> queryHouseBookTemplateForList(Integer pageNo, Integer pageSize, String bcId) {
		Msg<Object> msg = new Msg<>();
		HouseBookTemplateInfo houseBookTemplateInfo = new HouseBookTemplateInfo();
		Pagination<HouseBookTemplateInfo> pagination = new Pagination<>(pageNo, pageSize, houseBookTemplateInfo);
		pagination = houseBookTemplateService.queryHouseBookTemplateForList(pagination);
		return msg.toMap(pagination);
	}
	
	/**
	 * 跳转修改预约模板界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updateHouseBookTemplate")
	public String updateHouseBookTemplate(HttpServletRequest request,
			HttpServletResponse response, String bt_id) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		int ids = Integer.parseInt(bt_id);
		//传回编号
		request.setAttribute("id", ids);
		return "/book/houseBookTemplateEdit";
	}
	
	/**
	 * 跳转修预约模板界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/addHouseBookTemplate")
	public String addHouseBookTemplate(HttpServletRequest request,
			HttpServletResponse response) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		//传回编号
		return "/book/houseBookTemplateEdit";
	}
	
	/**
	 * 跳转修预约模板控件界面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/jumpHousBookConfig")
	public String jumpTemplateContent(HttpServletRequest request,
			Map<String, Object> map) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		String btIdStr = request.getParameter("bt_id");
		if(null != btIdStr && !btIdStr.isEmpty()){
			map.put("bt_id", Integer.parseInt(btIdStr));
		}
		
		String type = request.getParameter("type");
		if(null != type && !type.isEmpty()){
			map.put("type", type);
		}
		queryBookConfigParamTree(map);
		
		//传回编号
		return "/book/houseBookTemplateConfig";
	}
	
	/**
	 * 根据模板ID查询该模板下已配置的数据
	 * @return
	 */
	@RequestMapping("/queryBookConfigsForBcIds")
	@ResponseBody
	private Map<String, Object> queryHouseBookConfigFromIds(HttpServletRequest request, String bt_id){
		Map<String, Object> map = new HashMap<>();
		HouseBookTemplateInfo bookTemplateInfo = houseBookTemplateService.queryHouseBookTemplateById(Integer.parseInt(bt_id));
		String bc_ids = bookTemplateInfo.getBc_ids();
		List<String> bc_idsList = new ArrayList<String>();
		if(null != bc_ids && !"".equals(bc_ids)){
			
			String[] bc_idsArray = bc_ids.split("&");
			bc_idsList = new ArrayList<String>(Arrays.asList(bc_idsArray));
			HouseBookConfig bookConfig = new HouseBookConfig();
			bookConfig.setBc_idsList(bc_idsList);
			map.put("houseBookConfigsForBcIds", houseBookConfigService.queryHouseBookConfigFromIds(bookConfig));
		}
		map.put("bookTemplateInfo", bookTemplateInfo);
		return map;
	}
	
	
	/**
	 * 修改预约配置信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/saveBookUserInfo")
	public String saveBookUserInfo(HouseBookUserInfo houseBookUserInfo, Map<String, Object> map, HttpServletRequest request,
			HttpServletResponse response) {
		int result = houseBookUserService.addHouseBookUserInfo(houseBookUserInfo);
		return result > 0 ? "/book/houseBookSuccess" : "";
	}
	
	/**
	 * ajax根据id查询预约配置信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/queryHouseBookTemplateById")
	@ResponseBody
	public Map<String, Object> queryHouseBookTemplateById(
			HttpServletRequest request, HttpServletResponse response, String id) {
		HouseBookTemplateInfo houseBookTemplateInfo = new HouseBookTemplateInfo();
		//根据id查询预约配置信息
		houseBookTemplateInfo = houseBookTemplateService.queryHouseBookTemplateById(Integer.parseInt(id));
		Map<String, Object> map = new HashMap<>();
		map.put("houseBookTemplateInfo", houseBookTemplateInfo);
		return map;
	}
	
	/**
	 * ajax根据sourceId查询该来源的配置信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/querySource")
	@ResponseBody
	public Map<String, Object> querySource(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> map = new HashMap<>();
		//根据id查询预约配置信息
		List<HouseBookSourceInfo> houseBookSourceList = houseBookSourceService.queryBookSource();
		map.put("houseBookSourceList", houseBookSourceList);
		map.put("houseBookSourceListCount", houseBookSourceList.size());
		return map;
	}
	
	/**
	 * 保存模板信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/saveTemplateInfo")
	public String saveTemplateInfo(HouseBookTemplateInfo houseBookTemplateInfo,
			Model model, HttpServletRequest request,
			HttpServletResponse response) {
		
		Integer bt_id = -1;
		bt_id = houseBookTemplateInfo.getBt_id();
		String imgSrc = houseBookTemplateInfo.getTemplateImg();
		if (!imgSrc.equals("") && imgSrc.split(",").length > 1) {
			String realPath = request.getSession().getServletContext().getRealPath("/resources/userImage/");
			// 创建文件夹
			File upFile = new File(realPath);
			if (!upFile.exists()) {
				upFile.mkdirs();
			}
			imgSrc = imgSrc.split(",")[1];
			// 文件名称
			String imageName = AppUtil.getImageName("") + ".png";
			// 本地缓存地址
			String imageUrl = realPath + "/" + imageName;
			// base64转图片
			boolean boo = ImageUtil.base64ToImageFile(imgSrc, imageUrl);
			if (!boo) {
				request.setAttribute("error", "$.jBox.tip('图像上传失败');");
			}
			// 图片压缩
			File file = new File(imageUrl);
			try {
				ImageUtil.saveMinPhoto(file.toString(), file.toString(), 936, 0.9d);
			} catch (Exception e) {
				System.out.println("图片压缩失败");
			}
			// 远程上传
			String image = AppUtil.uploadUserImage(getClass(), file);
			houseBookTemplateInfo.setTemplateImg("/resources/userImage" + image);
		}
		//修改预约配置信息
		int result = 0;
		if(null != bt_id){
			result = houseBookTemplateService.updateHouseBookTemplate(houseBookTemplateInfo);
		} else {
			result = houseBookTemplateService.addHouseBookTemplate(houseBookTemplateInfo);
		}
		if(result != 0){
			request.setAttribute("success", "$.jBox.tip('保存预约模板信息成功');");
		}else{
			request.setAttribute("error", "$.jBox.tip('保存预约模板信息失败');");
		}
		
		request.getSession().removeAttribute("token");//移除session中的token
		
		return "/book/houseBookTemplateManage";
	}
	
	/****************************************** 模板管理  end **********************************************/
	
	/****************************************** 模板配置管理  start **********************************************/
	@RequestMapping("/initBookConfigTree")
	public String initBookConfigTree(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {
		queryBookConfigParamTree(map);
		return "/book/houseBookConfigManage";
	}

	private void queryBookConfigParamTree(Map<String, Object> map) {
		List<HouseBookConfig> houseBookConfigs = houseBookConfigService.queryHouseBookConfigs();
		StringBuffer sBuffer = new StringBuffer("[");
		for(HouseBookConfig houseBookConfig : houseBookConfigs){
			Integer id = houseBookConfig.getBc_id();
			String name = houseBookConfig.getFieldNameCn();
			Integer pid = houseBookConfig.getBc_pid();
//			String icon = "";
//			switch(houseBookConfig.getElementType()){
//			case "radio" :
//				icon = "/resources/image/book/radio_p.png";
//				break;
//			case "checkbox" :
//				icon = "/resources/image/book/checkbox_p.png";
//				break;
//			case "input" :
//				icon = "/resources/image/book/input_p.png";
//				break;
//			case "select" :
//				icon = "/resources/image/book/select_p.png";
//				break;
//			}
			
			sBuffer.append("{id:" + id + ",name:'" + name /*+ "',icon:'" + icon*/ + "',pid:" + pid + "},");
		}
		String str = sBuffer.substring(0, sBuffer.length() - 1) + "]";
		map.put("configJson", str);
	}
	
	/**
	 * 查询config所有数据
	 * @return
	 */
	@RequestMapping("/queryBookConfigs")
	@ResponseBody
	public Map<String, Object> queryBookConfigs(HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> map = new HashMap<>();
		List<HouseBookConfig> houseBookConfigs = houseBookConfigService.queryHouseBookConfigs();
		map.put("bookConfigs", houseBookConfigs);
		return map;
	}
	
	/**
	 * 修改预约配置信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/saveBookConfigParam")
	public String saveBookConfigParam(HouseBookConfig houseBookConfig,
			Map<String, Object> map, HttpServletRequest request,
			HttpServletResponse response) {
		Integer bcId = houseBookConfig.getBc_id();
		if(null != bcId && !"".equals(bcId)){
			houseBookConfigService.updateHouseBookConfig(houseBookConfig);
		} else {
			houseBookConfigService.addHouseBookConfig(houseBookConfig);
		}
		queryBookConfigParamTree(map);
		return "/book/houseBookConfigManage";
	}
	
	/**
	 * ajax根据id查询预约配置信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/queryHouseBookConfigById")
	@ResponseBody
	public Map<String, Object> queryHouseBookConfigById(
			HttpServletRequest request, HttpServletResponse response, String bc_id) {
		HouseBookConfig houseBookConfig = new HouseBookConfig();
//		houseBookConfig.setBc_id(Integer.parseInt(id));
		//根据id查询预约配置信息
		houseBookConfig = houseBookConfigService.queryHouseBookConfigById(Integer.parseInt(bc_id));
		Map<String, Object> map = new HashMap<>();
		map.put("houseBookConfig", houseBookConfig);
		return map;
	}
	
	/**
	 * ajax根据id查询预约配置信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/queryHouseBookConfigsById")
	@ResponseBody
	public Map<String, Object> queryHouseBookConfigsById(
			HttpServletRequest request, HttpServletResponse response, String bc_ids) {
		Map<String, Object> map = new HashMap<>();
		List<String> bc_idsList = new ArrayList<>();
		if(null != bc_ids && !"".equals(bc_ids)){
			String[] bc_idsArray = bc_ids.split("&");
			bc_idsList = new ArrayList<String>(Arrays.asList(bc_idsArray));
			HouseBookConfig bookConfig = new HouseBookConfig();
			bookConfig.setBc_idsList(bc_idsList);
			map.put("houseBookConfigs", houseBookConfigService.queryHouseBookConfigFatherAndSon(bookConfig));
		}
		//根据id查询预约配置信息
//		List<HouseBookConfig> houseBookConfigs = houseBookConfigService.queryHouseBookConfigsById(Integer.parseInt(bc_id));
//		json.put("houseBookConfigs", houseBookConfigs);
		return map;
	}
	
	@RequestMapping("/saveBcIds")
	public String saveBcIds(HttpServletRequest request,
			HttpServletResponse response, String bt_id, String bc_ids) {
		HouseBookTemplateInfo bookTemplateInfo = new HouseBookTemplateInfo();
		bookTemplateInfo.setBt_id(Integer.parseInt(bt_id));
		bookTemplateInfo.setBc_ids(bc_ids);
		bookTemplateInfo.setTemplateStatus("1");
		//修改预约配置信息
		int result = houseBookTemplateService.saveBcIds(bookTemplateInfo);
		if(result != 0){
			request.setAttribute("success", "$.jBox.tip('保存预约配置信息成功');");
		}else{
			request.setAttribute("error", "$.jBox.tip('保存预约配置信息失败');");
		}
		
		request.getSession().removeAttribute("token");//移除session中的token
		
		return "/book/houseBookTemplateManage";
	}
	
	
	/****************************************** 模板配置管理  end **********************************************/
	
	@RequestMapping("/queryHouseBookConfigForList")
	@ResponseBody
	public Map<String, Object> queryHouseBookConfigForList(Integer pageNo, Integer pageSize, String bcId) {
		Msg<Object> msg = new Msg<>();
		HouseBookConfig houseBookConfig = new HouseBookConfig();
		Pagination<HouseBookConfig> pagination = new Pagination<>(pageNo, pageSize, houseBookConfig);
		pagination = houseBookConfigService.queryHouseBookConfigForList(pagination);
		return msg.toMap(pagination);
	}
	
	/**
	 * 跳转修改房屋扩展信息界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updateHouseBookConfig")
	public String updateHouseBookConfig(HttpServletRequest request,
			HttpServletResponse response, String bc_id) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		int ids = Integer.parseInt(bc_id);
		//传回编号
		request.setAttribute("id", ids);
		return "/book/houseBookConfigUpd";
	}
	
	/**
	 * 跳转修改房屋扩展信息界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updateHouseBookParam")
	public String updateHouseBookParam(HttpServletRequest request,
			HttpServletResponse response, String bp_id) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		int ids = Integer.parseInt(bp_id);
		//传回编号
		request.setAttribute("id", ids);
		return "/book/houseBookParamUpd";
	}
	
	/**
	 * 跳转修改房屋扩展信息界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/addHouseBookConfig")
	public String addHouseBookConfig(HttpServletRequest request,
			HttpServletResponse response) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		//传回编号
		return "/book/houseBookConfigAdd";
	}
	
	/**
	 * 跳转修改房屋扩展信息界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/addHouseBookParam")
	public String addHouseBookParam(HttpServletRequest request,
			HttpServletResponse response) {
		//在导向编辑页面时，向request和session域中添加uuid随机数
		UUIDToken.generateUUIDToken(request);
		//传回编号
		return "/book/houseBookParamAdd";
	}
	
	/**
	 * 修改预约配置信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/updataInfo")
	public String updataInfo(HouseBookConfig houseBookConfig,
			Model model,String buyTime, HttpServletRequest request,
			HttpServletResponse response) {
		
		//判断是否重复提交
		if(!UUIDToken.isRepeatSubmit(request)){
			//修改预约配置信息
			int result = houseBookConfigService.updateHouseBookConfig(houseBookConfig);
			if(result != 0){
				request.setAttribute("success", "$.jBox.tip('修改预约配置信息成功');");
			}else{
				request.setAttribute("error", "$.jBox.tip('修改预约配置信息失败');");
			}
        }else{
        	return "/book/houseBookConfigManage";
        }
		
		request.getSession().removeAttribute("token");//移除session中的token
		
		return "/book/houseBookConfigManage";
	}
	
	/**
	 * ajax根据sourceId查询该来源的配置信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/queryHouseBookConfigFromSource")
	public String queryHouseBookConfigFromSource(HttpServletRequest request, Map<String, Object> map) {
		String sourceId = (String) request.getParameter("sourceId");
		HouseBookTemplateInfo bookTemplateInfo = houseBookTemplateService.queryHouseBookTemplateBySourceId("%" + sourceId+"&%");
		String bc_ids = bookTemplateInfo.getBc_ids();
		String[] bc_idsArray = bc_ids.split("&");
		List<String> bc_idsList = new ArrayList<String>(Arrays.asList(bc_idsArray));
		HouseBookConfig bookConfig = new HouseBookConfig();
		bookConfig.setBc_idsList(bc_idsList);
		map.put("houseBookConfigsForBcIds", houseBookConfigService.queryHouseBookConfigFromIds(bookConfig));
		
		map.put("type", "jump");
		map.put("bt_id", bookTemplateInfo.getBt_id());
		map.put("configJson", "");
		map.put("bs_id", sourceId);
		
		//传回编号
		return "/book/houseBookTemplateConfig";
	}
	
	@RequestMapping("/queryHouseBookSourceForList")
	@ResponseBody
	public Map<String, Object> queryHouseBookSourceForList(Integer pageNo, Integer pageSize, String bsId) {
		Msg<Object> msg = new Msg<>();
		HouseBookSourceInfo houseBookSourceInfo = new HouseBookSourceInfo();
		Pagination<HouseBookSourceInfo> pagination = new Pagination<>(pageNo, pageSize, houseBookSourceInfo);
		pagination = houseBookSourceService.queryHouseBookSourceForList(pagination);
		return msg.toMap(pagination);
	}
	
	/**
	 * 添加来源信息
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/saveBookSource")
	@ResponseBody
	public Map<String, Object> addBookSource(HttpServletRequest request, Integer bs_id, String sourceId, String sourceName,
			HttpServletResponse response) {
		Map<String, Object> map = new HashMap<>();
		HouseBookSourceInfo houseBookSourceInfo = new HouseBookSourceInfo();
		houseBookSourceInfo.setSourceId(sourceId);
		houseBookSourceInfo.setSourceName(sourceName);
		
		Integer bools = null != bs_id ? houseBookSourceService.updateHouseBookSource(houseBookSourceInfo) : houseBookSourceService.addHouseBookSource(houseBookSourceInfo);
		map.put("message", bools > 0 ? "success" : "error");
		
		return map;
	}
	
	/**
	 * 查询来源信息
	 * 
	 * @param bs_id
	 * @return
	 * @author shenhx
	 */
	@RequestMapping("/queryBookSourceById")
	@ResponseBody
	public Map<String, Object> queryBookSourceById(HttpServletRequest request, HttpServletResponse response, Integer bs_id) {
		Map<String, Object> map = new HashMap<>();
		map.put("houseBookSourceInfo", houseBookSourceService.queryHouseBookSourceById(bs_id));
		return map;
	}
	
}
