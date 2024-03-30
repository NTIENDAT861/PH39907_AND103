package com.example.lab8_app.Serives;

import com.example.lab8_app.Models.District;
import com.example.lab8_app.Models.DistrictRequest;
import com.example.lab8_app.Models.GHNOrderRequest;
import com.example.lab8_app.Models.GHNOrderRespone;
import com.example.lab8_app.Models.Province;
import com.example.lab8_app.Models.ResponseGHN;
import com.example.lab8_app.Models.Ward;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface GHNServices {
    public static String GHN_URL = "https://dev-online-gateway.ghn.vn/";


    @POST("shiip/public-api/v2/shipping-order/create")
    Call<ResponseGHN<GHNOrderRespone>> GHNOrder(@Body GHNOrderRequest ghnOrderRequest);



    @GET("shiip/public-api/master-data/province")
    Call<ResponseGHN<ArrayList<Province>>> getListProvince();

    @POST("shiip/public-api/master-data/district")
    Call<ResponseGHN<ArrayList<District>>> getListDistrict(@Body DistrictRequest districtRequest);

    @GET("shiip/public-api/master-data/ward")
    Call<ResponseGHN<ArrayList<Ward>>> getListWard(@Query("district_id") int district_id);
}
