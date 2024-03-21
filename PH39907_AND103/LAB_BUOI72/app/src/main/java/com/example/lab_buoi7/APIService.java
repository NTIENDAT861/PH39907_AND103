package com.example.lab_buoi7;
import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface APIService {

    String DOMAIN = "http://192.168.16.105:3000/";

    @GET("/api/list")
    Call<List<SanphamModel>> getSanphams();

    @POST("/api/add")
    Call<SanphamModel> addSanpham(@Body SanphamModel sanpham);

    @DELETE("/api/delete/{id}")
    Call<Void> deleteSanpham(@Path("id") String id);

    @PUT("/api/update/{id}")
    Call<SanphamModel> updateSanpham(@Path("id") String id, @Body SanphamModel sanpham);

    @Multipart
    @POST("students/add")
    Call<SanphamModel> addStudentPicker(
            @Part("ten") RequestBody ten,
            @Part("gia") RequestBody gia,
            @Part("soluong") RequestBody soluong,
            @Part MultipartBody.Part avatar);

}
