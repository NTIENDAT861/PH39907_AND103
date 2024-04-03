package com.example.lab6.view;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import com.example.lab6.MainActivity;
import com.example.lab6.R;
import com.example.lab6.databinding.ActivityMain2Binding;

public class Main2Activity extends AppCompatActivity {

    private ActivityMain2Binding binding;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMain2Binding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        binding.btnDistributor.setOnClickListener(v -> {
            startActivity(new Intent(this, MainActivity.class));
        });



        binding.btnFruit.setOnClickListener(v -> {
            startActivity(new Intent(this, HomeActivity.class));
        });

    }
}