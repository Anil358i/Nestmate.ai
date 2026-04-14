# 🏠 NestMate AI

> Help international graduates in London live almost free by renting a 3-bed house and subletting spare rooms.

## 🌐 Live Demo
Deploy to Vercel (free) — see deployment guide below.

---

## 📁 Project Structure

```
nestmate-ai/
├── index.html          ← Main page (edit headings/text here)
├── src/
│   ├── style.css       ← All colours and design (edit colours here)
│   ├── responses.js    ← AI chat responses (ADD NEW ANSWERS HERE)
│   └── chat.js         ← Chat logic (don't touch unless needed)
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

## 🗺️ Future Ideas (Roadmap)

- [ ] Connect real Claude/ChatGPT API for smarter answers
- [ ] Add multilingual support (Hindi, Urdu, Chinese)
- [ ] WhatsApp bot version
- [ ] Live Rightmove property search
- [ ] Tenant reference checking
- [ ] Rent payment system

---

## 📄 Licence
Private project. Do not share without permission.
