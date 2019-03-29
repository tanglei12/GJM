package com.gjp.util;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 * 数据库恢复备份数据
 * @author 申洪喜
 * @create 2017-11-18 10:34
 **/
public class RecoveryData {

    public static void main(String[] args) {
        Connection con = null;
        Statement st  = null;
        ResultSet rs  = null;
        try {
            // 获得MySQL驱动的实例
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            // 获得连接对象(提供：地址，用户名，密码)
            con = DriverManager.getConnection("jdbc:mysql://120.26.216.193:3306/GJP_assets?useUnicode=true&amp;characterEncoding=UTF-8;zeroDateTimeBehavior=convertToNull","root", "GJP!@#$%");

            if (!con.isClosed())
                System.out.println("Successfully connected ");
            else
                System.out.println("failed connected");

            //建立一个Statement，数据库对象
            st = con.createStatement();

            BufferedReader bufReader = new BufferedReader(new InputStreamReader(new FileInputStream(new File("C:/Users/hu/Documents/Tencent Files/563441715/FileRecv/GJP_business20171115000101/20171115000103.txt"))));//数据流读取文件

            StringBuffer strBuffer = new StringBuffer();
            String empty = "";
            String tihuan = "";
            for (String temp = null; (temp = bufReader.readLine()) != null; temp = null) {
                st.execute(temp);
            }
            // 关闭链接
            con.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch(Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
    }
}
