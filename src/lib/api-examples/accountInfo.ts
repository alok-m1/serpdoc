export const accountInfoJsonResponse = {
  status: "success",
  msg: "",
  results: {
    email: "info@serphouse.com",
    name: "tester",
    api_key: "zHF0qEUMwZAWWTB3AwzYLmudfdfdLKvabDmxQV6lq86phvoaoZdVyI59osQze",
    plan: [
      {
        name: "new 19 may custom plan",
        plan_type: "custom",
        price: 140,
        currency: "INR",
        credit_available: 1600,
        credit_total: 1600,
      },
      {
        name: "Daily 22 may plan",
        plan_type: "monthly",
        price: 150,
        currency: "INR",
        credit_available: 1895,
        credit_total: 2000,
      },
    ],
  },
} as const;
