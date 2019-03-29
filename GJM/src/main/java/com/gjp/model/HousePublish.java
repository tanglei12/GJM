package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * @author tanglei
 * @description 房源发布
 * @date Created in 2018/1/15
 */
@Data
public class HousePublish {
    //主键
    private Integer hp_id;
    //房源code
    private String hi_code;
    //渠道code
    private String hpc_code;
    //状态{10:"审核中",11:"审核未通过",20:"未上架",21:"已上架",22:"已下架"}
    private int hp_status;
    //20:"未上架",21:"已上架",22:"已下架"
    private int hp_shelf_status;
    //未通过原因
    private String hp_content;
    //审核人id
    private Integer em_id;
    //审核时间
    private Date hp_check_time;
    //上架时间
    private Date hp_arrival_time;
    //创建时间（发布时间）
    private Date hp_create_time;

    /**房源发布渠道**/
    //主键
    private Integer hpc_id;
    //房源渠道名称
    private String hpc_name;
    //渠道状态{1:"开启",2:"关闭"}
    private Integer hpc_status;
    //创建时间
    private Date hpc_create_time;
}
