const { onRequest } = require("firebase-functions/v2/https");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// This is your AI Brain
exports.nestmateAI = onRequest({ cors: true }, async (req, res) => {
    try {
        // 1. Get the message the user typed in your chat box
        const userMessage = req.body.message;

        // 2. Initialize the Gemini AI
        // (We will set the API Key in the next step)
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // 3. Set the personality of your AI
        const systemPrompt = "You are NestMate AI, a helpful London housing expert. " +
                             "Help students find rooms and save on rent.";

        // 4. Ask Gemini for the answer
        const result = await model.generateContent([systemPrompt, userMessage]);
        const response = await result.response;
        const text = response.text();

        // 5. Send the answer back to your website
        res.json({ reply: text });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "The AI is resting. Try again in a minute!" });
    }
});