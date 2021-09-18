const usersFakeData = [
  {
    _id: "613ea754e7e49d39648befa7",
    isDeleted: false,
    isAdmin: true,
    currency: "NGN",
    balance: 10000000,
    firstname: "Ernest",
    lastname: "Irabor",
    email: "irabeny89@gmail.com",
    phone: "09020951797",
    createdAt: "2021-09-13T01:20:20.345Z",
    updatedAt: "2021-09-13T01:20:20.345Z",
    credits: [
      {
        from: "Arnold Lovelace",
        amount: 100000,
        method: "APP_TRANSFER",
        _id: "1"
      },
      {
        from: "Caleb Amel",
        amount: 202000,
        method: "APP_TRANSFER",
        _id: "2"
      },
    ],
    debits: [
      {
        amount: 100000,
        to: "Ernest Irabor",
        _id: "1"
      },
      {
        to: "Caleb Amel",
        amount: 202000,
        _id: "2"
      },
    ],
    loans: [
      {
        status: "DISAPPROVED",
        isPaid: false,
        maxLoanable: 10000,
        monthlyInterestRate: 0.03,
        totalInterest: 0,
        amount: 0,
        amountDue: 0,
        deadline: "",
        createdAt: "",
        _id: "1"
      },
      {
        status: "APPROVED",
        isPaid: true,
        maxLoanable: 10000,
        monthlyInterestRate: 0.03,
        totalInterest: 0,
        amount: 0,
        amountDue: 0,
        deadline: "",
        createdAt: "",
        _id: "2"
      },
      {
        status: "PENDING",
        isPaid: false,
        maxLoanable: 10000,
        monthlyInterestRate: 0.03,
        totalInterest: 0,
        amount: 0,
        amountDue: 0,
        deadline: "",
        createdAt: "",
        _id: "3"
      },
    ],
    withdraws: [],
  },
  {
    _id: "2o29ea754ewusj879648befa7",
    isDeleted: false,
    isAdmin: false,
    currency: "NGN",
    balance: 0,
    firstname: "Sule",
    lastname: "Amam",
    email: "fakeemail@gmail.com",
    phone: "09023951298",
    createdAt: "2021-09-13T01:20:20.345Z",
    updatedAt: "2021-09-13T01:20:20.345Z",
    credits: [
      {
        from: "Arnold Lovelace",
        amount: 100000,
        method: "APP_TRANSFER",
        _id: "0"
      },
      {
        from: "Caleb Amel",
        amount: 202000,
        method: "APP_TRANSFER",
        _id: "1"
      },
    ],
    debits: [
      {
        amount: 100000,
        to: "Ernest Irabor",

        _id: "2"
      },
      {
        to: "Caleb Amel",
        amount: 202000,
        _d: "1"
      },
    ],
    loans: [
      {
        status: "APPROVED",
        isPaid: true,
        maxLoanable: 10000,
        monthlyInterestRate: 0.03,
        totalInterest: 0,
        amount: 0,
        amountDue: 0,
        deadline: "",
        createdAt: "",
        _id: "2"
      },
    ],
    withdraws: [],
  },
];

export default usersFakeData;
