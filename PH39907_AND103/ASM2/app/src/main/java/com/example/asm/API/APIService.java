package com.example.asm.API;

import com.example.asm.DTO.ProductDTO;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface APIService {


    String DOMAIN = "http://192.168.0.116:3000";

    @GET("/api/get-list-product")
    Call<List<ProductDTO>> getProduct();

    @POST("/api/add-product")
    Call<ProductDTO> createProduct(@Body ProductDTO productDTO);

    @DELETE("/api/delete-product/{ProductID}")
    Call<Void> deleteProduct(@Path("ProductID") Integer productID);

    @PUT("/api/update-product")
    Call<ProductDTO> updateProduct(@Body ProductDTO productDTO);
}
