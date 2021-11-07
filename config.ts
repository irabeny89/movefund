const config = {
  appData: {
    author: "Ernest Irabor",
    title: "MoveFund",
    description:
      "Ernest Irabor MoveFund web app. Loan, send and receive fund using this web app.",
    features: [
      "Send fund to other users",
      "Receive fund from users",
      "Request loan from us - MoveFund",
      "Withdraw fund",
    ],
    testAccount: {
      email: "movefund@gmail.com",
      password: "testmove",
    },
    pageTitles: [
      "Home",
      "Dashboard",
      "Fund Account",
      "Send Fund",
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
    // 30 days deadline == 2.592e9
    deadline: 2.592e9, 
    dbUrl:
      process.env.NODE_ENV == "production"
        ? process.env.DB_URL_ATLAS!
        : process.env.DB_URL_COMPASS!,
    host:
      process.env.NODE_ENV == "production"
        ? "https://movefund.vercel.app"
        : "http://localhost:3000",
    graphqlUri: "/api/graphql",
  },
};

export default config;
