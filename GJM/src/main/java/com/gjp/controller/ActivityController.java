package com.gjp.controller;

import com.alibaba.fastjson.JSONObject;
import com.gjp.model.*;
import com.gjp.service.ActivityService;
import com.gjp.service.ServiceService;
import com.gjp.util.Msg;
import com.gjp.util.OSSparameter;
import com.gjp.util.Pagination;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 活动管理
 */
@Controller
@RequestMapping("/activity")
public class ActivityController {

    @Resource
    private ActivityService activityService;
    // 服务
    @Resource
    private ServiceService serviceService;

    /**
     * 活动管理列表
     *
     * @return
     */
    @RequestMapping("/activityManagePageList")
    public String activityManageList() {
        return "/activity/activityList";
    }

    /**
     * 添加活动
     *
     * @return
     */
    @RequestMapping("/addActivity")
    public String addActivity() {
        return "/activity/addActivity";
    }

    /**
     * 添加活动
     *
     * @return
     */
    @RequestMapping("/editActivity")
    public ModelAndView editActivity(Integer am_id) {
        ModelAndView mav = new ModelAndView("/activity/addActivity");
        mav.addObject("am_id", am_id);
        return mav;
    }

    /**
     * 查询活动管理列表分页数据
     *
     * @param pagination
     * @return
     */
    @RequestMapping("/queryActivityPageList")
    public @ResponseBody
    String queryActivityPageList(Pagination<ActivityManageVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = activityService.queryActivityPageList(pagination);
        return msg.toString(pagination);
    }

    /**
     * 查询奖品管理列表分页数据
     *
     * @param pagination
     * @return
     */
    @RequestMapping("/queryActivityPrizePageList")
    public @ResponseBody
    String queryActivityPrizePageList(Pagination<ActivityPrizeVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = activityService.queryActivityPrize(pagination);
        return msg.toString(pagination);
    }

    /**
     * 保存活动信息
     *
     * @return
     */
    @RequestMapping("/saveActivity")
    @ResponseBody
    public String saveActivity(@RequestBody Map<String, Object> data, HttpServletRequest request) {
        Msg<Object> msg = new Msg<>();

        ActivityManageVo activityManageVo = JSONObject.parseObject((String) data.get("activity"), ActivityManageVo.class);
        if (null == activityManageVo) {
            msg.setMsg(401, "参数为空异常");
            return msg.toString();
        }

        List<ActivityImageVo> activityImageVos = JSONObject.parseArray((String) data.get("activityImage"), ActivityImageVo.class);
        if (null == activityImageVos) {
            msg.setMsg(401, "参数为空异常");
            return msg.toString();
        }

        int result = -1;
        Integer am_id = activityManageVo.getAm_id();

        if (null == am_id || am_id <= 0) {
            activityManageVo.setAm_code(Long.valueOf(new SimpleDateFormat("yyyyMMddSSS").format(new Date())));
            result = activityService.addActivityMange(activityManageVo);
            for (ActivityImageVo imageVo : activityImageVos) {
                imageVo.setAm_code(activityManageVo.getAm_code());
                activityService.addActivityImage(imageVo);
            }

        } else {
            result = activityService.updateActivityManage(activityManageVo);

            ActivityImageVo imageVoDel = new ActivityImageVo();
            imageVoDel.setAm_code(activityManageVo.getAm_code());
            activityService.deleteActivityImage(imageVoDel);

            for (ActivityImageVo imageVo : activityImageVos) {
                imageVo.setAm_code(activityManageVo.getAm_code());
                activityService.addActivityImage(imageVo);
            }
        }
        if (result == 1) {
            msg.setMsg(200, "活动信息保存成功");
        } else {
            msg.setMsg(400, "活动信息保存失败");
        }

        return msg.toString();
    }

    /**
     * 查询活动信息
     *
     * @return
     */
    @RequestMapping("/queryActivityInfo")
    @ResponseBody
    public String queryActivityInfo(Integer am_id) {
        Msg<Object> msg = new Msg<>();

        if (null == am_id) {
            msg.setMsg(401, "参数为空异常");
            return msg.toString();
        }

        // 活动信息
        ActivityManageVo activityManageVo = activityService.queryActivityInfo(am_id);
        if (null == activityManageVo) {
            msg.setMsg(400, "无相关活动信息");
            return msg.toString();
        } else {
            msg.put("activityManageVo", activityManageVo);
        }

        // 活动图片信息
        ActivityImageVo activityImageVo = new ActivityImageVo();
        activityImageVo.setAm_code(activityManageVo.getAm_code());
        List<ActivityImageVo> activityImageVos = activityService.queryActivityImageByCode(activityImageVo);
        if (null != activityImageVos) {
            for (ActivityImageVo imageVo : activityImageVos) {
                imageVo.setAi_image_url(OSSparameter.imagePath(imageVo.getAi_path(), null, null));
            }
            msg.put("activityImageVos", activityImageVos);
        }

        // 奖品信息
        ActivityPrizeVo activityPrizeVo = new ActivityPrizeVo();
        activityPrizeVo.setAm_code(Long.valueOf(activityManageVo.getAm_code()));
        List<ActivityPrizeVo> activityPrizeVos = activityService.queryPrizeListByCode(activityPrizeVo);
        msg.put("activityPrizeVos", activityPrizeVos);

        return msg.toString();
    }

    /**
     * 查询奖品信息
     *
     * @return
     */
    @RequestMapping("/queryActivityPrizeInfo")
    @ResponseBody
    public String queryActivityPrizeInfo(Integer ap_id) {
        Msg<Object> msg = new Msg<>();

        if (null == ap_id) {
            msg.setMsg(401, "参数为空异常");
            return msg.toString();
        }

        ActivityPrizeVo activityPrizeVo = activityService.queryActivityPrizeInfo(ap_id);

        ActivityPrizeImageVo prizeImageVo = new ActivityPrizeImageVo();
        prizeImageVo.setAp_id(ap_id);
        List<ActivityPrizeImageVo> prizeImageVoList = activityService.queryPrizeImage(prizeImageVo);

        if (null == activityPrizeVo) {
            msg.setMsg(400, "无相关活动信息");
        } else {
            msg.put("activityPrizeVo", activityPrizeVo);
            if (null != prizeImageVoList && !prizeImageVoList.isEmpty()) {
                for (ActivityPrizeImageVo imageVo : prizeImageVoList) {
                    imageVo.setAip_path_url(OSSparameter.imagePath(imageVo.getAip_path(), null, null));
                }
                msg.put("prizeImageVoList", prizeImageVoList);
            }
        }

        return msg.toString();
    }

    /**
     * 查询活动列表
     *
     * @return
     * @throws
     */
    @RequestMapping(value = "/queryActivityList", produces = "text/plain;charset=UTF-8")
    @ResponseBody
    public String queryActivityList(String where) {
        Msg<Object> msg = new Msg<>();

        Pagination<ActivityManageVo> voPagination = new Pagination<>(1, 10);
        ActivityManageVo activityManageVo = new ActivityManageVo();
        activityManageVo.setWhere(where);
        voPagination.setT(activityManageVo);

        List<ActivityManageVo> activityManageVos = activityService.queryActivityList(voPagination);
        voPagination.setList(activityManageVos);
        msg.setData(voPagination);

        return msg.toString();
    }

    /**
     * 保存活动信息
     *
     * @return
     */
    @RequestMapping("/saveActivityPrize")
    @ResponseBody
    public String saveActivityPrize(@RequestBody Map<String, Object> data) {
        Msg<Object> msg = new Msg<>();

        ActivityPrizeVo activityPrizeVo = JSONObject.parseObject((String) data.get("activity"), ActivityPrizeVo.class);
        if (null == activityPrizeVo) {
            msg.setMsg(401, "参数为空异常");
            return msg.toString();
        }

        List<ActivityPrizeImageVo> activityPrizeImageVos = JSONObject.parseArray((String) data.get("prizeImage"), ActivityPrizeImageVo.class);
        if (null == activityPrizeImageVos) {
            msg.setMsg(401, "参数为空异常");
            return msg.toString();
        }

        int result = -1;
//        activityPrizeVo.setAp_odds(new BigDecimal());
        Integer ap_id = activityPrizeVo.getAp_id();
        if (null == ap_id || ap_id <= 0) {

            Integer uccfgCount = activityService.queryUccfgByCode(activityPrizeVo);
            if (null != uccfgCount && uccfgCount.intValue() > 0) {
                msg.setMsg(402, "该奖品已有相同优惠券，请勿重复添加");
                return msg.toString();
            }

            activityPrizeVo.setAp_remaining_number(activityPrizeVo.getAp_total_number());
            activityService.addActivityPrize(activityPrizeVo);

            for (ActivityPrizeImageVo prizeImageVo : activityPrizeImageVos) {
                prizeImageVo.setAp_id(activityPrizeVo.getAp_id());
                activityService.addActivityPrizeImage(prizeImageVo);
            }

        } else {

            Integer uccfgCount = activityService.queryUccfgByCode(activityPrizeVo);
            if (null != uccfgCount && uccfgCount.intValue() > 1) {
                msg.setMsg(402, "该奖品已有相同优惠券，请勿重复添加");
                return msg.toString();
            }

            activityService.updateActivityPrize(activityPrizeVo);

            ActivityPrizeImageVo prizeImageVo = new ActivityPrizeImageVo();
            prizeImageVo.setAp_id(activityPrizeVo.getAp_id());
            activityService.deleteActiviPrizeImage(prizeImageVo);

            for (ActivityPrizeImageVo imageVo : activityPrizeImageVos) {
                imageVo.setAp_id(activityPrizeVo.getAp_id());
                activityService.addActivityPrizeImage(imageVo);
            }
        }

        return msg.toString();
    }

    /**
     * 跳转奖品记录
     *
     * @author tanglei
     */
    @RequestMapping("/prizeRecord")
    public String PrizeRecord() {
        return "/activity/prizesRecord";
    }

    /**
     * 奖品记录列表
     *
     * @author tanglei
     */
    @RequestMapping("/queryPrizeRecordList")
    @ResponseBody
    public Map<String, Object> queryPrizeRecordList(Pagination<ActivityPrizeRecordVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = activityService.queryPrizeRecordList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 跳转分享管理
     *
     * @author tanglei
     */
    @RequestMapping("/shareManagement")
    public String shareManagement() {
        return "/activity/shareManagement";
    }

    /**
     * 分享列表
     *
     * @author tanglei
     */
    @RequestMapping("/queryShareList")
    @ResponseBody
    public Map<String, Object> queryShareList(Pagination<ActivityShareRecordVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = activityService.queryShareList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 活动标题
     *
     * @author tanglei
     */
    @RequestMapping("/selectActivityManageTitle")
    @ResponseBody
    public Map<String, Object> selectActivityManageTitle() {
        Msg<Object> msg = new Msg<>();
        List<ActivityManageVo> activityList = activityService.selectActivityManageTitle();
        return msg.toMap(activityList);
    }

    /**
     * 奖品名称
     *
     * @author tanglei
     */
    @RequestMapping("/selectPrizeName")
    @ResponseBody
    public Map<String, Object> selectPrizeName(String am_code) {
        Msg<Object> msg = new Msg<>();
        ActivityPrizeVo prize = new ActivityPrizeVo();
        prize.setAm_code(Long.valueOf(am_code));
        List<ActivityPrizeVo> activityList = activityService.selectPrizeName(prize);
        return msg.toMap(activityList);
    }

    /**
     * 优惠券配置
     *
     * @author tanglei
     */
    @RequestMapping("/couponsConfig")
    public String couponsConfig() {
        return "/activity/userCouponsConfig";
    }

    /**
     * 优惠券配置列表
     *
     * @author tanglei
     */
    @RequestMapping("/queryCouponsConfigList")
    @ResponseBody
    public Map<String, Object> queryCouponsConfigList(Pagination<UserCouponsConfigVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = activityService.queryCouponsConfigList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 优惠券配置列表
     *
     * @author tanglei
     */
    @RequestMapping("/queryCouponsConfigPageList")
    @ResponseBody
    public Map<String, Object> queryCouponsConfigPageList(String where, Integer pageNo, Integer pageSize) {
        Pagination<UserCouponsConfigVo> pagination = new Pagination<>();
        UserCouponsConfigVo userCouponsConfigVo = new UserCouponsConfigVo();
        userCouponsConfigVo.setWhere(where);
        Msg<Object> msg = new Msg<>();
        pagination.setT(userCouponsConfigVo);
        pagination.setPageNo(pageNo);
        pagination.setPageSize(pageSize);
        pagination.formatWhere();
        pagination = activityService.queryCouponsConfigPageList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 优惠券类型
     * <p>
     * 优惠券用途
     *
     * @author tanglei
     */
    @RequestMapping("/queryCouponsUse")
    @ResponseBody
    public Map<String, Object> queryCouponsUse(UserCouponsUse userCouponsUse) {
        Msg<Object> msg = new Msg<>();
        List<UserCouponsUse> serviceList = activityService.queryCouponsUse(userCouponsUse);
        return msg.toMap(serviceList);
    }

    /**
     * 添加.修改优惠券 配置
     *
     * @author tanglei
     */
    @RequestMapping("/addCouponsConfig")
    @ResponseBody
    public String addCouponsConfig(UserCouponsConfigVo couponsConfigVo) {
        Msg<Object> msg = new Msg<>();
        if (null == couponsConfigVo) {
            msg.setMsg(401, "参数为空异常");
            return msg.toString();
        }
        int fool = 1;
        Integer uccfg_id = couponsConfigVo.getUccfg_id();
        if (StringUtils.isEmpty(uccfg_id)) {
            fool = activityService.addCouponsConfig(couponsConfigVo);
        } else {
            fool = activityService.updateCouponsConfig(couponsConfigVo);
        }
        if (fool == 1) {
            msg.setMsg(200, "优惠券配置保存成功");
        } else {
            msg.setMsg(400, "优惠券配置保存失败");
        }
        return msg.toString();
    }

    /**
     * 查询优惠券配置数据
     *
     * @author tanglei
     */
    @RequestMapping("/selectCouponsConfig")
    @ResponseBody
    public String selectCouponsConfig(Integer uccfg_id) {
        Msg<Object> msg = new Msg<>();
        msg.put("couponsConfig", activityService.selectCouponsConfig(uccfg_id));
        return msg.toString();
    }

    /**
     * 优惠券
     *
     * @author tanglei
     */
    @RequestMapping("/coupons")
    public String coupons() {
        return "/activity/userCoupons";
    }

    /**
     * 优惠券列表
     *
     * @author tanglei
     */
    @RequestMapping("/queryCouponsList")
    @ResponseBody
    public Map<String, Object> queryCouponsList(Pagination<UserCouponsVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = activityService.queryCouponsList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 优惠券名称
     *
     * @author tanglei
     */
    @RequestMapping("/selectuccfgName")
    @ResponseBody
    public Map<String, Object> selectuccfgName() {
        Msg<Object> msg = new Msg<>();
        List<UserCouponsConfigVo> couponsConfigVo = activityService.selectuccfgName();
        return msg.toMap(couponsConfigVo);
    }

    /**
     * 跳转会员管理页面
     *
     * @author tanglei
     */
    @RequestMapping("/userMember")
    public String userMember() {
        return "/activity/userMember";
    }

    /**
     * 会员管理
     *
     * @author tanglei
     */
    @RequestMapping("/queryUserMember")
    @ResponseBody
    public Map<String, Object> queryUserMember(Pagination<UserMemberVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = activityService.queryUserMember(pagination);
        return msg.toMap(pagination);
    }


}
