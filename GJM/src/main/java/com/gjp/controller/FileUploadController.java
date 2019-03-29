package com.gjp.controller;

import com.gjp.service.ContractService;
import com.gjp.util.AppUtil;
import com.gjp.util.ImageUtil;
import com.gjp.util.Msg;
import com.gjp.util.OSSparameter;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.net.MalformedURLException;
import java.util.HashMap;

/**
 * 图片上传接口(可扩展)
 *
 * @author 王孝元
 * @version 创建时间：2017年2月27日 上午11:13:03
 */
@Controller
@RequestMapping("/upload")
public class FileUploadController {

    // 合同对象
    private @Resource
    ContractService contractService;

    /**
     * 上传图片
     *
     * @param request
     * @param response
     * @param data
     * @param imageType
     * @return
     * @author 王孝元
     */
    @RequestMapping("/uploadHouseImage")
    @ResponseBody
    public String uploadHouseImage(HttpServletRequest request, HttpServletResponse response, String data,
                                   String imageType) {
        Msg<Object> msg = new Msg<>();
        if (StringUtils.isEmpty(data)) {
            msg.setCode(110);
            msg.setMsg(Msg.MSG_PARAM_ERROR);
            return msg.toString();
        }
        try {
            String aaa = request.getSession().getServletContext().getResource("/").getPath();
            System.out.println("aaa" + aaa);
        } catch (MalformedURLException e1) {
            e1.printStackTrace();
        }
        String realPath = request.getSession().getServletContext().getRealPath("/resources/contractImage/");
        System.out.println(realPath);
        // 创建文件夹
        File upFile = new File(realPath);
        if (!upFile.exists()) {
            upFile.mkdirs();
        }
        // 文件名称
        String imageName = AppUtil.getImageName("") + ".png";
        // 本地缓存地址
        String imageUrl = realPath + "/" + imageName;
        // base64转图片
        boolean boo = ImageUtil.base64ToImageFile(data, imageUrl);
        if (!boo) {
            return msg.toError(Msg.MSG_SYSTEM_ERROR);
        }
        // 图片压缩
        File file = new File(imageUrl);
        try {
            ImageUtil.saveMinPhoto(file.toString(), file.toString(), 936, 0.9d);
        } catch (Exception e) {
            System.out.println("图片压缩失败");
        }
        // 远程上传
        String image = AppUtil.uploadHouseImage(getClass(), file);

        HashMap<String, Object> map = new HashMap<>();
        map.put("image", image);
        map.put("imageType", imageType);
        msg.setData(map);
        return msg.toString();
    }

    /**
     * 上传图片
     *
     * @param request
     * @param response   文件流
     * @param uploadType 上传类型
     * @return
     * @author 王孝元
     */
    @RequestMapping("/uploadImageFile")
    @ResponseBody
    public String uploadImageFile(MultipartHttpServletRequest request, String uploadType) {
//		Map<String, Object> json = new HashMap<>();
//		if (!AppUtil.isNotNull(uploadType)) {
//			json.put("msg", "参数错误");
//			return json;
//		}
        /*String realPath = request.getSession().getServletContext().getRealPath("/resources/temp/");
		// 创建文件夹
		File upFile = new File(realPath);
		if (!upFile.exists()) {
			upFile.mkdirs();
		}
		try {
			for (MultipartFile file : request.getFiles("file")) {
				if (file.getSize() > 1000 * 1024 * 20) {
					json.put("msg", "图片大小不得超过20M");
					return json;
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
				// 文件流
				InputStream input = new FileInputStream(outFile);
				// 文件名称
				String fileName = AppUtil.buildFileName(uploadType, fileType);
				// FTP文件上传
				String path = FtpUtil.getInstance(uploadType).upload(fileName, input);
				// 删除临时文件
				outFile.delete();
				if(AppUtil.isNotNull(path)){
					json.put("msg", "success");
					json.put("path", path);
				}else{
					json.put("msg", "上传失败");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			json.put("msg", "系统错误，请联系管理员");
		}*/
        return contractService.uploadFile(request, uploadType).toString();
    }

    /**
     * 删除图片
     *
     * @param request
     * @param response
     * @param image_url  图片地址
     * @param uploadType 上传类型
     * @return
     * @author 王孝元
     */
    @RequestMapping("/deleteImageFile")
    @ResponseBody
    public String deleteImage(HttpServletRequest request, HttpServletResponse response, String image_url,
                              String uploadType) {
//		Map<String, Object> json = new HashMap<>();
		/*if (!AppUtil.isNotNull(image_url) || !AppUtil.isNotNull(uploadType)) {
			json.put("msg", Msg.MSG_PARAM_ERROR);
			return json;
		}
		// 远程删除图片
		boolean bool = false;
		try {
			bool = FtpUtil.getInstance(uploadType).delete(image_url);
			if (bool) {
				json.put("msg", "success");
			} else {
				json.put("msg", "图片删除失败");
			}
		} catch (Exception e) {
			e.printStackTrace();
			json.put("msg", "系统异常，请重试或联系管理员");
		}*/
        Msg<Object> msg = new Msg<>();
        try {
            OSSparameter.removeFile(image_url);
            msg.toString(200, "删除成功");
        } catch (Exception e) {
            return msg.toString(110, "删除失败");
        }
        return msg.toString();
    }
}
