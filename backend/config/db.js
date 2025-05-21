const mongoose = require('mongoose')
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongo db connected: ${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB