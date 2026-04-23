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
        const reply = (typeof getResponse === 'function') ? getResponse(text) : "I'm looking into that for you!";
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
    // Fade-in on scroll effect
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

    // Mouse Drag Scrolling for Carousel
    const slider = document.querySelector('.carousel-outer'); 
    let isDown = false, startX, scrollLeft;
    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }
});

/* ── PROPERTY ENGINE (CLOUDINARY + FIREBASE) ── */

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

function calculatePrices(weeklyRent) {
    return {
        day: Math.round(weeklyRent / 7),
        week: weeklyRent,
        month: Math.round(weeklyRent * 4.33)
    };
}

async function uploadProperty() {
    if (!window.dbTools || !window.db) {
        alert("Initializing... please wait.");
        return;
    }

    const name = document.getElementById('propName').value;
    const weeklyPrice = document.getElementById('propPriceWeek').value;
    const status = document.getElementById('uploadStatus');

    if(!name || !weeklyPrice) {
        alert("Please enter Name and Price.");
        return;
    }

    cloudinary.openUploadWidget({
        cloudName: "dhmsg8euy", 
        uploadPreset: "nestmate_unsigned", 
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: true,
        styles: { palette: { window: "#FFFFFF", sourceBg: "#F4F4F5" } }
    }, async (error, result) => {
        if (!error && result && result.event === "success") {
            const imageUrl = result.info.secure_url;
            status.textContent = "Photo secured! Saving...";

            try {
                const { collection, addDoc } = window.dbTools;
                await addDoc(collection(window.db, "properties"), {
                    name: name,
                    priceWeek: parseInt(weeklyPrice),
                    imageUrl: imageUrl,
                    createdAt: new Date()
                });

                status.textContent = "Success! Listing is live.";
                document.getElementById('propName').value = '';
                document.getElementById('propPriceWeek').value = '';
                window.scrollTo({ top: document.getElementById('explore').offsetTop - 100, behavior: 'smooth' });
            } catch (firebaseError) {
                console.error("Firebase Error:", firebaseError);
                status.textContent = "Database error.";
            }
        }
    });
}

window.uploadProperty = uploadProperty;

function loadProperties() {
    const track = document.getElementById('carouselTrack');
    if (!track || !window.dbTools || !window.db) return;

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
                <div class="prop-image-wrap">
                    <img src="${data.imageUrl}" alt="Property" loading="lazy">
                </div>
                <div class="prop-info">
                    <div class="prop-name">${data.name}</div>
                    <div class="prop-price" 
                         data-day="£${prices.day.toLocaleString()}" 
                         data-week="£${prices.week.toLocaleString()}" 
                         data-month="£${prices.month.toLocaleString()}">
                        <strong>£${prices.day.toLocaleString()}</strong> <span class="per">/ day</span>
                    </div>
                </div>
            `;
            track.appendChild(card);
        });
    });
}

window.loadProperties = loadProperties;

/* ── USER MENU LOGIC ── */

function toggleUserMenu() {
    const menu = document.getElementById('userDropdown');
    if (!menu) return;
    const isVisible = menu.style.display === 'block';
    menu.style.display = isVisible ? 'none' : 'block';
}

window.addEventListener('click', (e) => {
    const menu = document.getElementById('userDropdown');
    const trigger = document.querySelector('.profile-trigger');
    if (menu && trigger && !trigger.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = 'none';
    }
});

async function handleLogout() {
    if (window.handleLogout) {
        await window.handleLogout();
    }
}

// Global exposure for HTML
window.toggleUserMenu = toggleUserMenu;
window.handleLogout = handleLogout;
