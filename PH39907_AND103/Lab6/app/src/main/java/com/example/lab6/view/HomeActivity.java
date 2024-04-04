package com.example.lab6.view;

import android.app.AlertDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.bumptech.glide.Glide;
import com.example.lab6.R;
import com.example.lab6.adapter.FruitAdapter;
import com.example.lab6.databinding.ActivityHomeBinding;
import com.example.lab6.databinding.DialogEditFruitBinding;
import com.example.lab6.model.Distributor;
import com.example.lab6.model.Fruit;
import com.example.lab6.model.Response;
import com.example.lab6.services.HttpRequest;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;

public class HomeActivity extends AppCompatActivity implements FruitAdapter.FruitClick {
    ActivityHomeBinding binding;
    private HttpRequest httpRequest;
    private SharedPreferences sharedPreferences;
    private String token;
    private FruitAdapter adapter;
    private String id_Distributor;
    private ArrayList<Distributor> distributorArrayList;
    private ArrayList<File> ds_image;
    private  DialogEditFruitBinding binding1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        binding = ActivityHomeBinding.inflate(getLayoutInflater());
        super.onCreate(savedInstanceState);
        setContentView(binding.getRoot());
        httpRequest = new HttpRequest();
        ds_image = new ArrayList<>();
        sharedPreferences = getSharedPreferences("INFO",MODE_PRIVATE);

        token = sharedPreferences.getString("token","");
        httpRequest.callAPI().getListFruit("Bearer " + token).enqueue(getListFruitResponse);
        userListener();
    }
    private void userListener () {
        binding.btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(HomeActivity.this , AddFruitActivity.class));
            }
        });
    }



    Callback<Response<ArrayList<Fruit>>> getListFruitResponse = new Callback<Response<ArrayList<Fruit>>>() {
        @Override
        public void onResponse(Call<Response<ArrayList<Fruit>>> call, retrofit2.Response<Response<ArrayList<Fruit>>> response) {
            if (response.isSuccessful()) {
                if (response.body().getStatus() ==200) {
                    ArrayList<Fruit> ds = response.body().getData();
                    getData(ds);
//                    Toast.makeText(HomeActivity.this, response.body().getMessenger(), Toast.LENGTH_SHORT).show();
                }
            }
        }

        @Override
        public void onFailure(Call<Response<ArrayList<Fruit>>> call, Throwable t) {

        }
    };
    private void getData (ArrayList<Fruit> ds) {
        adapter = new FruitAdapter(this, ds,this );
        binding.rcvFruit.setAdapter(adapter);
    }

    @Override
    public void delete(Fruit fruit) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Confirm delete");
        builder.setMessage("Are you sure you want to delete?");
        builder.setPositiveButton("yes", (dialog, which) -> {

            httpRequest.callAPI().deleteFruits(fruit.get_id()).enqueue(responseFruitAPI);
        });
        builder.setNegativeButton("no", (dialog, which) -> {
            dialog.dismiss();
        });
        builder.show();
    }

    Callback<Response<Fruit>> responseFruitAPI  = new Callback<Response<Fruit>>() {
        @Override
        public void onResponse(Call<Response<Fruit>> call, retrofit2.Response<Response<Fruit>> response) {
            if (response.isSuccessful()) {
                if (response.body().getStatus() == 200) {
                    httpRequest.callAPI().getListFruit("Bearer " + token).enqueue(getListFruitResponse);
                    Toast.makeText(HomeActivity.this, response.body().getMessenger(), Toast.LENGTH_SHORT).show();
                }
            }
        }

        @Override
        public void onFailure(Call<Response<Fruit>> call, Throwable t) {

        }
    };
    @Override
    public void edit(Fruit fruit) {
        showDialogEdit(fruit);
    }
    private void showDialogEdit(Fruit fruit) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Edit distributor");
         binding1 = DialogEditFruitBinding.inflate(LayoutInflater.from(this));
        builder.setView(binding1.getRoot());
        AlertDialog alertDialog = builder.create();
        configSpinner(fruit.getDistributor());

        String url = fruit.getImage().get(0);
        String newUrl = url.replace("localhost", "10.0.2.2");

        binding1.edName.setText(fruit.getName());
        binding1.edDescription.setText(fruit.getDescription());
        binding1.edPrice.setText(fruit.getPrice());
        binding1.edQuantity.setText(fruit.getQuantity());
        binding1.edStatus.setText(fruit.getStatus());

        Glide.with(this)
                .load(newUrl)
                .thumbnail(Glide.with(this).load(R.drawable.baseline_broken_image_24))
                .into(binding1.avatar);
        binding1.btnUpdate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Map<String , RequestBody> mapRequestBody = new HashMap<>();
                String _name = binding1.edName.getText().toString().trim();
                String _quantity = binding1.edQuantity.getText().toString().trim();
                String _price = binding1.edPrice.getText().toString().trim();
                String _status = binding1.edStatus.getText().toString().trim();
                String _description = binding1.edDescription.getText().toString().trim();



                mapRequestBody.put("name", getRequestBody(_name));
                mapRequestBody.put("quantity", getRequestBody(_quantity));
                mapRequestBody.put("price", getRequestBody(_price));
                mapRequestBody.put("status", getRequestBody(_status));
                mapRequestBody.put("description", getRequestBody(_description));
                mapRequestBody.put("id_distributor", getRequestBody(id_Distributor));
                ArrayList<MultipartBody.Part> _ds_image = new ArrayList<>();

                ds_image.forEach(file1 -> {
                    RequestBody requestFile = RequestBody.create(MediaType.parse("image/*"),file1);
                    MultipartBody.Part multipartBodyPart = MultipartBody.Part.createFormData("image", file1.getName(),requestFile);
                    _ds_image.add(multipartBodyPart);
                });
                if (_name.isEmpty() || _quantity.isEmpty() || _price.isEmpty() || _status.isEmpty() ) {
                    Toast.makeText(HomeActivity.this, "Enter data", Toast.LENGTH_SHORT).show();
                }   else {

                    httpRequest.callAPI().updateFruitWithFileImage(mapRequestBody,fruit.get_id(), _ds_image).enqueue(responseFruitAPI);
                    alertDialog.dismiss();
                }
            }
        });
        binding1.btnCancle.setOnClickListener(v -> {
            alertDialog.dismiss();
        });
        alertDialog.show();
    }
    private RequestBody getRequestBody(String value) {
        return RequestBody.create(MediaType.parse("multipart/form-data"),value);
    }
    @Override
    protected void onResume() {
        super.onResume();
        httpRequest.callAPI().getListFruit("Bearer "+token).enqueue(getListFruitResponse);
    }
    private void configSpinner(Distributor distributor) {
        httpRequest.callAPI().getListDistributor().enqueue(getDistributorAPI);
        binding1.spDistributor.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {


                id_Distributor = distributorArrayList.get(position).getId();
                Log.d("123123", "onItemSelected: " + id_Distributor);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

    }

    Callback<Response<ArrayList<Distributor>>> getDistributorAPI = new Callback<Response<ArrayList<Distributor>>>() {
        @Override
        public void onResponse(Call<Response<ArrayList<Distributor>>> call, retrofit2.Response<Response<ArrayList<Distributor>>> response) {
            if (response.isSuccessful()) {
                if (response.body().getStatus() == 200) {
                    distributorArrayList = response.body().getData();
                    String[] items = new String[distributorArrayList.size()];

                    for (int i = 0; i< distributorArrayList.size(); i++) {
                        items[i] = distributorArrayList.get(i).getName();
                    }
                    ArrayAdapter<String> adapterSpin = new ArrayAdapter<>(HomeActivity.this, android.R.layout.simple_spinner_item, items);
                    adapterSpin.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    binding1.spDistributor.setAdapter(adapterSpin);
                }
            }
        }

        @Override
        public void onFailure(Call<Response<ArrayList<Distributor>>> call, Throwable t) {
            t.getMessage();
        }

    };
}