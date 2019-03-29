package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author 陈智颖
 * @version 创建时间：2015年7月26日 上午10:49:27
 */
@Data
public class User {

    //自增编号
    private Integer user_id;
    //用户类型 (regUser：注册用户,zkUser：租客用户,fdUser：房东用户)
    private String user_type;
    //用户等级
    private Integer user_lv;
    //用户账号
    private String user_account;
    //用户昵称
    private String user_nickName;
    //用户性别 (man：男，woman：女，secrecy：保密)
    private String user_sex;
    //用户联系方式
    private String user_phone;
    //用户密码
    private String user_password;
    //盐值
    private String user_saltCode;
    //用户头像
    private String user_picPath;
    //用户生日
    private Date user_birthday;
    // 生日字符
    private String user_birthdayStr;
    //用户地址
    private String user_address;
    //邮箱
    private String user_email;
    //用户状态
    private Integer user_state;
    //登录状态
    private Integer user_loginState;
    //安全状态
    private Integer user_safeState;
    //最后编辑时间
    private Date user_lastEditTime;
    //创建时间
    private Date user_createTime;
    // 验证码
    private String user_code;
    // 婚姻状况
    private String user_marrState;

    private Integer user_pwdSafeLv;

    private Integer userExtend_id;
    // 职业
    private String user_occupation;
    // 公司
    private String user_company;
    // 实名制code
    private String user_realNameCode;

    //自增编号
    private Integer id;
    //房屋编号
    private Integer hi_id;
    //合同编号
    private Integer contract_id;
    //关系状态
    private Integer state;
    //创建时间
    private Date createTime;
    //用户真实姓名(原来的)
    private String userVerify_cardUserName;
    //身份证号(原来的)
    private String userVerify_cardNumber;
    //用户真实姓名(修改的)
    private String user_realName;
    //身份证号(修改的)
    private String user_cardNumber;


}
