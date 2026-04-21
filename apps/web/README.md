# NSX Monitor - Web Landing Page

The official web presence for NSX Monitor, built for high performance and visual excellence.

---

## ✨ Features

- **Dynamic Landing Page**: Showcases the core capabilities of the network monitor.
- **Interactive Visuals**: Uses mesh gradients and custom animations for a premium feel.
- **Smart Detection**: Automatically detects the user's operating system to recommend the correct download.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile browsers.

---

## 🛠️ Technology Stack

- **Framework**: [React Router 7](https://reactrouter.com/) (formerly Remix)
- **Library**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & Native Intersection Observer
- **Icons**: [Iconify](https://iconify.design/)

---

## 🚀 Getting Started

### Development
```bash
# From the root of the monorepo
pnpm --filter web dev
```

### Production Build
```bash
pnpm --filter web build
```

### Deployment
The application is designed to be deployed on platforms like Vercel, Netlify, or as a Docker container.
```bash
# Build and run the Docker container
docker build -t nsx-monitor-web .
docker run -p 3000:3000 nsx-monitor-web
```

---

## 📁 Project Structure
- `app/routes/`: Contains the main page routes (`home.tsx`, `download.tsx`).
- `components/landing/`: Modular landing page sections.
- `app/styles/`: Global styles and Tailwind configuration.
