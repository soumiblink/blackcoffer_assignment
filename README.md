# Data Visualization Dashboard

A production-level data visualization dashboard built with MongoDB, Express.js, Next.js 14, and TypeScript.

## Tech Stack

### Frontend
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Recharts (Charts)
- Zustand (State Management)
- Framer Motion (Animations)
- Lucide React (Icons)
- Axios (API calls)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```
root/
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── Data.js
│   ├── routes/
│   │   └── dataRoutes.js
│   ├── controllers/
│   │   └── dataController.js
│   ├── config/
│   │   └── db.js
│   ├── scripts/
│   │   └── importData.js
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── dashboard/
│   │       └── page.tsx
│   ├── components/
│   │   ├── charts/
│   │   ├── filters/
│   │   └── ui/
│   ├── lib/
│   │   ├── api.ts
│   │   └── store.ts
│   └── package.json
│
└── jsondata.json
```

## Features

### Dashboard
- Modern, responsive UI similar to Stripe/Vercel dashboards
- Real-time data visualization
- Interactive charts and graphs
- Smooth animations and transitions

### Charts
1. Intensity by Country - Bar Chart
2. Likelihood by Region - Bar Chart
3. Relevance by Topics - Pie Chart
4. Year vs Intensity Trend - Line Chart
5. City Distribution - Bar Chart
6. Sector Distribution - Pie Chart
7. Region Distribution - Donut Chart

### Filters
Dynamic filters that update charts in real-time:
- End Year
- Topics
- Sector
- Region
- PESTLE
- Source
- SWOT
- Country
- City

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Edit `backend/.env` file:
```
MONGO_URI=mongodb://localhost:27017/dashboard
PORT=5000
```

4. Import data into MongoDB:
```bash
npm run import
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Edit `frontend/.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### GET /api/data
Get all data records (limited to 1000)

### GET /api/data/filters
Get all available filter options

### GET /api/data/dashboard
Get aggregated dashboard data with statistics

### POST /api/data/filter
Filter data based on provided parameters

Request body:
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

## Database Schema

```javascript
{
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
  swot: String,
  city: String
}
```

## Usage

1. Ensure MongoDB is running
2. Start the backend server: `cd backend && npm run dev`
3. Start the frontend server: `cd frontend && npm run dev`
4. Open browser and navigate to `http://localhost:3000`
5. The dashboard will automatically redirect to `/dashboard`
6. Use the filter panel to filter data dynamically
7. All charts update in real-time based on selected filters

## Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## Notes

- Make sure MongoDB is running before starting the backend
- The import script will clear existing data before importing
- All filters are optional and can be combined
- Charts automatically adjust to filtered data
- The dashboard is fully responsive and works on all devices

## License

MIT
