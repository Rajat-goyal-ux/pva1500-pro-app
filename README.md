# ☀️ PVA-1500 Pro | Solar I-V Curve Analysis Platform

> **Production-grade Solar PV String Inspection Tool & IEC 60891 Standard Calculation Engine.**
> Built with React 18, Vite, Chart.js, Firebase Google Auth, Google AdSense, Tailwind/Vanilla Glassmorphic Design, and Progressive Web App (PWA) installation for Windows & Android.

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
   - Integrated Google AdSense banner placements (`<AdBanner />`).
   - Free vs Pro Tier subscription model ($9.99/mo).
   - Free Tier: AdSense supported + 5 CSV batch limit + Watermarked PDF export.
   - Pro Tier: Ad-free experience + Unlimited bulk CSV analysis + Unwatermarked PDF/Excel export.

5. **Cross-Platform (Windows & Android App)**:
   - Full Progressive Web App (PWA) manifest with Service Worker offline support.
   - Android users can tap "Add to Home Screen" or "Install App" to use it natively like a mobile app.

---

## 🛠️ Local Development & Build

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build
```

---

## 🐙 Step-by-Step GitHub Setup Guide

Follow these terminal commands to publish your app to GitHub:

```bash
# 1. Initialize Git repository
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "Initial commit: PVA-1500 Pro IV Analysis Web App"

# 4. Rename main branch
git branch -M main

# 5. Add your GitHub repository remote URL (Replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/pva1500-pro-app.git

# 6. Push to GitHub
git push -u origin main
```

---

## ⚡ Step-by-Step Vercel Deployment Guide

1. Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New"** -> **"Project"**.
3. Import your `pva1500-pro-app` repository from GitHub.
4. Keep framework preset as **Vite**.
5. Add Environment Variables (Optional for Firebase):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
6. Click **"Deploy"**. Your app will be live on `https://pva1500-pro-app.vercel.app` in under 30 seconds!

---

## 📱 How to Create Android App (APK / PWA)

### Method A: Instant PWA Install (No App Store needed)
1. Open your live Vercel URL on Android Chrome.
2. Tap the **3-Dots Menu** at top right.
3. Select **"Install App"** or **"Add to Home Screen"**.
4. The PVA-1500 app will appear on the Android home screen with its own full-screen app icon!

### Method B: Generate Native Android APK (Google Play Store)
1. Go to [PWABuilder.com](https://www.pwabuilder.com/).
2. Enter your live Vercel URL (e.g. `https://pva1500-pro-app.vercel.app`).
3. Click **"Package for Store"** -> **"Android"**.
4. Download the generated `.apk` or `.aab` file ready for the Google Play Store!

---

## 🔒 Security Hardening

- **Sanitized CSV Parsing**: Strips HTML tags and script payloads from CSV string values.
- **CSP Headers**: Defined in `vercel.json` (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`).
- **Local In-Browser Calculation**: PV plant data is processed locally in the client browser without sending sensitive solar string data to third-party databases.
