// script.js

function sendCommand() {
    const inputField = document.getElementById('userInput');
    const userText = inputField.value.trim();
    if (userText === '') return;
  
    addMessage(userText, 'user');
    processCommand(userText.toLowerCase());
  
    inputField.value = '';
  }
  
  function addMessage(text, sender) {
    const messagesDiv = document.getElementById('messages');
    const message = document.createElement('div');
    message.className = 'message ' + sender;
    message.innerText = text;
    messagesDiv.appendChild(message);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to bottom
  }
  
  function processCommand(command) {
    let response = '';
  
    if (command.includes('hello') || command.includes('hi')) {
      response = "Hello! 👋 How can I assist you?";
    } else if (command.includes('time')) {
      const now = new Date();
      response = `⏰ It's ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    } else if (command.includes('date')) {
      const today = new Date();
      response = `📅 Today is ${today.toDateString()}`;
    } else if (command.includes('your name')) {
      response = "🤖 I'm your friendly Virtual Assistant!";
    } else if (command.includes('joke')) {
      response = "😂 Why don't scientists trust atoms? Because they make up everything!";
    } else if (command.includes('weather')) {
      response = "🌦️ I can't check real-time weather yet, but it's always sunny here! ☀️";
    } else if (command.includes('open google')) {
      response = "Opening Google...";
      window.open('https://www.google.com', '_blank');
    } else {
      response = "❓ Sorry, I didn't understand that. Try saying 'Tell me a joke' or 'What's the time?'";
    }
  
    addMessage(response, 'assistant');
  }
  
  // Voice Recognition
  function startListening() {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Sorry, your browser doesn't support voice recognition.");
      return;
    }
  
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
  
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById('userInput').value = transcript;
      sendCommand();
    };
  
    recognition.onerror = function(event) {
      console.error(event.error);
      alert('Voice recognition error. Try again.');
    };
  }
  
  // Dark / Light Mode Toggle
  function toggleMode() {
    const body = document.body;
    const toggleButton = document.getElementById('modeToggle');
  
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
  
    if (body.classList.contains('dark-mode')) {
      toggleButton.innerText = 'Switch to Light Mode';
    } else {
      toggleButton.innerText = 'Switch to Dark Mode';
    }
  }
  