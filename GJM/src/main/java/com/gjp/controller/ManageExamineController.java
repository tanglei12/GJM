package com.gjp.controller;

import com.gjp.model.*;
import com.gjp.service.CustomerAppealService;
import com.gjp.service.EnterpriseService;
import com.gjp.util.*;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 租客多企业管理
 * @author 王兴荣
 * @create 2018-03-21 11:30
 **/
@Controller
@RequestMapping("/manageExamine")
public class ManageExamineController {


    @Autowired
    private EnterpriseService enterpriseService;

    @Autowired
    private CustomerAppealService customerAppealService;

    /**********************************************企业审核************************************************/
    /**
     * 企业注册审核列表
     * @return
     */
    @RequestMapping(value = "/companyExamineList",method = RequestMethod.GET)
    public String companyExamineList(){
        return "/zkd/companyExamineList";
    }

    /**
     * 企业注册审核
     * @return
     */
    @RequestMapping(value = "/manageCompanyExamine",method = RequestMethod.GET)
    public String manageCompanyExamine(){
        return "/zkd/manageCompanyExamine";
    }

    /**
     *  企业列表
     * @param pagination
     * @return
     */
    @RequestMapping("/queryCompanyExamineList")
    @ResponseBody
    public Map<String, Object> queryCompanyExamineList(Pagination<ZkdEnterprise> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = enterpriseService.queryEnterpriseList(pagination);
        return msg.toMap(pagination);
    }



    /**
     *根据er_id参数查询企业注册信息详情
     * @param zkdEnterprise
     * @return
     */
    @RequestMapping("/queryEnterprise")
    @ResponseBody
    public String queryEnterprise(ZkdEnterprise zkdEnterprise){
        Msg<Object> msg = new Msg<>();
        ZkdEnterprise zkdEnterprise1 = enterpriseService.queryEnterprise(zkdEnterprise);

        String er_bnusinessLicenseimage = zkdEnterprise1.getEr_bnusinessLicenseimage();//营业执照片
        String er_positiveImage = zkdEnterprise1.getEr_positiveImage();//企业法人证件照正面
        String er_oppositeImage = zkdEnterprise1.getEr_oppositeImage();//企业法人证件照反面
        String er_logo = zkdEnterprise1.getEr_logo();//企业logo照片
        if(er_bnusinessLicenseimage != null){
            zkdEnterprise1.setEr_bnusinessLicenseimage(OSSparameter.imagePath(er_bnusinessLicenseimage, null, null));
        }
        if(er_positiveImage != null){
            zkdEnterprise1.setEr_positiveImage(OSSparameter.imagePath(er_positiveImage, null, null));
        }
        if(er_oppositeImage != null){
            zkdEnterprise1.setEr_oppositeImage(OSSparameter.imagePath(er_oppositeImage, null, null));
        }
        if(er_logo != null){
            zkdEnterprise1.setEr_logo(OSSparameter.imagePath(er_logo, null, null));
        }
        return msg.toString(zkdEnterprise1);
    }

    /**
     * cg_endDate
     * er_state
     * 提交企业注册审核
     * @return
     */
    @RequestMapping("/submitCompanyExamine")
    @ResponseBody
    public String submitCompanyExamine(String cg_endDate , Integer er_state,Integer er_id,Integer cg_type,String er_checkFeedback){
        Msg<Object> msg = new Msg<>();
        try {
            msg = enterpriseService.submitCompanyExamine(cg_endDate, er_state, er_id, cg_type,er_checkFeedback);
            msg.setCode(200);
            msg.setMsg("审核成功");
        } catch (Exception e) {
            msg.setCode(501);
            msg.setMsg("审核失败");
            e.printStackTrace();
        }
        return msg.toString();
    }


    /**********************************************经纪人申诉************************************************/

    /**
     * 客户申诉列表
     * @return
     */
    @RequestMapping(value = "/appealExamineList",method = RequestMethod.GET)
    public String appealExamineList(){
        return "/zkd/appealExamineList";
    }

    /**
     *申诉审核
     * @return
     */
    @RequestMapping(value = "/manageAppealExamine",method = RequestMethod.GET)
    public String manageAppealExamine(){
        return "/zkd/manageAppealExamine";
    }


    /**
     * 经纪人申诉列表
     * @param pagination
     * @return
     */
    @RequestMapping("/queryAppealExamineList")
    @ResponseBody
    public Map<String, Object> queryAppealExamineList(Pagination<ZkdCustomerAppeal> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = customerAppealService.queryAppealExamineList(pagination);
        return msg.toMap(pagination);
    }


    /**
     *经纪人申诉详情
     * @param ap_id
     * @return
     */
    @RequestMapping("/appealExamineDetail")
    @ResponseBody
    public String appealExamineDetail(Integer ap_id){
        Msg<Object> msg = new Msg<>();
        ZkdCustomerAppeal zkdCustomerAppeal = new ZkdCustomerAppeal();
        zkdCustomerAppeal.setAp_id(ap_id);
        ZkdCustomerAppeal zkdCustomerAppeal1 = customerAppealService.queryAppealExamineDetail(zkdCustomerAppeal);
        msg.put("zkdCustomerAppeal",zkdCustomerAppeal1);
        Integer ce_id = zkdCustomerAppeal1.getCe_id();
        Integer ce_type = zkdCustomerAppeal1.getCe_type();
        Integer ce_correlation = zkdCustomerAppeal1.getCe_correlation();
        if(ce_type==1){//预警类型(1:用户2:企业)'
            ZkdCustomerAppeal zkdCustomerAppealUser = new ZkdCustomerAppeal();
            zkdCustomerAppealUser.setCe_id(ce_id);
            ZkdCustomerAppeal CustomerAppealUser = customerAppealService.queryAppealExamineDetailUser(zkdCustomerAppealUser);
            msg.put("CustomerAppealUser",CustomerAppealUser);

        }else {
            ZkdCustomerAppeal zkdCustomerAppealCompany = new ZkdCustomerAppeal();
            zkdCustomerAppealCompany.setCe_id(ce_id);
            ZkdCustomerAppeal CustomerAppealCompay = customerAppealService.queryAppealExamineDetailCompany(zkdCustomerAppealCompany);
            msg.put("CustomerAppealCompay",CustomerAppealCompay);
        }
        return msg.toString();
    }


    /**
     * 处理经纪人申诉
     * @param ap_id
     * @param ap_state
     * @return
     */
    @RequestMapping("/submitAppealExamin")
    @ResponseBody
    public String submitAppealExamin(Integer ap_id,Integer ap_state){
        Msg<Object> msg = new Msg<>();
        try {
            msg = customerAppealService.submitAppealExamin(ap_id, ap_state);
            msg.setCode(200);
            msg.setMsg("处理成功");
        } catch (Exception e) {
            msg.setCode(501);
            msg.setMsg("处理失败");
            e.printStackTrace();
        }
        return msg.toString();
    }


    /**********************************************房管员审核************************************************/

    /**
     * 房管员审核列表
     * @return
     */
    @RequestMapping("/agentExamineList")
    public String agentExamineList(){
        return "/zkd/agentExamineList";
    }

    /**
     * 房管员列表
     * @param pagination
     * @return
     */
    @RequestMapping("/queryAgentExamineList")
    @ResponseBody
    public Map<String, Object> queryAgentExamineList(Pagination<ZkdCompanyAgent> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = enterpriseService.queryAgentExamineList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 房管员审核
     * @return
     */
    @RequestMapping("/agentExamine")
    public String agentExamine(){
        return "/zkd/agentExamine";
    }


    /**
     *房管员详情
     * @param ca_id
     * @return
     */
    @RequestMapping("/queryAgentInfo")
    @ResponseBody
    public String queryAgentInfo(Integer ca_id){
        Msg<Object> msg = new Msg<>();
        ZkdCompanyAgent zkdCompanyAgent = new ZkdCompanyAgent();
        zkdCompanyAgent.setCa_id(ca_id);
        ZkdCompanyAgent zkdCompanyAgent1 = enterpriseService.queryAgentInfo(zkdCompanyAgent);

        String ca_headImage = zkdCompanyAgent1.getCa_headImage();//头像
        String cai_positiveImage = zkdCompanyAgent1.getCai_positiveImage();//企业法人证件照正面
        String er_oppositeImage = zkdCompanyAgent1.getCai_oppositeImage();//企业法人证件照反面
        if(ca_headImage != null){
            zkdCompanyAgent1.setCa_headImage(OSSparameter.imagePath(ca_headImage, null, null));
        }
        if(cai_positiveImage != null){
            zkdCompanyAgent1.setCai_positiveImage(OSSparameter.imagePath(cai_positiveImage, null, null));
        }
        if(er_oppositeImage != null){
            zkdCompanyAgent1.setCai_oppositeImage(OSSparameter.imagePath(er_oppositeImage, null, null));
        }

        return msg.toString(zkdCompanyAgent1);
    }

    /**
     * ca_id
     * ca_state
     * 房管员注册审核
     * @return
     */
    @RequestMapping("/submitAgentExamine")
    @ResponseBody
    public String submitAgentExamine(Integer ca_id , Integer ca_state){
        Msg<Object> msg = new Msg<>();
        try {
            msg = enterpriseService.submitAgentExamine(ca_id, ca_state);
            msg.setCode(200);
            msg.setMsg("审核成功");
        } catch (Exception e) {
            msg.setCode(501);
            msg.setMsg("审核失败");
            e.printStackTrace();
        }
        return msg.toString();
    }

    /**********************************************圈子发布**********************************************/

    /**
     * 圈子列表
     * @return
     */
    @RequestMapping("/topicManageList")
    public String topicManageList(){
        return "/zkd/topicManageList";
    }
    /**
     * 編輯圈子
     * @return
     */
    @RequestMapping("/topicManage")
    public String topicManage(){
        return "/zkd/topicManage";
    }

    /**
     * 上传租客多图片
     *
     * @param request
     * @param response
     * @param uploadType
     * @return
     */
    @RequestMapping("/uploadTopicImage")
    @ResponseBody
    public Map<String, Object> uploadTopicImage(MultipartHttpServletRequest request, HttpServletResponse response, String uploadType) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(uploadType)) {
            map.put("msg", "参数错误");
            return map;
        }
        String realPath = request.getSession().getServletContext().getRealPath("/resources/temp/");
        // 创建文件夹
        File upFile = new File(realPath);
        if (!upFile.exists()) {
            upFile.mkdirs();
        }
        try {
            for (MultipartFile file : request.getFiles("file")) {
                if (file.getSize() > 1000 * 1024 * 20) {
                    map.put("msg", "图片大小不得超过20M");
                    return map;
                }
                File outFile = new File(realPath + AppUtil.getOrderCode("IMAGE") + ".png");
                // 文件类型
                String fileType = "png";
                if (file.getOriginalFilename().contains("\\.")) {
                    fileType = file.getOriginalFilename().split("\\.")[1];
                }
                // 图片匹配类型
                if (file.getContentType().contains("image")) {
                    // 如果图片大于1M就进行压缩
                    if (file.getSize() <= 1000 * 400) {
                        file.transferTo(outFile);
                    } else {
                        CommonsMultipartFile cf = (CommonsMultipartFile) file;
                        DiskFileItem fi = (DiskFileItem) cf.getFileItem();
                        File inFile = fi.getStoreLocation();
                        ImageUtil.saveMinPhoto(inFile.toString(), outFile.toString(), 1920, 0.8d);
                    }
                } else {
                    if (!outFile.exists()) {
                        file.transferTo(outFile);
                    }
                }
                // 远程上传
                OSSparameter.uploadFile(outFile, "zkdImage");
                String path = "zkdImage/" + outFile.getName();
                // 删除临时文件
                outFile.delete();
                if (AppUtil.isNotNull(path)) {
                    map.put("msg", "success");
                    map.put("path", path);
                } else {
                    map.put("msg", "上传失败");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("msg", "系统错误，请联系管理员");
        }
        return map;
    }

    /**
     * 删除图片
     *
     * @param request
     * @param response
     * @param image_url  图片地址
     * @return
     */
    @RequestMapping("/deleteTopicImageFile")
    @ResponseBody
    public Map<String, Object> deleteTopicImageFile(HttpServletRequest request, HttpServletResponse response, String image_url,
                                                      String uploadType) {
        Map<String, Object> map = new HashMap<>();
        if (!AppUtil.isNotNull(image_url) || !AppUtil.isNotNull(uploadType)) {
            map.put("msg", Msg.MSG_PARAM_ERROR);
            return map;
        }
        // 远程删除图片
        try {
            OSSparameter.removeFile(image_url);
            map.put("msg", "success");
        } catch (Exception e) {
            e.printStackTrace();
            map.put("msg", "系统异常，请重试或联系管理员");
        }
        return map;
    }

    /**
     * 添加圈子
     * @param t_title
     * @param t_content
     * @param t_cover
     * @param t_coverSmall
     * @return
     */
    @RequestMapping("/addCreateTopic")
    @ResponseBody
    public Map<Object,String> addCreateTopic(String t_title,String t_content,String t_cover,String t_coverSmall,Integer em_id,String em_name,Integer t_isDelete){
        Map<Object, String> map = new HashMap<>();

        TopicVo topicVo = new TopicVo();
        topicVo.setT_title(t_title);
        topicVo.setT_content(t_content);
        topicVo.setT_cover(t_cover);
        topicVo.setT_coverSmall(t_coverSmall);
        topicVo.setT_isDelete(0);
        topicVo.setT_isRelease(0);
        topicVo.setT_createEm(em_id);
        topicVo.setT_createEmName(em_name);
        topicVo.setT_isDelete(t_isDelete);

        Integer integer = enterpriseService.insertCreateTopic(topicVo);
        if(integer>0){
            map.put("msg", "成功");
            map.put("code", "200");
        }else {
            map.put("msg", "失败");
            map.put("code", "401");
        }
        return map;
    }

    /**
     * 修改圈子
     * @param t_title
     * @param t_content
     * @param t_cover
     * @param t_coverSmall
     * @return
     */
    @RequestMapping("/updateTopic")
    @ResponseBody
    public Map<Object,String> updateTopic(String t_title,String t_content,String t_cover,String t_coverSmall,Integer t_id,Integer t_isDelete ){
        Map<Object, String> map = new HashMap<>();
        if(t_id == null || "".equals(t_id)){
            map.put("msg", "参数错误");
            map.put("code", "401");
            return map;
        }
        TopicVo topicVo = new TopicVo();

        topicVo.setT_id(t_id);
        topicVo.setT_title(t_title);
        topicVo.setT_content(t_content);
        topicVo.setT_cover(t_cover);
        topicVo.setT_coverSmall(t_coverSmall);
        topicVo.setT_isDelete(t_isDelete);

        Integer integer = enterpriseService.updateTopic(topicVo);
        if(integer>0){
            map.put("msg", "成功");
            map.put("code", "200");
        }else {
            map.put("msg", "失败");
            map.put("code", "401");
        }
        return map;
    }

    /**
     * 圈子列表
     * @param pagination
     * @return
     */
    @RequestMapping("/queryTopicList")
    @ResponseBody
    public Map<String, Object> queryTopicList(Pagination<TopicVo> pagination) {
        Msg<Object> msg = new Msg<>();
        pagination.formatWhere();
        pagination = enterpriseService.queryTopicList(pagination);
        return msg.toMap(pagination);
    }

    /**
     * 圈子列表(弹窗插件)
     *
     * @param pageNo
     * @param ucc_short
     * @return
     * @author
     */
    @RequestMapping("/queryTopicDataList")
    public @ResponseBody
    String queryTopicDataList(String param, int pageNo, String ucc_short, String ucc_name) {
        Msg<Object> msg = new Msg<>();
        TopicVo topic = new TopicVo();
        topic.setT_title(param);
        Pagination<TopicVo> pagination = new Pagination<>(pageNo, 8, topic);
        List<TopicVo> topicVos = enterpriseService.queryTopicVoList(pagination);
        for (TopicVo topicVo : topicVos){
            if (topicVo.getT_cover() != null && !"".equals(topicVo.getT_cover())){
                topicVo.setT_cover( OSSparameter.imagePath(topicVo.getT_cover(),null,null));
            }
            if (topicVo.getT_coverSmall() != null && !"".equals(topicVo.getT_coverSmall())){
                topicVo.setT_coverSmall( OSSparameter.imagePath(topicVo.getT_coverSmall(),null,null));
            }
        }
        pagination.setList(topicVos, enterpriseService.queryTopicVoListCount(pagination));
        return msg.toString(pagination);
    }


    /**
     * 查询圈子
     * @param t_id 圈子ID
     * @return
     */
    @RequestMapping("/queryTopicdetail")
    @ResponseBody
    public Map queryTopicdetail(Integer t_id){
        Map<Object, Object> map = new HashMap<>();
        TopicVo topicVo = new TopicVo();
        topicVo.setT_id(t_id);
        TopicVo topicVo1 = enterpriseService.queryTopicdetail(topicVo);
        if (topicVo1.getT_cover() != null && !"".equals(topicVo1.getT_cover())){
            topicVo1.setT_coverOSS(OSSparameter.imagePath(topicVo1.getT_cover(), null, null));
        }
        if (topicVo1.getT_coverSmall() != null && !"".equals(topicVo1.getT_coverSmall())){
            topicVo1.setT_coverSmallOSS(OSSparameter.imagePath(topicVo1.getT_coverSmall(), null, null));
        }
        map.put("topic", topicVo1);
        map.put("msg", "成功");
        map.put("code", "200");
        return map;
    }

    /**
     * 发布圈子
     * @param r_tid
     * @param r_releaseEm
     * @return
     */
    @RequestMapping("/releaseTopic")
    @ResponseBody
    public Map<Object,String> releaseTopic(String r_tid,Integer r_releaseEm){
        Map<Object, String> map = new HashMap<>();

        TopicReleaseVo topicReleaseVo = new TopicReleaseVo();
        topicReleaseVo.setR_tid(r_tid);
        topicReleaseVo.setR_releaseEm(r_releaseEm);

        Integer integer = enterpriseService.releaseTopic(topicReleaseVo);


        String[] split = r_tid.split(";");
        TopicVo topicVo = new TopicVo();
        for (int i = 0; i < split.length; i++) {
            String tid = split[i];
            topicVo.setT_id(Integer.valueOf(tid));
            topicVo.setT_isRelease(1);
            enterpriseService.updateTopic(topicVo);
        }

        if(integer>0){
            map.put("msg", "成功");
            map.put("code", "200");
        }else {
            map.put("msg", "失败");
            map.put("code", "401");
        }
        return map;
    }

}
