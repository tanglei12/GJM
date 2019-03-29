<%@ page pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>定金侧滑框</title>
    <link href="/resources/Plug-in/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/bookkeepBook/expense.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/common.box.css" rel="stylesheet" type="text/css">
    <link href="/resources/css/common/page.list.css" rel="stylesheet" type="text/css">

    <script src="/resources/js/jquery-1.7.2.min.js"></script>
    <script src="/resources/js/product/jquery-cookie.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/common/common.state.js"></script>
    <script src="/resources/js/financeManage/depositManageSlip.js"></script>
    <style type="text/css">
        .finish-butten {
            float: left;
            font-size: 15px;
            border: 1px solid;
            width: 81px;
            margin: 15px 10px;
            background-color: #18bc9c;
            border-radius: 6px;
            line-height: initial;
            text-align: center;
            height: 30px;
        }
        .label {
            margin-left: 10px;
            font-size: 15px;
            border: 1px solid;
            line-height: initial;
            text-align: center;
            width: 120px;
            height: 38px;
            border-radius: 4px;
            padding: 3px 10px;
        }
    </style>
</head>
<body>
<div>
    <div class="box-content" style="box-shadow: none;">
        <div class="sub-title" id="contract-title"></div>
        <div class="sub-content" id="contract-content" style="border: 1px;"></div>
    </div>
</div>

<div class="expense">
    <div class="expense-container3" id="expense-container3" style="width:350px;min-height: 150px;">
        <div id="cd-buttons">
            <div style="margin: auto; width: 90%; text-align: center;border-bottom: 1px solid #06B;" id="titleInsert">
                <input value="定金违约处理" id="inputtext" name="inputtext" style="width:210px;border: none; text-align: center; font-size: 20px; color: #3E97C9; font-family: 微软雅黑; -moz-user-select: none; -webkit-user-select: none; cursor: default;" readonly="readonly">
            </div>
            <div class="sub-title" style="margin: auto; width: 95%;border-bottom: 1px solid whitesmoke;">
                <ul class="title-nav">
                    <li class="visited">是否退定金：</li>
                </ul>
            </div>
            <div class="radio-div" style="float:left;margin: 15px 40px;">
            </div>
            <div class="sub-title" style="margin: auto;width: 95%;border-bottom: 1px solid whitesmoke;float: left;">
                <ul class="title-nav" style="margin-left: 16px;">
                    <li class="visited">退款原因：</li>
                </ul>
            </div>
            <div style="float:left;margin: 15px 60px;">
                <textarea id="text" style="width: 230px;height: 100px;resize:none;"></textarea>
            </div>
            <div style="float: right;">
                <button class="finish-butten close-button">关闭</button>
                <button class="finish-butten sumbit-button">提交审核</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>