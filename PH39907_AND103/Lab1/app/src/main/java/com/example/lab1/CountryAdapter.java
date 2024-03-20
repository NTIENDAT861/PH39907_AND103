package com.example.lab1;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import com.example.lab1.databinding.ItemDataBinding;

import java.util.ArrayList;

public class CountryAdapter extends BaseAdapter {

    private ArrayList<Country> list;
    private Context context;

    public CountryAdapter(ArrayList<Country> list, Context context) {
        this.list = list;
        this.context = context;
    }

    @Override
    public int getCount() {
        return list.size();
    }

    @Override
    public Object getItem(int position) {
        return list.get(position);
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    private ItemDataBinding itemDataBinding;
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater inflater = ((Activity) context).getLayoutInflater();
        itemDataBinding = ItemDataBinding.inflate(inflater);


        itemDataBinding.txtZipCode.setText(list.get(position).getZip_code());
        itemDataBinding.txtNameCoutry.setText(list.get(position).getName_country());


        return itemDataBinding.getRoot();
    }
}
