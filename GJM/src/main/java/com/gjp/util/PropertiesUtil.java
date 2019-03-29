package com.gjp.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

/**
 * 配置文件获取工具
 *
 * @author JiangQt
 * @version 2017年6月28日上午11:57:03
 */
public class PropertiesUtil {

    /**
     * 获取配置
     *
     * @param filePath
     * @return
     * @author JiangQt
     * @version 2017年6月28日上午11:57:18
     */
    public static Properties getProperties(String filePath) {
        Properties p = new Properties();
        try {
            InputStream is = PropertiesUtil.class.getResourceAsStream(filePath);
            p.load(new InputStreamReader(is, "UTF-8"));
            is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return p;
    }

}
