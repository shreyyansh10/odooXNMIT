const OpenAI = require('openai');

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "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"
});

async function getPricePredict() {
    try {
        const completion = await client.chat.completions.create({
            model: "deepseek/deepseek-r1-distill-llama-70b:free",
            messages: [
                {
                    role: "system",
                    content: "You are a pricing prediction model. Given three parameters: Product name Time period (in years) Condition (e.g., bad, medium, good,very good) Your task is to output only the predicted second-hand resale price in INDIAN rupees. Rules: Do not explain or describe your reasoning. Do not add extra words like \"The price is\" or \"Here is\". Return only the number followed by the Rupees sign (e.g., 120 ₹). Input Example: Product: Flower pot Time Period: 3 years Condition: Good Output Example: 700 ₹"
                },
                {
                    role: "user",
                    content: "product: flower pot, Time Period: 5 months, Condition: Good"
                }
            ]
        });

        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function
getPricePredict();
