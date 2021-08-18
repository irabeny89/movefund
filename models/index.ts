import { connect, connections } from "mongoose";

const dbConnection = async () => {
  try {
    // if (connections[0]) return 
    await connect(process.env.DB_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    });
    console.log("Database connected: %s", process.env.DB_URL)
    // await connections[0].close()
  } catch (err) {
    console.log(err);
  }
};

export default dbConnection;
