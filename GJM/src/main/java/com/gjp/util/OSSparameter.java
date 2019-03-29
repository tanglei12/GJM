package com.gjp.util;

import com.aliyun.oss.HttpMethod;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.GeneratePresignedUrlRequest;
import com.aliyun.oss.model.GetObjectRequest;

import java.io.File;
import java.net.URL;
import java.util.Date;

/**
 * @author 陈智颖
 * @create 2017-11-14 12:00
 **/
public class OSSparameter {

    public static String endpoint = "http://image.cqgjp.com";
    private static String accessKeyId = "LTAIHS4FDuAIRbbf";
    private static String accessKeySecret = "fKNegjkh5LizBNiBzzmYI2o8vI6dgy";

    private static String bucketName = "cqguanjiapo";
    private static String yourKey = "";

    /***
     * 上传到oss文件
     * @param file 上传文件
     * @param yourKey 文件夹名称
     */
    public static void uploadFile(File file, String yourKey) {
        // 创建OSSClient实例
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        //文件名
        String fileName = file.getName();
        // 上传文件
        ossClient.putObject(bucketName, yourKey + "/" + fileName, file);
        // 关闭client
        ossClient.shutdown();
    }

    /***
     * 上传到oss文件
     * @param file 上传文件
     * @param yourKey 文件夹名称
     */
    public static void uploadFilePublic(File file, String yourKey) {
        // 创建OSSClient实例
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        //文件名
        String fileName = file.getName();
        // 上传文件
        ossClient.putObject(bucketName, yourKey + "/" + fileName, file);
        // 关闭client
        ossClient.shutdown();
    }

    /***
     * 下载oss文件到本地
     * @param savePath 保存路径
     * @param yourKey 下载图片路径
     */
    public static void downloadFile(String savePath, String yourKey) {
        // 创建OSSClient实例
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        // 上传文件
        ossClient.getObject(new GetObjectRequest(bucketName, yourKey), new File(savePath));
        // 关闭client
        ossClient.shutdown();
    }

    /***
     * 删除oss文件
     * @param path 删除路劲
     */
    public static void removeFile(String path) {
        // 创建OSSClient实例
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        // 上传文件
        ossClient.deleteObject(bucketName, path);
        // 关闭client
        ossClient.shutdown();
    }


    /**
     * 生成带签名的图片访问url
     *
     * @param path 访问图片路劲(oss路径比如:"contractImage/"+图片名称和后缀)
     */
    public static String imagePath(String path) {
        if (path == null) {
            return null;
        }
        if (path.equals("")) {
            return "";
        }
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        // 过期时间10分钟
        Date expiration = new Date(new Date().getTime() + 1000 * 60 * 10);
        URL signedUrl = ossClient.generatePresignedUrl(bucketName, path, expiration);
        ossClient.shutdown();
        return signedUrl.toString();
    }

    /**
     * 生成带签名的图片访问url
     *
     * @param path   访问图片路劲(oss路径比如:"contractImage/"+图片名称和后缀)
     * @param width  宽
     * @param height 长
     */
    public static String imagePath(String path, Integer width, Integer height) {
        if (path == null) {
            return null;
        }
        if (path.equals("")) {
            return "";
        }
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        // 图片处理样式
        String style = "";
        if (width != null && height != null) {
            style = "image/resize,m_fixed,w_" + width + ",h_" + height + "/rotate,0";
        }
        // 过期时间10分钟
        Date expiration = new Date(new Date().getTime() + 1000 * 60 * 10);
        GeneratePresignedUrlRequest req = new GeneratePresignedUrlRequest(bucketName, path, HttpMethod.GET);
        req.setExpiration(expiration);
        if (!style.equals("")) {
            req.setProcess(style);
        }

        URL signedUrl = ossClient.generatePresignedUrl(req);
        ossClient.shutdown();
        return signedUrl.toString();
    }

    public static void main(String[] args) {
        String s = imagePath("contractImage/FCZ20160227143155.png", null, null);
        /*File file = new File("/home/czy/qqImage.jpg");
        OSSparameter.uploadFile(file,"temp");*/
        System.out.println(s);
    }
}
