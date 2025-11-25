# AdForge Documentation

> **AI-Powered Ad Concept Generator**  
AdForge transforms raw product inputs into complete, production-ready ad concepts using multimodal AI — including scripts, storyboards, styles, and more. This documentation covers the architecture, setup, API flow, and usage instructions for developers and contributors.

---

## 🌟 Overview
AdForge is built to automate the earliest and most time-consuming phase of ad creation: **Ideation & Pre‑Production**.

You provide:
- Product details
- Target audience
- Brand tone
- Campaign goal

AdForge returns:
- A coherent ad concept
- Script
- Shot breakdown
- Visual direction
- Mood + aesthetics
- (Upcoming) AI-generated video drafts

---

## 🏗️ Project Structure
```
repo/
│
├── backend/            # Node.js + Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── .env
│
├── frontend/           # Next.js 14 App Router
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── .env.local
│
└── README.md
```

---

## 🔧 Tech Stack
### **Frontend**
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- ShadCN UI
- Zustand (state management)

### **Backend**
- Node.js + Express
- OpenAI SDK / Local LLMs
- Zod for schema validation

### **Infrastructure**
- **Frontend:** Deploy on Vercel
- **Backend:** Deploy on Render.com
- Single repo, two services

---

## ⚙️ Env Configuration
### Frontend (`.env.local`)
```
NEXT_PUBLIC_BACKEND_URL="https://your-backend.onrender.com"
```

### Backend (`.env`)
```
PORT=4000
OPENAI_API_KEY=your_key_here
```

---

## 🔌 API Routes
### **POST /api/ad/generate**
Generates a full ad concept.

#### **Request Body**
```json
{
  "productName": "Shoelace Pro Max",
  "description": "Self-tightening running shoes",
  "tone": "Energetic and modern",
  "audience": "Runners aged 18–40",
  "goal": "Brand awareness"
}
```

#### **Response**
```json
{
  "concept": "A futuristic athlete...",
  "script": "Scene opens on...",
  "shots": [
    { "id": 1, "description": "Closeup of..." }
  ],
  "visual_style": "High-contrast neon"
}
```

---

## 🖥️ Frontend Integration
### Example of API Proxy Route (`app/api/generate/route.ts`)
```ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${backendUrl}/api/ad/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return NextResponse.json(data);
}
```

---

## 🎨 UI/UX Philosophy
- **Minimal & focus-driven** interface
- **One-page workflow**: Input → Generate → Preview
- Uses **semantic animations** via Framer Motion
- **Mobile-first** layout

---

## 🧠 Core AI Logic
Implemented in `backend/src/services/adGenerator.ts`.

### Responsibilities:
1. Structure prompt templates
2. Call LLM providers
3. Sanitize & format output
4. Return a predictable JSON schema

---

## 🚀 Deployment Guide
### **Frontend (Vercel)**
1. Connect your repo
2. Select `frontend/` as the root folder
3. Add env vars
4. Deploy

### **Backend (Render.com)**
1. New Web Service
2. Root: `backend/`
3. Build Command: `npm install`
4. Start Command: `npm run start`
5. Add env vars
6. Deploy

---

## 🗺️ Roadmap
- [ ] AI video draft generation
- [ ] Scene-by-scene asset generator
- [ ] Export to TikTok/Reels format
- [ ] Team collaboration workspace

---

## 🤝 Contributing
1. Fork the repo
2. Create a feature branch
3. Write clean commits
4. Open a PR

---

## ❤️ About
AdForge is built to empower founders, marketers, and creators by automating the slowest part of the ad creation cycle using powerful multimodal AI.

