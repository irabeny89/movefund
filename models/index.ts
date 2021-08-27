import mongoose, { connect } from "mongoose";

const dbConnection = async () => {
  try {
    mongoose.set("debug", true)
    await connect(process.env.DB_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    });
    console.log("Database connected: %s", process.env.DB_URL)
  } catch (err) {
    console.log(err);
  }
};

export default dbConnection;
