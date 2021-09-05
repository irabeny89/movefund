import registerUser from "@/utils/registerUser";
import login from "@/utils/login";
import refreshToken from "@/utils/refreshToken";
import logout from "@/utils/logout";
import getAllUsers from "@/utils/getAllUsers";
import requestLoan from "@/utils/requestLoan";
import replyLoanRequest from "@/utils/replyLoanRequest";
import sendMoney from "@/utils/sendMoney";
import paybackLoan from "@/utils/paybackLoan";
import getUserById from "@/utils/getUserById";
import getMyProfile from "@/utils/getMyProfile";

export const mutationResponse = "Completed";
const hello = () => "world!";
const resolvers = {
  Query: {
    hello,
    refreshToken,
    getAllUsers,
    getUserById,
    getMyProfile,
  },
  Mutation: {
    registerUser,
    login,
    logout,
    requestLoan,
    replyLoanRequest,
    sendMoney,
    paybackLoan,
  },
};

export default resolvers;
