package com.gjp.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * 日历生成
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2016年8月30日 上午11:07:13 
 */
public class MyCalendar {
	
	public List<Object> calendar(int year, int month)  
	{  
	    Calendar firstcal = Calendar.getInstance(); 
	    Calendar lastcal = Calendar.getInstance();
	    Calendar lastcalUp = Calendar.getInstance();
	    Calendar lastcalDown = Calendar.getInstance();
//	    System.out.println("\t\t" + year + "年" + month + "月");
//	    System.out.println("日\t一\t二\t三\t四\t五\t六");
	    firstcal.set(year, month - 1, 1);// 所求月的第一天
	    lastcalUp.set(year, month - 2, 1);// 所求月上一个月的第一天
	    lastcalDown.set(year, month, 1);// 所求月下一个月的第一天
	    int dateofmonth = firstcal.getActualMaximum(Calendar.DATE);// 获取该月的天数 
	    int dateofUpMonth = lastcalUp.getActualMaximum(Calendar.DATE);// 获取该月上一个月的天数 
//	    int dateofDownMonth = lastcalDown.getActualMaximum(Calendar.DATE);// 获取该月下一个月的天数 
	    lastcal.set(year, month - 1, dateofmonth);// 所求月的最后一天  
	    lastcalUp.set(year, month - 2, dateofmonth);// 所求月上一个月的最后一天  
	    lastcalDown.set(year, month, dateofmonth);// 所求月下一个月的最后一天  
	  
	    // 获取所求月第一天是星期几，输出是中文的而不是数字的
	    // SimpleDateFormat fm = new SimpleDateFormat("E");
	    // System.out.println(fm.format(firstcal.getTime()));
	  
	    int weekofmonth = firstcal.getActualMaximum(Calendar.WEEK_OF_MONTH);// 获取该月的星期数  
	    String[][] week = new String[weekofmonth][7];
	    int firstday = MyCalendar.weekDay(firstcal); // 获取所求月第一天是星期几  
	    int lastday = MyCalendar.weekDay(lastcal); // 获取所求月最后一天是星期几  
	    int m = 1, f = 1, lasM = 1;// f的作用主要是判断是否需要将第一个星期归到中间几个星期一起计算  
	    int j;
	    List<Object> list = new ArrayList<Object>();
	    // 第一个星期  
	    if (firstday == 7){
	        f = 0;
	    }else{
	        for(j = 0; j < firstday; j++){
	            week[0][j] = (dateofUpMonth-(firstday-1-j)) + "";
	            int oldYear = year;
	            int oldMonth = month;
	            if(month == 1){
	            	oldYear = year-1;
	            	oldMonth = 12;
	            }else{
	            	oldMonth = oldMonth-1;
	            }
	            String type = "1";
	    		//农历
	            SimpleLunarCalendar simpleLunarCalendar = getSimpleLunarCalendar(oldYear+"-"+oldMonth+"-"+week[0][j]);
	    		String dateString = simpleLunarCalendar.getDateString();
	    		dateString = dateString.substring(dateString.lastIndexOf("月")+1, dateString.lastIndexOf("日"));
	            list.add("<font style='color:#bfbfbf'>"+week[0][j]+"</font>"+"-"+dateString+"-"+type);
//	            System.out.print(week[0][j] + "\t"); 
	        }
	        for(j = firstday; j < 7; j++){
	            week[0][j] = m + "";
	            m++;
	    		//农历
	            String type = "2";
	            SimpleLunarCalendar simpleLunarCalendar = getSimpleLunarCalendar(year+"-"+month+"-"+week[0][j]);
	    		String dateString = simpleLunarCalendar.getDateString();
	    		String oldStr = "";
	    		oldStr = dateString.substring(dateString.lastIndexOf("月")+1, dateString.lastIndexOf("日"));
	    		if(oldStr.equals("初一")){
	    			oldStr = dateString.substring(dateString.lastIndexOf("年")+1, dateString.lastIndexOf("日"));
	    		}
	            list.add(week[0][j]+"-"+oldStr+"-"+type);
//	            System.out.print(week[0][j] + "\t");
	        }
	    }
	    // 中间的几个星期  
	    for(int i = f; i < weekofmonth - 1; i++){
	        for (j = 0; j < 7; j++) {
	            week[i][j] = m + "";
	            m++;
	    		//农历
	            String type = "2";
	            SimpleLunarCalendar simpleLunarCalendar = getSimpleLunarCalendar(year+"-"+month+"-"+week[i][j]);
	    		String dateString = simpleLunarCalendar.getDateString();
	    		dateString = dateString.substring(dateString.lastIndexOf("月")+1, dateString.lastIndexOf("日"));
	            list.add(week[i][j]+"-"+dateString+"-"+type);
//	            System.out.print(week[i][j] + "\t");
	        }
	    }
	    // 最后一个星期  
	    if(lastday == 7){
	        week[weekofmonth - 1][0] = m + "";
    		//农历
	        String type = "2";
	        SimpleLunarCalendar simpleLunarCalendar = getSimpleLunarCalendar(year+"-"+month+"-"+week[weekofmonth - 1][0]);
    		String dateString = simpleLunarCalendar.getDateString();
    		dateString = dateString.substring(dateString.lastIndexOf("月")+1, dateString.lastIndexOf("日"));
	        list.add(week[weekofmonth - 1][0]+"-"+dateString+"-"+type);
//	        System.out.print(week[weekofmonth - 1][0] + "\t");
	    }else{
	        for (j = 0; j < 7; j++){
	        	if(j <= lastday){
	        		week[weekofmonth - 1][j] = m + "";
	        		m++;
	        		//农历
	        		String type = "2";
	        		SimpleLunarCalendar simpleLunarCalendar = getSimpleLunarCalendar(year+"-"+month+"-"+week[weekofmonth - 1][j]);
	        		String dateString = simpleLunarCalendar.getDateString();
	        		dateString = dateString.substring(dateString.lastIndexOf("月")+1, dateString.lastIndexOf("日"));
	        		list.add(week[weekofmonth - 1][j]+"-"+dateString+"-"+type);
//	        		System.out.print(week[weekofmonth - 1][j] + "\t");
	        	}else{
	        		week[weekofmonth - 1][j] = lasM + "";
	        		lasM++;
	        		int newYear = year;
		            int newMonth = month;
		            if(month == 12){
		            	newYear = year+1;
		            	newMonth = 1;
		            }else{
		            	newMonth = newMonth+1;
		            }
		            String type = "3";
	        		//农历
	        		SimpleLunarCalendar simpleLunarCalendar = getSimpleLunarCalendar(newYear+"-"+newMonth+"-"+week[weekofmonth - 1][j]);
	        		String dateString = simpleLunarCalendar.getDateString();
	        		dateString = dateString.substring(dateString.lastIndexOf("月")+1, dateString.lastIndexOf("日"));
	        		list.add("<font style='color:#bfbfbf'>"+week[weekofmonth - 1][j]+"</font>"+"-"+dateString+"-"+type);
//	        		System.out.print(week[weekofmonth - 1][j] + "\t");
	        	}
	        }
	    }
	    return list;
	}
	
	/** 
	 * 获取某月中的某天是星期几 
	 *  
	 * @return 
	 */  
	public static int weekDay(Calendar cal)  
	{  
	    int weekday = cal.get(Calendar.DAY_OF_WEEK);  
	    if (weekday == 1)// 西方星期日为第一天，星期一为第二天  
	        weekday = 7;  
	    else  
	        weekday -= 1;  
	    return weekday;  
	} 
	
	/** 
	 * 获取简单农历对象 
	 * @param date 日期字符串 
	 * @return 简单农历对象 
	 */  
	public static SimpleLunarCalendar getSimpleLunarCalendar(String date) {
		SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
		try {
			return new SimpleLunarCalendar(sd.parse(date));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}  
	  
	/** 
	 * 获取简单农历对象 
	 * @param date 日期 
	 * @return 简单农历对象 
	 */  
	public static SimpleLunarCalendar getSimpleLunarCalendar(Date date) {  
	    return new SimpleLunarCalendar(date);  
	}
}
