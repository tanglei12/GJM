package com.gjp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * websocket通信
 * 
 * @author 陈智颖
 *
 * @version 创建时间：2015年12月22日 上午10:44:55 
 */
@Controller
public class WebSocketController {

	/**
	 * @return
	 *
	 * @author 陈智颖
	 */
	@RequestMapping("/webSocket")
	public String webSocket(){
		return "/websocket/websocket";
	}
}
