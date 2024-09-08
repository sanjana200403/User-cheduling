const mongoose = require('mongoose');

const DBconnection=()=>{
    mongoose.connect('mongodb+srv://03sanjana2004:sanjana@cluster0.d2o0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log("MongoDB connected!!"))
    .catch(err => console.error("Could not connect to MongoDB!!", err));

}
module.exports = {DBconnection}