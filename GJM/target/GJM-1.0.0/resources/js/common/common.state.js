/** 返回房屋状态*/
function returnHouseState(param) {
    var _data = {};
    switch (param) {
        case 'free' :
            _data.title = "未租";
            _data.color = "ok";
            break;
        case 'rental' :
            _data.title = "已租";
            _data.color = "error";
            break;
        case 'expire' :
            _data.title = "托管解约";
            _data.color = "disabled";
            break;
        default:
            _data.title = "未发布";
            _data.color = "hint";
            break;
    }
    return _data;
}

/** 返回房屋招租状态*/
function returnHouseIsForRent(param) {
    var data = {};
    data.list = {0: "停止招租", 1: "正在招租", 2: "暂停招租"};
    data.text = data.list[param];
    switch (param) {
        case 0:
            data.style = "error";
            break;
        case 1 :
            data.style = "next";
            break;
        case 2 :
            data.style = "hint";
            break;
        default:
            data.style = "hint";
            break;
    }
    return data;
}

/** 返回房屋招租状态*/
function returnHouseForRentState(param) {
    var data = {};
    data.list = {
        1001: "新存招租",
        1002: "转租招租",
        1003: "退租招租",
        1004: "到期招租",
        1005: "强收招租",
        1006: "换房招租",
        1020: "停止招租",
        1021: "已解约",
        1022: "未接房",
        2000: "暂停招租"
    };
    data.text = data.list[param];
    switch (param) {
        case 1001 :
            data.style = "ok";
            break;
        case 1002 :
            data.style = "ok";
            break;
        case 1003 :
            data.style = "ok";
            break;
        case 1004 :
            data.style = "ok";
            break;
        case 1005 :
            data.style = "ok";
            break;
        case 1006 :
            data.style = "ok";
            break;
        case 1020 :
            data.style = "error";
            break;
        case 1021 :
            data.style = "error";
            break;
        case 2000 :
            data.style = "hint";
            break;
    }
    return data;
}

/** 返回房屋托管状态*/
function returnHouseTGState(param) {
    var _data = {};
    switch (param) {
        case "":
            _data.title = "未签";
            _data.color = "error";
            break;
        case "未签合同":
            _data.title = "未签";
            _data.color = "error";
            break;
        case "已签合同":
            _data.title = "已签";
            _data.color = "next";
            break;
        default:
            _data.title = "完善中";
            _data.color = "hint";
            break;
    }
    return _data;
}

/** 返回房屋租赁状态*/
function returnHouseZLState(param) {
    var _data = {};
    switch (param) {
        case "":
            _data.title = "未签";
            _data.color = "error";
            break;
        case "未签合同":
            _data.title = "未签";
            _data.color = "error";
            break;
        case "已签合同":
            _data.title = "已签";
            _data.color = "next";
            break;
        default:
            _data.title = "完善中";
            _data.color = "hint";
            break;
    }
    return _data;
}

// 合同=========================

/** 返回合同状态*/
function returnContractState(param) {
    var data = {};
    data.list = {0: "合同状态", 1: "审核中", 2: "已生效", 3: "已失效", 4: "已作废"};
    data.text = data.list[param];
    switch (param) {
        case 1 :
            data.style = "hint";
            break;
        case 2 :
            data.style = "ok";
            break;
        case 3 :
            data.style = "error";
            break;
        case 4 :
            data.style = "error";
            break;
    }
    return data;
}

/** 返回合同操作状态*/
function returnContractOptionState(param) {
    var data = {};
    data.list = {
        0: "合同状态",
        101: "编辑中",
        102: "待审核",
        1021: "待结算",
        103: "审核未通过",
        104: "待复核",
        105: "复核未通过",
        106: "已复核",
        107: "已作废",
        201: "已续约",
        202: "已改签",
        300: "到期",
        301: "到期申请",
        302: "到期处理中",
        303: "到期处理完成",
        401: "解约申请",
        402: "解约中",
        403: "解约完成",
        501: "转租申请",
        502: "转租中",
        503: "转租完成",
        601: "强退申请",
        602: "强退中",
        603: "强退完成",
        701: "强收申请",
        702: "强收中",
        703: "强收完成",
        801: "代偿申请",
        802: "代偿中",
        803: "代偿完成",
        901: "换房申请",
        902: "换房中",
        903: "换房成功",
    };
    data.title = data.list[param];
    data.text = data.list[param];
    switch (returnNumber(param)) {
        case 101 :
            data.color = "hint";
            data.style = "hint";
            data.image = "sh-iocn-bj";
            break;
        case 102 :
            data.color = "next";
            data.style = "next";
            data.image = "sh-iocn-dsh";
            break;
        case 1021 :
            data.color = "next";
            data.style = "next";
            data.image = "sh-iocn-dsh";
            break;
        case 103 :
            data.color = "error";
            data.style = "error";
            data.image = "sh-iocn-wtg";
            break;
        case 104 :
            data.color = "next";
            data.style = "next";
            data.image = "sh-iocn-dfh";
            break;
        case 105 :
            data.color = "error";
            data.style = "error";
            data.image = "sh-iocn-wtg";
            break;
        case 106 :
            data.color = "ok";
            data.style = "ok";
            data.image = "sh-iocn-sx";
            break;
        case 107 :
            data.color = "error";
            data.style = "error";
            data.image = "";
            break;
        case 201 :
            data.color = "next";
            data.style = "next";
            break;
        case 202 :
            data.color = "error";
            data.style = "error";
            break;
        case 300 :
            data.color = "next";
            data.style = "next";
            data.image = "sh-iocn-dsh";
            break;
        case 301 :
            data.color = "next";
            data.style = "next";
            break;
        case 302 :
            data.color = "next";
            data.style = "next";
            break;
        case 303 :
            data.color = "next";
            data.style = "next";
            break;
        case 401 :
            data.color = "next";
            data.style = "next";
            break;
        case 402 :
            data.color = "next";
            data.style = "next";
            break;
        case 403 :
            data.color = "next";
            data.style = "next";
            break;
        case 501 :
            data.color = "next";
            data.style = "next";
            break;
        case 502 :
            data.color = "next";
            data.style = "next";
            break;
        case 503 :
            data.color = "next";
            data.style = "next";
            break;
        case 601 :
            data.color = "next";
            data.style = "next";
            break;
        case 602 :
            data.color = "next";
            data.style = "next";
            break;
        case 603 :
            data.color = "next";
            data.style = "next";
            break;
        case 701 :
            data.color = "next";
            data.style = "next";
            break;
        case 702 :
            data.color = "next";
            data.style = "next";
            break;
        case 703 :
            data.color = "next";
            data.style = "next";
            break;
        case 801 :
            data.color = "next";
            data.style = "next";
            break;
        case 802 :
            data.color = "next";
            data.style = "next";
            break;
        case 803 :
            data.color = "next";
            data.style = "next";
            break;
        case 901 :
            data.color = "next";
            data.style = "next";
            break;
        case 902 :
            data.color = "next";
            data.style = "next";
            break;
        case 903 :
            data.color = "next";
            data.style = "next";
            break;
    }
    return data;
}

/** 返回合同扩展状态*/
function returnContractExtendState(param) {
    var data = {};
    data.list = {
        10: '新存房',
        12: '续约存房',
        13: '改签存房',
        20: '新出房',
        21: '改签出房',
        22: '续约出房',
        23: '到期出房',
        25: '转租出房',
        26: '退租出房',
        27: '强收出房',
        29: '换房出房'
    };
    data.text = data.list[param];
    switch (param) {
        case 10 :
            data.style = "ok";
            break;
        case 12 :
            data.style = "next";
            break;
        case 13 :
            data.style = "next";
            break;
        case 20 :
            data.style = "ok";
            break;
        case 21 :
            data.style = "next";
            break;
        case 22 :
            data.style = "next";
            break;
        case 23 :
            data.style = "next";
            break;
        case 25 :
            data.style = "next";
            break;
        case 26 :
            data.style = "next";
            break;
        case 27 :
            data.style = "next";
            break;
        case 29 :
            data.style = "next";
            break;
    }
    return data;
}

/** 返回合同扩展状态*/
function returnContractExtendStateStr(param) {
    var data = {};
    data.list = {
        10: '新存房',
        12: '续约存房',
        13: '改签存房',
        20: '新出房',
        21: '改签出房',
        22: '续约出房',
        23: '到期出房',
        25: '转租出房',
        26: '退租出房',
        27: '强收出房',
        29: '换房出房'
    };
    data.text = data.list[param];
    switch (param) {
        case "新存房" :
            data.style = "ok";
            break;
        case "续约存房" :
            data.style = "next";
            break;
        case "改签存房" :
            data.style = "error";
            break;
        case "新出房" :
            data.style = "ok";
            break;
        case "到期出房" :
            data.style = "next";
            break;
        case "续约出房" :
            data.style = "next";
            break;
        case "转租出房" :
            data.style = "next";
            break;
        case "退租出房" :
            data.style = "next";
            break;
        case "强收出房" :
            data.style = "next";
            break;
        case "换房出房" :
            data.style = "next";
            break;
    }
    return data;
}

// 记录=========================

/** 返回执行记录类型*/
function returnImplRecordType(param) {
    var data = {};
    data.list = {
        1010: "招租",
        1011: "租金",
        1012: "维修",
        1013: "续约",
        1014: "分配",
        1015: "调价",
        1016: "申请",
        1020: "其他",
        1021: "证据",
        1022: "作废",
        1023: "协议"
    };
    data.text = data.list[param];
    data.title = data.list[param];
    data.color = "next";
    data.style = "next";
    return data;
}

/** 返回执行记录类型*/
function returnAgreementState(param) {
    var data = {};
    data.list = {1: "待签署", 2: "已签署", 3: "已拒绝"};
    data.text = data.list[param];
    switch (param) {
        case 1:
            data.style = "hint";
            break;
        case 2:
            data.style = "next";
            break;
        case 3:
            data.style = "error";
            break;
    }
    return data;
}

/** 返回合约状态*/
function returnCancelContractState(param) {
    var _data = {};
    switch (param) {
        case "待审核":
            _data.title = "待审核";
            _data.color = "next";
            break;
        case "审核未通过":
            _data.title = "审核未通过";
            _data.color = "error";
            break;
        case "待交接":
            _data.title = "待交接";
            _data.color = "next";
            break;
        case "待结算":
            _data.title = "待结算";
            _data.color = "next";
            break;
        case "结算完成":
            _data.title = "结算完成";
            _data.color = "hint";
            break;
        case "待复审":
            _data.title = "结算审核";
            _data.color = "hint";
            break;
        case "复审未通过":
            _data.title = "结算审核未通过";
            _data.color = "error";
            break;
        case "待复核":
            _data.title = "待复核";
            _data.color = "next";
            break;
        case "复核未通过":
            _data.title = "复核未通过";
            _data.color = "error";
            break;
        case "完成":
            _data.title = "完成";
            _data.color = "ok";
            break;
        case "取消":
            _data.title = "取消";
            _data.color = "error";
            break;
    }
    return _data;
}

// 订单,账单=========================

/**
 * 返回合同订单类型
 * @param param
 * @returns {{}}
 */
function returnOrderType(param) {
    var data = {};
    data.list = {
        0: "订单类型",
        1: "租金",
        2: "服务",
        3: "结算",
        4: "定金",
        5: "充值",
        6: "退款",
    };
    data.text = data.list[returnNumber(param)];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'next';
            break;
        case 2:
            data.style = 'next';
            break;
        case 3:
            data.style = 'next';
            break;
        case 4:
            data.style = 'next';
            break;
        case 5:
            data.style = 'next';
            break;
        case 6:
            data.style = 'next';
            break;
        default :
            data.text = '其他';
            data.style = 'hint';
            break;
    }
    return data;
}

/**
 * 返回合同订单类型
 * @param param
 * @returns {{}}
 */
function returnOrderBalPay(param) {
    var data = {};
    data.list = {
        0: "收支类型",
        1: "收入",
        2: "支出",
    };
    data.text = data.list[returnNumber(param)];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'ok';
            break;
        case 2:
            data.style = 'error';
            break;
        default :
            data.text = '其他';
            data.style = 'hint';
            break;
    }
    return data;
}

function returnOrderTradeObject(param) {
    var data = {};
    data.list = {0: "交易对象", 1: "客户", 2: "管家", 3: "门店", 4: "租客", 5: "房东", 6: "用户"};
    data.text = data.list[returnNumber(param)];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'next';
            break;
        case 2:
            data.style = 'next';
            break;
        case 3:
            data.style = 'next';
            break;
        case 4:
            data.style = 'next';
            break;
        case 5:
            data.style = 'next';
            break;
        case 6:
            data.style = 'next';
            break;
        default :
            data.text = '其他';
            data.style = 'hint';
            break;
    }
    return data;
}

/**
 * 返回合同订单周期付款方式
 * @param param
 * @returns {{}}
 */
function returnOrderCyclePayWay(param) {
    var data = {};
    data.list = {
        0: "支付方式",
        // 1: "月付",
        // 3: "季付",
        // 6: "半年付",
        // 12: "年付",
        "月付": "月付",
        "季付": "季付",
        "半年付": "半年付",
        "年付": "年付",
    };
    data.text = data.list[param];
    switch (param) {
        case 1:
        case "月付":
            data.style = '';
            break;
        case 3:
        case "季付":
            data.style = '';
            break;
        case 6:
        case "半年付":
            data.style = '';
            break;
        case 12:
        case "年付":
            data.style = '';
            break;
        default :
            data.text = param;
            data.style = 'hint';
            break;
    }
    return data;
}

/**
 * 返回合同订单周期付款方式
 * @param param
 * @returns {{}}
 */
function returnOrderContractType(param) {
    var data = {};
    data.list = {
        0: "合同类型",
        201: "托管合同",
        202: "租赁合同",
    };
    data.text = data.list[param];
    switch (param) {
        case 201:
            data.style = 'next';
            break;
        case 202:
            data.style = 'ok';
            break;
        default :
            data.style = 'hint';
            break;
    }
    return data;
}

/**
 * 返回合同订单合同伙伴
 * @param param
 * @returns {{}}
 */
function returnOrderPartner(param) {
    var data = {};
    data.list = {
        0: "金融机构",
        "管家婆": "管家婆",
        "58分期": "58分期",
        "会分期": "会分期",
        "寓管家": "寓管家",
        "租了么": "租了么",
        "乐首付": "乐首付",
    };
    data.text = data.list[param];
    switch (param) {
        case "管家婆":
            data.style = 'next';
            break;
        case "58分期":
            data.style = 'ok';
            break;
        case "会分期":
            data.style = 'ok';
            break;
        case "租了么":
            data.style = 'ok';
            break;
        case "乐首付":
            data.style = 'ok';
            break;
        case "寓管家":
            data.style = 'ok';
            break;
        default :
            data.text = param;
            data.style = 'hint';
            break;
    }
    return data;
}

/**
 * 返回合同订单状态
 * @param param
 * @param custom
 * @returns {{}}
 */
function returnOrderOptionState(param) {
    var data = {};
    data.list = {
        0: "订单状态",
        1: "审核中",
        2: "待支付",
        3: "已完结",
        4: "已取消",
        9: "第三方",
        // 10: "已转租",
        // 11: "已退租",
        // 12: "已解约",
        // 13: "已清退",
        // 14: "已代偿",
        // 15: "已换房",
        // 20: "已违约"
    };
    data.text = data.list[param];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'hint';
            break;
        case 2:
            data.style = 'next';
            break;
        case 3:
            data.style = 'ok';
            break;
        case 4:
            data.style = 'error';
            break;
        case 5:
            data.style = 'error';
            break;
        default :
            data.text = '其他';
            data.style = 'error';
            break;
    }
    return data;
}

/**
 * 返回合同订单状态
 * @param param
 * @param custom
 * @returns {{}}
 */
function returnContractBillOut(param) {
    var data = {};
    data.list = {
        0: "出账状态",
        1: "未出账",
        2: "已出账",
    };
    data.text = data.list[param];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'next';
            break;
        case 2:
            data.style = 'ok';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}

function returnOrderStatus(param) {
    var data = {};
    data.list = {0: "订单状态", 1: "审核中", 2: "未支付", 3: "已支付", 4: "交易关闭"};
    data.text = data.list[param];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'hint';
            break;
        case 2:
            data.style = 'next';
            break;
        case 3:
            data.style = 'ok';
            break;
        case 4:
            data.style = 'error';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}

function returnDownPaymentStatus(param) {
    var data = {};
    data.list = {0: "定金状态", 1: "审核中", 2: "未使用", 3: "已使用", 4: "已过期", 5: "已关闭"};
    data.text = data.list[param];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'hint';
            break;
        case 2:
            data.style = 'next';
            break;
        case 3:
            data.style = 'ok';
            break;
        case 4:
            data.style = 'disabled';
            break;
        case 5:
            data.style = 'error';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}

/** 返回流水状态*/
function returnStatementState(param) {
    var data = {};
    switch (returnNumber(param)) {
        case 2:
            data.text = '等待付款';
            data.style = 'hint';
            break;
        case 3:
            data.text = '付款完成';
            data.style = 'ok';
            break;
        case 4:
            data.text = '交易取消';
            data.style = 'disabled';
            break;
        default :
            data.text = '未知';
            data.style = 'error';
            break;
    }
    return data;
}

/** 返回流水状态*/
function returnPayStatementState(param) {
    var data = {};
    data.list = {0: "支付状态", 1: "未支付", 2: "已支付", 3: "已关闭"};
    data.text = data.list[returnNumber(param)];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'hint';
            break;
        case 2:
            data.style = 'ok';
            break;
        case 3:
            data.style = 'error';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}

/** 返回流水状态*/
function returnBillCheckState(param) {
    var data = {};
    data.list = {1: "未核销", 2: "已核销"};
    data.text = data.list[returnNumber(param)];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'hint';
            break;
        case 2:
            data.style = 'ok';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}

/** 返回流水状态*/
function returnPayFlowStatementValidState(param) {
    var data = {};
    data.list = {0: "核销状态", 1: "未核销", 2: "已核销"};
    data.text = data.list[returnNumber(param)];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'hint';
            break;
        case 2:
            data.style = 'ok';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}

/** 返回流水交易状态*/
function returnPayFlowStatementTransState(param) {
    var data = {};
    data.list = {
        0: "交易状态",
        1: "未支付",
        2: "支付成功",
        3: "交易关闭",
        4: "交易完成",
        20: "违约已退款",
        21: "违约未退款",
        30: "交易已过期",
    };
    data.text = data.list[returnNumber(param)];
    switch (returnNumber(param)) {
        case 0:
            data.text = "";
            data.style = 'hint';
            break;
        case 1:
            data.style = 'hint';
            break;
        case 2:
            data.style = 'next';
            break;
        case 3:
            data.style = 'error';
            break;
        case 4:
            data.style = 'ok';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}

function returnDownPaymentStatus(param) {
    var data = {};
    data.list = {0: "定金状态", 1: "审核中", 2: "未使用", 3: "已使用", 4: "已过期", 5: "已关闭"};
    data.text = data.list[returnNumber(param)];
    switch (returnNumber(param)) {
        case 0:
            data.style = 'hint';
            break;
        case 1:
            data.style = 'hint';
            break;
        case 2:
            data.style = 'next';
            break;
        case 3:
            data.style = 'ok';
            break;
        case 4:
            data.style = 'disabled';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}

/** 返回流水来源*/
function returnPayFlowStatementSource(param) {
    var data = {};
    data.list = {0: "全部渠道", 1101: "ERP_APP", 1102: "ERP_PC", 1201: "USER_APP", 1202: "USER_PC"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)) {
        case 1101:
            data.style = 'next';
            break;
        case 1102:
            data.style = 'next';
            break;
        case 1201:
            data.style = 'ok';
            break;
        case 1202:
            data.style = 'ok';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}

/** 返回流水来源*/
function returnContractPayCycle(param) {
    var data = {};
    data.list = {0: "付款方式", 1: "月付", 3: "季付", 6: "半年付", 12: "年付"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)) {
        case 0:
            data.style = 'error';
        case 1:
            data.style = 'next';
            break;
        case 3:
            data.style = 'next';
            break;
        case 6:
            data.style = 'next';
            break;
        case 12:
            data.style = 'next';
            break;
    }
    return data;
}

/** 返回流水来源*/
function returnBillCheckStatus(param) {
    var data = {};
    data.list = {0: "核销状态", 1: "待核销", 2: "已核销"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)) {
        case 1:
            data.style = 'hint';
            break;
        case 2:
            data.style = 'next';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}

/**流水交易状态*/
function returnFlowState(param) {
    var data = {};
    switch (returnNumber(param)) {
        case 1:
            data.text = '正常';
            data.style = 'hint';
            break;
        case 2:
            data.text = '退款中';
            data.style = 'ok';
            break;
        case 3:
            data.text = '退款';
            data.style = 'disabled';
            break;
        case 4:
            data.text = '拒绝';
            data.style = 'refuse';
            break;
        //	default :
        //		data.text = '未知';
        //		data.style = 'error';
        //		break;
    }
    return data;
}

/**是否定金关联合同*/
function returnContractObjectState(param) {
    var data = {};
    if (param == null) {
        data.text = '未关联';
        data.style = 'hint';
    }
    else {
        data.text = '已关联';
        data.style = 'ok';
    }
    return data;
}

/** 返回合同账单状态*/
function returnBillState(param, bal) {
    var data = {};
    switch (returnNumber(param)) {
        case 1:
            data.text = "审核中";
            data.style = "hint";
            break;
        case 2:
            data.text = "未支付";
            data.style = "next";
            break;
        case 3:
            data.text = "已支付";
            data.style = "ok";
            break;
        case 4:
            data.text = "已取消";
            data.style = "error";
            break;
        case 5:
            data.text = "已分期";
            data.style = "next";
            break;
        case 9:
            data.text = "第三方";
            data.style = "next";
            break;
        case 10:
            data.text = "已转租";
            data.style = "error";
            break;
        case 11:
            data.text = "已退租";
            data.style = "error";
            break;
        case 12:
            data.text = "已解约";
            data.style = "error";
            break;
        case 13:
            data.text = "已清退";
            data.style = "error";
            break;
        case 14:
            data.text = "已代偿";
            data.style = "error";
            break;
        case 14:
            data.text = "已代偿";
            data.style = "error";
            break;
        case 20:
            data.text = "已违约";
            data.style = "error";
            break;
        default :
            data.text = "未知";
            data.style = "";
            break;
    }
    return data;
}

/** 返回合同账单状态*/
function returnContractBillInstalmentState(param) {
    var data = {};
    data.list = {0: "分期状态", 1: "--", 2: "已分期"};
    data.text = returnValue(data.list[param]);
    switch (returnNumber(param)) {
        case 1:
            data.style = '';
            break;
        case 2:
            data.style = 'next';
            break;
        default :
            data.style = 'error';
            break;
    }
    return data;
}

/** 返回合同账单类型*/
function returnBillType(param, boo) {
    boo = boo || false;
    switch (param) {
        case 0:
            return boo ? "综合" : "租金";
            break;
        case 1:
            return "押金";
            break;
        case 2:
            return "包修费";
            break;
        case 3:
            return "服务费";
            break;
        case 4:
            return "维修费";
            break;
        case 5:
            return "保洁费";
            break;
        case 6:
            return "水费";
            break;
        case 7:
            return "电费";
            break;
        case 8:
            return "燃气费";
            break;
        case 9:
            return "物管费";
            break;
        case 10:
            return "宽带费";
            break;
        case 11:
            return "往期结余";
            break;
        case 12:
            return "未收款";
            break;
        case 13:
            return "滞纳金";
            break;
        case 13:
            return "滞纳金";
            break;
        case 14:
            return "免租期";
            break;
        case 15:
            return "管理费";
            break;
        case 16:
            return "材料费";
            break;
        case 17:
            return "滞纳金";
            break;
        case 18:
            return "定金";
            break;
        default:
            return "其他费用";
            break;
    }
}

/**账单类型*/
function returnBillBcbType(param) {
    var data = {};
    data.list = {
        0: "租金",
        1: "押金",
        2: "保修费",
        3: "服务费",
        4: "维修费",
        5: "保洁费",
        6: "水费",
        7: "电费",
        8: "燃气费",
        9: "物管费",
        10: "宽带费",
        11: "往期结余",
        12: "往期欠费",
        13: "迟纳金",
        14: "免租期",
        15: "管理费",
        16: "材料费",
        17: "手续费",
        18: "定金",
        19: "其它",
    };
    data.text = data.list[param];
    switch (param) {
        case 0 :
            data.style = "ok";
            break;
        case 1 :
            data.style = "ok";
            break;
        case 2 :
            data.style = "ok";
            break;
        case 3 :
            data.style = "ok";
            break;
        case 4 :
            data.style = "ok";
            break;
        case 5 :
            data.style = "ok";
            break;
        case 6 :
            data.style = "ok";
            break;
        case 7 :
            data.style = "ok";
            break;
        case 8 :
            data.style = "ok";
            break;
        case 9 :
            data.style = "ok";
            break;
        case 10 :
            data.style = "ok";
            break;
        case 11 :
            data.style = "ok";
            break;
        case 12 :
            data.style = "ok";
            break;
        case 13 :
            data.style = "ok";
            break;
        case 14 :
            data.style = "ok";
            break;
        case 15 :
            data.style = "ok";
            break;
        case 16 :
            data.style = "ok";
            break;
        case 17 :
            data.style = "ok";
            break;
        case 18 :
            data.style = "ok";
            break;
        case 19 :
            data.style = "ok";
            break;
    }
    return data;
}

/**账单的收支类型*/
function returnBillBalPay(param) {
    var data = {};
    data.list = {
        0: "收入",
        1: "支出",
    };
    data.text = data.list[param];
    switch (param) {
        case 0 :
            data.style = "ok";
            break;
        case 1 :
            data.style = "hint";
            break;
    }
    return data;
}

function returnDetailBalPay(param) {
    var data = {};
    data.list = {
        1: "收入",
        2: "支出",
    };
    data.text = data.list[param];
    switch (param) {
        case 1 :
            data.style = "ok";
            break;
        case 2 :
            data.style = "hint";
            break;
    }
    return data;
}

function returnDetailType(param) {
    var data = {};
    data.list = {1: "消费", 2: "抵扣", 3: "减免", 4: "优惠券", 5: "满减", 6: "红包", 7: "折扣", 17: "滞纳金"};
    data.text = data.list[param];
    switch (param) {
        case 1 :
            data.style = "next";
            break;
        default:
            data.style = "error";
            break;
    }
    return data;
}

function returnDetailType2(param) {
    var data = {};
    data.list = {1: "消费", 2: "抵扣", 3: "减免"};
    data.text = data.list[param];
    switch (param) {
        case 1 :
            data.style = "next";
            break;
        default:
            data.style = "error";
            break;
    }
    return data;
}

function returnDetailType3(param) {
    var data = {};
    data.list = {1: "消费", 2: "抵扣", 3: "减免"};
    data.text = data.list[param];
    switch (param) {
        case 1 :
            data.style = "next";
            break;
        default:
            data.style = "error";
            break;
    }
    return data;
}

// 服务=========================

/**
 * 服务状态
 *
 * @param param
 * @returns {{}}
 */
function returnServiceState(param) {
    var data = {};
    data.list = {
        0: "全部状态",
        // 1000: "下单",
        1100: "已下单",
        // 2000: "受理",
        2100: "已受理",
        2200: "已派单",
        // 3000: "处理",
        3100: "已接单",
        3200: "处理中",
        3210: "处理中-预约上门",
        3212: "处理中-到达现场",
        3220: "处理中-服务跟进",
        3230: "处理中-完成服务",
        3232: "处理中-确认费用",
        3300: "已处理",
        3400: "已结算",
        // 4000: "回访",
        4100: "已回访",
        5010: "已取消",
        5020: "已关闭",
    };
    data.text = data.list[param];
    switch (param) {
        // case 1000 : data.style = "hint"; break;
        case 1100 :
            data.style = "error";
            break;
        // case 2000 : data.style = "next"; break;
        case 2100 :
            data.style = "hint";
            break;
        case 2200 :
            data.style = "hint";
            break;
        // case 3000 : data.style = "next"; break;
        case 3100 :
            data.style = "hint";
            break;
        case 3200 :
            data.style = "hint";
            break;
        case 3210 :
            data.style = "hint";
            break;
        case 3212 :
            data.style = "hint";
            break;
        case 3220 :
            data.style = "hint";
            break;
        case 3230 :
            data.style = "hint";
            break;
        case 3232 :
            data.style = "hint";
            break;
        case 3300 :
            data.style = "hint";
            break;
        case 3400 :
            data.style = "hint";
            break;
        // case 4000 : data.style = "hint"; break;
        case 4100 :
            data.style = "next";
            break;
        case 5010 :
            data.style = "";
            break;
        case 5020 :
            data.style = "";
            break;
        default:
            data.text = "未知状态";
            data.style = "error";
            break;
    }
    return data;
}

/**
 * 服务操作状态
 *
 * @param param
 * @returns {{}}
 */
function returnServiceOperateState(param) {
    var data = {};
    data.list = {
        0: "全部状态",
        // 1000: "下单",
        1100: "待受理",
        // 2000: "受理",
        2100: "待派单",
        2200: "待接单",
        // 3000: "处理",
        3100: "待处理",
        3200: "待完成",
        3210: "待完成",
        3212: "待完成",
        3220: "待完成",
        3230: "待完成",
        3232: "待完成",
        3300: "待结算",
        3400: "待回访",
        // 4000: "回访",
        4100: "已结束",
        5010: "已取消",
        5020: "已关闭",
    };
    data.text = data.list[param];
    switch (param) {
        // case 1000 : data.style = "hint"; break;
        case 1100 :
            data.style = "error";
            break;
        // case 2000 : data.style = "next"; break;
        case 2100 :
            data.style = "error";
            break;
        case 2200 :
            data.style = "error";
            break;
        // case 3000 : data.style = "next"; break;
        case 3100 :
            data.style = "ok";
            break;
        case 3200 :
            data.style = "ok";
            break;
        case 3210 :
            data.style = "ok";
            break;
        case 3212 :
            data.style = "ok";
            break;
        case 3220 :
            data.style = "ok";
            break;
        case 3230 :
            data.style = "ok";
            break;
        case 3232 :
            data.style = "next";
            break;
        case 3300 :
            data.style = "next";
            break;
        case 3400 :
            data.style = "hint";
            break;
        // case 4000 : data.style = "hint"; break;
        case 4100 :
            data.style = "";
            break;
        case 5010 :
            data.style = "";
            break;
        case 5020 :
            data.style = "";
            break;
        default:
            data.text = "未知状态";
            data.style = "error";
            break;
    }
    return data;
}

/**
 * 服务来源
 * @param param
 * @returns {{}}
 */
function returnServiceSource(param) {
    var data = {};
    data.list = {
        11: "ERP_PC",
        12: "ERP_APP",
        21: "USER_PC",
        22: "USER_APP",
    };
    data.text = data.list[param];
    switch (param) {
        case 11 :
        case 12 :
            data.style = "next";
            break;
        case 21 :
        case 22 :
            data.style = "ok";
            break;
    }
    return data;
}

/**
 * 服务付费对象
 *
 * @param param
 * @returns {{}}
 */
function returnServicePayObject(param) {
    var data = {};
    data.list = {
        2: "管家",
        3: "门店",
        4: "租客",
        5: "房东",
        6: "用户",
    };
    data.text = data.list[param];
    data.style = "next";
    return data;
}

/**
 * 服务类型
 * @param param
 * @returns {{}}
 */
function returnServiceType(param) {

    var data = {};
    data.list = {
        1: "居家保洁",
        2: "居家维修",
        3: "翻新改造",
        5: "宽带服务",
        6: "自由搬家",
        7: "租约申请",
        8: "理财投资",
        9: "发票申请",
        10: "我要投诉",
        11: "其它服务",
        12: "家电清洗",
        13: "开锁换锁"
    };
    data.text = data.list[param];
    switch (param) {
        case 1 :
            data.style = "";
            break;
        case 2 :
            data.style = "";
            break;
        case 3 :
            data.style = "";
            break;
        case 5 :
            data.style = "";
            break;
        case 6 :
            data.style = "";
            break;
        case 7 :
            data.style = "";
            break;
        case 8 :
            data.style = "";
            break;
        case 9 :
            data.style = "";
            break;
        case 10 :
            data.style = "";
            break;
        case 11 :
            data.style = "";
            break;
        case 12 :
            data.style = "";
            break;
        case 13 :
            data.style = "";
            break;
    }
    return data;
}

/**
 * 返回部门名称
 *
 * @returns {{}}
 */
function returnUccNameState() {
    var data = {};
    data.list = {
        0: "归属部门",
        28: "南坪国际社区店",
        29: "南坪喜来登店",
        30: "南坪康德店",
        31: "南坪四公里店",
        32: "大坪店",
        33: "南坪六公里店",
        35: "杨家坪西九店",
        40: "南坪浪高店",
        41: "南坪协信城店",
        47: "南坪贝迪店",
        48: "巴南万达店"
    };
    return data;
}

/**活动**/
/**
 * 返回活动名称
 */
function returnActivityTitle() {
    var data = {};
    $.ajax({
        type: 'POST',
        url: '/activity/selectActivityManageTitle',
        data: {},
        async: false,
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            var s = '';
            $.each(result.data, function (index, item) {
                if (s.length > 0) {
                    s += ","
                }
                ;
                s += item.am_code + ':' + '"' + item.am_title + '"';
            })
            var select = s + ',' + (0 + ':' + '"活动主题"');
            var sss = "{" + select + "}";
            data.list = eval('(' + sss + ')');
        }
    })
    return data;
}

/****优惠券***/
/**
 * 返回优惠券配置类型
 */
function returnUccfgUse1(param) {
    var data = {};
    $.ajax({
        type: 'POST',
        url: '/activity/queryCouponsUse',
        data: {ucu_pn: 0},
        async: false,
        dataType: 'json',
        success: function (result) {
            if (result.code == 200) {
                data.list = result.data;
                // var s = '';
                // $.each(result.data, function (index, item) {
                //     if (s.length > 0) {
                //         s += ","
                //     }
                //     s += item.ucu_id + ':' + '"' + item.ucu_name + '"';
                // })
                // var sss = "{" + s + "}";
                // data.list = eval('(' + sss + ')');
            }
        }
    })
    return data;
}

/**
 * 优惠券用途
 */
function returnUccfgUse(param) {
    var data = {};
    data.list = {
        0: "通用券",
        1: "租金券",
        2: "服务券",
    };
    data.text = data.list[param];
    switch (returnNumber(param)) {
        case 0:
            data.style = 'next';
            break;
        case 1:
            data.style = 'next';
            break;
        case 2:
            data.style = 'next';
            break;
        default :
            data.text = '其他';
            data.style = 'hint';
            break;
    }
    return data;
}

/**
 * 返回优惠券配置来源
 */
function returnUccfgSource(param) {
    var data = {};
    data.list = {
        1: "注册",
        2: "登录",
        3: "活动",
    };
    data.text = data.list[param];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'next';
            break;
        case 2:
            data.style = 'next';
            break;
        case 3:
            data.style = 'next';
            break;
        default :
            data.text = '其他';
            data.style = 'hint';
            break;
    }
    return data;
}

/**
 * 返回优惠券配置失效方式
 */
function returnUccfgInvalidWay(param) {
    var data = {};
    data.list = {
        1: "一次性",
        2: "持续性",
    };
    data.text = data.list[param];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'next';
            break;
        case 2:
            data.style = 'next';
            break;
        default :
            data.text = '其他';
            data.style = 'hint';
            break;
    }
    return data;
}

function returnUccfgWay(param) {
    var data = {};
    data.list = {1: "金额", 2: "折扣"};
    data.text = data.list[param];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'hint';
            break;
        case 2:
            data.style = 'next';
            break;
        default :
            data.text = '其他';
            data.style = 'hint';
            break;
    }
    return data;
}

/**
 * 返回优惠券配置状态
 */
function returnUccfgStatus(param) {
    var data = {};
    data.list = {
        1: "启用",
        2: "关闭",
    };
    data.text = data.list[param];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'ok';
            break;
        case 2:
            data.style = 'error';
            break;
        default :
            data.text = '其他';
            data.style = 'hint';
            break;
    }
    return data;
}

/**
 * 返回优惠券配置有效方式
 */
function returnUccfgValidValue(param) {
    var data = {};
    data.list = {
        "y": "年",
        "m": "月",
        "d": "日",
        // "h": "时",
    };
    data.text = data.list[param];
    switch (returnValue(param)) {
        case "y":
            data.style = 'next';
            break;
        case "m":
            data.style = 'next';
            break;
        case "d":
            data.style = 'next';
            break;
        case "h":
            data.style = 'next';
            break;
        default :
            data.text = '其他';
            data.style = 'hint';
            break;
    }
    return data;
}

/**
 *返回优惠券状态
 */
function returnUcStatus(param) {
    var data = {};
    data.list = {
        1: "待确认",
        2: "未使用",
        3: "已使用",
        4: "已过期",
    };
    data.text = data.list[param];
    switch (returnNumber(param)) {
        case 1:
            data.style = 'next';
            break;
        case 2:
            data.style = 'next';
            break;
        case 3:
            data.style = 'next';
            break;
        case 4:
            data.style = 'next';
            break;
        default :
            data.text = '其他';
            data.style = 'hint';
            break;
    }
    return data;
}

/**
 * 返回优惠券名称
 */
function returnUccfgName(param) {
    var data = {};
    $.ajax({
        type: 'POST',
        url: '/activity/selectuccfgName',
        data: {},
        async: false,
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            var s = '';
            $.each(result.data, function (index, item) {
                if (s.length > 0) {
                    s += ","
                }
                ;
                s += item.uccfg_id + ':' + '"' + item.uccfg_name + '"';
            })
            var select = s + ',' + (0 + ':' + '"优惠券名称"');
            var sss = "{" + select + "}";
            data.list = eval('(' + sss + ')');
        }
    })
    return data;
}

/**
 * 房屋审核
 */
function returnHouseCheckStatus(param) {
    var data = {};
    data.list = {
        10: "审核中",
        11: "审核未通过",
        12: "审核通过",
    };
    data.text = data.list[param];
    switch (returnNumber(param)) {
        case 10:
            data.style = 'hint';
            break;
        case 11:
            data.style = 'hint';
            break;
        case 12:
            data.style = 'next';
            break;
        default :
            data.text = '其他';
            data.style = 'hint';
            break;
    }
    return data;
}

/**
 * 选中优惠券用途
 */
function returnUccfgUseLimit(param1, param2) {
    var data = {};
    data.list = {
        0: {
            title: "通用券",
            subList: {
                0: "无限制"
            }
        },
        1: {
            title: "租金券",
            subList: {
                0: "无限制",
                1: "首期",
            }
        },
        2: {
            title: "服务券",
            subList: {
                0: "无限制",
                1: "居家保洁",
                2: "居家维修",
                3: "翻新改造",
                5: "宽带服务",
                6: "自由搬家",
                12: "家电清洗",
                13: "开锁换锁",
            }
        }
    };
    data.text = data.list[param1].subList[param2];
    return data;

}

/** 返回房屋发布状态*/
function returnHouseheIsPublish(param) {
    var data = {};
    data.list = {0: "未发布", 1: "已发布"};
    data.text = data.list[param];
    switch (param) {
        case 0:
            data.style = "error";
            break;
        case 1 :
            data.style = "next";
            break;
        default:
            data.style = "hint";
            break;
    }
    return data;
}

