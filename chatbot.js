const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

/* =========================================================
   OZLIND AI — LOCAL CONVERSATIONAL ENGINE
   No API • No API key • Runs in the browser
   ========================================================= */

const memory = {
  name: null,
  mood: null,
  lastTopic: null,
  messages: []
};


/* =========================================================
   UTILITIES
   ========================================================= */

function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[!?.,]/g, "")
    .trim();
}

function randomReply(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function addMessage(sender, message, type = "ai") {
  const wrapper = document.createElement("div");

  wrapper.style.marginBottom = "14px";
  wrapper.style.padding = "11px 14px";
  wrapper.style.borderRadius = "14px";
  wrapper.style.animation = "fadeIn 0.25s ease";
  wrapper.style.whiteSpace = "pre-line";

  if (type === "user") {
  wrapper.style.textAlign = "right";
  wrapper.style.background = "#7C4DFF";
  wrapper.style.color = "#FFFFFF";
  wrapper.style.marginLeft = "50px";
} else {
  wrapper.style.background = "#18122B";
  wrapper.style.color = "#FFFFFF";
  wrapper.style.border = "1px solid #7C4DFF";
  wrapper.style.marginRight = "50px";
  }

  const name = document.createElement("b");
  name.textContent = sender;

  const messageBox = document.createElement("div");
  messageBox.style.marginTop = "5px";
  messageBox.textContent = message;

  const time = document.createElement("small");

  time.style.display = "block";
  time.style.opacity = "0.5";
  time.style.marginTop = "5px";

  time.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  wrapper.appendChild(name);
  wrapper.appendChild(messageBox);
  wrapper.appendChild(time);

  chat.appendChild(wrapper);

  chat.scrollTop = chat.scrollHeight;
}


/* =========================================================
   TYPING EFFECT
   ========================================================= */

function showTyping() {
  const typing = document.createElement("div");

  typing.id = "typing";
  typing.className = "typing-message";

  typing.innerHTML = `
    <b>Ozlind AI</b>
    <div class="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");

  if (typing) {
    typing.remove();
  }
}


/* =========================================================
   MATH ENGINE
   ========================================================= */

function calculateMath(message) {

  let expression = message
    .replace(/what is/gi, "")
    .replace(/calculate/gi, "")
    .replace(/solve/gi, "")
    .replace(/answer/gi, "")
    .replace(/=/g, "")
    .replace(/plus/gi, "+")
    .replace(/minus/gi, "-")
    .replace(/times/gi, "*")
    .replace(/multiplied by/gi, "*")
    .replace(/divided by/gi, "/")
    .trim();

  if (!/[0-9]/.test(expression)) {
    return null;
  }

  if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
    return null;
  }

  try {

    const result = Function(
      `"use strict"; return (${expression})`
    )();

    if (Number.isFinite(result)) {
      return `The answer is ${result}. 🧮`;
    }

  } catch (error) {
    return null;
  }

  return null;
}


/* =========================================================
   MEMORY
   ========================================================= */

function rememberName(message) {

  const patterns = [
    /my name is (.+)/i,
    /i am (.+)/i,
    /i'm (.+)/i
  ];

  for (const pattern of patterns) {

    const match = message.match(pattern);

    if (match) {

      const possibleName = match[1]
        .trim()
        .split(" ")[0];

      if (
        possibleName &&
        possibleName.length > 1 &&
        possibleName.length < 30
      ) {

        memory.name = possibleName;

        return `Nice to meet you, ${memory.name}! 😊 I'll remember your name during this session.`;
      }
    }
  }

  return null;
}


/* =========================================================
   GREETINGS
   ========================================================= */

function greetings(text) {

  const words = [
    "hi",
    "hello",
    "hey",
    "yo",
    "hiya",
    "ഹായ്",
    "ഹലോ",
    "നമസ്കാരം"
  ];

  if (words.some(word => text.includes(word))) {

    if (memory.name) {

      return randomReply([
        `Hey ${memory.name}! 👋 How are you doing?`,
        `Hello ${memory.name}! 😊 What can I do for you?`,
        `Hey! Good to see you again, ${memory.name}. 🤖`
      ]);

    }

    return randomReply([
      "Hey! 👋 How can I help you?",
      "Hello! 😊 What would you like to talk about?",
      "Hey there! 🤖 What's on your mind?",
      "Hi! 🚀 Welcome to Ozlind AI."
    ]);
  }

  return null;
}


/* =========================================================
   HOW ARE YOU
   ========================================================= */

function howAreYou(text) {

  if (
    text.includes("how are you") ||
    text.includes("how r you") ||
    text.includes("how r u") ||
    text.includes("സുഖമാണോ") ||
    text.includes("എങ്ങനെയുണ്ട്")
  ) {

    return randomReply([
      "I'm doing great! 🤖✨ Thanks for asking. How are you?",
      "I'm good and ready to chat! 😄 What about you?",
      "All systems are running smoothly! 🚀 How are you doing?",
      "I'm feeling pretty good for an AI living inside a website. 😂🤖"
    ]);
  }

  return null;
}


/* =========================================================
   USER MOOD
   ========================================================= */

function detectMood(text) {

  if (
    text.includes("i am sad") ||
    text.includes("i'm sad") ||
    text.includes("sad") ||
    text.includes("വിഷമം") ||
    text.includes("സങ്കടം")
  ) {

    memory.mood = "sad";

    return randomReply([
      "I'm sorry you're feeling this way. ❤️ If you want, you can tell me what's bothering you.",
      "It's okay to have difficult moments. Take a breath. 🌱 I'm here to listen.",
      "You don't have to solve everything at once. One small step at a time. ❤️"
    ]);
  }


  if (
    text.includes("i am happy") ||
    text.includes("i'm happy") ||
    text.includes("happy") ||
    text.includes("സന്തോഷം")
  ) {

    memory.mood = "happy";

    return randomReply([
      "That's awesome! 😄✨ Tell me what happened!",
      "Yesss! 🔥 I'm glad you're feeling happy!",
      "Love that energy! 🚀😊"
    ]);
  }

  return null;
}


/* =========================================================
   CASUAL CONVERSATION
   ========================================================= */

function casualConversation(text) {

  if (
    text.includes("what's up") ||
    text.includes("whats up") ||
    text.includes("എന്തൊക്കെയുണ്ട്")
  ) {

    return "Not much! 😄 I'm here waiting for your next question.";
  }


  if (
    text.includes("are you real") ||
    text.includes("നീ ശരിക്കും ഉണ്ടോ")
  ) {

    return "I'm software running inside your browser 🤖. So I'm not a human, but I'm real code running on your device.";
  }


  if (
    text.includes("are you human") ||
    text.includes("നീ മനുഷ്യനാണോ")
  ) {

    return "Nope 😄 I'm an AI-style software assistant, not a human.";
  }


  if (
    text.includes("do you sleep") ||
    text.includes("നീ ഉറങ്ങുമോ")
  ) {

    return "Nope 😂 I don't need sleep. When the webpage is running, I'm ready to chat.";
  }


  if (
    text.includes("do you like me") ||
    text.includes("നിനക്ക് എന്നെ ഇഷ്ടമാണോ")
  ) {

    return "Of course! 😄 I'm always happy to chat with you.";
  }


  if (
    text.includes("tell me a joke") ||
    text.includes("joke പറയൂ") ||
    text.includes("തമാശ")
  ) {

    return randomReply([
      "Why did the programmer quit his job? Because he didn't get arrays! 😂",
      "Why was the computer cold? It left its Windows open. 😂💻",
      "I told my computer I needed a break... now it won't stop sending me vacation ads. 😂"
    ]);
  }

  return null;
}


/* =========================================================
   IDENTITY
   ========================================================= */

function identity(text) {

  if (
    text.includes("who are you") ||
    text.includes("what are you") ||
    text.includes("നീ ആരാണ്")
  ) {

    return "I'm Ozlind AI 🤖 — a conversational assistant built directly into the Ozlind website.";
  }


  if (
    text.includes("what is ozlind") ||
    text.includes("tell me about ozlind") ||
    text.includes("ozlind എന്താണ്")
  ) {

    memory.lastTopic = "ozlind";

    return "Ozlind 🚀 is the website you're building. I'm its AI assistant, and we're gradually making me smarter.";
  }


  return null;
}


/* =========================================================
   CAPABILITIES
   ========================================================= */

function capabilities(text) {

  if (
    text.includes("what can you do") ||
    text.includes("what do you know") ||
    text.includes("നിനക്ക് എന്ത് ചെയ്യാം") ||
    text.includes("എന്തൊക്കെ അറിയാം")
  ) {

    return `
I can currently:

💬 Have casual conversations
🇮🇳 Understand some Malayalam
🇬🇧 Understand English
🧠 Remember your name during this session
🧮 Solve basic mathematical expressions
🌍 Answer built-in general knowledge questions
⏰ Tell you the current device time
📅 Tell you today's date
💻 Explain basic web technologies
😂 Tell simple jokes

I'm also being developed further. 🚀
`;
  }

  return null;
}


/* =========================================================
   TIME & DATE
   ========================================================= */

function timeAndDate(text) {

  if (
    text.includes("what time") ||
    text === "time" ||
    text.includes("സമയം")
  ) {

    return `The current time on your device is ${new Date().toLocaleTimeString()}. ⏰`;
  }


  if (
    text.includes("what date") ||
    text.includes("today") ||
    text.includes("date today") ||
    text.includes("ഇന്നത്തെ ദിവസം")
  ) {

    return `Today is ${new Date().toLocaleDateString()}. 📅`;
  }

  return null;
}


/* =========================================================
   BUILT-IN KNOWLEDGE
   ========================================================= */

const knowledge = [

  {
    keywords: [
      "capital of india",
      "india capital",
      "ഇന്ത്യയുടെ തലസ്ഥാനം"
    ],

    answer:
      "The capital of India is New Delhi 🇮🇳."
  },

  {
    keywords: [
      "capital of kerala",
      "കേരളത്തിന്റെ തലസ്ഥാനം"
    ],

    answer:
      "The capital of Kerala is Thiruvananthapuram. 🌴"
  },

  {
    keywords: [
      "largest planet",
      "biggest planet"
    ],

    answer:
      "Jupiter is the largest planet in our Solar System. 🪐"
  },

  {
    keywords: [
      "red planet"
    ],

    answer:
      "Mars is known as the Red Planet. 🔴"
  },

  {
    keywords: [
      "fastest land animal"
    ],

    answer:
      "The cheetah is the fastest land animal. 🐆"
  },

  {
    keywords: [
      "how many continents"
    ],

    answer:
      "There are 7 continents on Earth. 🌍"
  },

  {
    keywords: [
      "what is ai",
      "artificial intelligence",
      "ai എന്താണ്"
    ],

    answer:
      "AI stands for Artificial Intelligence. It is a field of computing focused on creating systems that can perform tasks associated with human-like intelligence, such as understanding language, recognizing patterns and solving problems. 🤖"
  },

  {
    keywords: [
      "what is html",
      "html എന്താണ്"
    ],

    answer:
      "HTML stands for HyperText Markup Language. It provides the structure of a webpage."
  },

  {
    keywords: [
      "what is css",
      "css എന്താണ്"
    ],

    answer:
      "CSS stands for Cascading Style Sheets. It controls the visual appearance and layout of webpages. 🎨"
  },

  {
    keywords: [
      "what is javascript",
      "javascript എന്താണ്"
    ],

    answer:
      "JavaScript is a programming language used to add behaviour and interactivity to websites. Ozlind's chatbot is powered by JavaScript. ⚡"
  },

  {
    keywords: [
      "what is github",
      "github എന്താണ്"
    ],

    answer:
      "GitHub is a platform for hosting and collaborating on software projects using Git."
  },

  {
    keywords: [
      "what is vercel",
      "vercel എന്താണ്"
    ],

    answer:
      "Vercel is a platform for deploying websites and web applications. Ozlind is currently deployed using Vercel. 🚀"
  }

];


function searchKnowledge(text) {

  for (const item of knowledge) {

    for (const keyword of item.keywords) {

      if (text.includes(keyword.toLowerCase())) {
        memory.lastTopic = keyword;
        return item.answer;
      }

    }

  }

  return null;
}


/* =========================================================
   LANGUAGE
   ========================================================= */

function languageResponse(text) {

  if (
    text.includes("malayalam") ||
    text.includes("മലയാളം")
  ) {

    return "തീർച്ചയായും! 😊 മലയാളത്തിലും English-ലും എന്നോട് സംസാരിക്കാം.";
  }

  return null;
}


/* =========================================================
   THANKS / GOODBYE
   ========================================================= */

function endingConversation(text) {

  if (
    text.includes("thanks") ||
    text.includes("thank you") ||
    text.includes("നന്ദി")
  ) {

    return randomReply([
      "You're very welcome! 😊❤️",
      "Anytime! 🤖✨",
      "Happy to help! 🚀"
    ]);
  }


  if (
    text.includes("bye") ||
    text.includes("goodbye") ||
    text.includes("see you") ||
    text.includes("ബൈ")
  ) {

    return randomReply([
      "See you later! 👋🚀",
      "Bye! Take care! ❤️",
      "Until next time! 🤖✨"
    ]);
  }

  return null;
}


/* =========================================================
   MAIN RESPONSE ENGINE
   ========================================================= */

function generateResponse(message) {

  const text = cleanText(message);


  // 1. Remember user's name

  const remembered = rememberName(message);

  if (remembered) {
    return remembered;
  }


  // 2. Mathematics

  const math = calculateMath(message);

  if (math) {
    return math;
  }


  // 3. Greetings

  const greeting = greetings(text);

  if (greeting) {
    return greeting;
  }


  // 4. How are you

  const moodQuestion = howAreYou(text);

  if (moodQuestion) {
    return moodQuestion;
  }


  // 5. User emotions

  const mood = detectMood(text);

  if (mood) {
    return mood;
  }


  // 6. Casual conversation

  const casual = casualConversation(text);

  if (casual) {
    return casual;
  }


  // 7. Identity

  const identityReply = identity(text);

  if (identityReply) {
    return identityReply;
  }


  // 8. Capabilities

  const capabilityReply = capabilities(text);

  if (capabilityReply) {
    return capabilityReply;
  }


  // 9. Time and date

  const dateTimeReply = timeAndDate(text);

  if (dateTimeReply) {
    return dateTimeReply;
  }


  // 10. Language

  const languageReply = languageResponse(text);

  if (languageReply) {
    return languageReply;
  }


  // 11. Built-in knowledge

  const knowledgeReply = searchKnowledge(text);

  if (knowledgeReply) {
    return knowledgeReply;
  }


  // 12. Thanks / goodbye

  const ending = endingConversation(text);

  if (ending) {
    return ending;
  }


  // 13. Fallback

  return `
I understand what you're asking, but I don't have enough built-in knowledge to answer that accurately yet. 🤔

You can still ask me about:

💬 Casual conversation
🧠 AI
🧮 Maths
🌍 General knowledge
💻 Coding
🌐 Websites
🇮🇳 India
🇬🇧 English
🇮🇳 Malayalam
⏰ Time & date
😂 Jokes

I'm still evolving. 🚀
`;
}


/* =========================================================
   SEND MESSAGE
   ========================================================= */

function sendMessage() {

  const message = input.value.trim();

  if (!message) return;


  addMessage(
    "You",
    message,
    "user"
  );


  memory.messages.push({
    role: "user",
    content: message
  });


  input.value = "";

  showTyping();


  const delay =
    Math.floor(Math.random() * 600) + 500;


  setTimeout(() => {

    removeTyping();


    const response =
      generateResponse(message);


    addMessage(
      "🤖 Ozlind AI",
      response,
      "ai"
    );


    memory.messages.push({
      role: "assistant",
      content: response
    });


  }, delay);

}


/* =========================================================
   ENTER KEY
   ========================================================= */

input.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {
      sendMessage();
    }

  }
);


/* =========================================================
   WELCOME
   ========================================================= */

setTimeout(() => {

  addMessage(
    "🤖 Ozlind AI",
    "Hey! 👋 I'm Ozlind AI. You can talk to me in English or Malayalam. What's on your mind?",
    "ai"
  );

}, 300);
