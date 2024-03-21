package com.example.asm;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.example.asm.API.APIService;
import com.example.asm.Adapter.AdapterProduct;
import com.example.asm.DTO.ProductDTO;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    List<ProductDTO> list = new ArrayList<>();
    AdapterProduct adapterProduct;
    RecyclerView recyclerView;
    FloatingActionButton floaAdd;


    @SuppressLint("NotifyDataSetChanged")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        recyclerView = findViewById(R.id.rcvList);
        floaAdd = findViewById(R.id.floatAdd);

        //Connect
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(APIService.DOMAIN)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        //Call Api Retrofit
        CallAPI(retrofit);


        //setOnclick add
        floaAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, NewCreateAndAddActivity.class);
                intent.putExtra("titleAdd", "Create Product");
                intent.putExtra("titleBtnAdd", "Create");
                startActivity(intent);
                finish();
            }
        });


    }

    private void CallAPI(Retrofit retrofit) {

        //Khai báo API Service
        APIService apiService = retrofit.create(APIService.class);

        Call<List<ProductDTO>> call = apiService.getProduct();

        call.enqueue(new Callback<List<ProductDTO>>() {
            @SuppressLint("NotifyDataSetChanged")
            @Override
            public void onResponse(@NonNull Call<List<ProductDTO>> call, @NonNull Response<List<ProductDTO>> response) {
                if (response.isSuccessful()) {
                    list = response.body();
                    adapterProduct = new AdapterProduct(MainActivity.this, list);
                    LinearLayoutManager linearLayoutManager =
                            new LinearLayoutManager(getApplicationContext(), LinearLayoutManager.VERTICAL, false);
                    recyclerView.setLayoutManager(linearLayoutManager);
                    recyclerView.setAdapter(adapterProduct);
                    adapterProduct.notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<ProductDTO>> call, @NonNull Throwable t) {
                Log.e("zzzz", "onFailure: " + t.getMessage());
            }
        });


    }
}