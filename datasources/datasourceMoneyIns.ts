import { MongoDataSource } from "apollo-datasource-mongodb";
import mongoose from "mongoose";
import type { GraphContextType, MoneyInType, Fields } from "../types";

export default class MoneyInDatasource extends MongoDataSource<
  MoneyInType,
  GraphContextType
> {
  getMoneyInById(moneyInId: mongoose.Types.ObjectId) {
    return this.findOneById(moneyInId);
  }
  getMoneyInsByIds(moneyInId: mongoose.Types.ObjectId[]) {
    return this.findManyByIds(moneyInId);
  }
  getMoneyInsByFields(fields: Fields) {
    return this.findByFields(fields);
  }
}
