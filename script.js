const OPEN_AI_API = "https://api.openai.com/v1/completions";
const API_KEY = "";

// Select the chat input and send button
const chatInput = document.querySelector('.chat-input input[type="text"]');
const sendButton = document.querySelector(".chat-input button");
const chatMessages = document.querySelector(".chat-messages ul");

// Add event listener to send button
sendButton.addEventListener("click", sendMessage);

async function sendMessage() {
  // Get the message text from the chat input
  const messageText = chatInput.value;
  addMessage({ text: messageText, sender: "Me", isSent: true });
  const data = await fetchData(messageText);
  const responseText = data.choices[0].text;
  addMessage({ text: responseText, sender: "OPEN AI", isSent: false });

  // Clear the chat input after sending the message
  chatInput.value = "";
}

async function fetchData(prompt) {
  const response = await fetch(OPEN_AI_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
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
  return data;
}

function addMessage({ text, sender, isSent }) {
  const label = isSent ? "sent" : "received";
  // Add the new message to the chat messages container
  const newMessageLi = document.createElement("li");
  newMessageLi.classList.add("message", label);
  newMessageLi.innerHTML = `
    <span class="sender">${sender}:</span>
    <span class="text">${text}</span>
    `;
  chatMessages.appendChild(newMessageLi);
}
