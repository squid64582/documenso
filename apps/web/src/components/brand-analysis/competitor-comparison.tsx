import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

const data = [
  {
    subject: "Health Focus",
    "Lifeboost Coffee": 90,
    "Blue Bottle": 50,
    Stumptown: 60,
    "Death Wish": 30,
    "Peet's Coffee": 40,
  },
  {
    subject: "Sustainability",
    "Lifeboost Coffee": 85,
    "Blue Bottle": 70,
    Stumptown: 75,
    "Death Wish": 40,
    "Peet's Coffee": 55,
  },
  {
    subject: "Premium Quality",
    "Lifeboost Coffee": 80,
    "Blue Bottle": 85,
    Stumptown: 80,
    "Death Wish": 65,
    "Peet's Coffee": 70,
  },
  {
    subject: "Brand Recognition",
    "Lifeboost Coffee": 60,
    "Blue Bottle": 75,
    Stumptown: 70,
    "Death Wish": 65,
    "Peet's Coffee": 80,
  },
  {
    subject: "Price Point",
    "Lifeboost Coffee": 85,
    "Blue Bottle": 80,
    Stumptown: 75,
    "Death Wish": 70,
    "Peet's Coffee": 65,
  },
]

// Updated color palette using rose, zinc, cyan, and lime
const colors = {
  "Lifeboost Coffee": "#e11d48", // rose-600
  "Blue Bottle": "#0891b2", // cyan-600
  Stumptown: "#84cc16", // lime-500
  "Death Wish": "#f43f5e", // rose-500
  "Peet's Coffee": "#71717a", // zinc-500
}

export default function CompetitorComparison() {
  return (
    <div className="h-[400px] w-full">
      <div className="h-full">
        <h3 className="text-sm font-medium mb-2 text-zinc-800">Competitor Comparison</h3>
        <p className="text-xs text-zinc-500 mb-4">Comparison across key attributes</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(colors).map(([name, color]) => (
            <div key={name} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
              <span className="text-xs text-zinc-700">{name}</span>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height="80%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#d4d4d8" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#71717a" }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#71717a" }} />

            {Object.entries(colors).map(([name, color]) => (
              <Radar key={name} name={name} dataKey={name} stroke={color} fill={color} fillOpacity={0.2} />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

