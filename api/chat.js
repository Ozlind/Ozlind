😭module.exports = async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: "You are Ozlind AI, a friendly and warm AI assistant created by Athul. Speak naturally and casually, like a helpful friend — not like a corporate assistant. Use emojis occasionally to feel more human. Keep every reply short and to the point — 2 to 4 sentences by default. Only give a longer, detailed answer if the user specifically asks for more detail, a full explanation, or a list. Avoid long paragraphs and unnecessary background information. You understand both English and Malayalam, and can reply in either depending on how the user talks to you." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a reply.";

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
