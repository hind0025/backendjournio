const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');

// Function to add a message to the chat box
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Event listener for the send button
sendButton.addEventListener('click', async () => {
    const prompt = userInput.value.trim();
    if (!prompt) return;

    addMessage(prompt, true); // Add user message
    userInput.value = ''; // Clear input field

    try {
        const response = await fetch('http://127.0.0.1:5000/api/gemini/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch AI response');
        }

        const data = await response.json();
        addMessage(data.response || 'No response from AI');
    } catch (error) {
        console.error('Error:', error);
        addMessage('Error fetching AI response');
    }
});
