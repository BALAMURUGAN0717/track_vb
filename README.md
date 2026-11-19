# JobTrack – Smart 3D Job Application Tracker & Career Management Platform

[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.187-black?logo=three.js)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**JobTrack** is a commercial-grade, futuristic, fully responsive SaaS web application built with **React JS**, **Three.js**, **Framer Motion**, and **Recharts**. It is engineered to give job seekers command over their job search lifecycle with a 3D WebGL hero canvas, an interactive 7-stage drag-and-drop Kanban board, a camera-based Face Lock biometric scanner demo, and automated analytics.

---

## 📸 Screenshots & UI Showcase

*(Screenshots placeholder: Add your product UI captures here)*

| 3D Interactive Hero Canvas | 3D Kanban Workspace |
| :---: | :---: |
| ![Landing Page Preview](https://placehold.co/600x340/0B1020/4F8CFF?text=JobTrack+3D+WebGL+Hero) | ![Kanban Preview](https://placehold.co/600x340/0B1020/8B5CF6?text=7-Stage+Drag+%26+Drop+Kanban) |

| Biometric Face Lock Scanner | Real-time Analytics & Conversion Funnel |
| :---: | :---: |
| ![Face Lock Scanner](https://placehold.co/600x340/070A14/06B6D4?text=Biometric+Face+Lock+HUD) | ![Analytics Dashboard](https://placehold.co/600x340/0B1020/10B981?text=Dynamic+Funnel+Analytics) |

---

## ✨ Features

### 1. 3D WebGL Hero Canvas & Modern SaaS Landing Page
- **Interactive 3D Jewel Core**: Real-time Three.js scene featuring holographic metallic materials, dual orbital torus rings, floating career geometries, and gentle mouse-parallax gyro perspective.
- **Glassmorphic Floating Cards**: Micro-interaction badges highlighting real-world offer milestones.
- **Full Landing Experience**: Hero, animated KPI counters, feature matrix, 4-step framework, candidate testimonials, expandable FAQ accordion, and corporate footer.

### 2. Dual Global Theme Engine (Light & Dark Modes)
- **First-Visit Default**: **Light Mode** (`#F5F7FF` background, `#FFFFFF` cards, `#172033` high-contrast typography).
- **Futuristic Dark Mode**: (`#0B1020` deep navy background, `#151D32` card glass, `#29344D` borders).
- **Persistent Switcher**: Sun/Moon toggle with spring-physics knob in header, fully persisted in LocalStorage.

### 3. Face Lock – Camera Biometric Verification System (Demo)
- **Biometric Reticle & Scan HUD**: Real-time webcam preview using `navigator.mediaDevices.getUserMedia` with facial alignment guides and laser scanning beam.
- **Real-Time Video Canvas Analysis**: Optical framing and brightness detection providing guidance (*"Center face inside biometric target"*, *"Face recognized! Hold steady..."*).
- **Integrated Camera Simulation Mode**: Built-in simulated biometric feed so the entire verification flow can be tested on devices without a physical camera or inside sandbox environments.
- **Access Control Demo**: Direct dashboard unlocking upon successful verification match.

### 4. 3D Drag-and-Drop Kanban Board
- **7 Lifecycle Columns**:
  1. `Applied` (`#3B82F6`)
  2. `Under Review` (`#F59E0B`)
  3. `Shortlisted` (`#8B5CF6`)
  4. `Interview Scheduled` (`#06B6D4`)
  5. `Offer Received` (`#10B981`)
  6. `Selected` (`#059669`)
  7. `Rejected` (`#EF4444`)
- **Visual Feedback**: Drag highlights, drop-elevation, and celebratory confetti upon landing an Offer or final Selection.
- **Mobile-Friendly**: Touch-enabled column transfer buttons.

### 5. Application Tracking Center
- **Search & Multi-Criteria Filtering**: Filter by company, position, status, work mode (Remote/Hybrid/On-site), job type (Full Time/Contract/Internship), and location.
- **Dual View Modes**: Seamless 1-click toggle between 3D Card Grid and enterprise Table View.
- **Interactive Details Modal**: Visual progress stage timeline, application notes log, salary info, and linked interview details.
- **13-Field Application Creator**: Add jobs with auto-generated unique Application IDs (`APP-2026-XXXX`).

### 6. Interview Management Center
- **Live Countdown Timers**: Automatically calculates time remaining until your next technical interview.
- **Calendar & Timeline Views**: Interactive monthly calendar with highlighted session dates.
- **Direct Meeting Launcher**: One-click launch for Google Meet, Zoom, Microsoft Teams, or on-site notes.

### 7. Performance Analytics & Conversion Funnel
- **Zero Hardcoded Data**: Metrics dynamically computed strictly from active LocalStorage records.
- **Interactive Recharts Graphs**:
  - Monthly application velocity area chart
  - Status breakdown donut chart
  - Job source channel comparison bar chart (LinkedIn, Indeed, Naukri, Referrals, Company Sites)
  - Work mode distribution ratios

### 8. Notifications & Reminders
- Alerts for upcoming interviews (within 48 hours), approaching application deadlines, and follow-up reminders.
- Native browser desktop notifications via the Web Notifications API.

---

## 🛠️ Technologies Used

- **Frontend Core**: React 19, HTML5, CSS3, JavaScript (ES6+)
- **Routing**: React Router DOM (v7)
- **3D Graphics & Animations**: Three.js, Framer Motion, Canvas Confetti
- **Data Visualizations**: Recharts
- **Iconography**: Lucide React
- **Storage**: Browser LocalStorage
- **Build Tool**: Vite 8

---

## 📦 Installation Instructions

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

```bash
# 1. Clone the repository
git clone https://github.com/BALAMURUGAN0717/JobTrack.git

# 2. Navigate to the project directory
cd JobTrack

# 3. Install required dependencies
npm install
```

---

## 🚀 How to Run the Project

### Development Mode

To start the Vite development server locally:

```bash
npm run dev
```

Then open your browser and navigate to:
```
http://localhost:5173/
```

### Production Build

To test or verify the production bundle:

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 Security Limitations of Demo Face Verification

> [!WARNING]
> **Client-Side Demonstration Notice:**
> The camera Face Lock feature included in JobTrack is strictly a **frontend demonstration** and should **not** be considered cryptographic or production-secure identity verification.

1. **Detection vs. Verification**: Detecting a human face or facial bounding box in a browser `<video>` element confirms presence, but does not prove the cryptographic identity of an authorized user.
2. **Zero Biometric Storage**: For strict privacy compliance, JobTrack **never stores raw camera feeds, snapshots, or biometric feature vectors** in LocalStorage or on external servers.
3. **No Silent Camera Activation**: Camera access is requested only through standard browser permission dialogs with clear user consent.
4. **Production Architecture**: For production biometric authentication, platforms must pair with **WebAuthn / FIDO2 / Passkeys** (Apple TouchID, Windows Hello, FaceID) backed by server-side public-key challenges.

---

## 💾 LocalStorage Data Persistence Explanation

JobTrack operates as a **privacy-preserving Single Page Application (SPA)** with zero backend server dependencies:

- **Local Privacy**: All job opportunities, salaries, custom resume filenames, interview notes, and profile details are stored directly on your device inside `window.localStorage`.
- **Pre-populated Demo Records**: On first launch, JobTrack automatically seeds realistic demo applications (Google, Stripe, Microsoft, etc.) so you can explore all charts and Kanban flows immediately.
- **Instant Persistence**: Any newly created, modified, or deleted applications, interview schedules, and notes are saved synchronously to LocalStorage and persist across page refreshes.
- **Tab Synchronization**: Data is kept synchronized across multiple open browser tabs.
- **Session Note**: Since notifications depend on browser execution, reminder alerts are checked while the tab is active or via browser desktop notification permissions.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
