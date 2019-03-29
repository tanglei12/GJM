package com.gjp.model;

import java.util.List;

/**
 * @author 陈智颖
 * @create 2017-11-30 14:55
 **/
public class ContractTypeTileVo {

    // 标题
    private String typeTitle;
    // 内容
    private List<String> contractTypeListVos;

    public String getTypeTitle() {
        return typeTitle;
    }

    public void setTypeTitle(String typeTitle) {
        this.typeTitle = typeTitle;
    }

    public List<String> getContractTypeListVos() {
        return contractTypeListVos;
    }

    public void setContractTypeListVos(List<String> contractTypeListVos) {
        this.contractTypeListVos = contractTypeListVos;
    }
}
