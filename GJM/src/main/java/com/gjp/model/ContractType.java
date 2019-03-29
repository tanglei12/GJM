package com.gjp.model;

import lombok.Data;

/**
 * 合同类型
 *
 * @author zoe
 */
@Data
public class ContractType {

    // 类型ID
    private Integer contractType_Id;
    // 类型CODE
    private Integer contractType_Code;
    // 类型名称
    private String contractType_Name;
    // 类型值
    private String contractType_Value;
    // 父级编号
    private Integer contractType_ParentId;
    // 排序
    private Integer contractType_Order;
    // 备注
    private String contractType_Remarks;
    // 是否启用（1：启用、2：启用且不可选择、3：关闭）
    private Integer contractType_isOpen;

}
