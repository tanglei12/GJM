package com.gjp.controller;

import com.gjp.model.ImageFile;
import com.gjp.util.AppUtil;
import com.gjp.util.Msg;
import com.gjp.util.OSSparameter;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * @author 陈智颖
 * @create 2017-12-05 16:24
 **/
@Controller
@RequestMapping("/file")
public class FileController {

    /**
     * 上传服务图片
     *
     * @param request
     * @param uploadType
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/uploadImage")
    @ResponseBody
    public Map<String, Object> uploadImage(MultipartHttpServletRequest request, String uploadType) {
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
            for (MultipartFile file: request.getFiles("file")) {
                if (file.getSize() > 1000 * 1024 * 20) {
                    map.put("msg", "图片大小不得超过20M");
                    return map;
                }
                File outFile = new File(realPath + AppUtil.getOrderCode("IMAGE") + ".png");
                // 图片匹配类型
                if (file.getContentType().contains("image")) {
                    // 如果图片大于1M就进行压缩
                    if (file.getSize() <= 1000 * 400) {
                        file.transferTo(outFile);
                    } else {
                        CommonsMultipartFile cf = (CommonsMultipartFile) file;
                        DiskFileItem fi = (DiskFileItem) cf.getFileItem();
                        File inFile = fi.getStoreLocation();
                        Thumbnails.of(inFile).scale(1f).outputQuality(0.5f).toFile(outFile);
                    }
                } else {
                    if (!outFile.exists()) {
                        file.transferTo(outFile);
                    }
                }
                // 远程上传
                OSSparameter.uploadFile(outFile, uploadType);
                String path = uploadType + "/" + outFile.getName();
                // 删除临时文件
                outFile.delete();
                if (AppUtil.isNotNull(path)) {
                    ImageFile imageFile = new ImageFile();
                    imageFile.setKey(path);
                    imageFile.setUrl(OSSparameter.imagePath(path));
                    map.put("data", imageFile);
                    map.put("code", 200);
                    map.put("msg", "上传成功");
                } else {
                    map.put("code", 401);
                    map.put("msg", "上传失败");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code", 401);
            map.put("msg", "系统错误，请联系管理员");
        }
        return map;
    }

    /**
     * 删除图片
     *
     * @param image_url  图片地址
     * @param uploadType 上传类型
     * @return
     * @author 陈智颖
     */
    @RequestMapping("/deleteImageFile")
    @ResponseBody
    public Map<String, Object> deleteServiceImageFile(String image_url, String uploadType) {
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
}
