var express = require('express');
var router = express.Router();

const Distributors = require('../models/distributors')
const Furits = require('../models/fruits')
const Users = require('../models/users')
const Upload = require('../config/common/upload');



router.get('/get-list-distributor', async (req, res) => {
    try {
        const data = await Distributors.find().populate();
        res.json({
            "status": 200,
            "messenger": "Danh sách distributor",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
})


router.get('/get-all-fruit', async (req, res) => {
    try {
        const data = await Furits.find().populate();
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
})


router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body;
        const newDistributors = new Distributors({
            name: data.name
        });
        const result = await newDistributors.save();
        if (result) {
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Lỗi thêm không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/add-furit', async (req, res) => {
    try {
        const data = req.body;
        const newFruit = new Furits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description: data.description,
            id_distributor: data.id_distributor
        });
        const result = await newFruit.save();
        if (result) {
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Thêm không thành công",
                "data": []
            })

        }
    } catch (error) {
        console.log(error);
    }
})




router.get('/get-list-fruit', async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) {
        return res.sendStatus(401); // Kiểm tra xem header Authorization có tồn tại không
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Kiểm tra xem token có tồn tại không
    }

    try {
        const payload = JWT.verify(token, SECRETKEY); // Xác thực token
        console.log(payload);

        const data = await Furits.find().populate('id_distributor');
        res.json({
            "status": 200,
            "message": 'Danh sách fruit',
            "data": data
        });
    } catch (error) {
        if (error instanceof JWT.TokenExpiredError) {
            return res.sendStatus(401); // Token hết hạn
        } else {
            console.error(error);
            return res.sendStatus(403); // Lỗi xác thực
        }
    }
});

//get fruits by id
router.get('/get-fruit-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await Furits.findById(id).populate('id_distributor');
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data
        })
    } catch (error) {
        console.log(error);
    }
})


//get fruits by price
router.get('/get-fruit-in-price', async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;

        const query = { price: { $gte: minPrice, $lte: maxPrice } };

        const data = await Furits.find(query, "name quantity price id_distributor")
            .populate('id_distributor')
            .sort({ quantity: -1 })
            .skip(0)
            .limit(2)
        res.json({
            'status': 200,
            'messenger': 'Danh sách fruit',
            'data': data
        })
    } catch (error) {
        console.log(error);
    }
})

//get fruit have name a or x
router.get('/get-list-fruit-have-name-a-or-x', async (req, res) => {
    try {
        const query = {
            $or: [
                { name: { $regex: 'A' } },
                { name: { $regex: 'X' } },
            ]
        }


        const data = await Furits.find(query, 'name quantity price id_distributor')
            .populate('id_distributor')

        res.json({
            'status': 200,
            'messenger': 'Danh sách fruit',
            'data': data
        })
    } catch (error) {
        console.log(error);
    }
})

router.put('/update-fruit-by-id/:id', Upload.array('image', 5), async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body;
        const { files } = req;



        const urlsImage =
            files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
        const updatefruit = await Furits.findById(id)
        files.map((file) => console.log(123, file.filename));
        console.log(345, updatefruit.image);

        let result = null;
        if (updatefruit) {
            updatefruit.name = data.name ?? updatefruit.name,
                updatefruit.quantity = data.quantity ?? updatefruit.quantity,
                updatefruit.price = data.price ?? updatefruit.price,
                updatefruit.status = data.status ?? updatefruit.status,


                updatefruit.image = urlsImage ?? updatefruit.image,

                updatefruit.description = data.description ?? updatefruit.description,
                updatefruit.id_distributor = data.id_distributor ?? updatefruit.id_distributor,
                result = await updatefruit.save();
        }
        if (result) {
            res.json({
                'status': 200,
                'messenger': 'Cập nhật thành công',
                'data': result
            })
        } else {
            res.json({
                'status': 400,
                'messenger': 'Cập nhật không thành công',
                'data': []
            })
        }
    } catch (error) {
        console.log(error);
    }
})


router.put('/update-distributor-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const data = req.body
        const updateDistributor = await Distributors.findById(id)
        let result = null;
        if (updateDistributor) {
            updateDistributor.name = data.name ?? updateDistributor.name

            result = await updateDistributor.save();
        }
        if (result) {
            res.json({
                'status': 200,
                'messenger': 'Cập nhật thành công',
                'data': result
            })
        } else {
            res.json({
                'status': 400,
                'messenger': 'Cập nhật không thành công',
                'data': []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

//delete fruit
router.delete('/destroy-fruit-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Furits.findByIdAndDelete(id);
        if (result) {
            res.json({
                "status": 200,
                "messenger": "Xóa thành công",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Lỗi! xóa không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.delete('/destroy-distributor-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Distributors.findByIdAndDelete(id);
        if (result) {
            res.json({
                "status": 200,
                "messenger": "Xóa thành công",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Lỗi! xóa không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

//upload image
router.post('/add-fruit-with-file-image', Upload.array('image', 5), async (req, res) => {
    //Upload.array('image',5) => up nhiều file tối đa là 5
    //upload.single('image') => up load 1 file
    try {
        const data = req.body; // Lấy dữ liệu từ body
        const { files } = req //files nếu upload nhiều, file nếu upload 1 file
        const urlsImage =
            files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`)
        //url hình ảnh sẽ được lưu dưới dạng: http://localhost:3000/upload/filename
        const newfruit = new Furits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: urlsImage, /* Thêm url hình */
            description: data.description,
            id_distributor: data.id_distributor
        }); //Tạo một đối tượng mới
        const result = await newfruit.save(); //Thêm vào database
        if (result) {// Nếu thêm thành công result !null trả về dữ liệu
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        } else {// Nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status": 400,
                "messenger": "Lỗi, thêm không thành công",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});





//search Distributor
router.get('/search-distributor', async (req, res) => {
    const inputString = req.query.key; // Get the input string from the request query parameters
    
    if (inputString) {
        try {
            const key = req.query.key;
           
            const data = await Distributors.find({ name: { "$regex": key, "$options": "i" } })
                .sort({ createdAt: -1 });
    
                
            if (data) {
                res.json({
                    "status": 200,
                    "messenger": "Thành công",
                    "data": data
                })
            } else {
                res.json({
                    "status": 400,
                    "messenger": "Lỗi, không thành công",
                    "data": []
                })
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.json({
            "status": 400,
            "messenger": "Bad Request: Input string is missing or invalid",
            "data": []
        })
      
    }
    
})

function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = router;
