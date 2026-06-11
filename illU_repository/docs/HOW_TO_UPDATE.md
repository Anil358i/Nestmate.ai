# How to Update illU AI
### (No coding knowledge needed — step by step)

---

## PART 1 — Setting Up Git (one time only)

**Step 1 — Install Git**
1. Download Git from git-scm.com
2. Install it (click through all defaults)
3. Restart your computer

**Step 2 — Create a folder for your project**
1. Create a folder called `illU-ai` on your computer
2. Put ALL your files in this folder (keep the folder structure):
   ```
   illU-ai/
   ├── src/
   │   ├── style.css
   │   ├── responses.js
   │   └── chat.js
   ├── index.html
   ├── README.md
   ├── HOW_TO_UPDATE.md
   └── .gitignore
   ```

**Step 3 — Initialize Git in your folder**
1. Open your folder in terminal/command prompt
2. Type these commands one by one:
   ```
   git init
   git add .
   git commit -m "first commit"
   ```

---

## PART 2 — Deploy Your Site

**Where you deploy depends on where you host:**

### If hosting on **GitHub Pages:**
1. Create account at github.com
2. Create new repository named `illU-ai`
3. Push your files to GitHub
4. Enable Pages in repo Settings → Pages
5. Your site goes live at: `yourusername.github.io/illU-ai`

### If hosting on **your own server:**
1. Upload all files via FTP/SFTP to your host
2. Your site is instantly live

### If hosting on **Netlify** (free alternative):
1. Go to netlify.com
2. Click "New site from Git"
3. Connect your GitHub repo
4. Deploy automatically

---

## PART 3 — Updating Your Site (with Git)

### After making changes locally:

1. Open terminal in your project folder
2. Type these commands:
   ```
   git add .
   git commit -m "describe what you changed"
   git push
   ```

3. Wait 1 minute for your host to update
4. Refresh your website - changes are LIVE!

---

## PART 4 — Common Changes

### Add new chat answer
→ Edit `src/responses.js`
- Find the `RESPONSES` section
- Add your new response in the format shown
- Add the trigger keywords in `getResponse()`
- Commit and push with Git

### Change colours
→ Edit `src/style.css`
- Find `:root { }` at the very top
- Change colour values (e.g., `--accent: #7c5cfc;`)
- All colours on the site update automatically
- Commit and push

### Change heading text
→ Edit `index.html`
- Find `<h1>` tags
- Edit the text inside
- Commit and push

### Change savings numbers
→ Edit `index.html`
- Find `.savings-pill` sections
- Change the numbers in `<span class="num">`
- Commit and push

### Add a new feature card
→ Edit `index.html`
- Copy an entire `.feature-card` block
- Paste it below the others
- Edit the icon, title, and description
- Commit and push

---

## PART 5 — Custom Domain

1. Buy domain from namecheap.com or godaddy.com
2. Update DNS settings to point to your host
3. Your site will be live at `yourdomain.com`

*(Steps differ depending on your hosting provider)*

---

## PART 6 — Troubleshooting

**Site doesn't update after changes?**
- Make sure you did `git push`
- Wait 2 minutes for your host to update
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

**Git command gives an error?**
- Check that Git is installed correctly
- Make sure you're in the right folder
- Check your internet connection

**Changes look weird?**
- Clear your browser cache
- Check that you committed the changes with Git

---

## PART 7 — Important Files Guide

| File | What it does | When to edit |
|------|-------------|-------------|
| `index.html` | Page layout & content | Change text, headings, features |
| `src/style.css` | Colors & design | Change look & feel |
| `src/responses.js` | Chat AI answers | Add new chat responses |
| `src/chat.js` | Chat system logic | Only if you know JavaScript |
| `README.md` | Project documentation | Update project info |
| `.gitignore` | Files Git ignores | Leave as is |

---

## PART 8 — Basic Git Commands

```
git status          → See what changed
git add .           → Prepare all changes
git commit -m "..." → Save changes with message
git push            → Upload to your host
git pull            → Download latest changes
```

---

## Need Help?

1. Check the console for errors (F12 → Console)
2. Review the code comments in each file
3. Test changes locally first
4. Keep backups of working versions

Good luck! 🚀
