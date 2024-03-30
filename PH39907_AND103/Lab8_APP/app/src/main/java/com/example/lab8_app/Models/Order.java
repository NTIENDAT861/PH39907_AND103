package com.example.lab8_app.Models;

public class Order {
    private  String  _id,   order_code, id_user;

    public Order() {
    }

    public Order(String _id, String order_code, String id_user) {
        this._id = _id;
        this.order_code = order_code;
        this.id_user = id_user;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getOrder_code() {
        return order_code;
    }

    public void setOrder_code(String order_code) {
        this.order_code = order_code;
    }

    public String getId_user() {
        return id_user;
    }

    public void setId_user(String id_user) {
        this.id_user = id_user;
    }
}
