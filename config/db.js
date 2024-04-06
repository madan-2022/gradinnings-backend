const mongoose = require("mongoose");

const db = mongoose
 .connect(
  `mongodb+srv://pushpendra:1234@cluster0.edbmizv.mongodb.net/Gradinings?retryWrites=true&w=majority`
 )
 .then(() => {
  console.log("Connected to MongoDB");
 })
 .catch((error) => {
  console.error("MongoDB connection error:", error);
 });
// const db = mongoose.connect('mongodb://127.0.0.1:27017/',{
//     dbName:'Gradinings'
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//   });

module.exports = db;
