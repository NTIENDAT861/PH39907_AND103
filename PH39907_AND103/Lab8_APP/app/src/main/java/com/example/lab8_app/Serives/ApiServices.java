package com.example.lab8_app.Serives;




import com.example.lab8_app.Models.Order;

import retrofit2.Call;
import retrofit2.Response;
import retrofit2.http.Body;

import retrofit2.http.POST;


public interface ApiServices {
    public static String BASE_URL = "http://192.168.0.116:3000/api/";


    @POST("add-order")
    Call<Response<Response<Order>>> order(@Body Order order);





}


