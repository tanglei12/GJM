package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 支付宝预约看房
 * @author shenhx
 * @create 2018-01-18 16:34
 **/
@Data
public class RentLookAtHouseVo {

    // 主键
    private Integer ahId;
    // 支付宝用户Id
    private String aliUserId;
    // 芝麻授权Id
    private String zhimaOpenId;
    // 房源编号
    private String roomCode;
    // 公寓类型 1:分散式  2:集中式
    private Integer flatsTag;
    // 看房时间格式yyyy-MM-dd HH:mm
    private String lookTime;
    // 看房人姓名
    private String bookName;
    // 看房人手机号码
    private String bookPhone;
    // 性别 0未知 1:男 2:女
    private Integer bookSex;
    // 描述
    private String remark;
    // 创建时间
    private Date createTime;
    // 带看结果 0-未处理；1-带看中；2-带看成功；3-带看失败
    private Integer bookResult;
    // 带看人
    private Integer takeEmId;


    /******* 扩展 ******/
    // ERP房源code
    private String hi_code;
    // 最新管家编号
    private Integer hpr_newEmp;
    // 小区房号
    private String house_address;
    // 管家名称
    private String em_name;
    // 管家电话
    private String em_phone;

}
