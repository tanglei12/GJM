var serviceList = [];
$(function () {
    $.contractInfo();
});
(function ($) {

    /** 初始化*/
    $.contractInfo = function () {
        // 加载数据
        $.contractInfo.load_data();
        // 绑定事件
        $.contractInfo.load_event();
    };

    /** 参数*/
    $.contractInfo.param = {};

    /** 加载数据*/
    $.contractInfo.load_data = function () {
        // 查询合同数据
        $.ajax({
            type: "POST",
            url: "/appPage/queryContractInfo",
            data: {
                con_code: getUrlParam("con_code")
            },
            dataType: "json",
            beforeSend: function () {
            }
        }).done(function (result) {
            if (result.code !== 200) return $.hint.tip(result.msg, "error");
            serviceList = result.data.services || "";
            $.contractInfo.setInfo(result.data);
        });
    };

    /** 设置合同信息*/
    $.contractInfo.setInfo = function (data) {
        // 合同对象
        var contractObject = data.contractObject;
        // 合同主体
        var contractBody = data.contractBody;
        // 房源信息
        var houseInfo = data.viewLibraryInfo;
        // 管家信息
        var contractRelaEmps = data.contractRelaEmps || "";
        // 签约代表
        var contractor = data.contractor;
        // 客户信息
        var customers = data.customers;
        // 合同照片
        var contractImageList = data.contractImageList || "";
        // 合同订单
        var contractOrder = data.contractOrder;
        // 合同首期账单列表
        var contractBillFirstList = data.contractBillFirstList;
        // 物业交接
        var propertyMain = data.propertyMain;
        // 费用结算
        var statementOrder = data.statementOrder;
        // 增值服务
        var services = data.services;
        // 招租订单
        cancelContract = data.cancelContract || "";
        // 签名验证
        var contractSignVerify = data.contractSignVerify || "";
        // 附属协议审核
        var agreementAuditing = data.agreementAuditing || "";

        // 赋值全局变量
        $.contractInfo.param.contractOrder = contractOrder;
        $.contractInfo.param.contractObject = contractObject;
        $.each(contractRelaEmps, function (index, data) {
            $.contractInfo.param.contractRelaEmp = data.cre_role == 1 ? data : "";
        });

        // --------------------------------------------------------

        // 是否托管
        var isTG = contractObject.contractObject_Type === "托管合同";
        // 是否电子合同
        var isConModeE = contractObject.contractObject_Mode === "E";
        // 是否续约
        var isRenew = contractObject.contractObject_ExtState === 12 || contractObject.contractObject_ExtState === 22;
        // 是否签名模式
        //		var isSignature = getUrlParam("mode") == "signature";
        // 操作状态
        var optionState = contractObject.contractObject_OptionState;
        var option_state = returnContractOptionState(optionState);
        // 扩展状态
        var extState = returnContractExtendState(contractObject.contractObject_ExtState);
        // 是否操作
        var isOperation = getUrlParam("operation") == "true";

        var html = '';
        html += '<div class="content">';
        html += '	<div class="content-main" style="padding-top: 10px;margin-top: 10px;">';
        html += '		<div class="content-item">';
        html += '			<dl><dd>' + returnValue(contractObject.contractObject_Type) + ' <span class="error">No.' + contractObject.contractObject_No + '</span> - <span class="' + extState.style + '">' + returnValue(extState.text) + '</span></dd></dl>';
        html += '		</div>';
        html += '	</div>';
        html += '</div>';
        html += '';
        html += '<div class="content">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">房源信息</div>';
        html += '	</div>';
        html += '	<div class="content-main">';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>小区房号</dt><dd>' + returnValue(houseInfo.house_address) + '</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>户型面积</dt><dd>建筑面积' + returnValue(houseInfo.hi_measure) + '平方米，' + returnNumber(houseInfo.hi_houseS) + '室' + returnNumber(houseInfo.hi_houseT) + '厅' + returnNumber(houseInfo.hi_houseW) + '卫</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>产权地址</dt><dd>' + returnNullReplace(houseInfo.he_address, '<label class="error">无</label>') + '</dd></dl>';
        html += '	    </div>';
        html += '	</div>';
        html += '</div>';
        html += '';
        html += '<div class="content">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">客户信息</div>';
        html += '	</div>';
        html += '	<div class="content-main">';
        $.each(customers, function (index, data) {
            html += '	<div class="content-item" style="flex-direction: column;">';
            html += '		<dl>';
            html += '			<dt>' + (data.crc_role === 0 ? "签约客户" : (isTG ? "联系人" : "室友")) + '</dt>';
            html += '			<dd>';
            html += '				<div>' + returnValue(data.cc_name) + ' - ' + returnValue(data.ccp_phone) + '</div>';
            html += '			</dd>';
            html += '		</dl>';
            if (!isEmpty(data.customerBank)) {
                var bankName = (!isEmpty(data.customerBank.cbc_bankName) ? data.customerBank.cbc_bankName + "-" : "");
                var bankNumber = (!isEmpty(data.customerBank.cbc_cardNum) ? data.customerBank.cbc_cardNum : "");
                var userName = returnValue(data.customerBank.cbc_name);
                if (!isEmpty(bankNumber)) {
                    var zn = bankNumber.substring(4, bankNumber.length - 4);
                    bankNumber = bankNumber.replace(zn, '<span class="bank-number" data-number="' + zn + '">****</span>') + "-";
                }
                html += '	<div class="bank-box">' + bankName + bankNumber + userName + '<span class="bank-switch">显示</span></div>';
            }
            html += '	</div>';

        });
        html += '	</div>';
        html += '</div>';

        var startDate = returnDate(contractObject.contractObject_Date);
        var endDate = returnDate(contractObject.contractObject_DeadlineTime);

        html += '<div class="content">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">合同信息（' + (isConModeE ? "电子合同" : "纸质合同") + '）</div>';
        html += '		<div class="content-item-option">';
        html += '			<button class="item-option-btn next" name="contractBillView">合同账单</button>';
        html += '		</div>';
        html += '	</div>';
        html += '	<div class="content-main">';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>合同期限</dt><dd>' + startDate + '~' + endDate + '（' + returnBusinessYMD(startDate, endDate) + '）</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>租金</dt><dd class="error">' + returnValue(contractBody.contractBody_Rent) + (contractObject.contractObject_RentFreeMode === 1 ? '元/年（<i class="error" style="font-style: normal;">打包年付</i>）' : '元/月') + '</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>支付方式</dt><dd>' + returnValue(contractBody.contractBody_PayStyle) + (contractBody.contractBody_PayStyle === '月付' && !isEmpty(contractBody.contractBody_PayType) ? "：" + returnValue(contractBody.contractBody_PayType) : "") + '</dd></dl>';
        html += '	    	<dl><dt>押金</dt><dd>' + returnFloat(contractBody.contractBody_Pay) + '元</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>服务费</dt><dd>' + returnFloat(contractBody.contractBody_Service) + '元</dd></dl>';
        if (contractObject.contractObject_Type === "托管合同") {
            html += '	    <dl><dt>定金</dt><dd>' + returnFloat(contractBody.contractBody_Depslit) + '元</dd></dl>';
        }
        html += '	    </div>';
        html += '	    <div class="content-item">';
        /*var agreedRepayTime = returnNumber(contractBody.contractBody_AgreedRepayTime);
        if (agreedRepayTime < 0) {
            agreedRepayTime = '提前' + Math.abs(agreedRepayTime) + '天';
        } else if (agreedRepayTime === 0) {
            agreedRepayTime = '当天';
        } else {
            agreedRepayTime = Math.abs(agreedRepayTime) + '日';
        }*/

        var agreedRepayTime ='';
        agreedRepayTime = contractBody.contractBody_AgreedRepayTime;
        if (returnValue(agreedRepayTime) != '') {
            if (agreedRepayTime.indexOf('|') < 0) {
                if (agreedRepayTime < 0) {
                    agreedRepayTime = '提前' + Math.abs(agreedRepayTime) + '天';
                } else if (agreedRepayTime == 0) {
                    agreedRepayTime = '当天';
                } else {
                    agreedRepayTime = Math.abs(agreedRepayTime) + '日';
                }
            } else {
                agreedRepayTime=agreedRepayTime+'日/每年首月';
            }
        } else {
            agreedRepayTime = '当天';
        }
        html += '	    	<dl><dt>约定还款日</dt><dd>' + agreedRepayTime + '</dd></dl>';
        html += '       </div>';
        html += '       <div class="content-item">';
        html += '	    	<dl><dt>首付租金日</dt><dd>' + returnDate(contractBody.contractBody_StartPayTime) + '</dd></dl>';
        html += '	    </div>';
        if (contractObject.contractObject_Type === "托管合同") {
            html += '	<div class="content-item">';
            html += '		<dl><dt>免租期</dt><dd>' + returnValue(contractBody.contractBody_FreeTime) + '天/年</dd></dl>';
            html += '	</div>';
            html += '	<div class="content-item">';
            html += '		<dl><dt>租金递增</dt><dd>' + returnValue(contractBody.contractBody_Increasing) + '元/月/年</dd></dl>';
            html += '	</div>';
        }
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>其他约定</dt><dd class="error">' + returnValue(contractObject.contractObject_Other) + '</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>签约代表</dt><dd>' + returnValue(contractor.em_name) + " - " + returnValue(contractor.em_phone) + '</dd></dl>';
        html += '	    </div>';
        html += '	    <div class="content-item">';
        html += '	    	<dl><dt>签约日期</dt><dd>' + returnDate(contractObject.contractObject_FillTime) + '</dd></dl>';
        html += '	    </div>';
        html += '	</div>';
        html += '</div>';
        html += '';
        html += '<div class="content">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">其他信息</div>';
        html += '	</div>';
        html += '	<div class="content-main">';
        $.each(contractRelaEmps, function (index, item) {
            html += '	<div class="content-item">';
            html += '		<dl><dt>' + (item.cre_role === 1 ? '主管家' : '副管家') + '</dt><dd>' + returnValue(item.em_name) + ' - ' + returnValue(item.em_phone) + '</dd></dl>';
            html += '	</div>';
        });
        html += '		<div class="content-item">';
        html += '			<dl><dt>备注</dt><dd class="error">' + returnValue(contractBody.contractBody_Remark) + '</dd></dl>';
        html += '		</div>';
        html += '	</div>';
        html += '</div>';
        html += '';

        //【电子合同】
        html += '';
        html += '<div class="content step step_dzht">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">电子合同</div>';
        html += '		<div class="content-item-option">';
        html += '			<button class="item-option-btn" name="EContractView" data-type="' + contractObject.contractObject_Type + '">查看</button>';
        html += '		</div>';
        html += '	</div>';
        html += '</div>';
        html += '';

        //【增值服务】
        html += '';
        html += '<div class="content step step_zzfw">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">增值服务</div>';
        html += '		<div class="content-item-option">';
        if (isEmpty(services)) {
            html += '			<button class="item-option-btn"><span>无</span></button>';
        } else {
            html += '			<button class="item-option-btn" name="conValueAddedService">查看</button>';
        }
        html += '		</div>';
        html += '	</div>';
        html += '</div>';
        html += '';

        //【客户签名】
        html += '';
        html += '<div class="content step step_kkqm">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">客户签名</div>';
        html += '		<div class="content-item-option">';
        switch (contractSignVerify.cs_state) {
            case 1:
                html += '<button class="item-option-btn error">等待客户签名</button>';
                break;
            case 2:
                html += '<button class="item-option-btn error">等待客户确认签名</button>';
                break;
            case 21:
                html += '<button class="item-option-btn error">等待客户确认签署</button>';
                break;
            case 3:
                html += '<button class="item-option-btn error"></button>';
                break;
            default:
                html += '<button class="item-option-btn error">无</button>';
                break;
        }
        html += '		</div>';
        html += '	</div>';
        if (!isEmpty(contractObject.contractObject_CustomerSign)) {
            html += '	<div class="content-main">';
            html += '	    <img src="data:image/png;base64,' + contractObject.contractObject_CustomerSign + '" style="width: 100%;height: 130px;display: block;">';
            html += '	</div>';
        }
        html += '</div>';
        html += '';

        //【合同附件】
        html += '';
        html += '<div class="content step step_htfj">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">合同附件</div>';
        html += '		<div class="content-item-option">';
        html += '		    <button class="item-option-btn" name="conAttachmentView">查看</button>';
        html += '		    <button class="item-option-btn next" name="conPerfected">编辑</button>';
        html += '		</div>';
        html += '	</div>';
        html += '	<div class="content-main" id="contractImageBox" style="display:none">';
        $.each(contractImageList, function (index, data) {
            html += '	<img src="' + data.ci_path_real + '" data-preview-src="" data-preview-group="1"/>';
        });
        html += '	</div>';
        html += '</div>';
        html += '';

        //【物业交接】
        html += '';
        html += '<div class="content step step_wyjj">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">物业交接</div>';
        html += '		<div class="content-item-option">';
        if (isEmpty(propertyMain)) {
            html += '		<button class="item-option-btn error" name="propertyHandoverEdit">待交接</button>';
        } else {
            html += '		<button class="item-option-btn" name="propertyHandoverInfo">查看</button>';
            html += '		<button class="item-option-btn next" name="propertyHandoverEdit">交接</button>';
        }
        html += '		</div>';
        html += '	</div>';
        html += '</div>';
        html += '';

        //【费用结算】
        html += '';
        html += '<div class="content step step_fyjs">';
        html += '	<div class="content-head">';
        html += '		<div class="content-item-title">费用结算</div>';
        html += '		<div class="content-item-option">';
        if (isEmpty(statementOrder)) {
            html += '		<button class="item-option-btn error" name="' + (isEmpty(propertyMain) ? "propertyHandoverEdit" : "propertySettlementEdit") + '">待结算</button>';
        } else {
            html += '		<button class="item-option-btn" name="propertySettlementInfo">查看</button>';
            html += '		<button class="item-option-btn next" name="propertySettlementEdit">结算</button>';
        }
        html += '		</div>';
        html += '	</div>';
        html += '</div>';
        html += '';
        $("#main").html(html);

        var step_con_edit = $("[name=conPerfected],[name=propertyHandoverEdit],[name=propertySettlementEdit]");
        step_con_edit.hide();

        var step_dzht = $(".step_dzht"); // 电子合同
        var step_zzfw = $(".step_zzfw"); // 增值服务
        var step_kkqm = $(".step_kkqm"); // 客户签名
        var step_htfj = $(".step_htfj"); // 合同附件
        var step_wyjj = $(".step_wyjj"); // 物业交接
        var step_fyjs = $(".step_fyjs"); // 费用结算
        // $(".step").hide();

        if (!isConModeE) {
            step_dzht.hide();
            step_kkqm.hide();
        }
        if (contractObject.contractObject_Type === "托管合同") {
            step_zzfw.hide();
        }

        html = '';
        html += '<div class="content content-footer" style="box-shadow: none;">';
        switch (optionState) {
            case 101:
                if (isOperation) step_con_edit.show();

                step_wyjj.hide();
                step_fyjs.hide();
                step_kkqm.hide();

                var param = {
                    conAgreementAuditing: {isOpen: false, name: "conAgreementAuditing", text: "协议待审核", style: "hint-bg", property: ""},
                    conEdit: {isOpen: false, name: "conEdit", text: "编辑", style: "next-bg", property: ""},
                    conSignature: {isOpen: false, name: "sendSignature", text: "发送签名", style: "error-bg", property: ""},
                    conPay: {isOpen: false, text: "", style: "", property: "disabled"},
                    conPerfected: {isOpen: false, text: "", style: "", property: ""},
                    propertyHandoverEdit: {isOpen: false, text: "", style: "", property: ""},
                    conAuditing: {isOpen: false, text: "", style: "", property: ""}
                };

                // 是否有附属协议审核
                var step1 = true;
                switch (agreementAuditing.caa_state) {
                    case 1: // 待审核
                        param.conAgreementAuditing.isOpen = true;
                        param.conAgreementAuditing.property = "disabled";
                        param.conEdit.isOpen = true;
                        param.conEdit.text = "重新编辑";
                        step1 = false;
                        break;
                    case 2: // 未通过
                        param.conAgreementAuditing.isOpen = false;
                        param.conEdit.isOpen = true;
                        param.conEdit.text = "重新编辑";
                        step1 = false;
                        break;
                }

                if (step1) {
                    // 是电子合同
                    if (isConModeE) {
                        step_kkqm.show();
                        // 编辑|签名|付款
                        var next = false;
                        param.conEdit.isOpen = true;
                        param.conSignature.isOpen = true;
                        switch (contractSignVerify.cs_state) {
                            case 1:
                                param.conEdit.text = "重新编辑";
                                param.conEdit.name = "conReEdit";

                                param.conSignature.text = "等待签名";
                                param.conSignature.style = "hint-bg";
                                param.conSignature.property = "disabled";
                                break;
                            case 2:
                                param.conEdit.text = "重新签名";
                                param.conEdit.name = "conReSignature";
                                param.conEdit.style = "error-bg";

                                param.conSignature.text = "确认签名";
                                param.conSignature.name = "conSignatureConfirm";
                                param.conSignature.style = "next-bg";
                                break;
                            case 21:
                                param.conEdit.isOpen = false;

                                param.conSignature.text = "等待客户确认签署";
                                param.conSignature.style = "next-bg";
                                param.conSignature.property = "disabled";
                                break;
                            case 3:
                                param.conEdit.isOpen = false;
                                param.conSignature.isOpen = false;
                                next = true;
                                break;
                            default:
                                param.conEdit.text = "编辑";
                                param.conSignature.text = "发送签名";
                                break;
                        }

                        if (next) {
                            if (contractObject.contractObject_Type === "托管合同") {
                                param.conPerfected.isOpen = true;
                                param.propertyHandoverEdit.isOpen = true;
                                param.conAuditing.isOpen = true;
                            }
                            if (contractObject.contractObject_Type === "租赁合同") {
                                param.conPay.isOpen = true;

                                // 是否已经支付
                                var isPay = false;
                                if (!isEmpty(contractBillFirstList) && contractBillFirstList.length > 0) {
                                    var isZero = false;
                                    $.each(contractBillFirstList, function (index, data) {
                                        if (data.bcb_cycle === 0) {
                                            if (data.bcb_state === 3) {
                                                isPay = true;
                                            } else {
                                                isPay = false;
                                                return false;
                                            }
                                            isZero = true;
                                        }
                                    });
                                    if (!isZero) {
                                        $.each(contractBillFirstList, function (index, data) {
                                            if (data.bcb_cycle === 1 && data.bcb_state === 3) {
                                                isPay = true;
                                            } else {
                                                isPay = false;
                                                return false;
                                            }
                                        });
                                    }
                                }

                                if (isPay || contractObject.contractObject_ExtState == 22) {
                                    param.conPay.isOpen = false;
                                    param.conPerfected.isOpen = true;
                                    param.propertyHandoverEdit.isOpen = true;
                                    param.conAuditing.isOpen = true;
                                }
                            }
                        }
                    } else {
                        param.conEdit.isOpen = true;
                        param.propertyHandoverEdit.isOpen = true;
                        param.conAuditing.isOpen = true;
                    }
                }

                // 编辑
                if (param.conEdit.isOpen) {
                    html += '<button class="content-submmit ' + param.conEdit.style + '" name="' + param.conEdit.name + '" data-type="' + contractObject.contractObject_Type + '" ' + param.conEdit.property + '><i class="fa-edit"></i>' + param.conEdit.text + '</button>';
                }

                // 协议审核
                if (param.conAgreementAuditing.isOpen) {
                    html += '<button class="content-submmit ' + param.conAgreementAuditing.style + '" name="' + param.conAgreementAuditing.name + '" ' + param.conAgreementAuditing.property + '><i class="fa-hourglass-half"></i>' + param.conAgreementAuditing.text + '</button>';
                }

                // 签名
                if (param.conSignature.isOpen) {
                    html += '<button class="content-submmit ' + param.conSignature.style + '" name="' + param.conSignature.name + '" ' + param.conSignature.property + '><i class="fa-pencil"></i>' + param.conSignature.text + '</button>';
                }

                // 支付
                if (param.conPay.isOpen) {
                    html += '<button class="content-submmit error-bg" name="conPay" ' + param.conPay.property + '><i class="fa-paypal"></i>请通知客户在APP上付款</button>';
                }

                // 提交审核
                if (param.conAuditing.isOpen) {
                    html += '<button class="content-submmit error-bg" name="conAuditing" data-property="' + param.conAuditing.property + '" data-hint="' + param.conAuditing.hint + '"><i class="fa-legal"></i>提交审核</button>';
                }
                break;
            case 103:
                if (isOperation) step_con_edit.show();

                if (isRenew) {
                    step_wyjj.hide();
                    step_fyjs.hide();
                }

                var param = {conAuditing: {isOpen: false, text: "", style: "", property: ""}};

                html += '<button class="content-submmit error-bg" name="conAuditing" data-property="' + param.conAuditing.property + '" data-hint="' + param.conAuditing.hint + '"><i class="fa-legal"></i>提交审核</button>';
                break;
            case 102: // 待审核
                if (isOperation) step_con_edit.show();

                if (isRenew) {
                    step_wyjj.hide();
                    step_fyjs.hide();
                }

                html += '<button class="content-submmit hint-bg"><i class="fa-hourglass-half"></i>合同审核中...</button>';
                break;
            case 1021: // 待结算
                if (isOperation) step_con_edit.show();

                if (isRenew) {
                    step_wyjj.hide();
                    step_fyjs.hide();
                }

                html += '<button class="content-submmit error-bg" name="conReview"><i class="fa-legal"></i>提交复核</button>';
                break;
            case 104:
                if (isRenew) {
                    step_wyjj.hide();
                    step_fyjs.hide();
                }

                html += '<button class="content-submmit hint-bg"><i class="fa-hourglass-half"></i>合同复核中...</button>';
                break;
            case 105:
                if (isOperation) step_con_edit.show();

                if (isRenew) {
                    step_wyjj.hide();
                    step_fyjs.hide();
                }

                html += '<button class="content-submmit error-bg" name="conReview"><i class="fa-legal"></i>提交复核</button>';
                break;
            case 106:
                html += '<button class="content-submmit ok-bg"><i class="fa-check-circle"></i>已生效</button>';
                break;
            case 107:
                html += '<button class="content-submmit error-bg"><i class="fa-close"></i>作废</button>';
                break;
            default:
                html += '<button class="content-submmit hint-bg"><i class="fa-exchange"></i>' + option_state.title + '</button>';
                break;
        }
        html += '   <button class="content-submmit next-bg" name="conContractRecord" style="width: 44px;flex: inherit;"><i class="fa-reorder" style="margin: 0;"></i></button>';
        html += '</div>';
        html += '';
        $("#footer").html(html);
        // 判断是否能操作
        if (!isOperation) {
            $("#footer").find(".content-submmit").not("[name=conContractRecord]").each(function () {
                if ($(this).attr("disabled") != "disabled") {
                    $(this).attr("readonly", "readonly");
                }
            });
        }
    };

    /** 加载事件*/
    $.contractInfo.load_event = function () {
        // 是否操作
        var isOperation = getUrlParam("operation") == "true";
        // [方法] 操作提示
        var fun_operation_tip = function () {
            // 操作提示
            var operation_tip = "非本人合同无法操作";
            var contractRelaEmp = $.contractInfo.param.contractRelaEmp || "";
            if (contractRelaEmp.em_id == returnNumber(getUrlParam("em_id"))) {
                operation_tip = "请在[我的]->[我的合同]里面进行操作";
            }
            return $.hint.tip(operation_tip);
        };

        // 图片预览
        mui.previewImage();

        // 显示银行卡
        $(document).on("click", ".bank-switch", function () {
            var p = $(this).parent();
            var n = p.find(".bank-number");
            var cn = n.html();
            n.html(n.attr("data-number"));
            n.attr("data-number", cn);
            if ($(this).text() === "显示") {
                $(this).html("隐藏");
            } else {
                $(this).html("显示");
            }
        });

        // 显示合同记录
        $(document).on("click", "[name=conContractRecord]", function (e) {
            e.stopPropagation();

            var _this = $(this);
            var box = $(".pullup-box");
            if (box.length > 0) {
                box.remove();
                _this.removeClass("error-bg").addClass("next-bg").find("i").removeClass("fa-remove").addClass("fa-reorder");
                return;
            }
            box = $('<div class="pullup-box"><div class="pullup-box-head">合同记录</div><div class="pullup-box-main">加载中...</div></div>').appendTo("body");
            _this.removeClass("next-bg").addClass("error-bg").find("i").removeClass("fa-reorder").addClass("fa-remove");

            $.ajax({
                type: "POST",
                url: "/appPage/queryContractRecord",
                data: {
                    con_code: getUrlParam("con_code")
                },
                dataType: "json",
            }).done(function (result) {
                var main = box.find(".pullup-box-main");

                if (result.code != 200) return main.html(result.msg);

                main.empty();
                $.each(result.data.auditingRecordList, function (index, data) {
                    main.append(
                        '<dl class="pullup-box-item">' +
                        '<dt>' + returnTime(data.auditingRecord_createTime) + ' - ' + returnValue(data.auditingRecord_author) + '</dt>' +
                        '<dd>' + returnValue(data.auditingRecord_content) + '</dd>' +
                        '</dl>');
                });

            });

            box.on("click", function (e) {
                e.stopPropagation();
            });
            $(document).on("click", function () {
                box.remove();
                _this.removeClass("error-bg").addClass("next-bg").find("i").removeClass("fa-remove").addClass("fa-reorder");
            });
        });

        // 房源合同
        $(document).on("click", "[name=conList]", function () {
            var hi_code = $(this).attr("data-code");
            var house_address = $(this).attr("data-address");
            OCContract.contractHousePage(hi_code, house_address);
        });

        // 查看合同账单
        $(document).on("click", "[name=contractBillView]", function () {
            var box = $(".content-mask");
            if (box.length <= 0) {
                var html = '';
                html += '<div class="content-mask">';
                html += '	<div class="content-mask-main">';
                html += '		<div class="mask-main-head">';
                html += '			<div class="mask-main-head-title">合同账单</div>';
                html += '			<div class="mask-main-head-option"><button name="contractBillClose"><i class="fa-remove"></i></button></div>';
                html += '		</div>';
                html += '		<div class="mask-main-content">';
                html += '			<div><img src="/resources/image/svg/rolling.svg" style="width:38px;display: block;margin: 20% auto;"></div>';
                html += '		</div>';
                html += '	</div>';
                html += '</div>';
                box = $(html).appendTo("body");
                box.find(".content-mask-main").animate({"bottom": "0px"});
                $('body').css('overflow', 'hidden');

                $.ajax({
                    url: "/financeManage/selectBillList",
                    data: {
                        contractObject_code: getUrlParam("con_code")
                    },
                    dataType: "json"
                }).done(function (result) {
                    if (result.msg !== "success") return;
                    var contractOrder = result.order;
                    var contractBillList = result.list;

                    var html = '';
                    $.each(contractBillList, function (index, data) {
                        var state = returnBillState(data.bcb_state, contractOrder.bco_type === "201" ? "还" : "收");
                        if (state.text === "第三方") {
                            state.text = contractOrder.bco_cooperater;
                            state.style = "ok";
                        }

                        html += '		<div class="mask-main-content-item">';
                        html += '			<div style="display:flex;font-size: 14px;line-height: 24px;"><span style="flex:1;">' + (returnNumber(data.bcb_cycle) === 0 ? "首" : returnNumber(data.bcb_cycle)) + '期</span><span style="font-weight: bold;">￥' + returnFloat(data.bcb_repayment) + '</span></div>';
                        html += '			<div style="display:flex;"><span style="flex:1;">' + returnDate(data.bcb_repaymentDate) + '</span><span class="' + state.style + '">' + state.text + '</span></div>';
                        html += '		</div>';
                    });
                    box.find(".mask-main-content").html(html);

                    box.find("[name=contractBillClose]").on("click", function () {
                        box.find(".content-mask-main").animate({
                            bottom: "-1000px"
                        }, function () {
                            box.fadeOut("fast", function () {
                                box.remove();
                                $('body').css('overflow', 'auto');
                            });
                        });
                    });

                    box.on("click", function () {
                        box.find(".content-mask-main").animate({
                            bottom: "-1000px"
                        }, function () {
                            box.fadeOut("fast", function () {
                                box.remove();
                                $('body').css('overflow', 'auto');
                            });
                        });
                    });
                });
            }
            // 滚动条事件
            $(".mask-main-content").perfectScrollbar();
        });

        // 查看增值服务
        $(document).on("click", "[name=conValueAddedService]", function () {
            var box = $(".content-mask");
            if (box.length <= 0) {
                var html = '';
                html += '<div class="content-mask">';
                html += '	<div class="content-mask-main">';
                html += '		<div class="mask-main-head">';
                html += '			<div class="mask-main-head-title">增值服务</div>';
                html += '			<div class="mask-main-head-option"><button name="contractBillClose"><i class="fa-remove"></i></button></div>';
                html += '		</div>';
                html += '		<div class="mask-main-content">';
                html += '			<div><img src="/resources/image/svg/rolling.svg" style="width:38px;display: block;margin: 20% auto;"></div>';
                html += '		</div>';
                html += '	</div>';
                html += '</div>';
                box = $(html).appendTo("body");
                box.find(".content-mask-main").animate({"bottom": "0px"});
                $('body').css('overflow', 'hidden');

                html = '';
                $.each(serviceList, function (index, data) {
                    html += '		<div class="mask-main-content-item">';
                    html += '			<div style="display:flex;font-size: 14px;line-height: 24px;"><span style="flex:1;">' + returnValue(data.md_type) + '</span><span style="font-weight: bold;">' + returnValue(data.md_contactpeople) + '</span></div>';
                    html += '			<div style="display:flex;"><span style="flex:1;">' + returnDate(data.md_time) + '</span><span class="">' + returnValue(data.md_contactPhone) + '</span></div>';
                    html += '		</div>';
                });
                box.find(".mask-main-content").html(html);

                box.find("[name=contractBillClose]").on("click", function () {
                    box.find(".content-mask-main").animate({
                        bottom: "-1000px"
                    }, function () {
                        box.fadeOut("fast", function () {
                            box.remove();
                            $('body').css('overflow', 'auto');
                        });
                    });
                });

                box.on("click", function () {
                    box.find(".content-mask-main").animate({
                        bottom: "-1000px"
                    }, function () {
                        box.fadeOut("fast", function () {
                            box.remove();
                            $('body').css('overflow', 'auto');
                        });
                    });
                });
            }
        });

        // 查看合同附件
        $(document).on("click", "[name=conPerfected]", function () {
            window.location.href = "/appPage/contractPerfected?mode=perfect&con_code=" + getUrlParam("con_code")
        });

        // 查看合同附件
        $(document).on("click", "[name=conAttachmentView]", function () {
            var _img = $("#contractImageBox").find(">img");
            if (_img.length > 0) {
                mui.trigger(_img[0], "tap");
            }
        });

        // 物业交接详情
        $(document).on("click", "[name=propertyHandoverInfo]", function () {
            window.location.href = "/appPage/propertyHandoverInfo?mode=normal&con_code=" + getUrlParam("con_code");
        });

        // 费用结算详情
        $(document).on("click", "[name=propertySettlementInfo]", function () {
            window.location.href = "/appPage/propertySettlementInfo?mode=in&con_code=" + getUrlParam("con_code");
        });

        // 查看电子合同
        $(document).on("click", "[name=EContractView]", function () {
            var type = $(this).attr("data-type") === "托管合同" ? "tg" : "zl";
            window.location.href = "/appPage/contractPreview?con_code=" + getUrlParam("con_code") + "&con_type=" + type;
        });

        // --功能操作--

        // 编辑合同
        $(document).on("click", "[name=conEdit]", function () {
            if (!isOperation) return fun_operation_tip();
            var contract_type = $(this).attr("data-type") === "托管合同" ? "tg" : "zl";
            window.location.href = "/appPage/contractEdit?contract_type=" + contract_type + "&con_code=" + getQueryString("con_code") + "&mode=edit&con_type=" + $(this).attr("data-type");
        });

        // 重新编辑
        $(document).on("click", "[name=conReEdit]", function () {
            if (!isOperation) return fun_operation_tip();
            $.hint.confirm("确定收回签名并修改合同吗？", function (box, result) {
                if (result) {
                    $.contractInfo.updateContractSign(this, 0);
                }
            });
        });

        // 重新签名
        $(document).on("click", "[name=conReSignature]", function () {
            if (!isOperation) return fun_operation_tip();
            $.hint.confirm("确定需要重新签名吗？", function (box, result) {
                if (result) {
                    $.contractInfo.updateContractSign(this, 0);
                }
            });
            // OCContract.contractReSignature(getUrlParam("con_code"), $(this).attr("data-type") === "托管合同" ? "tg" : "zl");
        });

        // 编辑客户
        $(document).on("click", "[name=editCustomer]", function () {
            if (!isOperation) return fun_operation_tip();
        });

        // 租金付款
        $(document).on("click", "[name=conPay]", function () {
            if (!isOperation) return fun_operation_tip();
            var _order = $.contractInfo.param.contractOrder;
            OCContract.contractBillPay(_order.bco_code, _order.bco_currentCycle);
        });

        // 发送签名
        $(document).on("click", "[name=sendSignature]", function () {
            if (!isOperation) return fun_operation_tip();
            $.contractInfo.updateContractSign(this, 1);
        });

        // 客户签名
        $(document).on("click", "[name=conSignature]", function () {
            if (!isOperation) return fun_operation_tip();
            OCContract.contractSignature(getUrlParam("con_code"));
        });

        // 确认客户签名
        $(document).on("click", "[name=conSignatureConfirm]", function () {
            if (!isOperation) return fun_operation_tip();
            $.hint.confirm("请认真审核合同信息并确认客户签名是否正楷可识别，一旦确认签名后将不可修改合同。", function (box, result) {
                if (result) {
                    $.contractInfo.updateContractSign(this, 21);
                }
            });
        });

        // 物业交接编辑
        $(document).on("click", "[name=propertyHandoverEdit]", function () {
            if (!isOperation) return fun_operation_tip();
            window.location.href = "/appPage/propertyHandoverEdit?mode=normal&con_code=" + getUrlParam("con_code") + "&em_id=" + getUrlParam("em_id");
        });

        // 费用结算编辑
        $(document).on("click", "[name=propertySettlementEdit]", function () {
            if (!isOperation) return fun_operation_tip();
            window.location.href = "/appPage/propertySettlementEdit?mode=in&con_code=" + getUrlParam("con_code");
        });

        // 跳转招租订单详情页面
        $(document).on("click", "[name=conForRent]", function () {
            var cco_code = $(this).attr("data-code");
            if (isEmpty(cco_code)) {
                return $.hint.tip("参数错误，请刷新页面重试或联系管理员", "error");
            }
            OCContract.contractForRentInfo(cco_code);
        });

        // 提交合同审核
        $(document).on("click", "[name=conAuditing]", function () {
            if (!isOperation) return fun_operation_tip();
            var property = $(this).attr("data-property");
            var hint = $(this).attr("data-hint");
            if (property === "disabled") {
                $.hint.tip(hint, "hint");
            } else {
                $.hint.confirm("确定提交审核吗？", function (box, result) {
                    if (result) {
                        $.contractInfo.submitContractAuditing(this);
                    }
                });
            }
        });

        // 提交合同复核
        $(document).on("click", "[name=conReview]", function () {
            if (!isOperation) return fun_operation_tip();
            var property = $(this).attr("data-property");
            var hint = $(this).attr("data-hint");
            if (property === "disabled") {
                $.hint.tip(hint, "hint");
                return;
            }
            $.hint.confirm("确定提交复核吗？", function (box, result) {
                if (result) {
                    $.contractInfo.submitContractReview(this);
                }
            });
        });

    };

    /**
     * 查询合同签名
     *
     * @param cs_state 审核状态
     */
    $.contractInfo.updateContractSign = function (obj, cs_state) {
        var setTimeoutIndex;
        $.ajax({
            type: "POST",
            url: "/appPage/sendContractSign",
            data: {
                con_code: getUrlParam("con_code"),
                cs_state: cs_state
            },
            dataType: "json",
            beforeSend: function () {
                $(obj).attr("disabled", "disabled");
                // 1.
                $.hint.tip("数据提交中...", "loading");
                setTimeoutIndex = setTimeout(function () {
                    // 2.
                    $.hint.tip("合同认证中，请耐心等待", "loading");
                }, 3000);
            }
        }).done(function (result) {
            clearTimeout(setTimeoutIndex);
            if (result.code !== 200) return $.hint.tip(result.msg, "error");
            $.hint.tip("成功", "success", 600);
            $.contractInfo.load_data();
            // // 重签合同
            // if (returnNumber(cs_state) === 0) {
            //     OCContract.contractEdit(getUrlParam("con_code"), $.contractInfo.param.contractObject.contractObject_Type === "托管合同" ? "tg" : "zl");
            // }
        }).fail(function (e) {
            $.hint.tip("数据请求失败", "error");
        }).always(function () {
            $(obj).removeAttr("disabled");
        });
    };

    /**
     * 提交合同审核
     *
     * @param obj
     */
    $.contractInfo.submitContractAuditing = function (obj) {
        $.ajax({
            url: "/contractObject/submitContractAuditing",
            data: {
                con_code: getUrlParam("con_code"),
                em_id: getUrlParam("em_id")
            },
            dataType: "json",
            beforeSend: function () {
                $(obj).attr("disabled", "disabled");
                $.hint.tip("数据提交中...", "loading");
            }
        }).done(function (result) {
            if (result.code !== 200) return $.hint.tip(result.msg, "error");
            $.hint.tip("提交成功", "success", 2000, function () {
                $.contractInfo.load_data();
            });
        }).fail(function (e) {
            $.hint.tip("数据请求失败", "error");
        }).always(function () {
            $(obj).removeAttr("disabled");
        });
    };

    /**
     * 提交合同复核
     *
     * @param obj
     */
    $.contractInfo.submitContractReview = function (obj) {
        $.ajax({
            url: "/contractObject/submitContractReview",
            data: {
                con_code: getUrlParam("con_code"),
                em_id: getUrlParam("em_id")
            },
            dataType: "json",
            beforeSend: function () {
                $(obj).attr("disabled", "disabled");
                $.hint.tip("数据提交中...", "loading");
            }
        }).done(function (result) {
            if (result.code !== 200) return $.hint.tip(result.msg, "error");
            $.hint.tip("提交成功", "success", 2000, function () {
                $.contractInfo.load_data();
            });
        }).fail(function (e) {
            $.hint.tip("数据请求失败", "error");
        }).always(function () {
            $(obj).removeAttr("disabled");
        });
    };

})(jQuery);