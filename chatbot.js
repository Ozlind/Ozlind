const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

const knowledge = {
  greetings: {
    keywords: ["hi", "hello", "hey", "ഹായ്", "ഹലോ", "നമസ്കാരം"],
    replies: [
      "Hey! 👋 Welcome to Ozlind AI. How can I help you today?",
      "Hello! 🤖✨ Nice to meet you. What would you like to explore?",
      "Hey there! 🚀 I'm Ozlind AI. Ask me anything from the topics I know."
    ]
  },

  identity: {
    keywords: [
      "who are you",
      "what are you",
      "നീ ആരാണ്",
      "നിങ്ങൾ ആരാണ്"
    ],
    replies: [
      "I'm Ozlind AI 🤖 — the intelligent assistant built for the Ozlind website.",
      "I'm Ozlind AI, your virtual assistant. I can chat, answer common questions and help you explore Ozlind."
    ]
  },

  capabilities: {
    keywords: [
      "what can you do",
      "what do you do",
      "നിനക്ക് എന്ത് ചെയ്യാം",
      "എന്തൊക്കെ ചെയ്യാം"
    ],
    replies: [
      "I can chat with you, understand common English and Malayalam phrases, answer questions from my built-in knowledge, explain concepts and help you explore Ozlind. 🚀",
      "I can help with general questions, simple explanations, greetings, Ozlind information and more. My knowledge is currently built into this website."
    ]
  },

  malayalam: {
    keywords: [
      "malayalam",
      "മലയാളം",
      "മലയാളത്തിൽ സംസാരിക്കാമോ",
      "മലയാളം അറിയാമോ"
    ],
    replies: [
      "അതെ! 😊 എനിക്ക് മലയാളത്തിലും English-ലും സംസാരിക്കാം.",
      "തീർച്ചയായും! ❤️ മലയാളത്തിൽ തന്നെ ചോദിക്കാം."
    ]
  },

  howAreYou: {
    keywords: [
      "how are you",
      "how r u",
      "സുഖമാണോ",
      "എങ്ങനെയുണ്ട്"
    ],
    replies: [
      "I'm doing great! 🤖✨ Thanks for asking. How are you?",
      "All systems are running smoothly! 🚀 How can I help you?"
    ]
  },

  thanks: {
    keywords: [
      "thank you",
      "thanks",
      "thank",
      "നന്ദി",
      "താങ്ക്സ്"
    ],
    replies: [
      "You're very welcome! 😊❤️",
      "Anytime! 🚀",
      "Happy to help! 🤖✨"
    ]
  },

  help: {
    keywords: [
      "help",
      "സഹായം",
      "help me",
      "എന്നെ സഹായിക്കൂ"
    ],
    replies: [
      "Of course! 😊 Tell me what you're trying to do and I'll help as much as I can.",
      "I'm here to help. 🤖 Ask your question and let's figure it out together."
    ]
  },

  ozlind: {
    keywords: [
      "ozlind",
      "what is ozlind",
      "tell me about ozlind",
      "ozlind എന്താണ്"
    ],
    replies: [
      "Ozlind 🚀 is the website project I'm currently powering. This chatbot is designed to make Ozlind more interactive.",
      "You're currently chatting with the Ozlind AI assistant 🤖. More features can be added to Ozlind over time."
    ]
  },

  ai: {
    keywords: [
      "what is ai",
      "what is artificial intelligence",
      "ai എന്താണ്",
      "artificial intelligence"
    ],
    replies: [
      "AI, or Artificial Intelligence, is technology that allows computers to perform tasks that normally require human-like intelligence, such as understanding language, recognizing patterns and making predictions.",
      "Artificial Intelligence is a field of computing focused on creating systems that can learn, reason, understand information and solve problems."
    ]
  },

  technology: {
    keywords: [
      "technology",
      "tech",
      "സാങ്കേതികവിദ്യ",
      "ടെക്നോളജി"
    ],
    replies: [
      "Technology is the practical use of knowledge, science and engineering to solve problems and create useful tools.",
      "Technology covers everything from smartphones and websites to AI, robotics, software and advanced computing."
    ]
  },

  website: {
    keywords: [
      "website",
      "web site",
      "വെബ്സൈറ്റ്",
      "site"
    ],
    replies: [
      "This website is powered by HTML, CSS and JavaScript, with Ozlind AI running through the chatbot interface.",
      "Websites are built using technologies such as HTML for structure, CSS for design and JavaScript for interaction."
    ]
  },

  coding: {
    keywords: [
      "coding",
      "programming",
      "code",
      "coding പഠിക്കണം",
      "programming പഠിക്കണം"
    ],
    replies: [
      "Coding is the process of writing instructions that computers can execute. JavaScript, Python, Java and C++ are popular programming languages.",
      "If you're learning coding, start with HTML and CSS for websites, then JavaScript to make them interactive. 🚀"
    ]
  },

  javascript: {
    keywords: [
      "javascript",
      "js",
      "ജാവാസ്ക്രിപ്റ്റ്"
    ],
    replies: [
      "JavaScript is a programming language commonly used to make websites interactive. This chatbot itself uses JavaScript. 🤖",
      "JavaScript can control webpage elements, respond to user actions, communicate with servers and build powerful web applications."
    ]
  },

  html: {
    keywords: [
      "html",
      "what is html",
      "html എന്താണ്"
    ],
    replies: [
      "HTML stands for HyperText Markup Language. It defines the structure and content of a webpage.",
      "Think of HTML as the skeleton of a website. CSS handles appearance and JavaScript adds behaviour."
    ]
  },

  css: {
    keywords: [
      "css",
      "what is css",
      "css എന്താണ്"
    ],
    replies: [
      "CSS stands for Cascading Style Sheets. It controls the appearance, layout, spacing, fonts and visual design of webpages.",
      "HTML creates the structure, while CSS makes the website look beautiful. 🎨"
    ]
  },

  github: {
    keywords: [
      "github",
      "git hub",
      "ഗിറ്റ്ഹബ്"
    ],
    replies: [
      "GitHub is a platform where developers store, manage and collaborate on software projects using Git.",
      "This Ozlind project is connected to GitHub, which allows changes to the website code to be tracked and deployed."
    ]
  },

  vercel: {
    keywords: [
      "vercel",
      "വെർസൽ"
    ],
    replies: [
      "Vercel is a cloud platform commonly used to deploy websites and web applications. Ozlind is currently deployed through Vercel. 🚀",
      "Vercel automatically builds and deploys connected projects when code changes are pushed to the repository."
    ]
  },

  security: {
    keywords: [
      "security",
      "safe",
      "secure",
      "സുരക്ഷ",
      "സുരക്ഷിതമാണോ"
    ],
    replies: [
      "Website security is important. Never expose passwords, API keys or private tokens in public frontend code or public GitHub repositories. 🔐",
      "A good security rule: keep secrets on the server side or in protected environment variables, never directly inside public JavaScript."
    ]
  },

  motivation: {
    keywords: [
      "motivate me",
      "motivation",
      "i am sad",
      "I'm sad",
      "വിഷമം",
      "മോട്ടിവേഷൻ"
    ],
    replies: [
      "You don't have to become perfect overnight. Small progress every day can become something huge. 🚀❤️",
      "Keep going. Every project starts as a small idea — including Ozlind. 🤖✨"
    ]
  },

  goodbye: {
    keywords: [
      "bye",
      "goodbye",
      "see you",
      "ബൈ",
      "പിന്നെ കാണാം"
    ],
    replies: [
      "See you later! 👋🚀",
      "Bye! Take care and keep building! ❤️",
      "Until next time! 🤖✨"
    ]
  }
};


// Find the best matching category
function findCategory(message) {
  const text = message.toLowerCase();

  for (const category of Object.values(knowledge)) {
    for (const keyword of category.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  return null;
}


// Add a message to the chat
function addMessage(sender, message, type) {
  const wrapper = document.createElement("div");

  wrapper.style.marginBottom = "16px";
  wrapper.style.padding = "10px 14px";
  wrapper.style.borderRadius = "12px";
  wrapper.style.animation = "fadeIn 0.25s ease";

  if (type === "user") {
    wrapper.style.textAlign = "right";
    wrapper.style.background = "#f0f0f0";
  } else {
    wrapper.style.background = "#f8f8ff";
  }

  const name = document.createElement("div");
  name.style.fontWeight = "bold";
  name.style.marginBottom = "5px";
  name.textContent = sender;

  const text = document.createElement("div");
  text.textContent = message;

  const time = document.createElement("small");
  time.style.opacity = "0.5";
  time.style.display = "block";
  time.style.marginTop = "5px";
  time.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  wrapper.appendChild(name);
  wrapper.appendChild(text);
  wrapper.appendChild(time);

  chat.appendChild(wrapper);

  chat.scrollTop = chat.scrollHeight;
}


// Typing animation
function showTyping() {
  const typing = document.createElement("div");

  typing.id = "typing";

  typing.style.padding = "10px";
  typing.style.opacity = "0.6";

  typing.innerHTML = `
    <b>🤖 Ozlind AI</b>
    <br>
    <span>Thinking...</span>
  `;

  chat.appendChild(typing);

  chat.scrollTop = chat.scrollHeight;
}


// Remove typing animation
function removeTyping() {
  const typing = document.getElementById("typing");

  if (typing) {
    typing.remove();
  }
}


// Generate response
function generateResponse(message) {
  const category = findCategory(message);

  if (category) {
    const replies = category.replies;

    return replies[Math.floor(Math.random() * replies.length)];
  }

  return `
I'm not completely sure about that yet. 🤔

I'm currently running with a built-in knowledge system rather than a live generative AI model.

Try asking me about:
• Ozlind
• AI
• Coding
• JavaScript
• HTML
• CSS
• GitHub
• Vercel
• Website development
• Malayalam
• General greetings

🚀 More advanced AI capabilities can be added later.
`;
}


// Send message
function sendMessage() {
  const message = input.value.trim();

  if (!message) return;

  addMessage("You", message, "user");

  input.value = "";

  showTyping();

  const thinkingTime =
    Math.floor(Math.random() * 700) + 500;

  setTimeout(() => {
    removeTyping();

    const response = generateResponse(message);

    addMessage("🤖 Ozlind AI", response, "ai");
  }, thinkingTime);
}


// Press Enter to send
input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});


// Welcome message
setTimeout(() => {
  addMessage(
    "🤖 Ozlind AI",
    "Hey! 👋 I'm Ozlind AI. Ask me something — English or Malayalam, both are welcome!",
    "ai"
  );
}, 300);
