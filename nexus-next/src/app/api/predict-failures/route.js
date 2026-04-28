import { NextResponse } from 'next/server';

export async function POST(request) {
  const { stormIntensity } = await request.json();
  
  const failurePoints = [];
  const numPoints = Math.floor(stormIntensity * 5) + 5;

  for (let i = 0; i < numPoints; i++) {
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

  return NextResponse.json({
    points: failurePoints,
    summary: {
      totalPredictedOutages: failurePoints.length,
      estimatedRestorationTime: `${Math.floor(stormIntensity * 2)} hours`,
      criticalZone: "Central Business District"
    }
  });
}
