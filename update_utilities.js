const fs = require('fs');

const data = JSON.parse(fs.readFileSync('client/public/data/bengaluru_utilities.json', 'utf8'));

const types = [
  { type: 'ElectricityLine', weight: 4 }, // 40%
  { type: 'WaterPipe', weight: 3 },      // 30%
  { type: 'SewagePipe', weight: 2 },     // 20%
  { type: 'GasLine', weight: 1 }         // 10%
];

// Flatten for random selection
const typePool = [];
types.forEach(t => {
  for (let i = 0; i < t.weight; i++) typePool.push(t.type);
});

data.features.forEach((feature, i) => {
  // Randomly assign a type
  const randomType = typePool[Math.floor(Math.random() * typePool.length)];
  feature.properties.type = randomType;
  
  if (randomType === 'ElectricityLine') feature.properties.name = 'Power Grid';
  if (randomType === 'WaterPipe') feature.properties.name = 'Water Main';
  if (randomType === 'SewagePipe') feature.properties.name = 'Sewage Line';
  if (randomType === 'GasLine') feature.properties.name = 'Gas Pipeline';
});

fs.writeFileSync('client/public/data/bengaluru_utilities.json', JSON.stringify(data));
console.log('Utilities updated successfully.');
