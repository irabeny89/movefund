import { MongoDataSource } from "apollo-datasource-mongodb";
import mongoose from "mongoose";
import type { GraphContextType, MoneyOutType, Fields } from "../types";

export default class MoneyOutDatasource extends MongoDataSource<
  MoneyOutType,
  GraphContextType
> {
  getMoneyOutById(moneyOutId: mongoose.Types.ObjectId) {
    return this.findOneById(moneyOutId);
  }
  getMoneyOutsByIds(moneyOutId: mongoose.Types.ObjectId[]) {
    return this.findManyByIds(moneyOutId);
  }
  getMoneyOutsByFields(fields: Fields) {
    return this.findByFields(fields);
  }
}
