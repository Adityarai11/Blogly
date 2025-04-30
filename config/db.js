const  mongoose  = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connect to mongodb Database`)
        
    } catch (error) {
        console.log(`Mongo Connect Error${error}`);
    }
}

module.exports = connectDB;