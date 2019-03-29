package com.gjp.service;

import com.alibaba.fastjson.JSONObject;
import com.gjp.dao.*;
import com.gjp.model.Company;
import com.gjp.model.*;
import com.gjp.util.*;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * @author 陈智颖
 * @version 创建时间：2016年4月20日 下午3:56:26
 */
@Service
public class HouseIntentionService {

    private @Resource
    HouseIntentionDao houseIntentionDao;

    private @Resource
    UserCenterEmployeeDao centerEmployeeDao;

    private @Resource
    PropertyInfoNameDAO propertyInfoNameDao;

    private @Resource
    PropertyInfoDAO propertyInfoDao;

    private @Resource
    HouseHouseImageDAO houseLibraryImage;

    private @Resource
    HouseImageTypeDAO houseImageTypeDAO;

    private @Resource
    HouseIntentionTypeDao houseIntentionTypeDao;
    // 客户统计
    private @Resource
    CustomerStatisticsDAO customerStatisticsDAO;
    // 库存房源
    private @Resource
    HouseLibraryDao housingLibraryDao;

    private @Resource
    HouseExtendedDao houseExtendedDao;

    // 房源定价表
    private @Resource
    PriceSettingDAO priceSettingDAO;

    //房屋库dao
    private @Resource
    HouseLibraryDao HouseLibraryDao;

    private @Resource
    HouseHouseImageDAO houseHouseImageDAO;

    private @Resource
    HouseInformationStateRelationDAO houseInformationStateRelationDAO;

    // 房屋基本
    @Resource
    private HousingAllocationService housingAllocationService;


    /**
     * 根据账号查询房源待看数据并分页
     *
     * @param houseIntention
     * @return
     * @author 陈智颖
     */
    public List<HouseIntention> queryHouseIntentionEM(HouseIntention houseIntention) {
        return houseIntentionDao.queryHouseIntentionEM(houseIntention);
    }

    /**
     * 添加(或者修改)意向房源、意向房源图片和添加意向房源记录
     *
     * @param houseIntention
     * @return Map<String   ,       Object>
     * @author 陈智颖
     */
    public Map<String, Object> addHouseIntentionSubmit(HttpServletRequest request, HouseIntention houseIntention, Integer em_id, String path) {
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_id(em_id);
        employee = centerEmployeeDao.selectAccount(employee).get(0);
        if (houseIntention.getPhi_id() == null || houseIntention.getPhi_id().equals("")) {
            // 添加意向房源时间
            houseIntention.setPhi_date(new Date());
        }
        if (houseIntention.getPropertyInfo_Id() != null && !houseIntention.getPropertyInfo_Id().equals("")) {
            PropertyInfoName propertyInfoNameOne = propertyInfoNameDao.findpropertyInfoToSuperId(houseIntention.getPropertyInfo_Id());
            if (propertyInfoNameOne.getPropertyInfo_floor() != null) {
                houseIntention.setPhi_total_floor(propertyInfoNameOne.getPropertyInfo_floor());
            }
            houseIntention.setHi_area(propertyInfoNameOne.getPropertyInfo_quyu());
        }
        HouseIntention queryHouseIntentionCount = houseIntentionDao.queryHouseIntentionCount(houseIntention);
        houseIntention.setPhi_new_addTime(new Date());// 意向房源最新跟进时间
        houseIntention.setPhi_new_emId(employee.getEm_id());// 意向房源最新跟进人
        // 判断是否存在意向房源跟进
        Integer bools = 0;

        String phType = houseIntention.getPhi_type();
        Integer ts = 0;
        // 判断是增加还是修改
        if (houseIntention.getPhi_id() != null && !houseIntention.getPhi_id().equals("")) {
            ts = orderByPhiType(phType);
            if (houseIntention.getTipnum() != null && ts <= houseIntention.getTipnum()) {
                houseIntention.setPhi_type(getHouseIntentionPhiType(houseIntention.getTipnum()));
            }
            houseIntention.setPhi_new_emId(employee.getEm_id());// 修改最新更进人ID
            if ((houseIntention.getNew_buildType() == null || houseIntention.getNew_buildType().equals("公盘")) && (houseIntention.getBuildType() == null || houseIntention.getBuildType().equals("") || houseIntention.getBuildType().equals("公盘"))) {// 公盘跟进时在没有选中楼盘类型的情况下变为私盘
                houseIntention.setBuildType("私盘");
            }
            // houseIntention.setPhi_type(phType);
            bools = houseIntentionDao.updateHouseIntention(houseIntention);
        } else {
//            if (queryHouseIntentionCount.getSize() == 0) {
            houseIntention.setEm_id(employee.getEm_id());
            houseIntention.setHi_code(getTheFirstLetter(houseIntention));// 房源hicode生成
            bools = houseIntentionDao.addHouseIntention(houseIntention);
            // 添加统计
            addHouseFollowStatisticRecord(employee, 0);// 房源第一次添加
            HouseIntentionType houseIntentionType = new HouseIntentionType();
            houseIntentionType.setHt_type("录入");// 添加跟进记录
            houseIntentionType.setHi_code(houseIntention.getHi_code());// 添加跟进为房源添加成功
            houseIntentionType.setHt_count("房源录入成功");
            houseIntentionType.setEm_id(employee.getEm_id());
            houseIntentionType.setHt_time(new Date());
            houseIntentionType.setHt_houseType(1);
            houseIntentionTypeDao.insertHouseIntentionType(houseIntentionType);

            HouseFollow houseFollow = new HouseFollow();
            houseFollow.setGhf_item("房源录入成功！");
            houseFollow.setPhi_id(houseIntention.getPhi_id());
            houseFollow.setGhf_state(houseIntention.getPhi_type());
            houseFollow.setEm_id(employee.getEm_id());
            houseFollow.setHi_code(houseIntention.getHi_code());
            bools = houseIntentionDao.addHouseFollow(houseFollow);

//            } else {
//                map.put("message", "repeat");
//                return map;
//            }
        }

        // 如果图片路径不为空上传图片
        if (path != null && !path.equals("")) {
            String[] split = path.split(",");
            HouseIntentionImage intentionImage = new HouseIntentionImage();
            intentionImage.setHi_code(houseIntention.getHi_code());
            List<HouseIntentionImage> queryHouseImageList = houseIntentionDao.queryHouseImageList(intentionImage);
            if (!queryHouseImageList.isEmpty()) {
                String pathImage = "";
                for (HouseIntentionImage houseIntentionImage : queryHouseImageList) {
                    boolean boolt = true;
                    for (int i = 0; i < split.length; i++) {
                        if (houseIntentionImage.getHim_path().equals(split[i])) {
                            boolt = false;
                            break;
                        }
                    }
                    if (boolt) {
                        pathImage += houseIntentionImage.getHim_path() + ",";
                    }
                }
                if (!pathImage.equals("")) {
                    pathImage = pathImage.substring(0, pathImage.length() - 1);
                }
                try {
                    if (!pathImage.equals("")) {
                        String[] pathImageArr = pathImage.split(",");
                        for (String paths : pathImageArr) {
                            FtpUtil.getInstance("/GJP/resources/houseImage/").delete(paths);
                            HouseIntention houseIntention2 = new HouseIntention();
                            houseIntention2.setHim_path(paths);
                            houseIntentionDao.deleteIntentionImage(houseIntention2);
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            for (int i = 0; i < split.length; i++) {
                boolean boolts = true;
                for (HouseIntentionImage houseIntentionImage1 : queryHouseImageList) {
                    if (houseIntentionImage1.getHim_path().equals(split[i])) {
                        boolts = false;
                        break;
                    }
                }
                if (boolts) {
                    HouseIntentionImage houseIntentionImage = new HouseIntentionImage();
                    houseIntentionImage.setHim_path(split[i]);
                    houseIntentionImage.setHi_code(houseIntention.getHi_code());
                    houseLibraryImage.addHouseIntentionImage(houseIntentionImage);
                    HouseIntentionImageType houseIntentionImageType = new HouseIntentionImageType();
                    if (i == 0) {
                        houseIntentionImageType.setHint_type("page");
                    } else {
                        houseIntentionImageType.setHint_type("effect");
                    }
                    houseIntentionImageType.setHint_str("意向");
                    houseIntentionImageType.setPhi_id(houseIntention.getPhi_id());
                    houseIntentionImageType.setHim_id(houseIntentionImage.getHim_id());
                    houseImageTypeDAO.addHouseIntentionImageType(houseIntentionImageType);
                }
            }
        }
        HouseIntentionType houseIntentionType = new HouseIntentionType();// 跟进内容跟踪表
        houseIntentionType.setEm_id(employee.getEm_id());// 最新跟进人
        houseIntentionType.setHt_time(new Date());// 最新跟进时间
        houseIntentionType.setHi_code(houseIntention.getHi_code());// 房屋code
        houseIntentionType.setHt_houseType(1);// 0：用户添加；1：系统添加
        boolean bool = false;
        switch (phType) {
            case "房源录入":
                if (AppUtil.isNull(houseIntention.getPropertyInfo_Id()) && AppUtil.isNull(houseIntention.getPhi_money()) && AppUtil.isNull(houseIntention.getPhi_phone()) && AppUtil.isNull(houseIntention.getPhi_source()) && AppUtil.isNull(houseIntention.getBuildType()) && AppUtil.isNull(houseIntention.getHi_houseS())) {
                    bool = true;
                    HouseFollow houseFollow = new HouseFollow();
                    houseFollow.setPhi_id(houseIntention.getPhi_id());
                    houseFollow.setGhf_state(houseIntention.getPhi_type());
                    houseFollow.setEm_id(employee.getEm_id());
                    houseFollow.setHi_code(houseIntention.getHi_code());
                    houseFollow.setGhf_item("录入完善完成！");
                    houseIntention.setPhi_type("房源跟进");
                    bools = houseIntentionDao.updateHouseIntention(houseIntention);

                    houseIntentionType.setHi_code(houseIntention.getHi_code());// 添加跟进为房源添加成功
                    houseIntentionType.setHt_type("录入");// 添加跟进记录

                    houseIntentionType.setHt_count("录入完善完成");
                    houseIntentionTypeDao.insertHouseIntentionType(houseIntentionType);

                    houseFollow.setGhf_item("录入更新完成！");
                    bools = houseIntentionDao.addHouseFollow(houseFollow);
                    map.put("addr", houseIntention.getPhi_address());
                } else {
                    HouseFollow houseFollow = new HouseFollow();
                    houseFollow.setGhf_item("录入完善中！");
                    houseFollow.setHi_code(houseIntention.getHi_code());
                    houseFollow.setGhf_state(houseIntention.getPhi_type());
                    houseFollow.setEm_id(employee.getEm_id());
                    bools = houseIntentionDao.addHouseFollow(houseFollow);
                    bool = false;
                }

                break;

            case "房源跟进":
                if (AppUtil.isNull(houseIntention.getHi_houseS()) && AppUtil.isNull(houseIntention.getPhi_user()) && AppUtil.isNull(houseIntention.getHi_houseT()) && AppUtil.isNull(houseIntention.getHi_houseW()) && AppUtil.isNull(houseIntention.getHi_function()) && AppUtil.isNull(houseIntention.getPhi_phone()) && AppUtil.isNull(houseIntention.getPhi_address().replace("-", "")) && !houseIntention.getPhi_address().equals("0-0")) {
                    bool = true;
                    HouseFollow houseFollowS = new HouseFollow();
                    houseFollowS.setGhf_item("房源跟进完成！");
                    houseFollowS.setPhi_id(houseIntention.getPhi_id());
                    houseFollowS.setGhf_state(houseIntention.getPhi_type());
                    houseFollowS.setEm_id(employee.getEm_id());
                    houseFollowS.setHi_code(houseIntention.getHi_code());
                    bools = houseIntentionDao.addHouseFollow(houseFollowS);

                    if (ts >= houseIntention.getTipnum() || houseIntention.getTipnum() == 6) {
                        houseIntention.setPhi_type("房源实勘");
                    }
                    bools = houseIntentionDao.updateHouseIntention(houseIntention);
                    map.put("phi_addr", houseIntention.getPhi_address());
                } else {
                    HouseFollow houseFollow = new HouseFollow();
                    houseFollow.setGhf_item("房源跟进中！");
                    houseFollow.setPhi_id(houseIntention.getPhi_id());
                    houseFollow.setGhf_state(houseIntention.getPhi_type());
                    houseFollow.setEm_id(employee.getEm_id());
                    bools = houseIntentionDao.addHouseFollow(houseFollow);
                    bool = false;
                }
                break;

            case "房源实勘":
                if (AppUtil.isNull(houseIntention.getHi_measure()) && AppUtil.isNull(houseIntention.getHi_situation()) && AppUtil.isNull(houseIntention.getPhi_style()) && AppUtil.isNull(houseIntention.getHi_project()) && AppUtil.isNull(houseIntention.getHb_id()) && houseIntention.getImageNum() > 0 && AppUtil.isNull(houseIntention.getRecommendGroup_Id()) && AppUtil.isNull(houseIntention.getHi_content()) && houseIntention.getHi_content().length() >= 20) {
                    bool = true;
                    HouseFollow houseFollow = new HouseFollow();
                    houseFollow.setPhi_id(houseIntention.getPhi_id());
                    houseFollow.setGhf_state(houseIntention.getPhi_type());
                    houseFollow.setEm_id(employee.getEm_id());
                    houseFollow.setHi_code(houseIntention.getHi_code());
                    if (ts == houseIntention.getTipnum() || houseIntention.getTipnum() == 6) {
                        houseFollow.setGhf_item("房源实勘完成！");
                        houseIntention.setPhi_type("房源定价");
                        // 添加统计
                        addHouseFollowStatisticRecord(employee, 1);
                    } else {
                        houseFollow.setGhf_item("房源实勘完善！");
                    }
                    bools = houseIntentionDao.updateHouseIntention(houseIntention);
                    bools = houseIntentionDao.addHouseFollow(houseFollow);
                    houseIntentionType.setHt_type("实勘");// 添加跟进记录
                    houseIntentionType.setHt_count("房源实勘完成");
                    houseIntentionTypeDao.insertHouseIntentionType(houseIntentionType);
                    HouseInformationStateRelation houseInformationStateRelation = new HouseInformationStateRelation();
                    String hisId = houseIntention.getHis_id() + "_" + 3 + "_" + 7 + "_" + 8;
                    String[] hisid = hisId.split("_");
                    // 先删除再添加
                    houseInformationStateRelationDAO.deleteHouseInformationStateRelation(houseIntention.getHi_code());
                    for (int i = 0; i < hisid.length; i++) {
                        houseInformationStateRelation.setHis_id(Integer.valueOf(hisid[i]));
                        houseInformationStateRelation.setHi_code(houseIntention.getHi_code());
                        HouseLibraryDao.addHouseStateRelation(houseInformationStateRelation);
                    }
                } else {
                    HouseFollow houseFollow = new HouseFollow();
                    if (houseIntention != null && houseIntention.getImageNumEnd() != null && houseIntention.getImageNumEnd() != 0) {
                        houseFollow.setGhf_item("房源实勘中，图片更新");
                    } else {
                        houseFollow.setGhf_item("房源实勘中，信息跟进！");
                    }
                    houseFollow.setPhi_id(houseIntention.getPhi_id());
                    houseFollow.setGhf_state(houseIntention.getPhi_type());
                    houseFollow.setEm_id(employee.getEm_id());
                    houseFollow.setHi_code(houseIntention.getHi_code());
                    bools = houseIntentionDao.addHouseFollow(houseFollow);
                    bool = false;
                }
                break;

            case "房源定价":
                bool = true;
                HouseFollow houseFollow1 = new HouseFollow();
                houseFollow1.setPhi_id(houseIntention.getPhi_id());
                houseFollow1.setGhf_state(houseIntention.getPhi_type());
                houseFollow1.setEm_id(employee.getEm_id());
                houseFollow1.setHi_code(houseIntention.getHi_code());
                if (ts == houseIntention.getTipnum() || houseIntention.getTipnum() == 6) {
                    houseIntention.setPhi_type("存房");
                    bools = houseIntentionDao.updateHouseIntention(houseIntention);
                    houseFollow1.setGhf_item("房源定价完成！");
                    houseIntentionType.setHt_count("房源定价完成");

                } else {
                    houseFollow1.setGhf_item("房源定价更新完善！");
                    houseIntentionType.setHt_count("房源定价更新完善");
                }
                houseIntentionType.setHt_type("定价");// 添加跟进记录
                bools = houseIntentionDao.addHouseFollow(houseFollow1);
                houseIntention = houseIntentionDao.queryHouseIntentionID(houseIntention);
                map.put("hi_content", houseIntention.getHi_content());
                houseIntentionTypeDao.insertHouseIntentionType(houseIntentionType);
                break;

            case "完成":
                bool = true;
                // 意向房源跟进信息
                HouseFollow houseFollow2 = new HouseFollow();
                houseFollow2.setGhf_item("存房成功");
                houseFollow2.setPhi_id(houseIntention.getPhi_id());
                houseFollow2.setGhf_state("存房");
                houseFollow2.setEm_id(employee.getEm_id());
                houseFollow2.setHi_code(houseIntention.getHi_code());
                bools = houseIntentionDao.addHouseFollow(houseFollow2);
                // 修改意向房源
                houseIntention.setBuildType("封盘");
                bools = houseIntentionDao.updateHouseIntention(houseIntention);
                // 生成库存房源
                HouseIntention intentionWhere = houseIntentionDao.queryHouseIntentionWhere(houseIntention);
                if (intentionWhere != null) {
                    PropertyInfo propertyInfo = new PropertyInfo();
                    propertyInfo.setPropertyInfo_Id(intentionWhere.getPropertyInfo_Id());
                    propertyInfo = propertyInfoDao.queryPropertyInfoID(propertyInfo);
                    addKeepHouse(intentionWhere, propertyInfo, employee);
                }
                // 转移图片
                intentToLibraryForImage(em_id, houseIntention);
                // 意向房源内容跟进
                houseIntentionType.setHt_type("合同");
                houseIntentionType.setHt_count("存房成功");
                houseIntentionTypeDao.insertHouseIntentionType(houseIntentionType);
                break;
            case "存房失败":
                bool = true;
                HouseFollow houseFollow3 = new HouseFollow();
                houseFollow3.setGhf_item("存房失败");
                houseFollow3.setPhi_id(houseIntention.getPhi_id());
                houseFollow3.setGhf_state("存房");
                houseFollow3.setEm_id(employee.getEm_id());
                houseFollow3.setHi_code(houseIntention.getHi_code());
                bools = houseIntentionDao.addHouseFollow(houseFollow3);
                houseIntention.setBuildType("公盘");
                bools = houseIntentionDao.updateHouseIntention(houseIntention);
                break;
            default:
                break;
        }
        if (bools > 0) {
            if (bool) {
                map.put("stage", 1);// 内容完善完成
            } else {
                map.put("stage", 0);// 内容完善不完整
            }
            map.put("phi_id", houseIntention.getPhi_id());
            map.put("houseIntention", JSONObject.toJSONString(houseIntention)); // 用于添加数据时，返回全部数据，减少查询
            map.put("hi_code", houseIntention.getHi_code());
            map.put("propertyInfo_Id", houseIntention.getPropertyInfo_Id());
            map.put("message", "success");
            if ("完成".equals(phType)) {
                HouseIntention houseInfo = new HouseIntention();
                houseInfo.setPhi_id(houseIntention.getPhi_id());
                houseInfo = houseIntentionDao.queryHouseIntentionWhere(houseInfo);
                if (houseInfo != null) {
                    ViewHouseLibraryInfoVo houseLibraryInfoVo = new ViewHouseLibraryInfoVo();
                    houseLibraryInfoVo.setHi_code(houseInfo.getHi_code());
                    houseLibraryInfoVo = housingLibraryDao.queryHouseLibraryInfo(houseLibraryInfoVo);
                    map.put("houseLibraryInfo", houseLibraryInfoVo);
                }
            }
        } else {
            map.put("message", "error");
        }
        return map;
    }

    public Map<String, Object> addHouseIntention(HttpServletRequest request, HouseIntention houseIntention, Integer em_id, String path) {
        Map<String, Object> map = new HashMap<>();
        UserCenterEmployee employee = new UserCenterEmployee();
        employee.setEm_id(em_id);
        employee = centerEmployeeDao.selectAccount(employee).get(0);
        if (houseIntention.getPhi_id() == null || houseIntention.getPhi_id().equals("")) {
            // 添加意向房源时间
            houseIntention.setPhi_date(new Date());
        }
        if (houseIntention.getPropertyInfo_Id() != null && !houseIntention.getPropertyInfo_Id().equals("")) {
            PropertyInfoName propertyInfoNameOne = propertyInfoNameDao.findpropertyInfoToSuperId(houseIntention.getPropertyInfo_Id());
            houseIntention.setPhi_total_floor(propertyInfoNameOne.getPropertyInfo_floor());
            houseIntention.setHi_area(propertyInfoNameOne.getPropertyInfo_quyu());
        }
        HouseIntention queryHouseIntentionCount = houseIntentionDao.queryHouseIntentionCount(houseIntention);
        houseIntention.setPhi_new_addTime(new Date());// 意向房源最新跟进时间
        houseIntention.setPhi_new_emId(employee.getEm_id());// 意向房源最新跟进人
        // 判断是否存在意向房源跟进
        Integer bools = 0;

        Integer t = 0;
        String[] phTys = null;
        String[] tipn = null;
        if (houseIntention.getPhi_type() != null) {
            phTys = houseIntention.getPhi_type().split("_");
        }
        if (houseIntention.getTipnu() != null) {
            tipn = houseIntention.getTipnu().split("_");
        }
        // 判断是增加还是修改
        HouseIntention house = new HouseIntention();
        if (houseIntention.getPhi_id() != null && !houseIntention.getPhi_id().equals("")) {
            house.setPhi_id(houseIntention.getPhi_id());
            house = houseIntentionDao.queryHouseIntentionWhere(houseIntention);
            /*ts = orderByPhiType(phType);
			if (houseIntention.getTipnum() != null && ts <= houseIntention.getTipnum()) {
				houseIntention.setPhi_type(getHouseIntentionPhiType(houseIntention.getTipnum()));
			}
			houseIntention.setPhi_new_emId(employee.getEm_id());// 修改最新更进人ID
			if ((houseIntention.getNew_buildType() == null || houseIntention.getNew_buildType().equals("公盘")) && (houseIntention.getBuildType() == null || houseIntention.getBuildType().equals("") || houseIntention.getBuildType().equals("公盘"))) {// 公盘跟进时在没有选中楼盘类型的情况下变为私盘
				houseIntention.setBuildType("私盘");
			}
			// houseIntention.setPhi_type(phType);
			bools = houseIntentionDao.updateHouseIntention(houseIntention);*/


            for (int i = 0; i < phTys.length; i++) {
                t = orderByPhiType(phTys[i]);
                if (tipn[i] != null && t <= Integer.valueOf(tipn[i])) {
                    houseIntention.setPhi_type(getHouseIntentionPhiType(Integer.valueOf(tipn[i])));
                }
                houseIntention.setPhi_new_emId(employee.getEm_id());// 修改最新更进人ID
                if ((houseIntention.getNew_buildType() == null || houseIntention.getNew_buildType().equals("公盘")) && (houseIntention.getBuildType() == null || houseIntention.getBuildType().equals("") || houseIntention.getBuildType().equals("公盘"))) {// 公盘跟进时在没有选中楼盘类型的情况下变为私盘
                    houseIntention.setBuildType("私盘");
                }
//				 houseIntention.setPhi_type(phTys[i]);
                bools = houseIntentionDao.updateHouseIntention(houseIntention);
            }
        } else {
            if (queryHouseIntentionCount.getSize() == 0) {
                houseIntention.setEm_id(employee.getEm_id());
                houseIntention.setHi_code(getTheFirstLetter(houseIntention));// 房源hicode生成
                bools = houseIntentionDao.addHouseIntention(houseIntention);
                // 添加统计
                addHouseFollowStatisticRecord(employee, 0);// 房源第一次添加
                HouseIntentionType houseIntentionType = new HouseIntentionType();
                houseIntentionType.setHt_type("录入");// 添加跟进记录
                houseIntentionType.setHi_code(houseIntention.getHi_code());// 添加跟进为房源添加成功
                houseIntentionType.setHt_count("房源录入成功");
                houseIntentionType.setEm_id(employee.getEm_id());
                houseIntentionType.setHt_time(new Date());
                houseIntentionType.setHt_houseType(1);
                houseIntentionTypeDao.insertHouseIntentionType(houseIntentionType);

                HouseFollow houseFollow = new HouseFollow();
                houseFollow.setGhf_item("房源录入成功！");
                houseFollow.setPhi_id(houseIntention.getPhi_id());
                houseFollow.setGhf_state(houseIntention.getPhi_type());
                houseFollow.setEm_id(employee.getEm_id());
                houseFollow.setHi_code(houseIntention.getHi_code());
                bools = houseIntentionDao.addHouseFollow(houseFollow);

            } else {
                map.put("message", "repeat");
                return map;
            }
        }

        // 如果图片路径不为空上传图片
        if (path != null && !path.equals("")) {
            String[] split = path.split(",");
            HouseIntentionImage intentionImage = new HouseIntentionImage();
            intentionImage.setHi_code(houseIntention.getHi_code());
            List<HouseIntentionImage> queryHouseImageList = houseIntentionDao.queryHouseImageList(intentionImage);
            if (!queryHouseImageList.isEmpty()) {
                String pathImage = "";
                for (HouseIntentionImage houseIntentionImage : queryHouseImageList) {
                    boolean boolt = true;
                    for (int i = 0; i < split.length; i++) {
                        if (houseIntentionImage.getHim_path().equals(split[i])) {
                            boolt = false;
                            break;
                        }
                    }
                    if (boolt) {
                        pathImage += houseIntentionImage.getHim_path() + ",";
                    }
                }
                if (!pathImage.equals("")) {
                    pathImage = pathImage.substring(0, pathImage.length() - 1);
                }
                try {
                    if (!pathImage.equals("")) {
                        String[] pathImageArr = pathImage.split(",");
                        for (String paths : pathImageArr) {
                            FtpUtil.getInstance("/GJP/resources/houseImage/").delete(paths);
                            HouseIntention houseIntention2 = new HouseIntention();
                            houseIntention2.setHim_path(paths);
                            houseIntentionDao.deleteIntentionImage(houseIntention2);
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            for (int i = 0; i < split.length; i++) {
                boolean boolts = true;
                for (HouseIntentionImage houseIntentionImage1 : queryHouseImageList) {
                    if (houseIntentionImage1.getHim_path().equals(split[i])) {
                        boolts = false;
                        break;
                    }
                }
                if (boolts) {
                    HouseIntentionImage houseIntentionImage = new HouseIntentionImage();
                    houseIntentionImage.setHim_path(split[i]);
                    houseIntentionImage.setHi_code(houseIntention.getHi_code());
                    houseLibraryImage.addHouseIntentionImage(houseIntentionImage);
                    HouseIntentionImageType houseIntentionImageType = new HouseIntentionImageType();
                    if (i == 0) {
                        houseIntentionImageType.setHint_type("page");
                    } else {
                        houseIntentionImageType.setHint_type("effect");
                    }
                    houseIntentionImageType.setHint_str("意向");
                    houseIntentionImageType.setPhi_id(houseIntention.getPhi_id());
                    houseIntentionImageType.setHim_id(houseIntentionImage.getHim_id());
                    houseImageTypeDAO.addHouseIntentionImageType(houseIntentionImageType);
                }
            }
        }
        HouseIntentionType houseIntentionType = new HouseIntentionType();// 跟进内容跟踪表
        houseIntentionType.setEm_id(employee.getEm_id());// 最新跟进人
        houseIntentionType.setHt_time(new Date());// 最新跟进时间
        houseIntentionType.setHi_code(houseIntention.getHi_code());// 房屋code
        houseIntentionType.setHt_houseType(1);// 0：用户添加；1：系统添加

        boolean bool = false;
        String[] tipnum = null;
        if (houseIntention.getTipnu() != null) {
            tipnum = houseIntention.getTipnu().split("_");
        }
        Integer ts = 0;
        for (int i = 0; i < phTys.length; i++) {
            ts = orderByPhiType(phTys[i]);
            switch (phTys[i]) {
                case "房源录入":
                    if (AppUtil.isNull(houseIntention.getPropertyInfo_Id()) && AppUtil.isNull(houseIntention.getPhi_money()) && AppUtil.isNull(houseIntention.getPhi_phone()) && AppUtil.isNull(houseIntention.getPhi_source()) && AppUtil.isNull(houseIntention.getBuildType()) && AppUtil.isNull(houseIntention.getHi_houseS())) {
                        bool = true;
                        HouseFollow houseFollow = new HouseFollow();
                        houseFollow.setPhi_id(houseIntention.getPhi_id());
                        houseFollow.setGhf_state(phTys[i]);
                        houseFollow.setEm_id(employee.getEm_id());
                        houseFollow.setHi_code(houseIntention.getHi_code());
                        houseFollow.setGhf_item("录入完善完成！");
                        houseIntention.setPhi_type("房源跟进");
                        bools = houseIntentionDao.updateHouseIntention(houseIntention);

                        houseIntentionType.setHi_code(houseIntention.getHi_code());// 添加跟进为房源添加成功
                        houseIntentionType.setHt_type("录入");// 添加跟进记录

                        houseIntentionType.setHt_count("录入完善完成");
                        houseIntentionTypeDao.insertHouseIntentionType(houseIntentionType);

                        houseFollow.setGhf_item("录入更新完成！");
                        bools = houseIntentionDao.addHouseFollow(houseFollow);
                        map.put("addr", houseIntention.getPhi_address());
                    } else {
                        HouseFollow houseFollow = new HouseFollow();
                        houseFollow.setGhf_item("录入完善中！");
                        houseFollow.setHi_code(houseIntention.getHi_code());
                        houseFollow.setGhf_state(phTys[i]);
                        houseFollow.setEm_id(employee.getEm_id());
                        bools = houseIntentionDao.addHouseFollow(houseFollow);
                        bool = false;
                    }

                    break;

                case "房源跟进":
                    if (AppUtil.isNull(houseIntention.getHi_houseS()) && AppUtil.isNull(houseIntention.getPhi_user()) && AppUtil.isNull(houseIntention.getHi_houseT()) && AppUtil.isNull(houseIntention.getHi_houseW()) && AppUtil.isNull(houseIntention.getHi_function()) && AppUtil.isNull(houseIntention.getPhi_phone()) && AppUtil.isNull(houseIntention.getPhi_address().replace("-", "")) && !houseIntention.getPhi_address().equals("0-0")) {
                        if (houseIntention.getHi_houseS().equals(house.getHi_houseS()) && houseIntention.getPhi_user().equals(house.getPhi_user()) && houseIntention.getHi_houseT().equals(house.getHi_houseT()) && houseIntention.getHi_houseW().equals(house.getHi_houseW()) && houseIntention.getHi_function().equals(house.getHi_function()) && houseIntention.getPhi_phone().equals(house.getPhi_phone())) {
                            break;
                        }
                        bool = true;
                        HouseFollow houseFollowS = new HouseFollow();
                        houseFollowS.setGhf_item("房源跟进完成！");
                        houseFollowS.setPhi_id(houseIntention.getPhi_id());
                        houseFollowS.setGhf_state(phTys[i]);
                        houseFollowS.setEm_id(employee.getEm_id());
                        houseFollowS.setHi_code(houseIntention.getHi_code());
                        bools = houseIntentionDao.addHouseFollow(houseFollowS);

                        if (ts >= Integer.valueOf(tipnum[i]) || Integer.valueOf(tipnum[i]) == 6) {
                            houseIntention.setPhi_type("房源实勘");
                        }
                        bools = houseIntentionDao.updateHouseIntention(houseIntention);
                        map.put("phi_addr", houseIntention.getPhi_address());
                    } else {
                        HouseFollow houseFollow = new HouseFollow();
                        houseFollow.setGhf_item("房源跟进中！");
                        houseFollow.setPhi_id(houseIntention.getPhi_id());
                        houseFollow.setGhf_state(phTys[i]);
                        houseFollow.setEm_id(employee.getEm_id());
                        bools = houseIntentionDao.addHouseFollow(houseFollow);
                        bool = false;
                    }
                    break;

                case "房源实勘":
                    if (AppUtil.isNull(houseIntention.getHi_measure()) && AppUtil.isNull(houseIntention.getHi_situation()) && AppUtil.isNull(houseIntention.getPhi_style()) && AppUtil.isNull(houseIntention.getHi_project()) && AppUtil.isNull(houseIntention.getHb_id()) && houseIntention.getImageNum() > 0 && AppUtil.isNull(houseIntention.getRecommendGroup_Id()) && AppUtil.isNull(houseIntention.getHi_content()) && houseIntention.getHi_content().length() >= 20) {
                        if (houseIntention.getHi_measure().equals(house.getHi_measure()) && houseIntention.getHi_situation().equals(house.getHi_situation()) && houseIntention.getPhi_style().equals(house.getPhi_style()) &&
                                houseIntention.getHi_project().equals(house.getHi_project()) && houseIntention.getHb_id().equals(house.getHb_id()) && houseIntention.getRecommendGroup_Id().equals(house.getRecommendGroup_Id()) && houseIntention.getHi_content().equals(house.getHi_content())) {
                            break;
                        }
                        bool = true;
                        HouseFollow houseFollow = new HouseFollow();
                        houseFollow.setPhi_id(houseIntention.getPhi_id());
                        houseFollow.setGhf_state(phTys[i]);
                        houseFollow.setEm_id(employee.getEm_id());
                        houseFollow.setHi_code(houseIntention.getHi_code());
                        if (ts == Integer.valueOf(tipnum[i]) || Integer.valueOf(tipnum[i]) == 6) {
                            houseFollow.setGhf_item("房源实勘完成！");
                            houseIntention.setPhi_type("房源定价");
                            // 添加统计
                            addHouseFollowStatisticRecord(employee, 1);
                        } else {
                            houseFollow.setGhf_item("房源实勘完善！");
                        }
                        bools = houseIntentionDao.updateHouseIntention(houseIntention);
                        bools = houseIntentionDao.addHouseFollow(houseFollow);
                        houseIntentionType.setHt_type("实勘");// 添加跟进记录
                        houseIntentionType.setHt_count("房源实勘完成");
                        houseIntentionTypeDao.insertHouseIntentionType(houseIntentionType);
                        String hisId = houseIntention.getHis_id() + "_" + 3 + "_" + 7 + "_" + 8;
                        String[] hisid = hisId.split("_");
                        // 先删除再添加
                        houseInformationStateRelationDAO.deleteHouseInformationStateRelation(houseIntention.getHi_code());
                        for (int j = 0; j < hisid.length; j++) {
                            HouseInformationStateRelation houseInformationStateRelation = new HouseInformationStateRelation();
                            houseInformationStateRelation.setHis_id(Integer.valueOf(hisid[j]));
                            houseInformationStateRelation.setHi_code(houseIntention.getHi_code());
                            HouseLibraryDao.addHouseStateRelation(houseInformationStateRelation);
                        }
                    } else {
                        HouseFollow houseFollow = new HouseFollow();
                        if (houseIntention != null && houseIntention.getImageNumEnd() != null && houseIntention.getImageNumEnd() != 0) {
                            houseFollow.setGhf_item("房源实勘中，图片更新");
                        } else {
                            houseFollow.setGhf_item("房源实勘中，信息跟进！");
                        }
                        houseFollow.setPhi_id(houseIntention.getPhi_id());
                        houseFollow.setGhf_state(phTys[i]);
                        houseFollow.setEm_id(employee.getEm_id());
                        houseFollow.setHi_code(houseIntention.getHi_code());
                        bools = houseIntentionDao.addHouseFollow(houseFollow);
                        bool = false;
                    }
                    break;

                case "房源定价":
                    if (AppUtil.isNull(houseIntention.getPhi_price())) {
                        if (houseIntention.getPhi_price().equals(house.getPhi_price()) && houseIntention.getBuildType().equals(house.getBuildType())) {
                            if ("保护".equals(houseIntention.getBuildType()) && houseIntention.getPhi_endTime().equals(house.getPhi_endTime()) && houseIntention.getHi_content().equals(house.getHi_content())) {
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                    bool = true;
                    HouseFollow houseFollow1 = new HouseFollow();
                    houseFollow1.setPhi_id(houseIntention.getPhi_id());
                    houseFollow1.setGhf_state(phTys[i]);
                    houseFollow1.setEm_id(employee.getEm_id());
                    houseFollow1.setHi_code(houseIntention.getHi_code());
                    if (ts == Integer.valueOf(tipnum[i]) || Integer.valueOf(tipnum[i]) == 6) {
                        houseIntention.setPhi_type("存房");
                        bools = houseIntentionDao.updateHouseIntention(houseIntention);
                        houseFollow1.setGhf_item("房源定价完成！");
                        houseIntentionType.setHt_count("房源定价完成");

                    } else {
                        houseFollow1.setGhf_item("房源定价更新完善！");
                        houseIntentionType.setHt_count("房源定价更新完善");
                    }
                    houseIntentionType.setHt_type("定价");// 添加跟进记录
                    bools = houseIntentionDao.addHouseFollow(houseFollow1);
                    houseIntention = houseIntentionDao.queryHouseIntentionID(houseIntention);
                    map.put("hi_content", houseIntention.getHi_content());
                    houseIntentionTypeDao.insertHouseIntentionType(houseIntentionType);

                    break;

                case "完成":
                    bool = true;
                    // 意向房源跟进信息
                    HouseFollow houseFollow2 = new HouseFollow();
                    houseFollow2.setGhf_item("存房成功");
                    houseFollow2.setPhi_id(houseIntention.getPhi_id());
                    houseFollow2.setGhf_state("存房");
                    houseFollow2.setEm_id(employee.getEm_id());
                    houseFollow2.setHi_code(houseIntention.getHi_code());
                    bools = houseIntentionDao.addHouseFollow(houseFollow2);
                    // 修改意向房源
                    houseIntention.setBuildType("封盘");
                    houseIntention.setPhi_type("完成");
                    bools = houseIntentionDao.updateHouseIntention(houseIntention);
                    // 生成库存房源
                    HouseIntention intentionWhere = houseIntentionDao.queryHouseIntentionWhere(houseIntention);
                    if (intentionWhere != null) {
                        PropertyInfo propertyInfo = new PropertyInfo();
                        propertyInfo.setPropertyInfo_Id(intentionWhere.getPropertyInfo_Id());
                        propertyInfo = propertyInfoDao.queryPropertyInfoID(propertyInfo);
                        addKeepHouse(intentionWhere, propertyInfo, employee);
                    }
                    // 转移图片
                    intentToLibraryForImage(em_id, houseIntention);
                    // 意向房源内容跟进
                    houseIntentionType.setHt_type("合同");
                    houseIntentionType.setHt_count("存房成功");
                    houseIntentionTypeDao.insertHouseIntentionType(houseIntentionType);
                    break;
                case "存房失败":
                    bool = true;
                    HouseFollow houseFollow3 = new HouseFollow();
                    houseFollow3.setGhf_item("存房失败");
                    houseFollow3.setPhi_id(houseIntention.getPhi_id());
                    houseFollow3.setGhf_state("存房");
                    houseFollow3.setEm_id(employee.getEm_id());
                    houseFollow3.setHi_code(houseIntention.getHi_code());
                    bools = houseIntentionDao.addHouseFollow(houseFollow3);
                    houseIntention.setBuildType("公盘");
                    bools = houseIntentionDao.updateHouseIntention(houseIntention);
                    break;
                default:
                    break;
            }
        }
        if (bools > 0) {
            if (bool) {
                map.put("stage", 1);// 内容完善完成
            } else {
                map.put("stage", 0);// 内容完善不完整
            }
            map.put("phi_id", houseIntention.getPhi_id());
            map.put("houseIntention", JSONObject.toJSONString(houseIntention)); // 用于添加数据时，返回全部数据，减少查询
            map.put("hi_code", houseIntention.getHi_code());
            map.put("propertyInfo_Id", houseIntention.getPropertyInfo_Id());
            map.put("message", "success");
            if ("完成".equals(phTys[phTys.length - 1])) {
                HouseIntention houseInfo = new HouseIntention();
                houseInfo.setPhi_id(houseIntention.getPhi_id());
                houseInfo = houseIntentionDao.queryHouseIntentionWhere(houseInfo);
                if (houseInfo != null) {
                    ViewHouseLibraryInfoVo houseLibraryInfoVo = new ViewHouseLibraryInfoVo();
                    houseLibraryInfoVo.setHi_code(houseInfo.getHi_code());
                    houseLibraryInfoVo = housingLibraryDao.queryHouseLibraryInfo(houseLibraryInfoVo);
                    map.put("houseLibraryInfo", houseLibraryInfoVo);
                }
            }
        } else {
            map.put("message", "error");
        }
        return map;
    }

    /**
     * 意向房源图片转库存
     *
     * @return
     * @author JiangQT
     */
    private void intentToLibraryForImage(Integer em_id, HouseIntention houseIntention) {
        houseIntention = houseIntentionDao.queryHouseIntentionID(houseIntention);
        if (houseIntention != null) {
            // 查询意向房源图片类型
            List<HouseIntentionImageType> houseIntentImageTypes = houseImageTypeDAO.selectImageTypeById(houseIntention.getPhi_id());
            HouseInfoKeep houseInformationKeep = housingLibraryDao.selectHouseInfoByCode(houseIntention.getHi_code());
            for (HouseIntentionImageType houseIntentImageType : houseIntentImageTypes) {
                // 查询意向房源图片
                HouseIntentionImage houseIntentImage = houseLibraryImage.selectImageById(houseIntentImageType.getHim_id());
                if (houseIntentImage != null) {

                    HouseImageFolder houseImageFolder = new HouseImageFolder();
                    houseImageFolder.setHif_name(3);
                    houseImageFolder.setHi_code(houseInformationKeep.getHi_code());

                    HouseImageFolder selectHouseImageFolder = new HouseImageFolder();
                    HouseImageFolder folder = HouseLibraryDao.selectHouseImageFolder(houseImageFolder);
                    if (folder == null || "".equals(folder)) {    // 文件夹不存在
                        int secceed = HouseLibraryDao.addHouseImageFolder(houseImageFolder);// 创建文件夹
                        if (secceed > 0) {
                            selectHouseImageFolder = HouseLibraryDao.selectHouseImageFolder(houseImageFolder);// 查询文件夹信息
                        }
                    } else {
                        selectHouseImageFolder = HouseLibraryDao.selectHouseImageFolder(houseImageFolder);// 查询文件夹信息
                    }
                    HouseImageVo image = new HouseImageVo();
                    image.setHm_creator(em_id);
                    image.setHm_path(houseIntentImage.getHim_path());
                    image.setHi_code(houseIntention.getHi_code());
                    image.setHm_createTime(new Date());
                    image.setHif_id(selectHouseImageFolder.getHif_id());
                    image.setHm_state(1);
//					image.setHif_name(folderName);
                    houseHouseImageDAO.addHouseImage(image);


//					// 图片文件夹
//					HouseImageFolder houseImageFolder = new HouseImageFolder();
//					houseImageFolder.setHif_name("实勘图片");
//					houseImageFolder.setHi_code(houseInformationKeep.getHi_code());
//					houseImageFolder.setHif_createTime(new Date());
//					housingLibraryDao.addHouseImageFolder(houseImageFolder);
//					// 添加库存图片
//					HouseImageVo houseHouseImage = new HouseImageVo();
//					houseHouseImage.setHm_type(houseIntentImageType.getHint_type());
//					houseHouseImage.setHi_code(houseIntention.getHi_code());
//					houseHouseImage.setHm_path(houseIntentImage.getHim_path());
//					houseHouseImage.setHm_createTime(houseIntentImage.getHim_time());
//					houseHouseImage.setHm_state(0);
//					houseHouseImage.setHif_id(houseImageFolder.getHif_id());
//					houseLibraryImage.addHouseImage(houseHouseImage);
//
//					// 添加库存图片类型
//					HouseHouseImageType houseLibraryImageType = new HouseHouseImageType();
//					houseLibraryImageType.setHi_id(houseInformationKeep.getHi_id());
//					houseLibraryImageType.setHit_type(houseIntentImageType.getHint_type());
//					houseLibraryImageType.setHm_id(houseHouseImage.getHm_id());
//					houseLibraryImageType.setHi_code(houseHouseImage.getHi_code());
//					houseImageTypeDAO.addHouseImageType(houseLibraryImageType);
                }
            }
        }
    }

    /**
     * TODO 添加库存房源
     *
     * @param houseIntention
     * @param propertyInfo
     * @param employee
     * @return
     * @Description:
     * @author JiangQt
     */
    private Integer addKeepHouse(HouseIntention houseIntention, PropertyInfo propertyInfo, UserCenterEmployee employee) {
        if (houseIntention == null) {
            return 0;
        }
        // 查询是否有该房屋
        HouseHouseInformation houseInformation = new HouseHouseInformation();
        houseInformation.setHi_code(houseIntention.getHi_code());
        houseInformation = housingLibraryDao.selectHouseByName(houseInformation);
        if (houseInformation != null) {
            return 0;
        }
        HouseInfoKeep houseInfoKeep = new HouseInfoKeep();
        houseInfoKeep.setHi_name(houseIntention.getPhi_name());
        // houseInfoKeep.setHi_money(null);// 不需要
        // houseInfoKeep.setHi_type(null);// 不需要

        // 共有属性，物业里有
        // houseInfoKeep.setHi_area(houseIntention.getHi_area());
        // houseInfoKeep.setHi_district(houseIntention.getHi_district());
        // houseInfoKeep.setHi_track(houseIntention.getHi_track());

        houseInfoKeep.setHi_measure(houseIntention.getHi_measure());
        houseInfoKeep.setHi_date(new Date());// 存房时间

        if (houseIntention.getHi_project() != null && !houseIntention.getHi_project().equals("")) {
            String[] hi_projects = houseIntention.getHi_project().split(",");
            StringBuilder conim_id = new StringBuilder();
            for (String hi_project : hi_projects) {
                Facility facility = new Facility();
                facility.setConim_type(hi_project);
                List<Facility> facilities = housingAllocationService.queryHouseInformationFacility(facility);
                for (Facility facility1 : facilities) {
                    conim_id.append(facility1.getConim_id()).append(",");
                }
            }
            if (!conim_id.toString().equals("")) {
                conim_id = new StringBuilder(conim_id.substring(0, conim_id.length() - 1));
                houseInfoKeep.setConim_id(conim_id.toString());
            }
        }

        // houseInfoKeep.setHi_totalFloor(houseIntention.getPhi_total_floor());
        if (houseIntention.getHi_houseS() != null) {
            houseInfoKeep.setHi_houseS(houseIntention.getHi_houseS());
        } else {
            houseInfoKeep.setHi_houseS(0);
        }
        if (houseIntention.getHi_houseW() != null) {
            houseInfoKeep.setHi_houseW(houseIntention.getHi_houseW());
        } else {
            houseInfoKeep.setHi_houseW(0);
        }
        if (houseIntention.getHi_houseT() != null) {
            houseInfoKeep.setHi_houseT(houseIntention.getHi_houseT());
        } else {
            houseInfoKeep.setHi_houseT(0);
        }
        houseInfoKeep.setHi_function(houseIntention.getHi_function());
        // houseInfoKeep.setHi_orientation(null);// 不需要
        houseInfoKeep.setHi_peopleName(houseIntention.getPhi_user());
        // houseInfoKeep.setHi_latitude(null); // 不需要，房屋坐标物业有
        houseInfoKeep.setHb_id(houseIntention.getHb_id());
        houseInfoKeep.setHi_code(houseIntention.getHi_code());
        houseInfoKeep.setPu_id(employee.getEm_id());
        // houseInfoKeep.setHi_num(null);// 不需要
        houseInfoKeep.setHi_content(houseIntention.getHi_content());
        houseInfoKeep.setRecommendGroup_Id(houseIntention.getRecommendGroup_Id());
        houseInfoKeep.setPropertyInfo_Id(houseIntention.getPropertyInfo_Id());
        houseInfoKeep.setHi_rentDay(houseIntention.getPhi_rentDay());
        // houseInfoKeep.setHi_number(null);// 不需要
        // houseInfoKeep.setHi_text(null);// 不需要
        houseInfoKeep.setHi_userManaged(employee.getEm_name());
        // String upn_code = propertyInfo.getUpn_code();
        // if (upn_code != null) {
        // houseInfoKeep.setHi_address(upn_code + "-" + houseIntention.getPhi_address());
        // } else {
        // }
        houseInfoKeep.setHi_address(houseIntention.getPhi_address());
        if (houseIntention.getHi_situation() == null) {
            houseInfoKeep.setHi_state("");
        } else if (houseIntention.getHi_situation() == 0) {
            houseInfoKeep.setHi_state("清水");
        } else if (houseIntention.getHi_situation() == 1) {
            houseInfoKeep.setHi_state("简装");
        } else if (houseIntention.getHi_situation() == 2) {
            houseInfoKeep.setHi_state("精装");
        } else if (houseIntention.getHi_situation() == 3) {
            houseInfoKeep.setHi_state("豪装");
        } else if (houseIntention.getHi_situation() == 4) {
            houseInfoKeep.setHi_state("中装");
        }
        houseInfoKeep.setContract_intoStatus("未签合同");
        houseInfoKeep.setContract_outStatus("未签合同");
        houseInfoKeep.setPhi_id(houseIntention.getPhi_id());
        houseInfoKeep.setCc_code(houseIntention.getCc_code());
        houseInfoKeep.setHi_area(houseIntention.getPropertyInfo_quyu());
        String hi_situation = "";
        if (houseIntention.getHi_situation() == 0) {
            hi_situation = "清水";
        } else if (houseIntention.getHi_situation() == 1) {
            hi_situation = "简装";
        } else if (houseIntention.getHi_situation() == 2) {
            hi_situation = "精装";
        } else if (houseIntention.getHi_situation() == 3) {
            hi_situation = "豪装";
        } else if (houseIntention.getHi_situation() == 4) {
            hi_situation = "中装";
        }
        String quyu = "";
        if (propertyInfo.getPropertyInfo_quyu() != null) {
            quyu = propertyInfo.getPropertyInfo_quyu();
        }
        houseInfoKeep.setHi_name(quyu + propertyInfo.getUpn_sname() + hi_situation + houseIntention.getHi_houseS() + "房");
        houseInfoKeep.setHi_date(new Date());
        houseInfoKeep.setHi_area(houseIntention.getHi_area());
        houseInfoKeep.setHi_type("普通住宅");
        houseInfoKeep.setHi_keepMoney(houseIntention.getPhi_price());
        houseInfoKeep.setHi_project(houseIntention.getHi_project());
        houseInfoKeep.setHi_version(houseIntention.getHi_version());
        houseInfoKeep.setHi_peopleName(houseIntention.getPhi_user());
        houseInfoKeep.setHi_forRentState(AppConfig.hi_forRentState_1001);
        houseInfoKeep.setHi_isForRent(AppConfig.hi_isForRent_1);
        houseInfoKeep.setHi_style(houseIntention.getPhi_style());

        HouseHouseExtended houseHouseExtended = new HouseHouseExtended();
        houseHouseExtended.setHe_peopleName(houseIntention.getPhi_user());
        houseHouseExtended.setHe_phone(houseIntention.getPhi_phone());
        houseHouseExtended.setHe_state("free");
        houseHouseExtended.setHe_time(new Date());
        houseHouseExtended.setHe_isPublish(0);
        houseExtendedDao.addHouseExtended(houseHouseExtended);
        houseInfoKeep.setHe_id(houseHouseExtended.getHe_id());
        String housePriceMoney = housePriceMoney(houseIntention.getHi_code(), houseIntention.getEm_id(), houseIntention.getPhi_price(), houseIntention.getPhi_rentDay(), 1, "月付", null);
        houseInfoKeep.setHi_price(Double.parseDouble(housePriceMoney));
        PositionRecordVo positionRecordVo = new PositionRecordVo();
        positionRecordVo.setHi_code(houseIntention.getHi_code());
        positionRecordVo.setHpr_emp(houseIntention.getEm_id());
        List<Company> companys = centerEmployeeDao.selectCompanyByPersonId(houseIntention.getEm_id());
        positionRecordVo.setHpr_newEmp(houseIntention.getEm_id());
        positionRecordVo.setUcc_id(companys.get(0).getUcc_id());
        housingLibraryDao.addHousePositionRecord(positionRecordVo);
        houseInfoKeep.setHi_floor(Integer.parseInt(houseInfoKeep.getHi_address().split("-")[0]));
        return housingLibraryDao.addHouseHouseInformationKeep(houseInfoKeep);
    }

    /**
     * 计算统一出房价
     *
     * @param hi_code      房号
     * @param hi_keepMoney 存房价
     * @param rentDay      免租期(20|30|20)
     * @param year         年限
     * @param payType      支付类型
     * @param sumMoney     业绩基础数（默认2400）
     * @return
     * @author 陈智颖
     * @date Mar 28, 2017 6:31:17 PM
     */
    public String housePriceMoney(String hi_code, Integer em_id, Double hi_keepMoney, String rentDay, Integer year, String payType, Integer sumMoney) {
        PriceMoney priceMoney = new PriceMoney();
        priceMoney.setHi_code(hi_code);
        priceMoney.setPm_outMoney(AppUtil.houseMoney(hi_keepMoney, rentDay, year, payType, sumMoney));
        priceMoney.setPm_date(new Date());
        priceMoney.setEm_id(em_id);
        Integer bools = priceSettingDAO.updatePriceMoney(priceMoney);
        if (bools < 1) {
            bools = priceSettingDAO.insertPriceMoney(priceMoney);
        }
        return priceMoney.getPm_outMoney();
    }

    /**
     * 计算统一出房价[加强]
     *
     * @param isReNew      是否续约
     * @param hi_code      房号
     * @param hi_keepMoney 存房价
     * @param rentDay      免租期(20|30|20)
     * @param year         年限
     * @param payType      支付类型
     * @param sumMoney     业绩基础数（默认2400）
     * @return
     * @author JQingtao
     */
    public String housePriceMoneyPlus(boolean isReNew, String hi_code, Integer em_id, Double hi_keepMoney, String rentDay, Integer year, String payType, Integer sumMoney) {
        // 非续约正常计算定价
        if (!isReNew) {
            return housePriceMoney(hi_code, em_id, hi_keepMoney, rentDay, year, payType, sumMoney);
        }
        // 无定价正常计算定价
        PriceMoney priceMoney = new PriceMoney();
        priceMoney.setHi_code(hi_code);
        priceMoney = this.selectPriceMoney(priceMoney);
        if (priceMoney == null) {
            return housePriceMoney(hi_code, em_id, hi_keepMoney, rentDay, year, payType, sumMoney);
        }
        // 附加定价
        priceMoney = new PriceMoney();
        priceMoney.setHi_code(hi_code);
        priceMoney.setPm_outMoney(priceMoney.getPm_outMoney() + "-" + AppUtil.houseMoney(hi_keepMoney, rentDay, year, payType, sumMoney));
        priceMoney.setEm_id(em_id);
        priceSettingDAO.updatePriceMoney(priceMoney);
        return priceMoney.getPm_outMoney();
    }

    /**
     * 查询定价
     *
     * @param priceMoney
     * @return
     */
    private PriceMoney selectPriceMoney(PriceMoney priceMoney) {
        return priceSettingDAO.selectPriceMoney(priceMoney);
    }

    /**
     * TODO 房源跟进统计
     *
     * @return
     * @author JiangQt
     */
    public boolean addHouseFollowStatisticRecord(UserCenterEmployee employee, int state) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        int day = cal.get(Calendar.DAY_OF_YEAR);
        int week = cal.get(Calendar.WEEK_OF_YEAR);

        Statistics statistics = new Statistics();
        switch (state) {
            case 0:
                statistics.setPcs_cycleNum(day);
                break;
            case 1:
                statistics.setPcs_cycleNum(week);
                break;
            default:
                return false;
        }
        statistics.setEm_id(employee.getEm_id());
        statistics.setPcs_state(state);
        statistics = customerStatisticsDAO.queryCustomerStatisticsWhere(statistics);
        int count = 0;
        if (statistics != null) {
            // 修改
            count = customerStatisticsDAO.updateCustomerStatisticsForNum(statistics);
        } else {
            // 添加
            statistics = new Statistics();
            statistics.setPcs_num(1);
            statistics.setPcs_state(state);
            statistics.setPsc_date(new Date());
            statistics.setEm_id(employee.getEm_id());
            ViewTrusteeship viewTrusteeship = customerStatisticsDAO.queryCustomerTrusteeshipByEmid(employee.getEm_id());
            if (viewTrusteeship != null) {
                statistics.setEm_department(viewTrusteeship.getUcc_name());
            }
            switch (state) {
                case 0:
                    statistics.setPcs_cycle(1);
                    statistics.setPcs_cycleNum(day);
                    break;
                case 1:
                    statistics.setPcs_cycle(7);
                    statistics.setPcs_cycleNum(week);
                    break;
                default:
                    return false;
            }
            count = customerStatisticsDAO.insertCustomerStatistics(statistics);
        }
        return (count > 0);
    }

    /**
     * 随机生成房屋代码 标识房屋唯一性的编码，非主键
     * <p>
     * 重庆大写字母+房屋区域第一个大写字母+三位数的随机数
     *
     * @return
     */
    public String getTheFirstLetter(HouseIntention houseIntention) {
        StringBuffer str = new StringBuffer();
        if (!"".equals(houseIntention.getHi_area())) {
            GetTheFirstLetter getTheFirstLetter = new GetTheFirstLetter();
            str.append("CQ");
            String area = "";
            if (houseIntention.getHi_area() == null) {
                area = "南";
            } else {
                area = houseIntention.getHi_area().substring(0, 1);
            }
            str.append(getTheFirstLetter.String2Alpha(area));
            String date = new Date().getTime() + "";
            str.append(date);
            str.append(Randoms.random());
        }
        return str.toString();
    }

    /**
     * 根据意向房源编码查询意向房源
     *
     * @param houseIntention
     * @return
     * @author 陈智颖
     */
    public HouseIntention queryHouseIntentionID(HouseIntention houseIntention) {
        return houseIntentionDao.queryHouseIntentionID(houseIntention);
    }

    /**
     * 查询自己意向房源详细信息
     *
     * @return
     * @author 刘强
     */
    public PageModel<HouseIntention> queryHouseIntentionEMXiangXi(int pageNo, int pageSize, HouseModel houseModel) {
        return houseIntentionDao.queryHouseIntentionEMXiangXi(pageNo, pageSize, houseModel);
    }

    /**
     * 查询意向房源记录
     *
     * @param houseIntention
     * @return
     * @author 刘强
     */
    public List<HouseFollow> selectHouseIntentiongzjl(HouseIntention houseIntention) {
        return houseIntentionDao.selectHouseIntentiongzjl(houseIntention);
    }

    public String queryHouseIntentionSource(String name) {
        return houseIntentionDao.queryHouseIntentionSource(name);
    }

    /**
     * TODO 插入存房预定订单
     *
     * @param reserveBill
     * @return
     * @author 陈智颖
     */
    public boolean addReserveBill(ReserveBill reserveBill) {

        // boolean bool = false;

        // // 【添加预订订单】
        // bool = reserveBillDao.addReserveBills(reserveBill) > 0;
        //
        // String number = AppUtil.getOrderCode("210"); // 预定单号
        // // 【添加流水关联】
        // BillStatementFiliation billStatementFiliation = new
        // BillStatementFiliation();
        // billStatementFiliation.setSf_type("预订");
        // billStatementFiliation.setSf_num(reserveBill.getRb_number());
        // billStatementFiliation.setSf_statement(number);
        // bool =
        // financeManageService.addStatementFiliation(billStatementFiliation);
        //
        // // 【添加流水】
        // BillStatementVo statementVo = new BillStatementVo();
        // statementVo.setBs_statementNum(number);
        // statementVo.setBs_payPersion(reserveBill.getRb_name());
        // statementVo.setBs_payPhone(reserveBill.getRb_phone());
        // statementVo.setBs_state("已付款");
        // statementVo.setBs_payNum("1");
        // statementVo.setBs_money(new BigDecimal(reserveBill.getRb_money()));
        // statementVo.setBs_payType(reserveBill.getPlayType());
        // statementVo.setBs_payDate(new Date());
        // bool = financeManageService.addBillStatement(statementVo);
        //
        // // 【添加收款记录】
        // String tb_code = AppUtil.getOrderCode("202");
        // BillFirstBillReceiptRecordVo billReceiptRecordVo = new
        // BillFirstBillReceiptRecordVo();
        // billReceiptRecordVo.setTb_code(tb_code);
        // switch (reserveBill.getRb_playType()) {
        // case "定金":
        // billReceiptRecordVo.setBfrr_type(20);
        // break;
        // case "诚意金":
        // billReceiptRecordVo.setBfrr_type(21);
        // break;
        // }
        // billReceiptRecordVo.setHi_code(reserveBill.getRb_houseNum());
        // billReceiptRecordVo.setBfrr_receiptWay(reserveBill.getBs_payType());
        // billReceiptRecordVo.setBfrr_receiptMoney(reserveBill.getRb_money());
        // billReceiptRecordVo.setBfrr_realMoney(reserveBill.getRb_money());
        // billReceiptRecordVo.setBfrr_dueInMoney(0);
        // billReceiptRecordVo.setBfrr_createTime(new Date());
        // userCenterContractObjectDao.addFirstBillReceiptRecord(billReceiptRecordVo);
        // return bool;
        return true;
    }

    public int selSimilarPhonePhiidCount(HouseIntention houseIntention) {

        return houseIntentionDao.selSimilarPhonePhiidCount(houseIntention);
    }

    // 修改意向房源的(私有--> 公有)
    public int updateHouseIntentionBulidType() {
        return houseIntentionDao.updateHouseIntentionBulidType();
    }

    // 修改意向房源的(保护--->私盘)
    public int updateHouseIntentionBulidTypePrivate() {
        return houseIntentionDao.updateHouseIntentionBulidTypePrivate();
    }

    public HouseFollow selectHouseFollowPhiIdOne(HouseFollow houseFollow) {
        return houseIntentionDao.selectHouseFollowPhiIdOne(houseFollow);
    }

    /**
     * 查询列表--房屋集中式、分散式类型
     *
     * @param houseInformationState
     * @return
     * @作者 JiangQT
     * @日期 2016年7月1日
     */
    public List<HouseInformationState> queryHouseInfoStateList(HouseInformationState houseInformationState) {
        return houseIntentionDao.queryHouseInfoStateList(houseInformationState);
    }

    /**
     * 查询列表--意向房源图片
     *
     * @param intentionImage
     * @return
     * @author zoe
     */
    public List<HouseIntentionImage> queryHouseImageList(HouseIntentionImage intentionImage) {
        return houseIntentionDao.queryHouseImageList(intentionImage);
    }

    public List<HouseInformationStateRelation> queryHouseInfoStateListRelation(HouseInformationStateRelation stateRelation) {
        return houseIntentionDao.queryHouseInfoStateListRelation(stateRelation);
    }

    /**
     * 查询列表--意向房源跟进内容信息表
     *
     * @param houseIntentionType
     * @return
     * @author zoe
     */
    public List<HouseIntentionType> selectHouseIntentionType(HouseIntentionType houseIntentionType) {
        return houseIntentionTypeDao.selectHouseIntentionTypeList(houseIntentionType);
    }

    /**
     * 插入数据---意向房源跟进内容
     *
     * @param houseIntentionType
     * @return
     * @author zoe
     */
    public Map<String, Object> insertHouseIntentionType(HouseIntentionType houseIntentionType, HouseIntention houseIntention) {
        Map<String, Object> map = new HashMap<>();
        if (houseIntentionType != null && houseIntentionType.getHi_code() != null && !houseIntentionType.getHi_code().trim().equals("")) {
            Integer count = houseIntentionTypeDao.insertHouseIntentionType(houseIntentionType);
            if (count != null && count > 0) {
                houseIntentionDao.updateHouseIntentionNewPerson(houseIntention);
                map.put("massage", "success");// 添加成功
            } else {
                map.put("massage", "error");// 添加失败
            }
        }

        return map;
    }

    public int selectHouseIntentionTypeCount(HouseIntentionType houseIntentionType) {
        return houseIntentionTypeDao.selectHouseIntentionTypeCount(houseIntentionType);
    }

    public List<HoseRecommendGroup> selectHoseRecommendGroup(HouseIntention houseIntention) {
        return houseIntentionDao.selectHoseRecommendGroup(houseIntention);
    }

    public Integer orderByPhiType(String str) {
        Integer it = 0;
        if (str.trim().equals("房源跟进")) {
            it = 1;
        } else if (str.trim().equals("房源实勘")) {
            it = 2;
        } else if (str.trim().equals("房源定价")) {
            it = 3;
        } else if (str.trim().equals("存房")) {
            it = 4;
        } else if (str.trim().equals("完成")) {
            it = 5;
        } else if (str.trim().equals("存房失败")) {
            it = 6;
        }
        return it;
    }

    public String getHouseIntentionPhiType(Integer it) {
        String ty = "";
        if (it == 1) {
            ty = "房源录入";
        } else if (it == 2) {
            ty = "房源实勘";
        } else if (it == 3) {
            ty = "房源定价";
        } else if (it == 4) {
            ty = "存房";
        } else if (it == 5) {
            ty = "完成";
        } else if (it == 6) {
            ty = "存房失败";
        } else {
            ty = "房源跟进";
        }
        return ty;
    }

    /**
     * APP查询意向房源
     *
     * @param houseIntention
     * @return
     * @author 陈智颖
     * @date Mar 21, 2017 6:02:03 PM
     */
    public List<HouseIntention> queryHouseIntentionAPP(HouseIntention houseIntention) {
        return houseIntentionDao.queryHouseIntentionAPP(houseIntention);
    }

    /**
     * 查询意向图片
     *
     * @param houseIntention
     * @return
     * @author 陈智颖
     * @date Mar 21, 2017 6:02:03 PM
     */
    public List<HouseIntention> queryHouseIntentionImageType(HouseIntention houseIntention) {
        return houseIntentionDao.queryHouseIntentionImageType(houseIntention);
    }

    /**
     * 查询意向房源状态
     *
     * @param houseIntention
     * @return
     * @author 陈智颖
     * @date Mar 21, 2017 6:02:03 PM
     */
    public HouseIntention queryIntentionState(HouseIntention houseIntention) {
        return houseIntentionDao.queryIntentionState(houseIntention);
    }

    /**
     * 根据物业编号、电话号码、内部人员编码 房屋室 房号 查询是否存在该房源
     *
     * @param houseIntention
     * @return
     * @author 陈智颖
     * @date Apr 26, 2017 3:43:38 PM
     */
    public HouseIntention queryHouseIntentionBool(HouseIntention houseIntention) {
        return houseIntentionDao.queryHouseIntentionBool(houseIntention);
    }

    /**
     * 保存客户管理中房源录入的房源图片
     *
     * @param path
     * @param houseIntention
     */
    public void saveIntentionImg(String path, HouseIntention houseIntention) {
        // 如果图片路径不为空上传图片
        if (path != null && !path.equals("")) {
            String[] split = path.split(",");
            HouseIntentionImage intentionImage = new HouseIntentionImage();
            intentionImage.setHi_code(houseIntention.getHi_code());
            List<HouseIntentionImage> queryHouseImageList = houseIntentionDao.queryHouseImageList(intentionImage);
            if (!queryHouseImageList.isEmpty()) {
                String pathImage = "";
                for (HouseIntentionImage houseIntentionImage : queryHouseImageList) {
                    boolean boolt = true;
                    for (int i = 0; i < split.length; i++) {
                        if (houseIntentionImage.getHim_path().equals(split[i])) {
                            boolt = false;
                            break;
                        }
                    }
                    if (boolt) {
                        pathImage += houseIntentionImage.getHim_path() + ",";
                    }
                }
                if (!pathImage.equals("")) {
                    pathImage = pathImage.substring(0, pathImage.length() - 1);
                }
                try {
                    if (!pathImage.equals("")) {
                        String[] pathImageArr = pathImage.split(",");
                        for (String paths : pathImageArr) {
                            FtpUtil.getInstance("/GJP/resources/houseImage/").delete(paths);
                            HouseIntention houseIntention2 = new HouseIntention();
                            houseIntention2.setHim_path(paths);
                            houseIntentionDao.deleteIntentionImage(houseIntention2);
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            for (int i = 0; i < split.length; i++) {
                boolean boolts = true;
                for (HouseIntentionImage houseIntentionImage1 : queryHouseImageList) {
                    if (houseIntentionImage1.getHim_path().equals(split[i])) {
                        boolts = false;
                        break;
                    }
                }
                if (boolts) {
                    HouseIntentionImage houseIntentionImage = new HouseIntentionImage();
                    houseIntentionImage.setHim_path(split[i]);
                    houseIntentionImage.setHi_code(houseIntention.getHi_code());
                    houseLibraryImage.addHouseIntentionImage(houseIntentionImage);
                    HouseIntentionImageType houseIntentionImageType = new HouseIntentionImageType();
                    if (i == 0) {
                        houseIntentionImageType.setHint_type("page");
                    } else {
                        houseIntentionImageType.setHint_type("effect");
                    }
                    houseIntentionImageType.setHint_str("意向");
                    houseIntentionImageType.setPhi_id(houseIntention.getPhi_id());
                    houseIntentionImageType.setHim_id(houseIntentionImage.getHim_id());
                    houseImageTypeDAO.addHouseIntentionImageType(houseIntentionImageType);
                }
            }
        }
    }

    /**
     * 查询意向房源信息
     *
     * @param hi_code
     * @return
     */
    public HouseIntention queryIntentionHouseByHiCode(String hi_code) {
        return houseIntentionDao.queryIntentionHouseByHiCode(hi_code);
    }

    /**
     * 删除意向房屋图片
     *
     * @author tanglei
     */
    public int deleteHouseIntentionImage(HouseIntentionImage houseImage) {
        return houseIntentionDao.deleteHouseIntentionImage(houseImage);
    }

    /**
     * 根据图片地址查询图片信息
     *
     * @author tanglei
     */
    public HouseIntentionImage selectHouseIntentionImages(HouseIntentionImage houseImage) {
        return houseIntentionDao.selectHouseIntentionImages(houseImage);
    }

    /**
     * 删除意向房源图片类型
     *
     * @author tanglei
     */
    public int deleteHouseIntentionImageType(HouseIntentionImageType imageType) {
        return houseIntentionDao.deleteHouseIntentionImageType(imageType);
    }
}
