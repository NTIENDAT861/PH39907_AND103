const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const uri =
  "mongodb+srv://ntiendatcanon:ntiendatcanon@cluster0.ao1hfpf.mongodb.net/Lab3";

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log(error);
    console.log("Connect failed");
  }
};
module.exports = { connect };
