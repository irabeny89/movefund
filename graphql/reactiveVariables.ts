import { makeVar } from "@apollo/client";

export const accessTokenVar = makeVar("");

export const myLastLoanAmountDueVar = makeVar(0)

export const currentUserVar = makeVar({ firstname: "" })