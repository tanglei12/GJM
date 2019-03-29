package com.gjp.csrf;

/**
 * @author 陈智颖
 * @create 2018-02-23 下午5:44
 **/
public class CodeConstant {
    public final static ResultCode CSRF_ERROR = new ResultCode(101, "CSRF ERROR:无效的token，或者token过期");
}
