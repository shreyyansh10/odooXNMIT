const axios = require('axios');

const API_KEY_REF = "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"; // Replace with your actual API key

const url = "https://openrouter.ai/api/v1/chat/completions";

const headers = {
    "Authorization": `Bearer ${API_KEY_REF}`,
    "Content-Type": "application/json"
};

const messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": "What are the main points in this document?"
            },
            {
                "type": "file",
                "file": {
                    "filename": "document.pdf",
                    "file_data": "https://bitcoin.org/bitcoin.pdf"
                }
            }
        ]
    }
];

const plugins = [
    {
        "id": "file-parser",
        "pdf": {
            "engine": "pdf-text"
        }
    }
];

const payload = {
    "model": "anthropic/claude-sonnet-4",
    "messages": messages,
    "plugins": plugins
};

async function processDocument() {
    try {
        const response = await axios.post(url, payload, { headers });
        console.log(JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

// Call the function
processDocument();