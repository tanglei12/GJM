package com.gjp.util;

import java.util.Date;
import java.util.Random;

/**
 * 随机数
 * @author zoe
 *
 */
public class Randoms {
	public static String randoms(){
		int max=19;
        int min=0;
        Random random = new Random();

        int s = random.nextInt(max)%(max-min+1) + min;
        return String.valueOf(s);
	}
	
	public static String random(){
		int max=9999;
        int min=1000;
        Random random = new Random();
        int s = random.nextInt(max)%(max-min+1) + min;
        return String.valueOf(s);
	}
	
	/**
	 * 根据当前时间戳加4位随机数
	 * @return
	 */
	public static String getRandomDate(){
		Date date = new Date();
		String str = date.getTime()+"";
		int max=9999;
        int min=1000;
        Random random = new Random();
        int s = random.nextInt(max)%(max-min+1) + min;
		return str+s;
	}
	
	//生成随机数字和字母,length表示随机生成几位的数字和字母  
    public static String getStringRandom(int length) {  
          
        String val = "";  
        Random random = new Random();  
          
        //参数length，表示生成几位随机数  
        for(int i = 0; i < length; i++) {  
            String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num";  
            //输出字母还是数字  
            if( "char".equalsIgnoreCase(charOrNum) ) {  
                //输出是大写字母还是小写字母  
                int temp = random.nextInt(2) % 2 == 0 ? 65 : 97;  
                val += (char)(random.nextInt(26) + temp);  
            } else if( "num".equalsIgnoreCase(charOrNum) ) {  
                val += String.valueOf(random.nextInt(10));  
            }  
        }  
        return val;  
    }  
    
	public static String randomss(){
		int max=9999;
        int min=1000;
        Random random = new Random();

        int s = random.nextInt(max)%(max-min+1) + min;
        return String.valueOf(s);
	}
	
	public static void main(String[] args) {
		Random random = new Random();
		Integer rd = random.nextInt(9999-1000+1)+1000;
		String number = "202"+(new Date()).getTime()+rd.toString();
		System.out.println(number);
	}
	
}
