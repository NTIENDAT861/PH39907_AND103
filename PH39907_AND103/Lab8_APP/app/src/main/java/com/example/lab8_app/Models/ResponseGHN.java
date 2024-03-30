package com.example.lab8_app.Models;

public class ResponseGHN<T> {
    private int code;
    private String message;
    private T data;
    private  String code_message_value;
    public ResponseGHN() {
    }

    public ResponseGHN(int code, String message, T data, String code_message_value) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.code_message_value = code_message_value;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getCode_message_value() {
        return code_message_value;
    }

    public void setCode_message_value(String code_message_value) {
        this.code_message_value = code_message_value;
    }
}
