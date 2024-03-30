package com.example.lab8_app.View;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Toast;


import androidx.appcompat.app.AppCompatActivity;

import com.example.lab8_app.Adapter.Adapter_Item_District_Select_GHN;
import com.example.lab8_app.Adapter.Adapter_Item_Province_Select_GHN;
import com.example.lab8_app.Adapter.Adapter_Item_Ward_Select_GHN;
import com.example.lab8_app.Models.District;
import com.example.lab8_app.Models.DistrictRequest;
import com.example.lab8_app.Models.GHNItem;
import com.example.lab8_app.Models.GHNOrderRequest;
import com.example.lab8_app.Models.GHNOrderRespone;
import com.example.lab8_app.Models.Order;
import com.example.lab8_app.Models.Province;
import com.example.lab8_app.Models.ResponseGHN;
import com.example.lab8_app.Models.Ward;
import com.example.lab8_app.R;
import com.example.lab8_app.Serives.GHNRequest;
import com.example.lab8_app.Serives.GHNServices;
import com.example.lab8_app.Serives.HttpRequest;
import com.example.lab8_app.databinding.ActivityLocationBinding;
import com.example.lab8_app.Models.ResponseOrder;

import org.bson.types.ObjectId;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.stream.Collectors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LocationActivity extends AppCompatActivity {
    private ActivityLocationBinding binding;
    private GHNRequest request;
    private GHNServices ghnServices;
    private HttpRequest httpRequest;
    private String productId, productTypeId, productName, description, WardCode;
    private double rate, price;
    private   String id_USer;
    private int image, DistrictID =0, ProvinceID = 0 ;
    private Adapter_Item_Province_Select_GHN adapter_item_province_select_ghn;
    private Adapter_Item_District_Select_GHN adapter_item_district_select_ghn;
    private Adapter_Item_Ward_Select_GHN adapter_item_ward_select_ghn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityLocationBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        request = new GHNRequest();
        httpRequest = new HttpRequest();
        Bundle bundle = getIntent().getExtras();
        if (bundle != null) {
             productId = bundle.getString("productId");
             productTypeId = bundle.getString("productTypeId");
             productName = bundle.getString("productName");
             description = bundle.getString("description");
             rate = bundle.getDouble("rate");
             price = bundle.getDouble("price");
             image = bundle.getInt("image");
        }

        request.callAPI().getListProvince().enqueue(responseProvince);
        binding.spProvince.setOnItemSelectedListener(onItemSelectedListener);
        binding.spDistrict.setOnItemSelectedListener(onItemSelectedListener);
        binding.spWard.setOnItemSelectedListener(onItemSelectedListener);

        binding.spProvince.setSelection(1);
        binding.spDistrict.setSelection(1);
        binding.spWard.setSelection(1);

        binding.btnOrder.setOnClickListener(v -> {

             id_USer = _id();


            if(binding.Location.getText().toString().isEmpty() || binding.Phone.getText().toString().isEmpty() ||ProvinceID == 0 || DistrictID == 0 || WardCode.isEmpty() || binding.FullName.getText().toString().isEmpty())
            {
                Toast.makeText(this, "Vui lòng điền đủ thông tin", Toast.LENGTH_SHORT).show();
                return;
            }

            GHNItem  ghnItem = new GHNItem();
            ghnItem.setName(productName);
            int Price_Int = (int) price;
            ghnItem.setPrice(Price_Int);
            ghnItem.setCode(productId);
            ghnItem.setQuantity(1);
            ghnItem.setWeight(50);
            ArrayList<GHNItem> items = new ArrayList<>();
            items.add(ghnItem);
            GHNOrderRequest ghnOrderRequest = new GHNOrderRequest(
                    binding.FullName.getText().toString(),
                    binding.Phone.getText().toString(),
                    binding.Location.getText().toString(),
                    WardCode,
                    DistrictID,
                    items
            );


            request.callAPI().GHNOrder(ghnOrderRequest).enqueue(responseOrder);


        });

    }

    AdapterView.OnItemSelectedListener onItemSelectedListener = new AdapterView.OnItemSelectedListener() {
        @Override
        public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
            if (parent.getId() == R.id.sp_province) {
                ProvinceID = ((Province) parent.getAdapter().getItem(position)).getProvinceID();
                DistrictRequest districtRequest = new DistrictRequest(ProvinceID);
                request.callAPI().getListDistrict(districtRequest).enqueue(responseDistrict);
            } else if (parent.getId() == R.id.sp_district) {
                DistrictID = ((District) parent.getAdapter().getItem(position)).getDistrictID();
                request.callAPI().getListWard(DistrictID).enqueue(responseWard);
            } else if (parent.getId() == R.id.sp_ward) {
                WardCode = ((Ward) parent.getAdapter().getItem(position)).getWardCode();
            }
        }

        @Override
        public void onNothingSelected(AdapterView<?> parent) {

        }
    };

    Callback<ResponseGHN<ArrayList<Province>>> responseProvince = new Callback<ResponseGHN<ArrayList<Province>>>() {
        @Override
        public void onResponse(Call<ResponseGHN<ArrayList<Province>>> call, Response<ResponseGHN<ArrayList<Province>>> response) {
            if(response.isSuccessful()){
                if(response.body().getCode() == 200){
                    ArrayList<Province> ds = new ArrayList<>(response.body().getData());
                    SetDataSpinProvince(ds);
                }
            }
        }

        @Override
        public void onFailure(Call<ResponseGHN<ArrayList<Province>>> call, Throwable t) {
            Toast.makeText(LocationActivity.this, "Lấy dữ liệu bị lỗi", Toast.LENGTH_SHORT).show();
        }
    };

    Callback<ResponseGHN<ArrayList<District>>> responseDistrict = new Callback<ResponseGHN<ArrayList<District>>>() {
        @Override
        public void onResponse(Call<ResponseGHN<ArrayList<District>>> call, Response<ResponseGHN<ArrayList<District>>> response) {
            if(response.isSuccessful()){
                if(response.body().getCode() == 200){
                    ArrayList<District> ds = new ArrayList<>(response.body().getData());
                    SetDataSpinDistrict(ds);
                }
            }
        }

        @Override
        public void onFailure(Call<ResponseGHN<ArrayList<District>>> call, Throwable t) {

        }
    };

    Callback<ResponseGHN<ArrayList<Ward>>> responseWard = new Callback<ResponseGHN<ArrayList<Ward>>>() {
        @Override
        public void onResponse(Call<ResponseGHN<ArrayList<Ward>>> call, Response<ResponseGHN<ArrayList<Ward>>> response) {
            if(response.isSuccessful()){
                if(response.body().getCode() == 200){

                    if(response.body().getData() == null)
                        return;

                    ArrayList<Ward> ds = new ArrayList<>(response.body().getData());

                    ds.addAll(response.body().getData());
                    SetDataSpinWard(ds);
                }
            }
        }

        @Override
        public void onFailure(Call<ResponseGHN<ArrayList<Ward>>> call, Throwable t) {
            Toast.makeText(LocationActivity.this, "Lỗi", Toast.LENGTH_SHORT).show();
        }
    };



    Callback<ResponseGHN<GHNOrderRespone>> responseOrder = new Callback<ResponseGHN<GHNOrderRespone>>() {
        @Override
        public void onResponse(Call<ResponseGHN<GHNOrderRespone>> call, Response<ResponseGHN<GHNOrderRespone>> response) {



            if (response.isSuccessful())
            {
                Toast.makeText(LocationActivity.this, "Đặt hàng thành công !", Toast.LENGTH_SHORT).show();
                Order order = new Order();
                order.setOrder_code(response.body().getData().getOrder_code());
                order.setId_user(id_USer);
                Log.d("ZZZZZZZZZZZZZZZZZ", "id_USer: " + id_USer + " | code : " +  response.body().getData().getOrder_code());


                httpRequest.callAPI().order(order).enqueue(responseOrderDatabase);
            }
        }

        @Override
        public void onFailure(Call<ResponseGHN<GHNOrderRespone>> call, Throwable t) {

            Toast.makeText(LocationActivity.this, "Lỗi: " + t.getMessage(), Toast.LENGTH_SHORT).show();
        }
    };

    Callback<Response<Response<Order>>> responseOrderDatabase = new Callback<Response<Response<Order>>>() {
        @Override
        public void onResponse(Call<Response<Response<Order>>> call, Response<Response<Response<Order>>> response) {
            if (response.isSuccessful())
            {
                Toast.makeText(LocationActivity.this, "Cảm ơn đã mua hàng", Toast.LENGTH_SHORT).show();
                finish();
            }
            else {

            }
        }

        @Override
        public void onFailure(Call<Response<Response<Order>>> call, Throwable t) {

        }
    };


    private void SetDataSpinProvince(ArrayList<Province> ds){
        adapter_item_province_select_ghn = new Adapter_Item_Province_Select_GHN(this, ds);
        binding.spProvince.setAdapter(adapter_item_province_select_ghn);
    }

    private void SetDataSpinDistrict(ArrayList<District> ds){
        adapter_item_district_select_ghn = new Adapter_Item_District_Select_GHN(this, ds);
        binding.spDistrict.setAdapter(adapter_item_district_select_ghn);
    }

    private void SetDataSpinWard(ArrayList<Ward> ds){
        adapter_item_ward_select_ghn = new Adapter_Item_Ward_Select_GHN(this, ds);
        binding.spWard.setAdapter(adapter_item_ward_select_ghn );
    }

    public static String _id() {
        ObjectId objectId = new ObjectId();
        return objectId.toString();
    }

}