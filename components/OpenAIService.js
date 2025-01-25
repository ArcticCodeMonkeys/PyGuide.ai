import axios from 'axios';
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateResponse = async (messages) => {
    try {
        const response = await axios.post(
        API_URL,
        {
            model: 'gpt-4',
            messages: messages,
            max_tokens: 150,
            temperature: 0.7
        },
        {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
      );
      return response.data.choices[0].message.content; 
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        throw error;
    }
  };