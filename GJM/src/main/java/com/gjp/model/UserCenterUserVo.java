package com.gjp.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 用户对象
 *
 * @author JiangQt
 * @createTime 2015年11月19日下午8:56:30
 */
@Data
public class UserCenterUserVo {

	private Integer user_id;//
	private String user_type;//
	private Integer user_lv;//
	private String user_account;//
	private String user_nickName;//
	private String user_phone;//
	private String user_password;//
	private String user_saltCode;//
	private String user_sex;//
	private String user_picPath;//
	private Date user_birthday;//
	private String user_marrState;//
	private String user_address;//
	private String user_email;//
	private Integer user_state;//
	private Integer user_loginState;//
	private Integer user_safeState;//
	private Integer user_pwdSafeLv;//
	private String user_realName;//
	private String user_cardNumber;//
	private Integer userExtend_id;//
	private Date user_lastEditTime;//
	private Date user_createTime;//
	private String type_name;
	private String contractObject_No;
	private String contractObject_Code;
	private BigDecimal ua_total_amount;
	private BigDecimal ua_balance_amount;
	private String contractObject_Type;
	private String house_address;

}
