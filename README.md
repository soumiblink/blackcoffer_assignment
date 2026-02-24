# DataViz Analytics Platform

A premium, production-ready data visualization dashboard featuring a modern glassmorphism UI with real-time analytics, interactive charts, and advanced filtering capabilities. Built with the MERN stack and Next.js 14.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=flat-square&logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey?style=flat-square&logo=express)

## 🎯 Overview

DataViz is an enterprise-grade analytics dashboard that transforms complex data into beautiful, interactive visualizations. Designed with glassmorphism design, smooth animations, and a cyan/blue color scheme.

### ✨ Key Features

- **🎨 Premium UI/UX**: Glassmorphism design with backdrop blur effects and smooth animations
- **📊 Interactive Charts**: 7 different chart types with real-time data updates
- **🔍 Advanced Filtering**: Multi-parameter filtering with instant chart updates
- **🔐 Authentication System**: Secure login/register with session management
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **⚡ Real-time Updates**: Live data synchronization across all components
- **🎭 Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **🌙 Dark Theme**: Modern dark mode with cyan/blue accent colors

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Environment**: dotenv

## 📁 Project Structure

```
dataviz-dashboard/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── dataController.js     # Business logic
│   ├── models/
│   │   └── Data.js               # Mongoose schema
│   ├── routes/
│   │   └── dataRoutes.js         # API routes
│   ├── scripts/
│   │   └── importData.js         # Data import utility
│   ├── server.js                 # Express server
│   ├── .env                      # Environment variables
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard
│   │   ├── analytics/
│   │   │   └── page.tsx          # Analytics page
│   │   ├── settings/
│   │   │   └── page.tsx          # Settings page
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   ├── register/
│   │   │   └── page.tsx          # Register page
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Landing page
│   │   └── globals.css           # Global styles
│   │
│   ├── components/
│   │   ├── charts/
│   │   │   ├── IntensityByCountry.tsx
│   │   │   ├── LikelihoodByRegion.tsx
│   │   │   ├── RelevanceByTopic.tsx
│   │   │   ├── YearTrend.tsx
│   │   │   ├── CityDistribution.tsx
│   │   │   ├── SectorDistribution.tsx
│   │   │   └── RegionDistribution.tsx
│   │   ├── filters/
│   │   │   └── FilterPanel.tsx   # Dynamic filter component
│   │   └── ui/
│   │       ├── Navbar.tsx        # Navigation bar
│   │       ├── Card.tsx          # Card wrapper
│   │       ├── GlassCard.tsx     # Glassmorphism card
│   │       ├── Button.tsx        # Button component
│   │       ├── StatCard.tsx      # Statistics card
│   │       └── Skeleton.tsx      # Loading skeleton
│   │
│   ├── lib/
│   │   ├── api.ts                # API client
│   │   ├── auth.ts               # Auth utilities
│   │   └── store.ts              # Zustand store
│   │
│   ├── .env.local                # Environment variables
│   ├── next.config.js            # Next.js config
│   ├── tailwind.config.ts        # Tailwind config
│   └── package.json
│
├── jsondata.json                 # Sample data
└── README.md
```

## 📊 Dashboard Features

### Interactive Charts

1. **Intensity by Country** - Horizontal bar chart showing average intensity metrics per country
2. **Likelihood by Region** - Bar chart displaying likelihood scores across regions
3. **Relevance by Topic** - Pie chart visualizing topic relevance distribution
4. **Year vs Intensity Trend** - Area chart tracking intensity trends over time
5. **City Distribution** - Bar chart showing data distribution by city
6. **Sector Distribution** - Pie chart breaking down data by sector
7. **Region Distribution** - Donut chart displaying regional data distribution

### Statistics Cards

- **Total Records**: Count of all data entries
- **Average Intensity**: Mean intensity score
- **Average Relevance**: Mean relevance score
- **Average Likelihood**: Mean likelihood score

### Dynamic Filters

Real-time filtering across 9 parameters:
- End Year
- Topic
- Sector
- Region
- PESTLE (Political, Economic, Social, Technological, Legal, Environmental)
- Source
- SWOT (Strengths, Weaknesses, Opportunities, Threats)
- Country
- City

### Authentication

- User registration with validation
- Secure login system
- Session management with localStorage
- Protected routes
- Logout functionality

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed and running (or MongoDB Atlas account)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd dataviz-dashboard
```

2. **Backend Setup**

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create .env file with:
MONGO_URI=mongodb://localhost:27017/dashboard
PORT=5000

# Import sample data
npm run import

# Start backend server
npm run dev
```

Backend runs on `http://localhost:5000`

3. **Frontend Setup**

```bash
# Navigate to frontend (from root)
cd frontend

# Install dependencies
npm install

# Configure environment variables
# Create .env.local file with:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Frontend runs on `http://localhost:3000`

4. **Access the Application**

Open your browser and navigate to `http://localhost:3000`

- Register a new account or login
- Explore the dashboard with interactive charts
- Apply filters to see real-time updates
- Navigate between Dashboard, Analytics, and Settings

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Data
```http
GET /data
```
Returns all data records (limited to 1000)

**Response:**
```json
{
  "success": true,
  "count": 1000,
  "data": [...]
}
```

#### Get Filter Options
```http
GET /data/filters
```
Returns all available filter options

**Response:**
```json
{
  "success": true,
  "filters": {
    "endYears": ["2025", "2026", ...],
    "topics": ["gas", "oil", ...],
    "sectors": ["Energy", "Technology", ...],
    ...
  }
}
```

#### Get Dashboard Data
```http
GET /data/dashboard
```
Returns aggregated dashboard statistics and chart data

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalRecords": 1000,
      "avgIntensity": 6.5,
      "avgRelevance": 3.2,
      "avgLikelihood": 2.8
    },
    "intensityByCountry": [...],
    "relevanceByTopic": [...],
    ...
  }
}
```

#### Filter Data
```http
POST /data/filter
```
Filter data based on provided parameters

**Request Body:**
```json
{
  "endYear": "2025",
  "topic": "gas",
  "sector": "Energy",
  "region": "Northern America",
  "pestle": "Industries",
  "source": "EIA",
  "swot": "Strength",
  "country": "United States of America",
  "city": "Boston"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "intensityByCountry": [...],
    "relevanceByTopic": [...],
    ...
  }
}
```

## 🗄️ Database Schema

```javascript
{
  end_year: String,           // Target year
  intensity: Number,          // Intensity score (0-100)
  sector: String,             // Industry sector
  topic: String,              // Main topic
  insight: String,            // Detailed insight
  url: String,                // Source URL
  region: String,             // Geographic region
  start_year: String,         // Start year
  impact: String,             // Impact description
  added: String,              // Date added
  published: String,          // Publication date
  country: String,            // Country name
  relevance: Number,          // Relevance score (0-5)
  pestle: String,             // PESTLE category
  source: String,             // Data source
  title: String,              // Entry title
  likelihood: Number,         // Likelihood score (0-5)
  swot: String,               // SWOT category
  city: String                // City name
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Cyan (#06b6d4) to Blue (#3b82f6)
- **Background**: Dark gradient (slate-950 to slate-900)
- **Cards**: Glassmorphism (white/5 with backdrop blur)
- **Text**: White primary, Gray-400 secondary
- **Accents**: Cyan-400, Blue-400, Sky-400

### Typography
- **Font**: System font stack
- **Headings**: Bold, tracking-tight
- **Body**: Regular, readable line-height

### Components
- Glassmorphism cards with backdrop blur
- Smooth hover transitions (200ms)
- Chart animations (800-1000ms)
- Rounded corners (xl, 2xl)
- Subtle shadows and glows

## 📱 Responsive Design

- **Desktop**: Full layout with sidebar filters
- **Tablet**: Adaptive grid, collapsible filters
- **Mobile**: Stacked layout, floating filter button

## 🔒 Security Features

- Client-side authentication
- Protected routes
- Session management
- Input validation
- Secure API communication

## 🚀 Production Deployment

### Backend
```bash
cd backend
npm install --production
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Environment Variables (Production)
```bash
# Backend
MONGO_URI=<your-mongodb-atlas-uri>
PORT=5000
NODE_ENV=production

# Frontend
NEXT_PUBLIC_API_URL=<your-backend-url>/api
```

## 🧪 Development

### Available Scripts

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run import` - Import sample data

**Frontend:**
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint


## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from Stripe, Vercel, and Linear
- Charts powered by Recharts
- Icons by Lucide React
- Animations by Framer Motion

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB**
