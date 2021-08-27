import {
  registerUser,
  getUserById,
  login,
  refreshToken,
  logout,
  getAllUsers,
  removeUser,
  requestLoan,
  replyLoanRequest,
  // addUserTransferOut,
  // addUserWithdrawal,
  // getAllUsersLoans,
  // getAllUsersTransfersIn,
  // getAllUsersTransfersOut,
  // getAllUsersWithdrawals,
  // getUserLoan,
  // getUserTransferIn,
  // getUserTransferOut,
  // getUserWithdrawal,
  // updateUserLoan,
  // updateUser,
} from "@/utils/index";

export const mutationResponse = "Completed";
const hello = () => "world!";
const resolvers = {
  Query: {
    hello,
    refreshToken,
    logout,
    getUserById,
    getAllUsers,
    // getUserTransferIn,
    // getAllUsersTransfersIn,
    // getUserTransferOut,
    // getAllUsersTransfersOut,
    // getUserWithdrawal,
    // getAllUsersWithdrawals,
    // getUserLoan,
    // getAllUsersLoans
  },
  Mutation: {
    registerUser,
    login,
    removeUser,
    requestLoan,
    replyLoanRequest
    // updateUser,
    // addUserTransferOut,
    // addUserWithdrawal,
    // updateUserLoan
  }
};

export default resolvers;
