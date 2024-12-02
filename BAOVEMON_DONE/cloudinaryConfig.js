const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dziu9oaxe', // Thay bằng Cloud Name của bạn
  api_key: '835868912797914',       // Thay bằng API Key của bạn
  api_secret: 'youcf6_-s0n6VPs3DNUlTON9McQ', // Thay bằng API Secret của bạn
});

module.exports = cloudinary;