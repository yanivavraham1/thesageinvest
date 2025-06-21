import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface InvestmentSummaryProps {
  invested: number
  interest: number
  total: number
}

export function InvestmentSummary({ invested, interest, total }: InvestmentSummaryProps) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-xl">סיכום תוצאות</CardTitle>
        <CardDescription>נתונים מספריים של ההשקעה שלך</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700">סך השקעה</h3>
            <p className="text-2xl font-bold">₪{invested.toLocaleString()}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-700">סך רווחים</h3>
            <p className="text-2xl font-bold">₪{interest.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700">סך הכל</h3>
            <p className="text-2xl font-bold">₪{total.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
