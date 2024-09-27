document.addEventListener('DOMContentLoaded', function() {
  // Open and close the chat popup
  const chatPopup = document.getElementById('chatPopup');
  const openChatBtn = document.getElementById('openChat');
  const closeChatBtn = document.getElementById('closeChat');
  const chatBody = document.getElementById('chatBody');
  const chatInput = document.getElementById('chatInput');
  const sendMessageBtn = document.getElementById('sendMessage');

  function openChat() {
    chatPopup.classList.add('open'); // Add animation class
    openChatBtn.classList.remove('open');
  }

  function closeChat() {
    chatPopup.classList.remove('open'); // Remove animation class
    setTimeout(() => {
      openChatBtn.classList.add('open');
    }, 300); // Await animation ending (same duration as in CSS)
  }

  openChatBtn.addEventListener('click', openChat);
  closeChatBtn.addEventListener('click', closeChat);

  // Function to add message to chat
  function addMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', type);
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto scroll to bottom
  }

  // Send message on button click
  sendMessageBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      addMessage(message, 'sent'); // Add sent message
      chatInput.value = ''; // Clear input
      // Simulate a received message (for demo purposes)
      setTimeout(() => {
        addMessage("Resposta do suporte.", 'received');
      }, 1000);
    }
  });

  // Send message on Enter key press
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessageBtn.click();
    }
  });
});
