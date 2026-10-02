/**
 * JAYNESH YADAV - CYBER SECURITY PORTFOLIO ENGINE
 * Features:
 * - Canvas Matrix Rain animation
 * - Terminal Typing Effect
 * - Interactive Command Line Interface (CLI modal)
 * - Project Lab Architecture Details Modal
 * - Encrypted Transmission Contact Form Simulation
 * - Audio SFX (Web Audio API Synthesizer with Mute Toggle)
 * - Copy-to-Clipboard & CV Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  initMatrixCanvas();
  initTypingEffect();
  initAudioEngine();
  initMobileMenu();
  initTerminalCLI();
  initProjectModals();
  initContactForm();
  initCounters();
});

/* ========================================================
   1. MATRIX RAIN CANVAS BACKGROUND
   ======================================================== */
function initMatrixCanvas() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const characters = '0101010101ABCDEF0123456789$#%*+=-_~<>{}[]/\\|;:@!';
  const fontSize = 14;
  let columns = Math.floor(width / fontSize);
  let drops = Array(columns).fill(1);

  // Resize handler with debounce
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
  });

  function draw() {
    ctx.fillStyle = 'rgba(5, 7, 13, 0.08)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = `${fontSize}px "Fira Code", monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = characters.charAt(Math.floor(Math.random() * characters.length));
      
      // Cyber neon green with occasional electric cyan heads
      if (Math.random() > 0.95) {
        ctx.fillStyle = '#00e5ff'; // Electric cyan head
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = '#00ff66'; // Matrix green
        ctx.shadowColor = '#00ff66';
        ctx.shadowBlur = 2;
      }

      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(char, x, y);

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  let animationFrameId;
  function animate() {
    draw();
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

/* ========================================================
   2. TERMINAL TYPING EFFECT
   ======================================================== */
function initTypingEffect() {
  const typedTarget = document.getElementById('hero-typed-text');
  if (!typedTarget) return;

  const phrases = [
    'BCA 2nd Year @ Pratap University, Jaipur',
    'Ethical Hacker Aspirant & Red Teamer',
    'Network Reconnaissance & Vulnerability Analyst',
    'Active Directory & Windows Domain Hardener',
    'Penetration Testing Enthusiast (TryHackMe & HTB)'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1800; // Hold at full string
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing new phrase
    }

    setTimeout(typeLoop, typingSpeed);
  }

  setTimeout(typeLoop, 500);
}

/* ========================================================
   3. WEB AUDIO CYBER SOUND SYNTHESIZER
   ======================================================== */
let audioContext = null;
let sfxEnabled = false;

function initAudioEngine() {
  const sfxToggleBtn = document.getElementById('sfx-toggle');
  const sfxStatus = document.getElementById('sfx-status');

  function getAudioCtx() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    return audioContext;
  }

  window.playCyberTone = function (type = 'click') {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'beep') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.setValueAtTime(220, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      }
    } catch (e) {
      // Audio not permitted or supported
    }
  };

  if (sfxToggleBtn && sfxStatus) {
    sfxToggleBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      if (sfxEnabled) {
        getAudioCtx();
        sfxStatus.textContent = 'ON';
        sfxStatus.className = 'text-neonGreen glow-text-green font-bold';
        playCyberTone('success');
        showToast('🔊 Audio SFX Enabled: Cyber feedback active');
      } else {
        sfxStatus.textContent = 'OFF';
        sfxStatus.className = 'text-slate-400 font-bold';
        showToast('🔇 Audio SFX Muted');
      }
    });
  }

  // Attach hover sounds to interactive elements
  document.querySelectorAll('button, a, .interactive-badge').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (sfxEnabled) playCyberTone('click');
    });
  });
}

/* ========================================================
   4. MOBILE NAVIGATION DRAWER
   ======================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuDrawer = document.getElementById('mobile-menu');

  if (!menuBtn || !menuDrawer) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = menuDrawer.classList.contains('hidden');
    if (isHidden) {
      menuDrawer.classList.remove('hidden');
      menuBtn.innerHTML = '<i class="fas fa-times text-xl text-neonGreen"></i>';
    } else {
      menuDrawer.classList.add('hidden');
      menuBtn.innerHTML = '<i class="fas fa-bars text-xl text-cyan-400"></i>';
    }
    if (typeof playCyberTone === 'function') playCyberTone('click');
  });

  // Close menu on link click
  menuDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuDrawer.classList.add('hidden');
      menuBtn.innerHTML = '<i class="fas fa-bars text-xl text-cyan-400"></i>';
    });
  });
}

/* ========================================================
   5. INTERACTIVE CYBER TERMINAL (CLI MODAL)
   ======================================================== */
function initTerminalCLI() {
  const terminalModal = document.getElementById('cli-modal');
  const openBtns = document.querySelectorAll('.open-terminal-btn');
  const closeBtn = document.getElementById('close-terminal-btn');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  if (!terminalModal || !terminalInput || !terminalOutput) return;

  function openTerminal() {
    terminalModal.classList.remove('hidden');
    terminalModal.classList.add('flex');
    terminalInput.focus();
    if (typeof playCyberTone === 'function') playCyberTone('beep');
  }

  function closeTerminal() {
    terminalModal.classList.add('hidden');
    terminalModal.classList.remove('flex');
    if (typeof playCyberTone === 'function') playCyberTone('click');
  }

  openBtns.forEach((btn) => btn.addEventListener('click', openTerminal));
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  // Close on Esc key or `Ctrl + ~`
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !terminalModal.classList.contains('hidden')) {
      closeTerminal();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === '`') {
      e.preventDefault();
      if (terminalModal.classList.contains('hidden')) {
        openTerminal();
      } else {
        closeTerminal();
      }
    }
  });

  // Terminal commands database
  const commands = {
    help: () => `
<div class="text-cyan-400 font-bold mb-2">Available Shell Commands:</div>
  <span class="text-neonGreen font-semibold">whoami</span>       - Display Jaynesh's identity & credentials
  <span class="text-neonGreen font-semibold">about</span>        - Background, education & cybersecurity focus
  <span class="text-neonGreen font-semibold">skills</span>       - List security tools, OS, & technical proficiencies
  <span class="text-neonGreen font-semibold">projects</span>     - Hands-on cybersecurity labs & setups
  <span class="text-neonGreen font-semibold">certs</span>        - Certifications & digital badges
  <span class="text-neonGreen font-semibold">contact</span>      - Email address & social links
  <span class="text-neonGreen font-semibold">cat resume</span>   - View Jaynesh's CV summary
  <span class="text-neonGreen font-semibold">nmap</span>         - Run simulated subnet scan
  <span class="text-neonGreen font-semibold">clear</span>        - Clear terminal screen
  <span class="text-neonGreen font-semibold">exit</span>         - Close terminal session
`,
    whoami: () => `
<div class="text-slate-300">
  <span class="text-neonGreen font-bold">Jaynesh Yadav</span>
  <br>Role: Cyber Security Student | Ethical Hacker Aspirant
  <br>Institution: Pratap University, Jaipur (BCA in IT - 2nd Year)
  <br>Status: Available for Cybersecurity Internships / Trainee Roles
  <br>Location: Jaipur, Rajasthan, India
  <br>PGP Fingerprint: <span class="text-cyan-400 font-mono">B49E 2A17 88F0 J95Y SECURE</span>
</div>`,
    about: () => `
<div class="text-slate-300">
  <span class="text-cyan-400 font-bold">=== ABOUT JAYNESH YADAV ===</span><br>
  I am a passionate 2nd-year BCA student at <span class="text-neonGreen font-semibold">Pratap University, Jaipur</span>.
  My journey involves exploring the depths of computer networks, system internals,
  and ethical penetration testing. I spend my time building virtual cyber labs,
  learning defense-in-depth methodologies, and participating on TryHackMe/HackTheBox.
</div>`,
    skills: () => `
<div class="text-slate-300">
  <span class="text-cyan-400 font-bold">=== TECHNICAL SKILL MATRIX ===</span><br>
  <span class="text-neonGreen">[OS]</span> Kali Linux, Windows Server, Ubuntu, Windows 10/11<br>
  <span class="text-neonGreen">[SECURITY]</span> Network Security, Vulnerability Assessment, Ethical Hacking, TCP/IP, Active Directory<br>
  <span class="text-neonGreen">[TOOLS]</span> Nmap, Wireshark, Burp Suite, Metasploit, VirtualBox<br>
  <span class="text-neonGreen">[CODE]</span> Python (Basic), HTML/CSS, Bash Scripting
</div>`,
    projects: () => `
<div class="text-slate-300">
  <span class="text-cyan-400 font-bold">=== CYBER SECURITY LABS ===</span><br>
  1. <span class="text-neonGreen font-bold">Active Directory & GPO Lab:</span> Domain controller, automated wallpaper rollout & security policies across Win 7/10.<br>
  2. <span class="text-neonGreen font-bold">Network Reconnaissance & Vulnerability Scanning:</span> Nmap port profiling, service version detection, Wireshark packet analysis.<br>
  3. <span class="text-neonGreen font-bold">Keylogger & Phishing Simulation:</span> Python keystroke harvesting lab for defensive analysis and endpoint mitigation.
</div>`,
    certs: () => `
<div class="text-slate-300">
  <span class="text-cyan-400 font-bold">=== CERTIFICATIONS & BADGES ===</span><br>
  - <span class="text-neonGreen">TryHackMe:</span> Pre-Security & Jr Penetration Tester Path<br>
  - <span class="text-neonGreen">HackTheBox:</span> Starting Point & Tier 1 Machines<br>
  - <span class="text-neonGreen">Cisco:</span> Introduction to Cybersecurity<br>
  - <span class="text-neonGreen">Google:</span> Cybersecurity Professional Certificate (In Progress)
</div>`,
    contact: () => `
<div class="text-slate-300">
  Email: <a href="mailto:jayneshy95@gmail.com" class="text-neonGreen underline">jayneshy95@gmail.com</a><br>
  LinkedIn: <a href="https://linkedin.com" target="_blank" class="text-cyan-400 underline">linkedin.com/in/jaynesh-yadav</a><br>
  GitHub: <a href="https://github.com" target="_blank" class="text-cyan-400 underline">github.com/jayneshyadav</a>
</div>`,
    nmap: () => `
<div class="text-slate-300 font-mono text-xs">
Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-01 22:30 IST<br>
Nmap scan report for target.lab (192.168.56.101)<br>
Host is up (0.00042s latency).<br>
PORT     STATE SERVICE       VERSION<br>
22/tcp   open  ssh           OpenSSH 8.9p1 Ubuntu<br>
80/tcp   open  http          Apache httpd 2.4.52<br>
445/tcp  open  netbios-ssn   Samba smbd 4.6.2<br>
3389/tcp open  ms-wbt-server Microsoft Terminal Services<br>
MAC Address: 08:00:27:E1:92:B4 (Oracle VirtualBox virtual NIC)<br>
<span class="text-neonGreen">Nmap done: 1 IP address (1 host up) scanned in 1.48 seconds</span>
</div>`,
    'cat resume': () => `
<div class="text-slate-300 border border-cyan-500/30 p-3 bg-black/60 rounded">
  <div class="text-neonGreen font-bold">=== JAYNESH YADAV - CURRICULUM VITAE ===</div>
  Degree: BCA in IT (2nd Year) | Pratap University, Jaipur<br>
  Focus: Offensive Security, Network Forensics, Domain Hardening<br>
  Email: jayneshy95@gmail.com<br>
  Core Tools: Nmap, Wireshark, Burp Suite, Metasploit, Kali Linux<br>
  [+] Click "Download CV" on the hero banner for complete printable copy!
</div>`,
    sudo: () => `<span class="text-red-400 font-bold">[!] ACCESS DENIED: User jaynesh is not in sudoers file. This incident will be reported to root.</span>`,
    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    },
    exit: () => {
      closeTerminal();
      return 'Session closed.';
    }
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawInput = terminalInput.value.trim();
      if (!rawInput) return;

      const cmd = rawInput.toLowerCase();
      terminalInput.value = '';

      // Print prompt line
      const promptLine = document.createElement('div');
      promptLine.className = 'text-slate-400 mb-1';
      promptLine.innerHTML = `<span class="text-neonGreen">jaynesh@root:~$</span> <span class="text-white">${escapeHTML(rawInput)}</span>`;
      terminalOutput.appendChild(promptLine);

      // Handle command execution
      const resultDiv = document.createElement('div');
      resultDiv.className = 'mb-3 pl-2 border-l border-cyan-500/30 text-sm';

      if (cmd.startsWith('sudo')) {
        resultDiv.innerHTML = commands.sudo();
        if (typeof playCyberTone === 'function') playCyberTone('alert');
      } else if (commands[cmd]) {
        const out = commands[cmd]();
        if (out) resultDiv.innerHTML = out;
        if (typeof playCyberTone === 'function') playCyberTone('click');
      } else {
        resultDiv.innerHTML = `<span class="text-amber-400">Command not recognized: "${escapeHTML(cmd)}". Type <span class="text-neonGreen font-bold">help</span> to list available commands.</span>`;
        if (typeof playCyberTone === 'function') playCyberTone('alert');
      }

      if (resultDiv.innerHTML) {
        terminalOutput.appendChild(resultDiv);
      }

      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* ========================================================
   6. PROJECT LAB ARCHITECTURE MODALS
   ======================================================== */
const projectData = {
  project1: {
    title: 'Active Directory & GPO Lab Setup',
    badge: 'Enterprise Security & Domain Administration',
    tools: ['Windows Server 2019/2022', 'Active Directory (AD DS)', 'Group Policy Management', 'Windows 10/7 Clients', 'VirtualBox Host-Only Network'],
    overview: 'Engineered an isolated enterprise virtual lab simulating a real corporate Active Directory infrastructure. Focused on configuring central identity management and enforcing domain-wide Group Policy Objects (GPOs).',
    architecture: `
      <div class="bg-black/60 p-4 rounded border border-cyan-500/20 text-xs font-mono text-slate-300">
        <div class="text-cyan-400 font-bold mb-2">LAB TOPOLOGY:</div>
        [ Host-Only Virtual Switch: 192.168.10.0/24 ]<br>
        ├── DC-01 (Windows Server - 192.168.10.10) : AD DS, DNS Server, DHCP<br>
        ├── CLIENT-01 (Windows 10 Pro - 192.168.10.21) : Domain Member<br>
        └── CLIENT-02 (Windows 7 - 192.168.10.22)      : Legacy OS Compatibility Testing
      </div>
    `,
    steps: [
      'Configured Active Directory Domain Services (AD DS) and promoted server to root domain controller (LAB.LOCAL).',
      'Created custom Organizational Units (OUs) for Departments (IT, HR, Sales) with delegated access privileges.',
      'Developed and enforced Group Policy Objects (GPOs) for automatic corporate wallpaper distribution, USB storage lockdown, and screen lock timeouts.',
      'Configured Account Lockout Policies (5 invalid attempts) to thwart brute-force password attacks.',
      'Verified real-time policy updates on client endpoints via <code>gpupdate /force</code> and <code>gpresult /r</code>.'
    ],
    takeaway: 'Gained hands-on proficiency in identity security, understanding privilege escalation vectors, and securing domain controllers against common misconfigurations.'
  },
  project2: {
    title: 'Network Reconnaissance & Vulnerability Scanning',
    badge: 'Network Defense & Penetration Testing',
    tools: ['Kali Linux', 'Nmap', 'Wireshark', 'Metasploitable 2/3', 'VirtualBox Internal Network'],
    overview: 'Conducted systematic reconnaissance and passive/active traffic inspection on target virtual machines in an isolated subnetwork to discover attack surfaces, outdated services, and protocol vulnerabilities.',
    architecture: `
      <div class="bg-black/60 p-4 rounded border border-emerald-500/20 text-xs font-mono text-slate-300">
        <div class="text-neonGreen font-bold mb-2">RECON FLOW:</div>
        [ Kali Linux 192.168.56.10 ] --(SYN / UDP Scans)--> [ Target VM 192.168.56.20 ]<br>
        │<br>
        └── [ Wireshark Promiscuous Sniffer ] Capturing ARP, TCP 3-Way Handshake, & DNS queries
      </div>
    `,
    steps: [
      'Executed host discovery on the <code>192.168.56.0/24</code> subnet using ARP ping scans (<code>nmap -sn</code>).',
      'Performed full TCP SYN stealth scanning (<code>nmap -sS -p- -T4</code>) and banner grabbing to map open ports.',
      'Ran Nmap Scripting Engine (NSE) vulnerability checks (<code>nmap --script vuln</code>) to identify CVEs on SMB and HTTP ports.',
      'Analyzed live packet streams in Wireshark, dissecting plain-text Telnet/FTP traffic, clear-text credentials, and DNS queries.',
      'Authored a comprehensive remediation assessment report outlining port filtering and TLS upgrade guidelines.'
    ],
    takeaway: 'Mastered the anatomy of network scanning, detecting suspicious port sweeps through packet inspection, and hardening exposed service daemons.'
  },
  project3: {
    title: 'Keylogger & Phishing Simulation Lab',
    badge: 'Offensive Scripting & Threat Mitigation',
    tools: ['Python 3', 'Pynput Library', 'Windows Sandbox / VirtualBox', 'Wireshark', 'Sysinternals Process Monitor'],
    overview: 'Engineered a proof-of-concept Python keylogger in a strictly isolated sandbox to dissect credential harvesting mechanisms, log storage security, and defensive detection heuristics used by modern EDRs.',
    architecture: `
      <div class="bg-black/60 p-4 rounded border border-purple-500/20 text-xs font-mono text-slate-300">
        <div class="text-purple-400 font-bold mb-2">SIMULATION CHAIN:</div>
        [ Sandbox OS Hook ] ──> [ Python Hook (pynput) ] ──> [ Encrypted Local Buffer ]<br>
        │<br>
        └── [ Defensive Audit ]: Sysinternals ProcMon monitoring Hook API calls & outbound network sockets
      </div>
    `,
    steps: [
      'Developed a lightweight Python script leveraging OS event listeners to record keystrokes in a sandboxed VM.',
      'Studied common evasion techniques such as process masquerading and timed execution routines.',
      'Analyzed how modern Endpoint Detection and Response (EDR) systems identify raw keyboard hooks and suspicious API calls (<code>SetWindowsHookEx</code>).',
      'Tested defense mitigation mechanisms: Antivirus heuristics, Virtual Keyboards, keystroke encryption utilities, and User Account Control (UAC) enforcement.',
      'Drafted defensive guidelines for enterprise users to recognize phishing lures and suspicious executables.'
    ],
    takeaway: 'Learned the offensive mechanics behind spyware and the paramount importance of defense-in-depth, least privilege execution, and user security awareness.'
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('project-modal-title');
  const modalBadge = document.getElementById('project-modal-badge');
  const modalTools = document.getElementById('project-modal-tools');
  const modalOverview = document.getElementById('project-modal-overview');
  const modalArch = document.getElementById('project-modal-arch');
  const modalSteps = document.getElementById('project-modal-steps');
  const modalTakeaway = document.getElementById('project-modal-takeaway');
  const closeBtn = document.getElementById('close-project-modal');

  if (!modal) return;

  document.querySelectorAll('.open-project-details').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-project');
      const data = projectData[pid];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalBadge.textContent = data.badge;
      modalOverview.textContent = data.overview;
      modalArch.innerHTML = data.architecture;
      modalTakeaway.textContent = data.takeaway;

      modalTools.innerHTML = data.tools
        .map(
          (t) =>
            `<span class="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs rounded font-mono">${t}</span>`
        )
        .join('');

      modalSteps.innerHTML = data.steps
        .map(
          (s, idx) =>
            `<li class="flex items-start gap-2.5 text-sm text-slate-300">
               <span class="text-neonGreen font-mono font-bold">[${idx + 1}]</span>
               <div>${s}</div>
             </li>`
        )
        .join('');

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if (typeof playCyberTone === 'function') playCyberTone('beep');
    });
  });

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    if (typeof playCyberTone === 'function') playCyberTone('click');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ========================================================
   7. CONTACT FORM SIMULATION & ENCRYPTED TRANSMISSION
   ======================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusLog = document.getElementById('form-status-log');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form || !statusLog || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Disable button & animate
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Encrypting & Dispatching...`;
    statusLog.classList.remove('hidden');
    statusLog.innerHTML = `<div class="text-cyan-400 font-mono text-xs mb-1">> Initiating secure handshake with host...</div>`;

    if (typeof playCyberTone === 'function') playCyberTone('beep');

    const logs = [
      { text: `> [1/4] TLS 1.3 socket established with jayneshy95@gmail.com`, delay: 600 },
      { text: `> [2/4] Validating input entropy: No XSS/SQLi payload detected.`, delay: 1300 },
      { text: `> [3/4] Encrypting message envelope with 4096-bit RSA public key...`, delay: 2000 },
      { text: `<span class="text-neonGreen font-bold">> [4/4] 200 OK: Transmission complete! Message queued for Jaynesh.</span>`, delay: 2800 }
    ];

    logs.forEach(({ text, delay }) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'text-xs font-mono text-slate-300 mt-1';
        line.innerHTML = text;
        statusLog.appendChild(line);
        statusLog.scrollTop = statusLog.scrollHeight;
        if (typeof playCyberTone === 'function') playCyberTone('click');
      }, delay);
    });

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fas fa-check-circle text-neonGreen mr-2"></i> Message Transmitted Successfully!`;
      if (typeof playCyberTone === 'function') playCyberTone('success');

      // Prompt option to launch email client
      setTimeout(() => {
        const mailtoAction = confirm(
          `Message encrypted and queued!\n\nWould you also like to open your default email app to send a direct message to jayneshy95@gmail.com?`
        );
        if (mailtoAction) {
          window.location.href = `mailto:jayneshy95@gmail.com?subject=${encodeURIComponent(
            subject || 'Cyber Security Inquiry via Portfolio'
          )}&body=${encodeURIComponent(`Hi Jaynesh,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
        }
        form.reset();
        submitBtn.innerHTML = `<i class="fas fa-paper-plane mr-2"></i> Transmit Encrypted Message`;
      }, 1000);
    }, 3200);
  });
}

/* ========================================================
   8. UTILITIES: TOASTS & COPY TO CLIPBOARD
   ======================================================== */
window.copyToClipboard = function (text, message = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`✓ ${message}`);
    if (typeof playCyberTone === 'function') playCyberTone('success');
  }).catch(() => {
    showToast(`Direct copy: ${text}`);
  });
};

function showToast(msg) {
  let toast = document.getElementById('cyber-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cyber-toast';
    toast.className =
      'fixed bottom-6 right-6 z-50 px-5 py-3 rounded-lg bg-slate-900/95 border border-cyan-400 text-cyan-300 text-sm font-mono shadow-2xl transition-all duration-300 transform translate-y-12 opacity-0 pointer-events-none flex items-center gap-3 backdrop-blur-md';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-neonGreen cyber-pulse-green"></span> <span>${msg}</span>`;
  toast.classList.remove('translate-y-12', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-12', 'opacity-0');
  }, 3000);
}

/* ========================================================
   9. DYNAMIC STATS COUNTER ANIMATION
   ======================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counters.forEach((c) => {
            const target = +c.getAttribute('data-target');
            let current = 0;
            const increment = target / 35;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                c.textContent = target;
                clearInterval(timer);
              } else {
                c.textContent = Math.ceil(current);
              }
            }, 30);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  const statsSection = document.getElementById('about');
  if (statsSection) observer.observe(statsSection);
}

/* ========================================================
   10. DOWNLOAD CV GENERATOR
   ======================================================== */
window.downloadCV = function () {
  const resumeContent = `================================================================================
                    JAYNESH YADAV - CYBER SECURITY RESUME
================================================================================
Title: Cyber Security Student | Ethical Hacker Aspirant
Email: jayneshy95@gmail.com
Education: BCA in IT (2nd Year), Pratap University, Jaipur
Location: Jaipur, Rajasthan, India
GitHub: https://github.com/jayneshyadav
LinkedIn: https://linkedin.com/in/jaynesh-yadav

--------------------------------------------------------------------------------
OBJECTIVE:
--------------------------------------------------------------------------------
Enthusiastic and technically driven 2nd-year BCA student passionate about Ethical 
Hacking, Network Defense, and System Hardening. Seeking an internship or entry-level 
role in Cyber Security / SOC / Penetration Testing to apply hands-on lab experience 
in real-world environments.

--------------------------------------------------------------------------------
TECHNICAL SKILLS:
--------------------------------------------------------------------------------
* Operating Systems: Kali Linux, Windows Server (2019/2022), Ubuntu, Windows 10/11
* Security & Networking: Network Security, Vulnerability Assessment, Basic Ethical 
  Hacking, TCP/IP Suite, Active Directory fundamentals, Subnetting, Firewalls
* Security Tools: Nmap, Wireshark, Burp Suite, Metasploit Framework, VirtualBox
* Programming / Scripting: Python (Basic), HTML/CSS, Bash Shell Scripting

--------------------------------------------------------------------------------
HANDS-ON CYBER SECURITY PROJECTS:
--------------------------------------------------------------------------------
1. ACTIVE DIRECTORY & GPO LAB SETUP
   - Configured an isolated local domain controller running Windows Server in VirtualBox.
   - Deployed and structured Organizational Units (OUs) for enterprise user management.
   - Authored and enforced Group Policy Objects (GPOs) for automated desktop wallpaper
     deployment, USB mass-storage restrictions, and password lockout policies.
   - Tested real-time enforcement and verification across Windows 7 and Windows 10 clients.

2. NETWORK RECONNAISSANCE & VULNERABILITY SCANNING LAB
   - Performed active network mapping across target virtual environments using Nmap.
   - Utilized TCP SYN scans (-sS), service banner detection (-sV), and OS fingerprinting (-O).
   - Captured and dissected network traffic with Wireshark to inspect unencrypted protocols
     and analyze the TCP 3-way handshake.
   - Formulated a vulnerability remediation assessment report for hardening detected services.

3. KEYLOGGER & PHISHING SIMULATION LAB
   - Developed a Python keystroke listener in a sandboxed virtual machine for defensive
     threat research.
   - Explored credential harvesting techniques, hook APIs, and storage vectors.
   - Analyzed endpoint mitigation tactics, including behavioral AV heuristics, virtual 
     keyboards, and user security hygiene.

--------------------------------------------------------------------------------
CERTIFICATIONS & CONTINUOUS LEARNING:
--------------------------------------------------------------------------------
* TryHackMe - Pre-Security & Jr Penetration Tester Paths
* HackTheBox - Starting Point & Fundamental Machines
* Cisco Networking Academy - Introduction to Cybersecurity
* Google Cybersecurity Professional Certificate (In Progress)

================================================================================
Generated via Jaynesh Yadav Portfolio System
================================================================================
`;

  const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Jaynesh_Yadav_CyberSecurity_CV.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('📄 CV Downloaded: Jaynesh_Yadav_CyberSecurity_CV.txt');
  if (typeof playCyberTone === 'function') playCyberTone('success');
};
