# 🌍 Multi-Language Recipe Blog (Next.js + Headless CMS)

## 📌 Project Overview
This project is a multi-language recipe blog built using Next.js and a Headless CMS (Contentful).

## 🚀 Features
- Multi-language support (en, es, fr)
- Featured recipes (SSG)
- Dynamic recipe pages
- Language switcher
- Search & filter
- Newsletter form
- Social sharing
- Dockerized setup

## ⚙️ Environment Variables
CMS_PROVIDER=contentful
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_access_token
CONTENTFUL_PREVIEW_SECRET=your_preview_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000

## 🐳 Run Project
docker-compose up --build
The project will run on port 3000

## 📂 Project Structure
.
├── pages/
├── components/
├── public/
│   └── locales/
│       ├── en/common.json
│       ├── es/common.json
│       └── fr/common.json
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── next.config.js
└── README.md
