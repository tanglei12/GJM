$(function(){
    if(getQueryString("type") == null) {
        var startD = (getCurrentMonthFirst()).Format("yyyy-MM-dd");
        $(".titleDate").text(startD + "~" + (new Date()).Format("yyyy-MM-dd"));
        $(".dateTime1").val(startD);
        $(".dateTime2").val((new Date()).Format("yyyy-MM-dd"));
    }else{
        var startEnd = getQueryString("datetime1")+"~"+getQueryString("datetime2");
        $(".titleDate").text(startEnd);
        $(".dateTime1").val(getQueryString("datetime1"));
        $(".dateTime2").val(getQueryString("datetime2"));
    }
    data();
    $(".searchBar .timeClick[name='time']").off("click")
    $(".searchBar .timeClick[name='time']").on("click", function(){
        $("#Num").text(1);
        $(".dateTime1").val("");
        $(".dateTime2").val(returnDate(new Date()));
        $(".searchBar .timeClick").each(function(i){
            $(this).attr("class","timeClick");
        });
        $(this).attr("class","timeClick mouseDown");

        $(".inputTime").width(0);
        $(".inputTime").hide();

        data();
    });
    $(".searchBar .timeClick[name='times']").off("click");
    $(".searchBar .timeClick[name='times']").on("click", function(){
        $(".dateTime1").val("");
        $(".dateTime2").val(returnDate(new Date()));
        $(".searchBar .timeClick").each(function(i){
            $(this).attr("class","timeClick");
        });
        $(this).attr("class","timeClick mouseDown");

        $(".inputTime").show();
        $(".inputTime").animate({width: 200},300);
    });

    // 时间筛选读取数据
    $(".searchBar .dateTime1").on("focus", function(){
        WdatePicker({
            onpicked: function(dp){
                if($(".dateTime1").val() != "" && $(".dateTime2").val() != ""){
                    data();
                }
            }
        });
    });
    // 时间筛选读取数据
    $(".searchBar .dateTime2").on("focus", function(){
        WdatePicker({
            onpicked: function(dp){
                if($(".dateTime1").val() != "" && $(".dateTime2").val() != ""){
                    data();
                }
            }
        });
    });

    // 选择类型
    $(".selectCheck").click(function(){
        $(".selectCheck").attr("class","selectCheck");
        $(this).attr("class","selectCheck check");
        data();
    });

    $(".personTable").freezeHeader();
});

function data(){
    var dateStr = '';
    $(".searchBar .timeClick").each(function(i){
        if($(this).attr("class") == "timeClick mouseDown"){
            dateStr = $(this).text();
        }
    });
    var dateStart = $(".dateTime1").val();
    var dateEnd = $(".dateTime2").val();
    if(getQueryString("datetime1") != null && getQueryString("datetime1") != ""){
        dateStr = getQueryString("datetime1");
    }
    if(getQueryString("datetime2") != null && getQueryString("datetime2") != ""){
        dateEnd = getQueryString("datetime2");
    }
    var dateType = $("#dateSelect").val();
    var type;
    if(getQueryString("type") != null){
        type = getQueryString("type");
        $("table thead tr").eq(1).find("th").eq(2).text("房源地址");
        $(".searchBar").hide();
    }else{
        type = "ucc";
        $("table thead tr").eq(1).find("th").eq(2).text("门店");
        $(".searchBar").show();
    }
    var ucc_id = "";
    if(getQueryString("ucc_id") != null){
        ucc_id = getQueryString("ucc_id");
    }
    if(getQueryString("ucc_name") != null){
        $(".titleFont").text(getQueryString("ucc_name"));
    }
    $.ajax({
        type: "POST",
        url: "/achievement/selectAchievementHouseMoneyNo",
        data: {
            dateStart : dateStart,
            dateEnd : dateEnd,
            dateStr : dateStr,
            dateType : dateType,
            ucc_id : ucc_id,
            type : type
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("tbody").html("");
            if(result.dateTime1 != null && result.dateTime1 != "" && result.dateTime2 != null && result.dateTime2 != ""){
                $(".titleDate").text(result.dateTime1+"~"+result.dateTime2);
            }
            if(result.code == 200){

                $(".sMoneyFont").text(result.sum.directIncome);
                $(".fMoneyFont").text(result.sum.indirectIncome);
                $(".julyMoney").text(result.sum.julyMoney);
                var html = "";
                var indexs = 1;
                $(result.data).each(function(index,item){
                    if(index % 2 == 1){
                        html+='<tr class="odd">';
                    }else{
                        html+='<tr>';
                    }
                    var ahm_synosisCooperateMoney = 0.00;
                    if(item.ahm_synosisCooperateMoney != 0.0){
                        ahm_synosisCooperateMoney = -item.ahm_synosisCooperateMoney;
                    }
                    var ahm_directCooperateMoney = 0.00;
                    if(item.ahm_directCooperateMoney != 0.0){
                        ahm_directCooperateMoney = -item.ahm_directCooperateMoney;
                    }
                    var ahm_clearServiceMoney = 0.00;
                    if(item.ahm_clearServiceMoney != 0.0){
                        ahm_clearServiceMoney = -item.ahm_clearServiceMoney;
                    }
                    var ahm_repairMoney = 0.00;
                    if(item.ahm_repairMoney != 0.0){
                        ahm_repairMoney = -item.ahm_repairMoney;
                    }
                    var ahm_directVacant = 0.00;
                    if(item.ahm_directVacant != 0.0){
                        ahm_directVacant = -item.ahm_directVacant;
                    }
                    var ahm_synopsisVacant = 0.00;
                    if(item.ahm_synopsisVacant != 0.0){
                        ahm_synopsisVacant = -item.ahm_synopsisVacant;
                    }
                    var ontherMoney = 0.00;
                    if(item.ontherMoney != 0.0){
                        ontherMoney = -item.ontherMoney;
                    }
                    var ahm_directOutHouseMoney = 0.00;
                    if(item.ahm_directOutHouseMoney != 0.0){
                        ahm_directOutHouseMoney = -item.ahm_directOutHouseMoney;
                    }
                    var ahm_synopsisOutHouseMoney = 0.00;
                    if(item.ahm_synopsisOutHouseMoney != 0.0){
                        ahm_synopsisOutHouseMoney = -item.ahm_synopsisOutHouseMoney;
                    }
                    var ahm_insurance = 0.00;
                    if(item.ahm_insurance != 0.0){
                        ahm_insurance = -item.ahm_insurance;
                    }
                    var ahm_operateMoney = 0.00;
                    if(item.ahm_operateMoney != 0.0){
                        ahm_operateMoney = -item.ahm_operateMoney;
                    }
                    var storeFundMoney = 0.00;
                    if(item.storeFundMoney != 0.0){
                        storeFundMoney = -item.storeFundMoney;
                    }
                    var serviceMoney = 0.00;
                    if(item.serviceMoney != 0.0){
                        serviceMoney = -item.serviceMoney;
                    }
                    var ahm_gsmanageMoney = 0.00;
                    if(item.ahm_gsmanageMoney != 0.0){
                        ahm_gsmanageMoney = -item.ahm_gsmanageMoney;
                    }

                    html+='<td><label class="checkbox-min" data-id="'+ item.hi_code +'"><input type="checkbox" class="input_check" name="check"><span></span></label></td>';
                    html+='<td>'+ (index+1) +'</td>';
                    if(type == "ucc"){
                        html+='<td><a onclick="hrefClickUcc('+ item.ucc_id +',\''+ item.house_address +'\')" data-type="/houseLibrary/jumpHouseInfo?hi_code='+ item.hi_code +'">'+ item.house_address +'</a></td>';
                    }else{
                        html+='<td><a onclick="hrefClick(this)" data-type="/houseLibrary/jumpHouseInfo?hi_code='+ item.hi_code +'">'+ item.house_address +'</a></td>';
                    }
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC;">直接</label><label style="width:100%; display: block;">间接</label></td>';
                    html+='<td>'+ item.rentMoney +'</td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ item.ahm_forRentMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">-</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ item.ahm_manageMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">-</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ item.ahm_serviceMoney +'</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ item.ahm_penalty +'</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ item.ahm_subletMoney +'</label></td>';
                    html+='<td>'+ item.income +'</td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ahm_directCooperateMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ ahm_synosisCooperateMoney +'</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ ahm_clearServiceMoney +'</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ ahm_repairMoney +'</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">0</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">-</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ahm_directOutHouseMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ ahm_synopsisOutHouseMoney +'</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ahm_insurance +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">-</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ahm_gsmanageMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">-</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">0</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ahm_operateMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">-</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ serviceMoney +'</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ storeFundMoney +'</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">0</label></td>';
                    html+='<td>'+ item.payment +'</td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ahm_directVacant +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ ahm_synopsisVacant +'</label></td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ontherMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">0</label></td>';
                    html+='<td>'+ item.loss +'</td>';
                    html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">0</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">0</label></td>';
                    html+='<td>'+ item.profit +'</td>';
                    html+='</tr>';

                    indexs+=1;
                });


                var ahm_synosisCooperateMoney = 0.00;
                if(result.sum.ahm_synosisCooperateMoney != 0.0){
                    ahm_synosisCooperateMoney = -result.sum.ahm_synosisCooperateMoney;
                }
                var ahm_directCooperateMoney = 0.00;
                if(result.sum.ahm_directCooperateMoney != 0.0){
                    ahm_directCooperateMoney = -result.sum.ahm_directCooperateMoney;
                }
                var ahm_clearServiceMoney = 0.00;
                if(result.sum.ahm_clearServiceMoney != 0.0){
                    ahm_clearServiceMoney = -result.sum.ahm_clearServiceMoney;
                }
                var ahm_repairMoney = 0.00;
                if(result.sum.ahm_repairMoney != 0.0){
                    ahm_repairMoney = -result.sum.ahm_repairMoney;
                }
                var ahm_directVacant = 0.00;
                if(result.sum.ahm_directVacant != 0.0){
                    ahm_directVacant = -result.sum.ahm_directVacant;
                }
                var ahm_synopsisVacant = 0.00;
                if(result.sum.ahm_synopsisVacant != 0.0){
                    ahm_synopsisVacant = -result.sum.ahm_synopsisVacant;
                }
                var ontherMoney = 0.00;
                if(result.sum.ontherMoney != 0.0){
                    ontherMoney = -result.sum.ontherMoney;
                }
                var ahm_directOutHouseMoney = 0.00;
                if(result.sum.ahm_directOutHouseMoney != 0.0){
                    ahm_directOutHouseMoney = -result.sum.ahm_directOutHouseMoney;
                }
                var ahm_synopsisOutHouseMoney = 0.00;
                if(result.sum.ahm_synopsisOutHouseMoney != 0.0){
                    ahm_synopsisOutHouseMoney = -result.sum.ahm_synopsisOutHouseMoney;
                }
                var ahm_insurance = 0.00;
                if(result.sum.ahm_insurance != 0.0){
                    ahm_insurance = -result.sum.ahm_insurance;
                }
                var ahm_operateMoney = 0.00;
                if(result.sum.ahm_operateMoney != 0.0){
                    ahm_operateMoney = -result.sum.ahm_operateMoney;
                }
                var storeFundMoney = 0.00;
                if(result.sum.storeFundMoney != 0.0){
                    storeFundMoney = -result.sum.storeFundMoney;
                }
                var serviceMoney = 0.00;
                if(result.sum.serviceMoney != 0.0){
                    serviceMoney = -result.sum.serviceMoney;
                }
                var directpayment = 0.00;
                if(result.sum.directpayment != 0.0){
                    directpayment = -result.sum.directpayment;
                }
                var synopsispayment = 0.00;
                if(result.sum.synopsispayment != 0.0){
                    synopsispayment = -result.sum.synopsispayment;
                }
                var directloss = 0.00;
                if(result.sum.directloss != 0.0){
                    directloss = -result.sum.directloss;
                }
                var synopsisLoss = 0.00;
                if(result.sum.synopsisLoss != 0.0){
                    synopsisLoss = -result.sum.synopsisLoss;
                }
                var directProfit = 0.00;
                if(result.sum.directProfit != 0.0){
                    directProfit = result.sum.directProfit;
                }
                var synopsisProfit = 0.00;
                if(result.sum.synopsisProfit != 0.0){
                    synopsisProfit = result.sum.synopsisProfit;
                }

                if((indexs-1) % 2 == 1){
                    html+='<tr class="odd">';
                }else{
                    html+='<tr>';
                }
                html+='<td><label class="checkbox-min" data-id=""><input type="checkbox" class="input_check" name="check"><span></span></label></td>';
                html+='<td>'+ indexs +'</td>';
                html+='<td>小计</td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC;">直接费用</label><label style="width:100%; display: block;">间接费用</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ result.sum.ahm_directRent +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ result.sum.ahm_synopsisRent +'</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ result.sum.ahm_forRentMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">-</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ result.sum.ahm_manageMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">-</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ result.sum.ahm_serviceMoney +'</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ result.sum.ahm_penalty +'</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ result.sum.ahm_subletMoney +'</label></td>';

                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ result.sum.directincome +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ result.sum.synopsisincome +'</label></td>';

                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ahm_directCooperateMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ ahm_synosisCooperateMoney +'</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ ahm_clearServiceMoney +'</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ ahm_repairMoney +'</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">0</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">-</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ahm_directOutHouseMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ ahm_synopsisOutHouseMoney +'</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ahm_insurance +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">-</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ result.sum.sumgsManageMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">-</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">0</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ahm_operateMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">-</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ serviceMoney +'</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ storeFundMoney +'</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">-</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">0</label></td>';

                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ directpayment +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ synopsispayment +'</label></td>';

                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ahm_directVacant +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ ahm_synopsisVacant +'</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ ontherMoney +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">0</label></td>';

                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ directloss +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ synopsisLoss +'</label></td>';

                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">0</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">0</label></td>';
                html+='<td><label style="width:100%; display: block; border-bottom: 1px solid #CCCCCC; text-align: right; padding-right: 10px;">'+ directProfit +'</label><label style="width:100%; display: block; text-align: right; padding-right: 10px;">'+ synopsisProfit +'</label></td>';
                html+='</tr>';

                $(".sIncome").text(""+ (result.sum.directincome+result.sum.synopsisincome).toFixed(2) +"(直："+ result.sum.directincome +" 间："+ result.sum.synopsisincome +")");
                $(".sExpenditure").text(""+ (directpayment+synopsispayment).toFixed(2) +"(直："+ directpayment +" 间："+ synopsispayment +")");
                $(".sLoss").text(""+ (directloss+synopsisLoss).toFixed(2) +"(直："+ directloss +" 间："+ synopsisLoss +")");
                $(".sTaxation").text("0(直：0 间：0)");

                // 总利润
                $(".sumMoneyFont").text((directProfit+synopsisProfit).toFixed(2));

                $("tbody").html(html);
            }
        }
    });
}

/**
 * 导出数据
 */
function outdata(){
    var dateStr = '';
    $(".searchBar .timeClick").each(function(i){
        if($(this).attr("class") == "timeClick mouseDown"){
            dateStr = $(this).text();
        }
    });
    var dateStart = $(".dateTime1").val();
    var dateEnd = $(".dateTime2").val();
    if(getQueryString("datetime1") != null && getQueryString("datetime1") != ""){
        dateStr = getQueryString("datetime1");
    }
    if(getQueryString("datetime2") != null && getQueryString("datetime2") != ""){
        dateEnd = getQueryString("datetime2");
    }
    var dateType = $("#dateSelect").val();
    var type;
    if(getQueryString("type") != null){
        type = getQueryString("type");
        $("table thead tr").eq(1).find("th").eq(2).text("房源地址");
    }else{
        type = "ucc";
        $("table thead tr").eq(1).find("th").eq(2).text("门店");
    }
    var ucc_id = "";
    if(getQueryString("ucc_id") != null){
        ucc_id = getQueryString("ucc_id");
    }
    if(getQueryString("ucc_name") != null){
        $(".titleFont").text(getQueryString("ucc_name"));
    }
    $.ajax({
        type: "POST",
        url: "/achievement/uccHouseAchievementTOExcel",
        data: {
            dateStart: dateStart,
            dateEnd: dateEnd,
            dateStr: dateStr,
            dateType: dateType,
            ucc_id: ucc_id,
            type: type
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function (result) {
            window.top.location.href = result.path;
        }
    });
}

/** 跳转页面*/
function hrefClick(ids){
    window.parent.href_mo($(ids).attr("data-type"),"房屋信息","房源利润");
}

/** 跳转页面*/
function hrefClickUcc(ucc_id,ucc_name){
    window.parent.href_mo("/achievement/selectUccMoney?ucc_id="+ucc_id+"&type=house&datetime1="+ $(".dateTime1").val() +"&datetime2="+ $(".dateTime2").val() +"&ucc_name="+ ucc_name +"","房屋利润","部门利润");
}

//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

// 获取url参数

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

// 获取当前月的第一天
function getCurrentMonthFirst(){
    var date=new Date();
    date.setDate(1);
    return date;
}