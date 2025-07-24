<h1 align="center">🐾 QR Pets Tag — Digital Credential App 🐾</h1>
<p align="center"><em>A lightweight full‑stack solution for pet identification via QR code.</em></p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000?style=flat-square&logo=nextdotjs">
  <img src="https://img.shields.io/badge/NestJS-10-E0234E?style=flat-square&logo=nestjs">
  <img src="https://img.shields.io/badge/Sass-1.69-C76494?style=flat-square&logo=sass">
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript">
  <img src="https://img.shields.io/badge/i18n-Custom%20Context-08c?style=flat-square">
  <img src="https://img.shields.io/badge/CI%2FCD-Render.com-46E3B7?style=flat-square&logo=render">
</p>

---

## 🔍 Overview

**QR Pets Tag** generates a server‑rendered profile for every pet and links it to a QR badge.  
Scan the tag, get crucial info, ping the owner via WhatsApp — home safe! 🏡✨

---

## ⚙️ Technical Stack

| Layer | Tech | Why |
|-------|------|-----|
| 🎨 Frontend | **Next.js 15 · React 18 · Sass Modules** | SSR/ISR out‑of‑the‑box, glass‑morphism styles |
| 🔧 Backend  | **NestJS (TypeScript)** | Structured REST API with DTO validation |
| 🌐 i18n     | **Custom React Context + JSON** | 2 languages → zero heavy libs |
| 🪝 State    | **Context API / Hooks** | No Redux overhead |
| ✨ UX       | **React Icons + CSS Keyframes** | Animated paw‑loader between routes |
| 🚀 CI/CD    | **Render.com (Static Site + Web Service)** | One‑click deploy for each sub‑folder |

---

## 💻 Local Setup

```bash
git clone https://github.com/FJulieta/QRPetsTag.git
cd QRPetsTag
pnpm install            # or npm / yarn

# 🐾 Launch API (Nest)
pnpm --filter backend dev   # http://localhost:3002

# 🐾 Launch Web (Next)
pnpm --filter frontend dev  # http://localhost:3000

```                   

---

<p align="center">
  Made with 🫶 by <strong>@FJulieta</strong> · May every furry friend find their way back home safe! 🏠🐕‍🦺
</p>