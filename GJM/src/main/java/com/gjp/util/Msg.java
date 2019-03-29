package com.gjp.util;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

/**
 * 消息返回对象
 *
 * @param <T>
 * @author JiangQt
 */
@Data
public class Msg<T> {

    public static final String MSG_LOGIN_ERROR = "身份验证过期，请重新登录";
    public static final String MSG_PARAM_ERROR = "参数错误，请刷新页面重试";
    public static final String MSG_SYSTEM_ERROR = "系统异常，请重试或联系管理员";
    // 失败
    public static final int CODE_FAIL = 110;
    // 成功
    public static final int CODE_SUCCESS = 200;
    // 等待
    public static final int CODE_WAITING = 201;
    // 异常
    public static final int CODE_EXCEPTION = 400;

    /* 消息码 */
    private int code;
    /* 消息提示*/
    private String msg;
    /* 消息内容 */
    private T data;
    /* 消息MAP对象 */
    private JSONObject json;
    /* 消息格外参数 */
    private String message;

    public Msg() {
        this.code = CODE_SUCCESS;
        this.msg = "success";
    }

    public Msg(String msg) {
        this.code = CODE_SUCCESS;
        this.msg = msg;
    }

    public Msg(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Msg(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public Msg<T> setMsg(String msg) {
        this.msg = msg;
        return this;
    }

    /**
     * 设置消息码和消息
     *
     * @param code 消息码
     * @param msg  消息内容
     * @作者 JiangQT
     * @日期 2016年6月16日
     */
    public Msg<T> setMsg(int code, String msg) {
        this.code = code;
        this.msg = msg;
        return this;
    }

    /**
     * 返回json数据
     *
     * @param code 消息码
     * @param msg  消息内容
     * @return
     * @作者 JiangQT
     * @日期 2016年6月17日
     */
    public String toError(int code, String msg) {
        return toString(code, msg, this.data);
    }

    /**
     * 返回json数据
     *
     * @param msg 消息内容
     * @return
     * @作者 JiangQT
     * @日期 2016年6月17日
     */
    public String toError(String msg) {
        return toString(CODE_FAIL, msg, this.data);
    }

    /**
     * 返回json数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年6月17日
     */
    public String toError(AppException e) {
        return toString(e.getCode(), e.getMsg(), this.data);
    }

    /**
     * 返回json数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年6月17日
     */
    public String toError(Exception e) {
        return toString(CODE_EXCEPTION, MSG_SYSTEM_ERROR, this.data);
    }

    /**
     * 返回json数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    public String toString() {
        return toString(this.code, this.msg, this.data);
    }

    /**
     * 返回json数据
     *
     * @param code 消息码
     * @return
     * @作者 JiangQT
     * @日期 2016年6月17日
     */
    public String toString(int code) {
        return toString(code, this.msg, this.data);
    }

    /**
     * 返回json数据
     * <p>
     * 默认消息码为SUCCESS
     *
     * @param data 数据
     * @return
     * @作者 JiangQT
     * @日期 2016年6月17日
     */
    public String toString(T data) {
        return toString(this.code, this.msg, data);
    }

    /**
     * 返回json数据
     *
     * @param code 消息码
     * @param msg  消息内容
     * @return
     * @作者 JiangQT
     * @日期 2016年6月17日
     */
    public String toString(int code, String msg) {
        return toString(code, msg, this.data);
    }

    /**
     * 返回json数据
     * <p>
     * 默认消息码为SUCCESS
     *
     * @param msg  消息内容
     * @param data 数据
     * @return
     * @作者 JiangQT
     * @日期 2016年6月17日
     */
    public String toString(String msg, T data) {
        return toString(this.code, msg, data);
    }

    /**
     * 返回json数据
     *
     * @param code 消息码
     * @param msg  消息内容
     * @param data 数据
     * @return
     * @作者 JiangQT
     * @日期 2016年6月17日
     */
    public String toString(int code, String msg, T data) {
        Map<String, Object> map = new HashMap<>();
        map.put("code", code);
        map.put("msg", msg);
        map.put("data", (data == null || data == "" ? this.json : data));
        return JSONObject.toJSONString(map);
    }

    /**
     * 返回Map数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    public Map<String, Object> toMap() {
        return toMap(this.code, this.msg, this.data);
    }

    /**
     * 返回Map数据
     *
     * @param data
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    public Map<String, Object> toMap(T data) {
        return toMap(this.code, this.msg, data);
    }

    /**
     * 返回Map数据
     *
     * @param code
     * @param msg
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    public Map<String, Object> toMap(int code, String msg) {
        return toMap(code, msg, this.data);
    }

    /**
     * 返回Map数据
     *
     * @return
     * @作者 JiangQT
     * @日期 2016年12月21日
     */
    public Map<String, Object> toMap(int code, String msg, T data) {
        Map<String, Object> map = new HashMap<>();
        map.put("code", code);
        map.put("msg", msg);
        map.put("data", (data == null || data == "" ? this.json : data));
        return map;
    }

    /**
     * 添加MAP对象
     *
     * @param key   键
     * @param value 值
     */
    public void put(String key, Object value) {
        if (json == null) {
            json = new JSONObject();
        }
        json.put(key, value);
    }

    /**
     * 添加MAP对象
     *
     * @param map 对象
     */
    public void put(Map<String, Object> map) {
        if (this.json == null) {
            this.json = new JSONObject();
        }
        this.json.putAll(map);
    }

    /**
     * 获取MAP对象
     *
     * @return
     */
    public JSONObject getJson() {
        return json;
    }

    public Map<String, Object> toErrorMap(int code, String msg) {
        return toMap(code, msg, this.data);
    }

    public Map<String, Object> toErrorMap(String msg) {
        return toMap(CODE_FAIL, msg, this.data);
    }

}
