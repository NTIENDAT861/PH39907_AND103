package com.example.asm.Adapter;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.asm.API.APIService;
import com.example.asm.DTO.ProductDTO;
import com.example.asm.MainActivity;
import com.example.asm.NewCreateAndAddActivity;
import com.example.asm.R;
import com.example.asm.databinding.ActivityNewCreateAndAddBinding;
import com.example.asm.databinding.ItemUpdateBinding;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.material.imageview.ShapeableImageView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class AdapterProduct extends RecyclerView.Adapter<AdapterProduct.ViewHolder> {

    Context context;
    List<ProductDTO> list;

    public AdapterProduct(Context context, List<ProductDTO> list) {
        this.context = context;
        this.list = list;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.layout_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, @SuppressLint("RecyclerView") int position) {


        holder.tvProductName.setText(String.valueOf(list.get(position).getProductName()));
        holder.tvDescription.setText(String.valueOf(list.get(position).getDescription()));
        holder.tvQuantity.setText(String.valueOf(list.get(position).getQuantity()));
        holder.tvPrice.setText(String.valueOf(list.get(position).getPrice()));

        Integer ProductID = list.get(position).getProductID();


        holder.btnDelete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Retrofit retrofit = new Retrofit.Builder()
                        .baseUrl(APIService.DOMAIN)
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();

                APIService apiService = retrofit.create(APIService.class);


                Call<Void> call = apiService.deleteProduct(ProductID);

                call.enqueue(new Callback<Void>() {
                    @Override
                    public void onResponse(Call<Void> call, Response<Void> response) {
                        if (response.isSuccessful()) {
                            Toast.makeText(context, "Xóa sản phẩm thành công", Toast.LENGTH_SHORT).show();

                            CallAPI(retrofit);
                        } else {
                            Toast.makeText(context, "Xóa sản phẩm thất bại", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<Void> call, Throwable t) {
                        Log.e("DELETE_PRODUCT_ERROR", "onFailure: " + t.getMessage());
                        Toast.makeText(context, "Lỗi khi xóa sản phẩm", Toast.LENGTH_SHORT).show();
                    }
                });

            }
        });
        holder.btnEdit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showPopupDialog(context, list.get(position));
            }

        });


    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        TextView tvProductName, tvDescription, tvPrice, tvQuantity;
        Button btnEdit, btnDelete;

        ShapeableImageView ivShoe;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvProductName = itemView.findViewById(R.id.tvProductName);
            tvDescription = itemView.findViewById(R.id.tvDescription);
            tvPrice = itemView.findViewById(R.id.tvPrice);
            tvQuantity = itemView.findViewById(R.id.tvQuantity);
            ivShoe = itemView.findViewById(R.id.ivShoe);

            btnDelete = itemView.findViewById(R.id.btnDelete);
            btnEdit = itemView.findViewById(R.id.btnEdit);

        }
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
                    list.clear();
                    list = response.body();

                    notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<ProductDTO>> call, @NonNull Throwable t) {
                Log.e("zzzz", "onFailure: " + t.getMessage());
            }
        });


    }
    private void showPopupDialog(Context context1,ProductDTO productDTO) {
        Dialog dialog = new Dialog(context1);

        LayoutInflater inflater = ((Activity) context1).getLayoutInflater();
        ItemUpdateBinding binding = ItemUpdateBinding.inflate(inflater);
        dialog.setContentView(binding.getRoot());


        binding.edProductName.setText(productDTO.getProductName());
        binding.edDescription.setText(productDTO.getDescription());
        binding.edPrice.setText(String.valueOf(productDTO.getPrice()));
        binding.edQuantity.setText(String.valueOf(productDTO.getQuantity()));

        binding.btnNewAndEdit.setOnClickListener(v1 -> {
            String productName = binding.edProductName.getText().toString();
            String description = binding.edDescription.getText().toString();
            String price = binding.edPrice.getText().toString();
            String quantity = binding.edQuantity.getText().toString();

            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl(APIService.DOMAIN)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
            APIService apiService = retrofit.create(APIService.class);

            Call<ProductDTO> call = apiService.updateProduct(new ProductDTO(productDTO.getProductID(), productName, description, Integer.parseInt(price), Integer.parseInt(quantity)));

            call.enqueue(new Callback<ProductDTO>() {
                @Override
                public void onResponse(Call<ProductDTO> call, Response<ProductDTO> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(context1, "Sửa thành công", Toast.LENGTH_SHORT).show();
                        CallAPI(retrofit);
                        dialog.dismiss();
                    }
                }

                @Override
                public void onFailure(Call<ProductDTO> call, Throwable t) {
                    Log.e("zzzzz", "onFailure: " + t.getMessage());
                }
            });
        });

        binding.btnCancle.setOnClickListener(v1 -> {
            dialog.dismiss();
        });





        Window window = dialog.getWindow();




        if ( window != null ) {

            window.setGravity(Gravity.CENTER);

            window.setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.WRAP_CONTENT);
            window.setBackgroundDrawable(new ColorDrawable(Color.WHITE));

            window.getAttributes().flags |= WindowManager.LayoutParams.FLAG_FULLSCREEN;


        }

        dialog.show();
    }
}
