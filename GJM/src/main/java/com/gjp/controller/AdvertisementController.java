package com.gjp.controller;

import com.alibaba.fastjson.JSONObject;
import com.gjp.model.*;
import com.gjp.service.ActivityService;
import com.gjp.service.AdvertisementService;
import com.gjp.service.UserCenterEmployeeService;
import com.gjp.service.UserDictionaryService;
import com.gjp.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 广告列表
 * @author tanglei
 * date 2017年7月7日 下午5:48:40
 */
@Controller
@RequestMapping("/advertisement")
public class AdvertisementController {
	@Resource
	private UserCenterEmployeeService userCenterEmployeeService;
	@Resource
	private AdvertisementService advertisementService;
	@Resource
	private UserDictionaryService userDictionaryService;
	@Resource
	private ActivityService activityService;

	
	/**
	 * 跳转广告页
	 * @author tanglei
	 * date 2017年7月7日 下午5:48:40
	 */
	@RequestMapping("/advert")
	public String advert () {
		return "/advertisement/advertisementList";
	}
	
	/**
	 * 广告列表
	 * @author tanglei 
	 * date 2017年7月7日 下午6:00:40
	 * @throws ParseException 
	 */
	@RequestMapping("/advertList")
	@ResponseBody
	public Map<String,Object> advertLsit(TableList tableList1) throws ParseException {
		// 初始化获取对象
		TableList tableList = tableList1.initData(tableList1);
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		HouseModel houseModel = new HouseModel();
		if (tableList.getDateStart() != null && !tableList.getDateStart().equals("")) {
			houseModel.setDateStart(sf.parse(tableList.getDateStart()));
		}
		if (tableList.getDateEnd() != null && !tableList.getDateEnd().equals("")) {
			houseModel.setDateEnd(sf.parse(tableList.getDateEnd()));
		}
		houseModel.setSqlWhere(tableList.getSqlWhere());

		houseModel.setDateTitle(tableList.getDateType());
		if (tableList.getOrderBy() != null && !tableList.getOrderBy().equals("")) {
			houseModel.setSqlOrderBy("order by " + tableList.getOrderBy() + " asc");
		} else {
			houseModel.setSqlOrderBy("order by ad_time DESC ");
		}
		// 装载数据类
		DataList<Advertisement> datalist = new DataList<Advertisement>();
		int pageSize = Integer.parseInt(AppUtil.getCookie("pageSize"));
		// 分页设置查询条数
		PageModel<Advertisement> pageModel1 = advertisementService.selectAdvertisement(tableList.getPageNo(), pageSize, houseModel);
		Map<String, Object> map = datalist.dataList(pageModel1.getList(), tableList.getPageNo(), pageSize, pageModel1.getTotalRecords(), pageModel1.getSumMoney());
		return map;
	}
	
	/**
	 * 跳转添加广告页面
	 * @author tanglei
	 * date 2017年7月8日 上午10:20:40
	 */
	@RequestMapping("/addAdvertisement")
	public String addAdvertisement(Model model) {
		Msg<Object> msg = new Msg<>();
		UserCenterEmployee employee = AppUtil.getCookieEmployee();
		if (employee == null){
			return msg.toError(Msg.MSG_LOGIN_ERROR);
		}
		UserCenterEmployee user=userCenterEmployeeService.selectUserCenterEmployeeById(employee.getEm_id());
		model.addAttribute("user", user);
		//发布渠道
		List<UserDictionary> list=userDictionaryService.queryDictionaryByPropertyId("channel");
		model.addAttribute("list",list);
		//发布位置
		List<UserDictionary> listPosition=userDictionaryService.queryDictionaryByPropertyId("ad_position");
		model.addAttribute("listPosition",listPosition);
		//活动标题
		List<ActivityManageVo> activityList=activityService.selectActivityManageTitle();
		model.addAttribute("activityList",activityList);
		return "advertisement/addAdvertisement";
	}
	
	/**
	 * 保存发布
	 * @author tanglei
	 * date 2017年7月8日 上午10:20:40
	 * @throws IOException 
	 */
	@RequestMapping("/saveAddAdvertisement")
	@ResponseBody
	public String saveAddAdvertisement(String result) throws IOException {
		Msg<Object> msg = new Msg<>();
		UserCenterEmployee employee = AppUtil.getCookieEmployee();
		if (employee == null){
			return msg.toError(Msg.MSG_LOGIN_ERROR);
		}
		Advertisement ad=JSONObject.parseObject(result, Advertisement.class);
		if (ad.getAd_state() == 1) {
			int count=advertisementService.countAdvertisement(ad);
			if (count >5) {
				msg.setCode(110);
				msg.setMsg("此渠道广告已到达上限，暂时无法添加");
				return msg.toString();
			} else {
				ad.setAd_em_id(employee.getEm_id());
				ad.setAd_time(new Date());
				boolean boo=advertisementService.addAdvertisement(ad);
				
//				// 获取properties路劲
//				String path = this.getClass().getResource("/conf/adverHtml.properties").getPath();
//				// 把properties文件转化输出流
//				InputStream in = new BufferedInputStream(new FileInputStream(path));
//				Properties properties = new Properties();
//				properties.load(in);
//				//
//				String imagePath = properties.getProperty("HtmlGenerator.Url");
//
//				HtmlGenerator h = new HtmlGenerator("webappname");
//				h.createHtmlPage(imagePath+"?ad_id="+ad.getAd_id()+"&ad_am_code="+ad.getAd_am_code(),req.getSession().getServletContext().getRealPath("/")+"/resources/html/"+ad.getAd_name()+".html");
//				ad.setAd_url(imagePath+"?ad_id="+ad.getAd_id()+"&ad_am_code="+ad.getAd_am_code());
				ad.setAd_url(ad.getAd_url()+"?ad_id="+ad.getAd_id()+"&ad_am_code="+ad.getAm_code());
				boo=advertisementService.updateAdvertisement(ad);
				if (!boo) {
					msg.setCode(110);
					msg.setMsg("修改失败");
					return msg.toString();
				}
			} 
		} else {
			ad.setAd_em_id(employee.getEm_id());
			ad.setAd_time(new Date());
			boolean boo=advertisementService.addAdvertisement(ad);
			if (!boo) {
				msg.setCode(110);
				msg.setMsg("添加失败");
				return msg.toString();
			}
		}
		return msg.toString();
	}
	
	/**
	 * 跳转修改页
	 * @author tanglei
	 * date 2017年7月8日 下午16:55:40
	 */
	@RequestMapping("/updateAdvertisement")
	public String updateAdvertisement (HttpServletRequest req,Model model,int ad_id) {
		Advertisement advertisement=new Advertisement();
		advertisement.setAd_id(ad_id);
		advertisement=advertisementService.selectOneAdvertisement(advertisement);
		if (advertisement.getAd_image() != null) {
			advertisement.setAd_image(OSSparameter.imagePath(advertisement.getAd_image(),null,null));
		}
		model.addAttribute("ad",advertisement);
		List<UserDictionary> list=userDictionaryService.queryDictionaryByPropertyId("channel"); 
		model.addAttribute("list",list);
		List<UserDictionary> listPosition=userDictionaryService.queryDictionaryByPropertyId("ad_position"); //发布位置
		model.addAttribute("listPosition",listPosition);
		//活动标题
		List<ActivityManageVo> activityList=activityService.selectActivityManageTitle();
		model.addAttribute("activityList",activityList);
		return "advertisement/updateAdvertisement";
	}
	
	/**
	 * 修改
	 * @author tanglei
	 * date 2017年7月9日 上午9:32:40
	 * @throws IOException 
	 */
	@RequestMapping("/upAdvertisement")
	@ResponseBody
	public String updateAdvertisement(String result) throws IOException {
		Msg<Object> msg = new Msg<>();
		UserCenterEmployee employee = AppUtil.getCookieEmployee();
		if (employee == null){
			return msg.toError(Msg.MSG_LOGIN_ERROR);
		}
		Advertisement ad=JSONObject.parseObject(result, Advertisement.class);
		if (ad.getAd_state() ==1) {
			int count=advertisementService.countAdvertisement(ad);
			if (count >5) {
				msg.setCode(110);
				msg.setMsg("此渠道广告已到达上限，暂时无法修改");
				return msg.toString();
			} else {
				ad.setAd_em_id(employee.getEm_id());
				ad.setAd_time(new Date());
				boolean boo=advertisementService.updateAdvertisement(ad);
				
				/*// 获取properties路劲
				String path = this.getClass().getResource("/conf/adverHtml.properties").getPath();
				// 把properties文件转化输出流
				InputStream in = new BufferedInputStream(new FileInputStream(path));
				Properties properties = new Properties();
				properties.load(in);
				//
				String imagePath = properties.getProperty("HtmlGenerator.Url");
				
				HtmlGenerator h = new HtmlGenerator("webappname");  
				h.createHtmlPage(imagePath+"?ad_id="+ad.getAd_id()+"&ad_am_code="+ad.getAd_am_code(),req.getSession().getServletContext().getRealPath("/")+"/resources/html/"+ad.getAd_name()+".html");
				ad.setAd_url(imagePath+"?ad_id="+ad.getAd_id()+"&ad_am_code="+ad.getAd_am_code());*/
				ad.setAd_url(ad.getAd_url()+"?ad_id="+ad.getAd_id()+"&ad_am_code="+ad.getAm_code());
				boo=advertisementService.updateAdvertisement(ad);
				if (!boo) {
					msg.setCode(110);
					msg.setMsg("修改失败");
					return msg.toString();
				}
			}
		} else {
			ad.setAd_em_id(employee.getEm_id());
			ad.setAd_time(new Date());
			boolean boo=advertisementService.updateAdvertisement(ad);
			if (!boo) {
				msg.setCode(110);
				msg.setMsg("修改失败");
				return msg.toString();
			}
		}
		return msg.toString();
	}
	
	/**
	 * 删除
	 * @author tanglei
	 * date 2017年7月9日 下午13:24:40
	 */
	@RequestMapping("/delAdvertisement")
	@ResponseBody
	public String delAdvertisement (HttpServletRequest req,int ad_id) {
		Msg<Object> msg = new Msg<>();
		Advertisement ad=new Advertisement();
		ad.setAd_id(ad_id);
		ad.setAd_state(3);
		boolean boo=advertisementService.updateAdvertisement(ad);
		if (!boo) {
			msg.setCode(110);
			msg.setMsg("删除失败");
			return msg.toString();
		}
		return msg.toString();
	}
	
	/**
	 * 广告预览
	 * @author tanglei
	 * date 2017年7月9日 下午14:15:40
	 */
	@RequestMapping("/lookAdvertisement")
	@ResponseBody
	public Map<String,Object> lookAdvertisement (HttpServletRequest req,Model model,int ad_id) {
		Advertisement advertisement=new Advertisement();
		advertisement.setAd_id(ad_id);
		advertisement=advertisementService.selectOneAdvertisement(advertisement);
		HashMap<String, Object> map = new HashMap<>();
		if (advertisement.getAd_image() != null) {
			advertisement.setAd_image(OSSparameter.imagePath(advertisement.getAd_image(),null,null));
		}
		map.put("advertisement", advertisement);
		return map;
	}
	
	/**
	 * jsp页面
	 * @author tanglei
	 * date 2017年7月11日 下午18:56:40
	 */
	@RequestMapping("urlPage")
	public String urlPage (HttpServletRequest req,Model model,int ad_id) {
		Advertisement advertisement=new Advertisement();
		advertisement.setAd_id(ad_id);
		advertisement=advertisementService.selectOneAdvertisement(advertisement);
		advertisement.setAd_image(OSSparameter.imagePath(advertisement.getAd_image(),null,null));
		model.addAttribute("advertisement", advertisement);
		return "advertisement/ad";
	}
}
