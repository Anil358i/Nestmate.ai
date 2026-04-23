CHAT.JS 

/* ── UI & CHAT LOGIC ── */

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

// Fixed: Added safety check for getResponse
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
        // Uses the function from responses.js
        const reply = (typeof getResponse === 'function') ? getResponse(text) : "I'm processing that...";
        appendMsg('ai', reply);
    }, 900);
}

/* ── POPUP & INTERACTION ── */

function openPopup(title, body) {
    const backdrop = document.getElementById('popupBackdrop');
    if (!backdrop) return;
    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupBody').textContent = body;
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const backdrop = document.getElementById('popupBackdrop');
    if (backdrop) {
        backdrop.hidden = true;
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Popup Listeners
    const triggers = document.querySelectorAll('.option-trigger');
    const close = document.getElementById('popupClose');
    if (close) close.addEventListener('click', closePopup);

    triggers.forEach((item) => {
        item.addEventListener('click', () => {
            openPopup(item.dataset.popupTitle || "NestMate Info", item.dataset.popupBody || "More details coming soon.");
        });
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
    checkFade();

    // Carousel Slider Safety
    const slider = document.querySelector('.carousel-outer'); // Updated class to match your HTML
    let isDown = false, startX, scrollLeft;
    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => isDown = false);
        slider.addEventListener('mouseup', () => isDown = false);
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }
});

/* ── PROPERTY ENGINE (FIREBASE) ── */

const perLabels = { day: '/ day', week: '/ week', month: '/ month' };

function setDuration(duration, btn) {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.prop-price').forEach(el => {
        const newPrice = el.dataset[duration]; 
        const strongTag = el.querySelector('strong');
        const perTag = el.querySelector('.per');
        if (strongTag) strongTag.textContent = newPrice;
        if (perTag) perTag.textContent = perLabels[duration];
    });
}

function scrollCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    if (track) {
        track.scrollBy({ left: direction * 344, behavior: 'smooth' });
    }
}

function calculatePrices(weeklyRent) {
    return {
        day: Math.round(weeklyRent / 7),
        week: weeklyRent,
        month: Math.round(weeklyRent * 4.33)
    };
}

// Fixed: Bridged with window.dbTools from your HTML
async function uploadProperty() {
    if (!window.dbTools) {
        alert("Firebase is still loading. Please wait.");
        return;
    }

    const name = document.getElementById('propName').value;
    const weeklyPrice = document.getElementById('propPriceWeek').value;
    const imageFile = document.getElementById('propImage').files[0];
    const status = document.getElementById('uploadStatus');

    if(!name || !weeklyPrice || !imageFile) {
        alert("Please fill all fields.");
        return;
    }

    status.textContent = "Uploading...";

    try {
        const { ref, uploadBytes, getDownloadURL, collection, addDoc } = window.dbTools;
        
        const storageRef = ref(window.storage, `properties/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(storageRef);

        await addDoc(collection(window.db, "properties"), {
            name: name,
            priceWeek: parseInt(weeklyPrice),
            imageUrl: imageUrl,
            createdAt: new Date()
        });

        status.textContent = "Success! Listing is live.";
        document.getElementById('propName').value = '';
        document.getElementById('propPriceWeek').value = '';
        document.getElementById('propImage').value = '';
    } catch (error) {
        console.error(error);
        status.textContent = "Upload failed. Check permissions.";
    }
}

// Fixed: Global assignment for the HTML button
window.uploadProperty = uploadProperty;

function loadProperties() {
    const track = document.getElementById('carouselTrack');
    if (!track || !window.dbTools) return;

    const { query, collection, orderBy, onSnapshot } = window.dbTools;
    const q = query(collection(window.db, "properties"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
        track.innerHTML = ''; 
        snapshot.forEach((doc) => {
            const data = doc.data();
            const prices = calculatePrices(data.priceWeek);
            const card = document.createElement('div');
            card.className = 'prop-card';
            card.innerHTML = `
                <div class="prop-image-wrap"><img src="${data.imageUrl}"></div>
                <div class="prop-info">
                    <div class="prop-name">${data.name}</div>
                    <div class="prop-price" data-day="£${prices.day}" data-week="£${prices.week}" data-month="£${prices.month}">
                        <strong>£${prices.day}</strong> <span class="per">/ day</span>
                    </div>
                </div>
            `;
            track.appendChild(card);
        });
    });
}

// Fixed: Global assignment so HTML script can call it
window.loadProperties = loadProperties;
