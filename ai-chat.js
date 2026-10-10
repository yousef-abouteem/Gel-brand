/**
 * GEL AI Assistant - واجهة الشات بوت
 * لا يوجد أي مفتاح هنا: المتصفح يرسل الرسالة إلى /api/chat، والخادم هو الذي يكلم Gemini
 */

const CHAT_API = "/api/chat";
const MAX_MESSAGE_LENGTH = 500;

// المحادثة الحالية، حتى يفهم المساعد الأسئلة المتتالية
const chatHistory = [];
let isTyping = false;

window.toggleAIChat = function () {
    const chatWindow = document.getElementById('ai-chat-window');
    if (chatWindow) {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            setTimeout(() => {
                const input = document.getElementById('ai-user-input');
                if (input) input.focus();
            }, 400);
        }
    }
};

// نحوّل الرموز الخاصة إلى نص عادي حتى لا يُنفَّذ أي HTML داخل الرسائل
function escapeHTML(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function appendMessage(text, sender) {
    const chatMessages = document.getElementById('ai-chat-messages');
    if (!chatMessages) return;

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', `${sender}-message`);
    const formattedText = escapeHTML(text)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    msgDiv.innerHTML = `<p>${formattedText}</p>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('ai-chat-messages');
    if (!chatMessages) return;
    const typingDiv = document.createElement('div');
    typingDiv.id = 'ai-typing-indicator';
    typingDiv.classList.add('message', 'ai-message', 'typing');
    typingDiv.innerHTML = '<p>...</p>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    isTyping = true;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) indicator.remove();
    isTyping = false;
}

function errorMessage() {
    const lang = document.documentElement.lang || 'en';
    return lang === 'ar'
        ? "عذراً، أواجه مشكلة في الاتصال. تواصل معنا على واتساب: +97431121124"
        : "Sorry, I'm having trouble connecting. WhatsApp us: +97431121124";
}

window.sendMessage = async function () {
    const userInputField = document.getElementById('ai-user-input');
    if (!userInputField) return;
    const userText = userInputField.value.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!userText || isTyping) return;

    appendMessage(userText, 'user');
    chatHistory.push({ role: 'user', text: userText });
    userInputField.value = '';
    showTypingIndicator();

    try {
        const response = await fetch(CHAT_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ history: chatHistory.slice(-10) })
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.reply) {
            throw new Error(data.error || `HTTP ${response.status}`);
        }

        removeTypingIndicator();
        appendMessage(data.reply, 'ai');
        chatHistory.push({ role: 'model', text: data.reply.slice(0, MAX_MESSAGE_LENGTH) });
    } catch (error) {
        console.error("GEL AI Connection Error:", error);
        removeTypingIndicator();
        // نحذف الرسالة الفاشلة من السجل حتى لا تتكرر رسالتان من الزائر متتاليتين
        chatHistory.pop();
        appendMessage(errorMessage(), 'ai');
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.isComposing) {
        const input = document.getElementById('ai-user-input');
        if (input && document.activeElement === input) {
            e.preventDefault();
            window.sendMessage();
        }
    }
});
