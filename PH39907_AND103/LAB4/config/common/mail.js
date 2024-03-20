var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // or the appropriate port for your setup
  secure: true,
  tls: {
      rejectUnauthorized: false 
  },
 
  service: "gmail",
  auth: {
    user: "ntiendat.nofriendnomoney@gmail.com",
    pass: "lvfdptqxiiqkqwgn",
  },
});

module.exports = transporter;
