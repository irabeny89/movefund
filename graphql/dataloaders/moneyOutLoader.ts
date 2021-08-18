import Dataloader from "dataloader";
import MoneyOutModel from "../../models/modelMoneyOut"

const getMoneyOutLoader = () =>
  new Dataloader((ids: any) => MoneyOutModel.find({ _id: { $in: ids } }).exec());

export default getMoneyOutLoader