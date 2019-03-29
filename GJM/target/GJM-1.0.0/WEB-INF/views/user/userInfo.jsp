<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
<title>个人信息</title>
</head>
<link href="/resources/css/manage_index.css" rel="stylesheet" type="text/css">
<link href="/resources/css/user.css" rel="stylesheet" type="text/css">
<link href="/resources/common/uploadify/css/uploadify.css" rel="stylesheet" type="text/css">
<link href="/resources/common/cropper/cropper.css" rel="stylesheet" type="text/css">
<link href="/resources/common/sweet-alert/css/sweet-alert.css" rel="stylesheet" type="text/css">
<link href="/resources/css/common/common.css" rel="stylesheet" type="text/css">
<link href="/resources/css/library/house-info-eidt.css" rel="stylesheet" type="text/css">
<link href="/resources/css/houseIntention/followUp.css" rel="stylesheet" type="text/css">
<link href="/resources/css/product/addInitIntention.css" rel="stylesheet" type="text/css">

<script src="/resources/js/jquery-1.7.2.min.js"></script>
<script src="/resources/js/jquery.cookie.js"></script>
<script src="/resources/common/sweet-alert/js/sweet-alert.min.js"></script>
<script src="/resources/common/uploadify/js/jquery.uploadify.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script src="/resources/Plug-in/jbox-v2.3/jBox/i18n/jquery.jBox-zh-CN.js"></script>
<script src="/resources/common/cropper/cropper.js"></script>
<script src="/resources/common/uploadify/js/jquery.uploadify.js"></script>
<script src="/resources/js/user/image-upload.js"></script>
<script src="/resources/js/user/user_image_edit.js"></script>
<script src="/resources/js/common/common.js"></script>
<script src="/resources/js/userInfo.js"></script>
</head>
<body>
	<div id="content">
		<div class="titles">
			<div class="main-boxs"></div>
			<span class="font_1">基本信息</span>
		</div>
		<div class="main">
			<div id="info-box">
				<!-- 头像 -->
				<div id="pic-box">
					<a href="javascript:midifyPic(1);"> <img id="pic-img" src=""> <span id="pic-text">修改头像</span> <span id="pic-mask"></span>
					</a>
				</div>
				<!-- 描述 -->
				<div id="pic-title">
					<div id="user-name" class="p-title">
						<span>账号：</span><span id="em_account"></span>
					</div>
					<div id="user-type" class="p-title">
						<span>部门：</span><a href="javascript:;" style="color: #005ea7; font-weight: 600;" class="ucc_short"></a>
					</div>
					<div id="user-safeLv" class="p-title">
						<span>职位：</span>
						<i class="safelv-img" style="background-position: 1px -54px;"></i>
						<span><span class="ucr_name"></span></span>
					</div>
				</div>
			</div>
			<div class="info-item">
				<dl class="s-dl">
					<dt>姓名</dt>
					<dd>
						<input type="text" id="user-nick" class="item-input input-readonly" name="em_name" readonly="readonly">
						<i class="png-ok"></i>
					</dd>
					<dd class="c"></dd>
				</dl>
				<dl style="margin-top: 15px;">
					<dt>性别</dt>
					<dd class="pt5">
						<label for="sex1" class="icon-sex icon-sex-checked" data-name="radSex" data-value="1" data-status="true"><em class="icon-sex1"></em>男<input name="em_sex" type="radio" value="man" style="display: none;"></label> <label for="sex2" class="icon-sex" data-name="radSex" data-value="2" data-status="true"><em class="icon-sex2"></em>女<input name="em_sex" type="radio" value="woman" style="display: none;"></label>
						<p data-for="radSex" class="prompt-msg msg"></p>
					</dd>
				</dl>
				<!-- 
					<dl style="margin-top: -15px;">
						<dt>出生日期</dt>
						<dd><div id="item-date" data-value=""><fieldset id="birthday-picker" class="birthday-picker"><select class="birth-year" name="birth[year]"><option value="0">年</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option></select><label class="birth-title">年</label><select class="birth-month" name="birth[month]"><option value="0">月</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select><label class="birth-title">月</label><select class="birth-day" name="birth[day]"><option value="0">日</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select><label class="birth-title">日</label><input type="hidden" name="birthdate" id="birthdate" value=""></fieldset></div></dd>
					</dl>
				 -->
				<dl>
					<dt>主手机</dt>
					<dd>
						<input type="text" id="info-phone" class="item-input" onblur="isPhoneF();" name="em_phone">
						&nbsp;&nbsp;&nbsp;<span id="phone"></span> <label class="type-label" onclick="addPhone();"> +<i></i>
						</label>
					</dd>
				</dl>
				<dl>
					<dt>证件号</dt>
					<dd>
						<input type="text" id="info-email" onblur="accordingIdGender();" class="item-input" name="em_documentID">
						&nbsp;&nbsp;&nbsp;<span id="sfz"></span>
					</dd>
				</dl>
				<dl>
					<dt>所在地</dt>
					<dd>
						<input type="text" id="item-address2" name="em_address" class="item-input">
						<input type="hidden" id="em_id" name="em_id" class="item-input">
					</dd>
				</dl>

				<!-- 名片 -->
				<div class="col-md-6" style="width: 386px; margin-left: 94px; margin-bottom: 40px;">
					<!-- 图片信息 -->
					<div class="box-content" style="min-width: 230px; width: 386px;">
						<div class="sub-title">
							<ul class="title-nav">
								<li class="visited">电子名片</li>
							</ul>
						</div>
						<div class="sub-content" style="padding-left: 66px;">
							<div class="image-upload-box image-card-div">
								<label class="image-item-add" for="house-image"> <input type="file" id="house-image">
								</label>
							</div>
						</div>
					</div>
				</div>

				<dl>
					<!-- 提交 -->
					<dt>&nbsp;</dt>
					<dd>
						<input type="button" id="subs" value="保存" onclick="updateUser();" class="item-input">
					</dd>
				</dl>
			</div>
		</div>
	</div>
</body>
</html>
