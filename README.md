# ResuMatch — AI Resume & JD Matcher (Vercel Version)

## 📁 Project Structure
```
resume-jd-matcher-vercel/
├── index.html          ← Frontend UI
├── vercel.json         ← Vercel config
├── api/
│   └── match.js        ← Serverless function (calls Claude API)
└── README.md
```

---

## 🚀 Deploy to Vercel (Free — Step by Step)

### Step 1 — Push to GitHub
1. Go to github.com → click **"New repository"**
2. Name it: `resume-jd-matcher`
3. Click **"uploading an existing file"**
4. Upload ALL files keeping the folder structure:
   - `index.html`
   - `vercel.json`
   - `api/match.js`
5. Click **Commit changes**

### Step 2 — Deploy on Vercel
1. Go to **vercel.com** → Sign up free with GitHub
2. Click **"Add New Project"**
3. Import your `resume-jd-matcher` repo
4. Leave all build settings as default
5. Click **Deploy** ✅

### Step 3 — Add Your API Key (IMPORTANT)
1. In Vercel dashboard → your project → **Settings**
2. Click **Environment Variables**
3. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your Anthropic API key (get free at console.anthropic.com)
4. Click **Save**
5. Go to **Deployments** → click **Redeploy** (so it picks up the key)

### Step 4 — Done! 🎉
Your live URL will be: `your-project-name.vercel.app`

---

## 🔑 Getting Your Free Anthropic API Key
1. Go to **console.anthropic.com**
2. Sign up for free
3. Go to **API Keys** → Create new key
4. Copy and paste it into Vercel Environment Variables

Free tier gives you enough credits to run hundreds of analyses.

---

## ✨ Features
- Match score (0–100) with animated dial
- Matching skills highlighted in green
- Missing keywords shown in red
- ATS keywords to add in blue
- Strengths identified in amber
- Actionable improvement plan with copy button
- Fully mobile responsive
