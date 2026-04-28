const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Mock Auth Database
const USERS = {
  '1': { password: '1', role: 'admin', name: 'Master Admin' },
  admin: { password: 'admin123', role: 'admin', name: 'Command Admin' },
  user: { password: 'user123', role: 'user', name: 'Citizen Observer' }
};

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS[username];

  if (user && user.password === password) {
    res.json({ 
      success: true, 
      token: `mock-jwt-${user.role}`, 
      user: { name: user.name, role: user.role } 
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// Mock data for utilities (Electricity, Water, Gas)
// Usually this would come from PostGIS
const utilities = {
  electricityLines: [
    // Mock GeoJSON-like structure
  ],
  waterPipes: [],
  gasLines: []
};

// Impact Analysis Endpoint using PostGIS
app.post('/api/analyze-impact', async (req, res) => {
  const { demolishedBuilding } = req.body;
  
  if (!demolishedBuilding) {
    return res.status(400).json({ error: 'No building data provided' });
  }

  const results = {
    utilitiesCut: ['Power Grid Alpha', 'Water Main 4B'],
    impactedHouseholds: Math.floor(Math.random() * 200) + 50,
    trafficDelayMinutes: Math.floor(Math.random() * 15) + 5,
    suggestedReroute: "Reroute via nearest arterial road detected in PostGIS fallback"
  };

  try {
    if (db && db.query) {
      const buildingGeom = JSON.stringify(demolishedBuilding.geometry || demolishedBuilding);
      const intersectsQuery = `SELECT type, name FROM utilities WHERE ST_Intersects(geom, ST_GeomFromGeoJSON($1))`;
      const intersectsResult = await db.query(intersectsQuery, [buildingGeom]);
      if (intersectsResult.rows.length) results.utilitiesCut = intersectsResult.rows.map(r => `${r.type} (${r.name || 'Unnamed'})`);
      
      const householdsQuery = `SELECT COUNT(*) as count FROM buildings WHERE ST_DWithin(geom, ST_GeomFromGeoJSON($1), 0.001)`;
      const householdsResult = await db.query(householdsQuery, [buildingGeom]);
      results.impactedHouseholds = parseInt(householdsResult.rows[0].count);
    }
  } catch (err) {
    console.warn("Database unavailable, using simulated spatial metrics.");
  }

  res.json(results);
});

// New Complex Spatial Query Endpoint
app.get('/api/proximity-search', async (req, res) => {
  const { lng, lat, radius = 500 } = req.query;
  
  if (!lng || !lat) {
    return res.status(400).json({ error: 'Coordinates required' });
  }

  try {
    const point = `POINT(${lng} ${lat})`;
    const radiusInDegrees = radius / 111000; // Rough conversion for degrees

    const query = `
      SELECT name, height, type, ST_AsGeoJSON(geom) as geometry
      FROM buildings 
      WHERE ST_DWithin(geom, ST_GeomFromText($1, 4326), $2)
      LIMIT 100
    `;
    
    const result = await db.query(query, [point, radiusInDegrees]);
    res.json({
      count: result.rowCount,
      features: result.rows.map(r => ({
        type: 'Feature',
        properties: { name: r.name, height: r.height, type: r.type },
        geometry: JSON.parse(r.geometry)
      }))
    });
  } catch (err) {
    console.error("Proximity Search Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

const distPath = path.join(__dirname, '../client/dist');
console.log(`Serving static files from: ${distPath}`);
app.use(express.static(distPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Policy Advisor (P.I.S.E. GPT) Endpoint
app.post('/api/policy-advisor', (req, res) => {
  const { query } = req.body;
  
  if (!query) return res.status(400).json({ error: 'No query provided' });

  // Simulation logic for LLM Analysis
  const q = query.toLowerCase();
  let analysis = "";

  if (q.includes('flyover') || q.includes('bridge')) {
    analysis = `
### 🏗️ PROJECT: URBAN FLYOVER INITIATIVE
**Location Identified**: JLB Road / Major Arterial Intersection

#### 💰 FISCAL METRICS
- **Projected Cost**: ₹145 Crores (Phase 1)
- **Economic ROI**: 12.4% (Projected via reduced transit latency)
- **Maintenance Load**: High (Structural monitoring required every 24 months)

#### 👥 SOCIAL IMPACT
- **Commuter Sentiment**: 🟢 Highly Positive (Reduced peak hour congestion by 34%)
- **Local Business Impact**: 🔴 Negative (Reduction in street-level footfall for small retailers)
- **Aesthetic Score**: 🟡 Neutral (Heritage skyline obstruction potential near Palace District)

#### ⚠️ RISK ASSESSMENT
- **Black Swan Risk**: Utility displacement during construction could trigger city-wide grid instability for 48 hours.
- **Recommendation**: Proceed with **Phase 1 Sub-surface cabling** before structural piling.
    `;
  } else if (q.includes('flood') || q.includes('drainage')) {
    analysis = `
### 🌊 CRISIS MITIGATION: DRAINAGE OVERHAUL
**Context**: Monsoon Resilience Strategy

#### 💰 FISCAL METRICS
- **Initial Outlay**: ₹80 Crores
- **Averted Loss**: ₹350 Crores in potential flood damage (10-year horizon)

#### 👥 SOCIAL IMPACT
- **Public Safety**: 🟢 Critical Improvement (90% reduction in low-lying area inundation)
- **Displacement**: 🟡 Moderate (Requires temporary relocation of 120 informal settlements)

#### 🛡️ STRATEGIC VERDICT
- **P.I.S.E. Recommendation**: **Priority Level: Alpha**. Immediate integration with the 3D Flood Inundation model required.
    `;
  } else {
    analysis = `
### 🧠 GENERAL POLICY ANALYSIS
**Query**: "${query}"

#### 📊 INITIAL HEURISTICS
- **Complexity Level**: Moderate
- **Multi-Sectoral Ripple**: Detected (Transport ↔ Economy ↔ Environment)

#### 🔍 ADVISORY NOTE
The SYNTH-GOV engine requires more specific geospatial anchors to provide a high-fidelity fiscal report. Please specify a Ward number or Landmark.
    `;
  }

  // Simulate AI delay
  setTimeout(() => {
    res.json({ report: analysis });
  }, 1500);
});

// Predictive Failure Analysis Endpoint
app.post('/api/predict-failures', (req, res) => {
  const { stormIntensity } = req.body;
  
  if (stormIntensity === undefined) return res.status(400).json({ error: 'No storm intensity provided' });

  // Simulation: Predict failure points based on intensity
  // Higher intensity = more failures, concentrated in "high-elevation" or "vulnerable" areas
  const failurePoints = [];
  const numPoints = Math.floor(stormIntensity * 5) + 5;

  for (let i = 0; i < numPoints; i++) {
    // Generate points around Vidhana Soudha, Bengaluru area with slight bias
    failurePoints.push({
      id: i,
      coordinates: [
        77.58 + Math.random() * 0.03,
        12.96 + Math.random() * 0.03
      ],
      riskLevel: Math.random() * stormIntensity / 10,
      reason: Math.random() > 0.5 ? 'Structural Stress' : 'Electrical Surge'
    });
  }

  const analysis = {
    points: failurePoints,
    summary: {
      totalPredictedOutages: failurePoints.length,
      estimatedRestorationTime: `${Math.floor(stormIntensity * 2)} hours`,
      criticalZone: "Central Business District"
    }
  };

  res.json(analysis);
});

// Sentiment Analysis (X/News Data) Endpoint
app.post('/api/sentiment', (req, res) => {
  // Mock ward boundaries or just random points for heatmap
  const sentimentPoints = [];
  const numPoints = 100;

  for (let i = 0; i < numPoints; i++) {
    const sentiment = Math.random() * 2 - 1; // Range -1 (Complaints) to 1 (Satisfied)
    sentimentPoints.push({
      id: i,
      coordinates: [
        76.62 + Math.random() * 0.06,
        12.28 + Math.random() * 0.05
      ],
      sentiment: sentiment, // -1 to 1
      intensity: Math.random() // How many people are talking
    });
  }

  res.json({ points: sentimentPoints });
});

app.listen(port, () => {
  console.log(`Digital Twin Integrated Command listening at http://localhost:${port}`);
});
