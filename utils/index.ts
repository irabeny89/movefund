import { Model } from "mongoose";
import { ValidationError, UserInputError } from "apollo-server-micro";
import DataLoader from "dataloader";
import { mutationResponse } from "@/graphql/resolvers";

export const create = async <T = any>(
  DocModel: Model<T, {}, {}>,
  data: any
): Promise<T> => {
  if ("email" in data) {
    const isExisting = await DocModel.findOne({ email: data.email });
    if (isExisting) throw new ValidationError("Already existing");
  }
  return await DocModel.create(data);
};

export const read = async <T = any>(
  id: string,
  dataloader: DataLoader<unknown, T, unknown>
): Promise<T> => {
  try {
    return await dataloader.load(id);
  } catch (error) {
    throw new UserInputError("ID not existing");
  }
};

export const update = async <T = any>(
  DocModel: Model<T, {}, {}>,
  id: string,
  data: any
): Promise<string> => {
  const isExisting = await DocModel.findByIdAndUpdate(id, data).exec();
  if (!isExisting) throw new UserInputError("ID not existing");
  return mutationResponse;
};

export const remove = async <T = any>(
  DocModel: Model<T, {}, {}>,
  id: string
): Promise<string> => {
  const isExisting = await DocModel.findByIdAndDelete(id).exec();
  if (!isExisting) throw new UserInputError("ID not existing");
  return mutationResponse;
};
