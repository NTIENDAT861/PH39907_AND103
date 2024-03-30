var express = require('express');
var router = express.Router();

const Orders = require("../models/order");
router.post("/add-order", async (req, res) => {
  try {
    const data = req.body;
    const newOrder = new Orders({
      order_code: data.order_code,
      id_user: data.id_user
    });
    
    const result = await newOrder.save();
    
    if (result) {
      res.json({
        "status": 200,
        "message": "Thêm thành công",
        "data": result
      });
    } else {
      res.status(400).json({
        "status": 400,
        "message": "Lỗi, thêm không thành công",
        "data": null
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/get-list-order', async (req, res) => {
  try {
      const data = await Orders.find().populate();
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify({
        "status": 200,
        "messenger": "Danh sách distributor",
        "data": data
      }, null, 2));
      
  } catch (error) {
      console.log(error);
  }
})


module.exports = router;
