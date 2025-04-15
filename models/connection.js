const mongoose = require('mongoose');

const connectionString = "mongodb+srv://feugalionel:a9QNsvv4jtmF0zKu@cluster0.k8tcus8.mongodb.net/tickethack"

mongoose.connect(connectionString, {connectTimeoutMS: 2000} )
.then(() => console.log("Database connected"))
.catch((err) => console.log(err));