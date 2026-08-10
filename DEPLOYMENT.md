# 🚀 PVA-1500 Pro - GitHub & Vercel Live Deployment Guide

This document provides step-by-step instructions to publish **PVA-1500 Pro** to GitHub and make it live on Vercel with automatic CI/CD deployment.

Project Directory: `C:\Users\User\.gemini\antigravity\scratch\pva1500-pro-app`

---

## 📌 Part 1: Push Project to GitHub

1. Open your browser and go to [GitHub New Repository](https://github.com/new).
2. Set Repository Name to: `pva1500-pro-app`
3. Select **Public** (or Private) and click **Create Repository**.
4. Run the following terminal commands in your project folder (`C:\Users\User\.gemini\antigravity\scratch\pva1500-pro-app`):

```bash
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/pva1500-pro-app.git
git push -u origin main
```

---

## ⚡ Part 2: Connect GitHub Repository to Vercel (Live Web & Android PWA)

1. Open [Vercel New Project](https://vercel.com/new).
2. Click **Import** next to your `pva1500-pro-app` GitHub repository.
3. Configure settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

🎉 Your PVA-1500 Pro application will be live at a custom URL (e.g. `https://pva1500-pro-app.vercel.app`)!

---

## 📱 Android PWA (Installable App)

Once deployed on Vercel:
1. Open the Vercel live URL on your Android device in Google Chrome.
2. Tap the **Three Dots Menu (⋮)** at top right.
3. Select **"Add to Home screen"** or **"Install App"**.
4. The PVA-1500 Pro app will install on your Android home screen as a full-screen native PWA!
