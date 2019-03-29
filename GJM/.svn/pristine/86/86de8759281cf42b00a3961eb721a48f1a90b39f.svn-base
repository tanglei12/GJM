package com.gjp.util;

import javax.servlet.http.HttpServletRequest;

/**
 * 判断用户是否重复提交
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2015年9月7日 下午6:14:08
 */
public class UUIDToken {

	/**
	 * 生成UUIDToken
	 * 
	 * @return
	 */
	public static void generateUUIDToken(HttpServletRequest request) {
		String token = TokenProccessor.getInstance().makeToken();// 创建令牌
		request.getSession().setAttribute("token", token);
	}

	/**
	 * 判断客户端提交上来的令牌和服务器端生成的令牌是否一致
	 * 
	 * @param request
	 * @return true 用户重复提交了表单 false 用户没有重复提交表单
	 */
	public static boolean isRepeatSubmit(HttpServletRequest request) {
		String client_token = request.getParameter("token");
		// 1、如果用户提交的表单数据中没有token，则用户是重复提交了表单
		if (client_token == null) {
			return true;
		}
		// 取出存储在Session中的token
		String server_token = (String) request.getSession().getAttribute("token");
		// 2、如果当前用户的Session中不存在Token(令牌)，则用户是重复提交了表单
		if (server_token == null) {
			return true;
		}
		// 3、存储在Session中的Token(令牌)与表单提交的Token(令牌)不同，则用户是重复提交了表单
		if (!client_token.equals(server_token)) {
			return true;
		}

		return false;
	}
}
