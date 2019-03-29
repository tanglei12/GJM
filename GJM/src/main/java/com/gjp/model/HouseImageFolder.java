package com.gjp.model;

import lombok.Data;

import java.util.Date;

@Data
public class HouseImageFolder {

    // 图片文件夹id
    private Integer hif_id;
    // 文件夹id
    private Integer hif_name;
    // 房屋编码
    private String hi_code;
    // 房屋编码
    private String hif_desc;
    // 父级文件夹id
    private Integer hif_order;
    // 父级文件夹id
    private Integer hif_parentId;
    // 最高层文件夹id
    private Integer hif_subId;
    // 文件夹创建时间
    private Date hif_createTime;

}
