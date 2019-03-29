package com.gjp.model;

import lombok.Data;

@Data
public class ApartmentType {

    //类型名称
    private String ht_name;
    //类型值
    private String ht_value;
    //类父级编号
    private Integer ht_parentId;
    //类型编号
    private Integer ht_id;

}
