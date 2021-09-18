import mongoose, { connect } from "mongoose";

const dbConnection = async () => {
  if (mongoose.connections[0].readyState !== 1) {
    try {
      mongoose.set("debug", true);
      await connect(process.env.DB_URL!);
    } catch (err: any) {
      console.error(err.message);
      process.exit(1);
    }
  }
};

mongoose.connection.once("open", () =>
  console.log("Database connected: %s", process.env.DB_URL)
);

export default dbConnection;
