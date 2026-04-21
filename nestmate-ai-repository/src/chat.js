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
  // Popup triggers
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

  // Fade-in on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  const checkFade = () => {
    fadeElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', checkFade);
  checkFade(); // run on load too so above-fold elements show

  // Drag-to-scroll slider
  const slider = document.querySelector('.touch-slider-container');
  let isDown = false;
  let startX;
  let scrollLeft;

  if (slider) {
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => { isDown = false; });
    slider.addEventListener('mouseup', () => { isDown = false; });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  }
});
/* ── PROPERTY CAROUSEL LOGIC ── */
const perLabels = { day: '/ day', week: '/ week', month: '/ month' };

function setDuration(duration, btn) {
    // 1. Update Buttons
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 2. Update Prices
    document.querySelectorAll('.prop-price').forEach(el => {
        const newPrice = el.dataset[duration];
        el.querySelector('strong').textContent = newPrice;
        el.querySelector('.per').textContent = perLabels[duration];
    });
}

function scrollCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    const scrollAmount = 320; // Card width + gap
    track.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}
