import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Updated with rose, cyan, zinc, and lime colors
const data = [
  {
    name: "Health Focus",
    value: 90,
    color: "#e11d48", // rose-600
  },
  {
    name: "Sustainability",
    value: 85,
    color: "#84cc16", // lime-500
  },
  {
    name: "Quality Assurance",
    value: 80,
    color: "#0891b2", // cyan-600
  },
  {
    name: "Unique Selling Prop.",
    value: 75,
    color: "#f43f5e", // rose-500
  },
  {
    name: "Brand Messaging",
    value: 70,
    color: "#06b6d4", // cyan-500
  },
]

export default function MarketPositioningChart() {
  return (
    <div className="h-[300px] w-full">
      <div className="h-full">
        <h3 className="text-sm font-medium mb-2 text-zinc-800">Key Positioning Elements</h3>
        <p className="text-xs text-zinc-500 mb-4">Strength of each positioning element (0-100)</p>

        <ResponsiveContainer width="100%" height="85%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#d4d4d8" />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "#71717a" }} />
            <YAxis type="category" dataKey="name" width={120} tick={{ fill: "#71717a" }} />
            {data.map((entry, index) => (
              <Bar
                key={`bar-${index}`}
                dataKey="value"
                fill={entry.color}
                name={entry.name}
                background={{ fill: "#f4f4f5" }}
                radius={[0, 4, 4, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

