# Dashboard Backend

Express.js backend API for the Data Visualization Dashboard.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure MongoDB connection in `.env`:
```
MONGO_URI=mongodb://localhost:27017/dashboard
PORT=5000
```

3. Import data:
```bash
npm run import
```

4. Start server:
```bash
npm run dev
```

## API Routes

- `GET /api/data` - Get all data
- `GET /api/data/filters` - Get filter options
- `GET /api/data/dashboard` - Get dashboard aggregated data
- `POST /api/data/filter` - Filter data

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run import` - Import data from jsondata.json
