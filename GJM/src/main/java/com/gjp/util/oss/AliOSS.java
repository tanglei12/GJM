package com.gjp.util.oss;

import com.aliyun.oss.HttpMethod;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.DeleteObjectsRequest;
import com.sun.istack.internal.NotNull;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.util.Date;
import java.util.List;

/**
 * @author JiangQt
 * @description
 * @date Created in 2017-11-14
 */
public class AliOSS {

    // 访问域名
    private static String endpoint = "http://image.cqgjp.com";
    // 端点
    private static String accessKeyId = "LTAIHS4FDuAIRbbf";
    // 端点
    private static String accessKeySecret = "fKNegjkh5LizBNiBzzmYI2o8vI6dgy";
    // 存储空间-cqguanjiapo
    public static String bucketName_cqguanjiapo = "cqguanjiapo";
    // 过期时间（1小时）
    private static long expiration_long = 60 * 60 * 1000;

    /**
     * 上传
     *
     * @param folder      文件夹
     * @param key         文件名
     * @param inputStream 文件流
     */
    public static String upload(String folder, String key, InputStream inputStream) {
        key = folder + key;
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        ossClient.putObject(bucketName_cqguanjiapo, key, inputStream);
        ossClient.shutdown();
        return key;
    }

    /**
     * 上传
     *
     * @param folder 文件夹
     * @param file   文件
     */
    public static String upload(String folder, File file) {
        String key = folder + file.getName();
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        ossClient.putObject(bucketName_cqguanjiapo, key, file);
        ossClient.shutdown();
        return key;
    }

    /**
     * 获取Url地址
     *
     * @param srcKey  来源文件Key
     * @param destKey 文件Key
     * @return
     */
    public static void copyFile(@NotNull String srcKey, @NotNull String destKey) {
        if (srcKey.equals(destKey)) {
            return;
        }
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        ossClient.copyObject(bucketName_cqguanjiapo, srcKey, bucketName_cqguanjiapo, destKey);
        ossClient.shutdown();
    }

    /**
     * 获取Url地址
     *
     * @param key 文件Key
     * @return
     */
    public static URL getUrl(String key) {
        Date expiration = new Date(new Date().getTime() + expiration_long);
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        URL url = ossClient.generatePresignedUrl(bucketName_cqguanjiapo, key, expiration);
        ossClient.shutdown();
        return url;
    }

    /**
     * 获取Url地址
     *
     * @param key        文件Key
     * @param expiration 过期时间（默认1小时）
     * @return
     */
    public static URL getUrl(String key, Date expiration) {
        if (expiration == null) {
            expiration = new Date(new Date().getTime() + expiration_long);
        }
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        URL url = ossClient.generatePresignedUrl(bucketName_cqguanjiapo, key, expiration);
        ossClient.shutdown();
        return url;
    }

    /**
     * 获取Url地址
     *
     * @param key        文件Key
     * @param expiration 过期时间（默认1小时）
     * @param method     模式（默认HttpMethod.PUT）
     *                   <p>
     *                   HttpMethod.PUT
     *                   HttpMethod.GET
     *                   </p>
     * @return
     */
    public static URL getUrl(String key, Date expiration, HttpMethod method) {
        if (expiration == null) {
            expiration = new Date(new Date().getTime() + expiration_long);
        }
        if (method == null) {
            method = HttpMethod.PUT;
        }
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        URL url = ossClient.generatePresignedUrl(bucketName_cqguanjiapo, key, expiration);
        ossClient.shutdown();
        return url;
    }

    /**
     * 删除文件
     *
     * @param key 文件
     */
    public static void delete(String key) {
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        ossClient.deleteObject(bucketName_cqguanjiapo, key);
        ossClient.shutdown();
    }

    /**
     * 删除多个文件
     *
     * @param keys 文件集
     */
    public static void delete(List<String> keys) {
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);
        ossClient.deleteObjects(new DeleteObjectsRequest(bucketName_cqguanjiapo).withKeys(keys));
        ossClient.shutdown();
    }
}
