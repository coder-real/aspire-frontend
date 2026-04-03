# Aspire Frontend — Cognitive Sanctuary

Aspire is a next-generation school management platform designed with the **Cognitive Sanctuary** design system. Our primary goal is to turn a typically utilitarian dashboard into a high-end, premium editorial environment that prioritizes mental clarity through extensive white space, high-contrast typography, and dynamic ambient lighting.

## Core Features
1. **Dynamic Theming**: Each school has its own custom color palette automatically served via the backend database, completely transforming the dashboard for multi-tenant users.
2. **Unified Role Authentication**: Secure login processing tailored for both Students and Administrators, with JWT validation and seamless redirection flows.
3. **Intelligence Insights Dashboard**: Custom-built visual metrics, including an SVG-rendered overall Score Ring and academic momentum tracking, contextualized per user.
4. **"No-Line" Layout Paradigm**: The complete removal of 1px structural borders in favor of overlapping surface tiers and tinted glassmorphism.

## Tech Stack
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router & Turbopack)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (`globals.css`) structured via CSS tokens.
- **Client Networking**: Axios with custom authorization interceptors.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env.local` file at the root:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design Philosophy Highlights
- **Typography Matrix**: `Plus Jakarta Sans` for editorial-style headlines and display titles, accompanied by `Inter` for functional data. `JetBrains Mono` is reserved exclusively for numerical metrics and timestamps.
- **Elevation Layers**: Strict mapping of contextual "Z-Depth" using specific variable colors: Level 0 (`--surface-bg`), Level 1 (`--surface-low`), and Level 2 (`surface-card`).
- **Interactive States**: Instead of simple hover color changes, active elements utilize `-2px` Y-axis shifts over `200ms ease-out` animations.
