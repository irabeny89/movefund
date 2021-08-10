import { connections, createConnection } from "mongoose";

const dbConnection = () => {
  try {
    if (!connections[0]) {
      const db = createConnection(process.env.DB_URL!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log("Database: %s", process.env.DB_URL);
      return db
    }
    console.log("Database still on: %s", process.env.DB_URL);
    return connections[0]
  } catch (err) {
    console.log(err);
  }
};

export default dbConnection;
