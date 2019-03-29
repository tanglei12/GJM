package com.gjp.util.sms;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

/**
 * <p>
 * <date>2012-03-01</date><br/>
 * <span>软维提供的JAVA接口信息（短信，彩信）调用API</span><br/>
 * <span>----------基础访问方法-------------</span>
 * </p>
 *
 * @author LIP
 * @version 1.0.1
 */
public class SmsClientAccessTool {

    private static SmsClientAccessTool smsClientToolInstance;

    /**
     * 采用单列方式来访问操作
     *
     * @return
     */
    public static synchronized SmsClientAccessTool getInstance() {

        if (smsClientToolInstance == null) {
            smsClientToolInstance = new SmsClientAccessTool();
        }
        return smsClientToolInstance;
    }

    /**
     * <p>
     * POST方法
     * </p>
     *
     * @param sendUrl       ：访问URL
     * @param sendParam     ：参数串
     * @param backEncodType ：返回的编码
     * @return
     */
    public String doAccessHTTPPost(String sendUrl, String sendParam, String backEncodType) {

        PrintWriter out = null;
        BufferedReader in = null;
        StringBuilder result = new StringBuilder();
        try {
            URL realUrl = new URL(sendUrl);
            // 打开和URL之间的连接
            URLConnection conn = realUrl.openConnection();
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 获取URLConnection对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());
            // 发送请求参数
            out.print(sendParam);
            // flush输出流的缓冲
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(conn.getInputStream(), backEncodType));
            String line;
            while ((line = in.readLine()) != null) {
                result.append(line);
            }
        } catch (Exception e) {
            System.out.println("发送 POST 请求出现异常！" + e);
            e.printStackTrace();
        }
        // 使用finally块来关闭输出流、输入流
        finally {
            try {
                if (out != null) {
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return result.toString();
    }

    public String doAccessHTTPGet(String sendUrl, String backEncodType) {

        StringBuilder receive = new StringBuilder();
        BufferedReader in = null;
        try {
            if (backEncodType == null || backEncodType.equals("")) {
                backEncodType = "UTF-8";
            }

            URL url = new URL(sendUrl);
            HttpURLConnection URLConn = (HttpURLConnection) url
                    .openConnection();

            URLConn.setDoInput(true);
            URLConn.setDoOutput(true);
            URLConn.connect();
            URLConn.getOutputStream().flush();
            in = new BufferedReader(new InputStreamReader(URLConn
                    .getInputStream(), backEncodType));

            String line;
            while ((line = in.readLine()) != null) {
                receive.append(line).append("\r\n");
            }

        } catch (IOException e) {
            receive.append("访问产生了异常-->").append(e.getMessage());
            e.printStackTrace();
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (java.io.IOException ex) {
                    ex.printStackTrace();
                }
            }
        }

        return receive.toString();
    }
}
