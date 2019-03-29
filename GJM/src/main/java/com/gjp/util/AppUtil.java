package com.gjp.util;

import com.alibaba.fastjson.JSONObject;
import com.gjp.model.ContractBillVo;
import com.gjp.model.ContractMd5;
import com.gjp.model.UserCenterEmployee;
import com.gjp.model.UserMessageContent;
import com.gjp.util.upload.URLUploadImage;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
import javapns.communication.exceptions.CommunicationException;
import javapns.communication.exceptions.KeystoreException;
import javapns.devices.Device;
import javapns.devices.exceptions.InvalidDeviceTokenFormatException;
import javapns.devices.implementations.basic.BasicDevice;
import javapns.notification.AppleNotificationServerBasicImpl;
import javapns.notification.PushNotificationManager;
import javapns.notification.PushNotificationPayload;
import javapns.notification.PushedNotification;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.InputSource;

import javax.imageio.ImageIO;
import javax.imageio.ImageReadParam;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.security.MessageDigest;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 程序工具类
 *
 * @author JiangQt
 * @createTime 2015年6月27日下午6:18:22
 */
public class AppUtil {

    public static SimpleDateFormat sdf_time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public static SimpleDateFormat sdf_time_str = new SimpleDateFormat("yyyyMMddHHmmss");
    public static SimpleDateFormat sdf_time_stamp = new SimpleDateFormat("yyyyMMddHHmmssS");
    public static SimpleDateFormat sdf_date = new SimpleDateFormat("yyyy-MM-dd");
    public static SimpleDateFormat sdf_month_day = new SimpleDateFormat("MM-dd");
    public static SimpleDateFormat sdf_day = new SimpleDateFormat("dd");

    public static HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }

    public static HttpServletResponse getResponse() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
    }

    /**
     * 添加时间周期
     *
     * @param currdate 当前时间
     * @param field    周期 {@link Calendar}
     * @param amount   数量
     * @return
     * @author JiangQT
     */
    public static Date addDate(Date currdate, int field, int amount) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(currdate);
        cal.add(field, amount);
        return cal.getTime();
    }

    /**
     * MD5加密
     *
     * @param s 需要加密的字符串
     * @return
     * @author JiangQT
     */
    public static String MD5(String s) {
        char hexDigits[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
        try {
            byte[] btInput = s.getBytes();
            // 获得MD5摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            mdInst.update(btInput);
            // 获得密文
            byte[] md = mdInst.digest();
            // 把密文转换成十六进制的字符串形式
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (byte byte0: md) {
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 获取UUID
     *
     * @return
     * @author JiangQT
     */
    public static String getUUID() {
        UUID uuid = UUID.randomUUID();
        String[] split = uuid.toString().split("-");
        StringBuilder newUUID = new StringBuilder();
        for (String aSplit: split) {
            newUUID.append(aSplit);
        }
        return newUUID.toString();
    }

    /**
     * 获取URL
     * <p>
     * 例如：lastUrl="/page/binding.html"
     *
     * @param lastUrl
     * @return
     * @author JiangQT
     */
    public static String getFullUrl(HttpServletRequest request, String lastUrl) {
        StringBuilder sb = new StringBuilder();
        sb.append(request.getScheme()).append("://");
        sb.append(request.getServerName()).append(":");
        sb.append(request.getServerPort());
        sb.append(request.getContextPath());
        if (!"".equals(lastUrl)) {
            sb.append(lastUrl);
        }
        return sb.toString();
    }

    /**
     * 获取URL
     *
     * @param request
     * @return
     * @author JiangQT
     */
    public static String getFullUrl(HttpServletRequest request) {
        StringBuffer url = request.getRequestURL();
        if (!StringUtils.isEmpty(request.getQueryString())) {
            url.append("?");
            url.append(request.getQueryString());
        }
        return url.toString();
    }

    /**
     * 获取项目URL
     *
     * @return
     * @author JiangQT
     */
    public static String getAppUrl() {
        HttpServletRequest request = getRequest();
        String method = request.getMethod();
        String path = request.getRequestURL().toString();
        StringBuilder params = null;
        switch (method) {
            case "GET":
                params = new StringBuilder(request.getQueryString() == null ? "" : "?" + request.getQueryString());
                break;
            case "POST":
                Map map = request.getParameterMap();
                for (Object key: map.keySet()) {
                    String[] values = (String[]) map.get(key);
                    if (params == null) {
                        params = new StringBuilder(key + "=" + values[0]);
                    } else {
                        params.append("&").append(key).append("=").append(values[0]);
                    }
                }
                params = new StringBuilder(params == null ? "" : "?" + params);
                break;
        }
        return "[" + method + "]" + path + Objects.requireNonNull(params).toString();
    }

    /**
     * 验证是否是字母开头
     *
     * @param str
     * @return
     * @author JiangQT
     */
    public static boolean isAZhead(String str) {
        Pattern pattern = Pattern.compile("^[a-zA-Z][a-zA-Z0-9]*$");
        Matcher matcher = pattern.matcher(str);
        return matcher.matches();
    }

    /**
     * 验证特殊字符
     *
     * @param str
     * @return
     * @author JiangQT
     */
    public static boolean isSpecialChar(String str) {
        Pattern pattern = Pattern.compile("^[^`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“。，、？]*$");
        Matcher matcher = pattern.matcher(str);
        return !matcher.matches();
    }

    /**
     * 验证真实姓名
     *
     * @return
     * @author JiangQT
     */
    public static boolean isCardName(String name) {
        Pattern pattern = Pattern.compile("^[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}$");
        Matcher matcher = pattern.matcher(name);
        return matcher.matches();
    }

    /**
     * 验证手机号码
     *
     * @param mobiles
     * @return
     * @author JiangQT
     */
    public static boolean isMobileNO(String mobiles) {
        Pattern pattern = Pattern.compile("^[1][3578][0-9]{9}$");
        Matcher matcher = pattern.matcher(mobiles);
        return matcher.matches();
    }

    /**
     * 验证邮箱
     *
     * @param email
     * @return
     * @author JiangQT
     */
    public static boolean isEmail(String email) {
        Pattern pattern = Pattern.compile("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    /**
     * 验证日期
     *
     * @param date
     * @return
     * @author JiangQT
     */
    public static boolean isDate(String date) {
        Pattern pattern = Pattern.compile("^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\\s(((0?[0-9])|([1-2][0-3]))\\:([0-5]?[0-9])((\\s)|(\\:([0-5]?[0-9])))))?$");
        Matcher matcher = pattern.matcher(date);
        return matcher.matches();
    }

    /**
     * 验证纯数字
     *
     * @param str
     * @return
     * @author JiangQT
     */
    public static boolean isNaN(String str) {
        return !StringUtils.isEmpty(str) && str.matches("^\\d+$");
    }

    /**
     * 验证纯字母
     *
     * @param str
     * @return
     * @author JiangQT
     */
    public static boolean isAz(String str) {
        return !StringUtils.isEmpty(str) && str.matches("[a-zA-Z]+$");
    }

    /**
     * 验证字母数字
     *
     * @param str
     * @return
     * @author JiangQT
     */
    public static boolean isAzNaN(String str) {
        return !StringUtils.isEmpty(str) && str.matches("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$");
    }

    /**
     * 验证身份证
     *
     * @param cardid
     * @return
     * @author JiangQT
     */
    public static boolean isCardId2(String cardid) {
        Pattern patternSfzhm1 = Pattern.compile("^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{4}$");
        Pattern patternSfzhm2 = Pattern.compile("^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$");
        Matcher matcherSfzhm1 = patternSfzhm1.matcher(cardid);
        Matcher matcherSfzhm2 = patternSfzhm2.matcher(cardid);
        return !(!matcherSfzhm1.find() && !matcherSfzhm2.find());
    }

    public static boolean isCardId(String idCard) {
        Pattern regIdCard = Pattern.compile("^(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$)|(^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])((\\d{4})|\\d{3}[Xx])$)$");
        // 如果通过该验证，说明身份证格式正确，但准确性还需计算
        if (regIdCard.matcher(idCard).find()) {
            if (idCard.length() == 18) {
                int[] idCardWi = {7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2};
                // 将前17位加权因子保存在数组里
                int[] idCardY = {1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2};
                // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
                int idCardWiSum = 0;
                // 用来保存前17位各自乖以加权因子后的总和
                for (int i = 0; i < 17; i++) {
                    idCardWiSum += Integer.valueOf(idCard.substring(i, i + 1)) * idCardWi[i];
                }
                int idCardMod = idCardWiSum % 11;
                // 计算出校验码所在数组的位置
                String idCardLast = idCard.substring(17);
                // 得到最后一位身份证号码
                // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if (idCardMod == 2) {
                    return (Objects.equals(idCardLast, "X") || Objects.equals(idCardLast, "x"));
                } else {
                    // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                    return (Integer.valueOf(idCardLast) == idCardY[idCardMod]);
                }
            }
        } else {
            return false;
        }
        return false;
    }

    /**
     * 验证身份证
     *
     * @return
     * @author JiangQT
     */
    public static int getCardIDSex(String cardID) {
        if (StringUtils.isEmpty(cardID)) {
            return 2;
        }
        if (cardID.length() != 18) {
            return 2;
        }
        int sexNumber;
        try {
            sexNumber = Integer.valueOf(cardID.substring(cardID.length() - 2, cardID.length() - 1));
        } catch (Exception e) {
            e.printStackTrace();
            return 2;
        }
        return sexNumber % 2;
    }

    /**
     * 验证IP
     *
     * @return
     * @author JiangQT
     */
    public static boolean isIp(String addr) {
        if (addr.length() < 7 || addr.length() > 15 || "".equals(addr)) {
            return false;
        }
        // 判断IP格式和范围
        String rexp = "([1-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3}";
        Pattern pat = Pattern.compile(rexp);
        Matcher mat = pat.matcher(addr);
        return mat.find();
    }

    /**
     * 加密字符串
     * <p>
     * 例：151xxxxxxx <br>
     * 截取为：151****xxxx
     *
     * @param str 需要加密的字符串(邮箱、手机、身份证、ip)
     * @return
     * @author JiangQT
     */
    public static String encryStr(String str) {
        if (StringUtils.isEmpty(str)) {
            return null;
        }
        int len = str.length();
        if (isMobileNO(str)) {
            String substring1 = str.substring(0, 3);
            String substring2 = str.substring(len - 4, len);
            return (substring1 + "****" + substring2);
        }
        if (isEmail(str)) {
            String substring1 = str.substring(0, 2);
            String substring2 = str.substring(str.indexOf("@") - 1, len);
            return (substring1 + "****" + substring2);
        }
        if (isCardId(str)) {
            String substring1 = str.substring(0, 4);
            String substring2 = str.substring(len - 3, len);
            return (substring1 + "******" + substring2);
        }
        if (isIp(str)) {
            String[] ipArr = str.split("\\.");
            return ipArr[0] + "." + ipArr[1] + ".*.*";
        }
        return str;
    }

    /**
     * 生成随机字符串验证码
     *
     * @param charCount 字符串长度
     * @return
     * @author JiangQT
     */
    public static String getRandStr(int charCount) {
        StringBuilder charValue = new StringBuilder();
        for (int i = 0; i < charCount; i++) {
            charValue.append(String.valueOf((char) (randomInt(0, 26) + 'a')));
        }
        return charValue.toString();
    }

    /**
     * 生成随机数字验证码
     *
     * @param charCount 字符串长度
     * @return
     * @author JiangQT
     */
    public static String getRandNum(int charCount) {
        StringBuilder charValue = new StringBuilder();
        for (int i = 0; i < charCount; i++) {
            charValue.append((char) (randomInt(0, 10) + '0'));
        }
        return charValue.toString();
    }

    /**
     * 生成随机码
     *
     * @param from
     * @param to
     * @return
     * @author JiangQT
     */
    public static int randomInt(int from, int to) {
        Random r = new Random();
        return from + r.nextInt(to - from);
    }

    /**
     * 解析XML获取短信发送状态
     *
     * @param xmlDoc 需要解析的字符串
     * @return
     * @author JiangQT
     */
    public static String xmlElements(String xmlDoc) {
        // 创建一个新的字符串
        StringReader read = new StringReader(xmlDoc);
        // 创建新的输入源SAX 解析器将使用 InputSource 对象来确定如何读取 XML 输入
        InputSource source = new InputSource(read);
        // 创建一个新的SAXBuilder
        SAXBuilder sb = new SAXBuilder();
        String status = null;
        try {
            // 通过输入源构造一个Document
            Document doc = sb.build(source);
            // 取的根元素
            Element root = doc.getRootElement();
            // 得到根元素所有子元素的集合
            List<Element> jiedian = root.getChildren();
            for (Element aJiedian: jiedian) {
                status = aJiedian.getText();
            }
        } catch (JDOMException | IOException e) {
            e.printStackTrace();
        }
        return status;
    }

    /**
     * 获取IP
     *
     * @return
     * @author JiangQT
     */
    public static String getIP() {
        HttpServletRequest request = getRequest();
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    /**
     * 设置当前cookie
     *
     * @param name  cookie名称
     * @param value cookie值
     * @author JiangQT
     */
    public static void setCurrentCookie(String name, String value, int time) {
        Cookie cookie = new Cookie(name, value);
        cookie.setMaxAge(time);
        cookie.setPath("/");
        getResponse().addCookie(cookie);
    }

    /**
     * 设置cookie
     *
     * @param name  cookie名称
     * @param value cookie值
     * @author JiangQT
     */
    public static void setCurrentCookie(String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        getResponse().addCookie(cookie);
    }

    /**
     * 设置cookie
     *
     * @param name  cookie名称
     * @param value cookie值
     * @author JiangQT
     */
    public static void setCookie(String name, String value, int time) {
        Cookie cookie = new Cookie(name, value);
        cookie.setMaxAge(time);
        cookie.setDomain("cqgjp.com");
        cookie.setPath("/");
        getResponse().addCookie(cookie);
    }

    /**
     * 设置cookie
     *
     * @param name  cookie名称
     * @param value cookie值
     * @author JiangQT
     */
    public static void setCookie(String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setDomain("cqgjp.com");
        cookie.setPath("/");
        getResponse().addCookie(cookie);
    }

    /**
     * 删除cookie
     *
     * @author JiangQT
     */
    public static void deleteCookie() {
        Cookie[] cookies = getRequest().getCookies();
        if (cookies != null) {
            for (Cookie cookie: cookies) {
                cookie.setMaxAge(0);
                cookie.setPath("/");
                getResponse().addCookie(cookie);
            }
        }
    }

    /**
     * 删除cookie
     *
     * @param name cookie名称
     * @author JiangQT
     */
    public static void deleteCookie(String name) {
        Cookie[] cookies = getRequest().getCookies();
        if (cookies != null) {
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals(name)) {
                    cookie.setMaxAge(0);
                    cookie.setPath("/");
                    getResponse().addCookie(cookie);
                }
            }
        }
    }

    /**
     * 获取用户信息COOKIE
     *
     * @return
     * @author JiangQT
     */
    public static UserCenterEmployee getCookieEmployee() {
        Cookie[] cookies = getRequest().getCookies();
        if (cookies == null) {
            return null;
        }
        UserCenterEmployee employee = null;
        JSONObject json = new JSONObject();
        for (Cookie cookie: cookies) {
            try {
                String cookie_value = URLDecoder.decode(cookie.getValue(), "UTF-8");
                if (!StringUtils.isEmpty(cookie_value)) {
                    switch (cookie.getName()) {
                        case AppConfig.COOKIE_USER_ID:
                            json.put("em_id", cookie_value);
                            break;
                        case AppConfig.COOKIE_USER_NAME:
                            json.put("em_name", cookie_value);
                            break;
                        case AppConfig.COOKIE_USER_PHONE:
                            json.put("em_phone", cookie_value);
                            break;
                        case AppConfig.COOKIE_USER_ACCOUNT:
                            json.put("em_account", cookie_value);
                            break;
                    }
                }
            } catch (Exception e) {
                System.out.println("解析COOKIE出错");
            }
        }
        if (!json.isEmpty()) {
            employee = json.toJavaObject(UserCenterEmployee.class);
        }
        return employee;
    }

    /**
     * 根据条件获取用户信息COOKIE
     *
     * @param name
     * @return
     * @author 陈智颖
     */
    public static String getCookieEmployee(String name) {
        Cookie[] cookies = getRequest().getCookies();
        if (cookies == null) return null;
        for (Cookie cookie: cookies) {
            if (cookie.getName().equals(name)) {
                return cookie.getValue();
            }
        }
        return null;
    }

    /**
     * 获取cookie
     *
     * @param name 名称
     * @return
     * @author JiangQT
     */
    public static String getCookie(String name) {
        Cookie[] cookies = getRequest().getCookies();
        if (cookies != null) {
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals(name)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    /**
     * 获取session
     *
     * @param name session名称
     * @return
     * @author JiangQT
     */
    public static String getSession(String name) {
        return (String) getRequest().getSession().getAttribute(name);
    }

    /**
     * 获取session对象
     *
     * @param name
     * @return
     * @author JiangQT
     */
    public static Object getSessionObject(String name) {
        return getRequest().getSession().getAttribute(name);
    }

    /**
     * 删除session
     *
     * @param name
     * @author JiangQT
     */
    public static void removeSession(String name) {
        getRequest().getSession().removeAttribute(name);
    }

    /**
     * 设置session
     *
     * @param name  名称
     * @param value 值
     * @author JiangQT
     */
    public static void setSession(String name, Object value) {
        getRequest().getSession().setAttribute(name, value);
    }

    /**
     * 设置session
     *
     * @param name     session名称
     * @param value    session值
     * @param interval session过期时间
     * @author JiangQT
     */
    public static void setSession(String name, Object value, int interval) {
        HttpSession session = getRequest().getSession();
        session.setAttribute(name, value);
        session.setMaxInactiveInterval(interval);
    }

    /**
     * 获取合同账单期数
     *
     * @param financeBillList 合同账单列表
     * @param con_end_date    合同截至日期
     * @return
     */
    public static List<ContractBillVo> getContractBillCycleDateAll(List<ContractBillVo> financeBillList, Date con_end_date) {
        if (financeBillList == null || financeBillList.isEmpty() || con_end_date == null) {
            return financeBillList;
        }

        // 账单期数排序
        financeBillList.sort(Comparator.comparing(ContractBillVo::getBcb_cycle));
        // 截至日期
        Date repayment_end_date = con_end_date;
        // 遍历数据
        for (int i = financeBillList.size() - 1; i >= 0; i--) {
            ContractBillVo contractBillVo = financeBillList.get(i);
            contractBillVo.setBcb_dateCycle(AppUtil.sdf_date.format(contractBillVo.getBcb_repaymentDate()) + "~" + AppUtil.sdf_date.format(repayment_end_date));
            financeBillList.set(i, contractBillVo);
            if (contractBillVo.getBcb_type() == 0) {
                repayment_end_date = AppUtil.calendayDate(contractBillVo.getBcb_repaymentDate(), Calendar.DATE, -1).getTime();
            }
        }
        return financeBillList;
    }

    /**
     * 获取合同账单期数
     *
     * @param financeBillList 合同账单列表
     * @param con_end_date    合同截至日期
     * @return
     */
    public static String getContractBillCycleDateOne(List<ContractBillVo> financeBillList, Date con_end_date, Integer cycle) {
        if (financeBillList == null || financeBillList.isEmpty() || con_end_date == null || cycle == null) {
            return "";
        }
        // 账单期数排序
        financeBillList.sort(Comparator.comparing(ContractBillVo::getBcb_cycle));
        // 截至日期
        Date repayment_end_date = con_end_date;
        // 当期账期有效期
        String current_cycle_date = "";
        // 遍历数据
        for (int i = financeBillList.size() - 1; i >= 0; i--) {
            ContractBillVo contractBillVo = financeBillList.get(i);
            if (contractBillVo.getBcb_type() == 0 && contractBillVo.getBcb_cycle().equals(cycle)) {
                current_cycle_date = AppUtil.sdf_date.format(contractBillVo.getBcb_repaymentDate()) + "~" + AppUtil.sdf_date.format(repayment_end_date);
                break;
            }
            if (contractBillVo.getBcb_type() == 0) {
                repayment_end_date = AppUtil.calendayDate(contractBillVo.getBcb_repaymentDate(), Calendar.DATE, -1).getTime();
            }
        }
        return current_cycle_date;
    }

    /**
     * 获取上传配置
     *
     * @param name
     * @return
     * @author JiangQT
     */
    public String getUpPathProperties(String name) {
        Properties properties = new Properties();
        try {
            // 获取properties路劲
            String path = this.getClass().getResource("/config/uploadPath.properties").getPath();
            // 把properties文件转化输出流
            InputStream in;
            in = new BufferedInputStream(new FileInputStream(path));
            properties.load(in); // /执行
            // 关闭
            in.close();
            return (String) properties.get(name);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 等比例缩放图片
     *
     * @param inputFile  源文件
     * @param outFile    生成文件
     * @param width      指定宽度
     * @param height     指定高度
     * @param proportion 是否等比例操作
     * @return
     * @描述 —— 是否等比例缩放图片
     */
    public static boolean zoomPic(String inputFile, String outFile, int width, int height, boolean proportion) {
        try {
            // 获得源文件
            File file = new File(inputFile);
            if (!file.exists()) {
                return false;
            }
            Image img = ImageIO.read(file);
            // 判断图片格式是否正确
            if (img.getWidth(null) == -1) {
                return false;
            } else {
                int newWidth;
                int newHeight;
                // 判断是否是等比缩放
                if (!proportion) {
                    // 为等比缩放计算输出的图片宽度及高度
                    double rate1 = ((double) img.getWidth(null)) / (double) width + 0.1;
                    double rate2 = ((double) img.getHeight(null)) / (double) height + 0.1;
                    // 根据缩放比率大的进行缩放控制
                    double rate = rate1 > rate2 ? rate1 : rate2;
                    newWidth = (int) (((double) img.getWidth(null)) / rate);
                    newHeight = (int) (((double) img.getHeight(null)) / rate);
                } else {
                    newWidth = width; // 输出的图片宽度
                    newHeight = height; // 输出的图片高度
                }
                // 如果图片小于目标图片的宽和高则不进行转换
                /*
                 * if (img.getWidth(null) < width && img.getHeight(null) <
                 * height) { newWidth = img.getWidth(null); newHeight =
                 * img.getHeight(null); }
                 */
                BufferedImage tag = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
                // Image.SCALE_SMOOTH 的缩略算法 生成缩略图片的平滑度的,优先级比速度高 生成的图片质量比较好 但速度慢
                tag.getGraphics().drawImage(img.getScaledInstance(newWidth, newHeight, Image.SCALE_SMOOTH), 0, 0, null);
                FileOutputStream out = new FileOutputStream(outFile);
                // JPEGImageEncoder可适用于其他图片类型的转换
                JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
                encoder.encode(tag);
                out.close();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return true;
    }

    /**
     * 剪切缩放图片
     *
     * @param srcFile    源文件
     * @param outFile    输出文件
     * @param x          坐标
     * @param y          坐标
     * @param width      宽度
     * @param height     高度
     * @param zoomWidth  缩放宽度
     * @param zoomHeight 缩放高度
     * @param proportion
     * @return
     * @描述 —— 裁剪图片
     */
    public static boolean cutZoomPic(String srcFile, String outFile, int x, int y, int width, int height, int zoomWidth, int zoomHeight, boolean proportion) {
        FileInputStream is = null;
        ImageInputStream iis = null;
        try {
            // 如果源图片不存在
            if (!new File(srcFile).exists()) {
                return false;
            }
            // 读取图片文件
            is = new FileInputStream(srcFile);
            // 获取文件格式
            String ext = srcFile.substring(srcFile.lastIndexOf(".") + 1);
            // ImageReader声称能够解码指定格式
            Iterator<ImageReader> it = ImageIO.getImageReadersByFormatName(ext);
            ImageReader reader = it.next();

            // 获取图片流
            iis = ImageIO.createImageInputStream(is);

            // 输入源中的图像将只按顺序读取
            reader.setInput(iis, true);

            // 描述如何对流进行解码
            ImageReadParam param = reader.getDefaultReadParam();

            // 图片裁剪区域
            Rectangle rect = new Rectangle(x, y, width, height);

            // 提供一个 BufferedImage，将其用作解码像素数据的目标
            param.setSourceRegion(rect);

            // 使用所提供的 ImageReadParam 读取通过索引 imageIndex 指定的对象
            BufferedImage bi = reader.read(0, param);

            // 保存新图片
            File tempOutFile = new File(outFile);
            if (!tempOutFile.exists()) {
                tempOutFile.mkdirs();
            }
            ImageIO.write(bi, ext, new File(outFile));
            zoomPic(outFile, outFile, zoomWidth, zoomHeight, proportion);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            try {
                if (is != null) {
                    is.close();
                }
                if (iis != null) {
                    iis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 删除文件
     *
     * @param path
     * @return
     * @author JiangQT
     */
    public static boolean delFile(String path) {
        boolean flag = false;
        File file = new File(path);
        // 路径为文件且不为空则进行删除
        if (file.isFile() && file.exists()) {
            file.delete();
            flag = true;
        }
        return flag;
    }

    /**
     * 获取账号密码安全等级
     *
     * @param pPasswordStr
     * @return
     * @author JiangQT
     */
    public static Safelevel getPwdSecurityLevel(String pPasswordStr) {
        Safelevel safelevel = Safelevel.VERY_WEAK;
        if (pPasswordStr == null) {
            return safelevel;
        }
        int grade = 0;
        int index;
        char[] pPsdChars = pPasswordStr.toCharArray();

        int numIndex = 0;
        int sLetterIndex = 0;
        int lLetterIndex = 0;
        int symbolIndex = 0;

        for (char pPsdChar: pPsdChars) {
            /*
             * 数字 48-57 A-Z 65 - 90 a-z 97 - 122 !"#$%&'()*+,-./ (ASCII码：33~47)
             * :;<=>?@ (ASCII码：58~64) [\]^_` (ASCII码：91~96) {|}~
             * (ASCII码：123~126)
             */
            if ((int) pPsdChar >= 48 && (int) pPsdChar <= 57) {
                numIndex++;
            } else if ((int) pPsdChar >= 65 && (int) pPsdChar <= 90) {
                lLetterIndex++;
            } else if ((int) pPsdChar >= 97 && (int) pPsdChar <= 122) {
                sLetterIndex++;
            } else if (((int) pPsdChar >= 33 && (int) pPsdChar <= 47) || ((int) pPsdChar >= 58 && (int) pPsdChar <= 64) || ((int) pPsdChar >= 91 && (int) pPsdChar <= 96) || ((int) pPsdChar >= 123 && (int) pPsdChar <= 126)) {
                symbolIndex++;
            }
        }
        /*
         * 一、密码长度: 5 分: 小于等于 4 个字符 10 分: 5 到 7 字符 25 分: 大于等于 8 个字符
         */
        if (pPsdChars.length <= 4) {
            index = 5;
        } else if (pPsdChars.length <= 7) {
            index = 10;
        } else {
            index = 25;
        }
        grade += index;

        /*
         * 二、字母: 0 分: 没有字母 10 分: 全都是小（大）写字母 20 分: 大小写混合字母
         */
        if (lLetterIndex == 0 && sLetterIndex == 0) {
            index = 0;
        } else if (lLetterIndex != 0 && sLetterIndex != 0) {
            index = 20;
        } else {
            index = 10;
        }
        grade += index;
        /*
         * 三、数字: 0 分: 没有数字 10 分: 1 个数字 20 分: 大于 1 个数字
         */
        if (numIndex == 0) {
            index = 0;
        } else if (numIndex == 1) {
            index = 10;
        } else {
            index = 20;
        }
        grade += index;

        /*
         * 四、符号: 0 分: 没有符号 10 分: 1 个符号 25 分: 大于 1 个符号
         */
        if (symbolIndex == 0) {
            index = 0;
        } else if (symbolIndex == 1) {
            index = 10;
        } else {
            index = 25;
        }
        grade += index;
        /*
         * 五、奖励: 2 分: 字母和数字 3 分: 字母、数字和符号 5 分: 大小写字母、数字和符号
         */
        if ((sLetterIndex != 0 || lLetterIndex != 0) && numIndex != 0) {
            index = 2;
        } else if ((sLetterIndex != 0 || lLetterIndex != 0) && numIndex != 0 && symbolIndex != 0) {
            index = 3;
        } else if (sLetterIndex != 0 && lLetterIndex != 0 && numIndex != 0 && symbolIndex != 0) {
            index = 5;
        }
        grade += index;

        /*
         * 最后的评分标准: >= 90: 非常安全 >= 80: 安全（Secure） >= 70: 非常强 >= 60: 强（Strong） >=
         * 50: 一般（Average） >= 25: 弱（Weak） >= 0: 非常弱
         */
        if (grade >= 90) {
            safelevel = Safelevel.VERY_SECURE;
        } else if (grade >= 80) {
            safelevel = Safelevel.SECURE;
        } else if (grade >= 70) {
            safelevel = Safelevel.VERY_STRONG;
        } else if (grade >= 60) {
            safelevel = Safelevel.STRONG;
        } else if (grade >= 50) {
            safelevel = Safelevel.AVERAGE;
        } else if (grade >= 25) {
            safelevel = Safelevel.WEAK;
        } else if (grade >= 0) {
            safelevel = Safelevel.VERY_WEAK;
        }
        return safelevel;
    }

    /**
     * 格式化APP版本
     *
     * @param appVersion
     * @return
     */
    public static int formatAppVersion(String appVersion) {
        if (StringUtils.isEmpty(appVersion)) return 0;
        String[] versions = appVersion.split("\\.");
        int common = 3;
        int result = 0;
        switch (versions.length) {
            case 1:
                String v12 = "000";
                String v13 = "000";
                result = Integer.valueOf(versions[0] + v12 + v13);
                break;
            case 2:
                StringBuilder v22 = new StringBuilder(versions[1]);
                for (int i = 0; i < common - versions[1].length(); i++) {
                    v22.insert(0, "0");
                }
                String v23 = "000";
                result = Integer.valueOf(versions[0] + v22 + v23);
                break;
            case 3:
                StringBuilder v32 = new StringBuilder(versions[1]);
                for (int i = 0; i < common - versions[1].length(); i++) {
                    v32.insert(0, "0");
                }
                StringBuilder v33 = new StringBuilder(versions[2]);
                for (int i = 0; i < common - versions[2].length(); i++) {
                    v33.insert(0, "0");
                }
                result = Integer.valueOf(versions[0] + v32 + v33);
                break;
        }
        return result;
    }

    /**
     * 获取公共号
     *
     * @param order_type 订单类型
     * @return
     */
    public static String getPublicSN(Integer order_type) {
        String prefix = order_type + "00";
        int char_count = 7 - prefix.length();
        return (prefix + new Date().getTime() + AppUtil.getRandNum(char_count));
    }

    /**
     * 获取订单号
     *
     * @param order_type 订单类型
     * @return
     */
    public static String getOrderSN(Integer order_type) {
        String prefix = order_type + "10";
        int char_count = 7 - prefix.length();
        return (prefix + new Date().getTime() + AppUtil.getRandNum(char_count));
    }

    /**
     * 获取账单号
     *
     * @param order_type 订单类型
     * @return
     */
    public static String getBillSN(Integer order_type) {
        String prefix = order_type + "11";
        int char_count = 7 - prefix.length();
        return (prefix + new Date().getTime() + AppUtil.getRandNum(char_count));
    }

    /**
     * 商户订单号
     *
     * @param bill_sn
     * @return
     * @author JiangQt
     * @version 2017年6月4日下午3:57:22
     */
    public static String getTradeCode(String bill_sn) {
        return (bill_sn.substring(0, 1) + "12" + new Date().getTime() + AppUtil.getRandNum(4));
    }

    /**
     * 返回合同账单类型
     *
     * @param bcb_type
     * @return
     */
    public static String returnContractBillType(Integer bcb_type) {
        if (StringUtils.isEmpty(bcb_type)) return "";
        switch (bcb_type) {
            case AppConfig.contract_bill_type_0:
                return "租金";
            case AppConfig.contract_bill_type_1:
                return "押金";
            case AppConfig.contract_bill_type_2:
                return "包修费";
            case AppConfig.contract_bill_type_3:
                return "服务费";
            case AppConfig.contract_bill_type_4:
                return "维修费";
            case AppConfig.contract_bill_type_5:
                return "保洁费";
            case AppConfig.contract_bill_type_6:
                return "水费";
            case AppConfig.contract_bill_type_7:
                return "电费";
            case AppConfig.contract_bill_type_8:
                return "燃气费";
            case AppConfig.contract_bill_type_9:
                return "物管费";
            case AppConfig.contract_bill_type_10:
                return "宽带费";
            case AppConfig.contract_bill_type_11:
                return "往期结余";
            case AppConfig.contract_bill_type_12:
                return "往期欠缴";
            case AppConfig.contract_bill_type_13:
                return "滞纳金";
            case AppConfig.contract_bill_type_14:
                return "免租费";
            case AppConfig.contract_bill_type_15:
                return "管理费";
            case AppConfig.contract_bill_type_16:
                return "材料费";
            case AppConfig.contract_bill_type_17:
                return "滞纳金";
            case AppConfig.contract_bill_type_18:
                return "定金";
            default:
                return "其他费用";
        }
    }

    /**
     * 账号密码安全等级ENUM
     * <p>
     * 1-2密码安全等级为低 <br>
     * 3-4密码安全等级为中 <br>
     * 5-7密码安全等级为高
     *
     * @author JiangQt
     * @createTime 2015年8月3日下午6:58:26
     */
    public enum Safelevel {
        /**
         * 非常弱
         */
        VERY_WEAK(1),
        /**
         * 弱
         */
        WEAK(2),
        /**
         * 一般
         */
        AVERAGE(3),
        /**
         * 强
         */
        STRONG(4),
        /**
         * 非常强
         */
        VERY_STRONG(5),
        /**
         * 安全
         */
        SECURE(6),
        /**
         * 非常安全
         */
        VERY_SECURE(7);

        private final int value;

        public int getValue() {
            return value;
        }

        Safelevel(int value) {
            this.value = value;
        }
    }

    /**
     * 设置密码加密
     *
     * @param pwd  原始密码
     * @param salt 密码盐值
     * @return
     * @author JiangQT
     */
    public static String setPwdEncrypt(String pwd, String salt) {
        return AppUtil.MD5(AppUtil.MD5(pwd) + salt);
    }

    /**
     * 得到两日期相差几个月
     *
     * @return
     * @throws Exception
     */
    public static int getMonth(String startDate, String endDate) throws Exception {
        int monthday;
        Date startDate1 = sdf_date.parse(startDate);
        // 开始时间与今天相比较
        Date endDate1 = sdf_date.parse(endDate);

        Calendar starCal = Calendar.getInstance();
        starCal.setTime(startDate1);

        int sYear = starCal.get(Calendar.YEAR);
        int sMonth = starCal.get(Calendar.MONTH);
        int sDay = starCal.get(Calendar.DATE);

        Calendar endCal = Calendar.getInstance();
        endCal.setTime(endDate1);
        int eYear = endCal.get(Calendar.YEAR);
        int eMonth = endCal.get(Calendar.MONTH);
        int eDay = endCal.get(Calendar.DATE);

        monthday = ((eYear - sYear) * 12 + (eMonth - sMonth));

        if (sDay < eDay) {
            monthday++;
        }
        return monthday;
    }

    /**
     * 得到两日期相差几个月
     *
     * @return
     * @throws Exception
     */
    public static JSONObject getBusinessMonth(String startDate, String endDate) {
        try {
            return getBusinessMonth(sdf_date.parse(startDate), sdf_date.parse(endDate));
        } catch (ParseException e) {
            e.printStackTrace();
            return new JSONObject();
        }
    }

    /**
     * 得到两日期相差几个月
     *
     * @return
     * @throws Exception
     */
    public static JSONObject getBusinessMonth(Date startDate, Date endDate) {
        Calendar sc = Calendar.getInstance();
        sc.setTime(startDate);

        Calendar ec = Calendar.getInstance();
        ec.setTime(endDate);

        // 特殊处理
        boolean boo = false;
        // 计算年
        int year = ec.get(Calendar.YEAR) - sc.get(Calendar.YEAR);
        // 计算月
        int month = ec.get(Calendar.MONTH) - sc.get(Calendar.MONTH);
        if (month < 0) {
            year = year - 1;
            month = month + 12;
        }
        // 计算天
        int day = ec.get(Calendar.DATE) - sc.get(Calendar.DATE);
        if (day < 0) {
            if (month <= 0) {
                year = year - 1;
                month = 12 - 1;
            } else {
                month = month - 1;
            }
            int plusMonth = 30;
            if (day >= -1) {
                int currMonth = ec.get(Calendar.MONTH) - 1;
                if (currMonth == -1 || currMonth == 0 || currMonth == 2 || currMonth == 4 || currMonth == 6 || currMonth == 7 || currMonth == 9) {
                    plusMonth = 31;
                }
            }
            day = plusMonth + day + 1;
        } else {
            day = day + 1;

            Calendar diffCal = Calendar.getInstance();
            diffCal.setTime(startDate);
            diffCal.add(Calendar.YEAR, year);
            diffCal.add(Calendar.MONTH, month + 1);
            diffCal.add(Calendar.DATE, -1);
            if (diffCal.getTime().getTime() == ec.getTime().getTime()) {
                boo = true;
            }
        }

        // 当日期-30大于等于0时，需要逆推
        if (day - 30 >= 0 || boo) {
            month = month + 1;
            day = 0;
            if (month == 12) {
                year = year + 1;
                month = month - 12;
            }
        }
        JSONObject json = new JSONObject();
        json.put("month", year * 12 + month);
        json.put("day", day);
        return json;
    }

    /**
     * 得到两日期相差几个月
     *
     * @return
     * @throws Exception
     */
    public static int getMonth2(String startDate, String endDate) throws Exception {
        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
        int monthday;
        Date startDate1 = f.parse(startDate);
        // 开始时间与今天相比较
        Date endDate1 = f.parse(endDate);

        Calendar starCal = Calendar.getInstance();
        starCal.setTime(startDate1);

        int sYear = starCal.get(Calendar.YEAR);
        int sMonth = starCal.get(Calendar.MONTH);
        int sDay = starCal.get(Calendar.DATE);

        Calendar endCal = Calendar.getInstance();
        endCal.setTime(endDate1);
        int eYear = endCal.get(Calendar.YEAR);
        int eMonth = endCal.get(Calendar.MONTH);
        int eDay = endCal.get(Calendar.DATE);

        monthday = ((eYear - sYear) * 12 + (eMonth - sMonth));

        if ((eDay + 1) < sDay) {
            monthday--;
        }

        return monthday;
    }

    /**
     * 得到两日期相差几个月
     *
     * @return
     * @throws Exception
     */
    public static int getFullMonth(String startDate, String endDate) throws Exception {
        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate1 = f.parse(startDate);
        // 开始时间与今天相比较
        Date endDate1 = f.parse(endDate);

        Calendar starCal = Calendar.getInstance();
        starCal.setTime(startDate1);

        int sYear = starCal.get(Calendar.YEAR);
        int sMonth = starCal.get(Calendar.MONTH);
        Calendar endCal = Calendar.getInstance();
        endCal.setTime(endDate1);
        int eYear = endCal.get(Calendar.YEAR);
        int eMonth = endCal.get(Calendar.MONTH);
        return ((eYear - sYear) * 12 + (eMonth - sMonth));
    }

    /**
     * 得到两日期相差几个月
     *
     * @return
     * @throws Exception
     */
    public static int getMonth(Date startDate, Date endDate) throws Exception {
        int monthday;
        Calendar starCal = Calendar.getInstance();
        starCal.setTime(startDate);

        int sYear = starCal.get(Calendar.YEAR);
        int sMonth = starCal.get(Calendar.MONTH);
        int sDay = starCal.get(Calendar.DATE);

        Calendar endCal = Calendar.getInstance();
        endCal.setTime(endDate);
        int eYear = endCal.get(Calendar.YEAR);
        int eMonth = endCal.get(Calendar.MONTH);
        int eDay = endCal.get(Calendar.DATE);

        monthday = ((eYear - sYear) * 12 + (eMonth - sMonth));

        if (sDay < eDay) {
            monthday++;
        }
        return monthday;
    }

    /**
     * 生成订单&账单code
     *
     * @param prefix 前缀标识码
     * @return
     * @author JiangQT
     * @see 201:托管订单、202:租赁订单
     */
    public static String getImageName(String prefix) {
        return (prefix + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + AppUtil.getRandNum(4));
    }

    /**
     * 生成订单&账单code
     *
     * @param prefix 前缀标识码
     * @return
     * @author JiangQT
     * @see 201:托管订单、202:租赁订单
     */
    public static String getOrderCode(String prefix) {
        return (prefix + new Date().getTime() + AppUtil.getRandNum(4));
    }

    /**
     * 生成订单&账单code
     *
     * @param prefix 前缀标识码
     * @return
     * @author JiangQT
     * @see 201:托管订单、202:租赁订单
     */
    public static String getOrderCode(Integer prefix) {
        return (prefix.toString() + new Date().getTime() + AppUtil.getRandNum(4));
    }

    /**
     * 生成订单&账单code
     *
     * @param emId  管家ID
     * @param cType 合同类型
     * @return
     * @author JiangQT
     */
    public static String setOrderCode(String cType, int emId) {
        String sdf2 = new SimpleDateFormat("yyMMddHHmmss").format(new Date());
        String emIdStr;
        if (emId < 10) {
            emIdStr = "00" + emId;
        } else if (emId < 100) {
            emIdStr = "0" + emId;
        } else {
            emIdStr = "" + emId;
        }
        return ((cType.equals("托管合同") ? "201" : "202") + sdf2 + emIdStr);
    }

    /**
     * 获取订单编码
     *
     * @param codePrefix CODE前缀码（例如：托管合同201、租赁合同202）
     * @param employee   员工对象
     * @return
     * @see AppConfig
     */
    public static String getOrderCode(String codePrefix, UserCenterEmployee employee) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmmss");
        return (codePrefix + sdf.format(new Date()) + employee.getEm_id());
    }

    /**
     * 插入XML消息提示
     *
     * @param request
     * @param userMessageContent 消息对象
     */
    public static void addMessage(HttpServletRequest request, UserMessageContent userMessageContent) {
        // 插入XML文件
        // 根目录路径
        String path = request.getSession().getServletContext().getRealPath("/");
        List<Object> userMessageContents = new ArrayList<>();
        userMessageContents.add(userMessageContent);
        List<UserMessageContent> xmltoClass = XmlClass.xmltoClass(path, "message.xml", userMessageContent);
        if (xmltoClass == null) {
            XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
        } else {
            userMessageContents.addAll(xmltoClass);
            XmlClass.classtoXml(path, userMessageContents, "message.xml", userMessageContent);
        }
    }

    /**
     * 设置账单时间
     *
     * @param dateTime
     * @return
     * @throws Exception
     */
    public static Date setBillDate(Date dateTime) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return dateFormat.parse(date.format(dateTime) + " 23:59:59");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return dateTime;
    }

    /**
     * 获取两个时间的天数
     *
     * @return
     * @throws Exception
     */
    public static int getDay(Date startTime, Date endTime) {
        if (startTime == null) {
            return 0;
        }
        if (endTime == null) {
            return 0;
        }
        return (int) ((endTime.getTime() - startTime.getTime()) / (24 * 60 * 60 * 1000));
    }

    /**
     * 获取两个时间的天数
     *
     * @param startTime 开始时间
     * @param endTime   结束时间
     * @return +-(endTime - startTime)
     * @throws Exception
     */
    public static int getDay2(String startTime, String endTime) throws Exception {
        SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd");
        return (int) ((date.parse(endTime).getTime() - date.parse(startTime).getTime()) / (24 * 60 * 60 * 1000));
    }

    /**
     * 获取管理权限
     *
     * @return
     */
    public static boolean getAdminAuth() {
        UserCenterEmployee employee = getCookieEmployee();
        return employee != null && "IT部".equals(employee.getUcc_short());
    }

    /**
     * 本周第一天，以星期日开始
     *
     * @author 陈智颖
     */
    public static String weekStartDay() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.set(Calendar.DAY_OF_WEEK, 1);// 本周第一天，以星期日开始
        return sdf.format(c.getTime());
    }

    /**
     * 本周最后一天，以星期日开始
     *
     * @author 陈智颖
     */
    public static String weekEndDay() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.set(Calendar.DAY_OF_WEEK, 7);// 本周最后一天
        return sdf.format(c.getTime());
    }

    /**
     * 上传房屋图片
     *
     * @param targetClass
     * @param outFile
     * @return
     */
    public static String uploadHouseImage(Class<?> targetClass, File outFile) {
        String path = targetClass.getResource("/conf/path.properties").getPath();
        InputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(path));
            Properties properties = new Properties();
            properties.load(in);
            String paths = properties.getProperty("housePaths");
            String addrs = properties.getProperty("houseAddrs");
            int ports = Integer.parseInt(properties.getProperty("housePorts"));
            String usernames = properties.getProperty("houseUsernames");
            String passwords = properties.getProperty("housePasswords");
            String imagePath = properties.getProperty("houseImagePaths");
            URLUploadImage.run(paths, addrs, ports, usernames, passwords, outFile.toString());
            return (imagePath + "/" + outFile.getName());
        } catch (Exception e) {
            System.out.println("远程上传房屋图片失败");
        } finally {
            try {
                outFile.delete();
                in.close();
                URLUploadImage.logout();
            } catch (Exception e) {
                System.out.println("退出失败");
                e.printStackTrace();
            }
        }
        return null;
    }

    /**
     * 上传房屋图片
     *
     * @param targetClass
     * @param outFile
     * @return
     */
    public static String uploadServiceImage(Class<?> targetClass, File outFile) {
        String path = targetClass.getResource("/conf/path.properties").getPath();
        InputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(path));
            Properties properties = new Properties();
            properties.load(in);
            String paths = properties.getProperty("servepaths");
            String addrs = properties.getProperty("serveaddrs");
            int ports = Integer.parseInt(properties.getProperty("serveports"));
            String usernames = properties.getProperty("serveusernames");
            String passwords = properties.getProperty("servepasswords");
            String imagePath = properties.getProperty("serveImagePaths");
            URLUploadImage.run(paths, addrs, ports, usernames, passwords, outFile.toString());
            return (imagePath + "/" + outFile.getName());
        } catch (Exception e) {
            System.out.println("远程上传房屋图片失败");
        } finally {
            try {
                outFile.delete();
                in.close();
                URLUploadImage.logout();
            } catch (Exception ignored) {
            }
        }
        return null;
    }

    /**
     * 上传维修项目内容
     *
     * @param targetClass
     * @param outFile
     * @return
     */
    public static String uploadServiceMoney(Class<?> targetClass, File outFile) {
        String path = targetClass.getResource("/conf/path.properties").getPath();
        InputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(path));
            Properties properties = new Properties();
            properties.load(in);
            String paths = properties.getProperty("serveMoneypaths");
            String addrs = properties.getProperty("serveaddrs");
            int ports = Integer.parseInt(properties.getProperty("serveports"));
            String usernames = properties.getProperty("serveusernames");
            String passwords = properties.getProperty("servepasswords");
            String imagePath = properties.getProperty("serveMoneyPaths");
            URLUploadImage.run(paths, addrs, ports, usernames, passwords, outFile.toString());
            return (imagePath + "/" + outFile.getName());
        } catch (Exception e) {
            System.out.println("远程上传服务项目内容失败");
        } finally {
            try {
                outFile.delete();
                in.close();
                URLUploadImage.logout();
            } catch (Exception ignored) {
            }
        }
        return null;
    }

    /**
     * 删除维修项目内容
     *
     * @param targetClass
     * @param outFile
     * @return
     */
    public static String uploadDeleteServiceMoney(Class<?> targetClass, File outFile) {
        String path = targetClass.getResource("/conf/path.properties").getPath();
        InputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(path));
            Properties properties = new Properties();
            properties.load(in);
            String paths = properties.getProperty("serveMoneypaths");
            String addrs = properties.getProperty("serveaddrs");
            int ports = Integer.parseInt(properties.getProperty("serveports"));
            String usernames = properties.getProperty("serveusernames");
            String passwords = properties.getProperty("servepasswords");
            String imagePath = properties.getProperty("serveMoneyPaths");
            URLUploadImage.deletePro(paths, addrs, ports, usernames, passwords, outFile.toString());
            return (imagePath + "/" + outFile.getName());
        } catch (Exception e) {
            System.out.println("远程上传服务项目内容失败");
        }
        return null;
    }

    /**
     * 删除房屋图片
     *
     * @param targetClass
     * @param imgUrl
     * @return
     */
    public static boolean deleteServiceImage(Class<?> targetClass, String imgUrl) {
        String path = targetClass.getResource("/conf/path.properties").getPath();
        InputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(path));
            Properties properties = new Properties();
            properties.load(in);
            String paths = properties.getProperty("servepaths");
            String addrs = properties.getProperty("serveaddrs");
            int ports = Integer.parseInt(properties.getProperty("serveports"));
            String usernames = properties.getProperty("serveusernames");
            String passwords = properties.getProperty("servepasswords");
            return URLUploadImage.deletePro(paths, addrs, ports, usernames, passwords, imgUrl);
        } catch (Exception e) {
            System.out.println("远程删除房屋图片失败");
        } finally {
            try {
                in.close();
            } catch (Exception ignored) {
            }
        }
        return false;
    }

    /**
     * 上传内部人员名片
     *
     * @param targetClass
     * @param outFile
     * @return
     */
    public static String uploadUserImage(Class<?> targetClass, File outFile) {
        String path = targetClass.getResource("/conf/path.properties").getPath();
        InputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(path));
            Properties properties = new Properties();
            properties.load(in);
            String paths = properties.getProperty("userpaths");
            String addrs = properties.getProperty("useraddrs");
            int ports = Integer.parseInt(properties.getProperty("userports"));
            String usernames = properties.getProperty("userusernames");
            String passwords = properties.getProperty("userpasswords");
            // String imagePath = properties.getProperty("userImagePaths");
            URLUploadImage.run(paths, addrs, ports, usernames, passwords, outFile.toString());
            return ("/" + outFile.getName());
        } catch (Exception e) {
            System.out.println("上传图片失败");
        } finally {
            try {
                outFile.delete();
                in.close();
                URLUploadImage.logout();
            } catch (Exception ignored) {
            }
        }
        return null;
    }

    /**
     * 删除房屋图片
     *
     * @param targetClass
     * @param imgUrl
     * @return
     */
    public static boolean deleteHouseImage(Class<?> targetClass, String imgUrl) {
        String path = targetClass.getResource("/conf/path.properties").getPath();
        InputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(path));
            Properties properties = new Properties();
            properties.load(in);
            String paths = properties.getProperty("housePaths");
            String addr = properties.getProperty("houseAddrs");
            int port = Integer.parseInt(properties.getProperty("housePorts"));
            String username = properties.getProperty("houseUsernames");
            String password = properties.getProperty("housePasswords");
            return URLUploadImage.deletePro(paths, addr, port, username, password, imgUrl);
        } catch (Exception e) {
            System.out.println("远程删除房屋图片失败");
        } finally {
            try {
                in.close();
            } catch (Exception ignored) {
            }
        }
        return false;
    }

    /**
     * 是否拥有权限
     *
     * @param targetClass
     * @param powerName
     * @return
     * @作者 JiangQT
     * @日期 2016年9月26日
     */
    public static boolean isHavingPower(Class<?> targetClass, String powerName) {
        UserCenterEmployee employee = getCookieEmployee();
        if (employee == null) {
            return false;
        }
        String path = targetClass.getResource("/conf/power.properties").getPath();
        InputStream in = null;
        try {
            in = new BufferedInputStream(new FileInputStream(path));
            Properties properties = new Properties();
            properties.load(in);
            String powerNames = properties.getProperty(powerName);
            if (StringUtils.isEmpty(powerName)) {
                return false;
            }
            String[] split = powerNames.split(";");
            boolean boo = false;
            for (String str: split) {
                if (Objects.equals(employee.getEm_id(), Integer.valueOf(str))) {
                    boo = true;
                    break;
                }
            }
            return boo;
        } catch (Exception e) {
            return false;
        } finally {
            try {
                in.close();
            } catch (Exception ignored) {
            }
        }
    }

    /**
     * 获取图片名称
     *
     * @param prefix 名称前缀
     * @param file   文件
     * @return
     */
    public static String getImageName(String prefix, MultipartFile file) {
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        return (prefix + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + suffix);
    }

    /**
     * 获取String数组
     *
     * @param str
     * @return
     */
    public static String[] getStringArr(String str, String param) {
        if (StringUtils.isEmpty(str)) {
            return new String[]{};
        } else {
            return str.split("\\|");
        }
    }

    /**
     * 计算合同最后一期账单时间
     *
     * @param split       时间参数 （2016.1.10-2017.1.9）
     * @param mounth      总月份
     * @param returnCount 最后月份
     * @return
     * @Description:
     * @author JiangQt
     */
    public static HashMap<String, Integer> calLastBillDate(String[] split, int mounth, int returnCount) throws Exception {
        HashMap<String, Integer> map = new HashMap<>();
        Calendar c = Calendar.getInstance();
        String startStr = split[0];
        String endStr = split[1];

        c.setTime(sdf_date.parse(startStr));
        c.add(Calendar.MONTH, mounth + returnCount);
        c.add(Calendar.DAY_OF_MONTH, -1);

        // 获取两个时间的天数
        int day = AppUtil.getDay2(sdf_date.format(c.getTime()), endStr);
        if (day < 0) {
            c.add(Calendar.MONTH, -1);
            day = AppUtil.getDay2(sdf_date.format(c.getTime()), endStr);
            returnCount = returnCount - 1;
        }
        map.put("day", day);
        map.put("count", returnCount);
        return map;
    }

    /**
     * 计算合同最后一期账单时间
     *
     * @param split       时间参数 （2016.1.10-2017.1.9）
     * @param mounth      总月份
     * @param returnCount 最后月份
     * @return
     * @Description:
     * @author JiangQt
     */
    public static HashMap<String, Integer> calLastBillDate2(String[] split, int mounth, int returnCount) throws Exception {
        HashMap<String, Integer> map = new HashMap<>();
        Calendar c = Calendar.getInstance();
        String startStr = split[0];
        String endStr = split[1];

        c.setTime(sdf_date.parse(startStr));
        c.add(Calendar.MONTH, mounth); // + returnCount
        c.add(Calendar.DAY_OF_MONTH, -1);

        // 获取两个时间的天数
        int day = AppUtil.getDay2(sdf_date.format(c.getTime()), endStr);
        if (day < 0) {
            Calendar c1 = Calendar.getInstance();
            c1.setTime(sdf_date.parse(startStr));
            Calendar c2 = Calendar.getInstance();
            c2.setTime(sdf_date.parse(endStr));
            day = 30 + c2.get(Calendar.DAY_OF_MONTH) - c1.get(Calendar.DAY_OF_MONTH) + 1;
            returnCount--;
        }
        map.put("day", day);
        map.put("count", returnCount);
        return map;
    }

    /**
     * 判断是否为空，不为空返回true，为空返回false
     *
     * @param object
     * @return
     * @author 陈智颖
     */
    public static Boolean isNull(Object object) {
        return object != null && !object.equals("");
    }

    /**
     * 获取日
     *
     * @param date
     * @return
     */
    public static Integer Day(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd");
        return new Integer(sdf.format(date));
    }

    /**
     * 获取月
     *
     * @param date
     * @return
     */
    public static Integer Moth(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("MM");
        return new Integer(sdf.format(date));
    }

    /**
     * 获取年
     *
     * @param date
     * @return
     */
    public static Integer Year(Date date) {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
        return new Integer(sdf.format(date));
    }

    /**
     * 获取某月的最后一天 @Title:getLastDayOfMonth @Description: @param:@param
     * year @param:@param month @param:@return @return:String @throws
     */
    public static String getLastDayOfMonth(int year, int month) {
        Calendar cal = Calendar.getInstance();
        // 设置年份
        cal.set(Calendar.YEAR, year);
        // 设置月份
        cal.set(Calendar.MONTH, month - 1);
        // 获取某月最大天数
        int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        // 设置日历中月份的最大天数
        cal.set(Calendar.DAY_OF_MONTH, lastDay);
        // 格式化日期
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(cal.getTime());
    }

    /***
     * 获取时间差的年月日
     *
     * @作者 JiangQT
     * @日期 2016年6月17日
     *
     * @param startDate
     * @param endDate
     * @return
     * @throws Exception
     */
    public static String getYearMonthDay(String startDate, String endDate) throws Exception {
        Date sDate = sdf_date.parse(startDate);
        Date eDate = sdf_date.parse(endDate);
        if (sDate.getTime() > eDate.getTime()) {
            return null;
        }
        Calendar s = Calendar.getInstance();
        s.setTime(sDate);
        int sYear = s.get(Calendar.YEAR);
        int sMonth = s.get(Calendar.MONTH) + 1;
        int sDay = s.get(Calendar.DAY_OF_MONTH);

        Calendar e = Calendar.getInstance();
        e.setTime(eDate);
        int eYear = e.get(Calendar.YEAR);
        int eMonth = e.get(Calendar.MONTH) + 1;
        int eDay = e.get(Calendar.DAY_OF_MONTH) + 1;

        // 年
        int dYear = eYear - sYear;
        // 月
        int dMonth;
        if (eMonth >= sMonth) {
            dMonth = eMonth - sMonth;
        } else {
            dYear--;
            dMonth = eMonth + (12 - sMonth);
        }
        // 日
        int dDay;
        if (eDay >= sDay) {
            dDay = eDay - sDay;
        } else {
            if (dMonth <= 0) {
                dYear--;
                dMonth = 12 - 1;
            } else {
                dMonth--;
            }
//             Date dDate = sdf.parse(eYear + "-" + sMonth + "-" + sDay);
//             System.out.println(sdf.format(dDate));
//             Calendar d = Calendar.getInstance();
//             d.setTime(dDate);
//             d.add(Calendar.MONTH, -1);
//             System.out.println(sdf.format(d.getTime()));
//             dDay = (int) ((d.getTimeInMillis() - e.getTimeInMillis()) / (24 *
//             60 * 60 * 1000));
            dDay = eDay + (30 - sDay);
        }

        return dYear + "年" + dMonth + "月" + dDay + "日";
    }

    /***
     * 获取时间差的年月日
     *
     * @作者 JiangQT
     * @日期 2016年6月17日
     *
     * @param startDate
     * @param endDate
     * @return
     * @throws Exception
     */
    public static HashMap<String, Integer> getYearMonthDayToMap(String startDate, String endDate) throws Exception {
        Date sDate = sdf_date.parse(startDate);
        Date eDate = sdf_date.parse(endDate);
        if (sDate.getTime() > eDate.getTime()) {
            return null;
        }
        Calendar s = Calendar.getInstance();
        s.setTime(sDate);
        int sYear = s.get(Calendar.YEAR);
        int sMonth = s.get(Calendar.MONTH) + 1;
        int sDay = s.get(Calendar.DAY_OF_MONTH);

        Calendar e = Calendar.getInstance();
        e.setTime(eDate);
        int eYear = e.get(Calendar.YEAR);
        int eMonth = e.get(Calendar.MONTH) + 1;
        int eDay = e.get(Calendar.DAY_OF_MONTH) + 1;

        // 年
        int dYear = eYear - sYear;
        // 月
        int dMonth;
        if (eMonth >= sMonth) {
            dMonth = eMonth - sMonth;
        } else {
            dYear--;
            dMonth = eMonth + (12 - sMonth);
        }
        // 日
        int dDay;
        if (eDay >= sDay) {
            dDay = eDay - sDay;
        } else {
            if (dMonth <= 0) {
                dYear--;
                dMonth = 12 - 1;
            } else {
                dMonth--;
            }
//             Date dDate = sdf.parse(eYear + "-" + sMonth + "-" + sDay);
//             System.out.println(sdf.format(dDate));
//             Calendar d = Calendar.getInstance();
//             d.setTime(dDate);
//             d.add(Calendar.MONTH, -1);
//             System.out.println(sdf.format(d.getTime()));
//             dDay = (int) ((d.getTimeInMillis() - e.getTimeInMillis()) / (24 *
//             60 * 60 * 1000));
            dDay = eDay + (30 - sDay);
        }
        HashMap<String, Integer> map = new HashMap<>();
        map.put("year", dYear);
        map.put("month", dMonth);
        map.put("day", dDay);
        return map;
    }

    /**
     * 计算剩余时间
     *
     * @param startDateStr
     * @param endDateStr
     * @return
     */
    public static HashMap<String, Integer> remainDateToMap(String startDateStr, String endDateStr) {
        HashMap<String, Integer> map = new HashMap<>();
        Calendar calS = Calendar.getInstance();
        java.util.Date startDate = null;
        java.util.Date endDate = null;
        try {
            startDate = new SimpleDateFormat("yyyy-MM-dd").parse(startDateStr);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
        try {
            endDate = new SimpleDateFormat("yyyy-MM-dd").parse(endDateStr);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
        calS.setTime(startDate);
        int startY = calS.get(Calendar.YEAR);
        int startM = calS.get(Calendar.MONTH);
        int startD = calS.get(Calendar.DATE);
        int startDayOfMonth = calS.getActualMaximum(Calendar.DAY_OF_MONTH);

        calS.setTime(endDate);
        int endY = calS.get(Calendar.YEAR);
        int endM = calS.get(Calendar.MONTH);
        //处理2011-01-10到2011-01-10，认为服务为一天
        int endD = calS.get(Calendar.DATE) + 1;
        int endDayOfMonth = calS.getActualMaximum(Calendar.DAY_OF_MONTH);

        StringBuilder sBuilder = new StringBuilder();
        if (endDate.compareTo(startDate) < 0) {
            return null;
        }
        int lday = endD - startD;
        if (lday < 0) {
            endM = endM - 1;
            lday = startDayOfMonth + lday;
        }
        //处理天数问题，如：2011-01-01 到	2013-12-31 	2年11个月31天     实际上就是3年
        if (lday == endDayOfMonth) {
            endM = endM + 1;
            lday = 0;
        }
        int mos = (endY - startY) * 12 + (endM - startM);
        int lyear = mos / 12;
        int lmonth = mos % 12;
        map.put("year", lyear > 0 ? lyear : 0);
        map.put("month", lmonth > 0 ? lmonth : 0);
        map.put("day", lday > 0 ? lday : 0);
        return map;
    }

    /**
     * 判断两个日期是否相等
     *
     * @param d1
     * @param d2
     * @return
     */
    public static boolean sameDate(Date d1, Date d2) {
        if (null == d1 || null == d2)
            return false;
        //return getOnlyDate(d1).equals(getOnlyDate(d2));
        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(d1);
        Calendar cal2 = Calendar.getInstance();
        cal2.setTime(d2);
        return cal1.get(0) == cal2.get(0) && cal1.get(1) == cal2.get(1) && cal1.get(6) == cal2.get(6);
    }

    /***
     * 获取时间差的年月日
     *
     * @作者 JiangQT
     * @日期 2016年6月17日
     *
     * @param startDate
     * @param endDate
     * @return
     * @throws Exception
     */
    public static HashMap<String, Integer> getYearMonthDayData(String startDate, String endDate) throws Exception {
        Date sDate = sdf_date.parse(startDate);
        Date eDate = sdf_date.parse(endDate);
        if (sDate.getTime() > eDate.getTime()) {
            return null;
        }
        Calendar s = Calendar.getInstance();
        s.setTime(sDate);
        int sYear = s.get(Calendar.YEAR);
        int sMonth = s.get(Calendar.MONTH) + 1;
        int sDay = s.get(Calendar.DAY_OF_MONTH);

        Calendar e = Calendar.getInstance();
        e.setTime(eDate);
        int eYear = e.get(Calendar.YEAR);
        int eMonth = e.get(Calendar.MONTH) + 1;
        int eDay = e.get(Calendar.DAY_OF_MONTH);

        // 年
        int dYear = eYear - sYear;
        // 月
        int dMonth;
        if (eMonth >= sMonth) {
            dMonth = eMonth - sMonth;
        } else {
            dYear--;
            dMonth = eMonth + (12 - sMonth);
        }
        // 日
        int dDay;
        if (eDay >= sDay) {
            dDay = eDay - sDay;
        } else {
            if (dMonth <= 0) {
                dYear--;
                dMonth = 12 - 1;
            } else {
                dMonth--;
            }
            // Date dDate = sdf.parse(eYear + "-" + sMonth + "-" + sDay);
            // System.out.println(sdf.format(dDate));
            // Calendar d = Calendar.getInstance();
            // d.setTime(dDate);
            // d.add(Calendar.MONTH, -1);
            // System.out.println(sdf.format(d.getTime()));
            // dDay = (int) ((d.getTimeInMillis() - e.getTimeInMillis()) / (24 *
            // 60 * 60 * 1000));
            dDay = eDay + (30 - sDay);
        }
        HashMap<String, Integer> map = new HashMap<>();
        map.put("year", dYear);
        map.put("month", dMonth);
        map.put("day", dDay);
        return map;
    }

    /**
     * 参数校验:过滤特殊sql防止SQL注入
     *
     * @param str
     * @return
     * @author 陈智颖
     */
    public static Boolean isValid(String str) {
        String reg = "(?:')|(?:--)|(/\\*(?:.|[\\n\\r])*?\\*/)|" + "(\\b(select|update|and|or|delete|insert|trancate|char|into|substr|ascii|declare|exec|count|master|into|drop|execute)\\b)";
        Pattern sqlPattern = Pattern.compile(reg, Pattern.CASE_INSENSITIVE);
        return !sqlPattern.matcher(str).find();
    }

    /**
     * 合同状态
     *
     * @param state
     * @return
     * @author 陈智颖
     */
    public static int ContractState(String state) {
        int statei = 101;
        switch (state) {
            case "编辑":
                statei = 101;
                break;
            case "待审核":
                statei = 102;
                break;
            case "审核未通过":
                statei = 103;
                break;
            case "待复核":
                statei = 104;
                break;
            case "复核未通过":
                statei = 105;
                break;
            case "已生效":
                statei = 106;
                break;
            case "作废":
                statei = 107;
                break;
            case "续约":
                statei = 201;
                break;
            case "到期":
                statei = 300;
                break;
            case "到期申请":
                statei = 301;
                break;
            case "到期处理中":
                statei = 302;
                break;
            case "到期处理完成":
                statei = 303;
                break;
            case "解约申请":
                statei = 401;
                break;
            case "解约中":
                statei = 402;
                break;
            case "解约完成":
                statei = 403;
                break;
            case "转租申请":
                statei = 501;
                break;
            case "转租中":
                statei = 502;
                break;
            case "转租完成":
                statei = 503;
                break;
            case "退租申请":
                statei = 601;
                break;
            case "退租中":
                statei = 602;
                break;
            case "退租完成":
                statei = 603;
                break;
            case "强收申请":
                statei = 701;
                break;
            case "强收中":
                statei = 702;
                break;
            case "强收完成":
                statei = 703;
                break;
            case "代偿申请":
                statei = 801;
                break;
        }

        return statei;
    }

    /**
     * 合同状态
     *
     * @param statei
     * @return
     * @author 陈智颖
     */
    public static Map<String, String> ContractStateText(int statei) {
        Map<String, String> map = new HashMap<>();
        String stateStr = "编辑";
        String color = "#F9A755";
        switch (statei) {
            case 101:
                stateStr = "编辑";
                color = "#F9A755";
                break;
            case 102:
                stateStr = "待审核";
                color = "#D9D6C3";
                break;
            case 103:
                stateStr = "审核未通过";
                color = "#D7D7D7";
                break;
            case 104:
                stateStr = "待复核";
                color = "#F391A8";
                break;
            case 105:
                stateStr = "复核未通过";
                color = "#D7D7D7";
                break;
            case 106:
                stateStr = "已复核";
                color = "#02D49F";
                break;
            case 107:
                stateStr = "YI一";
                color = "#FF6666";
                break;
            case 201:
                stateStr = "续约";
                color = "#FF6666";
                break;
            case 300:
                stateStr = "到期";
                color = "#FF6666";
                break;
            case 301:
                stateStr = "到期申请";
                color = "#F9A755";
                break;
            case 302:
                stateStr = "到期处理中";
                color = "#FF6666";
                break;
            case 303:
                stateStr = "到期处理完成";
                color = "#02D49F";
                break;
            case 401:
                stateStr = "解约申请";
                color = "#F9A755";
                break;
            case 402:
                stateStr = "解约中";
                color = "#FF6666";
                break;
            case 403:
                stateStr = "解约完成";
                color = "#02D49F";
                break;
            case 501:
                stateStr = "转租申请";
                color = "#F9A755";
                break;
            case 502:
                stateStr = "转租中";
                color = "#FF6666";
                break;
            case 503:
                stateStr = "转租完成";
                color = "#02D49F";
                break;
            case 601:
                stateStr = "退租申请";
                color = "#F9A755";
                break;
            case 602:
                stateStr = "退租中";
                color = "#FF6666";
                break;
            case 603:
                stateStr = "退租完成";
                color = "#02D49F";
                break;
            case 701:
                stateStr = "强收申请";
                color = "#F9A755";
                break;
            case 702:
                stateStr = "强收中";
                color = "#FF6666";
                break;
            case 703:
                stateStr = "强收完成";
                color = "#02D49F";
                break;
            case 801:
                stateStr = "代偿申请";
                color = "#F9A755";
                break;
        }
        map.put("stateStr", stateStr);
        map.put("color", color);
        return map;
    }

    /**
     * 是否符合状态
     *
     * @param state
     * @param str
     * @return
     * @作者 JiangQT
     * @日期 2016年7月11日
     */
    public static boolean isOkState(Integer state, String str) {
        boolean boo = false;
        switch (str) {
            case "到期":
                boo = (state == 300 || state == 301 || state == 302 || state == 303);
                break;
            case "转租":
                boo = (state == 501 || state == 502 || state == 503);
                break;
            case "退租":
                boo = (state == 601 || state == 602 || state == 603);
                break;
            case "强收":
                boo = (state == 701 || state == 702 || state == 703);
                break;
            case "换房":
                boo = (state == 901 || state == 902 || state == 903);
                break;
            case "续约":
                boo = (state == 201);
                break;
        }
        return boo;
    }

    /**
     * 返回合同状态
     *
     * @param processResult
     * @return
     * @作者 JiangQT
     * @日期 2016年9月4日
     */
    public static String returnContractState(Integer processResult) {
        String state = "";
        if (processResult != null) {
            switch (processResult) {
                case 101:
                    state = EnumContractOptionState.contract_option_state_101.getName();
                    break;
                case 102:
                    state = EnumContractOptionState.contract_option_state_102.getName();
                    break;
                case 103:
                    state = EnumContractOptionState.contract_option_state_103.getName();
                    break;
                case 104:
                    state = EnumContractOptionState.contract_option_state_104.getName();
                    break;
                case 105:
                    state = EnumContractOptionState.contract_option_state_105.getName();
                    break;
                case 106:
                    state = EnumContractOptionState.contract_option_state_106.getName();
                    break;
            }
        }
        return state;
    }

    /**
     * 服务状态
     *
     * @param statei
     * @return
     */
    public static Map<String, String> serviceState(int statei) {
        Map<String, String> map = new HashMap<>();
        String state = "未派单";
        String stateColor = "#DDDDDD";
        switch (statei) {
            case 1100:
                state = "已下单";
                stateColor = "#F9A755";
                break;
            case 2100:
                state = "已受理";
                stateColor = "#F9A755";
                break;
            case 2200:
                state = "已派单";
                stateColor = "#F9A755";
                break;
            case 3100:
                state = "已接单";
                stateColor = "#02DCB2";
                break;
            case 3200:
                state = "处理中";
                stateColor = "#02DCB2";
                break;
            case 3300:
                state = "已处理";
                stateColor = "#FF6666";
                break;
            case 3400:
                state = "已结算";
                stateColor = "#FF6666";
                break;
            case 4100:
                state = "已回访";
                stateColor = "#FF6666";
                break;
            case 5010:
                state = "已取消";
                stateColor = "#DDDDDD";
                break;
            case 5020:
                state = "已关闭";
                stateColor = "#DDDDDD";
                break;

        }
        map.put("state", state);
        map.put("stateColor", stateColor);
        return map;
    }

    /**
     * 意向房源状态颜色
     *
     * @param state
     * @return
     */
    public static String intentState(String state) {
        if (state.equals("房源录入") || state.equals("房源跟进")) {
            return "#91DFDF";
        } else if (state.equals("房源实勘") || state.equals("房源定价")) {
            return "#FADC75";
        } else if (state.equals("完成")) {
            return "#FF6666";
        } else if (state.equals("存房失败")) {
            return "#DDDDDD";
        }
        return "#DDDDDD";
    }

    /**
     * 根据招租类型返回合同状态
     *
     * @param cco_applicationType
     * @return
     */
    public static int returnContractStateByCcoType2(String cco_applicationType) {
        int con_optionState = 0;
        switch (cco_applicationType) {
            case AppConfig.cco_applicationtype_dq: // 到期
                con_optionState = AppConfig.contract_optionstate_302;
                break;
            case AppConfig.cco_applicationtype_jy: // 解约
                con_optionState = AppConfig.contract_optionstate_402;
                break;
            case AppConfig.cco_applicationtype_zz: // 转租
                con_optionState = AppConfig.contract_optionstate_502;
                break;
            case AppConfig.cco_applicationtype_tz: // 退租
                con_optionState = AppConfig.contract_optionstate_602;
                break;
            case AppConfig.cco_applicationtype_qs: // 强收
                con_optionState = AppConfig.contract_optionstate_702;
                break;
            case AppConfig.cco_applicationtype_dc: // 代偿
                con_optionState = AppConfig.contract_optionstate_802;
                break;
            case AppConfig.cco_applicationtype_hf: // 换房
                con_optionState = AppConfig.contract_optionstate_902;
                break;
        }
        return con_optionState;
    }

    /**
     * 根据招租类型返回合同状态
     *
     * @param cco_applicationType
     * @return
     */
    public static int returnContractStateByCcoType3(String cco_applicationType) {
        int con_optionState = 0;
        switch (cco_applicationType) {
            case AppConfig.cco_applicationtype_dq: // 到期
                con_optionState = AppConfig.contract_optionstate_303;
                break;
            case AppConfig.cco_applicationtype_jy: // 解约
                con_optionState = AppConfig.contract_optionstate_403;
                break;
            case AppConfig.cco_applicationtype_zz: // 转租
                con_optionState = AppConfig.contract_optionstate_503;
                break;
            case AppConfig.cco_applicationtype_tz: // 退租
                con_optionState = AppConfig.contract_optionstate_603;
                break;
            case AppConfig.cco_applicationtype_qs: // 强收
                con_optionState = AppConfig.contract_optionstate_703;
                break;
            case AppConfig.cco_applicationtype_dc: // 代偿
                con_optionState = AppConfig.contract_optionstate_803;
                break;
            case AppConfig.cco_applicationtype_hf: // 换房
                con_optionState = AppConfig.contract_optionstate_903;
                break;
        }
        return con_optionState;
    }

    /**
     * 根据招租类型返回合同状态
     *
     * @param cco_applicationType
     * @return
     */
    public static int returnBcoStateByCcoType(String cco_applicationType) {
        int bcb_state = 0;
        switch (cco_applicationType) {
            case AppConfig.cco_applicationtype_zz:
                bcb_state = AppConfig.order_option_state_10;
                break;
            case AppConfig.cco_applicationtype_tz:
                bcb_state = AppConfig.order_option_state_11;
                break;
            case AppConfig.cco_applicationtype_jy:
                bcb_state = AppConfig.order_option_state_12;
                break;
            case AppConfig.cco_applicationtype_qs:
                bcb_state = AppConfig.order_option_state_13;
                break;
            case AppConfig.cco_applicationtype_dc:
                bcb_state = AppConfig.order_option_state_14;
                break;
            case AppConfig.cco_applicationtype_hf:
                bcb_state = AppConfig.order_option_state_15;
                break;
        }
        return bcb_state;
    }

    /**
     * 获取出房状态类型名称
     *
     * @param contract_extstate
     * @return
     */
    public static String returnContractExtStateName(int contract_extstate) {
        String extStateName = "";
        switch (contract_extstate) {
            case AppConfig.contract_extstate_25:
                extStateName = "转租出房";
                break;
            case AppConfig.contract_extstate_26:
                extStateName = "退租出房";
                break;
            case AppConfig.contract_extstate_27:
                extStateName = "强收出房";
                break;
        }
        return extStateName;
    }

    /**
     * 获取当前日期是星期几<br>
     *
     * @return 当前日期是星期几
     */
    public static String getWeek(String date) {
        String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        Calendar cal = Calendar.getInstance();
        try {
            cal.setTime(sdf_date.parse(date));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0) {
            w = 0;
        }
        return weekDays[w];
    }

    /**
     * 获取当前日期是星期几<br>
     *
     * @param dt
     * @return 当前日期是星期几
     */
    public static String getWeekOfDate(Date dt) {
        String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0) {
            w = 0;
        }
        return weekDays[w];
    }

    /**
     * 循环一个月的日期
     *
     * @param date
     * @return
     * @author 陈智颖
     */
    public static List<Date> getAllTheDateOftheMonth(Date date) {
        List<Date> list = new ArrayList<>();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.DATE, 1);

        int month = cal.get(Calendar.MONTH);
        while (cal.get(Calendar.MONTH) == month) {
            list.add(cal.getTime());
            cal.add(Calendar.DATE, 1);
        }
        return list;
    }

    /**
     * 构建文件名称
     *
     * @param prefix
     * @param suffix
     * @return
     * @作者 JiangQT
     * @日期 2016年10月23日
     */
    public static String buildFileName(String prefix, String suffix) {
        return prefix +
                new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) +
                AppUtil.getRandNum(4) + "." + suffix;
    }

    /**
     * 判断非空
     *
     * @param obj
     * @return
     * @author 王孝元
     */
    public static boolean isNotNull(Object obj) {
        return obj != null && !obj.toString().trim().equals("") && !obj.toString().trim().equals("null");
    }

    /**
     * null转换空字符串
     *
     * @param obj
     * @return
     * @author 王孝元
     */
    public static String null2Str(Object obj) {
        return obj == null ? "" : obj.toString().trim();
    }

    /**
     * 字符串转数字组
     *
     * @return
     * @author 王孝元
     */
    public static Integer[] strToIntegerArray(String str) {
        String[] arr = AppUtil.null2Str(str).split(",");
        // ['','','1','']
        List<String> temp = new ArrayList<>();
        for (String anArr: arr) {
            if (isNotNull(anArr)) {
                temp.add(anArr);
            }
        }
        Integer[] t = new Integer[temp.size()];
        for (int i = 0; i < temp.size(); i++) {
            t[i] = Integer.valueOf(temp.get(i));
        }
        return t;
    }

    /**
     * 去除集合中null元素
     *
     * @param list
     * @param <T>
     * @return
     * @author 王孝元
     */
    public static <T> List<T> removeNull(List<T> list) {
        if (list == null) {
            return new ArrayList<>();
        } else {
            for (int i = 0; i < list.size(); i++) {
                if (list.get(i) == null) {
                    list.remove(i);
                }
            }
            return list;
        }
    }

    /**
     * 日期计算
     *
     * @param date
     * @param calendar
     * @param i
     * @return
     * @作者 JiangQT
     * @日期 2016年11月14日
     */
    public static Calendar calendayDate(Date date, int calendar, int i) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(calendar, i);
        return cal;
    }

    /**
     * null转double
     *
     * @param obj
     * @return
     * @author 王孝元
     */
    public static double null2Double(Object obj) {
        return obj == null ? 0.0 : Double.valueOf(obj.toString());
    }

    /**
     * null转int
     *
     * @param obj
     * @return
     * @author 王孝元
     */
    public static int null2Int(Object obj) {
        return obj == null ? 0 : Integer.valueOf(obj.toString());
    }

    /**
     * null转boolean
     *
     * @param obj
     * @return
     * @author 王孝元
     */
    public static boolean null2Bool(Object obj) {
        return obj == null ? false : Boolean.valueOf(obj.toString().trim());
    }

    /**
     * 字符串转换成日期
     *
     * @param str
     * @return date
     * @author 王孝元
     */
    public static Date strToShortDate(String str) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        if (str != null && !str.trim().equals("")) {
            try {
                date = format.parse(str);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        return date;
    }

    /**
     * 字符串转换成日期
     *
     * @param str
     * @return date
     * @author 王孝元
     */
    public static Date strToLongDate(String str) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        if (str != null && !str.trim().equals("")) {
            try {
                date = format.parse(str);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        return date;
    }

    /**
     * 生成商户订单号
     *
     * @param orderCode
     * @param cycle
     * @return
     * @作者 JiangQT
     * @日期 2017年1月17日
     */
    public static String produceBusinessCode(String orderCode, Integer cycle) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        return orderCode.substring(orderCode.length() - 6, orderCode.length()) + sdf.format(new Date()) + AppUtil.getRandNum(2) + cycle;
    }

    /**
     * 获取合同编号
     *
     * @param type
     * @return
     * @作者 JiangQT
     * @日期 2017年3月20日
     */
    public static String buildContractNo(int type, int number) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyMM");
        StringBuilder str = new StringBuilder(number + "");
        int len = 5 - str.length();
        for (int i = 0; i < len; i++) {
            str.insert(0, "0");
        }
        return type + sdf.format(new Date()) + str;
    }

    /**
     * 计算统一出房价
     *
     * @param hi_keepMoney 存房价
     * @param rentDay      免租期(20|30|20)
     * @param year         年限
     * @param payType      支付类型
     * @param sumMoney     业绩基础数（默认2400）
     * @return
     * @author 陈智颖
     * @date Mar 28, 2017 6:31:17 PM
     */
    public static String houseMoney(Double hi_keepMoney, String rentDay, Integer year, String payType, Integer sumMoney) {
        // 获取properties路劲
        StringBuilder money = new StringBuilder();
        String[] rentDays = rentDay.split("\\|");
        Integer aMoney = 2400;
        if (sumMoney != null) {
            aMoney = sumMoney;
        }
        for (int i = 0; i < year; i++) {
            Double days = 0.0;
            if (i < rentDays.length) {
                days = Double.valueOf(rentDays[i]);
            }
            Integer sumDay = 0;
            double moneys = (hi_keepMoney + (aMoney - hi_keepMoney / 30 * (days - sumDay)) / 12 + 100 * i) * (1 + (6.0 / 100));
            switch (payType) {
                case "月付":
                    moneys += 50;
                    break;
                case "半年付":
                    moneys = moneys * (1 - (3.0 / 100));
                    break;
                case "年付":
                    moneys = moneys * (1 - (6.0 / 100));
                    break;
                case "一次性付":

                    break;
            }
            moneys = moneys / 100;
            String moneystr = String.valueOf(moneys).substring(String.valueOf(moneys).indexOf("."), String.valueOf(moneys).length());
            if (0 < Double.valueOf(moneystr) && Double.valueOf(moneystr) < 0.25) {
                moneys = Math.round(moneys) * 100;
            } else if (0.25 <= Double.valueOf(moneystr) && Double.valueOf(moneystr) < 0.75) {
                moneys = (int) moneys * 100 + 50;
            } else if (Double.valueOf(moneystr) >= 0.75) {
                moneys = Math.round(moneys) * 100;
            }
            money.append((int) moneys).append("-");
        }
        money = new StringBuilder(money.substring(0, money.length() - 1));

        return money.toString();
    }

    /**
     * 计算前几天
     *
     * @param days
     * @author 王孝元
     */
    public static String getDateBefore(int days) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DATE, -days);
        return sdf_date.format(calendar.getTime()) + " 00:00:00";
    }

    /**
     * 计算前几天
     *
     * @param days
     * @author 王孝元
     */
    public static String getDateAfter(int days) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DATE, days);
        return sdf_date.format(calendar.getTime()) + " 23:59:59";
    }

    /**
     * javaSwift通信
     *
     * @author 陈智颖
     * @date Apr 21, 2017 11:28:34 AM
     */
    public static Boolean javaSwift(String deviceStr, String message) {
        try {
            int badge = 1; // 图标小红圈的数值
            String sound = "default"; // 铃音
            String msgCertificatePassword = "LoveYouAgan001";// 导出证书时设置的密码
            // String message = "test push message to ios device";

            List<String> tokens = new ArrayList<>();
            tokens.add(deviceStr);
            String path = System.getProperty("evan.webapp") + "/resources/p12/";
            // String certificatePath = requestRealPath
            // + "/WEB-INF/classes/certificate/msg.p12";
            // java必须要用导出p12文件 php的话是pem文件
            String certificatePath = path + "ERP.p12";
            boolean sendCount = true;

            PushNotificationPayload payload = new PushNotificationPayload();
            payload.addAlert(message); // 消息内容
            payload.addBadge(badge);

            // payload.addCustomAlertBody(msgEX);
            if (null == sound || "".equals(sound)) {
                payload.addSound(sound);
            }

            PushNotificationManager pushManager = new PushNotificationManager();
            // true：表示的是产品测试推送服务 false：表示的是产品发布推送服务

            pushManager.initializeConnection(new AppleNotificationServerBasicImpl(certificatePath, msgCertificatePassword, false));
            List<PushedNotification> notifications = new ArrayList<>();
            // 开始推送消息
            if (sendCount) {
                Device device = new BasicDevice();
                device.setToken(deviceStr);
                PushedNotification notification = pushManager.sendNotification(device, payload, true);
                notifications.add(notification);
            } else {
                List<Device> devices = new ArrayList<>();
                for (String token: tokens) {
                    devices.add(new BasicDevice(token));
                }
                notifications = pushManager.sendNotifications(payload, devices);
            }

            List<PushedNotification> failedNotification = PushedNotification.findFailedNotifications(notifications);
            List<PushedNotification> successfulNotification = PushedNotification.findSuccessfulNotifications(notifications);
            int failed = failedNotification.size();
            int successful = successfulNotification.size();
            System.out.println("zsl==========成功数：" + successful);
            System.out.println("zsl==========失败数：" + failed);
            pushManager.stopConnection();
            System.out.println("zsl==========消息推送完毕");
            return successful > 0;
        } catch (CommunicationException | KeystoreException | InvalidDeviceTokenFormatException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 电子合同md5签名
     *
     * @param contractMd5 电子合同类
     * @return
     * @author 陈智颖
     * @date Apr 29, 2017 4:31:26 PM
     */
    public static String contractMD5(ContractMd5 contractMd5) {
        if (contractMd5.getHi_code() == null || contractMd5.getHi_code().trim().equals("null")) {
            return "error-hi_code";
        }
        if (contractMd5.getCc_name() == null || contractMd5.getCc_name().trim().equals("null")) {
            return "error-cc_name";
        }
        if (contractMd5.getCc_cardNum() == null || contractMd5.getCc_cardNum().trim().equals("null")) {
            return "error-cc_cardNum";
        }
        if (contractMd5.getContractBody_StartTOEnd() == null || contractMd5.getContractBody_StartTOEnd().trim().equals("null")) {
            return "error-contractBody_StartTOEnd";
        }
        if (contractMd5.getContractBody_Rent() == null) {
            return "error-contractBody_Rent";
        }
        if (contractMd5.getContractBody_PayStyle() == null || contractMd5.getContractBody_PayStyle().trim().equals("null")) {
            return "error-contractBody_PayStyle";
        }
        if (contractMd5.getContractBody_Pay() == null || contractMd5.getContractBody_Pay().trim().equals("null")) {
            return "error-contractBody_Pay";
        }
        if (contractMd5.getContractBody_Depslit() == null || contractMd5.getContractBody_Depslit().trim().equals("null")) {
            return "error-contractBody_Depslit";
        }
        if (contractMd5.getContractBody_FreeTime() == null || contractMd5.getContractBody_FreeTime().trim().equals("null")) {
            return "error-contractBody_FreeTime";
        }
        if (contractMd5.getContractBody_Service() == null || contractMd5.getContractBody_Service().trim().equals("null")) {
            return "error-contractBody_Service";
        }
        if (contractMd5.getContractBody_GuaranteeCost() == null || contractMd5.getContractBody_GuaranteeCost().trim().equals("null")) {
            return "error-contractBody_GuaranteeCost";
        }
        if (contractMd5.getContractBody_RentPlus() == null || contractMd5.getContractBody_RentPlus().trim().equals("null")) {
            return "error-contractBody_RentPlus";
        }
        if (contractMd5.getContractBody_Increasing() == null || contractMd5.getContractBody_Increasing().trim().equals("null")) {
            return "error-contractBody_Increasing";
        }
        if (contractMd5.getContractObject_FillTime() == null || contractMd5.getContractObject_FillTime().trim().equals("null")) {
            return "error-contractObject_FillTime";
        }
        if (contractMd5.getContractBody_RentRate_A() == null || contractMd5.getContractBody_RentRate_A().trim().equals("null")) {
            return "error-contractBody_RentRate_A";
        }
        if (contractMd5.getContractBody_RentRate_B() == null || contractMd5.getContractBody_RentRate_B().trim().equals("null")) {
            return "error-contractBody_RentRate_B";
        }
        if (contractMd5.getContractObject_Other() == null || contractMd5.getContractObject_Other().trim().equals("null")) {
            return "error-contractObject_Other";
        }
        if (contractMd5.getContractObject_Contractor() == null || contractMd5.getContractObject_Contractor().trim().equals("null")) {
            return "error-contractObject_Contractor";
        }
        if (contractMd5.getContractObject_CustomerSign() == null || contractMd5.getContractObject_CustomerSign().trim().equals("null")) {
            return "error-contractObject_CustomerSign";
        }
        String str = contractMd5.getHi_code().trim() + contractMd5.getCc_name().trim() + contractMd5.getCc_cardNum().trim() + contractMd5.getContractBody_StartTOEnd().trim() + contractMd5.getContractBody_Rent() + contractMd5.getContractBody_PayStyle().trim() + contractMd5.getContractBody_Pay().trim() + contractMd5.getContractBody_Depslit().trim() + contractMd5.getContractBody_FreeTime().trim() + contractMd5.getContractBody_Service().trim() + contractMd5.getContractBody_GuaranteeCost().trim() + contractMd5.getContractBody_RentPlus().trim() + contractMd5.getContractBody_Increasing().trim() + contractMd5.getContractObject_FillTime().trim() + contractMd5.getContractBody_RentRate_A().trim()
                + contractMd5.getContractBody_RentRate_B().trim() + contractMd5.getContractObject_Other().trim() + contractMd5.getContractObject_Contractor().trim() + contractMd5.getContractObject_CustomerSign().trim();
        return MD5Util.GetMD5Code(str);
    }


    /**
     * 自动补充/
     *
     * @param freeTime
     * @return
     */
    public static String[] reSetParam(String freeTime) {
        if (!AppUtil.isNotNull(freeTime)) {
            return null;
        }
        int length = freeTime.length() - freeTime.replace("|", "").length() + 1;
        if (length == 0) {
            length = 5;
        }
        String[] freeTimes = new String[length];
        if ("".equals(freeTime)) {
            for (int i = 0; i < length; i++) {
                freeTimes[i] = "/";
            }
        } else {
            if (freeTime.contains("|")) {
                String[] freeTimeArr = freeTime.split("\\|");
                System.arraycopy(freeTimeArr, 0, freeTimes, 0, freeTimeArr.length);
                if (freeTimeArr.length < length) {
                    for (int i = freeTimeArr.length; i < length; i++) {
                        freeTimes[i] = "/";
                    }
                }
            } else {
                freeTimes[0] = freeTime;
                for (int i = 1; i < length; i++) {
                    freeTimes[i] = "/";
                }
            }
        }
        return freeTimes;
    }

    /**
     * 整数格式化 + 截取两位小数（不四舍五入）
     *
     * @param value
     * @return
     */
    public static String valueFormatWithTwo(Double value) {
        if (value == null) {
            return "0.00";
        }
        BigDecimal bd = new BigDecimal(value);
        DecimalFormat df = new DecimalFormat("##,###,##0.00");//小数点点不够两位补0，例如："0" --> 0.00（个位数补成0因为传入的是0则会显示成：.00，所以各位也补0；）
        return df.format(bd.setScale(2, BigDecimal.ROUND_DOWN));
    }

    public static Calendar getCalendar(Date date, int field, int amount) {
        Calendar cale = Calendar.getInstance();
        cale.setTime(date);
        cale.add(field, amount);
        return cale;
    }

    /**
     * 四舍五入保留两位小数
     *
     * @param dou
     * @return
     */
    public static double returnDouble(Double dou) {
        return new BigDecimal(dou).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
    }

    /**
     * 房屋招租状态
     *
     * @param
     * @return
     * @author 陈智颖
     * @create 25/11/17 11:03
     **/
    public static Map<String, String> ForRentState(int state) {
        Map<String, String> map = new HashMap<>();
        String stateStr = "未招租";
        String stateColor = "#F9A755";
        switch (state) {
            case 1001:
                stateStr = "新存招租";
                stateColor = "#02D49F";
                break;
            case 1002:
                stateStr = "转租招租";
                stateColor = "#02D49F";
                break;
            case 1003:
                stateStr = "退租招租";
                stateColor = "#02D49F";
                break;
            case 1004:
                stateStr = "到期招租";
                stateColor = "#02D49F";
                break;
            case 1005:
                stateStr = "强收招租";
                stateColor = "#02D49F";
                break;
            case 1006:
                stateStr = "换房招租";
                stateColor = "#02D49F";
                break;
            case 1020:
                stateStr = "停止招租";
                stateColor = "#FF6666";
                break;
            case 1021:
                stateStr = "已解约";
                stateColor = "#FF6666";
                break;
            case 1022:
                stateStr = "未接房";
                stateColor = "#FF6666";
                break;
            case 2000:
                stateStr = "暂停招租";
                stateColor = "#F9A755";
                break;
            default:
                break;
        }
        map.put("stateStr", stateStr);
        map.put("stateColor", stateColor);
        return map;
    }

    /**
     * 生成room_code
     *
     * @param type
     * @return
     * @作者 shenhx
     * @日期 2018年1月27日
     */
    public static String genrateRoomCode(int type, int number) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyMM");
        StringBuilder str = new StringBuilder(number + "");
        int len = 5 - str.length();
        for (int i = 0; i < len; i++) {
            str.insert(0, "0");
        }
        return type + sdf.format(new Date()) + str;
    }

}
