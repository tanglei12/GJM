package com.gjp.test;

import org.junit.Test;

public class SendMessageTest {

	public static String url = "http://sms.ht3g.com/SmsWebService.asmx?wsdl";
	public static String httpUrl = "http://sms.ht3g.com/sms.aspx";
	public static String userid = "150";
	public static String account = "fwtg";
	public static String password = "123456";
	public static String checkWord = "这个字符串中是否包含了屏蔽字";

	/*public static void main(String[] args) {

		// keyword();
		// overage();
		//test();
		SmsClientSend.sendSms(url, userid, account, password, "18580428139", "测试", "", "");
	}*/
	
	@SuppressWarnings("unused")
	@Test
	public void run(){
		/*Service service = new Service();
		try {
			Call call = (Call) service.createCall();
			call.setTargetEndpointAddress(new java.net.URL(url));
			call.setOperationName("SendSms");
			Object[] obj = new Object[] { userid, account, password, "18580428139", "测试", "", "" };
			String reVal = call.invoke(obj).toString();
			System.out.println(AppUtil.xmlElements(reVal));
		} catch (ServiceException e) {
			e.printStackTrace();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (RemoteException e) {
			e.printStackTrace();
		}*/
		String str = "<?xml version='1.0' encoding='utf-8' ?><returnsms> <returnstatus>Success</returnstatus> <message>ok</message> <remainpoint>5</remainpoint> <taskID>831009</taskID> <successCounts>1</successCounts></returnsms>";
//		xmlElements(SmsClientSend.sendSms(httpUrl, userid, account, password, "18580428139", "测试", "", ""));
	}
	
	

	/*public static void keyword() {

		String keyword = SmsClientKeyword.queryKeyWord(url, userid, account,
				password, checkWord);
		System.out.println(keyword);
	}

	public static void overage() {

		String overage = SmsClientOverage.queryOverage(url, userid, account,
				password);
		System.out.println(overage);
	}

	public static void test() {
		String send = SmsClientAccessTool.getInstance().doAccessHTTPPost(
				url, "", "utf-8");
		System.out.println(send);
	}*/
}
