import Dataloader from "dataloader";
import MoneyInModel from "../models/modelMoneyIn"

const getMoneyInLoader = () =>
  new Dataloader((ids: any) => MoneyInModel.find({ _id: { $in: ids } }).exec());

export default getMoneyInLoader