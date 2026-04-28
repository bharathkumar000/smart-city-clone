import { NextResponse } from 'next/server';

export async function POST(request) {
  const { query } = await request.json();
  
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

  return NextResponse.json({ report: analysis });
}
