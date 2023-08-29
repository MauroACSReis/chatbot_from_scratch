require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

const apiKey = process.env.OPENAI_API_KEY;
const modelId = process.env.MODEL_ID;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post(`https://api.openai.com/v1/engines/${modelId}/completions`, {
      prompt: req.body.prompt,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error details:", error.response.data); // This will log the specific error details from OpenAI (if available).
    res.status(500).json({ error: "Failed to call OpenAI API", details: error.response ? error.response.data : null });
  }
  
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
