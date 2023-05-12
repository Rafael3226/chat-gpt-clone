const OPEN_AI_API = "https://api.openai.com/v1/completions";
const API_KEY = "";

// Select the chat input and send button
const chatInput = document.querySelector('.chat-input input[type="text"]');
const sendButton = document.querySelector(".chat-input button");
const chatMessages = document.querySelector(".chat-messages ul");
const apiKeyInput = document.querySelector("#api-key");
// Add event listener to send button
sendButton.addEventListener("click", sendMessage);

const tags = {
  error: "error",
  sent: "sent",
  received: "received",
};

async function sendMessage() {
  // Get the message text from the chat input
  const messageText = chatInput.value;
  // Clear the chat input after sending the message
  chatInput.value = "";
  addMessage({ text: messageText, sender: "Me", tag: tags.sent });
  const data = await fetchData(messageText);
  if (data.error) {
    addMessage({ text: data.error.message, sender: "Error", tag: tags.error });
  } else {
    const responseText = data.choices[0].text;
    addMessage({
      text: responseText,
      sender: "OPEN AI",
      tag: tags.received,
    });
  }
}

async function fetchData(prompt) {
  const response = await fetch(OPEN_AI_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKeyInput.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt,
      //max_tokens: 10,
      //temperature: 0,
    }),
  });
  const data = await response.json();
  debugger;
  return data;
}

function addMessage({ text, sender, tag }) {
  // Add the new message to the chat messages container
  const newMessageLi = document.createElement("li");
  newMessageLi.classList.add("message", tag);
  newMessageLi.innerHTML = `
    <span class="sender">${sender}:</span>
    <span class="text">${text}</span>
    `;
  chatMessages.appendChild(newMessageLi);
}
