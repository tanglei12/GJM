package com.gjp.util;

/**
 * 程序自定义异常
 *
 * @author 庆涛
 */
public class AppException extends Exception {

    private static final long serialVersionUID = 1L;

    private int code; // 异常对应的返回码
    private String msg; // 异常对应的描述信息

    public AppException() {
        super();
    }

    public AppException(String message) {
        super(message);
        this.code = Msg.CODE_FAIL;
        this.msg = message;
    }

    public AppException(int code, String msg) {
        super();
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

}
