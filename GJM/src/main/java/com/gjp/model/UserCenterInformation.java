package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 短信管理
 *
 * @author shenhx
 */
@Data
public class UserCenterInformation {

    // 主键ID
    private Integer ui_id;
    // 调用短信接口编号
    private Integer interface_code;
    // 短信模板编号
    private String msg_code;
    // 短信类型
    private Integer msg_type;
    // 短信内容
    private String msg_content;
    // 短信发送结果0-失败；1-成功
    private Integer send_result;
    // 房屋编码
    private String hi_code;
    // 合同编码
    private String contractObject_code;
    // 发送人 注意区分系统和管家发送
    private Integer em_id;
    // 发送时间
    private Date send_time;
    // 接收人类型1-客户；2-管家；3-其他
    private Integer receive_type;
    // 接收人-客户编码
    private String receive_cc_code;
    // 接收人-管家编号
    private Integer receive_em_id;

    /*** 扩展字段 ***/
    // 小区房号
    private String house_address;
    // 合同编号
    private String contractObject_No;
    // 客户名称
    private String cc_name;
    // 发送人姓名
    private String em_name;
    // 接受管家姓名
    private String receive_em_name;
    //管家电话
    private String em_phone;
    // 用户ID
    private Integer receive_user_id;
    // 部门ID
    private Integer receive_ucc_id;

}
