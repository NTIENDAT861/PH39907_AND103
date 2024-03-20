package com.example.lab1;

public class Country {
    private String zip_code, name_country;

    public String getZip_code() {
        return zip_code;
    }

    public void setZip_code(String zip_code) {
        this.zip_code = zip_code;
    }

    public String getName_country() {
        return name_country;
    }

    public void setName_country(String name_country) {
        this.name_country = name_country;
    }

    public Country(String zip_code, String name_country) {
        this.zip_code = zip_code;
        this.name_country = name_country;
    }

    public Country() {
    }
}
