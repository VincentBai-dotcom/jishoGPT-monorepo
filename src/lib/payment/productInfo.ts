export const priceIDs = {
  starterTier: {
    monthly: "price_1OINJLGsQl5mNBHeUAiDlZZX",
    yearly: "price_1OINOmGsQl5mNBHeF7sE3DS6",
  },
  proTier: {
    monthly: "price_1OINJhGsQl5mNBHe8AWONJHF",
    yearly: "price_1OINOmGsQl5mNBHeF7sE3DS6",
  },
};

export const productInfo = {
  basicTier: {
    productName: "Basic Tier",
    price: "Free",
    description: "Try our JishoGPT for free",
    details: ["Up to 30 newly generated searches per day", "No regeneration"],
    showUnit: false,
    buttonText: "Join for free",
  },
  starterTier: {
    monthly: {
      productName: "Starter Tier",
      price: "$10",
      description: "For daily usage",
      details: [
        "Up to 60 newly generated searches per day",
        "Regenerate texts up to 10 times per day",
      ],
    },
    yearly: {
      productName: "Starter Tier",
      price: "$8.33",
      description: "For daily usage",
      details: [
        "Up to 60 newly generated searches per day",
        "Regenerate texts up to 10 times per day",
      ],
    },
  },
  proTier: {
    monthly: {
      productName: "Pro Tier",
      price: "$30",
      description: "For intense learner",
      details: ["Unlimited searches and regeneration"],
    },
    yearly: {
      productName: "Pro Tier",
      price: "$27.5",
      description: "For daily usage",
      details: ["Unlimited searches and regeneration"],
    },
  },
};
