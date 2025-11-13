<script>
  import { onMount } from 'svelte';
  
  let isChatOpen = false;
  let isTyping = false;
  let showNotification = true;
  let messages = [];
  let hasAutoOpened = false;
  
  const welcomeMessages = [
    {
      text: "Hii! 👋 Selamat datang di ubay.tech - platform pembelajaran programming dalam bahasa Indonesia. Materi lengkap dari basic hingga advanced!",
      avatar: "/src/landing/assets/images/ubay-avatar.svg"
    },
    {
      text: "Kamu butuh bimbingan belajar programming dari basic? Yukk join di ubay.tech! Tersedia materi Laravel, Kotlin, Flutter, dan JavaScript 🚀",
      avatar: "/src/landing/assets/images/ubay-avatar.svg"
    }
  ];
  
  function toggleChat() {
    isChatOpen = !isChatOpen;
    showNotification = false;
    
    // Save to localStorage that user has interacted
    if (typeof window !== 'undefined') {
      localStorage.setItem('ubaytech_chat_interacted', 'true');
    }
    
    // Load messages with typing animation when opening
    if (isChatOpen && messages.length === 0) {
      loadMessages();
    }
  }
  
  async function loadMessages() {
    isTyping = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    messages = [welcomeMessages[0]];
    isTyping = false;
    
    await new Promise(resolve => setTimeout(resolve, 800));
    isTyping = true;
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    messages = [...messages, welcomeMessages[1]];
    isTyping = false;
  }
  
  function handleWhatsApp() {
    const phoneNumber = "6281234567890"; // Ganti dengan nomor WhatsApp ubay.tech
    const message = encodeURIComponent("Halo! Saya tertarik belajar programming di ubay.tech 🚀");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
  
  function handleMulaiBelajar() {
    isChatOpen = false;
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  }
  
  onMount(() => {
    // Check if user has interacted before
    const hasInteracted = typeof window !== 'undefined' 
      ? localStorage.getItem('ubaytech_chat_interacted') 
      : null;
    
    // Auto-open after 5 seconds if user hasn't interacted
    if (!hasInteracted) {
      setTimeout(() => {
        if (!hasAutoOpened && !isChatOpen) {
          hasAutoOpened = true;
          isChatOpen = true;
          loadMessages();
        }
      }, 5000);
    } else {
      showNotification = false;
    }
  });
</script>

<!-- Chat Widget -->
<div class="chat-widget">
  <!-- Floating Toggle Button -->
  <button 
    class="chat-toggle-btn" 
    class:active={isChatOpen}
    on:click={toggleChat}
    aria-label="Toggle chat"
  >
    {#if showNotification && !isChatOpen}
      <span class="notification-badge"></span>
    {/if}
    
    {#if isChatOpen}
      <i class="fa-solid fa-xmark"></i>
    {:else}
      <i class="fa-solid fa-message"></i>
    {/if}
  </button>
  
  <!-- Chat Window -->
  {#if isChatOpen}
    <div class="chat-window">
      <!-- Header -->
      <div class="chat-header">
        <div class="chat-header-profile">
          <img src="/src/landing/assets/images/ubay-avatar.svg" alt="ubay.tech" class="chat-avatar" />
          <div class="chat-header-info">
            <h4 class="chat-name">ubay.tech</h4>
            <span class="chat-status">
              <span class="status-dot"></span>
              Online
            </span>
          </div>
        </div>
        <button class="chat-close-btn" on:click={toggleChat} aria-label="Close chat">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      
      <!-- Messages Container -->
      <div class="chat-messages">
        {#each messages as message}
          <div class="message-item">
            <img src={message.avatar} alt="ubay.tech" class="message-avatar" />
            <div class="message-bubble">
              <p>{message.text}</p>
            </div>
          </div>
        {/each}
        
        {#if isTyping}
          <div class="message-item">
            <img src="/src/landing/assets/images/ubay-avatar.svg" alt="ubay.tech" class="message-avatar" />
            <div class="message-bubble typing">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        {/if}
      </div>
      
      <!-- CTA Buttons -->
      <div class="chat-cta">
        <button class="chat-cta-btn primary" on:click={handleMulaiBelajar}>
          <i class="fa-solid fa-rocket"></i>
          Mulai Belajar Sekarang
        </button>
        <button class="chat-cta-btn secondary" on:click={handleWhatsApp}>
          <i class="fa-brands fa-whatsapp"></i>
          Chat via WhatsApp
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .chat-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
  }
  
  /* Floating Toggle Button */
  .chat-toggle-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #4361EE;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(67, 97, 238, 0.4);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    animation: pulse 2s infinite;
  }
  
  .chat-toggle-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(67, 97, 238, 0.5);
  }
  
  .chat-toggle-btn.active {
    animation: none;
    background: #3651D4;
  }
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 4px 12px rgba(67, 97, 238, 0.4);
    }
    50% {
      box-shadow: 0 4px 20px rgba(67, 97, 238, 0.6), 0 0 0 10px rgba(67, 97, 238, 0.1);
    }
  }
  
  /* Notification Badge */
  .notification-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 12px;
    height: 12px;
    background: #FF2D20;
    border-radius: 50%;
    border: 2px solid white;
    animation: pulse-badge 1.5s infinite;
  }
  
  @keyframes pulse-badge {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
  
  /* Chat Window */
  .chat-window {
    position: absolute;
    bottom: 80px;
    right: 0;
    width: 360px;
    max-height: 550px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slideUp 0.3s ease-out;
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Chat Header */
  .chat-header {
    background: linear-gradient(135deg, #4361EE 0%, #3651D4 100%);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
  }
  
  .chat-header-profile {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .chat-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid white;
    background: white;
  }
  
  .chat-header-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .chat-name {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }
  
  .chat-status {
    font-size: 13px;
    opacity: 0.9;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    background: #48BB78;
    border-radius: 50%;
    animation: blink 2s infinite;
  }
  
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .chat-close-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  
  .chat-close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  /* Messages Container */
  .chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #F7FAFC;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 300px;
  }
  
  .message-item {
    display: flex;
    gap: 10px;
    animation: fadeIn 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    background: white;
    border: 2px solid #E2E8F0;
  }
  
  .message-bubble {
    background: white;
    padding: 12px 16px;
    border-radius: 12px;
    border-bottom-left-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    max-width: 260px;
  }
  
  .message-bubble p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: #2D3748;
  }
  
  /* Typing Indicator */
  .message-bubble.typing {
    padding: 16px;
  }
  
  .typing-indicator {
    display: flex;
    gap: 4px;
  }
  
  .typing-indicator span {
    width: 8px;
    height: 8px;
    background: #CBD5E0;
    border-radius: 50%;
    animation: typing 1.4s infinite;
  }
  
  .typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.7;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
  
  /* CTA Buttons */
  .chat-cta {
    padding: 16px;
    background: white;
    border-top: 1px solid #E2E8F0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .chat-cta-btn {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .chat-cta-btn.primary {
    background: #4361EE;
    color: white;
  }
  
  .chat-cta-btn.primary:hover {
    background: #3651D4;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
  }
  
  .chat-cta-btn.secondary {
    background: #25D366;
    color: white;
  }
  
  .chat-cta-btn.secondary:hover {
    background: #20BD5A;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .chat-widget {
      bottom: 16px;
      right: 16px;
    }
    
    .chat-toggle-btn {
      width: 56px;
      height: 56px;
      font-size: 22px;
    }
    
    .chat-window {
      width: calc(100vw - 32px);
      max-width: 380px;
      bottom: 75px;
      right: -8px;
    }
  }
  
  @media (max-width: 480px) {
    .chat-window {
      width: calc(100vw - 16px);
      right: -12px;
      max-height: 480px;
    }
    
    .chat-messages {
      max-height: 250px;
    }
  }
</style>
