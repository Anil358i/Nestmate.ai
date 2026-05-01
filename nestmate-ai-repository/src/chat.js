/* -- UI & CHAT LOGIC -- */

function appendMsg(type, html) {
    const box = document.getElementById('chatBox');
    if (!box) return;

    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerHTML = `
        <div class="msg-avatar ${type === 'ai' ? 'ai' : 'user-av'}">${type === 'ai' ? 'N' : 'U'}</div>
        <div class="msg-bubble">${html}</div>
    `;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

function showTyping() {
    const box = document.getElementById('chatBox');
    if (!box) return;

    const div = document.createElement('div');
    div.className = 'msg ai';
    div.id = 'typingIndicator';
    div.innerHTML = `
        <div class="msg-avatar ai">N</div>
        <div class="msg-bubble">Typing...</div>
    `;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

function removeTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
}

function sendMsg() {
    const input = document.getElementById('userInput');
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    appendMsg('user', text);
    input.value = '';
    showTyping();

    setTimeout(() => {
        removeTyping();
        const reply = typeof getResponse === 'function'
            ? getResponse(text)
            : "I'm looking into that for you!";
        appendMsg('ai', reply);
    }, 900);
}

/* -- POPUP & MODAL LOGIC -- */

function openPopup(title, body) {
    const backdrop = document.getElementById('popupBackdrop');
    const titleEl = document.getElementById('popupTitle');
    const bodyEl = document.getElementById('popupBody');

    if (!backdrop || !titleEl || !bodyEl) return;

    titleEl.textContent = title;
    bodyEl.textContent = body;

    backdrop.style.display = 'flex';
    if ('hidden' in backdrop) backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const backdrop = document.getElementById('popupBackdrop');
    if (!backdrop) return;

    backdrop.style.display = 'none';
    if ('hidden' in backdrop) backdrop.hidden = true;
    document.body.style.overflow = '';
}

/* -- PROPERTY ENGINE: CLOUDINARY + FIREBASE -- */

const perLabels = { day: '/ day', week: '/ week', month: '/ month' };
let selectedDuration = 'day';
let latestProperties = [];

function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = value || '';
    return div.innerHTML;
}

function calculatePrices(weeklyRent) {
    const rent = Number(weeklyRent) || 0;
    return {
        day: Math.round(rent / 7),
        week: rent,
        month: Math.round(rent * 4.33)
