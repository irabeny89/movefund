import { useReactiveVar } from "@apollo/client";
import { accessTokenVar, currentUserVar } from "@/graphql/reactiveVariables";
import { decode, JwtPayload } from "jsonwebtoken";

export const usePayload = () => {
  const currentUser = useReactiveVar(currentUserVar);
  // retrieve access token
  const accessToken = useReactiveVar(accessTokenVar);
  // decode token
  const jwtPayload = decode(accessToken!) as JwtPayload | null;
  
  return { currentUser, jwtPayload }
};
