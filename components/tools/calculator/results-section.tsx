"use client"

import { useCalculator } from "./calculator-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { InvestmentChart } from "./investment-chart"

export function ResultsSection() {
  const { investArray, isCalculating } = useCalculator()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">תוצאות החישוב</CardTitle>
        <CardDescription>צפה בגרף התשואה הפוטנציאלית של השקעתך לאורך זמן</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center">
        {isCalculating ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
            <p className="text-gray-500">מחשב את התשואה...</p>
          </div>
        ) : investArray.length > 0 ? (
          <InvestmentChart data={investArray} />
        ) : (
          <div className="text-center text-gray-500">
            <p>הזן את נתוני ההשקעה ולחץ על &quot;חשב תשואה&quot; כדי לראות את התוצאות</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
