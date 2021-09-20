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
      password: "testmove",
    },
    pageTitles: [
      "Home",
      "Dashboard",
      "Fund Account",
      "Send Money",
      "Payback Loan",
      "Users",
    ],
  },
  environmentVariable: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    tokenIssuer: "https://movefund.vercel.app",
    nodeEnvironment: process.env.NODE_ENV,
    maxLoan: 10000,
    monthlyInterestRate: 0.1,
    dbUrl:
      process.env.NODE_ENV == "production"
        ? process.env.DB_URL_ATLAS!
        : process.env.DB_URL_COMPASS!,
    host:
      process.env.NODE_ENV == "production"
        ? "https://movefund.vercel.app"
        : "http://localhost:3000",
    graphqlUri:
      process.env.NODE_ENV == "production"
        ? "https://movefund.vercel.app/api/graphql"
        : "http://localhost:3000/api/graphql",
  },
};

export default config;
