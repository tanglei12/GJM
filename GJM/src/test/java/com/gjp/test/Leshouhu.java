package com.gjp.test;

import com.gjp.util.RsaUtil;
import com.gjp.util.UrlData;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Test;

public class Leshouhu {

	@SuppressWarnings("unused")
	@Test
	public void run() throws Exception {
		String version = "10";
		String custid = "8100150430001501";
		String cmdId = "GetBillListByPeriodForGJP";
		String cmdIdOrder = "GetOrderListByPeriodForGJP";
		String starttime = "2015-04-01 17:01:00";
		String endtime = "2015-10-07 9:17:00";
		String ordercode = "12150731195358079001";
		String chkvalue = starttime + endtime + custid;

		String keyBytes = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBANQ5PTOLZ6chMF73T0Ef6KLc9mrAJSzKrA95fuoGf7JAGPr+5f4KwqufHbunEIQzJKQ10Ot8ETfi5h6pKpz7NuqCPpQySBYvfY4xD+VdeJai4MZfzm1O0x7s5aoaTOfCCevZQzkBT4MyMWP8EoVW6kLblcRFlU2Wo7i2TBfgVJMXAgMBAAECgYEAtI3CKPFIjWNqMNF9Zy3LkYwmRaoVtqbzffLi7B39VFy+JATrDZiACN1FwZogLikI2oBCr6YNTBvJpnpMG+SK0amov7NCdFytKiG66Ir4kYom8mrTPvkxxz2Yf4Up/Ml3achXH9GiPbKqbMewNOo4mXMNX3MJaemibFaMWkHjQ8kCQQD7H4rAR2+cZAb+XGZQ148VHDfZnctmwEYwE/VCrsiy7WK+kfM6hGvZYVupRp5HRgmgqMqMUDvvAP8Csq0A8lfLAkEA2FhOydkhS9bq7DW/QV6O48Z93ig/42ofI7/RZup/qeA2lvGt56hvJKeAqrUI7fYpjpExKsASTnvcF0Y8ocnQZQJAH5HskJWqe1+73VhiaIFg9IdyogILYySC7mJj7/knNA9R3aFdkZq6MD7kFhjRpyYv6amupQslLbvTU1SBGWBeFwJAPUPss+6AJljrWA70ZU+gyVIJjOL7DKyduuL0Kt/XXUT4UJCKPeMN7mRc5Hq116VxKUVmlgOka4NZ1WF3hB2BnQJAKD353WuF9rMT/dv7ch4rUHB67lMZp6tz7VReGGWlSe52aCMhnAixSpT5o/CQVQVypgzW1hckWgeQwB5OWZG8+w==";
		// 解密密钥
		chkvalue = RsaUtil.sign(chkvalue.getBytes(), keyBytes);
		String https = "version=" + version + "&custid=" + custid + "&cmdId=" + cmdIdOrder + "&starttime=" + starttime + "&endtime=" + endtime + "&ordercode=" + ordercode + "&chkvalue=" + chkvalue + "";
		System.out.println("http://api.leshoufu.com/partner?" + https);
		String str = UrlData.sendPostUrl("http://api.leshoufu.com/partner", https);
		JSONObject json = new JSONObject(str);
		JSONArray data = json.getJSONArray("Data");
		System.out.println(data.length() == 0);
		for (int i = 0; i < data.length(); i++) {
			System.out.println(data.getString(i));
		}

	}

}
