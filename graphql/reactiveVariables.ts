import { makeVar } from "@apollo/client";

export const accessTokenVar = makeVar<string | undefined>("");

export const myLastLoanAmountDueVar = makeVar(0)