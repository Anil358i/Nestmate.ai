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
  // Fade-in animation trigger
const fadeElements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add("visible");
    }
  });
});
window.addEventListener('scroll', () => {
  const track = document.querySelector('.scroll-track');
  const section = document.querySelector('.scroll-section');
  
  if (track && section) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollY = window.scrollY;
    
    // Calculate how far we have scrolled through the 300vh section
    let percentage = (scrollY - sectionTop) / (sectionHeight - window.innerHeight);
    percentage = Math.max(0, Math.min(1, percentage)); // Keep between 0 and 1
    
    // Move the track left by up to 70% of its width
    track.style.transform = `translateX(-${percentage * 70}%)`;
  }
});
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.hidden) closePopup();
  });
});
