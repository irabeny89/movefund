import { useReactiveVar } from "@apollo/client";
import { accessTokenVar } from "@/graphql/reactiveVariables";
import { decode, JwtPayload } from "jsonwebtoken";
import { UserPayloadType } from "types";

export const usePayload = () => {
  // retrieve access token
  const accessToken = useReactiveVar(accessTokenVar);
    // return decoded token
  return decode(accessToken!) as (JwtPayload & UserPayloadType) | null;
};
