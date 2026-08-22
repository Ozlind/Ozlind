module.exports = async function handler(req, res) {

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
          { role: "system", content: "You are Ozlind AI, a helpful assistant created by Athul." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    console.log("GROQ RESPONSE:", JSON.stringify(data));
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a reply.";

    return res.status(200).json({ reply });

  } catch (error) {

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
          { role: "system", content: "You are Ozlind AI, a helpful assistant created by Athul." },
          ...pastMessages,
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    console.log("GROQ RESPONSE:", JSON.stringify(data));
    const reply = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : "Sorry, I couldn't generate a reply.";

    return res.status(200).json({ reply });

  } catch (error) {

    console.log("FUNCTION ERROR:", error.message);

    return res.status(500).json({ error: "Something went wrong" });
  }
};
