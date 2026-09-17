import express from 'express';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/', async (req, res) => {
    const { code, mode, question } = req.body;

    if (!code) return res.status(400).json({ error: 'Code is required' });

    let systemPrompt = '';
    let userPrompt = '';

    if (mode === 'dsa') {
        systemPrompt = `You are an expert strict DSA evaluator. 
Format your output EXACTLY using these Markdown headers:
### 📝 Problem Understanding
### 🐛 Bugs & Edge Cases
### ⏱️ Complexity
### 🎯 Core Concepts to Review
(Based on their mistakes, explicitly list 2-3 specific Data Structures, Algorithms, or C++ concepts the user needs to study)
### 💻 Corrected & Optimized Code
(Provide the final code in a markdown code block)`;
        userPrompt = `Problem Statement: ${question || "None provided."}\n\nCode:\n${code}`;
    
    } else if (mode === 'webdev') {
        systemPrompt = `You are a Senior Web Developer. Format output with: 🔍 Bug Identification, 💡 Concept Explanation, 💻 Corrected Code.`;
        userPrompt = `Code to analyze:\n${code}`;
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            model: 'openai/gpt-oss-20b', // Your working model
            temperature: 0.2,
            max_tokens: 4096 // 👈 THIS FIXES THE CUT-OFF CODE ISSUE
        });

        res.json({ result: chatCompletion.choices[0]?.message?.content || "No response generated." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to analyze code.' });
    }
});

export default router;