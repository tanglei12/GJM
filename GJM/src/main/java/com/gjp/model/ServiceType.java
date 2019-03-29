package com.gjp.model;

import lombok.Data;

/**
 * 服务类型
 *
 * @author zoe
 */
@Data
public class ServiceType {

    // 服务类型编码
    private Integer st_id;
    // 服务类型名
    private String st_name;
    // 服务类型父级编号
    private Integer parent_id;
    // 服务基本信息编码
    private Integer sm_id;
    // 上传服务类型员工编号
    private Integer em_id;
    // 是否开放 0：不使用 1：使用
    private Integer st_bool;
    // 服务描述
    private String st_content;
    // 服务子项目图片
    private String st_image;
    private String st_imagePath;
    // 服务说明 BLOB类型，HTML格式
    private String st_explain;
    // 图标
    private String st_logo;
    private String st_logoPath;
    // 跳转界面
    private String redrict_path;
    // 金额
    private Double st_money;
    // 服务费加入
    private Integer st_moneyBool;
    // 默认图片
    private String default_icon;
    // 点击图片
    private String click_icon;
}
