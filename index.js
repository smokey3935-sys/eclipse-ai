import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 OpenAI setup (API key comes from Render later)
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// 💬 Chat endpoint
app.post("/chat", async (req, res) => {
    try {
        const message = req.body.message;

        const response = await client.responses.create({
            model: "gpt-4.1-mini",
            input: message
        });

        const reply = response.output[0].content[0].text;

        res.json({ reply });

    } catch (err) {
        res.json({ reply: "Error talking to AI." });
    }
});

// 🚀 Start server
app.listen(3000, () => {
    console.log("Eclipse AI running on port 3000");
});
