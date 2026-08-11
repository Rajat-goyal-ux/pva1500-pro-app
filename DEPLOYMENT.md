# 🚀 PVA-1500 Pro - GitHub & Vercel Live Deployment Guide

This document provides step-by-step instructions to publish **PVA-1500 Pro** to GitHub and deploy it live on Vercel with automatic CI/CD deployment and Google AdSense verification.

Project Directory: `C:\Users\User\.gemini\antigravity\scratch\pva1500-pro-app`

---

## 📌 Part 1: Push Project to GitHub

1. Open your browser and go to [GitHub New Repository](https://github.com/new).
2. Set Repository Name to: `pva1500-pro-app`
3. Select **Public** and click **Create Repository**.
4. Run the following terminal commands in your project folder (`C:\Users\User\.gemini\antigravity\scratch\pva1500-pro-app`):

```bash
git branch -M main
git remote add origin https://github.com/Rajat-goyal-ux/pva1500-pro-app.git
git push -u origin main
```

---

## ⚡ Part 2: Connect GitHub Repository to Vercel (Next.js 15 SSR)

1. Open [Vercel New Project](https://vercel.com/new).
2. Click **Import** next to your `pva1500-pro-app` GitHub repository.
3. Configure settings:
   - **Framework Preset**: Next.js (or Vite)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (or `dist`)
4. Click **Deploy**.

🎉 Your PVA-1500 Pro application will be live at a custom URL (e.g. `https://pva1500-pro-jlnm0vrdf-rajatgoyal8770-6375s-projects.vercel.app/`)!

---

## 💰 Part 3: Google AdSense Verification Checklist

To verify your site in Google AdSense:

1. **Meta Verification Tag** (Pre-rendered in `app/layout.jsx` and `index.html`):
   ```html
   <meta name="google-adsense-account" content="ca-pub-2090516545725907" />
   ```

2. **Official AdSense Async Script**:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2090516545725907" crossorigin="anonymous"></script>
   ```

3. **`ads.txt` File**:
   Located in `public/ads.txt`:
   ```text
   google.com, pub-2090516545725907, DIRECT, f08c47fec0942fa0
   ```

4. **Disable Vercel Deployment Protection**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) -> Select `pva1500-pro-app`.
   - Go to **Settings** -> **Deployment Protection**.
   - Under **Vercel Authentication**, select **Disabled (Off)** and click **Save**.

5. **AdSense Site Submission**:
   - In Google AdSense Dashboard, enter domain without `https://`:
     `pva1500-pro-jlnm0vrdf-rajatgoyal8770-6375s-projects.vercel.app` (or your connected TLD domain).
   - Click **Submit / Verify**.

---

## 📱 Part 4: Android PWA (Installable App)

Once deployed on Vercel:
1. Open the Vercel live URL on your Android device in Google Chrome.
2. Tap the **Three Dots Menu (⋮)** at top right.
3. Select **"Add to Home screen"** or **"Install App"**.
4. The PVA-1500 Pro app will install on your Android home screen as a full-screen native PWA!
