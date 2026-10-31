# CineSphere 3D — Vijayawada Local Cinema Integration & Booking Platform

[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-black.svg?logo=three.js&logoColor=white)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)

**CineSphere 3D** is a next-generation cinema discovery and 3D seat booking web platform customized for **Vijayawada, Andhra Pradesh**.

Based on verified local reference data (`Vijayawada Theatres & Multiplexes Website Content.docx`), it showcases Vijayawada multiplexes and single-screen halls with audited technical specifications, interactive 3D auditorium seat selection, phone-first responsive design, and seamless checkout.

---

## 🌟 Key Highlights

### 1. Primary Launch City: Vijayawada, AP
- **Default Launch Location:** Vijayawada, Andhra Pradesh.
- **Location Selector:** Persistent header pill displaying `📍 Vijayawada, AP` with a quick city switcher modal supporting other major cities (Visakhapatnam, Hyderabad, Guntur, Tirupati, Bengaluru, Chennai).

### 2. Audited Vijayawada Cinema Database (9 Theatres)
Strictly adheres to documented specifications without fabricating missing data:
1. **INOX Laila Mall** — MG Road, Punnammathota (3 screens, 959 seats, Dolby Atmos on all 3 screens, Laser Volfoni 3D)
2. **Capital Cinemas, Trendset Mall** — Kala Nagar, Benz Circle (6 screens, Dolby Atmos, 3D, 108 luxury recliners, push-back seats, free Wi-Fi)
3. **PVR Ripples Mall** — MG Road, Labbipet (Kids playhouse, luxury recliners, wheelchair friendly)
4. **INOX LEPL Icon** — Patamata (4 screens, 1,198 seats at launch, Screen 1 with 352 seats)
5. **INOX Urvasi Complex** — Gandhi Nagar (4 screens, 1,103 seats, 2D & 3D, built on the historic Urvasi/Rambha site)
6. **Cinépolis PVP Square** — Mogalrajapuram (6 screens, luxury recliners, wheelchair friendly)
7. **Cinépolis Power One Mall** — Bunder Road (4 screens, AC, parking, F&B)
8. **Tara Screens 2K A/C** — City Center (2K projection, 3D shows, Telugu films; address clearly flagged as unverified)
9. **G3 Theatres Raj Yuvraj** — Gandhi Nagar (Luxury recliners, wheelchair friendly)

> **Integrity Rule:** Missing data points display `"Information unavailable"`. Dolby Atmos is only highlighted where confirmed; no false IMAX claims are made.

### 3. Interactive 3D Cinema Seat Visualizer (Three.js)
- Curved cinematic screen with projector spotlight effect and title banner.
- Real-time tiering: **Classic**, **Prime**, and **Luxury Recliner** seating.
- Raycasting interactive selection with real-time bill calculation in Indian Rupees (₹).
- Camera view switcher: Overview, Screen View, and Balcony View.
- Touch-friendly on mobile devices.

### 4. Locality & Showtimes Filtering
Filter Vijayawada multiplexes by:
- **Localities:** MG Road, Labbipet, Kala Nagar, Benz Circle, Punnammathota, Patamata, Gandhi Nagar, Mogalrajapuram, Bunder Road.
- **Languages:** Telugu, Hindi, English.
- **Showtimes:** Morning, Afternoon, Evening, Night.
- **Feature Toggles:** Verified Dolby Atmos, 3D Ready, Luxury Recliners.

### 5. Cinema Discovery Map
- Schematic geographic discovery map representing Vijayawada's key arteries (MG Road, Bandar Road, Benz Circle, Eluru Road, Krishna River corridor).
- Verified address pins with direct Google Maps external directions links.
- Explicit indicator for unverified pins (Tara Screens).

### 6. Phone Compatibility (Mobile UX)
- Fully responsive layout with bottom app navigation bar.
- Optimized touch targets, collapsible filters, and smooth modal transitions.

### 7. Transparent Indian Rupee (₹) Pricing
- All prices clearly displayed in Indian Rupees (₹).
- Sample pricing labels on demo schedules with clear disclaimers conforming to Andhra Pradesh municipal theater slabs.

---

## 🛠 Tech Stack

- **Framework:** React 18 with TypeScript
- **3D Graphics:** Three.js (WebGL interactive auditorium)
- **Styling:** Tailwind CSS with cinematic dark gold aesthetic
- **Icons:** Lucide React
- **Build Tool:** Vite 6
- **Animations:** Canvas-confetti for instant ticket confirmation celebrations

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser or mobile emulator.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in `/dist`.

---

## 📁 Project Architecture

```
c:\Cinephire 3D\
├── src/
│   ├── components/
│   │   ├── AuditReportView.tsx    # Live data audit table & verification status
│   │   ├── AuthModal.tsx          # User login, profile, and guest authentication
│   │   ├── CheckoutModal.tsx      # Payment gateway & instant M-Ticket pass
│   │   ├── CinemaAmenities.tsx    # Reusable amenities grid with icons
│   │   ├── CinemaCard.tsx         # Reusable theatre card with verified badges
│   │   ├── CinemaDetails.tsx      # Comprehensive cinema detail view & specs
│   │   ├── CinemaFilters.tsx      # Locality pills & feature toggles
│   │   ├── CinemaMap.tsx          # Map discovery with Google Maps links
│   │   ├── CinemaSeat3D.tsx       # Three.js WebGL 3D seat visualizer
│   │   ├── Footer.tsx             # Responsive footer & mobile bottom navigation
│   │   ├── LocationSelector.tsx   # Primary city dropdown & modal
│   │   ├── MoviesView.tsx         # Movies now playing in Vijayawada
│   │   ├── Navbar.tsx             # Sticky header with location indicator
│   │   └── ShowTimeList.tsx       # Demo showtime slots with disclaimers
│   ├── data/
│   │   └── cinemas.ts             # Structured Vijayawada cinema records
│   ├── services/
│   │   └── bookingService.ts      # Live provider sync architecture & calculations
│   ├── types/
│   │   └── cinema.ts              # Full TypeScript interfaces & audit states
│   ├── App.tsx                    # Main application orchestration
│   ├── index.css                  # Tailwind CSS styling & custom scrollbars
│   └── main.tsx                   # React root entrypoint
├── index.html                     # HTML5 shell with Google Fonts
├── package.json                   # Project dependencies & scripts
├── tailwind.config.js             # Custom color palette & cinema styling
├── tsconfig.json                  # Strict TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── VIJAYAWADA_CINEMA_AUDIT.md     # Documented verification audit report
```

---

## 📄 License & Attribution
- Initial theatre data extracted from: *Vijayawada Theatres & Multiplexes Website Content.docx*.
- Built with ❤️ for cinema lovers in Vijayawada and beyond.

