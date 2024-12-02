package com.example.and103_ph39907.Model;

import java.util.ArrayList;

public class XeMay {
    private String _id,ten_xe, mau_sac, gia_ban ,mo_ta;
    private ArrayList<String> hinh_anh;
    public XeMay() {
    }


    public XeMay(String ten_xe, String mau_sac, String gia_ban, String mo_ta, ArrayList<String> hinh_anh) {
        this.ten_xe = ten_xe;
        this.mau_sac = mau_sac;
        this.gia_ban = gia_ban;
        this.mo_ta = mo_ta;
        this.hinh_anh = hinh_anh;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getTen_xe() {
        return ten_xe;
    }

    public void setTen_xe(String ten_xe) {
        this.ten_xe = ten_xe;
    }

    public String getMau_sac() {
        return mau_sac;
    }

    public void setMau_sac(String mau_sac) {
        this.mau_sac = mau_sac;
    }

    public String getGia_ban() {
        return gia_ban;
    }

    public void setGia_ban(String gia_ban) {
        this.gia_ban = gia_ban;
    }

    public String getMo_ta() {
        return mo_ta;
    }

    public void setMo_ta(String mo_ta) {
        this.mo_ta = mo_ta;
    }

    public ArrayList<String> getHinh_anh() {
        return hinh_anh;
    }

    public void setHinh_anh(ArrayList<String> hinh_anh) {
        this.hinh_anh = hinh_anh;
    }
}
