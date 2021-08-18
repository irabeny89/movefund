import Dataloader from "dataloader";
import UserModel from "../../models/modelUser";

const getUserLoader = () =>
  new Dataloader((ids: any) => UserModel.find({ _id: { $in: ids } }).exec());

export default getUserLoader