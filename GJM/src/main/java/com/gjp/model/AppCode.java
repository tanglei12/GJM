package com.gjp.model;

import lombok.Data;

/**
 * 版本号
 *
 * @author chen
 * @date Apr 23, 2017 1:57:27 PM
 */
@Data
public class AppCode {

    // app版本控制编码
    private Integer ap_id;
    // android或者ios
    private String ap_type;
    // 版本号
    private String ap_code;
    // app地址
    private String ap_href;
    // 更新说明
    private String ap_content;
    // 机器版本号
    private Integer ab_versionCode;

}
