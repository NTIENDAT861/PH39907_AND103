package com.example.lab1;

import android.app.Dialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.airbnb.lottie.LottieAnimationView;
import com.example.lab1.databinding.ActivityHomeBinding;
import com.example.lab1.databinding.LayoutThemBinding;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class HomeActivity extends AppCompatActivity {

    FirebaseFirestore db;

    private ActivityHomeBinding binding;
    private String TAG = "ZZZZZZZZZZZZZZZZZZZ";
    private ArrayList<Country> list;
    private CountryAdapter countryAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityHomeBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
       db = FirebaseFirestore.getInstance();
        list = new ArrayList<>();
        countryAdapter = new CountryAdapter(list, this);
        binding.LVDATA.setAdapter(countryAdapter);

        docDulieu ();
        binding.btnThem.setOnClickListener(v -> {
            final Dialog dialog = new Dialog(this);
            LayoutThemBinding layoutThemBinding = LayoutThemBinding.inflate(getLayoutInflater());
            dialog.setContentView(layoutThemBinding.getRoot());
            Window window = dialog.getWindow();
            layoutThemBinding.btnCancel.setOnClickListener(v1 -> dialog.dismiss());

            layoutThemBinding.btnAdd.setOnClickListener(v1 -> {

                String zip = layoutThemBinding.zipcode.getText().toString().trim();
                String country = layoutThemBinding.namecountry.getText().toString().trim();
                if (zip.isEmpty() || country.isEmpty())
                {
                    Toast.makeText(this, "Vui lòng nhập đủ thông tin", Toast.LENGTH_SHORT).show();
                    return;
                }
                CollectionReference cities = db.collection("country");
                Country country1 = new Country(zip, country);

                cities.add(country1).addOnCompleteListener(new OnCompleteListener<DocumentReference>() {
                    @Override
                    public void onComplete(@NonNull Task<DocumentReference> task) {
                        if (task.isSuccessful()) {
                            dialog.dismiss();
                            docDulieu();
                            Toast.makeText(HomeActivity.this, "Thêm thành công", Toast.LENGTH_SHORT).show();
                        } else {
                            Log.d(TAG, "Error adding document", task.getException());
                        }

                    }
                });

            });

            if ( window != null ) {

                window.setLayout(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.WRAP_CONTENT);
                window.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
                WindowManager.LayoutParams params = window.getAttributes();
                params.y = (int) (10 * getResources().getDisplayMetrics().density);
                window.setAttributes(params);
                window.getAttributes().flags |= WindowManager.LayoutParams.FLAG_FULLSCREEN;
                window.setGravity(Gravity.CENTER);
            }
            dialog.show();
        });


    }

    private void docDulieu () {
        db.collection("country")
                .get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            list.clear();
                            for (QueryDocumentSnapshot document : task.getResult()) {
                                Country cityData = document.toObject(Country.class);
                                list.add(cityData);
                            }
                            countryAdapter.notifyDataSetChanged();
                        } else {
                            Log.d(TAG, "Error getting documents: ", task.getException());
                        }
                    }
                });
    }





}