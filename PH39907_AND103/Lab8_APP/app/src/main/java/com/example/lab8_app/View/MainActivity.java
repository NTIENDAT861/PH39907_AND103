package com.example.lab8_app.View;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.GridLayoutManager;

import com.example.lab8_app.Adapter.product_Adapter;
import com.example.lab8_app.Models.Product;
import com.example.lab8_app.R;
import com.example.lab8_app.databinding.ActivityMainBinding;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding binding;
    private ArrayList<Product> list = new ArrayList<>();
    private product_Adapter adapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        list.add(new Product("1", "sneakers", "Air Jordan 1 Mid", "Men's Shoes", 5, 1300000, R.drawable.jordan_1));
        list.add(new Product("2", "sneakers", "Air Jordan 1 Zoom CMFT 2", "Men's Shoes", 4.5, 5990000, R.drawable.jordan2));
        list.add(new Product("3", "sneakers", "Air Jordan 1 Mid SE Craft", "Men's Shoes", 5.0, 2999000, R.drawable.jordan3));
        list.add(new Product("4", "sneakers", "Air Jordan 1 Mid ver@", "Men's Shoes", 4, 4990000, R.drawable.j4));
        adapter = new product_Adapter(list, this);

        binding.rcvProduct.setAdapter(adapter);

    }
}