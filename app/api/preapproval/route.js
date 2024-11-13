import loanPrograms from '../../../loanMatrix'; // Adjust the path to loanMatrix.js

export async function POST(request) {
    const { creditScore, dti, ltv, propertyType } = await request.json();

    const results = loanPrograms.map((program) => {
        const eligible =
            creditScore >= program.minCreditScore &&
            dti <= program.maxDTI &&
            ltv <= program.maxLTV &&
            program.eligibleCollateral.includes(propertyType);

        return {
            program: program.name,
            eligible,
            comments: program.comments,
        };
    });

    return new Response(JSON.stringify({ results }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
