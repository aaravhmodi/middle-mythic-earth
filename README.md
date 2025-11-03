# 🌍 Mythic Earth

> Explore the real-world origins of Middle-earth through a cinematic, 3D map of Tolkien's Swiss inspirations.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Mapbox](https://img.shields.io/badge/Mapbox-GL%20JS-orange)](https://docs.mapbox.com/mapbox-gl-js/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)](https://tailwindcss.com/)

A high-performance, interactive 3D web application that visualizes five Swiss locations that inspired J.R.R. Tolkien's Middle-earth. Experience cinematic map transitions, hover tooltips, and a toggleable "Fantasy Overlay" that transforms real-world topography into mythic landscapes.

## ✨ Features

- **3D Globe Rendering**: Immersive Mapbox GL JS 3D globe centered on Switzerland
- **Interactive Markers**: 5 clickable location markers with hover tooltips
- **Fantasy Overlay Mode**: Toggle between realistic satellite view and mystical dark style
- **Cinematic Transitions**: Smooth flyTo animations when selecting locations
- **Location Details**: Modal cards showing "Real vs. Mythic" information for each site
- **Fully Offline-Capable**: Static JSON datasets and locally served assets
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessibility**: Keyboard navigation, ARIA roles, and screen reader support

## 📍 Locations

The app features five canonical Tolkien-inspired Swiss locations:

1. **Lauterbrunnen Valley** – Rivendell inspiration
2. **Jungfrau Massif** – Misty Mountains
3. **Aletsch Glacier** – Frozen wasteland of Middle-earth
4. **Zermatt / Matterhorn** – The Lonely Mountain
5. **Grimsel Pass** – Fellowship's alpine crossing

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Mapbox account with access token ([Get one free here](https://account.mapbox.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aaravhmodi/middle-mythic-earth.git
   cd middle-mythic-earth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_token_here
   ```
   
   > **Note**: Make sure to use a **public token** (`pk.*`), not a secret token (`sk.*`). Public tokens can view styles, tilesets, and geocode locations.

4. **Add location images**
   
   Place the following images in `/public/images/`:
   - `lauterbrunnen.jpg`
   - `jungfrau.jpg`
   - `aletsch.jpg`
   - `zermatt.jpg`
   - `grimsel.jpg`
   
   Recommended: 1200-2000px width, 16:9 or 4:3 aspect ratio

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build & Deploy

### Static Export (Vercel/GitHub Pages)

```bash
npm run build
npm run export
```

This generates a static site in the `/out` directory, ready to deploy to:
- [Vercel](https://vercel.com) (recommended)
- [GitHub Pages](https://pages.github.com)
- Any static hosting service

### Production Build

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14 | Routing, static export, build pipeline |
| UI Library | React 18 | Component architecture |
| Map Engine | Mapbox GL JS 3.0 | 3D map rendering, coordinate projection |
| Styling | Tailwind CSS 3 | Utility-first design, responsive UI |
| State Management | React Context API | Global overlay mode state |
| Animation | Framer Motion | Smooth UI transitions |
| Language | TypeScript 5 | Type safety and developer experience |

## 📁 Project Structure

```
mythic-earth/
├── public/
│   └── images/              # Location images (add your own)
│       ├── lauterbrunnen.jpg
│       ├── jungfrau.jpg
│       ├── aletsch.jpg
│       ├── zermatt.jpg
│       └── grimsel.jpg
├── src/
│   ├── components/
│   │   ├── Map.tsx          # Main map component with Mapbox GL JS
│   │   ├── LocationCard.tsx # Modal for location details
│   │   ├── MapTooltip.tsx   # Hover tooltip component
│   │   ├── OverlayToggle.tsx # Fantasy/Real mode switcher
│   │   ├── Navbar.tsx       # Top navigation bar
│   │   └── Footer.tsx       # Attribution footer
│   ├── contexts/
│   │   └── OverlayContext.tsx # Global fantasy mode state
│   ├── data/
│   │   └── locations.json   # Location metadata
│   ├── pages/
│   │   ├── _app.tsx         # Next.js app wrapper
│   │   └── index.tsx        # Main page
│   ├── styles/
│   │   └── globals.css       # Global styles and Tailwind imports
│   └── utils/
│       └── mapUtils.ts      # Mapbox utilities and constants
├── .env.local               # Environment variables (create this)
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Customization

### Adding New Locations

Edit `src/data/locations.json`:

```json
{
  "name": "Location Name",
  "coords": [longitude, latitude],
  "image": "/images/location.jpg",
  "real": "Real-world description.",
  "mythic": "Middle-earth interpretation."
}
```

### Changing Colors

Modify `tailwind.config.js`:

```javascript
colors: {
  fantasy: {
    forest: '#123524',  // Dark green
    gold: '#d9b36c',    // Gold accents
    blue: '#6dc2e8',    // Ethereal blue
  }
}
```

### Map Styles

Edit `src/utils/mapUtils.ts`:

```typescript
export const fantasyStyle = 'mapbox://styles/mapbox/dark-v11'
export const realStyle = 'mapbox://styles/mapbox/satellite-v9'
```

## 🎯 Performance Targets

- **Initial Load**: < 3 seconds
- **Frame Rate**: 60 FPS steady
- **Bundle Size**: < 1.5 MB gzipped
- **Lighthouse Performance**: ≥ 90
- **Lighthouse Accessibility**: ≥ 90

## ♿ Accessibility

- ✅ Keyboard navigation for all markers
- ✅ ARIA labels and roles
- ✅ Screen reader support
- ✅ Color contrast ratio ≥ 4.5:1
- ✅ Focus indicators for interactive elements

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

## 📝 Mapbox Token Setup

1. Sign up at [mapbox.com](https://account.mapbox.com/)
2. Navigate to [Access Tokens](https://account.mapbox.com/access-tokens/)
3. Create a new token with these **Public Scopes**:
   - `STYLES:TILES`
   - `VISION:READ`
   - `STYLES:READ`
   - `FONTS:READ`
   - `DATASETS:READ`

4. Add these **Secret Scopes**:
   - `MAP:READ`
   - `TILESETS:READ`
   - `STYLES:DOWNLOAD` (optional, for offline caching)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **J.R.R. Tolkien** - For creating Middle-earth and inspiring this project
- **Mapbox** - For providing excellent mapping infrastructure
- **Next.js Team** - For the amazing React framework

## 📚 Resources

- [Tolkien Estate](https://www.tolkienestate.com/) - Official Tolkien resources
- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tolkien's 1911 Swiss Journey](https://www.tolkienestate.com/) - Historical context

## 🐛 Known Issues

- Satellite style may not show terrain color changes in Fantasy Mode (Mapbox style limitation)
- Tooltip positioning may need adjustment on very small screens

## 🔮 Future Enhancements

- [ ] Custom terrain shader with Three.js
- [ ] Audio layer with ambient sounds (Howler.js)
- [ ] Scroll story mode (GSAP)
- [ ] Visualize Tolkien's 1911 hike path as a glowing trail
- [ ] Localization (French/German translations)
- [ ] AI-generated fantasy renders of real landscapes

---

**Built with ❤️ by [Aarav Modi](https://github.com/aaravhmodi)**

For questions or issues, please open an [Issue](https://github.com/aaravhmodi/middle-mythic-earth/issues).
