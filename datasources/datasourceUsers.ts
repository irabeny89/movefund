import { MongoDataSource } from "apollo-datasource-mongodb";
import mongoose from "mongoose";
import type { GraphContextType, UserType, Fields } from "../types";

export default class UserDatasource extends MongoDataSource<
  UserType,
  GraphContextType
> {
  getUserById(userId: mongoose.Types.ObjectId) {
    return this.findOneById(userId);
  }
  getUsersByIds(usersId: mongoose.Types.ObjectId[]) {
    return this.findManyByIds(usersId);
  }
  getUsersByFields(fields: Fields) {
    return this.findByFields(fields);
  }
}
