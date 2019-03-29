package com.gjp.service;

import com.gjp.dao.HouseHouseImageDAO;
import com.gjp.dao.HouseImageTypeDAO;
import com.gjp.dao.HouseIntentionDao;
import com.gjp.dao.HouseLibraryDao;
import com.gjp.model.*;
import com.gjp.util.*;
import com.gjp.util.oss.AliOSS;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.net.URL;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * 上传图片service
 *
 * @author zoe
 */
@Service
public class HouseImageService {

    private @Resource
    HouseHouseImageDAO houseImageDao;
    private @Resource
    HouseImageTypeDAO houseImageTypeDAO;
    private @Resource
    HouseLibraryDao housingLibraryDao;
    private @Resource
    HouseIntentionDao houseIntentionDao;
    // 房源库service
    private @Resource
    HouseLibraryService houseLibraryService;

    /**
     * 保存图片路径
     *
     * @param houseHouseImage
     * @return
     */
    public boolean addHouseImage(HouseImageVo houseHouseImage) {
        return houseImageDao.addHouseImage(houseHouseImage) > 0;
    }

    /**
     * 根据图片路径查询意向图片编码
     *
     * @param hm_path
     * @return
     */
    public int selectHouseIntentionImageId(String hm_path) {
        return houseImageDao.selectHouseIntentionImageId(hm_path);
    }

    /**
     * 添加意向房源图片进GJP_House_Intention_Image表
     *
     * @param houseIntentionImage
     * @return
     */
    public int addHouseIntentionImage(HouseIntentionImage houseIntentionImage) {
        return houseImageDao.addHouseIntentionImage(houseIntentionImage);
    }

    /**
     * 根据编号删除图片
     *
     * @return
     */
    public int deleteIntentionImage(int him_id) {
        return houseImageDao.deleteIntentionImage(him_id);
    }

    /**
     * 根据意向房源编号查询意向房源图片
     *
     * @return
     */
    public HouseIntentionImage selectImageById(int phi_id) {
        return houseImageDao.selectImageById(phi_id);
    }

    /**
     * 根据编号删除图片 GJP_House_Image表
     *
     * @return
     */
    public int deleteImage(int hm_id) {
        return houseImageDao.deleteImage(hm_id);
    }

    /**
     * 更新房源图片
     *
     * @param hi_code
     * @param image_path
     * @return
     * @throws Exception
     * @作者 JiangQT
     * @日期 2017年2月21日
     */
    public Msg<Object> updateHouseImage(String hi_code, String image_path) throws Exception {
        Msg<Object> msg = new Msg<>();
        UserCenterEmployee employee = AppUtil.getCookieEmployee();
        if (employee == null) {
            throw new AppException(Msg.MSG_LOGIN_ERROR);
        }
        // 添加图片
        HouseImageVo houseHouseImage = new HouseImageVo();
        houseHouseImage.setHi_code(hi_code);
        houseHouseImage.setHm_path(image_path);
        houseHouseImage.setHm_createTime(new Date());
        houseHouseImage.setHm_state(0);
        houseImageDao.addHouseImage(houseHouseImage);
        msg.setData(houseHouseImage);
        return msg;
    }

    /**
     * 删除房源图片
     *
     * @param hm_id
     * @return
     * @作者 JiangQT
     * @日期 2017年2月21日
     */
    public Msg<Object> deleteHouseImage(Integer hm_id) throws Exception {
        Msg<Object> msg = new Msg<>();
        // 添加图片
        HouseImageVo houseHouseImage = new HouseImageVo();
        houseHouseImage.setHm_id(hm_id);
        houseHouseImage.setHm_state(-1);
        houseImageDao.updateHouseImage(houseHouseImage);
        return msg;
    }

    /**
     * 添加存房图片信息
     *
     * @param hi_id
     * @param type
     * @param image
     * @return
     * @author JiangQT
     */
    public Integer addHouseImageService(Integer hi_id, String type, String image, String imageType) {
        int i = 0;
        if (StringUtils.isEmpty(type) || "library".equals(type)) {
            ViewHouseLibraryInfoVo houseLibraryInfoVo = new ViewHouseLibraryInfoVo();
            houseLibraryInfoVo.setHi_id(hi_id);
            houseLibraryInfoVo = housingLibraryDao.queryHouseLibraryInfo(houseLibraryInfoVo);

            // 添加图片
            HouseImageVo houseHouseImage = new HouseImageVo();
            houseHouseImage.setHm_type(imageType);
            houseHouseImage.setHm_path(image);
            houseHouseImage.setHm_createTime(new Date());
            if (houseLibraryInfoVo != null) {
                houseHouseImage.setHi_code(houseLibraryInfoVo.getHi_code());
            }
            houseHouseImage.setHm_state(0);
            houseImageDao.addHouseImage(houseHouseImage);

            // 添加图片类型
            HouseHouseImageType houseHouseImageType = new HouseHouseImageType();
            houseHouseImageType.setHit_type(imageType);
            houseHouseImageType.setHm_id(houseHouseImage.getHm_id());
            houseHouseImageType.setHi_id(hi_id);
            houseImageTypeDAO.addHouseImageType(houseHouseImageType);

            i = houseHouseImage.getHm_id();
        } else if ("intent".equals(type)) {
            HouseIntention houseIntention = new HouseIntention();
            houseIntention.setPhi_id(hi_id);
            houseIntention = houseIntentionDao.queryHouseIntentionWhere(houseIntention);

            HouseIntentionImage houseIntentionImage = new HouseIntentionImage();
            houseIntentionImage.setHim_path(image);
            houseIntentionImage.setHim_type(imageType);
            houseIntentionImage.setHim_time(new Date());
            if (houseIntention != null) {
                houseIntentionImage.setHi_code(houseIntention.getHi_code());
            }
            houseImageDao.addHouseIntentionImage(houseIntentionImage);

            HouseIntentionImageType houseIntentionImageType = new HouseIntentionImageType();
            houseIntentionImageType.setHi_id(hi_id);
            houseIntentionImageType.setHint_type(imageType);
            houseIntentionImageType.setHim_id(houseIntentionImage.getHim_id());
            houseIntentionImageType.setPhi_id(hi_id);
            houseIntentionImageType.setHint_str("意向");
            houseImageTypeDAO.addHouseIntentionImageType(houseIntentionImageType);

            i = houseIntentionImage.getHim_id();
        }
        return i;
    }

    /***
     * 更新房屋图片
     *
     * @作者 JiangQT
     * @日期 2016年6月3日
     * @param houseImage
     * @return
     */
    public boolean updateHouseImage(HouseImageVo houseImage) {
        return houseImageDao.updateHouseImage(houseImage) > 0;
    }

    /**
     * 查询房屋照片
     *
     * @param houseHouseImage
     * @return
     * @author 王孝元
     */
    public List<HouseImageVo> queryHouseImageList(HouseImageVo houseHouseImage) {
        List<HouseImageVo> houseImageVos = houseImageDao.queryHouseImageList(houseHouseImage);
        for (HouseImageVo houseImageVo : houseImageVos) {
            houseImageVo.setHm_path_real(AliOSS.getUrl(houseImageVo.getHm_path()).toString());
        }
        return houseImageVos;
    }

    /**
     * 查询房屋照片
     *
     * @param houseHouseImage
     * @return
     * @author shenhx
     */
    public List<HouseImageVo> queryImgListByHiCodeAndHifName(HouseImageVo houseHouseImage) {
        List<HouseImageVo> houseImageVos = houseImageDao.queryImgListByHiCodeAndHifName(houseHouseImage);
        for (HouseImageVo houseImageVo : houseImageVos) {
            houseImageVo.setHm_path_real(AliOSS.getUrl(houseImageVo.getHm_path()).toString());
        }
        return houseImageVos;
    }

    public HouseImageVo queryHouseImage(HouseImageVo houseImageVo) {
        return houseImageDao.queryHouseImage(houseImageVo);
    }

    public HouseImageVo queryHouseImage(Integer hm_id) {
        HouseImageVo houseImageVo = new HouseImageVo();
        houseImageVo.setHm_id(hm_id);
        return houseImageDao.queryHouseImage(houseImageVo);
    }

    /**
     * 查询房源图片列表文件夹
     *
     * @param houseImageVo
     * @return
     */
    public List<HouseImageVo> queryHouseImageListByFolder(HouseImageVo houseImageVo) {
        return houseImageDao.queryHouseImageListByFolder(houseImageVo);
    }

    /**
     * 查询文件夹图片
     *
     * @author tanglei
     * date 2017年7月4日 下午18:25:40
     */
    public List<HouseImageVo> selectFoldsImgs(HouseImageVo houseImageVo) {
        return houseImageDao.selectFoldsImgs(houseImageVo);
    }

    /**
     * 获取相册封面信息
     *
     * @author tanglei
     * date 2017年7月5日 下午15:03:40
     */
    public List<HouseImageVo> selectHouseImageVo(HouseImageVo houseImageVo) {
        return houseImageDao.selectHouseImageVo(houseImageVo);
    }

    /**
     * 图片上传
     *
     * @param employee   用户信息
     * @param hi_code    房屋编码
     * @param image_path 图片地址
     * @param folderName 文件夹编号
     * @throws Exception
     */
    public void updateHouseImageBo(UserCenterEmployee employee, String hi_code, String image_path, Integer folderName, String hm_code) throws Exception {
        if (StringUtils.isEmpty(folderName)) {
            this.updateHouseImage(hi_code, image_path);
        } else {
            HouseImageFolder houseImageFolder = new HouseImageFolder();
            houseImageFolder.setHif_name(folderName);
            houseImageFolder.setHi_code(hi_code);
            HouseImageFolder folder = houseLibraryService.selectHouseImageFolder(houseImageFolder);
            HouseImageFolder selectHouseImageFolder = new HouseImageFolder();
            if (StringUtils.isEmpty(folder) && folder == null) {// 文件夹不存在
                int secceed = houseLibraryService.addHouseImageFolder(houseImageFolder);// 创建文件夹
                if (secceed > 0) {
                    selectHouseImageFolder = houseLibraryService.selectHouseImageFolder(houseImageFolder);// 查询文件夹信息
                }
            } else {
                selectHouseImageFolder = houseLibraryService.selectHouseImageFolder(houseImageFolder);// 查询文件夹信息
            }
            HouseImageVo image = new HouseImageVo();
            image.setHi_code(hi_code);
            image.setHm_path(image_path);
            image.setHm_code(hm_code);
            image.setHm_state(1);
            image.setHm_creator(employee.getEm_id());
            image.setHif_id(selectHouseImageFolder.getHif_id());
            image.setHm_createTime(new Date());
            this.addHouseImage(image);
        }
    }

    /**
     * 房屋图片上传到服务器和数据库
     * @author tanglei
     */
    public Msg<Object> houseUploadFile(MultipartHttpServletRequest request,HttpServletRequest req,UserCenterEmployee employee, String type,String hi_code,Integer folderName) {
        Msg<Object> msg = new Msg<>();
        Properties propertiesOSS = PropertiesUtil.getProperties("/conf/oss.properties");
//        type = "temp";
        type = StringUtils.isEmpty(type) ? "temp" : type;
        Map<String, MultipartFile> fileMap = request.getFileMap();
        for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
            MultipartFile file = entity.getValue();
            try {
                String suffix = "png";
                if (file.getOriginalFilename().contains(".")) {
                    suffix = file.getOriginalFilename().split("\\.")[1];
                }
                String key = type + System.currentTimeMillis() + "." + suffix;
//                key = AliOSS.upload(propertiesOSS.getProperty("folder.temp"), key, file.getInputStream());
                key = AliOSS.upload(propertiesOSS.getProperty("folder.houseImage"), key, file.getInputStream());
                String path= request.getSession().getServletContext().getRealPath("/") + "resources/image/upload/"+file.getOriginalFilename();
                // 转存文件
                File fileNew = new File(path);
                file.transferTo(fileNew);
                String imageS = SimilarImageSearch.produceFingerPrint(path,null);
                if(fileNew.exists()){
                    fileNew.delete();
                }
                URL url = AliOSS.getUrl(key);
                updateHouseImageBo(employee,hi_code,key,folderName,imageS);
                msg.toString();
            } catch (Exception e) {
                msg.setMsg(400, e.getMessage());
            }
        }
        return msg;
    }

    public void updateImageAlisync(String hi_code){
        HouseImageVo houseImageVo = new HouseImageVo();
        houseImageVo.setHi_code(hi_code);
        houseImageDao.updateImageAlisync(houseImageVo);

        RentHouseFileVo rentHouseFileVo = new RentHouseFileVo();
        rentHouseFileVo.setHi_code(hi_code);
        rentHouseFileVo.setFile_type("1");
        houseImageDao.deleteRentFileByCode(rentHouseFileVo);
    }
}
