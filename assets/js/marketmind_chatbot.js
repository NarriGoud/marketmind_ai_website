(function() {
    // Function to set a CSS custom property for the mobile viewport height
    function setMobileChatHeight() {
      const mobileHeight = window.innerHeight - 110;
      document.documentElement.style.setProperty('--chat-height-mobile', `${mobileHeight}px`);
    }
  
    window.addEventListener('resize', setMobileChatHeight);
    setMobileChatHeight();
  
    if (window.hasChatbotBeenEmbedded) {
      return;
    }
    window.hasChatbotBeenEmbedded = true;
  
    const chatbotHTML = `
      <div class="chatbot-container">
        <button class="chat-toggle-btn" aria-label="Toggle Chat">
          <svg class="chat-icon chat-icon-chat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clip-rule="evenodd" />
          </svg>
          <svg class="chat-icon chat-icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </button>
  
        <div class="chat">
          <div class="chat-title">
            <div class="chat-title-logo">
              <img src="favicon.png" alt="MarketMind AI Logo" />
            </div>
            <h1>MarketMind AI</h1>
            <h2>The Mind Behind Market</h2>
          </div>
          <div class="messages">
            <div class="messages-content"></div>
          </div>
          <div class="message-box">
            <textarea class="message-input" placeholder="Type message..."></textarea>
            <button type="submit" class="message-submit">
              <svg class="send-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.917H12.75a.75.75 0 0 1 0 1.5H4.984l-2.432 7.917a.75.75 0 0 0 .926.94 60.542 60.542 0 0 0 18.445-8.916.75.75 0 0 0 0-1.236A60.542 60.542 0 0 0 3.478 2.405Z" />
              </svg>
            </button>
          </div>
          <div class="chatbot-caution">
            MarketMind can make mistakes.
          </div>
        </div>
      </div>
    `;
  
    const chatbotCSS = `
      /*--------------------
      CSS Custom Properties (Variables)
      --------------------*/
      :root {
        /* Chatbot Dimensions */
        --chat-width: 450px;
        --chat-height: 90vh;
        --chat-max-height: 650px;
  
        /* Chatbot UI Colors */
        --chat-bg: #F8F9FA;
        --chat-title-bg: #007BFF;
        --chat-text-color: #333;
        --chat-subtitle-color: rgba(255, 255, 255, 0.8);
        --chat-timestamp-color: rgba(51, 51, 51, 0.6);
        --error-message-bg: #FFEBEE; /* Light red for error */
        --error-message-border: #EF5350; /* Darker red for error border */
        --error-message-text: #B71C1C; /* Even darker red for error text */
  
  
        /* Message Colors - ENHANCED */
        --message-bot-bg: #E1F5FE;
        --message-user-bg: #f2d3cc;
        --message-text-color: #333;
  
        /* Input Box Colors */
        --message-submit-bg: #007BFF;
        --message-input-color: #333;
        --message-submit-bg:rgb(43, 123, 204); /* Wet Asphalt */
        --message-submit-hover-bg: #0056B3;
  
        /* Toggle Button */
        --toggle-btn-size: 60px;
        --toggle-btn-bg-start: #007BFF;
        --toggle-btn-bg-end: #0056B3;
        --toggle-btn-color: white;
  
        /* Caution message color */
        --caution-text-color: #777;
      }
  
      /*--------------------
      Base & Global Styles
      --------------------*/
      .chatbot-container *,
      .chatbot-container *::before,
      .chatbot-container *::after {
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
        line-height: 1.4;
        font-size: 13px;
      }
  
      .chatbot-container {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 9999;
      }
  
      /*--------------------
      Floating Toggle Button
      --------------------*/
      .chat-toggle-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--toggle-btn-bg-start), var(--toggle-btn-bg-end));
        border: none;
        border-radius: 50%;
        width: var(--toggle-btn-size);
        height: var(--toggle-btn-size);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        z-index: 10001;
      }
  
      .chat-toggle-btn:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
      }
  
      /* Position and size the icons */
      .chat-toggle-btn .chat-icon {
        width: calc(var(--toggle-btn-size) * 0.46);
        height: calc(var(--toggle-btn-size) * 0.46);
        fill: var(--toggle-btn-color);
        position: absolute; /* Stack icons on top of each other */
        transition: opacity 0.3s ease-in-out;
      }
  
      .chat-icon-chat {
        opacity: 1; /* Initially visible */
      }
  
      .chat-icon-close {
        opacity: 0; /* Initially hidden */
      }
  
      /* Rule to show close icon and hide chat icon when chat is visible */
      .chatbot-container.chat-visible .chat-icon-chat {
        opacity: 0;
      }
  
      .chatbot-container.chat-visible .chat-icon-close {
        opacity: 1;
      }
  
      /*--------------------
      Chat UI Container
      --------------------*/
      .chat {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: var(--chat-width);
        height: var(--chat-height);
        max-height: var(--chat-max-height);
        z-index: 10000;
        overflow: hidden;
        box-shadow: 0 8px 30px rgba(0, 0, 0, .3);
        background: var(--chat-bg);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px) scale(0.95);
        transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, transform 0.3s ease-in-out;
      }
  
      .chat.chat-visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
      }
  
      /*--------------------
      Chat Title Bar
      --------------------*/
      .chat-title {
        flex-shrink: 0;
        height: 55px;
        position: relative;
        background: var(--chat-title-bg);
        color: white;
        text-transform: uppercase;
        padding: 10px 15px;
        border-radius: 20px 20px 0 0;
        text-align: center;
      }
  
      .chat-title-logo {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: white;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
  
      .chat-title-logo img {
          height: 100%;
          width: auto;
          display: block;
      }
  
      .chat-title h1 {
        font-weight: 600;
        font-size: 14px;
        margin: 0;
      }
  
      .chat-title h2 {
        color: var(--chat-subtitle-color);
        font-size: 10px;
        letter-spacing: 1px;
        margin: 0;
      }
  
      /*--------------------
      Messages Display Area
      --------------------*/
      .messages {
        flex-grow: 1;
        color: var(--chat-text-color);
        overflow-y: auto;
        overflow-x: hidden;
        padding: 10px 15px;
        scroll-behavior: smooth;
        background-color: #FFFFFF; /* Pure white background */
        background-image: url('data:image/svg+xml,%3Csvg width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23D1D1D1" fill-opacity="0.6" fill-rule="evenodd"%3E%3Cpath d="M5 0h1L0 6V5zM6 5v1H5z"/%3E%3C/g%3E%3C/svg%3E'); /* Subtle pattern */
      }
  
      .messages::-webkit-scrollbar {
          width: 8px;
      }
  
      .messages::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
      }
  
      .messages::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
      }
  
      /* Generic message styling */
      .messages .message {
        padding: 8px 12px;
        margin: 8px 0;
        font-size: 13px;
        line-height: 1.5;
        position: relative;
        word-wrap: break-word;
        max-width: 85%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        clear: both;
      }
  
      .messages .message.new {
        transform: scale(0.8);
        animation: bounce 500ms ease-out forwards;
      }
  
      /* Bot message bubble */
      .messages .message.bot {
        background: var(--message-bot-bg);
        border-radius: 15px 15px 15px 5px;
        float: left;
      }
  
      /* User message bubble */
      .messages .message.user {
        background: var(--message-user-bg);
        border-radius: 15px 15px 5px 15px;
        float: right;
      }
  
      .messages .message:last-child {
        margin-bottom: 25px;
      }
  
      .messages .message .timestamp {
        position: absolute;
        bottom: -18px;
        font-size: 9px; /* Slightly smaller timestamp font */
        color: rgba(51, 51, 51, 0.5); /* Lighter timestamp color */
        white-space: nowrap;
        text-align: right;
      }
  
      .messages .message.bot .timestamp {
        left: 0;
      }
  
      .messages .message.user .timestamp {
        right: 0;
      }
  
      /* Typing indicator styling */
      .messages .typing-indicator {
        background: var(--message-bot-bg);
        border-radius: 15px;
        width: 50px; /* Smaller width for typing indicator */
        padding: 10px;
        box-shadow: none;
        text-align: center;
        float: left;
        margin: 8px 0;
      }
      .messages .typing-indicator span {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(51, 51, 51, 0.5);
        margin: 0 1px; /* Reduced margin between dots */
        animation: ball .6s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
      }
      .messages .typing-indicator span:nth-child(1) { animation-delay: .0s; }
      .messages .typing-indicator span:nth-child(2) { animation-delay: .2s; }
      .messages .typing-indicator span:nth-child(3) { animation-delay: .4s; }
  
  
      /* Error Message Styling */
      .messages .message.error {
        background-color: var(--error-message-bg);
        border: 1px solid var(--error-message-border);
        color: var(--error-message-text);
        border-radius: 15px; /* Consistent rounded corners */
        float: left; /* Error messages appear as bot messages */
      }
  
  
      /*--------------------
      Message Input Box
      --------------------*/
      .message-box {
        flex-shrink: 0;
        min-height: 48px;
        background: var(--message-box-bg);
        padding: 4px 15px;
        position: relative;
        border-radius: 0;
        display: flex;
        align-items: center;
        box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
      }
  
      .message-box .message-input {
        flex-grow: 1;
        background: #fdfdfd;
        border: 1px solid #e0e0e0;
        border-radius: 25px;
        padding: 8px 18px;
        outline: none!important;
        resize: none;
        color: var(--message-input-color);
        font-size: 16px; /* Increased font size */
        line-height: 1.4;
        margin-right: 12px;
        /* Always enable scrolling but hide the visual scrollbar */
        overflow-y: scroll;
        /* Hide scrollbar visually for Firefox */
        scrollbar-width: none;
        transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, height 0.2s ease-in-out;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.08);
      }
  
      /* Hide scrollbar visually for Webkit browsers (Chrome, Safari, Edge) */
      .message-box .message-input::-webkit-scrollbar {
          width: 0px;
          background: transparent;
          display: none;
      }
      .message-box .message-input::-webkit-scrollbar-thumb {
          background: transparent;
      }
  
  
      .message-box .message-input:focus {
          border-color: var(--message-submit-bg);
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.08), 0 0 0 3px rgba(79, 70, 229, 0.2);
      }
  
      .message-box .message-input::placeholder {
          color: rgba(85, 85, 85, 0.6);
      }
  
      .message-box .message-submit {
        flex-shrink: 0; /* Allow button to shrink if needed, but width is fixed */
        color: white;
        border: none;
        background: linear-gradient(135deg, var(--message-submit-bg), var(--message-submit-hover-bg));
        /* Adjusted padding and dimensions for the icon */
        padding: 0; /* Remove padding to control size with width/height */
        width: 40px; /* Fixed width for a square/round button */
        min-width: 40px; /* Ensure it doesn't get smaller than this */
        height: 40px; /* Fixed height for a square/round button */
        border-radius: 50%; /* Make it round */
        outline: none!important;
        cursor: pointer;
        display: flex; /* Use flex to center the SVG icon */
        align-items: center;
        justify-content: center;
        transition: all .2s ease-in-out;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
      }
  
      .message-box .message-submit svg {
          width: 20px; /* Size of the SVG icon */
          height: 20px; /* Size of the SVG icon */
          fill: currentColor; /* Use button's text color for the icon */
      }
  
      .message-box .message-submit .sending-icon {
          animation: spin 1s linear infinite; /* Animation for the sending icon */
      }
  
      .message-box .message-submit:hover {
        background: linear-gradient(135deg, var(--message-submit-hover-bg), var(--message-submit-bg));
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.35);
      }
  
      .message-box .message-submit:active {
          transform: translateY(0);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
  
      .message-box .message-submit:disabled {
        background: #cccccc;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
      }
  
      /*--------------------
      Chatbot Caution Message
      --------------------*/
      .chatbot-caution {
        flex-shrink: 0;
        padding: 8px 15px;
        font-size: 10px;
        text-align: center;
        color: var(--caution-text-color);
        background: var(--message-box-bg);
        border-top: 1px solid rgba(0,0,0,0.05);
        border-radius: 0 0 20px 20px;
      }
  
  
      /*--------------------
      Animations
      --------------------*/
      @keyframes bounce {
        0%, 100% { transform: scale(1); opacity: 1; }
        20% { transform: scale(1.05); }
        40% { transform: scale(0.9); }
        60% { transform: scale(1.02); }
        80% { transform: scale(0.98); }
      }
  
      @keyframes ball {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
  
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
  
      /* --- Mobile Specific Overrides --- */
      @media (max-width: 600px) {
        .chat {
          width: calc(100% - 40px);
          max-width: 100%;
          right: 20px;
          left: 20px;
          /* Use the JS-calculated height for reliable mobile sizing */
          height: var(--chat-height-mobile);
          max-height: var(--chat-height-mobile);
        }
      }
    `;
  
    // --- 2. The main script logic ---
    function initializeChatbot() {
      // Inject CSS
      const styleTag = document.createElement('style');
      styleTag.innerHTML = chatbotCSS;
      document.head.appendChild(styleTag);
  
      // Inject HTML
      const container = document.createElement('div');
      container.innerHTML = chatbotHTML;
      document.body.appendChild(container.firstElementChild);
  
      const chatbotContainer = document.querySelector('.chatbot-container');
      const chatbotUserInterface = document.querySelector('.chat');
      const chatbotActivationButton = document.querySelector('.chat-toggle-btn');
      const chatbotMessageDisplay = document.querySelector('.messages');
      const chatInputArea = document.querySelector('.message-input');
      const chatSendButton = document.querySelector('.message-submit');
      const messagesContentArea = document.querySelector('.messages-content');
  
      // Store original send icon SVG for restoration
      const originalSendIconSVG = chatSendButton.innerHTML;
  
      // **CRUCIAL FIX:** This variable will persistently store the input value
      // to prevent it from vanishing on blur/re-focus.
      let currentInputText = '';
  
      // Declare dynamic heights for textarea
      let singleLineHeight;
      let twoLineHeight;
  
      // Function to calculate and set the exact heights
      function calculateInputHeights() {
          const tempTextarea = document.createElement('textarea');
          tempTextarea.style.position = 'absolute';
          tempTextarea.style.visibility = 'hidden';
          tempTextarea.style.height = 'auto';
          tempTextarea.style.overflowY = 'hidden';
          tempTextarea.style.resize = 'none';
  
          const computedStyle = window.getComputedStyle(chatInputArea);
          tempTextarea.style.padding = computedStyle.padding;
          tempTextarea.style.fontSize = computedStyle.fontSize;
          tempTextarea.style.lineHeight = computedStyle.lineHeight;
          tempTextarea.style.border = computedStyle.border;
          tempTextarea.style.boxSizing = computedStyle.boxSizing;
          tempTextarea.style.width = chatInputArea.offsetWidth + 'px';
  
          document.body.appendChild(tempTextarea);
          tempTextarea.value = 'a';
          singleLineHeight = tempTextarea.scrollHeight;
          tempTextarea.value = 'a\na';
          twoLineHeight = tempTextarea.scrollHeight;
  
          document.body.removeChild(tempTextarea);
  
          chatInputArea.style.height = singleLineHeight + 'px';
      }
  
      calculateInputHeights();
      window.addEventListener('resize', calculateInputHeights);
  
      function performSmoothScroll() {
        setTimeout(() => {
          chatbotMessageDisplay.scrollTop = chatbotMessageDisplay.scrollHeight;
        }, 50);
      }
  
      function updateMessageTimestamp() {
        const now = new Date();
        const lastMessageElement = messagesContentArea.querySelector('.message:last-child');
        if (lastMessageElement) {
          const existingTimestamp = lastMessageElement.querySelector('.timestamp');
          if (existingTimestamp) {
            existingTimestamp.remove();
          }
          const newTimestampElement = document.createElement('div');
          newTimestampElement.className = 'timestamp';
          newTimestampElement.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
          lastMessageElement.appendChild(newTimestampElement);
        }
      }
  
      function renderMarkdownToHtml(markdownText) {
        let htmlText = markdownText;
        htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        htmlText = htmlText.replace(/__(.*?)__/g, '<strong>$1</strong>');
        htmlText = htmlText.replace(/\*(.*?)\*/g, '<em>$1</em>');
        htmlText = htmlText.replace(/_(.*?)_/g, '<em>$1</em>');
        htmlText = htmlText.replace(/\n/g, '<br>');
        return htmlText;
      }
  
      // Function to handle textarea auto-resizing
      function autoResizeTextarea() {
          this.style.height = 'auto';
          const newHeight = Math.min(this.scrollHeight, twoLineHeight);
          this.style.height = `${newHeight}px`;
  
          if (this.scrollHeight > twoLineHeight) {
              this.style.overflowY = 'auto';
          } else {
              this.style.overflowY = 'hidden';
          }
          performSmoothScroll();
      }
  
      function addNewUserMessage() {
        const userMessageText = chatInputArea.value.trim();
        if (userMessageText === '') {
          chatInputArea.value = '';
          currentInputText = ''; // Clear the stored text as well
          autoResizeTextarea.call(chatInputArea);
          return;
        }
  
        chatSendButton.disabled = true;
        chatSendButton.innerHTML = `
          <svg class="sending-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903-1.903a.75.75 0 0 0-1.135-1.135L14.71 5.397a7.5 7.5 0 0 0-11.417 5.662A.75.75 0 0 0 3.478 11.25Z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M10.245 14.941a7.5 7.5 0 0 1-12.548 3.364l-1.903 1.903a.75.75 0 0 0 1.135 1.135l2.433-2.433a7.5 7.5 0 0 1 11.417-5.662a.75.75 0 0 0-.926-.94Z" clip-rule="evenodd" />
          </svg>
        `;
  
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user new'; // 'new' class for animation
        userMessageDiv.innerHTML = `${userMessageText}`;
        messagesContentArea.appendChild(userMessageDiv);
        updateMessageTimestamp();
        performSmoothScroll();
  
        // Clear input field after sending
        chatInputArea.value = '';
        currentInputText = '';
        autoResizeTextarea.call(chatInputArea);
  
        performSmoothScroll();
  
        setTimeout(() => {
          communicateWithAPI(userMessageText);
        }, 500);
      }
  
      async function communicateWithAPI(userQuery) {
        // Add typing indicator
        const typingIndicatorDiv = document.createElement('div');
        typingIndicatorDiv.className = 'message bot typing-indicator new'; // 'new' class for animation
        typingIndicatorDiv.innerHTML = `<span></span><span></span><span></span>`;
        messagesContentArea.appendChild(typingIndicatorDiv);
        performSmoothScroll();
  
        // **IMPORTANT: Change this line to your laptop's IP address**
        const chatbotApiEndpoint = 'http://192.168.43.192:8000/user/generate';
  
        const apiRequestBody = {
          user_id: 123456,
          chat_id: 789012,
          username: "web_chatbot_user",
          name: "Web Chatbot User",
          user_msg: userQuery,
          session_id: "web_session_" + Math.random().toString(36).substring(2, 15),
          telegram_user_message_id: null
        };
  
        try {
          const apiResponse = await fetch(chatbotApiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiRequestBody),
          });
  
          if (!apiResponse.ok) {
            throw new Error(`HTTP error! Status: ${apiResponse.status}`);
          }
  
          const responseData = await apiResponse.json();
  
          // Remove typing indicator before showing response
          typingIndicatorDiv.remove();
  
          const botResponseText = responseData.response || "I didn't receive a clear response from the bot.";
          const formattedBotReply = renderMarkdownToHtml(botResponseText);
  
          const botMessageDiv = document.createElement('div');
          botMessageDiv.className = 'message bot new'; // 'new' class for animation
          botMessageDiv.innerHTML = `${formattedBotReply}`;
          messagesContentArea.appendChild(botMessageDiv);
          updateMessageTimestamp();
          performSmoothScroll();
  
        } catch (error) {
          console.error('Chatbot API Error:', error);
          // Remove typing indicator on error as well
          typingIndicatorDiv.remove();
  
          const errorMessageDiv = document.createElement('div');
          errorMessageDiv.className = 'message bot error new'; // Add 'error' class for distinct style
          errorMessageDiv.innerHTML = `Sorry, I am currently unable to connect. Please try again later.`;
          messagesContentArea.appendChild(errorMessageDiv);
          updateMessageTimestamp();
          performSmoothScroll();
        } finally {
          // Re-enable send button and restore its original icon
          chatSendButton.disabled = false;
          chatSendButton.innerHTML = originalSendIconSVG; // Restore original icon
          chatInputArea.focus();
          autoResizeTextarea.call(chatInputArea);
        }
      }
  
      // Event listeners
      chatbotActivationButton.addEventListener('click', () => {
        chatbotContainer.classList.toggle('chat-visible');
        chatbotUserInterface.classList.toggle('chat-visible');
        if (chatbotUserInterface.classList.contains('chat-visible')) {
          performSmoothScroll();
        }
      });
  
      chatSendButton.addEventListener('click', addNewUserMessage);
  
      chatInputArea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          if (!chatSendButton.disabled) {
            addNewUserMessage();
          }
        }
        autoResizeTextarea.call(chatInputArea);
      });
  
      chatInputArea.addEventListener('input', (event) => {
        // Store the value as the user types
        currentInputText = event.target.value;
        autoResizeTextarea.call(event.target);
      });
      
      // This is the CRUCIAL FIX for the vanishing text issue
      chatInputArea.addEventListener('blur', () => {
        // On blur, immediately re-apply the stored value.
        // This ensures that when the browser re-renders the field
        // after the keyboard is hidden, it uses our correct value.
        chatInputArea.value = currentInputText;
      });
  
      chatInputArea.addEventListener('focus', () => {
        // On focus, immediately re-apply the stored value.
        // This fixes the issue of the text vanishing when you click back on the field.
        chatInputArea.value = currentInputText;
      });
  
      chatInputArea.addEventListener('paste', autoResizeTextarea);
  
  
      const initialWelcomeMessageDiv = document.createElement('div');
      initialWelcomeMessageDiv.className = 'message bot new';
      initialWelcomeMessageDiv.innerHTML = `Hello! How can I help you today?`;
      messagesContentArea.appendChild(initialWelcomeMessageDiv);
      updateMessageTimestamp();
      performSmoothScroll();
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeChatbot);
    } else {
      initializeChatbot();
    }
  })();