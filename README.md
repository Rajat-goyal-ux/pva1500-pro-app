# ☀️ PVA-1500 Pro | Solar I-V Curve Analysis Platform

> **Production-grade Solar PV String Inspection Tool & IEC 60891 Standard Calculation Engine.**  
> Built with Next.js 15 App Router, React 19, Vite 5, Chart.js, Firebase Google Auth, Google AdSense, Tailwind/Vanilla Glassmorphic Design, and Progressive Web App (PWA) installation for Windows & Android.

---

## 🚀 Key Features

1. **IEC 60891 STC Corrections**:
   - Automated Solmetric PVA-1500 CSV file parser.
   - Temperature & Irradiance STC corrections ($I_{sc,exp}$, $V_{oc,exp}$).
   - Configurable tolerance thresholds with visual PASS/FAIL badges.

2. **Interactive I-V & P-V Curve Graphing**:
   - Powered by Chart.js canvas.
   - Compares Measured Curve vs Expected STC Curve for individual modules.

3. **Secure Google Sign-In (Firebase Auth)**:
   - OAuth Google Sign-In with avatar sync and logout session management.

4. **Freemium & AdSense Monetization**:
   - Pre-rendered Google AdSense meta tag (`ca-pub-2090516545725907`) and script tags.
   - Integrated Google AdSense banner placements (`<AdBanner />`).
   - Free vs Pro Tier subscription model ($9.99/mo).

5. **Cross-Platform (Windows & Android App)**:
   - Full Progressive Web App (PWA) manifest with Service Worker offline support.
   - Android users can tap "Add to Home Screen" or "Install App" to use it natively like a mobile app.

---

## 🛠️ Local Development & Build

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Run Next.js local development server
npm run dev

# 3. Build Next.js production bundle
npm run build
```

---

## 🐙 Step-by-Step GitHub Setup Guide

```bash
# 1. Initialize Git repository
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "Initial commit: PVA-1500 Pro Solar Analytics Platform"

# 4. Rename main branch
git branch -M main

# 5. Add remote URL
git remote add origin https://github.com/Rajat-goyal-ux/pva1500-pro-app.git

# 6. Push to GitHub
git push -u origin main
```

---

## ⚡ Step-by-Step Vercel Deployment Guide

1. Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New"** -> **"Project"**.
3. Import your `pva1500-pro-app` repository from GitHub.
4. Keep framework preset as **Next.js** (or Vite).
5. Click **"Deploy"**. Your app will be live on `https://pva1500-pro-jlnm0vrdf-rajatgoyal8770-6375s-projects.vercel.app/`!

---

## 📱 How to Create Android App (APK / PWA)

### Method A: Instant PWA Install (No App Store needed)
1. Open your live Vercel URL on Android Chrome.
2. Tap the **3-Dots Menu** at top right.
3. Select **"Install App"** or **"Add to Home Screen"**.
4. The PVA-1500 app will appear on the Android home screen with its own full-screen app icon!

---

## 🔒 Security Hardening

- **Sanitized CSV Parsing**: Strips HTML tags and script payloads from CSV string values.
- **Security Headers**: Defined in `vercel.json` (`X-Frame-Options: SAMEORIGIN`, `Access-Control-Allow-Origin: *`, `X-Content-Type-Options: nosniff`).
- **Local In-Browser Calculation**: PV plant data is processed locally in the client browser without sending sensitive solar string data to third-party databases.
