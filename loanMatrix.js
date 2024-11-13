const loanPrograms = [
    {
        name: "Conventional",
        minCreditScore: 620,
        maxDTI: 50,
        maxLTV: 97,
        eligibleCollateral: ["1-4 Units", "PUD", "Approved Condos"],
        comments: "PMI required if < 20% down payment.",
    },
    {
        name: "VA",
        minCreditScore: 500,
        maxDTI: 50,
        maxLTV: 100,
        eligibleCollateral: ["Owner Occupied", "1-4 Units", "Modular Homes"],
        comments: "Residual income calculation required.",
    },
    {
        name: "FHA",
        minCreditScore: 500,
        maxDTI: 43,
        maxLTV: 96.5,
        eligibleCollateral: ["1-4 Units", "PUD", "FHA-approved Condos"],
        comments: "Compensating factors required for higher DTIs.",
    },
    {
        name: "USDA",
        minCreditScore: 550,
        maxDTI: 41,
        maxLTV: 100,
        eligibleCollateral: ["Owner Occupied", "1 Unit", "Rural Areas"],
        comments: "Property must meet USDA eligibility criteria.",
    },
];

export default loanPrograms;
