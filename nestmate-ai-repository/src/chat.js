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
const perLabels = { 
    day: '/ day', 
    week: '/ week', 
    month: '/ month' 
};

function setDuration(duration, btn) {
    // 1. Update Button Styles
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 2. Update ALL Prices simultaneously
    document.querySelectorAll('.prop-price').forEach(el => {
        const newPrice = el.dataset[duration]; // Pulls data-day, data-week, or data-month
        const strongTag = el.querySelector('strong');
        const perTag = el.querySelector('.per');
        
        if (strongTag) strongTag.textContent = newPrice;
        if (perTag) perTag.textContent = perLabels[duration];
    });
}

function scrollCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    // FIXED: 320px (card width) + 24px (gap from CSS) = 344px
    const scrollAmount = 344; 
    
    track.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

/* ── PHASE 3: DYNAMIC ENGINE ── */

function calculatePrices(weeklyRent) {
    return {
        day: Math.round(weeklyRent / 7),
        week: weeklyRent,
        month: Math.round(weeklyRent * 4.33)
    };
}

async function uploadProperty() {
    const name = document.getElementById('propName').value;
    const weeklyPrice = document.getElementById('propPriceWeek').value;
    const imageFile = document.getElementById('propImage').files[0];
    const status = document.getElementById('uploadStatus');

    if(!name || !weeklyPrice || !imageFile) {
        alert("Please fill all fields and select an image.");
        return;
    }

    status.textContent = "Uploading to NestMate Cloud...";

    try {
        // 1. Upload Image to Firebase Storage
        const storageRef = window.dbTools.ref(window.storage, 'properties/' + Date.now() + "_" + imageFile.name);
        await window.dbTools.uploadBytes(storageRef, imageFile);
        const imageUrl = await window.dbTools.getDownloadURL(storageRef);

        // 2. Save Data to Firestore Database
        await window.dbTools.addDoc(window.dbTools.collection(window.db, "properties"), {
            name: name,
            priceWeek: parseInt(weeklyPrice),
            imageUrl: imageUrl,
            createdAt: new Date()
        });

        status.textContent = "Success! Your property is live.";
        
        // Clear the form for the next upload
        document.getElementById('propName').value = '';
        document.getElementById('propPriceWeek').value = '';
        document.getElementById('propImage').value = '';
        
    } catch (error) {
        console.error("Upload failed:", error);
        status.textContent = "Error: Check your Firebase Storage permissions.";
    }
}

function loadProperties() {
    const track = document.getElementById('carouselTrack');
    // We query the "properties" collection and order by newest first
    const q = window.dbTools.query(
        window.dbTools.collection(window.db, "properties"), 
        window.dbTools.orderBy("createdAt", "desc")
    );

    // This "onSnapshot" listener makes the site update in real-time
    window.dbTools.onSnapshot(q, (snapshot) => {
        track.innerHTML = ''; // Clear out the hard-coded placeholder cards
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            const prices = calculatePrices(data.priceWeek);
            
            const card = document.createElement('div');
            card.className = 'prop-card';
            card.innerHTML = `
                <div class="prop-image-wrap">
                    <img src="${data.imageUrl}" alt="${data.name}">
                </div>
                <div class="prop-info">
                    <div class="prop-name">${data.name}</div>
                    <div class="prop-price" 
                         data-day="£${prices.day}" 
                         data-week="£${prices.week}" 
                         data-month="£${prices.month}">
                        <strong>£${prices.day}</strong> <span class="per">/ day</span>
                    </div>
                </div>
            `;
            track.appendChild(card);
        });
    });
}
