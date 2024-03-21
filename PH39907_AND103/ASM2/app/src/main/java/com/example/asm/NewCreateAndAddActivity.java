package com.example.asm;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.asm.API.APIService;
import com.example.asm.DTO.ProductDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class NewCreateAndAddActivity extends AppCompatActivity {
    TextView tvTitle;
    ImageView ivBack;
    Spinner spSize;
    ArrayAdapter adapterSp;
    List<String> listSize = new ArrayList<String>();
    AppCompatButton btnNewAndEdit;
    EditText edProductName, edDescription, edPrice, edQuantity;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_create_and_add);
        tvTitle = findViewById(R.id.tvTitle);
        ivBack = findViewById(R.id.ivBackCreUp);

        btnNewAndEdit = findViewById(R.id.btnNewAndEdit);

        edProductName = findViewById(R.id.edProductName);
        edDescription = findViewById(R.id.edDescription);
        edPrice = findViewById(R.id.edPrice);
        edQuantity = findViewById(R.id.edQuantity);



        ChangeUI();



        //Add shoe
        btnNewAndEdit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                CreateShoe();

            }
        });


    }

    private void CreateShoe() {

        String ProductName = edProductName.getText().toString();
        String Description = edDescription.getText().toString();
        String Price = edPrice.getText().toString();
        String Quantity = edQuantity.getText().toString();

        Random random = new Random();
        int min = 100000;
        int max = 999999;
        int ProductID = random.nextInt(max - min + 1) + min;





        if (CheckCreateShoe()) {

            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl(APIService.DOMAIN)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();

            APIService apiService = retrofit.create(APIService.class);

            Call<ProductDTO> call = apiService.createProduct(new ProductDTO(ProductID, ProductName, Description, Integer.parseInt(Price), Integer.parseInt(Quantity)));


            call.enqueue(new Callback<ProductDTO>() {
                @Override
                public void onResponse(Call<ProductDTO> call, Response<ProductDTO> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(NewCreateAndAddActivity.this, "Thêm thành công", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(NewCreateAndAddActivity.this, MainActivity.class));
                        finish();
                    }
                }

                @Override
                public void onFailure(Call<ProductDTO> call, Throwable t) {
                    Log.e("zzzzz", "onFailure: " + t.getMessage());
                }
            });


        }


    }

    private boolean CheckCreateShoe() {

        return true;
    }

    private void ChangeUI() {
        //Data intent add
        String titleAdd = getIntent().getStringExtra("titleAdd");
        String titleBtnAdd = getIntent().getStringExtra("titleBtnAdd");
        //Data intent update
        String titleUpdate = getIntent().getStringExtra("titleEdit");
        String titleBtnUp = getIntent().getStringExtra("titleBtnEdit");

        if (titleUpdate == null) {
            tvTitle.setText(titleAdd);
            btnNewAndEdit.setText(titleBtnAdd);
        } else {
            tvTitle.setText(titleUpdate);
            btnNewAndEdit.setText(titleBtnUp);
        }

        //set onClick nut back
        ivBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(NewCreateAndAddActivity.this, MainActivity.class));
                finish();
            }
        });
    }


}