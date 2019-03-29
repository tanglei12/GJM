package com.gjp.controller;

import com.gjp.model.AppCode;
import com.gjp.model.AppVersionVo;
import com.gjp.service.AppCodeService;
import com.gjp.util.AppConfig;
import com.gjp.util.AppUtil;
import com.gjp.util.Msg;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 陈智颖
 * @create 2017-07-28 7:57 PM
 **/
@Controller
@RequestMapping("/appVersion")
public class AppCodeController {

    @Resource
    private AppCodeService appCodeService;

    /**
     * APP版本号控制
     *
     * @param appCode
     * @return
     * @author 陈智颖
     * @date Apr 23, 2017 2:07:11 PM
     */
    @RequestMapping("/appCode")
    public @ResponseBody
    Map<String, Object> appCode(AppCode appCode) {
        Map<String, Object> map = new HashMap<>();
        List<AppCode> appcodes = appCodeService.appcode(appCode);
        map.put("code", 200);
        map.put("data", appcodes.get(0));
        return map;
    }

    /**
     * 获取APP版本
     *
     * @param appVersionVo 版本控制对象
     * @return
     * @author JQT
     * @create 2017-09-10
     */
    @RequestMapping("/getVersion")
    public @ResponseBody
    Map<String, Object> getVersion(AppVersionVo appVersionVo) {
        Msg<Object> msg = new Msg<>();
        if (appVersionVo == null) {
            return msg.toErrorMap(Msg.MSG_PARAM_ERROR);
        }
        // APP类型
        String ap_type = appVersionVo.getAv_type();
        // 当前版本
        int minVersion = AppUtil.formatAppVersion(appVersionVo.getAv_code());
        if (StringUtils.isEmpty(ap_type) || minVersion == 0) {
            return msg.toErrorMap(Msg.MSG_PARAM_ERROR);
        }
        // 获取版本控制
        appVersionVo.setAv_swith(1);
        appVersionVo = appCodeService.queryAppVersionLast(appVersionVo);
        if (appVersionVo == null) {
            return msg.toErrorMap("没有发现最新版本");
        }
        // 最新版本
        int maxVersion = AppUtil.formatAppVersion(appVersionVo.getAv_code());
        if (maxVersion == 0) {
            return msg.toErrorMap("获取版本失败");
        }
        // 比较版本
        if (minVersion >= maxVersion) {
            return msg.toMap(201, "当前已是最新版本");
        }
        // 查询是否为强制更新
        AppVersionVo appVersionVo1 = new AppVersionVo();
        appVersionVo1.setAv_type(ap_type);
        appVersionVo1.setAv_num_min(minVersion);
        appVersionVo1.setAv_num_max(maxVersion);
        appVersionVo1.setAv_state(AppConfig.ar_state_2);// 版本强制更新
        appVersionVo1.setAv_swith(1);// 版本开启
        List<AppVersionVo> appVersionRecordList = appCodeService.queryAppVersionList(appVersionVo1);
        if (appVersionRecordList != null && !appVersionRecordList.isEmpty()) {
            appVersionVo.setAv_state(AppConfig.ar_state_2);
        }
        msg.put("appVersion", appVersionVo);
        return msg.toMap();
    }
}
