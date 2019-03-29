package com.gjp.model;

import lombok.Data;

import java.util.Date;

/**
 * 订单商品详情
 *
 * @author JiangQT
 */
@Data
public class OrderDetailVo {

    // 订单详情ID
    private Integer detail_id;
    // 订单号
    private String order_sn;
    // 订单详情类型{1:"商品",2:"抵扣",3:"人工费"}#其他的自行添加
    private Integer detail_type;
    // 商品收支类型{1:"收",2:"支"}(相对公司而言)
    private Integer detail_balpay;
    // 商品收支类型{1:"收",2:"支"}(相对公司而言)
    private Integer detail_status;
    // 商品类型{1:"租金",2:"服务",3:"结算",4:"定金",5:"充值"}
    private Integer product_type;
    // 商品号
    private String product_sn;
    // 商品号
    private String product_sn_in;
    // 商品名称
    private String product_name;
    // 商品详情
    private String product_detail;
    // 商品价格
    private Double product_price;
    // 购买数量
    private Integer product_number;
    // 小计金额
    private Double detail_subtotal;
    // 备注
    private String detail_remarks;
    // 创建人
    private Integer detail_operator;
    // 创建人
    private String detail_operator_name;
    // 订单生成时间
    private Date detail_create_time;


}
