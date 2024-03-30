package com.example.lab8_app.Serives;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class GHNRequest {
    public final static String SHOPID = "191589";
    public final static String TokenGHN = "f5d62cda-ed8d-11ee-8bfa-8a2dda8ec551";
    private GHNServices ghnRequestInterface;

    public GHNRequest(){
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        httpClient.addInterceptor(new Interceptor() {
            @Override
            public Response intercept(Chain chain) throws IOException {
                Request request = chain.request().newBuilder()
                        .addHeader("ShopId", SHOPID)
                        .addHeader("Token", TokenGHN)
                        .build();
                return chain.proceed(request);
            }
        });

        ghnRequestInterface = new Retrofit.Builder()
                .baseUrl(GHNServices.GHN_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .client(httpClient.build())
                .build().create(GHNServices.class);
    }

    public GHNServices callAPI(){
        return ghnRequestInterface;
    }
}
