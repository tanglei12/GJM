package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author 陈智颖
 * @create 2017-08-03 5:58 PM
 **/
@Data
public class HouseImage {

    // 房屋code
    private String hi_code;
    // 房屋图片
    private String hm_path;
    // 文件夹编码
    private Integer hif_id;
    // 创建时间
    private Date hm_createTime;

    // 房屋编码
    private Integer hi_id;

}
