function appendMsg(type, html) {
  const box = document.getElementById('chatBox');
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
  const text = input.value.trim();
  if (!text) return;
  appendMsg('user', text);
  input.value = '';
  showTyping();
  setTimeout(() => {
    removeTyping();
    appendMsg('ai', getResponse(text));
  }, 900);
}

function quickPrompt(text) {
  appendMsg('user', text);
  showTyping();
  setTimeout(() => {
    removeTyping();
    appendMsg('ai', getResponse(text));
  }, 900);
}

function openPopup(title, body) {
  const backdrop = document.getElementById('popupBackdrop');
  document.getElementById('popupTitle').textContent = title;
  document.getElementById('popupBody').textContent = body;
  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  const backdrop = document.getElementById('popupBackdrop');
  backdrop.hidden = true;
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.option-trigger');
  const close = document.getElementById('popupClose');
  const backdrop = document.getElementById('popupBackdrop');

  triggers.forEach((item) => {
    item.addEventListener('click', () => {
      openPopup(item.dataset.popupTitle, item.dataset.popupBody);
    });
  });

  close.addEventListener('click', closePopup);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePopup();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.hidden) closePopup();
  });
});
