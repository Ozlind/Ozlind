function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");

  const message = input.value.trim();

  if (!message) return;

  chat.innerHTML += `<p><b>You:</b> ${message}</p>`;
  chat.innerHTML += `<p><b>Ozlind AI:</b> Hi! I'm Ozlind AI 🤖. I'm being set up right now!</p>`;

  input.value = "";
}
