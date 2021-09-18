const config = {
  appData: {
    title: "MoveFund",
    description:
      "Ernest Irabor MoveMoney web app. Send and receive money or loan using this web app.",
    features: [
      "Send money to other users",
      "Receive money from users",
      "Request loan from us - MoveFund",
      "Withdraw money",
    ],
    testAccount: {
      email: "movefund@gmail.com",
      password: "testmove"
    },
    pageTitles: [
      "Home",
      "Dashboard",
      "Fund Account",
      "Send Money",
      "Payback Loan",
      "Users"
    ]
  },
  environmentVariable: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    tokenIssuer: process.env.TOKEN_ISSUER!,
    nodeEnvironment: process.env.NODE_ENV,
    maxLoan: process.env.NEXT_PUBLIC_MAX_LOAN,
    dbUrl: process.env.DB_URL!
  }
};

export default config;
