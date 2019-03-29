package com.gjp.util.sms;

import java.net.URLEncoder;

/**
 * <p>
 * <date>2012-03-01</date><br/>
 * <span>软维提供的JAVA接口信息（短信，彩信）调用API</span><br/>
 * <span>----------查询上行信息/用户回复------------</span>
 * </p>
 *
 * @author LIP
 * @version 1.0.1
 */
public class SmsClientQueryCall {

    /**
     * <p>
     * <date>2012-03-01</date><br/>
     * <span>上行（用户回复）获取方法1--必须传入必填内容</span><br/>
     * <p>
     * 其一：发送方式，默认为POST<br/>
     * 其二：发送内容编码方式，默认为UTF-8
     * </p>
     * <br/>
     * </p>
     *
     * @param url      ：必填--发送连接地址URL--比如>http://118.145.30.35/callApi.aspx
     * @param userid   ：必填--用户ID，为数字
     * @param account  ：必填--用户帐号
     * @param password ：必填--用户密码
     * @return 返回状态报告
     */
    public static String queryStatusReport(String url, String userid, String account, String password) {

        try {
            String sendParam = "action=query" +
                    "&userid=" + userid +
                    "&account=" + URLEncoder.encode(account, "UTF-8") +
                    "&password=" + URLEncoder.encode(password, "UTF-8");
            return SmsClientAccessTool.getInstance().doAccessHTTPPost(url, sendParam, "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
            return "未发送，异常-->" + e.getMessage();
        }
    }
}
