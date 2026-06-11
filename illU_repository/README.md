# 🏠 illU AI

> Help international graduates in London live almost free by renting a 3-bed house and subletting spare rooms.

---

## ⚠️ **ACTIVE DEVELOPMENT** 🚧

**This project is under active development.** Frequent updates and major changes are coming regularly. Features, design, and functionality may change significantly. 

**Last Updated:** June 2026

---

## 🌐 Live Demo
Deploy to Vercel (free) — see deployment guide below.

---

## 📁 Project Structure

```
illU-ai/
├── index.html          ← Main page (edit headings/text here)
├── src/
│   ├── style.css       ← All colours and design (edit colours here)
│   ├── responses.js    ← AI chat responses (ADD NEW ANSWERS HERE)
│   └── chat.js         ← Chat logic (don't touch unless needed)
├── login.html          ← Login/authentication page
├── verified.html       ← Verified properties page
├── savings.html        ← Savings calculator page
├── register.html       ← User registration page
├── maps.html           ← Property map view
├── docs/
│   └── HOW_TO_UPDATE.md ← Simple guide for making changes
└── README.md           ← This file
```

---

## ✏️ How to Make Common Changes

### Change a colour
Open `src/style.css` and find `:root` at the top:
```css
:root {
  --accent: #7c5cfc;   ← change this to any colour
}
```

### Add a new chat response
Open `src/responses.js` and add inside `RESPONSES`:
```js
"my new topic": `Your reply text here`,
```
Then in `getResponse()` add:
```js
if (text.includes("keyword")) return RESPONSES["my new topic"];
```

### Change the page heading
Open `index.html` and find `<h1>` — edit the text inside.

### Change savings numbers
Open `index.html` and find `savings-pill` sections — edit the numbers.

---

## 🚀 Deployment (Free on Vercel)

See `docs/HOW_TO_UPDATE.md` for full step-by-step guide.

---

## 🗺️ Upcoming Features (In Development)

### Current Work:
- [ ] Fix Firebase connection and authentication
- [ ] Complete property listing system
- [ ] Enable image uploads via Cloudinary
- [ ] User dashboard improvements
- [ ] Property search and filtering

### Coming Soon:
- [ ] Connect real Claude/ChatGPT API for smarter answers
- [ ] Add multilingual support (Hindi, Urdu, Chinese)
- [ ] WhatsApp bot version
- [ ] Live Rightmove property search
- [ ] Tenant reference checking
- [ ] Rent payment system
- [ ] Mobile app version
- [ ] Advanced analytics dashboard

---

## 🔧 Known Issues & Currently Being Fixed

- Firebase projectId credentials need verification
- Cloudinary image upload not yet implemented
- Some pages (verified, savings, register, maps) under construction
- Authentication flow needs optimization

---

## 📝 Version History

**v0.2 (Current - June 2026)**
- Renamed project from illU AI to NestMate AI
- Added multiple page templates
- Firebase integration in progress
- Cloudinary setup started

**v0.1 (Initial)**
- Basic landing page
- Chat interface
- Feature cards

---

## 💡 How to Contribute Changes

1. Make changes to any file
2. Test locally in your browser
3. Update this README if adding major features
4. Commit with clear messages (e.g., "Added Firebase auth", "Fixed chat responses")
5. Deploy to Vercel

---

## 📄 Licence
Private project. Do not share without permission.

---

## 📧 Questions?
For issues, feature requests, or bugs — note them in the code comments or update this README.
