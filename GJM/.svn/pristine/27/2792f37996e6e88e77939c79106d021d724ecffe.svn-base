package com.gjp.util;

import com.gjp.model.HousePartnerPublish;
import com.gjp.util.constant.Constant;
import net.sf.json.JSONObject;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.Map.Entry;

/**
 * 同步会分期
 * @author shenhx
 * 2017-04-14
 *
 */
public class HuifenqiPublishUtil {
	
	/**
	 * 同步发布会分期
	 */
	public static String feedHouseToHfq(String paramStr){
		String result = HttpRequest.sendPost(Constant.HUIFENQI_FEEDHOUSE_URL, paramStr);
		return result;
	}
	
	/**
	 * 同步发布会分期
	 */
	public static String updateHouseToHfq(String paramStr){
		String result = HttpRequest.sendPost(Constant.HUIFENQI_UPDATEHOUSE_URL, paramStr);
		return result;
	}
	
	/**
	 * 删除发布到会分期房源
	 * @param hi_code
	 */
	public static String delHouseToHfq(HousePartnerPublish housePartnerPublish){
		if(null == housePartnerPublish){
			return "";
		}
		String result = "";
		String resultData = housePartnerPublish.getHpp_data();
		if(!StringUtils.isEmpty(resultData)){
			Map<String, Object> requestMap = setRequestMap(housePartnerPublish, resultData);
			
			Map<String, Object> publicMap = new HashMap<>();
			Long ts = System.currentTimeMillis()/1000L;
			publicMap.put("appId", Constant.HUIFENQI_APPID);
			publicMap.put("secretKey", Constant.HUIFENQI_SECRETKEY);
			publicMap.put("ts", ts.toString());
			
			String signStr = "";
			// 拼接加密字符串
			StringBuilder signSeed = new StringBuilder();
			
			// 本系统需发布的具体数据排序
			List<String> values = HuifenqiPublishUtil.sortParamValues(requestMap);
			for(String val : values){
				signSeed.append(val);
			}
			
			String seed = signSeed.toString();
			
			// 去字符串中间空格
			seed.replaceAll("\\s*", ""); 
			
			// sign签名加密须把APPID，排序后参数拼接的字符串，SECRETKEY及Unix时间戳一起加密
			signStr = DigestUtils.sha256Hex(Constant.HUIFENQI_APPID + seed + Constant.HUIFENQI_SECRETKEY + ts);
			publicMap.put("sign", signStr);
			
			StringBuilder paramStr = new StringBuilder();
			
			paramStr.append("appId=" + publicMap.get("appId") + "&");
			
			for (Entry<String, Object> entry : requestMap.entrySet()) {
				String key = entry.getKey();
				String value = null == entry.getValue() ? "" : entry.getValue().toString();
				paramStr.append(key + "=" + value + "&");
			}
			
			paramStr.append("secretKey=" + publicMap.get("secretKey") + "&");
			paramStr.append("ts=" + publicMap.get("ts") + "&");
			paramStr.append("sign=" + publicMap.get("sign") + "&");
			
			// 同步删除会分期
			result = HttpRequest.sendPost(Constant.HUIFENQI_DELHOUSE_URL, paramStr.substring(0, (paramStr.length()-1)));
			System.out.println("通过删除结果" + result);
		}
		return result;
	}

	public static TreeMap<String, Object> setRequestMap(HousePartnerPublish housePartnerPublish, String resultData) {
		// 解析返回结果-并保存数据库
		JSONObject jasonObject = JSONObject.fromObject(resultData);
		
		@SuppressWarnings("unchecked")
		Map<String, Object> map = (Map<String, Object>)jasonObject;
		@SuppressWarnings("unchecked")
		Map<String, Object> metaMap = (Map<String, Object>) map.get("meta");
		
		TreeMap<String, Object> requestMap = new TreeMap<String, Object>();
		String token = (String) metaMap.get("token");
		String sellId = housePartnerPublish.getHpp_sellId();
		requestMap.put("sellId", sellId);
		requestMap.put("token", token);
		return requestMap;
	}
	
	/**
	 * 解析返回结果
	 * @param result
	 * @param hi_code
	 * @return
	 */
	public static HousePartnerPublish resolveResult(String result, String hi_code){
		// 解析返回结果-并保存数据库
		JSONObject jasonObject = JSONObject.fromObject(result);
		
		@SuppressWarnings("unchecked")
		Map<String, Object> map = (Map<String, Object>)jasonObject;
		@SuppressWarnings("unchecked")
		Map<String, Object> bodyMap = (Map<String, Object>) map.get("body");
		
		HousePartnerPublish housePartnerPublish = new HousePartnerPublish();
		housePartnerPublish.setHi_code(hi_code);
		housePartnerPublish.setHpp_partner("会分期");
		housePartnerPublish.setHpp_sellId((String) bodyMap.get("sellId"));
		housePartnerPublish.setHpp_data(result);
		housePartnerPublish.setHpp_createTime(new Date());
		return housePartnerPublish;
	}
	
	/**
	 * 排序
	 * @param params
	 * @return
	 */
	public static List<String> sortParamValues(Map<String, Object> params){
		List<String> sortResult = new ArrayList<>();
		if (params == null || params.isEmpty()) {
			return sortResult;
		}
		List<String> pKeys = new ArrayList<>();
		pKeys.addAll(params.keySet());
		Collections.sort(pKeys, new Comparator<String>() {

			@Override
			public int compare(String key1, String key2) {
				return key1.compareTo(key2);
			}
		});

		for (String pKey : pKeys) {
			Object objValue = params.get(pKey);
			if(objValue instanceof Integer || objValue instanceof Long || 
					objValue instanceof Float || objValue instanceof Double || 
						objValue instanceof Character || objValue instanceof Byte){
				
				sortResult.add(objValue.toString());
			} else if(objValue instanceof String){
				sortResult.add(objValue.toString());
			} 
		}
		return sortResult;
	}
	
	/**
	 * 比对sign
	 * @param appId
	 * @param secretKey
	 * @param ts
	 * @param values
	 * @param sign
	 * @param platform
	 * @return
	 */
	public static boolean checkSign(String appId, String secretKey, String ts, List<String> values, String sign, String platform){
		// 拼接加密字符串
		StringBuilder signSeed = new StringBuilder();
		signSeed.append(appId);
		for(String val : values){
			signSeed.append(val);
		}
		signSeed.append(secretKey);
		signSeed.append(ts);
		
		String seed = signSeed.toString();
		String cSign = DigestUtils.sha256Hex(seed);
		if(cSign.equals(sign)){
			return true;
		}
		return false;
	}
	
}
