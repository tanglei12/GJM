package com.gjp.model;

import lombok.Data;

@Data
public class HousingValuation {

    private Integer hv_id;
    private Integer propertyInfo_Id;
    private Integer hi_houseS;
    private Integer hi_houseT;
    private Integer hi_houseW;
    private Integer em_id;
    private Float hv_traffic;
    private Float hv_position;
    private Float hv_env;
    private Float hv_size;
    private Float hv_customer;
    private Float hv_active;
    private Float hv_max;

}
