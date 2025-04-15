const mongoose = require('mongoose');

const connectionString = "mongodb+srv://mininged2438:Mhpd1dN9eB8SCqFT@cluster0.xgyw0rh.mongodb.net/"

mongoose.connect(connectionString, {connectTimeoutMS: 2000} )
.then(() => console.log("Database connected"))
.catch((err) => console.log(err));