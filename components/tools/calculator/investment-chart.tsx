"use client"

import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Legend, Bar } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

type InvestmentData = {
  total: number
  TotalInterest: number
  years: number
  invested: number
}

interface InvestmentChartProps {
  data: InvestmentData[]
}

export function InvestmentChart({ data }: InvestmentChartProps) {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean
    payload?: Array<{ value: number }>
    label?: number | string
  }) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-2 bg-white shadow-lg border border-gray-200">
          <CardContent className="p-2">
            <p className="font-bold mb-1">שנה: {label}</p>
            <p className="text-sm text-blue-600">סך השקעה: ₪{payload[0].value.toLocaleString()}</p>
            <p className="text-sm text-yellow-600">רווחים: ₪{payload[1].value.toLocaleString()}</p>
            <p className="text-sm text-green-600">סכום כולל: ₪{payload[2].value.toLocaleString()}</p>
          </CardContent>
        </Card>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="years"
          tick={{ fontSize: 12 }}
          label={{
            value: "שנים",
            position: "insideBottom",
            offset: -5,
          }}
        />
        <YAxis
          tick={{
            fontSize: 12,
            dx: -28,
          }}
          tickFormatter={(value) =>
            `₪${value.toLocaleString(undefined, {
              notation: "compact",
              compactDisplay: "short",
            })}`
          }
          label={{
            value: "שווי השקעה (₪)",
            angle: -90,
            position: "insideLeft",
            offset: 10,
          }}
        />

        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          align="right"
          formatter={(value) => <span style={{ paddingRight: 4 }}>{value}</span>}
          height={36}
          wrapperStyle={{ fontSize: 14 }}
        />
        <Bar dataKey="invested" name="סך השקעה" stackId="a" fill="#3b82f6" />
        <Bar dataKey="TotalInterest" name="רווחים" stackId="a" fill="#eab308" />
        <Bar dataKey="total" name="סכום כולל" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  )
}
