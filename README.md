# 🛡️ Jaynesh Yadav - Cyber Security Portfolio Website

A sleek, responsive, and visually striking Cyber Security Portfolio Website designed for **Jaynesh Yadav** (Cyber Security Student | Ethical Hacker Aspirant at Pratap University, Jaipur). Built with a dark cyberpunk/hacker aesthetic, neon green and electric cyan accents, glowing cards, interactive terminal CLI, and matrix rain canvas.

---

## 🚀 Live Preview & Quick Start

You can run and preview this website instantly without installing any node modules or dependencies:

### Method 1: Direct File Open
Simply double-click [`index.html`](file:///C:/Users/Admin/.gemini/antigravity/scratch/jaynesh-cyber-portfolio/index.html) in your browser (Google Chrome, Microsoft Edge, Firefox, Brave).

### Method 2: Local HTTP Server (Python)
Open PowerShell or Terminal in this folder and run:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 📁 Project Structure

```
jaynesh-cyber-portfolio/
│
├── index.html       # Complete semantic, responsive HTML with Tailwind CSS & sections
├── style.css        # Custom cyber glow effects, animations, scanlines & styles
├── script.js        # Matrix canvas, terminal typing, CLI emulator, modals & audio synthesizer
└── README.md        # Deployment instructions & documentation
```

---

## 🌟 Included Sections & Features

1. **Header & Navigation Bar**:
   - Terminal prompt brand (`jaynesh@root:~$`).
   - Quick navigation links (`//About`, `//Skills`, `//Labs`, `//Certs`, `//Contact`).
   - Web Audio Cyber SFX toggle with interactive sound effects.
   - Interactive CLI Launcher (`CLI Mode` button).
   - Mobile responsive slide-out menu.

2. **Hero Section**:
   - Glitch title animation & dynamic terminal typewriter effect.
   - Real-time status indicator (`BCA 2nd Year @ Pratap University, Jaipur`).
   - **Download CV** (generates formatted printable resume text file on-the-fly).
   - **Contact Me** quick anchor.
   - Interactive system specification terminal preview.

3. **About Me**:
   - Academic profile at Pratap University, Jaipur.
   - Core focus: Ethical Hacking, Network Security, System Hardening, Traffic Forensics.
   - Animated milestone counters (150+ lab hours, 3+ key labs, 4 OS platforms).

4. **Technical Skills Arsenal**:
   - **Operating Systems**: Kali Linux, Windows Server, Ubuntu, Windows 10/11.
   - **Security & Networking**: Network Security, Vulnerability Assessment, Ethical Hacking, TCP/IP, Active Directory.
   - **Tools & Software**: Nmap, Wireshark, Burp Suite, Metasploit, VirtualBox.
   - **Programming / Scripting**: Python (Basic), HTML/CSS, Bash Scripting.

5. **Cyber Security Hands-on Projects**:
   - **Active Directory & GPO Lab Setup**: Windows Server domain, automated wallpaper deployment, and security policies across Win 7/10 clients.
   - **Network Reconnaissance & Vulnerability Scanning**: Port mapping, service versioning, Nmap scripts, and Wireshark traffic inspection.
   - **Keylogger & Phishing Simulation Lab**: Python keystroke listener in a sandboxed VM with defensive mitigation analysis.
   - Interactive **"Inspect Lab Architecture"** modal for each project with topology diagrams and implementation steps.

6. **Certifications & Badges**:
   - TryHackMe (Pre-Security & Jr Pentester)
   - HackTheBox (Starting Point)
   - Cisco Networking Academy (Introduction to Cybersecurity)
   - Google Cybersecurity Professional Certificate (In Progress)

7. **Encrypted Contact Form & Direct Channels**:
   - Direct Email: `jayneshy95@gmail.com` with 1-click **Copy to Clipboard** feature.
   - Social links for LinkedIn, GitHub, and TryHackMe.
   - Interactive contact form with simulated RSA-4096 / TLS 1.3 encrypted transmission terminal log.

8. **Interactive CLI Terminal Modal**:
   - Press `Ctrl + ~` or click the CLI button.
   - Supported commands: `help`, `whoami`, `about`, `skills`, `projects`, `certs`, `contact`, `nmap`, `cat resume`, `sudo`, `clear`, `exit`.

---

## 🌐 Free Hosting Deployment Guide

### Option 1: GitHub Pages (Recommended)
1. Initialize a Git repository in this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Cyber Security Portfolio"
   ```
2. Create a new repository on your GitHub account (e.g. `jaynesh-portfolio`).
3. Push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/jaynesh-portfolio.git
   git push -u origin main
   ```
4. On GitHub, go to **Settings > Pages > Branch**, select `main` and `/ (root)`, and click **Save**.
5. Your portfolio will be live at `https://YOUR_USERNAME.github.io/jaynesh-portfolio/`.

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel` or visit [vercel.com](https://vercel.com).
2. Run `vercel` in this folder or import your GitHub repository.
3. It deploys automatically in under 30 seconds!

---

## ✏️ Customization

- To change social media links, search for `linkedin.com` or `github.com` in `index.html` and replace with your profile URLs.
- To add real certificate image links or credential IDs, edit the Certifications section in `index.html`.
- To update your projects or add more labs, modify the `projectData` object in `script.js`.
