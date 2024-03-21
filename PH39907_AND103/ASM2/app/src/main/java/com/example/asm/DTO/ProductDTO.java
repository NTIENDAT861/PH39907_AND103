package com.example.asm.DTO;

public class ProductDTO {

    private  Integer ProductID;
    private String ProductName;
    private String Description;
    private Integer Price;
    private Integer Quantity;

    public ProductDTO() {
    }

    public ProductDTO(Integer productID) {
        ProductID = productID;
    }

    public ProductDTO(Integer productID, String productName, String description, Integer price, Integer quantity) {
        ProductID = productID;
        ProductName = productName;
        Description = description;
        Price = price;
        Quantity = quantity;
    }

    public Integer getProductID() {
        return ProductID;
    }

    public void setProductID(Integer productID) {
        ProductID = productID;
    }

    public String getProductName() {
        return ProductName;
    }

    public void setProductName(String productName) {
        ProductName = productName;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public Integer getPrice() {
        return Price;
    }

    public void setPrice(Integer price) {
        Price = price;
    }

    public Integer getQuantity() {
        return Quantity;
    }

    public void setQuantity(Integer quantity) {
        Quantity = quantity;
    }
}
