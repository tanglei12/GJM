package com.gjp.util.sms;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.xml.sax.InputSource;

import java.io.IOException;
import java.io.StringReader;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * <p>
 * <date>2012-03-01</date><br/>
 * <span>软维提供的JAVA接口信息（短信，彩信）调用API</span><br/>
 * <span>----------发送短信-------------</span>
 * </p>
 *
 * @author LIP
 * @version 1.0.1
 */
public class SmsClientSend {

    /**
     * 发送信息方法1--必须传入必填内容
     * <br/>其一：发送方式，默认为POST
     * <br/>其二：发送内容编码方式，默认为UTF-8
     *
     * @param url      ：必填--发送连接地址URL--比如>http://118.145.30.35/sms.aspx
     * @param userid   ：必填--用户ID，为数字
     * @param account  ：必填--用户帐号
     * @param password ：必填--用户密码
     * @param mobile   ：必填--发送的手机号码，多个可以用逗号隔比如>13512345678,13612345678
     * @param content  ：必填--实际发送内容，
     * @return 返回发送信息之后返回字符串
     */
    public static String sendSms(String url, String userid, String account, String password, String mobile, String content) {
        return sendSms(url, userid, account, password, mobile, content, new HashMap<>());
    }

    /**
     * 发送信息方法--暂时私有化，这里仅仅是提供用户接口而已。其实用不了那么复杂
     * <br/>发送信息最终的组合形如：http://118.145.30.35/sms.aspx?action=send
     *
     * @param url      ：必填--发送连接地址URL--比如>http://118.145.30.35/sms.aspx
     * @param userid   ：必填--用户ID，为数字
     * @param account  ：必填--用户帐号
     * @param password ：必填--用户密码
     * @param mobile   ：必填--发送的手机号码，多个可以用逗号隔比如>13512345678,13612345678
     * @param content  ：必填--实际发送内容，
     * @return 返回发送之后收到的信息
     */
    private static String sendSms(String url, String userid, String account, String password, String mobile, String content, Map<String, Object> extendParams) {
        try {
            String codingType = "UTF-8";
            String send = "action=send" +
                    "&userid=" + userid +
                    "&account=" + URLEncoder.encode(account, codingType) +
                    "&password=" + URLEncoder.encode(password, codingType) +
                    "&mobile=" + mobile +
                    "&content=" + URLEncoder.encode(content, codingType);
            if (extendParams != null && !extendParams.isEmpty()) {
                System.out.println();
                // send.append("&sendTime=").append(URLEncoder.encode(sendTime, codingType));
                // send.append("&extno=").append(extno);
                // send.append("&checkContent=").append(checkContent);
                // send.append("&taskName=").append(URLEncoder.encode(taskName, codingType));
                // send.append("&countNumber=").append(countNumber);
                // send.append("&mobileNumber=").append(mobileNumber);
                // send.append("&telephoneNumber=").append(telephoneNumber);
            }
            return xmlElements(SmsClientAccessTool.getInstance().doAccessHTTPPost(url, send, "UTF-8"));
        } catch (Exception e) {
            e.printStackTrace();
            return "未发送，编码异常";
        }
    }

    /**
     * 解析XML
     *
     * @param xmlDoc 文件路径
     */
    public static String xmlElements(String xmlDoc) {
        // 创建一个新的字符串
        StringReader read = new StringReader(xmlDoc);
        // 创建新的输入源SAX 解析器将使用 InputSource 对象来确定如何读取 XML 输入
        InputSource source = new InputSource(read);
        // 创建一个新的SAXBuilder
        SAXBuilder sb = new SAXBuilder();
        try {
            // 通过输入源构造一个Document
            Document doc = sb.build(source);
            // 取的根元素
            Element root = doc.getRootElement();
            // System.out.println(root.getName());//输出根元素的名称（测试）
            // 得到根元素所有子元素的集合
            List jiedian = root.getChildren();
            // 获得XML中的命名空间（XML中未定义可不写）
            // Namespace ns = root.getNamespace();
            Element et;
            for (Object aJiedian: jiedian) {
                et = (Element) aJiedian;// 循环依次得到子元素
                if (Objects.equals(et.getName(), "message")) {
                    return et.getText();
                }
            }
        } catch (JDOMException | IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
